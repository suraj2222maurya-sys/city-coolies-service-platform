"use client";

import Image from "next/image";
import { useMemo, useState, type ReactNode } from "react";

import ServiceBookingModal from "@/components/booking/ServiceBookingModal";
import {
  PAINTING_CATEGORIES,
  PAINTING_SERVICES,
  type PaintingCategory,
  type PaintingService,
} from "@/lib/services/paintingCatalog";

import styles from "./PaintingWorksCommerce.module.css";

type QuickFilter = "All Services" | "Most Popular" | "Interior" | "Exterior" | "Decorative" | "Putty & Primer" | "More";

const QUICK_FILTERS: readonly QuickFilter[] = ["All Services", "Most Popular", "Interior", "Exterior", "Decorative", "Putty & Primer", "More"];

const ALL_SERVICES_ICON = <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 14.5h7.5v-6H4z"/><path d="M11.5 10h3.2a2 2 0 0 1 2 2v1.2"/><path d="M16.7 13.2h2.1v3.1h-2.1zM17.75 16.3V21"/><path d="M6.2 6.3c1.7-2.2 4.2-3.3 6.9-2.8 3.6.7 6.1 4.1 5.6 7.7"/></svg>;

const CATEGORY_ICONS: Record<PaintingCategory, ReactNode> = {
  "Interior Painting": <svg viewBox="0 0 24 24" aria-hidden="true"><path d="m3.5 11.2 8.5-7 8.5 7"/><path d="M5.5 10v10h13V10M9 20v-6h6v6"/><path d="M8 9.5h8"/></svg>,
  "Exterior Painting": <svg viewBox="0 0 24 24" aria-hidden="true"><path d="m3 11 9-7.2L21 11"/><path d="M5 9.5V20h14V9.5"/><path d="M8 15c2-1.2 5.8-1.2 8 0M9 12h6"/></svg>,
  "Decorative Painting": <svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="10" cy="11" r="6.5"/><circle cx="10" cy="11" r="2.6"/><path d="m14.8 15.8 4.8 4.2M17.2 18.2l2.8-2.8"/><path d="M10 4.5V7M3.5 11H6M10 15v2.5"/></svg>,
  "Putty & Primer": <svg viewBox="0 0 24 24" aria-hidden="true"><path d="m4 15 9.5-9.5 5 5L9 20H4z"/><path d="m12 7 5 5M4 15h5v5"/><path d="M15.5 4 20 8.5"/></svg>,
  Waterproofing: <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 3.2s6.5 6.7 6.5 11.1A6.5 6.5 0 0 1 5.5 14.3C5.5 9.9 12 3.2 12 3.2Z"/><path d="M8.5 14.2a3.6 3.6 0 0 0 3.6 3.6"/><path d="m15.3 7.8 2.2-2.2"/></svg>,
  "Wood & Metal": <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M7.2 3.5v17M16.8 3.5v17M4 7h6.4M13.6 17H20"/><circle cx="7.2" cy="12" r="2.2"/><circle cx="16.8" cy="12" r="2.2"/><path d="M9.4 12h5.2"/></svg>,
  "Pipe & Utility Painting": <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 5h7v4H8v6h8v4h4"/><path d="M11 4v6M16 14v6"/><circle cx="6" cy="5" r="2"/><circle cx="20" cy="19" r="2"/></svg>,
  "Marking & Safety": <svg viewBox="0 0 24 24" aria-hidden="true"><path d="m5 20 6-16h2l6 16"/><path d="M7.2 14h9.6M9 9h6M4 20h16"/><path d="M12 5v3M12 11v2"/></svg>,
};

