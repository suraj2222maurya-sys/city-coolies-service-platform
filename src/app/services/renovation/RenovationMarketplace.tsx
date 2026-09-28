"use client";

import { useEffect, useMemo, useState, useSyncExternalStore } from "react";
import FullHomeRightSidebar from "../deep-cleaning/FullHomeRightSidebar";
import {
  getDeepCleaningCartServerSnapshot,
  getDeepCleaningCartSnapshot,
  parseDeepCleaningCartSnapshot,
  removeDeepCleaningCartItem,
  subscribeDeepCleaningCart,
  upsertDeepCleaningCartItem,
} from "../deep-cleaning/deepCleaningCart";
import styles from "./RenovationMarketplace.module.css";

type Service = {
  id: string;
  title: string;
  reviews: number;
  description: string;
  includes: readonly string[];
  process: readonly string[];
};

const services: readonly Service[] = [
  {
    id: "full-home-renovation",
    title: "Full Home Renovation",
    reviews: 810,
    description: "A coordinated renovation plan for the rooms and finishes across your home.",
    includes: ["Room-by-room scope assessment", "Civil, flooring and surface work planning", "Kitchen and bathroom upgrade planning", "Finishing and handover review"],
    process: ["Inspect the property and discuss your goals", "Measure rooms and assess existing conditions", "Prepare a scope, material plan and final quotation", "Schedule and complete approved renovation work"],
  },
  {
    id: "kitchen-renovation",
    title: "Kitchen Renovation",
    reviews: 765,
    description: "Upgrade your kitchen layout, storage, worktops and finishes.",
    includes: ["Kitchen measurements and layout review", "Cabinet and storage planning", "Countertop and backsplash assessment", "Plumbing and electrical point review"],
    process: ["Inspect the kitchen and take measurements", "Discuss layout, storage and finish choices", "Confirm the scope and final quotation", "Complete approved installation and finishing"],
  },
  {
    id: "bathroom-renovation",
    title: "Bathroom Renovation",
    reviews: 720,
    description: "Refresh bathroom surfaces, fittings and layout to suit your space.",
    includes: ["Existing bathroom inspection", "Tile and waterproofing assessment", "Fixture and plumbing layout review", "Finishing and handover checks"],
    process: ["Inspect the bathroom and existing fittings", "Review waterproofing, plumbing and design needs", "Confirm the scope and final quotation", "Complete approved renovation and final checks"],
  },
  {
    id: "villa-independent-house-renovation",
    title: "Villa / Independent House Renovation",
    reviews: 645,
    description: "Plan interior and exterior improvements for a villa or independent house.",
    includes: ["Property-wide condition survey", "Interior and exterior scope planning", "Civil and finish assessment", "Phased work and access planning"],
    process: ["Survey the property and understand priorities", "Measure areas and review existing construction", "Provide a phased scope and final quotation", "Carry out approved work with progress checks"],
  },
  {
    id: "complete-house-electrical-renovation",
    title: "Complete House Electrical Renovation",
    reviews: 695,
    description: "Assess and upgrade household wiring, electrical points and fittings.",
    includes: ["Existing wiring and distribution assessment", "Switch, socket and lighting point planning", "Circuit and load review", "Testing plan for approved work"],
    process: ["Inspect existing electrical installations", "Discuss required points and appliance loads", "Confirm the safe work scope and final quotation", "Complete approved work and electrical testing"],
  },
  {
    id: "office-renovation",
    title: "Office Renovation",
    reviews: 610,
    description: "Adapt an office layout, finishes and utilities for your business needs.",
    includes: ["Workspace and circulation assessment", "Partitions and finishes planning", "Lighting and electrical review", "Work scheduling discussion"],
    process: ["Survey the office and operational requirements", "Plan layout, materials and work schedule", "Confirm the scope and final quotation", "Carry out approved work and handover checks"],
  },
  {
    id: "shop-showroom-renovation",
    title: "Shop / Showroom Renovation",
    reviews: 585,
    description: "Refresh retail space, displays, lighting and customer-facing finishes.",
    includes: ["Retail layout and display assessment", "Flooring and wall finish planning", "Lighting and power point review", "Access and work schedule planning"],
    process: ["Survey the shop and discuss your brand needs", "Plan displays, finishes and utilities", "Confirm the scope and final quotation", "Complete approved work and handover"],
  },
];

const surveyPrice = 500;
const cartId = (id: string) => `renovation:${id}:site-survey`;

