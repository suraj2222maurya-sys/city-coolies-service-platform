"use client";

import Image from "next/image";
import { useEffect, useMemo, useState, type CSSProperties } from "react";

import {
  calculatePackersMoversEstimate,
  getPackersMoversDistanceRule,
  PACKERS_MOVERS_CATEGORIES,
  PACKERS_MOVERS_SERVICES,
  type AccessType,
  type InventoryTier,
  type PackingTier,
  type PackersMoversCategory,
} from "@/lib/services/packersMoversCatalog";

import { PackersMoversBookingModal } from "@/components/booking/ServiceBookingModal";

import styles from "./PackersMoversMarketplace.module.css";

function Icon({ name }: { name: string }) {
  const common = { width: 22, height: 22, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: 1.8, strokeLinecap: "round" as const, strokeLinejoin: "round" as const };
  if (name === "home") return <svg {...common}><path d="m3 11 9-8 9 8"/><path d="M5 10v10h14V10M9 20v-6h6v6"/></svg>;
  if (name === "route") return <svg {...common}><circle cx="5" cy="18" r="2"/><circle cx="19" cy="6" r="2"/><path d="M7 18h3a3 3 0 0 0 3-3v-2a3 3 0 0 1 3-3h1"/></svg>;
  if (name === "building") return <svg {...common}><path d="M4 21V4h10v17M14 9h6v12M7 8h3M7 12h3M7 16h3M17 13h1M17 17h1M2 21h20"/></svg>;
  if (name === "bike") return <svg {...common}><circle cx="5" cy="17" r="3"/><circle cx="19" cy="17" r="3"/><path d="m5 17 4-8h4l2 4M8 11h7M13 7h3"/></svg>;
  if (name === "box" || name === "package") return <svg {...common}><path d="m12 3 8 4-8 4-8-4 8-4Z"/><path d="m4 7 8 4 8-4v10l-8 4-8-4V7Z"/><path d="M12 11v10"/></svg>;
  if (name === "pin") return <svg {...common}><path d="M20 10c0 5-8 11-8 11S4 15 4 10a8 8 0 1 1 16 0Z"/><circle cx="12" cy="10" r="2.5"/></svg>;
  if (name === "calendar") return <svg {...common}><rect x="3" y="5" width="18" height="16" rx="2"/><path d="M16 3v4M8 3v4M3 10h18"/></svg>;
  if (name === "lock") return <svg {...common}><rect x="5" y="10" width="14" height="11" rx="2"/><path d="M8 10V7a4 4 0 0 1 8 0v3M12 14v3"/></svg>;
  if (name === "target") return <svg {...common}><circle cx="12" cy="12" r="8"/><circle cx="12" cy="12" r="3"/><path d="M12 2v2M22 12h-2M12 22v-2M2 12h2"/></svg>;
  if (name === "clipboard") return <svg {...common}><rect x="5" y="4" width="14" height="17" rx="2"/><path d="M9 4V2h6v2M9 9h6M9 13h6M9 17h4"/></svg>;
  if (name === "shield") return <svg {...common}><path d="M12 22s8-4 8-11V5l-8-3-8 3v6c0 7 8 11 8 11Z"/><path d="m9 12 2 2 4-4"/></svg>;
  if (name === "grid") return <svg {...common}><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/></svg>;
  return <svg {...common}><path d="M3 12h18M12 3v18"/></svg>;
}
export default function PackersMoversMarketplace() {
  const [category, setCategory] = useState<PackersMoversCategory>("all");
  const [serviceId, setServiceId] = useState("");
  const [distanceKm, setDistanceKm] = useState(5);
  const [inventoryTier, setInventoryTier] = useState<InventoryTier>("standard");
  const [packingTier, setPackingTier] = useState<PackingTier>("basic");
  const [accessType, setAccessType] = useState<AccessType>("lift");
  const [customizeOpen, setCustomizeOpen] = useState(false);

  useEffect(() => {
    const nodes = document.querySelectorAll<HTMLElement>("[data-reveal]");
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) entry.target.setAttribute("data-visible", "true");
      });
    }, { threshold: 0.08, rootMargin: "0px 0px -35px" });
    nodes.forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, []);

  const filtered = useMemo(() => category === "all" ? PACKERS_MOVERS_SERVICES : PACKERS_MOVERS_SERVICES.filter((service) => service.category === category), [category]);
  const estimate = useMemo(() => calculatePackersMoversEstimate({ serviceId, distanceKm, inventoryTier, packingTier, accessType }), [serviceId, distanceKm, inventoryTier, packingTier, accessType]);
