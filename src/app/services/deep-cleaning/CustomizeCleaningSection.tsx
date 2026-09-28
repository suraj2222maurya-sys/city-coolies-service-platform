"use client";

import {
  useEffect,
  useMemo,
  useState,
} from "react";

import {
  upsertDeepCleaningCartItem,
} from "./deepCleaningCart";

import styles from "./CustomizeCleaningSection.module.css";

type SelectionType =
  | "quantity"
  | "toggle";

type CustomCleaningService = {
  id: string;
  name: string;
  price: number;
  unitLabel: string;
  selectionType: SelectionType;
};

const customCleaningServices: readonly CustomCleaningService[] = [
  {
    id: "bedroom-cleaning",
    name: "Bedroom Cleaning",
    price: 500,
    unitLabel: "per room",
    selectionType: "quantity",
  },
  {
    id: "living-room-cleaning",
    name: "Living Room Cleaning",
    price: 800,
    unitLabel: "per room",
    selectionType: "quantity",
  },
  {
    id: "restroom-cleaning",
    name: "Restroom Cleaning",
    price: 1000,
    unitLabel: "per restroom",
    selectionType: "quantity",
  },
  {
    id: "window-grill-glass-cleaning",
    name: "Window, Grill & Glass Cleaning",
    price: 500,
    unitLabel: "per unit",
    selectionType: "quantity",
  },
  {
    id: "tv-cleaning",
    name: "TV Cleaning",
    price: 150,
    unitLabel: "per TV",
    selectionType: "quantity",
  },
  {
    id: "balcony-cleaning",
    name: "Balcony Cleaning",
    price: 350,
    unitLabel: "per balcony",
    selectionType: "quantity",
  },
  {
    id: "utility-area-cleaning",
    name: "Utility Area Cleaning",
    price: 1000,
    unitLabel: "fixed service",
    selectionType: "toggle",
  },
  {
    id: "cobweb-removal",
    name: "Cobweb Removal",
    price: 500,
    unitLabel: "fixed service",
    selectionType: "toggle",
  },
] as const;

function formatCurrency(
  amount: number,
): string {
  return new Intl.NumberFormat(
    "en-IN",
    {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    },
  ).format(amount);
}

