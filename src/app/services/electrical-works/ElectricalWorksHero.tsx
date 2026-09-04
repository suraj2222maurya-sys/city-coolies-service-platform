"use client";

import { useEffect } from "react";
import Link from "next/link";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
type FeatureType =
  | "verified"
  | "pricing"
  | "time"
  | "safe";

const FEATURES: {
  title: string;
  type: FeatureType;
}[] = [
  {
    title: "Verified\nElectricians",
    type: "verified",
  },
  {
    title: "Transparent\nPricing",
    type: "pricing",
  },
  {
    title: "On-time\nService",
    type: "time",
  },
  {
    title: "Safe &\nCompliant",
    type: "safe",
  },
];

function FeatureIcon({
  type,
}: {
  type: FeatureType;
}) {
  if (type === "pricing") {
    return (
      <span className="cc-electrical-rupee">
        ₹
      </span>
    );
  }

  if (type === "time") {
    return (
      <svg
        viewBox="0 0 24 24"
        aria-hidden="true"
      >
        <circle cx="12" cy="12" r="8.5" />
        <path d="M12 7.5V12l3.2 1.9" />
      </svg>
    );
  }

  if (type === "safe") {
    return (
      <svg
        viewBox="0 0 24 24"
        aria-hidden="true"
      >
        <path d="M12 3 19 6v5c0 4.8-2.9 8.3-7 10-4.1-1.7-7-5.2-7-10V6l7-3Z" />
        <path d="m9 12 2 2 4-4" />
      </svg>
    );
  }

  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <path d="M12 3.2 18.5 6v5.2c0 4.5-2.7 7.8-6.5 9.5-3.8-1.7-6.5-5-6.5-9.5V6L12 3.2Z" />
      <circle cx="12" cy="9.3" r="2.2" />
      <path d="M8.8 15.1c.6-2 1.7-3 3.2-3s2.6 1 3.2 3" />
    </svg>
  );
}

