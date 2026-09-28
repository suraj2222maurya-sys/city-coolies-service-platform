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
import styles from "./PlumbingWorksMarketplace.module.css";

type Service = {
  id: string;
  title: string;
  rating: number;
  reviews: number;
  price: number;
  survey?: boolean;
  description: string;
  includes: string[];
  process: string[];
};

const services: Service[] = [
  {
    id: "new-home-plumbing", title: "New Home Plumbing", rating: 4.2, reviews: 684, price: 500, survey: true,
    description: "New plumbing layouts for apartments, villas, bungalows, houses, schools, buildings and commercial properties.",
    includes: ["Water supply and drainage layout assessment", "Kitchen, bathroom and utility point planning", "Tank, pump and fixture connection review", "Materials and final work quotation after site survey"],
    process: ["Visit the site and review drawings, existing connections and requirements", "Map supply, drainage, tank and fixture locations", "Confirm quantities, materials and final rate after the site survey", "Install approved piping and fittings, then check for leaks and flow"],
  },
  {
    id: "pipe-work", title: "Pipe Work", rating: 4.2, reviews: 593, price: 0,
    description: "Choose the CPVC supply or UPVC drainage pipe size and length required for your property.",
    includes: ["CPVC supply pipe laying", "UPVC drainage pipe installation", "Soil and waste pipe work", "Joint and leak checks"],
    process: ["Inspect the pipe route and measure the required running feet", "Confirm pipe grade, fittings, access and materials", "Cut and join the selected pipe using the correct system components", "Allow joints to cure, then inspect and test the line before closing work"],
  },
  {
    id: "bathroom-plumbing", title: "Bathroom Plumbing", rating: 4.2, reviews: 521, price: 500, survey: true,
    description: "Bathroom water supply, drainage and fixture planning for homes, apartments, commercial premises and industrial facilities.",
    includes: ["Water and drain point survey", "Existing leakage and pipe-condition review", "Fixture and sanitary connection planning", "Final work quotation after site survey"],
    process: ["Inspect bathroom layout, water points and drain lines", "Check pressure, leakage, existing fixtures and access", "Agree scope, materials and final rate after site survey", "Complete approved pipe and fitting work and test for leaks"],
  },
  {
    id: "plumbing-installation", title: "Plumbing Installation", rating: 4.2, reviews: 476, price: 0,
    description: "Select individual plumbing fittings and installations for bathrooms, kitchens and utility areas.",
    includes: ["Water tank and jet spray fitting", "Toilet seat and basin fitting", "Flush tank fitting or repair", "Shower, washbasin and tap fitting"],
    process: ["Inspect the existing connection and chosen fitting", "Confirm compatibility, materials and any extra work", "Isolate water when needed and complete installation", "Restore supply and check flow, drainage and leaks"],
  },
];

type Option = { id: string; title: string; price: number; unit: string };
const pipeOptions: Option[] = [
  { id: "cpvc-15-20", title: "CPVC Water Supply Pipe Laying - 15/20 mm", price: 180, unit: "Rft" },
  { id: "cpvc-25", title: "CPVC Water Supply Pipe Laying - 25 mm", price: 200, unit: "Rft" },
  { id: "cpvc-32", title: "CPVC Water Supply Pipe Laying - 32 mm", price: 250, unit: "Rft" },
  { id: "upvc-40-50", title: "UPVC Drainage Pipe Installation - 40/50 mm", price: 150, unit: "Rft" },
  { id: "upvc-75", title: "UPVC Drainage Pipe Installation - 75 mm", price: 150, unit: "Rft" },
  { id: "upvc-110", title: "UPVC Drainage Pipe Installation - 110 mm", price: 200, unit: "Rft" },
  { id: "soil-waste", title: "Soil / Waste Pipe Installation", price: 250, unit: "Rft" },
];
const installationOptions: Option[] = [
  { id: "water-tank", title: "Water Tank Installation", price: 699, unit: "installation" },
  { id: "jet-spray", title: "Jet Spray Fitting", price: 299, unit: "fitting" },
  { id: "toilet-seat", title: "Toilet Seat Fitting", price: 799, unit: "fitting" },
  { id: "basin", title: "Washbasin Fitting", price: 499, unit: "fitting" },
  { id: "flush-tank", title: "Flush Tank Fitting / Repair", price: 399, unit: "job" },
  { id: "shower", title: "Shower Fitting", price: 299, unit: "fitting" },
  { id: "tap", title: "Tap / Nal Fitting", price: 249, unit: "fitting" },
];
const serviceImages: Record<string, string> = {
  "new-home-plumbing": "new_home_plumbing_service_banner.png",
  "pipe-work": "pipe_work_service_banner.png",
  "bathroom-plumbing": "bathroom_plumbing_service_banner.png",
  "plumbing-installation": "plumbing_installation_service_banner.png",
};
const isChoiceService = (id: string) => id === "pipe-work" || id === "plumbing-installation";
const optionsFor = (id: string): readonly Option[] => id === "pipe-work" ? pipeOptions : installationOptions;

