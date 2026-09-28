"use client";

import { useRouter } from "next/navigation";
import {
  type FormEvent,
  type ReactNode,
  useEffect,
  useRef,
  useState,
  useSyncExternalStore,
} from "react";

import {
  getDeepCleaningCartServerSnapshot,
  getDeepCleaningCartSnapshot,
  parseDeepCleaningCartSnapshot,
  subscribeDeepCleaningCart,
} from "../app/services/deep-cleaning/deepCleaningCart";

type OpenPanel = "location" | "cart" | "account" | null;

type IconProps = {
  className?: string;
};

function LocationIcon({ className = "h-5 w-5" }: IconProps) {
  return (
    <svg
      aria-hidden="true"
      className={className}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth="1.8"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M12 21s7-5.686 7-12A7 7 0 1 0 5 9c0 6.314 7 12 7 12Z"
      />
      <circle cx="12" cy="9" r="2.4" />
    </svg>
  );
}

function SearchIcon({ className = "h-5 w-5" }: IconProps) {
  return (
    <svg
      aria-hidden="true"
      className={className}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth="1.8"
    >
      <circle cx="11" cy="11" r="7" />
      <path strokeLinecap="round" d="m20 20-4-4" />
    </svg>
  );
}

function CartIcon({ className = "h-5 w-5" }: IconProps) {
  return (
    <svg
      aria-hidden="true"
      className={className}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth="1.8"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M3 4h2l1.6 10.1a2 2 0 0 0 2 1.7h7.8a2 2 0 0 0 2-1.6L20 7H6"
      />
      <circle cx="9" cy="20" r="1" />
      <circle cx="17" cy="20" r="1" />
    </svg>
  );
}

