"use client";

import {
  useEffect,
  useState,
} from "react";

import {
  createPortal,
} from "react-dom";

import FullHomeRightSidebar from "./FullHomeRightSidebar";

import {
  upsertDeepCleaningCartItem,
} from "./deepCleaningCart";

import styles from "./LivingBedroomCleaningSection.module.css";

type RatingBar = {
  stars: number;
  percentage: number;
};

type PriceOption = {
  id: string;
  label: string;
  price: number;
};

type ProcessStep = {
  title: string;
  description: string;
};

type CleaningService = {
  id: string;
  title: string;
  rating: number;
  reviews: number;
  pricingTitle: string;
  options: readonly PriceOption[];
  process: readonly ProcessStep[];
  ratingBars: readonly RatingBar[];
  included?: readonly string[];
  excluded?: readonly string[];
};

const rating42: readonly RatingBar[] = [
  { stars: 5, percentage: 47 },
  { stars: 4, percentage: 34 },
  { stars: 3, percentage: 13 },
  { stars: 2, percentage: 4 },
  { stars: 1, percentage: 2 },
];

const rating43: readonly RatingBar[] = [
  { stars: 5, percentage: 55 },
  { stars: 4, percentage: 28 },
  { stars: 3, percentage: 11 },
  { stars: 2, percentage: 4 },
  { stars: 1, percentage: 2 },
];

const rating44: readonly RatingBar[] = [
  { stars: 5, percentage: 60 },
  { stars: 4, percentage: 27 },
  { stars: 3, percentage: 8 },
  { stars: 2, percentage: 3 },
  { stars: 1, percentage: 2 },
];

const rating41: readonly RatingBar[] = [
  { stars: 5, percentage: 47 },
  { stars: 4, percentage: 30 },
  { stars: 3, percentage: 13 },
  { stars: 2, percentage: 6 },
  { stars: 1, percentage: 4 },
];

const sofaPrices: readonly PriceOption[] = [
  { id: "3-seat", label: "3 Seat", price: 514 },
  { id: "4-seat", label: "4 Seat", price: 621 },
  { id: "5-seat", label: "5 Seat", price: 745 },
  { id: "6-seat", label: "6 Seat", price: 869 },
  { id: "7-seat", label: "7 Seat", price: 995 },
  { id: "8-seat", label: "8 Seat", price: 1120 },
  { id: "9-seat", label: "9 Seat", price: 1243 },
  { id: "10-seat", label: "10 Seat", price: 1367 },
];

const fabricSofa: CleaningService = {
  id: "fabric-sofa-cleaning",
  title: "Fabric sofa cleaning",
  rating: 4.2,
  reviews: 800,
  pricingTitle: "Select sofa size",
  options: sofaPrices,

  process: [
    {
      title: "Vacuuming",
      description:
        "Dust, hair and loose debris are removed from the sofa surface and accessible gaps.",
    },
    {
      title: "Foam cleaning",
      description:
        "Fabric-safe foam helps loosen everyday dirt, grime and suitable surface stains.",
    },
    {
      title: "Wet extraction",
      description:
        "Professional extraction removes loosened dirt and cleaning residue from the fabric.",
    },
    {
      title: "Drying",
      description:
        "The sofa is left to dry naturally with proper ventilation after cleaning.",
    },
  ],

  included: [
    "Deep vacuum",
    "Foam treatment",
    "Spot stain cleaning",
    "Wet extraction",
    "Final refresh",
  ],

  ratingBars: rating42,
};

const leatherSofa: CleaningService = {
  id: "leather-sofa-cleaning",
  title: "Leather sofa cleaning",
  rating: 4.3,
  reviews: 800,
  pricingTitle: "Select sofa size",
  options: sofaPrices,

  process: [
    {
      title: "Inspection",
      description:
        "The leather condition is checked before cleaning begins.",
    },
    {
      title: "Dusting & vacuuming",
      description:
        "Loose dust, crumbs and particles are gently removed.",
    },
    {
      title: "Spot cleaning",
      description:
        "Suitable minor marks are treated using leather-safe solutions.",
    },
    {
      title: "Deep cleaning",
      description:
        "Leather surfaces are carefully cleaned to remove built-up dirt.",
    },
    {
      title: "Conditioning",
      description:
        "Conditioner helps maintain softness and protects the leather finish.",
    },
    {
      title: "Optional shine",
      description:
        "A finishing polish can enhance the final premium appearance.",
    },
  ],

  ratingBars: rating43,
};

