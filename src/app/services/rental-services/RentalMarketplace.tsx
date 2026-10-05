"use client";

import Image from "next/image";

import { useEffect, useRef, useState } from "react";
import FullHomeRightSidebar from "../deep-cleaning/FullHomeRightSidebar";
import {
  readDeepCleaningCart,
  removeDeepCleaningCartItem,
  upsertDeepCleaningCartItem,
} from "../deep-cleaning/deepCleaningCart";
import styles from "./RentalMarketplace.module.css";

type RentalOption = {
  id: string;
  title: string;
  price: number;
  detail: string;
};
type RentalService = {
  id: string;
  title: string;
  symbol: string;
  unit: string;
  unitLabel: string;
  minimum: number;
  options: RentalOption[];
  description: string;
  note: string;
  process: string[];
};

const services: RentalService[] = [
  {
    id: "lorry-rental",
    title: "Lorry Rental",
    symbol: "02",
    unit: "local trip",
    unitLabel: "Trips per selected vehicle",
    minimum: 1,
    options: [
      { id: "mini-lorry", title: "Mini Lorry", price: 1500, detail: "Small goods vehicle / Tata Ace class; suitable load confirmed." },
      { id: "pickup", title: "Pickup Truck", price: 2200, detail: "Light commercial goods transport; cargo dimensions confirmed." },
      { id: "lorry-14ft", title: "14-Foot Lorry", price: 4000, detail: "Medium goods vehicle; legal payload and access confirmed." },
      { id: "lorry-17ft", title: "17-Foot Lorry", price: 5500, detail: "Larger loads; vehicle body type and capacity confirmed." },
    ],
    description: "Goods vehicle rental for local deliveries, materials and commercial transport.",
    note: "Indicative local-trip prices only. Distance, cargo weight, vehicle body, loading/unloading, waiting time, tolls, permits and taxes change the final quote. Hazardous or restricted cargo requires separate approval.",
    process: [
      "Share pickup/drop locations, cargo description, weight and dimensions.",
      "Confirm the appropriate vehicle and pickup/drop access.",
      "Agree trip distance, loading support, waiting allowance and final quote.",
      "Confirm availability and vehicle/driver details before dispatch.",
      "Record pickup, delivery and any approved additional charges.",
    ],
  },
  {
    id: "jcb-rental",
    title: "JCB Rental",
    symbol: "03",
    unit: "working hour",
    unitLabel: "Working hours per selected machine",
    minimum: 4,
    options: [
      { id: "backhoe", title: "Backhoe Loader", price: 1500, detail: "JCB class backhoe for digging, loading and levelling." },
      { id: "mini-excavator", title: "Mini Excavator", price: 1800, detail: "Compact excavation equipment; access suitability confirmed." },
      { id: "excavator", title: "Excavator", price: 2500, detail: "Larger earthwork; machine size chosen after site assessment." },
      { id: "breaker", title: "Breaker Attachment", price: 2200, detail: "Compatible machine and attachment for approved breaking work." },
    ],
    description: "Operator-assisted equipment rental for excavation, trenching, levelling and loading.",
    note: "Indicative hourly rates with a provisional 4-hour minimum. Operator, fuel, mobilization, attachments, standby and site conditions must be agreed in writing. Work starts only after access and site readiness are confirmed.",
    process: [
      "Share the site location, task, photos and expected working duration.",
      "Assess access, ground conditions, underground services and machine suitability.",
      "Confirm operator, attachments, fuel, transport and minimum hire charges.",
      "Schedule dispatch after availability and site readiness checks.",
      "Record working/standby hours and obtain completion sign-off.",
    ],
  },
  {
    id: "crane-rental",
    title: "Crane Rental",
    symbol: "04",
    unit: "working hour",
    unitLabel: "Working hours per selected crane",
    minimum: 4,
    options: [
      { id: "pick-carry", title: "Pick & Carry Crane", price: 2000, detail: "Equipment lifting and shifting; capacity and reach assessed." },
      { id: "mobile-crane", title: "Mobile Crane", price: 3500, detail: "General lifting; suitable capacity selected for the job." },
      { id: "truck-crane", title: "Truck-Mounted Crane", price: 4500, detail: "Mobile lifting support; access and setup space assessed." },
      { id: "heavy-crane", title: "Heavy-Lift Crane", price: 7500, detail: "Specialist lifting; site-specific engineering and quotation required." },
    ],
    description: "Crane hire for equipment handling, installation and approved lifting work.",
    note: "Indicative estimates only, with a provisional 4-hour minimum. Load weight alone does not determine crane capacity: lift radius, height, ground conditions and the lift plan matter. Operator, rigging crew, mobilization and permits are quoted separately as applicable.",
    process: [
      "Provide load weight, dimensions, lift height, radius and site location.",
      "Arrange a qualified assessment of access, ground and the required lift plan.",
      "Confirm crane capacity, operator, rigging support and written quotation.",
      "Schedule approved equipment and crew after site-readiness confirmation.",
      "Complete the agreed lift and sign off actual hire hours and extras.",
    ],
  },
  {
    id: "generator-rental",
    title: "Generator Rental",
    symbol: "05",
    unit: "day",
    unitLabel: "Rental days per selected generator",
    minimum: 1,
    options: [
      { id: "20-kva", title: "20 kVA Generator", price: 2500, detail: "Small temporary-power category; suitability depends on actual load." },
      { id: "40-kva", title: "40 kVA Generator", price: 4000, detail: "Medium temporary-power category; load assessment required." },
      { id: "62-kva", title: "62.5 kVA Generator", price: 5500, detail: "Event or site power category; starting loads considered." },
      { id: "125-kva", title: "125 kVA Generator", price: 8500, detail: "Larger temporary-power requirement; assessed before confirmation." },
    ],
    description: "Temporary generator rental for events, backup power and work sites.",
    note: "Indicative daily hire; daily running-hour allowance must be confirmed. Fuel, transport, cables, electrical connection, operator and taxes are not automatically included. Generator size is selected from assessed load, starting demand and operating conditions.",
    process: [
      "Share equipment loads, running hours, date and site details.",
      "Assess required capacity, starting demand and installation location.",
      "Confirm fuel, cabling, delivery, operator and final hire quotation.",
      "Arrange installation and commissioning by qualified personnel.",
      "Record run hours/fuel as agreed and arrange disconnection and collection.",
    ],
  },
];

