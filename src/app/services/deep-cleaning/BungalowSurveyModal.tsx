"use client";

import {
  useEffect,
  useState,
} from "react";

import { createPortal } from "react-dom";

import {
  upsertDeepCleaningCartItem,
} from "./deepCleaningCart";

import styles from "./BungalowSurveyModal.module.css";

type BungalowSurveyModalProps = {
  serviceId: string;
  serviceTitle: string;
  buttonClassName: string;
  buttonLabel?: string;
};

const SURVEY_PRICE = 500;
const SURVEY_PRICE_LABEL = "₹500";

/* CITY_COOLIES_BUNGALOW_CLEANING_VISUALS */
const BUNGALOW_CLEANING_VISUALS = [
  {
    id: "floor-deep-cleaning",
    name: "Floor deep cleaning",
    image:
      "/deep-cleaning/bungalow-floor-deep-cleaning.04456972ba5b.webp",
  },
  {
    id: "staircase-cleaning",
    name: "Staircase cleaning",
    image:
      "/deep-cleaning/bungalow-staircase-cleaning.fa8b8fc5701a.webp",
  },
  {
    id: "kitchen-deep-cleaning",
    name: "Kitchen deep cleaning",
    image:
      "/deep-cleaning/bungalow-kitchen-deep-cleaning.ce55af14d09b.webp",
  },
  {
    id: "bathroom-deep-cleaning",
    name: "Bathroom deep cleaning",
    image:
      "/deep-cleaning/bungalow-bathroom-deep-cleaning.d88a050ffae4.webp",
  },
  {
    id: "window-glass-cleaning",
    name: "Window & glass cleaning",
    image:
      "/deep-cleaning/bungalow-window-glass-cleaning.13fed8284e7f.webp",
  },
  {
    id: "fan-switch-fixture-cleaning",
    name: "Fan, switch & fixture cleaning",
    image:
      "/deep-cleaning/bungalow-fan-switch-fixture-cleaning.cd8a78e1e2a9.webp",
  },
] as const;

/* CITY_COOLIES_BUNGALOW_RATING_DATA */
const BUNGALOW_RATING_BREAKDOWN = [
  {
    stars: 5,
    percentage: 47,
    reviews: 423,
  },
  {
    stars: 4,
    percentage: 34,
    reviews: 306,
  },
  {
    stars: 3,
    percentage: 13,
    reviews: 117,
  },
  {
    stars: 2,
    percentage: 4,
    reviews: 36,
  },
  {
    stars: 1,
    percentage: 2,
    reviews: 18,
  },
] as const;

