"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";

const careerPoints = [
  {
    number: "01",
    title: "Do meaningful work",
    text: "Create experiences people remember.",
  },
  {
    number: "02",
    title: "Keep growing",
    text: "Build skills, confidence and ownership.",
  },
  {
    number: "03",
    title: "Move forward",
    text: "Turn ambition into real progress.",
  },
] as const;

const firstHeadline = [
  "Shape\u00A0",
  "your\u00A0",
  "future.",
] as const;

const secondHeadline = [
  "Grow\u00A0",
  "with\u00A0",
  "City\u00A0",
  "Coolies.",
] as const;

function SparkIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      aria-hidden="true"
    >
      <path d="M12 2.5 13.9 8l5.6 1.9-5.6 1.9L12 17.4l-1.9-5.6-5.6-1.9L10.1 8 12 2.5Z" />
      <path d="m18.4 15.2.8 2.1 2.1.8-2.1.8-.8 2.1-.8-2.1-2.1-.8 2.1-.8.8-2.1Z" />
    </svg>
  );
}

function ArrowIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      aria-hidden="true"
    >
      <path d="M5 12h13" />
      <path d="m14 7 5 5-5 5" />
    </svg>
  );
}

function scrollToSection(id: string) {
  document
    .getElementById(id)
    ?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
}

