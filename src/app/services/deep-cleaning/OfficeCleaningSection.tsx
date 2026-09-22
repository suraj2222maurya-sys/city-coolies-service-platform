"use client";

import Image from "next/image";
import { useState } from "react";

import ServiceBookingModal from "@/components/booking/ServiceBookingModal";
import {
  OFFICE_CLEANING_SERVICES,
  calculateOfficeCleaningEstimate,
  type OfficeCleaningService,
} from "@/lib/services/officeCleaningCatalog";

const FEATURED_ID = "complete-office-deep-cleaning";

function currency(value: number): string {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(value);
}

function OfficeServiceCard({ service, featured = false }: { service: OfficeCleaningService; featured?: boolean }) {
  const [areaText, setAreaText] = useState("");
  const isCarpetShampooing = service.id === "office-carpet-chair-cleaning";
  const area = Number(areaText);
  const validArea = Number.isSafeInteger(area) && area >= service.minimumQuantity;
  const total = calculateOfficeCleaningEstimate(service, area) ?? 0;
  const selectedServices = validArea
    ? [{ id: service.id, name: service.name, quantity: area, unitPrice: service.rate, lineTotal: total }]
    : [];

  return (
    <article className={featured ? "cc-office-card cc-office-card--featured" : "cc-office-card"}>
      <div className="cc-office-card__image">
        <Image
          src={service.image}
          alt={`City Coolies ${service.name} service`}
          fill
          priority={featured}
          sizes={featured ? "(max-width: 900px) 100vw, 48vw" : "(max-width: 760px) 100vw, 360px"}
        />
        {featured && <span className="cc-office-card__badge">Most booked</span>}
      </div>

      <div className="cc-office-card__body">
        <div className="cc-office-card__heading">
          <div>
            <p className="cc-office-card__rating">★ {service.rating} <span>({service.reviewCount.toLocaleString("en-IN")})</span></p>
            <h3>{service.name}</h3>
          </div>
          <span className="cc-office-card__duration">{service.duration}</span>
        </div>

        <p className="cc-office-card__description">{service.description}</p>

        <ul className="cc-office-card__includes">
          {service.includes.map((item) => <li key={item}>{item}</li>)}
        </ul>

        <div className="cc-office-card__calculator">
          <label htmlFor={`office-area-${service.id}`}>
            <strong>{isCarpetShampooing ? "Enter carpet area" : "Enter office area"}</strong>
            <span className="cc-office-card__input-wrap">
              <input
                id={`office-area-${service.id}`}
                type="number"
                inputMode="numeric"
                min={service.minimumQuantity}
                step="1"
                value={areaText}
                onChange={(event) => setAreaText(event.target.value)}
                aria-invalid={!validArea}
              />
              <span>sq. ft.</span>
            </span>
            <small>
              {isCarpetShampooing
                ? "Rate: ₹5 / sq. ft."
                : `Rate: ${currency(service.rate)} / sq. ft.`}
            </small>
          </label>

          <div className="cc-office-card__total">
            <span>Estimated total</span>
            <strong>{validArea ? currency(total) : "—"}</strong>
            <small>
              {isCarpetShampooing
                ? "Carpet Shampooing: ₹5 / sq. ft."
                : "50% advance or Secure Online Payment"}
            </small>
            <small>
              {isCarpetShampooing
                ? "Total is calculated from the carpet area entered above."
                : "Estimated price. Final price may change after site inspection depending on the actual condition and cleaning requirements."}
            </small>
          </div>
        </div>

        <div className={validArea ? "cc-office-card__book" : "cc-office-card__book cc-office-card__book--disabled"}>
          {validArea ? (
            <ServiceBookingModal
              packageId="office-cleaning-plan"
              serviceName={`${service.name} - ${area.toLocaleString("en-IN")} sq. ft.`}
              originalPrice={total}
              offerPrice={total}
              triggerLabel={featured ? "Add & Book Service" : "Add"}
              customServices={selectedServices}
            />
          ) : (
            <button type="button" disabled>{featured ? "Add & Book Service" : "Add"}</button>
          )}
        </div>
      </div>
    </article>
  );
}

export default function OfficeCleaningSection() {
  const featured = OFFICE_CLEANING_SERVICES.find((service) => service.id === FEATURED_ID)!;
  const services = OFFICE_CLEANING_SERVICES.filter((service) => service.id !== FEATURED_ID);

  return (
    <section className="cc-office" id="office-cleaning-services" aria-labelledby="office-cleaning-title">
      <div className="cc-office__container">
        <header className="cc-office__header">
          <div>
            <p>Professional Office Cleaning</p>
            <h2 id="office-cleaning-title">A healthier workplace, professionally maintained.</h2>
            <span>Choose a service, enter your exact office area and get an instant transparent estimate.</span>
          </div>
          <div className="cc-office__trust">
            <span>✓ Verified professionals</span>
            <span>✓ Free site inspection</span>
            <span>✓ No hidden charges</span>
          </div>
        </header>

        <OfficeServiceCard service={featured} featured />

        <div className="cc-office__subheading">
          <p>Choose by need</p>
          <h3>Specialized office-cleaning solutions</h3>
        </div>

        <div className="cc-office__grid">
          {services.map((service) => <OfficeServiceCard key={service.id} service={service} />)}
        </div>

        <div className="cc-office__assurance">
          <span><strong>Free site inspection</strong><small>Professional area assessment</small></span>
          <span><strong>Flexible payment</strong><small>50% online advance or Secure Online Payment</small></span>
          <span><strong>WhatsApp confirmation</strong><small>Instant booking updates and support</small></span>
        </div>
      </div>
      <style>{OFFICE_STYLES}</style>
    </section>
  );
}

