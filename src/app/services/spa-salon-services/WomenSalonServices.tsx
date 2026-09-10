"use client";

import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import ServiceBookingModal from "../../../components/booking/ServiceBookingModal";
import styles from "./WomenSalonServices.module.css";
type SalonService = {
  id: string;
  name: string;
  image?: string;
  category: string;
  price: number;
  duration?: string;
  pricePrefix?: "Starts at";
  details: readonly string[];
};

const salonServices: readonly SalonService[] = [
  {
    id: "brazilian-stripless-bikini-waxing",
    name: "Brazilian Stripless Bikini Waxing",
    image: "/city-coolies-brazilian-stripless-waxing-card.png",
    category: "Waxing & Threading",
    price: 1399,
    duration: "45 mins",
    details: ["Stripless peel-off wax for the full bikini area", "Private, hygienic at-home service"],
  },
  {
    id: "butt-waxing",
    name: "Butt Waxing",
    image: "/city-coolies-butt-waxing-card-final.png",
    category: "Waxing & Threading",
    price: 299,
    pricePrefix: "Starts at",
    details: ["Waxing for the buttocks area", "Single-use hygiene essentials"],
  },
  {
    id: "full-arms-underarms-waxing",
    name: "Full Arms & Underarms Waxing",
    image: "/city-coolies-full-arms-underarms-waxing-card.webp",
    category: "Waxing & Threading",
    price: 429,
    pricePrefix: "Starts at",
    details: ["Complete arms with underarms", "Choose the available wax variant"],
  },
  {
    id: "full-legs-waxing",
    name: "Full Legs Waxing",
    category: "Waxing & Threading",
    price: 519,
    pricePrefix: "Starts at",
    details: ["Full-leg hair removal", "Bikini and butt waxing not included"],
  },
  {
    id: "half-legs-waxing",
    name: "Half Legs Waxing",
    category: "Waxing & Threading",
    price: 269,
    pricePrefix: "Starts at",
    details: ["Covers toes to knees", "Clean and even waxing finish"],
  },
  {
    id: "back-waxing",
    name: "Back Waxing",
    category: "Waxing & Threading",
    price: 569,
    pricePrefix: "Starts at",
    details: ["Covers shoulders to pelvis", "Suitable wax selected for the skin"],
  },
  {
    id: "stomach-waxing",
    name: "Stomach Waxing",
    category: "Waxing & Threading",
    price: 419,
    pricePrefix: "Starts at",
    details: ["Covers below the bust to pelvis", "Professional hygienic application"],
  },
  {
    id: "bikini-waxing",
    name: "Bikini Waxing",
    category: "Waxing & Threading",
    price: 1049,
    pricePrefix: "Starts at",
    details: ["Covers the full bikini area", "Buttocks waxing is not included"],
  },
  {
    id: "bikini-line-waxing",
    name: "Bikini Line Waxing",
    category: "Waxing & Threading",
    price: 349,
    pricePrefix: "Starts at",
    details: ["Covers the area around the bikini line", "Focused edge clean-up service"],
  },
  {
    id: "underarms-waxing",
    name: "Underarms Waxing",
    category: "Waxing & Threading",
    price: 99,
    pricePrefix: "Starts at",
    details: ["Quick underarm hair removal", "Choose the available wax variant"],
  },
  {
    id: "full-body-waxing",
    name: "Full Body Waxing",
    category: "Waxing & Threading",
    price: 1519,
    pricePrefix: "Starts at",
    details: ["Full arms, legs, underarms, stomach and back", "One complete at-home waxing session"],
  },
  {
    id: "threading",
    name: "Threading",
    category: "Waxing & Threading",
    price: 49,
    pricePrefix: "Starts at",
    details: ["Precise facial hair removal", "Select the required facial area"],
  },
  {
    id: "rica-peel-off-face-waxing",
    name: "RICA Peel-Off Face Waxing",
    category: "Waxing & Threading",
    price: 89,
    pricePrefix: "Starts at",
    details: ["Peel-off wax for fine facial hair", "Eyebrow threading is not included"],
  },
  {
    id: "korean-glass-hydration-facial",
    name: "Korean Glass Hydration Facial",
    category: "Facials",
    price: 1749,
    duration: "1 hr 20 mins",
    details: ["Deep hydration for a smooth, dewy finish", "Best suited to normal-to-dry skin"],
  },
  {
    id: "korean-plant-peptide-brightening-facial",
    name: "Korean Plant-Peptide Brightening Facial",
    category: "Facials",
    price: 1849,
    duration: "1 hr 30 mins",
    details: ["Helps improve uneven-looking skin", "Best suited to oily and combination skin"],
  },
  {
    id: "korean-glow-facial",
    name: "Korean Glow Facial",
    category: "Facials",
    price: 1399,
    duration: "1 hr 20 mins",
    details: ["Revives dull-looking skin", "Hydration-focused glow ritual"],
  },
  {
    id: "aroma-magic-instant-glow-facial",
    name: "Aroma Magic Instant Glow Facial",
    category: "Facials",
    price: 999,
    duration: "1 hr 5 mins",
    details: ["Refreshes tired-looking skin", "Suitable for combination skin"],
  },
  {
    id: "o3-shine-glow-facial",
    name: "O3+ Shine & Glow Facial",
    category: "Facials",
    price: 1849,
    duration: "1 hr 20 mins",
    details: ["Targets dullness and uneven-looking tone", "Best suited to normal-to-oily skin"],
  },
  {
    id: "o3-power-brightening-facial",
    name: "O3+ Power Brightening Facial",
    category: "Facials",
    price: 2159,
    duration: "1 hr 25 mins",
    details: ["Brightening care for spots and texture", "Best suited to normal-to-oily skin"],
  },
  {
    id: "firming-wine-glow-facial",
    name: "Firming Wine Glow Facial",
    category: "Facials",
    price: 1349,
    duration: "1 hr 15 mins",
    details: ["Firming ritual for a refreshed appearance", "Best suited to normal-to-dry skin"],
  },
  {
    id: "power-glow-cleanup",
    name: "Power Glow Cleanup",
    category: "Cleanup, Bleach & Detan",
    price: 699,
    duration: "50 mins",
    details: ["Deep-cleansing care for improved clarity", "Suitable for all skin types"],
  },
  {
    id: "sara-fruit-cleanup",
    name: "Sara Fruit Cleanup",
    category: "Cleanup, Bleach & Detan",
    price: 819,
    duration: "45 mins",
    details: ["Fruit-based antioxidant cleanup", "Suitable for all skin types"],
  },
  {
    id: "bleach",
    name: "Bleach",
    category: "Cleanup, Bleach & Detan",
    price: 449,
    pricePrefix: "Starts at",
    details: ["Professional bleach application", "Select the required face or body area"],
  },
  {
    id: "detan",
    name: "Detan",
    category: "Cleanup, Bleach & Detan",
    price: 499,
    pricePrefix: "Starts at",
    details: ["Targeted care for tan and dullness", "Select the required face or body area"],
  },
  {
    id: "crystal-rose-pedicure",
    name: "Crystal Rose Pedicure",
    category: "Pedicure & Manicure",
    price: 859,
    pricePrefix: "Starts at",
    details: ["Hydrating crystal-soak foot treatment", "Includes relaxing foot care"],
  },
  {
    id: "cut-file-polish-feet",
    name: "Cut, File & Polish (Feet)",
    category: "Pedicure & Manicure",
    price: 299,
    duration: "15 mins",
    details: ["Quick toenail grooming", "Nail paint application included"],
  },
  {
    id: "british-rose-manicure",
    name: "British Rose Manicure",
    category: "Pedicure & Manicure",
    price: 809,
    duration: "45 mins",
    details: ["Hydrating hand and nail care", "Finished with neat nail grooming"],
  },
  {
    id: "candle-spa-manicure",
    name: "Candle Spa Manicure",
    category: "Pedicure & Manicure",
    price: 1189,
    duration: "60 mins",
    details: ["Relaxing candle-spa hand treatment", "Soothing and hydration-focused care"],
  },
  {
    id: "cut-file-polish-hands",
    name: "Cut, File & Polish (Hands)",
    category: "Pedicure & Manicure",
    price: 249,
    duration: "15 mins",
    details: ["Quick fingernail grooming", "Nail paint application included"],
  },
  {
    id: "head-massage",
    name: "Head Massage",
    category: "Massage & Hair Application",
    price: 249,
    pricePrefix: "Starts at",
    details: ["Pressure-point focused head massage", "Designed for quick relaxation"],
  },
  {
    id: "hair-colour-mehendi-application",
    name: "Hair Colour/Mehendi (Only Application)",
    category: "Massage & Hair Application",
    price: 399,
    pricePrefix: "Starts at",
    details: ["Application service only", "Customer provides the colour or mehendi product"],
  },
];

