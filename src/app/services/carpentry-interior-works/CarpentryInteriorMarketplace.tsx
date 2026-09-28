"use client";

import { useEffect, useMemo, useState, useSyncExternalStore } from "react";
import FullHomeRightSidebar from "../deep-cleaning/FullHomeRightSidebar";
import {
  getDeepCleaningCartServerSnapshot,
  getDeepCleaningCartSnapshot,
  parseDeepCleaningCartSnapshot,
  subscribeDeepCleaningCart,
  upsertDeepCleaningCartItem,
} from "../deep-cleaning/deepCleaningCart";
import styles from "./CarpentryInteriorMarketplace.module.css";

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
    id: "carpentry", title: "Carpentry", rating: 4.20, reviews: 628,
    description: "Furniture, doors and fitted woodwork for homes, offices and commercial spaces. Choose the jobs you want checked in one site survey.",
    includes: ["Door, hinge and lock repair", "Cupboard, wardrobe and drawer work", "Bed, sofa and furniture repair", "Shelves, cabinets and modular kitchen woodwork"],
    process: ["Choose the jobs that need attention", "Inspect dimensions, existing woodwork, damage and fixing points", "Confirm materials, finish, scope and final rate after the site survey", "Complete approved fabrication, fitting or repair and inspect the result"],
  },
  {
    id: "interior-designing", title: "Interior Designing", rating: 4.20, reviews: 531,
    description: "Plan functional interior spaces for homes, apartments, villas, offices and commercial properties.",
    includes: ["Site measurements and needs discussion", "Room layout and storage planning", "Furniture, lighting and finish concepts", "Material and execution scope quotation after survey"],
    process: ["Visit the site and measure rooms and existing fixtures", "Discuss usage, style, storage priorities and budget", "Prepare a proposed layout, finishes and work scope", "Confirm final design and quotation after the survey, then schedule approved work"],
  },
];

const jobs = [
  { id: "doors", title: "Doors, Hinges & Locks" },
  { id: "wardrobe", title: "Wardrobes & Cupboards" },
  { id: "furniture", title: "Furniture Repair" },
  { id: "beds", title: "Beds & Storage" },
  { id: "shelves", title: "Shelves & Cabinets" },
  { id: "kitchen", title: "Modular Kitchen Woodwork" },
  { id: "office", title: "Office / Commercial Woodwork" },
  { id: "custom", title: "Custom Carpentry" },
] as const;
const serviceImages: Record<string, string> = {
  "carpentry": "carpentry_service_banner.png",
  "interior-designing": "interior_designing_service_banner.png",
};
const cartId = (id: string) => `carpentry:${id}`;

