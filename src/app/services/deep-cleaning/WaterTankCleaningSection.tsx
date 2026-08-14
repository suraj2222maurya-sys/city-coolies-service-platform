"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import ServiceBookingModal from "@/components/booking/ServiceBookingModal";
import {
  WATER_TANK_CLEANING_SERVICES,
  type WaterTankCleaningService,
} from "@/lib/services/waterTankCleaningCatalog";

const money = (value: number) => `₹${value.toLocaleString("en-IN")}`;

function TankServiceCard({ service }: { service: WaterTankCleaningService }) {
  const [capacityId, setCapacityId] = useState(service.capacities[0]?.id ?? "");
  const [quantityText, setQuantityText] = useState("");
  const capacity = service.capacities.find((item) => item.id === capacityId) ?? service.capacities[0];
  const quantity = Number(quantityText);
  const validQuantity = Number.isSafeInteger(quantity) && quantity >= 1 && quantity <= 50;
  const total = capacity && validQuantity ? capacity.rate * quantity : 0;
  const bookingItems = useMemo(() => capacity && validQuantity ? [{
    id: capacity.id,
    name: `${service.name} — ${capacity.label}`,
    quantity,
    unitPrice: capacity.rate,
    lineTotal: total,
  }] : [], [capacity, quantity, service.name, total, validQuantity]);

  return (
    <article className={`cc-tank-card${service.featured ? " cc-tank-card--featured" : ""}`}>
      <div className="cc-tank-card__media">
        <Image src={service.image} alt={`City Coolies ${service.name}`} fill sizes={service.featured ? "(max-width: 900px) 100vw, 48vw" : "(max-width: 760px) 100vw, 360px"} />
        {service.featured && <span className="cc-tank-card__badge">Most booked</span>}
      </div>
      <div className="cc-tank-card__body">
        <div className="cc-tank-card__topline"><span>★ {service.rating} ({service.reviewCount.toLocaleString("en-IN")})</span><small>{service.duration}</small></div>
        <h3>{service.name}</h3>
        <p>{service.description}</p>
        <ul>{service.includes.map((item) => <li key={item}>{item}</li>)}</ul>
        <div className="cc-tank-card__controls">
          <label>Tank capacity
            <select value={capacityId} onChange={(event) => setCapacityId(event.target.value)}>
              {service.capacities.map((item) => <option value={item.id} key={item.id}>{item.label} — {money(item.rate)} / tank</option>)}
            </select>
          </label>
          <label>Number of tanks
            <input type="number" inputMode="numeric" min="1" max="50" placeholder="Enter quantity" value={quantityText} onChange={(event) => setQuantityText(event.target.value.replace(/[^0-9]/g, ""))} />
          </label>
        </div>
        <div className="cc-tank-card__estimate">
          <span><small>Rate per tank</small><strong>{capacity ? money(capacity.rate) : "—"}</strong></span>
          <span><small>Estimated total</small><strong>{total > 0 ? money(total) : "—"}</strong></span>
        </div>
        <p className="cc-tank-card__inspection"><strong>Important:</strong> This is an estimated price. The final rate will be confirmed after a free site visit and tank inspection. Extra sludge, difficult access or severe contamination may change the final price.</p>
        {bookingItems.length > 0 ? (
          <ServiceBookingModal packageId="water-tank-cleaning-plan" serviceName={`${service.name} — ${capacity?.label ?? ""} — ${quantity} tank${quantity > 1 ? "s" : ""}`} originalPrice={total} offerPrice={total} customServices={bookingItems} triggerLabel="Add & Book Service" />
        ) : <button className="cc-tank-card__disabled" type="button" disabled>Enter tank quantity to book</button>}
      </div>
    </article>
  );
}

