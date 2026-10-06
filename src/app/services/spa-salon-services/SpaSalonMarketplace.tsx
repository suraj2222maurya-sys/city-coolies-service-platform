"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { readDeepCleaningCart, removeDeepCleaningCartItem, upsertDeepCleaningCartItem } from "../deep-cleaning/deepCleaningCart";
import FullHomeRightSidebar from "../deep-cleaning/FullHomeRightSidebar";
import styles from "./SpaSalonMarketplace.module.css";

type Category = "women" | "men";
type Service = { id: string; title: string; price: number };
const categories: { id: Category; label: string; image: string }[] = [
  { id: "women", label: "Women", image: "/spa-salon/spa-women-icon.png" },
  { id: "men", label: "Men", image: "/spa-salon/spa-men-icon.png" },
];
const hairOptions = [
  { id: "haircut", title: "Women's Haircut", price: 549, image: "/spa-salon/haircut.ec1a2220a849.webp", duration: "45 min" },
  { id: "blow-dry", title: "Wash & Blow-Dry", price: 699, image: "/spa-salon/blow_dry.720fc6addce0.webp", duration: "60 min" },
  { id: "hair-spa", title: "Hair Spa", price: 1299, image: "/spa-salon/hair_spa.9117515ea94a.webp", duration: "75 min" },
  { id: "root-touch-up", title: "Root Touch-Up", price: 999, image: "/spa-salon/root_touch_up.920edef322a9.webp", duration: "75 min" },
  { id: "global-colour", title: "Global Hair Colour", price: 2399, image: "/spa-salon/global_colour.5efe93de31ab.webp", duration: "120 min" },
  { id: "keratin", title: "Keratin Smoothing", price: 3999, image: "/spa-salon/keratin_smoothing.4976c0645e48.webp", duration: "180 min" },
];
const waxingImageRatios: Record<string, string> = {
  stomach: "2048 / 1365",
  "full-legs": "2048 / 1538",
  brazilian: "1536 / 1024",
  underarms: "2048 / 1365",
  butt: "2048 / 1793",
  bikini: "2048 / 1365",
  back: "2048 / 1365",
  "bikini-line": "2048 / 1365",
  "full-body": "2048 / 1365",
  threading: "2048 / 1366",
};
const waxingOptions = [
  { id: "stomach", title: "Stomach Waxing", price: 399, image: "/spa-salon/stomach_waxing.jpg", duration: "30 min" },
  { id: "full-legs", title: "Full Legs Waxing", price: 549, image: "/spa-salon/full_legs_waxing.jpg", duration: "45 min" },
  { id: "brazilian", title: "Brazilian Stripless Waxing", price: 1499, image: "/spa-salon/brazilian_waxing.3a02f2faa27e.webp", duration: "50 min" },
  { id: "underarms", title: "Underarms Waxing", price: 149, image: "/spa-salon/underarms_waxing.jpg", duration: "15 min" },
  { id: "butt", title: "Butt Waxing", price: 349, image: "/spa-salon/butt_waxing.jpg", duration: "25 min" },
  { id: "bikini", title: "Bikini Waxing", price: 1099, image: "/spa-salon/bikini_waxing.jpg", duration: "40 min" },
  { id: "back", title: "Back Waxing", price: 599, image: "/spa-salon/back_waxing.jpg", duration: "35 min" },
  { id: "bikini-line", title: "Bikini Line Waxing", price: 399, image: "/spa-salon/bikini_line_waxing.jpg", duration: "20 min" },
  { id: "full-body", title: "Full Body Waxing", price: 1799, image: "/spa-salon/full_body_waxing.jpg", duration: "120 min" },
  { id: "threading", title: "Eyebrow Threading", price: 99, image: "/spa-salon/threading.jpg", duration: "15 min" },
];
const womenServices: Service[] = [
  { id: "salon-for-women", title: "Facial for Women", price: 499 },
  { id: "spa-for-women", title: "Spa for Women", price: 599 },
  { id: "hair-studio-for-women", title: "Hair Studio for Women", price: 549 },
  { id: "waxing-for-women", title: "Waxing for Women", price: 99 },
];