const money = (value: number) => `₹${value.toLocaleString("en-IN")}`;
const cartId = (serviceId: string, optionId: string) =>
  `rental:${serviceId}:${optionId}`;

export default function RentalMarketplace() {
  const [active, setActive] = useState<RentalService | null>(null);
  const [selected, setSelected] = useState<string[]>([]);
  const [units, setUnits] = useState(1);
  const [error, setError] = useState("");
  const [scrolled, setScrolled] = useState(false);
  const dialog = useRef<HTMLElement>(null);
  const trigger = useRef<HTMLElement | null>(null);

  const chosen = active?.options.filter(option => selected.includes(option.id)) ?? [];
  const total = chosen.reduce((sum, option) => sum + option.price * units, 0);

  useEffect(() => {
    if (!active) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const panel = dialog.current;
    panel?.focus();

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setActive(null);
        return;
      }
      if (event.key !== "Tab" || !panel) return;
      const controls = Array.from(panel.querySelectorAll<HTMLElement>(
        'button:not(:disabled), input, select, textarea, a[href], [tabindex="0"]'
      ));
      const first = controls[0];
      const last = controls[controls.length - 1];
      if (!first || !last) return;
      if (event.shiftKey && (document.activeElement === first || document.activeElement === panel)) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && (document.activeElement === last || document.activeElement === panel)) {
        event.preventDefault();
        first.focus();
      }
    }

    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previous;
      window.removeEventListener("keydown", onKeyDown);
      trigger.current?.focus();
    };
  }, [active]);

  function open(service: RentalService) {
    trigger.current = document.activeElement as HTMLElement | null;
    const cart = readDeepCleaningCart();
    const saved = service.options.filter(option =>
      cart.some(item => item.id === cartId(service.id, option.id))
    );
    setSelected(saved.map(option => option.id));
    setUnits(service.minimum);
    setError("");
    setActive(service);
  }

  function toggle(id: string) {
    setSelected(current =>
      current.includes(id) ? current.filter(value => value !== id) : [...current, id]
    );
    setError("");
  }

  function continueBooking() {
    if (!active) return;

    for (const option of active.options) {
      const id = cartId(active.id, option.id);

      if (!selected.includes(option.id)) {
        removeDeepCleaningCartItem(id);
        continue;
      }

      const price = option.price * units;
      upsertDeepCleaningCartItem({
        id,
        serviceTitle: active.title,
        optionLabel: `${option.title} x ${units}`,
        price,
        priceLabel: `${money(price)} estimated`,
        duration: `${units} ${active.unit} | Booking details and availability pending`,
      });
    }

    setError("");
    setActive(null);
  }

  return (
    <section className={styles.section} id="city-coolies-rentals">
      <div className={styles.container}>
        <div className={styles.columns}>
          <main className={styles.main}>
            <h1 className={styles.eyebrow}>Rental Services</h1>
            <div className={styles.selectorViewport}>
              {scrolled && (
                <button type="button" className={styles.selectorPrevious}
                  aria-label="Previous rental services"
                  onClick={() => document.getElementById("rental-selector")?.scrollBy({ left: -312, behavior: "smooth" })}>
                  ←
                </button>
              )}
              <nav className={styles.selector} id="rental-selector"
                aria-label="Select a rental service"
                onScroll={event => setScrolled(event.currentTarget.scrollLeft > 4)}>
                {services.map(service => (
                  <button type="button" className={styles.selectorItem} key={service.id}
                    onClick={() => document.getElementById(service.id)?.scrollIntoView({ behavior: "smooth", block: "start" })}>
                    <Image src={`/rental-services/${service.id}-banner.webp`} alt="" width={100} height={100} unoptimized loading="eager" className={`${styles.thumbnail} ${styles.rentalSelectorImage}`} />
                    <span className={styles.selectorLabel}>{service.title}</span>
                  </button>
                ))}
              </nav>
              <button type="button" className={styles.selectorNext}
                aria-label="More rental services"
                onClick={() => document.getElementById("rental-selector")?.scrollBy({ left: 312, behavior: "smooth" })}>
                →
              </button>
            </div>

            {services.map(service => (
              <section className={styles.serviceGroup} id={service.id} key={service.id}>
                <h2>{service.title}</h2>
                <Image src={`/rental-services/${service.id}-banner.webp`} alt={service.title} width={1940} height={811} unoptimized loading="eager" className={styles.rentalServiceImage} />
                <div className={styles.serviceRow}>
                  <div>
                    <h3>{service.title}</h3>
                    <div className={styles.rating}>
                      <span className={styles.star} aria-hidden="true">★</span>
                      <span>4.20 ·</span>
                      <span>(900 reviews)</span>
                      <button type="button" onClick={() => open(service)}>View details</button>
                    </div>
                    <strong>{money(Math.min(...service.options.map(option => option.price)))}</strong>
                  </div>
                  <button type="button" className={styles.addButton} onClick={() => open(service)}>Add</button>
                </div>
              </section>
            ))}
          </main>
          <aside className={styles.sidebar}><FullHomeRightSidebar /></aside>
        </div>
      </div>

      {active && (
        <div className={styles.backdrop} onMouseDown={event => {
          if (event.target === event.currentTarget) setActive(null);
        }}>
          <section className={styles.modal} ref={dialog} tabIndex={-1}
            role="dialog" aria-modal="true" aria-labelledby="rental-modal-title">
            <header className={styles.modalHeader}>
              <div>
                <h2 id="rental-modal-title">{active.title}</h2>
                <p>Choose your requirements</p>
              </div>
              <button type="button" className={styles.closeButton}
                aria-label="Close rental details" onClick={() => setActive(null)}>×</button>
            </header>

            <div className={styles.modalBody}>
              <p className={styles.notice}>Indicative prices. Availability and final quotation must be confirmed before payment. Ratings shown are demo data.</p>
              <div className={styles.rentalOptions}>
                {active.options.map(option => {
                  const isSelected = selected.includes(option.id);
                  return (
                    <div className={`${styles.rentalOption} ${isSelected ? styles.rentalOptionSelected : ""}`} key={option.id}>
                      <div className={styles.rentalOptionHeading}>
                        <strong>{option.title}</strong>
                        <strong>{money(option.price)} / {active.unit}</strong>
                      </div>
                      <button type="button" className={styles.optionAdd}
                        aria-pressed={isSelected}
                        aria-label={`${isSelected ? "Remove" : "Add"} ${option.title}`}
                        onClick={() => toggle(option.id)}>Add</button>
                    </div>
                  );
                })}
              </div>



              {chosen.length > 0 && (
                <div className={styles.infoBox}>
                  <h3>Selected estimates</h3>
                  {chosen.map(option => (
                    <div className={styles.rentalBreakdown} key={option.id}>
                      <span>{option.title} × {units}</span>
                      <strong>{money(option.price * units)}</strong>
                    </div>
                  ))}
                </div>
              )}

              {error && <p className={styles.rentalError} role="alert">{error}</p>}
              <p>{active.description}</p>
              <p className={styles.notice}>{active.note}</p>
              <div className={styles.infoBox}>
                <h3>Work process</h3>
                <ol>{active.process.map(step => <li key={step}>{step}</li>)}</ol>
              </div>
              <div className={styles.reviews}>
                <h3>Rating overview —</h3>
                <strong><span className={styles.star}>★</span> 4.20</strong>
                <span>900 reviews · Not verified customer feedback</span>
                {[5, 4, 3, 2, 1].map((score, index) => (
                  <div className={styles.ratingLine} key={score}>
                    <span>{score} ★</span>
                    <div><i style={{ width: `${[50, 29, 14, 5, 2][index]}%` }} /></div>
                    <span>{[50, 29, 14, 5, 2][index]}%</span>
                  </div>
                ))}
              </div>
            </div>

            <footer className={styles.modalFooter}>
              <div><small>Selected estimate</small><strong>{money(total)}</strong></div>
              <button type="button" onClick={continueBooking}>Continue</button>
            </footer>
          </section>
        </div>
      )}
    </section>
  );
}