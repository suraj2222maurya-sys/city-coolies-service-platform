"use client";

import { useEffect, useMemo, useState, useSyncExternalStore } from "react";
import FullHomeRightSidebar from "../deep-cleaning/FullHomeRightSidebar";
import { getDeepCleaningCartServerSnapshot, getDeepCleaningCartSnapshot, parseDeepCleaningCartSnapshot, removeDeepCleaningCartItem, subscribeDeepCleaningCart, upsertDeepCleaningCartItem } from "../deep-cleaning/deepCleaningCart";
import styles from "./PestControlMarketplace.module.css";

type Service = { id: string; title: string; price: number; label: string; description: string; includes: readonly string[]; process: readonly string[] };
const services: readonly Service[] = [
  { id: "full-home-pest-control", title: "Full Home Pest Control", price: 500, label: "Site survey", description: "A property-wide inspection for the pests present in rooms, kitchen, bathrooms and outdoor access points. The treatment and final quote are chosen after the visit.", includes: ["Inspect active pest areas and entry points", "Review room count, property size and infestation", "Plan pest-specific treatment and follow-up"], process: ["Inspect rooms, kitchens, bathrooms and likely entry points", "Identify the pests and assess infestation and safety needs", "Agree treatment, visits and final price after survey", "Apply approved treatment and explain re-entry and prevention steps"] },
  { id: "cockroach-control", title: "Cockroach Control", price: 999, label: "Starting treatment price", description: "Targeted cockroach treatment for a kitchen and bathroom. The shown amount is an indicative starting price; area, preparation and repeat visits are confirmed before work.", includes: ["Inspect hiding spots and activity", "Discuss utensil removal and preparation", "Targeted application and follow-up plan"], process: ["Check kitchen, bathroom and hiding areas", "Ask the customer to clear utensils and keep children and pets away from treatment", "Apply the agreed treatment following product instructions", "Explain drying time and whether a second visit is needed"] },
  { id: "apartment-pest-control", title: "Apartment Pest Control", price: 1549, label: "Starting treatment price", description: "Apartment pest treatment starting with cockroach and ant-prone areas. Other pests or larger scopes require a revised quote after inspection.", includes: ["Inspect kitchen, bathrooms and affected rooms", "Choose targeted treatment for confirmed pests", "Discuss revisit and prevention needs"], process: ["Inspect the apartment and confirm the pest type", "Agree access, treatment scope and the final quote", "Apply targeted treatment under product guidance", "Explain safe re-entry, follow-up and prevention"] },
  { id: "termite-control", title: "Termite Control", price: 500, label: "Site survey", description: "Inspect termite signs in timber, walls and adjoining ground before proposing the appropriate treatment. The treatment rate is confirmed after the survey.", includes: ["Identify visible termite signs", "Assess affected timber and structures", "Propose property-specific treatment scope"], process: ["Inspect damaged areas and possible entry points", "Map infestation and assess access and building type", "Confirm appropriate method, safety measures and final price", "Carry out approved treatment and schedule monitoring where needed"] },
  { id: "bed-bug-control", title: "Bed Bug Control", price: 500, label: "Site survey", description: "Inspect sleeping areas and furniture for bed bugs; confirm preparation, rooms and treatment visits before giving the final price.", includes: ["Inspect mattresses, bed frames and furniture seams", "Assess affected rooms and preparation needs", "Plan treatment and repeat inspection"], process: ["Inspect suspected harbourage and confirm activity", "Explain laundry, access and occupant preparation", "Confirm treatment plan, visits and final quote", "Treat agreed areas and explain follow-up checks"] },
  { id: "rodent-control", title: "Rodent Control", price: 500, label: "Site survey", description: "Inspection for rats and mice across homes, shops and storage spaces, with a plan for entry-point control and monitoring.", includes: ["Look for droppings and entry points", "Review food and waste storage", "Plan traps or other suitable control and monitoring"], process: ["Inspect activity, access routes and likely nesting areas", "Assess food sources and safe placement options", "Agree exclusion, control plan and final quote", "Install approved controls and arrange follow-up monitoring"] },
  { id: "commercial-pest-control", title: "Commercial Pest Control", price: 500, label: "Site survey", description: "Site-specific pest management for offices, shops, kitchens, warehouses and other commercial spaces. Final scope and price follow inspection.", includes: ["Inspect site and operational constraints", "Identify pests, hygiene risks and entry points", "Plan treatment, monitoring and service frequency"], process: ["Survey premises and document pest activity", "Review access, food areas, staff and operating hours", "Agree the treatment programme and final quotation", "Treat approved zones and document follow-up and prevention"] },
];
const money = (amount: number) => `₹${amount.toLocaleString("en-IN")}`;
const serviceImages: Record<string, string> = {
  "full-home-pest-control": "full_home_pest_control_service_banner.610c854393c2.webp",
  "cockroach-control": "cockroach_control_service_banner.d87fa74c3558.webp",
  "apartment-pest-control": "apartment_pest_control_service_banner.c318df736c22.webp",
  "termite-control": "termite_control_service_banner.ea1789cc754d.webp",
  "bed-bug-control": "bed_bug_control_service_banner.51e5b8929e56.webp",
  "rodent-control": "rodent_control_service_banner.319817f4b9e9.webp",
  "commercial-pest-control": "commercial_pest_control_service_banner.6e10fba871b7.webp",
};
const cartId = (id: string) => `pest:${id}`;