const mattressCleaning: CleaningService = {
  id: "mattress-cleaning",
  title: "Mattress cleaning",
  rating: 4.4,
  reviews: 800,
  pricingTitle: "Select mattress size",

  options: [
    { id: "single", label: "Single", price: 450 },
    { id: "double", label: "Double", price: 750 },
    { id: "queen", label: "Queen", price: 1000 },
    { id: "king", label: "King", price: 1150 },
  ],

  process: [
    {
      title: "Inspection",
      description:
        "Visible stains, odour and mattress fabric condition are checked before cleaning.",
    },
    {
      title: "Vacuuming",
      description:
        "Dust, hair and loose allergens are removed from the mattress surface.",
    },
    {
      title: "Spot treatment",
      description:
        "Suitable visible marks are pre-treated before deep cleaning.",
    },
    {
      title: "Deep cleaning",
      description:
        "Professional cleaning helps lift sweat, grime and trapped dirt.",
    },
    {
      title: "Drying",
      description:
        "The mattress is left to dry properly before regular use.",
    },
  ],

  ratingBars: rating44,
};

const carpetCleaning: CleaningService = {
  id: "carpet-cleaning",
  title: "Carpet cleaning",
  rating: 4.1,
  reviews: 800,
  pricingTitle: "Select carpet area",

  options: [
    {
      id: "upto-25",
      label: "Upto 25 Sq ft",
      price: 450,
    },
    {
      id: "25-50",
      label: "25 - 50 Sq ft",
      price: 650,
    },
    {
      id: "50-100",
      label: "50 - 100 Sq ft",
      price: 850,
    },
    {
      id: "100-150",
      label: "100 - 150 Sq ft",
      price: 950,
    },
    {
      id: "150-200",
      label: "150 - 200 Sq ft",
      price: 1050,
    },
  ],

  process: [
    {
      title: "Dry vacuuming",
      description:
        "Loose dust and debris are removed thoroughly before deep cleaning.",
    },
    {
      title: "Shampooing",
      description:
        "Fabric-safe cleaner is worked into the fibres to loosen dirt and suitable stains.",
    },
    {
      title: "Wet extraction",
      description:
        "Dirt, moisture and cleaning residue are extracted for a refreshed finish.",
    },
    {
      title: "Drying",
      description:
        "The carpet is left to air-dry properly for best results.",
    },
  ],

  ratingBars: rating41,
};

const curtainCleaning: CleaningService = {
  id: "curtain-cleaning",
  title: "Curtain cleaning",
  rating: 4.2,
  reviews: 800,
  pricingTitle: "Select curtain quantity",

  options: [
    { id: "2-piece", label: "2 Pieces", price: 400 },
    { id: "3-piece", label: "3 Pieces", price: 600 },
    { id: "4-piece", label: "4 Pieces", price: 800 },
    { id: "5-piece", label: "5 Pieces", price: 1000 },
    { id: "6-piece", label: "6 Pieces", price: 1200 },
    { id: "7-piece", label: "7 Pieces", price: 1400 },
    { id: "8-piece", label: "8 Pieces", price: 1600 },
    { id: "9-piece", label: "9 Pieces", price: 1800 },
    { id: "10-piece", label: "10 Pieces", price: 2000 },
  ],

  process: [
    {
      title: "Fabric inspection",
      description:
        "Curtain fabric, visible marks and cleaning requirements are checked first.",
    },
    {
      title: "Dry dust removal",
      description:
        "Loose dust is removed from the curtain surface and folds.",
    },
    {
      title: "Spot pre-treatment",
      description:
        "Suitable visible marks are treated before the main cleaning process.",
    },
    {
      title: "Fabric-safe cleaning",
      description:
        "Selected curtain pieces are cleaned using an appropriate fabric-safe method.",
    },
    {
      title: "Controlled drying",
      description:
        "Curtains are allowed to dry properly to help protect their finish.",
    },
  ],

  ratingBars: rating42,
};