const distanceOptions = [5, 10, 15, 20, 25, 30, 40, 50, 75, 100, 150, 200, 300, 500, 750, 1000, 1500, 2000, 2500, 3000];

  function selectService(id: string) {
    setServiceId(id);
    setDistanceKm(5);
    setInventoryTier("standard");
    setPackingTier("basic");
    setAccessType("lift");
    window.setTimeout(() => document.getElementById("move-estimate")?.scrollIntoView({ behavior: "smooth", block: "nearest" }), 40);
  }


  return (
    <main className={styles.page}>
      <section className={styles.hero} aria-label="City Coolies Packers and Movers">
        <Image src="/city-coolies-packers-movers-hero-v2.webp" alt="City Coolies professional packers and movers" fill priority sizes="100vw" className={styles.heroImage} />
        <div className={styles.heroShade} />
        <div className={styles.heroContent}>
          <nav className={styles.breadcrumb} aria-label="Breadcrumb"><a href="/">Home</a><span>›</span><a href="/services">Services</a><span>›</span><strong>Packers &amp; Movers</strong></nav>
          <div className={styles.brandLockup}><Image src="/city-coolies-packers-movers-icon.png" alt="City Coolies Packers and Movers" width={47} height={80} className={styles.brandIcon}/><strong>CITY<br/>COOLIES<small>PACKERS & MOVERS</small></strong></div>
          <h1><span>Moving made simple.</span></h1>
          <p className={styles.heroText}>Transparent pricing. Verified professionals.</p>
          <div className={styles.trustRow}>
            <span><Icon name="shield" /> Verified Crew</span>
            <span><Icon name="box" /> Digital Inventory</span>
            <span><Icon name="package" /> Sealed Quote</span>
            <span><Icon name="shield" /> Damage Protection</span>
          </div>
        </div>
      </section>

      <section className={styles.marketGrid} data-reveal>
        <aside className={styles.categories}>
          <h2>Move Categories</h2>
          {PACKERS_MOVERS_CATEGORIES.map((item) => <button key={item.id} type="button" className={category === item.id ? styles.activeCategory : ""} onClick={() => setCategory(item.id)}><Icon name={item.icon}/><span>{item.label}</span></button>)}
        </aside>

        <div className={styles.catalog}>
          <div className={styles.catalogHead}><div><p>PROFESSIONAL MOVING SOLUTIONS</p><h2>{PACKERS_MOVERS_CATEGORIES.find((item) => item.id === category)?.label}</h2></div><span>Verified crew · Transparent rates</span></div>
          <div className={styles.cards}>
            {filtered.map((service, index) => <article key={service.id} className={`${styles.card} ${serviceId === service.id ? styles.selectedCard : ""}`} data-reveal style={{ "--delay": `${Math.min(index, 11) * 38}ms` } as CSSProperties}>
              <div className={styles.cardMedia}><Image src={service.image} alt={service.name} fill priority={index < 4} sizes="(max-width: 700px) 100vw, 280px" />{service.popular && <span>Popular</span>}{serviceId === service.id && <b>✓</b>}</div>
              <div className={styles.cardBody}><h3>{service.name}</h3><p className={styles.starting}>{getPackersMoversDistanceRule(service).distanceApplicable ? "Fixed base price · first 5 km" : "Fixed base price"}</p><div className={styles.price}>₹{service.basePrice.toLocaleString("en-IN")} <small>/ {service.unit}</small></div><ul>{service.details.map((detail) => <li key={detail}>{detail}</li>)}</ul><button type="button" onClick={() => serviceId === service.id ? setServiceId("") : selectService(service.id)}>{serviceId === service.id ? "Remove Service" : "Add Service"}</button></div>
            </article>)}
          </div>
        </div>

        <aside className={styles.summary} id="move-estimate">
          <h2>Your Move Estimate</h2>
          {!estimate && <div className={styles.emptyEstimate}><Icon name="box"/><strong>Choose a moving service</strong><span>Select any service card to calculate and confirm your move.</span></div>}
          {estimate && <>
            <div className={styles.summaryService}><Image src={estimate.service.image} alt="" width={92} height={66}/><div><strong>{estimate.service.name}</strong><span>{estimate.distanceApplicable ? `${estimate.distanceKm} km` : "No distance charge"} · {inventoryTier} inventory</span></div></div>
            <div className={styles.inventoryList}><div><strong>Selected details</strong><button type="button" onClick={() => setCustomizeOpen(true)}>Customize</button></div><ul><li>{inventoryTier} inventory</li><li>{packingTier} packing</li><li>{accessType.replaceAll("-", " ")}</li>{estimate.distanceApplicable && <li>{estimate.distanceKm} km distance</li>}</ul></div>
            <h3>Price Breakdown</h3>
            <dl><div><dt>{estimate.distanceApplicable ? `Base service (first ${estimate.includedKm} km)` : "Base service"}</dt><dd>₹{estimate.baseCharge.toLocaleString("en-IN")}</dd></div>{estimate.distanceApplicable && <div><dt>Extra distance ({Math.max(0, estimate.distanceKm - estimate.includedKm)} km × ₹{estimate.extraKmRate})</dt><dd>₹{estimate.distanceCharge.toLocaleString("en-IN")}</dd></div>}<div><dt>Packing charges</dt><dd>₹{estimate.packingCharge.toLocaleString("en-IN")}</dd></div><div><dt>Floor / lift charges</dt><dd>₹{estimate.floorCharge.toLocaleString("en-IN")}</dd></div><div className={styles.free}><dt>Booking charge</dt><dd>FREE</dd></div></dl>
            <div className={styles.total}><span>Estimated Total</span><strong>₹{estimate.total.toLocaleString("en-IN")}</strong></div>
            <p className={styles.quoteNote}>No booking fee. Final sealed quote is confirmed after inventory details are verified.</p>
            <button className={styles.customizeButton} type="button" onClick={() => setCustomizeOpen(true)}>Customize Move</button>
            <PackersMoversBookingModal
              serviceId={estimate.service.id}
              serviceName={estimate.service.name}
              estimatedTotal={estimate.total}
              distanceKm={distanceKm}
              inventoryTier={inventoryTier}
              packingTier={packingTier}
              accessType={accessType}
              triggerLabel="Book Now"
              triggerClassName={styles.bookButton}
            />
          </>}
          <div className={styles.secureStrip} aria-label="City Coolies booking protections"><span><i><Icon name="lock"/></i><b>Digital Inventory<br/>Locked</b></span><span><i><Icon name="target"/></i><b>OTP Verified<br/>Crew</b></span><span><i><Icon name="clipboard"/></i><b>Sealed<br/>Quote</b></span><span><i><Icon name="shield"/></i><b>No Crew<br/>Cash Payment</b></span></div>
        </aside>
      </section>

      <section
        className={styles.steps}
        data-reveal
        aria-label="How City Coolies Packers and Movers works"
      >
        <article className={styles.stepItem}>
          <span className={styles.stepIcon}>
            <Icon name="clipboard" />
          </span>
          <span className={styles.stepNumber}>1</span>
          <span className={styles.stepCopy}>
            <strong>Select Inventory</strong>
            <small>Add your items & details</small>
          </span>
          <span className={styles.stepArrow} aria-hidden="true">›</span>
        </article>

        <article className={styles.stepItem}>
          <span className={styles.stepIcon}>
            <Icon name="target" />
          </span>
          <span className={styles.stepNumber}>2</span>
          <span className={styles.stepCopy}>
            <strong>Get Estimate</strong>
            <small>Transparent pricing</small>
          </span>
          <span className={styles.stepArrow} aria-hidden="true">›</span>
        </article>

        <article className={styles.stepItem}>
          <span className={styles.stepIcon}>
            <Icon name="lock" />
          </span>
          <span className={styles.stepNumber}>3</span>
          <span className={styles.stepCopy}>
            <strong>Secure Payment</strong>
            <small>Pay 50% advance online</small>
          </span>
          <span className={styles.stepArrow} aria-hidden="true">›</span>
        </article>

        <article className={styles.stepItem}>
          <span className={styles.stepIcon}>
            <Icon name="route" />
          </span>
          <span className={styles.stepNumber}>4</span>
          <span className={styles.stepCopy}>
            <strong>Move Tracking</strong>
            <small>Receive move updates</small>
          </span>
          <span className={styles.stepArrow} aria-hidden="true">›</span>
        </article>

        <article className={styles.stepItem}>
          <span className={styles.stepIcon}>
            <Icon name="shield" />
          </span>
          <span className={styles.stepNumber}>5</span>
          <span className={styles.stepCopy}>
            <strong>Safe Delivery</strong>
            <small>Damage-protected move</small>
          </span>
        </article>
      </section>

      {customizeOpen && estimate && <div className={styles.modalBackdrop} role="presentation" onMouseDown={(e) => { if (e.currentTarget === e.target) setCustomizeOpen(false); }}><section className={styles.modal} role="dialog" aria-modal="true" aria-label="Customize move"><button className={styles.modalClose} type="button" onClick={() => setCustomizeOpen(false)}>×</button><p className={styles.modalEyebrow}>CUSTOMIZE YOUR MOVE</p><h2>{estimate.service.name}</h2><div className={styles.customizeGrid}>{estimate.distanceApplicable && <label>Transport distance<select value={distanceKm} onChange={(e) => setDistanceKm(Number(e.target.value))}>{distanceOptions.map((km) => <option key={km} value={km}>{km} km {km === 5 ? "(included)" : ""}</option>)}</select><small>Extra ₹{estimate.extraKmRate}/km after first 5 km</small></label>}<label>Inventory size<select value={inventoryTier} onChange={(e) => setInventoryTier(e.target.value as InventoryTier)}><option value="light">Light inventory</option><option value="standard">Standard inventory</option><option value="heavy">Heavy inventory</option></select></label><label>Packing protection<select value={packingTier} onChange={(e) => setPackingTier(e.target.value as PackingTier)}><option value="basic">Basic protection</option><option value="standard">Standard packing</option><option value="premium">Premium fragile packing</option></select></label><label>Floor & lift<select value={accessType} onChange={(e) => setAccessType(e.target.value as AccessType)}><option value="lift">Lift available / ground floor</option><option value="stairs-1">1st floor, no lift</option><option value="stairs-2">2nd floor, no lift</option><option value="stairs-3">3rd floor, no lift</option><option value="stairs-4plus">4th+ floor, no lift</option></select></label></div><div className={styles.customizeTotal}><span>Updated estimate</span><strong>₹{estimate.total.toLocaleString("en-IN")}</strong></div><button className={styles.saveCustomization} type="button" onClick={() => setCustomizeOpen(false)}>Save Customization</button></section></div>}

    </main>
  );
}