export default function PestControlMarketplace() {
  const [active, setActive] = useState<Service | null>(null);
  const [selectorScrolled, setSelectorScrolled] = useState(false);
  const snapshot = useSyncExternalStore(subscribeDeepCleaningCart, getDeepCleaningCartSnapshot, getDeepCleaningCartServerSnapshot);
  const cartItems = useMemo(() => parseDeepCleaningCartSnapshot(snapshot), [snapshot]);
  const selected = (id: string) => cartItems.some((item) => item.id === cartId(id));

  useEffect(() => {
    if (!active) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onEscape = (event: KeyboardEvent) => { if (event.key === "Escape") setActive(null); };
    window.addEventListener("keydown", onEscape);
    return () => { document.body.style.overflow = previous; window.removeEventListener("keydown", onEscape); };
  }, [active]);

  function toggle(service: Service) {
    if (selected(service.id)) removeDeepCleaningCartItem(cartId(service.id));
    else {
      upsertDeepCleaningCartItem({ id: cartId(service.id), serviceTitle: service.title, optionLabel: service.label, price: service.price, priceLabel: money(service.price), duration: service.label === "Site survey" ? "Treatment price confirmed after the site survey" : "Starting price; final treatment scope confirmed before work" });
      window.dispatchEvent(new Event("citycoolies:deep-cleaning-cart-added"));
    }
    setActive(null);
  }

  return <section className={styles.section}>
    <div className={styles.container}><div className={styles.columns}>
      <main className={styles.main}>
        <h1 className={styles.eyebrow}>Pest Control</h1>
        <div className={styles.selectorViewport}>
          <button type="button" className={styles.selectorPrevious} style={{ display: selectorScrolled ? undefined : "none" }} aria-label="Previous pest services" onClick={() => document.getElementById("pest-service-selector")?.scrollBy({left:-320,behavior:"smooth"})}>←</button>
          <nav className={styles.selector} id="pest-service-selector" aria-label="Choose pest service" onScroll={(event) => setSelectorScrolled(event.currentTarget.scrollLeft > 4)}>
            {services.map((service) => <button key={service.id} type="button" className={styles.selectorItem} onClick={() => document.getElementById(service.id)?.scrollIntoView({behavior:"smooth",block:"start"})}><span className={styles.thumbnail} aria-hidden="true" style={{overflow:"hidden"}}><img loading="lazy" decoding="async" src={serviceDisplaySource(`/pest-control/${serviceImages[service.id]}`)} alt="" width={100} height={100} style={{display:"block",width:"100%",height:"100%",objectFit:"cover",objectPosition:"center"}} /></span><span className={styles.selectorLabel}>{service.title}</span></button>)}
          </nav>
          <button type="button" className={styles.selectorNext} aria-label="More pest services" onClick={() => document.getElementById("pest-service-selector")?.scrollBy({left:320,behavior:"smooth"})}>→</button>
        </div>
        {services.map((service) => <section key={service.id} id={service.id} className={styles.serviceGroup}>
          <h2>{service.title}</h2><div className={styles.banner} aria-hidden="true"><img loading="lazy" decoding="async" src={`/pest-control/${serviceImages[service.id]}`} alt="" width={1942} height={809} style={{display:"block",width:"100%",height:"100%",objectFit:"contain"}} /></div>
          <div className={styles.serviceRow}><div><h3>{service.title}</h3><div className={styles.rating}><span className={styles.star} aria-hidden="true">★</span><span>4.20</span><span>(sample rating)</span><button type="button" onClick={() => setActive(service)}>View details</button></div><strong>{service.label} {money(service.price)}</strong></div>
            <button type="button" className={styles.addButton} onClick={() => setActive(service)}>Add</button>
          </div>
        </section>)}
      </main><aside className={styles.sidebar}><FullHomeRightSidebar/></aside>
    </div></div>
    {active && <div className={styles.backdrop} onMouseDown={(event) => { if (event.target === event.currentTarget) setActive(null); }}>
      <section className={styles.modal} role="dialog" aria-modal="true" aria-labelledby="pest-modal-title">
        <header className={styles.modalHeader}><div><h2 id="pest-modal-title">{active.title}</h2><p>{active.label} {money(active.price)}</p></div><button type="button" className={styles.closeButton} aria-label="Close details" onClick={() => setActive(null)}>×</button></header>
        <div className={styles.modalBody}>
          <p className={styles.notice}>{active.label === "Site survey" ? `The site survey costs ${money(active.price)}. The final treatment rate is confirmed after inspection, based on the pest, affected area and agreed treatment.` : `Indicative starting rate ${money(active.price)}. The final scope and price are confirmed before treatment based on area and infestation.`}</p>
          <p>{active.description}</p>
          <div className={styles.infoBox}><h3>What the service covers</h3><ul>{active.includes.map((item) => <li key={item}>{item}</li>)}</ul></div>
          <div className={styles.infoBox}><h3>Work process</h3><ol>{active.process.map((step) => <li key={step}>{step}</li>)}</ol></div>
          <div className={styles.reviews}><strong><span className={styles.star}>★</span> 4.20</strong><span>Sample rating · verified customer reviews pending</span>
            {[5,4,3,2,1].map((score,index) => <div className={styles.ratingLine} key={score}><span>{score} ★</span><div><i style={{width:`${[48,29,13,7,3][index]}%`}}/></div><span>{[48,29,13,7,3][index]}%</span></div>)}
          </div>
        </div>
        <footer className={styles.modalFooter}><div><small>{active.label}</small><strong>{money(active.price)}</strong></div><button type="button" onClick={() => selected(active.id) ? setActive(null) : toggle(active)}>Continue</button></footer>
      </section>
    </div>}
  </section>;
}


