"use client";

import Image from "next/image";
import Link from "next/link";
import type { CSSProperties } from "react";
import { useEffect, useRef, useState } from "react";

const SERVICES_HERO_STYLES = `
  html {
    scroll-behavior: smooth;
  }

  .cc-services-hero {
    position: relative;
    isolation: isolate;
    display: flex;
    width: 100%;
    min-height: clamp(600px, calc(100svh - 145px), 820px);
    overflow: hidden;
    background: #fff4f6;
  }
.cc-services-hero__visual {
  position: absolute;
  z-index: -2;
  inset: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
}
  .cc-services-hero__image {
  .cc-services-hero__visual {
  position: absolute;
  z-index: -2;
  inset: 0;
}
    z-index: 0;
    object-fit: cover;
    object-position: center;
    animation: ccServicesImageIn 1.15s cubic-bezier(0.22, 1, 0.36, 1) both;
  }

  .cc-services-hero::after {
    position: absolute;
    z-index: -1;
    inset: 0;
    content: "";
    pointer-events: none;
    background:
      linear-gradient(
        90deg,
        rgba(255, 255, 255, 0.99) 0%,
        rgba(255, 250, 251, 0.96) 27%,
        rgba(255, 245, 247, 0.67) 42%,
        rgba(255, 255, 255, 0) 62%
      );
  }

  .cc-services-hero__inner {
    display: flex;
    align-items: center;
    width: min(100% - 40px, 1680px);
    min-height: inherit;
    margin-inline: auto;
  }

  .cc-services-hero__content {
    width: min(620px, 46vw);
    padding-block: 72px;
  }

  .cc-services-hero__eyebrow {
    display: inline-flex;
    align-items: center;
    gap: 11px;
    margin: 0 0 30px 26px;
    color: #e71928;
    font-size: 0.78rem;
    font-weight: 800;
    line-height: 1.4;
    letter-spacing: 0.19em;
    text-transform: uppercase;
  }

  .cc-services-hero__eyebrow::before {
    width: 34px;
    height: 3px;
    border-radius: 999px;
    content: "";
    background: linear-gradient(90deg, #e71928, #ff6875);
  }

  .cc-services-hero__title {
    max-width: 610px;
   margin: 0 0 0 18px;
    color: #151722;
    font-size: clamp(3.3rem, 5.3vw, 6.1rem);
    font-weight: 700;
    line-height: 0.96;
   letter-spacing: -0.045em;
    text-wrap: balance;
  }

  .cc-services-hero__title-line {
    display: block;
  }

  .cc-services-hero__title-accent {
    color: #f21f2f;
  }

  .cc-services-hero__description {
    max-width: 600px;
   margin: 28px 0 0 18px;
    color: #555d6f;
    font-size: clamp(1rem, 1.18vw, 1.18rem);
    font-weight: 450;
    line-height: 1.75;
  }

  .cc-services-hero__actions {
    display: flex;
    flex-wrap: wrap;
    gap: 13px;
    margin: 34px 0 0 18px;
  }

  .cc-services-hero__button {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    min-height: 56px;
    padding: 0 27px;
    border: 1px solid transparent;
    border-radius: 999px;
    font-size: 0.94rem;
    font-weight: 800;
    line-height: 1;
    text-decoration: none;
    transition:
      transform 220ms ease,
      box-shadow 220ms ease,
      background-color 220ms ease,
      border-color 220ms ease;
  }

  .cc-services-hero__button:hover {
    transform: translateY(-3px);
  }

  .cc-services-hero__button:focus-visible {
    outline: 3px solid rgba(242, 31, 47, 0.25);
    outline-offset: 4px;
  }

  .cc-services-hero__button--primary {
    color: #ffffff;
    background: linear-gradient(135deg, #f51e2d 0%, #df101f 100%);
    box-shadow: 0 16px 34px rgba(223, 16, 31, 0.25);
  }

  .cc-services-hero__button--primary:hover {
    box-shadow: 0 20px 40px rgba(223, 16, 31, 0.32);
  }

  .cc-services-hero__button--secondary {
    border-color: rgba(231, 25, 40, 0.24);
    color: #d91625;
    background: rgba(255, 255, 255, 0.78);
    box-shadow: 0 12px 30px rgba(30, 25, 29, 0.07);
    backdrop-filter: blur(10px);
  }

  .cc-services-hero__button--secondary:hover {
    border-color: rgba(231, 25, 40, 0.45);
    background: #ffffff;
  }

  .cc-services-hero__reveal {
  opacity: 0;
  clip-path: inset(0 100% 0 0);
  transform: translate3d(-38px, 0, 0);
  filter: blur(10px);
  transition:
    clip-path 900ms cubic-bezier(0.16, 1, 0.3, 1),
    opacity 500ms ease,
    transform 900ms cubic-bezier(0.16, 1, 0.3, 1),
    filter 750ms ease;
  transition-delay: var(--cc-reveal-delay, 0ms);
  will-change: clip-path, opacity, transform, filter;
}

.cc-services-hero--visible .cc-services-hero__reveal {
  opacity: 1;
  clip-path: inset(0 0 0 0);
  transform: translate3d(0, 0, 0);
  filter: blur(0);
}

.cc-services-hero__description-line {
  display: block;
}

  @keyframes ccServicesImageIn {
    from {
      opacity: 0;
      transform: scale(1.025);
    }

    to {
      opacity: 1;
      transform: scale(1);
    }
  }

  @media (max-width: 1100px) {
    .cc-services-hero::after {
      background:
        linear-gradient(
          90deg,
          rgba(255, 255, 255, 0.99) 0%,
          rgba(255, 249, 250, 0.94) 42%,
          rgba(255, 246, 248, 0.42) 66%,
          rgba(255, 255, 255, 0) 100%
        );
    }

    .cc-services-hero__content {
      width: min(570px, 58vw);
    }

    .cc-services-hero__title {
      font-size: clamp(3.2rem, 6.3vw, 5rem);
    }
  }

  @media (max-width: 760px) {
    .cc-services-hero {
      min-height: 680px;
    }

    .cc-services-hero__image {
      object-position: 64% center;
    }

    .cc-services-hero::after {
      background:
        linear-gradient(
          90deg,
          rgba(255, 255, 255, 0.98) 0%,
          rgba(255, 249, 250, 0.91) 58%,
          rgba(255, 245, 247, 0.58) 100%
        );
    }

    .cc-services-hero__inner {
      width: min(100% - 32px, 680px);
    }

    .cc-services-hero__content {
      width: min(100%, 540px);
      padding-block: 60px;
    }

    .cc-services-hero__title {
      font-size: clamp(2.75rem, 12vw, 4.3rem);
    }

    .cc-services-hero__description {
      max-width: 510px;
      font-size: 1rem;
      line-height: 1.65;
    }
  }

  @media (max-width: 480px) {
    .cc-services-hero {
      min-height: 650px;
    }

    .cc-services-hero__image {
      object-position: 61% center;
    }

    .cc-services-hero__eyebrow {
      margin-bottom: 16px;
      font-size: 0.69rem;
      letter-spacing: 0.15em;
    }

    .cc-services-hero__title {
      font-size: clamp(2.65rem, 13vw, 3.65rem);
      line-height: 0.98;
    }

    .cc-services-hero__description {
      margin-top: 22px;
    }

    .cc-services-hero__actions {
      gap: 10px;
      margin-top: 28px;
    }

    .cc-services-hero__button {
      min-height: 52px;
      padding-inline: 21px;
      font-size: 0.88rem;
    }
  }
@media (max-width: 760px) {
  .cc-services-hero {
    display: block;
    min-height: auto;
    overflow: hidden;
    background:
      radial-gradient(
        circle at 92% 8%,
        rgba(242, 31, 47, 0.13),
        transparent 34%
      ),
      linear-gradient(
        145deg,
        #ffffff 0%,
        #fff5f7 52%,
        #ffe7eb 100%
      );
  }

  .cc-services-hero::after {
    display: none;
  }

  .cc-services-hero__visual {
  position: relative;
  z-index: 0;
  inset: auto;
  width: 100%;
  height: auto;
  aspect-ratio: 1918 / 1013;
  overflow: hidden;
  background: #fff4f6;
}

  .cc-services-hero__image {
    object-fit: cover;
    object-position: center;
  }

  .cc-services-hero__inner {
    position: relative;
    z-index: 1;
    display: block;
    width: 100%;
    min-height: 0;
    margin: 0;
  }

  .cc-services-hero__content {
    width: 100%;
    padding: 38px 20px 48px;
    box-sizing: border-box;
  }

  .cc-services-hero__title {
    max-width: 100%;
    font-size: clamp(2.35rem, 11vw, 3.2rem);
    line-height: 1.02;
    overflow-wrap: break-word;
  }

  .cc-services-hero__description {
    max-width: 100%;
    font-size: 0.98rem;
    line-height: 1.65;
  }

  .cc-services-hero__actions {
    max-width: 100%;
  }
}
  @media (prefers-reduced-motion: reduce) {
    html {
      scroll-behavior: auto;
    }

    .cc-services-hero__image {
      animation: none;
    }

    .cc-services-hero__reveal {
      opacity: 1;
      transform: none;
      filter: none;
      transition: none;
    }

    .cc-services-hero__button {
      transition: none;
    }
  }
`;