const spaOptions = [
  { id: "stress-relief", title: "Stress Relief", price: 1299, image: "/spa-salon/stress_relief_spa.6daac463c1e4.webp" },
  { id: "deep-tissue", title: "Deep Tissue Massage", price: 1499, image: "/spa-salon/deep_tissue_massage.639e32a4215a.webp" },
  { id: "deep-tissue-foot", title: "Deep Tissue with Foot Massage", price: 1999, image: "/spa-salon/deep_tissue_foot_massage.995ec0307c7e.webp" },
  { id: "back-relief", title: "Back Relief Massage", price: 929, image: "/spa-salon/back_relief_massage.b987dcb520fc.webp" },
  { id: "vedic-signature", title: "Vedic Signature Massage", price: 1899, image: "/spa-salon/vedic_signature_massage.fdb1b4d54c43.webp" },
  { id: "abhyangam", title: "Abhyangam Neck-to-Toe Stress Relief Massage", price: 2199, image: "/spa-salon/abhyangam_stress_relief_massage.ec4892834ea2.webp" },
  { id: "body-scrub", title: "Full Body Massage & Scrub", price: 1899, image: "/spa-salon/full_body_massage_scrub.9af85a2552d5.webp" },
  { id: "post-natal", title: "Post Natal Massage", price: 1999, image: "/spa-salon/post_natal_massage.063f58de672d.webp" },
  { id: "foot", title: "Foot Massage", price: 699, image: "/spa-salon/foot_massage.27b9a101504c.webp" },
  { id: "face", title: "Face Massage", price: 599, image: "/spa-salon/face_massage.36aa1caabdd9.webp" },
  { id: "hot-bed", title: "Hot Bed", price: 699, image: "/spa-salon/hot_bed.ef9319f73122.webp" },
];
const facialOptions = [
  { id: "korean-glass", title: "Korean Glass Facial", price: 1599, image: "/spa-salon/korean_glass_hydration_facial.1265a2c6bd14.webp" },
  { id: "korean-plant", title: "Korean Peptide Facial", price: 1699, image: "/spa-salon/korean_plant_peptide_brightening_facial.b69b22c51f9c.webp" },
  { id: "korean-glow", title: "Korean Glow Facial", price: 1299, image: "/spa-salon/korean_glow_facial.36fdd7dc3287.webp" },
  { id: "aroma-magic", title: "Aroma Magic Glow", price: 1099, image: "/spa-salon/aroma_magic_instant_glow_facial.5c12c2b4cfdb.webp" },
  { id: "sara-lightening", title: "Sara Glow Facial", price: 1199, image: "/spa-salon/sara_lightening_glow_facial.42740ac558b1.webp" },
  { id: "o3-shine", title: "O3+ Shine & Glow", price: 1499, image: "/spa-salon/o3_shine_glow_facial.3cbb2d34a2f9.webp" },
  { id: "o3-power", title: "O3+ Power Brightening", price: 1799, image: "/spa-salon/o3_power_brightening_facial.3b234ec140e1.webp" },
  { id: "firming-wine", title: "Wine Glow Facial", price: 1299, image: "/spa-salon/firming_wine_glow_facial.eb6355c6e56e.webp" },
  { id: "kumkumadi", title: "Kumkumadi Ubtan", price: 1399, image: "/spa-salon/kumkumadi_ubtan_hydration_facial.2cee60a94dfa.webp" },
  { id: "power-cleanup", title: "Power Glow Cleanup", price: 799, image: "/spa-salon/power_glow_cleanup.25a2a5e4ee47.webp" },
  { id: "sara-fruit", title: "Sara Fruit Cleanup", price: 699, image: "/spa-salon/sara_fruit_cleanup.22ed104de4b2.webp" },
  { id: "anti-tan", title: "Anti Tan Cleanup", price: 899, image: "/spa-salon/anti_tan_brightening_cleanup.eba80b2dda3f.webp" },
];

const spaServiceInfo: Record<string, { summary: string; process: string[] }> = {
  "salon-for-women": {
    summary: "Choose the facial that suits your preferred treatment. Products and steps depend on the facial selected.",
    process: ["Confirm the selected facial and requirements", "Cleanse and prepare the face", "Apply the selected facial treatment", "Finish with skin care and aftercare guidance"],
  },
  "spa-for-women": {
    summary: "Relaxation and body care services are discussed before the session so the treatment can be planned.",
    process: ["Confirm the requested spa service", "Prepare the treatment space", "Carry out the agreed session", "Finish and share aftercare guidance"],
  },
  "hair-studio-for-women": {
    summary: "Hair services are planned around the requested cut or styling and the condition of the hair.",
    process: ["Discuss the desired result", "Prepare the hair", "Complete the agreed cut or styling", "Check the finish and share care tips"],
  },
  "waxing-for-women": {
    summary: "Choose the areas to be waxed. The service scope is confirmed before work begins.",
    process: ["Confirm the selected areas", "Prepare the skin and materials", "Complete the waxing service", "Clean the area and explain aftercare"],
  },
};
const spaRatingPercentages = [50, 29, 14, 5, 2];


function SpaOptionImage({
    src, title, className, aspectRatio
  }: {
    src: string;
    title: string;
    className: string;
    aspectRatio?: string | number;
  }) {
    return (
      <div className={className} style={{
        position: "relative",
        backgroundImage: "none",
        ...(aspectRatio === undefined ? {} : { aspectRatio })
      }}>
        <Image src={src} alt={title} fill unoptimized
          loading="eager" decoding="async"
          sizes="(max-width: 600px) 100vw, 472px"
          style={{ objectFit: "contain" }} />
      </div>
    );
  }

function LazySpaBackground({
    eager, style, ...props
  }: import("react").ComponentProps<"div"> & { eager?: boolean }) {
    void eager;
    return <div {...props} style={style} />;
  }

