"use client";

import Image from "next/image";
import { useEffect, useMemo, useState, type ReactNode } from "react";

import { MdOutlinePlumbing } from "react-icons/md";
import {
  TbBath,
  TbCylinder,
  TbDropletDown,
  TbHome,
  TbPaint,
  TbTools,
  TbTopologyStar3,
} from "react-icons/tb";
import ServiceBookingModal from "@/components/booking/ServiceBookingModal";
import {
  PLUMBING_SERVICES,
  PLUMBING_SITE_VISIT_FEE,
  type PlumbingCategory,
  type PlumbingService,
} from "@/lib/services/plumbingCatalog";

import styles from "./PlumbingWorksCommerce.module.css";

type TopFilter = "All Services" | "Pipe Work" | "Bathroom" | "Installation" | "Repair" | "Site Inspection";

const CATEGORIES: readonly PlumbingCategory[] = [
  "Pipe Laying & Water Supply",
  "Drainage & Waste Lines",
  "Bathroom Fittings",
  "Plumbing Points",
  "Tank & Pump",
  "Repair & Maintenance",
  "Renovation & Replacement",
];

const TOP_FILTERS: readonly TopFilter[] = [
  "All Services",
  "Pipe Work",
  "Bathroom",
  "Installation",
  "Repair",
  "Site Inspection",
];

const CATEGORY_ICONS: Record<PlumbingCategory, ReactNode> = {
  "Pipe Laying & Water Supply": (
    <MdOutlinePlumbing aria-hidden="true" />
  ),
  "Drainage & Waste Lines": (
    <TbDropletDown aria-hidden="true" />
  ),
  "Bathroom Fittings": (
    <TbBath aria-hidden="true" />
  ),
  "Plumbing Points": (
    <TbTopologyStar3 aria-hidden="true" />
  ),
  "Tank & Pump": (
    <TbCylinder aria-hidden="true" />
  ),
  "Repair & Maintenance": (
    <TbTools aria-hidden="true" />
  ),
  "Renovation & Replacement": (
    <TbPaint aria-hidden="true" />
  ),
};

function matchesTopFilter(service: PlumbingService, filter: TopFilter) {
  if (filter === "All Services") return true;
  if (filter === "Pipe Work") return service.category === "Pipe Laying & Water Supply" || service.category === "Drainage & Waste Lines";
  if (filter === "Bathroom") return service.category === "Bathroom Fittings";
  if (filter === "Installation") return service.category === "Plumbing Points" || service.category === "Tank & Pump";
  if (filter === "Repair") return service.category === "Repair & Maintenance";
  return service.category === "Renovation & Replacement";
}

function money(value: number) {
  return `₹${value.toLocaleString("en-IN")}`;
}

