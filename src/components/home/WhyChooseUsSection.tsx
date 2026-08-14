"use client";

import { useEffect, useRef, type ReactNode } from "react";
import Link from "next/link";

type IconProps = {
  className?: string;
};

type FeatureCard = {
  title: string;
  description: string;
  icon: ReactNode;
};

type PropertyType = {
  label: string;
  icon: ReactNode;
};

function UsersIcon({ className = "" }: IconProps) {
  return (
    <svg
      aria-hidden="true"
      className={className}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  );
}

function LocationIcon({ className = "" }: IconProps) {
  return (
    <svg
      aria-hidden="true"
      className={className}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M20 10c0 5-8 11-8 11S4 15 4 10a8 8 0 1 1 16 0Z" />
      <circle cx="12" cy="10" r="2.5" />
    </svg>
  );
}

function WorkerIcon({ className = "" }: IconProps) {
  return (
    <svg
      aria-hidden="true"
      className={className}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M6 10V8a6 6 0 0 1 12 0v2" />
      <path d="M4 10h16" />
      <path d="M9 4v6" />
      <path d="M15 4v6" />
      <circle cx="12" cy="14" r="3" />
      <path d="M6.5 22a5.5 5.5 0 0 1 11 0" />
    </svg>
  );
}

function QuoteIcon({ className = "" }: IconProps) {
  return (
    <svg
      aria-hidden="true"
      className={className}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h7" />
      <path d="M14 2v6h6" />
      <path d="M14 2l6 6v3" />
      <path d="M8 13h4" />
      <path d="M8 17h3" />
      <circle cx="17.5" cy="17.5" r="3.5" />
      <path d="M17.5 15.5v4" />
      <path d="M16.2 16.2h2.2" />
      <path d="M16.2 18.7h2.4" />
    </svg>
  );
}

function HomeIcon({ className = "" }: IconProps) {
  return (
    <svg
      aria-hidden="true"
      className={className}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m3 11 9-8 9 8" />
      <path d="M5 10v10h14V10" />
      <path d="M9 20v-6h6v6" />
    </svg>
  );
}

function BuildingIcon({ className = "" }: IconProps) {
  return (
    <svg
      aria-hidden="true"
      className={className}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M4 21V3h11v18" />
      <path d="M15 9h5v12" />
      <path d="M8 7h3" />
      <path d="M8 11h3" />
      <path d="M8 15h3" />
      <path d="M8 19h3" />
      <path d="M18 13h.01" />
      <path d="M18 17h.01" />
      <path d="M2 21h20" />
    </svg>
  );
}

function ShopIcon({ className = "" }: IconProps) {
  return (
    <svg
      aria-hidden="true"
      className={className}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M3 9 5 3h14l2 6" />
      <path d="M5 13v8h14v-8" />
      <path d="M9 21v-6h6v6" />
      <path d="M3 9a3 3 0 0 0 6 0 3 3 0 0 0 6 0 3 3 0 0 0 6 0" />
    </svg>
  );
}

function BriefcaseIcon({ className = "" }: IconProps) {
  return (
    <svg
      aria-hidden="true"
      className={className}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="3" y="7" width="18" height="13" rx="2" />
      <path d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
      <path d="M3 12h18" />
      <path d="M10 12v2h4v-2" />
    </svg>
  );
}

function ShieldIcon({ className = "" }: IconProps) {
  return (
    <svg
      aria-hidden="true"
      className={className}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z" />
      <path d="m9 12 2 2 4-4" />
    </svg>
  );
}

function ClockIcon({ className = "" }: IconProps) {
  return (
    <svg
      aria-hidden="true"
      className={className}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3 2" />
    </svg>
  );
}

function CheckIcon({ className = "" }: IconProps) {
  return (
    <svg
      aria-hidden="true"
      className={className}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m5 12 4 4L19 6" />
    </svg>
  );
}

