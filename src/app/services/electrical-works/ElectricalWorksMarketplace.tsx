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
import styles from "./ElectricalWorksMarketplace.module.css";

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
    id: "full-house-electrical-wiring",
    title: "Full House Electrical Wiring",
    rating: 4.2,
    reviews: 846,
    price: 500,
    survey: true,
    description: "Wiring planning and execution for new apartments, villas, bungalows and buildings, or a complete home rewiring project.",
    includes: ["Property and room-by-room assessment", "Circuit, switch-point and lighting-point planning", "Distribution board and earthing review", "Scope and material quotation after the survey"],
    process: ["Survey the property, rooms and expected electrical loads", "Plan circuits, cable routes, points and protective devices", "Confirm the work scope and final price after the site survey", "Complete approved installation, inspection and testing"],
  },
  {
    id: "electrical-installation",
    title: "Electrical Installation",
    rating: 4.2,
    reviews: 723,
    price: 0,
    description: "Choose the electrical fittings and installation work you need.",
    includes: ["Switches and switchboards", "MCB fitting", "LED light fitting", "6A socket points", "16A power socket points"],
    process: ["Inspect the existing point and fitting location", "Check the planned fitting and required materials", "Complete the selected installation work", "Inspect and test the finished point"],
  },
  {
    id: "smart-switch-automation-setup",
    title: "Smart Switch & Automation Setup",
    rating: 4.1,
    reviews: 612,
    price: 599,
    description: "Setup of compatible smart switches and basic room automation controls.",
    includes: ["Existing switch-box assessment", "Compatible smart-switch fitting", "App pairing and basic control setup", "Function check and handover"],
    process: ["Check existing wiring and device compatibility", "Confirm the required hardware and work scope", "Fit and configure the approved devices", "Test controls and explain normal operation"],
  },
  {
    id: "doorbell-video-doorbell-fitting",
    title: "Doorbell / Video Doorbell Fitting",
    rating: 4.2,
    reviews: 574,
    price: 399,
    description: "Fitting and setup for a compatible doorbell or video doorbell.",
    includes: ["Mounting-position assessment", "Existing power-point review", "Doorbell fitting", "Connection and function check"],
    process: ["Check the mounting position and power arrangement", "Confirm device compatibility and work scope", "Fit and connect the approved doorbell", "Test ringing, video and app connection when applicable"],
  },
  {
    id: "main-meter-box-panel-work",
    title: "Main Meter Box Wiring / Panel Work",
    rating: 4.2,
    reviews: 498,
    price: 500,
    survey: true,
    description: "Assessment of a meter-box or distribution-panel wiring job before a final quote.",
    includes: ["Existing panel condition assessment", "Circuit and protective-device review", "Meter-box or panel work planning", "Final quotation after site survey"],
    process: ["Inspect the panel and document the requested work", "Review circuits, protection and access requirements", "Confirm scope, materials and final quote after survey", "Carry out approved work followed by inspection and testing"],
  },
];

const serviceImages: Record<string, string> = {
  "full-house-electrical-wiring": "full_house_electrical_wiring_service_banner.5cd16f2373c9.webp",
  "electrical-installation": "electrical_installation_service_banner.012f48e48e80.webp",
  "smart-switch-automation-setup": "smart_switch_automation_setup_service_banner.2e3291737841.webp",
  "doorbell-video-doorbell-fitting": "doorbell_video_doorbell_fitting_service_banner.040231054595.webp",
  "main-meter-box-panel-work": "main_meter_box_wiring_panel_work_service_banner.66c19f84f8c1.webp",
};
const quantityServices = [
  "smart-switch-automation-setup",
  "doorbell-video-doorbell-fitting",
  "main-meter-box-panel-work",
];
const options = [
  { id: "switch", title: "Switch Fitting", price: 149 },
  { id: "switchboard", title: "Switchboard Fitting", price: 299 },
  { id: "mcb", title: "MCB Fitting", price: 299 },
  { id: "led-light", title: "LED Light Fitting", price: 199 },
  { id: "6a-socket", title: "6A Socket Point", price: 249 },
  { id: "16a-socket", title: "16A Power Socket Point", price: 349 },
] as const;

const money = (value: number) => `\u20B9${value.toLocaleString("en-IN")}`;
const cartId = (id: string) => `electrical:${id}`;