function DetailsModal({
  service,
  onClose,
  onAdd,
  added,
}: {
  service: Service;
  onClose: () => void;
  onAdd: (service: Service) => void;
  added: boolean;
}) {
  useEffect(() => {
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previous;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [onClose]);

  return (
    <div className={styles.backdrop} onMouseDown={(event) => {
      if (event.target === event.currentTarget) onClose();
    }}>
      <section
        className={styles.modal}
        role="dialog"
        aria-modal="true"
        aria-labelledby="renovation-modal-title"
      >
        <header className={styles.modalHeader}>
          <div>
            <h2 id="renovation-modal-title">{service.title}</h2>
            <p>Site survey ₹500</p>
          </div>
          <button type="button" className={styles.closeButton} onClick={onClose} aria-label="Close details">×</button>
        </header>

        <div className={styles.modalBody}>
          <p className={styles.rateNote}>
            The site survey costs ₹500. The final renovation rate will be confirmed after the survey, based on the property condition, measurements, materials and agreed work scope.
          </p>
          <p>{service.description}</p>

          <section className={styles.infoBox}>
            <h3>What we assess</h3>
            <ul>{service.includes.map((item) => <li key={item}>{item}</li>)}</ul>
          </section>

          <section className={styles.infoBox}>
            <h3>How it works</h3>
            <ol>{service.process.map((step) => <li key={step}>{step}</li>)}</ol>
          </section>

          <section className={styles.ratingBox} aria-label="Customer ratings">
            <h3><span className={styles.star}>★</span> 4.1</h3>
            <p>{service.reviews.toLocaleString("en-IN")} reviews</p>
            {[5, 4, 3, 2, 1].map((score, index) => (
              <div className={styles.ratingLine} key={score}>
                <span>{score} ★</span>
                <div className={styles.ratingTrack}>
                  <span style={{ width: `${[47, 30, 13, 6, 4][index]}%` }} />
                </div>
                <span>{[47, 30, 13, 6, 4][index]}%</span>
              </div>
            ))}
          </section>
        </div>

        <footer className={styles.modalFooter}>
          <strong>Site survey ₹500</strong>
          <button type="button" onClick={() => onAdd(service)}>
            Continue
          </button>
        </footer>
      </section>
    </div>
  );
}

export default function RenovationMarketplace() {
  const [active, setActive] = useState<Service | null>(null);
  const [selectorScrolled, setSelectorScrolled] = useState(false);
  const snapshot = useSyncExternalStore(
    subscribeDeepCleaningCart,
    getDeepCleaningCartSnapshot,
    getDeepCleaningCartServerSnapshot,
  );
  const cartItems = useMemo(() => parseDeepCleaningCartSnapshot(snapshot), [snapshot]);
  const selected = (id: string) => cartItems.some((item) => item.id === cartId(id));

  function toggleSurvey(service: Service) {
    if (selected(service.id)) {
      removeDeepCleaningCartItem(cartId(service.id));
    } else {
      upsertDeepCleaningCartItem({
        id: cartId(service.id),
        serviceTitle: service.title,
        optionLabel: "Site survey",
        price: surveyPrice,
        priceLabel: "₹500",
        duration: "Final renovation rate after site survey",
      });
      window.dispatchEvent(new Event("citycoolies:deep-cleaning-cart-added"));
    }
    setActive(null);
  }

  return (
    <section id="city-coolies-renovation" className={styles.section}>
      <div className={styles.container}>
        <div className={styles.columns}>
          <main className={styles.main}>
            <p className={styles.eyebrow}>Renovation services</p>
            <h1 className={styles.pageTitle}>Renovation</h1>
            <p className={styles.intro}>Select a service to arrange a ₹500 site survey. Your final renovation rate is confirmed after the survey.</p>

            <div className={styles.selectorViewport}>
              <button
                type="button"
                className={styles.selectorPrevious}
                style={{ display: selectorScrolled ? undefined : "none" }}
                aria-label="Show previous renovation services"
                onClick={() => document.getElementById("renovation-service-selector")?.scrollBy({ left: -330, behavior: "smooth" })}
              >
                <span aria-hidden="true">{"\u2190"}</span>
              </button>
              <nav
                id="renovation-service-selector"
                className={styles.selector}
                aria-label="Select a renovation service"
                onScroll={(event) => setSelectorScrolled(event.currentTarget.scrollLeft > 4)}
              >

              {services.map((service) => (
                <button
                  className={styles.selectorItem}
                  type="button"
                  key={service.id}
                  onClick={() => document.getElementById(service.id)?.scrollIntoView({ behavior: "smooth", block: "start" })}
                >
                  <span className={styles.thumbnail} aria-hidden="true" style={{ overflow: "hidden", aspectRatio: "1 / 1" }}>
                    <img
                      src={`/renovation/${({
                        "full-home-renovation": "full_home_renovation_service_banner.png",
                        "kitchen-renovation": "kitchen_renovation_service_banner.png",
                        "bathroom-renovation": "bathroom_renovation_service_banner.png",
                        "villa-independent-house-renovation": "villa_independent_house_renovation_service_banner.png",
                        "complete-house-electrical-renovation": "complete_house_electrical_renovation_service_banner.png",
                        "office-renovation": "office_renovation_service_banner.png",
                        "shop-showroom-renovation": "shop_showroom_renovation_service_banner.png",
                      } as Record<string, string>)[service.id]}`}
                      alt=""
                      width={138}
                      height={138}
                      style={{ display: "block", width: "100%", height: "100%", objectFit: "cover", objectPosition: "center" }}
                    />
                  </span>
                  <span>{service.title}</span>
                </button>
              ))}
            </nav>
              <button
                type="button"
                className={styles.selectorNext}
                aria-label="Show more renovation services"
                onClick={() => document.getElementById("renovation-service-selector")?.scrollBy({ left: 330, behavior: "smooth" })}
              >
                <span aria-hidden="true">{"\u2192"}</span>
              </button>
            </div>

            {services.map((service) => (
              <section className={styles.serviceGroup} id={service.id} key={service.id}>
                <h2>{service.title}</h2>
                <div className={styles.banner} data-service-id={service.id} aria-hidden="true" />
                <div className={styles.serviceRow}>
                  <div>
                    <h3>{service.title}</h3>
                    <div className={styles.rating}>
                      <span className={styles.star}>★</span>
                      <span>4.10</span>
                      <span>({service.reviews.toLocaleString("en-IN")} reviews)</span>
                      <button type="button" onClick={() => setActive(service)}>View details</button>
                    </div>
                    <strong>Site survey ₹500</strong>
                  </div>
                  <button className={styles.addButton} type="button" onClick={() => toggleSurvey(service)}>
                    Add
                  </button>
                </div>
              </section>
            ))}
          </main>

          <aside className={styles.sidebar}>
            <FullHomeRightSidebar />
          </aside>
        </div>
      </div>

      {active && (
        <DetailsModal
          service={active}
          onClose={() => setActive(null)}
          onAdd={toggleSurvey}
          added={selected(active.id)}
        />
      )}
    </section>
  );
}