const categoryOrder = [
  "Waxing & Threading",
  "Facials",
  "Cleanup, Bleach & Detan",
  "Pedicure & Manicure",
  "Massage & Hair Application",
] as const;
type ButtWaxingVariantId = "honey" | "rica";

const buttWaxingVariants = [
  {
    id: "honey" as const,
    name: "Honey",
    price: 299,
    image: "/city-coolies-butt-waxing-honey-option.webp",
  },
  {
    id: "rica" as const,
    name: "RICA",
    price: 399,
    image: "/city-coolies-butt-waxing-rica-option.webp",
  },
] as const;

const formatPrice = (price: number) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(price);

export default function WomenSalonServices() {
  const [quantities, setQuantities] = useState<Record<string, number>>({});
  const [buttPickerOpen, setButtPickerOpen] = useState(false);
  const [buttVariantId, setButtVariantId] = useState<ButtWaxingVariantId | null>(null);

  const selectedButtVariant = useMemo(
    () => buttWaxingVariants.find((variant) => variant.id === buttVariantId) ?? null,
    [buttVariantId],
  );

  const selectedServices = useMemo(
    () =>
      salonServices
        .filter((service) => (quantities[service.id] ?? 0) > 0)
        .map((service) => {
          const quantity = quantities[service.id] ?? 0;

          if (service.id === "butt-waxing") {
            const variant = selectedButtVariant ?? buttWaxingVariants[0];

            return {
              ...service,
              name: `Butt Waxing - ${variant.name}`,
              price: variant.price,
              image: variant.image,
              quantity,
            };
          }

          return { ...service, quantity };
        }),
    [quantities, selectedButtVariant],
  );

  const selectedCount = selectedServices.reduce(
    (total, service) => total + service.quantity,
    0,
  );

  const totalPrice = selectedServices.reduce(
    (total, service) => total + service.price * service.quantity,
    0,
  );

  const bookingServiceName = useMemo(
    () =>
      selectedServices
        .map((service) => `${service.name} x${service.quantity}`)
        .join(", "),
    [selectedServices],
  );

  useEffect(() => {
    if (!buttPickerOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setButtPickerOpen(false);
    };

    window.addEventListener("keydown", closeOnEscape);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", closeOnEscape);
    };
  }, [buttPickerOpen]);

  const changeQuantity = (serviceId: string, change: number) => {
    setQuantities((current) => {
      const nextQuantity = Math.max(0, (current[serviceId] ?? 0) + change);
      const next = { ...current };

      if (nextQuantity === 0) {
        delete next[serviceId];
      } else {
        next[serviceId] = nextQuantity;
      }

      return next;
    });
  };

  const selectButtWaxingVariant = (variantId: ButtWaxingVariantId) => {
    setButtVariantId(variantId);
    setQuantities((current) => ({
      ...current,
      "butt-waxing": Math.max(1, current["butt-waxing"] ?? 0),
    }));
    setButtPickerOpen(false);
  };

  return (
    <div className={styles.marketplace}>
      <div className={styles.servicesColumn}>
        {categoryOrder.map((category) => {
          const services = salonServices.filter(
            (service) => service.category === category,
          );

          return (
            <section key={category} className={styles.group}>
              <h2>{category}</h2>

              <div className={styles.serviceGrid}>
                {services.map((service) => {
                  const quantity = quantities[service.id] ?? 0;
                  const isButtWaxing = service.id === "butt-waxing";
                  const shownPrice =
                    isButtWaxing && selectedButtVariant
                      ? selectedButtVariant.price
                      : service.price;

                  return (
                    <article key={service.id} className={styles.card}>
                      <div
                        className={`${styles.mediaPlaceholder} ${
                          service.image ? styles.mediaWithImage : ""
                        }`}
                      >
                        {service.image ? (
                          <Image
                            src={service.image}
                            alt={`${service.name} service`}
                            width={1400}
                            height={1000}
                            className={styles.serviceCardImage}
                            loading={service.id === "brazilian-stripless-bikini-waxing" || service.id === "butt-waxing" ? "eager" : "lazy"}
                          />
                        ) : (
                          <span aria-hidden="true" />
                        )}
                      </div>

                      <div className={styles.cardBody}>
                        <h3>{service.name}</h3>
                        <p className={styles.serviceType}>At-home salon service</p>

                        <div className={styles.cardFooter}>
                          <div className={styles.priceBlock}>
                            {service.pricePrefix ? <small>{service.pricePrefix}</small> : null}
                            <strong>{formatPrice(shownPrice)}</strong>
                            {service.duration ? <span>{service.duration}</span> : null}
                          </div>

                          {quantity === 0 ? (
                            <div className={styles.addControl}>
                              <button
                                type="button"
                                className={styles.addButton}
                                onClick={() =>
                                  isButtWaxing
                                    ? setButtPickerOpen(true)
                                    : changeQuantity(service.id, 1)
                                }
                                aria-label={
                                  isButtWaxing
                                    ? "Choose Butt Waxing option"
                                    : `Add ${service.name}`
                                }
                              >
                                Add
                              </button>
                              {isButtWaxing ? (
                                <small>2 options</small>
                              ) : service.id === "full-arms-underarms-waxing" ? (
                                <small>4 options</small>
                              ) : null}
                            </div>
                          ) : (
                            <div className={styles.stepper} aria-label={`${service.name} quantity`}>
                              <button
                                type="button"
                                onClick={() => changeQuantity(service.id, -1)}
                                aria-label={`Remove one ${service.name}`}
                              >
                                -
                              </button>
                              <span aria-live="polite">{quantity}</span>
                              <button
                                type="button"
                                onClick={() => changeQuantity(service.id, 1)}
                                aria-label={`Add one more ${service.name}`}
                              >
                                +
                              </button>
                            </div>
                          )}
                        </div>
                      </div>
                    </article>
                  );
                })}
              </div>
            </section>
          );
        })}
      </div>

      <aside
        className={`${styles.cart} ${
          selectedCount === 0 ? styles.cartEmpty : styles.cartActive
        }`}
        aria-label="Your booking"
      >
        <div className={styles.cartHeading}>
          <div>
            <p>YOUR CART</p>
            <h2>Your Booking</h2>
          </div>
          <span className={styles.cartCount}>{selectedCount}</span>
        </div>

        {selectedCount === 0 ? (
          <div className={styles.emptyState}>
            <span className={styles.emptyPlus}>+</span>
            <strong>No service selected yet</strong>
            <p>Add any salon service from the cards.</p>
          </div>
        ) : (
          <ul className={styles.selectedList}>
            {selectedServices.map((service) => (
              <li key={service.id}>
                {/* CITY_COOLIES_SELECTED_CART_IMAGE */}
                <div className={styles.cartItemMedia} aria-hidden="true">
                  {service.image ? (
                    <Image
                      src={service.image}
                      alt=""
                      width={320}
                      height={320}
                    />
                  ) : (
                    <span>{service.name.charAt(0)}</span>
                  )}
                </div>
                <div className={styles.selectedCopy}>
                  <strong>{service.name}</strong>
                  <span>{formatPrice(service.price * service.quantity)}</span>
                </div>
                <div className={styles.cartStepper} aria-label={`${service.name} cart quantity`}>
                  <button
                    type="button"
                    onClick={() => changeQuantity(service.id, -1)}
                    aria-label={`Remove one ${service.name}`}
                  >
                    -
                  </button>
                  <span>{service.quantity}</span>
                  <button
                    type="button"
                    onClick={() => changeQuantity(service.id, 1)}
                    aria-label={`Add one more ${service.name}`}
                  >
                    +
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}

        <div className={styles.subtotal}>
          <span>Estimated Subtotal</span>
          <strong>{formatPrice(totalPrice)}</strong>
        </div>

        <div className={styles.priceNote}>
          <span>OK</span>
          <p>Transparent service pricing. Final price may vary only for selected options.</p>
        </div>

        <p className={styles.secureLine}>SECURE AND ENCRYPTED CHECKOUT</p>

        {selectedCount === 0 ? (
          <button type="button" className={styles.disabledBooking} disabled>
            Proceed to Booking
          </button>
        ) : (
          <div className={styles.bookingAction}>
            <ServiceBookingModal
              key={bookingServiceName}
              packageId="salon-for-women-custom-selection"
              serviceName={`Salon for Women: ${bookingServiceName}`}
              originalPrice={totalPrice}
              offerPrice={totalPrice}
              triggerLabel="Proceed to Booking"
            />
          </div>
        )}

        <div className={styles.trustList}>
          <div><span>OK</span><p><strong>Verified Professionals</strong><small>Background verified experts</small></p></div>
          <div><span>INR</span><p><strong>Transparent Pricing</strong><small>No hidden charges</small></p></div>
          <div><span>SSL</span><p><strong>Secure Online Payments</strong><small>Protected checkout</small></p></div>
        </div>
      </aside>

      {buttPickerOpen ? (
        <div
          className={styles.optionOverlay}
          role="presentation"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) setButtPickerOpen(false);
          }}
        >
          <section
            className={styles.optionModal}
            role="dialog"
            aria-modal="true"
            aria-labelledby="butt-waxing-options-title"
          >
            <header className={styles.optionHeader}>
              <div>
                <p>SELECT YOUR WAX</p>
                <h2 id="butt-waxing-options-title">Butt Waxing</h2>
                <span>Choose one option to add to your booking.</span>
              </div>
              <button
                type="button"
                className={styles.optionClose}
                onClick={() => setButtPickerOpen(false)}
                aria-label="Close Butt Waxing options"
              >
                &#215;
              </button>
            </header>

            <div className={styles.optionGrid}>
              {buttWaxingVariants.map((variant) => (
                <article key={variant.id} className={styles.optionCard}>
                  <Image
                    src={variant.image}
                    alt={`${variant.name} wax`}
                    width={320}
                    height={320}
                  />
                  <div className={styles.optionBody}>
                    <h3>{variant.name}</h3>
                    <p>Premium at-home waxing</p>
                    <div>
                      <strong>{formatPrice(variant.price)}</strong>
                      <button
                        type="button"
                        onClick={() => selectButtWaxingVariant(variant.id)}
                        aria-label={`Add ${variant.name} Butt Waxing`}
                      >
                        Add
                      </button>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </section>
        </div>
      ) : null}
    </div>
  );
}
