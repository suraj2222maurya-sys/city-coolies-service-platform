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
import styles from "./CivilConstructionMarketplace.module.css";

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
    id: "full-home-apartment-construction",
    title: "Full Home & Apartment Construction", reviews: 628,
    description: "Construction planning for a new home or apartment, from site assessment through approved structure and finishes.",
    includes: ["Site dimensions and access assessment", "Foundation and structural drawing review", "Masonry, plaster, flooring and finishing scope", "Material quantities and work schedule planning"],
    process: ["Survey the site, plans and proposed use", "Review soil information, drawings, utilities and required permissions", "Agree engineering design, materials, schedule and final quotation", "Execute approved stages with inspections and handover checks"],
  },
  {
    id: "exterior-civil-work",
    title: "Exterior Civil Work", reviews: 502,
    description: "Civil work for exterior areas such as compound walls, paving, steps and surface repairs.",
    includes: ["Compound wall and entrance assessment", "Paving and pathway scope", "External steps, drains and surface repair planning", "Drainage and weather exposure review"],
    process: ["Inspect dimensions, levels, ground conditions and existing damage", "Confirm drainage, foundation and material requirements", "Agree the final scope and price after the survey", "Complete approved civil work and inspect drainage and finish"],
  },
  {
    id: "commercial-industrial-civil-work",
    title: "Commercial & Industrial Civil Work", reviews: 447,
    description: "Site specific civil construction for shops, offices, warehouses, schools and industrial premises.",
    includes: ["Building and operational requirements survey", "Floors, partitions and utility route planning", "Access and safe work sequence assessment", "Engineer approved scope when structural work is involved"],
    process: ["Survey the premises and record operating constraints", "Review existing drawings, loads and structural requirements", "Confirm the phased plan, materials and final quote", "Perform approved work with inspections and site handover"],
  },
  {
    id: "repair-maintenance-civil-work",
    title: "Repair & Maintenance Civil Work", reviews: 583,
    description: "Civil maintenance for damaged plaster, masonry, surfaces, floors and drainage related defects.",
    includes: ["Crack and damaged surface assessment", "Plaster, masonry and flooring repair scope", "Water ingress and drainage observations", "Maintenance plan and final repair quotation"],
    process: ["Inspect the defect and identify likely causes", "Escalate structural damage for engineering review", "Agree repairs, materials and final price after survey", "Complete approved repair, curing and finish inspection"],
  },
  {
    id: "rcc-construction",
    title: "RCC Construction", reviews: 419,
    description: "Reinforced cement concrete work for engineer designed structural elements, subject to site review and approved drawings.",
    includes: ["Structural drawing and load requirement review", "Foundation, column, beam or slab scope assessment", "Steel, formwork and concrete planning", "Concrete placement, curing and inspection planning"],
    process: ["Survey the site and review structural design with a qualified engineer", "Confirm drawings, reinforcement details, formwork and final quotation", "Execute approved reinforcement, formwork and concreting stages", "Complete specified curing, quality checks and engineer inspection"],
  },
  {
    id: "complete-construction-work",
    title: "Complete Construction Work", reviews: 706,
    description: "Coordinated construction scope for an entire property, from site preparation to finishing and handover.",
    includes: ["Full site and project scope survey", "Drawings, approvals and structural design coordination", "Civil, finishing and utility work sequencing", "Phased schedule, materials and final quotation"],
    process: ["Survey the site and collect project requirements", "Coordinate approved architectural and structural drawings and permits", "Agree milestones, materials and final cost after the survey", "Complete approved work in stages with inspections and handover"],
  },
];

const surveyAmount = 500;
const serviceImages: Record<string, string> = {
  "full-home-apartment-construction": "full_home_apartment_construction_service_banner.c2624ffe61be.webp",
  "exterior-civil-work": "exterior_civil_work_service_banner.29764a84c52e.webp",
  "commercial-industrial-civil-work": "commercial_industrial_civil_work_service_banner.7a55ed58d7b3.webp",
  "repair-maintenance-civil-work": "repair_maintenance_civil_work_service_banner.1d7a97c7eba5.webp",
  "rcc-construction": "rcc_construction_service_banner.d4d95a39cbe7.webp",
  "complete-construction-work": "complete_construction_work_service_banner.adc566f4e0d1.webp",
};
const cartId = (id: string) => `civil:${id}`;

