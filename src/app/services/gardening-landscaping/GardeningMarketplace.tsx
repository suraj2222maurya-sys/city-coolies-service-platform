"use client";

import { useEffect, useMemo, useState, useSyncExternalStore } from "react";
import FullHomeRightSidebar from "../deep-cleaning/FullHomeRightSidebar";
import { getDeepCleaningCartServerSnapshot, getDeepCleaningCartSnapshot, parseDeepCleaningCartSnapshot, removeDeepCleaningCartItem, subscribeDeepCleaningCart, upsertDeepCleaningCartItem } from "../deep-cleaning/deepCleaningCart";
import styles from "./GardeningMarketplace.module.css";

type Job = { id: string; title: string; price: number; sizes?: readonly { label: string; price: number }[] };
type Service = { id: string; title: string; rating: string; reviews: number; description: string; note: string; jobs: readonly Job[]; process: readonly string[] };
const makeJobs = (names: readonly string[], prices: readonly number[]): Job[] => names.map((title, index) => ({ id: title.toLowerCase().replace(/[^a-z0-9]+/g, "-"), title, price: prices[index] }));
const plantNames = [
  "Money Plant", "Snake Plant", "Areca Palm", "Peace Lily", "ZZ Plant", "Rubber Plant", "Tulsi Plant", "Hibiscus Plant", "Black Rose", "Yellow Rose", "Red Rose", "Pink Rose", "Lemon Plant", "Banana Plant", "Moringa Plant",
  "Adenium Bonsai", "Azalea Bonsai", "Banyan Bonsai", "Ber Bonsai", "Bougainvillea Bonsai", "Boxwood Bonsai", "Chinese Elm Bonsai", "Crabapple Bonsai", "Curry Leaf Bonsai", "Dwarf Jade Bonsai", "Ficus Bonsai", "Fukien Tea Bonsai", "Ginseng Ficus Bonsai", "Guava Bonsai", "Jade Bonsai", "Japanese Maple Bonsai", "Juniper Bonsai", "Lemon Bonsai", "Mango Bonsai", "Neem Bonsai", "Olive Bonsai", "Orange Bonsai", "Peepal Bonsai", "Pomegranate Bonsai", "Serissa Bonsai", "Tamarind Bonsai", "Wrightia Bonsai",
] as const;
const nurseryPrices = [249, 299, 499, 349, 449, 399, 149, 249, 349, 299, 249, 299, 449, 399, 299, 999, 1499, 1199, 899, 999, 1299, 1199, 1499, 799, 699, 899, 1299, 999, 899, 699, 1999, 1499, 999, 1499, 899, 1599, 999, 899, 1199, 1299, 999, 1299] as const;
const potSizes = (base: number) => [{label:"Small (4–6 in)",price:base},{label:"Medium (8–10 in)",price:Math.round(base*1.6)},{label:"Large (12–14 in)",price:Math.round(base*2.5)}];
const services: readonly Service[] = [
  { id:"gardener", title:"Gardener", rating:"4.40", reviews:459000, description:"Book a gardener for pruning, weeding, watering, potting and seasonal upkeep. Plants, soil and extra materials are separate.", note:"Indicative labour rates by time. Tools, waste removal and materials are confirmed before service.", jobs:makeJobs(["2 Hours Gardener", "3 Hours Gardener", "8 Hours Gardener"],[499,699,1599]), process:["Discuss the garden size and tasks before arrival", "Check plant condition, water access and tools", "Prune, weed, loosen soil, water and repot within booked time", "Clean the work area and share maintenance suggestions"] },
  { id:"lawn-care", title:"Lawn Care", rating:"4.20", reviews:573, description:"Choose lawn upkeep jobs; charges are starting estimates for a small residential lawn.", note:"Final rate depends on lawn area, grass condition, access and supplies. Fertilizer and other materials are quoted separately.", jobs:makeJobs(["Lawn Mowing", "Lawn Edge Trimming", "Lawn Weed Removal", "Lawn Aeration", "Lawn Fertilizing"],[599,349,499,799,449]), process:["Measure the lawn and check grass height and obstacles", "Agree the selected mowing, edging, weed, aeration or fertilizer work", "Carry out the work using suitable equipment and protect nearby plants", "Clear cuttings as agreed and explain watering and aftercare"] },
  { id:"landscaping", title:"Landscaping", rating:"4.20", reviews:482, description:"Plan a new garden, turf, pathway or bed border with measurements and a site-specific material plan.", note:"The ₹500 site survey is charged once for selected landscaping jobs. Final construction and material rate is fixed after the survey; no fixed installation total is promised here.", jobs:makeJobs(["Complete Garden Setup", "Artificial Turf Installation", "Garden Pathway Installation", "Garden Bed Border Setup"],[500,500,500,500]), process:["Survey dimensions, sunlight, drainage and access", "Discuss the garden design, turf or pathway materials", "Confirm drawings, quantities, timeline and final quotation", "Prepare ground, install approved work and check levels and drainage"] },
  { id:"vertical-garden", title:"Vertical Garden", rating:"4.20", reviews:416, description:"Select a living or artificial vertical garden for a wall or balcony, plus ongoing maintenance.", note:"₹500 site survey covers selected installations once; final rate depends on wall, dimensions, irrigation and plant choices. Maintenance is an indicative visit charge.", jobs:makeJobs(["Natural Vertical Garden", "Artificial Vertical Garden", "Balcony Vertical Garden", "Vertical Garden Maintenance"],[500,500,500,699]), process:["Survey wall strength, space, light and water access", "Choose natural or artificial system, frame and planting", "Confirm fixing method, irrigation and final quotation", "Install approved panels and provide plant care or cleaning guidance"] },
  { id:"nursery", title:"Nursery", rating:"4.20", reviews:795, description:"Browse indoor plants, flowering plants, fruit plants and bonsai. Each plant has an indicative unit price and an illustrative image.", note:"Prices are illustrative per plant; mature bonsai, pot size, variety and local availability may change the final amount before payment. Images illustrate the plant variety; the delivered plant may differ in size and appearance.", jobs:makeJobs(plantNames,nurseryPrices), process:["Choose plants and quantities", "Confirm variety, size and live stock availability", "Check light and watering needs before placement", "Pack and hand over the selected plants with care instructions"] },
  { id:"pots", title:"Pots", rating:"4.20", reviews:534, description:"Select planter type and size for the space and plant's root requirements.", note:"Indicative prices are per pot. Size, material, drainage and local stock are confirmed before payment. Images illustrate the pot types; available colours and exact designs may vary.", jobs:[
    {id:"grow-bag",title:"Grow Bag",price:149,sizes:potSizes(149)},
    {id:"ceramic-pot",title:"Ceramic Pot",price:299,sizes:potSizes(299)},
    {id:"fiber-pot",title:"Fiber Pot",price:249,sizes:potSizes(249)},
    {id:"hanging-pot",title:"Hanging Pot",price:199,sizes:potSizes(199)},
    {id:"self-watering-pot",title:"Self-Watering Pot",price:349,sizes:potSizes(349)},
  ], process:["Choose planter type and size for each plant", "Check drainage holes, placement and root space", "Confirm available colour, exact dimensions and price", "Pack the planters and give setup or repotting guidance"] },
  { id:"compost", title:"Compost & Soil", rating:"4.20", reviews:388, description:"Choose planting media and soil conditioners for pots and garden beds.", note:"Indicative pack prices; confirm actual weight, brand and availability before payment. Cocopeat improves structure but is not a complete fertilizer by itself.", jobs:makeJobs(["Cocopeat Block (5 kg)","Neem Cake (1 kg)","Potting Mix (5 kg)","Vermicompost (5 kg)"],[449,249,399,399]), process:["Choose material and pack quantities", "Check plant and soil needs before mixing", "Confirm stock, pack weight and final amount", "Explain appropriate mixing and watering after application"] },
];
const formatReviews=(count:number)=>count>=1000?`${Math.round(count/1000)}K`:String(count);
const money=(amount:number)=>`₹${amount.toLocaleString("en-IN")}`;
const serviceImages: Record<string, string> = {
  "gardener": "gardener_service_banner.png",
  "lawn-care": "lawn_care_service_banner.png",
  "landscaping": "landscaping_service_banner.png",
  "vertical-garden": "vertical_garden_service_banner.png",
  "nursery": "nursery_service_banner.png",
  "pots": "pots_service_banner.png",
  "compost": "compost_soil_service_banner.png",
};
const cartId=(id:string)=>`gardening:${id}`;
const key=(job:Job,size?:string)=>`${job.id}:${size??"standard"}`;

