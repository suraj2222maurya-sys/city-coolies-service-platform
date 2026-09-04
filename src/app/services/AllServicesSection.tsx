"use client";

import type { CSSProperties } from "react";
import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";

type ServiceIconKey =
  | "cleaning"
  | "renovation"
  | "electrical"
  | "plumbing"
  | "painting"
  | "construction"
  | "appliance"
  | "carpentry"
  | "moving"
  | "pest"
  | "spa"
  | "fabrication"
  | "gardening";

type ServiceCard = {
  title: string;
  href: string;
  image: string;
  description: string;
  icon: ServiceIconKey;
};

const SERVICES = [
  {
    title: "Deep Cleaning",
    href: "/services/deep-cleaning",
    image: "/deep-cleaning-service.png",
    description: "Complete deep cleaning for homes, offices and commercial spaces.",
    icon: "cleaning",
  },  {
    title: "Renovation",
    href: "/services/renovation",
    image: "/renovation-service.png",
    description: "Full and partial renovation services to transform your space.",
    icon: "renovation",
  },  {
    title: "Electrical Works",
    href: "/services/electrical-works",
    image: "/electrical-works-service.png",
    description: "Electrical installation, repairs, maintenance and AC services.",
    icon: "electrical",
  },  {
    title: "Plumbing Works",
    href: "/services/plumbing-works",
    image: "/plumbing-works-service.png",
    description: "Plumbing repair, installation, fittings and maintenance services.",
    icon: "plumbing",
  },  {
    title: "Painting Services",
    href: "/services/painting-services",
    image: "/painting-services-service.png",
    description: "Interior and exterior painting with clean, professional finishing.",
    icon: "painting",
  },  {
    title: "Civil Construction \u0026 Maintenance",
    href: "/services/civil-construction-maintenance",
    image: "/civil-construction-maintenance-service.png",
    description: "Construction, repair and maintenance for residential and commercial projects.",
    icon: "construction",
  },  {
    title: "Appliance Repair",
    href: "/services/appliance-repair",
    image: "/appliance-repair-service.png",
    description: "Repair and servicing for home and office appliances.",
    icon: "appliance",
  },  {
    title: "Carpentry \u0026 Interior Works",
    href: "/services/carpentry-interior-works",
    image: "/carpentry-interior-works-service.png",
    description: "Custom carpentry, furniture and interior work for modern spaces.",
    icon: "carpentry",
  },  {
    title: "Packers \u0026 Movers",
    href: "/services/packers-movers",
    image: "/packers-movers-service.png",
    description: "Safe packing, moving and relocation for homes and offices.",
    icon: "moving",
  },  {
    title: "Pest Control",
    href: "/services/pest-control",
    image: "/pest-control-service.png",
    description: "Effective pest-control solutions for cleaner, safer spaces.",
    icon: "pest",
  },  {
    title: "Spa \u0026 Salon Services",
    href: "/services/spa-salon-services",
    image: "/spa-salon-services-service.png",
    description: "Professional beauty, spa and salon services for convenient care.",
    icon: "spa",
  },  {
    title: "Fabrication Works",
    href: "/services/fabrication-works",
    image: "/fabrication-works-service.png",
    description: "Metal fabrication, welding and structural work for varied requirements.",
    icon: "fabrication",
  },  {
    title: "Gardening \u0026 Landscaping",
    href: "/services/gardening-landscaping",
    image: "/gardening-landscaping-service.png",
    description: "Garden maintenance, landscaping and lawn care for greener spaces.",
    icon: "gardening",
  },
] as const satisfies readonly ServiceCard[];