export default function CivilConstructionMarketplace() {
  const [active, setActive] = useState<Service | null>(null);
  const [selectorScrolled, setSelectorScrolled] = useState(false);
  const snapshot = useSyncExternalStore(subscribeDeepCleaningCart, getDeepCleaningCartSnapshot, getDeepCleaningCartServerSnapshot);
  const cartItems = useMemo(() => parseDeepCleaningCartSnapshot(snapshot), [snapshot]);
  const selected = (id: string) => cartItems.some((item) => item.id === cartId(id));

  useEffect(() => {
    if (!active) return;
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const closeOnEscape = (event: KeyboardEvent) => { if (event.key === "Escape") setActive(null); };
    window.addEventListener("keydown", closeOnEscape);
    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener("keydown", closeOnEscape);
    };
  }, [active]);

  function toggleSurvey(service: Service) {
    if (selected(service.id)) {
      removeDeepCleaningCartItem(cartId(service.id));
    } else {
      upsertDeepCleaningCartItem({
        id: cartId(service.id),
        serviceTitle: service.title,
        optionLabel: "Site survey",
        price: surveyAmount,
        priceLabel: "₹500",
        duration: "Final civil work rate confirmed after the site survey and approved scope",
      });
      window.dispatchEvent(new Event("citycoolies:deep-cleaning-cart-added"));
    }
    setActive(null);
  }

  return (
    <section id="city-coolies-civil" className={styles.section}>
      <div className={styles.container}>
        <div className={styles.columns}>
          <main className={styles.main}>
            <h1 className={styles.eyebrow}>Civil Construction &amp; Maintenance</h1>
            <div className={styles.selectorViewport}>
              <button type="button" className={styles.selectorPrevious}
                style={{ display: selectorScrolled ? undefined : "none" }}
                aria-label="Show previous civil services"
                onClick={() => document.getElementById("civil-service-selector")?.scrollBy({ left: -320, behavior: "smooth" })}>
                <span aria-hidden="true">←</span>
              </button>
              <nav id="civil-service-selector" className={styles.selector}
                aria-label="Select a civil service"
                onScroll={(event) => setSelectorScrolled(event.currentTarget.scrollLeft > 4)}>
                {services.map((service) => (
                  <button key={service.id} type="button" className={styles.selectorItem}
                    onClick={() => document.getElementById(service.id)?.scrollIntoView({ behavior: "smooth", block: "start" })}>
                    <span className={styles.thumbnail} aria-hidden="true" style={{ overflow: "hidden" }}>
                      <img loading="lazy" decoding="async"
                        src={serviceDisplaySource(`/civil-construction-maintenance/${serviceImages[service.id]}`)}
                        alt=""
                        width={100}
                        height={100}
                        style={{ display: "block", width: "100%", height: "100%", objectFit: "cover", objectPosition: "center" }}
                      />
                    </span>
                    <span className={styles.selectorLabel}>{service.title}</span>
                  </button>
                ))}
              </nav>
              <button type="button" className={styles.selectorNext}
                aria-label="Show more civil services"
                onClick={() => document.getElementById("civil-service-selector")?.scrollBy({ left: 320, behavior: "smooth" })}>
                <span aria-hidden="true">→</span>
              </button>
            </div>
            {services.map((service) => (
              <section className={styles.serviceGroup} id={service.id} key={service.id}>
                <h2>{service.title}</h2>
                <div className={styles.banner} aria-hidden="true">
                  <img loading="lazy" decoding="async"
                    src={`/civil-construction-maintenance/${serviceImages[service.id]}`}
                    alt=""
                    width={1942}
                    height={809}
                    style={{ display: "block", width: "100%", height: "100%", objectFit: "contain" }}
                  />
                </div>
                <div className={styles.serviceRow}>
                  <div>
                    <h3>{service.title}</h3>
                    <div className={styles.rating}>
                      <span className={styles.star} aria-hidden="true">★</span>
                      <span>4.20</span>
                      <span>({service.reviews} reviews)</span>
                      <button type="button" onClick={() => setActive(service)}>View details</button>
                    </div>
                    <strong>Site survey ₹500</strong>
                  </div>
                  <button className={styles.addButton} type="button"
                    aria-label={`Add ${service.title} site survey`}
                    onClick={() => toggleSurvey(service)}>Add</button>
                </div>
              </section>
            ))}
          </main>
          <aside className={styles.sidebar}><FullHomeRightSidebar /></aside>
        </div>
      </div>
      {active && (
        <div className={styles.backdrop} onMouseDown={(event) => { if (event.target === event.currentTarget) setActive(null); }}>
          <section className={styles.modal} role="dialog" aria-modal="true" aria-labelledby="civil-modal-title">
            <header className={styles.modalHeader}>
              <div><h2 id="civil-modal-title">{active.title}</h2><p>Site survey ₹500</p></div>
              <button type="button" className={styles.closeButton} aria-label="Close details" onClick={() => setActive(null)}>×</button>
            </header>
            <div className={styles.modalBody}>
              <p className={styles.notice}>The site survey costs ₹500. The final construction or repair rate is confirmed after inspecting the site, reviewing the approved work scope, measurements and materials.</p>
              <p>{active.description}</p>
              <div className={styles.infoBox}><h3>What the service covers</h3>
                <ul>{active.includes.map((item) => <li key={item}>{item}</li>)}</ul>
              </div>
              <div className={styles.infoBox}><h3>Work process</h3>
                <ol>{active.process.map((step) => <li key={step}>{step}</li>)}</ol>
              </div>
              <div className={styles.reviews}>
                <strong><span className={styles.star}>★</span> 4.20</strong>
                <span>{active.reviews} reviews</span>
                {[5, 4, 3, 2, 1].map((score, index) => (
                  <div className={styles.ratingLine} key={score}>
                    <span>{score} ★</span><div><i style={{ width: `${[48, 29, 13, 7, 3][index]}%` }} /></div>
                    <span>{[48, 29, 13, 7, 3][index]}%</span>
                  </div>
                ))}
              </div>
            </div>
            <footer className={styles.modalFooter}>
              <div><small>Site survey</small><strong>₹500</strong></div>
              <button type="button" onClick={() => selected(active.id) ? setActive(null) : toggleSurvey(active)}>Continue</button>
            </footer>
          </section>
        </div>
      )}
    </section>
  );
}


