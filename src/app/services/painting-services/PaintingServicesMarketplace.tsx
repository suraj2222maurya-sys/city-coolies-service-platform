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
import styles from "./PaintingServicesMarketplace.module.css";

type Service = {
  id: string;
  title: string;
  rating: number;
  reviews: number;
  description: string;
  includes: readonly string[];
  process: readonly string[];
};

const services: readonly Service[] = [
  {
    id: "full-home-painting", title: "Full Home Painting", rating: 4.2, reviews: 608,
    description: "Complete painting plans for homes, apartments, villas, bungalows, schools, colleges, industrial sites and commercial buildings.",
    includes: ["Interior and exterior condition check", "Measurements, shade and finish planning", "Repair, putty and primer requirements", "Detailed scope and final painting quote after survey"],
    process: ["Visit the property and measure paintable surfaces", "Check damp areas, cracks, old coatings and access", "Agree surface preparation, paint system and the final quote", "Protect nearby areas, prepare surfaces, apply approved coats and inspect the finish"],
  },
  {
    id: "most-popular-painting", title: "Most Popular Painting", rating: 4.3, reviews: 742,
    description: "Choose one or several painting jobs. A single site survey covers all selected jobs in this booking.",
    includes: ["Interior painting", "Wood and metal painting", "Gate painting", "Terrace waterproof coating", "Putty and primer", "Texture and design painting"],
    process: ["Select all painting jobs needed in the same property", "Measure each surface and inspect repairs and moisture", "Confirm square foot rates, paint systems, scope and final quotation after the survey", "Complete surface preparation, protective coats and finishing checks"],
  },
  {
    id: "marking-safety-painting", title: "Marking & Safety Painting", rating: 4.2, reviews: 386,
    description: "Marking for parking spaces, road curbs and yellow and black safety zones. Indicative painting rate: ₹65 per sq ft.",
    includes: ["Parking line marking", "Road curb painting", "Yellow and black safety marking", "Surface area and access check"],
    process: ["Check the marking layout and measure the area", "Clean and prepare the surface and mark out straight lines", "Apply the suitable coating and allow the specified drying time", "Inspect visibility and finish before reopening the area"],
  },
];

const popularOptions = [
  { id: "interior", title: "Interior Painting" },
  { id: "wood-metal", title: "Wood & Metal Painting" },
  { id: "gate", title: "Gate Painting" },
  { id: "terrace", title: "Terrace Waterproof Painting" },
  { id: "putty-primer", title: "Putty & Primer" },
  { id: "texture", title: "Texture & Design Painting" },
] as const;
const markingOptions = [
  { id: "parking", title: "Parking Line Marking" },
  { id: "curb", title: "Road Curb Painting" },
  { id: "safety", title: "Yellow & Black Safety Painting" },
] as const;
const money = (amount: number) => `₹${amount.toLocaleString("en-IN")}`;
const serviceImages: Record<string, string> = {
  "full-home-painting": "full_home_painting_service_banner.e5fd0b004622.webp",
  "most-popular-painting": "most_popular_painting_service_banner.4fcd6c1482ca.webp",
  "marking-safety-painting": "marking_safety_painting_service_banner.0bd18c675a32.webp",
};
const cartId = (id: string) => `painting:${id}`;

