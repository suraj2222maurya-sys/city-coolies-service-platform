"use client";

import { useEffect, useState } from "react";
import FullHomeRightSidebar from "../deep-cleaning/FullHomeRightSidebar";
import {
  upsertDeepCleaningCartItem,
} from "../deep-cleaning/deepCleaningCart";
import styles from "./PackersMoversMarketplace.module.css";

type Option = { id: string; title: string; base: number };
type Service = {
  id: string;
  title: string;
  description: string;
  options: readonly Option[];
  distanceRate: number;
  includes: readonly string[];
  process: readonly string[];
};

const services: readonly Service[] = [
  {
    id: "local-home-shifting", title: "Local Home Shifting", distanceRate: 20,
    description: "Move household goods within your city with packing, transport and unloading options.",
    options: [
      { id: "studio", title: "1 RK / Studio", base: 2499 },
      { id: "1bhk", title: "1 BHK", base: 3499 },
      { id: "2bhk", title: "2 BHK", base: 4500 },
      { id: "3bhk", title: "3 BHK", base: 6999 },
    ],
    includes: ["Inventory and access assessment", "Suitable vehicle planning", "Loading, transit and unloading scope", "Packing and fragile handling choices"],
    process: ["List large and fragile items and select move size", "Confirm pickup, drop, vehicle access and estimated distance", "Agree inventory, packing level and final quote", "Pack and label approved goods, load, transport, unload and check delivery"],
  },
  {
    id: "intercity-relocation", title: "Intercity Relocation", distanceRate: 15,
    description: "Plan a household move to another city with inventory assessment and a route based quote.",
    options: [
      { id: "small", title: "Small Move", base: 4999 },
      { id: "1bhk", title: "1 BHK", base: 7499 },
      { id: "2bhk", title: "2 BHK", base: 10999 },
      { id: "3bhk", title: "3 BHK", base: 14999 },
    ],
    includes: ["Route and inventory review", "Packing requirements", "Transport and delivery scheduling", "Final quote after inventory verification"],
    process: ["Document the inventory and destination", "Review access, distance, packing and loading needs", "Confirm transport arrangement and final quote", "Pack, record, transport and hand over the items at the destination"],
  },
  {
    id: "office-commercial-moving", title: "Office & Commercial Moving", distanceRate: 24,
    description: "Coordinate an office, shop or small commercial relocation with an inventory and access plan.",
    options: [
      { id: "small-office", title: "Small Office", base: 5999 },
      { id: "office", title: "Office Move", base: 9999 },
      { id: "shop", title: "Shop / Retail", base: 6999 },
    ],
    includes: ["Workstation and inventory planning", "Sensitive equipment packing scope", "Access and loading schedule", "Delivery placement and verification"],
    process: ["List furniture, documents and equipment", "Check pickup and drop access and operating hours", "Agree handling, packing, transport and final quote", "Label, move and place goods as approved"],
  },
  {
    id: "bike-vehicle-moving", title: "Bike & Vehicle Transport", distanceRate: 12,
    description: "Arrange transport for a two wheeler or vehicle after reviewing route and handling requirements.",
    options: [
      { id: "scooter", title: "Scooter / Bike", base: 2499 },
      { id: "large-bike", title: "Large Motorcycle", base: 3499 },
      { id: "car", title: "Car Transport Assessment", base: 8999 },
    ],
    includes: ["Vehicle condition record", "Loading and protection assessment", "Route planning", "Delivery handover check"],
    process: ["Record vehicle type and visible condition", "Confirm pickup, transport method and destination", "Agree protection, documents and final quote", "Secure for transit and verify condition at delivery"],
  },
  {
    id: "packing-unpacking", title: "Packing & Unpacking", distanceRate: 0,
    description: "Choose packing, unpacking or fragile item protection without a full transport booking.",
    options: [
      { id: "packing", title: "Packing Only", base: 1999 },
      { id: "unpacking", title: "Unpacking Only", base: 1499 },
      { id: "fragile", title: "Fragile Items Packing", base: 2499 },
    ],
    includes: ["Packing material estimate", "Room wise labels", "Fragile item protection", "Optional unpacking and placement"],
    process: ["Assess inventory and handling needs", "Confirm materials and final packing quote", "Protect and label items by room", "Unpack and place items when selected"],
  },
  {
    id: "loading-unloading", title: "Loading & Unloading", distanceRate: 0,
    description: "Get moving labour for lifting, loading, unloading and arranging eligible goods.",
    options: [
      { id: "loading", title: "Loading Only", base: 1999 },
      { id: "unloading", title: "Unloading Only", base: 1999 },
      { id: "both", title: "Loading & Unloading", base: 3499 },
    ],
    includes: ["Crew and item count assessment", "Access and floor check", "Safe carrying plan", "Placement at drop location"],
    process: ["Record item dimensions and handling requirements", "Check loading space, stairs and access", "Confirm labour requirement and final quote", "Carry, load or unload and verify item placement"],
  },
];

