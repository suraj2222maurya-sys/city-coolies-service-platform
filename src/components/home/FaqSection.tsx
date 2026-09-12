"use client";

import Link from "next/link";
import {
  useEffect,
  useRef,
  useState,
  type CSSProperties,
} from "react";

type IconProps = {
  className?: string;
};

type FaqItem = {
  question: string;
  answer: string;
};

function HelpIcon({ className = "" }: IconProps) {
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
      <path d="M9.7 9a2.6 2.6 0 0 1 5.05.85c0 1.75-1.45 2.3-2.35 2.9-.55.36-.9.78-.9 1.5" />
      <path d="M12 17.25h.01" />
    </svg>
  );
}

function PlusIcon({ className = "" }: IconProps) {
  return (
    <svg
      aria-hidden="true"
      className={className}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
    >
      <path d="M12 5v14" />
      <path d="M5 12h14" />
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
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.79 19.79 0 0 1 2.12 4.18 2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.12.9.33 1.79.62 2.64a2 2 0 0 1-.45 2.11L8 9.75a16 16 0 0 0 6 6l1.28-1.28a2 2 0 0 1 2.11-.45c.85.29 1.74.5 2.64.62A2 2 0 0 1 22 16.92Z" />
    </svg>
  );
}

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

const faqs: FaqItem[] = [
  {
    question: "Who can book City Coolies services?",
    answer:
      "Anyone can book our services. We work for small and large homes, apartments, villas, shops, offices, hotels, hospitals, schools, commercial buildings, warehouses and industrial properties.",
  },
  {
    question: "How can I book a service?",
    answer:
      "You can choose a service from our service page and book online. You can also contact us by phone or WhatsApp, whichever is more convenient for you.",
  },
  {
    question: "Do you provide service at my location?",
    answer:
      "Yes. Our team visits your home, shop, office or property and completes the required work at your location.",
  },
  {
    question: "Is the site visit free?",
    answer:
      "Yes. For services that require inspection, we arrange a free site visit before confirming the final scope and quotation.",
  },
  {
    question: "How will I receive the service price?",
    answer:
      "Fixed-price services can show the price directly. For other work, we provide a clear quotation after a site inspection or after reviewing the photos and videos you share.",
  },
  {
    question: "When will the work begin?",
    answer:
      "Work begins only after you approve the quotation. We then confirm the date and time before assigning the team.",
  },
  {
    question: "When do I need to make the payment?",
    answer:
      "For regular services, payment is made after completion. Larger renovation or civil projects may use approved stage-based payments.",
  },
  {
    question: "Do you handle small jobs as well as large projects?",
    answer:
      "Yes. We accept small repair and maintenance jobs as well as complete cleaning, renovation, electrical, plumbing, painting and civil work projects.",
  },
  {
    question: "Do you provide emergency and 24/7 support?",
    answer:
      "Yes. Our service support is available 24/7 for urgent requirements, subject to team availability and the service location.",
  },
  {
    question: "Where are City Coolies services available?",
    answer:
      "We have a strong service presence in Chennai and Tamil Nadu, and we also support projects across India.",
  },
];

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((faq) => ({
    "@type": "Question",
    name: faq.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: faq.answer,
    },
  })),
};

