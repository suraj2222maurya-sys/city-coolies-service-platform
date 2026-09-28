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
import styles from "./ApplianceRepairMarketplace.module.css";

type Job = { id: string; title: string; price: number };
type Service = {
  id: string;
  title: string;
  rating: number;
  reviews: number;
  description: string;
  jobs: readonly Job[];
  process: readonly string[];
};

const services: readonly Service[] = [
  {
    id: "washing-machine", title: "Washing Machine Repair & Installation", rating: 4.20, reviews: 682,
    description: "Inspect a top load or front load washing machine for draining, spinning, leaks, noise or installation needs.",
    jobs: [
      { id: "checkup", title: "Repair diagnosis / check-up", price: 299 },
      { id: "installation", title: "Washing machine installation", price: 499 },
      { id: "drain", title: "Drain / inlet connection service", price: 349 },
    ],
    process: ["Confirm appliance type, model and reported fault", "Inspect power, water inlet, drain and accessible components", "Share the diagnosis and quote any parts or extra labour before repair", "Complete approved service and check a test cycle"],
  },
  {
    id: "fridge-cooler", title: "Fridge & Cooler Repair", rating: 4.20, reviews: 614,
    description: "Check cooling, power, noise and water leakage issues in a refrigerator or air cooler.",
    jobs: [
      { id: "fridge-check", title: "Refrigerator check-up", price: 299 },
      { id: "cooler-check", title: "Air cooler check-up", price: 249 },
      { id: "cooler-install", title: "Air cooler setup / fitting", price: 349 },
    ],
    process: ["Record symptoms and identify the appliance model", "Inspect cooling, airflow, electrical and accessible water connections", "Explain the fault and obtain approval for parts or specialist work", "Complete approved work and verify cooling or airflow"],
  },
  {
    id: "geyser", title: "Geyser Installation & Repair", rating: 4.20, reviews: 541,
    description: "Fit a compatible geyser or inspect problems with heating, supply, leakage and controls.",
    jobs: [
      { id: "checkup", title: "Geyser repair diagnosis", price: 299 },
      { id: "installation", title: "Geyser installation", price: 599 },
      { id: "uninstall", title: "Geyser uninstallation", price: 349 },
    ],
    process: ["Check model, mounting, water connections and power supply", "Inspect the reported issue or confirm installation compatibility", "Quote additional parts or mounting work before proceeding", "Complete approved work and test safe operation and leaks"],
  },
  {
    id: "tv", title: "TV Fitting & Repair", rating: 4.20, reviews: 489,
    description: "TV wall fitting and inspection of display, power, sound or input issues.",
    jobs: [
      { id: "wall-fit", title: "TV wall fitting", price: 499 },
      { id: "checkup", title: "TV repair diagnosis", price: 299 },
      { id: "setup", title: "TV setup and connections", price: 349 },
    ],
    process: ["Check TV size, wall material, bracket and power position", "Inspect symptoms or confirm safe mounting location", "Agree any required bracket, anchors or replacement parts", "Fit or repair as approved, then verify stability and picture or sound"],
  },
  {
    id: "chimney", title: "Kitchen Chimney Service & Repair", rating: 4.20, reviews: 573,
    description: "Check a kitchen chimney for low suction, motor noise, controls or fitting issues.",
    jobs: [
      { id: "checkup", title: "Chimney repair diagnosis", price: 299 },
      { id: "installation", title: "Chimney installation assessment", price: 399 },
      { id: "basic-service", title: "Accessible filter and function service", price: 449 },
    ],
    process: ["Check model, ducting, suction and filter condition", "Inspect safe access, motor and controls", "Quote any parts, deep cleaning or duct work before starting", "Complete approved service and test operation"],
  },
  {
    id: "gas-stove-pipe", title: "Gas Stove & Gas Pipe Service", rating: 4.20, reviews: 526,
    description: "Inspect gas stove burners, ignition and approved flexible gas hose connections.",
    jobs: [
      { id: "stove-check", title: "Gas stove diagnosis", price: 299 },
      { id: "burner-service", title: "Burner / ignition service", price: 399 },
      { id: "hose-check", title: "Gas hose connection assessment", price: 299 },
    ],
    process: ["Check the stove, hose type and accessible connections", "Identify the fault and confirm suitable approved parts", "Explain the quote before any replacement or repair", "Complete authorized work and check operation and leaks"],
  },
  {
    id: "exhaust-fan", title: "Exhaust Fan Repair & Fitting", rating: 4.20, reviews: 438,
    description: "Diagnose or fit a bathroom or kitchen exhaust fan at a suitable existing opening.",
    jobs: [
      { id: "checkup", title: "Exhaust fan repair diagnosis", price: 249 },
      { id: "installation", title: "Exhaust fan fitting", price: 399 },
      { id: "clean-service", title: "Fan cleaning and service", price: 299 },
    ],
    process: ["Inspect fan size, mounting opening and electrical point", "Assess noise, blade, motor or airflow issue", "Confirm additional wiring, parts and labour before work", "Complete approved repair or fitting and test airflow"],
  },
];

const money = (amount: number) => `₹${amount.toLocaleString("en-IN")}`;
const serviceImages: Record<string, string> = {
  "washing-machine": "washing_machine_repair_installation_service_banner.png",
  "fridge-cooler": "fridge_cooler_repair_service_banner.png",
  "geyser": "geyser_installation_repair_service_banner.png",
  "tv": "tv_fitting_repair_service_banner.png",
  "chimney": "kitchen_chimney_repair_service_banner.png",
  "gas-stove-pipe": "gas_stove_gas_pipe_service_banner.png",
  "exhaust-fan": "exhaust_fan_repair_fitting_service_banner.png",
};
const cartId = (id: string) => `appliance:${id}`;

