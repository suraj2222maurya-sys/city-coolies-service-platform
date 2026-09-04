"use client";

import Image from "next/image";
import { useMemo, useState } from "react";

import ServiceBookingModal from "@/components/booking/ServiceBookingModal";

import styles from "./ElectricalWorksCommerce.module.css";

type ElectricalCategory =
  | "Wiring"
  | "Points & Sockets"
  | "Fans & Lights"
  | "Boards & MCB"
  | "Repair & Safety";

type ServiceItem = {
  id: string;
  number: number;
  name: string;
  unit: string;
  price: number | null;
  image: string;
  category: ElectricalCategory;
};

const coreServices: ServiceItem[] = [
  {
    id: "light-point-wiring",
    number: 1,
    name: "Light point wiring",
    unit: "Point",
    price: 800,
    image: "/light-point-wiring-wall-box.png",
    category: "Wiring",
  },
  {
    id: "fan-point-wiring",
    number: 2,
    name: "Fan point wiring & installation",
    unit: "Point/Fan",
    price: 1500,
    image: "/fan-point-wiring-installation-service.png",
    category: "Wiring",
  },
  {
    id: "6a-socket-point",
    number: 3,
    name: "6A socket point",
    unit: "Point",
    price: 1000,
    image: "/6a-socket-point-service.png",
    category: "Points & Sockets",
  },
  {
    id: "16a-power-socket",
    number: 4,
    name: "16A power socket point",
    unit: "Point",
    price: 1200,
    image: "/16a-power-socket-installation-service.jpg",
    category: "Points & Sockets",
  },
  {
    id: "main-meter-panel-work",
    number: 18,
    name: "Main Meter Box Wiring / Panel Work",
    unit: "Service",
    price: 2500,
    image: "/main-meter-box-panel-wiring.png",
    category: "Boards & MCB",
  },
  {
    id: "ac-power-point",
    number: 6,
    name: "AC power point",
    unit: "Point",
    price: 2000,
    image: "/ac-power-point.png",
    category: "Points & Sockets",
  },
  {
    id: "exhaust-fan-installation",
    number: 7,
    name: "Exhaust fan installation",
    unit: "Each",
    price: 800,
    image: "/exhaust-fan-installation.png",
    category: "Fans & Lights",
  },
  {
    id: "ceiling-fan-installation",
    number: 8,
    name: "Ceiling fan installation",
    unit: "Each",
    price: 1500,
    image: "/ceiling-fan-exhaust-fan-installation.png",
    category: "Fans & Lights",
  },
  {
    id: "led-light-installation",
    number: 9,
    name: "LED light installation",
    unit: "Each",
    price: 500,
    image: "/led-lights-chandelier-fitting.png",
    category: "Fans & Lights",
  },
  {
    id: "switchboard-replacement",
    number: 10,
    name: "Switchboard replacement",
    unit: "Board",
    price: 1200,
    image: "/switchboard-replacement.png",
    category: "Points & Sockets",
  },
  {
    id: "mcb-installation",
    number: 11,
    name: "MCB installation/replacement",
    unit: "Each",
    price: 1000,
    image: "/mcb-installation-replacement.png",
    category: "Boards & MCB",
  },
  {
    id: "earthing-work",
    number: 12,
    name: "Earthing work",
    unit: "Job",
    price: 8000,
    image: "/earthing-shock-prevention.png",
    category: "Repair & Safety",
  },
  {
    id: "inverter-installation",
    number: 13,
    name: "Inverter installation",
    unit: "Set",
    price: 2800,
    image: "/inverter-battery-installation.png",
    category: "Boards & MCB",
  },
  {
    id: "fault-finding",
    number: 14,
    name: "Fault finding / MCB tripping",
    unit: "Visit",
    price: 1000,
    image: "/mcb-installation-replacement.png",
    category: "Repair & Safety",
  },
  {
    id: "electrician-man-power",
    number: 19,
    name: "Electrician Man Power",
    unit: "Visit",
    price: 1000,
    image: "/electrician-man-power.png",
    category: "Repair & Safety",
  },
];

const additionalServices: ServiceItem[] = [
  {
    id: "smart-switch-automation",
    number: 16,
    name: "Smart Switch & Automation Setup",
    unit: "Service",
    price: 1500,
    image: "/smart-switch-automation-setup.png",
    category: "Points & Sockets",
  },
  {
    id: "video-doorbell-fitting",
    number: 17,
    name: "Doorbell / Video Doorbell Fitting",
    unit: "Service",
    price: 800,
    image: "/video-doorbell-fitting.png",
    category: "Repair & Safety",
  },

];

