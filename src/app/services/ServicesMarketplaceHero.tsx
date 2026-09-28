import Image from "next/image";
import ServiceCategoryGrid from "./ServiceCategoryGrid";
import ServicesIntro from "./ServicesIntro";
import styles from "./ServicesMarketplaceHero.module.css";

const heroImages = [
  {
    src: "/service-icons/services-hero-spa.png",
    alt: "City Coolies spa and salon professional",
    priority: true,
  },
  {
    src: "/service-icons/services-hero-plumbing.png",
    alt: "City Coolies plumbing professional",
    priority: true,
  },
  {
    src: "/service-icons/services-hero-carpentry.png",
    alt: "City Coolies carpentry professional",
    priority: false,
  },
  {
    src: "/service-icons/services-hero-painting.png",
    alt: "City Coolies painting professional",
    priority: false,
  },
  {
    src: "/service-icons/services-hero-ac-repair.png",
    alt: "City Coolies AC repair professional",
    priority: false,
  },
  {
    src: "/service-icons/services-hero-cleaning.png",
    alt: "City Coolies cleaning professional",
    priority: false,
  },
] as const;

export default function ServicesMarketplaceHero() {
  return (
    <section
      className={styles.marketplace}
      aria-label="City Coolies service marketplace"
    >
      <div className={styles.layout}>
        <div className={styles.originalContent}>
          <ServicesIntro />
          <ServiceCategoryGrid />

          {/* CITY_COOLIES_TRUST_STATS_START */}
          <div
            className={styles.trustStats}
            aria-label="City Coolies service trust statistics"
          >
            <div className={styles.trustItem}>
              <span
                className={styles.trustIcon}
                aria-hidden="true"
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.7"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m12 3 2.78 5.63 6.22.9-4.5 4.39 1.06 6.2L12 17.2l-5.56 2.92 1.06-6.2L3 9.53l6.22-.9L12 3Z"
                  />
                </svg>
              </span>

              <span className={styles.trustText}>
                <strong className={styles.trustValue}>
                  4.4
                </strong>

                <span className={styles.trustLabel}>
                  Service Rating
                </span>
              </span>
            </div>

            <div className={styles.trustItem}>
              <span
                className={styles.trustIcon}
                aria-hidden="true"
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.7"
                >
                  <circle cx="9" cy="8" r="3.2" />
                  <circle cx="17" cy="9" r="2.4" />

                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3.5 20c0-3.6 2.4-6 5.5-6s5.5 2.4 5.5 6"
                  />

                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M14.5 14.7c.7-.45 1.55-.7 2.5-.7 2.3 0 4 1.75 4 4.5"
                  />
                </svg>
              </span>

              <span className={styles.trustText}>
                <strong className={styles.trustValue}>
                  9M+
                </strong>

                <span className={styles.trustLabel}>
                  Customers Across India
                </span>
              </span>
            </div>
          </div>
          {/* CITY_COOLIES_TRUST_STATS_END */}
        </div>

        <div
          className={styles.gallery}
          aria-label="City Coolies service professionals"
        >
          {heroImages.map((image) => (
            <div
              key={image.src}
              className={styles.imageSlot}
            >
              <Image
                src={image.src}
                alt={image.alt}
                width={768}
                height={1024}
                loading={image.priority ? "eager" : "lazy"}
                unoptimized
                sizes="(max-width: 639px) 48vw, (max-width: 1023px) 45vw, (max-width: 1279px) 30vw, 250px"
                className={styles.image}
              />
            </div>
          ))}
        </div>
      </div>
  </section>
  );
}





