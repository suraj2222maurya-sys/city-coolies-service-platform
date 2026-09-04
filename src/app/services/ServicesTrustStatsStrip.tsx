"use client";

import type { CSSProperties } from "react";
import { useEffect, useRef } from "react";

type TrustIcon =
  | "shield"
  | "customers"
  | "rating"
  | "support";

const TRUST_STATS = [
  {
    headline: "100% SECURE",
    label: "Payments",
    icon: "shield",
  },
  {
    headline: "15,000+",
    label: "Happy Customers",
    icon: "customers",
  },
  {
    headline: "Top Rated",
    label: "Professionals",
    icon: "rating",
  },
  {
    headline: "24/7",
    label: "Customer Support",
    icon: "support",
  },
] as const;

function TrustStatIcon({
  icon,
}: {
  icon: TrustIcon;
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
    case "shield":
      return (
        <svg {...common}>
          <path d="M24 5 38 11v11c0 10-5.8 17-14 21C15.8 39 10 32 10 22V11L24 5Z" />
          <path d="m17 24 4 4 10-10" />
        </svg>
      );

    case "customers":
      return (
        <svg {...common}>
          <circle cx="18" cy="17" r="6" />
          <circle cx="31" cy="18" r="5" />
          <path d="M7 39c1-9 5-14 11-14s10 5 11 14" />
          <path d="M27 27c7 1 11 5 12 12" />
        </svg>
      );

    case "rating":
      return (
        <svg {...common}>
          <path d="m24 6 5.4 11 12.1 1.8-8.8 8.5 2.1 12-10.8-5.7-10.8 5.7 2.1-12-8.8-8.5L18.6 17 24 6Z" />
        </svg>
      );

    case "support":
      return (
        <svg {...common}>
          <path d="M9 27v-5a15 15 0 0 1 30 0v5" />
          <path d="M9 25h7v11H9zM32 25h7v11h-7z" />
          <path d="M32 38c-2 3-5 4-9 4" />
        </svg>
      );
  }
}

