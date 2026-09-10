"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";
import styles from "./SpaSalonHero.module.css";

const services = ["Facial Care", "Hair Styling", "Massage & Wellness"];

function SparkleIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path
        d="M12 2.8c.5 4.8 2.9 7.2 7.7 7.7-4.8.5-7.2 2.9-7.7 7.7-.5-4.8-2.9-7.2-7.7-7.7C9.1 10 11.5 7.6 12 2.8Z"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function SpaSalonHero() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    let runningAnimations: Animation[] = [];
    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    const playSequence = () => {
      runningAnimations.forEach((animation) => animation.cancel());
      runningAnimations = [];

      if (reducedMotion) return;

      const elements = section.querySelectorAll<HTMLElement>(
        "[data-spa-reveal]",
      );

      elements.forEach((element) => {
        const delay = Number(element.dataset.delay ?? 0);
        const pill = element.dataset.variant === "pill";
        const animation = element.animate(
          [
            {
              opacity: 0,
              transform: pill
                ? "translate3d(-14px, 18px, 0) scale(.96)"
                : "translate3d(0, 34px, 0) scale(.982)",
              filter: "blur(8px)",
            },
            {
              opacity: 1,
              transform: "translate3d(0, 0, 0) scale(1)",
              filter: "blur(0)",
            },
          ],
          {
            duration: pill ? 780 : 920,
            delay,
            easing: "cubic-bezier(.16, 1, .3, 1)",
            fill: "both",
          },
        );

        animation.onfinish = () => animation.cancel();
        runningAnimations.push(animation);
      });
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) playSequence();
        else {
          runningAnimations.forEach((animation) => animation.cancel());
          runningAnimations = [];
        }
      },
      {
        threshold: 0.12,
        rootMargin: "-4% 0px -4% 0px",
      },
    );

    const handlePageShow = () => playSequence();

    observer.observe(section);
    window.addEventListener("pageshow", handlePageShow);

    return () => {
      observer.disconnect();
      window.removeEventListener("pageshow", handlePageShow);
      runningAnimations.forEach((animation) => animation.cancel());
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className={styles.hero}
      aria-labelledby="spa-salon-title"
    >
      <div className={styles.media} aria-hidden="true">
        <Image
          src="/spa-salon-hero-banner-v3.png"
          alt=""
          fill
          priority
          sizes="100vw"
          className={styles.image}
        />
      </div>

      <div className={styles.shell}>
        <nav
          className={`${styles.breadcrumb} ${styles.reveal}`}
          data-spa-reveal
          data-delay="40"
          aria-label="Breadcrumb"
        >
          <Link href="/">Home</Link>
          <span aria-hidden="true">/</span>
          <Link href="/services">Services</Link>
          <span aria-hidden="true">/</span>
          <strong>Spa &amp; Salon Services</strong>
        </nav>

        <div className={styles.content}>
          <div
            className={styles.reveal}
            data-spa-reveal
            data-delay="150"
          >
            <span className={styles.eyebrow}>
              <SparkleIcon />
              Premium beauty at your doorstep
            </span>
          </div>

          <h1 id="spa-salon-title" className={styles.title}>
            <span
              className={`${styles.titleDark} ${styles.reveal}`}
              data-spa-reveal
              data-delay="280"
            >
              Your private salon.
            </span>
            <span
              className={`${styles.titleRed} ${styles.reveal}`}
              data-spa-reveal
              data-delay="430"
            >
              Your perfect glow.
            </span>
          </h1>

          <p
            className={`${styles.description} ${styles.reveal}`}
            data-spa-reveal
            data-delay="580"
          >
            Expert spa and salon care delivered to your doorstep across India
            with premium hygiene, trusted professionals and personal attention.
          </p>

          <div className={styles.servicePills} aria-label="Popular services">
            {services.map((service, index) => (
              <span
                key={service}
                className={styles.reveal}
                data-spa-reveal
                data-variant="pill"
                data-delay={720 + index * 120}
              >
                {service}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