export default function BungalowSurveyModal({
  serviceId,
  serviceTitle,
  buttonClassName,
  buttonLabel = "Add",
}: BungalowSurveyModalProps) {
  const propertyTypeLabel =
    serviceId.includes("villa")
      ? "villa"
      : "bungalow or duplex";
  const [isOpen, setIsOpen] =
    useState(false);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const previousOverflow =
      document.body.style.overflow;

    document.body.style.overflow =
      "hidden";

    const handleKeyDown = (
      event: KeyboardEvent,
    ) => {
      if (event.key === "Escape") {
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

  const handleAddSurvey = () => {
    upsertDeepCleaningCartItem({
      id: `${serviceId}-site-survey`,
      serviceTitle,
      optionLabel: "Property site survey",
      price: SURVEY_PRICE,
      priceLabel: SURVEY_PRICE_LABEL,
      duration: "Site survey",
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
            <div
              className={styles.modal}
              role="dialog"
              aria-modal="true"
              aria-labelledby={`${serviceId}-survey-title`}
            >
              <button
                type="button"
                className={styles.closeButton}
                aria-label="Close"
                onClick={() =>
                  setIsOpen(false)
                }
              >
                ×
              </button>

              <div
                className={
                  styles.scrollArea
                }
              >
                <header
                  className={
                    styles.header
                  }
                >
                  <h2
                    id={`${serviceId}-survey-title`}
                    className={
                      styles.title
                    }
                  >
                    {serviceTitle}
                  </h2>

                  <div
                    className={
                      styles.priceRow
                    }
                  >
                    <span>
                      Site survey charges
                    </span>

                    <strong>
                      {SURVEY_PRICE_LABEL}
                    </strong>
                  </div>

                                    <p
                    className={
                      styles.squareFootRate
                    }
                  >
                    {serviceId.startsWith("unfurnished-")
                      ? "₹6.00 per sq. ft."
                      : "₹7.00 per sq. ft."}
                  </p>
                </header>

                <section
                  className={
                    styles.content
                  }
                >
                  <h3
                    className={
                      styles.sectionTitle
                    }
                  >
                    Property site survey
                  </h3>

                  <p
                    className={
                      styles.description
                    }
                  >
                    After the site survey, we’ll confirm the final price based on the actual area, condition and work required.
                  </p>

                  <div
                    className={
                      styles.surveyList
                    }
                  >
                    <div
                      className={
                        styles.surveyItem
                      }
                    >
                      <span
                        className={
                          styles.check
                        }
                        aria-hidden="true"
                      >
                        ✓
                      </span>

                      <span>
                        Property size and floor
                        layout
                      </span>
                    </div>

                    <div
                      className={
                        styles.surveyItem
                      }
                    >
                      <span
                        className={
                          styles.check
                        }
                        aria-hidden="true"
                      >
                        ✓
                      </span>

                      <span>
                        Furnishing and cleaning
                        condition
                      </span>
                    </div>

                    <div
                      className={
                        styles.surveyItem
                      }
                    >
                      <span
                        className={
                          styles.check
                        }
                        aria-hidden="true"
                      >
                        ✓
                      </span>

                      <span>
                        Special cleaning
                        requirements
                      </span>
                    </div>
                  </div>

                  
                
                  {/* CITY_COOLIES_BUNGALOW_CLEANING_IMAGES_START */}
                  <div
                    className={
                      styles.cleaningVisualGrid
                    }
                  >
                    {BUNGALOW_CLEANING_VISUALS.map(
                      (item) => (
                        <figure
                          key={item.id}
                          className={
                            styles.cleaningVisualItem
                          }
                        >
                          <img decoding="async"
                            src={item.image}
                            alt={item.name}
                            className={
                              styles.cleaningVisualImage
                            }
                            loading="eager"
                          />

                          <figcaption
                            className={
                              styles.cleaningVisualName
                            }
                          >
                            {item.name}
                          </figcaption>
                        </figure>
                      ),
                    )}
                  </div>
                  {/* CITY_COOLIES_BUNGALOW_CLEANING_IMAGES_END */}

                  {/* CITY_COOLIES_BUNGALOW_INCLUDED_START */}
                  <section
                    className={
                      styles.includedSection
                    }
                  >
                    <h3
                      className={
                        styles.includedTitle
                      }
                    >
                      What&apos;s Included
                    </h3>

                    <ul
                      className={
                        styles.includedList
                      }
                    >
                      <li>
                        Machine floor scrubbing
                      </li>

                      <li>
                        Ceiling and fan dusting
                      </li>

                      <li>
                        Windows, doors, mirrors and glass cleaning
                      </li>

                      <li>
                        Switches, sockets and reachable fixtures cleaning
                      </li>

                      <li>
                        Furniture surface cleaning
                      </li>

                      <li>
                        Staircase and railing cleaning
                      </li>

                      <li>
                        Cabinet exterior cleaning
                        <span className={styles.includedNote}>
                          {" "}
                          (interiors cleaned when empty)
                        </span>
                      </li>

                      <li>
                        Sofa and mattress dry vacuuming
                        <span className={styles.includedNote}>
                          {" "}
                          (wet shampooing available at extra cost)
                        </span>
                      </li>

                      <li>
                        Kitchen countertop, sink and stove cleaning
                      </li>

                      <li>
                        Kitchen cabinet exterior cleaning
                      </li>

                      <li>
                        Appliance exterior cleaning
                      </li>

                      <li>
                        Bathroom fixtures, wash basin and shower-area cleaning
                      </li>

                      <li>
                        Tile and grout scrubbing
                      </li>
                    </ul>
                  </section>
                  {/* CITY_COOLIES_BUNGALOW_INCLUDED_END */}

                  {/* CITY_COOLIES_BUNGALOW_RATING_BREAKDOWN_START */}
                  <section
                    className={
                      styles.ratingBreakdownSection
                    }
                    aria-label="Customer ratings"
                  >
                    <div
                      className={
                        styles.ratingSummary
                      }
                    >
                      <div
                        className={
                          styles.ratingScoreRow
                        }
                      >
                        <span
                          className={
                            styles.ratingMainStar
                          }
                          aria-hidden="true"
                        >
                          ★
                        </span>

                        <strong
                          className={
                            styles.ratingScore
                          }
                        >
                          4.2
                        </strong>
                      </div>

                      <p
                        className={
                          styles.ratingReviewCount
                        }
                      >
                        900 reviews
                      </p>
                    </div>

                    <div
                      className={
                        styles.ratingBars
                      }
                    >
                      {BUNGALOW_RATING_BREAKDOWN.map(
                        (rating) => (
                          <div
                            key={rating.stars}
                            className={
                              styles.ratingBarRow
                            }
                          >
                            <div
                              className={
                                styles.ratingBarLabel
                              }
                            >
                              <span>
                                {rating.stars}
                              </span>

                              <span
                                className={
                                  styles.ratingSmallStar
                                }
                                aria-hidden="true"
                              >
                                ★
                              </span>
                            </div>

                            <div
                              className={
                                styles.ratingTrack
                              }
                              role="progressbar"
                              aria-label={`${rating.stars} star ratings`}
                              aria-valuemin={0}
                              aria-valuemax={100}
                              aria-valuenow={
                                rating.percentage
                              }
                            >
                              <span
                                className={
                                  styles.ratingFill
                                }
                                style={{
                                  width: `${rating.percentage}%`,
                                }}
                              />
                            </div>

                            <span
                              className={
                                styles.ratingPercentage
                              }
                            >
                              {rating.percentage}%
                            </span>
                          </div>
                        ),
                      )}
                    </div>
                  </section>
                  {/* CITY_COOLIES_BUNGALOW_RATING_BREAKDOWN_END */}
</section>
              </div>

              <footer
                className={
                  styles.footer
                }
              >
                <div>
                  <span
                    className={
                      styles.footerLabel
                    }
                  >
                    Site survey
                  </span>

                  <strong
                    className={
                      styles.footerPrice
                    }
                  >
                    {SURVEY_PRICE_LABEL}
                  </strong>
                </div>

                <button
                  type="button"
                  className={
                    styles.confirmButton
                  }
                  onClick={
                    handleAddSurvey
                  }
                >
                  Add site survey
                </button>
              </footer>
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
        onClick={() =>
          setIsOpen(true)
        }
      >
        {buttonLabel}
      </button>

      {modal}
    </>
  );
}