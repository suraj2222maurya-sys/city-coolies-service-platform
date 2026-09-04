"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import type { ComponentType } from "react";
import {
  FiBox,
  FiCalendar,
  FiCheckCircle,
  FiChevronRight,
  FiClock,
  FiDroplet,
  FiGrid,
  FiHome,
  FiMinus,
  FiMonitor,
  FiPlus,
  FiSearch,
  FiShield,
  FiShoppingCart,
  FiSliders,
  FiTrash2,
  FiUserCheck,
  FiWind,
} from "react-icons/fi";
import ServiceBookingModal from "@/components/booking/ServiceBookingModal";
import {
  APPLIANCE_CATEGORIES,
  APPLIANCE_SERVICES,
  type ApplianceCategory,
  type ApplianceService,
} from "@/lib/services/applianceRepairCatalog";
import styles from "./ApplianceRepairMarketplace.module.css";

type Cart = Record<string, number>;

const CATEGORY_ICONS: Record<string, ComponentType<{ "aria-hidden"?: boolean }>> = {
  all: FiGrid,
  general: FiBox,
  ac: FiWind,
  refrigerator: FiBox,
  "washing-machine": FiClock,
  microwave: FiMonitor,
  "water-purifier": FiDroplet,
  geyser: FiDroplet,
  kitchen: FiHome,
  television: FiMonitor,
  commercial: FiHome,
};

const GROUP_ORDER = APPLIANCE_CATEGORIES.filter((category) => category.id !== "all");
const AVAILABLE_IMAGE_PATHS = new Set<string>(["/ac-deep-cleaning.webp", "/ac-gas-refilling.webp", "/ac-inspection-visit.webp", "/ac-installation.webp", "/ac-pcb-repair.webp", "/ac-split-general-service.webp", "/ac-uninstallation.webp", "/ac-water-leakage-repair.webp", "/ac-window-service.webp", "/appliance-inspection-diagnosis.webp", "/appliance-installation-reinstallation.webp", "/appliance-major-repair-labour.webp", "/appliance-minor-repair-labour.webp", "/commercial-deep-freezer-service.webp", "/commercial-display-chiller-repair.webp", "/commercial-ice-machine-service.webp", "/commercial-refrigerator-service.webp", "/commercial-water-cooler-service.webp", "/fridge-compressor-replacement-labour.webp", "/fridge-cooling-issue-repair.webp", "/fridge-door-gasket-replacement-labour.webp", "/fridge-double-door-service.webp", "/fridge-gas-filling.webp", "/fridge-inspection-visit.webp", "/fridge-side-by-side-service.webp", "/fridge-single-door-service.webp", "/geyser-general-service.webp", "/geyser-heating-element-replacement.webp", "/geyser-installation.webp", "/geyser-thermostat-replacement.webp", "/geyser-water-leakage-repair.webp", "/kitchen-chimney-cleaning.webp", "/kitchen-chimney-repair.webp", "/kitchen-exhaust-fan-repair.webp", "/kitchen-gas-stove-service.webp", "/kitchen-hob-cooktop-service.webp", "/microwave-control-panel-repair.webp", "/microwave-door-lock-switch-repair.webp", "/microwave-general-service.webp", "/microwave-inspection.webp", "/microwave-magnetron-replacement-labour.webp", "/ro-commercial-service.webp", "/ro-filter-replacement-labour.webp", "/ro-general-service.webp", "/ro-inspection.webp", "/ro-installation.webp", "/ro-uninstallation.webp", "/tv-display-backlight-repair-labour.webp", "/tv-inspection.webp", "/tv-led-repair.webp", "/tv-smart-software-update.webp", "/tv-wall-mount-installation.webp", "/washing-machine-drum-cleaning.webp", "/washing-machine-front-load-service.webp", "/washing-machine-inspection-visit.webp", "/washing-machine-installation.webp", "/washing-machine-motor-pcb-repair-labour.webp", "/washing-machine-semi-automatic-service.webp", "/washing-machine-top-load-service.webp", "/washing-machine-uninstallation.webp", "/washing-machine-water-leakage-repair.webp"]);

