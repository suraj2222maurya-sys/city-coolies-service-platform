"use client";

import type { CSSProperties } from "react";
import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";

type TrustIconName =
  | "verified"
  | "pricing"
  | "time"
  | "payment"
  | "guarantee"
  | "support";

const TRUST_ITEMS = [
  {
    title: "Verified & Trained",
    subtitle: "Professionals",
    icon: "verified",
  },
  {
    title: "Transparent",
    subtitle: "Pricing",
    icon: "pricing",
  },
  {
    title: "On-time",
    subtitle: "Service",
    icon: "time",
  },
  {
    title: "Secure",
    subtitle: "Payments",
    icon: "payment",
  },
  {
    title: "Satisfaction",
    subtitle: "Guaranteed",
    icon: "guarantee",
  },
  {
    title: "24/7 Customer",
    subtitle: "Support",
    icon: "support",
  },
] as const;

function TrustIcon({
  icon,
}: {
  icon: TrustIconName;
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
    case "verified":
      return (
        <svg {...common}>
          <path d="M24 5 38 11v11c0 10-5.8 17-14 21-8.2-4-14-11-14-21V11L24 5Z" />
          <path d="m17 24 4 4 9-9" />
        </svg>
      );

    case "pricing":
      return (
        <svg {...common}>
          <path d="M11 7h26v34H11z" />
          <path d="M17 16h14M17 23h14M17 30h9" />
          <path d="M31 28v8M27 32h8" />
        </svg>
      );

    case "time":
      return (
        <svg {...common}>
          <circle cx="24" cy="26" r="15" />
          <path d="M24 17v10l7 4M18 5h12M24 5v6" />
        </svg>
      );

    case "payment":
      return (
        <svg {...common}>
          <rect x="7" y="12" width="34" height="25" rx="4" />
          <path d="M7 20h34M13 30h10" />
        </svg>
      );

    case "guarantee":
      return (
        <svg {...common}>
          <path d="M24 5 29 10l7-.4.4 7L42 21l-4 6 2 7-7 2-3 6-6-3-6 3-3-6-7-2 2-7-4-6 5.6-4.4.4-7 7 .4L24 5Z" />
          <path d="m17.5 24 4.2 4.2 9-9" />
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

function SearchIcon() {
  return (
    <svg
      viewBox="0 0 48 48"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <circle cx="20" cy="20" r="11" />
      <path d="m28 28 11 11" />
    </svg>
  );
}

export default function ServicesTrustOfferSection() {
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
        "cc-trust-shop--visible",
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
            "cc-trust-shop--visible",
            entry.isIntersecting,
          );
        },
        {
          threshold: 0.08,
          rootMargin: "8% 0px -8% 0px",
        },
      );

    observer.observe(section);

    return () => {
      observer.disconnect();
    };
  }, []);

  function handleFindServices() {
    const destination =
      document.getElementById(
        "all-services-catalog",
      );

    if (!destination) {
      window.location.hash =
        "all-services-catalog";

      return;
    }

    destination.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });

    window.history.replaceState(
      null,
      "",
      "#all-services-catalog",
    );
  }

  function handleOfferClick() {
    void fetch(
      "/api/service-offers/home-services",
      {
        method: "POST",

        headers: {
          "Content-Type":
            "application/json",
        },

        body: JSON.stringify({
          source:
            "services-trust-offer",

          offerCode:
            "HOME20",

          destination:
            "/services#all-services-catalog",
        }),

        keepalive: true,
      },
    ).catch(() => undefined);
  }

  return (
    <section
      ref={sectionRef}
      className="cc-trust-shop"
      aria-label="Why choose City Coolies and current home service offer"
    >
      <div className="cc-trust-shop__shell">
        <article className="cc-trust-shop__why">
          <h2>
            Why Choose City Coolies?
          </h2>

          <div className="cc-trust-shop__benefits">
            {TRUST_ITEMS.map(
              (item, index) => (
                <div
                  key={`${item.title}-${item.subtitle}`}
                  className="cc-trust-shop__benefit"
                  style={
                    {
                      "--cc-benefit-index":
                        index,
                    } as CSSProperties
                  }
                >
                  <span className="cc-trust-shop__icon">
                    <TrustIcon
                      icon={item.icon}
                    />
                  </span>

                  <strong>
                    {item.title}
                  </strong>

                  <small>
                    {item.subtitle}
                  </small>
                </div>
              ),
            )}

            <button
              type="button"
              className="cc-trust-shop__find"
              onClick={handleFindServices}
              aria-label="Find a City Coolies service"
            >
              <span className="cc-trust-shop__find-icon">
                <SearchIcon />
              </span>

              <span className="cc-trust-shop__find-copy">
                <strong>
                  Find
                </strong>

                <small>
                  Services
                </small>
              </span>
            </button>
          </div>
        </article>

        <article className="cc-trust-shop__offer">
          <Image
            src="/sparkling_home_care_banner.png"
            alt="City Coolies home service professional"
            fill
            loading="lazy"
            sizes="(max-width: 900px) 100vw, 50vw"
            className="cc-trust-shop__offer-image"
          />

          <span
            className="cc-trust-shop__offer-shade"
            aria-hidden="true"
          />

          <div className="cc-trust-shop__offer-copy">
            <span className="cc-trust-shop__offer-badge">
              Limited Time Offer
            </span>

            <h2>
              Up to 20% OFF
              <br />
              <span>
                On all Home Services
              </span>
            </h2>

            <Link
              href="#all-services-catalog"
              className="cc-trust-shop__offer-button"
              onClick={handleOfferClick}
            >
              Book Now &amp; Save

              <span aria-hidden="true">
                →
              </span>
            </Link>
          </div>

          <span
            className="cc-trust-shop__discount"
            aria-hidden="true"
          >
            <strong>
              20%
            </strong>

            <small>
              OFF
            </small>
          </span>
        </article>
      </div>

      <style>{`
        .cc-trust-shop {
          --cc-red: #f51f2a;
          --cc-red-dark: #d80e1b;
          --cc-pink: #fff1f3;
          --cc-pink-soft: #fff8f9;
          --cc-ink: #17181f;
          --cc-muted: #727987;

          width: 100%;

          padding:
            7px 18px 32px;

          overflow: hidden;
        }

        .cc-trust-shop__shell {
          width:
            min(100%,1840px);

          margin:
            0 auto;

          display:
            grid;

          grid-template-columns:
            minmax(0,1.05fr)
            minmax(0,.95fr);

          gap:
            14px;

          /*
           * Important:
           * no forced giant stretching.
           */
          align-items:
            stretch;
        }


        /*
         * ==========================================
         * WHY CHOOSE BOX
         * ==========================================
         */

        .cc-trust-shop__why {
          min-width: 0;

          height:
            168px;

          padding:
            13px 13px 12px;

          overflow: hidden;

          border:
            1px solid
            rgba(245,31,42,.12);

          border-radius:
            16px;

          background:
            radial-gradient(
              circle at 8% 0%,
              rgba(255,219,224,.44),
              transparent 31%
            ),
            linear-gradient(
              135deg,
              #ffffff 0%,
              #fff8f9 42%,
              #fff0f2 100%
            );

          box-shadow:
            0 14px 32px -27px
            rgba(65,13,21,.46);

          opacity: 0;

          filter:
            blur(5px);

          transform:
            translate3d(
              -22px,
              12px,
              0
            );
        }

        .cc-trust-shop--visible
        .cc-trust-shop__why {
          opacity: 1;

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
              360ms
              cubic-bezier(.16,1,.3,1),

            filter
              520ms
              cubic-bezier(.16,1,.3,1),

            transform
              650ms
              cubic-bezier(.16,1,.3,1);
        }

        .cc-trust-shop__why h2 {
          margin:
            0 0 10px;

          color:
            var(--cc-ink);

          font-size:
            clamp(
              18px,
              1.2vw,
              23px
            );

          line-height:
            1;

          font-weight:
            900;

          letter-spacing:
            -.035em;
        }


        /*
         * ==========================================
         * 6 TRUST CARDS + FIND BUTTON
         * ==========================================
         */

        .cc-trust-shop__benefits {
          display:
            grid;

          grid-template-columns:
            repeat(
              6,
              minmax(0,1fr)
            )
            minmax(74px,.72fr);

          gap:
            7px;
        }

        .cc-trust-shop__benefit,
        .cc-trust-shop__find {
          height:
            104px;

          min-width:
            0;

          border:
            1px solid
            rgba(245,31,42,.09);

          border-radius:
            11px;

          background:
            rgba(255,255,255,.96);

          box-shadow:
            0 9px 21px -19px
            rgba(62,14,21,.48);
        }

        .cc-trust-shop__benefit {
          display: flex;

          flex-direction:
            column;

          align-items:
            center;

          justify-content:
            center;

          padding:
            7px 4px;

          text-align:
            center;

          opacity: 0;

          transform:
            translate3d(
              0,
              15px,
              0
            )
            scale(.965);
        }

        .cc-trust-shop--visible
        .cc-trust-shop__benefit {
          opacity: 1;

          transform:
            translate3d(
              0,
              0,
              0
            )
            scale(1);

          transition:
            opacity
              280ms
              cubic-bezier(.16,1,.3,1)
              calc(
                230ms +
                var(--cc-benefit-index)
                * 70ms
              ),

            transform
              470ms
              cubic-bezier(.16,1,.3,1)
              calc(
                230ms +
                var(--cc-benefit-index)
                * 70ms
              ),

            border-color
              170ms ease,

            box-shadow
              170ms ease;
        }

        .cc-trust-shop__benefit:hover {
          border-color:
            rgba(245,31,42,.23);

          box-shadow:
            0 15px 27px -20px
            rgba(245,31,42,.28);
        }

        .cc-trust-shop__icon {
          width:
            34px;

          height:
            34px;

          display:
            grid;

          place-items:
            center;

          margin-bottom:
            6px;

          border:
            1px solid
            rgba(245,31,42,.13);

          border-radius:
            10px;

          color:
            var(--cc-red);

          background:
            linear-gradient(
              145deg,
              #ffffff,
              #ffeff1
            );
        }

        .cc-trust-shop__icon svg {
          width:
            18px;

          height:
            18px;
        }

        .cc-trust-shop__benefit strong {
          color:
            #33363e;

          font-size:
            8.5px;

          line-height:
            1.08;

          font-weight:
            850;
        }

        .cc-trust-shop__benefit small {
          margin-top:
            2px;

          color:
            #747b88;

          font-size:
            7.4px;

          line-height:
            1.05;

          font-weight:
            650;
        }


        /*
         * ==========================================
         * WORKING FIND SERVICES BUTTON
         * ==========================================
         */

        .cc-trust-shop__find {
          appearance:
            none;

          cursor:
            pointer;

          display:
            flex;

          flex-direction:
            column;

          align-items:
            center;

          justify-content:
            center;

          gap:
            5px;

          padding:
            6px;

          color:
            var(--cc-red);

          opacity:
            0;

          transform:
            translate3d(
              0,
              15px,
              0
            )
            scale(.965);

          transition:
            background
              180ms ease,

            color
              180ms ease,

            border-color
              180ms ease,

            transform
              180ms ease,

            box-shadow
              180ms ease;
        }

        .cc-trust-shop--visible
        .cc-trust-shop__find {
          opacity: 1;

          transform:
            translate3d(
              0,
              0,
              0
            )
            scale(1);

          transition:
            opacity
              300ms
              cubic-bezier(.16,1,.3,1)
              690ms,

            transform
              470ms
              cubic-bezier(.16,1,.3,1)
              690ms,

            background
              180ms ease,

            color
              180ms ease,

            border-color
              180ms ease,

            box-shadow
              180ms ease;
        }

        .cc-trust-shop__find:hover {
          color:
            #ffffff;

          border-color:
            var(--cc-red);

          background:
            linear-gradient(
              135deg,
              #ff303b,
              #e31320
            );

          box-shadow:
            0 14px 26px -17px
            rgba(245,31,42,.70);

          transform:
            translate3d(
              0,
              -3px,
              0
            )
            !important;
        }

        .cc-trust-shop__find-icon {
          width:
            31px;

          height:
            31px;

          display:
            grid;

          place-items:
            center;

          border-radius:
            50%;

          background:
            #fff1f3;

          transition:
            background
              180ms ease;
        }

        .cc-trust-shop__find:hover
        .cc-trust-shop__find-icon {
          background:
            rgba(255,255,255,.18);
        }

        .cc-trust-shop__find-icon svg {
          width:
            17px;

          height:
            17px;
        }

        .cc-trust-shop__find-copy {
          display: flex;

          flex-direction:
            column;

          line-height:
            1;
        }

        .cc-trust-shop__find-copy strong {
          font-size:
            8px;

          font-weight:
            900;
        }

        .cc-trust-shop__find-copy small {
          margin-top:
            2px;

          font-size:
            7px;

          font-weight:
            700;
        }


        /*
         * ==========================================
         * RIGHT OFFER
         *
         * Same compact height as trust section.
         * ==========================================
         */

        .cc-trust-shop__offer {
          position:
            relative;

          height:
            168px;

          min-width:
            0;

          overflow:
            hidden;

          isolation:
            isolate;

          border:
            1px solid
            rgba(245,31,42,.14);

          border-radius:
            16px;

          background:
            linear-gradient(
              110deg,
              #ffffff,
              #fff1f3 54%,
              #ffdfe4
            );

          box-shadow:
            0 14px 32px -27px
            rgba(65,13,21,.48);

          opacity: 0;

          filter:
            blur(5px);

          transform:
            translate3d(
              22px,
              12px,
              0
            );
        }

        .cc-trust-shop--visible
        .cc-trust-shop__offer {
          opacity: 1;

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
              390ms
              cubic-bezier(.16,1,.3,1)
              180ms,

            filter
              550ms
              cubic-bezier(.16,1,.3,1)
              180ms,

            transform
              680ms
              cubic-bezier(.16,1,.3,1)
              180ms;
        }


        /*
         * Woman remains clear and moved left.
         */

        .cc-trust-shop__offer-image {
          z-index:
            1 !important;

          width:
            112% !important;

          height:
            100% !important;

          left:
            -12% !important;

          right:
            auto !important;

          object-fit:
            cover !important;

          object-position:
            center center !important;

          opacity:
            1 !important;

          filter:
            none !important;

          transform:
            none !important;

          animation:
            none !important;
        }


        /*
         * Text protection only on left side.
         */

        .cc-trust-shop__offer-shade {
          position:
            absolute;

          z-index:
            2;

          inset:
            0 auto 0 0;

          width:
            62%;

          pointer-events:
            none;

          background:
            linear-gradient(
              90deg,
              #ffffff 0%,
              rgba(255,249,250,.99) 35%,
              rgba(255,238,241,.91) 64%,
              rgba(255,229,233,.32) 87%,
              transparent 100%
            );
        }

        .cc-trust-shop__offer-copy {
          position:
            absolute;

          z-index:
            4;

          top:
            50%;

          left:
            4%;

          width:
            45%;

          transform:
            translateY(-50%);
        }

        .cc-trust-shop__offer-badge {
          display:
            inline-flex;

          padding:
            4px 8px;

          margin-bottom:
            6px;

          border-radius:
            999px;

          color:
            #ffffff;

          background:
            linear-gradient(
              135deg,
              #ff303b,
              #df111e
            );

          font-size:
            7px;

          font-weight:
            900;

          line-height:
            1;

          text-transform:
            uppercase;
        }

        .cc-trust-shop__offer h2 {
          margin:
            0;

          color:
            var(--cc-ink);

          font-size:
            clamp(
              20px,
              1.55vw,
              29px
            );

          line-height:
            .98;

          font-weight:
            900;

          letter-spacing:
            -.042em;
        }

        .cc-trust-shop__offer h2 span {
          font-size:
            .88em;
        }

        .cc-trust-shop__offer-button {
          display:
            inline-flex;

          align-items:
            center;

          gap:
            8px;

          height:
            34px;

          margin-top:
            9px;

          padding:
            0 12px;

          border-radius:
            8px;

          color:
            #ffffff;

          text-decoration:
            none;

          background:
            linear-gradient(
              135deg,
              #ff303b,
              #e0101d
            );

          box-shadow:
            0 11px 22px -15px
            rgba(245,31,42,.9);

          font-size:
            8.5px;

          font-weight:
            850;

          transition:
            transform
              180ms ease,

            box-shadow
              180ms ease;
        }

        .cc-trust-shop__offer-button:hover {
          transform:
            translate3d(
              3px,
              -2px,
              0
            );

          box-shadow:
            0 14px 25px -14px
            rgba(245,31,42,1);
        }

        .cc-trust-shop__discount {
          position:
            absolute;

          z-index:
            6;

          top:
            8px;

          right:
            10px;

          width:
            55px;

          height:
            55px;

          display:
            flex;

          flex-direction:
            column;

          align-items:
            center;

          justify-content:
            center;

          border:
            2px solid
            rgba(255,255,255,.94);

          border-radius:
            50%;

          color:
            #ffffff;

          background:
            linear-gradient(
              145deg,
              #ff303b,
              #d90917
            );

          box-shadow:
            0 13px 25px -14px
            rgba(220,10,24,.86);
        }

        .cc-trust-shop__discount strong {
          font-size:
            14px;

          line-height:
            1;

          font-weight:
            950;
        }

        .cc-trust-shop__discount small {
          margin-top:
            2px;

          font-size:
            7px;

          font-weight:
            900;
        }


        /*
         * ==========================================
         * LAPTOP
         * ==========================================
         */

        @media (
          min-width: 1000px
        )
        and (
          max-width: 1399px
        ) {
          .cc-trust-shop__why,
          .cc-trust-shop__offer {
            height:
              158px;
          }

          .cc-trust-shop__benefit,
          .cc-trust-shop__find {
            height:
              94px;
          }

          .cc-trust-shop__benefits {
            gap:
              5px;
          }

          .cc-trust-shop__benefit strong {
            font-size:
              7.5px;
          }

          .cc-trust-shop__benefit small {
            font-size:
              6.7px;
          }
        }


        /*
         * ==========================================
         * TABLET
         * ==========================================
         */

        @media (max-width: 999px) {
          .cc-trust-shop__shell {
            grid-template-columns:
              1fr;
          }

          .cc-trust-shop__why {
            height:
              auto;
          }

          .cc-trust-shop__benefits {
            grid-template-columns:
              repeat(6,minmax(0,1fr))
              72px;
          }
        }


        /*
         * ==========================================
         * PHONE
         * ==========================================
         */

        @media (max-width: 680px) {
          .cc-trust-shop {
            padding:
              6px 10px 28px;
          }

          .cc-trust-shop__why {
            padding:
              13px 10px;
          }

          .cc-trust-shop__benefits {
            grid-template-columns:
              repeat(2,minmax(0,1fr));
          }

          .cc-trust-shop__benefit {
            height:
              86px;
          }

          .cc-trust-shop__find {
            grid-column:
              1 / -1;

            height:
              48px;

            flex-direction:
              row;

            gap:
              8px;
          }

          .cc-trust-shop__offer {
            height:
              300px;
          }

          .cc-trust-shop__offer-image {
            left:
              -9% !important;

            width:
              109% !important;

            height:
              68% !important;

            top:
              auto !important;

            bottom:
              0 !important;
          }

          .cc-trust-shop__offer-shade {
            width:
              100%;

            height:
              55%;

            background:
              linear-gradient(
                180deg,
                #ffffff,
                rgba(255,243,245,.98) 65%,
                transparent
              );
          }

          .cc-trust-shop__offer-copy {
            top:
              17px;

            left:
              15px;

            width:
              calc(100% - 30px);

            transform:
              none;
          }
        }


        /*
         * ==========================================
         * ACCESSIBILITY
         * ==========================================
         */

        @media (
          prefers-reduced-motion:
          reduce
        ) {
          .cc-trust-shop__why,
          .cc-trust-shop__offer,
          .cc-trust-shop__benefit,
          .cc-trust-shop__find {
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
      
        /* CC_TRUST_OFFER_VIDEO_MOTION_START */

        /*
         * =====================================================
         * CITY COOLIES - TRUST + OFFER VIDEO MOTION
         *
         * ORDER:
         *
         * 1. Why Choose City Coolies?
         * 2. Six trust cards one-by-one
         * 3. Find Services
         * 4. Offer box
         * 5. Offer badge
         * 6. Offer heading
         * 7. CTA
         * 8. Worker image
         * 9. 20% badge
         *
         * Existing layout/content/functionality unchanged.
         * =====================================================
         */


        /*
         * =====================================================
         * LEFT CONTAINER
         * =====================================================
         */

        .cc-trust-shop__why {
          opacity:
            1 !important;

          filter:
            none !important;

          transform:
            none !important;
        }


        /*
         * =====================================================
         * HEADING FIRST
         * Writing / cinematic reveal
         * =====================================================
         */

        .cc-trust-shop__why > h2 {
          position:
            relative;

          width:
            fit-content;

          opacity:
            0 !important;

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
              8px,
              0
            );

          will-change:
            opacity,
            clip-path,
            filter,
            transform;
        }

        .cc-trust-shop--visible
        .cc-trust-shop__why > h2 {
          opacity:
            1 !important;

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
              280ms
              cubic-bezier(.16,1,.3,1)
              60ms,

            clip-path
              680ms
              steps(18,end)
              80ms,

            filter
              480ms
              cubic-bezier(.16,1,.3,1)
              60ms,

            transform
              560ms
              cubic-bezier(.16,1,.3,1)
              60ms
            !important;
        }


        /*
         * Small red line after heading.
         */

        .cc-trust-shop__why > h2::after {
          content: "";

          position:
            absolute;

          left:
            0;

          bottom:
            -6px;

          width:
            30px;

          height:
            2px;

          border-radius:
            999px;

          background:
            linear-gradient(
              90deg,
              #f51f2a,
              rgba(245,31,42,0)
            );

          opacity:
            0;

          transform:
            scaleX(.1);

          transform-origin:
            left center;
        }

        .cc-trust-shop--visible
        .cc-trust-shop__why > h2::after {
          opacity:
            1;

          transform:
            scaleX(1);

          transition:
            opacity
              240ms ease
              560ms,

            transform
              440ms
              cubic-bezier(.16,1,.3,1)
              560ms;
        }


        /*
         * =====================================================
         * TRUST CARDS
         * One-by-one after heading.
         * =====================================================
         */

        .cc-trust-shop
        .cc-trust-shop__benefit {
          opacity:
            0 !important;

          filter:
            blur(6px);

          transform:
            translate3d(
              0,
              22px,
              0
            )
            scale(.965)
            !important;

          will-change:
            opacity,
            filter,
            transform;
        }

        .cc-trust-shop--visible
        .cc-trust-shop__benefit {
          opacity:
            1 !important;

          filter:
            blur(0);

          transform:
            translate3d(
              0,
              0,
              0
            )
            scale(1)
            !important;

          transition:
            opacity
              340ms
              cubic-bezier(.16,1,.3,1)
              calc(
                720ms +
                var(--cc-benefit-index)
                * 120ms
              ),

            filter
              500ms
              cubic-bezier(.16,1,.3,1)
              calc(
                720ms +
                var(--cc-benefit-index)
                * 120ms
              ),

            transform
              620ms
              cubic-bezier(.16,1,.3,1)
              calc(
                720ms +
                var(--cc-benefit-index)
                * 120ms
              ),

            border-color
              180ms ease,

            box-shadow
              180ms ease
            !important;
        }


        /*
         * Icon arrives with a tiny premium pop.
         */

        .cc-trust-shop
        .cc-trust-shop__benefit
        .cc-trust-shop__icon {
          transform:
            scale(.78)
            rotate(-4deg);

          opacity:
            .25;
        }

        .cc-trust-shop--visible
        .cc-trust-shop__benefit
        .cc-trust-shop__icon {
          transform:
            scale(1)
            rotate(0deg);

          opacity:
            1;

          transition:
            opacity
              320ms ease
              calc(
                870ms +
                var(--cc-benefit-index)
                * 120ms
              ),

            transform
              520ms
              cubic-bezier(.16,1,.3,1)
              calc(
                870ms +
                var(--cc-benefit-index)
                * 120ms
              );
        }


        /*
         * =====================================================
         * FIND SERVICES AFTER SIX CARDS
         * =====================================================
         */

        .cc-trust-shop
        .cc-trust-shop__find {
          opacity:
            0 !important;

          filter:
            blur(5px);

          transform:
            translate3d(
              15px,
              0,
              0
            )
            scale(.94)
            !important;
        }

        .cc-trust-shop--visible
        .cc-trust-shop__find {
          opacity:
            1 !important;

          filter:
            blur(0);

          transform:
            translate3d(
              0,
              0,
              0
            )
            scale(1)
            !important;

          transition:
            opacity
              350ms
              cubic-bezier(.16,1,.3,1)
              1510ms,

            filter
              480ms
              cubic-bezier(.16,1,.3,1)
              1510ms,

            transform
              600ms
              cubic-bezier(.16,1,.3,1)
              1510ms,

            color
              180ms ease,

            background
              180ms ease,

            border-color
              180ms ease,

            box-shadow
              180ms ease
            !important;
        }


        /*
         * =====================================================
         * OFFER BOX
         *
         * Enter only after left-side journey has begun.
         * =====================================================
         */

        .cc-trust-shop
        .cc-trust-shop__offer {
          opacity:
            0 !important;

          filter:
            blur(8px);

          transform:
            translate3d(
              42px,
              0,
              0
            )
            scale(.975)
            !important;

          will-change:
            opacity,
            filter,
            transform;
        }

        .cc-trust-shop--visible
        .cc-trust-shop__offer {
          opacity:
            1 !important;

          filter:
            blur(0);

          transform:
            translate3d(
              0,
              0,
              0
            )
            scale(1)
            !important;

          transition:
            opacity
              460ms
              cubic-bezier(.16,1,.3,1)
              900ms,

            filter
              700ms
              cubic-bezier(.16,1,.3,1)
              900ms,

            transform
              820ms
              cubic-bezier(.16,1,.3,1)
              900ms
            !important;
        }


        /*
         * =====================================================
         * OFFER IMAGE
         * Clear cinematic slide.
         * NO blur after reveal.
         * =====================================================
         */

        .cc-trust-shop
        .cc-trust-shop__offer-image {
          opacity:
            0 !important;

          filter:
            blur(7px)
            saturate(.92);

          transform:
            translate3d(
              34px,
              0,
              0
            )
            scale(1.025)
            !important;
        }

        .cc-trust-shop--visible
        .cc-trust-shop__offer-image {
          opacity:
            1 !important;

          filter:
            blur(0)
            saturate(1);

          transform:
            translate3d(
              0,
              0,
              0
            )
            scale(1)
            !important;

          transition:
            opacity
              550ms
              cubic-bezier(.16,1,.3,1)
              1180ms,

            filter
              760ms
              cubic-bezier(.16,1,.3,1)
              1180ms,

            transform
              900ms
              cubic-bezier(.16,1,.3,1)
              1180ms
            !important;
        }


        /*
         * =====================================================
         * OFFER CONTENT SEQUENCE
         * =====================================================
         */

        .cc-trust-shop
        .cc-trust-shop__offer-badge,

        .cc-trust-shop
        .cc-trust-shop__offer-copy h2,

        .cc-trust-shop
        .cc-trust-shop__offer-button {
          opacity:
            0;

          filter:
            blur(4px);

          transform:
            translate3d(
              0,
              13px,
              0
            );
        }


        /*
         * Limited Time Offer
         */

        .cc-trust-shop--visible
        .cc-trust-shop__offer-badge {
          opacity:
            1;

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
              310ms ease
              1120ms,

            filter
              460ms ease
              1120ms,

            transform
              540ms
              cubic-bezier(.16,1,.3,1)
              1120ms;
        }


        /*
         * Main offer heading
         */

        .cc-trust-shop--visible
        .cc-trust-shop__offer-copy h2 {
          opacity:
            1;

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
              340ms ease
              1280ms,

            filter
              500ms ease
              1280ms,

            transform
              600ms
              cubic-bezier(.16,1,.3,1)
              1280ms;
        }


        /*
         * CTA
         */

        .cc-trust-shop--visible
        .cc-trust-shop__offer-button {
          opacity:
            1;

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
              340ms ease
              1460ms,

            filter
              480ms ease
              1460ms,

            transform
              590ms
              cubic-bezier(.16,1,.3,1)
              1460ms,

            box-shadow
              180ms ease
            !important;
        }


        /*
         * =====================================================
         * DISCOUNT BADGE LAST
         * =====================================================
         */

        .cc-trust-shop
        .cc-trust-shop__discount {
          opacity:
            0;

          filter:
            blur(4px);

          transform:
            translate3d(
              0,
              -12px,
              0
            )
            scale(.65)
            rotate(-9deg);
        }

        .cc-trust-shop--visible
        .cc-trust-shop__discount {
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
            scale(1)
            rotate(0deg);

          transition:
            opacity
              320ms ease
              1640ms,

            filter
              450ms ease
              1640ms,

            transform
              650ms
              cubic-bezier(.16,1,.3,1)
              1640ms;
        }


        /*
         * After entrance, subtle floating badge.
         */

        .cc-trust-shop--visible
        .cc-trust-shop__discount {
          animation:
            ccTrustOfferBadgeFloat
            2.8s
            ease-in-out
            2350ms
            infinite;
        }

        @keyframes ccTrustOfferBadgeFloat {
          0%,
          100% {
            translate:
              0 0;
          }

          50% {
            translate:
              0 -3px;
          }
        }


        /*
         * =====================================================
         * PREMIUM HOVER - TRUST CARDS
         * =====================================================
         */

        .cc-trust-shop--visible
        .cc-trust-shop__benefit:hover {
          transform:
            translate3d(
              0,
              -4px,
              0
            )
            scale(1.015)
            !important;

          border-color:
            rgba(245,31,42,.25)
            !important;

          box-shadow:
            0 16px 28px -20px
            rgba(245,31,42,.26)
            !important;

          transition:
            transform
              180ms
              cubic-bezier(.16,1,.3,1),

            border-color
              180ms ease,

            box-shadow
              180ms ease
            !important;
        }


        /*
         * CTA tiny arrow movement
         */

        .cc-trust-shop__offer-button
        > span:last-child {
          transition:
            transform
            180ms
            cubic-bezier(.16,1,.3,1);
        }

        .cc-trust-shop__offer-button:hover
        > span:last-child {
          transform:
            translateX(3px);
        }


        /*
         * =====================================================
         * PHONE
         *
         * Same cinematic order but faster.
         * =====================================================
         */

        @media (max-width: 680px) {

          .cc-trust-shop--visible
          .cc-trust-shop__benefit {
            transition:
              opacity
                300ms
                cubic-bezier(.16,1,.3,1)
                calc(
                  600ms +
                  var(--cc-benefit-index)
                  * 90ms
                ),

              filter
                420ms
                cubic-bezier(.16,1,.3,1)
                calc(
                  600ms +
                  var(--cc-benefit-index)
                  * 90ms
                ),

              transform
                540ms
                cubic-bezier(.16,1,.3,1)
                calc(
                  600ms +
                  var(--cc-benefit-index)
                  * 90ms
                )
              !important;
          }

          .cc-trust-shop--visible
          .cc-trust-shop__find {
            transition-delay:
              1210ms,
              1210ms,
              1210ms,
              0ms,
              0ms,
              0ms,
              0ms
              !important;
          }

          .cc-trust-shop--visible
          .cc-trust-shop__offer {
            transition-delay:
              760ms,
              760ms,
              760ms
              !important;
          }

          .cc-trust-shop--visible
          .cc-trust-shop__offer-image {
            transition-delay:
              1000ms,
              1000ms,
              1000ms
              !important;
          }

          .cc-trust-shop--visible
          .cc-trust-shop__offer-badge {
            transition-delay:
              920ms,
              920ms,
              920ms;
          }

          .cc-trust-shop--visible
          .cc-trust-shop__offer-copy h2 {
            transition-delay:
              1080ms,
              1080ms,
              1080ms;
          }

          .cc-trust-shop--visible
          .cc-trust-shop__offer-button {
            transition-delay:
              1240ms,
              1240ms,
              1240ms,
              0ms;
          }

          .cc-trust-shop--visible
          .cc-trust-shop__discount {
            transition-delay:
              1420ms,
              1420ms,
              1420ms;
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
          .cc-trust-shop__why > h2,
          .cc-trust-shop__benefit,
          .cc-trust-shop__benefit
          .cc-trust-shop__icon,
          .cc-trust-shop__find,
          .cc-trust-shop__offer,
          .cc-trust-shop__offer-image,
          .cc-trust-shop__offer-badge,
          .cc-trust-shop__offer-copy h2,
          .cc-trust-shop__offer-button,
          .cc-trust-shop__discount {
            opacity:
              1 !important;

            filter:
              none !important;

            clip-path:
              none !important;

            transform:
              none !important;

            transition:
              none !important;

            animation:
              none !important;
          }

          .cc-trust-shop__why > h2::after {
            opacity:
              1 !important;

            transform:
              scaleX(1)
              !important;

            transition:
              none !important;
          }
        }

        /* CC_TRUST_OFFER_VIDEO_MOTION_END */
`}</style>
    </section>
  );
}