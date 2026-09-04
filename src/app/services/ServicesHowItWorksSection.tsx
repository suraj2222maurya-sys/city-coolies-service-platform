"use client";

import type { CSSProperties } from "react";
import { useEffect, useRef } from "react";

type StepIconName =
  | "service"
  | "calendar"
  | "payment"
  | "professional"
  | "result";

const STEPS = [
  {
    title: "Choose Service",
    description: "Select the service you need",
    icon: "service",
  },
  {
    title: "Pick Date & Time",
    description: "Choose a convenient date & time",
    icon: "calendar",
  },
  {
    title: "Book & Pay",
    description: "Confirm booking & make payment",
    icon: "payment",
  },
  {
    title: "We Do The Rest",
    description: "Our expert arrives & gets the job done",
    icon: "professional",
  },
  {
    title: "Enjoy Results",
    description: "Sit back & enjoy a perfect space",
    icon: "result",
  },
] as const;

function StepIcon({
  icon,
}: {
  icon: StepIconName;
}) {
  const common = {
    viewBox: "0 0 48 48",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 2,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    "aria-hidden": true,
  };

  switch (icon) {
    case "service":
      return (
        <svg {...common}>
          <rect
            x="13"
            y="8"
            width="22"
            height="32"
            rx="4"
          />
          <path d="M18 15h12M18 22h12M18 29h7" />
          <path d="m27 31 3 3 6-7" />
        </svg>
      );

    case "calendar":
      return (
        <svg {...common}>
          <rect
            x="8"
            y="11"
            width="32"
            height="29"
            rx="4"
          />
          <path d="M15 6v10M33 6v10M8 19h32" />
          <path d="M16 26h5M27 26h5M16 33h5M27 33h5" />
        </svg>
      );

    case "payment":
      return (
        <svg {...common}>
          <rect
            x="7"
            y="13"
            width="34"
            height="24"
            rx="4"
          />
          <path d="M7 21h34M13 30h10" />
          <circle
            cx="34"
            cy="30"
            r="2"
          />
        </svg>
      );

    case "professional":
      return (
        <svg {...common}>
          <circle
            cx="24"
            cy="15"
            r="6"
          />
          <path d="M12 39c1-9 5-15 12-15s11 6 12 15" />
          <path d="m34 8 2 3 4 .5-3 3 .8 4-3.8-2-3.8 2 .8-4-3-3 4-.5z" />
        </svg>
      );

    case "result":
      return (
        <svg {...common}>
          <circle
            cx="22"
            cy="16"
            r="6"
          />
          <path d="M10 39c1-9 5-14 12-14s11 5 12 14" />
          <path d="m29 31 4 4 8-10" />
        </svg>
      );
  }
}