export default function CarpentryInteriorMarketplace() {
  const [active, setActive] = useState<Service | null>(null);
  const [selectedJobs, setSelectedJobs] = useState<string[]>([]);
  const [selectorScrolled, setSelectorScrolled] = useState(false);
  const snapshot = useSyncExternalStore(subscribeDeepCleaningCart, getDeepCleaningCartSnapshot, getDeepCleaningCartServerSnapshot);
  const cartItems = useMemo(() => parseDeepCleaningCartSnapshot(snapshot), [snapshot]);

  useEffect(() => {
    if (!active) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const close = (event: KeyboardEvent) => { if (event.key === "Escape") setActive(null); };
    window.addEventListener("keydown", close);
    return () => { document.body.style.overflow = previous; window.removeEventListener("keydown", close); };
  }, [active]);

  function openDetails(service: Service) {
    const existing = cartItems.find((item) => item.id === cartId(service.id));
    setSelectedJobs(service.id === "carpentry" && existing
      ? jobs.filter((job) => existing.optionLabel.split(", ").includes(job.title)).map((job) => job.id)
      : []);
    setActive(service);
  }

  function toggleJob(id: string) {
    setSelectedJobs((current) => current.includes(id) ? current.filter((job) => job !== id) : [...current, id]);
  }

  function continueBooking(service: Service) {
    if (service.id === "carpentry" && selectedJobs.length === 0) return;
    const selectedTitles = jobs.filter((job) => selectedJobs.includes(job.id)).map((job) => job.title);
    upsertDeepCleaningCartItem({
      id: cartId(service.id), serviceTitle: service.title,
      optionLabel: service.id === "carpentry" ? selectedTitles.join(", ") : "Interior design site survey",
      price: 500, priceLabel: "₹500",
      duration: "One site survey. Final work rate confirmed after measurements, materials and approved scope.",
    });
    window.dispatchEvent(new Event("citycoolies:deep-cleaning-cart-added"));
    setActive(null);
  }

  return (
    <section id="city-coolies-carpentry" className={styles.section}>
      <div className={styles.container}>
        <div className={styles.columns}>
          <main className={styles.main}>
            <h1 className={styles.eyebrow}>Carpentry &amp; Interior Works</h1>
            <div className={styles.selectorViewport}>
              <button type="button" className={styles.selectorPrevious}
                style={{ display: selectorScrolled ? undefined : "none" }}
                aria-label="Show previous carpentry services"
                onClick={() => document.getElementById("carpentry-service-selector")?.scrollBy({ left: -320, behavior: "smooth" })}>
                <span aria-hidden="true">←</span>
              </button>
              <nav id="carpentry-service-selector" className={styles.selector}
                aria-label="Select a carpentry or interior service"
                onScroll={(event) => setSelectorScrolled(event.currentTarget.scrollLeft > 4)}>
                {services.map((service) => (
                  <button key={service.id} type="button" className={styles.selectorItem}
                    onClick={() => document.getElementById(service.id)?.scrollIntoView({ behavior: "smooth", block: "start" })}>
                    <span className={styles.thumbnail} aria-hidden="true" style={{ overflow: "hidden" }}>
                      <img src={`/carpentry-interior-works/${serviceImages[service.id]}`} alt="" width={100} height={100}
                        style={{ display: "block", width: "100%", height: "100%", objectFit: "cover", objectPosition: "center" }} />
                    </span>
                    <span className={styles.selectorLabel}>{service.title}</span>
                  </button>
                ))}
              </nav>
              <button type="button" className={styles.selectorNext} aria-label="Show more carpentry services"
                onClick={() => document.getElementById("carpentry-service-selector")?.scrollBy({ left: 320, behavior: "smooth" })}>
                <span aria-hidden="true">→</span>
              </button>
            </div>
            {services.map((service) => (
              <section className={styles.serviceGroup} id={service.id} key={service.id}>
                <h2>{service.title}</h2>
                <div className={styles.banner} aria-hidden="true">
                  <img src={`/carpentry-interior-works/${serviceImages[service.id]}`} alt="" width={1942} height={809}
                    style={{ display: "block", width: "100%", height: "100%", objectFit: "contain" }} />
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
                    <strong>Site survey ₹500</strong>
                  </div>
                  <button className={styles.addButton} type="button" onClick={() => openDetails(service)}>Add</button>
                </div>
              </section>
            ))}
          </main>
          <aside className={styles.sidebar}><FullHomeRightSidebar /></aside>
        </div>
      </div>
      {active && (
        <div className={styles.backdrop} onMouseDown={(event) => { if (event.target === event.currentTarget) setActive(null); }}>
          <section className={styles.modal} role="dialog" aria-modal="true" aria-labelledby="carpentry-modal-title">
            <header className={styles.modalHeader}>
              <div><h2 id="carpentry-modal-title">{active.title}</h2><p>One site survey ₹500</p></div>
              <button type="button" className={styles.closeButton} aria-label="Close details" onClick={() => setActive(null)}>×</button>
            </header>
            <div className={styles.modalBody}>
              {active.id === "carpentry" && (
                <section aria-label="Choose carpentry jobs">
                  <h3>Choose the jobs you need</h3>
                  <div className={styles.options}>
                    {jobs.map((job) => (
                      <div className={`${styles.option} ${selectedJobs.includes(job.id) ? styles.selectedOption : ""}`} key={job.id}>
                        <strong>{job.title}</strong>
                        <span>Included in the one site survey</span>
                        <button type="button" className={styles.optionAdd} aria-pressed={selectedJobs.includes(job.id)}
                          onClick={() => toggleJob(job.id)}>{selectedJobs.includes(job.id) ? "Selected" : "Add"}</button>
                      </div>
                    ))}
                  </div>
                </section>
              )}
              <p className={styles.notice}>Choose any number of jobs in this booking: the site survey is ₹500 once. The final work rate is confirmed after inspecting the space, measuring the work and agreeing on materials and scope.</p>
              <p>{active.description}</p>
              <div className={styles.infoBox}><h3>What the service covers</h3>
                <ul>{active.includes.map((item) => <li key={item}>{item}</li>)}</ul>
              </div>
              <div className={styles.infoBox}><h3>Work process</h3>
                <ol>{active.process.map((step) => <li key={step}>{step}</li>)}</ol>
              </div>
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
              <div><small>Site survey (once)</small><strong>₹500</strong></div>
              <button type="button" disabled={active.id === "carpentry" && selectedJobs.length === 0}
                onClick={() => continueBooking(active)}>Continue</button>
            </footer>
          </section>
        </div>
      )}
    </section>
  );
}
