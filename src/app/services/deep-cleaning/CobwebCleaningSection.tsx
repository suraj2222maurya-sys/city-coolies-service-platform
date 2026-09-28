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
import styles from "./CobwebCleaningSection.module.css";

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
    id: "home-cobweb-cleaning",
    title: "Home Cobweb Cleaning",
    rating: 4.4,
    reviews: 810,
    directAdd: true,
    options: [{ id: "site-survey", label: "Site survey", price: 500 }],
    process: [
      { title: "Book the site survey", description: "Book a home cobweb cleaning assessment for \u20B9500." },
      { title: "Inspect accessible areas", description: "Check ceiling corners, wall edges, balconies and reachable fixtures." },
      { title: "Confirm the final rate", description: "The work scope and final cleaning rate are confirmed after the survey." },
      { title: "Schedule cleaning", description: "Arrange the approved cleaning and review access needs." },
    ],
    included: [
      "On-site assessment of reachable cobweb areas",
      "Review of ceilings, corners and accessible exterior edges",
      "Cleaning scope and final rate discussion after the survey",
    ],
    excluded: [
      "The site survey charge does not include cleaning",
      "Repairs, pest control and inaccessible high-area work",
    ],
    distribution: [60, 27, 8, 3, 2],
  },
  {
    id: "industrial-cobweb-cleaning",
    title: "Industrial Cobweb Cleaning",
    rating: 4.4,
    reviews: 740,
    directAdd: true,
    options: [{ id: "site-survey", label: "Site survey", price: 500 }],
    process: [
      { title: "Book the site survey", description: "Book an industrial cobweb cleaning assessment for \u20B9500." },
      { title: "Review the facility", description: "Inspect accessible beams, corners, storage zones and working areas." },
      { title: "Plan safe access", description: "Confirm height, equipment access and operating restrictions with the site team." },
      { title: "Confirm the final rate", description: "Set the cleaning scope and final service rate after the survey." },
    ],
    included: [
      "Industrial site and access assessment",
      "Review of reachable cobweb accumulation areas",
      "Cleaning scope and final rate discussion after the survey",
    ],
    excluded: [
      "The site survey charge does not include cleaning",
      "Machinery dismantling, electrical work and unapproved height work",
    ],
    distribution: [60, 27, 8, 3, 2],
  },
  {
    id: "building-cobweb-cleaning",
    title: "Building Cobweb Cleaning",
    rating: 4.4,
    reviews: 690,
    directAdd: true,
    options: [{ id: "site-survey", label: "Site survey", price: 500 }],
    process: [
      { title: "Book the site survey", description: "Book a building cobweb cleaning assessment for \u20B9500." },
      { title: "Inspect common areas", description: "Check corridors, stairwells, entrances and accessible ceiling edges." },
      { title: "Review access needs", description: "Identify height restrictions and areas requiring building permission." },
      { title: "Confirm the final rate", description: "Confirm the cleaning scope and final rate after the survey." },
    ],
    included: [
      "Building common-area assessment",
      "Review of reachable corners and ceiling edges",
      "Cleaning scope and final rate discussion after the survey",
    ],
    excluded: [
      "The site survey charge does not include cleaning",
      "Facade work, repairs and inaccessible areas unless separately agreed",
    ],
    distribution: [60, 27, 8, 3, 2],
  },
  {
    id: "commercial-cobweb-cleaning",
    title: "Commercial Cobweb Cleaning",
    rating: 4.4,
    reviews: 780,
    directAdd: true,
    options: [{ id: "site-survey", label: "Site survey", price: 500 }],
    process: [
      { title: "Book the site survey", description: "Book a commercial cobweb cleaning assessment for \u20B9500." },
      { title: "Inspect the premises", description: "Review accessible ceiling corners, display edges, storage areas and common spaces." },
      { title: "Agree on the work plan", description: "Confirm access, business hours and areas to be cleaned." },
      { title: "Confirm the final rate", description: "Set the cleaning scope and final service rate after the survey." },
    ],
    included: [
      "Commercial premises assessment",
      "Review of accessible cobweb areas",
      "Cleaning scope and final rate discussion after the survey",
    ],
    excluded: [
      "The site survey charge does not include cleaning",
      "Repairs, pest control and restricted areas without permission",
    ],
    distribution: [60, 27, 8, 3, 2],
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
        aria-labelledby={`cobweb-modal-${service.id}`}
      >
        <header className={styles.modalHeader}>
          <div>
            <h2 id={`cobweb-modal-${service.id}`}>{service.title}</h2>
            <p>
              {service.directAdd
                ? (service.directAdd ? `Site survey: ${money(500)}. Final cleaning rate is confirmed after the survey.` : `Starts at ${money(service.options[0].price)}`)
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
            <h3>How it works?</h3>
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

export default function CobwebCleaningSection() {
  const [activeService, setActiveService] = useState<Service | null>(null);
  const snapshot = useSyncExternalStore(
    subscribeDeepCleaningCart,
    getDeepCleaningCartSnapshot,
    getDeepCleaningCartServerSnapshot,
  );
  const cartItems = useMemo(() => parseDeepCleaningCartSnapshot(snapshot), [snapshot]);
  function addOption(service: Service, option: Option) {
    upsertDeepCleaningCartItem({
      id: `cobweb:${service.id}:${option.id}`,
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
        id="panel-cobweb-cleaning"
        role="tabpanel"
        className={styles.section}
        aria-labelledby="cobweb-cleaning-heading"
      >
        <h1 id="cobweb-cleaning-heading" className={styles.srOnly}>
          Cobweb Cleaning
        </h1>

        <div className={styles.container}>
          <div className={styles.contentLayout}>
            <main className={styles.mainColumn}>
              <nav className={styles.serviceSelector} aria-label="Cobweb cleaning services">
                {services.map((service) => (
                  <button
                    key={service.id}
                    type="button"
                    className={styles.selectorItem}
                    onClick={() => scrollToService(`cobweb-${service.id}`)}
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
                  id={`cobweb-${service.id}`}
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
                              <strong>{service.directAdd ? `Site survey ${money(500)}` : `Starts at ${money(Math.min(...service.options.map((option) => option.price)))}`}</strong>
                            </div>
                          </div>

                          {(
                            <button
                              type="button"
                              className={styles.addButton}
                              onClick={() => {
                                if (service.directAdd) addOption(service, service.options[0]); else setActiveService(service);
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