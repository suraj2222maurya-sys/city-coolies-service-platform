"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import ServiceBookingModal from "@/components/booking/ServiceBookingModal";
import { UPHOLSTERY_PRICING_ITEMS } from "@/lib/services/upholsteryCleaningCatalog";

type CardKind = "sofa" | "mattress" | "combo" | "dining" | "recliner" | "office";
type BookingItem = { id: string; name: string; quantity: number; unitPrice: number; lineTotal: number };
type CardData = { kind: CardKind; name: string; image: string; description: string; rating: number; reviews: number; duration: string; includes: readonly string[] };

const CARDS: readonly CardData[] = [
  { kind:"sofa", name:"Professional Sofa Deep Cleaning", image:"/sofa-cleaning.webp", description:"Extraction cleaning for fabric sofa seats, backs, arms and accessible upholstery surfaces.", rating:4.9, reviews:2846, duration:"60–120 mins", includes:["Deep Vacuuming","Fabric Shampooing","Stain & Odour Treatment"] },
  { kind:"mattress", name:"Mattress Deep Cleaning", image:"/mattress-deep-cleaning.webp", description:"Hygienic extraction cleaning for single, double, queen and king-size mattresses.", rating:4.8, reviews:1924, duration:"45–90 mins", includes:["Dust Extraction","Surface Stain Treatment","Deodorization"] },
  { kind:"combo", name:"Sofa + Mattress Cleaning Combo", image:"/sofa-mattress-cleaning-combo.webp", description:"Value combo for cleaning sofa seating and your selected mattress size in one visit.", rating:4.9, reviews:1386, duration:"2–4 hrs", includes:["Discounted Sofa Rate","Mattress Deep Cleaning","Single Service Visit"] },
  { kind:"dining", name:"Dining Chair Upholstery Cleaning", image:"/dining-chair-upholstery-cleaning.webp", description:"Careful extraction cleaning for upholstered dining-chair seats and backs.", rating:4.8, reviews:846, duration:"30–90 mins", includes:["Seat & Back Cleaning","Fabric-Safe Shampoo","Quick Moisture Extraction"] },
  { kind:"recliner", name:"Recliner Deep Cleaning", image:"/recliner-deep-cleaning.webp", description:"Detailed cleaning for recliner seats, arms, backrests and accessible creases.", rating:4.8, reviews:714, duration:"45–75 mins", includes:["Crease Vacuuming","Upholstery Extraction","Odour Treatment"] },
  { kind:"office", name:"Office Sofa & Chair Cleaning", image:"/office-sofa-chair-cleaning.webp", description:"Professional upholstery care for reception sofas and fabric office chairs.", rating:4.8, reviews:628, duration:"2–5 hrs", includes:["Reception Sofa Cleaning","Office Chair Cleaning","Commercial Equipment"] },
];

const MATTRESS_OPTIONS = [
  ["mattress-single","Single"],["mattress-double","Double"],["mattress-queen","Queen"],["mattress-king","King"],
] as const;
const COMBO_MATTRESS_OPTIONS = [
  ["combo-mattress-single","Single"],["combo-mattress-double","Double"],["combo-mattress-queen","Queen"],["combo-mattress-king","King"],
] as const;

function currency(value:number){return new Intl.NumberFormat("en-IN",{style:"currency",currency:"INR",maximumFractionDigits:0}).format(value)}
function positive(value:string){const number=Number(value);return Number.isSafeInteger(number)&&number>0&&number<=100?number:0}
function item(id:string,quantity:number):BookingItem|null{const source=UPHOLSTERY_PRICING_ITEMS[id];return source&&quantity>0?{id:source.id,name:source.name,quantity,unitPrice:source.unitPrice,lineTotal:source.unitPrice*quantity}:null}