export default function ServicesHeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const section = sectionRef.current;

    if (!section) {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      {
        rootMargin: "-12% 0px -12% 0px",
        threshold: 0.18,
      },
    );

    observer.observe(section);

    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className={`cc-services-hero${
        isVisible ? " cc-services-hero--visible" : ""
      }`}
      aria-labelledby="services-hero-title"
    >
      
     <div className="cc-services-hero__visual">
  <Image
    className="cc-services-hero__image"
    src="/services-hero-baground.png"
    alt="City Coolies professionals delivering cleaning, maintenance and repair services"
    fill
    priority
    sizes="100vw"
  />
</div>
<div className="cc-services-hero__visual">
  <Image
    className="cc-services-hero__image"
    src="/services-hero-baground.png"
    alt="City Coolies professionals delivering cleaning, maintenance and repair services"
    fill
    priority
    sizes="100vw"
  />
</div>
      <div className="cc-services-hero__inner">
        <div className="cc-services-hero__content">
          <p
            className="cc-services-hero__eyebrow cc-services-hero__reveal"
            style={{ "--cc-reveal-delay": "80ms" } as CSSProperties}
          >
            Complete Property Services
          </p>

          <h1 id="services-hero-title" className="cc-services-hero__title">
            <span
              className="cc-services-hero__title-line cc-services-hero__reveal"
              style={{ "--cc-reveal-delay": "180ms" } as CSSProperties}
            >
              One trusted team.
            </span>
            <span
              className="cc-services-hero__title-line cc-services-hero__title-accent cc-services-hero__reveal"
              style={{ "--cc-reveal-delay": "300ms" } as CSSProperties}
            >
              Every property need.
            </span>
          </h1>

          <p className="cc-services-hero__description">
  <span
    className="cc-services-hero__description-line cc-services-hero__reveal"
    style={{ "--cc-reveal-delay": "420ms" } as CSSProperties}
  >
    From deep cleaning and renovation to electrical, plumbing and painting,
  </span>

  <span
    className="cc-services-hero__description-line cc-services-hero__reveal"
    style={{ "--cc-reveal-delay": "540ms" } as CSSProperties}
  >
    City Coolies brings repairs and ongoing property maintenance together
  </span>

  <span
    className="cc-services-hero__description-line cc-services-hero__reveal"
    style={{ "--cc-reveal-delay": "660ms" } as CSSProperties}
  >
    to keep homes and businesses safe, ready and professionally cared for.
  </span>
</p>

          <div
            className="cc-services-hero__actions cc-services-hero__reveal"
           style={{ "--cc-reveal-delay": "800ms" } as CSSProperties}
          >
            <a
              className="cc-services-hero__button cc-services-hero__button--primary"
              href="tel:+918693986939"
              aria-label="Call City Coolies"
            >
              Call Now
            </a>

            <Link
              className="cc-services-hero__button cc-services-hero__button--secondary"
              href="/contact"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </div>

      <style>{SERVICES_HERO_STYLES}</style>
    </section>
  );
}