const serviceDisplayImages: Record<string, string> = {
  "/pest-control/apartment_pest_control_service_banner.png": "/pest-control/apartment_pest_control_service_banner_selector.ddff6bfabb95.webp",
  "/pest-control/apartment_pest_control_service_banner.c318df736c22.webp": "/pest-control/apartment_pest_control_service_banner_selector.ddff6bfabb95.webp",
  "/pest-control/bed_bug_control_service_banner.png": "/pest-control/bed_bug_control_service_banner_selector.5e4c0e0c6222.webp",
  "/pest-control/bed_bug_control_service_banner.51e5b8929e56.webp": "/pest-control/bed_bug_control_service_banner_selector.5e4c0e0c6222.webp",
  "/pest-control/cockroach_control_service_banner.png": "/pest-control/cockroach_control_service_banner_selector.679054c7bcad.webp",
  "/pest-control/cockroach_control_service_banner.d87fa74c3558.webp": "/pest-control/cockroach_control_service_banner_selector.679054c7bcad.webp",
  "/pest-control/commercial_pest_control_service_banner.png": "/pest-control/commercial_pest_control_service_banner_selector.45d9c3944d9d.webp",
  "/pest-control/commercial_pest_control_service_banner.6e10fba871b7.webp": "/pest-control/commercial_pest_control_service_banner_selector.45d9c3944d9d.webp",
  "/pest-control/full_home_pest_control_service_banner.png": "/pest-control/full_home_pest_control_service_banner_selector.915576f406d8.webp",
  "/pest-control/full_home_pest_control_service_banner.610c854393c2.webp": "/pest-control/full_home_pest_control_service_banner_selector.915576f406d8.webp",
  "/pest-control/rodent_control_service_banner.png": "/pest-control/rodent_control_service_banner_selector.73f6ad65cc39.webp",
  "/pest-control/rodent_control_service_banner.319817f4b9e9.webp": "/pest-control/rodent_control_service_banner_selector.73f6ad65cc39.webp",
  "/pest-control/termite_control_service_banner.png": "/pest-control/termite_control_service_banner_selector.57e412f297c5.webp",
  "/pest-control/termite_control_service_banner.ea1789cc754d.webp": "/pest-control/termite_control_service_banner_selector.57e412f297c5.webp"
};
function serviceDisplaySource(src: string): string {
  const queryAt = src.indexOf("?");
  const base = queryAt < 0 ? src : src.slice(0, queryAt);
  return serviceDisplayImages[base] ?? src;
}
