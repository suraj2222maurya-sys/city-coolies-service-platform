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
type Step = "login" | "otp";

type Props = {
  onClose: () => void;
  embedded?: boolean;
};

type OtpRequestResponse = {
  challenge_id: string;
  sent: boolean;
  channel: Channel;
  destination: string;
  expires_in: number;
  resend_after: number;
};

type OtpResendResponse = {
  sent: boolean;
  expires_in: number;
  resend_after: number;
};

type OtpVerifyResponse = {
  verified: boolean;
  authenticated: boolean;
  user: {
    channel: Channel;
    identifier: string;
  };
};

const OTP_LENGTH = 6;
const DEFAULT_RESEND_SECONDS = 60;

const API_BASE_URL =
  process.env.NEXT_PUBLIC_CITY_COOLIES_API_URL?.replace(/\/$/, "") ||
  "http://localhost:8001";

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

export default function CustomerLoginDialog({
  onClose,
  embedded = false,
}: Props) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const otpRefs = useRef<Array<HTMLInputElement | null>>([]);

  const [channel, setChannel] = useState<Channel>("phone");
  const [identifier, setIdentifier] = useState("");
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
  const [sendingOtp, setSendingOtp] = useState(false);
  const [verifyingOtp, setVerifyingOtp] = useState(false);
  const [resendingOtp, setResendingOtp] = useState(false);

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
    setStep("login");
    resetOtpInputs();
    setChallengeId("");
    setServerDestination("");
    setSecondsLeft(DEFAULT_RESEND_SECONDS);
    setError("");
  }

  function editDetails() {
    if (sendingOtp || verifyingOtp || resendingOtp) return;

    setStep("login");
    resetOtpInputs();
    setChallengeId("");
    setServerDestination("");
    setSecondsLeft(DEFAULT_RESEND_SECONDS);
    setError("");
  }

  async function handleContinue(
    event: FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();

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
        `${API_BASE_URL}/auth/otp/request`,
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
          }),
        }
      );

      const data = await readJson(response);

      if (!response.ok) {
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
          : "Unable to send OTP. Please try again."
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
      const response = await fetch(
        `${API_BASE_URL}/auth/otp/verify`,
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

      const result = data as OtpVerifyResponse;

      if (
        !result ||
        !result.verified ||
        !result.authenticated
      ) {
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

            <div className="mt-3 text-right sm:mt-4">
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
                className="text-[12px] font-semibold text-[#ef1b23] hover:underline disabled:cursor-not-allowed disabled:opacity-60"
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
              disabled={!canContinue || sendingOtp}
              className="mt-5 min-h-[46px] w-full rounded-[4px] bg-[#ef1b23] px-4 py-2 text-[13px] font-semibold text-white transition-colors hover:bg-red-700 disabled:cursor-not-allowed disabled:bg-[#c4c4c4] md:mt-6 md:min-h-[42px] md:rounded-[2px]"
            >
              {sendingOtp
                ? "Sending OTP..."
                : "Continue"}
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