function UpholsteryCard({card,featured=false}:{card:CardData;featured?:boolean}){
  const [quantity,setQuantity]=useState("");
  const [secondQuantity,setSecondQuantity]=useState("");
  const [sizeId,setSizeId]=useState("");
  const services=useMemo(()=>{
    const qty=positive(quantity); const second=positive(secondQuantity); const values:(BookingItem|null)[]=[];
    if(card.kind==="sofa") values.push(item("sofa-seat",qty));
    if(card.kind==="mattress") values.push(item(sizeId,qty));
    if(card.kind==="combo"){values.push(item("combo-sofa-seat",qty));values.push(item(sizeId,second))}
    if(card.kind==="dining") values.push(item("dining-chair",qty));
    if(card.kind==="recliner") values.push(item("recliner",qty));
    if(card.kind==="office"){values.push(item("office-sofa-seat",qty));values.push(item("office-chair",second))}
    return values.filter((value):value is BookingItem=>value!==null);
  },[card.kind,quantity,secondQuantity,sizeId]);
  const valid=card.kind==="combo"?services.length===2:card.kind==="office"?services.length>0:services.length===1;
  const total=services.reduce((sum,service)=>sum+service.lineTotal,0);
  const options=card.kind==="combo"?COMBO_MATTRESS_OPTIONS:MATTRESS_OPTIONS;

  return <article className={featured?"cc-up-card cc-up-card--featured":"cc-up-card"}>
    <div className="cc-up-card__image"><Image src={card.image} alt={`City Coolies ${card.name}`} fill priority={featured} sizes={featured?"(max-width:980px) 100vw,48vw":"(max-width:760px) 100vw,360px"}/>{featured&&<span>Most booked</span>}</div>
    <div className="cc-up-card__body">
      <div className="cc-up-card__heading"><div><p>★ {card.rating} <span>({card.reviews.toLocaleString("en-IN")})</span></p><h3>{card.name}</h3></div><small>{card.duration}</small></div>
      <p className="cc-up-card__description">{card.description}</p>
      <ul>{card.includes.map(value=><li key={value}>{value}</li>)}</ul>
      <div className="cc-up-card__controls">
        {(card.kind==="mattress"||card.kind==="combo")&&<label><strong>Mattress size</strong><select value={sizeId} onChange={event=>setSizeId(event.target.value)}><option value="">Select size</option>{options.map(([id,label])=><option key={id} value={id}>{label}</option>)}</select></label>}
        <label><strong>{card.kind==="sofa"||card.kind==="combo"||card.kind==="office"?"Sofa seats":card.kind==="mattress"?"Mattresses":card.kind==="dining"?"Dining chairs":"Recliners"}</strong><input type="number" inputMode="numeric" min="1" max="100" placeholder="Enter quantity" value={quantity} onChange={event=>setQuantity(event.target.value)}/></label>
        {(card.kind==="combo"||card.kind==="office")&&<label><strong>{card.kind==="combo"?"Mattresses":"Office chairs"}</strong><input type="number" inputMode="numeric" min={card.kind==="combo"?"1":"0"} max="100" placeholder="Enter quantity" value={secondQuantity} onChange={event=>setSecondQuantity(event.target.value)}/></label>}
      </div>
      <div className="cc-up-card__price"><span>Estimated total</span><strong>{valid?currency(total):"—"}</strong><small>{card.kind==="sofa"?"₹299 / seat":card.kind==="dining"?"₹199 / chair":card.kind==="recliner"?"₹499 / recliner":"Total updates from your selection"}</small></div>
      <p className="cc-up-card__note">Final suitability and stain-removal scope depend on fabric type, care label and upholstery condition. Delicate or damaged fabric is confirmed after professional inspection.</p>
      <div className={valid?"cc-up-card__book":"cc-up-card__book cc-up-card__book--disabled"}>{valid?<ServiceBookingModal packageId="upholstery-cleaning-plan" serviceName={card.name} originalPrice={total} offerPrice={total} triggerLabel={featured?"Add & Book Service":"Add"} customServices={services}/>:<button type="button" disabled>{featured?"Add & Book Service":"Add"}</button>}</div>
    </div>
  </article>
}

