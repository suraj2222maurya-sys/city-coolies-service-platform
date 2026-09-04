"use client";

import { useEffect, useRef, useState } from "react";

const MISSION_VISION_STYLES = `
  .cc-mv,
  .cc-mv * {
    box-sizing: border-box;
  }

  .cc-mv {
    --mv-red: #f51b28;
    --mv-red-dark: #d80c19;
    --mv-red-deep: #ad0712;
    --mv-pink: #fff0f2;
    --mv-ink: #161923;
    --mv-muted: #646d7c;
    position: relative;
    isolation: isolate;
    overflow: hidden;
    scroll-margin-top: 170px;
    padding: clamp(66px, 6vw, 88px) 18px;
    background:
      radial-gradient(circle at 8% 18%, rgba(245, 27, 40, 0.08), transparent 24%),
      radial-gradient(circle at 92% 82%, rgba(245, 27, 40, 0.07), transparent 22%),
      linear-gradient(145deg, #ffffff 0%, #fffafa 50%, #fff1f3 100%);
    color: var(--mv-ink);
  }

  .cc-mv::before {
    content: "";
    position: absolute;
    z-index: -1;
    inset: 0;
    opacity: 0.42;
    background-image:
      linear-gradient(rgba(245, 27, 40, 0.035) 1px, transparent 1px),
      linear-gradient(90deg, rgba(245, 27, 40, 0.035) 1px, transparent 1px);
    background-size: 58px 58px;
    mask-image: linear-gradient(to bottom, transparent, #000 18%, #000 82%, transparent);
  }

  .cc-mv__shell {
    position: relative;
    width: min(100%, 1120px);
    margin-inline: auto;
    overflow: hidden;
    border: 1px solid rgba(245, 27, 40, 0.12);
    border-radius: 30px;
    background: rgba(255, 255, 255, 0.78);
    box-shadow:
      0 28px 72px rgba(114, 14, 24, 0.11),
      inset 0 1px 0 rgba(255, 255, 255, 0.95);
    backdrop-filter: blur(12px);
  }

  .cc-mv__content {
    position: relative;
    z-index: 1;
    min-height: 420px;
    padding: clamp(38px, 4.7vw, 58px);
    opacity: 0;
    transform: scale(0.985);
    transition:
      opacity 360ms ease 430ms,
      transform 650ms cubic-bezier(0.22, 1, 0.36, 1) 430ms;
  }

  .cc-mv--open .cc-mv__content {
    opacity: 1;
    transform: scale(1);
  }

  .cc-mv__header {
    max-width: 760px;
    margin-inline: auto;
    text-align: center;
  }

  .cc-mv__eyebrow {
    min-height: 15px;
    margin: 0 0 14px;
    display: flex;
    justify-content: center;
    color: var(--mv-red-dark);
    font-size: 11px;
    font-weight: 850;
    line-height: 1;
    letter-spacing: 0.18em;
    text-transform: uppercase;
  }

  .cc-mv__title {
    min-height: 53px;
    margin: 0;
    color: var(--mv-ink);
    font-size: clamp(34px, 4vw, 51px);
    font-weight: 850;
    line-height: 1.08;
    letter-spacing: -0.045em;
    text-wrap: balance;
  }

  .cc-mv__title .cc-mv__typed:nth-child(2) {
    color: var(--mv-red);
  }

  .cc-mv__typed {
    display: inline;
  }

  .cc-mv__word {
    display: inline-block;
    white-space: nowrap;
  }

  .cc-mv__char {
    display: inline-block;
    opacity: 0;
    transform: translateY(9px);
  }

  .cc-mv--open .cc-mv__char {
    animation: ccMvWrite 280ms cubic-bezier(0.22, 1, 0.36, 1) forwards;
  }

  .cc-mv__cards {
    margin-top: 34px;
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 16px;
  }

  .cc-mv__card {
    position: relative;
    min-width: 0;
    min-height: 170px;
    overflow: hidden;
    padding: 23px;
    display: grid;
    grid-template-columns: 48px minmax(0, 1fr);
    align-content: start;
    gap: 15px;
    border: 1px solid rgba(245, 27, 40, 0.12);
    border-radius: 20px;
    background: rgba(255, 255, 255, 0.88);
    box-shadow: 0 12px 34px rgba(112, 14, 24, 0.06);
    opacity: 0;
    transform: translateY(22px);
    transition:
      opacity 480ms ease,
      transform 640ms cubic-bezier(0.22, 1, 0.36, 1),
      border-color 210ms ease,
      box-shadow 210ms ease;
  }

  .cc-mv--open .cc-mv__card--mission {
    opacity: 1;
    transform: translateY(0);
    transition-delay: 1.34s, 1.34s, 0s, 0s;
  }

  .cc-mv--open .cc-mv__card--vision {
    opacity: 1;
    transform: translateY(0);
    transition-delay: 1.48s, 1.48s, 0s, 0s;
  }

  .cc-mv__card:hover {
    border-color: rgba(245, 27, 40, 0.28);
    box-shadow: 0 18px 42px rgba(112, 14, 24, 0.1);
  }

  .cc-mv__card::after {
    content: "";
    position: absolute;
    right: -38px;
    bottom: -45px;
    width: 128px;
    height: 128px;
    border-radius: 50%;
    background: rgba(245, 27, 40, 0.045);
  }

  .cc-mv__card--vision {
    background:
      linear-gradient(145deg, rgba(255, 255, 255, 0.95), rgba(255, 239, 242, 0.82)),
      #ffffff;
  }

  .cc-mv__icon {
    position: relative;
    z-index: 1;
    width: 48px;
    height: 48px;
    display: grid;
    place-items: center;
    border: 1px solid rgba(245, 27, 40, 0.13);
    border-radius: 15px;
    background: linear-gradient(145deg, #ffffff, #ffe6e9);
    color: var(--mv-red);
    box-shadow: inset 0 1px 0 #ffffff, 0 9px 20px rgba(245, 27, 40, 0.09);
  }

  .cc-mv__icon svg {
    width: 23px;
    height: 23px;
  }

  .cc-mv__card-copy {
    position: relative;
    z-index: 1;
    min-width: 0;
  }

  .cc-mv__card-label {
    margin: 0;
    color: var(--mv-red-dark);
    font-size: 10px;
    font-weight: 850;
    line-height: 1;
    letter-spacing: 0.15em;
    text-transform: uppercase;
  }

  .cc-mv__card-title {
    margin: 8px 0 0;
    color: var(--mv-ink);
    font-size: 22px;
    font-weight: 850;
    line-height: 1.15;
    letter-spacing: -0.028em;
  }

  .cc-mv__card-text {
    margin: 10px 0 0;
    color: var(--mv-muted);
    font-size: 13px;
    line-height: 1.65;
  }

  .cc-mv__promise {
    width: fit-content;
    margin: 25px auto 0;
    padding: 10px 15px;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 9px;
    border: 1px solid rgba(245, 27, 40, 0.11);
    border-radius: 999px;
    background: var(--mv-pink);
    color: #6e3940;
    font-size: 11px;
    font-weight: 750;
    line-height: 1.4;
    text-align: center;
    opacity: 0;
    transform: translateY(12px);
    transition:
      opacity 400ms ease 1.62s,
      transform 500ms cubic-bezier(0.22, 1, 0.36, 1) 1.62s;
  }

  .cc-mv--open .cc-mv__promise {
    opacity: 1;
    transform: translateY(0);
  }

  .cc-mv__promise-dot {
    flex: 0 0 7px;
    width: 7px;
    height: 7px;
    border-radius: 50%;
    background: var(--mv-red);
    box-shadow: 0 0 0 4px rgba(245, 27, 40, 0.1);
  }

  .cc-mv__door {
    position: absolute;
    z-index: 5;
    top: 0;
    bottom: 0;
    width: 50.15%;
    overflow: hidden;
    background:
      linear-gradient(90deg, rgba(255, 255, 255, 0.62), transparent 16%, transparent 84%, rgba(169, 20, 31, 0.08)),
      repeating-linear-gradient(
        0deg,
        transparent 0,
        transparent 51px,
        rgba(245, 27, 40, 0.075) 52px,
        rgba(245, 27, 40, 0.075) 53px
      ),
      repeating-linear-gradient(
        90deg,
        transparent 0,
        transparent 86px,
        rgba(245, 27, 40, 0.052) 87px,
        rgba(245, 27, 40, 0.052) 88px
      ),
      linear-gradient(145deg, #fffdfd 0%, #ffecee 100%);
    transition: transform 880ms cubic-bezier(0.76, 0, 0.24, 1);
    will-change: transform;
  }

  .cc-mv__door::before {
    content: "";
    position: absolute;
    inset: 0;
    opacity: 0.7;
    background:
      radial-gradient(circle at 24% 24%, rgba(255, 255, 255, 0.84), transparent 27%),
      radial-gradient(circle at 78% 76%, rgba(245, 27, 40, 0.07), transparent 29%);
  }

  .cc-mv__door--left {
    left: 0;
    border-right: 1px solid rgba(173, 7, 18, 0.17);
    box-shadow: inset -18px 0 28px rgba(120, 12, 20, 0.07);
    transform-origin: left center;
  }

  .cc-mv__door--right {
    right: 0;
    border-left: 1px solid rgba(255, 255, 255, 0.8);
    box-shadow: inset 18px 0 28px rgba(120, 12, 20, 0.055);
    transform-origin: right center;
  }

  .cc-mv--open .cc-mv__door--left {
    transform: translateX(-101%);
  }

  .cc-mv--open .cc-mv__door--right {
    transform: translateX(101%);
  }

  .cc-mv__handle {
    position: absolute;
    z-index: 2;
    top: 50%;
    width: 21px;
    height: 46px;
    border: 1px solid rgba(255, 255, 255, 0.52);
    border-radius: 999px;
    background: linear-gradient(180deg, #ff3440, var(--mv-red-dark));
    box-shadow:
      0 8px 20px rgba(157, 7, 18, 0.22),
      inset 0 1px 0 rgba(255, 255, 255, 0.28);
    transform: translateY(-50%);
  }

  .cc-mv__door--left .cc-mv__handle {
    right: 16px;
  }

  .cc-mv__door--right .cc-mv__handle {
    left: 16px;
  }

  .cc-mv__seal {
    position: absolute;
    z-index: 7;
    top: 50%;
    left: 50%;
    width: 74px;
    height: 74px;
    display: grid;
    place-items: center;
    border: 6px solid rgba(255, 255, 255, 0.94);
    border-radius: 50%;
    background: linear-gradient(145deg, #ff2b38, var(--mv-red-dark));
    box-shadow: 0 16px 34px rgba(150, 5, 17, 0.25);
    color: #ffffff;
    transform: translate(-50%, -50%) scale(1);
    transition:
      opacity 240ms ease 130ms,
      transform 360ms cubic-bezier(0.22, 1, 0.36, 1) 100ms;
  }

  .cc-mv__seal svg {
    width: 31px;
    height: 31px;
  }

  .cc-mv--open .cc-mv__seal {
    opacity: 0;
    transform: translate(-50%, -50%) scale(0.55);
  }

  @keyframes ccMvWrite {
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @media (max-width: 720px) {
    .cc-mv {
      padding-inline: 14px;
    }

    .cc-mv__shell {
      border-radius: 24px;
    }

    .cc-mv__content {
      min-height: 0;
      padding: 40px 20px;
    }

    .cc-mv__title {
      min-height: 0;
      font-size: clamp(31px, 9vw, 41px);
    }

    .cc-mv__cards {
      margin-top: 28px;
      grid-template-columns: 1fr;
      gap: 12px;
    }

    .cc-mv__card {
      min-height: 0;
      padding: 19px;
    }

    .cc-mv__promise {
      width: 100%;
      border-radius: 15px;
    }

    .cc-mv__seal {
      width: 64px;
      height: 64px;
    }

    .cc-mv__handle {
      width: 17px;
      height: 39px;
    }

    .cc-mv__door--left .cc-mv__handle {
      right: 10px;
    }

    .cc-mv__door--right .cc-mv__handle {
      left: 10px;
    }
  }

  @media (max-width: 400px) {
    .cc-mv__content {
      padding: 35px 16px;
    }

    .cc-mv__card {
      grid-template-columns: 42px minmax(0, 1fr);
      gap: 12px;
    }

    .cc-mv__icon {
      width: 42px;
      height: 42px;
      border-radius: 13px;
    }

    .cc-mv__card-title {
      font-size: 20px;
    }
  }

  @media (prefers-reduced-motion: reduce) {
    .cc-mv__content,
    .cc-mv__card,
    .cc-mv__promise,
    .cc-mv__door,
    .cc-mv__seal {
      transition-duration: 0.01ms !important;
      transition-delay: 0ms !important;
    }

    .cc-mv--open .cc-mv__char {
      opacity: 1;
      transform: none;
      animation: none;
    }
  }
`;

