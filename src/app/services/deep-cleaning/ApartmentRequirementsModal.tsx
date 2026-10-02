"use client";

import Image from "next/image";

import {
  useEffect,
  useRef,
  useState,
} from "react";
import { createPortal } from "react-dom";

import {
  upsertDeepCleaningCartItem,
} from "./deepCleaningCart";

import CleaningCoverageModal from "./CleaningCoverageModal";

import KitchenStorageAppliancesOptions from "./KitchenStorageAppliancesOptions";

import styles from "./ApartmentRequirementsModal.module.css";

type ApartmentRequirementsModalProps = {
  serviceId?: string;
  serviceTitle: string;
  startingPrice: string;
  duration: string;
  buttonClassName: string;
  buttonLabel?: string;
};

const homeSizes = [
  {
    id: "1-bhk",
    label: "1 BHK",
    price: 3199,
    priceLabel: "₹3,199",
  },
  {
    id: "2-bhk",
    label: "2 BHK",
    price: 3499,
    priceLabel: "₹3,499",
  },
  {
    id: "3-bhk",
    label: "3 BHK",
    price: 4299,
    priceLabel: "₹4,299",
  },
  {
    id: "4-bhk",
    label: "4 BHK",
    price: 5499,
    priceLabel: "₹5,499",
  },
  {
    id: "5-bhk",
    label: "5 BHK",
    price: 5999,
    priceLabel: "₹5,999",
  },
] as const;

const requirementGroups = [
  {
    id: "kitchen-storage",
    title: "Kitchen storage & appliances",
    description:
      "Choose additional kitchen cabinet and appliance cleaning.",
  },
  {
    id: "extra-area",
    title: "Additional room or area",
    description:
      "Add another suitable room, balcony or residential area.",
  },
] as const;

const extraAreaOptions = [
  {
    id: "extra-bedroom",
    label: "Extra bedroom",
    price: 299,
    priceLabel: "₹299",
  },
  {
    id: "extra-bathroom",
    label: "Extra bathroom",
    price: 199,
    priceLabel: "₹199",
  },
  {
    id: "extra-balcony",
    label: "Extra balcony",
    price: 149,
    priceLabel: "₹149",
  },
  {
    id: "study-pooja-room",
    label: "Study / Pooja room",
    price: 199,
    priceLabel: "₹199",
  },
  {
    id: "utility-store-room",
    label: "Utility / Store room",
    price: 149,
    priceLabel: "₹149",
  },
  {
    id: "terrace-open-area",
    label: "Terrace / open area",
    price: 399,
    priceLabel: "₹399",
  },
] as const;
const includedItems = [
  "Machine floor scrubbing",
  "Reachable fan and ceiling dusting",
  "Cabinet surface cleaning",
  "Kitchen tiles and counters",
  "Sink and under-sink cleaning",
  "Kitchen surface cleaning",
  "Bathroom floor deep scrub",
  "Toilet and bathroom fixtures",
  "Wash basin and fittings",
  "Balcony floor cleaning",
  "Doors, windows and mirrors",
  "Switches and reachable fixtures",
] as const;

const coverageImages: Record<string, string> = {
  "Machine floor scrubbing":
    "/deep-cleaning/modern_lobby.png",
};
const excludedItems = [
  "Permanent paint, glue or construction stains",
  "Unsafe exterior areas without secure access",
  "Wet washing of painted walls and ceilings",
  "Construction debris or active renovation waste",
] as const;

const ratingBars = [
  { label: "5", width: "88%" },
  { label: "4", width: "62%" },
  { label: "3", width: "34%" },
  { label: "2", width: "18%" },
  { label: "1", width: "10%" },
] as const;

