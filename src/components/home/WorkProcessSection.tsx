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

type ProcessStep = {
  number: string;
  title: string;
  description: string;
  icon: ReactNode;
};

function ServiceIcon({ className = "" }: IconProps) {
  return (
    <svg aria-hidden="true" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 7h16" />
      <path d="M6 3h12l2 4H4l2-4Z" />
      <path d="M5 7v14h14V7" />
      <path d="M9 11h6" />
      <path d="M9 15h4" />
    </svg>
  );
}

function BookingIcon({ className = "" }: IconProps) {
  return (
    <svg aria-hidden="true" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="M7 3v4" />
      <path d="M17 3v4" />
      <path d="M3 9h18" />
      <path d="m9 14 2 2 4-4" />
    </svg>
  );
}

function VisitIcon({ className = "" }: IconProps) {
  return (
    <svg aria-hidden="true" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 10c0 5-8 11-8 11S4 15 4 10a8 8 0 1 1 16 0Z" />
      <circle cx="12" cy="10" r="2.5" />
      <path d="M8 21h8" />
    </svg>
  );
}

function QuoteIcon({ className = "" }: IconProps) {
  return (
    <svg aria-hidden="true" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8Z" />
      <path d="M14 2v6h6" />
      <path d="M8 13h8" />
      <path d="M8 17h5" />
      <circle cx="16.5" cy="17.5" r="2.5" />
    </svg>
  );
}

function ApprovalIcon({ className = "" }: IconProps) {
  return (
    <svg aria-hidden="true" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M8 3h8" />
      <rect x="5" y="5" width="14" height="16" rx="2" />
      <path d="m9 14 2 2 4-4" />
      <path d="M9 9h6" />
    </svg>
  );
}

function CompleteIcon({ className = "" }: IconProps) {
  return (
    <svg aria-hidden="true" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="9" />
      <path d="m8 12 2.5 2.5L16 9" />
      <path d="M7 3.8 5 2" />
      <path d="m17 3.8 2-1.8" />
    </svg>
  );
}

function ShieldIcon({ className = "" }: IconProps) {
  return (
    <svg aria-hidden="true" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z" />
      <path d="m9 12 2 2 4-4" />
    </svg>
  );
}

function ClockIcon({ className = "" }: IconProps) {
  return (
    <svg aria-hidden="true" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3 2" />
    </svg>
  );
}

const processSteps: ProcessStep[] = [
  {
    number: "01",
    title: "Choose Your Service",
    description: "Explore services, prices and available offers, then select what you need.",
    icon: <ServiceIcon className="h-7 w-7" />,
  },
  {
    number: "02",
    title: "Book Your Way",
    description: "Book through the website, WhatsApp or phone—whichever suits you.",
    icon: <BookingIcon className="h-7 w-7" />,
  },
  {
    number: "03",
    title: "Free Site Visit",
    description: "Choose a suitable date and time, and our team will visit your property.",
    icon: <VisitIcon className="h-7 w-7" />,
  },
  {
    number: "04",
    title: "Inspection & Quote",
    description: "Get a clear quote after inspection, photos or videos, or instantly for fixed-price services.",
    icon: <QuoteIcon className="h-7 w-7" />,
  },
  {
    number: "05",
    title: "Approval & Work",
    description: "After your approval, we confirm the schedule and begin the work professionally.",
    icon: <ApprovalIcon className="h-7 w-7" />,
  },
  {
    number: "06",
    title: "Final Check & Payment",
    description: "We complete the final inspection with you, then payment is made after completion or approved stages.",
    icon: <CompleteIcon className="h-7 w-7" />,
  },
];

