"use client";

import {
  useEffect,
  useRef,
  useState,
  type ChangeEvent,
  type ClipboardEvent,
  type FormEvent,
  type KeyboardEvent,
} from "react";

type Channel = "phone" | "email";
type Step = "login" | "signin" | "forgot-password" | "create-password" | "otp";
type OtpPurpose = "register" | "reset";

type Props = {
  onClose: () => void;
  embedded?: boolean;
};

type OtpRequestResponse = {
  challenge_id: string;
  sent: boolean;
  channel?: Channel;
  destination?: string;
  expires_in: number;
  resend_after: number;
};

type OtpResendResponse = {
  sent: boolean;
  expires_in: number;
  resend_after: number;
};

type AuthenticatedResponse = {
  authenticated: boolean;
  user: {
    channel: Channel;
    identifier: string;
  };
  notification_sent?: boolean;
};

type AccountStatusResponse = {
  exists: boolean;
  channel?: Channel;
  user_id?: string;
  message?: string;
};

const OTP_LENGTH = 6;
const DEFAULT_RESEND_SECONDS = 60;

const API_BASE_URL =
  process.env.NEXT_PUBLIC_CITY_COOLIES_API_URL?.replace(/\/$/, "") ||
  "http://localhost:8001";

const REGISTER_VERIFY_PATH = "/auth/register/verify";
const PASSWORD_RESET_VERIFY_PATH = "/auth/password-reset/verify";

function getApiErrorMessage(data: unknown, fallback: string): string {
  if (
    typeof data === "object" &&
    data !== null &&
    "detail" in data
  ) {
    const detail = (data as { detail?: unknown }).detail;

    if (typeof detail === "string" && detail.trim()) {
      return detail;
    }

    if (Array.isArray(detail) && detail.length > 0) {
      const first = detail[0];

      if (
        typeof first === "object" &&
        first !== null &&
        "msg" in first &&
        typeof (first as { msg?: unknown }).msg === "string"
      ) {
        return String((first as { msg: string }).msg);
      }
    }
  }

  return fallback;
}

async function readJson(response: Response): Promise<unknown> {
  try {
    return await response.json();
  } catch {
    return null;
  }
}

function resolveIdentity(value: string): {
  channel: Channel;
  identifier: string;
} | null {
  const trimmed = value.trim();

  if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed)) {
    return {
      channel: "email",
      identifier: trimmed,
    };
  }

  let digits = trimmed.replace(/\D/g, "");

  if (digits.startsWith("91") && digits.length === 12) {
    digits = digits.slice(2);
  }

  if (/^[6-9]\d{9}$/.test(digits)) {
    return {
      channel: "phone",
      identifier: digits,
    };
  }

  return null;
}