export default function ApplianceRepairMarketplace() {
  const [active, setActive] = useState<Service | null>(null);
  const [quantities, setQuantities] = useState<Record<string, number>>({});
  const [selectorScrolled, setSelectorScrolled] = useState(false);
  const snapshot = useSyncExternalStore(subscribeDeepCleaningCart, getDeepCleaningCartSnapshot, getDeepCleaningCartServerSnapshot);
  const cartItems = useMemo(() => parseDeepCleaningCartSnapshot(snapshot), [snapshot]);
  const total = active?.jobs.reduce((sum, job) => sum + job.price * (quantities[job.id] || 0), 0) ?? 0;

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
    const saved: Record<string, number> = {};
    if (existing) {
      for (const job of service.jobs) {
        const savedJob = existing.optionLabel.split(", ").find((label) => label.startsWith(`${job.title} x `));
        if (savedJob) saved[job.id] = Number(savedJob.slice(`${job.title} x `.length)) || 0;
      }
    }
    setQuantities(saved);
    setActive(service);
  }

  function adjust(id: string, change: number) {
    setQuantities((current) => ({ ...current, [id]: Math.max(0, (current[id] || 0) + change) }));
  }

  function continueBooking(service: Service) {
    if (total <= 0) return;
    const selected = service.jobs.filter((job) => (quantities[job.id] || 0) > 0);
    const item = {
      id: cartId(service.id), serviceTitle: service.title,
      optionLabel: selected.map((job) => `${job.title} x ${quantities[job.id]}`).join(", "),
      price: total, priceLabel: money(total),
      duration: "Indicative service charges; spare parts and additional work quoted after diagnosis",
    };
    upsertDeepCleaningCartItem(item);
    window.dispatchEvent(new Event("citycoolies:deep-cleaning-cart-added"));
    setActive(null);
  }

  return (
    <section id="city-coolies-appliance" className={styles.section}>
      <div className={styles.container}>
        <div className={styles.columns}>
          <main className={styles.main}>
            <h1 className={styles.eyebrow}>Appliance Repair</h1>
            <div className={styles.selectorViewport}>
              <button type="button" className={styles.selectorPrevious} style={{ display: selectorScrolled ? undefined : "none" }}
                aria-label="Show previous appliance services"
                onClick={() => document.getElementById("appliance-service-selector")?.scrollBy({ left: -320, behavior: "smooth" })}>
                <span aria-hidden="true">←</span>
              </button>
              <nav id="appliance-service-selector" className={styles.selector} aria-label="Select an appliance service"
                onScroll={(event) => setSelectorScrolled(event.currentTarget.scrollLeft > 4)}>
                {services.map((service) => (
                  <button key={service.id} type="button" className={styles.selectorItem}
                    onClick={() => document.getElementById(service.id)?.scrollIntoView({ behavior: "smooth", block: "start" })}>
                    <span className={styles.thumbnail} aria-hidden="true" style={{ overflow: "hidden" }}>
                      <img src={`/appliance-repair/${serviceImages[service.id]}`} alt="" width={100} height={100}
                        style={{ display: "block", width: "100%", height: "100%", objectFit: "cover", objectPosition: "center" }} />
                    </span>
                    <span className={styles.selectorLabel}>{service.title}</span>
                  </button>
                ))}
              </nav>
              <button type="button" className={styles.selectorNext} aria-label="Show more appliance services"
                onClick={() => document.getElementById("appliance-service-selector")?.scrollBy({ left: 320, behavior: "smooth" })}>
                <span aria-hidden="true">→</span>
              </button>
            </div>
            {services.map((service) => (
              <section className={styles.serviceGroup} id={service.id} key={service.id}>
                <h2>{service.title}</h2>
                <div className={styles.banner} aria-hidden="true">
                  <img src={`/appliance-repair/${serviceImages[service.id]}`} alt="" width={1942} height={809}
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
                    <strong>Starts at {money(Math.min(...service.jobs.map((job) => job.price)))}</strong>
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
          <section className={styles.modal} role="dialog" aria-modal="true" aria-labelledby="appliance-modal-title">
            <header className={styles.modalHeader}>
              <div><h2 id="appliance-modal-title">{active.title}</h2><p>Choose the jobs you need</p></div>
              <button type="button" className={styles.closeButton} aria-label="Close details" onClick={() => setActive(null)}>×</button>
            </header>
            <div className={styles.modalBody}>
              <section aria-label="Choose appliance jobs">
                <h3>Choose your requirements</h3>
                <div className={styles.options}>
                  {active.jobs.map((job) => {
                    const count = quantities[job.id] || 0;
                    return (
                      <div className={styles.option} key={job.id}>
                        <strong>{job.title}</strong><span>{money(job.price)} per job</span>
                        {count ? (
                          <div className={styles.quantity}>
                            <button type="button" aria-label={`Remove one ${job.title}`} onClick={() => adjust(job.id, -1)}>-</button>
                            <span>{count}</span>
                            <button type="button" aria-label={`Add one ${job.title}`} onClick={() => adjust(job.id, 1)}>+</button>
                          </div>
                        ) : (
                          <button type="button" className={styles.optionAdd} onClick={() => adjust(job.id, 1)}>Add</button>
                        )}
                      </div>
                    );
                  })}
                </div>
              </section>
              <p className={styles.notice}>Displayed service charges are indicative. The technician checks the appliance first. Spare parts, gas or refrigerant work, wall brackets and additional labour are quoted separately for approval before work.</p>
              <p>{active.description}</p>
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
              <div><small>Selected jobs total</small><strong>{money(total)}</strong></div>
              <button type="button" disabled={total === 0} onClick={() => continueBooking(active)}>Continue</button>
            </footer>
          </section>
        </div>
      )}
    </section>
  );
}
