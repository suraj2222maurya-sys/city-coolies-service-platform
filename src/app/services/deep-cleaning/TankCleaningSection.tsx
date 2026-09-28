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
import styles from "./TankCleaningSection.module.css";

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
  perfectFor?: readonly string[];
  distribution: readonly number[];
  directAdd?: boolean;
};

const services: readonly Service[] = [
  {
    id: "overhead-water-tank-cleaning",
    title: "Overhead Water Tank Cleaning",
    rating: 4.4,
    reviews: 2231,
    pricingTitle: "Select tank capacity",
    options: [
      { id: "up-to-1000-litres", label: "Up to 1000 Litres", price: 779 },
      { id: "1000-3000-litres", label: "1000 - 3000 Litres", price: 1099 },
      { id: "3000-6000-litres", label: "3000 - 6000 Litres", price: 1499 },
      { id: "6000-10000-litres", label: "6000 - 10000 Litres", price: 2549 },
    ],
    process: [
      { title: "Inspection", description: "Check the tank condition and confirm its capacity." },
      { title: "Drain Water", description: "Safely remove the stored water before cleaning." },
      { title: "Sludge & Dirt Removal", description: "Remove accessible mud, algae and settled dirt." },
      { title: "Scrubbing & Jet Wash", description: "Clean the tank walls, floor and corners." },
      { title: "Disinfection & Final Rinse", description: "Disinfect accessible surfaces and rinse the tank." },
    ],
    included: [
      "Tank inspection and water drainage",
      "Accessible sludge, dirt and algae removal",
      "Wall and floor scrubbing",
      "Jet washing and final rinse",
      "Surface disinfection",
    ],
    excluded: [
      "Tank repairs or waterproofing",
      "Plumbing or motor repairs",
      "Water refilling after cleaning",
    ],
    distribution: [60, 27, 8, 3, 2],
  },
  {
    id: "underground-sump-cleaning",
    title: "Underground Sump Cleaning",
    rating: 4.2,
    reviews: 1800,
    pricingTitle: "Select sump capacity",
    options: [
      { id: "up-to-5000-litres", label: "Up to 5000 Litres", price: 1449 },
      { id: "5000-8000-litres", label: "5000 - 8000 Litres", price: 1949 },
      { id: "8000-12000-litres", label: "8000 - 12000 Litres", price: 2399 },
      { id: "12000-20000-litres", label: "12000 - 20000 Litres", price: 3949 },
    ],
    process: [
      { title: "Inspect & Drain", description: "Check the sump condition and remove stored water." },
      { title: "Sludge Removal", description: "Remove accessible mud, algae and settled dirt." },
      { title: "Power Scrubbing", description: "Scrub the walls and floor with suitable cleaning agents." },
      { title: "Jet Wash", description: "Wash accessible surfaces and corners." },
      { title: "Disinfection & Rinse", description: "Disinfect the cleaned surfaces and complete a final rinse." },
    ],
    included: [
      "Sump inspection and drainage",
      "Accessible sludge and algae removal",
      "Wall and floor scrubbing",
      "Jet washing, disinfection and final rinse",
    ],
    excluded: [
      "Structural repairs or waterproofing",
      "Pump, motor or pipe repairs",
      "Water refilling after cleaning",
    ],
    distribution: [50, 30, 13, 5, 2],
  },
  {
    id: "overhead-concrete-water-tank-cleaning",
    title: "Overhead Concrete Water Tank Cleaning",
    rating: 4.7,
    reviews: 2219,
    pricingTitle: "Select tank capacity",
    options: [
      { id: "up-to-1000-litres", label: "Up to 1000 Litres", price: 1199 },
      { id: "1000-3000-litres", label: "1000 - 3000 Litres", price: 1499 },
      { id: "3000-6000-litres", label: "3000 - 6000 Litres", price: 1949 },
      { id: "6000-10000-litres", label: "6000 - 10000 Litres", price: 2949 },
    ],
    process: [
      { title: "Inspection", description: "Check the concrete tank condition and confirm its capacity." },
      { title: "Drain Water", description: "Safely remove the stored water." },
      { title: "Sludge & Dirt Removal", description: "Remove accessible mud, algae and settled dirt." },
      { title: "Scrubbing & Jet Wash", description: "Clean the concrete walls, floor and corners." },
      { title: "Disinfection & Final Rinse", description: "Disinfect cleaned surfaces and rinse the tank." },
    ],
    included: [
      "Concrete tank inspection and drainage",
      "Accessible sludge and algae removal",
      "Concrete wall and floor scrubbing",
      "Jet washing, disinfection and final rinse",
    ],
    excluded: [
      "Concrete crack repairs or waterproofing",
      "Plumbing or motor repairs",
      "Water refilling after cleaning",
    ],
    distribution: [71, 28, 1, 0, 0],
  },
];
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
        aria-labelledby={`tank-modal-${service.id}`}
      >
        <header className={styles.modalHeader}>
          <div>
            <h2 id={`tank-modal-${service.id}`}>{service.title}</h2>
            <p>
              {service.directAdd
                ? (service.id === "commercial-tank-cleaning" ? `Site survey: ${money(500)}. Final cleaning rate is confirmed after the survey.` : `Starts at ${money(service.options[0].price)}`)
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
            <h3>Process</h3>
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

          {!!service.perfectFor?.length && (
            <section className={styles.modalSection}>
              <h3>Perfect For</h3>
              <ul className={styles.simpleList}>
                {service.perfectFor.map((item) => <li key={item}>{item}</li>)}
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

export default function TankCleaningSection() {
  const [activeService, setActiveService] = useState<Service | null>(null);
  const snapshot = useSyncExternalStore(
    subscribeDeepCleaningCart,
    getDeepCleaningCartSnapshot,
    getDeepCleaningCartServerSnapshot,
  );
  const cartItems = useMemo(() => parseDeepCleaningCartSnapshot(snapshot), [snapshot]);
  function addOption(service: Service, option: Option) {
    upsertDeepCleaningCartItem({
      id: `tank:${service.id}:${option.id}`,
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
        id="panel-tank-cleaning"
        role="tabpanel"
        className={styles.section}
        aria-labelledby="tank-cleaning-heading"
      >
        <h1 id="tank-cleaning-heading" className={styles.srOnly}>
          Tank Cleaning
        </h1>

        <div className={styles.container}>
          <div className={styles.contentLayout}>
            <main className={styles.mainColumn}>
              <nav className={styles.serviceSelector} aria-label="Tank cleaning services">
                {services.map((service) => (
                  <button
                    key={service.id}
                    type="button"
                    className={styles.selectorItem}
                    onClick={() => scrollToService(`tank-${service.id}`)}
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
                  id={`tank-${service.id}`}
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
                              <strong>{service.id === "commercial-tank-cleaning" ? `Site survey ${money(500)}` : `Starts at ${money(Math.min(...service.options.map((option) => option.price)))}`}</strong>
                            </div>
                          </div>

                          {(
                            <button
                              type="button"
                              className={styles.addButton}
                              onClick={() => {
                                setActiveService(service);
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