type MenOption = { id: string; title: string; price: number; duration: string; image: string; detail: string };
type MenService = { id: string; title: string; banner: string; imageAlt: string; options: MenOption[]; process: string[]; summary: string; note: string };
const menServices: MenService[] = [
  {
    id: "men-spa", title: "Spa for Men", banner: "/spa-salon/men-spa-banner.webp",
    imageAlt: "City Coolies therapist performing a back massage for a male client",
    options: [
      { id: "swedish", title: "Swedish Relaxation Massage", price: 1299, duration: "60 min", image: "/spa-salon/men-spa-swedish.webp", detail: "Full-body oil massage with gentle to medium pressure; fresh linen and oil included." },
      { id: "deep-tissue", title: "Deep Tissue Massage", price: 1499, duration: "60 min", image: "/spa-salon/men-spa-deep-tissue.webp", detail: "Focused, firmer massage with pressure agreed before and during the session." },
      { id: "head-shoulder", title: "Head, Neck & Shoulder Massage", price: 649, duration: "40 min", image: "/spa-salon/men-spa-head-shoulder.webp", detail: "Seated scalp, neck and shoulder massage with comfortable, agreed pressure." },
      { id: "foot", title: "Foot & Calf Massage", price: 549, duration: "30 min", image: "/spa-salon/men-spa-foot.webp", detail: "Relaxing foot and lower-leg massage using oil or cream and clean towels." },
    ],
    process: ["Confirm selected treatments, duration and preferred pressure.", "Prepare a private space, clean linen and the required equipment.", "Complete the selected massage with regular comfort checks.", "Finish the session, tidy the space and discuss aftercare."],
    summary: "Choose one or more relaxation services delivered by a male professional. Each selected treatment is a separate session with its own duration. Full-body sessions use appropriate towel draping.",
    note: "Introductory prices per session. Availability, travel charges if any and final total are confirmed before booking. These are relaxation services, not medical treatment. Tell the professional about any injury or concern before starting.",
  },
  {
    id: "men-facial", title: "Facial for Men", banner: "/spa-salon/men-facial-banner.webp",
    imageAlt: "City Coolies professional applying facial skincare to a male client",
    options: [
      { id: "cleanup", title: "Deep Cleansing Cleanup", price: 599, duration: "35 min", image: "/spa-salon/men-facial-cleanup.webp", detail: "Cleansing, gentle exfoliation, a suitable mask and moisturiser." },
      { id: "hydrating", title: "Hydrating Facial", price: 999, duration: "60 min", image: "/spa-salon/men-facial-hydrating.webp", detail: "Cleansing, hydrating gel massage, moisture mask and finishing care." },
      { id: "detan", title: "De-Tan Facial", price: 899, duration: "50 min", image: "/spa-salon/men-facial-detan.webp", detail: "Gentle cleansing and a cosmetic de-tan mask for face and neck. Results vary." },
      { id: "glow", title: "Glow Facial", price: 1199, duration: "60 min", image: "/spa-salon/men-facial-glow.webp", detail: "Cleansing, facial massage with rollers, mask and finishing moisturiser." },
    ],
    process: ["Discuss skin preferences, sensitivities and the selected facial.", "Prepare clean towels and confirm the products before application.", "Cleanse and perform the selected facial steps at a comfortable pace.", "Finish with suitable skincare, explain aftercare and tidy the area."],
    summary: "Facials and cleanups for refreshed-looking skin. Select the treatment you prefer; each option includes its listed steps and products. Multiple selections are separate treatments, not a combined facial.",
    note: "Introductory prices per session. Products are selected after consultation. Cosmetic results vary; no permanent skin-lightening or medical result is promised. Avoid treatment on irritated skin and follow the product instructions.",
  },
  {
    id: "men-hair-colour", title: "Hair Colour for Men", banner: "/spa-salon/men-colour-banner.webp",
    imageAlt: "City Coolies stylist wearing gloves and applying hair colour with a tint brush",
    options: [
      { id: "full", title: "Full Hair Colour", price: 799, duration: "60 min", image: "/spa-salon/men-colour-full.webp", detail: "One natural shade for short hair up to 5 cm. Colour product, application, rinse and basic finish included." },
      { id: "roots", title: "Root Touch-Up", price: 599, duration: "45 min", image: "/spa-salon/men-colour-roots.webp", detail: "Colour application to up to 2 cm of regrowth on short hair. Shade confirmed before service." },
      { id: "beard", title: "Beard Colour", price: 299, duration: "30 min", image: "/spa-salon/men-colour-beard.webp", detail: "Natural-shade beard colour using a product intended for facial hair; application and cleanup included." },
    ],
    process: ["Confirm colour area, current shade, hair length and desired result.", "Check product suitability and complete the manufacturer's required allergy test before the service.", "Protect clothing, wear gloves and apply the agreed product for its specified processing time.", "Rinse as directed, check the finish and explain colour-care instructions."],
    summary: "Choose full hair colour, root touch-up or beard colour. Natural black and brown shades are discussed before service; the selected product and shade depend on availability. A wash area and water are required for rinsing.",
    note: "Introductory prices include the listed scope. Longer hair, bleach, highlights and fashion colours are excluded and require a separate quote. Follow the selected product's allergy-test instructions and timing; same-day colouring may not be possible. Do not apply hair dye to eyebrows or eyelashes.",
  },
];
const menMoney = (value: number) => `${String.fromCodePoint(0x20B9)}${value.toLocaleString("en-IN")}`;
const menCartId = (serviceId: string, optionId: string) => `spa-salon:${serviceId}:${optionId}`;