const diningTableCleaning: CleaningService = {
  id: "dining-table-cleaning",
  title: "Dining table cleaning",
  rating: 4.4,
  reviews: 800,
  pricingTitle: "Select dining table size",

  options: [
    {
      id: "4-seater",
      label: "Dining table 4 seater",
      price: 499,
    },
    {
      id: "5-seater",
      label: "Dining table 5 seater",
      price: 549,
    },
    {
      id: "6-seater",
      label: "Dining table 6 seater",
      price: 599,
    },
    {
      id: "7-seater",
      label: "Dining table 7 seater",
      price: 649,
    },
    {
      id: "8-seater",
      label: "Dining table 8 seater",
      price: 699,
    },
    {
      id: "9-seater",
      label: "Dining table 9 seater",
      price: 749,
    },
    {
      id: "10-seater",
      label: "Dining table 10 seater",
      price: 799,
    },
  ],

  process: [
    {
      title: "Dry dusting",
      description:
        "Loose dust, crumbs and surface debris are removed.",
    },
    {
      title: "Deep surface wipe",
      description:
        "Dining surfaces are cleaned using suitable professional solutions.",
    },
    {
      title: "Chair deep cleaning",
      description:
        "Accessible dining-chair surfaces are cleaned according to their material.",
    },
    {
      title: "Final polish",
      description:
        "Cleaned surfaces receive a finishing touch for a fresh appearance.",
    },
  ],

  excluded: [
    "Removal of permanent stains such as ink or dye marks",
  ],

  ratingBars: rating44,
};

const serviceGroups = [
  {
    id: "sofa-cleaning-section",
    label: "Sofa Cleaning",
    services: [
      fabricSofa,
      leatherSofa,
    ],
  },
  {
    id: "mattress-cleaning-section",
    label: "Mattress Cleaning",
    services: [
      mattressCleaning,
    ],
  },
  {
    id: "carpet-cleaning-section",
    label: "Carpet Cleaning",
    services: [
      carpetCleaning,
    ],
  },
  {
    id: "curtain-cleaning-section",
    label: "Curtain Cleaning",
    services: [
      curtainCleaning,
    ],
  },
  {
    id: "dining-table-cleaning-section",
    label: "Dining Table Cleaning",
    services: [
      diningTableCleaning,
    ],
  },
] as const;

const serviceNavigation = [
  {
    id: "sofa",
    label: "Sofa Cleaning",
    targetId: "sofa-cleaning-section",
  },
  {
    id: "mattress",
    label: "Mattress Cleaning",
    targetId: "mattress-cleaning-section",
  },
  {
    id: "carpet",
    label: "Carpet Cleaning",
    targetId: "carpet-cleaning-section",
  },
  {
    id: "curtain",
    label: "Curtain Cleaning",
    targetId: "curtain-cleaning-section",
  },
  {
    id: "dining",
    label: "Dining Table Cleaning",
    targetId: "dining-table-cleaning-section",
  },
] as const;

function formatCurrency(
  value: number,
): string {
  return `₹${value.toLocaleString(
    "en-IN",
  )}`;
}

function getStartingPrice(
  service: CleaningService,
): number {
  return Math.min(
    ...service.options.map(
      (option) => option.price,
    ),
  );
}

function scrollToService(
  targetId: string,
) {
  const target =
    document.getElementById(
      targetId,
    );

  if (!target) {
    return;
  }

  const top =
    target.getBoundingClientRect().top +
    window.scrollY -
    155;

  window.scrollTo({
    top: Math.max(
      0,
      top,
    ),
    behavior: "smooth",
  });
}

type ServiceCardProps = {
  service: CleaningService;
  onOpen: (
    service: CleaningService,
  ) => void;
};

