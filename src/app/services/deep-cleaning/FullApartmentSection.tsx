import ApartmentRequirementsModal from "./ApartmentRequirementsModal";
import BungalowSurveyModal from "./BungalowSurveyModal";
import styles from "./FullApartmentSection.module.css";

type FurnishingType =
  | "furnished"
  | "unfurnished";

type HomeCleaningService = {
  id: string;
  furnishingType: FurnishingType;
  groupTitle: string;
  title: string;
  promoTitle: string;
  promoDescription: string;
  rating: number | null;
  reviews: string;
  price: string;
  originalPrice?: string;
  duration: string;
  badge?: string;
  imagePending?: boolean;
  features: readonly string[];
};

const homeCleaningServices: readonly HomeCleaningService[] = [
  /*
   * Existing Unfurnished Apartment.
   * Kept unchanged for the Unfurnished tab.
   */
  {
    id: "unfurnished-apartment",
    furnishingType: "unfurnished",
    groupTitle: "Full apartment",

    title:
      "Unfurnished apartment - Home deep cleaning",

    promoTitle:
      "Empty home deep cleaning",

    promoDescription:
      "Ideal for vacant or unfurnished apartments before move-in or after move-out.",

    rating: 4.4,
    reviews: "459K reviews",

    price: "₹3,199",
    originalPrice: "₹4,795",

    duration: "3 hrs",

    badge: "Best value",

    features: [
      "Cleaning and stain removal from rooms, kitchen, bathroom and balcony",
      "Machine floor scrubbing and detailed dusting of walls and ceilings",
    ],
  },

  /*
   * UNFURNISHED - FULL BUNGALOW / DUPLEX
   */
  {
    id: "unfurnished-bungalow-duplex",
    furnishingType: "unfurnished",
    groupTitle: "Full bungalow/duplex",

    title:
      "Unfurnished bungalow & duplex cleaning",

    promoTitle:
      "Unfurnished bungalow & duplex cleaning",

    promoDescription:
      "Professional deep cleaning for vacant or unfurnished bungalow and duplex properties.",

    rating: 4.2,
    reviews: "900 reviews",

    price: "₹500",
    duration: "Site survey",

    imagePending: true,

    features: [
      "Detailed cleaning for vacant or unfurnished bungalow or duplex properties",
      "Machine floor scrubbing and deep cleaning across rooms, kitchen, bathrooms and balcony",
    ],
  },
  /*
   * FURNISHED - FULL APARTMENT
   */
  {
    id: "furnished-apartment",
    furnishingType: "furnished",
    groupTitle: "Full apartment",

    title:
      "Furnished apartment - Home deep cleaning",

    promoTitle:
      "Empty home deep cleaning",

    promoDescription:
      "Premium deep cleaning for furnished homes.",

    rating: 4.79,
    reviews: "878K reviews",

    price: "₹3,499",
    originalPrice: "₹4,795",

    duration: "3 hrs 45 mins",

    badge: "Best value",

    /*
     * Furnished banner will be added later.
     */
    imagePending: true,

    features: [
      "Deep cleaning of rooms, kitchen, bathrooms & balcony",
      "Machine floor scrubbing & wall/ceiling dusting",
    ],
  },

  /*
   * FURNISHED - FULL BUNGALOW / DUPLEX
   */
  {
    id: "furnished-bungalow-duplex",
    furnishingType: "furnished",
    groupTitle: "Full bungalow/duplex",

    title:
      "Furnished bungalow & duplex cleaning",

    promoTitle:
      "Furnished bungalow & duplex deep cleaning",

    promoDescription:
      "Complete deep cleaning designed for furnished and occupied bungalow or duplex homes.",

    /*
     * Do not copy another company's customer rating
     * into City Coolies.
     */
    rating: 4.2,
    reviews: "900 reviews",

    price: "₹500",

    duration: "5 hrs 50 mins",

    /*
     * Furnished banner will be added later.
     */
    imagePending: true,

    features: [
      "Detailed cleaning for furnished and occupied bungalow or duplex homes",
      "Machine floor scrubbing and stain-focused cleaning across rooms, kitchen, bathrooms and balcony",
    ],
  },

  /*
   * UNFURNISHED - VILLA CLEANING
   */
  {
    id: "unfurnished-villa-cleaning",
    furnishingType: "unfurnished",
    groupTitle: "Villa cleaning",

    title:
      "Unfurnished villa cleaning",









    promoTitle:
      "Unfurnished villa cleaning",

    promoDescription:
      "Professional deep cleaning for vacant or unfurnished villas.",

    rating: 4.2,
    reviews: "900 reviews",

    price: "₹500",
    duration: "Site survey",

    imagePending: true,

    features: [
      "Detailed deep cleaning for vacant or unfurnished villas",
      "Machine floor scrubbing and detailed cleaning across rooms, kitchen, bathrooms, staircase and balconies",
    ],
  },

  /*
   * FURNISHED - VILLA CLEANING
   */
  {
    id: "furnished-villa-cleaning",
    furnishingType: "furnished",
    groupTitle: "Villa cleaning",

    title:
      "Furnished villa cleaning",





    promoTitle:
      "Furnished villa cleaning",

    promoDescription:
      "Premium deep cleaning for furnished and occupied villas.",

    rating: 4.2,
    reviews: "900 reviews",

    price: "₹500",
    duration: "Site survey",

    imagePending: true,

    features: [
      "Detailed deep cleaning for furnished and occupied villas",
      "Machine floor scrubbing and detailed cleaning across rooms, kitchen, bathrooms, staircase and balconies",
    ],
  },
];

type FullApartmentSectionProps = {
  furnishingType?: FurnishingType;
};