const BOOKING_STEPS: ReadonlyArray<{ icon: ReactNode; title: string; text: string }> = [
  { icon: <svg viewBox="0 0 32 32" aria-hidden="true"><path d="M3.5 5.5h3l2.2 14.2h15.7l3-10.2H8.1"/><path d="M10.2 13h15.9M11.1 17h13.8"/><circle cx="11.5" cy="24.8" r="2.1"/><circle cx="22.4" cy="24.8" r="2.1"/><path d="M13.8 8.4V5.8h6v6h-3"/></svg>, title: "Select Services", text: "Browse & add services you need" },
  { icon: <svg viewBox="0 0 32 32" aria-hidden="true"><rect x="5" y="7.5" width="22" height="20" rx="3"/><path d="M5 13h22M10.5 4.5v6M21.5 4.5v6"/><path d="M10 17h4v4h-4zM18 17h4v4h-4zM10 23h4"/></svg>, title: "Choose Schedule", text: "Pick a convenient date & time" },
  { icon: <svg viewBox="0 0 32 32" aria-hidden="true"><circle cx="16" cy="16" r="12"/><path d="m9.8 16.2 4.2 4.3 8.7-10"/><path d="M16 4v2M28 16h-2M16 28v-2M4 16h2"/></svg>, title: "Confirm Booking", text: "Pay & get confirmation instantly" },
  { icon: <svg viewBox="0 0 32 32" aria-hidden="true"><circle cx="16" cy="8" r="3.5"/><path d="M10.2 27.5h11.6M12 27.5v-7.2l-2.2-4.2 3.5-4.2h5.4l3.5 4.2-2.2 4.2v7.2"/><path d="m13.3 12 2.7 4 2.7-4M13 21h6"/><path d="M23.7 8.5h4v3h-4zM25.7 11.5v5.5"/></svg>, title: "We Do the Work", text: "Our experts get the job done right" },
  { icon: <svg viewBox="0 0 32 32" aria-hidden="true"><path d="M8 15.5v-4a4 4 0 0 1 8 0v4M16 15.5v-4a4 4 0 0 1 8 0v4"/><path d="M6 15.5h20v8H6zM8.5 23.5v3M23.5 23.5v3M10 19.5h12"/><path d="M24.8 5.5c1.8.5 2.8 1.7 3.2 3.5"/></svg>, title: "You Relax", text: "Enjoy a beautifully painted space" },
];

function money(value: number) {
  return `₹${value.toLocaleString("en-IN")}`;
}

function matchesQuickFilter(service: PaintingService, filter: QuickFilter) {
  if (filter === "All Services") return true;
  if (filter === "Most Popular") return Boolean(service.popular);
  if (filter === "Interior") return service.category === "Interior Painting";
  if (filter === "Exterior") return service.category === "Exterior Painting";
  if (filter === "Decorative") return service.category === "Decorative Painting";
  if (filter === "Putty & Primer") return service.category === "Putty & Primer";
  return ["Waterproofing", "Wood & Metal", "Pipe & Utility Painting", "Marking & Safety"].includes(service.category);
}

