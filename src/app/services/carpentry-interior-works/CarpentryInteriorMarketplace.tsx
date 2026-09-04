"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import type { ComponentType, CSSProperties } from "react";
import {
  FiBox, FiBriefcase, FiCalendar, FiCheckCircle, FiChevronRight, FiClock,
  FiGrid, FiHome, FiLayers, FiMinus, FiPlus, FiShield,
  FiShoppingCart, FiSliders, FiTool, FiTrash2, FiUserCheck,
} from "react-icons/fi";
import ServiceBookingModal from "@/components/booking/ServiceBookingModal";
import {
  CARPENTRY_INTERIOR_CATEGORIES,
  CARPENTRY_INTERIOR_SERVICES,
  PROFESSIONAL_CARPENTER_DAILY_RATE,
  PROFESSIONAL_CARPENTER_LABOUR_ID,
  getCarpentryInteriorRate,
  type CarpentryInteriorCategory,
  type CarpentryInteriorService,
} from "@/lib/services/carpentryInteriorCatalog";
import styles from "./CarpentryInteriorMarketplace.module.css";

type Cart = Record<string, number>;

const ICONS: Record<string, ComponentType<{ "aria-hidden"?: boolean }>> = {
  all: FiGrid, visit: FiUserCheck, repairs: FiTool, installation: FiBox,
  "custom-furniture": FiHome, "storage-kitchen": FiLayers,
  "decorative-woodwork": FiBox, "interior-planning": FiSliders,
  "home-interiors": FiHome, "commercial-interiors": FiBriefcase,
  "finishes-execution": FiCheckCircle,
};

const GROUPS = CARPENTRY_INTERIOR_CATEGORIES.filter((item) => item.id !== "all");

function TypeText({ text, start = 0, step = 22 }: { text: string; start?: number; step?: number }) {
  return <span className={styles.typeText} aria-label={text}>{[...text].map((char, index) => (
    <span key={`${char}-${index}`} className={styles.typeChar} aria-hidden="true"
      style={{ "--char-delay": `${start + index * step}ms` } as CSSProperties}>
      {char === " " ? "\u00a0" : char}
    </span>
  ))}</span>;
}

function ServiceImage({ service }: { service: CarpentryInteriorService }) {
  const [failed, setFailed] = useState(false);
  const Icon = ICONS[service.category] ?? FiTool;
  if (failed) return <div className={styles.imageFallback}><Icon aria-hidden /></div>;
  return <Image src={service.image} alt={`${service.name} by City Coolies`} fill
    sizes="(max-width: 640px) 50vw, (max-width: 1180px) 33vw, 230px"
    className={styles.cardImage} onError={() => setFailed(true)} />;
}

