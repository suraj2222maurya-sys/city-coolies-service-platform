import Image from "next/image";

import styles from "./RenovationCoverageSection.module.css";

function LocationIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M12 21s6-5.6 6-11a6 6 0 1 0-12 0c0 5.4 6 11 6 11Z" />
      <circle cx="12" cy="10" r="2.1" />
    </svg>
  );
}

function VerifiedIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <circle cx="9" cy="8" r="3" />
      <path d="M3.8 18c.6-4 2.3-6 5.2-6 2.2 0 3.8 1.1 4.7 3.2" />
      <circle cx="17" cy="16" r="4" />
      <path d="m15.3 16 1.2 1.2 2.3-2.5" />
    </svg>
  );
}

function QualityIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M12 3 19 6v5.2c0 4.6-2.8 7.5-7 9.8-4.2-2.3-7-5.2-7-9.8V6l7-3Z" />
      <path d="m8.8 12 2.1 2.1 4.4-4.6" />
    </svg>
  );
}

function DeliveryIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <circle cx="12" cy="12" r="8" />
      <path d="M12 7v5l3.2 2" />
      <path d="M5.7 4.8 3.8 6.7M18.3 4.8l1.9 1.9" />
    </svg>
  );
}

export default function RenovationCoverageSection() {
  return (
    <section
      className={styles.section}
      aria-labelledby="renovation-coverage-title"
    >
      <Image
        src="/city-coolies-renovation-background-v2.png.png"
        alt=""
        fill
        loading="eager"
        sizes="100vw"
        className={styles.background}
        aria-hidden="true"
      />

      <div className={styles.softOverlay} />

      <div className={styles.content}>
        <span className={styles.eyebrow}>
          Our Service Coverage
        </span>

        <h2 id="renovation-coverage-title">
          Proudly Serving
          <span>Chennai and across India</span>
        </h2>

        <p className={styles.description}>
          From Chennai homes to projects across India ? City Coolies is
          your trusted partner for professional renovation services.
        </p>

        <div className={styles.benefits}>
          <article>
            <span className={styles.icon}>
              <LocationIcon />
            </span>
            <strong>Pan India Service</strong>
          </article>

          <article>
            <span className={styles.icon}>
              <VerifiedIcon />
            </span>
            <strong>Verified Professionals</strong>
          </article>

          <article>
            <span className={styles.icon}>
              <QualityIcon />
            </span>
            <strong>Quality Assurance</strong>
          </article>

          <article>
            <span className={styles.icon}>
              <DeliveryIcon />
            </span>
            <strong>Timely Delivery</strong>
          </article>
        </div>
      </div>
    </section>
  );
}
