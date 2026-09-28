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
import styles from "./BathroomCleaningSection.module.css";

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
    id: "intense-bathroom-cleaning",
    title: "Intense Bathroom Cleaning",
    rating: 4.1,
    reviews: 800,
    pricingTitle: "Select number of bathrooms",
    options: [
      { id: "1-bathroom", label: "1 Bathroom", price: 574 },
      { id: "2-bathrooms", label: "2 Bathrooms", price: 1056 },
      { id: "3-bathrooms", label: "3 Bathrooms", price: 1549 },
      { id: "4-bathrooms", label: "4 Bathrooms", price: 2065 },
      { id: "5-bathrooms", label: "5 Bathrooms", price: 2582 },
    ],
    process: [
      { title: "Inspect the bathrooms", description: "The cleaning team checks accessible surfaces and confirms the selected bathroom count." },
      { title: "Deep clean and scrub", description: "Floors, tiles, toilet, basin, taps and shower areas are cleaned with attention to stains and grime." },
      { title: "Final check", description: "Mirrors and accessible fixtures are finished, and the cleaned areas are checked." },
    ],
    included: [
      "Floor, tiles, walls and corner deep cleaning",
      "Machine scrubbing for stubborn stains",
      "Toilet deep cleaning",
      "Wash basin, taps, shower and glass partition cleaning",
      "Mirror and window cleaning",
      "Exhaust fan cleaning",
      "Bathroom cabinet and shelf interior cleaning",
    ],
    excluded: [
      "Rust or cement stain removal",
      "Bucket and mug cleaning",
      "Fixture dismantling or repairs",
    ],
    perfectFor: [
      "Regular monthly deep cleaning",
      "Bathrooms with hard water stains or dull tiles",
      "Homes, apartments and commercial properties",
    ],
    distribution: [47, 30, 13, 6, 4],
  },
  {
    id: "move-in-move-out-bathroom-cleaning",
    title: "Move-in/Move-out Bathroom Cleaning",
    rating: 4.4,
    reviews: 800,
    pricingTitle: "Select number of bathrooms",
    options: [
      { id: "1-bathroom", label: "1 Bathroom", price: 666 },
      { id: "2-bathrooms", label: "2 Bathrooms", price: 1240 },
      { id: "3-bathrooms", label: "3 Bathrooms", price: 1825 },
      { id: "4-bathrooms", label: "4 Bathrooms", price: 2433 },
      { id: "5-bathrooms", label: "5 Bathrooms", price: 3042 },
    ],
    process: [
      { title: "Check the space", description: "The team confirms the bathrooms and notes areas needing additional attention." },
      { title: "Detailed cleaning", description: "Tiles, floors, toilet, shower, basin, mirrors and accessible storage are cleaned." },
      { title: "Ready for handover", description: "Visible surfaces are checked before the move-in or move-out handover." },
    ],
    included: [
      "Machine scrubbing for tiles and floors",
      "Toilet deep cleaning inside and out",
      "Basin, taps, shower area and mirror cleaning",
      "Hard water stain, soap scum and grime cleaning",
      "Exhaust fan cleaning",
      "Bathroom cabinet and shelf interior cleaning",
      "Additional attention to move-in or move-out cleaning",
    ],
    excluded: [
      "Rust or cement stain removal",
      "Bucket and mug cleaning",
      "Fixture dismantling or repairs",
    ],
    distribution: [60, 27, 8, 3, 2],
  },
  {
    id: "commercial-bathroom-cleaning",
    title: "Commercial Bathroom Cleaning",
    rating: 4.4,
    reviews: 800,
    directAdd: true,
    options: [
      { id: "site-survey", label: "Site survey - final cleaning rate after survey", price: 500 },
    ],
    process: [
      { title: "Book a site survey", description: "Book the commercial bathroom site survey for \u20B9500." },
      { title: "Assess the space", description: "The team checks the number of bathrooms, fixtures, condition and cleaning requirements on site." },
      { title: "Confirm the final rate", description: "After the survey, the cleaning scope and final service rate are confirmed with you." },
      { title: "Schedule cleaning", description: "The service is scheduled after you approve the confirmed scope and rate." },
    ],
    included: [
      "On-site assessment of commercial bathrooms",
      "Review of fixtures, surfaces and cleaning requirements",
      "Cleaning scope and final rate confirmation after the survey",
    ],
    excluded: [
      "The \u20B9500 site survey charge does not include the cleaning service",
      "The final cleaning rate is fixed after the site survey",
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
        aria-labelledby={`bathroom-modal-${service.id}`}
      >
        <header className={styles.modalHeader}>
          <div>
            <h2 id={`bathroom-modal-${service.id}`}>{service.title}</h2>
            <p>
              {service.directAdd
                ? (service.id === "commercial-bathroom-cleaning" ? `Site survey: ${money(500)}. Final cleaning rate is confirmed after the survey.` : `Starts at ${money(service.options[0].price)}`)
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
            <h3>{service.id === "intense-bathroom-cleaning" ? "Our Process" : "How it works?"}</h3>
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

export default function BathroomCleaningSection() {
  const [activeService, setActiveService] = useState<Service | null>(null);
  const snapshot = useSyncExternalStore(
    subscribeDeepCleaningCart,
    getDeepCleaningCartSnapshot,
    getDeepCleaningCartServerSnapshot,
  );
  const cartItems = useMemo(() => parseDeepCleaningCartSnapshot(snapshot), [snapshot]);
  function addOption(service: Service, option: Option) {
    upsertDeepCleaningCartItem({
      id: `bathroom:${service.id}:${option.id}`,
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
        id="panel-bathroom-cleaning"
        role="tabpanel"
        className={styles.section}
        aria-labelledby="bathroom-cleaning-heading"
      >
        <h1 id="bathroom-cleaning-heading" className={styles.srOnly}>
          Bathroom Cleaning
        </h1>

        <div className={styles.container}>
          <div className={styles.contentLayout}>
            <main className={styles.mainColumn}>
              <nav className={styles.serviceSelector} aria-label="Bathroom cleaning services">
                {services.map((service) => (
                  <button
                    key={service.id}
                    type="button"
                    className={styles.selectorItem}
                    onClick={() => scrollToService(`bathroom-${service.id}`)}
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
                  id={`bathroom-${service.id}`}
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
                              <strong>{service.id === "commercial-bathroom-cleaning" ? `Site survey ${money(500)}` : `Starts at ${money(Math.min(...service.options.map((option) => option.price)))}`}</strong>
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