function ServiceIcon({
  kind,
}: {
  kind: ServiceIconKey;
}) {
  let paths: React.ReactNode;

  switch (kind) {
    case "cleaning":
      paths = (
        <>
          <path d="M11 20h18l-2 20H13z" />
          <path d="M15 20c0-5 2-8 5-8s5 3 5 8" />
          <path d="m34 8 1.4 3.6L39 13l-3.6 1.4L34 18l-1.4-3.6L29 13l3.6-1.4z" />
        </>
      );
      break;

    case "renovation":
      paths = (
        <>
          <path d="M8 24 24 10l16 14" />
          <path d="M12 21v20h24V21" />
          <path d="m30 9 9 9" />
          <path d="m34 5 9 9-5 5-9-9z" />
        </>
      );
      break;

    case "electrical":
      paths = (
        <>
          <path d="M27 4 13 27h10l-3 17 15-25H25z" />
        </>
      );
      break;

    case "plumbing":
      paths = (
        <>
          <path d="M8 16h22" />
          <path d="M18 10v12" />
          <path d="M30 12h8v10h-8" />
          <path d="M34 22v7" />
          <path d="M34 29c0 7-10 7-10 0" />
        </>
      );
      break;

    case "painting":
      paths = (
        <>
          <path d="M8 9h24v11H8z" />
          <path d="M32 14h6v10H20v7" />
          <path d="M20 31v12" />
          <path d="M16 43h8" />
        </>
      );
      break;

    case "construction":
      paths = (
        <>
          <path d="M10 42V18h12v24" />
          <path d="M22 42V9h16v33" />
          <path d="M14 24h4M14 30h4M14 36h4" />
          <path d="M27 16h6M27 23h6M27 30h6M27 37h6" />
        </>
      );
      break;

    case "appliance":
      paths = (
        <>
          <rect x="10" y="6" width="28" height="36" rx="3" />
          <path d="M10 18h28" />
          <circle cx="30" cy="12" r="2" />
          <circle cx="18" cy="30" r="7" />
        </>
      );
      break;

    case "carpentry":
      paths = (
        <>
          <path d="m9 35 25-25 6 6-25 25H9z" />
          <path d="m30 14 6 6" />
          <path d="M8 12h13M8 18h9" />
        </>
      );
      break;

    case "moving":
      paths = (
        <>
          <path d="M5 14h25v22H5z" />
          <path d="M30 22h8l5 7v7H30z" />
          <circle cx="14" cy="38" r="4" />
          <circle cx="36" cy="38" r="4" />
        </>
      );
      break;

    case "pest":
      paths = (
        <>
          <ellipse cx="24" cy="26" rx="8" ry="12" />
          <path d="M20 14 16 9M28 14l4-5" />
          <path d="M16 21 8 17M16 28 7 30M32 21l8-4M32 28l9 2" />
          <path d="M24 14v24" />
        </>
      );
      break;

    case "spa":
      paths = (
        <>
          <path d="M24 40c-9-6-14-13-14-20 7 0 11 3 14 9 3-6 7-9 14-9 0 7-5 14-14 20Z" />
          <path d="M24 29c-5-5-6-11 0-18 6 7 5 13 0 18Z" />
        </>
      );
      break;

    case "fabrication":
      paths = (
        <>
          <path d="M8 36 31 13" />
          <path d="m28 10 10 10" />
          <path d="M34 8v-4M40 12h4M39 6l3-3" />
          <path d="M9 42h24" />
        </>
      );
      break;

    case "gardening":
      paths = (
        <>
          <path d="M24 42V23" />
          <path d="M24 29c-9 0-14-5-14-14 9 0 14 5 14 14Z" />
          <path d="M24 23c0-9 5-14 14-14 0 9-5 14-14 14Z" />
          <path d="M15 42h18" />
        </>
      );
      break;
  }

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
      {paths}
    </svg>
  );
}