function AccountIcon({ className = "h-5 w-5" }: IconProps) {
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

function ChevronIcon() {
  return (
    <svg
      aria-hidden="true"
      className="h-4 w-4 shrink-0"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth="2"
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="m6 9 6 6 6-6" />
    </svg>
  );
}

type ToolButtonProps = {
  label: string;
  expanded: boolean;
  onClick: () => void;
  children: ReactNode;
  showCartCount?: boolean;
  cartCount?: number;
};

function ToolButton({
  label,
  expanded,
  onClick,
  children,
  showCartCount = false,
  cartCount = 0,
}: ToolButtonProps) {
  return (
    <button
      type="button"
      aria-label={label}
      aria-expanded={expanded}
      aria-controls="services-marketplace-panel"
      onClick={onClick}
      className="relative flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-[#dedede] bg-white text-[#202124] transition-colors duration-200 hover:border-[#ef1b23] hover:bg-red-50 hover:text-[#ef1b23] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#ef1b23] sm:h-11 sm:w-11"
    >
      {children}

      {showCartCount && (
        <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-[#ef1b23] px-1 text-[10px] font-bold text-white">
          {cartCount}
        </span>
      )}
    </button>
  );
}

export default function ServicesMarketplaceNavbar() {
  const router = useRouter();

  const cartSnapshot = useSyncExternalStore(
    subscribeDeepCleaningCart,
    getDeepCleaningCartSnapshot,
    getDeepCleaningCartServerSnapshot,
  );

  const cartItems =
    parseDeepCleaningCartSnapshot(
      cartSnapshot,
    );

  const cartCount = cartItems.length;

  const toolbarRef = useRef<HTMLElement>(null);
  const [openPanel, setOpenPanel] = useState<OpenPanel>(null);
  const [location, setLocation] = useState("Select location");
  const [locationDraft, setLocationDraft] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const handlePointerDown = (event: PointerEvent) => {
      if (
        toolbarRef.current &&
        !toolbarRef.current.contains(event.target as Node)
      ) {
        setOpenPanel(null);
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpenPanel(null);
      }
    };

    document.addEventListener("pointerdown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("pointerdown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const togglePanel = (panel: Exclude<OpenPanel, null>) => {
    setOpenPanel((current) => (current === panel ? null : panel));
  };

  const handleLocationSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const nextLocation = locationDraft.trim();

    if (!nextLocation) {
      return;
    }

    setLocation(nextLocation);
    setLocationDraft("");
    setOpenPanel(null);
  };

  const handleSearchSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const query = searchQuery.trim();

    router.push(
      query
        ? `/services?search=${encodeURIComponent(query)}`
        : "/services",
    );
  };

  const locationExpanded = openPanel === "location";
  const cartExpanded = openPanel === "cart";
  const accountExpanded = openPanel === "account";

  return (
    <section
      ref={toolbarRef}
      aria-label="Services marketplace tools"
      className="relative border-b border-[#e8e8e8] bg-white shadow-[0_14px_35px_-30px_rgba(40,40,40,0.4)]"
    >
      <div className="mx-auto flex h-[72px] max-w-[1480px] items-center gap-2 px-3 sm:gap-3 sm:px-6 lg:h-[76px] lg:px-10">
        <button
          type="button"
          aria-expanded={locationExpanded}
          aria-controls="services-marketplace-panel"
          onClick={() => togglePanel("location")}
          className="flex h-11 min-w-0 flex-[0.9] items-center gap-2 rounded-xl border border-[#dedede] bg-white px-3 text-left text-[13px] text-[#666] transition-colors hover:border-[#ef1b23] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#ef1b23] sm:flex-[0.75] sm:px-4 sm:text-[14px] lg:h-12 lg:max-w-[360px]"
        >
          <LocationIcon className="h-4 w-4 shrink-0 sm:h-5 sm:w-5" />
          <span className="min-w-0 flex-1 truncate">{location}</span>
          <ChevronIcon />
        </button>

        <form
          onSubmit={handleSearchSubmit}
          className="relative min-w-0 flex-[1.1] lg:flex-1"
          role="search"
        >
          <label htmlFor="services-marketplace-search" className="sr-only">
            Search City Coolies services
          </label>

          <SearchIcon className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#666] sm:left-4 sm:h-5 sm:w-5" />

          <input
            id="services-marketplace-search"
            type="search"
            value={searchQuery}
            onChange={(event) => setSearchQuery(event.target.value)}
            placeholder="Search services"
            autoComplete="off"
            className="h-11 w-full rounded-xl border border-[#dedede] bg-white pl-9 pr-3 text-[16px] text-[#202124] outline-none transition-colors placeholder:text-[#777] focus:border-[#ef1b23] focus:ring-2 focus:ring-red-100 sm:pl-12 sm:pr-4 lg:h-12"
          />
        </form>

        <ToolButton
          label="Open service cart"
          expanded={cartExpanded}
          onClick={() => togglePanel("cart")}
          showCartCount
          cartCount={cartCount}
        >
          <CartIcon className="h-4 w-4 sm:h-5 sm:w-5" />
        </ToolButton>

        <ToolButton
          label="Open customer account"
          expanded={accountExpanded}
          onClick={() => togglePanel("account")}
        >
          <AccountIcon className="h-4 w-4 sm:h-5 sm:w-5" />
        </ToolButton>
      </div>

      {openPanel !== null && (
        <div
          id="services-marketplace-panel"
          className="absolute inset-x-0 top-full border-t border-red-100 bg-white shadow-[0_24px_45px_-24px_rgba(35,35,35,0.28)]"
        >
          <div className="mx-auto max-w-[1480px] px-4 py-4 sm:px-6 lg:px-10">
            {openPanel === "location" && (
              <div className="max-w-2xl">
                <p className="mb-1 text-[16px] font-semibold text-[#202124]">
                  Select your service location
                </p>
                <p className="mb-3 text-[13px] text-[#666]">
                  Enter any city, area or PIN code across India.
                </p>

                <form
                  onSubmit={handleLocationSubmit}
                  className="flex flex-col gap-2 sm:flex-row"
                >
                  <label
                    htmlFor="services-location-input"
                    className="sr-only"
                  >
                    City, area or PIN code
                  </label>

                  <input
                    id="services-location-input"
                    value={locationDraft}
                    onChange={(event) =>
                      setLocationDraft(event.target.value)
                    }
                    placeholder="Enter city, area or PIN code"
                    autoComplete="postal-code"
                    className="h-12 min-w-0 flex-1 rounded-xl border border-[#dedede] px-4 text-[16px] text-[#202124] outline-none placeholder:text-[#777] focus:border-[#ef1b23] focus:ring-2 focus:ring-red-100"
                  />

                  <button
                    type="submit"
                    disabled={!locationDraft.trim()}
                    className="h-12 rounded-xl bg-[#ef1b23] px-6 text-[14px] font-bold text-white transition-colors hover:bg-[#d9161e] disabled:cursor-not-allowed disabled:opacity-45"
                  >
                    Apply location
                  </button>
                </form>
              </div>
            )}

            {openPanel === "cart" && (
              <div className="flex min-h-24 items-center gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-red-50 text-[#ef1b23]">
                  <CartIcon />
                </div>

                <div>
                  <p className="text-[16px] font-semibold text-[#202124]">
                    Your service cart is empty
                  </p>
                  <p className="mt-1 text-[13px] text-[#666]">
                    Services added during booking will appear here.
                  </p>
                </div>
              </div>
            )}

            {openPanel === "account" && (
              <div className="flex min-h-24 items-center gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-red-50 text-[#ef1b23]">
                  <AccountIcon />
                </div>

                <div>
                  <p className="text-[16px] font-semibold text-[#202124]">
                    Customer account
                  </p>
                  <p className="mt-1 text-[13px] text-[#666]">
                    Sign-in and booking history will be connected during the backend stage.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </section>
  );
}