export default function CustomizeCleaningSection() {
  const [isOpen, setIsOpen] =
    useState(false);

  const [quantities, setQuantities] =
    useState<Record<string, number>>({});

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const previousOverflow =
      document.body.style.overflow;

    document.body.style.overflow =
      "hidden";

    const handleEscape = (
      event: KeyboardEvent,
    ) => {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    };

    window.addEventListener(
      "keydown",
      handleEscape,
    );

    return () => {
      document.body.style.overflow =
        previousOverflow;

      window.removeEventListener(
        "keydown",
        handleEscape,
      );
    };
  }, [isOpen]);

  const selectedServices = useMemo(
    () =>
      customCleaningServices.flatMap(
        (service) => {
          const quantity =
            quantities[service.id] ?? 0;

          if (quantity <= 0) {
            return [];
          }

          return [
            {
              ...service,
              quantity,
              lineTotal:
                service.price * quantity,
            },
          ];
        },
      ),
    [quantities],
  );

  const total = useMemo(
    () =>
      selectedServices.reduce(
        (sum, service) =>
          sum + service.lineTotal,
        0,
      ),
    [selectedServices],
  );

  const totalUnits =
    selectedServices.reduce(
      (sum, service) =>
        sum + service.quantity,
      0,
    );

  const changeQuantity = (
    serviceId: string,
    delta: number,
  ) => {
    setQuantities((current) => {
      const currentQuantity =
        current[serviceId] ?? 0;

      const nextQuantity = Math.max(
        0,
        Math.min(
          10,
          currentQuantity + delta,
        ),
      );

      return {
        ...current,
        [serviceId]: nextQuantity,
      };
    });
  };

  const toggleService = (
    serviceId: string,
  ) => {
    setQuantities((current) => ({
      ...current,
      [serviceId]:
        (current[serviceId] ?? 0) > 0
          ? 0
          : 1,
    }));
  };

  const addPackageToCart = () => {
    if (selectedServices.length === 0) {
      return;
    }

    const optionLabel =
      selectedServices
        .map((service) => {
          if (
            service.selectionType ===
            "quantity"
          ) {
            return `${service.name} × ${service.quantity}`;
          }

          return service.name;
        })
        .join(", ");

    upsertDeepCleaningCartItem({
      id: "customize-cleaning-package",
      serviceTitle:
        "Customize Cleaning",
      optionLabel,
      price: total,
      priceLabel:
        formatCurrency(total),
      duration:
        "Custom cleaning package",
    });

    setIsOpen(false);
  };

  return (
    <>
      <section
        id="customize-cleaning-section"
        className={styles.section}
        aria-labelledby="customize-cleaning-heading"
      >
        <h2
          id="customize-cleaning-heading"
          className={styles.sectionTitle}
        >
          Customize Cleaning
        </h2>

        <div className={styles.promoBanner}>
          <div
            className={
              styles.promoContent
            }
          >
            <span className={styles.badge}>
              Make your package
            </span>

            <h3 className={styles.promoHeading}>
              Cleaning built around
              your home
            </h3>

            <p
              className={
                styles.promoDescription
              }
            >
              Choose only the rooms and
              areas you want cleaned.
            </p>
          </div>
        </div>

        <div
          className={
            styles.serviceHeader
          }
        >
          <div
            className={
              styles.serviceInformation
            }
          >
            <h3
              className={
                styles.serviceTitle
              }
            >
              Customize your home cleaning
            </h3>

            <p className={styles.serviceMeta}>
              Bedroom, living room,
              restroom, balcony & more
            </p>
            {/* CITY_COOLIES_CUSTOMIZE_RATING_MAIN_V3 */}
            <span
              className={styles.ccRatingInline}
              aria-label="Rated 4.1 out of 5"
            >
              <span
                className={styles.ccRatingStar}
                aria-hidden="true"
              >
                ★
              </span>

              <span className={styles.ccRatingScore}>
                4.1
              </span>

              <span className={styles.ccRatingReviews}>
                (900 reviews)
              </span>
            </span>


            <button
              type="button"
              className={
                styles.detailsButton
              }
              onClick={() =>
                setIsOpen(true)
              }
            >
              View details
            </button>
          </div>

          <button
            type="button"
            className={styles.addButton}
            onClick={() =>
              setIsOpen(true)
            }
          >
            Add
          </button>
        </div>
      </section>

      {isOpen && (
        <div
          className={styles.backdrop}
          onMouseDown={(event) => {
            if (
              event.target ===
              event.currentTarget
            ) {
              setIsOpen(false);
            }
          }}
        >
          <section
            className={styles.modal}
            role="dialog"
            aria-modal="true"
            aria-labelledby="customize-modal-heading"
          >
            <header
              className={
                styles.modalHeader
              }
            >
              <div>
                <h2
                  id="customize-modal-heading"
                >
                  Customize Cleaning
                </h2>

                <p>
                  Choose only what you
                  need.
                </p>
              </div>

              <button
                type="button"
                className={
                  styles.closeButton
                }
                aria-label="Close customize cleaning"
                onClick={() =>
                  setIsOpen(false)
                }
              >
                ×
              </button>
            </header>

            <div
              className={
                styles.modalSummary
              }
            >
              <span>
                {totalUnits === 0
                  ? "Nothing selected"
                  : `${totalUnits} selected`}
              </span>

              <strong>
                {formatCurrency(total)}
              </strong>
            </div>

            <div
              className={
                styles.modalBody
              }
            >
              <div
                className={
                  styles.serviceList
                }
              >
                {customCleaningServices.map(
                  (service) => {
                    const quantity =
                      quantities[
                        service.id
                      ] ?? 0;

                    const selected =
                      quantity > 0;

                    return (
                      <article
                        key={
                          service.id
                        }
                        className={`${styles.optionRow} ${
                          selected
                            ? styles.optionRowSelected
                            : ""
                        }`}
                      >
                        <div
                          className={
                            styles.optionCopy
                          }
                        >
                          <h3>
                            {
                              service.name
                            }
                          </h3>

                          <p>
                            <strong>
                              {formatCurrency(
                                service.price,
                              )}
                            </strong>

                            <span>
                              {
                                service.unitLabel
                              }
                            </span>
                          </p>
                        </div>

                        {service.selectionType ===
                        "quantity" ? (
                          <div
                            className={
                              styles.stepper
                            }
                          >
                            <button
                              type="button"
                              aria-label={`Remove one ${service.name}`}
                              disabled={
                                quantity ===
                                0
                              }
                              onClick={() =>
                                changeQuantity(
                                  service.id,
                                  -1,
                                )
                              }
                            >
                              −
                            </button>

                            <span>
                              {quantity}
                            </span>

                            <button
                              type="button"
                              aria-label={`Add one ${service.name}`}
                              onClick={() =>
                                changeQuantity(
                                  service.id,
                                  1,
                                )
                              }
                            >
                              +
                            </button>
                          </div>
                        ) : (
                          <button
                            type="button"
                            className={`${styles.optionAddButton} ${
                              selected
                                ? styles.optionAddButtonSelected
                                : ""
                            }`}
                            aria-pressed={
                              selected
                            }
                            onClick={() =>
                              toggleService(
                                service.id,
                              )
                            }
                          >
                            {selected
                              ? "Added"
                              : "Add"}
                          </button>
                        )}
                      </article>
                    );
                  },
                )}
              </div>
            
              {/* CITY_COOLIES_CUSTOMIZE_RATING_POPUP_V3 */}
              <section
                className={styles.ccOverallRating}
                aria-label="Customize Cleaning rating breakdown"
              >
                <div className={styles.ccRatingHeading}>
                  <span
                    className={styles.ccGoldStar}
                    aria-hidden="true"
                  >
                    ★
                  </span>

                  <strong>4.1</strong>
                </div>

                <p className={styles.ccReviewCount}>
                  900 reviews
                </p>

                <div className={styles.ccRatingBars}>
                  {[
                    { stars: 5, percentage: 44 },
                    { stars: 4, percentage: 35 },
                    { stars: 3, percentage: 12 },
                    { stars: 2, percentage: 5 },
                    { stars: 1, percentage: 4 },
                  ].map((rating) => (
                    <div
                      key={rating.stars}
                      className={styles.ccRatingBarRow}
                    >
                      <span className={styles.ccStarLabel}>
                        {rating.stars}

                        <span aria-hidden="true">
                          ★
                        </span>
                      </span>

                      <div className={styles.ccRatingTrack}>
                        <div
                          className={styles.ccRatingFill}
                          style={{
                            width: `${rating.percentage}%`,
                          }}
                        />
                      </div>

                      <span className={styles.ccPercentage}>
                        {rating.percentage}%
                      </span>
                    </div>
                  ))}
                </div>
              </section>
</div>

            <footer
              className={
                styles.modalFooter
              }
            >
              <div
                className={
                  styles.footerTotal
                }
              >
                <span>
                  {selectedServices.length ===
                  0
                    ? "Select services"
                    : `${selectedServices.length} service${
                        selectedServices.length ===
                        1
                          ? ""
                          : "s"
                      } selected`}
                </span>

                <strong>
                  {formatCurrency(total)}
                </strong>
              </div>

              <button
                type="button"
                className={
                  styles.cartButton
                }
                disabled={
                  selectedServices.length ===
                  0
                }
                onClick={
                  addPackageToCart
                }
              >
                Add to cart
              </button>
            </footer>
          </section>
        </div>
      )}
    </>
  );
}