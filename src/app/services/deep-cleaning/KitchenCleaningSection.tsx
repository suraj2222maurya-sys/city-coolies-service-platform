"use client";

import { useEffect, useMemo, useState, useSyncExternalStore } from "react";
import { createPortal } from "react-dom";
import FullHomeRightSidebar from "./FullHomeRightSidebar";
import {
  getDeepCleaningCartServerSnapshot,
  getDeepCleaningCartSnapshot,
  parseDeepCleaningCartSnapshot,
  removeDeepCleaningCartItem,
  subscribeDeepCleaningCart,
  upsertDeepCleaningCartItem,
} from "./deepCleaningCart";
import styles from "./KitchenCleaningSection.module.css";

type Option = { id: string; label: string; price: number };
type Step = { title: string; description: string };
type Service = {
  id: string;
  title: string;
  rating: number;
  reviews: number;
  options: readonly Option[];
  pricingTitle?: string;
  process: readonly Step[];
  included?: readonly string[];
  excluded?: readonly string[];
  distribution: readonly number[];
  directAdd?: boolean;
};

const services: readonly Service[] = [
  {
    id: "complete-kitchen-cleaning",
    title: "Complete Kitchen Cleaning",
    rating: 4.2,
    reviews: 900,
    pricingTitle: "Choose your kitchen cleaning package",
    options: [
      { id: "cabinet-exterior", label: "Cabinet Exterior Only", price: 949 },
      { id: "cabinet-interior-exterior", label: "Cabinet Exterior & Interior", price: 1949 },
    ],
    process: [
      { title: "Inspection", description: "Technician checks the kitchen and confirms the package." },
      { title: "Basic kitchen cleaning", description: "Both packages include slab, sink, visible tiles, dusting, sweeping and floor mopping. Cabinet cleaning follows the selected package." },
      { title: "Final check", description: "All included areas are cleaned and verified before completion." },
    ],
    included: [
      "Clean countertops, tiles & cabinet exteriors",
      "Cabinet interior cleaning (only if selected in package)",
      "Sink & faucet cleaned and sanitized",
      "Neat stove area with dust-free surfaces",
      "Swept & mopped floor for a fresh kitchen",
    ],
    excluded: ["Deep appliance cleaning (unless added)", "Repairs or pest control"],
    distribution: [47, 34, 13, 4, 2],
  },
  {
    id: "microwave-cleaning",
    title: "Microwave Cleaning",
    rating: 4.1,
    reviews: 1263,
    options: [{ id: "standard", label: "Microwave Cleaning", price: 199 }],
    directAdd: true,
    process: [
      { title: "Exterior cleaning", description: "Outer surface and controls are cleaned for a polished finish." },
      { title: "Interior cleaning", description: "Interior is refreshed by removing marks, splashes & odour." },
      { title: "Back panel cleaning", description: "Rear panel is dusted to keep airflow smooth." },
    ],
    distribution: [44, 31, 15, 7, 3],
  },
  {
    id: "gas-stove-cleaning",
    title: "Gas Stove Cleaning",
    rating: 4.3,
    reviews: 1319,
    pricingTitle: "Select number of burners",
    options: [
      { id: "2-burners", label: "2 burners", price: 99 },
      { id: "3-burners", label: "3 burners", price: 149 },
      { id: "4-plus-burners", label: "4+ burners", price: 199 },
    ],
    process: [
      { title: "Top surface cleaning", description: "Stove top wiped to remove oil & stains." },
      { title: "Burner pore cleaning (basic)", description: "External burner holes cleaned for normal flame flow - no dismantling." },
      { title: "Knob & panel cleaning", description: "Knobs & panel wiped for a neat finish." },
    ],
    excluded: [
      "Internal burner or ignition repair",
      "Gas-line fixing or adjustment",
      "Burner/part replacement",
    ],
    distribution: [55, 28, 11, 4, 2],
  },
  {
    id: "chimney-cleaning",
    title: "Chimney Cleaning",
    rating: 4.4,
    reviews: 1241,
    pricingTitle: "Select chimney cleaning",
    options: [{ id: "standard", label: "Chimney Cleaning", price: 399 }],
    process: [
      { title: "Exterior cleaning", description: "Outer body is wiped to remove dust, grease & grime." },
      { title: "Interior surface cleaning", description: "Reachable inner surfaces are cleaned for better airflow." },
      { title: "Filter wipe-down", description: "Washable filters are cleaned to reduce oil deposits." },
    ],
    excluded: [
      "Removing/cleaning inside the motor",
      "Cleaning carbon filters or duct pipes",
      "Opening internal units",
      "Deep cleaning of automatic sensor chimneys",
      "Taking apart the internal structure",
    ],
    distribution: [60, 27, 8, 3, 2],
  },
  {
    id: "commercial-kitchen-cleaning",
    title: "Commercial Kitchen Cleaning",
    rating: 4.2,
    reviews: 0,
    options: [
      {
        id: "site-survey",
        label: "Site survey - final cleaning rate after survey",
        price: 500,
      },
    ],
    directAdd: true,
    process: [
      {
        title: "Book the site survey",
        description: "A site survey is booked for the commercial kitchen. The survey fee is charged at booking.",
      },
      {
        title: "Inspect the kitchen",
        description: "The kitchen size, equipment, grease build-up and cleaning requirements are assessed on site.",
      },
      {
        title: "Confirm the final rate",
        description: "The cleaning scope and final service rate are confirmed after the site survey.",
      },
    ],
    included: [
      "On-site assessment of the commercial kitchen",
      "Review of accessible cooking, preparation and cleaning areas",
      "Cleaning scope and final-rate discussion after inspection",
    ],
    excluded: [
      "The site survey fee does not include the cleaning service",
      "The final cleaning rate is confirmed after the site survey",
    ],
    distribution: [47, 34, 13, 4, 2],
  },
];