type TypeTextProps = {
  text: string;
  delay: number;
  className?: string;
};

function TypeText({ text, delay, className = "" }: TypeTextProps) {
  const words = text.split(" ");

  return (
    <span className={`cc-mv__typed ${className}`} aria-label={text}>
      {words.map((word, wordIndex) => {
        const characterOffset = words
          .slice(0, wordIndex)
          .reduce((total, currentWord) => total + currentWord.length + 1, 0);

        return (
          <span className="cc-mv__word" aria-hidden="true" key={wordIndex}>
            {Array.from(word).map((character, characterIndex) => (
              <span
                className="cc-mv__char"
                style={{
                  animationDelay: `${
                    delay + (characterOffset + characterIndex) * 14
                  }ms`,
                }}
                key={`${character}-${characterIndex}`}
              >
                {character}
              </span>
            ))}
            {wordIndex < words.length - 1 ? "\u00A0" : null}
          </span>
        );
      })}
    </span>
  );
}

export default function MissionVisionSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const section = sectionRef.current;

    if (!section || typeof IntersectionObserver === "undefined") {
      const frameId = window.requestAnimationFrame(() => setIsOpen(true));
      return () => window.cancelAnimationFrame(frameId);
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsOpen(entry.intersectionRatio >= 0.22);
      },
      {
        threshold: 0.22,
        rootMargin: "0px 0px -8% 0px",
      },
    );

    observer.observe(section);

    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className={`cc-mv${isOpen ? " cc-mv--open" : ""}`}
      id="mission-vision"
      aria-labelledby="mission-vision-title"
    >
      <div className="cc-mv__shell">
        <div className="cc-mv__content">
          <header className="cc-mv__header">
            <p className="cc-mv__eyebrow">
              <TypeText text="MISSION & VISION" delay={520} />
            </p>

            <h2 className="cc-mv__title" id="mission-vision-title">
              <TypeText text="Complete Property Care," delay={670} />{" "}
              <TypeText text="Guided by Purpose." delay={960} />
            </h2>
          </header>

          <div className="cc-mv__cards">
            <article className="cc-mv__card cc-mv__card--mission">
              <span className="cc-mv__icon" aria-hidden="true">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="12" cy="12" r="9" />
                  <circle cx="12" cy="12" r="5" />
                  <circle cx="12" cy="12" r="1.5" />
                </svg>
              </span>

              <div className="cc-mv__card-copy">
                <p className="cc-mv__card-label">Our Mission</p>
                <h3 className="cc-mv__card-title">Make every service simple</h3>
                <p className="cc-mv__card-text">
                  To deliver reliable home, commercial and industrial property
                  services across India through skilled professionals, clear
                  communication and accountable work.
                </p>
              </div>
            </article>

            <article className="cc-mv__card cc-mv__card--vision">
              <span className="cc-mv__icon" aria-hidden="true">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M2 12s3.5-6 10-6 10 6 10 6-3.5 6-10 6S2 12 2 12Z" />
                  <circle cx="12" cy="12" r="3" />
                </svg>
              </span>

              <div className="cc-mv__card-copy">
                <p className="cc-mv__card-label">Our Vision</p>
                <h3 className="cc-mv__card-title">
                  Set a higher standard for trust
                </h3>
                <p className="cc-mv__card-text">
                  To become India&apos;s most dependable property-care partner,
                  known for consistent quality, responsive support and
                  relationships built to last.
                </p>
              </div>
            </article>
          </div>

          <p className="cc-mv__promise">
            <span className="cc-mv__promise-dot" aria-hidden="true" />
            One trusted company for cleaning, repairs, renovation and complete
            property maintenance.
          </p>
        </div>

        <div className="cc-mv__door cc-mv__door--left" aria-hidden="true">
          <span className="cc-mv__handle" />
        </div>
        <div className="cc-mv__door cc-mv__door--right" aria-hidden="true">
          <span className="cc-mv__handle" />
        </div>

        <div className="cc-mv__seal" aria-hidden="true">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="m3 11 9-8 9 8" />
            <path d="M5 10v10h14V10M9 20v-6h6v6" />
          </svg>
        </div>
      </div>

      <style>{MISSION_VISION_STYLES}</style>
    </section>
  );
}