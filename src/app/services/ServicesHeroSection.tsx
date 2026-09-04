"use client";

import type { FormEvent } from "react";
import { useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";

type ServiceItem = {
  name: string;
  href: string;
  keywords: string[];
};

type ServiceCatalog = {
  version: number;
  serviceCount: number;
  services: ServiceItem[];
};

const HERO_BACKGROUND_IMAGE = "/services-hero-baground.png";
const CUSTOMER_LOGIN_PATH = "";
const CONTACT_PATH = "/contact";

const FALLBACK_SERVICES: ServiceItem[] = [
  {
    name: "Deep Cleaning",
    href: "/services/deep-cleaning",
    keywords: ["cleaning", "deep cleaning", "home cleaning"],
  },
  {
    name: "Renovation",
    href: "/services/renovation",
    keywords: ["renovation", "property renovation"],
  },
  {
    name: "Electrical Works",
    href: "/services/electrical-works",
    keywords: ["electrical", "electrician", "ac service"],
  },
  {
    name: "Plumbing Works",
    href: "/services/plumbing-works",
    keywords: ["plumbing", "plumber"],
  },
  {
    name: "Painting Services",
    href: "/services/painting-services",
    keywords: ["painting", "painter"],
  },
  {
    name: "Civil Construction & Maintenance",
    href: "/services/civil-construction-maintenance",
    keywords: ["civil", "construction", "maintenance"],
  },
  {
    name: "Appliance Repair",
    href: "/services/appliance-repair",
    keywords: ["appliance", "repair"],
  },
  {
    name: "Carpentry & Interior Works",
    href: "/services/carpentry-interior-works",
    keywords: ["carpentry", "interior"],
  },
  {
    name: "Packers & Movers",
    href: "/services/packers-movers",
    keywords: ["packers", "movers", "moving"],
  },
  {
    name: "Pest Control",
    href: "/services/pest-control",
    keywords: ["pest", "pest control"],
  },
  {
    name: "Spa & Salon Services",
    href: "/services/spa-salon-services",
    keywords: ["spa", "salon"],
  },
  {
    name: "Fabrication Works",
    href: "/services/fabrication-works",
    keywords: ["fabrication", "metal", "welding"],
  },
  {
    name: "Gardening & Landscaping",
    href: "/services/gardening-landscaping",
    keywords: ["gardening", "landscaping"],
  },
];

function SearchIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <circle cx="11" cy="11" r="6.5" />
      <path d="m16 16 4 4" strokeLinecap="round" />
    </svg>
  );
}

function LocationIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <path
        d="M12 21s7-6.1 7-12a7 7 0 1 0-14 0c0 5.9 7 12 7 12Z"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="12" cy="9" r="2.2" />
    </svg>
  );
}

function ChevronDownIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <path
        d="m8 10 4 4 4-4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
function UserIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <circle cx="12" cy="8" r="3.5" />
      <path
        d="M5.5 20c.8-4 3-6 6.5-6s5.7 2 6.5 6"
        strokeLinecap="round"
      />
    </svg>
  );
}

function CartIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <path
        d="M3 4h2l2.2 10h9.9l2-7H6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="9" cy="19" r="1.3" />
      <circle cx="17" cy="19" r="1.3" />
    </svg>
  );
}

function PhoneIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <path
        d="M8.4 4.2 10 8.3 7.9 10a15 15 0 0 0 6.1 6.1l1.7-2.1 4.1 1.6c.3.1.5.4.4.8-.5 2.3-2.5 3.9-4.8 3.9C9 20.3 3.7 15 3.7 8.6c0-2.3 1.6-4.3 3.9-4.8.3-.1.7.1.8.4Z"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ArrowIcon() {
  return (
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
  );
}

function ShieldIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.9"
    >
      <path
        d="M12 3 19 6v5c0 4.8-2.9 8.3-7 10-4.1-1.7-7-5.2-7-10V6l7-3Z"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="m9.2 12 1.8 1.8 3.9-4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ClockIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.9"
    >
      <circle cx="12" cy="12" r="8.5" />
      <path d="M12 7.5V12l3 1.8" strokeLinecap="round" />
    </svg>
  );
}

function PriceIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.9"
    >
      <rect x="4" y="3.5" width="16" height="17" rx="3" />
      <path d="M8 8h8M8 12h5M8 16h8" strokeLinecap="round" />
    </svg>
  );
}

function SatisfactionIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.9"
    >
      <path
        d="M12 2.8l2 1.5 2.5-.3.9 2.3 2.2 1.2-.7 2.4 1.3 2.1-1.7 1.8.2 2.5-2.4.6-1.4 2.1-2.3-.9-2.3.9-1.4-2.1-2.4-.6.2-2.5L4 12l1.3-2.1-.7-2.4 2.2-1.2.9-2.3 2.5.3L12 2.8Z"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="m8.7 12.1 2.1 2.1 4.5-4.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

const FEATURES = [
  {
    title: "Verified Professionals",
    subtitle: "Skilled & trusted",
    icon: <ShieldIcon />,
  },
  {
    title: "On-Time Service",
    subtitle: "Reliable scheduling",
    icon: <ClockIcon />,
  },
  {
    title: "Transparent Pricing",
    subtitle: "Clear service costs",
    icon: <PriceIcon />,
  },
  {
    title: "Satisfaction Guaranteed",
    subtitle: "Quality assured",
    icon: <SatisfactionIcon />,
  },
] as const;