export default function ElectricalWorksHero() {

  /* CC_ELECTRICAL_VIDEO_SCENE_START */

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const section =
      document.querySelector<HTMLElement>(
        ".cc-electrical-hero",
      );

    if (!section) return;

    const banner =
      section.querySelector<HTMLElement>(
        ".cc-electrical-banner",
      );

    const layer =
      section.querySelector<HTMLElement>(
        ".cc-electrical-banner__video-layer",
      );

    const liquidOne =
      section.querySelector<HTMLElement>(
        ".cc-electrical-banner__liquid--one",
      );

    const liquidTwo =
      section.querySelector<HTMLElement>(
        ".cc-electrical-banner__liquid--two",
      );

    const sheen =
      section.querySelector<HTMLElement>(
        ".cc-electrical-banner__sheen",
      );

    const spark =
      section.querySelector<HTMLElement>(
        ".cc-electrical-banner__spark",
      );

    const content =
      section.querySelector<HTMLElement>(
        ".cc-electrical-banner__content",
      );

    const featureRow =
      section.querySelector<HTMLElement>(
        ".cc-electrical-banner__features",
      );

    if (
      !banner ||
      !layer ||
      !liquidOne ||
      !liquidTwo ||
      !sheen ||
      !spark ||
      !content ||
      !featureRow
    ) {
      return;
    }

    const reduceMotion =
      window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;

    if (reduceMotion) return;

    const ctx = gsap.context(() => {

      /*
       * ---------------------------------------------
       * OPENING CINEMATIC FRAME
       * ---------------------------------------------
       */

      gsap.fromTo(
        layer,
        {
          opacity: 0,
        },
        {
          opacity: 1,
          duration: 1.15,
          ease: "power3.out",
        },
      );


      /*
       * ---------------------------------------------
       * CONTINUOUS WATER / LIQUID MOTION
       * ---------------------------------------------
       */

      gsap.to(
        liquidOne,
        {
          xPercent: 18,
          yPercent: -10,
          rotate: 7,

          duration: 5.2,

          repeat: -1,
          yoyo: true,

          ease: "sine.inOut",
        },
      );

      gsap.to(
        liquidTwo,
        {
          xPercent: -16,
          yPercent: 13,
          rotate: -8,

          duration: 6.4,

          repeat: -1,
          yoyo: true,

          ease: "sine.inOut",
        },
      );


      /*
       * ---------------------------------------------
       * VIDEO LIGHT SWEEP
       * ---------------------------------------------
       */

      gsap.fromTo(
        sheen,
        {
          xPercent: -160,
          opacity: 0,
        },
        {
          xPercent: 680,
          opacity: 0.65,

          duration: 2.25,

          repeat: -1,
          repeatDelay: 2.4,

          ease: "power2.inOut",
        },
      );


      /*
       * ---------------------------------------------
       * SOFT MOVING HIGHLIGHT
       * ---------------------------------------------
       */

      gsap.to(
        spark,
        {
          xPercent: 55,
          yPercent: -28,
          scale: 1.22,
          opacity: 0.48,

          duration: 4.8,

          repeat: -1,
          yoyo: true,

          ease: "sine.inOut",
        },
      );


      /*
       * ---------------------------------------------
       * SCROLL = CAMERA-LIKE FLUID DEPTH
       *
       * No image zoom.
       * ---------------------------------------------
       */

      gsap.fromTo(
        content,
        {
          y: 7,
        },
        {
          y: -11,

          ease: "none",

          scrollTrigger: {
            trigger: banner,

            start: "top 85%",
            end: "bottom 15%",

            scrub: 1.4,
          },
        },
      );

      gsap.fromTo(
        layer,
        {
          x: -8,
          y: 5,
        },
        {
          x: 12,
          y: -8,

          ease: "none",

          scrollTrigger: {
            trigger: banner,

            start: "top bottom",
            end: "bottom top",

            scrub: 1.7,
          },
        },
      );


      /*
       * ---------------------------------------------
       * FEATURE ROW = WATER-LIKE DEPTH
       * Individual card entrance remains untouched.
       * ---------------------------------------------
       */

      gsap.fromTo(
        featureRow,
        {
          y: 4,
        },
        {
          y: -5,

          ease: "none",

          scrollTrigger: {
            trigger: banner,

            start: "top 80%",
            end: "bottom 20%",

            scrub: 1.5,
          },
        },
      );


      /*
       * ---------------------------------------------
       * RE-CALCULATE AFTER PAGE LOAD
       * ---------------------------------------------
       */

      const timer = window.setTimeout(
        () => {
          ScrollTrigger.refresh();
        },
        150,
      );

      return () => {
        window.clearTimeout(timer);
      };
    }, section);

    return () => {
      ctx.revert();
    };
  }, []);

  /* CC_ELECTRICAL_VIDEO_SCENE_END */



  /* CC_ELECTRICAL_GSAP_MOTION_START */

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const section =
      document.querySelector<HTMLElement>(
        ".cc-electrical-hero",
      );

    if (!section) {
      return;
    }

    const breadcrumb =
      section.querySelector<HTMLElement>(
        ".cc-electrical-banner__breadcrumb",
      );

    const heading =
      section.querySelector<HTMLElement>(
        ".cc-electrical-banner__copy h1",
      );

    const descriptionTop =
      section.querySelector<HTMLElement>(
        ".cc-electrical-banner__description-top",
      );

    const descriptionBottom =
      section.querySelector<HTMLElement>(
        ".cc-electrical-banner__description-bottom",
      );

    const cards = Array.from(
      section.querySelectorAll<HTMLElement>(
        ".cc-electrical-banner__feature",
      ),
    );

    if (
      !heading ||
      !descriptionTop ||
      !descriptionBottom
    ) {
      return;
    }

    const headingEl = heading;
    const topEl = descriptionTop;
    const bottomEl = descriptionBottom;

    const reduceMotion =
      window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;

    if (reduceMotion) {
      return;
    }

    const originals: Array<{
      element: HTMLElement;
      text: string;
    }> = [];

    function splitIntoCharacters(
      element: HTMLElement,
    ) {
      const text =
        (element.textContent ?? "")
          .replace(/\s+/g, " ")
          .trim();

      originals.push({
        element,
        text,
      });

      element.textContent = "";

      const characters: HTMLElement[] = [];

      const words =
        text.split(" ");

      words.forEach(
        (
          word,
          wordIndex,
        ) => {
          const wordElement =
            document.createElement(
              "span",
            );

          wordElement.className =
            "cc-motion-word";

          Array.from(word).forEach(
            (character) => {
              const charElement =
                document.createElement(
                  "span",
                );

              charElement.className =
                "cc-motion-char";

              charElement.textContent =
                character;

              wordElement.appendChild(
                charElement,
              );

              characters.push(
                charElement,
              );
            },
          );

          element.appendChild(
            wordElement,
          );

          if (
            wordIndex <
            words.length - 1
          ) {
            element.appendChild(
              document.createTextNode(
                " ",
              ),
            );
          }
        },
      );

      return characters;
    }

    const headingChars =
      splitIntoCharacters(
        headingEl,
      );

    const topChars =
      splitIntoCharacters(
        topEl,
      );

    const bottomChars =
      splitIntoCharacters(
        bottomEl,
      );

    let timeline:
      gsap.core.Timeline | null =
      null;

    let trigger:
      ReturnType<
        typeof ScrollTrigger.create
      > | null = null;

    let initialTimer:
      number | null =
      null;

    const ctx =
      gsap.context(() => {
        timeline =
          gsap.timeline({
            paused: true,
          });

        /*
         * INITIAL VIDEO FRAME
         */

        if (breadcrumb) {
          timeline.set(
            breadcrumb,
            {
              opacity: 0,
              y: -12,
              filter:
                "blur(4px)",
            },
            0,
          );
        }

        timeline.set(
          headingChars,
          {
            opacity: 0,

            y: 30,

            rotateX: -72,

            scale: 0.92,

            filter:
              "blur(5px)",
          },
          0,
        );

        timeline.set(
          topChars,
          {
            opacity: 0,

            x: -10,

            y: 18,

            rotateX: -55,

            filter:
              "blur(4px)",
          },
          0,
        );

        timeline.set(
          bottomChars,
          {
            opacity: 0,

            x: 10,

            y: 18,

            rotateX: -55,

            filter:
              "blur(4px)",
          },
          0,
        );

        timeline.set(
          cards,
          {
            opacity: 0,

            y: 42,

            scale: 0.91,

            filter:
              "blur(6px)",
          },
          0,
        );


        /*
         * 1 — BREADCRUMB
         */

        if (breadcrumb) {
          timeline.to(
            breadcrumb,
            {
              opacity: 1,

              y: 0,

              filter:
                "blur(0px)",

              duration:
                0.30,

              ease:
                "power3.out",
            },
            0.05,
          );
        }


        /*
         * 2 — ELECTRICAL WORKS
         *
         * Fast premium letter reveal.
         * No typing reflow.
         */

        timeline.to(
          headingChars,
          {
            opacity: 1,

            y: 0,

            rotateX: 0,

            scale: 1,

            filter:
              "blur(0px)",

            duration:
              0.34,

            stagger:
              0.028,

            ease:
              "power4.out",
          },
          0.20,
        );


        /*
         * 3 — FIRST RED LINE
         */

        timeline.to(
          topChars,
          {
            opacity: 1,

            x: 0,

            y: 0,

            rotateX: 0,

            filter:
              "blur(0px)",

            duration:
              0.27,

            stagger:
              0.018,

            ease:
              "power3.out",
          },
          ">-0.06",
        );


        /*
         * 4 — SECOND RED LINE
         */

        timeline.to(
          bottomChars,
          {
            opacity: 1,

            x: 0,

            y: 0,

            rotateX: 0,

            filter:
              "blur(0px)",

            duration:
              0.27,

            stagger:
              0.016,

            ease:
              "power3.out",
          },
          ">-0.07",
        );


        /*
         * 5 — FOUR BOXES
         *
         * One-by-one apni exact jagah.
         */

        timeline.to(
          cards,
          {
            opacity: 1,

            y: 0,

            scale: 1,

            filter:
              "blur(0px)",

            duration:
              0.42,

            stagger:
              0.10,

            ease:
              "back.out(1.35)",
          },
          ">+0.08",
        );


        const playSequence =
          () => {
            timeline?.restart();
          };


        /*
         * SCROLL ENTER / RE-ENTER
         */

        trigger =
          ScrollTrigger.create({
            trigger:
              section,

            start:
              "top 88%",

            onEnter:
              playSequence,

            onEnterBack:
              playSequence,
          });


        /*
         * PAGE OPEN:
         * agar hero already screen me hai,
         * animation turant start hogi.
         */

        initialTimer =
          window.setTimeout(
            () => {
              ScrollTrigger.refresh();

              const rect =
                section.getBoundingClientRect();

              const visible =
                rect.top <
                  window.innerHeight *
                    0.92 &&
                rect.bottom >
                  window.innerHeight *
                    0.08;

              if (visible) {
                playSequence();
              }
            },
            80,
          );
      }, section);


    return () => {
      if (
        initialTimer !== null
      ) {
        window.clearTimeout(
          initialTimer,
        );
      }

      trigger?.kill();

      timeline?.kill();

      ctx.revert();

      originals.forEach(
        ({
          element,
          text,
        }) => {
          element.textContent =
            text;
        },
      );
    };
  }, []);

  /* CC_ELECTRICAL_GSAP_MOTION_END */



  return (
    <section className="cc-electrical-hero">
      <div className="cc-electrical-banner">

        <div
          className="cc-electrical-banner__video-layer"
          aria-hidden="true"
        >
          <span className="cc-electrical-banner__liquid cc-electrical-banner__liquid--one" />
          <span className="cc-electrical-banner__liquid cc-electrical-banner__liquid--two" />
          <span className="cc-electrical-banner__sheen" />
          <span className="cc-electrical-banner__spark" />
        </div>

        <div className="cc-electrical-banner__content">
          <nav
            className="cc-electrical-banner__breadcrumb"
            aria-label="Breadcrumb"
          >
            <Link href="/">
              Home
            </Link>

            <span>›</span>

            <Link href="/services">
              Services
            </Link>

            <span>›</span>

            <strong>
              Electrical Works
            </strong>
          </nav>

          <div className="cc-electrical-banner__copy">
            <h1>
              Electrical Works
            </h1>

            <p
  className="cc-electrical-banner__description"
  aria-label="Choose the exact service you need and book in a few simple steps."
>
  <span className="cc-electrical-banner__description-top">
    Choose the exact service you need
  </span>

  <span className="cc-electrical-banner__description-bottom">
    and book in a few simple steps.
  </span>
</p>
          </div>

          <div className="cc-electrical-banner__features">
            {FEATURES.map((feature) => (
              <article
                key={feature.title}
                className="cc-electrical-banner__feature"
              >
                <span className="cc-electrical-banner__icon">
                  <FeatureIcon
                    type={feature.type}
                  />
                </span>

                <strong>
                  {feature.title}
                </strong>
              </article>
            ))}
          </div>
        </div>

        <style jsx>{`
          /*
           * =====================================================
           * EXISTING APPROVED BANNER
           *
           * Size / position / image behavior unchanged.
           * =====================================================
           */

          .cc-electrical-hero {
            width: 100%;
            padding: 0;
            background: #ffffff;
          }

          .cc-electrical-banner {
            position: relative;

            width:
              min(
                80%,
                1260px
              );

            aspect-ratio:
              3.2 / 1;

            margin-left: 0;
            margin-right: auto;

            background-image:
              url(
                "/smiling_technician_with_electrical_panel.png"
              );

            background-repeat:
              no-repeat;

            background-position: calc(50% - 65px) top;

            background-size:
              contain;

            background-color:
              #ffffff;

            overflow:
              hidden;
          }


          /*
           * =====================================================
           * CONTENT OVERLAY
           *
           * Content only uses the blank LEFT side.
           * Background image is untouched.
           * =====================================================
           */

          .cc-electrical-banner__content {
            position:
              absolute;

            z-index:
              5;

            inset:
              0 auto 0 0;

            width:
              61%;

            display:
              flex;

            flex-direction:
              column;

            padding:
              22px
              24px
              22px
              34px;

            pointer-events:
              none;
          }


          /*
           * Breadcrumb
           */

          .cc-electrical-banner__breadcrumb {
            display:
              flex;

            align-items:
              center;

            gap:
              8px;

            margin:
              0;

            color:
              #7f8793;

            font-size:
              11px;

            font-weight:
              600;

            line-height:
              1.2;

            pointer-events:
              auto;
          }

          .cc-electrical-banner__breadcrumb a {
            color:
              #7f8793;

            text-decoration:
              none;
          }

          .cc-electrical-banner__breadcrumb a:hover {
            color:
              #f51f2a;
          }

          .cc-electrical-banner__breadcrumb strong {
            color:
              #3e4550;

            font-weight:
              750;
          }


          /*
           * Main heading + description
           */

          .cc-electrical-banner__copy {
            margin-top:
              clamp(
                31px,
                3.2vw,
                52px
              );
          }

          .cc-electrical-banner__copy h1 {
            margin:
              0;

            color:
              #20242d;

            font-size:
              clamp(
                36px,
                3.25vw,
                52px
              );

            font-weight:
              800;

            line-height:
              1;

            letter-spacing:
              -0.04em;
          }

          .cc-electrical-banner__copy p {
            max-width:
              540px;

            margin:
              15px
              0
              0;

            color:
              #717986;

            font-size:
              clamp(
                12px,
                1vw,
                15px
              );

            line-height:
              1.5;
          }


          /*
           * =====================================================
           * FOUR FEATURE CARDS
           *
           * Same row / same left area as reference.
           * =====================================================
           */

          .cc-electrical-banner__features {
            width:
              100%;

            display:
              grid;

            grid-template-columns:
              repeat(
                4,
                minmax(0,1fr)
              );

            gap:
              10px;

            margin-top:
              auto;
          }

          .cc-electrical-banner__feature {
            min-width:
              0;

            min-height:
              50px;

            display:
              flex;

            align-items:
              center;

            gap:
              9px;

            padding:
              6px
              8px;

            border:
              1px solid
              rgba(
                245,
                31,
                42,
                .15
              );

            border-radius:
              10px;

            background:
              linear-gradient(
                135deg,
                rgba(
                  255,
                  250,
                  250,
                  .96
                ),
                rgba(
                  255,
                  239,
                  242,
                  .92
                )
              );

            box-shadow:
              0 10px 24px -24px
              rgba(
                245,
                31,
                42,
                .42
              );
          }

          .cc-electrical-banner__icon {
            width:
              30px;

            height:
              30px;

            flex:
              0 0 30px;

            display:
              grid;

            place-items:
              center;

            border:
              1px solid
              rgba(
                245,
                31,
                42,
                .21
              );

            border-radius:
              10px;

            color:
              #f51f2a;

            background:
              rgba(
                255,
                255,
                255,
                .94
              );
          }

          .cc-electrical-banner__icon
          :global(svg) {
            width:
              17px;

            height:
              17px;

            fill:
              none;

            stroke:
              currentColor;

            stroke-width:
              1.8;

            stroke-linecap:
              round;

            stroke-linejoin:
              round;
          }

          .cc-electrical-rupee {
            color:
              #f51f2a;

            font-size:
              19px;

            font-weight:
              700;

            line-height:
              1;
          }

          .cc-electrical-banner__feature strong {
            white-space: pre-line;
            color:
              #343a45;

            font-size:
              10.5px;

            font-weight:
              650;

            line-height:
              1.2;
          }


          /*
           * =====================================================
           * RESPONSIVE
           * Banner image remains contain / uncropped.
           * =====================================================
           */

          @media (max-width: 1100px) {
            .cc-electrical-banner {
              width:
                80%;
            }

            .cc-electrical-banner__content {
              width:
                63%;

              padding:
                18px
                18px
                18px
                26px;
            }

            .cc-electrical-banner__copy {
              margin-top:
                26px;
            }

            .cc-electrical-banner__feature {
              min-height:
                52px;

              padding:
                6px
                7px;
            }
          }


          @media (max-width: 900px) {
            .cc-electrical-banner {
              width:
                100%;

              background-position:
                left center;

              background-size:
                contain;
            }
          }


          @media (max-width: 640px) {
            .cc-electrical-banner {
              width:
                100%;

              background-position:
                left center;

              background-size:
                contain;
            }

            .cc-electrical-banner__content {
              width:
                64%;

              padding:
                10px
                8px
                10px
                12px;
            }

            .cc-electrical-banner__breadcrumb {
              font-size:
                7.5px;

              gap:
                4px;
            }

            .cc-electrical-banner__copy {
              margin-top:
                12px;
            }

            .cc-electrical-banner__copy h1 {
              font-size:
                clamp(
                  19px,
                  6vw,
                  28px
                );
            }

            .cc-electrical-banner__copy p {
              margin-top:
                5px;

              font-size:
                7.8px;

              line-height:
                1.35;
            }

            .cc-electrical-banner__features {
              gap:
                4px;
            }

            .cc-electrical-banner__feature {
              min-height:
                39px;

              gap:
                4px;

              padding:
                4px;

              border-radius:
                7px;
            }

            .cc-electrical-banner__icon {
              width:
                23px;

              height:
                23px;

              flex-basis:
                23px;

              border-radius:
                7px;
            }

            .cc-electrical-banner__icon
            :global(svg) {
              width:
                13px;

              height:
                13px;
            }

            .cc-electrical-rupee {
              font-size:
                13px;
            }

            .cc-electrical-banner__feature strong {
            white-space: pre-line;
              font-size:
                6.8px;

              line-height:
                1.1;
            }
          }
  
        /* CC_ELECTRICAL_FEATURE_BOX_TUNE_START */

        @media (min-width: 641px) {
          .cc-electrical-banner__features {
            width: 100%;
            transform: none;
            gap: 10px;
          }

          .cc-electrical-banner__feature {
            min-height: 50px;

            gap: 10px;

            padding: 7px 11px;

            border:
              1.2px solid
              rgba(245,31,42,.18);

            border-radius: 10px;

            background:
              linear-gradient(
                135deg,
                rgba(255,255,255,.98),
                rgba(255,239,242,.96)
              );

            box-shadow:
              0 9px 22px -18px
              rgba(245,31,42,.42);
          }

          .cc-electrical-banner__icon {
            width: 33px;
            height: 33px;
            flex-basis: 33px;

            border:
              1.4px solid
              rgba(245,31,42,.26);

            border-radius: 10px;

            color: #f51f2a;

            background:
              rgba(255,255,255,.98);

            box-shadow:
              0 5px 13px -10px
              rgba(245,31,42,.45);
          }

          .cc-electrical-banner__icon :global(svg) {
            width: 18px;
            height: 18px;

            stroke-width: 2.15;
          }

          .cc-electrical-rupee {
            font-size: 19px;
            font-weight: 850;
          }

          .cc-electrical-banner__feature strong {
            white-space: pre-line;

            color: #20242d;

            font-size: 12.5px;
            font-weight: 800;

            line-height: 1.12;

            letter-spacing: -0.015em;
          }
        }

        /* CC_ELECTRICAL_FEATURE_BOX_TUNE_END */


        /* CC_ELECTRICAL_DESCRIPTION_TUNE_START */

        .cc-electrical-banner__description {
          max-width: 570px;

          margin:
            14px
            0
            0;

          display:
            flex;

          flex-direction:
            column;

          align-items:
            flex-start;

          gap:
            1px;

          text-wrap:
            balance;
        }

        .cc-electrical-banner__description-top {
          display:
            block;

          color:
            #f51f2a;

          font-family:
            Georgia,
            "Times New Roman",
            serif;

          font-size:
            clamp(16px, 1.25vw, 20px);

          font-weight:
            600;

          font-style:
            italic;

          line-height:
            1.05;

          letter-spacing:
            -0.02em;
        }

        .cc-electrical-banner__description-bottom {
          display:
            block;

          margin-left:
            18px;

          color:
            #d91422;

          font-family:
            Georgia,
            "Times New Roman",
            serif;

          font-size:
            clamp(20px, 1.55vw, 25px);

          font-weight:
            700;

          line-height:
            1.02;

          letter-spacing:
            -0.025em;
        }

        @media (max-width: 640px) {
          .cc-electrical-banner__description {
            max-width:
              100%;

            margin-top:
              7px;
          }

          .cc-electrical-banner__description-top {
            font-size:
              12px;
          }

          .cc-electrical-banner__description-bottom {
            margin-left:
              8px;

            font-size:
              15px;
          }
        }

        /* CC_ELECTRICAL_DESCRIPTION_TUNE_END */


        /* CC_ELECTRICAL_GSAP_CSS_START */

        /*
         * =====================================================
         * FAST MODERN CHARACTER VIDEO REVEAL
         * =====================================================
         */

        .cc-electrical-banner__copy h1,
        .cc-electrical-banner__description-top,
        .cc-electrical-banner__description-bottom {
          perspective:
            800px;
        }

        .cc-motion-word {
          display:
            inline-block;

          white-space:
            nowrap;
        }

        .cc-motion-char {
          display:
            inline-block;

          transform-origin:
            50%
            75%;

          backface-visibility:
            hidden;

          will-change:
            transform,
            opacity,
            filter;
        }


        /*
         * Cards move smoothly into their exact place.
         */

        .cc-electrical-banner__feature {
          backface-visibility:
            hidden;

          will-change:
            transform,
            opacity,
            filter;
        }


        /*
         * Original design remains visible after animation.
         */

        @media (
          prefers-reduced-motion:
          reduce
        ) {
          .cc-motion-char,
          .cc-electrical-banner__feature {
            opacity:
              1 !important;

            transform:
              none !important;

            filter:
              none !important;
          }
        }

        /* CC_ELECTRICAL_GSAP_CSS_END */


        /* CC_ELECTRICAL_VIDEO_CSS_START */

        /*
         * =====================================================
         * ULTRA-PRO CINEMATIC VIDEO SURFACE
         * =====================================================
         */

        .cc-electrical-banner {
          position: relative;
          isolation: isolate;
        }

        .cc-electrical-banner__video-layer {
          position: absolute;

          z-index: 2;

          inset: 0;

          overflow: hidden;

          pointer-events: none;

          opacity: 1;

          transform: translateZ(0);
        }


        /*
         * Liquid / water forms
         */

        .cc-electrical-banner__liquid {
          position: absolute;

          display: block;

          border-radius: 46% 54% 58% 42% / 48% 42% 58% 52%;

          filter: blur(28px);

          transform: translateZ(0);

          will-change: transform;
        }

        .cc-electrical-banner__liquid--one {
          width: 360px;
          height: 210px;

          left: 14%;
          top: 47%;

          opacity: .22;

          background:
            radial-gradient(
              ellipse at center,
              rgba(245,31,42,.20) 0%,
              rgba(255,172,181,.13) 38%,
              rgba(255,235,238,.04) 65%,
              transparent 76%
            );
        }

        .cc-electrical-banner__liquid--two {
          width: 410px;
          height: 235px;

          left: 43%;
          top: -16%;

          opacity: .16;

          background:
            radial-gradient(
              ellipse at center,
              rgba(255,255,255,.92) 0%,
              rgba(255,210,216,.15) 34%,
              rgba(245,31,42,.06) 57%,
              transparent 75%
            );
        }


        /*
         * Moving glass/camera light
         */

        .cc-electrical-banner__sheen {
          position: absolute;

          top: -35%;
          bottom: -35%;

          left: 0;

          width: 15%;

          opacity: 0;

          transform:
            skewX(-17deg);

          filter:
            blur(7px);

          background:
            linear-gradient(
              105deg,
              transparent 0%,
              rgba(255,255,255,.08) 22%,
              rgba(255,255,255,.70) 49%,
              rgba(255,231,235,.17) 68%,
              transparent 100%
            );

          will-change:
            transform,
            opacity;
        }


        /*
         * Soft cinematic orb
         */

        .cc-electrical-banner__spark {
          position: absolute;

          width: 240px;
          height: 240px;

          left: 52%;
          top: 34%;

          border-radius: 999px;

          opacity: .24;

          filter: blur(25px);

          background:
            radial-gradient(
              circle,
              rgba(255,255,255,.72) 0%,
              rgba(255,226,231,.20) 32%,
              rgba(245,31,42,.06) 52%,
              transparent 73%
            );

          will-change:
            transform,
            opacity;
        }


        /*
         * Original content always above video layers.
         */

        .cc-electrical-banner__content {
          z-index: 5;
        }


        /*
         * Modern premium cards
         * Same size and position.
         */

        .cc-electrical-banner__feature {
          position: relative;

          overflow: hidden;

          backdrop-filter:
            blur(7px);

          -webkit-backdrop-filter:
            blur(7px);

          box-shadow:
            inset 0 1px 0
            rgba(255,255,255,.78),

            0 12px 28px -25px
            rgba(245,31,42,.32);
        }

        .cc-electrical-banner__feature::before {
          content: "";

          position: absolute;

          inset: 0;

          pointer-events: none;

          opacity: .42;

          background:
            linear-gradient(
              120deg,
              rgba(255,255,255,.46) 0%,
              transparent 34%,
              rgba(245,31,42,.025) 68%,
              rgba(255,255,255,.30) 100%
            );
        }


        /*
         * Smooth GPU rendering
         */

        .cc-electrical-banner,
        .cc-electrical-banner__content,
        .cc-electrical-banner__features,
        .cc-electrical-banner__feature {
          backface-visibility: hidden;
        }


        @media (max-width: 640px) {
          .cc-electrical-banner__liquid--one {
            width: 180px;
            height: 115px;
          }

          .cc-electrical-banner__liquid--two {
            width: 210px;
            height: 130px;
          }

          .cc-electrical-banner__spark {
            width: 130px;
            height: 130px;
          }
        }


        @media (prefers-reduced-motion: reduce) {
          .cc-electrical-banner__video-layer {
            display: none;
          }

          .cc-electrical-banner__content,
          .cc-electrical-banner__features {
            transform: none !important;
          }
        }

        
        

        

        /* CC_ELECTRICAL_HERO_RIGHT_EDGE_FIX_START */

        @media (min-width: 901px) {
          /*
           * LEFT side exactly where it is.
           * Only consume the remaining RIGHT-side viewport gap.
           */
          .cc-electrical-banner {
            width: auto !important;
            max-width: none !important;

            margin-left: 0 !important;

            /*
             * Parent jitna right gap chhod raha hai,
             * wahi negative margin Hero ko dekar
             * viewport ke right edge tak extend karta hai.
             */
            margin-right: calc(100% - 100vw) !important;

            box-sizing: border-box !important;
          }
        }

        /* CC_ELECTRICAL_HERO_RIGHT_EDGE_FIX_END */
/* CC_ELECTRICAL_VIDEO_CSS_END */

      `}</style>
      </div>
    </section>
  );
}