const microwaveId = "kitchen:microwave-cleaning:standard";
const money = (value: number) => `\u20B9${value.toLocaleString("en-IN")}`;

function scrollToService(id: string) {
  const target = document.getElementById(id);
  if (!target) return;
  const top = target.getBoundingClientRect().top + window.scrollY - 155;
  window.scrollTo({ top: Math.max(0, top), behavior: "smooth" });
}

function DetailModal({
  service,
  onClose,
  onAdd,
}: {
  service: Service;
  onClose: () => void;
  onAdd: (service: Service, option: Option) => void;
}) {
  const [selected, setSelected] = useState<Option | null>(null);

  useEffect(() => {
    const priorOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const escape = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    document.addEventListener("keydown", escape);
    return () => {
      document.body.style.overflow = priorOverflow;
      document.removeEventListener("keydown", escape);
    };
  }, [onClose]);

  if (typeof document === "undefined") return null;

  return createPortal(
    <div
      className={styles.modalOverlay}
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <section
        className={styles.modal}
        role="dialog"
        aria-modal="true"
        aria-labelledby={`kitchen-modal-${service.id}`}
      >
        <header className={styles.modalHeader}>
          <div>
            <h2 id={`kitchen-modal-${service.id}`}>{service.title}</h2>
            <p>
              {service.directAdd
                ? (service.id === "commercial-kitchen-cleaning" ? `Site survey: ${money(500)}. Final cleaning rate is confirmed after the survey.` : `Starts at ${money(service.options[0].price)}`)
                : "Choose the option that matches your cleaning requirement."}
            </p>
          </div>
          <button type="button" className={styles.closeButton} aria-label="Close details" onClick={onClose}>{"\u00D7"}</button>
        </header>

        <div className={styles.modalBody}>
          {!service.directAdd && (
            <section className={styles.modalSection}>
              <h3>{service.pricingTitle}</h3>
              <div className={styles.pricingGrid}>
                {service.options.map((option) => (
                  <article key={option.id} className={styles.priceCard}>
                    <span className={styles.optionLabel}>{option.label}</span>
                    <strong>{money(option.price)}</strong>
                    <button
                      type="button"
                      aria-pressed={selected?.id === option.id}
                      onClick={() => setSelected((current) => current?.id === option.id ? null : option)}
                    >
                      Select
                    </button>
                  </article>
                ))}
              </div>
            </section>
          )}

          <section className={styles.modalSection}>
            <h3>{service.id === "complete-kitchen-cleaning" ? "Our Process" : "How it works?"}</h3>
            <ol className={styles.processList}>
              {service.process.map((step, index) => (
                <li key={step.title}>
                  <span className={styles.processNumber}>{index + 1}.</span>
                  <div><strong>{step.title}</strong><p>{step.description}</p></div>
                </li>
              ))}
            </ol>
          </section>

          {!!service.included?.length && (
            <section className={styles.modalSection}>
              <h3>Included</h3>
              <ul className={styles.simpleList}>
                {service.included.map((item) => <li key={item}>{item}</li>)}
              </ul>
            </section>
          )}

          {!!service.excluded?.length && (
            <section className={styles.modalSection}>
              <h3>Not Included</h3>
              <ul className={styles.simpleList}>
                {service.excluded.map((item) => <li key={item}>{item}</li>)}
              </ul>
            </section>
          )}

          <section className={styles.ratingSection} aria-label={`${service.title} customer rating`}>
            <div className={styles.ratingSummary}>
              <span className={styles.goldStar} aria-hidden="true">{"\u2605"}</span>
              <strong>{service.rating.toFixed(1)}</strong>
            </div>
            {service.reviews > 0 && (<p className={styles.ratingReviewCount}>{service.reviews.toLocaleString("en-IN")} reviews</p>)}
            <div className={styles.ratingBars}>
              {service.distribution.map((percentage, index) => (
                <div className={styles.ratingBarRow} key={5 - index}>
                  <span className={styles.ratingLabel}>
                    {5 - index}<span aria-hidden="true">{"\u2605"}</span>
                  </span>
                  <span className={styles.ratingTrack}>
                    <span className={styles.ratingFill} style={{ width: `${percentage}%` }} />
                  </span>
                  <span className={styles.ratingPercent}>{percentage}%</span>
                </div>
              ))}
            </div>
          </section>
        </div>

        {!service.directAdd && (
          <footer className={styles.selectionFooter}>
            <div className={styles.selectionSummary}>
              <span className={styles.selectionCaption}>Total</span>
              <strong className={styles.selectionValue}>{selected ? money(selected.price) : "Select an option"}</strong>
            </div>
            <button
              type="button"
              className={styles.continueButton}
              disabled={!selected}
              onClick={() => {
                if (selected) onAdd(service, selected);
              }}
            >
              Continue
            </button>
          </footer>
        )}
      </section>
    </div>,
    document.body,
  );
}

