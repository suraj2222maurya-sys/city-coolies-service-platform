"use client";

import Image from "next/image";
import Link from "next/link";

const POPULAR_SERVICES = [
  {
    "title": "Deep Cleaning",
    "route": "/services/deep-cleaning",
    "description": "Complete deep cleaning for healthier and spotless spaces.",
    "rating": "4.8",
    "reviews": "2.3k+",
    "price": "₹1,499",
    "badge": "Most Booked",
    "image": "/deep-cleaning-service.png"
  },
  {
    "title": "Renovation",
    "route": "/services/renovation",
    "description": "Complete and partial renovation for homes and commercial spaces.",
    "rating": "4.7",
    "reviews": "1.8k+",
    "price": "₹4,999",
    "badge": "Popular",
    "image": "/renovation-service.png"
  },
  {
    "title": "Electrical Works",
    "route": "/services/electrical-works",
    "description": "Electrical installation, repairs, maintenance and service.",
    "rating": "4.6",
    "reviews": "1.2k+",
    "price": "₹499",
    "badge": "Quick Service",
    "image": "/electrical-works-service.png"
  },
  {
    "title": "Plumbing Works",
    "route": "/services/plumbing-works",
    "description": "Plumbing repair, fitting, installation and maintenance.",
    "rating": "4.6",
    "reviews": "1.1k+",
    "price": "₹499",
    "badge": "Popular",
    "image": "/plumbing-works-service.png"
  },
  {
    "title": "Painting Services",
    "route": "/services/painting-services",
    "description": "Professional interior and exterior painting with quality finishing.",
    "rating": "4.7",
    "reviews": "950+",
    "price": "₹1,999",
    "badge": "Top Rated",
    "image": "/painting-services-service.png"
  }
] as const;

function ServiceIcon({
  route,
}: {
  route: string;
}) {
  if (route === "/services/electrical-works") {
    return (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
      >
        <path
          d="M13.8 2.8 6.7 13h4.8l-.9 8.2 7.6-10.5h-4.9l.5-7.9Z"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    );
  }

  if (route === "/services/plumbing-works") {
    return (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
      >
        <path
          d="M12 3.5c3.2 4 5 6.6 5 9a5 5 0 0 1-10 0c0-2.4 1.8-5 5-9Z"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    );
  }

  if (route === "/services/painting-services") {
    return (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
      >
        <path
          d="M4 5h11v5H4zM15 7.5h3v3h-3M9.5 10v4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M7.5 14h4v6h-4z"
          strokeLinejoin="round"
        />
      </svg>
    );
  }

  if (route === "/services/renovation") {
    return (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
      >
        <path
          d="m5 19 6.8-6.8M14.5 9.5 19 5M14 4l6 6M4 14l6 6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    );
  }

  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
    >
      <path
        d="M12 3v3M12 18v3M3 12h3M18 12h3"
        strokeLinecap="round"
      />
      <circle
        cx="12"
        cy="12"
        r="4"
      />
    </svg>
  );
}


function findFullServicesCatalog(): HTMLElement | null {
  const existing =
    document.getElementById(
      "all-services-catalog",
    );

  if (existing) {
    return existing;
  }

  const popular =
    document.querySelector(
      ".cc-popular-services",
    );

  const links =
    Array.from(
      document.querySelectorAll<HTMLAnchorElement>(
        'a[href^="/services/"]',
      ),
    ).filter(
      (link) =>
        Boolean(link.querySelector("img")) &&
        !popular?.contains(link),
    );

  let best:
    HTMLElement | null = null;

  let bestCount =
    Number.POSITIVE_INFINITY;

  for (const link of links) {
    let node:
      HTMLElement | null =
      link.parentElement;

    for (
      let depth = 0;
      node && depth < 8;
      depth += 1
    ) {
      const routes =
        new Set(
          Array.from(
            node.querySelectorAll<HTMLAnchorElement>(
              'a[href^="/services/"]',
            ),
          )
            .filter(
              (candidate) =>
                Boolean(
                  candidate.querySelector("img"),
                ) &&
                !popular?.contains(candidate),
            )
            .map(
              (candidate) =>
                candidate.getAttribute("href"),
            )
            .filter(Boolean),
        );

      if (
        routes.size >= 10 &&
        routes.size < bestCount
      ) {
        best = node;
        bestCount = routes.size;
      }

      node = node.parentElement;
    }
  }

  if (best) {
    best.id = "all-services-catalog";
  }

  return best;
}