function money(value: number) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(value);
}

function TypeText({ text, start = 0, step = 24 }: { text: string; start?: number; step?: number }) {
  return (
    <span className={styles.typeText} aria-label={text}>
      {[...text].map((character, index) => (
        <span
          key={`${character}-${index}`}
          className={styles.typeChar}
          aria-hidden="true"
          style={{ "--char-delay": `${start + index * step}ms` } as React.CSSProperties}
        >
          {character === " " ? "\u00a0" : character}
        </span>
      ))}
    </span>
  );
}

function ServiceImage({ service }: { service: ApplianceService }) {
  const [failed, setFailed] = useState(false);
  const PlaceholderIcon = CATEGORY_ICONS[service.category] ?? FiBox;

  if (failed || !AVAILABLE_IMAGE_PATHS.has(service.image)) {
    return (
      <div className={styles.imagePlaceholder} aria-label={`${service.name} image coming soon`}>
        <PlaceholderIcon aria-hidden />
      </div>
    );
  }

  return (
    <Image
      src={service.image}
      alt={`${service.name} by City Coolies`}
      fill
      sizes="(max-width: 640px) 50vw, (max-width: 1180px) 33vw, 220px"
      className={styles.cardImage}
      onError={() => setFailed(true)}
    />
  );
}

export default function ApplianceRepairMarketplace() {
  const [category, setCategory] = useState<ApplianceCategory>("all");
  const [query, setQuery] = useState("");
  const [popularOnly, setPopularOnly] = useState(false);
  const [sort, setSort] = useState<"featured" | "low" | "high">("featured");
  const [cart, setCart] = useState<Cart>({});

  useEffect(() => {
    const heroElements = document.querySelectorAll<HTMLElement>("[data-appliance-hero-reveal]");
    const heroFrame = requestAnimationFrame(() => {
      heroElements.forEach((element) => element.classList.add(styles.visible));
    });
    let frame = 0;
    let destroyed = false;
    let lenis: { raf: (time: number) => void; destroy: () => void } | null = null;
    import("lenis").then(({ default: Lenis }) => {
      if (destroyed) return;
      lenis = new Lenis({ duration: 1.05, smoothWheel: true });
      const animate = (time: number) => {
        lenis?.raf(time);
        frame = requestAnimationFrame(animate);
      };
      frame = requestAnimationFrame(animate);
    });

    return () => {
      destroyed = true;
      cancelAnimationFrame(heroFrame);
      cancelAnimationFrame(frame);
      lenis?.destroy();
    };
  }, []);

  useEffect(() => {
    const elements = document.querySelectorAll<HTMLElement>(
      "[data-appliance-hero-reveal], [data-appliance-reveal]",
    );
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          entry.target.classList.toggle(styles.visible, entry.isIntersecting);
        });
      },
      { threshold: 0.08, rootMargin: "40px 0px -5% 0px" },
    );
    elements.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, [category, popularOnly, query]);

  const filtered = useMemo(() => {
    const needle = query.trim().toLowerCase();
    const services = APPLIANCE_SERVICES.filter((service) => {
      const categoryMatch = category === "all" || service.category === category;
      const queryMatch = !needle || service.name.toLowerCase().includes(needle);
      return categoryMatch && queryMatch && (!popularOnly || service.popular);
    });
    if (sort === "low") return [...services].sort((a, b) => a.price - b.price);
    if (sort === "high") return [...services].sort((a, b) => b.price - a.price);
    return services;
  }, [category, popularOnly, query, sort]);

  const cartItems = useMemo(
    () =>
      APPLIANCE_SERVICES.filter((service) => (cart[service.id] ?? 0) > 0).map(
        (service) => ({ ...service, quantity: cart[service.id] }),
      ),
    [cart],
  );
  const itemCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  function changeQuantity(id: string, delta: number) {
    setCart((current) => {
      const next = Math.max(0, Math.min(25, (current[id] ?? 0) + delta));
      if (next === 0) {
        const copy = { ...current };
        delete copy[id];
        return copy;
      }
      return { ...current, [id]: next };
    });
  }

  function jumpToServices(next: ApplianceCategory) {
    setCategory(next);
    setQuery("");
    setPopularOnly(false);
    requestAnimationFrame(() => {
      document.getElementById("appliance-services")?.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  }

  return (
    <main className={styles.page}>
      <section className={styles.hero} aria-labelledby="appliance-title">
        <div className={styles.heroImage} aria-hidden="true" />
        <div className={styles.heroContent}>
          <nav className={`${styles.reveal} ${styles.delayOne}`} data-appliance-hero-reveal aria-label="Breadcrumb">
            <Link href="/">Home</Link><FiChevronRight aria-hidden />
            <Link href="/services">Services</Link><FiChevronRight aria-hidden />
            <span>Appliance Repair</span>
          </nav>
          <p className={`${styles.eyebrow} ${styles.reveal} ${styles.delayTwo}`} data-appliance-hero-reveal>
            <TypeText text="Professional Appliance Services" start={80} step={20} />
          </p>
          <h1 id="appliance-title" className={`${styles.heroTitle} ${styles.reveal} ${styles.delayThree}`} data-appliance-hero-reveal>
            <TypeText text="Appliance Repair," start={180} step={34} /><br />
            <em><TypeText text="made effortless." start={700} step={36} /></em>
          </h1>
          <p className={`${styles.heroCopy} ${styles.reveal} ${styles.delayFour}`} data-appliance-hero-reveal>
            <TypeText text="Expert care for every appliance." start={1160} step={18} /><br />
            <TypeText text="Clear pricing. Trusted technicians." start={1570} step={18} />
          </p>
          <div className={`${styles.heroTrust} ${styles.reveal} ${styles.delayFive}`} data-appliance-hero-reveal>
            <span><FiShield aria-hidden />Verified Technicians</span>
            <span><FiCheckCircle aria-hidden />Upfront Service Rates</span>
            <span><FiCalendar aria-hidden />Easy Reschedule</span>
            <span><FiUserCheck aria-hidden />Service Warranty</span>
          </div>
        </div>
        <form className={`${styles.heroSearch} ${styles.delayFive}`} data-appliance-hero-reveal onSubmit={(event) => { event.preventDefault(); document.getElementById("appliance-services")?.scrollIntoView({ behavior: "smooth", block: "start" }); }}>
          <FiSearch aria-hidden />
          <input value={query} onChange={(event) => { setQuery(event.target.value); setCategory("all"); setPopularOnly(false); }} placeholder="Search appliance services..." />
          <button type="submit" aria-label="Search">
            <FiSearch aria-hidden />
          </button>
        </form>
      </section>

      <section id="appliance-services" className={styles.marketplace}>
        <aside className={`${styles.categoryRail} ${styles.reveal}`} data-appliance-reveal>
          <h2>Appliance Services</h2>
          <div className={styles.categoryList}>
            {APPLIANCE_CATEGORIES.map((item) => {
              const Icon = CATEGORY_ICONS[item.id];
              return (
                <button key={item.id} type="button" className={category === item.id ? styles.categoryActive : ""} onClick={() => jumpToServices(item.id)}>
                  <Icon aria-hidden /><span>{item.label}</span>
                </button>
              );
            })}
          </div>
          <div className={styles.trustedPainters}>
            <FiShield aria-hidden />
            <span><strong>Trusted Technicians</strong><small>Background verified & experienced</small></span>
          </div>
        </aside>

        <div className={styles.catalogArea}>
          <div className={`${styles.catalogToolbar} ${styles.reveal}`} data-appliance-reveal>
            <div className={styles.quickFilters}>
              <button className={category === "all" && !popularOnly && !query ? styles.filterActive : ""} type="button" onClick={() => jumpToServices("all")}>All</button>
              <button className={popularOnly ? styles.filterActive : ""} type="button" onClick={() => { setCategory("all"); setQuery(""); setPopularOnly(true); }}>Popular</button>
              {APPLIANCE_CATEGORIES.filter((item) => ["ac", "refrigerator", "washing-machine", "television", "water-purifier"].includes(item.id)).map((item) => (
                <button key={item.id} className={category === item.id ? styles.filterActive : ""} type="button" onClick={() => jumpToServices(item.id)}>{item.label}</button>
              ))}
              <label className={styles.moreFilter}>
                <select
                  aria-label="More appliance categories"
                  value={["geyser", "kitchen", "commercial", "microwave", "general"].includes(category) ? category : ""}
                  onChange={(event) => {
                    if (event.target.value) jumpToServices(event.target.value as ApplianceCategory);
                  }}
                >
                  <option value="">More</option>
                  <option value="general">General Services</option>
                  <option value="microwave">Microwave</option>
                  <option value="geyser">Geyser</option>
                  <option value="kitchen">Kitchen Appliances</option>
                  <option value="commercial">Commercial</option>
                </select>
              </label>
            </div>
            <label className={styles.sortControl}><FiSliders aria-hidden />
              <select value={sort} onChange={(event) => setSort(event.target.value as typeof sort)}>
                <option value="featured">Sort by</option>
                <option value="low">Price: Low to High</option>
                <option value="high">Price: High to Low</option>
              </select>
            </label>
          </div>

          {query || category !== "all" || popularOnly ? (
            <ServiceGrid title="Matching Services" services={filtered} cart={cart} changeQuantity={changeQuantity} />
          ) : (
            GROUP_ORDER.map((group) => {
              const services = APPLIANCE_SERVICES.filter((service) => service.category === group.id);
              return <ServiceGrid key={group.id} title={group.label} services={services} cart={cart} changeQuantity={changeQuantity} />;
            })
          )}
        </div>

        <aside className={`${styles.bookingPanel} ${styles.reveal}`} data-appliance-reveal>
          <header><div><span>Your Booking</span>{itemCount > 0 && <b>{itemCount}</b>}</div>{itemCount > 0 && <button type="button" onClick={() => setCart({})}>Clear All</button>}</header>
          <div className={styles.bookingItems}>
            {cartItems.length === 0 ? (
              <div className={styles.emptyCart}><FiShoppingCart aria-hidden /><strong>Choose an appliance service</strong><span>Your selected work will appear here.</span></div>
            ) : cartItems.map((item) => (
              <article key={item.id} className={styles.bookingItem}>
                <div className={styles.bookingThumb}><ServiceImage service={item} /></div>
                <div><strong>{item.name}</strong><small>{money(item.price)} / {item.unit}</small>
                  <Quantity value={item.quantity} onMinus={() => changeQuantity(item.id, -1)} onPlus={() => changeQuantity(item.id, 1)} />
                </div>
                <div className={styles.itemEnd}><button type="button" aria-label={`Remove ${item.name}`} onClick={() => setCart((current) => { const next = { ...current }; delete next[item.id]; return next; })}><FiTrash2 aria-hidden /></button><b>{money(item.price * item.quantity)}</b></div>
              </article>
            ))}
          </div>
          <div className={styles.bookingSummary}>
            <div><span>Subtotal</span><strong>{money(total)}</strong></div>
            <p>No GST added. Listed service rates apply.</p>
            {total > 0 ? (
              <div className={styles.bookingTrigger}>
                <ServiceBookingModal
                  packageId="appliance-repair-plan"
                  serviceName="Appliance Repair Plan"
                  originalPrice={total}
                  offerPrice={total}
                  triggerLabel="Continue to Booking  →"
                  customServices={cartItems.map((item) => ({ id: item.id, name: item.name, quantity: item.quantity, unitPrice: item.price, lineTotal: item.price * item.quantity }))}
                />
              </div>
            ) : <button className={styles.disabledBooking} type="button" disabled>Continue to Booking →</button>}
            <ul><li><FiShield />Secure booking</li><li><FiCheckCircle />No hidden charges</li><li><FiCalendar />Easy reschedule</li><li><FiClock />On-time service</li></ul>
          </div>
        </aside>
      </section>

      <section className={`${styles.bookingJourney} ${styles.reveal}`} data-appliance-reveal aria-label="Booking process">
        {[
          [FiShoppingCart, "Select Service", "Choose the appliance work you need"],
          [FiCalendar, "Choose Schedule", "Pick a convenient date and time"],
          [FiCheckCircle, "Confirm Booking", "Review and confirm your booking"],
          [FiUserCheck, "Technician Visit", "Expert arrives and starts the work"],
          [FiShield, "Service Complete", "Quality service with satisfaction"],
        ].map(([Icon, title, copy], index) => {
          const StepIcon = Icon as ComponentType<{ "aria-hidden"?: boolean }>;
          return <article key={String(title)} style={{ "--step-delay": `${index * 100}ms` } as React.CSSProperties}><span><StepIcon aria-hidden /></span><div><strong>{String(title)}</strong><small>{String(copy)}</small></div>{index < 4 && <FiChevronRight className={styles.stepArrow} aria-hidden />}</article>;
        })}
      </section>

      {itemCount > 0 && (
        <div className={styles.mobileCartBar}>
          <span><b>{itemCount} {itemCount === 1 ? "item" : "items"}</b><strong>{money(total)}</strong></span>
          <div className={styles.mobileTrigger}>
            <ServiceBookingModal packageId="appliance-repair-plan" serviceName="Appliance Repair Plan" originalPrice={total} offerPrice={total} triggerLabel="Continue to Booking →" customServices={cartItems.map((item) => ({ id: item.id, name: item.name, quantity: item.quantity, unitPrice: item.price, lineTotal: item.price * item.quantity }))} />
          </div>
        </div>
      )}
    </main>
  );
}

function ServiceGrid({ title, services, cart, changeQuantity }: { title: string; services: readonly ApplianceService[]; cart: Cart; changeQuantity: (id: string, delta: number) => void }) {
  if (services.length === 0) return <div className={styles.noResults}>No matching services found.</div>;
  return (
    <section className={`${styles.serviceGroup} ${styles.reveal}`} data-appliance-reveal>
      <h2>{title}</h2>
      <div className={styles.serviceGrid}>
        {services.map((service, index) => {
          const quantity = cart[service.id] ?? 0;
          return (
            <article key={service.id} className={styles.serviceCard} style={{ "--card-delay": `${Math.min(index, 11) * 55}ms` } as React.CSSProperties}>
              <div className={styles.cardMedia}><ServiceImage service={service} />{service.popular && <span>Popular</span>}</div>
              <div className={styles.cardBody}><h3>{service.name}</h3><p><strong>{money(service.price)}</strong><span>/ {service.unit}</span></p>
                {quantity === 0 ? <button type="button" className={styles.addButton} onClick={() => changeQuantity(service.id, 1)}><FiShoppingCart aria-hidden />Add</button> : <Quantity value={quantity} onMinus={() => changeQuantity(service.id, -1)} onPlus={() => changeQuantity(service.id, 1)} />}
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}

function Quantity({ value, onMinus, onPlus }: { value: number; onMinus: () => void; onPlus: () => void }) {
  return <div className={styles.quantity}><button type="button" onClick={onMinus} aria-label="Decrease quantity"><FiMinus aria-hidden /></button><span>{value}</span><button type="button" onClick={onPlus} aria-label="Increase quantity"><FiPlus aria-hidden /></button></div>;
}