export default function UpholsteryCleaningSection(){return <section className="cc-upholstery" id="mattress-sofa-cleaning" aria-labelledby="upholstery-title"><div className="cc-up__container">
  <header className="cc-up__header"><div><p>Mattress & Sofa Cleaning</p><h2 id="upholstery-title">Fresh upholstery, healthier comfort.</h2><span>Select size and quantity to receive an instant transparent total.</span></div><div className="cc-up__trust"><span>✓ Fabric-safe process</span><span>✓ Trained professionals</span><span>✓ Transparent pricing</span></div></header>
  <UpholsteryCard card={CARDS[0]!} featured/><div className="cc-up__sub"><p>Choose by need</p><h3>Professional upholstery-cleaning services</h3></div><div className="cc-up__grid">{CARDS.slice(1).map(card=><UpholsteryCard key={card.kind} card={card}/>)}</div>
  <div className="cc-up__assurance"><span><i>✓</i><strong>Professional extraction</strong><small>Controlled moisture and deep vacuuming</small></span><span><i>◎</i><strong>Fabric-first inspection</strong><small>Care label and material suitability check</small></span><span><i>↗</i><strong>WhatsApp confirmation</strong><small>Instant booking updates and support</small></span></div>
  </div><style>{STYLES}</style></section>}

