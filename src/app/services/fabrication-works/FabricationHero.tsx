import Image from "next/image";
import Link from "next/link";

import styles from "./FabricationWorks.module.css";

export default function FabricationHero() {
  return (
    <section
      className={styles.hero}
      aria-labelledby="fabrication-page-title"
      data-fab-reveal
    >
      <Image
        src="/city-coolies-fabrication-hero.png"
        alt="City Coolies fabricator working on a custom steel structure"
        fill
        priority
        sizes="100vw"
        className={styles.heroImage}
      />

      <div className={styles.heroOverlay} />

      <div className={styles.heroContent}>
        <nav className={styles.breadcrumb} aria-label="Breadcrumb">
          <Link href="/">Home</Link>
          <span aria-hidden="true">/</span>

          <Link href="/services">Services</Link>
          <span aria-hidden="true">/</span>

          <strong>Fabrication Works</strong>
        </nav>

        <div className={styles.heroMain}>
          <span className={styles.heroEyebrow}>
            FABRICATION WORKS • CHENNAI & ACROSS INDIA
          </span>

          <h1 id="fabrication-page-title">
            Custom Fabrication
            <span>Built for Your Site</span>
          </h1>

          <p>
            Gates, grills, railings, staircases, sheds, shutters and structural
            steel measured and fabricated for your property.
          </p>

          <div className={styles.heroInfo}>
            <span>
              <strong>₹500</strong>
              Site Survey
            </span>

            <span>
              <strong>Final Quote</strong>
              After Measurement
            </span>
          </div>

          <a className={styles.heroButton} href="#fabrication-catalog">
            Explore Fabrication
            <span aria-hidden="true">→</span>
          </a>
        </div>
      </div>
    </section>
  );
}
