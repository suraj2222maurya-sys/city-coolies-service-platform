"use client";

import Link from "next/link";
import {
  useEffect,
  useRef,
  type CSSProperties,
  type ReactNode,
} from "react";

type IconProps = {
  className?: string;
};

type TrustItem = {
  title: string;
  description: string;
  icon: ReactNode;
};

function ArrowIcon({ className = "" }: IconProps) {
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
      <path d="M5 12h14" />
      <path d="m13 6 6 6-6 6" />
    </svg>
  );
}

function PhoneIcon({ className = "" }: IconProps) {
  return (
    <svg
      aria-hidden="true"
      className={className}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth="1.9"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.79 19.79 0 0 1 2.12 4.18 2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.12.9.33 1.79.62 2.64a2 2 0 0 1-.45 2.11L8 9.75a16 16 0 0 0 6 6l1.28-1.28a2 2 0 0 1 2.11-.45c.85.29 1.74.5 2.64.62A2 2 0 0 1 22 16.92Z" />
    </svg>
  );
}

function MessageIcon({ className = "" }: IconProps) {
  return (
    <svg
      aria-hidden="true"
      className={className}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth="1.9"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M21 15a4 4 0 0 1-4 4H8l-5 3 1.6-4.8A8 8 0 1 1 21 15Z" />
      <path d="M8 11h8" />
      <path d="M8 15h5" />
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
      strokeWidth="1.9"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m3 11 9-8 9 8" />
      <path d="M5 10v10h14V10" />
      <path d="M9 20v-6h6v6" />
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
      strokeWidth="1.9"
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
      strokeWidth="1.9"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3 2" />
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
      strokeWidth="1.9"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M20 10c0 5-8 11-8 11S4 15 4 10a8 8 0 1 1 16 0Z" />
      <circle cx="12" cy="10" r="2.5" />
    </svg>
  );
}

const trustItems: TrustItem[] = [
  {
    title: "For Every Property",
    description: "Homes, shops, offices and large projects.",
    icon: <HomeIcon className="h-5 w-5" />,
  },
  {
    title: "Clear Process",
    description: "Inspection, quotation and approval before work.",
    icon: <ShieldIcon className="h-5 w-5" />,
  },
  {
    title: "24/7 Support",
    description: "Service support when you need assistance.",
    icon: <ClockIcon className="h-5 w-5" />,
  },
];