const OFFICE_STYLES = `
  .cc-office { display: none; padding: 28px 0 72px; background: radial-gradient(circle at 92% 4%, rgba(242,31,47,.1), transparent 28%), linear-gradient(145deg,#fff 0%,#fff8f9 58%,#ffecef 100%); }
  #cc-category-office:checked ~ .cc-office { display: block; }
  #cc-category-office:checked ~ .cc-full-home,
  #cc-category-office:checked ~ .cc-kitchen,
  #cc-category-office:checked ~ .cc-bathroom,
  #cc-category-office:checked ~ .cc-industrial,
  #cc-category-office:checked ~ .cc-commercial,
  #cc-category-office:checked ~ .cc-cobweb { display: none !important; }
  #cc-category-office:checked ~ .cc-deep-hero label[for="cc-category-office"] { border-color:#f21f2f; color:#e81929; background:#fff9fa; box-shadow:0 10px 27px rgba(239,31,48,.09); }
  .cc-office * { box-sizing: border-box; }
  .cc-office__container { width:min(100% - 40px,1680px); margin-inline:auto; }
  .cc-office__header { display:flex; justify-content:space-between; gap:24px; align-items:flex-end; padding:28px; border:1px solid rgba(242,31,47,.16); border-radius:24px; background:rgba(255,255,255,.9); box-shadow:0 18px 48px rgba(56,25,31,.06); }
  .cc-office__header p,.cc-office__subheading p { margin:0 0 7px; color:#ed1b2b; font-size:.75rem; font-weight:900; letter-spacing:.11em; text-transform:uppercase; }
  .cc-office__header h2 { max-width:760px; margin:0; color:#171923; font-size:clamp(1.9rem,3vw,3.1rem); line-height:1.08; letter-spacing:-.045em; }
  .cc-office__header > div > span { display:block; margin-top:10px; color:#656d7b; font-size:.9rem; line-height:1.6; }
  .cc-office__trust { display:flex; flex-wrap:wrap; justify-content:flex-end; gap:8px; }
  .cc-office__trust span { padding:9px 12px; border:1px solid rgba(242,31,47,.13); border-radius:9px; color:#343a46; background:#fff7f8; font-size:.7rem; font-weight:800; white-space:nowrap; }
  .cc-office-card { display:grid; grid-template-columns:minmax(220px,42%) minmax(0,58%); overflow:hidden; border:1px solid rgba(35,40,50,.11); border-radius:20px; background:#fff; box-shadow:0 14px 38px rgba(52,28,33,.07); }
  .cc-office-card--featured { grid-template-columns:minmax(360px,47%) minmax(0,53%); margin-top:20px; border-color:rgba(242,31,47,.23); }
  .cc-office-card__image { position:relative; min-height:260px; overflow:hidden; background:linear-gradient(145deg,#fff8f9,#ffecef); }
  .cc-office-card--featured .cc-office-card__image { min-height:430px; }
  .cc-office-card__image img { object-fit:contain !important; object-position:center !important; padding:8px; }
  .cc-office-card__badge { position:absolute; top:16px; left:16px; z-index:2; padding:8px 12px; border-radius:999px; color:#fff; background:#f21f2f; font-size:.7rem; font-weight:900; text-transform:uppercase; }
  .cc-office-card__body { display:flex; min-width:0; flex-direction:column; padding:22px; }
  .cc-office-card__heading { display:flex; justify-content:space-between; gap:14px; align-items:flex-start; }
  .cc-office-card__heading h3 { margin:5px 0 0; color:#171923; font-size:clamp(1.12rem,1.7vw,1.55rem); font-weight:850; line-height:1.16; letter-spacing:-.025em; }
  .cc-office-card__rating { margin:0; color:#f0a000; font-size:.72rem; font-weight:900; }
  .cc-office-card__rating span { color:#747b88; font-weight:600; }
  .cc-office-card__duration { padding:7px 9px; border-radius:8px; color:#e81929; background:#fff0f2; font-size:.67rem; font-weight:850; white-space:nowrap; }
  .cc-office-card__description { margin:10px 0 0; color:#626b79; font-size:.78rem; line-height:1.55; }
  .cc-office-card__includes { display:flex; flex-wrap:wrap; gap:7px; margin:13px 0 0; padding:0; list-style:none; }
  .cc-office-card__includes li { padding:7px 9px; border:1px solid rgba(242,31,47,.11); border-radius:7px; color:#454c58; background:#fff7f8; font-size:.63rem; font-weight:750; }
  .cc-office-card__calculator { display:grid; grid-template-columns:minmax(0,1fr) minmax(145px,.72fr); gap:15px; margin-top:auto; padding-top:18px; }
  .cc-office-card__calculator label { display:flex; min-width:0; flex-direction:column; gap:7px; color:#252a34; font-size:.72rem; }
  .cc-office-card__input-wrap { display:grid; grid-template-columns:minmax(0,1fr) auto; overflow:hidden; border:1px solid #d9dde4; border-radius:10px; background:#fff; }
  .cc-office-card__input-wrap:focus-within { border-color:#f21f2f; box-shadow:0 0 0 3px rgba(242,31,47,.1); }
  .cc-office-card__input-wrap input { width:100%; min-height:46px; padding:0 13px; border:0; outline:0; color:#171923; background:transparent; font:inherit; font-size:.88rem; font-weight:850; }
  .cc-office-card__input-wrap > span { display:flex; align-items:center; padding:0 12px; border-left:1px solid #d9dde4; color:#596170; background:#fafbfc; font-size:.68rem; font-weight:750; }
  .cc-office-card__calculator small { color:#737b88; font-size:.61rem; line-height:1.4; }
  .cc-office-card__total { display:flex; flex-direction:column; justify-content:center; padding:12px 14px; border:1px solid rgba(242,31,47,.14); border-radius:11px; background:#fff5f6; }
  .cc-office-card__total span { color:#555d6b; font-size:.65rem; font-weight:750; }
  .cc-office-card__total strong { margin-top:4px; color:#171923; font-size:1.35rem; line-height:1; }
  .cc-office-card__total small { margin-top:6px; }
  .cc-office-card__book { margin-top:12px; }
  .cc-office-card__book .cc-booking-trigger,.cc-office-card__book > button { width:100%; min-height:44px; border:1px solid #f21f2f; border-radius:9px; color:#fff; background:#f21f2f; font:inherit; font-size:.76rem; font-weight:900; cursor:pointer; }
  .cc-office-card__book .cc-booking-trigger:hover { background:#dc1726; }
  .cc-office-card__book--disabled > button { cursor:not-allowed; opacity:.45; }
  .cc-office__subheading { margin:34px 0 15px; }
  .cc-office__subheading h3 { margin:0; color:#171923; font-size:clamp(1.45rem,2.2vw,2rem); }
  .cc-office__grid { display:grid; grid-template-columns:repeat(2,minmax(0,1fr)); gap:18px; }
  .cc-office__assurance { display:grid; grid-template-columns:repeat(3,minmax(0,1fr)); gap:12px; margin-top:22px; padding:12px; border:1px solid rgba(242,31,47,.16); border-radius:18px; background:linear-gradient(135deg,#fff7f8,#ffecef); box-shadow:0 12px 32px rgba(56,25,31,.06); }
  .cc-office__assurance > span { position:relative; display:grid; min-height:82px; grid-template-columns:46px minmax(0,1fr); grid-template-rows:auto auto; column-gap:13px; align-content:center; padding:15px 17px; border:1px solid rgba(242,31,47,.12); border-radius:13px; background:rgba(255,255,255,.94); text-align:left; box-shadow:0 7px 18px rgba(53,29,34,.045); } .cc-office__assurance > span::before { display:grid; width:42px; height:42px; grid-row:1 / 3; place-items:center; align-self:center; border:1px solid rgba(242,31,47,.14); border-radius:50%; color:#f21f2f; background:#ffecef; content:"✓"; font-size:1rem; font-weight:900; } .cc-office__assurance > span:nth-child(2)::before { content:"₹"; } .cc-office__assurance > span:nth-child(3)::before { content:"↗"; }
  .cc-office__assurance > span:not(:last-child) { border-right:1px solid rgba(242,31,47,.12); }
  .cc-office__assurance strong { align-self:end; color:#20242d; font-size:.78rem; font-weight:850; line-height:1.3; }
  .cc-office__assurance small { align-self:start; margin-top:3px; color:#687180; font-size:.64rem; line-height:1.4; }
  @media (max-width:1050px) { .cc-office__header{align-items:flex-start;flex-direction:column}.cc-office__trust{justify-content:flex-start}.cc-office__grid{grid-template-columns:1fr}.cc-office-card--featured{grid-template-columns:1fr}.cc-office-card--featured .cc-office-card__image{min-height:360px} }
  @media (max-width:700px) { .cc-office{padding:18px 0 48px}.cc-office__container{width:min(100% - 24px,680px)}.cc-office__header{padding:19px;border-radius:18px}.cc-office-card,.cc-office-card--featured{grid-template-columns:1fr}.cc-office-card__image,.cc-office-card--featured .cc-office-card__image{min-height:230px}.cc-office-card__body{padding:16px}.cc-office-card__calculator{grid-template-columns:1fr}.cc-office__assurance{grid-template-columns:1fr}.cc-office__assurance > span:not(:last-child){border-right:0;border-bottom:1px solid rgba(35,40,50,.1)} }
`;