export default function GardeningMarketplace(){
  const [active,setActive]=useState<Service|null>(null);
  const [quantities,setQuantities]=useState<Record<string,number>>({});
  const [sizes,setSizes]=useState<Record<string,string>>({});
  const [selectorScrolled,setSelectorScrolled]=useState(false);
  const snapshot=useSyncExternalStore(subscribeDeepCleaningCart,getDeepCleaningCartSnapshot,getDeepCleaningCartServerSnapshot);
  const cartItems=useMemo(()=>parseDeepCleaningCartSnapshot(snapshot),[snapshot]);
  const isSurvey=(job:Job)=>active?.id==="landscaping" || (active?.id==="vertical-garden" && job.id!=="vertical-garden-maintenance");
  const count=(job:Job)=>quantities[key(job,sizes[job.id]??job.sizes?.[0]?.label)]||0;
  const price=(job:Job)=>job.sizes?.find((size)=>size.label===(sizes[job.id]??job.sizes?.[0]?.label))?.price??job.price;
  const selectedJobs=active?.jobs.filter((job)=>count(job)>0)??[];
  const surveyChosen=selectedJobs.some(isSurvey);
  const total=selectedJobs.reduce((sum,job)=>sum+(isSurvey(job)?0:price(job)*count(job)),surveyChosen?500:0);

  useEffect(()=>{
    if(!active)return;
    const previous=document.body.style.overflow;document.body.style.overflow="hidden";
    const close=(event:KeyboardEvent)=>{if(event.key==="Escape")setActive(null)};
    window.addEventListener("keydown",close);
    return()=>{document.body.style.overflow=previous;window.removeEventListener("keydown",close)};
  },[active]);
  function open(service:Service){
    const existing=cartItems.find((item)=>item.id===cartId(service.id));
    const saved:Record<string,number>={};
    const savedSizes:Record<string,string>={};
    if(existing){
      for(const job of service.jobs){
        const label=existing.optionLabel.split(", ").find((part)=>part.startsWith(`${job.title} x `)||part.startsWith(`${job.title} (`));
        if(!label)continue;
        const match=label.match(/ x (\d+)$/);
        const size=job.sizes?.find((item)=>label.includes(`(${item.label})`))?.label;
        if(size)savedSizes[job.id]=size;
        if(match)saved[key(job,size??job.sizes?.[0]?.label)]=Number(match[1]);
      }
    }
    setQuantities(saved);setSizes(savedSizes);setActive(service);
  }
  function adjust(job:Job,delta:number){
    const id=key(job,sizes[job.id]??job.sizes?.[0]?.label);
    setQuantities((current)=>({...current,[id]:Math.max(0,(current[id]||0)+delta)}));
  }
  function changeSize(job:Job,value:string){
    const previous=key(job,sizes[job.id]??job.sizes?.[0]?.label);
    setQuantities((current)=>({...current,[previous]:0}));
    setSizes((current)=>({...current,[job.id]:value}));
  }
  function continueBooking(service:Service){
    if(!selectedJobs.length){removeDeepCleaningCartItem(cartId(service.id));setActive(null);return;}
    upsertDeepCleaningCartItem({
      id:cartId(service.id),serviceTitle:service.title,
      optionLabel:selectedJobs.map((job)=>`${job.title}${job.sizes?` (${sizes[job.id]??job.sizes[0].label})`:""} x ${count(job)}`).join(", "),
      price:total,priceLabel:money(total),
      duration:surveyChosen?"Site survey included once; final installation rate after assessment":"Indicative rate; stock, materials and final scope confirmed before payment",
    });
    window.dispatchEvent(new Event("citycoolies:deep-cleaning-cart-added"));setActive(null);
  }
  return <section className={styles.section} id="city-coolies-gardening">
    <div className={styles.container}><div className={styles.columns}><main className={styles.main}>
      <h1 className={styles.eyebrow}>Gardening &amp; Landscaping</h1>
      <div className={styles.selectorViewport}>
        <button type="button" className={styles.selectorPrevious} style={{display:selectorScrolled?undefined:"none"}} aria-label="Previous gardening services" onClick={()=>document.getElementById("gardening-selector")?.scrollBy({left:-320,behavior:"smooth"})}>←</button>
        <nav className={styles.selector} id="gardening-selector" aria-label="Select gardening service" onScroll={(event)=>setSelectorScrolled(event.currentTarget.scrollLeft>4)}>
          {services.map((service)=><button type="button" key={service.id} className={styles.selectorItem} onClick={()=>document.getElementById(service.id)?.scrollIntoView({behavior:"smooth",block:"start"})}><span className={styles.thumbnail} aria-hidden="true" style={{overflow:"hidden"}}><img src={`/gardening-landscaping/${serviceImages[service.id]}`} alt="" width={100} height={100} style={{display:"block",width:"100%",height:"100%",objectFit:"cover",objectPosition:"center"}} /></span><span className={styles.selectorLabel}>{service.title}</span></button>)}
        </nav>
        <button type="button" className={styles.selectorNext} aria-label="More gardening services" onClick={()=>document.getElementById("gardening-selector")?.scrollBy({left:320,behavior:"smooth"})}>→</button>
      </div>
      {services.map((service)=><section key={service.id} id={service.id} className={styles.serviceGroup}>
        <h2>{service.title}</h2><div className={styles.banner} aria-hidden="true"><img src={`/gardening-landscaping/${serviceImages[service.id]}`} alt="" width={1942} height={809} style={{display:"block",width:"100%",height:"100%",objectFit:"contain"}} /></div>
        <div className={styles.serviceRow}><div><h3>{service.title}</h3>
          <div className={styles.rating}><span className={styles.star} aria-hidden="true">★</span><span>{service.rating}</span><span>({formatReviews(service.reviews)} reviews)</span><button type="button" onClick={()=>open(service)}>View details</button></div>
          <strong>{service.id==="landscaping"||service.id==="vertical-garden"?"Site survey from ":"Starts at "}{money(Math.min(...service.jobs.map((job)=>job.price)))}</strong>
        </div><button type="button" className={styles.addButton} onClick={()=>open(service)}>Add</button></div>
      </section>)}
    </main><aside className={styles.sidebar}><FullHomeRightSidebar/></aside></div></div>
    {active&&<div className={styles.backdrop} onMouseDown={(event)=>{if(event.target===event.currentTarget)setActive(null)}}>
      <section className={styles.modal} role="dialog" aria-modal="true" aria-labelledby="garden-modal-title">
        <header className={styles.modalHeader}><div><h2 id="garden-modal-title">{active.title}</h2><p>Choose your requirements</p></div><button type="button" className={styles.closeButton} aria-label="Close details" onClick={()=>setActive(null)}>×</button></header>
        <div className={styles.modalBody}>
          <h3>Choose your requirements</h3><div className={`${styles.options} ${["nursery","pots","compost"].includes(active.id)?styles.productOptions:""}`}>
            {active.jobs.map((job)=><div className={styles.option} key={job.id}>
              {active.id==="nursery"
  ? <div className={styles.optionImage} aria-hidden="true" style={{overflow:"hidden"}}>
      <img src={`/gardening-landscaping/nursery-${job.id}.webp`} alt="" width={640} height={640}
        style={{display:"block",width:"100%",height:"100%",objectFit:"contain"}} />
    </div>
  : active.id==="pots"
  ? <div className={styles.optionImage} aria-hidden="true" style={{overflow:"hidden"}}>
      <img src={`/gardening-landscaping/pot-${job.id}.webp`} alt="" width={640} height={640}
        style={{display:"block",width:"100%",height:"100%",objectFit:"contain"}} />
    </div>
  : active.id==="compost"&&<div className={styles.optionImage} aria-hidden="true" style={{overflow:"hidden"}}>
  <img src={`/gardening-landscaping/compost-${job.id.replace(/-+$/, "")}.webp`} alt="" width={640} height={640}
    style={{display:"block",width:"100%",height:"100%",objectFit:"contain"}} />
</div>}
              <strong>{job.title}</strong>
              {job.sizes&&<label>Size <select value={sizes[job.id]??job.sizes[0].label} onChange={(event)=>changeSize(job,event.target.value)}>{job.sizes.map((size)=><option key={size.label} value={size.label}>{size.label} — {money(size.price)}</option>)}</select></label>}
              <span>{money(price(job))}</span>
              {count(job)>0?<div className={styles.quantity}><button type="button" aria-label={`Remove one ${job.title}`} onClick={()=>adjust(job,-1)}>−</button><span>{count(job)}</span><button type="button" aria-label={`Add one ${job.title}`} onClick={()=>adjust(job,1)}>＋</button></div>:<button type="button" className={styles.optionAdd} onClick={()=>adjust(job,1)}>Add</button>}
            </div>)}
          </div>
          <p className={styles.notice}>{active.note}</p><p>{active.description}</p>
          <div className={styles.infoBox}><h3>Work process</h3><ol>{active.process.map((step)=><li key={step}>{step}</li>)}</ol></div>
          <div className={styles.reviews}><strong><span className={styles.star}>★</span> {active.rating}</strong><span>{formatReviews(active.reviews)} reviews</span>
            {[5,4,3,2,1].map((score,index)=><div className={styles.ratingLine} key={score}><span>{score} ★</span><div><i style={{width:`${[48,29,13,7,3][index]}%`}}/></div><span>{[48,29,13,7,3][index]}%</span></div>)}
                </div>
        </div>
        <footer className={styles.modalFooter}><div><small>Selected total</small><strong>{money(total)}</strong></div><button type="button" disabled={!selectedJobs.length&&!cartItems.some((item)=>item.id===cartId(active.id))} onClick={()=>continueBooking(active)}>Continue</button></footer>
      </section>
    </div>}
  </section>;
}