export default function FinalCtaSection() {
  const sectionRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const section = sectionRef.current;

    if (!section) {
      return;
    }

    const elements =
      section.querySelectorAll<HTMLElement>("[data-cta-reveal]");

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
        threshold: 0.16,
        rootMargin: "0px 0px -8% 0px",
      },
    );

    elements.forEach((element) => observer.observe(element));

    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="final-cta-section relative isolate overflow-hidden bg-white py-16 sm:py-20 lg:py-24"
      aria-labelledby="final-cta-heading"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
      >
        <div className="absolute left-[-170px] top-[-120px] h-[420px] w-[420px] rounded-full bg-red-50 blur-3xl" />
        <div className="absolute bottom-[-190px] right-[-140px] h-[460px] w-[460px] rounded-full bg-red-50/80 blur-3xl" />

        <div className="absolute right-6 top-8 grid grid-cols-6 gap-4 opacity-60">
          {Array.from({ length: 24 }).map((_, index) => (
            <span
              key={index}
              className="h-1.5 w-1.5 rounded-full bg-red-200"
            />
          ))}
        </div>
      </div>

      <div className="relative z-10 mx-auto w-full max-w-[1240px] px-5 sm:px-8 lg:px-10">
        <div
          data-cta-reveal
          className="cta-reveal relative overflow-hidden rounded-[34px] border border-red-500/30 bg-gradient-to-br from-red-600 via-red-600 to-red-700 px-6 py-10 shadow-[0_30px_90px_rgba(220,38,38,0.28)] sm:px-10 sm:py-12 lg:px-14 lg:py-14"
          style={{ "--delay": "0ms" } as CSSProperties}
        >
          <div
            aria-hidden="true"
            className="absolute inset-0 overflow-hidden"
          >
            <div className="absolute left-[-120px] top-[-150px] h-[360px] w-[360px] rounded-full border border-white/20" />
            <div className="absolute left-[-80px] top-[-110px] h-[280px] w-[280px] rounded-full border border-white/15" />
            <div className="absolute bottom-[-170px] right-[-80px] h-[390px] w-[390px] rounded-full bg-white/10 blur-2xl" />

            <div className="cta-wave absolute inset-x-0 bottom-0 h-28 opacity-90">
              <span className="absolute bottom-[-72px] left-1/2 h-40 w-[125%] -translate-x-1/2 rounded-[50%] bg-white/10 shadow-[inset_0_18px_35px_rgba(255,255,255,0.08)]" />
              <span className="absolute bottom-[-92px] left-1/2 h-40 w-[118%] -translate-x-1/2 rounded-[50%] bg-red-950/20 shadow-[0_-16px_35px_rgba(127,29,29,0.18)]" />
              <span className="absolute bottom-[-112px] left-1/2 h-40 w-[110%] -translate-x-1/2 rounded-[50%] bg-white/10" />
            </div>

            <div className="absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-white/70 to-transparent" />
          </div>

          <div className="relative z-10 grid items-center gap-9 lg:grid-cols-[1.25fr_0.75fr] lg:gap-12">
            <div>
              <div
                data-cta-reveal
                className="cta-reveal flex w-fit items-center gap-2 rounded-full border border-white/25 bg-white/10 px-4 py-2 backdrop-blur-md"
                style={{ "--delay": "100ms" } as CSSProperties}
              >
                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-white text-red-600 shadow-[0_7px_18px_rgba(127,29,29,0.22)]">
                  <LocationIcon className="h-4 w-4" />
                </span>

                <span className="text-xs font-extrabold uppercase tracking-[0.18em] text-white sm:text-sm">
                  Service At Your Location
                </span>
              </div>

              <h2
                id="final-cta-heading"
                data-cta-reveal
                className="cta-reveal mt-6 max-w-3xl text-3xl font-bold leading-[1.12] tracking-[-0.03em] text-white sm:text-4xl lg:text-[48px]"
                style={{ "--delay": "180ms" } as CSSProperties}
              >
                Ready to Book the Service You Need?
              </h2>

              <p
                data-cta-reveal
                className="cta-reveal mt-4 max-w-2xl text-base font-medium leading-7 text-red-50/90 sm:text-lg"
                style={{ "--delay": "260ms" } as CSSProperties}
              >
                Explore services, choose what you need and book at your
                convenience. Our team will visit your property and complete
                the work professionally.
              </p>

              <div
                data-cta-reveal
                className="cta-reveal mt-7 flex flex-col gap-3 sm:flex-row"
                style={{ "--delay": "340ms" } as CSSProperties}
              >
                <Link
                  href="/services"
                  className="group inline-flex items-center justify-center gap-2 rounded-full bg-white px-6 py-3.5 text-sm font-extrabold text-red-600 shadow-[0_14px_30px_rgba(127,29,29,0.2)] transition duration-300 hover:-translate-y-0.5 hover:shadow-[0_18px_38px_rgba(127,29,29,0.28)]"
                >
                  Explore Services
                  <ArrowIcon className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                </Link>

                <a
                  href="tel:+918693986939"
                  className="group inline-flex items-center justify-center gap-2 rounded-full border border-white/35 bg-white/10 px-6 py-3.5 text-sm font-extrabold text-white backdrop-blur-md transition duration-300 hover:-translate-y-0.5 hover:bg-white/18"
                >
                  <PhoneIcon className="h-4 w-4" />
                  Call +91 86939 86939
                </a>
              </div>
            </div>

            <div
              data-cta-reveal
              className="cta-reveal rounded-[28px] border border-white/20 bg-white/10 p-4 shadow-[0_20px_55px_rgba(127,29,29,0.2)] backdrop-blur-xl sm:p-5"
              style={{ "--delay": "420ms" } as CSSProperties}
            >
              <div className="grid gap-3">
                {trustItems.map((item, index) => (
                  <div
                    key={item.title}
                    className="group flex items-center gap-4 rounded-[20px] border border-white/15 bg-white/10 px-4 py-4 transition duration-300 hover:-translate-y-0.5 hover:bg-white/15"
                  >
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-white text-red-600 shadow-[0_10px_22px_rgba(127,29,29,0.18)] transition duration-300 group-hover:scale-105">
                      {item.icon}
                    </span>

                    <div>
                      <h3 className="text-sm font-extrabold text-white sm:text-base">
                        {item.title}
                      </h3>
                      <p className="mt-0.5 text-xs leading-5 text-red-50/80 sm:text-sm">
                        {item.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <Link
                href="/contact"
                className="group mt-4 flex w-full items-center justify-center gap-2 rounded-[18px] border border-white/20 bg-red-950/20 px-5 py-3.5 text-sm font-extrabold text-white transition duration-300 hover:bg-red-950/30"
              >
                <MessageIcon className="h-4 w-4" />
                Contact Our Team
                <ArrowIcon className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </div>
          </div>
        </div>

        <div
          data-cta-reveal
          className="cta-reveal mx-auto mt-5 flex max-w-4xl flex-wrap items-center justify-center gap-x-6 gap-y-2 text-center text-sm font-medium text-neutral-500"
          style={{ "--delay": "520ms" } as CSSProperties}
        >
          <span>Chennai & Tamil Nadu service support</span>
          <span className="hidden h-1 w-1 rounded-full bg-red-300 sm:block" />
          <span>Projects supported across India</span>
          <span className="hidden h-1 w-1 rounded-full bg-red-300 sm:block" />
          <a
            href="mailto:citycoolicescrm@gmail.com"
            className="transition hover:text-red-600"
          >
            citycoolicescrm@gmail.com
          </a>
        </div>
      </div>

      <style jsx>{`
        .cta-reveal {
          opacity: 0;
          transform: translate3d(0, 46px, 0);
          filter: blur(8px);
          transition:
            opacity 900ms cubic-bezier(0.16, 1, 0.3, 1),
            transform 900ms cubic-bezier(0.16, 1, 0.3, 1),
            filter 900ms cubic-bezier(0.16, 1, 0.3, 1);
          transition-delay: var(--delay, 0ms);
          will-change: opacity, transform, filter;
        }

        .cta-reveal.is-visible {
          opacity: 1;
          transform: translate3d(0, 0, 0);
          filter: blur(0);
        }

        .cta-wave {
          transform: translate3d(0, 0, 0);
          animation: ctaWaveFloat 8s ease-in-out infinite;
        }

        @keyframes ctaWaveFloat {
          0%,
          100% {
            transform: translate3d(0, 0, 0);
          }

          50% {
            transform: translate3d(0, -7px, 0);
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .cta-reveal {
            opacity: 1;
            transform: none;
            filter: none;
            transition: none;
          }

          .cta-wave {
            animation: none;
          }
        }
      `}</style>
    </section>
  );
}