"use client";

import CustomerLoginDialog from "../../components/CustomerLoginDialog";

export default function LoginPage() {
  return (
    <main className="flex min-h-[540px] w-full items-start justify-center bg-[#f1f3f6] px-3 py-4 sm:px-4 sm:py-8">
      <section
        aria-label="City Coolies customer login"
        className="grid w-full max-w-[680px] overflow-hidden rounded-[12px] border border-[#e5e7eb] bg-white shadow-[0_6px_24px_rgba(0,0,0,0.09)] sm:rounded-[8px] md:min-h-[480px] md:grid-cols-[40%_60%] md:rounded-[2px] md:shadow-sm"
      >
        <aside className="relative min-h-[174px] overflow-hidden bg-[#ef1b23] px-5 py-6 text-white sm:px-7 sm:py-8 md:flex md:min-h-0 md:flex-col md:justify-between">
          <div className="relative z-10 max-w-[190px] sm:max-w-[220px] md:max-w-none">
            <h1 className="text-[27px] font-semibold leading-8 sm:text-[26px]">
              Login
            </h1>

            <p className="mt-2.5 text-[14px] leading-[21px] text-white/95 sm:mt-4 sm:text-[17px] sm:leading-6">
              Login to access your profile, service bookings and account details
            </p>
          </div>

          <svg
            aria-hidden="true"
            viewBox="0 0 240 170"
            className="absolute -bottom-2 right-1 z-0 w-[128px] opacity-95 sm:right-3 sm:w-[142px] md:static md:mb-4 md:mt-12 md:w-full md:opacity-100"
            fill="none"
          >
            <circle
              cx="126"
              cy="103"
              r="63"
              fill="white"
              fillOpacity="0.12"
            />
            <circle
              cx="158"
              cy="32"
              r="12"
              fill="#ffd541"
            />
            <path
              d="M154 50h33a11 11 0 000-22 12 12 0 00-23-4 10 10 0 00-10 26"
              fill="#a90e15"
            />
            <rect
              x="32"
              y="91"
              width="33"
              height="52"
              rx="2"
              fill="#a90e15"
            />
            <path
              d="M41 94v-9a8 8 0 0116 0v9"
              stroke="white"
              strokeWidth="2"
            />
            <rect
              x="22"
              y="110"
              width="36"
              height="42"
              rx="2"
              fill="#ff6970"
            />
            <path
              d="M33 125c-5-6-12 2 6 13 18-11 11-19 6-13l-6 5-6-5"
              fill="white"
            />
            <rect
              x="72"
              y="78"
              width="94"
              height="69"
              rx="4"
              fill="#30343b"
            />
            <rect
              x="78"
              y="84"
              width="82"
              height="56"
              fill="#f1f3f6"
            />
            <circle
              cx="119"
              cy="104"
              r="8"
              fill="#bcc1c7"
            />
            <path
              d="M105 130v-6a14 14 0 0128 0v6"
              fill="#bcc1c7"
            />
            <path
              d="M61 147h116l-7 7H67l-6-7z"
              fill="white"
            />
            <rect
              x="174"
              y="115"
              width="32"
              height="38"
              fill="#ffd541"
            />
            <path
              d="M182 129l5 5 11-12"
              stroke="#a90e15"
              strokeWidth="3"
            />
            <path
              d="M12 155h213"
              stroke="#a90e15"
              strokeWidth="6"
            />
          </svg>
        </aside>

        <CustomerLoginDialog
          embedded
          onClose={() => {}}
        />
      </section>
    </main>
  );
}