function MenServiceDialog({ service, onClose }: { service: MenService; onClose: () => void }) {
  const [selectedIds, setSelectedIds] = useState<string[]>(() => {
    const saved = readDeepCleaningCart();
    return service.options.filter(option => saved.some(item => item.id === menCartId(service.id, option.id))).map(option => option.id);
  });
  const [hadSavedSelection] = useState(() => selectedIds.length > 0);
  const [cartError, setCartError] = useState("");
  const panelRef = useRef<HTMLElement>(null);
  const chosen = service.options.filter(option => selectedIds.includes(option.id));
  const total = chosen.reduce((sum, option) => sum + option.price, 0);

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    const trigger = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    document.body.style.overflow = "hidden";
    const panel = panelRef.current;
    panel?.focus();
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") { event.preventDefault(); onClose(); return; }
      if (event.key !== "Tab" || !panel) return;
      const controls = Array.from(panel.querySelectorAll<HTMLElement>('button:not(:disabled), a[href], input, select, textarea, [tabindex="0"]'));
      const first = controls[0];
      const last = controls[controls.length - 1];
      if (!first || !last) return;
      if (event.shiftKey && (document.activeElement === first || document.activeElement === panel)) {
        event.preventDefault(); last.focus();
      } else if (!event.shiftKey && (document.activeElement === last || document.activeElement === panel)) {
        event.preventDefault(); first.focus();
      }
    }
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", onKeyDown);
      if (trigger?.isConnected) trigger.focus();
    };
  }, [onClose]);

  function continueBooking() {
    try {
      const current = readDeepCleaningCart();
      for (const option of service.options) {
        const id = menCartId(service.id, option.id);
        if (selectedIds.includes(option.id)) {
          upsertDeepCleaningCartItem({ id, serviceTitle: service.title, optionLabel: option.title,
            price: option.price, priceLabel: menMoney(option.price), duration: option.duration });
        } else if (current.some(item => item.id === id)) {
          removeDeepCleaningCartItem(id);
        }
      }
      onClose();
    } catch {
      setCartError("Your browser could not save the cart. Please allow site storage and try again.");
    }
  }

  return (
    <div className={styles.backdrop} onMouseDown={event => { if (event.target === event.currentTarget) onClose(); }}>
      <section ref={panelRef} tabIndex={-1} className={`${styles.modal} ${styles.menServiceModal}`}
        role="dialog" aria-modal="true" aria-labelledby="men-service-title">
        <header className={styles.modalHeader}>
          <h2 id="men-service-title">{service.title}</h2>
          <button type="button" aria-label="Close details" onClick={onClose}>{String.fromCodePoint(0x00D7)}</button>
        </header>
        <div className={`${styles.modalBody} ${styles.menServiceBody}`}>
          <p className={styles.menOptionPrompt}>Choose your requirements</p>
          <div className={styles.menOptionGrid}>
            {service.options.map(option => {
              const isSelected = selectedIds.includes(option.id);
              return (
                <div className={styles.menOption} key={option.id}>
                  <Image className={styles.menOptionImage} src={option.image} alt={option.title + " service demonstration"}
                    width={360} height={240} unoptimized loading="lazy" />
                  <h3>{option.title}</h3>
                  <span className={styles.menOptionDuration}>{option.duration}</span>
                  <div className={styles.menOptionActions}>
                    <strong>{menMoney(option.price)}</strong>
                    <button type="button" className={`${styles.addButton} ${isSelected ? styles.menOptionSelected : ""}`}
                      aria-pressed={isSelected} aria-label={`${isSelected ? "Remove" : "Add"} ${option.title}`}
                      onClick={() => { setSelectedIds(ids => ids.includes(option.id) ? ids.filter(id => id !== option.id) : [...ids, option.id]); setCartError(""); }}>
                      {isSelected ? "Remove" : "Add"}
                    </button>
                  </div>
                  <p>{option.detail}</p>
                </div>
              );
            })}
          </div>
          {chosen.length > 0 && <div className={styles.menSelectedSummary} aria-live="polite">
            <h3>Selected services</h3>
            {chosen.map(option => <p key={option.id}><span>{option.title}</span><strong>{menMoney(option.price)}</strong></p>)}
          </div>}
          <section className={styles.menServiceInfo}>
            <h3>Work process</h3>
            <ol>{service.process.map(step => <li key={step}>{step}</li>)}</ol>
          </section>
          <section className={styles.menServiceInfo}>
            <h3>About this service</h3><p>{service.summary}</p><p>{service.note}</p>
          </section>
          <section className={styles.menHairReviews} aria-label="Demo rating overview">
            <h3>Rating overview</h3>
            <div className={styles.menHairReviewHeader}>
              <strong><span aria-hidden="true">{String.fromCodePoint(0x2605)}</span> 4.20</strong>
              <span>900 demo reviews</span>
            </div>
            <p className={styles.menDemoNote}>Illustrative rating and sample reviews, not verified customer feedback.</p>
            {[50, 29, 14, 5, 2].map((percentage, index) => <div className={styles.menHairRatingLine} key={index}>
              <span>{5 - index} {String.fromCodePoint(0x2605)}</span>
              <div><i style={{ width: `${percentage}%` }} /></div><span>{percentage}%</span>
            </div>)}
            <div className={styles.menSampleReview}><strong>Sample review (demo)</strong><p>The professional explained each step and kept the work area clean.</p></div>
            <div className={styles.menSampleReview}><strong>Sample review (demo)</strong><p>Clear service options and a comfortable session from start to finish.</p></div>
          </section>
          {cartError && <p role="alert" className={styles.menCartError}>{cartError}</p>}
        </div>
        <footer className={styles.facialFooter}>
          <div aria-live="polite"><span>Selected total</span><strong>{menMoney(total)}</strong></div>
          <button type="button" disabled={chosen.length === 0 && !hadSavedSelection} onClick={continueBooking}>
            {chosen.length === 0 && hadSavedSelection ? "Update cart" : "Continue"}
          </button>
        </footer>
      </section>
    </div>
  );
}

