"use client";

import { useEffect } from "react";
import Lenis from "lenis";

const CARD_DELAYS = [
  650,
  1050,
  1450,
  1850,
  2250,
] as const;

export default function ServicesExperienceMotion() {
  useEffect(() => {
    const body =
      document.body;

    body.classList.add(
      "cc-services-liquid-motion",
    );

    const reducedMotion =
      window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;

    const desktop =
      window.matchMedia(
        "(min-width: 769px) and (pointer: fine)",
      ).matches;


    // ==========================================================
    // CLEAN OLD MOTION CLASSES / OLD VIDEO EXPERIMENTS
    // ==========================================================

    document
      .querySelectorAll(
        [
          ".cc-popular-real-video",
          ".cc-real-cinematic-video",
          ".cc-popular-services__real-video",
        ].join(","),
      )
      .forEach((element) => {
        element.remove();
      });

    document
      .querySelectorAll<HTMLElement>(
        [
          ".cc-real-video-reveal",
          ".cc-real-video-visible",
          ".cc-film-reveal",
          ".cc-film-visible",
          ".cc-sequence-card",
          ".cc-popular-sequence-card",
        ].join(","),
      )
      .forEach((element) => {
        element.classList.remove(
          "cc-real-video-reveal",
          "cc-real-video-visible",
          "cc-film-reveal",
          "cc-film-visible",
          "cc-sequence-card",
          "cc-popular-sequence-card",
        );
      });


    // ==========================================================
    // LIQUID / WATER-LIKE SCROLLING
    // ==========================================================

    let lenis:
      Lenis | null = null;

    let rafId = 0;

    if (
      desktop &&
      !reducedMotion
    ) {
      lenis =
        new Lenis({
          lerp: 0.1,
          smoothWheel: true,
          wheelMultiplier: 0.94,
          touchMultiplier: 1,
          syncTouch: false,
        });

      const raf = (
        time: number,
      ) => {
        lenis?.raf(time);

        rafId =
          window.requestAnimationFrame(
            raf,
          );
      };

      rafId =
        window.requestAnimationFrame(
          raf,
        );
    }


    // ==========================================================
    // POPULAR SERVICES
    // ==========================================================

    const section =
      document.querySelector<HTMLElement>(
        ".cc-popular-services",
      );

    if (!section) {
      return () => {
        if (rafId) {
          window.cancelAnimationFrame(
            rafId,
          );
        }

        lenis?.destroy();

        body.classList.remove(
          "cc-services-liquid-motion",
        );
      };
    }

    const heading =
      section.querySelector<HTMLElement>(
        ".cc-popular-services__heading",
      );

    const title =
      heading?.querySelector<HTMLElement>(
        "h2",
      ) ?? null;

    const viewAll =
      section.querySelector<HTMLElement>(
        ".cc-popular-services__view-all",
      );

    const cards =
      Array.from(
        section.querySelectorAll<HTMLElement>(
          ".cc-popular-card",
        ),
      ).slice(
        0,
        CARD_DELAYS.length,
      );


    // ==========================================================
    // PREPARE ANIMATION
    // ==========================================================

    section.classList.add(
      "cc-popular-cinema-ready",
    );

    heading?.classList.add(
      "cc-popular-heading-stage",
    );

    title?.classList.add(
      "cc-popular-title-stage",
    );

    viewAll?.classList.add(
      "cc-popular-viewall-stage",
    );

    cards.forEach(
      (card, index) => {
        card.classList.add(
          "cc-popular-card-stage",
        );

        card.dataset.ccPopularIndex =
          String(index);
      },
    );


    // ==========================================================
    // TIMER MANAGEMENT
    // ==========================================================

    const timers:
      number[] = [];

    const clearTimers = () => {
      timers.forEach(
        (timer) => {
          window.clearTimeout(timer);
        },
      );

      timers.length = 0;
    };


    const resetSequence = () => {
      clearTimers();

      heading?.classList.remove(
        "cc-popular-heading-in",
      );

      viewAll?.classList.remove(
        "cc-popular-viewall-in",
      );

      cards.forEach(
        (card) => {
          card.classList.remove(
            "cc-popular-card-in",
          );
        },
      );
    };


    const playSequence = () => {
      resetSequence();

      /*
       * Force browser to acknowledge the reset before
       * the cinematic sequence starts again.
       */
      void section.offsetWidth;


      // --------------------------------------------------------
      // 1. POPULAR SERVICES HEADING FIRST
      // --------------------------------------------------------

      timers.push(
        window.setTimeout(
          () => {
            heading?.classList.add(
              "cc-popular-heading-in",
            );
          },
          80,
        ),
      );


      // --------------------------------------------------------
      // 2. VIEW ALL AFTER HEADING STARTS
      // --------------------------------------------------------

      timers.push(
        window.setTimeout(
          () => {
            viewAll?.classList.add(
              "cc-popular-viewall-in",
            );
          },
          430,
        ),
      );


      // --------------------------------------------------------
      // 3. FIVE CARDS, CLEAR ONE-BY-ONE CINEMATIC TIMELINE
      // --------------------------------------------------------

      cards.forEach(
        (card, index) => {
          const delay =
            CARD_DELAYS[index] ??
            650 + index * 400;

          timers.push(
            window.setTimeout(
              () => {
                card.classList.add(
                  "cc-popular-card-in",
                );
              },
              delay,
            ),
          );
        },
      );
    };


    // ==========================================================
    // SCROLL INTO VIEW -> PLAY
    // SCROLL OUT -> RESET
    // RETURN -> PLAY AGAIN
    // ==========================================================

    let observer:
      IntersectionObserver | null =
      null;

    if (
      reducedMotion ||
      !("IntersectionObserver" in window)
    ) {
      heading?.classList.add(
        "cc-popular-heading-in",
      );

      viewAll?.classList.add(
        "cc-popular-viewall-in",
      );

      cards.forEach(
        (card) => {
          card.classList.add(
            "cc-popular-card-in",
          );
        },
      );
    }
    else {
      observer =
        new IntersectionObserver(
          ([entry]) => {
            if (!entry) {
              return;
            }

            if (
              entry.isIntersecting &&
              entry.intersectionRatio >= 0.08
            ) {
              playSequence();
              return;
            }

            if (!entry.isIntersecting) {
              resetSequence();
            }
          },
          {
            threshold: [
              0,
              0.08,
              0.2,
              0.4,
            ],

            rootMargin:
              "8% 0px -8% 0px",
          },
        );

      observer.observe(section);
    }


    // ==========================================================
    // VIEW ALL SERVICES
    // ==========================================================

    const handleViewAll = (
      event: MouseEvent,
    ) => {
      const target =
        event.target as HTMLElement | null;

      const control =
        target?.closest<HTMLElement>(
          ".cc-popular-services__view-all",
        );

      if (!control) {
        return;
      }

      const destination =
        document.getElementById(
          "all-services-catalog",
        );

      if (!destination) {
        return;
      }

      event.preventDefault();
      event.stopPropagation();

      if (lenis) {
        lenis.scrollTo(
          destination,
          {
            offset: -88,
            duration: 1.05,
          },
        );
      }
      else {
        destination.scrollIntoView({
          behavior:
            reducedMotion
              ? "auto"
              : "smooth",

          block: "start",
        });
      }

      window.history.replaceState(
        null,
        "",
        "#all-services-catalog",
      );
    };

    document.addEventListener(
      "click",
      handleViewAll,
      true,
    );


    // ==========================================================
    // CLEANUP
    // ==========================================================

    return () => {
      clearTimers();

      observer?.disconnect();

      document.removeEventListener(
        "click",
        handleViewAll,
        true,
      );

      if (rafId) {
        window.cancelAnimationFrame(
          rafId,
        );
      }

      lenis?.destroy();

      section.classList.remove(
        "cc-popular-cinema-ready",
      );

      heading?.classList.remove(
        "cc-popular-heading-stage",
        "cc-popular-heading-in",
      );

      title?.classList.remove(
        "cc-popular-title-stage",
      );

      viewAll?.classList.remove(
        "cc-popular-viewall-stage",
        "cc-popular-viewall-in",
      );

      cards.forEach(
        (card) => {
          card.classList.remove(
            "cc-popular-card-stage",
            "cc-popular-card-in",
          );

          delete card.dataset.ccPopularIndex;
        },
      );

      body.classList.remove(
        "cc-services-liquid-motion",
      );
    };
  }, []);

  return (
    <style>{`
      /*
       * ======================================================
       * LENIS WATER SCROLL
       * ======================================================
       */

      html.lenis,
      html.lenis body {
        height: auto;
      }

      .lenis.lenis-smooth {
        scroll-behavior:
          auto !important;
      }

      .lenis.lenis-stopped {
        overflow: hidden;
      }

      body.cc-services-liquid-motion {
        overflow-x: hidden;
      }


      /*
       * ======================================================
       * NO BACKGROUND VIDEO
       * ======================================================
       */

      .cc-popular-real-video,
      .cc-real-cinematic-video,
      .cc-popular-services__real-video {
        display:
          none !important;
      }


      /*
       * ======================================================
       * HEADING STAGE
       * ======================================================
       */

      .cc-popular-cinema-ready
      .cc-popular-heading-stage {
        opacity: 0;

        filter:
          blur(5px);

        transform:
          translate3d(
            0,
            16px,
            0
          );

        transition:
          opacity
            500ms
            cubic-bezier(.16,1,.3,1),

          filter
            720ms
            cubic-bezier(.16,1,.3,1),

          transform
            820ms
            cubic-bezier(.16,1,.3,1);
      }

      .cc-popular-cinema-ready
      .cc-popular-heading-stage.cc-popular-heading-in {
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


      /*
       * ======================================================
       * "POPULAR SERVICES" WRITING EFFECT
       * ======================================================
       */

      .cc-popular-cinema-ready
      .cc-popular-title-stage {
        position: relative;

        display: inline-block;

        clip-path:
          inset(
            0
            100%
            0
            0
          );

        transition:
          clip-path
            800ms
            steps(18,end)
            80ms;
      }

      .cc-popular-cinema-ready
      .cc-popular-heading-in
      .cc-popular-title-stage {
        clip-path:
          inset(
            0
            0
            0
            0
          );
      }

      .cc-popular-title-stage::after {
        content: "";

        position: absolute;

        left: 0;
        bottom: -7px;

        width: 34px;
        height: 2px;

        border-radius: 999px;

        opacity: 0;

        transform:
          scaleX(.12);

        transform-origin:
          left center;

        background:
          linear-gradient(
            90deg,
            #f51f2a,
            rgba(245,31,42,0)
          );
      }

      .cc-popular-heading-in
      .cc-popular-title-stage::after {
        animation:
          ccPopularTitleLine
          620ms
          cubic-bezier(.16,1,.3,1)
          570ms
          forwards;
      }


      /*
       * ======================================================
       * VIEW ALL
       * ======================================================
       */

      .cc-popular-cinema-ready
      .cc-popular-viewall-stage {
        opacity: 0;

        transform:
          translate3d(
            16px,
            0,
            0
          );

        transition:
          opacity
            500ms
            cubic-bezier(.16,1,.3,1),

          transform
            700ms
            cubic-bezier(.16,1,.3,1);
      }

      .cc-popular-cinema-ready
      .cc-popular-viewall-stage.cc-popular-viewall-in {
        opacity: 1;

        transform:
          translate3d(
            0,
            0,
            0
          );
      }


      /*
       * ======================================================
       * CARD START POSITION
       * ======================================================
       */

      .cc-popular-cinema-ready
      .cc-popular-card-stage {
        opacity: 0 !important;

        filter:
          blur(9px);

        transform:
          translate3d(
            0,
            48px,
            0
          )
          scale(.965)
          !important;

        transform-origin:
          center bottom;

        backface-visibility:
          hidden;

        will-change:
          opacity,
          transform,
          filter;

        transition:
          opacity
            620ms
            cubic-bezier(.16,1,.3,1),

          filter
            820ms
            cubic-bezier(.16,1,.3,1),

          transform
            920ms
            cubic-bezier(.16,1,.3,1),

          box-shadow
            220ms
            ease,

          border-color
            220ms
            ease
          !important;
      }


      /*
       * ======================================================
       * CARD ARRIVES AT ITS OWN EXACT PLACE
       * ======================================================
       */

      .cc-popular-cinema-ready
      .cc-popular-card-stage.cc-popular-card-in {
        opacity: 1 !important;

        filter:
          blur(0);

        transform:
          translate3d(
            0,
            0,
            0
          )
          scale(1)
          !important;
      }


      /*
       * ======================================================
       * SUBTLE CINEMATIC HOVER
       * ONLY AFTER CARD HAS ARRIVED
       * ======================================================
       */

      .cc-popular-cinema-ready
      .cc-popular-card-stage.cc-popular-card-in:hover {
        transform:
          translate3d(
            0,
            -5px,
            0
          )
          scale(1.004)
          !important;

        box-shadow:
          0 25px 43px -31px
            rgba(61,15,22,.40),

          0 10px 24px -20px
            rgba(245,31,42,.28)
          !important;
      }


      /*
       * ======================================================
       * ABSOLUTELY NO IMAGE ZOOM / CROP MOTION
       * ======================================================
       */

      .cc-popular-cinema-ready
      .cc-popular-card img,

      .cc-popular-cinema-ready
      .cc-popular-card:hover img {
        transform:
          none !important;

        scale:
          1 !important;

        animation:
          none !important;
      }


      /*
       * ======================================================
       * ARROW AFTER CARD ARRIVES
       * ======================================================
       */

      .cc-popular-card-in
      .cc-popular-card__arrow {
        animation:
          ccPopularArrowFloat
          1.55s
          ease-in-out
          infinite;
      }


      /*
       * ======================================================
       * KEYFRAMES
       * ======================================================
       */

      @keyframes ccPopularTitleLine {
        from {
          opacity: 0;

          transform:
            scaleX(.12);
        }

        to {
          opacity: 1;

          transform:
            scaleX(1);
        }
      }

      @keyframes ccPopularArrowFloat {
        0%,
        100% {
          transform:
            translate3d(
              0,
              0,
              0
            );
        }

        50% {
          transform:
            translate3d(
              2px,
              0,
              0
            );
        }
      }


      /*
       * ======================================================
       * MOBILE
       * SAME SEQUENCE, LIGHTER MOTION.
       * ======================================================
       */

      @media (max-width: 720px) {
        .cc-popular-cinema-ready
        .cc-popular-card-stage {
          filter:
            blur(5px);

          transform:
            translate3d(
              0,
              32px,
              0
            )
            scale(.975)
            !important;

          transition:
            opacity
              500ms
              cubic-bezier(.16,1,.3,1),

            filter
              650ms
              cubic-bezier(.16,1,.3,1),

            transform
              760ms
              cubic-bezier(.16,1,.3,1)
            !important;
        }

        .cc-popular-cinema-ready
        .cc-popular-card-stage.cc-popular-card-in {
          opacity:
            1 !important;

          filter:
            blur(0);

          transform:
            translate3d(
              0,
              0,
              0
            )
            scale(1)
            !important;
        }
      }


      /*
       * ======================================================
       * ACCESSIBILITY
       * ======================================================
       */

      @media (
        prefers-reduced-motion:
        reduce
      ) {
        .cc-popular-heading-stage,
        .cc-popular-viewall-stage,
        .cc-popular-card-stage,
        .cc-popular-title-stage {
          opacity:
            1 !important;

          filter:
            none !important;

          clip-path:
            none !important;

          transform:
            none !important;

          transition:
            none !important;
        }

        .cc-popular-title-stage::after,
        .cc-popular-card__arrow {
          animation:
            none !important;
        }
      }
    `}</style>
  );
}