export default function WaterTankCleaningSection() {
  return (
    <section className="cc-water-tank" aria-labelledby="cc-water-tank-title">
      <div className="cc-water-tank__container">
        <header className="cc-water-tank__header"><p>HYGIENIC WATER STORAGE CARE</p><h2 id="cc-water-tank-title">Professional water tank cleaning</h2><span>Select tank capacity, enter the number of tanks and see your estimated total instantly.</span></header>
        <div className="cc-water-tank__trust"><span>✓ Trained professionals</span><span>✓ Professional equipment</span><span>✓ Free site inspection</span></div>
        <div className="cc-water-tank__grid">{WATER_TANK_CLEANING_SERVICES.map((service) => <TankServiceCard service={service} key={service.id} />)}</div>
        <div className="cc-water-tank__assurance"><div><strong>Free site inspection</strong><small>Tank condition and access assessment</small></div><div><strong>Transparent estimate</strong><small>Capacity and quantity based pricing</small></div><div><strong>WhatsApp confirmation</strong><small>Instant booking updates and support</small></div></div>
      </div>
      <style jsx global>{`
        .cc-water-tank{display:none;padding:26px 0 58px;background:linear-gradient(145deg,#fff 0%,#fff6f8 58%,#ffecef 100%)}
        #cc-category-water-tank:checked~section:not(.cc-deep-hero):not(.cc-water-tank){display:none!important}
        #cc-category-water-tank:checked~.cc-water-tank{display:block!important}
        #cc-category-water-tank:checked~.cc-deep-hero label[for="cc-category-water-tank"]{border-color:#f21f2f;color:#e81929;background:#fff9fa;box-shadow:0 10px 27px rgba(239,31,48,.09)}
        .cc-water-tank__container{width:min(100% - 40px,1680px);margin:auto}.cc-water-tank__header{text-align:center}.cc-water-tank__header p{margin:0 0 7px;color:#ed1b2b;font-size:.74rem;font-weight:850;letter-spacing:.12em}.cc-water-tank__header h2{margin:0;color:#171820;font-size:clamp(2rem,3vw,3.1rem);letter-spacing:-.045em}.cc-water-tank__header span{display:block;margin-top:10px;color:#68707e}.cc-water-tank__trust{display:flex;justify-content:center;flex-wrap:wrap;gap:10px;margin:19px 0 25px}.cc-water-tank__trust span{padding:8px 13px;border:1px solid #ffd0d6;border-radius:999px;color:#343945;background:#fff;font-size:.74rem;font-weight:750}
        .cc-water-tank__grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:18px}.cc-tank-card{display:grid;grid-template-columns:minmax(210px,39%) minmax(0,1fr);overflow:hidden;border:1px solid rgba(242,31,47,.16);border-radius:20px;background:#fff;box-shadow:0 13px 35px rgba(54,24,30,.06)}.cc-tank-card--featured{grid-column:1/-1;grid-template-columns:minmax(340px,46%) minmax(0,1fr)}.cc-tank-card__media{position:relative;min-height:100%;background:#fff4f6}.cc-tank-card__media img{object-fit:contain;object-position:center}.cc-tank-card__badge{position:absolute;top:13px;left:13px;padding:7px 12px;border-radius:999px;color:#fff;background:#f21f2f;font-size:.68rem;font-weight:850;text-transform:uppercase}.cc-tank-card__body{display:flex;min-width:0;flex-direction:column;padding:18px}.cc-tank-card__topline{display:flex;justify-content:space-between;gap:10px;color:#ed9200;font-size:.69rem;font-weight:800}.cc-tank-card__topline small{padding:5px 8px;border-radius:7px;color:#e81929;background:#fff0f2}.cc-tank-card h3{margin:9px 0 0;color:#171820;font-size:1.22rem;font-weight:850}.cc-tank-card__body>p:not(.cc-tank-card__inspection){margin:7px 0 0;color:#68707e;font-size:.74rem;line-height:1.5}.cc-tank-card ul{display:flex;flex-wrap:wrap;gap:6px;margin:11px 0;padding:0;list-style:none}.cc-tank-card li{padding:5px 8px;border:1px solid #ffd6dc;border-radius:7px;color:#4d535e;background:#fff8f9;font-size:.61rem;font-weight:700}
        .cc-tank-card__controls{display:grid;grid-template-columns:1fr 150px;gap:10px}.cc-tank-card__controls label{color:#343945;font-size:.68rem;font-weight:800}.cc-tank-card select,.cc-tank-card input{width:100%;height:42px;margin-top:6px;padding:0 11px;border:1px solid #dfe2e7;border-radius:9px;color:#222833;background:#fff;font:inherit;font-size:.72rem;box-sizing:border-box;outline:none}.cc-tank-card select:focus,.cc-tank-card input:focus{border-color:#f21f2f;box-shadow:0 0 0 3px rgba(242,31,47,.09)}.cc-tank-card__estimate{display:grid;grid-template-columns:1fr 1fr;gap:10px;margin-top:11px}.cc-tank-card__estimate span{display:flex;flex-direction:column;padding:9px 11px;border-radius:9px;background:#fff3f5}.cc-tank-card__estimate small{color:#6d7480;font-size:.61rem}.cc-tank-card__estimate strong{margin-top:3px;color:#171820;font-size:1.05rem}.cc-tank-card__inspection{margin:10px 0!important;padding:9px 11px;border-left:3px solid #f21f2f;color:#5b4146!important;background:#fff8f9;font-size:.62rem!important;line-height:1.45!important}.cc-tank-card .cc-booking-trigger,.cc-tank-card__disabled{width:100%;min-height:42px;border:1px solid #f21f2f;border-radius:9px;color:#fff;background:#f21f2f;font:inherit;font-size:.75rem;font-weight:850}.cc-tank-card__disabled{border-color:#e1e3e7;color:#868c96;background:#f4f5f6}.cc-water-tank__assurance{display:grid;grid-template-columns:repeat(3,1fr);margin-top:20px;overflow:hidden;border:1px solid #ffd3d8;border-radius:16px;background:linear-gradient(90deg,#fff5f7,#fff)}.cc-water-tank__assurance div{display:flex;flex-direction:column;align-items:center;padding:16px;text-align:center}.cc-water-tank__assurance div+div{border-left:1px solid #eedde0}.cc-water-tank__assurance strong{color:#272b34;font-size:.75rem}.cc-water-tank__assurance small{margin-top:4px;color:#6b7280;font-size:.64rem}
        @media(max-width:1050px){.cc-water-tank__grid{grid-template-columns:1fr}.cc-tank-card--featured{grid-column:auto}.cc-tank-card,.cc-tank-card--featured{grid-template-columns:40% minmax(0,1fr)}}@media(max-width:700px){.cc-water-tank__container{width:min(100% - 24px,680px)}.cc-tank-card,.cc-tank-card--featured{grid-template-columns:1fr}.cc-tank-card__media{min-height:220px}.cc-tank-card__controls{grid-template-columns:1fr}.cc-water-tank__assurance{grid-template-columns:1fr}.cc-water-tank__assurance div+div{border-left:0;border-top:1px solid #eedde0}}@media(max-width:420px){.cc-tank-card__estimate{grid-template-columns:1fr}}
      `}</style>
    </section>
  );
}