export default function FullApartmentSection({
  furnishingType = "unfurnished",
}: FullApartmentSectionProps) {
  const visibleServices =
    homeCleaningServices.filter(
      (service) =>
        service.furnishingType ===
        furnishingType,
    );

  return (
    <section
      id="full-apartment-section"
      data-service-scroll-target
      className={styles.section}
      aria-label={
        furnishingType === "furnished"
          ? "Furnished home cleaning services"
          : "Unfurnished home cleaning services"
      }
    >
      <div className={styles.serviceList}>
        {visibleServices.map(
          (service, index) => (
            <div
              key={service.id}
              id={
                service.id === "furnished-bungalow-duplex" ||
                          service.id === "unfurnished-bungalow-duplex" ||
                          service.id === "furnished-villa-cleaning" ||
                          service.id === "unfurnished-villa-cleaning"
                  ? "full-bungalow-duplex-section"
                  : service.id === "furnished-villa-cleaning" ||
                      service.id === "unfurnished-villa-cleaning"
                    ? "villa-cleaning-section"
                    : undefined
              }
              className={styles.serviceGroup}
            >
              <h2
                className={
                  index === 0
                    ? styles.sectionTitle
                    : styles.subSectionTitle
                }
              >
                {service.groupTitle}
              </h2>

              <article
                className={styles.apartmentService}
              >
                <div
                  data-service-id={service.id}
                  className={`${styles.promoBanner} ${
                    service.imagePending
                      ? styles.imagePending
                      : ""
                  }`}
                >
                  {service.badge ? (
                    <span
                      className={styles.bestValue}
                    >
                      {service.badge}
                    </span>
                  ) : null}

                  
                </div>

                <div
                  className={
                    styles.serviceDetails
                  }
                >
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
                        className={`${styles.serviceTitle} ${
                          service.id === "furnished-apartment"
                            ? styles.furnishedApartmentTitle
                            : ""
                        }`}
                      >
                        {service.title}
                      </h3>

                      {service.rating !==
                      null ? (
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
                              service.id === "furnished-bungalow-duplex" ||
                          service.id === "unfurnished-bungalow-duplex" ||
                          service.id === "furnished-villa-cleaning" ||
                          service.id === "unfurnished-villa-cleaning"
                                ? 1
                                : 2,
                            )}
                          </span>

                          {service.reviews ? (
                            <span
                              className={
                                styles.reviewText
                              }
                            >
                              (
                              {
                                service.reviews
                              }
                              )
                            </span>
                          ) : null}
                        
                        {/* CITY_COOLIES_FURNISHED_VIEW_DETAILS_IN_RATING */}
                        {(service.id === "furnished-apartment" ||
                          service.id === "unfurnished-apartment") && (
                          <ApartmentRequirementsModal
                            serviceId={service.id}
                            serviceTitle={service.title}
                            startingPrice={service.price}
                            duration={service.duration}
                            buttonClassName={`${styles.detailsButton} ${styles.ratingDetailsButton}`}
                            buttonLabel="View details"
                          />
                        )}
                      
                        {/* CITY_COOLIES_BUNGALOW_VIEW_DETAILS_IN_RATING */}
                        {(service.id === "furnished-bungalow-duplex" ||
                          service.id === "unfurnished-bungalow-duplex" ||
                          service.id === "furnished-villa-cleaning" ||
                          service.id === "unfurnished-villa-cleaning") && (
                          <BungalowSurveyModal
                            serviceId={
                              service.id
                            }
                            serviceTitle={
                              service.title
                            }
                            buttonClassName={`${styles.detailsButton} ${styles.ratingDetailsButton}`}
                            buttonLabel="View details"
                          />
                        )}</div>
                      ) : null}

                      <div
                        className={
                          styles.priceRow
                        }
                      >
                        {(service.id === "furnished-bungalow-duplex" ||
                          service.id === "unfurnished-bungalow-duplex" ||
                          service.id === "furnished-villa-cleaning" ||
                          service.id === "unfurnished-villa-cleaning") ? (
                          <strong>
                            Site survey charges ₹500
                          </strong>
                        ) : (
                          <>
                            <strong>
                              Starts at{" "}
                              {service.price}
                            </strong>

                            <span
                              aria-hidden="true"
                            >
                              •
                            </span>

                            <span>
                              {service.duration}
                            </span>
                          </>
                        )}
                      </div>
                    </div>

                    {(
                      service.id === "unfurnished-apartment" ||
                      service.id === "furnished-apartment"
                    ) ? (
                      <ApartmentRequirementsModal
                        serviceId={
                          service.id
                        }
                        serviceTitle={
                          service.title
                        }
                        startingPrice={
                          service.price
                        }
                        duration={
                          service.duration
                        }
                        buttonClassName={
                          styles.addButton
                        }
                      />
                    ) : (
                      service.id === "furnished-bungalow-duplex" ||
                          service.id === "unfurnished-bungalow-duplex" ||
                          service.id === "furnished-villa-cleaning" ||
                          service.id === "unfurnished-villa-cleaning"
                    ) ? (
                      <BungalowSurveyModal
                        serviceId={service.id}
                        serviceTitle={service.title}
                        buttonClassName={styles.addButton}
                      />
                    ) : (
                      <button
                        type="button"
                        className={
                          styles.addButton
                        }
                      >
                        Add
                      </button>
                    )}
                  </div>

                  <div
                    className={styles.divider}
                  />

                                    {service.id === "furnished-bungalow-duplex" && (
<ul
                    className={styles.features}
                  >
                    {service.features.map(
                      (feature) => (
                        <li key={feature}>
                          {feature}
                        </li>
                      ),
                    )}
                  </ul>
                  )}
                </div>
              </article>
            </div>
          ),
        )}
      </div>
    </section>
  );
}