export default function CarpentryInteriorMarketplace() {
  const [active, setActive] = useState<CarpentryInteriorCategory>("all");
  const [query, setQuery] = useState("");
  const [popularOnly, setPopularOnly] = useState(false);
  const [cart, setCart] = useState<Cart>({});
  const [labourDays, setLabourDays] = useState(1);

  useEffect(() => {
    let raf = 0;
    let stopped = false;
    let lenis: { raf: (time: number) => void; destroy: () => void } | null = null;
    import("lenis").then(({ default: Lenis }) => {
      if (stopped) return;
      lenis = new Lenis({ duration: 1.08, smoothWheel: true });
      const tick = (time: number) => { lenis?.raf(time); raf = requestAnimationFrame(tick); };
      raf = requestAnimationFrame(tick);
    });
    return () => { stopped = true; cancelAnimationFrame(raf); lenis?.destroy(); };
  }, []);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const nodes = document.querySelectorAll<HTMLElement>("[data-ci-hero], [data-ci-reveal]");
    const heroNodes = Array.from(document.querySelectorAll<HTMLElement>("[data-ci-hero]"));
    const inside = new WeakSet<Element>();
    const animations: Animation[] = [];
    const revealFrames: Keyframe[] = [
      { opacity: 0, transform: "translate3d(0, 28px, 0) scale(.985)", filter: "blur(8px)" },
      { opacity: 1, transform: "translate3d(0, 0, 0) scale(1)", filter: "blur(0)" },
    ];

    const play = (element: HTMLElement) => {
      const heroIndex = heroNodes.indexOf(element);
      const delay = heroIndex >= 0 ? heroIndex * 150 : 0;
      animations.push(element.animate(revealFrames, {
        duration: 760,
        delay,
        easing: "cubic-bezier(.16, 1, .3, 1)",
        fill: "both",
      }));

      const chars = element.querySelectorAll<HTMLElement>(`.${styles.typeChar}`);
      chars.forEach((char, index) => animations.push(char.animate([
        { opacity: 0, transform: "translate3d(0, .75em, 0) rotateX(68deg)", filter: "blur(5px)" },
        { opacity: 1, transform: "none", filter: "blur(0)" },
      ], { duration: 430, delay: delay + index * 22, easing: "cubic-bezier(.16, 1, .3, 1)", fill: "both" })));

      const staggered = element.matches(`.${styles.heroTrust}`)
        ? element.querySelectorAll<HTMLElement>("span")
        : element.matches(`.${styles.journey}`)
          ? element.querySelectorAll<HTMLElement>("article")
          : element.querySelectorAll<HTMLElement>(`.${styles.card}, .${styles.serviceList} button, .${styles.pills} button`);
      staggered.forEach((item, index) => animations.push(item.animate([
        { opacity: 0, transform: "translate3d(0, 30px, 0) scale(.96)", filter: "blur(7px)" },
        { opacity: 1, transform: "none", filter: "blur(0)" },
      ], { duration: 620, delay: 90 + index * 70, easing: "cubic-bezier(.16, 1, .3, 1)", fill: "both" })));
    };

    const observer = new IntersectionObserver((entries) => entries.forEach((entry) => {
      if (entry.isIntersecting && !inside.has(entry.target)) {
        inside.add(entry.target);
        play(entry.target as HTMLElement);
      } else if (!entry.isIntersecting) {
        inside.delete(entry.target);
      }
    }), { threshold: 0.08, rootMargin: "55px 0px -5% 0px" });
    nodes.forEach((node) => observer.observe(node));
    return () => {
      observer.disconnect();
      animations.forEach((animation) => animation.cancel());
    };
  }, [active, query, popularOnly]);

  const filtered = useMemo(() => {
    const needle = query.trim().toLowerCase();
    const result = CARPENTRY_INTERIOR_SERVICES.filter((service) =>
      (active === "all" || service.category === active) &&
      (!needle || service.name.toLowerCase().includes(needle)) &&
      (!popularOnly || service.popular));
    return result;
  }, [active, query, popularOnly]);

  const cartItems = useMemo(() => CARPENTRY_INTERIOR_SERVICES
    .filter((service) => (cart[service.id] ?? 0) > 0)
    .map((service) => ({ ...service, quantity: cart[service.id] })), [cart]);
  const selectedUnits = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const labourPersons = cart[PROFESSIONAL_CARPENTER_LABOUR_ID] ?? 0;
  const labourTotal = PROFESSIONAL_CARPENTER_DAILY_RATE * labourPersons * labourDays;
  const hasSurveyServices = cartItems.some((item) => item.id !== PROFESSIONAL_CARPENTER_LABOUR_ID);
  const surveyFee = hasSurveyServices ? 500 : 0;
  const bookingTotal = labourTotal + surveyFee;

  function changeQuantity(id: string, delta: number) {
    setCart((current) => {
      const amount = Math.max(0, Math.min(25, (current[id] ?? 0) + delta));
      const next = { ...current };
      if (amount === 0) delete next[id]; else next[id] = amount;
      return next;
    });
  }

  function selectView(next: CarpentryInteriorCategory) {
    setActive(next); setQuery(""); setPopularOnly(false);
    requestAnimationFrame(() => document.getElementById("carpentry-interior-services")?.scrollIntoView({ behavior: "smooth", block: "start" }));
  }

  const customServices = cartItems.map((item) => {
    const isLabour = item.id === PROFESSIONAL_CARPENTER_LABOUR_ID;
    return {
      id: item.id,
      name: item.name,
      quantity: item.quantity,
      days: isLabour ? labourDays : undefined,
      unitPrice: isLabour ? PROFESSIONAL_CARPENTER_DAILY_RATE : 0,
      lineTotal: isLabour ? PROFESSIONAL_CARPENTER_DAILY_RATE * item.quantity * labourDays : 0,
    };
  });

  return <main className={styles.page}>
    <section className={styles.hero} aria-labelledby="ci-title">
      <div className={styles.heroImage} aria-hidden="true" />
      <div className={styles.heroShade} aria-hidden="true" />
      <div className={styles.heroContent}>
        <nav className={`${styles.reveal} ${styles.delayOne}`} data-ci-hero aria-label="Breadcrumb">
          <Link href="/">Home</Link><FiChevronRight /><Link href="/services">Services</Link><FiChevronRight /><span>Carpentry & Interior</span>
        </nav>
        <p className={`${styles.eyebrow} ${styles.reveal} ${styles.delayTwo}`} data-ci-hero>
          <TypeText text="City Coolies Crafted Spaces" start={80} step={18} />
        </p>
        <h1 id="ci-title" className={`${styles.heroTitle} ${styles.reveal} ${styles.delayThree}`} data-ci-hero>
          <TypeText text="Crafted for life." start={190} step={32} /><br />
          <em><TypeText text="Designed for you." start={720} step={34} /></em>
        </h1>
        <p className={`${styles.heroCopy} ${styles.reveal} ${styles.delayFour}`} data-ci-hero>
          <TypeText text="Carpentry, custom furniture and complete interiors." start={1250} step={15} /><br />
          <TypeText text="Survey first. Clear final quotation." start={1900} step={16} />
        </p>
        <div className={`${styles.heroTrust} ${styles.reveal} ${styles.delayFive}`} data-ci-hero>
          <span><FiShield />Verified Professionals</span><span><FiCheckCircle />₹500 Survey Booking</span>
          <span><FiCalendar />Convenient Schedule</span><span><FiUserCheck />Final Quote After Survey</span>
        </div>
      </div>
    </section>

    <section id="carpentry-interior-services" className={styles.marketplace}>
      <aside className={`${styles.serviceRail} ${styles.reveal}`} data-ci-reveal>
        <h2>Carpentry & Interiors</h2>
        <div className={styles.serviceList}>{CARPENTRY_INTERIOR_CATEGORIES.map((item) => {
          const Icon = ICONS[item.id] ?? FiBox;
          return <button key={item.id} type="button" className={active === item.id ? styles.activeRail : ""} onClick={() => selectView(item.id)}><Icon /><span>{item.label}</span></button>;
        })}</div>
        <div className={styles.surveyNote}><FiShield /><span><strong>₹500 Site Survey</strong><small>Adjusted in your final bill</small></span></div>
      </aside>

      <div className={styles.catalog}>
        <div className={`${styles.toolbar} ${styles.reveal}`} data-ci-reveal>
          <div className={styles.pills}>
            <button type="button" className={active === "all" && !popularOnly ? styles.activePill : ""} onClick={() => selectView("all")}>All</button>
            <button type="button" className={popularOnly ? styles.activePill : ""} onClick={() => { setActive("all"); setQuery(""); setPopularOnly(true); }}>Popular</button>
            <button type="button" className={active === "repairs" ? styles.activePill : ""} onClick={() => selectView("repairs")}>Repairs</button>
            <button type="button" className={active === "custom-furniture" ? styles.activePill : ""} onClick={() => selectView("custom-furniture")}>Custom Furniture</button>
            <button type="button" className={active === "home-interiors" ? styles.activePill : ""} onClick={() => selectView("home-interiors")}>Home Interiors</button>
            <button type="button" className={active === "commercial-interiors" ? styles.activePill : ""} onClick={() => selectView("commercial-interiors")}>Commercial</button>
          </div>
        </div>

        {query || active !== "all" || popularOnly ?
          <ServiceGrid title="Matching Services" services={filtered} cart={cart} onQuantity={changeQuantity} labourDays={labourDays} onLabourDays={setLabourDays} /> :
          GROUPS.map((group) => <ServiceGrid key={group.id} title={group.label} services={CARPENTRY_INTERIOR_SERVICES.filter((service) => service.category === group.id)} cart={cart} onQuantity={changeQuantity} labourDays={labourDays} onLabourDays={setLabourDays} />)}
      </div>

      <aside className={`${styles.booking} ${styles.reveal}`} data-ci-reveal>
        <header><div><span>Your Booking</span>{selectedUnits > 0 && <b>{selectedUnits}</b>}</div>{selectedUnits > 0 && <button type="button" onClick={() => setCart({})}>Clear All</button>}</header>
        <div className={styles.bookingItems}>{cartItems.length === 0 ?
          <div className={styles.empty}><FiShoppingCart /><strong>Select the work you need</strong><span>Your chosen services will appear here.</span></div> :
          cartItems.map((item) => <article key={item.id} className={styles.bookingItem}>
            <div className={styles.thumb}><ServiceImage service={item} /></div>
            <div><strong>{item.name}</strong><small>{item.id === PROFESSIONAL_CARPENTER_LABOUR_ID ? `${getCarpentryInteriorRate(item.id).label} • Fixed rate` : getCarpentryInteriorRate(item.id).label}</small><Quantity value={item.quantity} minus={() => changeQuantity(item.id, -1)} plus={() => changeQuantity(item.id, 1)} />{item.id === PROFESSIONAL_CARPENTER_LABOUR_ID && <DaysSelect value={labourDays} onChange={setLabourDays} compact />}</div>
            <button className={styles.trash} type="button" aria-label={`Remove ${item.name}`} onClick={() => changeQuantity(item.id, -25)}><FiTrash2 /></button>
          </article>)}</div>
        <div className={styles.summary}>
          <div><span>Total Payable Now</span><strong>₹{bookingTotal.toLocaleString("en-IN")}</strong></div>
          <p>{labourTotal > 0 ? `Labour: ₹${labourTotal.toLocaleString("en-IN")} (${labourPersons} person × ${labourDays} day${labourDays > 1 ? "s" : ""}). ` : ""}{surveyFee > 0 ? "₹500 survey fee applies only to the other selected work and is adjusted in the final bill." : "Professional Carpenter Labour is booked at the fixed rate. No site survey."}</p>
          {selectedUnits > 0 ? <div className={styles.modalTrigger}><ServiceBookingModal packageId="carpentry-interior-booking" serviceName={hasSurveyServices ? "Carpentry & Interior Booking" : "Professional Carpenter Labour Booking"} originalPrice={bookingTotal} offerPrice={bookingTotal} fullPayment triggerLabel={`Pay ₹${bookingTotal.toLocaleString("en-IN")} & Book →`} customServices={customServices} /></div> :
            <button className={styles.disabled} type="button" disabled>Select a Service First</button>}
          <ul><li><FiShield />Secure payment</li><li><FiCheckCircle />₹1,500 per person/day fixed labour</li><li><FiCalendar />Choose 1–30 days</li><li><FiClock />Survey only for other work</li></ul>
        </div>
      </aside>
    </section>

    <section className={`${styles.journey} ${styles.reveal}`} data-ci-reveal aria-label="Booking process">
      {[[FiShoppingCart,"Select Work","Choose every service you need"],[FiCalendar,"Confirm Booking","Pay fixed labour or survey fee"],[FiUserCheck,"Visit If Required","Survey applies to custom work only"],[FiCheckCircle,"Final Quotation","Custom-work rate fixed after survey"],[FiTool,"Work Starts","Execution after confirmation"]].map(([Icon,title,copy], index) => {
        const StepIcon = Icon as ComponentType<{ "aria-hidden"?: boolean }>;
        return <article key={String(title)} style={{ "--step-delay": `${index * 90}ms` } as CSSProperties}><span><StepIcon /></span><div><strong>{String(title)}</strong><small>{String(copy)}</small></div>{index < 4 && <FiChevronRight />}</article>;
      })}
    </section>

    {selectedUnits > 0 && <div className={styles.mobileBar}><span><b>{selectedUnits} selected</b><strong>Pay ₹{bookingTotal.toLocaleString("en-IN")}</strong></span><div><ServiceBookingModal packageId="carpentry-interior-booking" serviceName={hasSurveyServices ? "Carpentry & Interior Booking" : "Professional Carpenter Labour Booking"} originalPrice={bookingTotal} offerPrice={bookingTotal} fullPayment triggerLabel="Book Now →" customServices={customServices} /></div></div>}
  </main>;
}