export default function PaintingServicesMarketplace() {
  const [active, setActive] = useState<Service | null>(null);
  const [chosen, setChosen] = useState<string[]>([]);
  const [area, setArea] = useState(1);
  const [selectorScrolled, setSelectorScrolled] = useState(false);
  const snapshot = useSyncExternalStore(subscribeDeepCleaningCart, getDeepCleaningCartSnapshot, getDeepCleaningCartServerSnapshot);
  const cartItems = useMemo(() => parseDeepCleaningCartSnapshot(snapshot), [snapshot]);
  const selected = (id: string) => cartItems.some((item) => item.id === cartId(id));
  const isPopular = active?.id === "most-popular-painting";
  const isMarking = active?.id === "marking-safety-painting";
  const total = isMarking ? chosen.length * area * 65 : 500;

  useEffect(() => {
    if (!active) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const handleEscape = (event: KeyboardEvent) => { if (event.key === "Escape") setActive(null); };
    window.addEventListener("keydown", handleEscape);
    return () => { document.body.style.overflow = previous; window.removeEventListener("keydown", handleEscape); };
  }, [active]);

  function toggleChoice(id: string) {
    setChosen((old) => old.includes(id) ? old.filter((value) => value !== id) : [...old, id]);
  }

  function openDetails(service: Service) {
    setChosen([]);
    setArea(1);
    setActive(service);
  }

  function addSurvey(service: Service) {
    const id = cartId(service.id);
    if (selected(service.id)) {
      removeDeepCleaningCartItem(id);
    } else {
      upsertDeepCleaningCartItem({
        id, serviceTitle: service.title, optionLabel: "Site survey", price: 500, priceLabel: money(500),
        duration: "Final painting price confirmed after site measurements and work assessment",
      });
      window.dispatchEvent(new Event("citycoolies:deep-cleaning-cart-added"));
    }
    setActive(null);
  }

  function continueSelection(service: Service) {
    if (!chosen.length) return;
    const list = service.id === "most-popular-painting" ? popularOptions : markingOptions;
    const labels = list.filter((option) => chosen.includes(option.id)).map((option) => option.title);
    upsertDeepCleaningCartItem({
      id: cartId(service.id), serviceTitle: service.title,
      optionLabel: service.id === "most-popular-painting"
        ? `${labels.join(", ")} · one site survey` : `${labels.join(", ")} · ${area} sq ft each`,
      price: total, priceLabel: money(total),
      duration: service.id === "most-popular-painting"
        ? "One ₹500 survey; credited against this service's final payment. Final rate based on measured area and approved scope."
        : "Indicative ₹65 per sq ft per selected job; confirm measured area and scope on site.",
    });
    window.dispatchEvent(new Event("citycoolies:deep-cleaning-cart-added"));
    setActive(null);
  }

  return (
    <section id="city-coolies-painting" className={styles.section}>
      <div className={styles.container}>
        <div className={styles.columns}>
          <main className={styles.main}>
            <h1 className={styles.eyebrow}>Painting Services</h1>
            <div className={styles.selectorViewport}>
              <button type="button" className={styles.selectorPrevious}
                style={{ display: selectorScrolled ? undefined : "none" }} aria-label="Show previous painting services"
                onClick={() => document.getElementById("painting-service-selector")?.scrollBy({ left: -320, behavior: "smooth" })}>
                <span aria-hidden="true">←</span>
              </button>
              <nav id="painting-service-selector" className={styles.selector} aria-label="Select a painting service"
                onScroll={(event) => setSelectorScrolled(event.currentTarget.scrollLeft > 4)}>
                {services.map((service) => (
                  <button key={service.id} type="button" className={styles.selectorItem}
                    onClick={() => document.getElementById(service.id)?.scrollIntoView({ behavior: "smooth", block: "start" })}>
                    <span className={styles.thumbnail} aria-hidden="true" style={{ overflow: "hidden" }}>
                      <img loading="eager" decoding="async"
                        src={serviceDisplaySource(`/painting-services/${serviceImages[service.id]}`)}
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
              <button type="button" className={styles.selectorNext} aria-label="Show more painting services"
                onClick={() => document.getElementById("painting-service-selector")?.scrollBy({ left: 320, behavior: "smooth" })}>
                <span aria-hidden="true">→</span>
              </button>
            </div>
            {services.map((service) => (
              <section className={styles.serviceGroup} id={service.id} key={service.id}>
                <h2>{service.title}</h2>
                <div className={styles.banner} aria-hidden="true">
                  <img loading="eager" decoding="async"
                    src={`/painting-services/${serviceImages[service.id]}`}
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
                      <span>{service.rating.toFixed(2)}</span>
                      <span>({service.reviews} reviews)</span>
                      <button type="button" onClick={() => openDetails(service)}>View details</button>
                    </div>
                    <strong>{service.id === "marking-safety-painting" ? "Indicative ₹65 / sq ft" : "Site survey ₹500"}</strong>
                  </div>
                  <button type="button" className={styles.addButton}
                    onClick={() => service.id === "full-home-painting" ? addSurvey(service) : openDetails(service)}>
                    Add
                  </button>
                </div>
              </section>
            ))}
          </main>
          <aside className={styles.sidebar}><FullHomeRightSidebar /></aside>
        </div>
      </div>
      {active && (
        <div className={styles.backdrop} onMouseDown={(event) => { if (event.target === event.currentTarget) setActive(null); }}>
          <section className={styles.modal} role="dialog" aria-modal="true" aria-labelledby="painting-modal-title">
            <header className={styles.modalHeader}>
              <div>
                <h2 id="painting-modal-title">{active.title}</h2>
                <p>{isMarking ? "Indicative ₹65 / sq ft" : "One site survey ₹500"}</p>
              </div>
              <button type="button" className={styles.closeButton} aria-label="Close details" onClick={() => setActive(null)}>×</button>
            </header>
            <div className={styles.modalBody}>
              {(isPopular || isMarking) && (
                <section aria-label="Choose painting jobs">
                  <h3>Choose your requirements</h3>
                  <div className={styles.options}>
                    {(isPopular ? popularOptions : markingOptions).map((option) => (
                      <div className={`${styles.option} ${chosen.includes(option.id) ? styles.selectedOption : ""}`} key={option.id}>
                        <strong>{option.title}</strong>
                        <span>{isPopular ? "Covered by one ₹500 survey" : "₹65 / sq ft"}</span>
                        <button type="button" className={styles.optionAdd} aria-pressed={chosen.includes(option.id)}
                          onClick={() => toggleChoice(option.id)}>{chosen.includes(option.id) ? "Selected" : "Add"}</button>
                      </div>
                    ))}
                  </div>
                  {isMarking && (
                    <label className={styles.areaField}>Area for each selected job (sq ft)
                      <input type="number" min="1" step="1" value={area} onChange={(event) => {
                        const value = Number(event.target.value);
                        setArea(Number.isFinite(value) && value > 0 ? Math.min(100000, Math.floor(value)) : 1);
                      }} />
                    </label>
                  )}
                </section>
              )}
              <p className={styles.notice}>{isMarking
                ? "₹65 per sq ft is an indicative rate for each selected job. Final measurements, materials and scope are confirmed on site."
                : isPopular
                  ? "Choose one or several jobs: the site survey is ₹500 only once. On full payment for this same service, ₹500 is deducted from the final bill. The final painting rate is confirmed per measured square foot after the survey."
                  : "The site survey costs ₹500. The final painting rate is fixed after surface measurements, material selection and the work assessment."}</p>
              <p>{active.description}</p>
              <div className={styles.infoBox}><h3>What the service covers</h3><ul>{active.includes.map((item) => <li key={item}>{item}</li>)}</ul></div>
              <div className={styles.infoBox}><h3>Work process</h3><ol>{active.process.map((step) => <li key={step}>{step}</li>)}</ol></div>
              <div className={styles.reviews}>
                <strong><span className={styles.star}>★</span> {active.rating.toFixed(2)}</strong>
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
              <div><small>{isMarking ? "Indicative total" : "Site survey (once)"}</small>
                <strong>{money(total)}</strong></div>
              <button type="button" disabled={(isPopular || isMarking) && chosen.length === 0}
                onClick={() => isPopular || isMarking ? continueSelection(active) : (selected(active.id) ? setActive(null) : addSurvey(active))}>
                Continue
              </button>
            </footer>
          </section>
        </div>
      )}
    </section>
  );
}


const serviceDisplayImages: Record<string, string> = {
  "/painting-services/full_home_painting_service_banner.png": "/painting-services/full_home_painting_service_banner_selector.d571f2320c4b.webp",
  "/painting-services/full_home_painting_service_banner.e5fd0b004622.webp": "/painting-services/full_home_painting_service_banner_selector.d571f2320c4b.webp",
  "/painting-services/marking_safety_painting_service_banner.png": "/painting-services/marking_safety_painting_service_banner_selector.beee4c4cf939.webp",
  "/painting-services/marking_safety_painting_service_banner.0bd18c675a32.webp": "/painting-services/marking_safety_painting_service_banner_selector.beee4c4cf939.webp",
  "/painting-services/most_popular_painting_service_banner.png": "/painting-services/most_popular_painting_service_banner_selector.f1c9dba9c072.webp",
  "/painting-services/most_popular_painting_service_banner.4fcd6c1482ca.webp": "/painting-services/most_popular_painting_service_banner_selector.f1c9dba9c072.webp"
};
function serviceDisplaySource(src: string): string {
  const queryAt = src.indexOf("?");
  const base = queryAt < 0 ? src : src.slice(0, queryAt);
  return serviceDisplayImages[base] ?? src;
}