const money = (amount: number) => `₹${amount.toLocaleString("en-IN")}`;
const serviceImages: Record<string, string> = {
  "local-home-shifting": "local_home_shifting_service_banner.4705d50ab5a5.webp",
  "intercity-relocation": "intercity_relocation_service_banner.2aea27aaf1dc.webp",
  "office-commercial-moving": "office_commercial_moving_service_banner.7028f2ad7769.webp",
  "bike-vehicle-moving": "bike_vehicle_transport_service_banner.a90c48ff4845.webp",
  "packing-unpacking": "packing_unpacking_service_banner.96a428befeaf.webp",
  "loading-unloading": "loading_unloading_service_banner.50bb9713e92d.webp",
};
const cartId = (id: string) => `moving:${id}`;

export default function PackersMoversMarketplace() {
  const [active, setActive] = useState<Service | null>(null);
  const [choice, setChoice] = useState("");
  const [pickup, setPickup] = useState("");
  const [drop, setDrop] = useState("");
  const [distance, setDistance] = useState(5);
  const [stairs, setStairs] = useState(false);
  const [packing, setPacking] = useState(false);
  const [selectorScrolled, setSelectorScrolled] = useState(false);
  const selectedOption = active?.options.find((option) => option.id === choice);
  const estimate = active && selectedOption
    ? selectedOption.base + Math.max(0, distance - 5) * active.distanceRate + (stairs ? 399 : 0) + (packing ? 699 : 0)
    : 0;

  useEffect(() => {
    if (!active) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const close = (event: KeyboardEvent) => { if (event.key === "Escape") setActive(null); };
    window.addEventListener("keydown", close);
    return () => { document.body.style.overflow = previous; window.removeEventListener("keydown", close); };
  }, [active]);

  function openDetails(service: Service) {
    setChoice("");
    setPickup("");
    setDrop("");
    setDistance(5);
    setStairs(false);
    setPacking(false);
    setActive(service);
  }

  function addQuote(service: Service) {
    if (!selectedOption) return;
    upsertDeepCleaningCartItem({
      id: cartId(service.id), serviceTitle: service.title,
      optionLabel: `${selectedOption.title} · ${pickup || "Pickup to confirm"} → ${drop || "Drop to confirm"} · estimated ${money(estimate)}`,
      price: 0,
      priceLabel: "Free quote request",
      duration: `Estimate ${money(estimate)} for ${distance} km; final rate after inventory, route and access confirmation. No online moving payment collected.`,
    });
    window.dispatchEvent(new Event("citycoolies:deep-cleaning-cart-added"));
    setActive(null);
  }

  return (
    <section id="city-coolies-moving" className={styles.section}>
      <div className={styles.container}>
        <div className={styles.columns}>
          <main className={styles.main}>
            <h1 className={styles.eyebrow}>Packers &amp; Movers</h1>
            <div className={styles.selectorViewport}>
              <button type="button" className={styles.selectorPrevious} style={{ display: selectorScrolled ? undefined : "none" }}
                aria-label="Show previous moving services"
                onClick={() => document.getElementById("moving-service-selector")?.scrollBy({ left: -320, behavior: "smooth" })}>
                <span aria-hidden="true">←</span>
              </button>
              <nav id="moving-service-selector" className={styles.selector} aria-label="Select a moving service"
                onScroll={(event) => setSelectorScrolled(event.currentTarget.scrollLeft > 4)}>
                {services.map((service) => (
                  <button key={service.id} type="button" className={styles.selectorItem}
                    onClick={() => document.getElementById(service.id)?.scrollIntoView({ behavior: "smooth", block: "start" })}>
                    <span className={styles.thumbnail} aria-hidden="true" style={{ overflow: "hidden" }}>
                      <img loading="eager" decoding="async" src={serviceDisplaySource(`/packers-movers/${serviceImages[service.id]}`)} alt="" width={100} height={100}
                        style={{ display: "block", width: "100%", height: "100%", objectFit: "cover", objectPosition: "center" }} />
                    </span>
                    <span className={styles.selectorLabel}>{service.title}</span>
                  </button>
                ))}
              </nav>
              <button type="button" className={styles.selectorNext} aria-label="Show more moving services"
                onClick={() => document.getElementById("moving-service-selector")?.scrollBy({ left: 320, behavior: "smooth" })}>
                <span aria-hidden="true">→</span>
              </button>
            </div>
            {services.map((service) => (
              <section className={styles.serviceGroup} id={service.id} key={service.id}>
                <h2>{service.title}</h2>
                <div className={styles.banner} aria-hidden="true">
                  <img loading="eager" decoding="async" src={`/packers-movers/${serviceImages[service.id]}`} alt="" width={1942} height={809}
                    style={{ display: "block", width: "100%", height: "100%", objectFit: "contain" }} />
                </div>
                <div className={styles.serviceRow}>
                  <div>
                    <h3>{service.title}</h3>
                    <div className={styles.rating}>
                      <span className={styles.star} aria-hidden="true">★</span>
                      <span>4.20</span>
                      <span>(628 reviews)</span>
                      <button type="button" onClick={() => openDetails(service)}>View details</button>
                    </div>
                    <strong>Estimated from {money(Math.min(...service.options.map((option) => option.base)))}</strong>
                  </div>
                  <button type="button" className={styles.addButton} onClick={() => openDetails(service)}>Add</button>
                </div>
              </section>
            ))}
          </main>
          <aside className={styles.sidebar}><FullHomeRightSidebar /></aside>
        </div>
      </div>
      {active && (
        <div className={styles.backdrop} onMouseDown={(event) => { if (event.target === event.currentTarget) setActive(null); }}>
          <section className={styles.modal} role="dialog" aria-modal="true" aria-labelledby="moving-modal-title">
            <header className={styles.modalHeader}>
              <div><h2 id="moving-modal-title">{active.title}</h2><p>Free quote request · no booking fee</p></div>
              <button type="button" className={styles.closeButton} aria-label="Close details" onClick={() => setActive(null)}>×</button>
            </header>
            <div className={styles.modalBody}>
              <section aria-label="Choose your move">
                <h3>Choose your move</h3>
                <div className={styles.moveOptions}>
                  {active.options.map((option) => (
                    <button key={option.id} type="button" aria-pressed={choice === option.id}
                      className={`${styles.moveOption} ${choice === option.id ? styles.moveOptionSelected : ""}`}
                      onClick={() => setChoice(option.id)}>
                      <strong>{option.title}</strong><span>Estimate from {money(option.base)}</span>
                    </button>
                  ))}
                </div>
                <div className={styles.moveFields}>
                  <label>Pickup area<input value={pickup} onChange={(event) => setPickup(event.target.value)} placeholder="Area and city" /></label>
                  <label>Drop area<input value={drop} onChange={(event) => setDrop(event.target.value)} placeholder="Area and city" /></label>
                  {active.distanceRate > 0 && (
                    <label>Estimated distance (km)<input type="number" min="1" max="5000" value={distance}
                      onChange={(event) => {
                        const value = Number(event.target.value);
                        setDistance(Number.isFinite(value) && value > 0 ? Math.min(5000, Math.floor(value)) : 1);
                      }} /></label>
                  )}
                </div>
                <label className={styles.moveCheckbox}><input type="checkbox" checked={packing}
                  onChange={(event) => setPacking(event.target.checked)} /> Add packing estimate (+₹699)</label>
                <label className={styles.moveCheckbox}><input type="checkbox" checked={stairs}
                  onChange={(event) => setStairs(event.target.checked)} /> Stairs / no lift estimate (+₹399)</label>
              </section>
              <p className={styles.notice}>The displayed amount is an estimate, not a final payable price. Goods volume, exact route, floors, vehicle needs and packing materials must be confirmed before the final quote.</p>
              {selectedOption && <div className={styles.moveBreakdown}><span>Indicative moving estimate</span><strong>{money(estimate)}</strong></div>}
              <p>{active.description}</p>
              <div className={styles.infoBox}><h3>What the service covers</h3>
                <ul>{active.includes.map((item) => <li key={item}>{item}</li>)}</ul>
              </div>
              <div className={styles.infoBox}><h3>Work process</h3>
                <ol>{active.process.map((step) => <li key={step}>{step}</li>)}</ol>
              </div>
              <div className={styles.reviews}>
                <strong><span className={styles.star}>★</span> 4.20</strong>
                <span>628 reviews</span>
                {[5, 4, 3, 2, 1].map((score, index) => (
                  <div className={styles.ratingLine} key={score}>
                    <span>{score} ★</span>
                    <div><i style={{ width: `${[48, 29, 13, 7, 3][index]}%` }} /></div>
                    <span>{[48, 29, 13, 7, 3][index]}%</span>
                  </div>
                ))}
              </div>
            </div>
            <footer className={styles.modalFooter}>
              <div><small>Request a quote</small><strong>₹0 booking fee</strong></div>
              <button type="button" disabled={!selectedOption} onClick={() => addQuote(active)}>Continue</button>
            </footer>
          </section>
        </div>
      )}
    </section>
  );
}