export default function WorkProcessSection() {
  const sectionRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const section = sectionRef.current;

    if (!section) {
      return;
    }

    const revealElements =
      section.querySelectorAll<HTMLElement>("[data-process-reveal]");

    let hasRevealed = false;
    let previousScrollY = window.scrollY;

    const displaySection = (withAnimation: boolean) => {
      if (hasRevealed) {
        return;
      }

      hasRevealed = true;

      if (!withAnimation) {
        section.classList.add("process-reveal-instant");
      }

      revealElements.forEach((element) => {
        element.classList.add("is-visible");
      });
    };

    if (typeof IntersectionObserver === "undefined") {
      displaySection(false);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        const currentScrollY = window.scrollY;
        const scrollingDown =
          currentScrollY >= previousScrollY;
        const enteringFromTop =
          entry.boundingClientRect.top >= 0;

        previousScrollY = currentScrollY;

        if (!entry.isIntersecting || hasRevealed) {
          return;
        }

        displaySection(scrollingDown && enteringFromTop);
        observer.disconnect();
      },
      {
        root: null,
        threshold: 0.08,
        rootMargin: "48px 0px -7% 0px",
      },
    );

    observer.observe(section);

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <section
      id="work-process"
      ref={sectionRef}
      className="work-process-section relative isolate overflow-hidden bg-white py-16 sm:py-20 lg:py-24"
      aria-labelledby="work-process-heading"
    >
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute left-[-170px] top-[-140px] h-[420px] w-[420px] rounded-full bg-red-50 blur-3xl" />
        <div className="absolute right-[-180px] top-[70px] h-[430px] w-[430px] rounded-full bg-red-50/70 blur-3xl" />

        <div className="absolute left-5 top-8 grid grid-cols-6 gap-4 opacity-60">
          {Array.from({ length: 24 }).map((_, index) => (
            <span key={index} className="h-1.5 w-1.5 rounded-full bg-red-200" />
          ))}
        </div>

        <div className="absolute right-[-120px] top-[-100px] h-[390px] w-[390px] rounded-full border border-red-100" />
        <div className="absolute right-[-80px] top-[-60px] h-[310px] w-[310px] rounded-full border border-red-100/80" />
        <div className="absolute right-[-40px] top-[-20px] h-[230px] w-[230px] rounded-full border border-red-100/70" />
        <div className="absolute inset-x-0 bottom-0 h-36 bg-gradient-to-t from-red-50/70 to-transparent" />
      </div>

      <div className="relative z-10 mx-auto w-full max-w-[1240px] px-5 sm:px-8 lg:px-10">
        <div
          data-process-reveal
          className="process-reveal mx-auto flex w-fit items-center gap-2 rounded-full border border-red-200 bg-white/90 px-5 py-2.5 shadow-[0_12px_35px_rgba(239,68,68,0.08)] backdrop-blur"
          style={{ "--delay": "0ms" } as CSSProperties}
        >
          <span className="flex h-7 w-7 items-center justify-center rounded-full bg-red-600 text-white shadow-[0_7px_18px_rgba(220,38,38,0.28)]">
            <ShieldIcon className="h-4 w-4" />
          </span>
          <span className="text-xs font-extrabold uppercase tracking-[0.18em] text-red-600 sm:text-sm">Our Work Process</span>
        </div>

        <div className="mx-auto mt-6 max-w-4xl text-center">
          <h2
            id="work-process-heading"
            data-process-reveal
            className="process-reveal text-3xl font-bold leading-[1.15] tracking-[-0.025em] text-neutral-950 sm:text-4xl lg:text-[46px]"
            style={{ "--delay": "100ms" } as CSSProperties}
          >
            Simple Booking. <span className="text-red-600">Professional Service.</span>
          </h2>

          <div
            data-process-reveal
            className="process-reveal mx-auto mt-3 h-1 w-16 rounded-full bg-red-600"
            style={{ "--delay": "170ms" } as CSSProperties}
          />

          <p
            data-process-reveal
            className="process-reveal mx-auto mt-3 max-w-3xl text-base font-medium leading-7 text-neutral-600 sm:text-lg"
            style={{ "--delay": "230ms" } as CSSProperties}
          >
            Choose the service you need, book it your way, and our team will handle the rest at your location.
          </p>
        </div>

        <div className="relative mt-10">

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {processSteps.map((step, index) => (
              <article
                key={step.number}
                data-process-reveal
                className="process-card process-reveal group relative min-h-[255px] overflow-hidden rounded-[28px] border border-red-100 bg-white px-6 pb-7 pt-6 shadow-[0_18px_55px_rgba(15,23,42,0.055)] transition duration-500 hover:-translate-y-2 hover:border-red-200 hover:shadow-[0_26px_65px_rgba(239,68,68,0.13)]"
                style={{ "--delay": `${320 + index * 100}ms` } as CSSProperties}
              >
                <div aria-hidden="true" className="absolute inset-x-7 top-0 h-px bg-gradient-to-r from-transparent via-red-300 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

                <div className="flex items-start justify-between gap-4">
                  <div className="process-icon-wrap relative flex h-[74px] w-[74px] shrink-0 items-center justify-center rounded-[24px] border border-red-100 bg-red-50 text-red-600 shadow-[0_16px_30px_rgba(239,68,68,0.12)] transition duration-500 group-hover:-translate-y-1 group-hover:rotate-[-3deg] group-hover:bg-red-600 group-hover:text-white">
                    {step.icon}
                    <span className="absolute -right-2 -top-2 flex h-7 min-w-7 items-center justify-center rounded-full bg-red-600 px-2 text-[10px] font-black tracking-[0.08em] text-white shadow-[0_7px_16px_rgba(220,38,38,0.28)]">
                      {step.number}
                    </span>
                  </div>

                  <span className="text-[42px] font-black leading-none text-red-50 transition duration-500 group-hover:text-red-100">
                    {step.number}
                  </span>
                </div>

                <h3 className="mt-6 text-[21px] font-extrabold leading-tight tracking-[-0.02em] text-neutral-950 sm:text-[22px]">{step.title}</h3>
                <span className="mt-3 block h-0.5 w-8 rounded-full bg-red-600 transition-all duration-500 group-hover:w-14" />
                <p className="mt-4 text-[15px] font-medium leading-7 text-neutral-600">{step.description}</p>
                <div aria-hidden="true" className="absolute bottom-[-70px] right-[-70px] h-36 w-36 rounded-full bg-red-50 transition duration-500 group-hover:scale-125" />
              </article>
            ))}
          </div>
        </div>

        <div
          data-process-reveal
          className="process-reveal mt-6 overflow-hidden rounded-[24px] border border-red-100 bg-white/95 shadow-[0_16px_45px_rgba(15,23,42,0.05)] backdrop-blur"
          style={{ "--delay": "960ms" } as CSSProperties}
        >
          <div className="grid sm:grid-cols-[1fr_auto] sm:items-center">
            <div className="flex items-center gap-4 px-5 py-4 sm:px-6">
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-red-100 bg-red-50 text-red-600">
                <ClockIcon className="h-6 w-6" />
              </span>
              <div>
                <p className="font-extrabold text-neutral-950">24/7 Service Support</p>
                <p className="mt-0.5 text-sm leading-6 text-neutral-500">Available across Chennai, Tamil Nadu and India.</p>
              </div>
            </div>

            <Link
              href="/services"
              className="group mx-5 mb-5 inline-flex items-center justify-center gap-2 rounded-full bg-red-600 px-6 py-3 text-sm font-extrabold text-white shadow-[0_12px_26px_rgba(220,38,38,0.25)] transition duration-300 hover:-translate-y-0.5 hover:bg-red-700 sm:mx-6 sm:mb-0"
            >
              Explore Services
              <svg aria-hidden="true" className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14" />
                <path d="m13 6 6 6-6 6" />
              </svg>
            </Link>
          </div>
        </div>
      </div>

      <style jsx>{`
        .process-reveal {
          opacity: 0;
          transform: translate3d(0, 44px, 0);
          filter: blur(7px);
          transition:
            opacity 720ms cubic-bezier(0.22, 1, 0.36, 1),
            transform 720ms cubic-bezier(0.22, 1, 0.36, 1),
            filter 720ms cubic-bezier(0.22, 1, 0.36, 1);
          transition-delay: var(--delay, 0ms);
          will-change: opacity, transform, filter;
        }

        .process-card {
          transform: translate3d(0, 58px, 0) scale(0.97);
        }

        .process-reveal.is-visible {
          opacity: 1;
          transform: translate3d(0, 0, 0) scale(1);
          filter: blur(0);
        }


        .process-icon-wrap::after {
          content: "";
          position: absolute;
          inset: 8px;
          border-radius: 18px;
          border: 1px solid rgb(254 202 202 / 0.7);
          pointer-events: none;
        }



        .process-reveal-instant .process-reveal {
          transition: none;
          transition-delay: 0ms;
        }
        @media (prefers-reduced-motion: reduce) {
          .process-reveal,
          .process-card {
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