export default function CareersHeroSection() {
  const heroRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const hero = heroRef.current;

    if (!hero) {
      return;
    }

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (reduceMotion) {
      hero.classList.add("cc-careers-is-visible");
      return;
    }

    let targetX = 0;
    let targetY = 0;

    let currentX = 0;
    let currentY = 0;

    let targetScroll = 0;
    let currentScroll = 0;

    let rafId = 0;

    const updateScroll = () => {
      const rect =
        hero.getBoundingClientRect();

      const viewport =
        Math.max(
          window.innerHeight,
          1,
        );

      targetScroll =
        Math.max(
          -1,
          Math.min(
            1,
            -rect.top /
              Math.max(
                rect.height,
                viewport,
              ),
          ),
        );
    };

    const pointerMove = (
      event: PointerEvent,
    ) => {
      const rect =
        hero.getBoundingClientRect();

      const x =
        (event.clientX - rect.left) /
        Math.max(rect.width, 1);

      const y =
        (event.clientY - rect.top) /
        Math.max(rect.height, 1);

      targetX =
        (x - 0.5) * 2;

      targetY =
        (y - 0.5) * 2;
    };

    const pointerLeave = () => {
      targetX = 0;
      targetY = 0;
    };

    const animate = () => {
      currentX +=
        (targetX - currentX) *
        0.032;

      currentY +=
        (targetY - currentY) *
        0.032;

      currentScroll +=
        (targetScroll -
          currentScroll) *
        0.038;

      hero.style.setProperty(
        "--career-x",
        currentX.toFixed(4),
      );

      hero.style.setProperty(
        "--career-y",
        currentY.toFixed(4),
      );

      hero.style.setProperty(
        "--career-scroll",
        currentScroll.toFixed(4),
      );

      rafId =
        requestAnimationFrame(
          animate,
        );
    };

    let hasRevealed = false;

    const observer =
      new IntersectionObserver(
        ([entry]) => {
          if (
            !entry ||
            !entry.isIntersecting ||
            hasRevealed
          ) {
            return;
          }

          hasRevealed = true;

          hero.classList.add(
            "cc-careers-is-visible",
          );

          observer.disconnect();
        },
        {
          threshold: 0.17,
          rootMargin:
            "3% 0px -7% 0px",
        },
      );

    observer.observe(hero);

    hero.addEventListener(
      "pointermove",
      pointerMove,
      {
        passive: true,
      },
    );

    hero.addEventListener(
      "pointerleave",
      pointerLeave,
    );

    window.addEventListener(
      "scroll",
      updateScroll,
      {
        passive: true,
      },
    );

    window.addEventListener(
      "resize",
      updateScroll,
      {
        passive: true,
      },
    );

    updateScroll();
    animate();

    return () => {
      observer.disconnect();

      cancelAnimationFrame(
        rafId,
      );

      hero.removeEventListener(
        "pointermove",
        pointerMove,
      );

      hero.removeEventListener(
        "pointerleave",
        pointerLeave,
      );

      window.removeEventListener(
        "scroll",
        updateScroll,
      );

      window.removeEventListener(
        "resize",
        updateScroll,
      );
    };
  }, []);

  return (
    <section
      ref={heroRef}
      id="careers-hero"
      className="cc-careers-cinematic"
      aria-labelledby="careers-hero-title"
    >
      <div
        className="cc-careers-cinematic__scene"
        aria-hidden="true"
      >
        <Image
          src="/careers-hero-banner.png"
          alt=""
          fill
          priority
          sizes="100vw"
        />
      </div>

      <div
        className="cc-careers-cinematic__overlay"
        aria-hidden="true"
      />

      <div
        className="cc-careers-cinematic__depth"
        aria-hidden="true"
      />

      <div
        className="cc-careers-cinematic__orb cc-careers-cinematic__orb--one"
        aria-hidden="true"
      />

      <div
        className="cc-careers-cinematic__orb cc-careers-cinematic__orb--two"
        aria-hidden="true"
      />

      <div
        className="cc-careers-cinematic__orb cc-careers-cinematic__orb--three"
        aria-hidden="true"
      />

      <div
        className="cc-careers-cinematic__sweep"
        aria-hidden="true"
      />

      <div
        className="cc-careers-cinematic__ambient-line cc-careers-cinematic__ambient-line--one"
        aria-hidden="true"
      />

      <div
        className="cc-careers-cinematic__ambient-line cc-careers-cinematic__ambient-line--two"
        aria-hidden="true"
      />

      <div className="cc-careers-cinematic__container">
        <div className="cc-careers-cinematic__content">
          <div className="cc-careers-eyebrow-wrap">
            <div className="cc-careers-cinematic__eyebrow">
              <span>
                <SparkIcon />
              </span>

              <strong>
                Create • Grow • Lead
              </strong>
            </div>
          </div>

          <h1 id="careers-hero-title">
            <span className="cc-careers-title-row cc-careers-title-row--dark">
              {firstHeadline.map(
                (word) => (
                  <span
                    className="cc-careers-title-word"
                    key={word}
                  >
                    <i>
                      {word}
                    </i>
                  </span>
                ),
              )}
            </span>

            <span className="cc-careers-title-row cc-careers-title-row--red">
              {secondHeadline.map(
                (word) => (
                  <span
                    className="cc-careers-title-word"
                    key={word}
                  >
                    <i>
                      {word}
                    </i>
                  </span>
                ),
              )}
            </span>
          </h1>

          <p className="cc-careers-cinematic__description">
            Build a career where your ideas matter, your skills keep
            growing and every step moves you forward. Join City Coolies
            and help shape better experiences through meaningful work,
            ownership and ambition.
          </p>

          <div className="cc-careers-cinematic__actions">
            <button
              type="button"
              className="cc-careers-cinematic__button cc-careers-cinematic__button--primary"
              onClick={() =>
                scrollToSection(
                  "careers-opportunities",
                )
              }
            >
              <span>
                Explore Opportunities
              </span>

              <ArrowIcon />
            </button>

            <button
              type="button"
              className="cc-careers-cinematic__button cc-careers-cinematic__button--secondary"
              onClick={() =>
                scrollToSection(
                  "careers-culture",
                )
              }
            >
              Discover Our Culture
            </button>
          </div>

          <div className="cc-careers-cinematic__points">
            {careerPoints.map(
              (point, index) => (
                <article
                  className={`cc-careers-point cc-careers-point--${index + 1}`}
                  key={point.number}
                >
                  <span className="cc-careers-point__number">
                    {point.number}
                  </span>

                  <div>
                    <strong>
                      {point.title}
                    </strong>

                    <small>
                      {point.text}
                    </small>
                  </div>
                </article>
              ),
            )}
          </div>
        </div>

        <div
          className="cc-careers-cinematic__floating-world"
          aria-hidden="true"
        >

          <span className="cc-careers-floating-dot cc-careers-floating-dot--one" />

          <span className="cc-careers-floating-dot cc-careers-floating-dot--two" />

          <div className="cc-careers-cinematic__rings">
            <span />
            <span />
            <span />
          </div>
        </div>

        <div
          className="cc-careers-cinematic__scroll"
          aria-hidden="true"
        >
          <span>
            Discover more
          </span>

          <i>
            <b />
          </i>
        </div>
      </div>

      <style>{`
        .cc-careers-cinematic {
          --cc-red: #f21f2f;
          --cc-dark: #15161c;

          --career-x: 0;
          --career-y: 0;
          --career-scroll: 0;

          position: relative;
          isolation: isolate;
          width: 100%;
          min-height:
            clamp(
              660px,
              79vh,
              830px
            );
          overflow: hidden;
          background: #fff4f6;
          perspective: 1500px;
          scroll-margin-top: 90px;
        }


        /* ======================================
           CINEMATIC BACKGROUND
        ====================================== */

        .cc-careers-cinematic__scene {
          position: absolute;
          inset: -2%;
          z-index: -10;
          overflow: hidden;

          transform:
            translate3d(
              calc(
                var(--career-x) *
                -14px
              ),
              calc(
                var(--career-scroll) *
                34px
              ),
              0
            );

          will-change: transform;
        }


        .cc-careers-cinematic__scene img {
          object-fit: cover;
          object-position: center center;

          transform-origin:
            68% 50%;
        }


        .cc-careers-cinematic:not(.cc-careers-is-visible)
        .cc-careers-cinematic__scene img {
          opacity: .45;
          filter:
            blur(7px)
            saturate(.76);
        }


        .cc-careers-is-visible
        .cc-careers-cinematic__scene img {
          animation:
            ccCareerSceneReveal
            1200ms
            cubic-bezier(.16,1,.3,1)
            both,

            ccCareerSceneBreathe
            11s
            ease-in-out
            1250ms
            infinite
            alternate;
        }


        /* LESS WHITE THAN BEFORE */

        .cc-careers-cinematic__overlay {
          position: absolute;
          inset: 0;
          z-index: -9;
          pointer-events: none;

          background:
            radial-gradient(
              circle at 12% 48%,
              rgba(
                255,
                237,
                241,
                .14
              )
              0%,
              transparent
              34%
            ),

            linear-gradient(
              90deg,
              rgba(
                255,
                249,
                250,
                .28
              )
              0%,

              rgba(
                255,
                248,
                249,
                .17
              )
              25%,

              rgba(
                255,
                247,
                249,
                .07
              )
              43%,

              rgba(
                255,
                255,
                255,
                .03
              )
              68%,

              transparent
              100%
            );
        }


        .cc-careers-cinematic__depth {
          position: absolute;
          top: -220px;
          left: -160px;
          z-index: -8;

          width: 740px;
          height: 740px;

          opacity: .44;

          border-radius: 50%;

          background:
            repeating-radial-gradient(
              circle,
              rgba(
                235,
                24,
                42,
                .11
              )
              0
              1px,

              transparent
              1px
              18px
            );

          mask-image:
            radial-gradient(
              circle,
              black,
              transparent 69%
            );

          transform:
            translate3d(
              calc(
                var(--career-x) *
                -13px
              ),
              calc(
                var(--career-y) *
                -11px
              ),
              0
            );

          will-change: transform;
        }


        /* ======================================
           3D ORBS
        ====================================== */

        .cc-careers-cinematic__orb {
          position: absolute;
          z-index: -7;

          border-radius: 50%;

          pointer-events: none;

          box-shadow:
            inset
            0
            0
            28px
            rgba(
              255,
              255,
              255,
              .9
            ),

            0
            20px
            55px
            rgba(
              225,
              17,
              34,
              .18
            );

          will-change: transform;
        }


        .cc-careers-cinematic__orb--one {
          top: 14%;
          left: 47%;

          width: 67px;
          height: 67px;

          background:
            radial-gradient(
              circle at 28% 24%,
              white,
              #ffc3ca 25%,
              #f42e3e 67%,
              #c6071a
            );

          transform:
            translate3d(
              calc(
                var(--career-x) *
                32px
              ),
              calc(
                var(--career-y) *
                24px
              ),
              0
            );
        }


        .cc-careers-cinematic__orb--two {
          right: 8%;
          bottom: 17%;

          width: 34px;
          height: 34px;

          background:
            radial-gradient(
              circle at 30% 25%,
              white,
              #ffbbc4 35%,
              #f02a3a
            );

          transform:
            translate3d(
              calc(
                var(--career-x) *
                -28px
              ),
              calc(
                var(--career-y) *
                -21px
              ),
              0
            );
        }


        .cc-careers-cinematic__orb--three {
          right: 34%;
          bottom: 10%;

          width: 18px;
          height: 18px;

          background:
            radial-gradient(
              circle at 30% 25%,
              white,
              #ffb7c2,
              #ee2637
            );

          transform:
            translate3d(
              calc(
                var(--career-x) *
                10px
              ),
              calc(
                var(--career-scroll) *
                -22px
              ),
              0
            );
        }


        /* ======================================
           MOVING LIGHT
        ====================================== */

        .cc-careers-cinematic__sweep {
          position: absolute;
          top: -43%;
          left: -30%;
          z-index: -6;

          width: 100px;
          height: 150%;

          opacity: 0;

          background:
            linear-gradient(
              90deg,
              transparent,
              rgba(
                255,
                255,
                255,
                .70
              ),
              transparent
            );

          filter: blur(13px);

          transform:
            rotate(27deg);
        }


        .cc-careers-is-visible
        .cc-careers-cinematic__sweep {
          animation:
            ccCareerSweep
            5.8s
            cubic-bezier(.16,1,.3,1)
            800ms
            infinite;
        }


        .cc-careers-cinematic__ambient-line {
          position: absolute;
          z-index: -5;
          pointer-events: none;

          border:
            1px solid
            rgba(
              241,
              31,
              47,
              .14
            );

          border-radius: 50%;
        }


        .cc-careers-cinematic__ambient-line--one {
          top: 11%;
          right: -230px;

          width: 630px;
          height: 630px;

          transform:
            translate3d(
              calc(
                var(--career-x) *
                -18px
              ),
              calc(
                var(--career-y) *
                -9px
              ),
              0
            );
        }


        .cc-careers-cinematic__ambient-line--two {
          right: -90px;
          bottom: -170px;

          width: 390px;
          height: 390px;

          border-color:
            rgba(
              255,
              255,
              255,
              .29
            );

          transform:
            translate3d(
              calc(
                var(--career-x) *
                -25px
              ),
              calc(
                var(--career-scroll) *
                -20px
              ),
              0
            );
        }


        /* ======================================
           CONTAINER
        ====================================== */

        .cc-careers-cinematic__container {
          position: relative;
          z-index: 2;

          width:
            min(
              calc(
                100% - 70px
              ),
              1480px
            );

          min-height: inherit;

          margin: 0 auto;

          padding:
            clamp(
              54px,
              6vh,
              78px
            )
            0
            43px;
        }


        .cc-careers-cinematic__content {
          position: relative;
          z-index: 4;

          width:
            min(
              780px,
              58%
            );

          transform:
            translate3d(
              0,
              calc(
                var(--career-scroll) *
                -17px
              ),
              0
            );

          will-change: transform;
        }


        /* ======================================
           EYEBROW WRITING
        ====================================== */

        .cc-careers-eyebrow-wrap {
          display: inline-block;

          opacity: 0;

          clip-path:
            inset(
              0
              100%
              0
              0
            );
        }


        .cc-careers-is-visible
        .cc-careers-eyebrow-wrap {
          animation:
            ccCareerWriting
            650ms
            cubic-bezier(.16,1,.3,1)
            160ms
            both;
        }


        .cc-careers-cinematic__eyebrow {
          display: inline-flex;
          align-items: center;

          gap: 9px;

          min-height: 39px;

          padding:
            7px
            15px
            7px
            8px;

          border:
            1px solid
            rgba(
              238,
              25,
              43,
              .17
            );

          border-radius:
            999px;

          color:
            #d91627;

          background:
            rgba(
              255,
              244,
              247,
              .64
            );

          box-shadow:
            0
            12px
            32px
            rgba(
              78,
              16,
              26,
              .07
            );

          backdrop-filter:
            blur(13px);
        }


        .cc-careers-cinematic__eyebrow > span {
          display: grid;

          width: 25px;
          height: 25px;

          place-items: center;

          border-radius: 50%;

          color: white;

          background:
            linear-gradient(
              145deg,
              #ff4654,
              #d90d20
            );

          box-shadow:
            0
            8px
            19px
            rgba(
              232,
              20,
              37,
              .28
            );
        }


        .cc-careers-cinematic__eyebrow svg {
          width: 13px;
          height: 13px;

          stroke-width: 1.7;

          stroke-linecap: round;
          stroke-linejoin: round;
        }


        .cc-careers-cinematic__eyebrow strong {
          font-size: 10px;
          font-weight: 900;

          letter-spacing:
            .15em;

          text-transform:
            uppercase;
        }


        /* ======================================
           HEADLINE — WORD BY WORD VIDEO STYLE
        ====================================== */

        .cc-careers-cinematic h1 {
          max-width: 790px;

          margin:
            25px
            0
            0;

          font-size:
            clamp(
              56px,
              5.45vw,
              91px
            );

          font-weight: 880;

          line-height: .92;

          letter-spacing:
            -.064em;
        }


        .cc-careers-title-row {
          display: flex;
          flex-wrap: wrap;

          column-gap:
            .18em;

          row-gap: .02em;

          overflow: hidden;
        }


        .cc-careers-title-row--red {
          margin-top: 6px;
        }


        .cc-careers-title-word {
          display: inline-block;
          overflow: hidden;
        }


        .cc-careers-title-word i {
          display: inline-block;

          opacity: 0;

          font-style: normal;

          filter:
            blur(8px);

          transform:
            translate3d(
              0,
              110%,
              0
            )
            rotateX(14deg);

          transform-origin:
            bottom center;
        }


        .cc-careers-title-row--dark
        .cc-careers-title-word i {
          color:
            var(--cc-dark);
        }


        .cc-careers-title-row--red
        .cc-careers-title-word i {
          color:
            var(--cc-red);

          background:
            linear-gradient(
              90deg,
              #fb2738,
              #ed1729 48%,
              #c6081b
            );

          background-clip: text;

          -webkit-background-clip:
            text;

          -webkit-text-fill-color:
            transparent;
        }


        .cc-careers-is-visible
        .cc-careers-title-row--dark
        .cc-careers-title-word:nth-child(1)
        i {
          animation:
            ccCareerWord
            720ms
            cubic-bezier(.16,1,.3,1)
            570ms
            both;
        }


        .cc-careers-is-visible
        .cc-careers-title-row--dark
        .cc-careers-title-word:nth-child(2)
        i {
          animation:
            ccCareerWord
            720ms
            cubic-bezier(.16,1,.3,1)
            690ms
            both;
        }


        .cc-careers-is-visible
        .cc-careers-title-row--dark
        .cc-careers-title-word:nth-child(3)
        i {
          animation:
            ccCareerWord
            720ms
            cubic-bezier(.16,1,.3,1)
            810ms
            both;
        }


        .cc-careers-is-visible
        .cc-careers-title-row--dark
        .cc-careers-title-word:nth-child(4)
        i {
          animation:
            ccCareerWord
            720ms
            cubic-bezier(.16,1,.3,1)
            930ms
            both;
        }


        .cc-careers-is-visible
        .cc-careers-title-row--dark
        .cc-careers-title-word:nth-child(5)
        i {
          animation:
            ccCareerWord
            720ms
            cubic-bezier(.16,1,.3,1)
            1050ms
            both;
        }


        .cc-careers-is-visible
        .cc-careers-title-row--red
        .cc-careers-title-word:nth-child(1)
        i {
          animation:
            ccCareerWord
            760ms
            cubic-bezier(.16,1,.3,1)
            1260ms
            both;
        }


        .cc-careers-is-visible
        .cc-careers-title-row--red
        .cc-careers-title-word:nth-child(2)
        i {
          animation:
            ccCareerWord
            760ms
            cubic-bezier(.16,1,.3,1)
            1380ms
            both;
        }


        .cc-careers-is-visible
        .cc-careers-title-row--red
        .cc-careers-title-word:nth-child(3)
        i {
          animation:
            ccCareerWord
            760ms
            cubic-bezier(.16,1,.3,1)
            1500ms
            both;
        }


        .cc-careers-is-visible
        .cc-careers-title-row--red
        .cc-careers-title-word:nth-child(4)
        i {
          animation:
            ccCareerWord
            760ms
            cubic-bezier(.16,1,.3,1)
            1620ms
            both;
        }


        /* ======================================
           DESCRIPTION
        ====================================== */

        .cc-careers-cinematic__description {
          max-width: 635px;

          margin:
            27px
            0
            0;

          opacity: 0;

          color:
            #4f5059;

          font-size:
            clamp(
              15px,
              1.15vw,
              18px
            );

          font-weight: 520;

          line-height: 1.72;

          filter:
            blur(8px);

          transform:
            translate3d(
              0,
              24px,
              0
            );
        }


        .cc-careers-is-visible
        .cc-careers-cinematic__description {
          animation:
            ccCareerContentEnter
            760ms
            cubic-bezier(.16,1,.3,1)
            1920ms
            both;
        }


        /* ======================================
           BUTTONS
        ====================================== */

        .cc-careers-cinematic__actions {
          display: flex;
          align-items: center;
          flex-wrap: wrap;

          gap: 11px;

          margin-top: 29px;

          opacity: 0;

          filter:
            blur(7px);

          transform:
            translate3d(
              0,
              22px,
              0
            );
        }


        .cc-careers-is-visible
        .cc-careers-cinematic__actions {
          animation:
            ccCareerContentEnter
            700ms
            cubic-bezier(.16,1,.3,1)
            2200ms
            both;
        }


        .cc-careers-cinematic__button {
          position: relative;

          display: inline-flex;

          min-height: 52px;

          align-items: center;
          justify-content: center;

          gap: 14px;

          padding:
            0
            23px;

          border-radius:
            13px;

          font: inherit;

          font-size: 13px;
          font-weight: 800;

          cursor: pointer;

          transition:
            transform
            220ms
            ease,

            box-shadow
            220ms
            ease,

            border-color
            220ms
            ease;
        }


        .cc-careers-cinematic__button--primary {
          overflow: hidden;

          border:
            1px solid
            #ed1728;

          color: white;

          background:
            linear-gradient(
              135deg,
              #ff2738,
              #e31123
            );

          box-shadow:
            0
            19px
            42px
            rgba(
              226,
              17,
              36,
              .23
            );
        }


        .cc-careers-cinematic__button--primary::before {
          position: absolute;

          top: -80%;
          left: -55%;

          width: 32%;
          height: 260%;

          content: "";

          background:
            linear-gradient(
              90deg,
              transparent,
              rgba(
                255,
                255,
                255,
                .78
              ),
              transparent
            );

          transform:
            rotate(19deg);

          transition:
            left
            720ms
            ease;
        }


        .cc-careers-cinematic__button--primary:hover::before {
          left: 128%;
        }


        .cc-careers-cinematic__button--primary:hover {
          transform:
            translateY(-3px)
            scale(1.015);

          box-shadow:
            0
            25px
            55px
            rgba(
              226,
              17,
              36,
              .29
            );
        }


        .cc-careers-cinematic__button svg {
          width: 18px;
          height: 18px;

          stroke-width: 1.8;

          stroke-linecap: round;
          stroke-linejoin: round;
        }


        .cc-careers-cinematic__button--secondary {
          border:
            1px solid
            rgba(
              34,
              35,
              42,
              .14
            );

          color:
            #27282f;

          background:
            rgba(
              255,
              249,
              250,
              .53
            );

          box-shadow:
            0
            14px
            35px
            rgba(
              49,
              23,
              28,
              .055
            );

          backdrop-filter:
            blur(13px);
        }


        .cc-careers-cinematic__button--secondary:hover {
          border-color:
            rgba(
              242,
              31,
              47,
              .30
            );

          transform:
            translateY(-3px);
        }


        /* ======================================
           CAREER POINTS
        ====================================== */

        .cc-careers-cinematic__points {
          display: grid;

          grid-template-columns:
            repeat(
              3,
              minmax(
                0,
                1fr
              )
            );

          gap: 10px;

          max-width: 690px;

          margin-top: 35px;
        }


        .cc-careers-point {
          position: relative;

          display: flex;
          align-items: center;

          gap: 11px;

          min-height: 68px;

          padding:
            10px
            12px;

          overflow: hidden;

          opacity: 0;

          border:
            1px solid
            rgba(
              241,
              28,
              45,
              .12
            );

          border-radius:
            14px;

          background:
            linear-gradient(
              135deg,
              rgba(
                255,
                255,
                255,
                .63
              ),
              rgba(
                255,
                231,
                236,
                .49
              )
            );

          box-shadow:
            0
            15px
            38px
            rgba(
              65,
              20,
              29,
              .06
            );

          backdrop-filter:
            blur(14px);

          filter:
            blur(8px);

          transform:
            perspective(
              650px
            )
            translate3d(
              0,
              31px,
              0
            )
            rotateX(11deg);
        }


        .cc-careers-is-visible
        .cc-careers-point--1 {
          animation:
            ccCareerPointEnter
            700ms
            cubic-bezier(.16,1,.3,1)
            2490ms
            both;
        }


        .cc-careers-is-visible
        .cc-careers-point--2 {
          animation:
            ccCareerPointEnter
            700ms
            cubic-bezier(.16,1,.3,1)
            2660ms
            both;
        }


        .cc-careers-is-visible
        .cc-careers-point--3 {
          animation:
            ccCareerPointEnter
            700ms
            cubic-bezier(.16,1,.3,1)
            2830ms
            both;
        }


        .cc-careers-point::before {
          position: absolute;

          top: 0;
          left: 0;

          width: 100%;
          height: 2px;

          content: "";

          background:
            linear-gradient(
              90deg,
              transparent,
              #f21f2f,
              transparent
            );

          transform:
            translateX(-110%);

          transition:
            transform
            650ms
            ease;
        }


        .cc-careers-point:hover::before {
          transform:
            translateX(110%);
        }


        .cc-careers-point:hover {
          border-color:
            rgba(
              242,
              31,
              47,
              .25
            );
        }


        .cc-careers-point__number {
          display: grid;

          width: 35px;
          height: 35px;

          flex:
            0
            0
            35px;

          place-items: center;

          border-radius:
            10px;

          color:
            var(--cc-red);

          background:
            rgba(
              255,
              224,
              230,
              .91
            );

          font-size: 10px;
          font-weight: 900;
        }


        .cc-careers-point > div {
          display: flex;

          min-width: 0;

          flex-direction: column;

          gap: 3px;
        }


        .cc-careers-point strong {
          color:
            #24252b;

          font-size: 11px;

          line-height: 1.18;
        }


        .cc-careers-point small {
          color:
            #6d6e77;

          font-size: 9.5px;
          font-weight: 630;

          line-height: 1.3;
        }


        /* ======================================
           RIGHT SIDE — NO BIG RED BOX
        ====================================== */

        .cc-careers-cinematic__floating-world {
          position: absolute;

          top: 50%;
          right: 2%;

          z-index: 3;

          width:
            min(
              35vw,
              500px
            );

          height: 430px;

          opacity: 0;

          pointer-events: none;

          transform:
            translate3d(
              0,
              -46%,
              0
            );
        }


        .cc-careers-is-visible
        .cc-careers-cinematic__floating-world {
          animation:
            ccCareerFloatingWorld
            850ms
            cubic-bezier(.16,1,.3,1)
            2950ms
            both;
        }


        .cc-careers-floating-word {
          position: absolute;

          padding:
            9px
            14px;

          border:
            1px solid
            rgba(
              255,
              255,
              255,
              .58
            );

          border-radius:
            999px;

          color:
            rgba(
              139,
              14,
              29,
              .78
            );

          background:
            rgba(
              255,
              244,
              246,
              .43
            );

          box-shadow:
            0
            18px
            45px
            rgba(
              87,
              16,
              26,
              .08
            );

          backdrop-filter:
            blur(12px);

          font-size: 9px;
          font-weight: 900;

          letter-spacing:
            .17em;
        }


        .cc-careers-floating-word--one {
          top: 12%;
          right: 5%;

          transform:
            translate3d(
              calc(
                var(--career-x) *
                -25px
              ),
              calc(
                var(--career-y) *
                -17px
              ),
              0
            )
            rotate(-4deg);
        }


        .cc-careers-floating-word--two {
          top: 45%;
          left: 8%;

          transform:
            translate3d(
              calc(
                var(--career-x) *
                -28px
              ),
              calc(
                var(--career-scroll) *
                -24px
              ),
              0
            )
            rotate(3deg);
        }


        .cc-careers-floating-word--three {
          right: 8%;
          bottom: 13%;

          transform:
            translate3d(
              calc(
                var(--career-x) *
                -31px
              ),
              calc(
                var(--career-y) *
                19px
              ),
              0
            )
            rotate(-2deg);
        }


        .cc-careers-floating-dot {
          position: absolute;

          width: 9px;
          height: 9px;

          border-radius: 50%;

          background: white;

          box-shadow:
            0
            0
            22px
            rgba(
              238,
              25,
              42,
              .85
            );
        }


        .cc-careers-floating-dot--one {
          top: 30%;
          left: 30%;
        }


        .cc-careers-floating-dot--two {
          right: 24%;
          bottom: 31%;
        }


        .cc-careers-cinematic__rings {
          position: absolute;

          top: 50%;
          left: 53%;

          width: 270px;
          height: 270px;

          transform:
            translate(
              -50%,
              -50%
            )
            perspective(
              700px
            )
            rotateX(67deg)
            rotateZ(
              calc(
                var(--career-x) *
                4deg
              )
            );
        }


        .cc-careers-cinematic__rings span {
          position: absolute;

          inset: 0;

          border:
            1px solid
            rgba(
              241,
              29,
              46,
              .20
            );

          border-radius: 50%;
        }


        .cc-careers-cinematic__rings span:nth-child(2) {
          inset: 37px;
        }


        .cc-careers-cinematic__rings span:nth-child(3) {
          inset: 75px;
        }


        .cc-careers-is-visible
        .cc-careers-cinematic__rings {
          animation:
            ccCareerRings
            18s
            linear
            infinite;
        }


        /* ======================================
           SCROLL INDICATOR
        ====================================== */

        .cc-careers-cinematic__scroll {
          position: absolute;

          bottom: 21px;
          left: 0;

          display: flex;
          align-items: center;

          gap: 12px;

          opacity: 0;

          color: #666770;

          font-size: 9px;
          font-weight: 800;

          letter-spacing:
            .15em;

          text-transform:
            uppercase;
        }


        .cc-careers-is-visible
        .cc-careers-cinematic__scroll {
          animation:
            ccCareerFade
            600ms
            ease
            3300ms
            both;
        }


        .cc-careers-cinematic__scroll > i {
          position: relative;

          display: block;

          width: 62px;
          height: 1px;

          overflow: hidden;

          background:
            rgba(
              30,
              31,
              36,
              .18
            );
        }


        .cc-careers-cinematic__scroll b {
          position: absolute;
          inset: 0;

          background:
            var(--cc-red);

          animation:
            ccCareerScrollLine
            2.2s
            ease-in-out
            infinite;
        }


        /* ======================================
           ANIMATIONS
        ====================================== */

        @keyframes ccCareerSceneReveal {
          from {
            opacity: .45;

            filter:
              blur(7px)
              saturate(.76);

            transform:
              scale(1.045);
          }

          to {
            opacity: 1;

            filter:
              blur(0)
              saturate(1.04);

            transform:
              scale(1);
          }
        }


        @keyframes ccCareerSceneBreathe {
          from {
            transform:
              scale(1);
          }

          to {
            transform:
              scale(1.032)
              translate3d(
                -8px,
                -4px,
                0
              );
          }
        }


        @keyframes ccCareerWriting {
          from {
            opacity: 0;

            clip-path:
              inset(
                0
                100%
                0
                0
              );

            filter:
              blur(5px);
          }

          to {
            opacity: 1;

            clip-path:
              inset(
                0
                0
                0
                0
              );

            filter:
              blur(0);
          }
        }


        @keyframes ccCareerWord {
          from {
            opacity: 0;

            filter:
              blur(8px);

            transform:
              translate3d(
                0,
                110%,
                0
              )
              rotateX(14deg);
          }

          to {
            opacity: 1;

            filter:
              blur(0);

            transform:
              translate3d(
                0,
                0,
                0
              )
              rotateX(0);
          }
        }


        @keyframes ccCareerContentEnter {
          from {
            opacity: 0;

            filter:
              blur(8px);

            transform:
              translate3d(
                0,
                24px,
                0
              );
          }

          to {
            opacity: 1;

            filter:
              blur(0);

            transform:
              translate3d(
                0,
                0,
                0
              );
          }
        }


        @keyframes ccCareerPointEnter {
          from {
            opacity: 0;

            filter:
              blur(8px);

            transform:
              perspective(
                650px
              )
              translate3d(
                0,
                31px,
                0
              )
              rotateX(11deg);
          }

          to {
            opacity: 1;

            filter:
              blur(0);

            transform:
              perspective(
                650px
              )
              translate3d(
                0,
                0,
                0
              )
              rotateX(0);
          }
        }


        @keyframes ccCareerFloatingWorld {
          from {
            opacity: 0;

            filter:
              blur(14px);

            transform:
              translate3d(
                45px,
                -43%,
                0
              )
              scale(.92);
          }

          to {
            opacity: 1;

            filter:
              blur(0);

            transform:
              translate3d(
                0,
                -46%,
                0
              )
              scale(1);
          }
        }


        @keyframes ccCareerSweep {
          0% {
            left: -30%;
            opacity: 0;
          }

          24% {
            opacity: .62;
          }

          100% {
            left: 125%;
            opacity: 0;
          }
        }


        @keyframes ccCareerRings {
          to {
            transform:
              translate(
                -50%,
                -50%
              )
              perspective(
                700px
              )
              rotateX(67deg)
              rotateZ(360deg);
          }
        }


        @keyframes ccCareerFade {
          from {
            opacity: 0;
          }

          to {
            opacity: 1;
          }
        }


        @keyframes ccCareerScrollLine {
          0% {
            transform:
              translateX(-105%);
          }

          55%,
          100% {
            transform:
              translateX(110%);
          }
        }


        /* ======================================
           TABLET
        ====================================== */

        @media (
          max-width: 1050px
        ) {
          .cc-careers-cinematic {
            min-height: 720px;
          }

          .cc-careers-cinematic__content {
            width: 65%;
          }

          .cc-careers-cinematic h1 {
            font-size:
              clamp(
                50px,
                6.4vw,
                77px
              );
          }

          .cc-careers-cinematic__floating-world {
            right: 0;

            width: 32vw;
          }
        }


        @media (
          max-width: 820px
        ) {
          .cc-careers-cinematic {
            min-height: 780px;
          }

          .cc-careers-cinematic__container {
            width:
              min(
                calc(
                  100% - 36px
                ),
                760px
              );
          }

          .cc-careers-cinematic__content {
            width: 78%;
          }

          .cc-careers-cinematic__floating-world {
            opacity: .68;
          }

          .cc-careers-cinematic__overlay {
            background:
              linear-gradient(
                90deg,
                rgba(
                  255,
                  247,
                  249,
                  .55
                ),
                rgba(
                  255,
                  247,
                  249,
                  .25
                )
                58%,
                rgba(
                  255,
                  255,
                  255,
                  .04
                )
              );
          }
        }


        /* ======================================
           PHONE
        ====================================== */

        @media (
          max-width: 600px
        ) {
          .cc-careers-cinematic {
            min-height: 850px;
            perspective: none;
          }

          .cc-careers-cinematic__scene {
            inset: 0;
          }

          .cc-careers-cinematic__scene img {
            object-position:
              67%
              center;
          }

          .cc-careers-cinematic__overlay {
            background:
              linear-gradient(
                180deg,
                rgba(
                  255,
                  247,
                  249,
                  .47
                )
                0%,

                rgba(
                  255,
                  247,
                  249,
                  .55
                )
                43%,

                rgba(
                  255,
                  243,
                  246,
                  .82
                )
                75%,

                rgba(
                  255,
                  241,
                  244,
                  .91
                )
                100%
              );
          }

          .cc-careers-cinematic__container {
            width:
              min(
                calc(
                  100% - 28px
                ),
                560px
              );

            padding-top: 48px;
          }

          .cc-careers-cinematic__content {
            width: 100%;
          }

          .cc-careers-cinematic__eyebrow strong {
            font-size: 8.5px;
          }

          .cc-careers-cinematic h1 {
            margin-top: 22px;

            font-size:
              clamp(
                42px,
                12vw,
                62px
              );

            line-height: .94;
          }

          .cc-careers-title-row {
            column-gap: .16em;
          }

          .cc-careers-cinematic__description {
            margin-top: 22px;

            font-size: 14px;

            line-height: 1.63;
          }

          .cc-careers-cinematic__actions {
            display: grid;

            grid-template-columns: 1fr;

            gap: 9px;

            margin-top: 25px;
          }

          .cc-careers-cinematic__button {
            width: 100%;
          }

          .cc-careers-cinematic__points {
            grid-template-columns: 1fr;

            gap: 7px;

            margin-top: 23px;
          }

          .cc-careers-point {
            min-height: 56px;
          }

          .cc-careers-cinematic__floating-world {
            display: none;
          }

          .cc-careers-cinematic__scroll {
            display: none;
          }

          .cc-careers-cinematic__orb--one {
            top: 9%;
            right: 7%;
            left: auto;

            width: 45px;
            height: 45px;
          }

          .cc-careers-cinematic__orb--two {
            display: none;
          }

          .cc-careers-cinematic__orb--three {
            right: 8%;
          }
        }


        /* ======================================
           ACCESSIBILITY
        ====================================== */

        @media (
          prefers-reduced-motion:
          reduce
        ) {
          .cc-careers-eyebrow-wrap,
          .cc-careers-title-word i,
          .cc-careers-cinematic__description,
          .cc-careers-cinematic__actions,
          .cc-careers-point,
          .cc-careers-cinematic__floating-world,
          .cc-careers-cinematic__scroll {
            opacity: 1 !important;

            clip-path:
              none !important;

            filter:
              none !important;

            transform:
              none !important;

            animation:
              none !important;
          }

          .cc-careers-cinematic__scene,
          .cc-careers-cinematic__scene img,
          .cc-careers-cinematic__sweep,
          .cc-careers-cinematic__rings,
          .cc-careers-cinematic__scroll b {
            animation:
              none !important;

            transform:
              none !important;
          }
        }
      
        /*
         * CITY COOLIES CAREERS
         * FINAL AMBIENT CINEMATIC MOTION
         */

        .cc-careers-is-visible
        .cc-careers-cinematic__orb--one {
          animation:
            ccCareerOrbOne
            7.5s
            ease-in-out
            infinite;
        }

        .cc-careers-is-visible
        .cc-careers-cinematic__orb--two {
          animation:
            ccCareerOrbTwo
            9s
            ease-in-out
            infinite;
        }

        .cc-careers-is-visible
        .cc-careers-cinematic__orb--three {
          animation:
            ccCareerOrbThree
            6.8s
            ease-in-out
            infinite;
        }

        .cc-careers-is-visible
        .cc-careers-floating-dot--one {
          animation:
            ccCareerDotOne
            5.2s
            ease-in-out
            infinite;
        }

        .cc-careers-is-visible
        .cc-careers-floating-dot--two {
          animation:
            ccCareerDotTwo
            6.4s
            ease-in-out
            infinite;
        }

        .cc-careers-cinematic__depth {
          animation:
            ccCareerDepthPulse
            12s
            ease-in-out
            infinite alternate;
        }

        @keyframes ccCareerOrbOne {
          0%,
          100% {
            margin-top: 0;
            margin-left: 0;
          }

          35% {
            margin-top: -18px;
            margin-left: 9px;
          }

          70% {
            margin-top: 8px;
            margin-left: -7px;
          }
        }

        @keyframes ccCareerOrbTwo {
          0%,
          100% {
            margin-right: 0;
            margin-bottom: 0;
          }

          45% {
            margin-right: 13px;
            margin-bottom: 20px;
          }

          75% {
            margin-right: -7px;
            margin-bottom: 7px;
          }
        }

        @keyframes ccCareerOrbThree {
          0%,
          100% {
            margin-bottom: 0;
          }

          50% {
            margin-bottom: 24px;
          }
        }

        @keyframes ccCareerDotOne {
          0%,
          100% {
            transform:
              translate3d(
                0,
                0,
                0
              )
              scale(1);
          }

          50% {
            transform:
              translate3d(
                9px,
                -14px,
                0
              )
              scale(1.35);
          }
        }

        @keyframes ccCareerDotTwo {
          0%,
          100% {
            transform:
              translate3d(
                0,
                0,
                0
              )
              scale(.9);
          }

          50% {
            transform:
              translate3d(
                -13px,
                11px,
                0
              )
              scale(1.3);
          }
        }

        @keyframes ccCareerDepthPulse {
          from {
            opacity: .30;
          }

          to {
            opacity: .52;
          }
        }

        .cc-careers-cinematic__points {
          transform:
            translate3d(
              0,
              calc(
                var(--career-scroll) *
                -7px
              ),
              0
            );

          will-change: transform;
        }

        .cc-careers-cinematic__actions {
          transform-origin:
            left center;
        }

        .cc-careers-is-visible
        .cc-careers-cinematic__button--primary {
          animation:
            ccCareerButtonBreathe
            4.8s
            ease-in-out
            3.5s
            infinite;
        }

        @keyframes ccCareerButtonBreathe {
          0%,
          100% {
            box-shadow:
              0
              19px
              42px
              rgba(
                226,
                17,
                36,
                .23
              );
          }

          50% {
            box-shadow:
              0
              23px
              52px
              rgba(
                226,
                17,
                36,
                .34
              );
          }
        }

        /*
         * CC_CAREERS_RESPONSIVE_BANNER_START
         * Responsive phone and tablet banner.
         */
        @media (max-width: 820px) {
          .cc-careers-cinematic__scene {
            inset: 0;
            transform: none !important;
            will-change: auto;
          }

          .cc-careers-cinematic__scene img {
            object-fit: contain !important;
            object-position: center top !important;
            transform: none !important;
            animation: none !important;
            filter: none !important;
          }

          .cc-careers-cinematic:not(.cc-careers-is-visible)
          .cc-careers-cinematic__scene img,
          .cc-careers-is-visible
          .cc-careers-cinematic__scene img {
            opacity: 1;
            transform: none !important;
            animation: none !important;
            filter: none !important;
          }
        }
        /* CC_CAREERS_RESPONSIVE_BANNER_END */

        /*
         * CC_CAREERS_CLEAR_BACKGROUND_START
         * Keep the original banner clear with a very light readable overlay.
         */
        .cc-careers-cinematic__scene img,
        .cc-careers-cinematic:not(.cc-careers-is-visible)
        .cc-careers-cinematic__scene img,
        .cc-careers-is-visible
        .cc-careers-cinematic__scene img {
          opacity: 1 !important;
          filter: none !important;
        }

        .cc-careers-cinematic__overlay {
          background:
            linear-gradient(
              90deg,
              rgba(255, 250, 251, 0.10) 0%,
              rgba(255, 250, 251, 0.06) 32%,
              rgba(255, 255, 255, 0.02) 62%,
              transparent 100%
            ) !important;
        }

        @media (max-width: 820px) {
          .cc-careers-cinematic__overlay {
            background:
              linear-gradient(
                180deg,
                rgba(255, 250, 251, 0.05) 0%,
                rgba(255, 250, 251, 0.08) 55%,
                rgba(255, 247, 249, 0.14) 100%
              ) !important;
          }
        }
        /* CC_CAREERS_CLEAR_BACKGROUND_END */
      `}</style>
    </section>
  );
}
