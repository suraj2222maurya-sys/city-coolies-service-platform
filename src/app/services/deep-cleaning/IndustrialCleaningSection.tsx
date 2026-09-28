"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import FullHomeRightSidebar from "./FullHomeRightSidebar";
import {
  upsertDeepCleaningCartItem,
} from "./deepCleaningCart";
import styles from "./IndustrialCleaningSection.module.css";

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
    id: "industrial-site-cleaning",
    title: "All Types Industrial Cleaning",
    rating: 4.2,
    reviews: 820,
    directAdd: true,
    options: [{ id: "site-survey", label: "Site survey", price: 500 }],
    process: [
      { title: "Survey the site", description: "Inspect the facility size, accessible areas, surface condition and operating schedule." },
      { title: "Plan the scope", description: "Identify floors, work areas and equipment exteriors that need cleaning." },
      { title: "Confirm the final rate", description: "Share the cleaning plan and final service rate after the site survey." },
      { title: "Schedule the work", description: "Arrange cleaning after the scope and rate are approved." },
    ],
    included: ["On-site assessment", "Proposed cleaning scope", "Final rate discussion after the survey"],
    excluded: ["Cleaning work is not included in the site survey charge", "Repairs, hazardous waste removal and equipment dismantling"],
    distribution: [50, 30, 13, 5, 2],
  },
  {
    id: "warehouse-cleaning",
    title: "Warehouse Cleaning",
    rating: 4.2,
    reviews: 760,
    directAdd: true,
    options: [{ id: "site-survey", label: "Site survey", price: 500 }],
    process: [
      { title: "Inspect the warehouse", description: "Check floor area, aisles, storage zones and access requirements." },
      { title: "Prepare the plan", description: "Define cleaning for accessible floors, corners and exterior storage surfaces." },
      { title: "Confirm the final rate", description: "Set the final cleaning rate after the site survey and scope review." },
      { title: "Schedule cleaning", description: "Plan the work around approved access and operating hours." },
    ],
    included: ["Warehouse site assessment", "Accessible area cleaning plan", "Final rate discussion after the survey"],
    excluded: ["Cleaning work is not included in the site survey charge", "Moving inventory, pest control and structural repairs"],
    distribution: [50, 30, 13, 5, 2],
  },
  {
    id: "machinery-exterior-cleaning",
    title: "Machinery Exterior Cleaning",
    rating: 4.2,
    reviews: 690,
    directAdd: true,
    options: [{ id: "site-survey", label: "Site survey", price: 500 }],
    process: [
      { title: "Review equipment access", description: "Identify machinery exteriors, surface build-up and site safety requirements." },
      { title: "Agree on safe access", description: "Cleaning is planned around the site's equipment shutdown and access procedures." },
      { title: "Confirm the final rate", description: "Set the exterior cleaning scope and final rate after the survey." },
      { title: "Carry out approved work", description: "Clean only the agreed accessible exterior surfaces." },
    ],
    included: ["Exterior surface assessment", "Accessible exterior cleaning plan", "Final rate discussion after the survey"],
    excluded: ["Cleaning work is not included in the site survey charge", "Internal parts, dismantling, servicing and repairs"],
    distribution: [50, 30, 13, 5, 2],
  },
  {
    id: "hospital-clinic-sanitization",
    title: "Hospital & Clinic Sanitization",
    rating: 4.2,
    reviews: 740,
    directAdd: true,
    options: [{ id: "site-survey", label: "Site survey", price: 500 }],
    process: [
      { title: "Review the facility", description: "Identify accessible rooms, high-touch environmental surfaces and facility instructions." },
      { title: "Agree on the cleaning plan", description: "Define the areas and approved products with the facility team." },
      { title: "Confirm the final rate", description: "Set the environmental cleaning scope and final rate after the site survey." },
      { title: "Schedule the work", description: "Coordinate the approved work with the facility's operating requirements." },
    ],
    included: ["Facility surface assessment", "Proposed environmental cleaning scope", "Final rate discussion after the survey"],
    excluded: ["Cleaning work is not included in the site survey charge", "Medical equipment sterilization, clinical waste handling and treatment areas unless separately agreed"],
    distribution: [50, 30, 13, 5, 2],
  },
  {
    id: "restaurant-cafe-cleaning",
    title: "Restaurant & Cafe Cleaning",
    rating: 4.2,
    reviews: 810,
    directAdd: true,
    options: [{ id: "site-survey", label: "Site survey", price: 500 }],
    process: [
      { title: "Inspect the premises", description: "Review dining, service and accessible kitchen areas." },
      { title: "Define cleaning needs", description: "Identify floor, counter and other agreed accessible surfaces." },
      { title: "Confirm the final rate", description: "Set the final cleaning scope and rate after the survey." },
      { title: "Arrange cleaning", description: "Schedule the approved work around business hours." },
    ],
    included: ["Restaurant or cafe site assessment", "Accessible surface cleaning plan", "Final rate discussion after the survey"],
    excluded: ["Cleaning work is not included in the site survey charge", "Equipment dismantling, duct cleaning and pest control"],
    distribution: [50, 30, 13, 5, 2],
  },
  {
    id: "school-institution-cleaning",
    title: "School & Institution Cleaning",
    rating: 4.2,
    reviews: 670,
    directAdd: true,
    options: [{ id: "site-survey", label: "Site survey", price: 500 }],
    process: [
      { title: "Inspect the campus", description: "Review classrooms, corridors, washrooms and other accessible areas." },
      { title: "Prepare a cleaning plan", description: "Agree on surfaces, access and a suitable work schedule." },
      { title: "Confirm the final rate", description: "Set the final scope and service rate after the site survey." },
      { title: "Schedule the work", description: "Coordinate approved cleaning with the institution." },
    ],
    included: ["Institution site assessment", "Accessible area cleaning plan", "Final rate discussion after the survey"],
    excluded: ["Cleaning work is not included in the site survey charge", "Repairs, pest control and hazardous waste removal"],
    distribution: [50, 30, 13, 5, 2],
  },
  {
    id: "mall-common-area-cleaning",
    title: "Mall & Common-Area Cleaning",
    rating: 4.2,
    reviews: 720,
    directAdd: true,
    options: [{ id: "site-survey", label: "Site survey", price: 500 }],
    process: [
      { title: "Survey common areas", description: "Inspect corridors, entrances, shared floors and accessible public areas." },
      { title: "Plan the scope", description: "Agree on surfaces, access restrictions and work timing." },
      { title: "Confirm the final rate", description: "Set the cleaning scope and final service rate after the survey." },
      { title: "Schedule cleaning", description: "Arrange the approved work around visitor traffic." },
    ],
    included: ["Common-area site assessment", "Accessible area cleaning plan", "Final rate discussion after the survey"],
    excluded: ["Cleaning work is not included in the site survey charge", "Repairs, high-access work and tenant interiors unless separately agreed"],
    distribution: [50, 30, 13, 5, 2],
  },
  {
    id: "office-carpet-cleaning",
    title: "Office Carpet Cleaning",
    rating: 4.2,
    reviews: 790,
    directAdd: true,
    options: [{ id: "site-survey", label: "Site survey", price: 500 }],
    process: [
      { title: "Inspect the carpets", description: "Check carpet area, material, stains and furniture access." },
      { title: "Choose the method", description: "Propose a suitable cleaning approach after inspecting the carpet." },
      { title: "Confirm the final rate", description: "Set the scope and final service rate after the site survey." },
      { title: "Schedule cleaning", description: "Arrange the approved work and discuss expected drying time." },
    ],
    included: ["Office carpet assessment", "Proposed cleaning method and scope", "Final rate discussion after the survey"],
    excluded: ["Cleaning work is not included in the site survey charge", "Carpet repair, replacement and guaranteed removal of permanent stains"],
    distribution: [50, 30, 13, 5, 2],
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
        aria-labelledby={`industrial-modal-${service.id}`}
      >
        <header className={styles.modalHeader}>
          <div>
            <h2 id={`industrial-modal-${service.id}`}>{service.title}</h2>
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

export default function IndustrialCleaningSection() {
  const selectorRef = useRef<HTMLElement>(null);
  const [activeService, setActiveService] = useState<Service | null>(null);
  function addOption(service: Service, option: Option) {
    upsertDeepCleaningCartItem({
      id: `industrial:${service.id}:${option.id}`,
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
        id="panel-industrial-cleaning"
        role="tabpanel"
        className={styles.section}
        aria-labelledby="industrial-cleaning-heading"
      >
        <h1 id="industrial-cleaning-heading" className={styles.srOnly}>
          Industrial & Commercial Cleaning
        </h1>

        <div className={styles.container}>
          <div className={styles.contentLayout}>
            <main className={styles.mainColumn}>
              <div className={styles.selectorViewport}>
                <nav ref={selectorRef} className={styles.serviceSelector} aria-label="Industrial and commercial cleaning services">
                {services.map((service) => (
                  <button
                    key={service.id}
                    type="button"
                    className={styles.selectorItem}
                    onClick={() => scrollToService(`industrial-${service.id}`)}
                  >
                    <span className={styles.selectorImage} aria-hidden="true" />
                    <span className={styles.selectorLabel}>{service.title}</span>
                  </button>
                ))}
                              </nav>
                <button
                  type="button"
                  className={styles.selectorNextButton}
                  aria-label="Show more industrial cleaning services"
                  onClick={() => {
                    const row = selectorRef.current;
                    if (!row) return;
                    const atEnd =
                      row.scrollLeft + row.clientWidth >= row.scrollWidth - 8;
                    row.scrollTo({
                      left: atEnd ? 0 : row.scrollLeft + Math.max(280, row.clientWidth * 0.7),
                      behavior: "smooth",
                    });
                  }}
                >
                  {"\u2192"}
                </button>
              </div>
              <div className={styles.selectorDivider} />

              {services.map((service) => (
                <section
                  key={service.id}
                  id={`industrial-${service.id}`}
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