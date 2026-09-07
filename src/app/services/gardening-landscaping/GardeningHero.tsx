"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect } from "react";

import styles from "./GardeningHero.module.css";

function HomeIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="m4 11 8-7 8 7" />
      <path d="M6.5 10v9h11v-9" />
      <path d="M10 19v-5h4v5" />
    </svg>
  );
}

function LeafIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M20 4C11 4 5 8.5 5 15c0 2.8 1.9 5 4.8 5C16.5 20 20 12 20 4Z" />
      <path d="M4 21c2.8-5.4 6.7-8.8 12-11" />
    </svg>
  );
}

function PotIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M7 10h10l-1.2 10H8.2L7 10Z" />
      <path d="M6 7h12v3H6z" />
      <path d="M12 7V3" />
      <path d="M12 5c-2.4 0-4-1.2-4-3 2.4 0 4 1.2 4 3Z" />
      <path d="M12 5c2.4 0 4-1.2 4-3-2.4 0-4 1.2-4 3Z" />
    </svg>
  );
}

function LandscapeIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M3 19h18" />
      <path d="M5 19c1-4 3.2-6 6-6s5 2 6 6" />
      <path d="M15 13c.3-3 1.8-5 4-6" />
      <circle cx="19" cy="5" r="2" />
      <path d="M8 13c-.2-3-1.7-5-4-6" />
    </svg>
  );
}

function ArrowIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M5 12h14" />
      <path d="m14 7 5 5-5 5" />
    </svg>
  );
}

export default function GardeningHero() {
  useEffect(() => {
    const root = document.documentElement;
    const previousBehavior = root.style.scrollBehavior;

    root.style.scrollBehavior = "smooth";

    return () => {
      root.style.scrollBehavior = previousBehavior;
    };
  }, []);

  return (
    <section
      className={styles.hero}
      aria-labelledby="gardening-hero-title"
    >
      <Image
        src="/city-coolies-gardening-hero-banner-v3.png"
        alt=""
        fill
        sizes="100vw"
        loading="eager"
        fetchPriority="high"
        className={styles.heroImage}
        aria-hidden="true"
      />

      <div className={styles.imageShade} aria-hidden="true" />
      <div className={styles.pinkGlow} aria-hidden="true" />
      <div className={styles.lightSweep} aria-hidden="true" />

      <div className={styles.particles} aria-hidden="true">
        {Array.from({ length: 20 }, (_, index) => (
          <span key={index} />
        ))}
      </div>

      <div className={styles.container}>
        <nav
          className={`${styles.breadcrumb} ${styles.revealOne}`}
          aria-label="Breadcrumb"
        >
          <Link href="/">
            <HomeIcon />
            <span>Home</span>
          </Link>

          <span aria-hidden="true">/</span>

          <Link href="/services">Services</Link>

          <span aria-hidden="true">/</span>

          <strong>Gardening &amp; Landscaping</strong>
        </nav>

        <div className={styles.content}>
          <p className={`${styles.eyebrow} ${styles.revealTwo}`}>
            PROFESSIONAL GARDEN CARE
          </p>

          <h1 id="gardening-hero-title">
            <span className={styles.titleLineOne}>
              Grow a Greener,
            </span>

            <span className={styles.titleLineTwo}>
              More Beautiful Space
            </span>
          </h1>

          <p className={`${styles.description} ${styles.revealFive}`}>
            Professional gardening and landscaping services in Chennai,
            from regular garden care and lawn maintenance to plant
            supply, designer pots and complete green-space styling.
          </p>

          <div className={`${styles.features} ${styles.revealSix}`}>
            <span>
              <i>
                <LeafIcon />
              </i>
              Expert Garden Care
            </span>

            <span>
              <i>
                <LandscapeIcon />
              </i>
              Landscape Styling
            </span>

            <span>
              <i>
                <PotIcon />
              </i>
              Plants &amp; Designer Pots
            </span>
          </div>

          <div className={`${styles.actions} ${styles.revealSeven}`}>
            <a
              href="#gardening-services"
              className={styles.primaryButton}
            >
              <span>Explore Gardening</span>
              <ArrowIcon />
            </a>

            <span className={styles.serviceNote}>
              For homes, offices and commercial spaces
            </span>
          </div>
        </div>
      </div>

      <div className={styles.scrollIndicator} aria-hidden="true">
        <span />
      </div>
    </section>
  );
}