export default function PopularServicesSection() {
  const handleViewAllServices = () => {
    const target =
      findFullServicesCatalog();

    if (!target) {
      return;
    }

    const scrollEvent =
      new CustomEvent<{
        target: HTMLElement;
      }>(
        "cc:services-scroll-target",
        {
          detail: {
            target,
          },
          cancelable: true,
        },
      );

    const shouldFallback =
      window.dispatchEvent(
        scrollEvent,
      );

    if (shouldFallback) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }

    window.history.replaceState(
      null,
      "",
      "#all-services-catalog",
    );
  };

  return (
    <section
      className="cc-popular-services"
      aria-labelledby="cc-popular-title"
    >
      <div className="cc-popular-services__heading">
        <h2 id="cc-popular-title">
          Popular Services
        </h2>

        <button
          type="button"
          className="cc-popular-services__view-all"
          onClick={handleViewAllServices}
        >
          View All Services

          <svg
            aria-hidden="true"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path
              d="M5 12h14m-5-5 5 5-5 5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </div>

      <div className="cc-popular-services__grid">
        {POPULAR_SERVICES.map(
          (service, index) => (
            <Link
              href={service.route}
              className="cc-popular-card"
              key={service.route}
              aria-label={`View ${service.title}`}
            >
              <div className="cc-popular-card__media">
                <Image
                  src={service.image}
                  alt={`${service.title} - City Coolies`}
                  fill
                  priority={index < 2}
                  sizes="(max-width: 720px) 78vw, (max-width: 1100px) 33vw, 20vw"
                  className="cc-popular-card__image"
                />

                <span
                  className="cc-popular-card__film"
                  aria-hidden="true"
                />
              </div>

              <div className="cc-popular-card__body">
                <div className="cc-popular-card__title">
                  <span
                    className="cc-popular-card__icon"
                    aria-hidden="true"
                  >
                    <ServiceIcon
                      route={service.route}
                    />
                  </span>

                  <h3>
                    {service.title}
                  </h3>
                </div>

                <p>
                  {service.description}
                </p>

                <div className="cc-popular-card__rating">
                  <span aria-hidden="true">
                    &#9733;
                  </span>

                  <strong>
                    {service.rating}
                  </strong>

                  <small>
                    ({service.reviews})
                  </small>
                </div>

                <div className="cc-popular-card__footer">
                  <div className="cc-popular-card__price">
                    <small>
                      From
                    </small>

                    <strong>
                      {service.price}
                    </strong>
                  </div>

                  <span
                    className="cc-popular-card__arrow"
                    aria-hidden="true"
                  >
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path
                        d="M5 12h14m-5-5 5 5-5 5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </span>
                </div>
              </div>
            </Link>
          ),
        )}
      </div>

      <style>{`
        /*
         * ================================================
         * COMPACT APPROVED LAYOUT
         * ================================================
         */

        .cc-popular-services {
          position: relative;
          width: min(calc(100% - 48px), 1480px);
          margin: 27px auto 32px;
          padding: 0;
          border: 0;
          border-radius: 0;
          background: transparent;
          box-shadow: none;
          overflow: visible;
        }

        .cc-popular-services__heading {
          min-height: 38px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 20px;
          margin-bottom: 14px;
          padding: 0 2px;
        }

        .cc-popular-services__heading h2 {
          margin: 0;
          color: #15171f;
          font-size: clamp(21px, 1.7vw, 27px);
          font-weight: 900;
          line-height: 1;
          letter-spacing: -0.035em;
        }

        .cc-popular-services__view-all {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 7px 3px;
          border: 0;
          color: #ed1521;
          background: transparent;
          cursor: pointer;
          font-family: inherit;
          font-size: 9px;
          font-weight: 900;
          white-space: nowrap;
        }

        .cc-popular-services__view-all svg {
          width: 13px;
          height: 13px;
          transition:
            transform 220ms
            cubic-bezier(.16,1,.3,1);
        }

        .cc-popular-services__view-all:hover svg {
          transform: translateX(4px);
        }


        /*
         * ================================================
         * FIVE COMPACT CARDS
         * ================================================
         */

        .cc-popular-services__grid {
          display: grid;
          grid-template-columns:
            repeat(5, minmax(0, 1fr));
          gap: 15px;
        }

        .cc-popular-card {
          position: relative;
          isolation: isolate;
          min-width: 0;
          height: 100%;
          display: flex;
          flex-direction: column;
          overflow: hidden;
          border:
            1px solid rgba(245,31,42,.105);
          border-radius: 16px;
          color: inherit;
          background: #ffffff;
          box-shadow:
            0 12px 30px -26px
            rgba(57,13,20,.48);
          text-decoration: none;
          backface-visibility: hidden;
          transform: translateZ(0);
          transition:
            transform 320ms
              cubic-bezier(.16,1,.3,1),
            border-color 260ms ease,
            box-shadow 320ms
              cubic-bezier(.16,1,.3,1);
        }

        .cc-popular-card:hover {
          transform:
            translate3d(0,-5px,0);
          border-color:
            rgba(245,31,42,.27);
          box-shadow:
            0 22px 38px -27px
            rgba(65,14,22,.38),
            0 9px 24px -21px
            rgba(245,31,42,.34);
        }


        /*
         * SAME EXISTING IMAGE
         * NO ZOOM
         */

        .cc-popular-card__media {
          position: relative;
          width: 100%;
          aspect-ratio: 16 / 8.8;
          overflow: hidden;
          border-bottom:
            1px solid rgba(245,31,42,.055);
          background: #fff7f8;
        }

        .cc-popular-card__image {
          object-fit: contain !important;
          object-position: center !important;
          transform: none !important;
          scale: 1 !important;
          animation: none !important;
          transition: none !important;
        }

        .cc-popular-card:hover
        .cc-popular-card__image {
          transform: none !important;
          scale: 1 !important;
        }


        /*
         * SUBTLE VIDEO-LIKE LIGHT
         */

        .cc-popular-card__film {
          position: absolute;
          z-index: 4;
          inset: 0;
          pointer-events: none;
          opacity: .25;
          background:
            linear-gradient(
              112deg,
              transparent 25%,
              rgba(255,255,255,.48) 46%,
              rgba(255,215,221,.18) 52%,
              transparent 70%
            );
          transform: translateX(-135%);
          animation:
            ccPopularFilm 7s
            cubic-bezier(.4,0,.2,1)
            infinite;
        }

        .cc-popular-card:nth-child(2)
        .cc-popular-card__film {
          animation-delay: 1.1s;
        }

        .cc-popular-card:nth-child(3)
        .cc-popular-card__film {
          animation-delay: 2.2s;
        }

        .cc-popular-card:nth-child(4)
        .cc-popular-card__film {
          animation-delay: 3.3s;
        }

        .cc-popular-card:nth-child(5)
        .cc-popular-card__film {
          animation-delay: 4.4s;
        }


        /*
         * BODY
         */

        .cc-popular-card__body {
          flex: 1;
          display: flex;
          flex-direction: column;
          padding: 10px 11px 11px;
        }

        .cc-popular-card__title {
          display: flex;
          align-items: center;
          gap: 7px;
          min-width: 0;
        }

        .cc-popular-card__icon {
          width: 23px;
          height: 23px;
          flex: 0 0 23px;
          display: grid;
          place-items: center;
          border-radius: 999px;
          color: #f51f2a;
          background: #fff0f2;
        }

        .cc-popular-card__icon svg {
          width: 13px;
          height: 13px;
        }

        .cc-popular-card__title h3 {
          min-width: 0;
          margin: 0;
          color: #181a22;
          font-size: 12.5px;
          font-weight: 900;
          line-height: 1.18;
          letter-spacing: -0.015em;
        }

        .cc-popular-card__body > p {
          display: -webkit-box;
          min-height: 27px;
          margin: 6px 0 0 30px;
          overflow: hidden;
          color: #737986;
          font-size: 8.3px;
          line-height: 1.45;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 2;
        }

        .cc-popular-card__rating {
          display: flex;
          align-items: center;
          gap: 3px;
          margin: 7px 0 0 30px;
        }

        .cc-popular-card__rating > span {
          color: #ff9c00;
          font-size: 9px;
        }

        .cc-popular-card__rating strong {
          color: #333640;
          font-size: 7.8px;
          font-weight: 900;
        }

        .cc-popular-card__rating small {
          color: #999ea8;
          font-size: 7px;
        }

        .cc-popular-card__footer {
          min-height: 37px;
          display: flex;
          align-items: flex-end;
          justify-content: space-between;
          gap: 8px;
          margin-top: auto;
          padding-top: 8px;
        }

        .cc-popular-card__price {
          display: flex;
          flex-direction: column;
          gap: 1px;
        }

        .cc-popular-card__price small {
          color: #888e99;
          font-size: 6.8px;
        }

        .cc-popular-card__price strong {
          color: #1d2028;
          font-size: 11.5px;
          font-weight: 900;
          letter-spacing: -0.02em;
        }

        .cc-popular-card__arrow {
          width: 29px;
          height: 29px;
          flex: 0 0 29px;
          display: grid;
          place-items: center;
          border-radius: 999px;
          color: white;
          background:
            linear-gradient(
              145deg,
              #ff303b,
              #e30d19
            );
          box-shadow:
            0 9px 20px -11px
            rgba(245,31,42,.9);
          transition:
            transform 280ms
            cubic-bezier(.16,1,.3,1);
        }

        .cc-popular-card:hover
        .cc-popular-card__arrow {
          transform:
            translateX(3px)
            scale(1.06);
        }

        .cc-popular-card__arrow svg {
          width: 13px;
          height: 13px;
        }


        /*
         * LAPTOP
         */

        @media (max-width: 1150px) {
          .cc-popular-services__grid {
            grid-template-columns:
              repeat(3,minmax(0,1fr));
          }
        }


        /*
         * PHONE
         */

        @media (max-width: 720px) {
          .cc-popular-services {
            width:
              min(
                calc(100% - 22px),
                620px
              );
            margin-top: 22px;
          }

          .cc-popular-services__heading {
            margin-bottom: 11px;
          }

          .cc-popular-services__heading h2 {
            font-size: 23px;
          }

          .cc-popular-services__grid {
            display: flex;
            gap: 11px;
            overflow-x: auto;
            padding:
              3px
              2px
              10px;
            scroll-snap-type:
              x mandatory;
            scroll-padding-inline:
              2px;
            overscroll-behavior-inline:
              contain;
            scrollbar-width: none;
          }

          .cc-popular-services__grid::-webkit-scrollbar {
            display: none;
          }

          .cc-popular-card {
            flex:
              0 0
              min(78vw,300px);
            scroll-snap-align: start;
          }

          .cc-popular-card__title h3 {
            font-size: 13px;
          }
        }


        /*
         * ACCESSIBILITY
         */

        @media (prefers-reduced-motion: reduce) {
          .cc-popular-card,
          .cc-popular-card__film,
          .cc-popular-card__arrow {
            animation: none !important;
            transition: none !important;
          }
        }

        @keyframes ccPopularFilm {
          0%,
          68% {
            transform: translateX(-135%);
          }

          82%,
          100% {
            transform: translateX(135%);
          }
        }
      `}</style>
    </section>
  );
}