export default function ServicesHeroSection() {
  const router = useRouter();

  const heroRef = useRef<HTMLElement>(null);
  const dockRef = useRef<HTMLDivElement>(null);

  const [services, setServices] =
    useState<ServiceItem[]>(FALLBACK_SERVICES);

  const [query, setQuery] = useState("");
  const [searchOpen, setSearchOpen] = useState(false);

  const [locationLabel, setLocationLabel] =
    useState("Chennai");

  const [locationBusy, setLocationBusy] = useState(false);

  const [accountOpen, setAccountOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);

  useEffect(() => {
    let active = true;

    fetch("/services-catalog.json")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Service catalog unavailable");
        }

        return response.json() as Promise<ServiceCatalog>;
      })
      .then((catalog) => {
        if (
          active &&
          Array.isArray(catalog.services) &&
          catalog.services.length > 0
        ) {
          setServices(catalog.services);
        }
      })
      .catch(() => {
        // Fallback catalog keeps search working.
      });

    return () => {
      active = false;
    };
  }, []);

  useEffect(() => {
    const hero = heroRef.current;

    if (!hero) {
      return;
    }

    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (
      reducedMotion ||
      !("IntersectionObserver" in window)
    ) {
      hero.classList.add(
        "cc-services-hero--motion-visible",
      );

      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry) {
          return;
        }

        hero.classList.toggle(
          "cc-services-hero--motion-visible",
          entry.isIntersecting,
        );
      },
      {
        threshold: 0.12,
        rootMargin: "5% 0px -8% 0px",
      },
    );

    observer.observe(hero);

    return () => {
      observer.disconnect();
    };
  }, []);

  useEffect(() => {
    function handleOutsideClick(event: MouseEvent) {
      if (
        dockRef.current &&
        !dockRef.current.contains(event.target as Node)
      ) {
        setSearchOpen(false);
        setAccountOpen(false);
        setCartOpen(false);
      }
    }

    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  const matchingServices = useMemo(() => {
    const value = query.trim().toLowerCase();

    if (!value) {
      return services.slice(0, 6);
    }

    return services
      .filter((service) => {
        const searchableText = [
          service.name,
          ...service.keywords,
        ]
          .join(" ")
          .toLowerCase();

        return searchableText.includes(value);
      })
      .slice(0, 7);
  }, [query, services]);

  function handleSearch(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const firstMatch = matchingServices[0];

    if (!firstMatch) {
      setSearchOpen(true);
      return;
    }

    router.push(firstMatch.href);
  }

  function handleLocation() {
    if (!navigator.geolocation) {
      setLocationLabel("Location unavailable");
      return;
    }

    setLocationBusy(true);

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const location = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          accuracy: position.coords.accuracy,
        };

        sessionStorage.setItem(
          "cityCooliesCustomerLocation",
          JSON.stringify(location),
        );

        setLocationLabel("Location Added");
        setLocationBusy(false);
      },
      () => {
        setLocationLabel("Allow Location");
        setLocationBusy(false);
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 120000,
      },
    );
  }

  function handleAccount() {
    setSearchOpen(false);
    setCartOpen(false);

    if (CUSTOMER_LOGIN_PATH) {
      router.push(CUSTOMER_LOGIN_PATH);
      return;
    }

    setAccountOpen((current) => !current);
  }

  return (
    <section
      ref={heroRef}
      className="cc-services-hero"
      aria-labelledby="services-hero-title"
    >
      <div
        className="cc-services-hero__background"
        aria-hidden="true"
      />

      <div
        className="cc-services-hero__overlay"
        aria-hidden="true"
      />

      <div
        className="cc-services-hero__ambient cc-services-hero__ambient--one"
        aria-hidden="true"
      />

      <div
        className="cc-services-hero__ambient cc-services-hero__ambient--two"
        aria-hidden="true"
      />

      <div className="cc-services-hero__inner">
        <div
          ref={dockRef}
          className="cc-services-hero__commerce-dock"
          data-hero-reveal
        >
          <form
            className="cc-services-hero__search"
            onSubmit={handleSearch}
          >
            <SearchIcon />

            <input
              type="search"
              value={query}
              placeholder="Search for services, e.g. Cleaning, Plumbing..."
              aria-label="Search City Coolies services"
              onFocus={() => {
                setSearchOpen(true);
                setAccountOpen(false);
                setCartOpen(false);
              }}
              onChange={(event) => {
                setQuery(event.target.value);
                setSearchOpen(true);
              }}
            />

            <button
              type="submit"
              aria-label="Search services"
            >
              <SearchIcon />
            </button>

            {searchOpen && (
              <div className="cc-services-hero__search-results">
                <div className="cc-services-hero__results-heading">
                  Services
                </div>

                {matchingServices.length > 0 ? (
                  matchingServices.map((service) => (
                    <button
                      key={service.href}
                      type="button"
                      onClick={() => router.push(service.href)}
                    >
                      <span>{service.name}</span>
                      <ArrowIcon />
                    </button>
                  ))
                ) : (
                  <p>No matching service found.</p>
                )}
              </div>
            )}
          </form>

          <button
            type="button"
            className="cc-services-hero__location-pill"
            disabled={locationBusy}
            onClick={handleLocation}
            aria-label="Use current location"
          >
            <LocationIcon />

            <span>
              {locationBusy ? "Locating..." : locationLabel}
            </span>

            <ChevronDownIcon />
          </button>

          <button
            type="button"
            className="cc-services-hero__account-pill"
            onClick={handleAccount}
          >
            <UserIcon />
            <span>Login / Signup</span>
          </button>

          <button
            type="button"
            className="cc-services-hero__cart"
            aria-label="Open service cart"
            onClick={() => {
              setSearchOpen(false);
              setAccountOpen(false);
              setCartOpen((current) => !current);
            }}
          >
            <CartIcon />
            <span>0</span>
          </button>

          {accountOpen && !CUSTOMER_LOGIN_PATH && (
            <div className="cc-services-hero__popover">
              <span className="cc-services-hero__popover-icon">
                <UserIcon />
              </span>

              <div>
                <strong>Customer Account</strong>

                <p>
                  Customer login and signup will connect here when
                  the customer account system is created.
                </p>
              </div>
            </div>
          )}

          {cartOpen && (
            <div className="cc-services-hero__popover">
              <span className="cc-services-hero__popover-icon">
                <CartIcon />
              </span>

              <div>
                <strong>Your Service Cart</strong>

                <p>
                  Your cart is empty. Select a service to start your
                  booking.
                </p>

                <button
                  type="button"
                  onClick={() => {
                    setCartOpen(false);

                    document
                      .querySelector("#all-services")
                      ?.scrollIntoView({
                        behavior: "smooth",
                        block: "start",
                      });
                  }}
                >
                  Explore Services
                </button>
              </div>
            </div>
          )}
        </div>

        <div className="cc-services-hero__content">
          <div
            className="cc-services-hero__eyebrow"
            data-hero-reveal
          >
            <span />
            Complete Property Services
          </div>

          <h1
            id="services-hero-title"
            className="cc-services-hero__title"
          >
            <span
              className="cc-services-hero__title-dark"
              data-hero-reveal
            >
              One trusted team.
            </span>

            <span
              className="cc-services-hero__title-red"
              data-hero-reveal
            >
              Every property need.
            </span>
          </h1>

          <p
            className="cc-services-hero__description"
            data-hero-reveal
          >
            Professional cleaning, renovation, electrical,
            plumbing, painting, repairs and property services for
            homes, offices and commercial spaces.
          </p>

          <div
            className="cc-services-hero__actions"
            data-hero-reveal
          >
            <a
              href="tel:+918693986939"
              className="cc-services-hero__call"
            >
              <PhoneIcon />
              <span>Call Now</span>
              <ArrowIcon />
            </a>

            <a
              href={CONTACT_PATH}
              className="cc-services-hero__contact"
            >
              <span>Contact Us</span>
              <ArrowIcon />
            </a>
          </div>

          <div className="cc-services-hero__features">
            {FEATURES.map((feature, index) => (
              <div
                key={feature.title}
                className="cc-services-hero__feature"
                data-hero-reveal
                style={{
                  animationDelay: `${index * 90}ms`,
                }}
              >
                <span className="cc-services-hero__feature-icon">
                  {feature.icon}
                </span>

                <span>
                  <strong>{feature.title}</strong>
                  <small>{feature.subtitle}</small>
                </span>
              </div>
            ))}
          </div>
        </div>

        <div
          className="cc-services-hero__property-card"
          data-hero-reveal
        >
          <span className="cc-services-hero__property-icon">
            <ShieldIcon />
          </span>

          <span>
            <small>Professional Property Care</small>
            <strong>Home • Office • Commercial</strong>
          </span>
        </div>
      </div>

      <div className="cc-services-hero__trust-shell">
        <div
          className="cc-services-hero__trust"
          data-hero-reveal
        >
          <div>
            <strong>13+</strong>
            <span>Service Categories</span>
          </div>

          <i />

          <div>
            <strong>Verified</strong>
            <span>Professionals</span>
          </div>

          <i />

          <div>
            <strong>Upfront</strong>
            <span>Transparent Pricing</span>
          </div>

          <i />

          <div>
            <strong>Secure</strong>
            <span>Booking Experience</span>
          </div>
        </div>
      </div>

      <style>{`
        html {
          scroll-behavior: smooth;
        }

        .cc-services-hero {
          --cc-red: #f51f2a;
          --cc-dark-red: #da0e1a;
          --cc-ink: #11131c;
          --cc-muted: #687080;

          position: relative;
          isolation: isolate;
          min-height: clamp(650px, 39vw, 770px);
          overflow: hidden;
          background: #fff8f9;
          border-bottom: 1px solid rgba(245, 31, 42, 0.11);
        }

        .cc-services-hero__background {
          position: absolute;
          inset: 0;
          z-index: -5;

          background-image: url("${HERO_BACKGROUND_IMAGE}");
          background-repeat: no-repeat;
          background-position: center top;
          background-size: 100% auto;

          transform: none;
          animation: none;
        }

        .cc-services-hero__overlay {
          position: absolute;
          inset: 0;
          z-index: -4;
          pointer-events: none;

          background:
            linear-gradient(
              90deg,
              rgba(255,255,255,.99) 0%,
              rgba(255,250,251,.97) 24%,
              rgba(255,246,248,.82) 40%,
              rgba(255,246,248,.28) 58%,
              rgba(255,255,255,.02) 78%
            );
        }

        .cc-services-hero__ambient {
          position: absolute;
          z-index: -3;
          border-radius: 999px;
          pointer-events: none;
        }

        .cc-services-hero__ambient--one {
          top: -160px;
          left: -140px;
          width: 500px;
          height: 500px;

          background:
            radial-gradient(
              circle,
              rgba(255,190,199,.24),
              transparent 69%
            );

          animation:
            ccAmbientMove 10s ease-in-out infinite;
        }

        .cc-services-hero__ambient--two {
          right: -80px;
          bottom: -150px;
          width: 410px;
          height: 410px;

          background:
            radial-gradient(
              circle,
              rgba(245,31,42,.10),
              transparent 70%
            );

          animation:
            ccAmbientMove 12s ease-in-out infinite reverse;
        }

        .cc-services-hero__inner {
          position: relative;
          z-index: 2;

          width: min(calc(100% - 40px), 1540px);
          min-height: clamp(650px, 39vw, 770px);

          margin: 0 auto;

          display: flex;
          align-items: center;

          padding:
            clamp(48px, 5vw, 82px)
            0
            126px;
        }

        .cc-services-hero__content {
          width: min(660px, 48%);
        }

        /* -----------------------------------
           COMPACT ECOMMERCE HERO TOOLBAR
        ----------------------------------- */

        .cc-services-hero__commerce-dock {
          position: absolute;
          z-index: 40;

          top: 24px;
          right: 0;

          width: min(760px, 55vw);

          display: flex;
          align-items: center;
          justify-content: flex-end;
          gap: 10px;

          padding: 0;

          border: 0;
          border-radius: 0;

          background: transparent;

          box-shadow: none;
          backdrop-filter: none;
        }

        .cc-services-hero__search {
          position: relative;

          flex: 1 1 330px;
          min-width: 280px;
          height: 46px;

          display: flex;
          align-items: center;
          gap: 10px;

          padding: 0 7px 0 14px;

          border:
            1px solid rgba(245, 31, 42, 0.14);

          border-radius: 14px;

          background:
            rgba(255, 255, 255, 0.93);

          box-shadow:
            0 12px 32px -25px
            rgba(56, 18, 22, 0.52);

          backdrop-filter: blur(15px);

          transition:
            border-color 180ms ease,
            box-shadow 180ms ease,
            background 180ms ease;
        }

        .cc-services-hero__search:focus-within {
          border-color:
            rgba(245, 31, 42, 0.38);

          background: white;

          box-shadow:
            0 16px 36px -24px
            rgba(245, 31, 42, 0.42);
        }

        .cc-services-hero__search > svg {
          width: 17px;
          height: 17px;

          flex: 0 0 auto;

          color: #7d838f;
        }

        .cc-services-hero__search input {
          width: 100%;
          min-width: 0;

          border: 0;
          outline: 0;

          color: #242731;
          background: transparent;

          font-size: 11px;
          font-weight: 600;
        }

        .cc-services-hero__search input::placeholder {
          color: #969ba6;
          font-weight: 500;
        }

        .cc-services-hero__search > button {
          width: 34px;
          height: 34px;

          flex: 0 0 34px;

          display: grid;
          place-items: center;

          border: 0;
          border-radius: 10px;

          color: #343741;
          background: transparent;

          cursor: pointer;

          transition:
            color 180ms ease,
            background 180ms ease,
            transform 180ms ease;
        }

        .cc-services-hero__search > button:hover {
          color: white;
          background: var(--cc-red);
          transform: scale(1.03);
        }

        .cc-services-hero__search > button svg {
          width: 17px;
          height: 17px;
        }

        .cc-services-hero__location-pill,
        .cc-services-hero__account-pill,
        .cc-services-hero__cart {
          height: 46px;

          border:
            1px solid rgba(245, 31, 42, 0.15);

          color: #272a33;

          background:
            rgba(255, 255, 255, 0.93);

          box-shadow:
            0 12px 30px -25px
            rgba(53, 16, 21, 0.5);

          backdrop-filter: blur(15px);

          cursor: pointer;

          transition:
            transform 180ms ease,
            border-color 180ms ease,
            box-shadow 180ms ease,
            background 180ms ease;
        }

        .cc-services-hero__location-pill,
        .cc-services-hero__account-pill {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 7px;

          padding: 0 13px;

          border-radius: 14px;

          white-space: nowrap;

          font-size: 10.5px;
          font-weight: 800;
        }

        .cc-services-hero__location-pill {
          min-width: 126px;
        }

        .cc-services-hero__account-pill {
          min-width: 142px;
        }

        .cc-services-hero__location-pill > svg:first-child,
        .cc-services-hero__account-pill > svg {
          width: 17px;
          height: 17px;

          flex: 0 0 auto;

          color: var(--cc-red);
        }

        .cc-services-hero__location-pill > svg:last-child {
          width: 13px;
          height: 13px;

          flex: 0 0 auto;

          color: #8c919c;
        }

        .cc-services-hero__location-pill:hover,
        .cc-services-hero__account-pill:hover,
        .cc-services-hero__cart:hover {
          transform: translateY(-2px);

          border-color:
            rgba(245, 31, 42, 0.3);

          background: white;

          box-shadow:
            0 17px 34px -24px
            rgba(245, 31, 42, 0.36);
        }

        .cc-services-hero__location-pill:disabled {
          cursor: wait;
          opacity: 0.7;
        }

        .cc-services-hero__cart {
          position: relative;

          width: 46px;
          min-width: 46px;

          display: grid;
          place-items: center;

          border-radius: 14px;
        }

        .cc-services-hero__cart > svg {
          width: 19px;
          height: 19px;

          color: #262932;
        }

        .cc-services-hero__cart > span {
          position: absolute;

          top: -7px;
          right: -6px;

          min-width: 19px;
          height: 19px;

          display: grid;
          place-items: center;

          padding: 0 5px;

          border: 2px solid white;
          border-radius: 999px;

          color: white;
          background: var(--cc-red);

          font-size: 9px;
          font-weight: 900;

          box-shadow:
            0 5px 12px
            rgba(245, 31, 42, 0.28);
        }

        .cc-services-hero__search-results {
          position: absolute;
          z-index: 90;

          top: calc(100% + 8px);
          right: 0;
          left: 0;

          max-height: 330px;
          overflow-y: auto;

          padding: 8px;

          border:
            1px solid rgba(245, 31, 42, 0.12);

          border-radius: 16px;

          background:
            rgba(255, 255, 255, 0.985);

          box-shadow:
            0 30px 70px -30px
            rgba(42, 13, 17, 0.55);

          backdrop-filter: blur(20px);
        }

        .cc-services-hero__results-heading {
          padding: 5px 9px 8px;

          color: #969ba5;

          font-size: 9px;
          font-weight: 900;

          letter-spacing: 0.14em;
          text-transform: uppercase;
        }

        .cc-services-hero__search-results > button {
          width: 100%;
          min-height: 42px;

          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 10px;

          padding: 8px 10px;

          border: 0;
          border-radius: 10px;

          color: #262933;
          background: transparent;

          cursor: pointer;

          font-size: 11px;
          font-weight: 750;
          text-align: left;

          transition:
            color 170ms ease,
            background 170ms ease;
        }

        .cc-services-hero__search-results > button:hover {
          color: var(--cc-red);
          background: #fff1f3;
        }

        .cc-services-hero__search-results > button svg {
          width: 14px;
          height: 14px;
        }

        .cc-services-hero__search-results > p {
          margin: 0;
          padding: 13px;

          color: #747a86;
          font-size: 11px;
        }

        .cc-services-hero__popover {
          position: absolute;
          z-index: 100;

          top: calc(100% + 10px);
          right: 0;

          width:
            min(320px, calc(100vw - 40px));

          display: flex;
          gap: 12px;

          padding: 16px;

          border:
            1px solid rgba(245, 31, 42, 0.12);

          border-radius: 17px;

          background:
            rgba(255, 255, 255, 0.985);

          box-shadow:
            0 28px 65px -29px
            rgba(47, 13, 18, 0.58);

          backdrop-filter: blur(20px);
        }

        .cc-services-hero__popover-icon {
          width: 39px;
          height: 39px;

          flex: 0 0 39px;

          display: grid;
          place-items: center;

          border-radius: 12px;

          color: var(--cc-red);
          background: #fff0f2;
        }

        .cc-services-hero__popover-icon svg {
          width: 19px;
          height: 19px;
        }

        .cc-services-hero__popover strong {
          color: #20232c;
          font-size: 12px;
        }

        .cc-services-hero__popover p {
          margin: 5px 0 0;

          color: #747a86;

          font-size: 10.5px;
          line-height: 1.55;
        }

        .cc-services-hero__popover button {
          margin-top: 10px;

          border: 0;
          border-radius: 9px;

          padding: 8px 11px;

          color: white;
          background: var(--cc-red);

          cursor: pointer;

          font-size: 10px;
          font-weight: 850;
        }

        /* -----------------------------------
           HERO CONTENT
        ----------------------------------- */

        .cc-services-hero__eyebrow {
          display: inline-flex;
          align-items: center;
          gap: 12px;

          margin-bottom: 20px;

          color: var(--cc-red);

          font-size: 12px;
          font-weight: 850;

          letter-spacing: .17em;
          text-transform: uppercase;
        }

        .cc-services-hero__eyebrow > span {
          width: 40px;
          height: 3px;

          display: block;

          border-radius: 999px;

          background:
            linear-gradient(
              90deg,
              var(--cc-red),
              #ff7780
            );
        }

        .cc-services-hero__title {
          margin: 0;

          color: var(--cc-ink);

          font-size:
            clamp(41px, 3.15vw, 60px);

          font-weight: 760;
          line-height: 1.02;

          letter-spacing: -.047em;
        }

        .cc-services-hero__title-dark,
        .cc-services-hero__title-red {
          width: fit-content;
          max-width: 100%;

          display: block;
        }

        .cc-services-hero__title-red {
          margin-top: 7px;
          color: var(--cc-red);
        }

        .cc-services-hero__description {
          max-width: 620px;

          margin: 27px 0 0;

          color: var(--cc-muted);

          font-size:
            clamp(15px, 1.05vw, 18px);

          line-height: 1.75;
        }

        .cc-services-hero__actions {
          display: flex;
          flex-wrap: wrap;
          gap: 14px;

          margin-top: 28px;
        }

        .cc-services-hero__call,
        .cc-services-hero__contact {
          min-height: 54px;

          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 10px;

          padding: 0 24px;

          border-radius: 17px;

          font-size: 14px;
          font-weight: 850;

          text-decoration: none;

          transition:
            transform 190ms ease,
            box-shadow 190ms ease;
        }

        .cc-services-hero__call {
          border: 1px solid var(--cc-red);

          color: white;

          background:
            linear-gradient(
              135deg,
              #ff2e39,
              #eb121f 64%,
              #d30a16
            );

          box-shadow:
            0 20px 37px -19px
            rgba(245,31,42,.82);
        }

        .cc-services-hero__contact {
          border:
            1px solid rgba(245,31,42,.22);

          color: var(--cc-dark-red);

          background:
            rgba(255,255,255,.79);

          backdrop-filter: blur(14px);
        }

        .cc-services-hero__call:hover,
        .cc-services-hero__contact:hover {
          transform: translateY(-3px);
        }

        .cc-services-hero__call svg,
        .cc-services-hero__contact svg {
          width: 18px;
          height: 18px;
        }

        .cc-services-hero__features {
          max-width: 660px;

          display: grid;

          grid-template-columns:
            repeat(4, minmax(0,1fr));

          gap: 10px;

          margin-top: 29px;
        }

        .cc-services-hero__feature {
          min-width: 0;

          display: flex;
          align-items: center;
          gap: 9px;

          padding: 11px 9px;

          border:
            1px solid rgba(245,31,42,.10);

          border-radius: 16px;

          background:
            rgba(255,255,255,.70);

          box-shadow:
            0 15px 28px -24px
            rgba(54,15,20,.5);

          backdrop-filter: blur(13px);
        }

        .cc-services-hero__feature-icon {
          width: 34px;
          height: 34px;

          flex: 0 0 34px;

          display: grid;
          place-items: center;

          border-radius: 11px;

          color: var(--cc-red);
          background: #fff0f2;
        }

        .cc-services-hero__feature-icon svg {
          width: 18px;
          height: 18px;
        }

        .cc-services-hero__feature > span:last-child {
          min-width: 0;

          display: flex;
          flex-direction: column;
          gap: 2px;
        }

        .cc-services-hero__feature strong {
          color: #262932;

          font-size: 10.5px;
          line-height: 1.2;
        }

        .cc-services-hero__feature small {
          color: #858b98;

          font-size: 9px;
          line-height: 1.25;
        }

        .cc-services-hero__property-card {
          position: absolute;

          right: 0;
          bottom: 143px;

          min-width: 285px;

          display: flex;
          align-items: center;
          gap: 12px;

          padding: 14px 17px;

          border:
            1px solid rgba(255,255,255,.85);

          border-radius: 20px;

          background:
            rgba(255,255,255,.86);

          box-shadow:
            0 26px 60px -31px
            rgba(45,13,18,.56);

          backdrop-filter: blur(20px);
        }

        .cc-services-hero__property-icon {
          width: 47px;
          height: 47px;

          flex: 0 0 47px;

          display: grid;
          place-items: center;

          border-radius: 15px;

          color: white;

          background:
            linear-gradient(
              145deg,
              #ff3340,
              #e4111e
            );
        }

        .cc-services-hero__property-icon svg {
          width: 23px;
          height: 23px;
        }

        .cc-services-hero__property-card > span:last-child {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }

        .cc-services-hero__property-card small {
          color: #888e9b;

          font-size: 10.5px;
          font-weight: 750;
        }

        .cc-services-hero__property-card strong {
          color: #252832;
          font-size: 13.5px;
        }

        /* -----------------------------------
           TRUST BAR
        ----------------------------------- */

        .cc-services-hero__trust-shell {
          position: absolute;
          z-index: 20;

          right: 0;
          bottom: 22px;
          left: 0;

          padding: 0 20px;
        }

        .cc-services-hero__trust {
          width: min(100%,1540px);
          min-height: 82px;

          margin: 0 auto;

          display: grid;

          grid-template-columns:
            1fr auto
            1fr auto
            1fr auto
            1fr;

          align-items: center;

          gap: 18px;

          padding: 13px 28px;

          border:
            1px solid rgba(245,31,42,.10);

          border-radius: 24px;

          background:
            linear-gradient(
              110deg,
              rgba(255,255,255,.92),
              rgba(255,244,247,.84)
            );

          box-shadow:
            0 24px 62px -35px
            rgba(62,17,22,.48);

          backdrop-filter: blur(21px);
        }

        .cc-services-hero__trust > div {
          min-width: 0;

          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 3px;

          text-align: center;
        }

        .cc-services-hero__trust strong {
          color: var(--cc-red);

          font-size: 16px;
          font-weight: 900;
        }

        .cc-services-hero__trust span {
          color: #656b78;

          font-size: 10.5px;
          font-weight: 700;
        }

        .cc-services-hero__trust i {
          width: 1px;
          height: 34px;

          background:
            linear-gradient(
              transparent,
              rgba(245,31,42,.20),
              transparent
            );
        }

        /* -----------------------------------
           SAFE CINEMATIC ANIMATION
           Elements are always visible.
        ----------------------------------- */

        .cc-services-hero [data-hero-reveal] {
          opacity: 1;
          visibility: visible;
        }

        .cc-services-hero [data-hero-reveal].is-visible {
          animation:
            ccHeroReveal
            760ms
            cubic-bezier(.16,1,.3,1)
            both;
        }

        @keyframes ccHeroReveal {
          from {
            opacity: 0;
            filter: blur(7px);
            transform:
              translate3d(0,22px,0)
              scale(.985);
          }

          to {
            opacity: 1;
            filter: blur(0);
            transform:
              translate3d(0,0,0)
              scale(1);
          }
        }

        @keyframes ccAmbientMove {
          0%,
          100% {
            transform:
              translate3d(0,0,0)
              scale(1);
          }

          50% {
            transform:
              translate3d(20px,-12px,0)
              scale(1.07);
          }
        }

        /* -----------------------------------
           LAPTOP / TABLET
        ----------------------------------- */

        @media (max-width: 1180px) {
          .cc-services-hero__commerce-dock {
            width: min(535px,44vw);
          }

          .cc-services-hero__content {
            width: min(610px,53%);
          }

          .cc-services-hero__property-card {
            display: none;
          }
        }

        @media (max-width: 960px) {
          .cc-services-hero {
            min-height: 850px;
          }

          .cc-services-hero__background {
            background-size: cover;
            background-position: 62% center;
          }

          .cc-services-hero__inner {
            min-height: 850px;

            align-items: flex-end;

            padding:
              180px
              0
              150px;
          }

          .cc-services-hero__commerce-dock {
            top: 20px;
            right: 0;
            left: 0;

            width: 100%;
          }

          .cc-services-hero__content {
            width: min(620px,70%);
          }

          .cc-services-hero__features {
            grid-template-columns:
              repeat(2,minmax(0,1fr));

            max-width: 480px;
          }
        }

        /* -----------------------------------
           PHONE
        ----------------------------------- */

        @media (max-width: 700px) {
          .cc-services-hero {
            min-height: 990px;
          }

          .cc-services-hero__background {
            height: 390px;
            bottom: auto;

            background-size: cover;
            background-position: 65% center;
          }

          .cc-services-hero__overlay {
            background:
              linear-gradient(
                180deg,
                rgba(255,255,255,.03) 0%,
                rgba(255,248,249,.10) 26%,
                rgba(255,249,250,.94) 42%,
                #fff8f9 51%,
                #fff8f9 100%
              );
          }

          .cc-services-hero__inner {
            width:
              min(calc(100% - 26px),620px);

            min-height: 990px;

            align-items: flex-start;

            padding:
              420px
              0
              170px;
          }

          .cc-services-hero__commerce-dock {
            top: 14px;

            width: 100%;

            padding: 9px;

            border-radius: 19px;
          }

          .cc-services-hero__commerce-label {
            display: none;
          }

          .cc-services-hero__search {
            min-height: 48px;
          }

          .cc-services-hero__utility-row {
            grid-template-columns:
              minmax(0,1fr)
              minmax(0,1fr)
              45px;
          }

          .cc-services-hero__utility-button {
            padding: 0 7px;

            font-size: 9.5px;
          }

          .cc-services-hero__utility-button span {
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
          }

          .cc-services-hero__content {
            width: 100%;
          }

          .cc-services-hero__eyebrow {
            margin-bottom: 14px;

            font-size: 9.5px;
          }

          .cc-services-hero__eyebrow > span {
            width: 28px;
          }

          .cc-services-hero__title {
            font-size:
              clamp(34px,9.8vw,44px);
          }

          .cc-services-hero__description {
            margin-top: 18px;

            font-size: 14px;
          }

          .cc-services-hero__actions {
            margin-top: 21px;
          }

          .cc-services-hero__call,
          .cc-services-hero__contact {
            min-height: 50px;

            padding: 0 18px;

            font-size: 13px;

            border-radius: 15px;
          }

          .cc-services-hero__features {
            width: 100%;
            max-width: none;

            gap: 8px;

            margin-top: 20px;
          }

          .cc-services-hero__trust-shell {
            bottom: 14px;

            padding: 0 13px;
          }

          .cc-services-hero__trust {
            min-height: auto;

            grid-template-columns:
              repeat(2,minmax(0,1fr));

            gap: 0;

            padding: 10px;

            border-radius: 20px;
          }

          .cc-services-hero__trust > div {
            min-height: 61px;

            justify-content: center;

            padding: 7px 5px;
          }

          .cc-services-hero__trust > div:nth-of-type(1),
          .cc-services-hero__trust > div:nth-of-type(2) {
            border-bottom:
              1px solid rgba(245,31,42,.09);
          }

          .cc-services-hero__trust i {
            display: none;
          }
        }

        @media (max-width: 430px) {
          .cc-services-hero {
            min-height: 1030px;
          }

          .cc-services-hero__background {
            height: 365px;
          }

          .cc-services-hero__inner {
            min-height: 1030px;

            padding-top: 402px;
          }

          .cc-services-hero__title {
            font-size:
              clamp(32px,10vw,40px);
          }

          .cc-services-hero__actions {
            display: grid;
            grid-template-columns: 1fr 1fr;
          }

          .cc-services-hero__call,
          .cc-services-hero__contact {
            width: 100%;

            padding: 0 10px;
          }
        }


        /* ccCommerceCompactResponsive */

        @media (max-width: 1180px) {
          .cc-services-hero__commerce-dock {
            width: min(690px, 58vw);
            gap: 7px;
          }

          .cc-services-hero__location-pill {
            min-width: 112px;
          }

          .cc-services-hero__account-pill {
            min-width: 128px;
          }
        }

        @media (max-width: 960px) {
          .cc-services-hero__commerce-dock {
            top: 18px;
            right: 0;
            left: 0;

            width: 100%;

            gap: 8px;

            padding: 0;

            border: 0;
            background: transparent;
            box-shadow: none;
          }

          .cc-services-hero__search {
            min-width: 220px;
          }
        }

        @media (max-width: 700px) {
          .cc-services-hero__commerce-dock {
            top: 12px;

            display: grid;

            grid-template-columns:
              minmax(0, 1fr)
              minmax(0, 1fr)
              44px;

            gap: 7px;

            width: 100%;

            padding: 0;

            border: 0;
            border-radius: 0;

            background: transparent;
          }

          .cc-services-hero__search {
            grid-column: 1 / -1;

            width: 100%;
            min-width: 0;
            height: 45px;
          }

          .cc-services-hero__location-pill,
          .cc-services-hero__account-pill {
            width: 100%;
            min-width: 0;
            height: 43px;

            padding: 0 8px;

            font-size: 9.5px;
          }

          .cc-services-hero__cart {
            width: 44px;
            min-width: 44px;
            height: 43px;
          }
        }
@media (prefers-reduced-motion: reduce) {
          html {
            scroll-behavior: auto;
          }

          .cc-services-hero__ambient {
            animation: none !important;
          }

          .cc-services-hero [data-hero-reveal].is-visible {
            animation: none !important;
          }

          .cc-services-hero__search > button,
          .cc-services-hero__utility-button,
          .cc-services-hero__cart,
          .cc-services-hero__call,
          .cc-services-hero__contact {
            transition: none !important;
          }
        }
      
        /* CC_PC_HERO_CINEMATIC_START */

        /*
         * ======================================================
         * CITY COOLIES PC HERO
         * CINEMATIC / VIDEO-LIKE SEQUENCE
         *
         * Existing design is preserved.
         * Existing hero image dimensions are preserved.
         * NO image zoom.
         * ======================================================
         */

        @media (
          min-width: 701px
        )
        and (
          prefers-reduced-motion:
          no-preference
        ) {

          /*
           * Disable the previous independent animation.
           * The new hero-level sequence controls everything.
           */

          .cc-services-hero
          [data-hero-reveal].is-visible {
            animation:
              none !important;
          }


          /*
           * ====================================================
           * BACKGROUND IMAGE FIRST
           *
           * No scale.
           * No zoom.
           * Only reveal + slight horizontal movement.
           * ====================================================
           */

          .cc-services-hero__background {
            opacity:
              0;

            filter:
              blur(4px);

            clip-path:
              inset(
                0
                0
                0
                9%
              );

            translate:
              20px 0;

            transition:
              opacity 240ms ease,
              filter 260ms ease,
              clip-path 280ms ease,
              translate 280ms ease;
          }

          .cc-services-hero--motion-visible
          .cc-services-hero__background {
            opacity:
              1;

            filter:
              blur(0);

            clip-path:
              inset(
                0
                0
                0
                0
              );

            translate:
              0 0;

            transition:
              opacity
                700ms
                cubic-bezier(.16,1,.3,1)
                0ms,

              filter
                850ms
                cubic-bezier(.16,1,.3,1)
                0ms,

              clip-path
                900ms
                cubic-bezier(.16,1,.3,1)
                0ms,

              translate
                900ms
                cubic-bezier(.16,1,.3,1)
                0ms;
          }


          /*
           * Background tint follows image.
           */

          .cc-services-hero__overlay {
            opacity:
              0;

            transition:
              opacity
              220ms ease;
          }

          .cc-services-hero--motion-visible
          .cc-services-hero__overlay {
            opacity:
              1;

            transition:
              opacity
              720ms ease
              80ms;
          }


          /*
           * Ambient decoration.
           */

          .cc-services-hero__ambient {
            opacity:
              0;

            filter:
              blur(12px);

            transition:
              opacity
              200ms ease,

              filter
              240ms ease;
          }

          .cc-services-hero--motion-visible
          .cc-services-hero__ambient {
            opacity:
              1;

            filter:
              blur(0);

            transition:
              opacity
              700ms ease
              160ms,

              filter
              850ms ease
              160ms;
          }


          /*
           * ====================================================
           * COMMON REVEAL
           * ====================================================
           */

          .cc-services-hero
          [data-hero-reveal] {
            opacity:
              0 !important;

            visibility:
              visible !important;

            filter:
              blur(7px);

            translate:
              0 19px;

            scale:
              .985;

            transition:
              opacity 180ms ease,
              filter 220ms ease,
              translate 240ms ease,
              scale 240ms ease,
              clip-path 240ms ease;
          }

          .cc-services-hero--motion-visible
          [data-hero-reveal] {
            opacity:
              1 !important;

            filter:
              blur(0);

            translate:
              0 0;

            scale:
              1;

            transition:
              opacity
                460ms
                cubic-bezier(.16,1,.3,1)
                var(
                  --cc-hero-delay,
                  0ms
                ),

              filter
                620ms
                cubic-bezier(.16,1,.3,1)
                var(
                  --cc-hero-delay,
                  0ms
                ),

              translate
                720ms
                cubic-bezier(.16,1,.3,1)
                var(
                  --cc-hero-delay,
                  0ms
                ),

              scale
                720ms
                cubic-bezier(.16,1,.3,1)
                var(
                  --cc-hero-delay,
                  0ms
                ),

              clip-path
                760ms
                cubic-bezier(.16,1,.3,1)
                var(
                  --cc-hero-delay,
                  0ms
                );
          }


          /*
           * ====================================================
           * ECOMMERCE DOCK
           * ====================================================
           */

          .cc-services-hero__commerce-dock {
            --cc-hero-delay:
              130ms;

            translate:
              0 -18px !important;
          }

          .cc-services-hero--motion-visible
          .cc-services-hero__commerce-dock {
            translate:
              0 0 !important;
          }


          /*
           * Toolbar controls start separately.
           */

          .cc-services-hero__commerce-dock
          > .cc-services-hero__search,

          .cc-services-hero__commerce-dock
          > .cc-services-hero__location-pill,

          .cc-services-hero__commerce-dock
          > .cc-services-hero__account-pill,

          .cc-services-hero__commerce-dock
          > .cc-services-hero__cart {
            opacity:
              0;

            filter:
              blur(5px);

            translate:
              0 -10px;
          }


          /*
           * Search
           */

          .cc-services-hero--motion-visible
          .cc-services-hero__commerce-dock
          > .cc-services-hero__search {
            opacity:
              1;

            filter:
              blur(0);

            translate:
              0 0;

            transition:
              opacity
              400ms ease
              270ms,

              filter
              520ms ease
              270ms,

              translate
              620ms
              cubic-bezier(.16,1,.3,1)
              270ms,

              border-color
              180ms ease,

              box-shadow
              180ms ease,

              background
              180ms ease;
          }


          /*
           * Location
           */

          .cc-services-hero--motion-visible
          .cc-services-hero__commerce-dock
          > .cc-services-hero__location-pill {
            opacity:
              1;

            filter:
              blur(0);

            translate:
              0 0;

            transition:
              opacity
              380ms ease
              390ms,

              filter
              500ms ease
              390ms,

              translate
              600ms
              cubic-bezier(.16,1,.3,1)
              390ms,

              transform
              180ms ease,

              border-color
              180ms ease,

              box-shadow
              180ms ease,

              background
              180ms ease;
          }


          /*
           * Login / Signup
           */

          .cc-services-hero--motion-visible
          .cc-services-hero__commerce-dock
          > .cc-services-hero__account-pill {
            opacity:
              1;

            filter:
              blur(0);

            translate:
              0 0;

            transition:
              opacity
              380ms ease
              510ms,

              filter
              500ms ease
              510ms,

              translate
              600ms
              cubic-bezier(.16,1,.3,1)
              510ms,

              transform
              180ms ease,

              border-color
              180ms ease,

              box-shadow
              180ms ease,

              background
              180ms ease;
          }


          /*
           * Cart
           */

          .cc-services-hero--motion-visible
          .cc-services-hero__commerce-dock
          > .cc-services-hero__cart {
            opacity:
              1;

            filter:
              blur(0);

            translate:
              0 0;

            transition:
              opacity
              380ms ease
              630ms,

              filter
              500ms ease
              630ms,

              translate
              600ms
              cubic-bezier(.16,1,.3,1)
              630ms,

              transform
              180ms ease,

              border-color
              180ms ease,

              box-shadow
              180ms ease,

              background
              180ms ease;
          }


          /*
           * ====================================================
           * CONTENT WRITING SEQUENCE
           * ====================================================
           */


          /*
           * Complete Property Services
           */

          .cc-services-hero__eyebrow {
            --cc-hero-delay:
              650ms;

            clip-path:
              inset(
                0
                100%
                0
                0
              );
          }

          .cc-services-hero--motion-visible
          .cc-services-hero__eyebrow {
            clip-path:
              inset(
                0
                0
                0
                0
              );
          }


          /*
           * One trusted team.
           */

          .cc-services-hero__title-dark {
            --cc-hero-delay:
              800ms;

            clip-path:
              inset(
                0
                100%
                0
                0
              );
          }

          .cc-services-hero--motion-visible
          .cc-services-hero__title-dark {
            clip-path:
              inset(
                0
                0
                0
                0
              );
          }


          /*
           * Every property need.
           */

          .cc-services-hero__title-red {
            --cc-hero-delay:
              970ms;

            clip-path:
              inset(
                0
                100%
                0
                0
              );
          }

          .cc-services-hero--motion-visible
          .cc-services-hero__title-red {
            clip-path:
              inset(
                0
                0
                0
                0
              );
          }


          /*
           * Description
           */

          .cc-services-hero__description {
            --cc-hero-delay:
              1140ms;

            clip-path:
              inset(
                0
                100%
                0
                0
              );
          }

          .cc-services-hero--motion-visible
          .cc-services-hero__description {
            clip-path:
              inset(
                0
                0
                0
                0
              );
          }


          /*
           * Buttons
           */

          .cc-services-hero__actions {
            --cc-hero-delay:
              1320ms;
          }


          /*
           * Button contents get a small second-stage movement.
           */

          .cc-services-hero__actions
          > a {
            opacity:
              0;

            translate:
              0 9px;
          }

          .cc-services-hero--motion-visible
          .cc-services-hero__actions
          > a:first-child {
            opacity:
              1;

            translate:
              0 0;

            transition:
              opacity
              340ms ease
              1440ms,

              translate
              520ms
              cubic-bezier(.16,1,.3,1)
              1440ms,

              transform
              190ms ease,

              box-shadow
              190ms ease;
          }

          .cc-services-hero--motion-visible
          .cc-services-hero__actions
          > a:nth-child(2) {
            opacity:
              1;

            translate:
              0 0;

            transition:
              opacity
              340ms ease
              1540ms,

              translate
              520ms
              cubic-bezier(.16,1,.3,1)
              1540ms,

              transform
              190ms ease,

              box-shadow
              190ms ease;
          }


          /*
           * ====================================================
           * FOUR FEATURE CARDS ONE-BY-ONE
           * ====================================================
           */

          .cc-services-hero__feature:nth-child(1) {
            --cc-hero-delay:
              1580ms;
          }

          .cc-services-hero__feature:nth-child(2) {
            --cc-hero-delay:
              1700ms;
          }

          .cc-services-hero__feature:nth-child(3) {
            --cc-hero-delay:
              1820ms;
          }

          .cc-services-hero__feature:nth-child(4) {
            --cc-hero-delay:
              1940ms;
          }


          /*
           * Feature icons pop after card arrives.
           */

          .cc-services-hero__feature-icon {
            opacity:
              0;

            scale:
              .76;

            rotate:
              -5deg;
          }

          .cc-services-hero--motion-visible
          .cc-services-hero__feature:nth-child(1)
          .cc-services-hero__feature-icon {
            opacity:
              1;

            scale:
              1;

            rotate:
              0deg;

            transition:
              opacity
              300ms ease
              1730ms,

              scale
              520ms
              cubic-bezier(.16,1,.3,1)
              1730ms,

              rotate
              520ms
              cubic-bezier(.16,1,.3,1)
              1730ms;
          }

          .cc-services-hero--motion-visible
          .cc-services-hero__feature:nth-child(2)
          .cc-services-hero__feature-icon {
            opacity:
              1;

            scale:
              1;

            rotate:
              0deg;

            transition:
              opacity
              300ms ease
              1850ms,

              scale
              520ms
              cubic-bezier(.16,1,.3,1)
              1850ms,

              rotate
              520ms
              cubic-bezier(.16,1,.3,1)
              1850ms;
          }

          .cc-services-hero--motion-visible
          .cc-services-hero__feature:nth-child(3)
          .cc-services-hero__feature-icon {
            opacity:
              1;

            scale:
              1;

            rotate:
              0deg;

            transition:
              opacity
              300ms ease
              1970ms,

              scale
              520ms
              cubic-bezier(.16,1,.3,1)
              1970ms,

              rotate
              520ms
              cubic-bezier(.16,1,.3,1)
              1970ms;
          }

          .cc-services-hero--motion-visible
          .cc-services-hero__feature:nth-child(4)
          .cc-services-hero__feature-icon {
            opacity:
              1;

            scale:
              1;

            rotate:
              0deg;

            transition:
              opacity
              300ms ease
              2090ms,

              scale
              520ms
              cubic-bezier(.16,1,.3,1)
              2090ms,

              rotate
              520ms
              cubic-bezier(.16,1,.3,1)
              2090ms;
          }


          /*
           * ====================================================
           * PROPERTY CARD
           * ====================================================
           */

          .cc-services-hero__property-card {
            --cc-hero-delay:
              2070ms;

            translate:
              22px 0 !important;
          }

          .cc-services-hero--motion-visible
          .cc-services-hero__property-card {
            translate:
              0 0 !important;
          }


          /*
           * ====================================================
           * BOTTOM TRUST BOX
           * ====================================================
           */

          .cc-services-hero__trust {
            --cc-hero-delay:
              2200ms;
          }


          /*
           * Trust stats themselves arrive one-by-one.
           */

          .cc-services-hero__trust
          > div {
            opacity:
              0;

            filter:
              blur(4px);

            translate:
              0 10px;
          }

          .cc-services-hero__trust
          > i {
            opacity:
              0;

            scale:
              1 .15;
          }


          .cc-services-hero--motion-visible
          .cc-services-hero__trust
          > div:nth-of-type(1) {
            opacity:
              1;

            filter:
              blur(0);

            translate:
              0 0;

            transition:
              opacity
              320ms ease
              2320ms,

              filter
              450ms ease
              2320ms,

              translate
              560ms
              cubic-bezier(.16,1,.3,1)
              2320ms;
          }


          .cc-services-hero--motion-visible
          .cc-services-hero__trust
          > i:nth-of-type(1) {
            opacity:
              1;

            scale:
              1 1;

            transition:
              opacity
              260ms ease
              2410ms,

              scale
              420ms
              cubic-bezier(.16,1,.3,1)
              2410ms;
          }


          .cc-services-hero--motion-visible
          .cc-services-hero__trust
          > div:nth-of-type(2) {
            opacity:
              1;

            filter:
              blur(0);

            translate:
              0 0;

            transition:
              opacity
              320ms ease
              2430ms,

              filter
              450ms ease
              2430ms,

              translate
              560ms
              cubic-bezier(.16,1,.3,1)
              2430ms;
          }


          .cc-services-hero--motion-visible
          .cc-services-hero__trust
          > i:nth-of-type(2) {
            opacity:
              1;

            scale:
              1 1;

            transition:
              opacity
              260ms ease
              2520ms,

              scale
              420ms
              cubic-bezier(.16,1,.3,1)
              2520ms;
          }


          .cc-services-hero--motion-visible
          .cc-services-hero__trust
          > div:nth-of-type(3) {
            opacity:
              1;

            filter:
              blur(0);

            translate:
              0 0;

            transition:
              opacity
              320ms ease
              2540ms,

              filter
              450ms ease
              2540ms,

              translate
              560ms
              cubic-bezier(.16,1,.3,1)
              2540ms;
          }


          .cc-services-hero--motion-visible
          .cc-services-hero__trust
          > i:nth-of-type(3) {
            opacity:
              1;

            scale:
              1 1;

            transition:
              opacity
              260ms ease
              2630ms,

              scale
              420ms
              cubic-bezier(.16,1,.3,1)
              2630ms;
          }


          .cc-services-hero--motion-visible
          .cc-services-hero__trust
          > div:nth-of-type(4) {
            opacity:
              1;

            filter:
              blur(0);

            translate:
              0 0;

            transition:
              opacity
              320ms ease
              2650ms,

              filter
              450ms ease
              2650ms,

              translate
              560ms
              cubic-bezier(.16,1,.3,1)
              2650ms;
          }
        }


        /*
         * ======================================================
         * REDUCED MOTION
         * Everything remains immediately visible.
         * ======================================================
         */

        @media (
          prefers-reduced-motion:
          reduce
        ) {
          .cc-services-hero__background,
          .cc-services-hero__overlay,
          .cc-services-hero__ambient,
          .cc-services-hero
          [data-hero-reveal],
          .cc-services-hero__commerce-dock
          > *,
          .cc-services-hero__actions
          > a,
          .cc-services-hero__feature-icon,
          .cc-services-hero__trust
          > div,
          .cc-services-hero__trust
          > i {
            opacity:
              1 !important;

            filter:
              none !important;

            translate:
              0 0 !important;

            scale:
              1 !important;

            rotate:
              0deg !important;

            clip-path:
              none !important;

            transition:
              none !important;
          }
        }

        /* CC_PC_HERO_CINEMATIC_END */
`}</style>
    </section>
  );
}