export default function ElectricalWorksMarketplace() {
  const [active, setActive] = useState<Service | null>(null);
  const [quantities, setQuantities] = useState<Record<string, number>>({});
  const [selectorScrolled, setSelectorScrolled] = useState(false);
  const [directCounts, setDirectCounts] = useState<Record<string, number>>({});

  const snapshot = useSyncExternalStore(
    subscribeDeepCleaningCart,
    getDeepCleaningCartSnapshot,
    getDeepCleaningCartServerSnapshot,
  );
  const cartItems = useMemo(() => parseDeepCleaningCartSnapshot(snapshot), [snapshot]);
  const selected = (id: string) => cartItems.some((item) => item.id === cartId(id));

  const total = options.reduce(
    (sum, option) => sum + option.price * (quantities[option.id] || 0),
    0,
  );

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
        optionLabel: service.survey ? "Site survey" : "Service visit",
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

  function changeDirectQuantity(service: Service, change: number) {
    const current = selected(service.id) ? (directCounts[service.id] || 1) : 0;
    const next = Math.max(0, current + change);

    setDirectCounts((counts) => ({ ...counts, [service.id]: next }));

    if (next === 0) {
      removeDeepCleaningCartItem(cartId(service.id));
      return;
    }

    const price = service.price * next;
    upsertDeepCleaningCartItem({
      id: cartId(service.id),
      serviceTitle: service.title,
      optionLabel: `${service.survey ? "Site survey" : "Service visit"} x ${next}`,
      price,
      priceLabel: money(price),
      duration: service.survey
        ? "Final work rate after site survey"
        : "Indicative service charge; materials and final scope confirmed on site",
    });
    window.dispatchEvent(new Event("citycoolies:deep-cleaning-cart-added"));
  }
  function continueInstallation() {
    if (total === 0) return;
    for (const option of options) {
      const quantity = quantities[option.id] || 0;
      if (!quantity) continue;
      const price = option.price * quantity;
      upsertDeepCleaningCartItem({
        id: cartId(`installation-${option.id}`),
        serviceTitle: "Electrical Installation",
        optionLabel: `${option.title} x ${quantity}`,
        price,
        priceLabel: money(price),
        duration: "Indicative fitting charge; materials and additional work confirmed on site",
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
    <section id="city-coolies-electrical" className={styles.section}>
      <div className={styles.container}>
        <div className={styles.columns}>
          <main className={styles.main}>
            <h1 className={styles.eyebrow}>Electrical Works</h1>

            <div className={styles.selectorViewport}>
              <button
                type="button"
                className={styles.selectorPrevious}
                style={{ display: selectorScrolled ? undefined : "none" }}
                aria-label="Show previous electrical services"
                onClick={() => document.getElementById("electrical-service-selector")?.scrollBy({ left: -320, behavior: "smooth" })}
              >
                <span aria-hidden="true">{"\u2190"}</span>
              </button>

              <nav
                id="electrical-service-selector"
                className={styles.selector}
                aria-label="Select an electrical service"
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
                      <img loading="lazy" decoding="async"
                        src={serviceDisplaySource(`/electrical-works/${serviceImages[service.id]}`)}
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
                aria-label="Show more electrical services"
                onClick={() => document.getElementById("electrical-service-selector")?.scrollBy({ left: 320, behavior: "smooth" })}
              >
                <span aria-hidden="true">{"\u2192"}</span>
              </button>
            </div>

            {services.map((service) => (
              <section className={styles.serviceGroup} id={service.id} key={service.id}>
                <h2>{service.title}</h2>
                <div className={styles.banner} aria-hidden="true">
                  <img loading="lazy" decoding="async"
                    src={`/electrical-works/${serviceImages[service.id]}`}
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
                      {service.id === "electrical-installation"
                        ? "Choose installation jobs"
                        : service.survey
                          ? `Site survey ${money(service.price)}`
                          : `Starts at ${money(service.price)}`}
                    </strong>
                  </div>
                  {quantityServices.includes(service.id) ? (
                    selected(service.id) ? (
                      <div className={styles.directQuantity} aria-label={`${service.title} quantity`}>
                        <button type="button" aria-label={`Remove one ${service.title}`} onClick={() => changeDirectQuantity(service, -1)}>-</button>
                        <span>{directCounts[service.id] || 1}</span>
                        <button type="button" aria-label={`Add one ${service.title}`} onClick={() => changeDirectQuantity(service, 1)}>+</button>
                      </div>
                    ) : (
                      <button className={styles.addButton} type="button" onClick={() => changeDirectQuantity(service, 1)}>Add</button>
                    )
                  ) : (
                    <button
                      className={styles.addButton}
                      type="button"
                      onClick={() => service.id === "electrical-installation"
                        ? openDetails(service)
                        : toggleDirect(service)}
                      aria-label={`Add ${service.title}`}
                    >
                      Add
                    </button>
                  )}
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
            aria-labelledby="electrical-modal-title"
          >
            <header className={styles.modalHeader}>
              <div>
                <h2 id="electrical-modal-title">{active.title}</h2>
                <p>{active.survey
                  ? `Site survey ${money(active.price)}`
                  : active.id === "electrical-installation"
                    ? "Choose the installation jobs you need"
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
              {active.id === "electrical-installation" && (
                <section aria-label="Choose electrical installations">
                  <h3>Choose your requirements</h3>
                  <div className={styles.options}>
                    {options.map((option) => {
                      const count = quantities[option.id] || 0;
                      return (
                        <div className={styles.option} key={option.id}>
                          <strong>{option.title}</strong>
                          <span>{money(option.price)} per fitting</span>
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
                  ? "The site survey costs \u20B9500. The final work rate is fixed after checking the property, scope and materials."
                  : "Displayed fitting charges are indicative. Materials, additional wiring and the final scope are confirmed after the site assessment."}
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
                <small>{active.id === "electrical-installation" ? "Selected jobs total" : active.survey ? "Site survey" : "Indicative charge"}</small>
                <strong>{active.id === "electrical-installation" ? money(total) : money(active.price)}</strong>
              </div>
              <button
                type="button"
                disabled={active.id === "electrical-installation" && total === 0}
                onClick={() => active.id === "electrical-installation"
                  ? continueInstallation()
                  : toggleDirect(active)}
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

const serviceDisplayImages: Record<string, string> = {
  "/electrical-works/doorbell_video_doorbell_fitting_service_banner.png": "/electrical-works/doorbell_video_doorbell_fitting_service_banner_selector.14ea09212a61.webp",
  "/electrical-works/doorbell_video_doorbell_fitting_service_banner.040231054595.webp": "/electrical-works/doorbell_video_doorbell_fitting_service_banner_selector.14ea09212a61.webp",
  "/electrical-works/electrical_installation_service_banner.png": "/electrical-works/electrical_installation_service_banner_selector.ac7da60235d5.webp",
  "/electrical-works/electrical_installation_service_banner.012f48e48e80.webp": "/electrical-works/electrical_installation_service_banner_selector.ac7da60235d5.webp",
  "/electrical-works/full_house_electrical_wiring_service_banner.png": "/electrical-works/full_house_electrical_wiring_service_banner_selector.933f63953c86.webp",
  "/electrical-works/full_house_electrical_wiring_service_banner.5cd16f2373c9.webp": "/electrical-works/full_house_electrical_wiring_service_banner_selector.933f63953c86.webp",
  "/electrical-works/main_meter_box_wiring_panel_work_service_banner.png": "/electrical-works/main_meter_box_wiring_panel_work_service_banner_selector.a5b56a7d1e51.webp",
  "/electrical-works/main_meter_box_wiring_panel_work_service_banner.66c19f84f8c1.webp": "/electrical-works/main_meter_box_wiring_panel_work_service_banner_selector.a5b56a7d1e51.webp",
  "/electrical-works/smart_switch_automation_setup_service_banner.png": "/electrical-works/smart_switch_automation_setup_service_banner_selector.ed94b142e6b0.webp",
  "/electrical-works/smart_switch_automation_setup_service_banner.2e3291737841.webp": "/electrical-works/smart_switch_automation_setup_service_banner_selector.ed94b142e6b0.webp"
};
function serviceDisplaySource(src: string): string {
  const queryAt = src.indexOf("?");
  const base = queryAt < 0 ? src : src.slice(0, queryAt);
  return serviceDisplayImages[base] ?? src;
}
