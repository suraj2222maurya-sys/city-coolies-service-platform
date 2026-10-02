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
import styles from "./FabricationWorksMarketplace.module.css";

type Service = {
  id: string;
  title: string;
  reviews: number;
  description: string;
  includes: readonly string[];
  process: readonly string[];
};

const services: readonly Service[] = [
  { id: "gate-fabrication", title: "Gate Fabrication & Installation", reviews: 0,
    description: "Made-to-measure MS or SS entrance, swing and sliding gate work for homes, apartments, offices and commercial premises.",
    includes: ["Opening measurement and swing or sliding clearance", "Material, frame and design review", "Hinge, lock, track and finish planning"],
    process: ["Survey opening and fixing points", "Agree gate design, section size, finish and final quotation", "Cut, weld and finish the approved frame and panels", "Install, align, operate and inspect the gate"] },
  { id: "grills-railing", title: "Window Grills & Railings", reviews: 0,
    description: "Fabrication of window security grills, balcony or staircase railings and handrails to measured dimensions.",
    includes: ["Window and stair dimensions", "Grill spacing, railing height and anchor review", "MS or SS material and finish selection"],
    process: ["Survey location, dimensions and substrate", "Agree design, fixing detail and final quote", "Fabricate and finish sections off-site where suitable", "Anchor and inspect fittings and edge finish"] },
  { id: "shed-canopy", title: "Roof Shed & Canopy Fabrication", reviews: 0,
    description: "Custom metal frames for parking shelters, terrace covers, shop canopies and light roof sheds, subject to structural assessment.",
    includes: ["Area measurement and access review", "Support, drainage and roof sheet requirements", "Structural design referral for large spans"],
    process: ["Survey dimensions, load paths and weather exposure", "Review supports and obtain engineer-approved design where required", "Agree roof material, fabrication scope and final rate", "Fabricate, install and inspect joints and drainage"] },
  { id: "steel-structure", title: "Structural Steel Fabrication", reviews: 0,
    description: "Steel frames and support elements for approved residential, commercial and industrial designs.",
    includes: ["Drawing and steel grade review", "Connection and weld specifications", "Access, lifting and finishing plan"],
    process: ["Survey site and review engineer-approved drawings", "Confirm sections, connections, schedule and final quote", "Cut, fit, weld and inspect approved members", "Erect with appropriate supervision and complete handover checks"] },
  { id: "welding-repair", title: "Welding & Metal Repair", reviews: 0,
    description: "On-site assessment of damaged metal gates, grills, handrails and non-structural fittings for repair or replacement.",
    includes: ["Damage and corrosion assessment", "Repairability and replacement scope", "Weld, hinge and finish review"],
    process: ["Inspect affected item and surrounding material", "Confirm whether a safe repair is feasible", "Agree repair scope, materials and final price", "Weld or replace approved parts and check alignment and finish"] },
  { id: "commercial-custom-fabrication", title: "Custom & Commercial Fabrication", reviews: 0,
    description: "Measured steel fabrication for shops, warehouses, schools and custom property requirements, based on drawings and site conditions.",
    includes: ["Purpose and site access review", "Custom dimensions and material specification", "Installation and operating-hours plan"],
    process: ["Survey location and collect reference drawings", "Confirm dimensions, loads and required approvals", "Agree detailed fabrication scope and quotation", "Fabricate, install, inspect and document handover"] },
];
const surveyAmount = 500;
const serviceImages: Record<string, string> = {
  "gate-fabrication": "gate_fabrication_installation_service_banner.86fcfc1f86b7.webp",
  "grills-railing": "window_grills_railings_service_banner.7fa5b264066e.webp",
  "shed-canopy": "roof_shed_canopy_fabrication_service_banner.2d38d72dc4d0.webp",
  "steel-structure": "structural_steel_fabrication_service_banner.3e788807acb7.webp",
  "welding-repair": "welding_metal_repair_service_banner.45b518bfce7d.webp",
  "commercial-custom-fabrication": "custom_commercial_fabrication_service_banner.c2943aa7d855.webp",
};
const cartId = (id: string) => `fabrication:${id}`;

