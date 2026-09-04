"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";

import styles from "./CivilConstructionHero.module.css";

function useTypewriter(
  text: string,
  active: boolean,
  delay: number,
  speed: number,
) {
  const [value, setValue] = useState("");

  useEffect(() => {
    setValue("");

    if (!active) return;

    let index = 0;
    let characterTimer: number | undefined;

    const startTimer = window.setTimeout(() => {
      const writeNext = () => {
        index += 1;
        setValue(text.slice(0, index));

        if (index < text.length) {
          characterTimer = window.setTimeout(writeNext, speed);
        }
      };

      writeNext();
    }, delay);

    return () => {
      window.clearTimeout(startTimer);

      if (characterTimer !== undefined) {
        window.clearTimeout(characterTimer);
      }
    };
  }, [active, delay, speed, text]);

  return value;
}

export default function CivilConstructionHeroMotion() {
  const heroRef = useRef<HTMLElement | null>(null);
  const [active, setActive] = useState(false);

  useEffect(() => {
    const hero = heroRef.current;

    if (!hero) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setActive(false);

          window.requestAnimationFrame(() => {
            window.requestAnimationFrame(() => {
              setActive(true);
            });
          });
        } else {
          setActive(false);
        }
      },
      {
        threshold: 0.28,
      },
    );

    observer.observe(hero);

    return () => observer.disconnect();
  }, []);

  const titleLineOne = useTypewriter(
    "Civil Construction",
    active,
    220,
    40,
  );

  const titleLineTwo = useTypewriter(
    "& Maintenance",
    active,
    1050,
    44,
  );

  const tagline = useTypewriter(
    "Built strong. Maintained right.",
    active,
    1720,
    32,
  );

  const descriptionOne = useTypewriter(
    "Complete civil solutions for homes, villas, apartments,",
    active,
    2640,
    18,
  );

  const descriptionTwo = useTypewriter(
    "offices and commercial properties.",
    active,
    3600,
    19,
  );

  return (
    <section
      ref={heroRef}
      className={`${styles.hero} ${active ? styles.heroActive : ""}`}
      aria-labelledby="civil-construction-title"
    >
      <div className={styles.background} aria-hidden="true" />
      <div className={styles.softOverlay} aria-hidden="true" />

      <div className={styles.content}>
        <nav className={styles.breadcrumb} aria-label="Breadcrumb">
          <Link href="/">Home</Link>
          <span>›</span>

          <Link href="/services">Services</Link>
          <span>›</span>

          <strong>Civil Construction &amp; Maintenance</strong>
        </nav>

        <div className={styles.copy}>
          <h1 id="civil-construction-title">
            <span className={styles.titleLineOne}>
              <b>Civil</b>{" "}
              <em>{titleLineOne.replace("Civil ", "")}</em>
            </span>

            <span className={styles.titleLineTwo}>
              {titleLineTwo}
            </span>
          </h1>

          <h2>{tagline}</h2>

          <div className={styles.description}>
            <p>{descriptionOne}</p>
            <p>{descriptionTwo}</p>
          </div>

          <div className={styles.trustGrid}>
            <article className={styles.trustCard}>
              <div className={styles.iconBox}>
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <path d="m12 3 7 3v5c0 5-3 8-7 10-4-2-7-5-7-10V6z" />
                  <path d="m9 12 2 2 4-5" />
                </svg>
              </div>

              <strong>
                Verified Civil
                <br />
                Experts
              </strong>
            </article>

            <article className={styles.trustCard}>
              <div className={styles.iconBox}>
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M4 8V5a2 2 0 0 1 2-2h7l7 7-10 10-7-7z" />
                  <circle cx="8" cy="8" r="1.4" />
                  <path d="M14 8h3M15.5 6.5v3" />
                </svg>
              </div>

              <strong>
                Transparent
                <br />
                Starting Rates
              </strong>
            </article>

            <article className={styles.trustCard}>
              <div className={styles.iconBox}>
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <rect x="5" y="4" width="14" height="17" rx="2" />
                  <path d="M9 4V2h6v2M8 9h8M8 13h5M8 17h4" />
                  <circle cx="17" cy="17" r="2.5" />
                  <path d="m19 19 2 2" />
                </svg>
              </div>

              <strong>
                Site Survey
                <br />
                Based Quote
              </strong>
            </article>

            <article className={styles.trustCard}>
              <div className={styles.iconBox}>
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <circle cx="12" cy="10" r="5" />
                  <path d="m9 15-1 6 4-2 4 2-1-6" />
                  <path d="m10 10 1.3 1.3L14 8.7" />
                </svg>
              </div>

              <strong>
                Quality
                <br />
                Assured
              </strong>
            </article>
          </div>
        </div>
      </div>
    </section>
  );
}