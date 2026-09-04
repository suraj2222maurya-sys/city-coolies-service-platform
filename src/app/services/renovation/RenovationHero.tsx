import Image from "next/image";
import Link from "next/link";

import RenovationTrustStrip from "./RenovationTrustStrip";
import styles from "./RenovationHero.module.css";

function HomeIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="m4 11 8-7 8 7" />
      <path d="M6.5 10v9h11v-9" />
      <path d="M10 19v-5h4v5" />
    </svg>
  );
}

function SurveyIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <circle cx="10" cy="8" r="3.5" />
      <path d="M4 19c.8-4 2.8-6 6-6 2 0 3.6.7 4.7 2" />
      <circle cx="17" cy="17" r="3" />
      <path d="m19.2 19.2 2 2" />
    </svg>
  );
}

function RateIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <rect x="5" y="3" width="14" height="18" rx="3" />
      <path d="M8 7h8" />
      <path d="M8 11h2M14 11h2M8 15h2M14 15h2M8 19h8" />
    </svg>
  );
}

function ShieldIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M12 3 20 6v6c0 5-3.2 8-8 10-4.8-2-8-5-8-10V6l8-3Z" />
      <path d="m8.5 12 2.2 2.2 4.8-5" />
    </svg>
  );
}

export default function RenovationHero() {
  return (
    <section
      className={styles.section}
      aria-labelledby="renovation-title"
    >
      <div className={styles.hero}>
        <Image
          src="/city-coolies-renovation-hero-banner.png"
          alt=""
          fill
          priority
          sizes="100vw"
          className={styles.heroImage}
          aria-hidden="true"
        />

        <div className={styles.overlay} />

        <div className={styles.container}>
          <nav
            className={styles.breadcrumb}
            aria-label="Breadcrumb"
          >
            <Link href="/">
              <HomeIcon />
              Home
            </Link>

            <span aria-hidden="true">/</span>

            <Link href="/services">
              Services
            </Link>

            <span aria-hidden="true">/</span>

            <strong>Renovation</strong>
          </nav>

          <div className={styles.content}>
            <p className={styles.eyebrow}>
              PROFESSIONAL RENOVATION
            </p>

            <h1 id="renovation-title">
              Renovation, Refined
              <span>
                For Homes &amp; Properties
              </span>
            </h1>

            <p className={styles.description}>
              Measured planning, skilled execution and quality finishes
              for homes, apartments, villas and commercial spaces.
            </p>

            <div className={styles.pills}>
              <span>
                <i>
                  <SurveyIcon />
                </i>

                <strong>₹500 Site Survey</strong>
              </span>

              <span>
                <i>
                  <RateIcon />
                </i>

                <strong>Indicative Rates</strong>
              </span>

              <span>
                <i>
                  <ShieldIcon />
                </i>

                <strong>Final Rate After Survey</strong>
              </span>
            </div>
          </div>
        </div>
      </div>

      <RenovationTrustStrip />
    </section>
  );
}