export default function FabricationWorksMarketplace() {
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
        duration: "Final fabrication rate confirmed after the site survey and approved scope",
      });
      window.dispatchEvent(new Event("citycoolies:deep-cleaning-cart-added"));
    }
    setActive(null);
  }

  return (
    <section id="city-coolies-fabrication" className={styles.section}>
      <div className={styles.container}>
        <div className={styles.columns}>
          <main className={styles.main}>
            <h1 className={styles.eyebrow}>Fabrication Works</h1>
            <div className={styles.selectorViewport}>
              <button type="button" className={styles.selectorPrevious}
                style={{ display: selectorScrolled ? undefined : "none" }}
                aria-label="Show previous fabrication services"
                onClick={() => document.getElementById("fabrication-service-selector")?.scrollBy({ left: -320, behavior: "smooth" })}>
                <span aria-hidden="true">←</span>
              </button>
              <nav id="fabrication-service-selector" className={styles.selector}
                aria-label="Select a fabrication service"
                onScroll={(event) => setSelectorScrolled(event.currentTarget.scrollLeft > 4)}>
                {services.map((service) => (
                  <button key={service.id} type="button" className={styles.selectorItem}
                    onClick={() => document.getElementById(service.id)?.scrollIntoView({ behavior: "smooth", block: "start" })}>
                    <span className={styles.thumbnail} aria-hidden="true" style={{ overflow: "hidden" }}>
                      <img loading="eager" decoding="async" src={serviceDisplaySource(`/fabrication-works/${serviceImages[service.id]}`)} alt="" width={100} height={100}
                        style={{ display: "block", width: "100%", height: "100%", objectFit: "cover", objectPosition: "center" }} />
                    </span>
                    <span className={styles.selectorLabel}>{service.title}</span>
                  </button>
                ))}
              </nav>
              <button type="button" className={styles.selectorNext}
                aria-label="Show more fabrication services"
                onClick={() => document.getElementById("fabrication-service-selector")?.scrollBy({ left: 320, behavior: "smooth" })}>
                <span aria-hidden="true">→</span>
              </button>
            </div>
            {services.map((service) => (
              <section className={styles.serviceGroup} id={service.id} key={service.id}>
                <h2>{service.title}</h2>
                <div className={styles.banner} aria-hidden="true">
                  <img loading="eager" decoding="async" src={`/fabrication-works/${serviceImages[service.id]}`} alt="" width={1942} height={809}
                    style={{ display: "block", width: "100%", height: "100%", objectFit: "contain" }} />
                </div>
                <div className={styles.serviceRow}>
                  <div>
                    <h3>{service.title}</h3>
                    <div className={styles.rating}>
                      <span className={styles.star} aria-hidden="true">★</span>
                      <span>4.20</span>
                      <span>(Sample rating)</span>
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
          <section className={styles.modal} role="dialog" aria-modal="true" aria-labelledby="fabrication-modal-title">
            <header className={styles.modalHeader}>
              <div><h2 id="fabrication-modal-title">{active.title}</h2><p>Site survey ₹500</p></div>
              <button type="button" className={styles.closeButton} aria-label="Close details" onClick={() => setActive(null)}>×</button>
            </header>
            <div className={styles.modalBody}>
              <p className={styles.notice}>The site survey costs ₹500. The final fabrication rate is confirmed after inspecting the site, reviewing measurements, materials, drawings and the approved work scope.</p>
              <p>{active.description}</p>
              <div className={styles.infoBox}><h3>What the service covers</h3>
                <ul>{active.includes.map((item) => <li key={item}>{item}</li>)}</ul>
              </div>
              <div className={styles.infoBox}><h3>Work process</h3>
                <ol>{active.process.map((step) => <li key={step}>{step}</li>)}</ol>
              </div>
              <div className={styles.reviews}>
                <strong><span className={styles.star}>★</span> 4.20</strong>
                <span>Sample rating · verified customer reviews pending</span>
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
  "/fabrication-works/custom_commercial_fabrication_service_banner.png": "/fabrication-works/custom_commercial_fabrication_service_banner_selector.b8dce9d42f5a.webp",
  "/fabrication-works/custom_commercial_fabrication_service_banner.c2943aa7d855.webp": "/fabrication-works/custom_commercial_fabrication_service_banner_selector.b8dce9d42f5a.webp",
  "/fabrication-works/gate_fabrication_installation_service_banner.png": "/fabrication-works/gate_fabrication_installation_service_banner_selector.e17a0d6318c7.webp",
  "/fabrication-works/gate_fabrication_installation_service_banner.86fcfc1f86b7.webp": "/fabrication-works/gate_fabrication_installation_service_banner_selector.e17a0d6318c7.webp",
  "/fabrication-works/roof_shed_canopy_fabrication_service_banner.png": "/fabrication-works/roof_shed_canopy_fabrication_service_banner_selector.6dd0b7ca3b16.webp",
  "/fabrication-works/roof_shed_canopy_fabrication_service_banner.2d38d72dc4d0.webp": "/fabrication-works/roof_shed_canopy_fabrication_service_banner_selector.6dd0b7ca3b16.webp",
  "/fabrication-works/structural_steel_fabrication_service_banner.png": "/fabrication-works/structural_steel_fabrication_service_banner_selector.fb16439de969.webp",
  "/fabrication-works/structural_steel_fabrication_service_banner.3e788807acb7.webp": "/fabrication-works/structural_steel_fabrication_service_banner_selector.fb16439de969.webp",
  "/fabrication-works/welding_metal_repair_service_banner.png": "/fabrication-works/welding_metal_repair_service_banner_selector.4dc5e428b11a.webp",
  "/fabrication-works/welding_metal_repair_service_banner.45b518bfce7d.webp": "/fabrication-works/welding_metal_repair_service_banner_selector.4dc5e428b11a.webp",
  "/fabrication-works/window_grills_railings_service_banner.png": "/fabrication-works/window_grills_railings_service_banner_selector.052ffc6a1806.webp",
  "/fabrication-works/window_grills_railings_service_banner.7fa5b264066e.webp": "/fabrication-works/window_grills_railings_service_banner_selector.052ffc6a1806.webp"
};
function serviceDisplaySource(src: string): string {
  const queryAt = src.indexOf("?");
  const base = queryAt < 0 ? src : src.slice(0, queryAt);
  return serviceDisplayImages[base] ?? src;
}