export default function PlumbingWorksCommerce() {
  const [activeCategory, setActiveCategory] = useState<PlumbingCategory | "All">("All");
  const [topFilter, setTopFilter] = useState<TopFilter>("All Services");
  const [query, setQuery] = useState("");
  const [cart, setCart] = useState<Record<string, number>>({});
  const [mobileBookingOpen, setMobileBookingOpen] = useState(false);
  const [visibleLimit, setVisibleLimit] = useState(8);

  useEffect(() => {
    const searchInput = document.querySelector<HTMLInputElement>(
      'input[placeholder="Search plumbing services"]',
    );

    if (!searchInput) return;

    const syncSearch = () => setQuery(searchInput.value);
    searchInput.addEventListener("input", syncSearch);

    return () => searchInput.removeEventListener("input", syncSearch);
  }, []);

  useEffect(() => {
    setVisibleLimit(8);
  }, [activeCategory, query, topFilter]);

  const serviceMap = useMemo(() => new Map(PLUMBING_SERVICES.map((service) => [service.id, service])), []);
  const visibleServices = useMemo(() => {
    const search = query.trim().toLowerCase();
    return PLUMBING_SERVICES.filter((service) => {
      const categoryMatch = activeCategory === "All" || service.category === activeCategory;
      const topMatch = matchesTopFilter(service, topFilter);
      const searchMatch = !search || `${service.name} ${service.unit} ${service.category}`.toLowerCase().includes(search);
      return categoryMatch && topMatch && searchMatch;
    });
  }, [activeCategory, query, topFilter]);
  const displayedServices = visibleServices.slice(0, visibleLimit);

  const cartEntries = Object.entries(cart).flatMap(([id, quantity]) => {
    const service = serviceMap.get(id);
    return service && service.price !== null && quantity > 0 ? [{ service, quantity }] : [];
  });
  const cartCount = cartEntries.reduce((sum, entry) => sum + entry.quantity, 0);
  const subtotal = cartEntries.reduce((sum, entry) => sum + (entry.service.price ?? 0) * entry.quantity, 0);
  const bookingItems = cartEntries.map(({ service, quantity }) => ({
    id: service.id,
    name: service.name,
    quantity,
    unitPrice: service.price ?? 0,
    lineTotal: (service.price ?? 0) * quantity,
  }));
  const bookingName = bookingItems.length === 1 ? bookingItems[0]!.name : "Plumbing Works Booking";

  function addService(service: PlumbingService) {
    setCart((current) => ({ ...current, [service.id]: service.price === null ? 1 : (current[service.id] ?? 0) + 1 }));
  }

  function decreaseService(id: string) {
    setCart((current) => {
      const next = { ...current };
      const quantity = (next[id] ?? 0) - 1;
      if (quantity <= 0) delete next[id]; else next[id] = quantity;
      return next;
    });
  }

  function removeService(id: string) {
    setCart((current) => {
      const next = { ...current };
      delete next[id];
      return next;
    });
  }

  function selectCategory(category: PlumbingCategory | "All") {
    setActiveCategory(category);
    setTopFilter("All Services");
  }

  function renderServiceCard(service: PlumbingService) {
    const quantity = cart[service.id] ?? 0;
    return (
      <article className={styles.serviceCard} key={service.id}>
        <div className={styles.cardImage}>
          <Image src={service.image} alt={service.name} fill sizes="(max-width: 640px) 46vw, (max-width: 1180px) 28vw, 190px" />
          {service.price === null && <span className={styles.quoteBadge}>Inspection</span>}
        </div>
        <div className={styles.cardBody}>
          <h3>{service.name}</h3>
          <p className={styles.unit}>Unit: {service.unit}</p>
          <div className={styles.cardFooter}>
            <strong className={service.price === null ? styles.quotePrice : styles.price}>
              {service.price === null ? (
                <>
                  <span>{money(PLUMBING_SITE_VISIT_FEE)} Site Visit / Survey</span>
                  <small>{service.priceLabel}</small>
                </>
              ) : money(service.price)}
            </strong>
            {service.price === null ? (
              <div className={styles.inspectionBooking}>
                <ServiceBookingModal
                  packageId="plumbing-site-visit"
                  serviceName={`${service.name} - Site Visit / Survey`}
                  originalPrice={PLUMBING_SITE_VISIT_FEE}
                  offerPrice={PLUMBING_SITE_VISIT_FEE}
                  triggerLabel={`Pay ${money(PLUMBING_SITE_VISIT_FEE)} & Book`}
                  customServices={[
                    {
                      id: service.id,
                      name: service.name,
                      quantity: 1,
                      unitPrice: PLUMBING_SITE_VISIT_FEE,
                      lineTotal: PLUMBING_SITE_VISIT_FEE,
                    },
                  ]}
                  fullPayment
                />
              </div>
            ) : quantity === 0 ? (
              <button className={styles.addButton} type="button" onClick={() => addService(service)}>
                Add
              </button>
            ) : (
              <div className={styles.quantity}>
                <button type="button" onClick={() => decreaseService(service.id)} aria-label={`Decrease ${service.name}`}>−</button>
                <span>{quantity}</span>
                <button type="button" onClick={() => addService(service)} aria-label={`Increase ${service.name}`}>+</button>
              </div>
            )}
          </div>
        </div>
      </article>
    );
  }

  function renderBookingPanel() {
    return (
      <div className={styles.bookingPanel}>
        <div className={styles.bookingHeader}>
          <div><span>Your cart</span><h2>Your Booking</h2></div>
          <div className={styles.cartBadge} aria-label={`${cartCount} selected items`}>
            <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M3 4h2l2 11h10l2-8H7M9 20h.01M17 20h.01"/></svg>
            {cartCount > 0 && <b>{cartCount}</b>}
          </div>
        </div>

        <div className={styles.bookingItems}>
          {cartEntries.length === 0 ? (
            <div className={styles.emptyCart}>
              <span>+</span><strong>Select a plumbing service</strong><p>Your booking summary will appear here.</p>
            </div>
          ) : cartEntries.map(({ service, quantity }) => (
            <div className={styles.bookingItem} key={service.id}>
              <div className={styles.bookingImage}><Image src={service.image} alt="" fill sizes="64px" /></div>
              <div className={styles.bookingInfo}>
                <strong>{service.name}</strong><span>{service.unit}</span>
                <b>{service.price === null ? "Final quote" : `${money(service.price)} / ${service.unit}`}</b>
              </div>
              <div className={styles.bookingControls}>
                {service.price === null ? <span className={styles.quoteSelected}>Requested</span> : (
                  <div><button type="button" onClick={() => decreaseService(service.id)}>−</button><span>{quantity}</span><button type="button" onClick={() => addService(service)}>+</button></div>
                )}
                <button className={styles.removeButton} type="button" onClick={() => removeService(service.id)} aria-label={`Remove ${service.name}`}>×</button>
              </div>
            </div>
          ))}
        </div>

        <div className={styles.subtotal}><span>Estimated Subtotal</span><strong>{money(subtotal)}</strong></div>
        <p className={styles.priceNote}>Material charges may be extra where applicable. Inspection services receive a final quotation after assessment.</p>

        {cartCount === 0 ? (
          <button className={styles.proceedDisabled} type="button" disabled>Continue to Booking <span>→</span></button>
        ) : (
          <div className={styles.bookingModalTrigger}>
            <ServiceBookingModal
              packageId="plumbing-works-plan"
              serviceName={bookingName}
              originalPrice={subtotal}
              offerPrice={subtotal}
              triggerLabel={subtotal === 0 ? "Submit Quote Request" : "Continue to Booking"}
              customServices={bookingItems}
              quoteOnly={subtotal === 0}
            />
          </div>
        )}

        <div className={styles.trustList}>
          <p><span>✓</span> Verified professionals</p><p><span>✓</span> Transparent rates</p><p><span>✓</span> Secure booking</p>
        </div>
      </div>
    );
  }

  return (
    <section className={styles.section} aria-label="Plumbing services booking">
      <div className={styles.layout}>
        <aside className={styles.categoryRail} aria-label="Plumbing categories">
          {CATEGORIES.map((category) => (
            <button key={category} type="button" className={activeCategory === category || (activeCategory === "All" && category === "Pipe Laying & Water Supply") ? styles.activeCategory : ""} onClick={() => selectCategory(category)}>
              {CATEGORY_ICONS[category]}<span>{category}</span>
            </button>
          ))}
          <button type="button" className={styles.newHomeCategory} onClick={() => document.getElementById("new-home-plumbing")?.scrollIntoView({ behavior: "smooth", block: "center" })}>
            <TbHome aria-hidden="true" /><span>New Home Plumbing</span>
          </button>
        </aside>

        <div className={styles.catalogColumn}>
          <nav className={styles.topFilters} aria-label="Quick service filters">
            {TOP_FILTERS.map((filter) => (
              <button key={filter} type="button" className={topFilter === filter ? styles.activeTopFilter : ""} onClick={() => { setTopFilter(filter); setActiveCategory("All"); }}>{filter}</button>
            ))}
          </nav>

          {visibleServices.length > 0 ? <div className={styles.servicesGrid}>{displayedServices.map(renderServiceCard)}</div> : (
            <div className={styles.noResults}><strong>No matching service found</strong><p>Try a different service name or category.</p></div>
          )}

          {visibleLimit < visibleServices.length && (
            <button className={styles.viewMoreButton} type="button" onClick={() => setVisibleLimit((current) => current + 8)}>
              View More Services <span>↓</span>
            </button>
          )}

          <article className={styles.newHomeCard} id="new-home-plumbing">
            <div className={styles.newHomeImage}><Image src="/plumbing-new-home-complete-work.webp" alt="New home complete plumbing work" fill sizes="(max-width: 800px) 100vw, 340px" /></div>
            <div className={styles.newHomeContent}>
              <span className={styles.premiumTag}>Premium site service</span>
              <h2>New Home Complete Plumbing Work</h2>
              <p>Complete plumbing work for a new house, villa or building. The final per-sq.-ft. rate and quotation are confirmed after property inspection.</p>
              <div className={styles.newHomeBooking}>
                <div><span>Mandatory Site Visit Payment</span><strong>₹500</strong><small>Booking is confirmed only after online payment.</small></div>
                <ServiceBookingModal
                  packageId="new-home-plumbing-site-visit"
                  serviceName="New Home Complete Plumbing Work - Site Visit"
                  originalPrice={500}
                  offerPrice={500}
                  triggerLabel="Pay ₹500 & Book Site Visit"
                  fullPayment
                />
              </div>
            </div>
          </article>
        </div>

        <aside className={styles.desktopBooking}>{renderBookingPanel()}</aside>
      </div>

      <div className={styles.mobileCartBar}>
        <button type="button" onClick={() => setMobileBookingOpen(true)} disabled={cartCount === 0}>
          <div><span>Your Booking</span><strong>{cartCount === 0 ? "Select a service" : money(subtotal)}</strong></div><b>View Booking <span>→</span></b>
        </button>
      </div>

      {mobileBookingOpen && (
        <div className={styles.mobileOverlay} role="dialog" aria-modal="true" aria-label="Plumbing booking summary">
          <button className={styles.backdrop} type="button" onClick={() => setMobileBookingOpen(false)} aria-label="Close booking" />
          <div className={styles.mobileSheet}>
            <button className={styles.closeSheet} type="button" onClick={() => setMobileBookingOpen(false)} aria-label="Close booking">×</button>
            {renderBookingPanel()}
          </div>
        </div>
      )}
    </section>
  );
}