export default function ServicesHowItWorksSection() {
  const sectionRef =
    useRef<HTMLElement | null>(null);

  useEffect(() => {
    const section =
      sectionRef.current;

    if (!section) {
      return;
    }

    const reducedMotion =
      window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;

    if (
      reducedMotion ||
      !("IntersectionObserver" in window)
    ) {
      section.classList.add(
        "cc-how-final--visible",
      );

      return;
    }

    const observer =
      new IntersectionObserver(
        ([entry]) => {
          if (!entry) {
            return;
          }

          section.classList.toggle(
            "cc-how-final--visible",
            entry.isIntersecting,
          );
        },
        {
          threshold: 0.18,
          rootMargin: "5% 0px -5% 0px",
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
      className="cc-how-final"
      aria-labelledby="cc-how-final-title"
    >
      <div className="cc-how-final__shell">
        <header className="cc-how-final__header">
          <h2 id="cc-how-final-title">
            <span>
              How It Works
            </span>
          </h2>
        </header>

        <div className="cc-how-final__steps">
          {STEPS.map(
            (step, index) => (
              <article
                key={step.title}
                className="cc-how-final__step"
                style={
                  {
                    "--cc-how-index": index,
                  } as CSSProperties
                }
              >
                <div className="cc-how-final__icon-wrap">
                  <span className="cc-how-final__icon">
                    <StepIcon
                      icon={step.icon}
                    />
                  </span>

                  <span className="cc-how-final__number">
                    {index + 1}
                  </span>
                </div>

                <div className="cc-how-final__copy">
                  <strong>
                    {step.title}
                  </strong>

                  <p>
                    {step.description}
                  </p>
                </div>

                {index < STEPS.length - 1 ? (
                  <span
                    className="cc-how-final__connector"
                    aria-hidden="true"
                  >
                    <i />
                    <b>→</b>
                  </span>
                ) : null}
              </article>
            ),
          )}
        </div>
      </div>

      <style>{`
        .cc-how-final {
          --cc-red: #f51f2a;
          --cc-dark-red: #dd0e1b;
          --cc-light-pink: #fff4f6;
          --cc-soft-pink: #fffafb;
          --cc-ink: #17181f;
          --cc-muted: #697180;

          width: 100%;
          padding: 6px 18px 28px;
          overflow: hidden;
        }

        .cc-how-final__shell {
          width: min(100%, 1840px);
          margin: 0 auto;

          overflow: hidden;

          padding: 9px 13px 13px;

          border:
            1px solid
            rgba(245,31,42,.10);

          border-radius: 14px;

          background:
            linear-gradient(
              120deg,
              #ffffff 0%,
              #fffdfd 45%,
              #fff5f6 100%
            );

          box-shadow:
            0 12px 29px -27px
            rgba(62,14,21,.42);
        }


        /*
         * =====================================================
         * HOW IT WORKS
         *
         * This comes FIRST.
         * No "Simple Booking Journey".
         * =====================================================
         */

        .cc-how-final__header {
          display: flex;
          justify-content: center;

          margin: 0 0 8px;
        }

        .cc-how-final__header h2 {
          position: relative;

          width: fit-content;

          margin: 0;

          overflow: hidden;

          color: var(--cc-ink);

          font-size:
            clamp(
              18px,
              1.18vw,
              23px
            );

          line-height: 1;

          font-weight: 900;

          letter-spacing: -.035em;
        }

        .cc-how-final__header h2 span {
          display: block;

          opacity: 0;

          clip-path:
            inset(
              0
              100%
              0
              0
            );

          filter:
            blur(3px);

          transform:
            translate3d(
              0,
              6px,
              0
            );

          will-change:
            opacity,
            clip-path,
            filter,
            transform;
        }

        .cc-how-final--visible
        .cc-how-final__header h2 span {
          opacity: 1;

          clip-path:
            inset(
              0
              0
              0
              0
            );

          filter:
            blur(0);

          transform:
            translate3d(
              0,
              0,
              0
            );

          transition:
            opacity
              260ms
              cubic-bezier(.16,1,.3,1)
              60ms,

            clip-path
              620ms
              steps(12,end)
              80ms,

            filter
              450ms
              cubic-bezier(.16,1,.3,1)
              60ms,

            transform
              520ms
              cubic-bezier(.16,1,.3,1)
              60ms;
        }


        /*
         * Red underline appears after title.
         */

        .cc-how-final__header h2::after {
          content: "";

          position: absolute;

          left: 50%;
          bottom: -5px;

          width: 28px;
          height: 2px;

          border-radius: 999px;

          background:
            var(--cc-red);

          opacity: 0;

          transform:
            translateX(-50%)
            scaleX(.15);

          transform-origin:
            center;
        }

        .cc-how-final--visible
        .cc-how-final__header h2::after {
          opacity: 1;

          transform:
            translateX(-50%)
            scaleX(1);

          transition:
            opacity
              220ms ease
              540ms,

            transform
              420ms
              cubic-bezier(.16,1,.3,1)
              540ms;
        }


        /*
         * =====================================================
         * FIVE STEP ROW
         * =====================================================
         */

        .cc-how-final__steps {
          display: grid;

          grid-template-columns:
            repeat(
              5,
              minmax(0,1fr)
            );

          align-items: center;
        }

        .cc-how-final__step {
          position: relative;

          min-width: 0;

          min-height: 68px;

          display: grid;

          grid-template-columns:
            44px minmax(0,1fr);

          align-items: center;

          gap: 8px;

          padding:
            3px 31px 3px 3px;

          opacity: 0;

          filter:
            blur(6px);

          transform:
            translate3d(
              0,
              22px,
              0
            )
            scale(.975);

          will-change:
            opacity,
            filter,
            transform;
        }


        /*
         * =====================================================
         * VIDEO-LIKE ORDER
         *
         * Heading appears first.
         * Then:
         * step 1
         * step 2
         * step 3
         * step 4
         * step 5
         * =====================================================
         */

        .cc-how-final--visible
        .cc-how-final__step {
          opacity: 1;

          filter:
            blur(0);

          transform:
            translate3d(
              0,
              0,
              0
            )
            scale(1);

          transition:
            opacity
              360ms
              cubic-bezier(.16,1,.3,1)
              calc(
                720ms +
                var(--cc-how-index)
                * 180ms
              ),

            filter
              520ms
              cubic-bezier(.16,1,.3,1)
              calc(
                720ms +
                var(--cc-how-index)
                * 180ms
              ),

            transform
              680ms
              cubic-bezier(.16,1,.3,1)
              calc(
                720ms +
                var(--cc-how-index)
                * 180ms
              );
        }


        /*
         * =====================================================
         * CIRCLE ICON
         * =====================================================
         */

        .cc-how-final__icon-wrap {
          position: relative;

          width: 44px;
          height: 44px;
        }

        .cc-how-final__icon {
          width: 44px;
          height: 44px;

          display: grid;
          place-items: center;

          border:
            1px solid
            rgba(245,31,42,.13);

          border-radius: 50%;

          color:
            var(--cc-red);

          background:
            linear-gradient(
              145deg,
              #ffffff,
              #fff1f3
            );

          box-shadow:
            0 9px 19px -17px
            rgba(245,31,42,.52);
        }

        .cc-how-final__icon svg {
          width: 20px;
          height: 20px;
        }


        /*
         * Number badge.
         */

        .cc-how-final__number {
          position: absolute;

          top: -4px;
          right: -4px;

          width: 17px;
          height: 17px;

          display: grid;
          place-items: center;

          border:
            2px solid #fff;

          border-radius: 50%;

          color: #fff;

          background:
            linear-gradient(
              135deg,
              #ff303b,
              #df0d1a
            );

          box-shadow:
            0 5px 10px -6px
            rgba(245,31,42,.88);

          font-size: 7px;
          line-height: 1;
          font-weight: 900;
        }


        /*
         * =====================================================
         * TEXT
         * =====================================================
         */

        .cc-how-final__copy {
          min-width: 0;
        }

        .cc-how-final__copy strong {
          display: block;

          color:
            #282a31;

          font-size:
            clamp(
              8.5px,
              .63vw,
              11px
            );

          line-height: 1.1;

          font-weight: 850;
        }

        .cc-how-final__copy p {
          max-width: 142px;

          margin:
            4px 0 0;

          color:
            var(--cc-muted);

          font-size:
            clamp(
              6.8px,
              .49vw,
              8.6px
            );

          line-height: 1.28;

          font-weight: 500;
        }


        /*
         * =====================================================
         * CONNECTING ARROW
         * =====================================================
         */

        .cc-how-final__connector {
          position: absolute;

          top: 50%;
          right: 2px;

          width: 27px;

          display: flex;
          align-items: center;

          gap: 2px;

          transform:
            translateY(-50%);

          pointer-events: none;
        }

        .cc-how-final__connector i {
          flex: 1;

          height: 1px;

          background:
            linear-gradient(
              90deg,
              rgba(245,31,42,.13),
              rgba(245,31,42,.52)
            );
        }

        .cc-how-final__connector b {
          color:
            #ff8a92;

          font-size: 12px;

          line-height: 1;

          font-weight: 500;

          animation:
            ccHowFinalArrow
            1.55s
            ease-in-out
            infinite;
        }

        @keyframes ccHowFinalArrow {
          0%,
          100% {
            transform:
              translate3d(
                0,
                0,
                0
              );
          }

          50% {
            transform:
              translate3d(
                2px,
                0,
                0
              );
          }
        }


        /*
         * =====================================================
         * LAPTOP
         * =====================================================
         */

        @media (
          min-width: 1000px
        )
        and (
          max-width: 1399px
        ) {
          .cc-how-final__shell {
            padding:
              9px 10px 11px;
          }

          .cc-how-final__step {
            min-height: 64px;

            grid-template-columns:
              40px minmax(0,1fr);

            gap: 7px;

            padding-right: 25px;
          }

          .cc-how-final__icon-wrap,
          .cc-how-final__icon {
            width: 40px;
            height: 40px;
          }

          .cc-how-final__icon svg {
            width: 18px;
            height: 18px;
          }

          .cc-how-final__connector {
            width: 21px;
          }
        }


        /*
         * =====================================================
         * TABLET
         * =====================================================
         */

        @media (max-width: 999px) {
          .cc-how-final__steps {
            grid-template-columns:
              repeat(
                2,
                minmax(0,1fr)
              );

            gap: 6px;
          }

          .cc-how-final__step {
            padding: 8px;

            border:
              1px solid
              rgba(245,31,42,.07);

            border-radius: 10px;

            background:
              rgba(255,255,255,.82);
          }

          .cc-how-final__step:last-child {
            grid-column:
              1 / -1;
          }

          .cc-how-final__connector {
            display: none;
          }

          .cc-how-final__copy p {
            max-width: none;
          }
        }


        /*
         * =====================================================
         * PHONE
         * =====================================================
         */

        @media (max-width: 560px) {
          .cc-how-final {
            padding:
              6px 10px 26px;
          }

          .cc-how-final__shell {
            padding:
              10px 9px;

            border-radius: 13px;
          }

          .cc-how-final__header {
            margin-bottom: 9px;
          }

          .cc-how-final__steps {
            grid-template-columns: 1fr;

            gap: 6px;
          }

          .cc-how-final__step,
          .cc-how-final__step:last-child {
            grid-column: auto;

            min-height: 62px;

            grid-template-columns:
              40px minmax(0,1fr);
          }

          .cc-how-final__icon-wrap,
          .cc-how-final__icon {
            width: 40px;
            height: 40px;
          }

          .cc-how-final__copy strong {
            font-size: 10px;
          }

          .cc-how-final__copy p {
            font-size: 8px;
          }
        }


        /*
         * =====================================================
         * ACCESSIBILITY
         * =====================================================
         */

        @media (
          prefers-reduced-motion:
          reduce
        ) {
          .cc-how-final__header h2 span,
          .cc-how-final__step {
            opacity: 1 !important;

            filter: none !important;

            clip-path: none !important;

            transform: none !important;

            transition: none !important;
          }

          .cc-how-final__header h2::after {
            opacity: 1 !important;

            transform:
              translateX(-50%)
              scaleX(1)
              !important;

            transition: none !important;
          }

          .cc-how-final__connector b {
            animation: none !important;
          }
        }
      `}</style>
    </section>
  );
}