const serviceDisplayImages: Record<string, string> = {
  "/packers-movers/bike_vehicle_transport_service_banner.png": "/packers-movers/bike_vehicle_transport_service_banner_selector.95eba7dc9e15.webp",
  "/packers-movers/bike_vehicle_transport_service_banner.a90c48ff4845.webp": "/packers-movers/bike_vehicle_transport_service_banner_selector.95eba7dc9e15.webp",
  "/packers-movers/intercity_relocation_service_banner.png": "/packers-movers/intercity_relocation_service_banner_selector.9ee034470786.webp",
  "/packers-movers/intercity_relocation_service_banner.2aea27aaf1dc.webp": "/packers-movers/intercity_relocation_service_banner_selector.9ee034470786.webp",
  "/packers-movers/loading_unloading_service_banner.png": "/packers-movers/loading_unloading_service_banner_selector.07cafb4eba41.webp",
  "/packers-movers/loading_unloading_service_banner.50bb9713e92d.webp": "/packers-movers/loading_unloading_service_banner_selector.07cafb4eba41.webp",
  "/packers-movers/local_home_shifting_service_banner.png": "/packers-movers/local_home_shifting_service_banner_selector.fd900b985507.webp",
  "/packers-movers/local_home_shifting_service_banner.4705d50ab5a5.webp": "/packers-movers/local_home_shifting_service_banner_selector.fd900b985507.webp",
  "/packers-movers/office_commercial_moving_service_banner.png": "/packers-movers/office_commercial_moving_service_banner_selector.8504327c6716.webp",
  "/packers-movers/office_commercial_moving_service_banner.7028f2ad7769.webp": "/packers-movers/office_commercial_moving_service_banner_selector.8504327c6716.webp",
  "/packers-movers/packing_unpacking_service_banner.png": "/packers-movers/packing_unpacking_service_banner_selector.1ecfd3ee4417.webp",
  "/packers-movers/packing_unpacking_service_banner.96a428befeaf.webp": "/packers-movers/packing_unpacking_service_banner_selector.1ecfd3ee4417.webp"
};
function serviceDisplaySource(src: string): string {
  const queryAt = src.indexOf("?");
  const base = queryAt < 0 ? src : src.slice(0, queryAt);
  return serviceDisplayImages[base] ?? src;
}
