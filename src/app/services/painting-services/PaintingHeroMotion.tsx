"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";

import styles from "./PaintingHero.module.css";

function useTypewriter(
  text: string,
  active: boolean,
  run: number,
  delay: number,
  speed: number,
) {
  const animationKey = `${run}:${text}`;
  const [frame, setFrame] = useState({ key: "", value: "" });
  const value = frame.key === animationKey ? frame.value : "";

  useEffect(() => {
    if (!active) return;

    let index = 0;
    let timer: ReturnType<typeof setTimeout> | undefined;

    const startTimer = window.setTimeout(() => {
      const writeNextCharacter = () => {
        index += 1;
        setFrame({
          key: animationKey,
          value: text.slice(0, index),
        });

        if (index < text.length) {
          timer = setTimeout(writeNextCharacter, speed);
        }
      };

      writeNextCharacter();
    }, delay);

    return () => {
      window.clearTimeout(startTimer);

      if (timer) {
        clearTimeout(timer);
      }
    };
  }, [active, animationKey, delay, speed, text]);

  return value;
}

export default function PaintingHeroMotion() {
  const heroRef = useRef<HTMLElement | null>(null);
  const [active, setActive] = useState(false);
  const [animationRun, setAnimationRun] = useState(0);

  useEffect(() => {
    const hero = heroRef.current;

    if (!hero) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setActive(false);

          requestAnimationFrame(() => {
            requestAnimationFrame(() => {
              setAnimationRun((current) => current + 1);
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

  const paintingText = useTypewriter(
    "Painting",
    active,
    animationRun,
    120,
    52,
  );

  const worksText = useTypewriter(
    " Works",
    active,
    animationRun,
    535,
    52,
  );

  const descriptionOne = useTypewriter(
    "Professional painting solutions for every space.",
    active,
    animationRun,
    950,
    19,
  );

  const descriptionTwo = useTypewriter(
    "Beautiful finishes. Lasting protection.",
    active,
    animationRun,
    1880,
    21,
  );

  return (
    <section
      ref={heroRef}
      className={`${styles.hero} ${active ? styles.heroActive : ""}`}
      aria-labelledby="painting-hero-title"
    >
      <div className={styles.background} aria-hidden="true" />
      <div className={styles.overlay} aria-hidden="true" />

      <div className={styles.content}>
        <nav className={styles.breadcrumb} aria-label="Breadcrumb">
          <Link href="/">Home</Link>
          <span>›</span>
          <Link href="/services">Services</Link>
          <span>›</span>
          <strong>Painting Works</strong>
        </nav>

        <div className={styles.copy}>
          <h1 id="painting-hero-title">
            <span className={styles.paintingWord}>
              {paintingText}
            </span>
            <span className={styles.worksWord}>
              {worksText}
            </span>
          </h1>

          <div className={styles.description}>
            <p>{descriptionOne}</p>
            <p>{descriptionTwo}</p>
          </div>

          <div className={styles.features}>
            <article className={styles.feature}>
              <div className={styles.iconBox}>
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <circle cx="12" cy="7" r="3" />
                  <path d="M5 20v-2a7 7 0 0 1 14 0v2" />
                  <path d="m3 12 2 2 3-4" />
                </svg>
              </div>

              <span>
                Skilled
                <br />
                Painters
              </span>
            </article>

            <article className={styles.feature}>
              <div className={styles.iconBox}>
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <path d="m12 3 8 4.5v9L12 21l-8-4.5v-9z" />
                  <path d="m4 7.5 8 4.5 8-4.5M12 12v9" />
                </svg>
              </div>

              <span>
                Premium
                <br />
                Materials
              </span>
            </article>

            <article className={styles.feature}>
              <div className={styles.iconBox}>
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <circle cx="12" cy="13" r="7" />
                  <path d="M12 13V9M12 13l3 2M9 3h6" />
                </svg>
              </div>

              <span>
                On-time
                <br />
                Service
              </span>
            </article>

            <article className={styles.feature}>
              <div className={styles.iconBox}>
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <path d="m12 3 7 3v5c0 5-3 8-7 10-4-2-7-5-7-10V6z" />
                  <path d="m9 12 2 2 4-5" />
                </svg>
              </div>

              <span>
                Satisfaction
                <br />
                Guaranteed
              </span>
            </article>
          </div>
        </div>
      </div>
    </section>
  );
}