function makeServiceId(
  serviceTitle: string,
): string {
  return serviceTitle
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export default function ApartmentRequirementsModal({
  serviceId,
  serviceTitle,
  startingPrice,
  duration,
  buttonClassName,
  buttonLabel = "Add",
}: ApartmentRequirementsModalProps) {
  const [isOpen, setIsOpen] = useState(false);

  const [isCoverageOpen, setIsCoverageOpen] =
    useState(false);

  const [selectedSize, setSelectedSize] = useState("");

  const [kitchenSelections, setKitchenSelections] = useState<
    { id: string; label: string; price: number }[]
  >([]);

  const [extraAreaSelections, setExtraAreaSelections] = useState<
    { id: string; label: string; price: number }[]
  >([]);

  const [expandedGroup, setExpandedGroup] =
    useState<string | null>(null);
const sizeScrollerRef =
    useRef<HTMLDivElement>(null);

  const [canScrollLeft, setCanScrollLeft] =
    useState(false);

  const [canScrollRight, setCanScrollRight] =
    useState(true);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const previousOverflow =
      document.body.style.overflow;

    document.body.style.overflow = "hidden";

    const handleKeyDown = (
      event: KeyboardEvent,
    ) => {
      if (event.key === "Escape") {
        setIsCoverageOpen(false);
        setIsOpen(false);
      }
    };

    window.addEventListener(
      "keydown",
      handleKeyDown,
    );

    return () => {
      document.body.style.overflow =
        previousOverflow;

      window.removeEventListener(
        "keydown",
        handleKeyDown,
      );
    };
  }, [isOpen]);

  // CITY_COOLIES_SLIDER_STATE_START
  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const slider = sizeScrollerRef.current;

    if (!slider) {
      return;
    }

    const updateArrowVisibility = () => {
      const maxScrollLeft =
        slider.scrollWidth - slider.clientWidth;

      setCanScrollLeft(slider.scrollLeft > 2);

      setCanScrollRight(
        slider.scrollLeft < maxScrollLeft - 2,
      );
    };

    const frame = window.requestAnimationFrame(() => {
      slider.scrollLeft = 0;
      updateArrowVisibility();
    });

    slider.addEventListener(
      "scroll",
      updateArrowVisibility,
      {
        passive: true,
      },
    );

    window.addEventListener(
      "resize",
      updateArrowVisibility,
    );

    return () => {
      window.cancelAnimationFrame(frame);

      slider.removeEventListener(
        "scroll",
        updateArrowVisibility,
      );

      window.removeEventListener(
        "resize",
        updateArrowVisibility,
      );
    };
  }, [isOpen]);
  // CITY_COOLIES_SLIDER_STATE_END
  const selectedHome = homeSizes.find(
    (home) => home.id === selectedSize,
  );

  const scrollSizes = (
    direction: "left" | "right",
  ) => {
    const element = sizeScrollerRef.current;

    if (!element) {
      return;
    }

    const distance =
      Math.max(
        220,
        element.clientWidth * 0.75,
      );

    element.scrollBy({
      left:
        direction === "right"
          ? distance
          : -distance,
      behavior: "smooth",
    });
  };

  const kitchenTotal = kitchenSelections.reduce(
    (sum, option) => sum + option.price,
    0,
  );

  const extraAreaTotal = extraAreaSelections.reduce(
    (sum, option) => sum + option.price,
    0,
  );

  const selectionTotal =
    (selectedHome?.price ?? 0) +
    kitchenTotal +
    extraAreaTotal;

  const selectionPriceLabel = new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(selectionTotal);

  const selectionLabel = [
    selectedHome?.label,
    ...kitchenSelections.map(option => option.label),
    ...extraAreaSelections.map(option => option.label),
  ].filter(Boolean).join(" + ");

  const handleContinue = () => {
    if (!selectedHome) {
      return;
    }
    upsertDeepCleaningCartItem({
      id:
        serviceId ??
        makeServiceId(serviceTitle),

      serviceTitle,

      optionLabel: selectionLabel,

      price: selectionTotal,

      priceLabel: selectionPriceLabel,

      duration,
    });

    setIsOpen(false);
  };

  const modal =
    isOpen &&
    typeof document !== "undefined"
      ? createPortal(
          <div
            className={styles.overlay}
            onMouseDown={(event) => {
              if (
                event.target ===
                event.currentTarget
              ) {
                setIsOpen(false);
              }
            }}
          >
            <div className={styles.modalShell}>
              <button
                type="button"
                className={styles.closeButton}
                aria-label="Close"
                onClick={() => setIsOpen(false)}
              >
                ×
              </button>

              <div
                className={styles.scrollArea}
                role="dialog"
                aria-modal="true"
                aria-labelledby="requirements-modal-title"
              >
                <header className={styles.modalHeader}>
                  <h2
                    id="requirements-modal-title"
                    className={styles.serviceTitle}
                  >
                    {serviceTitle}
                  </h2>

                  <p className={styles.serviceMeta}>
                    Starts at {startingPrice}

                    <span aria-hidden="true">
                      •
                    </span>

                    {duration}
                  </p>
                </header>

                <div className={styles.serviceHighlights}>
                  <p>
                    <span aria-hidden="true">
                      &#10003;
                    </span>
                    Deep cleaning of rooms, kitchen, bathrooms &amp; balcony
                  </p>

                  <p>
                    <span aria-hidden="true">
                      &#10003;
                    </span>
                    Machine floor scrubbing &amp; wall/ceiling dusting
                  </p>
                </div>

                <section className={styles.section}>
                  <h3 className={styles.mainHeading}>
                    Choose your requirements
                  </h3>

                  <div className={styles.requirementBlock}>
                    <h4 className={styles.blockHeading}>
                      Select your home size
                    </h4>

                    <div
                      className={
                        styles.sizeSliderShell
                      }
                    >
                      {canScrollLeft && (
                        <button
                          type="button"
                          className={`${styles.sliderArrow} ${styles.sliderArrowLeft}`}
                          aria-label="Show previous home sizes"
                          onClick={() =>
                            scrollSizes("left")
                          }
                        >
                          ←
                        </button>
                      )}

                      <div
                        ref={sizeScrollerRef}
                        className={styles.sizeScroller}
                      >
                        {homeSizes.map((home) => {
                          const selected =
                            selectedSize === home.id;

                          return (
                            <button
                              key={home.id}
                              type="button"
                              className={`${styles.sizeOption} ${
                                selected
                                  ? styles.sizeOptionSelected
                                  : ""
                              }`}
                              aria-pressed={selected}
                              onClick={() =>
                                setSelectedSize((current) =>
                                  current === home.id
                                    ? ""
                                    : home.id,
                                )
                              }
                            >
                              <span>
                                {home.label}
                              </span>

                              <strong>
                                {home.priceLabel}
                              </strong>
                            </button>
                          );
                        })}
                      </div>

                      {canScrollRight && (
                        <button
                          type="button"
                          className={`${styles.sliderArrow} ${styles.sliderArrowRight}`}
                          aria-label="Show more home sizes"
                          onClick={() =>
                            scrollSizes("right")
                          }
                        >
                          →
                        </button>
                      )}
                    </div>

                    <a
                      href="#city-coolies-cleaning-coverage"
                      className={styles.coverageLink}
                      onClick={(event) => {
                        event.preventDefault();
                        setIsCoverageOpen(true);
                      }}
                    >
                      See what your cleaning covers
                    </a>
                  </div>

                  <div className={styles.accordion}>
                    {requirementGroups.map(
                      (group) => {
                        const expanded =
                          expandedGroup === group.id;

                        return (
                          <div
                            key={group.id}
                            className={
                              styles.accordionItem
                            }
                          >
                            <button
                              type="button"
                              className={
                                styles.accordionButton
                              }
                              aria-expanded={
                                expanded
                              }
                              onClick={() => {
setExpandedGroup(
                                  expanded
                                    ? null
                                    : group.id,
                                );
                              }}
                            >
                              <span>
                                {group.title}
                              </span>

                              <span
                                className={`${styles.chevron} ${
                                  expanded
                                    ? styles.chevronExpanded
                                    : ""
                                }`}
                                aria-hidden="true"
                              >
                                ⌄
                              </span>
                            </button>

                            {expanded && (
                              <div
                                className={
                                  styles.accordionContent
                                }
                              >
                                {group.id === "kitchen-storage" ? (
                                  <div>
                                    <KitchenStorageAppliancesOptions
                                      selectedOptions={kitchenSelections}
                                      onChange={setKitchenSelections}
                                    />
                                    <p
                                      role="status"
                                      style={{
                                        margin: "8px 0 0",
                                        fontSize: "13px",
                                        lineHeight: 1.5,
                                        color: "#b9141d",
                                      }}
                                    >
                                      {kitchenSelections.length > 0
                                        ? `Selected: ${kitchenSelections.map(option => option.label).join(", ")}`
                                        : "Select the kitchen services you need"}
                                    </p>
                                  </div>
                                ) : (
                                  <div>
                                    <div className={styles.extraAreaOptions}>
                                      {extraAreaOptions.map((option) => {
                                        const selected =
                                          extraAreaSelections.some(
                                            (item) =>
                                              item.id === option.id,
                                          );

                                        return (
                                          <button
                                            key={option.id}
                                            type="button"
                                            className={`${styles.extraAreaOption} ${
                                              selected
                                                ? styles.extraAreaOptionSelected
                                                : ""
                                            }`}
                                            aria-pressed={selected}
                                            onClick={() => {
                                              setExtraAreaSelections(
                                                (current) => {
                                                  const alreadySelected =
                                                    current.some(
                                                      (item) =>
                                                        item.id ===
                                                        option.id,
                                                    );

                                                  if (alreadySelected) {
                                                    return current.filter(
                                                      (item) =>
                                                        item.id !==
                                                        option.id,
                                                    );
                                                  }

                                                  return [
                                                    ...current,
                                                    {
                                                      id: option.id,
                                                      label: option.label,
                                                      price: option.price,
                                                    },
                                                  ];
                                                },
                                              );
                                            }}
                                          >
                                            <span>
                                              {option.label}
                                            </span>

                                            <strong>
                                              + {option.priceLabel}
                                            </strong>
                                          </button>
                                        );
                                      })}
                                    </div>

                                    <p className={styles.extraAreaHint}>
                                      Select any extra spaces you want included.
                                    </p>
                                  </div>
                                )}
                              </div>
                            )}
                          </div>
                        );
                      },
                    )}
                  </div>
                </section>


                <section
                  id="city-coolies-service-coverage"
                  className={styles.section}
                >
                  <h3 className={styles.sectionHeading}>
                    What&apos;s covered
                  </h3>

                  <div className={styles.coverageVisualGrid}>
                    <article className={styles.coverageVisualItem}>
                      <div className={styles.coverageVisualImageWrap}>
                        <img loading="eager" decoding="async"
                          src="/deep-cleaning/floor-scrubbing.a029f23916f4.webp"
                          alt="Machine floor scrubbing"
                          className={styles.coverageVisualImage}
                        />
                      </div>
                      <p className={styles.coverageVisualName}>
                        Machine floor scrubbing
                      </p>
                    </article>

                    <article className={styles.coverageVisualItem}>
                      <div className={styles.coverageVisualImageWrap}>
                        <img loading="eager" decoding="async"
                          src="/deep-cleaning/-balcony-floor-cleaning.dbfb064731d2.webp"
                          alt="Balcony floor cleaning"
                          className={styles.coverageVisualImage}
                        />
                      </div>
                      <p className={styles.coverageVisualName}>
                        Balcony floor cleaning
                      </p>
                    </article>

                    <article className={styles.coverageVisualItem}>
                      <div className={styles.coverageVisualImageWrap}>
                        <img loading="eager" decoding="async"
                          src="/deep-cleaning/wash-basin-fittings.979c9f7fc89b.webp"
                          alt="Wash basin and fittings"
                          className={styles.coverageVisualImage}
                        />
                      </div>
                      <p className={styles.coverageVisualName}>
                        Wash basin & fittings
                      </p>
                    </article>

                    <article className={styles.coverageVisualItem}>
                      <div className={styles.coverageVisualImageWrap}>
                        <img loading="eager" decoding="async"
                          src="/deep-cleaning/toilet-bathroom-fixtures.6002a0e529f6.webp"
                          alt="Toilet and bathroom fixtures"
                          className={styles.coverageVisualImage}
                        />
                      </div>
                      <p className={styles.coverageVisualName}>
                        Toilet & bathroom fixtures
                      </p>
                    </article>

                    <article className={styles.coverageVisualItem}>
                      <div className={styles.coverageVisualImageWrap}>
                        <img loading="eager" decoding="async"
                          src="/deep-cleaning/bathroom-floor-scrub.d849e230751c.webp"
                          alt="Bathroom floor scrubbing"
                          className={styles.coverageVisualImage}
                        />
                      </div>
                      <p className={styles.coverageVisualName}>
                        Bathroom floor scrubbing
                      </p>
                    </article>

                    <article className={styles.coverageVisualItem}>
                      <div className={styles.coverageVisualImageWrap}>
                        <img loading="eager" decoding="async"
                          src="/deep-cleaning/kitchen-surface-cleaning.3b5b882ec6c8.webp"
                          alt="Kitchen surface cleaning"
                          className={styles.coverageVisualImage}
                        />
                      </div>
                      <p className={styles.coverageVisualName}>
                        Kitchen surface cleaning
                      </p>
                    </article>

                    <article className={styles.coverageVisualItem}>
                      <div className={styles.coverageVisualImageWrap}>
                        <img loading="eager" decoding="async"
                          src="/deep-cleaning/sink-under-sink.effa6f0bac4a.webp"
                          alt="Sink and under sink cleaning"
                          className={styles.coverageVisualImage}
                        />
                      </div>
                      <p className={styles.coverageVisualName}>
                        Sink & under sink
                      </p>
                    </article>

                    <article className={styles.coverageVisualItem}>
                      <div className={styles.coverageVisualImageWrap}>
                        <img loading="eager" decoding="async"
                          src="/deep-cleaning/kitchen-tiles-counter.5c2e2f639888.webp"
                          alt="Kitchen tiles and counter cleaning"
                          className={styles.coverageVisualImage}
                        />
                      </div>
                      <p className={styles.coverageVisualName}>
                        Kitchen tiles & counter
                      </p>
                    </article>

                    <article className={styles.coverageVisualItem}>
                      <div className={styles.coverageVisualImageWrap}>
                        <img loading="eager" decoding="async"
                          src="/deep-cleaning/cabinet-surface-cleaning.c55dddf5595d.webp"
                          alt="Cabinet surface cleaning"
                          className={styles.coverageVisualImage}
                        />
                      </div>
                      <p className={styles.coverageVisualName}>
                        Cabinet surface cleaning
                      </p>
                    </article>

                    <article className={styles.coverageVisualItem}>
                      <div className={styles.coverageVisualImageWrap}>
                        <img loading="eager" decoding="async"
                          src="/deep-cleaning/ceiling-fan-dusting.787a2bb736f9.webp"
                          alt="Ceiling fan dusting"
                          className={styles.coverageVisualImage}
                        />
                      </div>
                      <p className={styles.coverageVisualName}>
                        Ceiling fan dusting
                      </p>
                    </article>

                    <article className={styles.coverageVisualItem}>
                      <div className={styles.coverageVisualImageWrap}>
                        <img loading="eager" decoding="async"
                          src="/deep-cleaning/doors-windows-mirrors-cleaning.5dac19e822ef.webp"
                          alt="Doors, windows and mirrors cleaning"
                          className={styles.coverageVisualImage}
                        />
                      </div>
                      <p className={styles.coverageVisualName}>
                        Doors, windows and mirrors
                      </p>
                    </article>

                    <article className={styles.coverageVisualItem}>
                      <div className={styles.coverageVisualImageWrap}>
                        <img loading="eager" decoding="async"
                          src="/deep-cleaning/switches-reachable-fixtures-cleaning.410241e96e5e.webp"
                          alt="Switches and reachable fixtures cleaning"
                          className={styles.coverageVisualImage}
                        />
                      </div>
                      <p className={styles.coverageVisualName}>
                        Switches and reachable fixtures
                      </p>
                    </article>
                  </div>
                </section>

                <section className={styles.section}>
                  <h3 className={styles.sectionHeading}>
                    Not part of this package
                  </h3>

                  <ul className={styles.excludedList}>
                    {excludedItems.map((item) => (
                      <li key={item}>
                        <span
                          className={
                            styles.crossIcon
                          }
                          aria-hidden="true"
                        >
                          ×
                        </span>

                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </section>

                <section className={styles.section}>
                  <div
                    className={
                      styles.protectionBox
                    }
                  >
                    <div>
                      <h3
                        className={
                          styles.protectionTitle
                        }
                      >
                        Service protection
                      </h3>

                      <p>
                        Support is available for
                        verified service issues
                        reported during the booking.
                      </p>
                    </div>

                    <div
                      className={styles.shield}
                      aria-hidden="true"
                    >
                      ✓
                    </div>
                  </div>
                </section>

                <section className={styles.section}>
                  <h3 className={styles.ratingTitle}>
                    ★ 4.4
                  </h3>

                  <p className={styles.ratingCaption}>
                    Customer rating
                  </p>

                  <div className={styles.ratingBars}>
                    {ratingBars.map((rating) => (
                      <div
                        key={rating.label}
                        className={
                          styles.ratingBarRow
                        }
                      >
                        <span>
                          ★ {rating.label}
                        </span>

                        <div
                          className={
                            styles.ratingTrack
                          }
                        >
                          <span
                            style={{
                              width: rating.width,
                            }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </section>

                <footer className={styles.modalFooter}>
                  <div
                    className={
                      styles.footerSelection
                    }
                  >
                    <span className={styles.footerLabel}>Total</span>

                    {selectedHome ? (<strong>{selectionPriceLabel}</strong>) : (
                      <strong>
                        Select a home size
                      </strong>
                    )}
                  </div>

                  <div
                    className={
                      styles.footerActions
                    }
                  >
                    

                    <button
                      type="button"
                      className={
                        styles.continueButton
                      }
                      onClick={handleContinue}
                      disabled={!selectedHome}
                    >
                      Continue
                    </button>
                  </div>
                </footer>
              </div>
            </div>
          </div>,
          document.body,
        )
      : null;

  return (
    <>
      <button
        type="button"
        className={buttonClassName}
        onClick={() => {
          setSelectedSize("");
          setKitchenSelections([]);
          setExtraAreaSelections([]);
          setIsOpen(true);
        }}
      >
        {buttonLabel}
      </button>

      <CleaningCoverageModal
        open={isOpen && isCoverageOpen}
        onClose={() => setIsCoverageOpen(false)}
      />

      {modal}
    </>
  );
}



