export default function SpaSalonMarketplace() {
  const [selected, setSelected] = useState<Category>("women");
  const [active, setActive] = useState<Service | null>(null);
  const [showMenDetails, setShowMenDetails] = useState(false);
  const [activeMenService, setActiveMenService] = useState<MenService | null>(null);
  const [menHaircutAdded, setMenHaircutAdded] = useState(false);
  const [selectedWaxingIds, setSelectedWaxingIds] = useState<string[]>([]);
  const [selectedHairIds, setSelectedHairIds] = useState<string[]>([]);
  const [selectedSpaIds, setSelectedSpaIds] = useState<string[]>([]);
  const [selectedFacial, setSelectedFacial] = useState<string[]>([]);
  const selectedFacialIds = Array.isArray(selectedFacial) ? selectedFacial : [];
  useEffect(() => {
    if (!active) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKeyDown = (event: KeyboardEvent) => { if (event.key === "Escape") setActive(null); };
    window.addEventListener("keydown", onKeyDown);
    return () => { document.body.style.overflow = previous; window.removeEventListener("keydown", onKeyDown); };
  }, [active]);
  function continueSpaService() {
    if (!active) return;
    if (active.id === "salon-for-women") {
      const ids = Array.isArray(selectedFacial) ? selectedFacial : [];
      facialOptions.filter((facial) => ids.includes(facial.id)).forEach((facial) => {
        upsertDeepCleaningCartItem({
          id: `spa-salon:facial:${facial.id}`,
          serviceTitle: active.title,
          optionLabel: facial.title,
          price: facial.price,
          priceLabel: `${String.fromCodePoint(0x20B9)}${facial.price.toLocaleString("en-IN")}`,
          duration: "One session",
        });
      });
    } else if (active.id === "spa-for-women") {
      if (selectedSpaIds.length === 0) return;
      spaOptions.filter((spa) => selectedSpaIds.includes(spa.id)).forEach((spa) => {
        upsertDeepCleaningCartItem({
          id: `spa-salon:spa:${spa.id}`,
          serviceTitle: active.title,
          optionLabel: spa.title,
          price: spa.price,
          priceLabel: `${String.fromCodePoint(0x20B9)}${spa.price.toLocaleString("en-IN")}`,
          duration: "One session",
        });
      });
    } else if (active.id === "hair-studio-for-women") {
      if (selectedHairIds.length === 0) return;
      hairOptions.filter((hair) => selectedHairIds.includes(hair.id)).forEach((hair) => {
        upsertDeepCleaningCartItem({
          id: `spa-salon:hair:${hair.id}`,
          serviceTitle: active.title,
          optionLabel: hair.title,
          price: hair.price,
          priceLabel: `${String.fromCodePoint(0x20B9)}${hair.price.toLocaleString("en-IN")}`,
          duration: hair.duration,
        });
      });
    } else if (active.id === "waxing-for-women") {
      if (selectedWaxingIds.length === 0) return;
      waxingOptions.filter((option) => selectedWaxingIds.includes(option.id)).forEach((option) => {
        upsertDeepCleaningCartItem({
          id: `spa-salon:waxing:${option.id}`,
          serviceTitle: active.title,
          optionLabel: option.title,
          price: option.price,
          priceLabel: `${String.fromCodePoint(0x20B9)}${option.price.toLocaleString("en-IN")}`,
          duration: option.duration,
        });
      });
    } else {
      upsertDeepCleaningCartItem({
        id: `spa-salon:${active.id}`,
        serviceTitle: active.title,
        optionLabel: active.title,
        price: active.price,
        priceLabel: `${String.fromCodePoint(0x20B9)}${active.price.toLocaleString("en-IN")}`,
        duration: "One session",
      });
    }
    setActive(null);
  }
  function addMenHaircut() {
    upsertDeepCleaningCartItem({
      id: "spa-salon:men-haircut",
      serviceTitle: "Men's Haircut",
      optionLabel: "Men's Haircut",
      price: 299,
      priceLabel: `${String.fromCodePoint(0x20B9)}299`,
      duration: "30 min",
    });
    setMenHaircutAdded(true);
  }
  useEffect(() => {
    if (!showMenDetails) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKeyDown = (event: KeyboardEvent) => { if (event.key === "Escape") setShowMenDetails(false); };
    window.addEventListener("keydown", onKeyDown);
    return () => { document.body.style.overflow = previous; window.removeEventListener("keydown", onKeyDown); };
  }, [showMenDetails]);
  function chooseCategory(category: Category) { setSelected(category); setActive(null); setShowMenDetails(false); setActiveMenService(null); }

  return (
    <main className={styles.section}>
      <div className={styles.container}>
        <h1 className={styles.selectorTitle}>Select a spa &amp; salon service</h1>
        <div className={styles.selector} role="group" aria-label="Choose spa and salon category">
          {categories.map((category) => (
            <button key={category.id} type="button"
              className={`${styles.category} ${selected === category.id ? styles.active : ""}`}
              aria-pressed={selected === category.id} onClick={() => chooseCategory(category.id)}>
              <Image loading="eager" src={category.image} alt="" width={100} height={100} />
              <span>{category.label}</span>
            </button>
          ))}
        </div>
        <div className={styles.columns}>
          <div className={styles.main}>
            <section className={styles.content} aria-label={selected === "women" ? "Women's services" : "Men's services"}>
              {selected === "men" && (
  <>
    <nav className={styles.serviceSelector} aria-label="Men's services">
      <button type="button" className={styles.serviceSelectorItem}
        onClick={() => document.getElementById("men-haircut")?.scrollIntoView({ behavior: "smooth", block: "start" })}>
        <span className={styles.menHairThumbnail} aria-hidden="true" />
        <span>Men&apos;s Haircut</span>
      </button>
      {menServices.map(service => (
        <button type="button" className={styles.serviceSelectorItem} key={service.id}
          onClick={() => document.getElementById(service.id)?.scrollIntoView({ behavior: "smooth", block: "start" })}>
          <Image src={service.options[0].image} alt="" width={100} height={100} unoptimized className={styles.menServiceThumbnail} />
          <span>{service.title}</span>
        </button>
      ))}
    </nav>
    <section id="men-haircut" className={styles.serviceGroup}>
      <h3>Men&apos;s Haircut</h3>
      <div className={styles.menHairBanner} role="img" aria-label="A barber cutting a man's hair" />
      <div className={styles.serviceRow}>
        <div>
          <h4>Men&apos;s Haircut</h4>
          <div className={styles.rating}>
            <span className={styles.star} aria-hidden="true">{String.fromCodePoint(0x2605)}</span>
            <span>4.20</span><span className={styles.reviewCount}>(900 reviews)</span>
            <button type="button" onClick={() => setShowMenDetails(true)}>View details</button>
          </div>
          <strong>{String.fromCodePoint(0x20B9)}299</strong>
        </div>
        <button type="button" className={styles.addButton} onClick={() => setShowMenDetails(true)}>
          {menHaircutAdded ? "Added" : "Add"}
        </button>
      </div>
    </section>
    {menServices.map(service => (
      <section id={service.id} className={styles.serviceGroup} key={service.id}>
        <h3>{service.title}</h3>
        <Image src={service.banner} alt={service.imageAlt} width={1939} height={811}
          unoptimized loading="lazy" className={styles.menServiceBanner} />
        <div className={styles.serviceRow}>
          <div>
            <h4>{service.title}</h4>
            <div className={styles.rating}>
              <span className={styles.star} aria-hidden="true">{String.fromCodePoint(0x2605)}</span>
              <span>4.20</span><span className={styles.reviewCount}>(900 demo reviews)</span>
              <button type="button" onClick={() => setActiveMenService(service)}>View details</button>
            </div>
            <strong>Starting from {menMoney(Math.min(...service.options.map(option => option.price)))}</strong>
          </div>
          <button type="button" className={styles.addButton} onClick={() => setActiveMenService(service)}>Add</button>
        </div>
      </section>
    ))}
  </>
)}
              {selected === "women" && (
                <>
                  <nav className={styles.serviceSelector} aria-label="Select a women's service">
                    {womenServices.map((service) => (
                      <button key={service.id} type="button" className={styles.serviceSelectorItem}
                        onClick={() => document.getElementById(service.id)?.scrollIntoView({ behavior: "smooth", block: "start" })}>
                        <span className={service.id === "salon-for-women" ? `${styles.thumbnail} ${styles.salonImage}` : service.id === "spa-for-women" ? `${styles.thumbnail} ${styles.spaImage}` : styles.thumbnail} style={service.id === "hair-studio-for-women" ? { backgroundImage: 'url("/spa-salon/hair_studio_for_women_service_banner.6327a5c68b62.webp?v=4")', backgroundPosition: "center", backgroundSize: "cover", backgroundRepeat: "no-repeat" } : service.id === "waxing-for-women" ? { backgroundImage: 'url("/spa-salon/waxing_for_women_service_banner.jpg?v=1")', backgroundPosition: "center", backgroundSize: "cover", backgroundRepeat: "no-repeat" } : undefined} aria-hidden="true" />
                        <span>{service.title}</span>
                      </button>
                    ))}
                  </nav>
                  {womenServices.map((service) => (
                    <section key={service.id} id={service.id} className={styles.serviceGroup}>
                      <h3>{service.title}</h3>
                      <LazySpaBackground eager={service.id === "salon-for-women"} className={service.id === "salon-for-women" ? `${styles.banner} ${styles.salonImage}` : service.id === "spa-for-women" ? `${styles.banner} ${styles.spaImage}` : styles.banner} style={service.id === "hair-studio-for-women" ? { backgroundImage: 'url("/spa-salon/hair_studio_for_women_service_banner.6327a5c68b62.webp?v=4")', backgroundPosition: "center", backgroundSize: "cover", backgroundRepeat: "no-repeat" } : service.id === "waxing-for-women" ? { backgroundImage: 'url("/spa-salon/waxing_for_women_service_banner.jpg?v=1")', backgroundPosition: "center", backgroundSize: "cover", backgroundRepeat: "no-repeat" } : undefined} aria-hidden="true" />
                      <div className={styles.serviceRow}>
                        <div>
                          <h4>{service.title}</h4>
                          <div className={styles.rating}>
                            <span className={styles.star} aria-hidden="true">{String.fromCodePoint(0x2605)}</span>
                            <span>4.20</span><span className={styles.reviewCount}>(900 reviews)</span>
                            <button type="button" onClick={() => setActive(service)}>View details</button>
                          </div>
                          <strong>Starting from {String.fromCodePoint(0x20B9)}{service.price.toLocaleString("en-IN")}</strong>
                        </div>
                        <button type="button" className={styles.addButton} onClick={() => setActive(service)}>Add</button>
                      </div>
                    </section>
                  ))}
                </>
              )}
            </section>
          </div>
          {(selected === "women" || selected === "men") && <aside className={styles.sidebar}><FullHomeRightSidebar /></aside>}
        </div>
      </div>
      {active && (
        <div className={styles.backdrop} onMouseDown={(event) => { if (event.target === event.currentTarget) setActive(null); }}>
          <section className={styles.modal} role="dialog" aria-modal="true" aria-labelledby="spa-modal-title">
            <header className={styles.modalHeader}>
              <h2 id="spa-modal-title">{active.title}</h2>
              <button type="button" aria-label="Close details" onClick={() => setActive(null)}>{String.fromCodePoint(0x00D7)}</button>
            </header>
            <div className={styles.modalBody}>
          {active.id === "waxing-for-women" && (
            <>
              <p className={styles.waxingPrompt}>Choose your requirements</p>
              <div className={styles.waxingGrid}>
                {waxingOptions.map((option) => (
                  <div className={styles.waxingOption} key={option.id}>
                    <SpaOptionImage className={styles.waxingImage} src={option.image} title={option.title} aspectRatio={waxingImageRatios[option.id]} />
                    <div className={styles.waxingDetails}>
                      <strong>{option.title}</strong>
                      <span>{String.fromCodePoint(0x20B9)}{option.price.toLocaleString("en-IN")}</span>
                      <button type="button" className={styles.waxingAdd} aria-pressed={selectedWaxingIds.includes(option.id)}
                        onClick={() => setSelectedWaxingIds((current) => current.includes(option.id) ? current.filter((id) => id !== option.id) : [...current, option.id])}>Add</button>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
          {active.id === "hair-studio-for-women" && (
            <>
              <p className={styles.hairPrompt}>Choose your hair service</p>
              <div className={styles.hairGrid}>
                {hairOptions.map((hair) => (
                  <div className={styles.hairOption} key={hair.id}>
                    <SpaOptionImage className={styles.hairImage} src={hair.image} title={hair.title} />
                    <div className={styles.hairDetails}>
                      <strong>{hair.title}</strong>
                      <span>{String.fromCodePoint(0x20B9)}{hair.price.toLocaleString("en-IN")}</span>
                      <button type="button" className={styles.hairAdd} aria-pressed={selectedHairIds.includes(hair.id)}
                        onClick={() => setSelectedHairIds((current) => current.includes(hair.id) ? current.filter((id) => id !== hair.id) : [...current, hair.id])}>Add</button>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
  {active.id === "salon-for-women" && (
    <>
      <p className={styles.facialPrompt}>Choose your requirements</p>
      <div className={styles.facialGrid}>
        {facialOptions.map((facial) => (
          <div className={styles.facialOption} key={facial.id}>
            <SpaOptionImage className={styles.facialImage} src={facial.image} title={facial.title} />
            <div className={styles.facialOptionDetails}>
              <strong>{facial.title}</strong>
              <span>{String.fromCodePoint(0x20B9)}{facial.price.toLocaleString("en-IN")}</span>
              <button type="button" className={styles.facialAdd} aria-pressed={selectedFacialIds.includes(facial.id)}
                onClick={() => setSelectedFacial((current) => { const items = Array.isArray(current) ? current : []; return items.includes(facial.id) ? items.filter((id) => id !== facial.id) : [...items, facial.id]; })}>
                Add
              </button>
            </div>
          </div>
        ))}
      </div>
    </>
  )}
{active.id === "spa-for-women" && (
  <>
    <p className={styles.spaIntro}>Choose your requirements</p>
    <div className={styles.stressGrid}>
      {spaOptions.map((spa) => (
        <div className={styles.stressOption} key={spa.id}>
          <SpaOptionImage className={styles.stressImage} src={spa.image} title={spa.title} />
          <div className={styles.stressDetails}>
            <strong>{spa.title}</strong>
            <span>{String.fromCodePoint(0x20B9)}{spa.price.toLocaleString("en-IN")}</span>
            <button type="button" aria-pressed={selectedSpaIds.includes(spa.id)}
              onClick={() => setSelectedSpaIds((current) => current.includes(spa.id) ? current.filter((id) => id !== spa.id) : [...current, spa.id])}>Add</button>
          </div>
        </div>
      ))}
    </div>
  </>
)}
{active.id !== "salon-for-women" && active.id !== "spa-for-women" && <p className={styles.spaIntro}>Service details</p>}
<div className={styles.spaInfo}>
  <h3>About this service</h3>
  <p>{spaServiceInfo[active.id]?.summary}</p>
  <h3>Work process</h3>
  <ol>
    {spaServiceInfo[active.id]?.process.map((step) => <li key={step}>{step}</li>)}
  </ol>
  <div className={styles.spaRating}>
    <div className={styles.spaRatingHeading}>
      <span className={styles.spaRatingStar} aria-hidden="true">{String.fromCodePoint(0x2605)}</span>
      <strong>4.20</strong>
      <span>900 reviews</span>
    </div>
    {[5, 4, 3, 2, 1].map((star, index) => (
      <div className={styles.spaRatingLine} key={star}>
        <span>{star} ★</span>
        <div><i style={{ width: `${spaRatingPercentages[index]}%` }} /></div>
        <span>{spaRatingPercentages[index]}%</span>
      </div>
    ))}
  </div>
</div>
</div>
{active.id === "salon-for-women" && (
  <footer className={styles.facialFooter}>
    <div><span>Selected total</span><strong>{String.fromCodePoint(0x20B9)}{facialOptions.filter((item) => selectedFacialIds.includes(item.id)).reduce((sum, item) => sum + item.price, 0).toLocaleString("en-IN")}</strong></div>
    <button type="button" disabled={selectedFacialIds.length === 0} onClick={continueSpaService}>Continue</button>
  </footer>
)}
{active.id === "hair-studio-for-women" && (
  <footer className={styles.facialFooter}>
    <div>
      <span>Selected total</span>
      <strong>{String.fromCodePoint(0x20B9)}{hairOptions.filter((hair) => selectedHairIds.includes(hair.id)).reduce((total, hair) => total + hair.price, 0).toLocaleString("en-IN")}</strong>
    </div>
    <button type="button" disabled={selectedHairIds.length === 0} onClick={continueSpaService}>Continue</button>
  </footer>
)}
{active.id === "waxing-for-women" && (
  <footer className={styles.facialFooter}>
    <div>
      <span>Selected total</span>
      <strong>{String.fromCodePoint(0x20B9)}{waxingOptions.filter((option) => selectedWaxingIds.includes(option.id)).reduce((total, option) => total + option.price, 0).toLocaleString("en-IN")}</strong>
    </div>
    <button type="button" disabled={selectedWaxingIds.length === 0} onClick={continueSpaService}>Continue</button>
  </footer>
)}
{active.id !== "salon-for-women" && active.id !== "hair-studio-for-women" && active.id !== "waxing-for-women" && (
  <footer className={styles.facialFooter}>
    <div>
      <span>Selected total</span>
      <strong>{String.fromCodePoint(0x20B9)}{active.id === "spa-for-women" ? spaOptions.filter((spa) => selectedSpaIds.includes(spa.id)).reduce((total, spa) => total + spa.price, 0).toLocaleString("en-IN") : active.price.toLocaleString("en-IN")}</strong>
    </div>
    <button type="button" disabled={active.id === "spa-for-women" && selectedSpaIds.length === 0} onClick={continueSpaService}>Continue</button>
  </footer>
)}
          </section>
        </div>
      )}
      {activeMenService && <MenServiceDialog key={activeMenService.id} service={activeMenService} onClose={() => setActiveMenService(null)} />}
      {showMenDetails && (
        <div className={styles.backdrop} onMouseDown={(event) => { if (event.target === event.currentTarget) setShowMenDetails(false); }}>
          <section className={styles.modal} role="dialog" aria-modal="true" aria-labelledby="men-haircut-dialog-title">
            <header className={styles.modalHeader}>
              <h2 id="men-haircut-dialog-title">Men&apos;s Haircut</h2>
              <button type="button" aria-label="Close details" onClick={() => setShowMenDetails(false)}>{String.fromCodePoint(0x00D7)}</button>
            </header>
            <div className={styles.modalBody}>
              <div className={styles.menHairInfo}>
                <h3>About this service</h3>
                <p>A professional haircut tailored to your preferred style and hair length. Includes a brief style consultation, haircut and a final check. Hair wash and beard grooming are separate services.</p>
              </div>
              <div className={styles.menHairInfo}>
                <h3>Work process</h3>
                <ol>
                  <li>Discuss the requested cut and hair length.</li>
                  <li>Prepare clean tools and a protective cape.</li>
                  <li>Cut, blend and shape the hair.</li>
                  <li>Check the finish and tidy the work area.</li>
                </ol>
              </div>
              <div className={styles.menHairReviews}>
                <div className={styles.menHairReviewHeader}>
                  <strong><span aria-hidden="true">â˜…</span> 4.20</strong><span>900 reviews</span>
                </div>
                {[48, 29, 13, 7, 3].map((percentage, index) => (
                  <div className={styles.menHairRatingLine} key={index}>
                    <span>{5 - index} â˜…</span>
                    <div><i style={{ width: `${percentage}%` }} /></div>
                    <span>{percentage}%</span>
                  </div>
                ))}
              </div>
            </div>
            <footer className={styles.facialFooter}>
              <div><span>Service price</span><strong>{String.fromCodePoint(0x20B9)}299</strong></div>
              <button type="button" onClick={() => { addMenHaircut(); setShowMenDetails(false); }}>
                {menHaircutAdded ? "Added" : "Add"}
              </button>
            </footer>
          </section>
        </div>
      )}    </main>
  );
}