const money = (value: number) => `\u20B9${value.toLocaleString("en-IN")}`;
const cartId = (id: string) => `plumbing:${id}`;

export default function PlumbingWorksMarketplace() {
  const [active, setActive] = useState<Service | null>(null);
  const [quantities, setQuantities] = useState<Record<string, number>>({});
  const [selectorScrolled, setSelectorScrolled] = useState(false);


  const snapshot = useSyncExternalStore(
    subscribeDeepCleaningCart,
    getDeepCleaningCartSnapshot,
    getDeepCleaningCartServerSnapshot,
  );
  const cartItems = useMemo(() => parseDeepCleaningCartSnapshot(snapshot), [snapshot]);
  const selected = (id: string) => cartItems.some((item) => item.id === cartId(id));

  const total = active && isChoiceService(active.id)
    ? optionsFor(active.id).reduce((sum, option) => sum + option.price * (quantities[option.id] || 0), 0)
    : 0;

  useEffect(() => {
    if (!active) return;
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setActive(null);
    };
    window.addEventListener("keydown", closeOnEscape);
    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener("keydown", closeOnEscape);
    };
  }, [active]);

  function toggleDirect(service: Service) {
    const id = cartId(service.id);
    if (selected(service.id)) {
      removeDeepCleaningCartItem(id);
    } else {
      upsertDeepCleaningCartItem({
        id,
        serviceTitle: service.title,
        optionLabel: service.survey ? "Site survey" : "Plumbing service",
        price: service.price,
        priceLabel: money(service.price),
        duration: service.survey
          ? "Final work rate after site survey"
          : "Indicative service charge; materials and final scope confirmed on site",
      });
      window.dispatchEvent(new Event("citycoolies:deep-cleaning-cart-added"));
    }
    setActive(null);
  }

  function continueChoices(service: Service) {
    if (total === 0) return;
    for (const option of optionsFor(service.id)) {
      removeDeepCleaningCartItem(cartId(`${service.id}-${option.id}`));
      const quantity = quantities[option.id] || 0;
      if (!quantity) continue;
      const price = option.price * quantity;
      upsertDeepCleaningCartItem({
        id: cartId(`${service.id}-${option.id}`),
        serviceTitle: service.title,
        optionLabel: `${option.title} x ${quantity} ${option.unit}`,
        price,
        priceLabel: money(price),
        duration: "Indicative labour rate; materials and additional work confirmed on site",
      });
    }
    window.dispatchEvent(new Event("citycoolies:deep-cleaning-cart-added"));
    setActive(null);
    setQuantities({});
  }

  function openDetails(service: Service) {
    setQuantities({});
    setActive(service);
  }

  return (
    <section id="city-coolies-plumbing" className={styles.section}>
      <div className={styles.container}>
        <div className={styles.columns}>
          <main className={styles.main}>
            <h1 className={styles.eyebrow}>Plumbing Works</h1>

            <div className={styles.selectorViewport}>
              <button
                type="button"
                className={styles.selectorPrevious}
                style={{ display: selectorScrolled ? undefined : "none" }}
                aria-label="Show previous plumbing services"
                onClick={() => document.getElementById("plumbing-service-selector")?.scrollBy({ left: -320, behavior: "smooth" })}
              >
                <span aria-hidden="true">{"\u2190"}</span>
              </button>

              <nav
                id="plumbing-service-selector"
                className={styles.selector}
                aria-label="Select a plumbing service"
                onScroll={(event) => setSelectorScrolled(event.currentTarget.scrollLeft > 4)}
              >
                {services.map((service) => (
                  <button
                    key={service.id}
                    type="button"
                    className={styles.selectorItem}
                    onClick={() => document.getElementById(service.id)?.scrollIntoView({ behavior: "smooth", block: "start" })}
                  >
                    <span className={styles.thumbnail} aria-hidden="true" style={{ overflow: "hidden" }}>
                      <img
                        src={`/plumbing-works/${serviceImages[service.id]}`}
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

              <button
                type="button"
                className={styles.selectorNext}
                aria-label="Show more plumbing services"
                onClick={() => document.getElementById("plumbing-service-selector")?.scrollBy({ left: 320, behavior: "smooth" })}
              >
                <span aria-hidden="true">{"\u2192"}</span>
              </button>
            </div>

            {services.map((service) => (
              <section className={styles.serviceGroup} id={service.id} key={service.id}>
                <h2>{service.title}</h2>
                <div className={styles.banner} aria-hidden="true">
                  <img
                    src={`/plumbing-works/${serviceImages[service.id]}`}
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
                      <span className={styles.star} aria-hidden="true">{"\u2605"}</span>
                      <span>{service.rating.toFixed(2)}</span>
                      <span>({service.reviews.toLocaleString("en-IN")} reviews)</span>
                      <button type="button" onClick={() => openDetails(service)}>View details</button>
                    </div>
                    <strong>
                      {isChoiceService(service.id)
                        ? "Choose plumbing jobs"
                        : service.survey
                          ? `Site survey ${money(service.price)}`
                          : `Starts at ${money(service.price)}`}
                    </strong>
                  </div>
                  <button
                    className={styles.addButton}
                    type="button"
                    onClick={() => isChoiceService(service.id) ? openDetails(service) : toggleDirect(service)}
                    aria-label={`Add ${service.title}`}
                  >Add</button>
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
        <div
          className={styles.backdrop}
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) setActive(null);
          }}
        >
          <section
            className={styles.modal}
            role="dialog"
            aria-modal="true"
            aria-labelledby="plumbing-modal-title"
          >
            <header className={styles.modalHeader}>
              <div>
                <h2 id="plumbing-modal-title">{active.title}</h2>
                <p>{active.survey
                  ? `Site survey ${money(active.price)}`
                  : isChoiceService(active.id)
                    ? "Choose the plumbing jobs you need"
                    : `Starts at ${money(active.price)}`}</p>
              </div>
              <button
                type="button"
                className={styles.closeButton}
                aria-label="Close details"
                onClick={() => setActive(null)}
              >
                {"\u00d7"}
              </button>
            </header>

            <div className={styles.modalBody}>
              {isChoiceService(active.id) && (
                <section aria-label="Choose plumbing requirements">
                  <h3>Choose your requirements</h3>
                  <div className={styles.options}>
                    {optionsFor(active.id).map((option) => {
                      const count = quantities[option.id] || 0;
                      return (
                        <div className={styles.option} key={option.id}>
                          <strong>{option.title}</strong>
                          <span>Unit: {option.unit} · {money(option.price)}</span>
                          {count ? (
                            <div className={styles.quantity}>
                              <button type="button" aria-label={`Remove one ${option.title}`} onClick={() => setQuantities((current) => ({ ...current, [option.id]: Math.max(0, (current[option.id] || 0) - 1) }))}>-</button>
                              <span>{count}</span>
                              <button type="button" aria-label={`Add one ${option.title}`} onClick={() => setQuantities((current) => ({ ...current, [option.id]: (current[option.id] || 0) + 1 }))}>+</button>
                            </div>
                          ) : (
                            <button className={styles.optionAdd} type="button" onClick={() => setQuantities((current) => ({ ...current, [option.id]: 1 }))}>Add</button>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </section>
              )}

              <p className={styles.notice}>
                {active.survey
                  ? "The site survey costs \u20B9500. The final plumbing work rate is confirmed after checking the property, work scope and materials."
                  : "Displayed labour rates are indicative. Materials, access work and the final scope are confirmed after the site assessment."}
              </p>
              <p>{active.description}</p>

              <div className={styles.infoBox}>
                <h3>What the service covers</h3>
                <ul>{active.includes.map((item) => <li key={item}>{item}</li>)}</ul>
              </div>

              <div className={styles.infoBox}>
                <h3>Work process</h3>
                <ol>{active.process.map((step) => <li key={step}>{step}</li>)}</ol>
              </div>

              <div className={styles.reviews}>
                <strong><span className={styles.star}>{"\u2605"}</span> {active.rating.toFixed(2)}</strong>
                <span>{active.reviews.toLocaleString("en-IN")} reviews</span>
                {[5, 4, 3, 2, 1].map((score, index) => (
                  <div className={styles.ratingLine} key={score}>
                    <span>{score} {"\u2605"}</span>
                    <div><i style={{ width: `${[48, 29, 13, 7, 3][index]}%` }} /></div>
                    <span>{[48, 29, 13, 7, 3][index]}%</span>
                  </div>
                ))}
              </div>
            </div>

            <footer className={styles.modalFooter}>
              <div>
                <small>{isChoiceService(active.id) ? "Selected jobs total" : active.survey ? "Site survey" : "Indicative charge"}</small>
                <strong>{isChoiceService(active.id) ? money(total) : money(active.price)}</strong>
              </div>
              <button
                type="button"
                disabled={isChoiceService(active.id) && total === 0}
                onClick={() => isChoiceService(active.id)
                  ? continueChoices(active)
                  : (selected(active.id) ? setActive(null) : toggleDirect(active))}
              >
                Continue
              </button>
            </footer>
          </section>
        </div>
      )}
    </section>
  );
}