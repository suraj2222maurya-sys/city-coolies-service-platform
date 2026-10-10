"use client";

import { useRouter } from "next/navigation";
import {
  useEffect,
  useRef,
  useState,
} from "react";

type AccountUser = {
  channel: "phone" | "email";
  identifier: string;
};

type MeResponse = {
  authenticated: boolean;
  user: AccountUser;
};

type Variant = "icon" | "pill";

type Props = {
  variant?: Variant;
};

const API_BASE_URL =
  process.env.NEXT_PUBLIC_CITY_COOLIES_API_URL
    ?.replace(/\/$/, "") ||
  "http://localhost:8001";

function UserIcon({
  className = "h-5 w-5",
}: {
  className?: string;
}) {
  return (
    <svg
      aria-hidden="true"
      className={className}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth="1.8"
    >
      <circle cx="12" cy="8" r="4" />
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M4.5 21a7.5 7.5 0 0 1 15 0"
      />
    </svg>
  );
}

function ChevronIcon({
  open,
}: {
  open: boolean;
}) {
  return (
    <svg
      aria-hidden="true"
      className={`h-4 w-4 transition-transform duration-200 ${
        open ? "rotate-180" : ""
      }`}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth="2"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="m6 9 6 6 6-6"
      />
    </svg>
  );
}

function MenuIcon({
  type,
}: {
  type:
    | "profile"
    | "bookings"
    | "payment"
    | "wallet"
    | "address"
    | "notification"
    | "logout";
}) {
  const common =
    "h-[19px] w-[19px] shrink-0";

  if (type === "profile") {
    return <UserIcon className={common} />;
  }

  if (type === "bookings") {
    return (
      <svg
        aria-hidden="true"
        className={common}
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth="1.7"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M4 7.5 12 3l8 4.5v9L12 21l-8-4.5v-9Z"
        />
        <path d="m4 7.5 8 4.5 8-4.5M12 12v9" />
      </svg>
    );
  }

  if (type === "payment") {
    return (
      <svg
        aria-hidden="true"
        className={common}
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth="1.7"
      >
        <rect
          x="3"
          y="5"
          width="18"
          height="14"
          rx="2.5"
        />
        <path d="M3 9h18M7 15h4" />
      </svg>
    );
  }

  if (type === "wallet") {
    return (
      <svg
        aria-hidden="true"
        className={common}
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth="1.7"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M4 6.5A2.5 2.5 0 0 1 6.5 4H19a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H6.5A2.5 2.5 0 0 1 4 17.5v-11Z"
        />
        <path d="M4 8h17M16 13h5v4h-5a2 2 0 1 1 0-4Z" />
      </svg>
    );
  }

  if (type === "address") {
    return (
      <svg
        aria-hidden="true"
        className={common}
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth="1.7"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M12 21s7-5.7 7-12A7 7 0 1 0 5 9c0 6.3 7 12 7 12Z"
        />
        <circle cx="12" cy="9" r="2.3" />
      </svg>
    );
  }

  if (type === "notification") {
    return (
      <svg
        aria-hidden="true"
        className={common}
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth="1.7"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9ZM10 21h4"
        />
      </svg>
    );
  }

  return (
    <svg
      aria-hidden="true"
      className={common}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth="1.8"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M10 5H5v14h5M14 8l4 4-4 4M18 12H9"
      />
    </svg>
  );
}

function getCustomerName(user: AccountUser) {
  if (user.channel === "email") {
    const local =
      user.identifier.split("@")[0] || "Customer";

    const cleaned = local
      .replace(/[._-]+/g, " ")
      .trim();

    if (!cleaned) return "Customer";

    return cleaned
      .split(/\s+/)
      .slice(0, 2)
      .map(
        (word) =>
          word.charAt(0).toUpperCase() +
          word.slice(1)
      )
      .join(" ");
  }

  const digits =
    user.identifier.replace(/\D/g, "");

  return digits.length >= 4
    ? `Customer Ã¢â‚¬Â¢${digits.slice(-4)}`
    : "Customer";
}