const STYLES=`
.cc-upholstery{display:none;padding:28px 0 72px;background:radial-gradient(circle at 92% 4%,rgba(242,31,47,.1),transparent 28%),linear-gradient(145deg,#fff,#fff8f9 58%,#ffecef)}#cc-category-upholstery:checked~.cc-upholstery{display:block}#cc-category-upholstery:checked~.cc-full-home,#cc-category-upholstery:checked~.cc-kitchen,#cc-category-upholstery:checked~.cc-bathroom,#cc-category-upholstery:checked~.cc-industrial,#cc-category-upholstery:checked~.cc-commercial,#cc-category-upholstery:checked~.cc-cobweb,#cc-category-upholstery:checked~.cc-office,#cc-category-upholstery:checked~.cc-villa{display:none!important}#cc-category-upholstery:checked~.cc-deep-hero label[for="cc-category-upholstery"]{border-color:#f21f2f;color:#e81929;background:#fff9fa;box-shadow:0 10px 27px rgba(239,31,48,.09)}.cc-upholstery *{box-sizing:border-box}.cc-up__container{width:min(100% - 40px,1680px);margin:auto}.cc-up__header{display:flex;justify-content:space-between;gap:24px;align-items:flex-end;padding:28px;border:1px solid rgba(242,31,47,.16);border-radius:24px;background:#fff;box-shadow:0 18px 48px rgba(56,25,31,.06)}.cc-up__header p,.cc-up__sub p{margin:0 0 7px;color:#ed1b2b;font-size:.75rem;font-weight:900;letter-spacing:.11em;text-transform:uppercase}.cc-up__header h2{margin:0;color:#171923;font-size:clamp(1.9rem,3vw,3.1rem);line-height:1.08}.cc-up__header>div>span{display:block;margin-top:10px;color:#656d7b;font-size:.9rem}.cc-up__trust{display:flex;flex-wrap:wrap;gap:8px}.cc-up__trust span{padding:9px 12px;border:1px solid rgba(242,31,47,.13);border-radius:9px;background:#fff7f8;font-size:.7rem;font-weight:800}.cc-up-card{display:grid;grid-template-columns:42% 58%;overflow:hidden;border:1px solid rgba(35,40,50,.11);border-radius:20px;background:#fff;box-shadow:0 14px 38px rgba(52,28,33,.07)}.cc-up-card--featured{grid-template-columns:47% 53%;margin-top:20px;border-color:rgba(242,31,47,.23)}.cc-up-card__image{position:relative;min-height:300px;background:#fff7f8}.cc-up-card--featured .cc-up-card__image{min-height:480px}.cc-up-card__image img{object-fit:contain!important;object-position:center!important;padding:8px}.cc-up-card__image>span{position:absolute;top:16px;left:16px;z-index:2;padding:8px 12px;border-radius:999px;color:#fff;background:#f21f2f;font-size:.7rem;font-weight:900;text-transform:uppercase}.cc-up-card__body{display:flex;min-width:0;flex-direction:column;padding:22px}.cc-up-card__heading{display:flex;justify-content:space-between;gap:12px}.cc-up-card__heading p{margin:0;color:#f0a000;font-size:.72rem;font-weight:900}.cc-up-card__heading p span{color:#747b88}.cc-up-card__heading h3{margin:5px 0 0;color:#171923;font-size:clamp(1.12rem,1.7vw,1.55rem);line-height:1.15}.cc-up-card__heading>small{height:max-content;padding:7px 9px;border-radius:8px;color:#e81929;background:#fff0f2;font-size:.67rem;font-weight:850;white-space:nowrap}.cc-up-card__description{margin:10px 0 0;color:#626b79;font-size:.78rem;line-height:1.55}.cc-up-card__body ul{display:flex;flex-wrap:wrap;gap:7px;margin:13px 0 0;padding:0;list-style:none}.cc-up-card__body li{padding:7px 9px;border:1px solid rgba(242,31,47,.11);border-radius:7px;background:#fff7f8;font-size:.63rem;font-weight:750}.cc-up-card__controls{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:9px;margin-top:auto;padding-top:17px}.cc-up-card__controls label{display:flex;min-width:0;flex-direction:column;gap:6px;font-size:.68rem}.cc-up-card__controls input,.cc-up-card__controls select{width:100%;min-height:44px;padding:0 10px;border:1px solid #d9dde4;border-radius:9px;outline:0;background:#fff;font:inherit}.cc-up-card__controls input:focus,.cc-up-card__controls select:focus{border-color:#f21f2f;box-shadow:0 0 0 3px rgba(242,31,47,.1)}.cc-up-card__price{display:flex;flex-wrap:wrap;align-items:center;gap:8px;margin-top:11px;padding:11px 13px;border:1px solid rgba(242,31,47,.14);border-radius:10px;background:#fff5f6}.cc-up-card__price span{font-size:.65rem}.cc-up-card__price strong{color:#171923;font-size:1.25rem}.cc-up-card__price small{margin-left:auto;color:#6b7380;font-size:.61rem}.cc-up-card__note{margin:9px 0 0;padding:8px 10px;border-left:3px solid #f21f2f;border-radius:6px;color:#626b79;background:#fff7f8;font-size:.61rem;line-height:1.4}.cc-up-card__book{margin-top:10px}.cc-up-card__book .cc-booking-trigger,.cc-up-card__book>button{width:100%;min-height:44px;border:1px solid #f21f2f;border-radius:9px;color:#fff;background:#f21f2f;font:inherit;font-size:.76rem;font-weight:900}.cc-up-card__book--disabled>button{opacity:.45}.cc-up__sub{margin:34px 0 15px}.cc-up__sub h3{margin:0;color:#171923;font-size:clamp(1.45rem,2.2vw,2rem)}.cc-up__grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:18px}.cc-up__assurance{display:grid;grid-template-columns:repeat(3,1fr);gap:12px;margin-top:22px;padding:12px;border:1px solid rgba(242,31,47,.16);border-radius:18px;background:linear-gradient(135deg,#fff7f8,#ffecef)}.cc-up__assurance>span{display:grid;min-height:82px;grid-template-columns:46px 1fr;grid-template-rows:auto auto;column-gap:13px;align-content:center;padding:15px 17px;border:1px solid rgba(242,31,47,.12);border-radius:13px;background:#fff}.cc-up__assurance i{display:grid;width:42px;height:42px;grid-row:1/3;place-items:center;border-radius:50%;color:#f21f2f;background:#ffecef;font-style:normal;font-weight:900}.cc-up__assurance strong{align-self:end;font-size:.78rem}.cc-up__assurance small{align-self:start;margin-top:3px;color:#687180;font-size:.64rem}@media(max-width:1050px){.cc-up__header{align-items:flex-start;flex-direction:column}.cc-up__grid{grid-template-columns:1fr}.cc-up-card--featured{grid-template-columns:1fr}.cc-up-card--featured .cc-up-card__image{min-height:360px}}@media(max-width:700px){.cc-upholstery{padding:18px 0 48px}.cc-up__container{width:min(100% - 24px,680px)}.cc-up-card,.cc-up-card--featured{grid-template-columns:1fr}.cc-up-card__image,.cc-up-card--featured .cc-up-card__image{min-height:230px}.cc-up-card__body{padding:16px}.cc-up-card__controls{grid-template-columns:1fr}.cc-up__assurance{grid-template-columns:1fr}}
`;