function ServiceCard({
  service,
  onOpen,
}: ServiceCardProps) {
  const startingPrice =
    getStartingPrice(
      service,
    );

  return (
    <article
      className={
        styles.serviceCard
      }
    >
      <div
        className={
          styles.bannerPlaceholder
        }
        data-service-id={service.id}
        aria-hidden="true"
      />

      <div
        className={
          styles.serviceDetails
        }
      >
        <div
          className={
            styles.serviceMainRow
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
              {service.title}
            </h3>

            <div
              className={
                styles.ratingRow
              }
            >
              <span
                className={
                  styles.ratingIcon
                }
                aria-hidden="true"
              >
                ★
              </span>

              <span>
                {service.rating.toFixed(
                  1,
                )}
              </span>

              <span
                className={
                  styles.reviewText
                }
              >
                (
                {service.reviews.toLocaleString(
                  "en-IN",
                )}{" "}
                reviews)
              </span>

              <button
                type="button"
                className={
                  styles.detailsButton
                }
                onClick={() =>
                  onOpen(service)
                }
              >
                View details
              </button>
            </div>

            <div
              className={
                styles.priceRow
              }
            >
              <strong>
                Starts at{" "}
                {formatCurrency(
                  startingPrice,
                )}
              </strong>
            </div>
          </div>

          <button
            type="button"
            className={
              styles.addButton
            }
            onClick={() =>
              onOpen(service)
            }
          >
            Add
          </button>
        </div>
      </div>
    </article>
  );
}

type ServiceModalProps = {
  service: CleaningService;
  onClose: () => void;
};

function ServiceModal({
  service,
  onClose,
}: ServiceModalProps) {

  /* CITY_COOLIES_LIVING_SELECTION_STATE_START */
  const [selectedOption, setSelectedOption] =
    useState<PriceOption | null>(null);


  /* CITY_COOLIES_LIVING_SELECTION_STATE_END */

  useEffect(() => {
    const previousOverflow =
      document.body.style.overflow;

    document.body.style.overflow =
      "hidden";

    const handleEscape = (
      event: KeyboardEvent,
    ) => {
      if (
        event.key === "Escape"
      ) {
        onClose();
      }
    };

    document.addEventListener(
      "keydown",
      handleEscape,
    );

    return () => {
      document.body.style.overflow =
        previousOverflow;

      document.removeEventListener(
        "keydown",
        handleEscape,
      );
    };
  }, [onClose]);

  if (
    typeof document === "undefined"
  ) {
    return null;
  }

  const commitSelectedOption = (
    option: PriceOption,
  ) => {
    upsertDeepCleaningCartItem({
      id:
        `living-bedroom:${service.id}:${option.id}`,
      serviceTitle:
        service.title,
      optionLabel:
        option.label,
      price:
        option.price,
      priceLabel:
        formatCurrency(
          option.price,
        ),
      duration:
        "Professional cleaning service",
    });

    onClose();
  };

  return createPortal(
    <div
      className={
        styles.modalOverlay
      }
      onMouseDown={(event) => {
        if (
          event.currentTarget ===
          event.target
        ) {
          onClose();
        }
      }}
    >
      <section
        className={[styles.modal, styles.livingCompactModal].filter(Boolean).join(" ")}
        role="dialog"
        aria-modal="true"
        aria-labelledby={`living-bedroom-modal-${service.id}`}
      >
        <header
          className={
            styles.modalHeader
          }
        >
          <div>
            <h2
              id={`living-bedroom-modal-${service.id}`}
            >
              {service.title}
            </h2>

            <p>
              Choose the option that matches your cleaning requirement.
            </p>
          </div>

          <button
            type="button"
            className={
              styles.closeButton
            }
            aria-label={`Close ${service.title}`}
            onClick={
              onClose
            }
          >
            ×
          </button>
        </header>

        <div
          className={
            styles.modalBody
          }
        >
          <section
            className={
              styles.modalSection
            }
          >
            <h3>
              {service.pricingTitle}
            </h3>

            <div
              className={
                styles.pricingGrid
              }
            >
              {service.options.map(
                (option) => (
                  <article
                    key={
                      option.id
                    }
                    className={
                      styles.priceCard
                    }
                  >
                    <span
                      className={
                        styles.optionLabel
                      }
                    >
                      {
                        option.label
                      }
                    </span>

                    <strong>
                      {formatCurrency(
                        option.price,
                      )}
                    </strong>

                    <button
                      type="button"
                      aria-pressed={selectedOption?.id === option.id}
                      onClick={() => setSelectedOption((current) => current?.id === option.id ? null : option)}
                    >
                Select
              </button>
                  </article>
                ),
              )}
            </div>
          </section>

          <section
            className={
              styles.modalSection
            }
          >
            <h3>
              Process
            </h3>

            <ol
              className={
                styles.processList
              }
            >
              {service.process.map(
                (
                  step,
                  index,
                ) => (
                  <li
                    key={
                      step.title
                    }
                  >
                    <span
                      className={
                        styles.processNumber
                      }
                    >
                      {index + 1}.
                    </span>

                    <div>
                      <strong>
                        {
                          step.title
                        }
                      </strong>

                      <p>
                        {
                          step.description
                        }
                      </p>
                    </div>
                  </li>
                ),
              )}
            </ol>
          </section>

          {service.included &&
            service.included.length >
              0 && (
              <section
                className={
                  styles.modalSection
                }
              >
                <h3>
                  Included
                </h3>

                <ul
                  className={
                    styles.simpleList
                  }
                >
                  {service.included.map(
                    (item) => (
                      <li
                        key={
                          item
                        }
                      >
                        {item}
                      </li>
                    ),
                  )}
                </ul>
              </section>
            )}

          {service.excluded &&
            service.excluded.length >
              0 && (
              <section
                className={
                  styles.modalSection
                }
              >
                <h3>
                  What&apos;s not included?
                </h3>

                <ul
                  className={
                    styles.simpleList
                  }
                >
                  {service.excluded.map(
                    (item) => (
                      <li
                        key={
                          item
                        }
                      >
                        {item}
                      </li>
                    ),
                  )}
                </ul>
              </section>
            )}

          <section
            className={
              styles.ratingSection
            }
            aria-label={`${service.title} customer rating`}
          >
            <div
              className={
                styles.ratingSummary
              }
            >
              <span
                className={
                  styles.goldStar
                }
                aria-hidden="true"
              >
                ★
              </span>

              <strong>
                {service.rating.toFixed(
                  1,
                )}
              </strong>
            </div>

            <p
              className={
                styles.ratingReviewCount
              }
            >
              {service.reviews.toLocaleString(
                "en-IN",
              )}{" "}
              reviews
            </p>

            <div
              className={
                styles.ratingBars
              }
            >
              {service.ratingBars.map(
                (row) => (
                  <div
                    key={
                      row.stars
                    }
                    className={
                      styles.ratingBarRow
                    }
                  >
                    <span
                      className={
                        styles.ratingLabel
                      }
                    >
                      {row.stars}

                      <span
                        aria-hidden="true"
                      >
                        ★
                      </span>
                    </span>

                    <span
                      className={
                        styles.ratingTrack
                      }
                    >
                      <span
                        className={
                          styles.ratingFill
                        }
                        style={{
                          width: `${row.percentage}%`,
                        }}
                      />
                    </span>

                    <span
                      className={
                        styles.ratingPercent
                      }
                    >
                      {
                        row.percentage
                      }
                      %
                    </span>
                  </div>
                ),
              )}
            </div>
          </section>
        </div>
      
        {/* CITY_COOLIES_LIVING_CONTINUE_FOOTER_START */}
        <footer className={styles.selectionFooter}>
          <div className={styles.selectionSummary}>
            <span className={styles.selectionCaption}>Total</span>

            <strong className={styles.selectionValue}>{selectedOption ? formatCurrency(selectedOption.price) : "Select an option"}</strong>
          </div>

          <button
            type="button"
            className={styles.continueButton}
            disabled={!selectedOption}
            onClick={() => {
              if (selectedOption) {
                commitSelectedOption(selectedOption);
              }
            }}
          >
            Continue
          </button>
        </footer>
        {/* CITY_COOLIES_LIVING_CONTINUE_FOOTER_END */}

</section>
    </div>,
    document.body,
  );
}

export default function LivingBedroomCleaningSection() {
  const [
    activeService,
    setActiveService,
  ] =
    useState<CleaningService | null>(
      null,
    );

  return (
    <>
      <section
        id="panel-living-bedroom"
        role="tabpanel"
        className={
          styles.section
        }
        aria-labelledby="living-bedroom-heading"
      >
        <h1
          id="living-bedroom-heading"
          className={
            styles.srOnly
          }
        >
          Living &amp; Bedroom Cleaning
        </h1>

        <div
          className={
            styles.container
          }
        >
          <div
            className={
              styles.contentLayout
            }
          >
            <main
              className={
                styles.mainColumn
              }
            >
              <nav
            className={
              styles.serviceSelector
            }
            aria-label="Living and bedroom cleaning services"
          >
            {serviceNavigation.map(
              (item) => (
                <button
                  key={
                    item.id
                  }
                  type="button"
                  className={
                    styles.selectorItem
                  }
                  onClick={() =>
                    scrollToService(
                      item.targetId,
                    )
                  }
                >
                  <span
                    className={
                      styles.selectorImage
                    }
                    aria-hidden="true"
                  />

                  <span
                    className={
                      styles.selectorLabel
                    }
                  >
                    {
                      item.label
                    }
                  </span>
                </button>
              ),
            )}
          </nav>

          <div
            className={
              styles.selectorDivider
            }
          />

              {serviceGroups.map(
                (group) => (
                  <section
                    key={
                      group.id
                    }
                    id={
                      group.id
                    }
                    className={
                      styles.serviceGroup
                    }
                  >
                    <h2>
                      {
                        group.label
                      }
                    </h2>

                    <div
                      className={
                        styles.serviceList
                      }
                    >
                      {group.services.map(
                        (
                          service,
                        ) => (
                          <ServiceCard
                            key={
                              service.id
                            }
                            service={
                              service
                            }
                            onOpen={
                              setActiveService
                            }
                          />
                        ),
                      )}
                    </div>
                  </section>
                ),
              )}
            </main>

            <aside
              className={
                styles.sidebarColumn
              }
            >
              <FullHomeRightSidebar />
            </aside>
          </div>
        </div>
      </section>

      {activeService && (
        <ServiceModal
          key={activeService.id}
          service={
            activeService
          }
          onClose={() =>
            setActiveService(
              null,
            )
          }
        />
      )}
    </>
  );
}