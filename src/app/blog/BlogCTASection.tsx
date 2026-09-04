"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";

export default function BlogCTASection() {
  const sectionRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const section = sectionRef.current;

    if (!section) {
      return;
    }

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (reduceMotion) {
      section.classList.add("cc-cta-ready");
      return;
    }

    section.classList.add("cc-cta-motion");

    let isInside = false;

    const play = () => {
      if (isInside) {
        return;
      }

      isInside = true;

      section.classList.remove("cc-cta-ready");

      window.requestAnimationFrame(() => {
        window.requestAnimationFrame(() => {
          section.classList.add("cc-cta-ready");
        });
      });
    };

    const reset = () => {
      isInside = false;
      section.classList.remove("cc-cta-ready");
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry) {
          return;
        }

        if (entry.isIntersecting) {
          play();
        } else {
          reset();
        }
      },
      {
        threshold: 0.08,
        rootMargin: "30px 0px 30px 0px",
      },
    );

    observer.observe(section);

    const rect = section.getBoundingClientRect();

    if (
      rect.top < window.innerHeight &&
      rect.bottom > 0
    ) {
      play();
    }

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="blog-cta"
      className="cc-cta"
      aria-labelledby="cc-cta-heading"
    >
      <div className="cc-cta-stage">
        <div
          className="cc-cta-atmosphere"
          aria-hidden="true"
        >
          <span className="cc-cta-glow cc-cta-glow-one" />
          <span className="cc-cta-glow cc-cta-glow-two" />

          <span className="cc-cta-line cc-cta-line-one" />
          <span className="cc-cta-line cc-cta-line-two" />
          <span className="cc-cta-line cc-cta-line-three" />

          <span className="cc-cta-particle cc-cta-particle-one" />
          <span className="cc-cta-particle cc-cta-particle-two" />
          <span className="cc-cta-particle cc-cta-particle-three" />

          <span className="cc-cta-word">
            READY
          </span>
        </div>

        <span
          className="cc-cta-sweep"
          aria-hidden="true"
        />

        <div className="cc-cta-content">
          <div className="cc-cta-kicker">
            <span className="cc-cta-kicker-dot" />

            <span className="cc-cta-kicker-line" />

            <strong>
              CITY COOLIES PROPERTY SERVICES
            </strong>
          </div>

          <h2 id="cc-cta-heading">
            <span>
              Your property deserves
            </span>

            <span>
              more than just
            </span>

            <span className="cc-cta-highlight">
              good advice.
            </span>
          </h2>

          <p className="cc-cta-copy">
            When it is time to move from reading to real
            property work, explore the service you need and
            take the next step with City Coolies.
          </p>

          <div className="cc-cta-service-flow">
            <span>
              PROPERTY CARE
            </span>

            <i />

            <span>
              CLEANING
            </span>

            <i />

            <span>
              RENOVATION
            </span>

            <i />

            <span>
              MAINTENANCE
            </span>
          </div>

          <div className="cc-cta-actions">
            <Link
              href="/services"
              className="cc-cta-primary"
            >
              <span>
                Explore Professional Services
              </span>

              <i aria-hidden="true">
                →
              </i>
            </Link>

            <a
              href="tel:+918693986939"
              className="cc-cta-call"
            >
              <span
                className="cc-cta-call-icon"
                aria-hidden="true"
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <path
                    d="M7.2 3.8 9.5 7c.4.6.3 1.3-.2 1.8L8 10.1c1.2 2.4 3.4 4.6 5.8 5.8l1.3-1.3c.5-.5 1.2-.6 1.8-.2l3.2 2.3c.7.5.9 1.3.5 2-.7 1.4-2.1 2.2-3.7 2C9.8 19.8 4.2 14.2 3.3 7.1c-.2-1.6.6-3 2-3.7.7-.4 1.5-.2 1.9.4Z"
                    stroke="currentColor"
                    strokeWidth="1.7"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>

              <span className="cc-cta-call-copy">
                <small>
                  CALL CITY COOLIES
                </small>

                <strong>
                  +91 86939 86939
                </strong>
              </span>
            </a>
          </div>

          <div className="cc-cta-after">
            <span>
              Practical knowledge
            </span>

            <i />

            <span>
              Professional service
            </span>

            <i />

            <span>
              Better property decisions
            </span>
          </div>
        </div>

        <div className="cc-cta-bottom">
          <div>
            <span className="cc-cta-bottom-dot" />

            <strong>
              CITY COOLIES
            </strong>

            <span>
              COMPLETE PROPERTY CARE
            </span>
          </div>

          <div className="cc-cta-bottom-motion">
            <span>
              KNOW
            </span>

            <i />

            <span>
              DECIDE
            </span>

            <i />

            <span>
              ACT
            </span>

            <b />
          </div>
        </div>
      </div>

      <style>{`
        .cc-cta {
          --red: #f21a32;
          --red-deep: #c90621;
          --white: #ffffff;
          --soft: #ffdce3;

          position: relative;
          width: 100%;
          overflow: hidden;

          padding:
            20px
            18px
            30px;

          background:
            linear-gradient(
              180deg,
              #fff8fa,
              #ffedf1
            );
        }

        .cc-cta-stage {
          position: relative;
          isolation: isolate;

          width:
            min(
              100%,
              1540px
            );

          min-height: 500px;

          margin: 0 auto;

          overflow: hidden;

          border-radius: 34px;

          color: white;

          background:
            radial-gradient(
              circle at 77% 21%,
              rgba(255,255,255,.15),
              transparent 27%
            ),
            radial-gradient(
              circle at 15% 112%,
              rgba(255,186,199,.18),
              transparent 33%
            ),
            linear-gradient(
              123deg,
              #ae001a 0%,
              #d60725 32%,
              #f41c35 66%,
              #ca061f 100%
            );

          box-shadow:
            0 30px 75px
            rgba(126,0,18,.22),
            inset
            0 1px 0
            rgba(255,255,255,.22);
        }

        .cc-cta-stage::before {
          position: absolute;
          inset: 9px;
          z-index: 10;

          content: "";

          pointer-events: none;

          border:
            1px solid
            rgba(255,255,255,.14);

          border-radius: 26px;
        }

        /*
         * IMPORTANT:
         * FIRST THE WHOLE CTA SECTION OPENS.
         */

        .cc-cta-motion
        .cc-cta-stage {
          opacity: .04;

          clip-path:
            inset(
              49% 0 49% 0
              round 34px
            );

          filter:
            blur(14px)
            brightness(.82);

          transform:
            translateY(28px)
            scale(.985);
        }

        .cc-cta-motion.cc-cta-ready
        .cc-cta-stage {
          animation:
            ccCtaSectionOpen
            .90s
            cubic-bezier(.16,1,.3,1)
            forwards;
        }

        /*
         * BACKGROUND - NO ORBIT / NO CARDS
         */

        .cc-cta-atmosphere {
          position: absolute;
          inset: 0;
          z-index: -1;

          overflow: hidden;

          pointer-events: none;
        }

        .cc-cta-glow {
          position: absolute;

          border-radius: 50%;

          filter: blur(12px);
        }

        .cc-cta-glow-one {
          top: -310px;
          right: -120px;

          width: 720px;
          height: 720px;

          background:
            radial-gradient(
              circle,
              rgba(255,255,255,.20),
              rgba(255,215,223,.06) 45%,
              transparent 70%
            );

          animation:
            ccCtaGlowOne
            7s
            ease-in-out
            infinite
            alternate;
        }

        .cc-cta-glow-two {
          left: -230px;
          bottom: -330px;

          width: 600px;
          height: 600px;

          background:
            radial-gradient(
              circle,
              rgba(255,255,255,.11),
              transparent 68%
            );

          animation:
            ccCtaGlowTwo
            8s
            ease-in-out
            infinite
            alternate;
        }

        .cc-cta-line {
          position: absolute;

          height: 1px;

          opacity: .14;

          background:
            linear-gradient(
              90deg,
              transparent,
              rgba(255,255,255,.9),
              transparent
            );

          filter:
            drop-shadow(
              0 0 5px
              rgba(255,255,255,.45)
            );
        }

        .cc-cta-line-one {
          top: 21%;
          right: -10%;

          width: 65%;

          transform:
            rotate(-6deg);

          animation:
            ccCtaLineOne
            7s
            ease-in-out
            infinite
            alternate;
        }

        .cc-cta-line-two {
          top: 46%;
          right: -8%;

          width: 54%;

          transform:
            rotate(4deg);

          animation:
            ccCtaLineTwo
            6s
            ease-in-out
            infinite
            alternate;
        }

        .cc-cta-line-three {
          left: -12%;
          bottom: 20%;

          width: 49%;

          opacity: .09;

          transform:
            rotate(-4deg);

          animation:
            ccCtaLineThree
            8s
            ease-in-out
            infinite
            alternate;
        }

        .cc-cta-particle {
          position: absolute;

          width: 5px;
          height: 5px;

          border-radius: 50%;

          background: white;

          box-shadow:
            0 0 8px white,
            0 0 18px
            rgba(255,255,255,.65);
        }

        .cc-cta-particle-one {
          top: 18%;
          right: 15%;

          animation:
            ccCtaParticleOne
            5s
            ease-in-out
            infinite;
        }

        .cc-cta-particle-two {
          top: 62%;
          right: 27%;

          width: 3px;
          height: 3px;

          animation:
            ccCtaParticleTwo
            4.6s
            ease-in-out
            infinite;
        }

        .cc-cta-particle-three {
          left: 43%;
          bottom: 13%;

          width: 4px;
          height: 4px;

          animation:
            ccCtaParticleThree
            5.6s
            ease-in-out
            infinite;
        }

        .cc-cta-word {
          position: absolute;

          right: -30px;
          bottom: -45px;

          color:
            rgba(255,255,255,.035);

          font-size:
            clamp(
              150px,
              18vw,
              290px
            );

          font-weight: 950;

          line-height: .7;

          letter-spacing: -.08em;

          transform:
            rotate(-5deg);
        }

        .cc-cta-sweep {
          position: absolute;

          top: -75%;
          left: -25%;
          z-index: 20;

          width: 7%;
          height: 245%;

          opacity: 0;

          pointer-events: none;

          background:
            linear-gradient(
              90deg,
              transparent,
              rgba(255,255,255,.95),
              rgba(255,219,226,.72),
              transparent
            );

          filter: blur(9px);

          transform:
            rotate(18deg);
        }

        .cc-cta-ready
        .cc-cta-sweep {
          animation:
            ccCtaSweep
            2s
            ease
            .16s
            forwards;
        }

        /*
         * REAL CTA CONTENT
         */

        .cc-cta-content {
          position: relative;
          z-index: 4;

          width:
            min(
              100%,
              1080px
            );

          margin: 0 auto;

          padding:
            67px
            42px
            50px;

          text-align: center;
        }

        /*
         * CONTENT 1
         */

        .cc-cta-kicker {
          display: flex;
          align-items: center;
          justify-content: center;

          gap: 9px;

          color:
            rgba(255,255,255,.78);

          font-size: 8px;
          font-weight: 900;

          letter-spacing: .18em;
        }

        .cc-cta-kicker-dot {
          width: 7px;
          height: 7px;

          border-radius: 50%;

          background: white;

          box-shadow:
            0 0 0 4px
            rgba(255,255,255,.08),
            0 0 16px white;

          animation:
            ccCtaPulse
            1.8s
            ease-in-out
            infinite;
        }

        .cc-cta-kicker-line {
          width: 40px;
          height: 1px;

          background:
            linear-gradient(
              90deg,
              white,
              transparent
            );
        }

        .cc-cta-motion
        .cc-cta-kicker {
          opacity: 0;

          filter: blur(6px);

          transform:
            translateY(16px);
        }

        .cc-cta-ready
        .cc-cta-kicker {
          animation:
            ccCtaContentReveal
            .55s
            cubic-bezier(.16,1,.3,1)
            .58s
            forwards;
        }

        /*
         * CONTENT 2 / 3 / 4
         */

        .cc-cta-content h2 {
          margin:
            19px
            auto
            0;

          color: white;

          font-size:
            clamp(
              50px,
              5.5vw,
              82px
            );

          font-weight: 800;

          line-height: .90;

          letter-spacing: -.06em;
        }

        .cc-cta-content h2 > span {
          display: block;
        }

        .cc-cta-highlight {
          color:
            #ffd9e0;
        }

        .cc-cta-motion
        .cc-cta-content h2
        > span {
          opacity: 0;

          filter: blur(11px);

          transform:
            translateY(40px);
        }

        .cc-cta-ready
        .cc-cta-content h2
        > span:nth-child(1) {
          animation:
            ccCtaTitleReveal
            .68s
            cubic-bezier(.16,1,.3,1)
            .72s
            forwards;
        }

        .cc-cta-ready
        .cc-cta-content h2
        > span:nth-child(2) {
          animation:
            ccCtaTitleReveal
            .70s
            cubic-bezier(.16,1,.3,1)
            .88s
            forwards;
        }

        .cc-cta-ready
        .cc-cta-content h2
        > span:nth-child(3) {
          animation:
            ccCtaTitleReveal
            .72s
            cubic-bezier(.16,1,.3,1)
            1.04s
            forwards;
        }

        /*
         * CONTENT 5
         */

        .cc-cta-copy {
          max-width: 690px;

          margin:
            21px
            auto
            0;

          color:
            rgba(255,255,255,.74);

          font-size:
            clamp(
              13px,
              1.05vw,
              16px
            );

          line-height: 1.68;
        }

        .cc-cta-motion
        .cc-cta-copy {
          opacity: 0;

          filter: blur(5px);

          transform:
            translateY(18px);
        }

        .cc-cta-ready
        .cc-cta-copy {
          animation:
            ccCtaContentReveal
            .62s
            cubic-bezier(.16,1,.3,1)
            1.22s
            forwards;
        }

        /*
         * CONTENT 6
         */

        .cc-cta-service-flow {
          display: flex;
          align-items: center;
          justify-content: center;
          flex-wrap: wrap;

          gap: 8px;

          margin-top: 18px;

          color:
            rgba(255,255,255,.55);

          font-size: 6.8px;
          font-weight: 900;

          letter-spacing: .12em;
        }

        .cc-cta-service-flow i {
          width: 4px;
          height: 4px;

          border-radius: 50%;

          background:
            rgba(255,255,255,.68);
        }

        .cc-cta-motion
        .cc-cta-service-flow {
          opacity: 0;

          filter: blur(4px);

          transform:
            translateY(12px);
        }

        .cc-cta-ready
        .cc-cta-service-flow {
          animation:
            ccCtaContentReveal
            .52s
            ease
            1.38s
            forwards;
        }

        /*
         * CONTENT 7 - CTA BUTTONS
         */

        .cc-cta-actions {
          display: flex;
          align-items: center;
          justify-content: center;
          flex-wrap: wrap;

          gap: 10px;

          margin-top: 27px;
        }

        .cc-cta-motion
        .cc-cta-actions {
          opacity: 0;

          filter: blur(7px);

          transform:
            translateY(22px)
            scale(.97);
        }

        .cc-cta-ready
        .cc-cta-actions {
          animation:
            ccCtaButtonReveal
            .68s
            cubic-bezier(.16,1,.3,1)
            1.55s
            forwards;
        }

        .cc-cta-primary {
          display: inline-flex;
          align-items: center;
          justify-content: space-between;

          gap: 28px;

          min-width: 270px;
          min-height: 60px;

          padding:
            0
            12px
            0
            25px;

          border-radius: 999px;

          color:
            var(--red-deep);

          font-size: 10.5px;
          font-weight: 900;

          text-decoration: none;

          background: white;

          box-shadow:
            0 18px 36px
            rgba(77,0,12,.24);

          transition:
            transform .25s ease,
            box-shadow .25s ease;
        }

        .cc-cta-primary:hover {
          transform:
            translateY(-3px);

          box-shadow:
            0 24px 44px
            rgba(77,0,12,.30);
        }

        .cc-cta-primary > i {
          display: grid;

          width: 38px;
          height: 38px;

          place-items: center;

          border-radius: 50%;

          color: white;

          font-size: 18px;
          font-style: normal;

          background:
            var(--red);
        }

        .cc-cta-call {
          display: flex;
          align-items: center;

          gap: 10px;

          min-height: 60px;

          padding:
            0
            20px
            0
            10px;

          border:
            1px solid
            rgba(255,255,255,.28);

          border-radius: 999px;

          color: white;

          text-align: left;
          text-decoration: none;

          background:
            rgba(85,0,13,.16);

          backdrop-filter:
            blur(11px);

          box-shadow:
            inset
            0 1px 0
            rgba(255,255,255,.12);

          transition:
            transform .25s ease,
            background .25s ease;
        }

        .cc-cta-call:hover {
          transform:
            translateY(-3px);

          background:
            rgba(255,255,255,.10);
        }

        .cc-cta-call-icon {
          display: grid;

          width: 40px;
          height: 40px;

          flex: 0 0 auto;

          place-items: center;

          border-radius: 50%;

          color:
            var(--red);

          background: white;
        }

        .cc-cta-call-icon svg {
          width: 18px;
          height: 18px;
        }

        .cc-cta-call-copy {
          display: flex;
          flex-direction: column;

          gap: 2px;
        }

        .cc-cta-call-copy small {
          color:
            rgba(255,255,255,.54);

          font-size: 6.2px;
          font-weight: 900;

          letter-spacing: .13em;
        }

        .cc-cta-call-copy strong {
          color: white;

          font-size: 10px;
          font-weight: 850;
        }

        /*
         * CONTENT 8
         */

        .cc-cta-after {
          display: flex;
          align-items: center;
          justify-content: center;
          flex-wrap: wrap;

          gap: 8px;

          margin-top: 19px;

          color:
            rgba(255,255,255,.43);

          font-size: 6.4px;
          font-weight: 850;

          letter-spacing: .08em;
        }

        .cc-cta-after i {
          width: 18px;
          height: 1px;

          background:
            rgba(255,255,255,.22);
        }

        .cc-cta-motion
        .cc-cta-after {
          opacity: 0;

          transform:
            translateY(9px);
        }

        .cc-cta-ready
        .cc-cta-after {
          animation:
            ccCtaContentReveal
            .5s
            ease
            1.78s
            forwards;
        }

        /*
         * FINAL BOTTOM AREA
         */

        .cc-cta-bottom {
          position: relative;
          z-index: 5;

          display: flex;
          align-items: center;
          justify-content: space-between;

          gap: 20px;

          min-height: 62px;

          padding:
            0
            clamp(
              25px,
              4vw,
              62px
            );

          border-top:
            1px solid
            rgba(255,255,255,.13);

          background:
            rgba(76,0,12,.09);
        }

        .cc-cta-motion
        .cc-cta-bottom {
          opacity: 0;

          filter: blur(5px);

          transform:
            translateY(14px);
        }

        .cc-cta-ready
        .cc-cta-bottom {
          animation:
            ccCtaContentReveal
            .55s
            ease
            1.95s
            forwards;
        }

        .cc-cta-bottom > div {
          display: flex;
          align-items: center;
          flex-wrap: wrap;

          gap: 8px;

          color:
            rgba(255,255,255,.47);

          font-size: 6.3px;
          font-weight: 850;

          letter-spacing: .11em;
        }

        .cc-cta-bottom > div strong {
          color: white;

          font-size: 7px;
        }

        .cc-cta-bottom-dot {
          width: 6px;
          height: 6px;

          border-radius: 50%;

          background: white;

          box-shadow:
            0 0 10px white;
        }

        .cc-cta-bottom-motion {
          position: relative;

          min-width: 230px;

          overflow: hidden;
        }

        .cc-cta-bottom-motion > i {
          flex: 1;

          min-width: 35px;

          height: 1px;

          background:
            linear-gradient(
              90deg,
              rgba(255,255,255,.12),
              rgba(255,255,255,.52),
              rgba(255,255,255,.12)
            );
        }

        .cc-cta-bottom-motion > b {
          position: absolute;

          top: 50%;
          left: 17%;

          width: 7px;
          height: 7px;

          margin-top: -3.5px;

          border-radius: 50%;

          background: white;

          box-shadow:
            0 0 10px white;

          animation:
            ccCtaBottomMove
            4s
            ease-in-out
            infinite
            alternate;
        }

        /*
         * OPENING
         */

        @keyframes ccCtaSectionOpen {
          from {
            opacity: .04;

            clip-path:
              inset(
                49% 0 49% 0
                round 34px
              );

            filter:
              blur(14px)
              brightness(.82);

            transform:
              translateY(28px)
              scale(.985);
          }

          to {
            opacity: 1;

            clip-path:
              inset(
                0 0 0 0
                round 34px
              );

            filter:
              blur(0)
              brightness(1);

            transform:
              translateY(0)
              scale(1);
          }
        }

        @keyframes ccCtaSweep {
          0% {
            left: -25%;
            opacity: 0;
          }

          15% {
            opacity: .8;
          }

          100% {
            left: 120%;
            opacity: 0;
          }
        }

        @keyframes ccCtaContentReveal {
          to {
            opacity: 1;

            filter: blur(0);

            transform:
              translateY(0);
          }
        }

        @keyframes ccCtaTitleReveal {
          to {
            opacity: 1;

            filter: blur(0);

            transform:
              translateY(0);
          }
        }

        @keyframes ccCtaButtonReveal {
          to {
            opacity: 1;

            filter: blur(0);

            transform:
              translateY(0)
              scale(1);
          }
        }

        /*
         * CONTINUOUS VIDEO FEEL
         */

        @keyframes ccCtaPulse {
          50% {
            opacity: .42;

            box-shadow:
              0 0 0 7px
              rgba(255,255,255,.04),
              0 0 19px white;
          }
        }

        @keyframes ccCtaGlowOne {
          to {
            opacity: .62;

            transform:
              translate(-18px,22px)
              scale(1.08);
          }
        }

        @keyframes ccCtaGlowTwo {
          to {
            transform:
              translate(20px,-17px)
              scale(1.05);
          }
        }

        @keyframes ccCtaLineOne {
          to {
            opacity: .06;

            transform:
              rotate(-3deg)
              translateY(-18px);
          }
        }

        @keyframes ccCtaLineTwo {
          to {
            opacity: .25;

            transform:
              rotate(1deg)
              translateY(16px);
          }
        }

        @keyframes ccCtaLineThree {
          to {
            opacity: .18;

            transform:
              rotate(-2deg)
              translateY(-12px);
          }
        }

        @keyframes ccCtaParticleOne {
          50% {
            opacity: .35;

            transform:
              translate(-20px,17px);
          }
        }

        @keyframes ccCtaParticleTwo {
          50% {
            opacity: .28;

            transform:
              translate(18px,-20px);
          }
        }

        @keyframes ccCtaParticleThree {
          50% {
            opacity: .32;

            transform:
              translate(13px,14px);
          }
        }

        @keyframes ccCtaBottomMove {
          from {
            left: 17%;
          }

          to {
            left: 80%;
          }
        }

        /*
         * PHONE
         */

        @media (max-width: 700px) {
          .cc-cta {
            padding:
              11px
              10px
              20px;
          }

          .cc-cta-stage {
            min-height: 0;

            border-radius: 26px;
          }

          .cc-cta-stage::before {
            inset: 6px;

            border-radius: 20px;
          }

          .cc-cta-content {
            padding:
              38px
              17px
              31px;
          }

          .cc-cta-kicker {
            gap: 6px;

            font-size: 6.3px;

            letter-spacing: .13em;
          }

          .cc-cta-kicker-line {
            width: 26px;
          }

          .cc-cta-content h2 {
            margin-top: 16px;

            font-size:
              clamp(
                39px,
                11vw,
                52px
              );

            line-height: .91;
          }

          .cc-cta-copy {
            margin-top: 16px;

            font-size: 11.5px;

            line-height: 1.62;
          }

          .cc-cta-service-flow {
            gap: 6px 7px;

            margin-top: 14px;

            font-size: 5.7px;

            line-height: 1.5;
          }

          .cc-cta-actions {
            display: grid;

            grid-template-columns: 1fr;

            gap: 8px;

            margin-top: 20px;
          }

          .cc-cta-primary,
          .cc-cta-call {
            width: 100%;

            min-width: 0;
            min-height: 55px;
          }

          .cc-cta-primary {
            padding:
              0
              10px
              0
              20px;
          }

          .cc-cta-after {
            gap: 6px;

            margin-top: 15px;

            font-size: 5.5px;

            line-height: 1.5;
          }

          .cc-cta-after i {
            width: 10px;
          }

          .cc-cta-bottom {
            align-items: flex-start;

            flex-direction: column;

            gap: 8px;

            min-height: 0;

            padding:
              13px
              17px
              17px;
          }

          .cc-cta-bottom > div {
            font-size: 5.3px;
          }

          .cc-cta-bottom-motion {
            width: 100%;
            min-width: 0;
          }

          .cc-cta-word {
            right: -12px;
            bottom: 85px;

            font-size: 110px;
          }

          /*
           * SAME ORDER ON PHONE:
           * section first, content afterwards.
           */

          .cc-cta-motion.cc-cta-ready
          .cc-cta-stage {
            animation-duration: .76s;
          }

          .cc-cta-ready
          .cc-cta-kicker {
            animation-delay: .48s;
          }

          .cc-cta-ready
          .cc-cta-content h2
          > span:nth-child(1) {
            animation-delay: .60s;
          }

          .cc-cta-ready
          .cc-cta-content h2
          > span:nth-child(2) {
            animation-delay: .73s;
          }

          .cc-cta-ready
          .cc-cta-content h2
          > span:nth-child(3) {
            animation-delay: .86s;
          }

          .cc-cta-ready
          .cc-cta-copy {
            animation-delay: 1.02s;
          }

          .cc-cta-ready
          .cc-cta-service-flow {
            animation-delay: 1.16s;
          }

          .cc-cta-ready
          .cc-cta-actions {
            animation-delay: 1.30s;
          }

          .cc-cta-ready
          .cc-cta-after {
            animation-delay: 1.48s;
          }

          .cc-cta-ready
          .cc-cta-bottom {
            animation-delay: 1.64s;
          }
        }

        @media (max-width: 390px) {
          .cc-cta-content h2 {
            font-size:
              clamp(
                35px,
                10.7vw,
                46px
              );
          }

          .cc-cta-kicker strong {
            max-width: 220px;
          }
        }

        /*
         * ACCESSIBILITY
         */

        @media (
          prefers-reduced-motion: reduce
        ) {
          .cc-cta-stage,
          .cc-cta-kicker,
          .cc-cta-content h2 > span,
          .cc-cta-copy,
          .cc-cta-service-flow,
          .cc-cta-actions,
          .cc-cta-after,
          .cc-cta-bottom {
            opacity: 1 !important;

            clip-path: none !important;

            filter: none !important;

            transform: none !important;

            animation: none !important;
          }

          .cc-cta-sweep,
          .cc-cta-glow,
          .cc-cta-line,
          .cc-cta-particle,
          .cc-cta-kicker-dot,
          .cc-cta-bottom-motion > b {
            animation: none !important;
          }
        }
      `}</style>
    </section>
  );
}