export default function KitchenCleaningSection() {
  const [activeService, setActiveService] = useState<Service | null>(null);
  const snapshot = useSyncExternalStore(
    subscribeDeepCleaningCart,
    getDeepCleaningCartSnapshot,
    getDeepCleaningCartServerSnapshot,
  );
  const cartItems = useMemo(() => parseDeepCleaningCartSnapshot(snapshot), [snapshot]);
  const microwaveItem = cartItems.find((item) => item.id === microwaveId);
  const microwaveQuantity = microwaveItem
    ? Math.max(1, Math.round(microwaveItem.price / 199))
    : 0;

  function setMicrowaveQuantity(quantity: number) {
    if (quantity <= 0) {
      removeDeepCleaningCartItem(microwaveId);
      return;
    }
    upsertDeepCleaningCartItem({
      id: microwaveId,
      serviceTitle: "Microwave Cleaning",
      optionLabel: `${quantity} \u00D7 Microwave Cleaning`,
      price: 199 * quantity,
      priceLabel: money(199 * quantity),
      duration: "Professional cleaning service",
    });
  }

  function addOption(service: Service, option: Option) {
    upsertDeepCleaningCartItem({
      id: `kitchen:${service.id}:${option.id}`,
      serviceTitle: service.title,
      optionLabel: option.label,
      price: option.price,
      priceLabel: money(option.price),
      duration: "Professional cleaning service",
    });
    setActiveService(null);
  }

  return (
    <>
      <section
        id="panel-kitchen-cleaning"
        role="tabpanel"
        className={styles.section}
        aria-labelledby="kitchen-cleaning-heading"
      >
        <h1 id="kitchen-cleaning-heading" className={styles.srOnly}>
          Kitchen Cleaning
        </h1>

        <div className={styles.container}>
          <div className={styles.contentLayout}>
            <main className={styles.mainColumn}>
              <nav className={styles.serviceSelector} aria-label="Kitchen cleaning services">
                {services.map((service) => (
                  <button
                    key={service.id}
                    type="button"
                    className={styles.selectorItem}
                    onClick={() => scrollToService(`kitchen-${service.id}`)}
                  >
                    <span className={styles.selectorImage} aria-hidden="true" />
                    <span className={styles.selectorLabel}>{service.title}</span>
                  </button>
                ))}
              </nav>
              <div className={styles.selectorDivider} />

              {services.map((service) => (
                <section
                  key={service.id}
                  id={`kitchen-${service.id}`}
                  className={styles.serviceGroup}
                >
                  <h2>{service.title}</h2>
                  <div className={styles.serviceList}>
                    <article className={styles.serviceCard}>
                      <div className={styles.bannerPlaceholder} data-service-id={service.id} aria-hidden="true" />
                      <div className={styles.serviceDetails}>
                        <div className={styles.serviceMainRow}>
                          <div className={styles.serviceInformation}>
                            <h3 className={styles.serviceTitle}>{service.title}</h3>
                            <div className={styles.ratingRow}>
                              <span className={styles.ratingIcon} aria-hidden="true">{"\u2605"}</span>
                              <span>{service.rating.toFixed(1)}</span>
                              {service.reviews > 0 && (<span className={styles.reviewText}>({service.reviews.toLocaleString("en-IN")} reviews)</span>)}
                              <button
                                type="button"
                                className={styles.detailsButton}
                                onClick={() => setActiveService(service)}
                              >
                                View details
                              </button>
                            </div>
                            <div className={styles.priceRow}>
                              <strong>{service.id === "commercial-kitchen-cleaning" ? `Site survey ${money(500)}` : `Starts at ${money(Math.min(...service.options.map((option) => option.price)))}`}</strong>
                            </div>
                          </div>

                          {service.directAdd && microwaveQuantity > 0 ? (
                            <div className={styles.quantityControl} aria-label="Microwave Cleaning quantity">
                              <button
                                type="button"
                                aria-label="Remove one Microwave Cleaning" onClick={() => setMicrowaveQuantity(microwaveQuantity - 1)}>{"\u2212"}</button>
                              <span>{microwaveQuantity}</span>
                              <button
                                type="button"
                                aria-label="Add one Microwave Cleaning"
                                onClick={() => setMicrowaveQuantity(microwaveQuantity + 1)}
                              >+</button>
                            </div>
                          ) : (
                            <button
                              type="button"
                              className={styles.addButton}
                              onClick={() => {
                                if (service.id === "commercial-kitchen-cleaning") addOption(service, service.options[0]); else if (service.directAdd) setMicrowaveQuantity(1);
                                else setActiveService(service);
                              }}
                            >
                              Add
                            </button>
                          )}
                        </div>
                      </div>
                    </article>
                  </div>
                </section>
              ))}
            </main>
            <aside className={styles.sidebarColumn}>
              <FullHomeRightSidebar />
            </aside>
          </div>
        </div>
      </section>

      {activeService && (
        <DetailModal
          key={activeService.id}
          service={activeService}
          onClose={() => setActiveService(null)}
          onAdd={addOption}
        />
      )}
    </>
  );
}