const propertyTypes: PropertyType[] = [
  {
    label: "Homes",
    icon: <HomeIcon className="h-3 w-3" />,
  },
  {
    label: "Apartments",
    icon: <BuildingIcon className="h-3 w-3" />,
  },
  {
    label: "Shops",
    icon: <ShopIcon className="h-3 w-3" />,
  },
  {
    label: "Offices",
    icon: <BriefcaseIcon className="h-3 w-3" />,
  },
  {
    label: "Buildings",
    icon: <BuildingIcon className="h-3 w-3" />,
  },
];

const featureCards: FeatureCard[] = [
  {
    title: "For Every Need",
    description: "Small jobs to complete property work.",
    icon: <UsersIcon className="h-5 w-5" />,
  },
  {
    title: "At Your Place",
    description: "Service at your home, shop or office.",
    icon: <LocationIcon className="h-5 w-5" />,
  },
  {
    title: "Skilled Team",
    description: "Reliable and professional work.",
    icon: <WorkerIcon className="h-5 w-5" />,
  },
  {
    title: "Clear Quote",
    description: "Clear pricing before we start.",
    icon: <QuoteIcon className="h-5 w-5" />,
  },
];

export default function WhyChooseUsSection() {
  const sectionRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const section = sectionRef.current;

    if (!section) {
      return;
    }

    const animatedElements =
      section.querySelectorAll<HTMLElement>("[data-reveal]");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const element = entry.target as HTMLElement;

          if (entry.isIntersecting) {
            element.classList.add("is-visible");
          } else {
            element.classList.remove("is-visible");
          }
        });
      },
      {
        root: null,
        threshold: 0.14,
        rootMargin: "0px 0px -8% 0px",
      },
    );

    animatedElements.forEach((element) => observer.observe(element));

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="why-choose-section relative isolate overflow-hidden bg-white pb-24 pt-12 sm:pb-28 sm:pt-14 lg:pb-32 lg:pt-16"
      aria-labelledby="why-choose-heading"
    >
      {/* Soft background decoration */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10"
      >
        <div className="absolute left-0 top-0 h-[340px] w-[340px] -translate-x-1/2 -translate-y-1/3 rounded-full bg-red-50/80 blur-3xl" />

        <div className="absolute right-[-180px] top-[-120px] h-[520px] w-[520px] rounded-full border border-red-100/80" />
        <div className="absolute right-[-140px] top-[-80px] h-[440px] w-[440px] rounded-full border border-red-100/70" />
        <div className="absolute right-[-100px] top-[-40px] h-[360px] w-[360px] rounded-full border border-red-100/60" />

        <div className="absolute left-5 top-10 grid grid-cols-6 gap-4 opacity-70">
          {Array.from({ length: 24 }).map((_, index) => (
            <span
              key={index}
              className="h-1.5 w-1.5 rounded-full bg-red-200"
            />
          ))}
        </div>

        <div className="absolute bottom-[-286px] left-1/2 h-[400px] w-[138%] -translate-x-1/2 rounded-[50%] bg-[linear-gradient(180deg,#ff5a67_0%,#ef0012_36%,#be0010_100%)] shadow-[0_-26px_65px_rgba(239,0,18,0.22),inset_0_18px_28px_rgba(255,255,255,0.22),inset_0_-24px_38px_rgba(126,0,10,0.28)]" />
        <div className="absolute bottom-[-257px] left-1/2 h-[340px] w-[130%] -translate-x-1/2 rounded-[50%] bg-[linear-gradient(180deg,rgba(255,214,218,0.96)_0%,rgba(255,242,244,0.98)_54%,rgba(255,255,255,1)_100%)] shadow-[0_-15px_32px_rgba(239,0,18,0.10),inset_0_12px_20px_rgba(255,255,255,0.9)]" />
        <div className="absolute bottom-[-236px] left-1/2 h-[300px] w-[122%] -translate-x-1/2 rounded-[50%] bg-white shadow-[0_-12px_30px_rgba(255,255,255,0.95)]" />
        <div className="absolute bottom-[20px] left-1/2 h-[3px] w-[70%] -translate-x-1/2 rounded-full bg-[linear-gradient(90deg,transparent,rgba(255,255,255,0.95),transparent)] blur-[1px]" />
      </div>

      <div className="relative z-10 mx-auto w-full max-w-[1240px] px-5 sm:px-8 lg:px-10">
        {/* Section label */}
        <div
          data-reveal
          className="reveal-item mx-auto flex w-fit items-center gap-2 rounded-full border border-red-200 bg-white/90 px-5 py-2.5 shadow-[0_12px_35px_rgba(239,68,68,0.08)] backdrop-blur"
          style={{ "--delay": "0ms" } as React.CSSProperties}
        >
          <span className="flex h-7 w-7 items-center justify-center rounded-full bg-red-600 text-white shadow-[0_6px_16px_rgba(220,38,38,0.28)]">
            <ShieldIcon className="h-4 w-4" />
          </span>

          <span className="text-xs font-extrabold uppercase tracking-[0.18em] text-red-600 sm:text-sm">
            Why Choose City Coolies
          </span>
        </div>

        {/* Heading */}
        <div className="mx-auto mt-7 max-w-4xl text-center">
          <h2
            id="why-choose-heading"
            data-reveal
            className="reveal-item text-3xl font-bold leading-[1.15] tracking-[-0.025em] text-neutral-950 sm:text-4xl lg:text-[46px]"
            style={{ "--delay": "100ms" } as React.CSSProperties}
          >
            Need a Service?{" "}
            <span className="text-red-600">We Come to You.</span>
          </h2>

          <div
            data-reveal
           className="reveal-item mx-auto mt-3 h-1 w-16 rounded-full bg-red-600"
            style={{ "--delay": "180ms" } as React.CSSProperties}
          />

          <p
  data-reveal
  className="reveal-item mx-auto mt-3 max-w-3xl text-base font-medium leading-7 text-neutral-600 sm:text-lg"
  style={{ "--delay": "240ms" } as React.CSSProperties}
>
  Choose the service you need. Our team visits your home, shop,
  office or property and gets the work done professionally.
</p>
        </div>

        {/* Property types */}
        <div className="mt-4 flex flex-wrap items-center justify-center gap-3">
          {propertyTypes.map((property, index) => (
            <div
              key={property.label}
              data-reveal
              className="reveal-item group flex min-w-[135px] items-center justify-center gap-2.5 rounded-2xl border border-red-100 bg-white px-5 py-3 text-neutral-900 shadow-[0_10px_30px_rgba(15,23,42,0.05)] transition duration-300 hover:-translate-y-1 hover:border-red-300 hover:shadow-[0_16px_35px_rgba(239,68,68,0.12)]"
              style={
                {
                  "--delay": `${300 + index * 70}ms`,
                } as React.CSSProperties
              }
            >
              <span className="text-red-600 transition-transform duration-300 group-hover:scale-110">
                {property.icon}
              </span>

              <span className="text-sm font-bold sm:text-base">
                {property.label}
              </span>
            </div>
          ))}
        </div>

        {/* Main cards */}
        <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
          {featureCards.map((card, index) => (
            <article
              key={card.title}
              data-reveal
              className="reveal-card group relative h-full overflow-hidden rounded-[24px] border border-red-100 bg-white px-5 py-7 text-center shadow-[0_14px_40px_rgba(15,23,42,0.05)] transition duration-500 hover:-translate-y-2 hover:border-red-200 hover:shadow-[0_22px_52px_rgba(239,68,68,0.12)] sm:px-6 sm:py-8"
              style={
                {
                  "--delay": `${430 + index * 100}ms`,
                } as React.CSSProperties
              }
            >
              <div
                aria-hidden="true"
                className="absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-red-300 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100"
              />

              <div className="mx-auto flex h-[72px] w-[72px] items-center justify-center rounded-full border border-red-100 bg-red-50 text-red-600 shadow-[0_10px_24px_rgba(239,68,68,0.08)] transition duration-500 group-hover:scale-110 group-hover:bg-red-600 group-hover:text-white">
                {card.icon}
              </div>

              <h3 className="mt-5 text-[22px] font-extrabold leading-tight tracking-[-0.02em] text-neutral-950 sm:text-[24px]">
                {card.title}
              </h3>

              <span className="mx-auto mt-3 block h-0.5 w-8 rounded-full bg-red-600 transition-all duration-500 group-hover:w-12" />

              <p className="mx-auto mt-3 max-w-[210px] text-[15px] font-medium leading-7 text-neutral-600">
                {card.description}
              </p>
            </article>
          ))}
        </div>

        {/* Trust strip */}
        <div
          data-reveal
        className="reveal-item mt-4 grid overflow-hidden rounded-[22px] border border-red-100 bg-white/95 shadow-[0_14px_40px_rgba(15,23,42,0.045)] backdrop-blur sm:grid-cols-3"
          style={{ "--delay": "850ms" } as React.CSSProperties}
        >
           <div className="flex items-center justify-center gap-3.5 px-5 py-3.5">
            <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-red-100 bg-red-50 text-red-600">
              <HomeIcon className="h-4 w-4" />
            </span>

            <div>
              <p className="font-extrabold text-neutral-950">
                Home to Business
              </p>
              <p className="mt-0.5 text-sm text-neutral-500">
                Service for every property
              </p>
            </div>
          </div>

         <div className="flex items-center justify-center gap-3.5 border-y border-red-100 px-5 py-3.5 sm:border-x sm:border-y-0">
            <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-red-100 bg-red-50 text-red-600">
              <ClockIcon className="h-4 w-4" />
            </span>

            <div>
              <p className="font-extrabold text-neutral-950">
                On-Time Support
              </p>
              <p className="mt-0.5 text-sm text-neutral-500">
                Quick and dependable response
              </p>
            </div>
          </div>

          <div className="flex items-center justify-center gap-3.5 px-5 py-3.5">
            <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-red-100 bg-red-50 text-red-600"
            >
              <CheckIcon className="h-4 w-4" />
            </span>

            <div>
              <p className="font-extrabold text-neutral-950">
                Trusted Service
              </p>
              <p className="mt-0.5 text-sm text-neutral-500">
                Professional work you can rely on
              </p>
            </div>
          </div>
        </div>

        {/* Bottom conversion line */}
        <div
  data-reveal
  className="reveal-item relative z-20 mx-auto mt-3 flex max-w-2xl items-center justify-center gap-3 pb-1 text-center text-base font-medium text-neutral-600 sm:text-lg"
  style={{ "--delay": "940ms" } as React.CSSProperties}
>
  <Link
    href="/services"
    aria-label="View all City Coolies services"
    className="group flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-red-200 bg-white text-red-600 shadow-sm transition duration-300 hover:border-red-600 hover:bg-red-600 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2"
  >
    <svg
      aria-hidden="true"
      className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M5 12h14" />
      <path d="m13 6 6 6-6 6" />
    </svg>
  </Link>

  <p>
    Book the service you need.{" "}
    <span className="font-extrabold text-red-600">City Coolies</span>{" "}
    will come to your location.
  </p>
</div>
      </div>

      <style jsx>{`
        .reveal-item,
        .reveal-card {
          opacity: 0;
          transform: translate3d(0, 42px, 0);
          filter: blur(7px);
          transition:
            opacity 900ms cubic-bezier(0.16, 1, 0.3, 1),
            transform 900ms cubic-bezier(0.16, 1, 0.3, 1),
            filter 900ms cubic-bezier(0.16, 1, 0.3, 1);
          transition-delay: var(--delay, 0ms);
          will-change: opacity, transform, filter;
        }

        .reveal-card {
          transform: translate3d(0, 58px, 0) scale(0.97);
        }

        .reveal-item.is-visible,
        .reveal-card.is-visible {
          opacity: 1;
          transform: translate3d(0, 0, 0) scale(1);
          filter: blur(0);
        }

        @media (prefers-reduced-motion: reduce) {
          .reveal-item,
          .reveal-card {
            opacity: 1;
            transform: none;
            filter: none;
            transition: none;
          }
        }
      `}</style>
    </section>
  );
}