const surveyService: ServiceItem = {
  id: "full-house-site-survey",
  number: 15,
  name: "Full House Electrical Wiring - Site Survey",
  unit: "Survey",
  price: 500,
  image: "/new-home-wiring-service.png",
  category: "Wiring",
};

const allBookableServices = [
  ...coreServices,
  ...additionalServices,
  surveyService,
];

const filters: Array<{
  label: string;
  value: "All" | ElectricalCategory;
}> = [
  { label: "All", value: "All" },
  { label: "Wiring", value: "Wiring" },
  { label: "Points & Sockets", value: "Points & Sockets" },
  { label: "Fans & Lights", value: "Fans & Lights" },
  { label: "Boards & MCB", value: "Boards & MCB" },
  { label: "Repair & Safety", value: "Repair & Safety" },
];

const RUPEE = "\u20B9";

const ICONS = {
  cart: "\u{1F6D2}",
  check: "\u2713",
  lock: "\u{1F512}",
  arrow: "\u2192",
  info: "\u24D8",
  verified: "\u2713",
  payment: "\u20B9",
  secure: "\u25A3",
  support: "\u260E",
  close: "\u00D7",
};

function money(value: number) {
  return `${RUPEE}${value.toLocaleString("en-IN")}`;
}

export default function ElectricalWorksCommerce() {
  const [activeCategory, setActiveCategory] = useState<
    "All" | ElectricalCategory
  >("All");

  const [cart, setCart] = useState<Record<string, number>>({});
  const [mobileBookingOpen, setMobileBookingOpen] = useState(false);

  const serviceMap = useMemo(
    () =>
      new Map(
        allBookableServices.map((service) => [
          service.id,
          service,
        ]),
      ),
    [],
  );

  const visibleCoreServices =
    activeCategory === "All"
      ? coreServices
      : coreServices.filter(
          (service) => service.category === activeCategory,
        );

  const visibleAdditionalServices =
    activeCategory === "All"
      ? additionalServices
      : additionalServices.filter(
          (service) => service.category === activeCategory,
        );

  const showSurvey =
    activeCategory === "All" || activeCategory === "Wiring";

  const cartEntries = Object.entries(cart)
    .map(([id, quantity]) => {
      const service = serviceMap.get(id);

      if (!service || quantity <= 0) {
        return null;
      }

      return {
        service,
        quantity,
      };
    })
    .filter(
      (
        item,
      ): item is {
        service: ServiceItem;
        quantity: number;
      } => item !== null,
    );

  const cartCount = cartEntries.reduce(
    (sum, item) => sum + item.quantity,
    0,
  );

  const subtotal = cartEntries.reduce((sum, item) => {
    if (item.service.price === null) {
      return sum;
    }

    return sum + item.service.price * item.quantity;
  }, 0);

  const electricalBookingItems = cartEntries
    .filter(
      (item) =>
        item.service.price !== null &&
        item.service.price > 0,
    )
    .map((item) => ({
      id: item.service.id,
      name: item.service.name,
      quantity: item.quantity,
      unitPrice: item.service.price as number,
      lineTotal:
        (item.service.price as number) *
        item.quantity,
    }));

  const electricalBookingName =
    electricalBookingItems.length === 1
      ? electricalBookingItems[0]!.name
      : `Electrical Works - ${electricalBookingItems.length} selected services`;


  function addService(id: string) {
    setCart((current) => ({
      ...current,
      [id]: (current[id] ?? 0) + 1,
    }));
  }

  function decreaseService(id: string) {
    setCart((current) => {
      const nextQuantity = (current[id] ?? 0) - 1;
      const next = { ...current };

      if (nextQuantity <= 0) {
        delete next[id];
      } else {
        next[id] = nextQuantity;
      }

      return next;
    });
  }

  function removeService(id: string) {
    setCart((current) => {
      const next = { ...current };
      delete next[id];
      return next;
    });
  }

  function renderServiceCard(service: ServiceItem) {
    const quantity = cart[service.id] ?? 0;

    return (
      <article
        className={styles.serviceCard}
        key={service.id}
      >
        <div className={styles.cardImage}>
          <Image
            src={service.image}
            alt={service.name}
            fill
            sizes="(max-width: 720px) 46vw, (max-width: 1280px) 22vw, 180px"
            loading={service.id === "new-electrical-point" ? "eager" : "lazy"}
          />
        </div>

        <div className={styles.cardBody}>
          <h3>{service.name}</h3>

          <p className={styles.unit}>
            Unit: {service.unit}
          </p>

          <div className={styles.cardFooter}>
            <strong
              className={
                service.price === null
                  ? styles.requestPrice
                  : styles.price
              }
            >
              {service.price === null
                ? "Price on request"
                : money(service.price)}
            </strong>

            {quantity === 0 ? (
              <button
                className={styles.addButton}
                type="button"
                onClick={() => addService(service.id)}
                aria-label={`Add ${service.name}`}
              >
                +
              </button>
            ) : (
              <div className={styles.inlineQuantity}>
                <button
                  type="button"
                  onClick={() =>
                    decreaseService(service.id)
                  }
                  aria-label={`Decrease ${service.name}`}
                >
                  -
                </button>

                <span>{quantity}</span>

                <button
                  type="button"
                  onClick={() => addService(service.id)}
                  aria-label={`Increase ${service.name}`}
                >
                  +
                </button>
              </div>
            )}
          </div>
        </div>
      </article>
    );
  }

  function renderBookingPanel() {
    return (
      <div className={styles.bookingPanel}>
        <div className={styles.bookingHeading}>
          <div>
            <span className={styles.bookingEyebrow}>
              YOUR CART
            </span>

            <h2>Your Booking</h2>
          </div>

          <div className={styles.cartIcon}>
            <span>{ICONS.cart}</span>
            <b>{cartCount}</b>
          </div>
        </div>

        <div className={styles.bookingItems}>
          {cartEntries.length === 0 ? (
            <div className={styles.emptyCart}>
              <span>+</span>

              <strong>No service selected yet</strong>

              <p>
                Add any electrical service from the cards.
              </p>
            </div>
          ) : (
            cartEntries.map(({ service, quantity }) => (
              <div
                className={styles.bookingItem}
                key={service.id}
              >
                <div className={styles.bookingImage}>
                  <Image
                    src={service.image}
                    alt=""
                    fill
                    sizes="64px"
                  />
                </div>

                <div className={styles.bookingInfo}>
                  <strong>{service.name}</strong>

                  <span>
                    Unit: {service.unit}
                  </span>

                  <b>
                    {service.price === null
                      ? "Price on request"
                      : money(service.price)}
                  </b>
                </div>

                <div className={styles.bookingControls}>
                  <div>
                    <button
                      type="button"
                      onClick={() =>
                        decreaseService(service.id)
                      }
                    >
                      -
                    </button>

                    <span>{quantity}</span>

                    <button
                      type="button"
                      onClick={() =>
                        addService(service.id)
                      }
                    >
                      +
                    </button>
                  </div>

                  <button
                    className={styles.removeButton}
                    type="button"
                    onClick={() =>
                      removeService(service.id)
                    }
                    aria-label={`Remove ${service.name}`}
                  >
                    x
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        <div className={styles.subtotal}>
          <span>Estimated Subtotal</span>
          <strong>{money(subtotal)}</strong>
        </div>

        <div className={styles.marketNote}>
          <span>{ICONS.check}</span>

          <p>
            Approx. market rates only. Material charges may
            be extra where applicable.
          </p>
        </div>

        <div className={styles.secureCheckout}>
          <span>{ICONS.lock}</span>
          Secure & Encrypted Checkout
        </div>

        {cartCount === 0 ? (
          <button
            className={styles.proceedButton}
            type="button"
            disabled
          >
            Proceed to Booking
            <span>{ICONS.arrow}</span>
          </button>
        ) : (
          <div className={styles.proceedBookingModal}>
            <ServiceBookingModal
              packageId="electrical-works-plan"
              serviceName={electricalBookingName}
              originalPrice={subtotal}
              offerPrice={subtotal}
              triggerLabel="Proceed to Booking"
              customServices={electricalBookingItems}
            />
          </div>
        )}

        <div className={styles.bookingTrust}>
          <div>
            <span>{ICONS.verified}</span>

            <p>
              <strong>
                Verified Electricians
              </strong>

              <small>
                Background verified experts
              </small>
            </p>
          </div>

          <div>
            <span>{ICONS.payment}</span>

            <p>
              <strong>
                Transparent Pricing
              </strong>

              <small>
                No hidden charges
              </small>
            </p>
          </div>

          <div>
            <span>{ICONS.secure}</span>

            <p>
              <strong>
                Secure Online Payments
              </strong>

              <small>
                Protected checkout
              </small>
            </p>
          </div>

          <div>
            <span>{ICONS.support}</span>

            <p>
              <strong>
                Customer Support
              </strong>

              <small>
                We are here to help you
              </small>
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <section
      className={styles.section}
      aria-label="Electrical services booking"
    >
      <div className={styles.shell}>
        <div className={styles.servicesColumn}>
          <nav
            className={styles.filters}
            aria-label="Electrical service categories"
          >
            {filters.map((filter) => (
              <button
                key={filter.value}
                type="button"
                className={
                  activeCategory === filter.value
                    ? styles.activeFilter
                    : ""
                }
                onClick={() =>
                  setActiveCategory(filter.value)
                }
              >
                {filter.label}
              </button>
            ))}
          </nav>

          {visibleCoreServices.length > 0 && (
            <div className={styles.servicesGrid}>
              {visibleCoreServices.map(renderServiceCard)}
            </div>
          )}

          {visibleAdditionalServices.length > 0 && (
            <div className={styles.extraServices}>
              {visibleAdditionalServices.map(
                renderServiceCard,
              )}
            </div>
          )}

          {showSurvey && (
            <article className={styles.surveyCard}>
              <div className={styles.surveyImage}>
                <Image
                  src="/new-home-wiring-service.png"
                  alt="Full house electrical wiring"
                  fill
                  sizes="220px"
                  loading="eager"
                />
              </div>

              <div className={styles.surveyContent}>
                <div className={styles.surveyTitleRow}>
                  <h3>
                    Full House Electrical Wiring
                  </h3>

                  <span className={styles.specialTag}>
                    SITE SURVEY
                  </span>
                </div>

                <div className={styles.surveyRates}>
                  <span>
                    Rate:
                    <strong>{RUPEE}180</strong>
                    / sq.ft.
                  </span>

                  <span>
                    Site survey booking charge:
                    <strong>{RUPEE}500</strong>
                  </span>

                  <span>
                    Final quote after site survey.
                  </span>
                </div>

                <div className={styles.surveyBottom}>
                  <p>
                    <span>{ICONS.info}</span>

                    Book the site survey online. Our
                    electrician will assess the requirements
                    and share the final quote.
                  </p>

                  <ServiceBookingModal
                    packageId="full-house-electrical-site-survey"
                    serviceName="Full House Electrical Wiring - Site Survey"
                    originalPrice={500}
                    offerPrice={500}
                    triggerLabel="Book Site Survey →"
                    fullPayment
                  />
                </div>
              </div>
            </article>
          )}
        </div>

        <aside className={styles.desktopBooking}>
          {renderBookingPanel()}

          <div className={styles.desktopBottomNote}>
            <p>
              <strong>Note:</strong>{" "}
              Approx. market rates shown for guidance.
              <br />
              Material charges may be extra where applicable.
            </p>
          </div>
        </aside>
      </div>

      <div className={styles.mobileCartBar}>
        <button
          type="button"
          onClick={() =>
            setMobileBookingOpen(true)
          }
        >
          <div>
            <span>
              Booking Summary ({cartCount}{" "}
              {cartCount === 1 ? "item" : "items"})
            </span>

            <strong>{money(subtotal)}</strong>
          </div>

          <b>
            View Cart & Book
            <span>{ICONS.arrow}</span>
          </b>
        </button>
      </div>

      {mobileBookingOpen && (
        <div
          className={styles.mobileOverlay}
          role="dialog"
          aria-modal="true"
          aria-label="Electrical booking summary"
        >
          <button
            type="button"
            className={styles.overlayBackdrop}
            aria-label="Close booking"
            onClick={() =>
              setMobileBookingOpen(false)
            }
          />

          <div className={styles.mobileBookingSheet}>
            <button
              className={styles.closeMobileBooking}
              type="button"
              aria-label="Close booking"
              onClick={() =>
                setMobileBookingOpen(false)
              }
            >
              {ICONS.close}
            </button>

            {renderBookingPanel()}
          </div>
        </div>
      )}
    </section>
  );
}