export default function FaqSection() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const animationCompletedRef = useRef(false);
  const [revealMode, setRevealMode] = useState<
    "hidden" | "animated" | "instant"
  >("hidden");
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  useEffect(() => {
    const section = sectionRef.current;

    if (!section) {
      return;
    }

    let previousScrollY = window.scrollY;

    const revealSection = (withAnimation: boolean) => {
      if (animationCompletedRef.current) {
        return;
      }

      animationCompletedRef.current = true;
      setRevealMode(withAnimation ? "animated" : "instant");
    };

    if (typeof IntersectionObserver === "undefined") {
      const fallbackTimer = setTimeout(() => {
        revealSection(false);
      }, 0);

      return () => {
        clearTimeout(fallbackTimer);
      };
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        const currentScrollY = window.scrollY;
        const scrollingDown =
          currentScrollY >= previousScrollY;
        const enteringFromTop =
          entry.boundingClientRect.top >= 0;

        previousScrollY = currentScrollY;

        if (
          !entry.isIntersecting ||
          animationCompletedRef.current
        ) {
          return;
        }

        revealSection(scrollingDown && enteringFromTop);
        observer.disconnect();
      },
      {
        root: null,
        threshold: 0.06,
        rootMargin: "56px 0px -6% 0px",
      },
    );

    observer.observe(section);

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className={`faq-section relative isolate overflow-hidden bg-white py-16 sm:py-20 lg:py-24 ${
        revealMode !== "hidden" ? "is-faq-visible" : ""
      } ${revealMode === "instant" ? "faq-reveal-instant" : ""}`}
      aria-labelledby="faq-heading"
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
      >
        <div className="absolute left-[-180px] top-[-120px] h-[420px] w-[420px] rounded-full bg-red-50 blur-3xl" />
        <div className="absolute bottom-[-170px] right-[-140px] h-[420px] w-[420px] rounded-full bg-red-50/80 blur-3xl" />

        <div className="absolute right-5 top-10 grid grid-cols-6 gap-4 opacity-60">
          {Array.from({ length: 24 }).map((_, index) => (
            <span
              key={index}
              className="h-1.5 w-1.5 rounded-full bg-red-200"
            />
          ))}
        </div>

        <div className="absolute left-[-105px] bottom-[-95px] h-[310px] w-[310px] rounded-full border border-red-100" />
        <div className="absolute left-[-65px] bottom-[-55px] h-[230px] w-[230px] rounded-full border border-red-100/80" />
      </div>

      <div className="relative z-10 mx-auto w-full max-w-[1240px] px-5 sm:px-8 lg:px-10">
        <div
          data-faq-reveal
          className="faq-reveal mx-auto flex w-fit items-center gap-2 rounded-full border border-red-200 bg-white/90 px-5 py-2.5 shadow-[0_12px_35px_rgba(239,68,68,0.08)] backdrop-blur"
          style={{ "--delay": "0ms" } as CSSProperties}
        >
          <span className="flex h-7 w-7 items-center justify-center rounded-full bg-red-600 text-white shadow-[0_7px_18px_rgba(220,38,38,0.28)]">
            <HelpIcon className="h-4 w-4" />
          </span>

          <span className="text-xs font-extrabold uppercase tracking-[0.18em] text-red-600 sm:text-sm">
            Frequently Asked Questions
          </span>
        </div>

        <div className="mx-auto mt-6 max-w-4xl text-center">
          <h2
            id="faq-heading"
            data-faq-reveal
            className="faq-reveal text-3xl font-bold leading-[1.15] tracking-[-0.025em] text-neutral-950 sm:text-4xl lg:text-[46px]"
            style={{ "--delay": "100ms" } as CSSProperties}
          >
            Questions Before Booking?{" "}
            <span className="text-red-600">Find Answers Here.</span>
          </h2>

          <div
            data-faq-reveal
            className="faq-reveal mx-auto mt-3 h-1 w-16 rounded-full bg-red-600"
            style={{ "--delay": "170ms" } as CSSProperties}
          />

          <p
            data-faq-reveal
            className="faq-reveal mx-auto mt-3 max-w-3xl text-base font-medium leading-7 text-neutral-600 sm:text-lg"
            style={{ "--delay": "230ms" } as CSSProperties}
          >
            Clear answers about booking, site visits, pricing, payment and
            service availability.
          </p>
        </div>

        <div className="mx-auto mt-9 grid max-w-5xl gap-4">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            const buttonId = `faq-button-${index}`;
            const panelId = `faq-panel-${index}`;

            return (
              <article
                key={faq.question}
                data-faq-reveal
                className={`faq-reveal faq-card overflow-hidden rounded-[24px] border bg-white shadow-[0_14px_40px_rgba(15,23,42,0.045)] transition duration-500 ${
                  isOpen
                    ? "border-red-200 shadow-[0_20px_50px_rgba(239,68,68,0.11)]"
                    : "border-red-100 hover:-translate-y-0.5 hover:border-red-200"
                }`}
                style={
                  {
                    "--delay": `${300 + index * 65}ms`,
                  } as CSSProperties
                }
              >
                <h3>
                  <button
                    id={buttonId}
                    type="button"
                    aria-expanded={isOpen}
                    aria-controls={panelId}
                    onClick={() =>
                      setOpenIndex((current) =>
                        current === index ? null : index,
                      )
                    }
                    className="group flex w-full items-center gap-4 px-5 py-5 text-left sm:px-6"
                  >
                    <span
                      className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-full border text-sm font-black transition duration-300 ${
                        isOpen
                          ? "border-red-600 bg-red-600 text-white shadow-[0_10px_22px_rgba(220,38,38,0.24)]"
                          : "border-red-100 bg-red-50 text-red-600"
                      }`}
                    >
                      {String(index + 1).padStart(2, "0")}
                    </span>

                    <span className="flex-1 text-base font-extrabold leading-6 text-neutral-950 sm:text-lg">
                      {faq.question}
                    </span>

                    <span
                      className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-red-100 bg-red-50 text-red-600 transition duration-300 ${
                        isOpen ? "rotate-45 bg-red-600 text-white" : ""
                      }`}
                    >
                      <PlusIcon className="h-5 w-5" />
                    </span>
                  </button>
                </h3>

                <div
                  id={panelId}
                  role="region"
                  aria-labelledby={buttonId}
                  className={`faq-answer-grid ${
                    isOpen ? "is-open" : ""
                  }`}
                >
                  <div className="overflow-hidden">
                    <div className="border-t border-red-100 px-5 pb-6 pt-4 sm:pl-[86px] sm:pr-7">
                      <p className="text-[15px] font-medium leading-7 text-neutral-600 sm:text-base">
                        {faq.answer}
                      </p>
                    </div>
                  </div>
                </div>
              </article>
            );
          })}
        </div>

        <div
          data-faq-reveal
          className="faq-reveal mx-auto mt-7 flex max-w-4xl flex-col items-center justify-between gap-4 rounded-[26px] border border-red-100 bg-white/95 px-5 py-5 shadow-[0_16px_45px_rgba(15,23,42,0.05)] backdrop-blur sm:flex-row sm:px-6"
          style={{ "--delay": "980ms" } as CSSProperties}
        >
          <div className="flex items-center gap-4 text-center sm:text-left">
            <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-red-100 bg-red-50 text-red-600">
              <PhoneIcon className="h-6 w-6" />
            </span>

            <div>
              <p className="font-extrabold text-neutral-950">
                Still have a question?
              </p>
              <p className="mt-0.5 text-sm leading-6 text-neutral-500">
                Speak with our team before booking your service.
              </p>
            </div>
          </div>

          <Link
            href="/contact"
            className="group inline-flex w-full items-center justify-center gap-2 rounded-full bg-red-600 px-6 py-3 text-sm font-extrabold text-white shadow-[0_12px_26px_rgba(220,38,38,0.25)] transition duration-300 hover:-translate-y-0.5 hover:bg-red-700 sm:w-auto"
          >
            Contact Our Team
            <ArrowIcon className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </div>
      </div>

      <style jsx>{`
        .faq-reveal {
          opacity: 0;
          transform: translate3d(0, 42px, 0);
          filter: blur(7px);
          transition:
            opacity 700ms cubic-bezier(0.22, 1, 0.36, 1),
            transform 700ms cubic-bezier(0.22, 1, 0.36, 1),
            filter 700ms cubic-bezier(0.22, 1, 0.36, 1);
          transition-delay: var(--delay, 0ms);
          will-change: opacity, transform, filter;
        }

        .faq-section.is-faq-visible .faq-reveal {
          opacity: 1;
          transform: translate3d(0, 0, 0);
          filter: blur(0);
        }

        .faq-answer-grid {
          display: grid;
          grid-template-rows: 0fr;
          opacity: 0;
          transition:
            grid-template-rows 420ms cubic-bezier(0.16, 1, 0.3, 1),
            opacity 300ms ease;
        }

        .faq-answer-grid.is-open {
          grid-template-rows: 1fr;
          opacity: 1;
        }


        .faq-reveal-instant .faq-reveal {
          transition: none;
          transition-delay: 0ms;
        }
        @media (prefers-reduced-motion: reduce) {
          .faq-reveal {
            opacity: 1;
            transform: none;
            filter: none;
            transition: none;
          }

          .faq-answer-grid {
            transition: none;
          }
        }
      `}</style>
    </section>
  );
}