export default function CustomerLoginDialog({
  onClose,
  embedded = false,
}: Props) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const otpRefs = useRef<Array<HTMLInputElement | null>>([]);

  const [channel, setChannel] = useState<Channel>("phone");
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [step, setStep] = useState<Step>("login");

  const [otp, setOtp] = useState<string[]>(
    Array(OTP_LENGTH).fill("")
  );

  const [challengeId, setChallengeId] = useState("");
  const [serverDestination, setServerDestination] = useState("");

  const [secondsLeft, setSecondsLeft] = useState(
    DEFAULT_RESEND_SECONDS
  );

  const [error, setError] = useState("");
  const [checkingAccount, setCheckingAccount] = useState(false);
  const [signingIn, setSigningIn] = useState(false);
  const [sendingOtp, setSendingOtp] = useState(false);
  const [verifyingOtp, setVerifyingOtp] = useState(false);
  const [resendingOtp, setResendingOtp] = useState(false);
  const [otpPurpose, setOtpPurpose] = useState<OtpPurpose>("register");

  // CITY_COOLIES_FORGOT_PASSWORD_DEV_PREVIEW
  useEffect(() => {
    if (!embedded) return;

    const timer = window.setTimeout(() => {
      const params = new URLSearchParams(
        window.location.search
      );

      if (
        params.get("preview") ===
        "forgot-password"
      ) {
        setStep("forgot-password");
      }
    }, 0);

    return () => {
      window.clearTimeout(timer);
    };
  }, [embedded]);

  useEffect(() => {
    if (embedded) return;

    const previousFocus = document.activeElement;
    const previousOverflow = document.body.style.overflow;

    document.body.style.overflow = "hidden";
    dialogRef.current?.showModal();

    return () => {
      document.body.style.overflow = previousOverflow;

      if (previousFocus instanceof HTMLElement) {
        previousFocus.focus();
      }
    };
  }, [embedded]);

  useEffect(() => {
    if (step !== "otp" || secondsLeft <= 0) return;

    const timer = window.setTimeout(() => {
      setSecondsLeft((previous) =>
        Math.max(0, previous - 1)
      );
    }, 1000);

    return () => window.clearTimeout(timer);
  }, [step, secondsLeft]);

  useEffect(() => {
    if (step !== "otp") return;

    const timer = window.setTimeout(() => {
      otpRefs.current[0]?.focus();
    }, 0);

    return () => window.clearTimeout(timer);
  }, [step]);

  const cleanPhone = identifier.replace(/\D/g, "");
  const validPhone = /^[6-9]\d{9}$/.test(cleanPhone);

  const validEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(
    identifier.trim()
  );

  const canContinue =
    channel === "phone" ? validPhone : validEmail;

  const completeOtp =
    otp.length === OTP_LENGTH &&
    otp.every((digit) => /^\d$/.test(digit));

  const localDestination =
    channel === "phone"
      ? `+91-${cleanPhone}`
      : identifier.trim();

  const destination =
    serverDestination || localDestination;

  function resetOtpInputs() {
    setOtp(Array(OTP_LENGTH).fill(""));
  }

  function changeChannel(nextChannel: Channel) {
    if (sendingOtp || verifyingOtp || resendingOtp) return;

    setChannel(nextChannel);
    setIdentifier("");
    setPassword("");
    setConfirmPassword("");
    setShowPassword(false);
    setPassword("");
    setConfirmPassword("");
    setShowPassword(false);
    setStep("login");
    resetOtpInputs();
    setChallengeId("");
    setServerDestination("");
    setSecondsLeft(DEFAULT_RESEND_SECONDS);
    setError("");
  }

  function editDetails() {
    if (sendingOtp || verifyingOtp || resendingOtp) return;

    setStep(otpPurpose === "reset" ? "forgot-password" : "create-password");
    resetOtpInputs();
    setChallengeId("");
    setServerDestination("");
    setSecondsLeft(DEFAULT_RESEND_SECONDS);
    setError("");
  }

  async function checkAccount(
    identityChannel: Channel,
    identityIdentifier: string
  ): Promise<boolean> {
    const query = new URLSearchParams({
      channel: identityChannel,
      identifier: identityIdentifier,
      _: String(Date.now()),
    });

    const response = await fetch(
      `${API_BASE_URL}/auth/account/status?${query.toString()}`,
      {
        method: "GET",
        credentials: "include",
        cache: "no-store",
        headers: {
          "Cache-Control": "no-cache",
        },
      }
    );

    const data = await readJson(response);

    if (!response.ok) {
      throw new Error(
        getApiErrorMessage(
          data,
          "Unable to check your account. Please try again."
        )
      );
    }

    return Boolean((data as AccountStatusResponse)?.exists);
  }

  async function handleContinue(
    event: FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();

    if (!canContinue || checkingAccount) {
      if (!canContinue) {
        setError(
          channel === "phone"
            ? "Enter a valid 10-digit Indian mobile number."
            : "Enter a valid email address."
        );
      }

      return;
    }

    setCheckingAccount(true);
    setError("");

    try {
      const exists = await checkAccount(
        channel,
        channel === "phone" ? cleanPhone : identifier.trim()
      );

      setPassword("");
      setConfirmPassword("");
      setShowPassword(false);

      if (exists) {
        setStep("signin");
        setError(
          "Account already exists for this User ID. Enter your 4-digit password to Sign In."
        );
        return;
      }

      setStep("create-password");
    } catch (requestError) {
      setError(
        requestError instanceof Error
          ? requestError.message
          : "Unable to check your account. Please try again."
      );
    } finally {
      setCheckingAccount(false);
    }
  }

  async function handleSendOtp(
    event: FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();

    if (!/^\d{4}$/.test(password)) {
      setError("Create a 4-digit password.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    if (!canContinue || sendingOtp) {
      if (!canContinue) {
        setError(
          channel === "phone"
            ? "Enter a valid 10-digit Indian mobile number."
            : "Enter a valid email address."
        );
      }

      return;
    }

    setSendingOtp(true);
    setError("");

    try {
      const response = await fetch(
        `${API_BASE_URL}/auth/register/request`,
        {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            channel,
            identifier:
              channel === "phone"
                ? cleanPhone
                : identifier.trim(),
            pin: password,
            confirm_pin: confirmPassword,
          }),
        }
      );

      const data = await readJson(response);

      if (!response.ok) {
        if (response.status === 409) {
          setPassword("");
          setConfirmPassword("");
          setShowPassword(false);
          setStep("signin");
          setError(
            "This User ID already has a City Coolies account. Please sign in."
          );
          return;
        }

        throw new Error(
          getApiErrorMessage(
            data,
            "Unable to send OTP. Please try again."
          )
        );
      }

      const result = data as OtpRequestResponse;

      if (
        !result ||
        !result.sent ||
        !result.challenge_id
      ) {
        throw new Error(
          "OTP could not be sent. Please try again."
        );
      }

      setChallengeId(result.challenge_id);
      setServerDestination(
        result.destination || localDestination
      );
      setOtpPurpose("register");

      resetOtpInputs();

      setSecondsLeft(
        Number.isFinite(result.resend_after)
          ? Math.max(0, result.resend_after)
          : DEFAULT_RESEND_SECONDS
      );

      setStep("otp");
    } catch (requestError) {
      const message =
        requestError instanceof Error
          ? requestError.message
          : "Unable to send OTP. Please try again.";

      if (/account already exists/i.test(message)) {
        setStep("signin");
      }

      setError(message);
    } finally {
      setSendingOtp(false);
    }
  }

  async function handleSignIn(
    event: FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();

    const identity = resolveIdentity(identifier);

    if (!identity) {
      setError("Enter your registered User ID.");
      return;
    }

    if (!/^\d{4}$/.test(password)) {
      setError("Enter your 4-digit password.");
      return;
    }

    if (signingIn) return;

    setSigningIn(true);
    setError("");

    try {
      const response = await fetch(
        `${API_BASE_URL}/auth/login`,
        {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            channel: identity.channel,
            identifier: identity.identifier,
            pin: password,
          }),
        }
      );

      const data = await readJson(response);

      if (!response.ok) {
        throw new Error(
          getApiErrorMessage(
            data,
            "Unable to sign in. Check your User ID and password."
          )
        );
      }

      const result = data as AuthenticatedResponse;

      if (!result?.authenticated) {
        throw new Error("Sign in was not confirmed.");
      }

      window.location.assign("/services");
    } catch (requestError) {
      setError(
        requestError instanceof Error
          ? requestError.message
          : "Unable to sign in. Please try again."
      );
    } finally {
      setSigningIn(false);
    }
  }

  async function handleForgotPasswordOpen() {
    const identity = resolveIdentity(identifier);

    if (!identity) {
      setError(
        identifier.trim()
          ? "Enter a valid User ID."
          : "Enter User ID first."
      );
      return;
    }

    if (checkingAccount) return;

    setCheckingAccount(true);
    setError("");

    try {
      const exists = await checkAccount(
        identity.channel,
        identity.identifier
      );

      if (!exists) {
        setError(
          "No City Coolies account was found for this User ID."
        );
        return;
      }

      setChannel(identity.channel);
      setIdentifier(identity.identifier);
      setPassword("");
      setConfirmPassword("");
      setShowPassword(false);
      setStep("forgot-password");
    } catch (requestError) {
      setError(
        requestError instanceof Error
          ? requestError.message
          : "Unable to check your account. Please try again."
      );
    } finally {
      setCheckingAccount(false);
    }
  }

  async function handleForgotPassword(
    event: FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();

    const identity = resolveIdentity(identifier);

    if (!identity) {
      setError("User ID is invalid.");
      return;
    }

    if (!/^\d{4}$/.test(password)) {
      setError("Create a 4-digit new password.");
      return;
    }

    if (password !== confirmPassword) {
      setError(
        "New password and confirm password do not match."
      );
      return;
    }

    if (sendingOtp) return;

    setSendingOtp(true);
    setError("");

    try {
      const response = await fetch(
        `${API_BASE_URL}/auth/password-reset/request`,
        {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            channel: identity.channel,
            identifier: identity.identifier,
            pin: password,
            confirm_pin: confirmPassword,
          }),
        }
      );

      const data = await readJson(response);

      if (!response.ok) {
        throw new Error(
          getApiErrorMessage(
            data,
            "Unable to send password reset OTP."
          )
        );
      }

      const result = data as OtpRequestResponse;

      if (!result?.sent || !result.challenge_id) {
        throw new Error("Password reset OTP was not confirmed.");
      }

      setChannel(identity.channel);
      setChallengeId(result.challenge_id);
      setServerDestination(
        identity.channel === "phone"
          ? `+91-${identity.identifier}`
          : identity.identifier
      );
      setOtpPurpose("reset");
      resetOtpInputs();
      setSecondsLeft(
        Number.isFinite(result.resend_after)
          ? Math.max(0, result.resend_after)
          : DEFAULT_RESEND_SECONDS
      );
      setStep("otp");
    } catch (requestError) {
      setError(
        requestError instanceof Error
          ? requestError.message
          : "Unable to send password reset OTP."
      );
    } finally {
      setSendingOtp(false);
    }
  }

  function applyOtp(startIndex: number, value: string) {
    const digits = value.replace(/\D/g, "");

    if (!digits) {
      setOtp((previous) => {
        const next = [...previous];
        next[startIndex] = "";
        return next;
      });

      return;
    }

    const next = [...otp];

    for (
      let index = 0;
      index < digits.length &&
      startIndex + index < OTP_LENGTH;
      index++
    ) {
      next[startIndex + index] = digits[index];
    }

    setOtp(next);
    setError("");

    const nextEmpty = next.findIndex(
      (digit, index) =>
        index >= startIndex && !digit
    );

    const focusIndex =
      nextEmpty >= 0
        ? nextEmpty
        : Math.min(
            startIndex + digits.length,
            OTP_LENGTH - 1
          );

    otpRefs.current[focusIndex]?.focus();
  }

  function handleOtpChange(
    index: number,
    event: ChangeEvent<HTMLInputElement>
  ) {
    applyOtp(index, event.target.value);
  }

  function handleOtpKeyDown(
    index: number,
    event: KeyboardEvent<HTMLInputElement>
  ) {
    if (event.key === "Backspace") {
      event.preventDefault();

      if (otp[index]) {
        const next = [...otp];
        next[index] = "";
        setOtp(next);
      } else if (index > 0) {
        const next = [...otp];
        next[index - 1] = "";
        setOtp(next);
        otpRefs.current[index - 1]?.focus();
      }
    }

    if (
      event.key === "ArrowLeft" &&
      index > 0
    ) {
      event.preventDefault();
      otpRefs.current[index - 1]?.focus();
    }

    if (
      event.key === "ArrowRight" &&
      index < OTP_LENGTH - 1
    ) {
      event.preventDefault();
      otpRefs.current[index + 1]?.focus();
    }
  }

  function handleOtpPaste(
    index: number,
    event: ClipboardEvent<HTMLInputElement>
  ) {
    event.preventDefault();

    applyOtp(
      index,
      event.clipboardData.getData("text")
    );
  }

  async function resendOtp() {
    if (
      secondsLeft > 0 ||
      resendingOtp ||
      !challengeId
    ) {
      return;
    }

    setResendingOtp(true);
    setError("");

    try {
      const response = await fetch(
        `${API_BASE_URL}/auth/otp/resend`,
        {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            challenge_id: challengeId,
          }),
        }
      );

      const data = await readJson(response);

      if (!response.ok) {
        throw new Error(
          getApiErrorMessage(
            data,
            "Unable to resend OTP. Please try again."
          )
        );
      }

      const result = data as OtpResendResponse;

      if (!result || !result.sent) {
        throw new Error(
          "OTP could not be resent. Please try again."
        );
      }

      resetOtpInputs();

      setSecondsLeft(
        Number.isFinite(result.resend_after)
          ? Math.max(0, result.resend_after)
          : DEFAULT_RESEND_SECONDS
      );

      window.setTimeout(() => {
        otpRefs.current[0]?.focus();
      }, 0);
    } catch (requestError) {
      setError(
        requestError instanceof Error
          ? requestError.message
          : "Unable to resend OTP. Please try again."
      );
    } finally {
      setResendingOtp(false);
    }
  }

  async function handleVerify(
    event: FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();

    if (!completeOtp) {
      setError(
        "Please enter the complete 6-digit OTP."
      );
      return;
    }

    if (!challengeId) {
      setError(
        "OTP request is missing. Please request a new OTP."
      );
      return;
    }

    if (verifyingOtp) return;

    setVerifyingOtp(true);
    setError("");

    try {
      const verifyPath =
        otpPurpose === "reset"
          ? PASSWORD_RESET_VERIFY_PATH
          : REGISTER_VERIFY_PATH;

      const response = await fetch(
        `${API_BASE_URL}${verifyPath}`,
        {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            challenge_id: challengeId,
            otp: otp.join(""),
          }),
        }
      );

      const data = await readJson(response);

      if (!response.ok) {
        throw new Error(
          getApiErrorMessage(
            data,
            "OTP verification failed."
          )
        );
      }

      const result = data as AuthenticatedResponse;

      if (!result || !result.authenticated) {
        throw new Error(
          "OTP verification failed."
        );
      }

      window.location.assign("/services");
    } catch (requestError) {
      setError(
        requestError instanceof Error
          ? requestError.message
          : "OTP verification failed."
      );
    } finally {
      setVerifyingOtp(false);
    }
  }

  const content = (
    <div className="flex min-w-0 flex-col px-5 pb-7 pt-7 sm:px-10 sm:pb-8 sm:pt-9 md:min-h-[480px] md:pb-[90px] md:pt-[55px]">
      {step === "login" ? (
        <>
          <h2
            id="customer-login-title"
            className="text-[17px] font-semibold leading-6 text-[#111] sm:text-[15px]"
          >
            Log in for the best experience
          </h2>

          <p className="mt-1.5 text-[13px] leading-5 text-[#666]">
            {channel === "phone"
              ? "Enter your phone number to continue"
              : "Enter your email address to continue"}
          </p>

          <form
            onSubmit={handleContinue}
            className="mt-5 flex flex-col md:flex-1"
          >
            <div className="relative rounded-[3px] border border-[#ef1b23] focus-within:ring-1 focus-within:ring-[#ef1b23]">
              <label
                htmlFor="customer-login-identifier"
                className="absolute -top-2 left-2 bg-white px-1 text-[9px] font-medium leading-4 text-[#ef1b23]"
              >
                {channel === "phone"
                  ? "Phone Number"
                  : "Email-ID"}
              </label>

              <div className="flex min-h-[52px] items-center px-3 sm:min-h-[48px]">
                {channel === "phone" && (
                  <span className="mr-2 border-r border-[#ddd] pr-2 text-[14px] text-[#212121]">
                    +91
                  </span>
                )}

                <input
                  id="customer-login-identifier"
                  type={
                    channel === "phone"
                      ? "tel"
                      : "email"
                  }
                  inputMode={
                    channel === "phone"
                      ? "numeric"
                      : "email"
                  }
                  autoComplete={
                    channel === "phone"
                      ? "tel-national"
                      : "email"
                  }
                  required
                  maxLength={
                    channel === "phone" ? 10 : 254
                  }
                  value={identifier}
                  disabled={sendingOtp}
                  onChange={(event) => {
                    setIdentifier(
                      channel === "phone"
                        ? event.target.value
                            .replace(/\D/g, "")
                            .slice(0, 10)
                        : event.target.value
                    );

                    setError("");
                  }}
                  className="min-w-0 flex-1 border-0 bg-transparent py-3 text-[15px] text-[#212121] outline-none disabled:cursor-not-allowed disabled:opacity-70"
                />
              </div>
            </div>

            {/* CITY_COOLIES_LOGIN_ACTIONS */}
            <div className="mt-3 flex items-center justify-between gap-4 sm:mt-4">
              <button
                type="button"
                disabled={sendingOtp}
                onClick={() => {
                  setPassword("");
                  setConfirmPassword("");
                  setShowPassword(false);
                  setError("");
                  setStep("signin");
                }}
                className="shrink-0 text-[12px] font-semibold text-[#ef1b23] hover:underline disabled:cursor-not-allowed disabled:opacity-60"
              >
                Sign In
              </button>

              <button
                type="button"
                disabled={sendingOtp}
                onClick={() =>
                  changeChannel(
                    channel === "phone"
                      ? "email"
                      : "phone"
                  )
                }
                className="shrink-0 text-[12px] font-semibold text-[#ef1b23] hover:underline disabled:cursor-not-allowed disabled:opacity-60"
              >
                {channel === "phone"
                  ? "Use Email-ID"
                  : "Use Phone Number"}
              </button>
            </div>

            {error && (
              <p
                role="alert"
                className="mt-4 text-xs text-red-700"
              >
                {error}
              </p>
            )}

            <p className="mt-6 text-[11px] leading-[17px] text-[#777]">
              By continuing, you agree to City Coolies&apos;{" "}
              <a
                href="/terms-conditions"
                className="text-[#ef1b23] hover:underline"
              >
                Terms of Use
              </a>{" "}
              and{" "}
              <a
                href="/privacy-policy"
                className="text-[#ef1b23] hover:underline"
              >
                Privacy Policy
              </a>
              .
            </p>

            <div className="h-5 md:min-h-10 md:flex-1" />

            <button
              type="submit"
              disabled={!canContinue || checkingAccount}
              className="mt-5 min-h-[46px] w-full rounded-[4px] bg-[#ef1b23] px-4 py-2 text-[13px] font-semibold text-white transition-colors hover:bg-red-700 disabled:cursor-not-allowed disabled:bg-[#c4c4c4] md:mt-6 md:min-h-[42px] md:rounded-[2px]"
            >
              {checkingAccount
                ? "Checking account..."
                : "Continue"}
            </button>
          </form>
        </>
      ) : step === "signin" ? (
        <>
          <button
            type="button"
            onClick={() => {
              setPassword("");
              setConfirmPassword("");
              setShowPassword(false);
              setError("");
              setStep("login");
            }}
            className="mb-4 inline-flex w-fit items-center gap-1 text-[12px] font-semibold text-[#ef1b23] hover:underline"
          >
            ← Back
          </button>

          <h2
            id="customer-login-title"
            className="text-[17px] font-semibold leading-6 text-[#111] sm:text-[15px]"
          >
            Sign in to your account
          </h2>

          <p className="mt-1.5 text-[13px] leading-5 text-[#666]">
            Enter your User ID & password
          </p>

          <form
            onSubmit={handleSignIn}
            className="mt-5 flex flex-col md:flex-1"
          >
            <div className="relative rounded-[3px] border border-[#ef1b23] focus-within:ring-1 focus-within:ring-[#ef1b23]">
              <label
                htmlFor="customer-signin-identifier"
                className="absolute -top-2 left-2 bg-white px-1 text-[9px] font-medium leading-4 text-[#ef1b23]"
              >
                User ID
              </label>

              <div className="flex min-h-[52px] items-center px-3 sm:min-h-[48px]">
                <input
                  id="customer-signin-identifier"
                  type="text"
                  inputMode="text"
                  autoComplete="username"
                  maxLength={254}
                  value={identifier}
                  onChange={(event) => {
                    setIdentifier(
                      event.target.value
                    );

                    setError("");
                  }}
                  placeholder="Enter User ID"
                  className="min-w-0 flex-1 border-0 bg-transparent py-3 text-[13px] text-[#212121] outline-none placeholder:text-[#8a8a8a]"
                />
              </div>
            </div>

            <div className="relative mt-4 rounded-[3px] border border-[#ef1b23] focus-within:ring-1 focus-within:ring-[#ef1b23]">
              <label
                htmlFor="customer-signin-password"
                className="absolute -top-2 left-2 bg-white px-1 text-[9px] font-medium leading-4 text-[#ef1b23]"
              >
                Password
              </label>

              <div className="flex min-h-[52px] items-center px-3 sm:min-h-[48px]">
                <input
                  id="customer-signin-password"
                  type={
                    showPassword
                      ? "text"
                      : "password"
                  }
                  inputMode="numeric"
                  autoComplete="current-password"
                  maxLength={4}
                  value={password}
                  onChange={(event) => {
                    setPassword(
                      event.target.value
                        .replace(/\D/g, "")
                        .slice(0, 4)
                    );

                    setError("");
                  }}
                  placeholder="4-digit password"
                  className="min-w-0 flex-1 border-0 bg-transparent py-3 text-[13px] text-[#212121] outline-none placeholder:text-[#8a8a8a]"
                />

                <button
                  type="button"
                  aria-label={
                    showPassword
                      ? "Hide password"
                      : "Show password"
                  }
                  onClick={() =>
                    setShowPassword(
                      (current) => !current
                    )
                  }
                  className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-[#ef1b23] transition-colors hover:bg-red-50"
                >
                  {showPassword ? (
                    <svg
                      aria-hidden="true"
                      viewBox="0 0 24 24"
                      fill="none"
                      className="h-[19px] w-[19px]"
                      stroke="currentColor"
                      strokeWidth="1.8"
                    >
                      <path
                        strokeLinecap="round"
                        d="M3 3l18 18"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M6.2 6.2C4.2 7.6 3 10 3 12c0 2.9 3.6 8 9 8 1.6 0 3-.4 4.2-1"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M9.9 4.2A10.7 10.7 0 0 1 12 4c5.4 0 9 5.1 9 8 0 1.1-.5 2.5-1.5 3.8"
                      />
                    </svg>
                  ) : (
                    <svg
                      aria-hidden="true"
                      viewBox="0 0 24 24"
                      fill="none"
                      className="h-[19px] w-[19px]"
                      stroke="currentColor"
                      strokeWidth="1.8"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M2.5 12S6 5 12 5s9.5 7 9.5 7S18 19 12 19 2.5 12 2.5 12Z"
                      />
                      <circle
                        cx="12"
                        cy="12"
                        r="3"
                      />
                    </svg>
                  )}
                </button>
              </div>
            </div>

            <div className="mt-3 text-right">
              <button
                type="button"
                onClick={() => {
                  void handleForgotPasswordOpen();
                }}
                className="text-[12px] font-semibold text-[#ef1b23] hover:underline"
              >
                Forgot Password?
              </button>
            </div>

            {error && (
              <p
                role="alert"
                className="mt-4 text-xs text-red-700"
              >
                {error}
              </p>
            )}

            <div className="h-5 md:min-h-10 md:flex-1" />

            <button
              type="submit"
              disabled={
                !identifier.trim() ||
                password.length !== 4 ||
                signingIn
              }
              className="mt-5 min-h-[46px] w-full rounded-[4px] bg-[#ef1b23] px-4 py-2 text-[13px] font-semibold text-white transition-colors hover:bg-red-700 disabled:cursor-not-allowed disabled:bg-[#c4c4c4] md:mt-6 md:min-h-[42px] md:rounded-[2px]"
            >
              {signingIn ? "Signing In..." : "Sign In"}
            </button>

            <button
              type="button"
              onClick={() => {
                setPassword("");
                setError("");
                setStep("login");
              }}
              className="mt-4 text-[12px] font-semibold text-[#ef1b23] hover:underline"
            >
              Create a new account
            </button>
          </form>
        </>
      ) : step === "forgot-password" ? (
        <>
          <button
            type="button"
            onClick={() => {
              setPassword("");
              setConfirmPassword("");
              setShowPassword(false);
              setError("");
              setStep("signin");
            }}
            className="mb-4 inline-flex w-fit items-center gap-1 text-[12px] font-semibold text-[#ef1b23] hover:underline"
          >
            ← Back to Sign In
          </button>

          <h2
            id="customer-login-title"
            className="text-[17px] font-semibold leading-6 text-[#111] sm:text-[15px]"
          >
            Forgot Password
          </h2>

          <p className="mt-1.5 text-[13px] leading-5 text-[#666]">
            Create a new password for your account
          </p>

          <form
            onSubmit={handleForgotPassword}
            className="mt-5 flex flex-col md:flex-1"
          >
            <div className="relative rounded-[3px] border border-[#ef1b23] bg-[#fafafa]">
              <label
                htmlFor="forgot-password-user-id"
                className="absolute -top-2 left-2 bg-white px-1 text-[9px] font-medium leading-4 text-[#ef1b23]"
              >
                User ID
              </label>

              <input
                id="forgot-password-user-id"
                type="text"
                value={identifier}
                readOnly
                className="min-h-[52px] w-full border-0 bg-transparent px-3 py-3 text-[13px] text-[#212121] outline-none sm:min-h-[48px]"
              />
            </div>

            <div className="relative mt-4 rounded-[3px] border border-[#ef1b23] focus-within:ring-1 focus-within:ring-[#ef1b23]">
              <label
                htmlFor="forgot-new-password"
                className="absolute -top-2 left-2 bg-white px-1 text-[9px] font-medium leading-4 text-[#ef1b23]"
              >
                New Password
              </label>

              <div className="flex min-h-[52px] items-center px-3 sm:min-h-[48px]">
                <input
                  id="forgot-new-password"
                  type={
                    showPassword
                      ? "text"
                      : "password"
                  }
                  inputMode="numeric"
                  autoComplete="new-password"
                  maxLength={4}
                  value={password}
                  onChange={(event) => {
                    setPassword(
                      event.target.value
                        .replace(/\D/g, "")
                        .slice(0, 4)
                    );

                    setError("");
                  }}
                  placeholder="4-digit password"
                  className="min-w-0 flex-1 border-0 bg-transparent py-3 text-[13px] text-[#212121] outline-none placeholder:text-[#8a8a8a]"
                />

                <button
                  type="button"
                  aria-label={
                    showPassword
                      ? "Hide password"
                      : "Show password"
                  }
                  title={
                    showPassword
                      ? "Hide password"
                      : "Show password"
                  }
                  onClick={() =>
                    setShowPassword(
                      (current) =>
                        !current
                    )
                  }
                  className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-[#ef1b23] transition-colors hover:bg-red-50"
                >
                  {showPassword ? (
                    <svg
                      aria-hidden="true"
                      viewBox="0 0 24 24"
                      fill="none"
                      className="h-[19px] w-[19px]"
                      stroke="currentColor"
                      strokeWidth="1.8"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M3 3l18 18"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M6.2 6.2C4.2 7.6 3 10 3 12c0 2.9 3.6 8 9 8 1.6 0 3-.4 4.2-1"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M9.9 4.2A10.7 10.7 0 0 1 12 4c5.4 0 9 5.1 9 8 0 1.1-.5 2.5-1.5 3.8"
                      />
                    </svg>
                  ) : (
                    <svg
                      aria-hidden="true"
                      viewBox="0 0 24 24"
                      fill="none"
                      className="h-[19px] w-[19px]"
                      stroke="currentColor"
                      strokeWidth="1.8"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M2.5 12S6 5 12 5s9.5 7 9.5 7S18 19 12 19 2.5 12 2.5 12Z"
                      />
                      <circle
                        cx="12"
                        cy="12"
                        r="3"
                      />
                    </svg>
                  )}
                </button>
              </div>
            </div>

            <div className="relative mt-4 rounded-[3px] border border-[#ef1b23] focus-within:ring-1 focus-within:ring-[#ef1b23]">
              <label
                htmlFor="forgot-confirm-password"
                className="absolute -top-2 left-2 bg-white px-1 text-[9px] font-medium leading-4 text-[#ef1b23]"
              >
                Confirm Password
              </label>

              <div className="flex min-h-[52px] items-center px-3 sm:min-h-[48px]">
                <input
                  id="forgot-confirm-password"
                  type={
                    showPassword
                      ? "text"
                      : "password"
                  }
                  inputMode="numeric"
                  autoComplete="new-password"
                  maxLength={4}
                  value={confirmPassword}
                  onChange={(event) => {
                    setConfirmPassword(
                      event.target.value
                        .replace(/\D/g, "")
                        .slice(0, 4)
                    );

                    setError("");
                  }}
                  placeholder="Confirm 4-digit password"
                  className="min-w-0 flex-1 border-0 bg-transparent py-3 text-[13px] text-[#212121] outline-none placeholder:text-[#8a8a8a]"
                />
              </div>
            </div>

            <p className="mt-4 text-[11px] leading-[17px] text-[#777]">
              After you confirm your new password, a verification OTP will be sent to your registered User ID.
            </p>

            {error && (
              <p
                role="alert"
                className="mt-4 text-xs text-red-700"
              >
                {error}
              </p>
            )}

            <div className="h-5 md:min-h-8 md:flex-1" />

            <button
              type="submit"
              disabled={
                password.length !== 4 ||
                confirmPassword.length !== 4 ||
                sendingOtp
              }
              className="mt-5 min-h-[46px] w-full rounded-[4px] bg-[#ef1b23] px-4 py-2 text-[13px] font-semibold text-white transition-colors hover:bg-red-700 disabled:cursor-not-allowed disabled:bg-[#c4c4c4] md:min-h-[42px] md:rounded-[2px]"
            >
              {sendingOtp ? "Sending OTP..." : "Send OTP"}
            </button>
          </form>
        </>
      ) : step === "create-password" ? (
        <>
          <button
            type="button"
            onClick={() => {
              setPassword("");
              setConfirmPassword("");
              setShowPassword(false);
              setError("");
              setStep("login");
            }}
            className="mb-4 inline-flex w-fit items-center gap-1 text-[12px] font-semibold text-[#ef1b23] hover:underline"
          >
            ← Change {channel === "phone" ? "phone number" : "email"}
          </button>

          <h2
            id="customer-login-title"
            className="text-[17px] font-semibold leading-6 text-[#111] sm:text-[15px]"
          >
            Create your password
          </h2>

          <p className="mt-1.5 text-[13px] leading-5 text-[#666]">
            Create a 4-digit password for your City Coolies account
          </p>

          <p className="mt-2 break-all text-[12px] font-medium text-[#333]">
            {channel === "phone"
              ? `+91-${cleanPhone}`
              : identifier.trim()}
          </p>

          <form
            onSubmit={handleSendOtp}
            className="mt-5 flex flex-col md:flex-1"
          >
            <div className="relative rounded-[3px] border border-[#ef1b23] focus-within:ring-1 focus-within:ring-[#ef1b23]">
              <label
                htmlFor="customer-create-password"
                className="absolute -top-2 left-2 bg-white px-1 text-[9px] font-medium leading-4 text-[#ef1b23]"
              >
                Create Password
              </label>

              <div className="flex min-h-[52px] items-center px-3 sm:min-h-[48px]">
                <input
                  id="customer-create-password"
                  type={showPassword ? "text" : "password"}
                  inputMode="numeric"
                  autoComplete="new-password"
                  maxLength={4}
                  value={password}
                  disabled={sendingOtp}
                  onChange={(event) => {
                    setPassword(
                      event.target.value
                        .replace(/\D/g, "")
                        .slice(0, 4)
                    );
                    setError("");
                  }}
                  placeholder="Enter 4 digits"
                  className="min-w-0 flex-1 border-0 bg-transparent py-3 text-[15px] tracking-[0.3em] text-[#212121] outline-none disabled:cursor-not-allowed disabled:opacity-70"
                />

                <button
                  type="button"
                  aria-label={
                    showPassword
                      ? "Hide password"
                      : "Show password"
                  }
                  title={
                    showPassword
                      ? "Hide password"
                      : "Show password"
                  }
                  onClick={() =>
                    setShowPassword(
                      (current) => !current
                    )
                  }
                  className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-[#ef1b23] transition-colors hover:bg-red-50 focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-[#ef1b23]"
                >
                  {showPassword ? (
                    <svg
                      aria-hidden="true"
                      viewBox="0 0 24 24"
                      fill="none"
                      className="h-[19px] w-[19px]"
                      stroke="currentColor"
                      strokeWidth="1.8"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M3 3l18 18"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M10.6 10.7a2 2 0 0 0 2.7 2.7"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M9.9 4.2A10.7 10.7 0 0 1 12 4c5.4 0 9 5.1 9 8 0 1.1-.5 2.5-1.5 3.8"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M6.2 6.2C4.2 7.6 3 10 3 12c0 2.9 3.6 8 9 8 1.6 0 3-.4 4.2-1"
                      />
                    </svg>
                  ) : (
                    <svg
                      aria-hidden="true"
                      viewBox="0 0 24 24"
                      fill="none"
                      className="h-[19px] w-[19px]"
                      stroke="currentColor"
                      strokeWidth="1.8"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M2.5 12S6 5 12 5s9.5 7 9.5 7S18 19 12 19 2.5 12 2.5 12Z"
                      />
                      <circle
                        cx="12"
                        cy="12"
                        r="3"
                      />
                    </svg>
                  )}
                </button>
              </div>
            </div>

            <div className="relative mt-4 rounded-[3px] border border-[#ef1b23] focus-within:ring-1 focus-within:ring-[#ef1b23]">
              <label
                htmlFor="customer-confirm-password"
                className="absolute -top-2 left-2 bg-white px-1 text-[9px] font-medium leading-4 text-[#ef1b23]"
              >
                Confirm Password
              </label>

              <div className="flex min-h-[52px] items-center px-3 sm:min-h-[48px]">
                <input
                  id="customer-confirm-password"
                  type={showPassword ? "text" : "password"}
                  inputMode="numeric"
                  autoComplete="new-password"
                  maxLength={4}
                  value={confirmPassword}
                  disabled={sendingOtp}
                  onChange={(event) => {
                    setConfirmPassword(
                      event.target.value
                        .replace(/\D/g, "")
                        .slice(0, 4)
                    );
                    setError("");
                  }}
                  placeholder="Re-enter 4 digits"
                  className="min-w-0 flex-1 border-0 bg-transparent py-3 text-[15px] tracking-[0.3em] text-[#212121] outline-none disabled:cursor-not-allowed disabled:opacity-70"
                />
              </div>
            </div>

            {error && (
              <p
                role="alert"
                className="mt-4 text-xs text-red-700"
              >
                {error}
              </p>
            )}

            <p className="mt-5 text-[11px] leading-[17px] text-[#777]">
              After you confirm your password, we will send a verification OTP to your registered {channel === "phone" ? "phone number" : "email"}.
            </p>

            <div className="h-5 md:min-h-10 md:flex-1" />

            <button
              type="submit"
              disabled={
                password.length !== 4 ||
                confirmPassword.length !== 4 ||
                sendingOtp
              }
              className="mt-5 min-h-[46px] w-full rounded-[4px] bg-[#ef1b23] px-4 py-2 text-[13px] font-semibold text-white transition-colors hover:bg-red-700 disabled:cursor-not-allowed disabled:bg-[#c4c4c4] md:mt-6 md:min-h-[42px] md:rounded-[2px]"
            >
              {sendingOtp
                ? "Sending OTP..."
                : "Confirm"}
            </button>
          </form>
        </>
      ) : (
        <>
          <h2
            id="customer-login-title"
            className="text-[17px] font-semibold leading-6 text-[#111] sm:text-[15px]"
          >
            Please enter the verification code
          </h2>

          <p className="mt-2 break-words text-[13px] leading-5 text-[#212121] sm:text-[14px] sm:leading-6">
            Enter the 6-digit verification code for{" "}
            <span className="break-all font-medium">
              {destination}
            </span>{" "}
            <button
              type="button"
              disabled={
                verifyingOtp || resendingOtp
              }
              onClick={editDetails}
              className="font-medium text-[#ef1b23] hover:underline disabled:cursor-not-allowed disabled:opacity-60"
            >
              Edit
            </button>
          </p>

          <form
            onSubmit={handleVerify}
            className="mt-7 flex flex-col sm:mt-9 md:flex-1"
          >
            <div
              className="grid w-full grid-cols-6 gap-2.5 sm:flex sm:items-center sm:justify-between sm:gap-2"
              role="group"
              aria-label="Six-digit verification code"
            >
              {otp.map((digit, index) => (
                <input
                  key={index}
                  ref={(element) => {
                    otpRefs.current[index] = element;
                  }}
                  type="text"
                  inputMode="numeric"
                  pattern="[0-9]*"
                  autoComplete={
                    index === 0
                      ? "one-time-code"
                      : "off"
                  }
                  maxLength={6}
                  value={digit}
                  disabled={
                    verifyingOtp || resendingOtp
                  }
                  onChange={(event) =>
                    handleOtpChange(index, event)
                  }
                  onKeyDown={(event) =>
                    handleOtpKeyDown(index, event)
                  }
                  onPaste={(event) =>
                    handleOtpPaste(index, event)
                  }
                  aria-label={`OTP digit ${index + 1}`}
                  className="h-12 w-full min-w-0 border-0 border-b-2 border-[#dedede] bg-transparent px-0 text-center text-[20px] font-semibold text-[#212121] outline-none transition-colors focus:border-[#ef1b23] disabled:cursor-not-allowed disabled:opacity-60 sm:h-11 sm:max-w-[48px] sm:font-medium"
                />
              ))}
            </div>

            <div className="mt-3 flex justify-end">
              {secondsLeft > 0 ? (
                <span
                  className="text-[12px] text-[#555]"
                  aria-live="off"
                >
                  {`${String(Math.floor(secondsLeft / 60)).padStart(
                    2,
                    "0"
                  )}:${String(secondsLeft % 60).padStart(
                    2,
                    "0"
                  )}`}
                </span>
              ) : (
                <button
                  type="button"
                  onClick={resendOtp}
                  disabled={resendingOtp}
                  className="text-[12px] font-semibold text-[#ef1b23] hover:underline disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {resendingOtp
                    ? "Sending..."
                    : "Resend OTP"}
                </button>
              )}
            </div>

            {error && (
              <p
                role="alert"
                className="mt-5 text-[12px] leading-5 text-red-700"
              >
                {error}
              </p>
            )}

            <div className="h-5 md:min-h-10 md:flex-1" />

            <button
              type="submit"
              disabled={
                !completeOtp || verifyingOtp
              }
              className="mt-5 min-h-[46px] w-full rounded-[4px] bg-[#ef1b23] px-4 py-2 text-[13px] font-semibold text-white transition-colors hover:bg-red-700 disabled:cursor-not-allowed disabled:bg-[#c4c4c4] md:mt-6 md:min-h-[42px] md:rounded-[2px]"
            >
              {verifyingOtp
                ? "Verifying..."
                : "Verify"}
            </button>
          </form>
        </>
      )}
    </div>
  );

  if (embedded) return content;

  return (
    <dialog
      ref={dialogRef}
      aria-labelledby="customer-login-title"
      onCancel={(event) => {
        event.preventDefault();
        onClose();
      }}
      onClick={(event) => {
        if (event.target === event.currentTarget) {
          onClose();
        }
      }}
      className="fixed inset-0 m-auto max-h-[92dvh] w-[calc(100vw-24px)] max-w-[420px] overflow-y-auto rounded-xl border-0 bg-white p-0 text-gray-900 shadow-2xl backdrop:bg-black/50 sm:w-[92vw] sm:rounded-2xl"
    >
      {content}
    </dialog>
  );
}