export default function AllServicesSection() {
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
        "cc-all-services--visible",
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
            "cc-all-services--visible",
            entry.isIntersecting,
          );
        },
        {
          threshold: 0.08,
          rootMargin:
            "8% 0px -7% 0px",
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
      id="all-services-catalog"
      className="cc-all-services"
      aria-labelledby="all-services-title"
    >
      <div className="cc-all-services__shell">
        <header className="cc-all-services__header">
          <div className="cc-all-services__heading">
            <span className="cc-all-services__eyebrow">
              Explore Our Services
            </span>

            <h2 id="all-services-title">
              All Services
            </h2>

            <p>
              Choose a service category to view available options
              and book the right professional for your property.
            </p>
          </div>

          <div
            className="cc-all-services__count"
            aria-label="13 professional service categories"
          >
            <strong>13</strong>

            <span>
              Professional
              <br />
              Categories
            </span>
          </div>
        </header>

        <div className="cc-all-services__grid">
          {SERVICES.map(
            (service, index) => (
              <Link
                key={service.href}
                href={service.href}
                className="cc-service-card"
                aria-label={`View ${service.title} services`}
                style={
                  {
                    "--cc-service-index":
                      index,
                  } as CSSProperties
                }
              >
                <div className="cc-service-card__head">
                  <span className="cc-service-card__icon">
                    <ServiceIcon
                      kind={service.icon}
                    />
                  </span>

                  <h3>{service.title}</h3>
                </div>

                <div className="cc-service-card__media">
                  <Image
                    src={service.image}
                    alt={`${service.title} service by City Coolies`}
                    width={720}
                    height={460}
                    loading={
                      index < 5
                        ? "eager"
                        : "lazy"
                    }
                    fetchPriority={
                      index === 0
                        ? "high"
                        : "auto"
                    }
                    sizes="(max-width: 559px) 92vw, (max-width: 779px) 46vw, (max-width: 1099px) 31vw, (max-width: 1399px) 24vw, 19vw"
                    className="cc-service-card__image cc-service-card__image--contain"
                  />

                  <span
                    className="cc-service-card__media-shine"
                    aria-hidden="true"
                  />
                </div>

                <div className="cc-service-card__body">
                  <p>
                    {service.description}
                  </p>

                  <div className="cc-service-card__action">
                    <span>
                      View Service
                    </span>

                    <span
                      className="cc-service-card__arrow"
                      aria-hidden="true"
                    >
                      →
                    </span>
                  </div>
                </div>
              </Link>
            ),
          )}
        </div>
      </div>

      <style>{`
        .cc-all-services {
          --cc-red: #f51f2a;
          --cc-red-dark: #d91420;
          --cc-ink: #16171d;
          --cc-muted: #687080;
          --cc-line: rgba(245,31,42,.13);
          --cc-soft: #fff6f7;

          width: 100%;
          position: relative;
          overflow: hidden;
          padding: 26px 22px 70px;
          scroll-margin-top: 90px;
        }

        .cc-all-services__shell {
          width: min(100%, 1780px);
          margin: 0 auto;
        }

        .cc-all-services__header {
          display: flex;
          align-items: flex-end;
          justify-content: space-between;
          gap: 28px;
          margin-bottom: 23px;

          opacity: 0;
          transform: translate3d(0,18px,0);
          filter: blur(5px);
        }

        .cc-all-services--visible
        .cc-all-services__header {
          opacity: 1;
          transform: translate3d(0,0,0);
          filter: blur(0);

          transition:
            opacity 320ms cubic-bezier(.16,1,.3,1),
            transform 520ms cubic-bezier(.16,1,.3,1),
            filter 470ms cubic-bezier(.16,1,.3,1);
        }

        .cc-all-services__heading {
          min-width: 0;
        }

        .cc-all-services__eyebrow {
          display: inline-flex;
          align-items: center;
          gap: 9px;
          color: var(--cc-red);
          font-size: 11px;
          font-weight: 900;
          letter-spacing: .18em;
          text-transform: uppercase;
        }

        .cc-all-services__eyebrow::before {
          content: "";
          width: 28px;
          height: 2px;
          border-radius: 999px;
          background: var(--cc-red);
        }

        .cc-all-services__heading h2 {
          margin: 8px 0 0;
          color: var(--cc-ink);
          font-size: clamp(28px,2.15vw,40px);
          font-weight: 900;
          line-height: 1.02;
          letter-spacing: -.045em;
        }

        .cc-all-services__heading p {
          max-width: 650px;
          margin: 9px 0 0;
          color: var(--cc-muted);
          font-size: 14px;
          line-height: 1.55;
        }

        .cc-all-services__count {
          flex: 0 0 auto;
          min-width: 158px;
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 12px 16px;
          border: 1px solid var(--cc-line);
          border-radius: 18px;
          background: rgba(255,255,255,.78);
          box-shadow: 0 15px 35px -28px rgba(61,15,20,.5);
          backdrop-filter: blur(14px);
        }

        .cc-all-services__count strong {
          color: var(--cc-red);
          font-size: 25px;
          font-weight: 900;
          line-height: 1;
        }

        .cc-all-services__count span {
          color: #555d6b;
          font-size: 10px;
          font-weight: 800;
          line-height: 1.25;
          text-transform: uppercase;
          letter-spacing: .05em;
        }

        .cc-all-services__grid {
          display: grid;
          grid-template-columns:
            repeat(5,minmax(0,1fr));
          gap: 18px;
        }

        .cc-service-card {
          min-width: 0;
          position: relative;
          display: flex;
          flex-direction: column;
          overflow: hidden;

          border: 1px solid var(--cc-line);
          border-radius: 21px;
          color: inherit;
          text-decoration: none;
          background:
            linear-gradient(
              180deg,
              rgba(255,255,255,.98),
              rgba(255,250,251,.98)
            );

          box-shadow:
            0 18px 38px -32px
            rgba(61,16,22,.48);

          opacity: 0;
          filter: blur(6px);
          transform:
            translate3d(0,30px,0)
            scale(.975);

          transition:
            border-color 220ms ease,
            box-shadow 220ms ease;
        }

        .cc-all-services--visible
        .cc-service-card {
          opacity: 1;
          filter: blur(0);
          transform:
            translate3d(0,0,0)
            scale(1);

          transition:
            opacity
              330ms
              cubic-bezier(.16,1,.3,1)
              calc(
                350ms +
                var(--cc-service-index)
                * 65ms
              ),
            filter
              470ms
              cubic-bezier(.16,1,.3,1)
              calc(
                350ms +
                var(--cc-service-index)
                * 65ms
              ),
            transform
              560ms
              cubic-bezier(.16,1,.3,1)
              calc(
                350ms +
                var(--cc-service-index)
                * 65ms
              ),
            border-color 220ms ease,
            box-shadow 220ms ease;
        }

        .cc-all-services--visible
        .cc-service-card:hover {
          transform:
            translate3d(0,-6px,0)
            scale(1.006);

          border-color:
            rgba(245,31,42,.28);

          box-shadow:
            0 27px 46px -30px
            rgba(74,16,24,.38),
            0 11px 25px -22px
            rgba(245,31,42,.34);
        }

        .cc-service-card__head {
          min-height: 70px;
          display: flex;
          align-items: center;
          gap: 11px;
          padding: 13px 14px 10px;
        }

        .cc-service-card__icon {
          flex: 0 0 36px;
          width: 36px;
          height: 36px;
          display: grid;
          place-items: center;
          border-radius: 12px;
          color: var(--cc-red);
          background:
            linear-gradient(
              145deg,
              #fff,
              #fff0f2
            );
          border:
            1px solid
            rgba(245,31,42,.13);
          box-shadow:
            0 9px 20px -16px
            rgba(245,31,42,.8);
        }

        .cc-service-card__icon svg {
          width: 20px;
          height: 20px;
        }

        .cc-service-card__head h3 {
          min-width: 0;
          margin: 0;
          color: var(--cc-ink);
          font-size: 15px;
          font-weight: 850;
          line-height: 1.14;
          letter-spacing: -.018em;
        }

        .cc-service-card__media {
          width: calc(100% - 20px);
          position: relative;
          overflow: hidden;
          margin: 0 10px;
          aspect-ratio: 16 / 9;
          border-radius: 15px;
          background: #fff8f9;
          border:
            1px solid
            rgba(245,31,42,.08);
        }

        .cc-service-card__image,
        .cc-service-card__image--contain,
        .cc-service-card:hover
        .cc-service-card__image,
        .cc-service-card:hover
        .cc-service-card__image--contain {
          width: 100%;
          height: 100%;
          display: block;

          object-fit: contain !important;
          object-position: center !important;

          transform: none !important;
          scale: 1 !important;
          animation: none !important;

          background: #fff8f9;
        }

        .cc-service-card__media-shine {
          position: absolute;
          inset: 0;
          pointer-events: none;
          opacity: 0;
          background:
            linear-gradient(
              110deg,
              transparent 24%,
              rgba(255,255,255,.48) 48%,
              transparent 72%
            );
          transform:
            translateX(-130%);
        }

        .cc-service-card:hover
        .cc-service-card__media-shine {
          opacity: .7;
          animation:
            ccServiceCardShine
            700ms
            ease-out
            1;
        }

        .cc-service-card__body {
          min-height: 122px;
          display: flex;
          flex: 1;
          flex-direction: column;
          padding: 12px 14px 14px;
        }

        .cc-service-card__body p {
          display: -webkit-box;
          overflow: hidden;
          margin: 0;
          color: #687080;
          font-size: 11.5px;
          line-height: 1.48;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 2;
        }

        .cc-service-card__action {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 12px;
          margin-top: auto;
          padding-top: 13px;
        }

        .cc-service-card__action > span:first-child {
          color: var(--cc-red);
          font-size: 12px;
          font-weight: 850;
        }

        .cc-service-card__arrow {
          width: 34px;
          height: 34px;
          display: grid;
          place-items: center;
          flex: 0 0 34px;

          border-radius: 50%;
          color: white;
          background:
            linear-gradient(
              135deg,
              #ff3440,
              #eb1420
            );

          box-shadow:
            0 10px 20px -13px
            rgba(245,31,42,.95);

          transition:
            transform 180ms ease,
            box-shadow 180ms ease;
        }

        .cc-service-card:hover
        .cc-service-card__arrow {
          transform:
            translateX(3px);

          box-shadow:
            0 12px 23px -12px
            rgba(245,31,42,1);
        }

        @keyframes ccServiceCardShine {
          from {
            transform:
              translateX(-130%);
          }

          to {
            transform:
              translateX(130%);
          }
        }

        @media (max-width: 1399px) {
          .cc-all-services__grid {
            grid-template-columns:
              repeat(4,minmax(0,1fr));
          }
        }

        @media (max-width: 1099px) {
          .cc-all-services {
            padding-inline: 18px;
          }

          .cc-all-services__grid {
            grid-template-columns:
              repeat(3,minmax(0,1fr));
          }
        }

        @media (max-width: 779px) {
          .cc-all-services__grid {
            grid-template-columns:
              repeat(2,minmax(0,1fr));
            gap: 13px;
          }

          .cc-all-services__header {
            align-items: flex-start;
          }

          .cc-all-services__count {
            display: none;
          }

          .cc-service-card__head {
            min-height: 66px;
          }
        }

        @media (max-width: 559px) {
          .cc-all-services {
            padding:
              22px 13px 52px;
          }

          .cc-all-services__header {
            margin-bottom: 17px;
          }

          .cc-all-services__heading h2 {
            font-size: 30px;
          }

          .cc-all-services__heading p {
            font-size: 13px;
          }

          .cc-all-services__grid {
            grid-template-columns: 1fr;
            gap: 14px;
          }

          .cc-service-card {
            border-radius: 19px;
          }

          .cc-service-card__head {
            min-height: 62px;
          }

          .cc-service-card__media {
            aspect-ratio: 16 / 9;
          }

          .cc-service-card__body {
            min-height: 112px;
          }
        }

        @media (
          prefers-reduced-motion:
          reduce
        ) {
          .cc-all-services__header,
          .cc-service-card {
            opacity: 1 !important;
            filter: none !important;
            transform: none !important;
            transition: none !important;
          }

          .cc-service-card__media-shine {
            display: none;
          }
        }
      
        /* CC_COMPACT_ECOMMERCE_ALL_SERVICES_START */

        /*
         * =====================================================
         * CITY COOLIES - COMPACT ECOMMERCE CATEGORY GRID
         *
         * Existing service data: unchanged
         * Existing links: unchanged
         * Existing images: unchanged
         * No crop / no zoom / no image replacement
         * =====================================================
         */


        /*
         * SECTION
         */

        .cc-all-services {
          padding:
            18px 18px 48px !important;

          overflow:
            hidden !important;
        }

        .cc-all-services__shell {
          width:
            min(100%, 1840px) !important;

          margin:
            0 auto !important;
        }


        /*
         * =====================================================
         * SIMPLE ECOMMERCE HEADING
         * Reference design does not need a large intro block.
         * =====================================================
         */

        .cc-all-services__header {
          display:
            block !important;

          margin:
            0 0 16px !important;

          opacity:
            0;

          filter:
            blur(4px);

          transform:
            translate3d(
              0,
              13px,
              0
            ) !important;
        }

        .cc-all-services--visible
        .cc-all-services__header {
          opacity:
            1;

          filter:
            blur(0);

          transform:
            translate3d(
              0,
              0,
              0
            ) !important;

          transition:
            opacity
              330ms
              cubic-bezier(.16,1,.3,1),

            filter
              460ms
              cubic-bezier(.16,1,.3,1),

            transform
              520ms
              cubic-bezier(.16,1,.3,1)
            !important;
        }

        .cc-all-services__eyebrow,
        .cc-all-services__heading p,
        .cc-all-services__count {
          display:
            none !important;
        }

        .cc-all-services__heading h2 {
          margin:
            0 !important;

          color:
            #16171d !important;

          font-size:
            clamp(
              22px,
              1.65vw,
              30px
            ) !important;

          font-weight:
            900 !important;

          line-height:
            1.05 !important;

          letter-spacing:
            -.035em !important;
        }


        /*
         * =====================================================
         * DESKTOP ECOMMERCE GRID
         * 5 compact cards in one row
         * =====================================================
         */

        .cc-all-services__grid {
          display:
            grid !important;

          grid-template-columns:
            repeat(
              5,
              minmax(0, 1fr)
            ) !important;

          gap:
            12px !important;

          align-items:
            stretch !important;
        }


        /*
         * =====================================================
         * COMPACT CATEGORY CARD
         * =====================================================
         */

        .cc-service-card {
          position:
            relative !important;

          min-width:
            0 !important;

          min-height:
            0 !important;

          display:
            block !important;

          overflow:
            hidden !important;

          border:
            1px solid
            rgba(
              245,
              31,
              42,
              .12
            ) !important;

          border-radius:
            14px !important;

          background:
            rgba(
              255,
              255,
              255,
              .98
            ) !important;

          box-shadow:
            0 8px 22px -18px
            rgba(
              44,
              14,
              20,
              .40
            ) !important;

          text-decoration:
            none !important;

          opacity:
            0 !important;

          filter:
            blur(4px);

          transform:
            translate3d(
              0,
              18px,
              0
            )
            scale(.985)
            !important;

          will-change:
            opacity,
            transform,
            filter;
        }


        /*
         * One-by-one ecommerce entrance.
         */

        .cc-all-services--visible
        .cc-service-card {
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
                160ms +
                var(--cc-service-index)
                * 72ms
              ),

            filter
              430ms
              cubic-bezier(.16,1,.3,1)
              calc(
                160ms +
                var(--cc-service-index)
                * 72ms
              ),

            transform
              520ms
              cubic-bezier(.16,1,.3,1)
              calc(
                160ms +
                var(--cc-service-index)
                * 72ms
              ),

            border-color
              180ms ease,

            box-shadow
              180ms ease
            !important;
        }


        /*
         * =====================================================
         * SMALL TOP TITLE BAR
         * icon + service name
         * =====================================================
         */

        .cc-service-card__head {
          min-height:
            43px !important;

          display:
            flex !important;

          align-items:
            center !important;

          gap:
            8px !important;

          padding:
            7px 9px 6px !important;

          background:
            #fff !important;
        }

        .cc-service-card__icon {
          width:
            28px !important;

          height:
            28px !important;

          flex:
            0 0 28px !important;

          display:
            grid !important;

          place-items:
            center !important;

          border-radius:
            9px !important;

          color:
            #f51f2a !important;

          border:
            1px solid
            rgba(
              245,
              31,
              42,
              .11
            ) !important;

          background:
            #fff4f5 !important;

          box-shadow:
            none !important;
        }

        .cc-service-card__icon svg {
          width:
            15px !important;

          height:
            15px !important;
        }

        .cc-service-card__head h3 {
          margin:
            0 !important;

          color:
            #171820 !important;

          font-size:
            clamp(
              11px,
              .78vw,
              13px
            ) !important;

          font-weight:
            850 !important;

          line-height:
            1.12 !important;

          letter-spacing:
            -.018em !important;
        }


        /*
         * =====================================================
         * IMAGE
         *
         * NO CROP.
         * NO ZOOM.
         * SAME EXISTING IMAGE.
         * =====================================================
         */

        .cc-service-card__media {
          width:
            calc(100% - 12px)
            !important;

          height:
            92px !important;

          aspect-ratio:
            auto !important;

          position:
            relative !important;

          overflow:
            hidden !important;

          margin:
            0 6px 6px !important;

          border:
            1px solid
            rgba(
              245,
              31,
              42,
              .07
            ) !important;

          border-radius:
            10px !important;

          background:
            #fff8f9 !important;
        }

        .cc-service-card__image,
        .cc-service-card__image--contain,
        .cc-service-card:hover
        .cc-service-card__image,
        .cc-service-card:hover
        .cc-service-card__image--contain {
          width:
            100% !important;

          height:
            100% !important;

          display:
            block !important;

          object-fit:
            contain !important;

          object-position:
            center !important;

          background:
            #fff8f9 !important;

          transform:
            none !important;

          scale:
            1 !important;

          animation:
            none !important;
        }


        /*
         * Hide long ecommerce-detail text from category cards.
         * This information belongs inside each service page.
         */

        .cc-service-card__body {
          min-height:
            0 !important;

          height:
            0 !important;

          padding:
            0 !important;

          margin:
            0 !important;
        }

        .cc-service-card__body p {
          display:
            none !important;
        }

        .cc-service-card__action {
          position:
            absolute !important;

          z-index:
            5 !important;

          right:
            8px !important;

          bottom:
            8px !important;

          width:
            auto !important;

          height:
            auto !important;

          display:
            block !important;

          margin:
            0 !important;

          padding:
            0 !important;
        }

        .cc-service-card__action
        > span:first-child {
          display:
            none !important;
        }


        /*
         * Compact circular ecommerce arrow.
         */

        .cc-service-card__arrow {
          width:
            28px !important;

          height:
            28px !important;

          display:
            grid !important;

          place-items:
            center !important;

          border:
            1px solid
            rgba(
              245,
              31,
              42,
              .15
            ) !important;

          border-radius:
            50% !important;

          color:
            #f51f2a !important;

          background:
            rgba(
              255,
              255,
              255,
              .96
            ) !important;

          box-shadow:
            0 5px 14px -10px
            rgba(
              245,
              31,
              42,
              .9
            ) !important;

          font-size:
            14px !important;

          transition:
            transform
              180ms
              cubic-bezier(.16,1,.3,1),

            color
              180ms ease,

            background
              180ms ease
            !important;
        }


        /*
         * =====================================================
         * PREMIUM ECOMMERCE HOVER
         * CARD MOVES.
         * IMAGE DOES NOT ZOOM.
         * =====================================================
         */

        .cc-all-services--visible
        .cc-service-card:hover {
          transform:
            translate3d(
              0,
              -4px,
              0
            )
            scale(1.004)
            !important;

          border-color:
            rgba(
              245,
              31,
              42,
              .24
            ) !important;

          box-shadow:
            0 17px 28px -22px
            rgba(
              61,
              13,
              21,
              .42
            ),

            0 7px 18px -16px
            rgba(
              245,
              31,
              42,
              .24
            )
            !important;
        }

        .cc-service-card:hover
        .cc-service-card__arrow {
          color:
            #fff !important;

          background:
            #f51f2a !important;

          transform:
            translate3d(
              2px,
              0,
              0
            ) !important;
        }


        /*
         * Keep only subtle premium light.
         */

        .cc-service-card__media-shine {
          opacity:
            0 !important;
        }

        .cc-service-card:hover
        .cc-service-card__media-shine {
          opacity:
            .42 !important;
        }


        /*
         * =====================================================
         * LAPTOP
         * =====================================================
         */

        @media (
          min-width: 1100px
        )
        and (
          max-width: 1399px
        ) {
          .cc-all-services__grid {
            grid-template-columns:
              repeat(
                5,
                minmax(0,1fr)
              ) !important;

            gap:
              10px !important;
          }

          .cc-service-card__media {
            height:
              82px !important;
          }

          .cc-service-card__head h3 {
            font-size:
              11px !important;
          }
        }


        /*
         * =====================================================
         * TABLET
         * =====================================================
         */

        @media (
          min-width: 780px
        )
        and (
          max-width: 1099px
        ) {
          .cc-all-services__grid {
            grid-template-columns:
              repeat(
                4,
                minmax(0,1fr)
              ) !important;
          }

          .cc-service-card__media {
            height:
              88px !important;
          }
        }


        /*
         * =====================================================
         * PHONE
         * Ecommerce-style 2-column category catalog.
         * =====================================================
         */

        @media (
          max-width: 779px
        ) {
          .cc-all-services {
            padding:
              16px 11px 40px
              !important;
          }

          .cc-all-services__header {
            margin-bottom:
              13px !important;
          }

          .cc-all-services__heading h2 {
            font-size:
              23px !important;
          }

          .cc-all-services__grid {
            grid-template-columns:
              repeat(
                2,
                minmax(0,1fr)
              ) !important;

            gap:
              10px !important;
          }

          .cc-service-card {
            border-radius:
              12px !important;
          }

          .cc-service-card__head {
            min-height:
              48px !important;

            padding:
              7px 7px 5px
              !important;
          }

          .cc-service-card__icon {
            width:
              27px !important;

            height:
              27px !important;

            flex-basis:
              27px !important;
          }

          .cc-service-card__head h3 {
            font-size:
              10.5px !important;

            line-height:
              1.12 !important;
          }

          .cc-service-card__media {
            width:
              calc(100% - 10px)
              !important;

            height:
              80px !important;

            margin:
              0 5px 5px
              !important;

            border-radius:
              9px !important;
          }

          .cc-service-card__arrow {
            width:
              26px !important;

            height:
              26px !important;
          }
        }


        /*
         * Very narrow phones.
         */

        @media (
          max-width: 380px
        ) {
          .cc-all-services__grid {
            gap:
              8px !important;
          }

          .cc-service-card__media {
            height:
              72px !important;
          }

          .cc-service-card__head h3 {
            font-size:
              9.8px !important;
          }
        }


        /*
         * Accessibility
         */

        @media (
          prefers-reduced-motion:
          reduce
        ) {
          .cc-all-services__header,
          .cc-service-card {
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

        /* CC_COMPACT_ECOMMERCE_ALL_SERVICES_END */

        /* CC_SAFE_IMAGE_SIZE_FIX_START */

        /*
         * Larger ecommerce service images.
         * Original image files remain unchanged.
         */

        .cc-all-services
        .cc-service-card__media {
          width:
            calc(100% - 12px)
            !important;

          height:
            138px !important;

          aspect-ratio:
            auto !important;

          display:
            flex !important;

          align-items:
            center !important;

          justify-content:
            center !important;

          margin:
            0 6px 7px
            !important;

          padding:
            0 !important;

          overflow:
            hidden !important;

          border-radius:
            11px !important;

          background:
            #fff8f9 !important;
        }


        /*
         * Full image must stay visible.
         * Never crop.
         * Never zoom.
         */

        .cc-all-services
        .cc-service-card__image,

        .cc-all-services
        .cc-service-card__image--contain,

        .cc-all-services
        .cc-service-card:hover
        .cc-service-card__image,

        .cc-all-services
        .cc-service-card:hover
        .cc-service-card__image--contain {
          width:
            100% !important;

          height:
            100% !important;

          display:
            block !important;

          object-fit:
            contain !important;

          object-position:
            center center !important;

          transform:
            none !important;

          scale:
            1 !important;

          animation:
            none !important;

          background:
            transparent !important;
        }


        /*
         * Large desktop.
         */

        @media (min-width: 1500px) {
          .cc-all-services
          .cc-service-card__media {
            height:
              150px !important;
          }
        }


        /*
         * Normal laptop / desktop.
         */

        @media (
          min-width: 1100px
        )
        and (
          max-width: 1499px
        ) {
          .cc-all-services
          .cc-service-card__media {
            height:
              128px !important;
          }
        }


        /*
         * Tablet.
         */

        @media (
          min-width: 780px
        )
        and (
          max-width: 1099px
        ) {
          .cc-all-services
          .cc-service-card__media {
            height:
              130px !important;
          }
        }


        /*
         * Phone.
         */

        @media (max-width: 779px) {
          .cc-all-services
          .cc-service-card__media {
            width:
              calc(100% - 10px)
              !important;

            height:
              112px !important;

            margin:
              0 5px 6px
              !important;
          }
        }


        @media (max-width: 380px) {
          .cc-all-services
          .cc-service-card__media {
            height:
              100px !important;
          }
        }

        /* CC_SAFE_IMAGE_SIZE_FIX_END */

        /* CC_ALL_SERVICES_WATER_SEQUENCE_START */

        /*
         * =====================================================
         * CITY COOLIES - ALL SERVICES CINEMATIC SEQUENCE
         *
         * 1. "All Services" writes first
         * 2. Cards enter one-by-one
         * 3. Red + white + light pink theme
         * 4. Existing images never crop or zoom
         * =====================================================
         */


        /*
         * PREMIUM LIGHT BACKGROUND
         */

        .cc-all-services {
          background:
            radial-gradient(
              circle at 7% 5%,
              rgba(255,220,224,.34),
              transparent 26%
            ),
            radial-gradient(
              circle at 94% 18%,
              rgba(255,232,235,.42),
              transparent 25%
            ),
            linear-gradient(
              180deg,
              #ffffff 0%,
              #fff9fa 48%,
              #ffffff 100%
            ) !important;
        }


        /*
         * =====================================================
         * HEADER
         * =====================================================
         */

        .cc-all-services__header {
          opacity: 1 !important;
          filter: none !important;
          transform: none !important;
        }


        /*
         * =====================================================
         * "ALL SERVICES" FIRST
         * Writing / cinematic reveal.
         * =====================================================
         */

        .cc-all-services__heading h2 {
          position: relative;

          width: fit-content;

          opacity: 0;

          clip-path:
            inset(
              0
              100%
              0
              0
            );

          transform:
            translate3d(
              0,
              10px,
              0
            );

          filter:
            blur(3px);

          will-change:
            opacity,
            clip-path,
            transform,
            filter;
        }

        .cc-all-services--visible
        .cc-all-services__heading h2 {
          opacity: 1;

          clip-path:
            inset(
              0
              0
              0
              0
            );

          transform:
            translate3d(
              0,
              0,
              0
            );

          filter:
            blur(0);

          transition:
            opacity
              280ms
              cubic-bezier(.16,1,.3,1)
              80ms,

            clip-path
              720ms
              steps(14,end)
              100ms,

            transform
              650ms
              cubic-bezier(.16,1,.3,1)
              80ms,

            filter
              540ms
              cubic-bezier(.16,1,.3,1)
              80ms
            !important;
        }


        /*
         * RED LINE APPEARS AFTER TITLE
         */

        .cc-all-services__heading h2::after {
          content: "";

          position: absolute;

          left: 0;
          bottom: -7px;

          width: 34px;
          height: 2px;

          border-radius: 999px;

          opacity: 0;

          transform:
            scaleX(.1);

          transform-origin:
            left center;

          background:
            linear-gradient(
              90deg,
              #f51f2a,
              rgba(245,31,42,0)
            );
        }

        .cc-all-services--visible
        .cc-all-services__heading h2::after {
          animation:
            ccAllServicesTitleLine
            620ms
            cubic-bezier(.16,1,.3,1)
            620ms
            forwards;
        }


        /*
         * =====================================================
         * EVERY SERVICE CARD STARTS HIDDEN
         * =====================================================
         */

        .cc-all-services
        .cc-service-card {
          opacity: 0 !important;

          filter:
            blur(7px);

          transform:
            translate3d(
              0,
              34px,
              0
            )
            scale(.972)
            !important;

          transform-origin:
            center bottom;

          backface-visibility:
            hidden;

          will-change:
            opacity,
            transform,
            filter;
        }


        /*
         * =====================================================
         * CARD SEQUENCE
         *
         * Title completes first.
         * Then:
         *
         * 1 Deep Cleaning
         * 2 Renovation
         * 3 Electrical
         * ...
         * 13 Gardening
         *
         * One-by-one.
         * =====================================================
         */

        .cc-all-services--visible
        .cc-service-card {
          opacity: 1 !important;

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
              480ms
              cubic-bezier(.16,1,.3,1)
              calc(
                900ms +
                var(--cc-service-index)
                * 180ms
              ),

            filter
              650ms
              cubic-bezier(.16,1,.3,1)
              calc(
                900ms +
                var(--cc-service-index)
                * 180ms
              ),

            transform
              780ms
              cubic-bezier(.16,1,.3,1)
              calc(
                900ms +
                var(--cc-service-index)
                * 180ms
              ),

            border-color
              200ms ease,

            box-shadow
              200ms ease
            !important;
        }


        /*
         * =====================================================
         * PREMIUM ECOMMERCE HOVER
         * =====================================================
         */

        .cc-all-services--visible
        .cc-service-card:hover {
          transform:
            translate3d(
              0,
              -5px,
              0
            )
            scale(1.004)
            !important;

          border-color:
            rgba(
              245,
              31,
              42,
              .26
            ) !important;

          box-shadow:
            0 22px 36px -27px
            rgba(67,15,23,.42),

            0 9px 22px -18px
            rgba(245,31,42,.30)
            !important;

          transition:
            transform
              190ms
              cubic-bezier(.16,1,.3,1),

            border-color
              190ms ease,

            box-shadow
              190ms ease
            !important;
        }


        /*
         * =====================================================
         * ICON - RED / WHITE / LIGHT PINK
         * =====================================================
         */

        .cc-all-services
        .cc-service-card__icon {
          color:
            #f51f2a !important;

          background:
            linear-gradient(
              145deg,
              #ffffff,
              #fff0f2
            ) !important;

          border-color:
            rgba(
              245,
              31,
              42,
              .14
            ) !important;
        }


        /*
         * =====================================================
         * IMAGE SAFETY
         *
         * NEVER:
         * crop
         * zoom
         * stretch
         * animate scale
         * =====================================================
         */

        .cc-all-services
        .cc-service-card__image,

        .cc-all-services
        .cc-service-card__image--contain,

        .cc-all-services
        .cc-service-card:hover
        .cc-service-card__image,

        .cc-all-services
        .cc-service-card:hover
        .cc-service-card__image--contain {
          object-fit:
            contain !important;

          object-position:
            center center !important;

          transform:
            none !important;

          scale:
            1 !important;

          animation:
            none !important;
        }


        /*
         * =====================================================
         * ARROW
         * =====================================================
         */

        .cc-all-services--visible
        .cc-service-card__arrow {
          animation:
            ccAllServicesArrow
            1.6s
            ease-in-out
            infinite;
        }


        /*
         * =====================================================
         * KEYFRAMES
         * =====================================================
         */

        @keyframes ccAllServicesTitleLine {
          from {
            opacity: 0;

            transform:
              scaleX(.1);
          }

          to {
            opacity: 1;

            transform:
              scaleX(1);
          }
        }

        @keyframes ccAllServicesArrow {
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
         * MOBILE
         *
         * Same sequence, but faster so customer
         * does not wait too long.
         * =====================================================
         */

        @media (max-width: 779px) {

          .cc-all-services
          .cc-service-card {
            filter:
              blur(4px);

            transform:
              translate3d(
                0,
                24px,
                0
              )
              scale(.98)
              !important;
          }

          .cc-all-services--visible
          .cc-service-card {
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
                400ms
                cubic-bezier(.16,1,.3,1)
                calc(
                  720ms +
                  var(--cc-service-index)
                  * 125ms
                ),

              filter
                520ms
                cubic-bezier(.16,1,.3,1)
                calc(
                  720ms +
                  var(--cc-service-index)
                  * 125ms
                ),

              transform
                650ms
                cubic-bezier(.16,1,.3,1)
                calc(
                  720ms +
                  var(--cc-service-index)
                  * 125ms
                )
              !important;
          }

          .cc-all-services--visible
          .cc-service-card:hover {
            transform:
              translate3d(
                0,
                -2px,
                0
              )
              scale(1)
              !important;
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
          .cc-all-services__heading h2,
          .cc-service-card {
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
          }

          .cc-all-services__heading h2::after,
          .cc-service-card__arrow {
            animation:
              none !important;
          }
        }

        /* CC_ALL_SERVICES_WATER_SEQUENCE_END */
`}</style>
    </section>
  );
}