export default function PaintingWorksCommerce() {
  const [activeCategory, setActiveCategory] = useState<PaintingCategory | "All">("All");
  const [quickFilter, setQuickFilter] = useState<QuickFilter>("All Services");
  const [query, setQuery] = useState("");
  const [cart, setCart] = useState<Record<string, number>>({});
  const [mobileCartOpen, setMobileCartOpen] = useState(false);

  const serviceMap = useMemo(() => new Map(PAINTING_SERVICES.map((service) => [service.id, service])), []);
  const visibleServices = useMemo(() => {
    const search = query.trim().toLowerCase();
    return PAINTING_SERVICES.filter((service) => {
      const categoryMatch = activeCategory === "All" || service.category === activeCategory;
      const filterMatch = matchesQuickFilter(service, quickFilter);
      const searchMatch = !search || `${service.name} ${service.category} ${service.unit}`.toLowerCase().includes(search);
      return categoryMatch && filterMatch && searchMatch;
    });
  }, [activeCategory, quickFilter, query]);

  const cartEntries = Object.entries(cart).flatMap(([id, quantity]) => {
    const service = serviceMap.get(id);
    return service && quantity > 0 ? [{ service, quantity }] : [];
  });
  const payableNow = cartEntries.length > 0 ? 500 : 0;
  const bookingItems = cartEntries.map(({ service, quantity }) => ({
    id: service.id,
    name: service.name,
    quantity,
    unitPrice: 0,
    lineTotal: 0,
  }));

  function setSelected(service: PaintingService, selected: boolean) {
    setCart((current) => {
      const updated = { ...current };
      if (selected) updated[service.id] = 1;
      else delete updated[service.id];
      return updated;
    });
  }

  function addService(service: PaintingService) {
    setSelected(service, true);
  }

  function selectCategory(category: PaintingCategory | "All") {
    setActiveCategory(category);
    setQuickFilter("All Services");
  }

  function ServiceCard({ service }: { service: PaintingService }) {
    const quantity = cart[service.id] ?? 0;
    return (
      <article className={styles.serviceCard}>
        <div className={styles.serviceImage}>
          <Image src={service.image} alt={service.name} fill sizes="(max-width: 700px) 44vw, 170px" />
        </div>
        <div className={styles.cardContent}>
          <h3>{service.name}</h3>
          <p><strong>Starting {money(service.price)}</strong><span>/ {service.unit}</span></p>
          {quantity > 0 ? <button className={styles.selectedButton} type="button" onClick={() => setSelected(service, false)}>Selected ✓</button> : (
            <button className={styles.addButton} type="button" onClick={() => addService(service)}>Add Service</button>
          )}
        </div>
      </article>
    );
  }

  function BookingPanel() {
    return (
      <div className={styles.bookingPanel}>
        <header className={styles.bookingHeader}>
          <h2>Your Booking {cartEntries.length > 0 && <span>({cartEntries.length})</span>}</h2>
          {cartEntries.length > 0 && <button type="button" onClick={() => setCart({})}>Clear All</button>}
        </header>
        <div className={styles.bookingItems}>
          {cartEntries.length === 0 ? (
            <div className={styles.emptyBooking}><b>Choose a painting service</b><p>Your selected work will appear here.</p></div>
          ) : cartEntries.map(({ service }) => (
            <article className={styles.bookingItem} key={service.id}>
              <div className={styles.bookingImage}><Image src={service.image} alt="" fill sizes="66px" /></div>
              <div className={styles.bookingDetails}>
                <strong>{service.name}</strong>
                <span>Starting {money(service.price)} / {service.unit}</span>
                <small>Final rate after site measurement</small>
              </div>
              <button className={styles.deleteButton} type="button" onClick={() => setSelected(service, false)} aria-label={`Remove ${service.name}`}>×</button>
            </article>
          ))}
        </div>
        <div className={styles.totals}>
          <p><span>Final work quotation</span><b>After inspection</b></p>
          <p className={styles.grandTotal}><span>Site Survey & Booking Fee</span><b>{money(payableNow)}</b></p>
          <small className={styles.adjustmentNote}>₹500 will be adjusted in the final bill after work confirmation.</small>
        </div>
        {cartEntries.length === 0 ? (
          <button className={styles.disabledBooking} type="button" disabled>Continue to Booking →</button>
        ) : (
          <div className={styles.bookingTrigger}>
            <ServiceBookingModal
              packageId="painting-site-survey"
              serviceName="Painting Works - Site Survey"
              originalPrice={500}
              offerPrice={500}
              triggerLabel="Pay ₹500 & Book Site Survey"
              customServices={bookingItems}
              fullPayment
            />
          </div>
        )}
        <div className={styles.assurances}>
          <p>✓ 100% Secure Booking</p><p>✓ No Hidden Charges</p><p>✓ Easy Reschedule</p><p>✓ On-time Service</p><p>✓ Satisfaction Guarantee</p>
        </div>
        <div className={styles.paymentCard}>
          <div className={styles.paymentTrustRow}>
            <span className={styles.paymentShield} aria-hidden="true"><svg viewBox="0 0 32 38"><path className={styles.paymentShieldFill} d="M16 2 29 6.8v10.1c0 8.6-5.3 15.5-13 19.1C8.3 32.4 3 25.5 3 16.9V6.8z"/><path className={styles.paymentShieldLine} d="M16 2 29 6.8v10.1c0 8.6-5.3 15.5-13 19.1C8.3 32.4 3 25.5 3 16.9V6.8z"/><path className={styles.paymentShieldCheck} d="m9.8 18.5 4.1 4.1 8.5-9.2"/></svg></span>
            <span className={styles.paymentCopy}><b>Secure &amp; Safe Payments</b><small>100% secure payments via<br/>SSL &amp; trusted gateways.</small></span>
          </div>
          <div className={styles.paymentLogos} aria-label="Accepted payment methods">
            <span className={styles.visaLogo} aria-label="Visa">VISA</span>
            <span className={styles.mastercardLogo} aria-label="Mastercard"><i/><i/><em/></span>
            <span className={styles.upiLogo} aria-label="UPI">UPI<i>›</i><em>›</em></span>
            <span className={styles.rupayLogo} aria-label="RuPay">RuPay<i>›</i><em>›</em></span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <section className={styles.section} aria-label="Painting services catalogue">
      <div className={styles.layout}>
        <aside className={styles.categoryRail}>
          <h2>Categories</h2>
          <button className={activeCategory === "All" ? styles.activeCategory : ""} type="button" onClick={() => selectCategory("All")}><i>{ALL_SERVICES_ICON}</i><span>All Painting Services</span></button>
          {PAINTING_CATEGORIES.map((category) => (
            <button className={activeCategory === category ? styles.activeCategory : ""} key={category} type="button" onClick={() => selectCategory(category)}><i>{CATEGORY_ICONS[category]}</i><span>{category}</span></button>
          ))}
          <div className={styles.trustedCard}><span className={styles.trustedIcon} aria-hidden="true"><svg viewBox="0 0 40 44"><path className={styles.shieldFill} d="M20 2.5 35 8v11.2c0 10-6.1 18.1-15 22.3-8.9-4.2-15-12.3-15-22.3V8z"/><path className={styles.shieldLine} d="M20 2.5 35 8v11.2c0 10-6.1 18.1-15 22.3-8.9-4.2-15-12.3-15-22.3V8z"/><path className={styles.shieldCheck} d="m12.8 21.4 4.7 4.8 10-11"/></svg></span><div><strong>Trusted Painters</strong><span>Background verified & highly experienced</span></div></div>
        </aside>

        <div className={styles.catalog}>
          <label className={styles.search}><span>⌕</span><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search painting services..." /></label>
          <nav className={styles.quickFilters}>
            {QUICK_FILTERS.map((filter) => <button className={quickFilter === filter ? styles.activeFilter : ""} key={filter} type="button" onClick={() => { setQuickFilter(filter); setActiveCategory("All"); }}>{filter}</button>)}
          </nav>
          {visibleServices.length ? (
            <section className={styles.serviceGroup}>
              <h2>{activeCategory === "All" ? "Painting Services" : activeCategory}</h2>
              <div className={styles.servicesGrid}>{visibleServices.map((service) => <ServiceCard service={service} key={service.id} />)}</div>
            </section>
          ) : <div className={styles.noResults}><b>No matching service found</b><span>Try another service name or category.</span></div>}
        </div>

        <aside className={styles.desktopBooking}><BookingPanel /></aside>
      </div>

      <div className={styles.howItWorks}>
        {BOOKING_STEPS.map(({ icon, title, text }, index) => <div key={title}><i>{icon}</i><span><b>{title}</b><small>{text}</small></span>{index < BOOKING_STEPS.length - 1 && <em>→</em>}</div>)}
      </div>

      <div className={styles.mobileBar}><button type="button" disabled={!cartEntries.length} onClick={() => setMobileCartOpen(true)}><span><b>{cartEntries.length || ""}</b> {cartEntries.length ? "Selected" : "Select a service"}<strong>{cartEntries.length ? "Site Survey ₹500" : ""}</strong></span><em>View Booking →</em></button></div>
      {mobileCartOpen && <div className={styles.mobileOverlay} role="dialog" aria-modal="true"><button className={styles.backdrop} type="button" aria-label="Close booking" onClick={() => setMobileCartOpen(false)} /><div className={styles.mobileSheet}><button className={styles.closeSheet} type="button" onClick={() => setMobileCartOpen(false)}>×</button><BookingPanel /></div></div>}
    </section>
  );
}