export default function ServicesTrustStatsStrip() {
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
        "cc-stats-strip--visible",
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
            "cc-stats-strip--visible",
            entry.isIntersecting,
          );
        },
        {
          threshold: 0.18,
          rootMargin: "7% 0px -7% 0px",
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
      className="cc-stats-strip"
      aria-label="City Coolies service trust benefits"
    >
      <div className="cc-stats-strip__shell">
        {TRUST_STATS.map(
          (item, index) => (
            <article
              key={item.headline}
              className="cc-stats-strip__item"
              style={
                {
                  "--cc-stat-index":
                    index,
                } as CSSProperties
              }
            >
              <span className="cc-stats-strip__icon">
                <TrustStatIcon
                  icon={item.icon}
                />
              </span>

              <span className="cc-stats-strip__copy">
                <strong>
                  {item.headline}
                </strong>

                <small>
                  {item.label}
                </small>
              </span>
            </article>
          ),
        )}
      </div>

      <style>{`
        .cc-stats-strip {
          --cc-red: #f51f2a;
          --cc-pink: #fff3f5;
          --cc-pink-soft: #fff9fa;
          --cc-ink: #22242b;
          --cc-muted: #68707e;

          width: 100%;

          padding:
            0 18px 30px;

          overflow: hidden;
        }

        .cc-stats-strip__shell {
          width:
            min(100%,1840px);

          min-height:
            72px;

          margin:
            0 auto;

          display:
            grid;

          grid-template-columns:
            repeat(
              4,
              minmax(0,1fr)
            );

          align-items:
            center;

          overflow:
            hidden;

          border:
            1px solid
            rgba(245,31,42,.09);

          border-radius:
            13px;

          background:
            linear-gradient(
              105deg,
              #fffafa 0%,
              #fff6f7 48%,
              #fff0f2 100%
            );

          box-shadow:
            0 12px 28px -26px
            rgba(67,14,22,.46);

          opacity:
            0;

          filter:
            blur(6px);

          transform:
            translate3d(
              0,
              18px,
              0
            )
            scale(.988);
        }

        .cc-stats-strip--visible
        .cc-stats-strip__shell {
          opacity:
            1;

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
              80ms,

            filter
              520ms
              cubic-bezier(.16,1,.3,1)
              80ms,

            transform
              650ms
              cubic-bezier(.16,1,.3,1)
              80ms;
        }


        /*
         * =====================================================
         * EACH ITEM - VIDEO SEQUENCE
         * =====================================================
         */

        .cc-stats-strip__item {
          position:
            relative;

          min-width:
            0;

          height:
            52px;

          display:
            flex;

          align-items:
            center;

          justify-content:
            center;

          gap:
            12px;

          padding:
            0 22px;

          opacity:
            0;

          filter:
            blur(5px);

          transform:
            translate3d(
              0,
              16px,
              0
            )
            scale(.97);
        }

        .cc-stats-strip--visible
        .cc-stats-strip__item {
          opacity:
            1;

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
              320ms
              cubic-bezier(.16,1,.3,1)
              calc(
                430ms +
                var(--cc-stat-index)
                * 170ms
              ),

            filter
              480ms
              cubic-bezier(.16,1,.3,1)
              calc(
                430ms +
                var(--cc-stat-index)
                * 170ms
              ),

            transform
              620ms
              cubic-bezier(.16,1,.3,1)
              calc(
                430ms +
                var(--cc-stat-index)
                * 170ms
              );
        }


        /*
         * Vertical divider
         */

        .cc-stats-strip__item:not(:last-child)::after {
          content: "";

          position:
            absolute;

          top:
            50%;

          right:
            0;

          width:
            1px;

          height:
            29px;

          background:
            rgba(245,31,42,.13);

          opacity:
            0;

          transform:
            translateY(-50%)
            scaleY(.15);

          transform-origin:
            center;
        }

        .cc-stats-strip--visible
        .cc-stats-strip__item:not(:last-child)::after {
          opacity:
            1;

          transform:
            translateY(-50%)
            scaleY(1);

          transition:
            opacity
              280ms ease
              calc(
                610ms +
                var(--cc-stat-index)
                * 170ms
              ),

            transform
              430ms
              cubic-bezier(.16,1,.3,1)
              calc(
                610ms +
                var(--cc-stat-index)
                * 170ms
              );
        }


        /*
         * =====================================================
         * ICON
         * =====================================================
         */

        .cc-stats-strip__icon {
          flex:
            0 0 auto;

          width:
            39px;

          height:
            39px;

          display:
            grid;

          place-items:
            center;

          border:
            1px solid
            rgba(245,31,42,.09);

          border-radius:
            50%;

          color:
            #17181f;

          background:
            rgba(255,255,255,.88);

          box-shadow:
            0 8px 18px -16px
            rgba(245,31,42,.36);

          opacity:
            0;

          transform:
            scale(.72)
            rotate(-6deg);
        }

        .cc-stats-strip--visible
        .cc-stats-strip__icon {
          opacity:
            1;

          transform:
            scale(1)
            rotate(0deg);

          transition:
            opacity
              300ms ease
              calc(
                550ms +
                var(--cc-stat-index)
                * 170ms
              ),

            transform
              550ms
              cubic-bezier(.16,1,.3,1)
              calc(
                550ms +
                var(--cc-stat-index)
                * 170ms
              );
        }

        .cc-stats-strip__icon svg {
          width:
            21px;

          height:
            21px;
        }


        /*
         * =====================================================
         * TEXT
         * =====================================================
         */

        .cc-stats-strip__copy {
          min-width:
            0;

          display:
            flex;

          flex-direction:
            column;

          align-items:
            flex-start;

          justify-content:
            center;

          line-height:
            1;
        }

        .cc-stats-strip__copy strong {
          color:
            var(--cc-ink);

          font-size:
            clamp(
              9px,
              .62vw,
              11px
            );

          line-height:
            1.05;

          font-weight:
            900;

          letter-spacing:
            -.015em;
        }

        .cc-stats-strip__copy small {
          margin-top:
            4px;

          color:
            var(--cc-muted);

          font-size:
            clamp(
              7px,
              .5vw,
              9px
            );

          line-height:
            1;

          font-weight:
            600;
        }


        /*
         * =====================================================
         * HOVER
         * =====================================================
         */

        .cc-stats-strip--visible
        .cc-stats-strip__item:hover
        .cc-stats-strip__icon {
          color:
            var(--cc-red);

          border-color:
            rgba(245,31,42,.18);

          background:
            #fff;

          box-shadow:
            0 12px 23px -16px
            rgba(245,31,42,.35);

          transform:
            translate3d(
              0,
              -2px,
              0
            )
            scale(1.04);
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
          .cc-stats-strip__shell {
            min-height:
              66px;
          }

          .cc-stats-strip__item {
            height:
              48px;

            gap:
              10px;

            padding:
              0 17px;
          }

          .cc-stats-strip__icon {
            width:
              35px;

            height:
              35px;
          }

          .cc-stats-strip__icon svg {
            width:
              19px;

            height:
              19px;
          }
        }


        /*
         * =====================================================
         * PHONE / TABLET
         * =====================================================
         */

        @media (max-width: 760px) {
          .cc-stats-strip {
            padding:
              0 10px 27px;
          }

          .cc-stats-strip__shell {
            grid-template-columns:
              repeat(
                2,
                minmax(0,1fr)
              );

            padding:
              7px;
          }

          .cc-stats-strip__item {
            min-height:
              64px;

            height:
              auto;

            justify-content:
              flex-start;

            padding:
              8px 12px;
          }

          .cc-stats-strip__item::after {
            display:
              none;
          }

          .cc-stats-strip__item:nth-child(1),
          .cc-stats-strip__item:nth-child(2) {
            border-bottom:
              1px solid
              rgba(245,31,42,.08);
          }

          .cc-stats-strip__item:nth-child(odd) {
            border-right:
              1px solid
              rgba(245,31,42,.08);
          }
        }

        @media (max-width: 420px) {
          .cc-stats-strip__item {
            gap:
              8px;

            padding:
              7px;
          }

          .cc-stats-strip__icon {
            width:
              33px;

            height:
              33px;
          }

          .cc-stats-strip__icon svg {
            width:
              18px;

            height:
              18px;
          }
        }


        /*
         * =====================================================
         * REDUCED MOTION
         * =====================================================
         */

        @media (
          prefers-reduced-motion:
          reduce
        ) {
          .cc-stats-strip__shell,
          .cc-stats-strip__item,
          .cc-stats-strip__icon,
          .cc-stats-strip__item::after {
            opacity:
              1 !important;

            filter:
              none !important;

            transform:
              none !important;

            transition:
              none !important;
          }
        }
      `}</style>
    </section>
  );
}