const menuItems = [
  {
    label: "My Profile",
    icon: "profile",
  },
  {
    label: "My Bookings",
    icon: "bookings",
  },
  {
    label: "Payment History",
    icon: "payment",
  },
  {
    label: "Wallet",
    icon: "wallet",
  },
  {
    label: "Saved Addresses",
    icon: "address",
  },
  {
    label: "Notifications",
    icon: "notification",
  },
] as const;

export default function CustomerAccountControl({
  variant = "icon",
}: Props) {
  const router = useRouter();
  const wrapperRef =
    useRef<HTMLDivElement>(null);

  const [user, setUser] =
    useState<AccountUser | null>(null);

  const [loading, setLoading] =
    useState(true);

  const [open, setOpen] =
    useState(false);

  const [loggingOut, setLoggingOut] =
    useState(false);

  async function loadSession() {
    try {
      const response = await fetch(
        `${API_BASE_URL}/auth/me`,
        {
          method: "GET",
          credentials: "include",
          cache: "no-store",
        }
      );

      if (!response.ok) {
        setUser(null);
        return;
      }

      const data =
        (await response.json()) as MeResponse;

      if (
        data?.authenticated &&
        data?.user?.identifier
      ) {
        setUser(data.user);
      } else {
        setUser(null);
      }
    } catch {
      setUser(null);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    void loadSession();

    const handleAuthChanged = () => {
      setLoading(true);
      void loadSession();
    };

    window.addEventListener(
      "city-coolies-auth-changed",
      handleAuthChanged
    );

    return () => {
      window.removeEventListener(
        "city-coolies-auth-changed",
        handleAuthChanged
      );
    };
  }, []);

  useEffect(() => {
    if (!open) return;

    const handlePointerDown = (
      event: PointerEvent
    ) => {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(
          event.target as Node
        )
      ) {
        setOpen(false);
      }
    };

    const handleKeyDown = (
      event: KeyboardEvent
    ) => {
      if (event.key === "Escape") {
        setOpen(false);
      }
    };

    document.addEventListener(
      "pointerdown",
      handlePointerDown
    );

    document.addEventListener(
      "keydown",
      handleKeyDown
    );

    return () => {
      document.removeEventListener(
        "pointerdown",
        handlePointerDown
      );

      document.removeEventListener(
        "keydown",
        handleKeyDown
      );
    };
  }, [open]);

  function handleAccountClick() {
    if (loading) return;

    if (!user) {
      router.push("/login");
      return;
    }

    setOpen((current) => !current);
  }

  async function handleLogout() {
    if (loggingOut) return;

    setLoggingOut(true);

    try {
      const response = await fetch(
        `${API_BASE_URL}/auth/logout`,
        {
          method: "POST",
          credentials: "include",
        }
      );

      if (!response.ok) {
        throw new Error(
          "Unable to log out."
        );
      }

      setUser(null);
      setOpen(false);

      window.dispatchEvent(
        new Event(
          "city-coolies-auth-changed"
        )
      );

      router.push("/services");
      router.refresh();
    } catch {
      setOpen(false);
    } finally {
      setLoggingOut(false);
    }
  }

  const loggedIn = Boolean(user);

  const customerName = user
    ? getCustomerName(user)
    : "Login";

  return (
    <div
      ref={wrapperRef}
      className="relative shrink-0"
    >
      {variant === "pill" ? (
        <button
          type="button"
          disabled={loading}
          aria-haspopup="menu"
          aria-expanded={open}
          onClick={handleAccountClick}
          className={`group flex min-h-12 items-center gap-2.5 rounded-full border bg-white px-4 transition-all duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#ef1b23] disabled:cursor-wait disabled:opacity-70 ${
            loggedIn
              ? "border-[#ef1b23]/35 text-[#202124] shadow-[0_10px_24px_-18px_rgba(239,27,35,0.7)] hover:border-[#ef1b23] hover:bg-red-50"
              : "border-[#dedede] text-[#202124] hover:border-[#ef1b23] hover:text-[#ef1b23]"
          }`}
        >
          <span className="relative flex h-8 w-8 items-center justify-center rounded-full bg-red-50 text-[#ef1b23]">
            <UserIcon className="h-[18px] w-[18px]" />

            {loggedIn && (
              <span
                aria-label="Logged in"
                className="absolute -right-0.5 -top-0.5 h-2.5 w-2.5 rounded-full border-2 border-white bg-emerald-500"
              />
            )}
          </span>

          <span className="hidden min-w-0 text-left 2xl:block">
            <span className="block max-w-[105px] truncate text-[12px] font-bold leading-4">
              {loggedIn
                ? customerName
                : "Login"}
            </span>

            <span
              className={`block text-[9px] font-semibold leading-3 ${
                loggedIn
                  ? "text-emerald-600"
                  : "text-[#777]"
              }`}
            >
              {loggedIn
                ? "Logged in"
                : "Customer account"}
            </span>
          </span>

          {loggedIn && (
            <ChevronIcon open={open} />
          )}
        </button>
      ) : (
        <button
          type="button"
          disabled={loading}
          aria-label={
            loggedIn
              ? "Open customer account"
              : "Customer login"
          }
          aria-haspopup={
            loggedIn ? "menu" : undefined
          }
          aria-expanded={
            loggedIn ? open : undefined
          }
          onClick={handleAccountClick}
          className={`relative flex h-10 w-10 shrink-0 items-center justify-center rounded-full border bg-white transition-all duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#ef1b23] disabled:cursor-wait disabled:opacity-70 sm:h-11 sm:w-11 ${
            loggedIn
              ? "border-[#ef1b23] bg-red-50 text-[#ef1b23] shadow-[0_8px_20px_-14px_rgba(239,27,35,0.9)]"
              : "border-[#dedede] text-[#202124] hover:border-[#ef1b23] hover:bg-red-50 hover:text-[#ef1b23]"
          }`}
        >
          <UserIcon className="h-4 w-4 sm:h-5 sm:w-5" />

          {loggedIn && (
            <span
              aria-label="Logged in"
              className="absolute -right-0.5 -top-0.5 h-3 w-3 rounded-full border-2 border-white bg-emerald-500"
            />
          )}
        </button>
      )}

      {open && user && (
        <div
          role="menu"
          aria-label="Customer account menu"
          className="absolute right-0 top-[calc(100%+10px)] z-[100] w-[310px] max-w-[calc(100vw-24px)] overflow-hidden rounded-2xl border border-[#e6e6e6] bg-white text-[#202124] shadow-[0_24px_60px_-18px_rgba(0,0,0,0.28)]"
        >
          <div className="border-b border-[#eeeeee] px-5 py-4">
            <p className="text-[15px] font-bold">
              Your Account
            </p>

            <div className="mt-3 flex items-center gap-3">
              <div className="relative flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-red-50 text-[#ef1b23]">
                <UserIcon />

                <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-white bg-emerald-500" />
              </div>

              <div className="min-w-0">
                <p className="truncate text-[14px] font-semibold">
                  {customerName}
                </p>

                <p className="mt-0.5 truncate text-[11px] text-[#666]">
                  {user.identifier}
                </p>

                <p className="mt-1 text-[10px] font-semibold text-emerald-600">
                  Verified customer
                </p>
              </div>
            </div>
          </div>

          <div className="py-2">
            {menuItems.map((item) => (
              <button
                key={item.label}
                type="button"
                role="menuitem"
                title="This section will be connected in the customer account stage."
                className="flex w-full items-center gap-3 px-5 py-3 text-left text-[14px] text-[#343434] transition-colors hover:bg-red-50 hover:text-[#ef1b23]"
              >
                <MenuIcon
                  type={item.icon}
                />

                <span className="flex-1">
                  {item.label}
                </span>
              </button>
            ))}
          </div>

          <div className="border-t border-[#eeeeee] p-2">
            <button
              type="button"
              role="menuitem"
              disabled={loggingOut}
              onClick={() => void handleLogout()}
              className="flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left text-[14px] font-semibold text-[#343434] transition-colors hover:bg-red-50 hover:text-[#ef1b23] disabled:cursor-wait disabled:opacity-60"
            >
              <MenuIcon type="logout" />

              <span>
                {loggingOut
                  ? "Logging out..."
                  : "Logout"}
              </span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
