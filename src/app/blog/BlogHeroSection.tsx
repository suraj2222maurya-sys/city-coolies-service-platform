"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";

export default function BlogHeroSection() {
  const heroRef = useRef<HTMLElement | null>(null);
  const railRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const hero = heroRef.current;

    if (!hero) {
      return;
    }

    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (reducedMotion) {
      hero.classList.add("cc-bh-ready");
      return;
    }

    hero.classList.add("cc-bh-motion");

    let hasPlayed = false;
    let ticking = false;

    const startSequence = () => {
      if (hasPlayed) {
        return;
      }

      hasPlayed = true;

      hero.classList.remove("cc-bh-ready");

      /*
       * Two animation frames guarantee that every
       * entrance starts from the hidden state.
       */
      window.requestAnimationFrame(() => {
        window.requestAnimationFrame(() => {
          hero.classList.add("cc-bh-ready");
        });
      });
    };

    const resetSequence = () => {
      if (!hasPlayed) {
        return;
      }

      hasPlayed = false;

      hero.classList.remove("cc-bh-ready");
    };

    const checkHeroPosition = () => {
      const rect = hero.getBoundingClientRect();
      const viewportHeight = window.innerHeight;

      /*
       * Play only when the Hero actually enters the screen.
       * This works while scrolling down AND scrolling back up.
       */
      const isVisible =
        rect.bottom > 40 &&
        rect.top < viewportHeight - 40;

      /*
       * Reset only when the complete Hero is outside
       * the viewport. No flashing while reading the Hero.
       */
      const isCompletelyOutside =
        rect.bottom <= 0 ||
        rect.top >= viewportHeight;

      if (isVisible) {
        startSequence();
      } else if (isCompletelyOutside) {
        resetSequence();
      }

      ticking = false;
    };

    const handleScroll = () => {
      if (ticking) {
        return;
      }

      ticking = true;

      window.requestAnimationFrame(
        checkHeroPosition,
      );
    };

    /*
     * Hide first, then play on initial page load.
     */
    hero.classList.remove("cc-bh-ready");

    window.requestAnimationFrame(() => {
      window.requestAnimationFrame(() => {
        checkHeroPosition();
      });
    });

    window.addEventListener(
      "scroll",
      handleScroll,
      {
        passive: true,
      },
    );

    window.addEventListener(
      "resize",
      handleScroll,
      {
        passive: true,
      },
    );

    window.addEventListener(
      "pageshow",
      handleScroll,
    );

    return () => {
      window.removeEventListener(
        "scroll",
        handleScroll,
      );

      window.removeEventListener(
        "resize",
        handleScroll,
      );

      window.removeEventListener(
        "pageshow",
        handleScroll,
      );
    };
  }, []);

  /* CC_BLOG_MOBILE_RAIL_AUTOPLAY_START */
  useEffect(() => {
    const rail = railRef.current;

    if (!rail) {
      return;
    }

    const phoneQuery = window.matchMedia(
      "(max-width: 600px)",
    );

    const reducedMotionQuery = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    );

    let intervalId: number | null = null;
    let isVisible = false;
    let activeIndex = 0;

    const stopAutoSlide = () => {
      if (intervalId !== null) {
        window.clearInterval(intervalId);
        intervalId = null;
      }
    };

    const startAutoSlide = () => {
      stopAutoSlide();

      if (
        !phoneQuery.matches ||
        reducedMotionQuery.matches ||
        !isVisible ||
        document.hidden
      ) {
        return;
      }

      const items = Array.from(
        rail.children,
      ) as HTMLElement[];

      if (items.length < 2) {
        return;
      }

      intervalId = window.setInterval(() => {
        activeIndex =
          (activeIndex + 1) %
          items.length;

        rail.scrollTo({
          left:
            activeIndex === 0
              ? 0
              : items[activeIndex].offsetLeft,
          behavior: "smooth",
        });
      }, 2600);
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisible =
          Boolean(entry?.isIntersecting);

        if (isVisible) {
          startAutoSlide();
        } else {
          stopAutoSlide();
        }
      },
      {
        threshold: 0.18,
      },
    );

    const handleMediaChange = () => {
      if (!phoneQuery.matches) {
        activeIndex = 0;
        rail.scrollLeft = 0;
      }

      startAutoSlide();
    };

    const handleVisibilityChange = () => {
      startAutoSlide();
    };

    observer.observe(rail);

    phoneQuery.addEventListener(
      "change",
      handleMediaChange,
    );

    reducedMotionQuery.addEventListener(
      "change",
      handleMediaChange,
    );

    document.addEventListener(
      "visibilitychange",
      handleVisibilityChange,
    );

    return () => {
      stopAutoSlide();
      observer.disconnect();

      phoneQuery.removeEventListener(
        "change",
        handleMediaChange,
      );

      reducedMotionQuery.removeEventListener(
        "change",
        handleMediaChange,
      );

      document.removeEventListener(
        "visibilitychange",
        handleVisibilityChange,
      );
    };
  }, []);
  /* CC_BLOG_MOBILE_RAIL_AUTOPLAY_END */
  return (
    <section
      ref={heroRef}
      id="blog-hero"
      className="cc-bh"
      aria-labelledby="cc-bh-heading"
    >
      <div className="cc-bh-stage">
        <div className="cc-bh-kicker cc-bh-mobile-kicker">
          <span className="cc-bh-kicker-dot" />

          <strong>
            CITY COOLIES INSIGHTS
          </strong>
        </div>
        <div
          className="cc-bh-background"
          aria-hidden="true"
        />

        <div
          className="cc-bh-atmosphere"
          aria-hidden="true"
        >
          <span className="cc-bh-light cc-bh-light-one" />
          <span className="cc-bh-light cc-bh-light-two" />

          <span className="cc-bh-particle cc-bh-particle-one" />
          <span className="cc-bh-particle cc-bh-particle-two" />
          <span className="cc-bh-particle cc-bh-particle-three" />
        </div>

        <span
          className="cc-bh-opening-sweep"
          aria-hidden="true"
        />

        <div className="cc-bh-main">

          <div className="cc-bh-kicker">
            <span className="cc-bh-kicker-dot" />

            <strong>
              CITY COOLIES INSIGHTS
            </strong>
          </div>

          <h1 id="cc-bh-heading">
            <span>
              Smart Property Care
            </span>

            <span>
              Starts With
            </span>

            <span className="cc-bh-heading-red">
              Better Knowledge.
            </span>
          </h1>

          <p className="cc-bh-description">
            Practical guides, maintenance advice,
            renovation ideas and professional service
            insights from City Coolies—created to help
            property owners make better decisions.
          </p>

          <div
            className="cc-bh-topics"
            aria-label="Blog topics"
          >
            <span className="cc-bh-topic">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                aria-hidden="true"
              >
                <path
                  d="M3.5 11 12 4l8.5 7"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />

                <path
                  d="M5.8 10.2V20h4.3v-5.3h3.8V20h4.3v-9.8"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>

              <span>
                Property Care
              </span>
            </span>

            <span className="cc-bh-topic">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                aria-hidden="true"
              >
                <path
                  d="m14.8 5.1 4.1 4.1M13.2 6.7l4.1 4.1M5.4 18.6l4.7-4.7M4 20l1.4-1.4"
                  stroke="currentColor"
                  strokeWidth="1.7"
                  strokeLinecap="round"
                />

                <path
                  d="M10.7 4.2a4.7 4.7 0 0 0-5.9 5.9l9.1 9.1a2.2 2.2 0 0 0 3.1-3.1L8 7"
                  stroke="currentColor"
                  strokeWidth="1.7"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>

              <span>
                Home Maintenance
              </span>
            </span>

            <span className="cc-bh-topic">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                aria-hidden="true"
              >
                <path
                  d="M4 7.5h11.7v5H4z"
                  stroke="currentColor"
                  strokeWidth="1.7"
                  strokeLinejoin="round"
                />

                <path
                  d="M15.7 10h2.4v6H12v4"
                  stroke="currentColor"
                  strokeWidth="1.7"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />

                <path
                  d="M12 20h-2"
                  stroke="currentColor"
                  strokeWidth="1.7"
                  strokeLinecap="round"
                />
              </svg>

              <span>
                Renovation
              </span>
            </span>

            <span className="cc-bh-topic">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                aria-hidden="true"
              >
                <path
                  d="M9 4h6M10 4v3l-2.8 4.5A6 6 0 0 0 12.3 20h-.6a6 6 0 0 0 5.1-8.5L14 7V4"
                  stroke="currentColor"
                  strokeWidth="1.7"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />

                <path
                  d="M8.6 14h6.8"
                  stroke="currentColor"
                  strokeWidth="1.7"
                  strokeLinecap="round"
                />
              </svg>

              <span>
                Cleaning Tips
              </span>
            </span>

            <span className="cc-bh-topic">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                aria-hidden="true"
              >
                <circle
                  cx="9"
                  cy="7"
                  r="3"
                  stroke="currentColor"
                  strokeWidth="1.7"
                />

                <path
                  d="M3.8 17.5c.8-3 2.5-4.5 5.2-4.5s4.4 1.5 5.2 4.5"
                  stroke="currentColor"
                  strokeWidth="1.7"
                  strokeLinecap="round"
                />

                <path
                  d="m17.5 8 .7 1.6 1.8.2-1.3 1.2.4 1.8-1.6-.9-1.6.9.4-1.8-1.3-1.2 1.8-.2.7-1.6Z"
                  stroke="currentColor"
                  strokeWidth="1.4"
                  strokeLinejoin="round"
                />
              </svg>

              <span>
                Expert Guides
              </span>
            </span>
          </div>

          <div className="cc-bh-actions">
            <Link
              href="#blog-featured"
              className="cc-bh-primary"
            >
              <span>
                Explore Articles
              </span>

              <i aria-hidden="true">
                →
              </i>
            </Link>

            <Link
              href="/services"
              className="cc-bh-secondary"
            >
              <span>
                Explore Services
              </span>

              <i aria-hidden="true">
                →
              </i>
            </Link>
          </div>
        </div>

        <div ref={railRef} className="cc-bh-rail">
          <div className="cc-bh-rail-item">
            <span className="cc-bh-rail-icon">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                aria-hidden="true"
              >
                <path
                  d="M5 5h14v11H9l-4 3V5Z"
                  stroke="currentColor"
                  strokeWidth="1.7"
                  strokeLinejoin="round"
                />

                <path
                  d="m9 10 2 2 4-4"
                  stroke="currentColor"
                  strokeWidth="1.7"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>

            <span>
              <strong>
                Practical Insights
              </strong>

              <small>
                Useful property-care guidance.
              </small>
            </span>
          </div>

          <div className="cc-bh-rail-item">
            <span className="cc-bh-rail-icon">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                aria-hidden="true"
              >
                <path
                  d="M7 3h10v4H7zM5 7h14v13H5z"
                  stroke="currentColor"
                  strokeWidth="1.7"
                  strokeLinejoin="round"
                />

                <path
                  d="M8 11h8M8 15h5"
                  stroke="currentColor"
                  strokeWidth="1.7"
                  strokeLinecap="round"
                />
              </svg>
            </span>

            <span>
              <strong>
                Actionable Advice
              </strong>

              <small>
                Clear ideas you can use.
              </small>
            </span>
          </div>

          <div className="cc-bh-rail-item">
            <span className="cc-bh-rail-icon">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                aria-hidden="true"
              >
                <path
                  d="M12 3v3M12 18v3M3 12h3M18 12h3"
                  stroke="currentColor"
                  strokeWidth="1.7"
                  strokeLinecap="round"
                />

                <circle
                  cx="12"
                  cy="12"
                  r="5"
                  stroke="currentColor"
                  strokeWidth="1.7"
                />
              </svg>
            </span>

            <span>
              <strong>
                Better Planning
              </strong>

              <small>
                Make informed property decisions.
              </small>
            </span>
          </div>

          <div className="cc-bh-rail-item">
            <span className="cc-bh-rail-icon">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                aria-hidden="true"
              >
                <path
                  d="M12 3 5 6v5c0 4.5 2.7 7.6 7 10 4.3-2.4 7-5.5 7-10V6l-7-3Z"
                  stroke="currentColor"
                  strokeWidth="1.7"
                  strokeLinejoin="round"
                />

                <path
                  d="m9 12 2 2 4-4"
                  stroke="currentColor"
                  strokeWidth="1.7"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>

            <span>
              <strong>
                Property Knowledge
              </strong>

              <small>
                Learn before the work begins.
              </small>
            </span>
          </div>
        </div>
      </div>

      <style>{`
        .cc-bh {
          --red: #f21d32;
          --red-dark: #d70820;
          --ink: #181b20;
          --body: #555b65;

          position: relative;
          width: 100%;

          overflow: hidden;

          background:
            #fff7f9;
        }

        .cc-bh-stage {
          position: relative;
          isolation: isolate;

          width: 100%;

          min-height: 680px;

          overflow: hidden;

          background:
            #fff7f9;
        }

        /*
         * EXACT SUPPLIED DESKTOP BACKGROUND
         */

        .cc-bh-background {
          position: absolute;
          inset: 0;
          z-index: -5;

          background-image:
            url("/glassy_pink_orbital_learning_hub.png");

          background-repeat:
            no-repeat;

          background-position: center center;

          /*
           * Show the complete supplied desktop banner.
           * No cover zoom and no cropping.
           */
          background-size: 100% 100%;

          transform: none !important;

          scale: 1 !important;

          animation: none !important;
        }

        /*
         * Soft readability layer.
         * The original image stays fully visible.
         */

        .cc-bh-stage::after {
          position: absolute;
          inset: 0;
          z-index: -4;

          content: "";

          pointer-events: none;

          background:
            linear-gradient(
              90deg,
              rgba(255,255,255,.34) 0%,
              rgba(255,255,255,.12) 33%,
              rgba(255,255,255,0) 58%
            );
        }

        /*
         * FIRST: THE WHOLE HERO OPENS
         */

        .cc-bh-motion
        .cc-bh-stage {
          opacity: .04;

          clip-path:
            inset(
              49% 0 49% 0
            );

          filter:
            blur(14px)
            brightness(1.08);

          transform:
            scale(.99);
        }

        .cc-bh-motion.cc-bh-ready
        .cc-bh-stage {
          animation:
            ccBhHeroOpen
            .90s
            cubic-bezier(.16,1,.3,1)
            forwards;
        }

        /*
         * BACKGROUND MOTION
         */

        .cc-bh-atmosphere {
          position: absolute;
          inset: 0;
          z-index: -2;

          overflow: hidden;

          pointer-events: none;
        }

        .cc-bh-light {
          position: absolute;

          height: 1px;

          opacity: .22;

          background:
            linear-gradient(
              90deg,
              transparent,
              rgba(255,255,255,.98),
              rgba(242,29,50,.22),
              transparent
            );

          filter:
            drop-shadow(
              0 0 6px
              rgba(242,29,50,.2)
            );
        }

        .cc-bh-light-one {
          top: 24%;
          right: 1%;

          width: 48%;

          transform:
            rotate(-7deg);

          animation:
            ccBhLightOne
            7s
            ease-in-out
            infinite
            alternate;
        }

        .cc-bh-light-two {
          right: 0;
          bottom: 23%;

          width: 39%;

          opacity: .13;

          transform:
            rotate(5deg);

          animation:
            ccBhLightTwo
            8s
            ease-in-out
            infinite
            alternate;
        }

        .cc-bh-particle {
          position: absolute;

          width: 5px;
          height: 5px;

          border-radius: 50%;

          background: white;

          box-shadow:
            0 0 8px white,
            0 0 17px
            rgba(242,29,50,.5);
        }

        .cc-bh-particle-one {
          top: 17%;
          right: 13%;

          animation:
            ccBhParticleOne
            5s
            ease-in-out
            infinite;
        }

        .cc-bh-particle-two {
          top: 58%;
          right: 24%;

          width: 3px;
          height: 3px;

          animation:
            ccBhParticleTwo
            5.7s
            ease-in-out
            infinite;
        }

        .cc-bh-particle-three {
          right: 7%;
          bottom: 20%;

          width: 4px;
          height: 4px;

          animation:
            ccBhParticleThree
            4.8s
            ease-in-out
            infinite;
        }

        .cc-bh-opening-sweep {
          position: absolute;

          top: -70%;
          left: -24%;

          z-index: 40;

          width: 7%;
          height: 240%;

          opacity: 0;

          pointer-events: none;

          background:
            linear-gradient(
              90deg,
              transparent,
              rgba(255,255,255,.98),
              rgba(255,148,167,.45),
              transparent
            );

          filter:
            blur(8px);

          transform:
            rotate(18deg);
        }

        .cc-bh-ready
        .cc-bh-opening-sweep {
          animation:
            ccBhSweep
            2.1s
            ease
            .15s
            forwards;
        }

        /*
         * MAIN HERO CONTENT
         */

        .cc-bh-main {
          position: relative;
          z-index: 5;

          width:
            min(
              100%,
              1540px
            );

          margin: 0 auto;

          padding:
            34px
            clamp(42px,5vw,80px)
            150px;
        }

        /*
         * BREADCRUMB
         */

        .cc-bh-breadcrumb {
          display: flex;
          align-items: center;

          gap: 12px;

          color:
            var(--ink);

          font-size: 13px;
          font-weight: 650;
        }

        .cc-bh-breadcrumb a {
          color:
            var(--ink);

          text-decoration: none;
        }

        .cc-bh-breadcrumb > span {
          color:
            var(--red);

          font-size: 19px;
        }

        .cc-bh-breadcrumb strong {
          color:
            var(--red);

          font-weight: 750;
        }

        .cc-bh-motion
        .cc-bh-breadcrumb {
          opacity: 0;

          filter: blur(5px);

          transform:
            translateY(-13px);
        }

        .cc-bh-ready
        .cc-bh-breadcrumb {
          animation:
            ccBhRevealDown
            .52s
            cubic-bezier(.16,1,.3,1)
            .55s
            forwards;
        }

        /*
         * KICKER
         */

        .cc-bh-kicker {
          display: inline-flex;
          align-items: center;

          gap: 10px;

          min-height: 37px;

          margin-top: 25px;

          padding:
            0
            17px;

          border:
            1px solid
            rgba(242,29,50,.17);

          border-radius:
            999px;

          color:
            var(--red);

          background:
            rgba(255,255,255,.55);

          backdrop-filter:
            blur(8px);
        }

        .cc-bh-kicker-dot {
          width: 7px;
          height: 7px;

          border-radius: 50%;

          background:
            var(--red);

          box-shadow:
            0 0 11px
            rgba(242,29,50,.45);
        }

        .cc-bh-kicker strong {
          font-size: 10px;
          font-weight: 850;

          letter-spacing:
            .04em;
        }

        .cc-bh-motion
        .cc-bh-kicker {
          opacity: 0;

          filter: blur(6px);

          transform:
            translateX(-22px);
        }

        .cc-bh-ready
        .cc-bh-kicker {
          animation:
            ccBhRevealLeft
            .56s
            cubic-bezier(.16,1,.3,1)
            .68s
            forwards;
        }

        /*
         * TITLE
         */

        .cc-bh-main h1 {
          max-width: 650px;

          margin:
            19px
            0
            0;

          color:
            #17191d;

          font-family:
            Georgia,
            "Times New Roman",
            serif;

          font-size:
            clamp(
              56px,
              4.7vw,
              78px
            );

          font-weight: 400;

          line-height: .91;

          letter-spacing:
            -.045em;
        }

        .cc-bh-main h1 > span {
          display: block;
        }

        .cc-bh-heading-red {
          color:
            var(--red);
        }

        .cc-bh-motion
        .cc-bh-main h1 > span {
          opacity: 0;

          filter: blur(11px);

          transform:
            translateY(40px);
        }

        .cc-bh-ready
        .cc-bh-main h1
        > span:nth-child(1) {
          animation:
            ccBhTitle
            .72s
            cubic-bezier(.16,1,.3,1)
            .82s
            forwards;
        }

        .cc-bh-ready
        .cc-bh-main h1
        > span:nth-child(2) {
          animation:
            ccBhTitle
            .72s
            cubic-bezier(.16,1,.3,1)
            .98s
            forwards;
        }

        .cc-bh-ready
        .cc-bh-main h1
        > span:nth-child(3) {
          animation:
            ccBhTitle
            .76s
            cubic-bezier(.16,1,.3,1)
            1.14s
            forwards;
        }

        /*
         * DESCRIPTION
         */

        .cc-bh-description {
          max-width: 510px;

          margin:
            20px
            0
            0;

          color:
            #545b65;

          font-size:
            clamp(
              13px,
              1.05vw,
              16px
            );

          font-weight: 480;

          line-height: 1.55;
        }

        .cc-bh-motion
        .cc-bh-description {
          opacity: 0;

          clip-path:
            inset(
              0 100% 0 0
            );

          filter:
            blur(4px);
        }

        .cc-bh-ready
        .cc-bh-description {
          animation:
            ccBhDescription
            .72s
            cubic-bezier(.16,1,.3,1)
            1.32s
            forwards;
        }

        /*
         * TOPICS
         */

        .cc-bh-topics {
          display: flex;
          align-items: center;
          flex-wrap: wrap;

          gap: 9px;

          max-width: 770px;

          margin-top: 23px;
        }

        .cc-bh-topic {
          display: inline-flex;
          align-items: center;

          gap: 8px;

          min-height: 37px;

          padding:
            0
            13px;

          border:
            1px solid
            rgba(242,29,50,.13);

          border-radius:
            999px;

          color:
            #30343b;

          font-size: 9px;
          font-weight: 700;

          background:
            rgba(255,255,255,.70);

          box-shadow:
            0 6px 17px
            rgba(100,0,15,.035);

          backdrop-filter:
            blur(8px);
        }

        .cc-bh-topic svg {
          width: 16px;
          height: 16px;

          flex: 0 0 auto;

          color:
            var(--red);
        }

        .cc-bh-motion
        .cc-bh-topic {
          opacity: 0;

          filter: blur(5px);

          transform:
            translateY(15px)
            scale(.95);
        }

        .cc-bh-ready
        .cc-bh-topic:nth-child(1) {
          animation:
            ccBhChip
            .48s
            cubic-bezier(.16,1,.3,1)
            1.47s
            forwards;
        }

        .cc-bh-ready
        .cc-bh-topic:nth-child(2) {
          animation:
            ccBhChip
            .48s
            cubic-bezier(.16,1,.3,1)
            1.56s
            forwards;
        }

        .cc-bh-ready
        .cc-bh-topic:nth-child(3) {
          animation:
            ccBhChip
            .48s
            cubic-bezier(.16,1,.3,1)
            1.65s
            forwards;
        }

        .cc-bh-ready
        .cc-bh-topic:nth-child(4) {
          animation:
            ccBhChip
            .48s
            cubic-bezier(.16,1,.3,1)
            1.74s
            forwards;
        }

        .cc-bh-ready
        .cc-bh-topic:nth-child(5) {
          animation:
            ccBhChip
            .48s
            cubic-bezier(.16,1,.3,1)
            1.83s
            forwards;
        }

        /*
         * BUTTONS
         */

        .cc-bh-actions {
          display: flex;
          align-items: center;
          flex-wrap: wrap;

          gap: 11px;

          margin-top: 22px;
        }

        .cc-bh-motion
        .cc-bh-actions {
          opacity: 0;

          filter: blur(6px);

          transform:
            translateY(17px);
        }

        .cc-bh-ready
        .cc-bh-actions {
          animation:
            ccBhButtons
            .60s
            cubic-bezier(.16,1,.3,1)
            1.96s
            forwards;
        }

        .cc-bh-primary,
        .cc-bh-secondary {
          display: inline-flex;
          align-items: center;
          justify-content:
            space-between;

          min-height: 48px;

          border-radius:
            999px;

          font-size: 10.5px;
          font-weight: 800;

          text-decoration: none;

          transition:
            transform .25s ease,
            box-shadow .25s ease;
        }

        .cc-bh-primary {
          gap: 30px;

          min-width: 208px;

          padding:
            0
            17px
            0
            23px;

          color: white;

          background:
            linear-gradient(
              100deg,
              #fb263b,
              #dc061f
            );

          box-shadow:
            0 14px 28px
            rgba(216,7,31,.21);
        }

        .cc-bh-primary:hover {
          transform:
            translateY(-3px);

          box-shadow:
            0 19px 36px
            rgba(216,7,31,.28);
        }

        .cc-bh-primary i,
        .cc-bh-secondary i {
          font-size: 17px;
          font-style: normal;
        }

        .cc-bh-secondary {
          gap: 27px;

          min-width: 190px;

          padding:
            0
            17px
            0
            23px;

          border:
            1px solid
            rgba(39,43,49,.11);

          color:
            #25282e;

          background:
            rgba(255,255,255,.70);

          backdrop-filter:
            blur(9px);
        }

        .cc-bh-secondary:hover {
          transform:
            translateY(-3px);

          box-shadow:
            0 13px 27px
            rgba(44,0,8,.07);
        }

        /*
         * BOTTOM INFORMATION RAIL
         */

        .cc-bh-rail {
          position: absolute;

          right:
            clamp(
              34px,
              5vw,
              80px
            );

          bottom: 21px;

          left:
            clamp(
              34px,
              5vw,
              80px
            );

          z-index: 8;

          display: grid;

          grid-template-columns:
            repeat(4,1fr);

          min-height: 98px;

          overflow: hidden;

          border:
            1px solid
            rgba(255,255,255,.78);

          border-radius: 19px;

          background:
            rgba(255,255,255,.78);

          backdrop-filter:
            blur(18px);

          box-shadow:
            0 17px 45px
            rgba(89,0,14,.07),
            inset
            0 1px 0
            white;
        }

        .cc-bh-motion
        .cc-bh-rail {
          opacity: 0;

          filter: blur(8px);

          transform:
            translateY(24px)
            scale(.985);
        }

        .cc-bh-ready
        .cc-bh-rail {
          animation:
            ccBhRail
            .68s
            cubic-bezier(.16,1,.3,1)
            2.10s
            forwards;
        }

        .cc-bh-rail-item {
          position: relative;

          display: flex;
          align-items: center;

          gap: 14px;

          min-width: 0;

          padding:
            17px
            24px;
        }

        .cc-bh-rail-item:not(
          :last-child
        )::after {
          position: absolute;

          top: 23px;
          right: 0;
          bottom: 23px;

          width: 1px;

          content: "";

          background:
            rgba(242,29,50,.09);
        }

        .cc-bh-rail-icon {
          display: grid;

          width: 44px;
          height: 44px;

          flex: 0 0 auto;

          place-items: center;

          border:
            1px solid
            rgba(242,29,50,.12);

          border-radius: 14px;

          color:
            var(--red);

          background:
            linear-gradient(
              145deg,
              #fff,
              #fff0f3
            );
        }

        .cc-bh-rail-icon svg {
          width: 20px;
          height: 20px;
        }

        .cc-bh-rail-item > span:last-child {
          display: flex;
          flex-direction: column;

          gap: 4px;

          min-width: 0;
        }

        .cc-bh-rail-item strong {
          color:
            #25292f;

          font-size: 10px;
          font-weight: 800;
        }

        .cc-bh-rail-item small {
          color:
            #656b74;

          font-size: 8px;

          line-height: 1.45;
        }

        .cc-bh-motion
        .cc-bh-rail-item {
          opacity: 0;

          transform:
            translateY(12px);
        }

        .cc-bh-ready
        .cc-bh-rail-item:nth-child(1) {
          animation:
            ccBhRailItem
            .46s
            ease
            2.24s
            forwards;
        }

        .cc-bh-ready
        .cc-bh-rail-item:nth-child(2) {
          animation:
            ccBhRailItem
            .46s
            ease
            2.34s
            forwards;
        }

        .cc-bh-ready
        .cc-bh-rail-item:nth-child(3) {
          animation:
            ccBhRailItem
            .46s
            ease
            2.44s
            forwards;
        }

        .cc-bh-ready
        .cc-bh-rail-item:nth-child(4) {
          animation:
            ccBhRailItem
            .46s
            ease
            2.54s
            forwards;
        }

        /*
         * ENTRY KEYFRAMES
         */

        @keyframes ccBhHeroOpen {
          from {
            opacity: .04;

            clip-path:
              inset(
                49% 0 49% 0
              );

            filter:
              blur(14px)
              brightness(1.08);

            transform:
              scale(.99);
          }

          to {
            opacity: 1;

            clip-path:
              inset(
                0 0 0 0
              );

            filter:
              blur(0)
              brightness(1);

            transform:
              scale(1);
          }
        }

        @keyframes ccBhRevealDown {
          to {
            opacity: 1;

            filter: blur(0);

            transform:
              translateY(0);
          }
        }

        @keyframes ccBhRevealLeft {
          to {
            opacity: 1;

            filter: blur(0);

            transform:
              translateX(0);
          }
        }

        @keyframes ccBhTitle {
          to {
            opacity: 1;

            filter: blur(0);

            transform:
              translateY(0);
          }
        }

        @keyframes ccBhDescription {
          to {
            opacity: 1;

            clip-path:
              inset(
                0 0 0 0
              );

            filter: blur(0);
          }
        }

        @keyframes ccBhChip {
          to {
            opacity: 1;

            filter: blur(0);

            transform:
              translateY(0)
              scale(1);
          }
        }

        @keyframes ccBhButtons {
          to {
            opacity: 1;

            filter: blur(0);

            transform:
              translateY(0);
          }
        }

        @keyframes ccBhRail {
          to {
            opacity: 1;

            filter: blur(0);

            transform:
              translateY(0)
              scale(1);
          }
        }

        @keyframes ccBhRailItem {
          to {
            opacity: 1;

            transform:
              translateY(0);
          }
        }

        /*
         * CONTINUOUS VIDEO FEEL
         */

        @keyframes ccBhSweep {
          0% {
            left: -24%;
            opacity: 0;
          }

          16% {
            opacity: .78;
          }

          100% {
            left: 120%;
            opacity: 0;
          }
        }

        @keyframes ccBhLightOne {
          to {
            opacity: .09;

            transform:
              rotate(-4deg)
              translateY(-17px);
          }
        }

        @keyframes ccBhLightTwo {
          to {
            opacity: .27;

            transform:
              rotate(2deg)
              translateY(14px);
          }
        }

        @keyframes ccBhParticleOne {
          50% {
            opacity: .4;

            transform:
              translate(-19px,15px);
          }
        }

        @keyframes ccBhParticleTwo {
          50% {
            opacity: .32;

            transform:
              translate(17px,-17px);
          }
        }

        @keyframes ccBhParticleThree {
          50% {
            opacity: .42;

            transform:
              translate(-13px,-14px);
          }
        }

        /*
         * TABLET
         */

        @media (
          max-width: 1100px
        ) {
          .cc-bh-stage {
            min-height: 720px;
          }

          .cc-bh-main {
            padding-left: 38px;
            padding-right: 38px;
          }

          .cc-bh-main h1 {
            max-width: 580px;

            font-size:
              clamp(
                50px,
                5vw,
                68px
              );
          }

          .cc-bh-rail {
            right: 34px;
            left: 34px;
          }

          .cc-bh-rail-item {
            padding:
              15px
              14px;
          }
        }

        /*
         * PHONE BACKGROUND
         */

        @media (
          max-width: 700px
        ) {
          .cc-bh-stage {
            min-height:
              1120px;

            background:
              #fff8fa;
          }

          .cc-bh-background {
            background-image:
              url("/glossy_pink_home_tech_concept.png");

            background-position:
              center top;

            /*
             * Show the complete supplied phone banner.
             * No cover zoom and no side cropping.
             */
            background-size:
              100% auto;

            transform:
              none !important;

            scale:
              1 !important;

            animation:
              none !important;
          }

          /*
           * Phone image has natural blank area on top.
           * Content lives there.
           */

          .cc-bh-stage::after {
            background:
              linear-gradient(
                180deg,
                rgba(255,255,255,.18) 0%,
                rgba(255,255,255,.03) 48%,
                transparent 68%
              );
          }

          .cc-bh-main {
            padding:
              22px
              17px
              290px;
          }

          .cc-bh-kicker {
            min-height: 36px;

            margin-top: 18px;

            padding:
              0
              14px;
          }

          .cc-bh-kicker strong {
            font-size: 8.5px;
          }

          .cc-bh-main h1 {
            max-width: 100%;

            margin-top: 16px;

            font-size:
              clamp(
                43px,
                12vw,
                58px
              );

            line-height: .92;
          }

          .cc-bh-description {
            max-width: 100%;

            margin-top: 17px;

            font-size: 12px;

            line-height: 1.58;
          }

          .cc-bh-topics {
            gap: 8px;

            margin-top: 18px;
          }

          .cc-bh-topic {
            min-height: 38px;

            padding:
              0
              12px;

            font-size: 8.5px;
          }

          .cc-bh-topic svg {
            width: 16px;
            height: 16px;
          }

          .cc-bh-actions {
            display: grid;

            grid-template-columns:
              1fr;

            gap: 8px;

            margin-top: 18px;

            max-width: 100%;
          }

          .cc-bh-primary,
          .cc-bh-secondary {
            width: 100%;

            min-width: 0;

            min-height: 50px;
          }

          /*
           * Rail stays below the generated phone visual.
           */

          .cc-bh-rail {
            right: 13px;
            bottom: 14px;
            left: 13px;

            grid-template-columns:
              1fr;

            min-height: 0;

            border-radius: 18px;
          }

          .cc-bh-rail-item {
            min-height: 69px;

            padding:
              11px
              14px;
          }

          .cc-bh-rail-item:not(
            :last-child
          )::after {
            top: auto;
            right: 14px;
            bottom: 0;
            left: 14px;

            width: auto;
            height: 1px;
          }

          .cc-bh-rail-icon {
            width: 39px;
            height: 39px;

            border-radius: 12px;
          }

          .cc-bh-rail-icon svg {
            width: 18px;
            height: 18px;
          }

          .cc-bh-rail-item strong {
            font-size: 9px;
          }

          .cc-bh-rail-item small {
            font-size: 7.5px;
          }

          /*
           * SAME ORDER ON PHONE:
           * HERO -> breadcrumb -> kicker -> title ->
           * text -> topics -> buttons -> rail.
           */

          .cc-bh-motion.cc-bh-ready
          .cc-bh-stage {
            animation-duration:
              .76s;
          }

          .cc-bh-ready
          .cc-bh-kicker {
            animation-delay:
              .56s;
          }

          .cc-bh-ready
          .cc-bh-main h1
          > span:nth-child(1) {
            animation-delay:
              .68s;
          }

          .cc-bh-ready
          .cc-bh-main h1
          > span:nth-child(2) {
            animation-delay:
              .81s;
          }

          .cc-bh-ready
          .cc-bh-main h1
          > span:nth-child(3) {
            animation-delay:
              .94s;
          }

          .cc-bh-ready
          .cc-bh-description {
            animation-delay:
              1.08s;
          }

          .cc-bh-ready
          .cc-bh-topic:nth-child(1) {
            animation-delay:
              1.20s;
          }

          .cc-bh-ready
          .cc-bh-topic:nth-child(2) {
            animation-delay:
              1.28s;
          }

          .cc-bh-ready
          .cc-bh-topic:nth-child(3) {
            animation-delay:
              1.36s;
          }

          .cc-bh-ready
          .cc-bh-topic:nth-child(4) {
            animation-delay:
              1.44s;
          }

          .cc-bh-ready
          .cc-bh-topic:nth-child(5) {
            animation-delay:
              1.52s;
          }

          .cc-bh-ready
          .cc-bh-actions {
            animation-delay:
              1.64s;
          }

          .cc-bh-ready
          .cc-bh-rail {
            animation-delay:
              1.82s;
          }

          .cc-bh-ready
          .cc-bh-rail-item:nth-child(1) {
            animation-delay:
              1.94s;
          }

          .cc-bh-ready
          .cc-bh-rail-item:nth-child(2) {
            animation-delay:
              2.03s;
          }

          .cc-bh-ready
          .cc-bh-rail-item:nth-child(3) {
            animation-delay:
              2.12s;
          }

          .cc-bh-ready
          .cc-bh-rail-item:nth-child(4) {
            animation-delay:
              2.21s;
          }

          /*
           * Do not animate/zoom the actual background.
           */

          .cc-bh-background {
            animation:
              none !important;

            scale:
              1 !important;
          }
        }

        @media (
          max-width: 390px
        ) {
          .cc-bh-stage {
            min-height:
              1080px;
          }

          .cc-bh-main h1 {
            font-size:
              clamp(
                39px,
                11.5vw,
                50px
              );
          }

          .cc-bh-main {
            padding-left: 14px;
            padding-right: 14px;
          }
        }

        /*
         * REDUCED MOTION
         */

        @media (
          prefers-reduced-motion:
          reduce
        ) {
          .cc-bh-stage,
          .cc-bh-kicker,
          .cc-bh-main h1 > span,
          .cc-bh-description,
          .cc-bh-topic,
          .cc-bh-actions,
          .cc-bh-rail,
          .cc-bh-rail-item {
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

          .cc-bh-opening-sweep,
          .cc-bh-light,
          .cc-bh-particle,
          .cc-bh-kicker-dot {
            animation:
              none !important;
          }
        }
      

/* === CC HERO CINEMATIC REPLAY V3 START === */

/*
 * ---------------------------------------------------------
 * HERO FIRST
 * ---------------------------------------------------------
 */

.cc-bh-motion:not(.cc-bh-ready)
.cc-bh-stage {
  opacity: .04 !important;

  clip-path:
    inset(
      49% 0 49% 0
    ) !important;

  filter:
    blur(14px)
    brightness(1.07) !important;

  transform:
    scale(.992) !important;
}

.cc-bh-motion.cc-bh-ready
.cc-bh-stage {
  animation:
    ccBhVideoStageOpen
    .82s
    cubic-bezier(.16,1,.3,1)
    both !important;
}


/*
 * ---------------------------------------------------------
 * 1 — INSIGHTS LABEL
 * ---------------------------------------------------------
 */

.cc-bh-motion:not(.cc-bh-ready)
.cc-bh-kicker {
  opacity: 0 !important;

  clip-path:
    inset(
      0 100% 0 0
    );

  filter:
    blur(7px);

  transform:
    translateX(-25px);
}

.cc-bh-ready
.cc-bh-kicker {
  animation:
    ccBhVideoKicker
    .55s
    cubic-bezier(.16,1,.3,1)
    .56s
    both !important;
}


/*
 * ---------------------------------------------------------
 * 2 / 3 / 4 — HEADING WRITES LINE BY LINE
 * ---------------------------------------------------------
 */

.cc-bh-motion:not(.cc-bh-ready)
.cc-bh-main h1 > span {
  opacity: 0 !important;

  clip-path:
    inset(
      0 100% 0 0
    );

  filter:
    blur(6px);

  transform:
    translateY(22px);
}

.cc-bh-ready
.cc-bh-main h1
> span:nth-child(1) {
  animation:
    ccBhVideoTitleWrite
    .74s
    cubic-bezier(.16,1,.3,1)
    .73s
    both !important;
}

.cc-bh-ready
.cc-bh-main h1
> span:nth-child(2) {
  animation:
    ccBhVideoTitleWrite
    .74s
    cubic-bezier(.16,1,.3,1)
    .93s
    both !important;
}

.cc-bh-ready
.cc-bh-main h1
> span:nth-child(3) {
  animation:
    ccBhVideoTitleWrite
    .80s
    cubic-bezier(.16,1,.3,1)
    1.13s
    both !important;
}


/*
 * ---------------------------------------------------------
 * 5 — DESCRIPTION WRITES AFTER TITLE
 * ---------------------------------------------------------
 */

.cc-bh-motion:not(.cc-bh-ready)
.cc-bh-description {
  opacity: 0 !important;

  clip-path:
    inset(
      0 100% 0 0
    );

  filter:
    blur(4px);

  transform:
    translateY(10px);
}

.cc-bh-ready
.cc-bh-description {
  animation:
    ccBhVideoParagraphWrite
    .75s
    cubic-bezier(.16,1,.3,1)
    1.38s
    both !important;
}


/*
 * ---------------------------------------------------------
 * 6 — TOPICS ONE BY ONE
 * ---------------------------------------------------------
 */

.cc-bh-motion:not(.cc-bh-ready)
.cc-bh-topic {
  opacity: 0 !important;

  filter:
    blur(7px);

  transform:
    translateY(17px)
    scale(.91);
}

.cc-bh-ready
.cc-bh-topic:nth-child(1) {
  animation:
    ccBhVideoChip
    .45s
    cubic-bezier(.16,1,.3,1)
    1.58s
    both !important;
}

.cc-bh-ready
.cc-bh-topic:nth-child(2) {
  animation:
    ccBhVideoChip
    .45s
    cubic-bezier(.16,1,.3,1)
    1.68s
    both !important;
}

.cc-bh-ready
.cc-bh-topic:nth-child(3) {
  animation:
    ccBhVideoChip
    .45s
    cubic-bezier(.16,1,.3,1)
    1.78s
    both !important;
}

.cc-bh-ready
.cc-bh-topic:nth-child(4) {
  animation:
    ccBhVideoChip
    .45s
    cubic-bezier(.16,1,.3,1)
    1.88s
    both !important;
}

.cc-bh-ready
.cc-bh-topic:nth-child(5) {
  animation:
    ccBhVideoChip
    .45s
    cubic-bezier(.16,1,.3,1)
    1.98s
    both !important;
}


/*
 * ---------------------------------------------------------
 * 7 — CTA BUTTONS LAST
 * ---------------------------------------------------------
 */

.cc-bh-motion:not(.cc-bh-ready)
.cc-bh-actions {
  opacity: 0 !important;

  filter:
    blur(8px);

  transform:
    translateY(19px)
    scale(.96);
}

.cc-bh-ready
.cc-bh-actions {
  animation:
    ccBhVideoActions
    .60s
    cubic-bezier(.16,1,.3,1)
    2.15s
    both !important;
}


/*
 * If the bottom rail still exists,
 * it loads after the buttons.
 */

.cc-bh-motion:not(.cc-bh-ready)
.cc-bh-rail {
  opacity: 0 !important;

  filter:
    blur(9px);

  transform:
    translateY(24px)
    scale(.98);
}

.cc-bh-ready
.cc-bh-rail {
  animation:
    ccBhVideoRail
    .64s
    cubic-bezier(.16,1,.3,1)
    2.34s
    both !important;
}

.cc-bh-motion:not(.cc-bh-ready)
.cc-bh-rail-item {
  opacity: 0 !important;

  transform:
    translateY(12px);
}

.cc-bh-ready
.cc-bh-rail-item:nth-child(1) {
  animation:
    ccBhVideoRailItem
    .40s
    ease
    2.47s
    both !important;
}

.cc-bh-ready
.cc-bh-rail-item:nth-child(2) {
  animation:
    ccBhVideoRailItem
    .40s
    ease
    2.56s
    both !important;
}

.cc-bh-ready
.cc-bh-rail-item:nth-child(3) {
  animation:
    ccBhVideoRailItem
    .40s
    ease
    2.65s
    both !important;
}

.cc-bh-ready
.cc-bh-rail-item:nth-child(4) {
  animation:
    ccBhVideoRailItem
    .40s
    ease
    2.74s
    both !important;
}


/*
 * Background image NEVER zooms.
 */

.cc-bh-background {
  transform:
    none !important;

  scale:
    1 !important;

  animation:
    none !important;
}


/*
 * ---------------------------------------------------------
 * CINEMATIC KEYFRAMES
 * ---------------------------------------------------------
 */

@keyframes ccBhVideoStageOpen {
  0% {
    opacity: .04;

    clip-path:
      inset(
        49% 0 49% 0
      );

    filter:
      blur(14px)
      brightness(1.07);

    transform:
      scale(.992);
  }

  100% {
    opacity: 1;

    clip-path:
      inset(
        0 0 0 0
      );

    filter:
      blur(0)
      brightness(1);

    transform:
      scale(1);
  }
}

@keyframes ccBhVideoKicker {
  0% {
    opacity: 0;

    clip-path:
      inset(
        0 100% 0 0
      );

    filter:
      blur(7px);

    transform:
      translateX(-25px);
  }

  100% {
    opacity: 1;

    clip-path:
      inset(
        0 0 0 0
      );

    filter:
      blur(0);

    transform:
      translateX(0);
  }
}

@keyframes ccBhVideoTitleWrite {
  0% {
    opacity: 0;

    clip-path:
      inset(
        0 100% 0 0
      );

    filter:
      blur(6px);

    transform:
      translateY(22px);
  }

  15% {
    opacity: 1;
  }

  100% {
    opacity: 1;

    clip-path:
      inset(
        0 0 0 0
      );

    filter:
      blur(0);

    transform:
      translateY(0);
  }
}

@keyframes ccBhVideoParagraphWrite {
  0% {
    opacity: 0;

    clip-path:
      inset(
        0 100% 0 0
      );

    filter:
      blur(4px);

    transform:
      translateY(10px);
  }

  15% {
    opacity: 1;
  }

  100% {
    opacity: 1;

    clip-path:
      inset(
        0 0 0 0
      );

    filter:
      blur(0);

    transform:
      translateY(0);
  }
}

@keyframes ccBhVideoChip {
  0% {
    opacity: 0;

    filter:
      blur(7px);

    transform:
      translateY(17px)
      scale(.91);
  }

  100% {
    opacity: 1;

    filter:
      blur(0);

    transform:
      translateY(0)
      scale(1);
  }
}

@keyframes ccBhVideoActions {
  0% {
    opacity: 0;

    filter:
      blur(8px);

    transform:
      translateY(19px)
      scale(.96);
  }

  100% {
    opacity: 1;

    filter:
      blur(0);

    transform:
      translateY(0)
      scale(1);
  }
}

@keyframes ccBhVideoRail {
  to {
    opacity: 1;

    filter:
      blur(0);

    transform:
      translateY(0)
      scale(1);
  }
}

@keyframes ccBhVideoRailItem {
  to {
    opacity: 1;

    transform:
      translateY(0);
  }
}


/*
 * ---------------------------------------------------------
 * PHONE — SAME SEQUENCE, SLIGHTLY FASTER
 * ---------------------------------------------------------
 */

@media (max-width: 700px) {
  .cc-bh-motion.cc-bh-ready
  .cc-bh-stage {
    animation-duration:
      .72s !important;
  }

  .cc-bh-ready
  .cc-bh-kicker {
    animation-delay:
      .45s !important;
  }

  .cc-bh-ready
  .cc-bh-main h1
  > span:nth-child(1) {
    animation-delay:
      .58s !important;
  }

  .cc-bh-ready
  .cc-bh-main h1
  > span:nth-child(2) {
    animation-delay:
      .72s !important;
  }

  .cc-bh-ready
  .cc-bh-main h1
  > span:nth-child(3) {
    animation-delay:
      .86s !important;
  }

  .cc-bh-ready
  .cc-bh-description {
    animation-delay:
      1.03s !important;
  }

  .cc-bh-ready
  .cc-bh-topic:nth-child(1) {
    animation-delay:
      1.19s !important;
  }

  .cc-bh-ready
  .cc-bh-topic:nth-child(2) {
    animation-delay:
      1.27s !important;
  }

  .cc-bh-ready
  .cc-bh-topic:nth-child(3) {
    animation-delay:
      1.35s !important;
  }

  .cc-bh-ready
  .cc-bh-topic:nth-child(4) {
    animation-delay:
      1.43s !important;
  }

  .cc-bh-ready
  .cc-bh-topic:nth-child(5) {
    animation-delay:
      1.51s !important;
  }

  .cc-bh-ready
  .cc-bh-actions {
    animation-delay:
      1.67s !important;
  }

  .cc-bh-ready
  .cc-bh-rail {
    animation-delay:
      1.83s !important;
  }

  .cc-bh-ready
  .cc-bh-rail-item:nth-child(1) {
    animation-delay:
      1.94s !important;
  }

  .cc-bh-ready
  .cc-bh-rail-item:nth-child(2) {
    animation-delay:
      2.02s !important;
  }

  .cc-bh-ready
  .cc-bh-rail-item:nth-child(3) {
    animation-delay:
      2.10s !important;
  }

  .cc-bh-ready
  .cc-bh-rail-item:nth-child(4) {
    animation-delay:
      2.18s !important;
  }
}


/*
 * Accessibility.
 */

@media (
  prefers-reduced-motion:
  reduce
) {
  .cc-bh-stage,
  .cc-bh-kicker,
  .cc-bh-main h1 > span,
  .cc-bh-description,
  .cc-bh-topic,
  .cc-bh-actions,
  .cc-bh-rail,
  .cc-bh-rail-item {
    opacity:
      1 !important;

    clip-path:
      none !important;

    filter:
      none !important;

    transform:
      none !important;

    animation:
      none !important;
  }
}

/* === CC HERO CINEMATIC REPLAY V3 END === */

/*
 * CC_BLOG_MOBILE_BANNER_FIRST_START
 * Phone only: banner first, content and CTA below it.
 */
@media (max-width: 700px) {
  .cc-bh,
  .cc-bh-stage {
    background:
      linear-gradient(
        180deg,
        #fff4f7 0%,
        #ffeef2 52%,
        #fff7f9 100%
      );
  }

  .cc-bh-stage {
    min-height: auto;
    overflow: hidden;
  }

  /*
   * The phone banner becomes a separate proportional block.
   * Original ratio: 895 × 601.
   */
  .cc-bh-background {
    position: relative;
    inset: auto;
    z-index: 1;

    display: block;

    width: 100%;
    height: auto;
    aspect-ratio: 895 / 601;

    background-image:
      url("/glossy_pink_home_tech_concept.png");

    background-repeat:
      no-repeat;

    background-position:
      center center;

    background-size:
      contain;

    background-color:
      #fff2f5;

    transform:
      none !important;

    scale:
      1 !important;

    animation:
      none !important;
  }

  /*
   * Remove the readability layer from the separated banner.
   */
  .cc-bh-stage::after {
    display: none;
  }

  /*
   * Keep decorative atmosphere only over the banner area.
   */
  .cc-bh-atmosphere {
    top: 0;
    right: 0;
    bottom: auto;
    left: 0;

    height:
      calc(
        100vw *
        601 /
        895
      );
  }

  /*
   * Content starts after the banner on its own pink background.
   */
  .cc-bh-main {
    position: relative;
    z-index: 5;

    width: 100%;

    padding:
      28px
      17px
      30px;

    background:
      radial-gradient(
        circle at 92% 8%,
        rgba(242, 29, 50, 0.09),
        transparent 34%
      ),
      radial-gradient(
        circle at 8% 88%,
        rgba(255, 148, 167, 0.12),
        transparent 38%
      ),
      linear-gradient(
        145deg,
        #fff8fa 0%,
        #ffedf1 55%,
        #fff5f7 100%
      );
  }

  .cc-bh-kicker {
    margin-top: 0;
  }

  /*
   * Topics and CTA remain inside the content area.
   */
  .cc-bh-topics {
    position: relative;
    z-index: 6;
  }

  .cc-bh-actions {
    position: relative;
    z-index: 6;

    margin-bottom: 0;
  }

  /*
   * Information rail follows the content naturally.
   */
  .cc-bh-rail {
    position: relative;

    right: auto;
    bottom: auto;
    left: auto;

    width:
      calc(
        100% -
        26px
      );

    margin:
      14px
      13px
      16px;

    background:
      rgba(
        255,
        255,
        255,
        0.82
      );
  }
}
/* CC_BLOG_MOBILE_BANNER_FIRST_END */

/*
 * CC_BLOG_MOBILE_FINAL_ORDER_START
 * Phone order:
 * insights label, full-width banner, content, CTA and information rail.
 */

.cc-bh-mobile-kicker {
  display: none;
}

@media (max-width: 700px) {
  .cc-bh,
  .cc-bh-stage {
    background:
      linear-gradient(
        180deg,
        #fff6f8 0%,
        #ffecef 58%,
        #fff5f7 100%
      );
  }

  .cc-bh-stage {
    display: flex;
    flex-direction: column;

    width: 100%;
    min-height: auto;

    overflow: hidden;
  }

  /*
   * The insights label appears above the banner.
   */
  .cc-bh-mobile-kicker {
    position: relative;
    z-index: 8;

    display: inline-flex;
    order: 1;
    align-self: flex-start;

    min-height: 38px;

    margin:
      16px
      17px
      14px;

    opacity: 1;

    background:
      rgba(
        255,
        255,
        255,
        0.72
      );
  }

  /*
   * Hide the original label inside the content because
   * the phone label is now displayed above the banner.
   */
  .cc-bh-main > .cc-bh-kicker {
    display: none;
  }

  /*
   * Use the supplied wide blog banner.
   * It scales automatically with the phone width.
   */
  .cc-bh-background {
    position: relative;
    inset: auto;
    z-index: 2;

    display: block;
    order: 2;

    width: 100%;
    height: auto;
    aspect-ratio: 895 / 601;

    background-image:
      url("/glassy_pink_orbital_learning_hub.png");

    background-repeat:
      no-repeat;

    background-position:
      center center;

    background-size:
      contain;

    background-color:
      #fff1f4;

    transform:
      none !important;

    scale:
      1 !important;

    animation:
      none !important;
  }

  /*
   * Do not place a white overlay over the mobile banner.
   */
  .cc-bh-stage::after {
    display: none;
  }

  /*
   * Keep decorative background effects away from the content.
   */
  .cc-bh-atmosphere {
    top: 54px;
    right: 0;
    bottom: auto;
    left: 0;

    height:
      calc(
        100vw *
        601 /
        895
      );
  }

  /*
   * Content follows immediately after the banner.
   */
  .cc-bh-main {
    position: relative;
    z-index: 5;

    order: 3;

    width: 100%;

    margin: 0;

    padding:
      26px
      17px
      30px;

    background:
      radial-gradient(
        circle at 94% 8%,
        rgba(242, 29, 50, 0.09),
        transparent 34%
      ),
      radial-gradient(
        circle at 7% 88%,
        rgba(255, 148, 167, 0.11),
        transparent 38%
      ),
      linear-gradient(
        145deg,
        #fff8fa 0%,
        #ffebef 55%,
        #fff5f7 100%
      );
  }

  .cc-bh-main h1 {
    max-width: 100%;

    margin-top: 0;

    font-size:
      clamp(
        34px,
        10.3vw,
        46px
      );

    line-height: 0.95;

    letter-spacing:
      -0.045em;
  }

  .cc-bh-description {
    max-width: 100%;

    margin-top: 18px;

    font-size: 12.5px;
    line-height: 1.62;
  }

  .cc-bh-topics {
    position: relative;
    z-index: 6;

    gap: 8px;

    margin-top: 19px;
  }

  .cc-bh-topic {
    min-height: 40px;

    padding:
      0
      12px;
  }

  .cc-bh-actions {
    position: relative;
    z-index: 6;

    display: grid;

    grid-template-columns:
      1fr;

    gap: 9px;

    width: 100%;
    max-width: 100%;

    margin-top: 20px;
  }

  .cc-bh-primary,
  .cc-bh-secondary {
    width: 100%;
    min-width: 0;
    min-height: 52px;
  }

  /*
   * The information rail stays below the content with no large gap.
   */
  .cc-bh-rail {
    position: relative;

    right: auto;
    bottom: auto;
    left: auto;

    z-index: 8;

    order: 4;

    width:
      calc(
        100% -
        26px
      );

    min-height: 0;

    margin:
      14px
      13px
      16px;

    grid-template-columns:
      1fr;

    border-radius: 18px;

    background:
      rgba(
        255,
        255,
        255,
        0.84
      );
  }

  .cc-bh-rail-item {
    min-height: 69px;

    padding:
      11px
      14px;
  }
}
/* CC_BLOG_MOBILE_FINAL_ORDER_END */

/*
 * CC_BLOG_MOBILE_CONNECTED_LAYOUT_START
 * Phone only: label over banner and content connected to banner.
 */
@media (max-width: 700px) {
  .cc-bh-stage {
    position: relative;

    display: flex;
    flex-direction: column;

    row-gap: 0;
  }

  /*
   * Start the banner immediately after the website header.
   */
  .cc-bh-background {
    order: 1;

    width: 100%;
    aspect-ratio: 895 / 601;

    margin: 0;
    padding: 0;

    background-image:
      url("/glassy_pink_orbital_learning_hub.png");

    background-repeat:
      no-repeat;

    background-position:
      center center;

    background-size:
      contain;

    background-color:
      #fff1f4;
  }

  /*
   * Place the insights label over the upper-left banner area.
   * It no longer occupies a separate row.
   */
  .cc-bh-mobile-kicker {
    position: absolute;

    top: 14px;
    left: 14px;

    z-index: 20;

    display: inline-flex;

    margin: 0;

    min-height: 38px;

    background:
      rgba(
        255,
        255,
        255,
        0.88
      );

    box-shadow:
      0
      10px
      28px
      rgba(
        104,
        0,
        18,
        0.08
      );

    backdrop-filter:
      blur(9px);
  }

  /*
   * Decorative effects remain inside the banner area.
   */
  .cc-bh-atmosphere {
    top: 0;
    right: 0;
    bottom: auto;
    left: 0;

    height:
      calc(
        100vw *
        601 /
        895
      );
  }

  /*
   * Connect the content directly to the banner.
   */
  .cc-bh-main {
    order: 2;

    width: 100%;

    margin: 0;

    padding:
      14px
      17px
      28px;

    border: 0;

    background:
      radial-gradient(
        circle at 94% 8%,
        rgba(242, 29, 50, 0.09),
        transparent 34%
      ),
      radial-gradient(
        circle at 7% 88%,
        rgba(255, 148, 167, 0.11),
        transparent 38%
      ),
      linear-gradient(
        145deg,
        #fff8fa 0%,
        #ffebef 55%,
        #fff5f7 100%
      );
  }

  .cc-bh-main h1 {
    margin-top: 0;

    font-size:
      clamp(
        34px,
        10.3vw,
        46px
      );

    line-height: 0.95;
  }

  /*
   * Keep the information rail connected below the content.
   */
  .cc-bh-rail {
    order: 3;

    margin:
      0
      13px
      16px;
  }
}
/* CC_BLOG_MOBILE_CONNECTED_LAYOUT_END */

/*
 * CC_BLOG_MOBILE_BANNER_SIZE_START
 * Phone only: enlarge the central artwork and fill the banner area.
 */
@media (max-width: 700px) {
  .cc-bh-background {
    width: 100%;
    height:
      clamp(
        285px,
        88vw,
        390px
      );

    aspect-ratio: auto;

    margin: 0;
    padding: 0;

    background-image:
      url("/glassy_pink_orbital_learning_hub.png");

    background-repeat:
      no-repeat;

    background-position:
      center center;

    /*
     * The original artwork contains large empty pink areas.
     * This controlled enlargement makes the main artwork visible.
     */
    background-size:
      155%
      auto;

    background-color:
      #fff0f3;
  }

  .cc-bh-atmosphere {
    top: 0;
    right: 0;
    bottom: auto;
    left: 0;

    width: 100%;
    height:
      clamp(
        285px,
        88vw,
        390px
      );
  }

  .cc-bh-main {
    margin-top: 0;

    padding-top:
      12px;

    border-top: 0;
  }

  .cc-bh-mobile-kicker {
    top: 12px;
    left: 14px;
  }
}

@media (max-width: 390px) {
  .cc-bh-background,
  .cc-bh-atmosphere {
    height:
      clamp(
        275px,
        88vw,
        345px
      );
  }

  .cc-bh-background {
    background-size:
      158%
      auto;
  }
}
/* CC_BLOG_MOBILE_BANNER_SIZE_END */

/*
 * CC_BLOG_MOBILE_CENTERED_BANNER_START
 * Phone only: moderate sizing, centered artwork and connected content.
 */
@media (max-width: 700px) {
  .cc-bh-background {
    width: 100%;

    height:
      clamp(
        260px,
        76vw,
        330px
      );

    aspect-ratio: auto;

    margin: 0;
    padding: 0;

    background-image:
      url("/glassy_pink_orbital_learning_hub.png");

    background-repeat:
      no-repeat;

    /*
     * The artwork is positioned toward the right inside
     * the source image. This position visually centers it.
     */
    background-position: 110% center;

    /*
     * Moderate enlargement only.
     * This replaces the previous excessive 155% zoom.
     */
    background-size:
      132%
      auto;

    background-color:
      #fff1f4;

    transform:
      none !important;

    scale:
      1 !important;
  }

  .cc-bh-atmosphere {
    top: 0;
    right: 0;
    bottom: auto;
    left: 0;

    width: 100%;

    height:
      clamp(
        260px,
        76vw,
        330px
      );
  }

  /*
   * Attach the content closely to the banner.
   */
  .cc-bh-main {
    position: relative;
    z-index: 6;

    margin-top:
      -10px;

    padding-top:
      12px;

    border-radius:
      12px
      12px
      0
      0;
  }

  .cc-bh-main h1 {
    margin-top: 0;
  }

  .cc-bh-mobile-kicker {
    top: 12px;
    left: 14px;
  }
}

@media (max-width: 390px) {
  .cc-bh-background,
  .cc-bh-atmosphere {
    height:
      clamp(
        250px,
        76vw,
        300px
      );
  }

  .cc-bh-background {
    background-position: 110% center;

    background-size:
      134%
      auto;
  }

  .cc-bh-main {
    margin-top:
      -10px;

    padding-top:
      11px;
  }
}
/* CC_BLOG_MOBILE_CENTERED_BANNER_END */

/*
 * CC_BLOG_MOBILE_SEAMLESS_START
 * Phone only: remove width seam and connect banner with content.
 */
@media (max-width: 700px) {
  .cc-bh {
    width: 100%;
    max-width: 100%;

    margin: 0;
    padding: 0;

    overflow-x: clip;

    background:
      #fff0f3;
  }

  .cc-bh-stage {
    width: 100%;
    max-width: 100%;

    margin: 0;
    padding: 0;

    row-gap: 0;

    overflow-x: clip;

    background:
      #fff0f3;
  }

  .cc-bh-background,
  .cc-bh-main,
  .cc-bh-rail {
    box-sizing:
      border-box;
  }

  .cc-bh-background {
    width: 100%;
    max-width: 100%;

    margin: 0;

    border: 0;
    border-radius: 0;

    background-color:
      #fff0f3;
  }

  /*
   * Join content directly with the lower banner color.
   */
  .cc-bh-main {
    width: 100%;
    max-width: 100%;

    margin:
      -2px
      0
      0;

    padding:
      8px
      17px
      28px;

    border: 0;
    border-radius: 0;

    background:
      radial-gradient(
        circle at 94% 12%,
        rgba(242, 29, 50, 0.07),
        transparent 35%
      ),
      linear-gradient(
        180deg,
        #fff0f3 0%,
        #ffedf1 48%,
        #fff5f7 100%
      );
  }

  .cc-bh-main h1 {
    margin-top: 0;
  }

  .cc-bh-description {
    margin-top:
      16px;
  }

  /*
   * Keep the bottom information rail aligned to the content.
   */
  .cc-bh-rail {
    max-width:
      calc(
        100% -
        26px
      );

    margin:
      0
      13px
      16px;
  }
}
/* CC_BLOG_MOBILE_SEAMLESS_END */

/*
 * CC_BLOG_MOBILE_EDGE_FIX_START
 * Phone only: remove the scrollbar gutter and connect the design.
 */
@media (max-width: 700px) {
  /*
   * Hide only the visual scrollbar.
   * Normal touch, mouse-wheel and keyboard scrolling remain enabled.
   */
  html,
  body {
    width: 100%;
    max-width: 100%;

    overflow-x: hidden;

    scrollbar-width: none;
    -ms-overflow-style: none;
  }

  html::-webkit-scrollbar,
  body::-webkit-scrollbar {
    display: none;

    width: 0;
    height: 0;
  }

  .cc-bh,
  .cc-bh-stage,
  .cc-bh-background,
  .cc-bh-main {
    box-sizing: border-box;

    width: 100%;
    max-width: 100%;

    margin-right: 0;
    margin-left: 0;
  }

  .cc-bh,
  .cc-bh-stage {
    overflow-x: hidden;

    background:
      #fff1f4;
  }

  .cc-bh-background {
    display: block;

    margin-bottom: 0;

    border: 0;

    background-color:
      #fff1f4;
  }

  /*
   * Connect the content directly to the banner.
   */
  .cc-bh-main {
    margin-top:
      -1px;

    padding-top:
      0;

    border: 0;
    border-radius: 0;

    background:
      linear-gradient(
        180deg,
        #fff1f4 0%,
        #ffedf1 48%,
        #fff5f7 100%
      );
  }

  .cc-bh-main h1 {
    margin-top: 0;
    padding-top: 0;
  }
}
/* CC_BLOG_MOBILE_EDGE_FIX_END */

/*
 * CC_BLOG_MOBILE_CURVED_EDGE_FIX_START
 * Phone only: blend the thin curved graphic at the right banner edge.
 */
@media (max-width: 700px) {
  .cc-bh-background {
    position: relative;
    isolation: isolate;
  }

  .cc-bh-background::after {
    position: absolute;

    top: 0;
    right: 0;
    bottom: 0;

    z-index: 3;

    width: 24px;

    content: "";

    pointer-events: none;

    background:
      linear-gradient(
        90deg,
        rgba(255, 241, 244, 0) 0%,
        rgba(255, 241, 244, 0.82) 42%,
        rgba(255, 241, 244, 0.98) 76%,
        #fff1f4 100%
      );
  }
}
/* CC_BLOG_MOBILE_CURVED_EDGE_FIX_END */

        /* CC_BLOG_MOBILE_UNIFIED_SECTION_START */
        @media (max-width: 700px) {
          .cc-bh,
          .cc-bh-stage {
            background: #fff1f4 !important;
          }

          .cc-bh-background {
            display: block !important;
            flex: 0 0 auto !important;
            margin: 0 !important;
            border: 0 !important;
            border-radius: 0 !important;
            box-shadow: none !important;
          }

          .cc-bh-main {
            position: relative !important;
            z-index: 5 !important;

            width: 100% !important;
            max-width: none !important;

            /*
             * Joins the content directly with the banner
             * and removes the visible horizontal separation.
             */
            margin: -16px 0 0 !important;
            padding-top: 0 !important;

            border: 0 !important;
            border-radius: 0 !important;
            box-shadow: none !important;

            background: #fff1f4 !important;
          }

          .cc-bh-main::before {
            position: absolute;
            top: -24px;
            right: 0;
            left: 0;
            z-index: -1;

            height: 26px;

            content: "";
            pointer-events: none;

            background:
              linear-gradient(
                180deg,
                rgba(255, 241, 244, 0) 0%,
                rgba(255, 241, 244, 0.88) 48%,
                #fff1f4 100%
              );
          }

          .cc-bh-main h1 {
            margin-top: 0 !important;
            padding-top: 0 !important;
          }
        }
        /* CC_BLOG_MOBILE_UNIFIED_SECTION_END */

        /* CC_BLOG_MOBILE_CTA_ROW_START */
        @media (max-width: 600px) {
          .cc-bh-actions {
            display: grid !important;
            grid-template-columns:
              minmax(0, 1fr)
              minmax(0, 1fr) !important;

            width: 100% !important;
            max-width: 100% !important;

            gap: 8px !important;
          }

          .cc-bh-primary,
          .cc-bh-secondary {
            display: inline-flex !important;
            align-items: center !important;
            justify-content: center !important;

            width: 100% !important;
            min-width: 0 !important;
            min-height: 44px !important;

            gap: 0 !important;
            padding: 0 10px !important;

            font-size: 9.5px !important;
            line-height: 1.15 !important;
            white-space: nowrap !important;
          }

          .cc-bh-primary i,
          .cc-bh-secondary i {
            display: none !important;
          }
        }

        @media (max-width: 350px) {
          .cc-bh-actions {
            gap: 6px !important;
          }

          .cc-bh-primary,
          .cc-bh-secondary {
            min-height: 42px !important;
            padding: 0 7px !important;
            font-size: 8.7px !important;
          }
        }
        /* CC_BLOG_MOBILE_CTA_ROW_END */

        

        /* CC_BLOG_MOBILE_RAIL_AUTOSLIDE_START */
        @media (max-width: 600px) {
          .cc-bh-rail {
            position: relative !important;
            inset: auto !important;

            display: grid !important;
            grid-template-columns: none !important;
            grid-auto-flow: column !important;
            grid-auto-columns:
              minmax(230px, 76vw) !important;

            width: 100% !important;
            max-width: none !important;
            min-height: 0 !important;

            margin:
              15px
              0
              12px !important;

            padding:
              0
              14px
              4px !important;

            gap: 0 !important;

            overflow-x: auto !important;
            overflow-y: hidden !important;

            border: 0 !important;
            border-radius: 0 !important;

            background:
              transparent !important;

            box-shadow:
              none !important;

            backdrop-filter:
              none !important;

            scroll-behavior: smooth;
            scroll-snap-type:
              x mandatory;

            scrollbar-width: none;

            overscroll-behavior-inline:
              contain;

            touch-action: pan-x;

            -webkit-overflow-scrolling:
              touch;
          }

          .cc-bh-rail::-webkit-scrollbar {
            display: none;
            width: 0;
            height: 0;
          }

          .cc-bh-rail-item {
            width: auto !important;
            min-width: 0 !important;
            min-height: 72px !important;

            padding:
              10px
              16px !important;

            border: 0 !important;
            border-radius: 0 !important;

            background:
              transparent !important;

            box-shadow:
              none !important;

            scroll-snap-align:
              start;

            scroll-snap-stop:
              always;
          }

          .cc-bh-rail-item:not(
            :last-child
          )::after {
            top: 12px !important;
            right: 0 !important;
            bottom: 12px !important;
            left: auto !important;

            width: 1px !important;
            height: auto !important;
          }

          .cc-bh-rail-icon {
            width: 42px !important;
            height: 42px !important;

            flex:
              0
              0
              42px !important;
          }

          .cc-bh-rail-item strong {
            font-size: 9px !important;
          }

          .cc-bh-rail-item small {
            font-size: 7.5px !important;
          }
        }
        /* CC_BLOG_MOBILE_RAIL_AUTOSLIDE_END */
`}</style>
    </section>
  );
}