const serviceDisplayImages: Record<string, string> = {
  "/civil-construction-maintenance/commercial_industrial_civil_work_service_banner.png": "/civil-construction-maintenance/commercial_industrial_civil_work_service_banner_selector.9b73e104e8b1.webp",
  "/civil-construction-maintenance/commercial_industrial_civil_work_service_banner.7a55ed58d7b3.webp": "/civil-construction-maintenance/commercial_industrial_civil_work_service_banner_selector.9b73e104e8b1.webp",
  "/civil-construction-maintenance/complete_construction_work_service_banner.png": "/civil-construction-maintenance/complete_construction_work_service_banner_selector.7ffe867bd82c.webp",
  "/civil-construction-maintenance/complete_construction_work_service_banner.adc566f4e0d1.webp": "/civil-construction-maintenance/complete_construction_work_service_banner_selector.7ffe867bd82c.webp",
  "/civil-construction-maintenance/exterior_civil_work_service_banner.png": "/civil-construction-maintenance/exterior_civil_work_service_banner_selector.872cacbc4039.webp",
  "/civil-construction-maintenance/exterior_civil_work_service_banner.29764a84c52e.webp": "/civil-construction-maintenance/exterior_civil_work_service_banner_selector.872cacbc4039.webp",
  "/civil-construction-maintenance/full_home_apartment_construction_service_banner.png": "/civil-construction-maintenance/full_home_apartment_construction_service_banner_selector.993c8e77a105.webp",
  "/civil-construction-maintenance/full_home_apartment_construction_service_banner.c2624ffe61be.webp": "/civil-construction-maintenance/full_home_apartment_construction_service_banner_selector.993c8e77a105.webp",
  "/civil-construction-maintenance/rcc_construction_service_banner.png": "/civil-construction-maintenance/rcc_construction_service_banner_selector.9bf1a60de031.webp",
  "/civil-construction-maintenance/rcc_construction_service_banner.d4d95a39cbe7.webp": "/civil-construction-maintenance/rcc_construction_service_banner_selector.9bf1a60de031.webp",
  "/civil-construction-maintenance/repair_maintenance_civil_work_service_banner.png": "/civil-construction-maintenance/repair_maintenance_civil_work_service_banner_selector.67038757d9d1.webp",
  "/civil-construction-maintenance/repair_maintenance_civil_work_service_banner.1d7a97c7eba5.webp": "/civil-construction-maintenance/repair_maintenance_civil_work_service_banner_selector.67038757d9d1.webp"
};
function serviceDisplaySource(src: string): string {
  const queryAt = src.indexOf("?");
  const base = queryAt < 0 ? src : src.slice(0, queryAt);
  return serviceDisplayImages[base] ?? src;
}
