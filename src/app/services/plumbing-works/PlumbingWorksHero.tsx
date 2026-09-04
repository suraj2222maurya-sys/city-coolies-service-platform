import Image from "next/image";
import Link from "next/link";

import styles from "./PlumbingWorksHero.module.css";

function SearchIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className={styles.searchIcon}
    >
      <circle cx="11" cy="11" r="6.5" />
      <path d="m16 16 4 4" />
    </svg>
  );
}

function ShieldIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className={styles.badgeIcon}
    >
      <path d="M12 3 19 6v5c0 4.8-2.9 8.3-7 10-4.1-1.7-7-5.2-7-10V6l7-3Z" />
      <path d="m9 12 2 2 4-4" />
    </svg>
  );
}

function TagIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className={styles.badgeIcon}
    >
      <path d="M20 13 13 20a2 2 0 0 1-2.8 0L4 13.8V5h8.8L20 12.2a1.2 1.2 0 0 1 0 1.8Z" />
      <circle cx="9" cy="9" r="1.25" />
    </svg>
  );
}

export default function PlumbingWorksHero() {
  return (
    <section
      className={styles.hero}
      aria-labelledby="plumbing-works-title"
      data-plumbing-hero
    >
      <div
        className={styles.visual}
        aria-hidden="true"
        data-plumbing-visual
      >
        <Image
          src="/city-coolies-plumbing-hero-banner-v2.png"
          alt=""
          fill
          preload
          sizes="100vw"
          className={styles.heroImage}
          draggable={false}
        />
      </div>

      <div className={styles.content}>
        <nav
          className={styles.breadcrumb}
          aria-label="Breadcrumb"
          data-plumbing-breadcrumb
        >
          <Link href="/">Home</Link>
          <span aria-hidden="true">/</span>

          <Link href="/services">Services</Link>
          <span aria-hidden="true">/</span>

          <span aria-current="page">Plumbing Works</span>
        </nav>

        <div className={styles.copy}>
          <p
            className={styles.eyebrow}
            data-plumbing-eyebrow
          >
            Professional Plumbing Services
          </p>

          <h1
            id="plumbing-works-title"
            className={styles.title}
          >
            <span data-plumbing-title-first>
              Plumbing Works,
            </span>

            <strong data-plumbing-title-second>
              made simple.
            </strong>
          </h1>

          <p
            className={styles.description}
            data-plumbing-description
          >
            Choose the work, set the quantity and book with
            confidence.
          </p>

          <div
            className={styles.badges}
            aria-label="Service benefits"
          >
            <div
              className={styles.badge}
              data-plumbing-badge
            >
              <ShieldIcon />
              <span>Verified Plumbers</span>
            </div>

            <div
              className={styles.badge}
              data-plumbing-badge
            >
              <TagIcon />
              <span>Upfront Service Rates</span>
            </div>
          </div>
        </div>

        <form
          className={styles.search}
          role="search"
          action="/services/plumbing-works"
          method="get"
          data-plumbing-search
        >
          <SearchIcon />

          <label
            className={styles.screenReaderOnly}
            htmlFor="plumbing-service-search"
          >
            Search plumbing services
          </label>

          <input
            id="plumbing-service-search"
            name="q"
            type="search"
            placeholder="Search plumbing services"
            autoComplete="off"
          />

          <button
            type="submit"
            className={styles.screenReaderOnly}
          >
            Search
          </button>
        </form>
      </div>
    </section>
  );
}