function ServiceGrid({ title, services, cart, onQuantity, labourDays, onLabourDays }: { title: string; services: readonly CarpentryInteriorService[]; cart: Cart; onQuantity: (id: string, delta: number) => void; labourDays: number; onLabourDays: (days: number) => void }) {
  if (!services.length) return <div className={styles.noResults}>No matching service found. Try another search.</div>;
  return <section className={`${styles.group} ${styles.reveal}`} data-ci-reveal><h2>{title}</h2><div className={styles.grid}>{services.map((service, index) => {
    const quantity = cart[service.id] ?? 0;
    const isLabour = service.id === PROFESSIONAL_CARPENTER_LABOUR_ID;
    return <article className={styles.card} key={service.id} style={{ "--card-delay": `${Math.min(index, 11) * 50}ms` } as CSSProperties}>
      <div className={styles.media}><ServiceImage service={service} />{service.popular && <span>Popular</span>}</div>
      <div className={styles.cardBody}><h3>{service.name}</h3><p><strong>{getCarpentryInteriorRate(service.id).label}</strong><span>{isLabour ? "Fixed rate • No site survey" : "Final rate after site survey"}</span></p>
        {quantity === 0 ? <button type="button" className={styles.add} onClick={() => onQuantity(service.id, 1)}><FiShoppingCart />Add Service</button> :
          <div className={`${styles.added} ${isLabour ? styles.labourAdded : ""}`}><Quantity value={quantity} minus={() => onQuantity(service.id, -1)} plus={() => onQuantity(service.id, 1)} />{isLabour ? <DaysSelect value={labourDays} onChange={onLabourDays} /> : <button type="button" onClick={() => onQuantity(service.id, 1)}><FiCheckCircle />Added</button>}</div>}
      </div>
    </article>;
  })}</div></section>;
}

function Quantity({ value, minus, plus }: { value: number; minus: () => void; plus: () => void }) {
  return <div className={styles.quantity}><button type="button" onClick={minus} aria-label="Decrease quantity"><FiMinus /></button><b>{value}</b><button type="button" onClick={plus} aria-label="Increase quantity"><FiPlus /></button></div>;
}

function DaysSelect({ value, onChange, compact = false }: { value: number; onChange: (days: number) => void; compact?: boolean }) {
  return <label className={`${styles.daysSelect} ${compact ? styles.daysCompact : ""}`}><span>Days</span><select value={value} onChange={(event) => onChange(Number(event.target.value))} aria-label="Number of labour days">{Array.from({ length: 30 }, (_, index) => index + 1).map((day) => <option key={day} value={day}>{day} {day === 1 ? "day" : "days"}</option>)}</select></label>;
}
