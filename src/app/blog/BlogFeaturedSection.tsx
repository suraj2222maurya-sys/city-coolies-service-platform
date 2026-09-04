"use client";

import {
  useEffect,
  useRef,
} from "react";

import Link from "next/link";

export default function BlogFeaturedSection() {
  const sectionRef =
    useRef<HTMLElement | null>(
      null,
    );

  useEffect(() => {
    const section =
      sectionRef.current;

    if (!section) {
      return;
    }

    const reducedMotion =
      window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;

    if (reducedMotion) {
      section.classList.add(
        "cc-bf-active",
      );

      return;
    }

    section.classList.add(
      "cc-bf-motion",
    );

    let targetFlow = 0;
    let currentFlow = 0;
    let frame = 0;

    const activate = () => {
      /* cc-bf-video-replay-v2 */

      section.classList.remove(
        "cc-bf-active",
      );

      window.requestAnimationFrame(
        () => {
          window.requestAnimationFrame(
            () => {
              section.classList.add(
                "cc-bf-active",
              );
            },
          );
        },
      );
    };

    const observer =
      new IntersectionObserver(
        ([entry]) => {
          if (!entry) {
            return;
          }

          if (entry.isIntersecting) {
            activate();
          } else {
            /*
             * Reset only after the complete section
             * has moved outside the extended viewport.
             * This prevents flashing while reading.
             */
            section.classList.remove(
              "cc-bf-active",
            );
          }
        },
        {
          threshold: 0.06,

          /*
           * Start the cinematic opening before
           * the section reaches the screen center.
           * The same values work on desktop and phone.
           */
          rootMargin:
            "140px 0px 140px 0px",
        },
      );

    observer.observe(section);

    const initialRect =
      section.getBoundingClientRect();

    if (
      initialRect.top <
        window.innerHeight + 280 &&
      initialRect.bottom > -200
    ) {
      requestAnimationFrame(
        activate,
      );
    }

    const updateFlow = () => {
      const rect =
        section.getBoundingClientRect();

      const viewport =
        Math.max(
          window.innerHeight,
          1,
        );

      const center =
        rect.top +
        rect.height / 2;

      targetFlow =
        Math.max(
          -1,
          Math.min(
            1,
            (
              viewport / 2 -
              center
            ) /
              Math.max(
                viewport,
                rect.height,
              ),
          ),
        );
    };

    const animate = () => {
      currentFlow +=
        (
          targetFlow -
          currentFlow
        ) *
        0.045;

      section.style.setProperty(
        "--cc-flow",
        currentFlow.toFixed(4),
      );

      frame =
        requestAnimationFrame(
          animate,
        );
    };

    window.addEventListener(
      "scroll",
      updateFlow,
      {
        passive: true,
      },
    );

    window.addEventListener(
      "resize",
      updateFlow,
      {
        passive: true,
      },
    );

    updateFlow();
    animate();

    return () => {
      observer.disconnect();

      cancelAnimationFrame(
        frame,
      );

      window.removeEventListener(
        "scroll",
        updateFlow,
      );

      window.removeEventListener(
        "resize",
        updateFlow,
      );
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="blog-featured"
      className="cc-bf"
      aria-labelledby="blog-featured-heading"
    >
      <div
        className="cc-bf-background"
        aria-hidden="true"
      >
        <span className="cc-bf-aura cc-bf-aura-one" />
        <span className="cc-bf-aura cc-bf-aura-two" />

        <span className="cc-bf-flow cc-bf-flow-one" />
        <span className="cc-bf-flow cc-bf-flow-two" />

        <span className="cc-bf-particle cc-bf-particle-one" />
        <span className="cc-bf-particle cc-bf-particle-two" />
        <span className="cc-bf-particle cc-bf-particle-three" />
      </div>

      <div className="cc-bf-shell">
        <span
          className="cc-bf-opening-light"
          aria-hidden="true"
        />

        <div className="cc-bf-layout">
          <div className="cc-bf-copy">
            <div className="cc-bf-kicker">
              <i />

              <span />

              <strong>
                Featured Property Guide
              </strong>
            </div>

            <div className="cc-bf-edition">
              <span>
                CITY COOLIES EDITORIAL
              </span>

              <i />

              <span>
                PROPERTY CARE
              </span>
            </div>

            <h2 id="blog-featured-heading">
              <span>
                Catch small property
              </span>

              <span>
                problems{" "}
                <em>
                  before they grow.
                </em>
              </span>
            </h2>

            <p className="cc-bf-intro">
              A smarter property-care routine starts with
              noticing changes early, understanding what
              matters first and bringing in the right
              professional before a manageable issue
              becomes disruptive.
            </p>

            <div className="cc-bf-guide-line">
              <span>
                Observe early
              </span>

              <i />

              <span>
                Prioritise clearly
              </span>

              <i />

              <span>
                Act confidently
              </span>
            </div>

            <div className="cc-bf-actions">
              <Link
                href="/blog/smarter-property-maintenance-routine"
                className="cc-bf-primary"
              >
                <span>
                  Read Featured Guide
                </span>

                <i>
                  →
                </i>
              </Link>

              <div className="cc-bf-read-meta">
                <strong>
                  8 min read
                </strong>

                <span>
                  Practical property maintenance guide
                </span>
              </div>
            </div>
          </div>

          <div
            className="cc-bf-visual"
            aria-hidden="true"
          >
            <div className="cc-bf-radar">
              <span className="cc-bf-radar-aura" />

              <div className="cc-bf-ring cc-bf-ring-one">
                <i />
              </div>

              <div className="cc-bf-ring cc-bf-ring-two">
                <i />
              </div>

              <div className="cc-bf-ring cc-bf-ring-three">
                <i />
              </div>

              <span className="cc-bf-sweep" />

              <div className="cc-bf-core">
                <span className="cc-bf-core-index">
                  01
                </span>

                <strong>
                  CHECK
                  <br />
                  EARLY
                </strong>

                <i />
              </div>

              <div className="cc-bf-float cc-bf-float-one">
                <span>
                  OBSERVE
                </span>

                <b>
                  See the change
                </b>
              </div>

              <div className="cc-bf-float cc-bf-float-two">
                <span>
                  PRIORITISE
                </span>

                <b>
                  Know what matters
                </b>
              </div>

              <div className="cc-bf-float cc-bf-float-three">
                <span>
                  ACT
                </span>

                <b>
                  Choose the next step
                </b>
              </div>

              <span className="cc-bf-node cc-bf-node-one" />
              <span className="cc-bf-node cc-bf-node-two" />
              <span className="cc-bf-node cc-bf-node-three" />
            </div>

            <div className="cc-bf-timeline">
              <span className="cc-bf-timeline-track" />

              <div className="cc-bf-timeline-step">
                <i />

                <span>
                  NOTICE
                </span>
              </div>

              <div className="cc-bf-timeline-step">
                <i />

                <span>
                  ASSESS
                </span>
              </div>

              <div className="cc-bf-timeline-step">
                <i />

                <span>
                  RESOLVE
                </span>
              </div>

              <b />
            </div>
          </div>
        </div>

        <div className="cc-bf-footer">
          <span>
            PROPERTY CARE
          </span>

          <i />

          <span>
            PREVENTIVE MAINTENANCE
          </span>

          <i />

          <span>
            PROFESSIONAL GUIDANCE
          </span>

          <i />

          <span>
            BETTER DECISIONS
          </span>

          <b aria-hidden="true" />
        </div>
      </div>

      <style>{`
        :global(html) {
          scroll-behavior:
            smooth;
        }

        .cc-bf {
          --red: #f22030;
          --red-deep: #d8071c;
          --pink: #ff8fa3;
          --soft-pink: #fff0f3;
          --ink: #20242b;
          --muted: #626976;
          --cc-flow: 0;

          position: relative;
          isolation: isolate;

          width: 100%;

          padding:
            16px 18px;

          overflow: hidden;

          color:
            var(--ink);

          background:
            linear-gradient(
              180deg,
              #fffafb,
              #fff1f4
            );

          scroll-margin-top:
            105px;
        }

        /*
         * BACKGROUND ACTIVITY
         */

        .cc-bf-background {
          position: absolute;
          inset: 0;
          z-index: -3;

          overflow: hidden;

          pointer-events: none;
        }

        .cc-bf-aura {
          position: absolute;

          border-radius: 50%;

          filter: blur(10px);

          will-change:
            transform,
            opacity;
        }

        .cc-bf-aura-one {
          top: -230px;
          right: -90px;

          width: 560px;
          height: 560px;

          background:
            radial-gradient(
              circle,
              rgba(
                255,
                137,
                159,
                .29
              ),
              rgba(
                255,
                218,
                226,
                .08
              )
              43%,
              transparent
              70%
            );

          transform:
            translateY(
              calc(
                var(--cc-flow) *
                28px
              )
            );

          animation:
            ccBfAura
            6s
            ease-in-out
            infinite
            alternate;
        }

        .cc-bf-aura-two {
          bottom: -260px;
          left: -170px;

          width: 500px;
          height: 500px;

          background:
            radial-gradient(
              circle,
              rgba(
                242,
                32,
                48,
                .09
              ),
              transparent
              70%
            );

          transform:
            translateY(
              calc(
                var(--cc-flow) *
                -20px
              )
            );
        }

        .cc-bf-flow {
          position: absolute;

          height: 1px;

          background:
            linear-gradient(
              90deg,
              transparent,
              rgba(
                255,
                255,
                255,
                .98
              ),
              rgba(
                242,
                32,
                48,
                .22
              ),
              transparent
            );

          filter:
            drop-shadow(
              0 0 6px
              rgba(
                242,
                32,
                48,
                .22
              )
            );
        }

        .cc-bf-flow-one {
          top: 28%;
          right: -5%;

          width: 54%;

          transform:
            rotate(-7deg);

          animation:
            ccBfFlowOne
            6.3s
            ease-in-out
            infinite
            alternate;
        }

        .cc-bf-flow-two {
          right: -4%;
          bottom: 15%;

          width: 47%;

          opacity: .56;

          transform:
            rotate(-3deg);

          animation:
            ccBfFlowTwo
            7s
            ease-in-out
            infinite
            alternate;
        }

        .cc-bf-particle {
          position: absolute;

          border-radius: 50%;

          background: white;

          box-shadow:
            0 0 8px white,
            0 0 18px
            rgba(
              242,
              32,
              48,
              .55
            );
        }

        .cc-bf-particle-one {
          top: 18%;
          right: 16%;

          width: 6px;
          height: 6px;

          animation:
            ccBfParticleOne
            5s
            ease-in-out
            infinite;
        }

        .cc-bf-particle-two {
          right: 6%;
          bottom: 24%;

          width: 8px;
          height: 8px;

          animation:
            ccBfParticleTwo
            5.8s
            ease-in-out
            infinite;
        }

        .cc-bf-particle-three {
          left: 43%;
          bottom: 9%;

          width: 4px;
          height: 4px;

          animation:
            ccBfParticleThree
            4.8s
            ease-in-out
            infinite;
        }

        /*
         * MAIN COMPACT FRAME
         */

        .cc-bf-shell {
          position: relative;

          width:
            min(
              100%,
              1540px
            );

          margin:
            0 auto;

          padding:
            clamp(
              38px,
              3.5vw,
              52px
            )
            clamp(
              27px,
              3.7vw,
              54px
            )
            24px;

          overflow: hidden;

          border:
            1px solid
            rgba(
              242,
              32,
              48,
              .10
            );

          border-radius:
            28px;

          background:
            radial-gradient(
              circle at 81% 24%,
              rgba(
                255,
                150,
                170,
                .17
              ),
              transparent
              31%
            ),
            linear-gradient(
              116deg,
              rgba(
                255,
                255,
                255,
                .96
              ),
              rgba(
                255,
                250,
                251,
                .91
              )
              50%,
              rgba(
                255,
                237,
                242,
                .87
              )
            );

          box-shadow:
            inset
            0 1px 0
            rgba(
              255,
              255,
              255,
              .98
            ),
            0 18px 55px
            rgba(
              112,
              7,
              21,
              .055
            );
        }

        .cc-bf-shell::before {
          position: absolute;

          inset: 8px;

          content: "";

          pointer-events: none;

          border:
            1px solid
            rgba(
              255,
              255,
              255,
              .88
            );

          border-radius:
            21px;
        }

        /*
         * SAFE VIDEO OPEN
         */

        .cc-bf-motion
        .cc-bf-shell {
          opacity: .14;

          clip-path:
            inset(
              47%
              0
              47%
              0
              round
              28px
            );

          filter:
            blur(9px)
            brightness(1.06);

          transform:
            translateY(18px)
            scale(.99);
        }

        .cc-bf-motion.cc-bf-active
        .cc-bf-shell {
          animation:
            ccBfSectionOpen
            .90s
            cubic-bezier(.16,1,.3,1)
            forwards;
        }

        .cc-bf-opening-light {
          position: absolute;

          top: -70%;
          left: -24%;

          z-index: 30;

          width: 8%;
          height: 240%;

          pointer-events: none;

          opacity: 0;

          background:
            linear-gradient(
              90deg,
              transparent,
              rgba(
                255,
                255,
                255,
                .98
              ),
              rgba(
                255,
                150,
                170,
                .42
              ),
              transparent
            );

          filter: blur(8px);

          transform:
            rotate(20deg);
        }

        .cc-bf-active
        .cc-bf-opening-light {
          animation:
            ccBfOpeningLight
            2.2s
            ease
            .20s
            forwards;
        }

        /*
         * LAYOUT
         */

        .cc-bf-layout {
          position: relative;
          z-index: 3;

          display: grid;

          grid-template-columns:
            minmax(
              0,
              1.08fr
            )
            minmax(
              360px,
              .75fr
            );

          align-items: center;

          gap:
            35px
            55px;
        }

        /*
         * LEFT EDITORIAL COPY
         */

        .cc-bf-kicker {
          display: flex;
          align-items: center;

          gap: 8px;

          color:
            var(--red);
        }

        .cc-bf-kicker i {
          width: 7px;
          height: 7px;

          border-radius: 50%;

          background:
            var(--red);

          box-shadow:
            0 0 12px
            rgba(
              242,
              32,
              48,
              .62
            );
        }

        .cc-bf-kicker > span {
          width: 39px;
          height: 2px;

          background:
            linear-gradient(
              90deg,
              var(--red),
              transparent
            );
        }

        .cc-bf-kicker strong {
          margin-left: 4px;

          font-size: 8.5px;
          font-weight: 900;

          letter-spacing:
            .20em;

          text-transform:
            uppercase;
        }

        .cc-bf-motion
        .cc-bf-kicker {
          opacity: 0;

          filter: blur(6px);

          transform:
            translateX(-24px);
        }

        .cc-bf-active
        .cc-bf-kicker {
          animation:
            ccBfLeftReveal
            .56s
            cubic-bezier(.16,1,.3,1)
            .39s
            forwards;
        }

        .cc-bf-edition {
          display: flex;
          flex-wrap: wrap;
          align-items: center;

          gap: 8px;

          margin-top: 14px;

          color:
            #7d828c;

          font-size: 7.5px;
          font-weight: 850;

          letter-spacing:
            .13em;
        }

        .cc-bf-edition i {
          width: 4px;
          height: 4px;

          border-radius: 50%;

          background:
            rgba(
              242,
              32,
              48,
              .45
            );
        }

        .cc-bf-motion
        .cc-bf-edition {
          opacity: 0;

          transform:
            translateY(7px);
        }

        .cc-bf-active
        .cc-bf-edition {
          animation:
            ccBfFade
            .50s
            ease
            .52s
            forwards;
        }

        .cc-bf-copy h2 {
          max-width: 800px;

          margin:
            14px
            0
            0;

          font-size:
            clamp(
              42px,
              4.15vw,
              63px
            );

          font-weight: 760;

          line-height: .97;

          letter-spacing:
            -.052em;
        }

        .cc-bf-copy h2 > span {
          display: block;
        }

        .cc-bf-copy h2 em {
          color:
            var(--red);

          font-style: normal;
        }

        .cc-bf-motion
        .cc-bf-copy h2 > span {
          opacity: 0;

          filter: blur(9px);

          transform:
            translateY(38px);
        }

        .cc-bf-active
        .cc-bf-copy h2
        > span:first-child {
          animation:
            ccBfTitle
            .72s
            cubic-bezier(.16,1,.3,1)
            .60s
            forwards;
        }

        .cc-bf-active
        .cc-bf-copy h2
        > span:last-child {
          animation:
            ccBfTitle
            .76s
            cubic-bezier(.16,1,.3,1)
            .79s
            forwards;
        }

        .cc-bf-intro {
          max-width: 700px;

          margin:
            16px
            0
            0;

          color:
            var(--muted);

          font-size:
            clamp(
              12.5px,
              1vw,
              15px
            );

          line-height: 1.63;
        }

        .cc-bf-motion
        .cc-bf-intro {
          opacity: 0;

          clip-path:
            inset(
              0
              100%
              0
              0
            );

          filter: blur(4px);
        }

        .cc-bf-active
        .cc-bf-intro {
          animation:
            ccBfWrite
            .78s
            steps(32,end)
            1.00s
            forwards;
        }

        .cc-bf-guide-line {
          display: flex;
          flex-wrap: wrap;
          align-items: center;

          gap: 9px;

          margin-top: 14px;

          color:
            var(--red);

          font-size: 7.5px;
          font-weight: 900;

          letter-spacing:
            .10em;

          text-transform:
            uppercase;
        }

        .cc-bf-guide-line i {
          width: 20px;
          height: 1px;

          background:
            linear-gradient(
              90deg,
              rgba(
                242,
                32,
                48,
                .42
              ),
              transparent
            );
        }

        .cc-bf-motion
        .cc-bf-guide-line {
          opacity: 0;

          filter: blur(3px);

          transform:
            translateY(8px);
        }

        .cc-bf-active
        .cc-bf-guide-line {
          animation:
            ccBfFadeUp
            .55s
            ease
            1.16s
            forwards;
        }

        .cc-bf-actions {
          display: flex;
          align-items: center;
          flex-wrap: wrap;

          gap: 15px;

          margin-top: 21px;
        }

        .cc-bf-primary {
          display: inline-flex;
          align-items: center;
          justify-content: center;

          gap: 21px;

          min-height: 49px;

          padding:
            0 21px;

          border-radius: 999px;

          color: white;

          font-size: 10.5px;
          font-weight: 850;

          text-decoration: none;

          background:
            linear-gradient(
              100deg,
              #ff2d41,
              var(--red-deep)
            );

          box-shadow:
            0 13px 27px
            rgba(
              216,
              7,
              28,
              .20
            );

          transition:
            transform .25s ease,
            box-shadow .25s ease;
        }

        .cc-bf-primary:hover {
          transform:
            translateY(-3px);

          box-shadow:
            0 18px 34px
            rgba(
              216,
              7,
              28,
              .27
            );
        }

        .cc-bf-primary i {
          font-size: 16px;
          font-style: normal;
        }

        .cc-bf-read-meta {
          display: flex;
          flex-direction: column;

          gap: 2px;
        }

        .cc-bf-read-meta strong {
          color:
            var(--red);

          font-size: 8.5px;
          font-weight: 900;

          letter-spacing:
            .09em;

          text-transform:
            uppercase;
        }

        .cc-bf-read-meta span {
          color:
            #858a94;

          font-size: 9px;
        }

        .cc-bf-motion
        .cc-bf-actions {
          opacity: 0;

          filter: blur(5px);

          transform:
            translateY(12px);
        }

        .cc-bf-active
        .cc-bf-actions {
          animation:
            ccBfFadeUp
            .60s
            cubic-bezier(.16,1,.3,1)
            1.30s
            forwards;
        }

        /*
         * RIGHT VIDEO-LIKE CSS VISUAL
         */

        .cc-bf-visual {
          position: relative;

          width: 100%;
          height: 290px;

          perspective:
            1100px;

          transform-style:
            preserve-3d;
        }

        .cc-bf-motion
        .cc-bf-visual {
          opacity: 0;

          filter: blur(10px);

          transform:
            translateX(26px)
            scale(.94);
        }

        .cc-bf-active
        .cc-bf-visual {
          animation:
            ccBfVisualReveal
            .88s
            cubic-bezier(.16,1,.3,1)
            .76s
            forwards;
        }

        .cc-bf-radar {
          position: absolute;

          top: 0;
          left: 50%;

          width: 330px;
          height: 240px;

          transform:
            translateX(-50%);

          transform-style:
            preserve-3d;
        }

        .cc-bf-radar-aura {
          position: absolute;

          top: 50%;
          left: 50%;

          width: 275px;
          height: 185px;

          border-radius: 50%;

          background:
            radial-gradient(
              ellipse,
              rgba(
                255,
                255,
                255,
                .96
              ),
              rgba(
                255,
                143,
                163,
                .26
              )
              32%,
              rgba(
                242,
                32,
                48,
                .07
              )
              52%,
              transparent
              72%
            );

          filter: blur(7px);

          transform:
            translate(
              -50%,
              -50%
            );

          animation:
            ccBfRadarAura
            3.2s
            ease-in-out
            infinite
            alternate;
        }

        .cc-bf-ring {
          position: absolute;

          top: 50%;
          left: 50%;

          border:
            1px solid
            rgba(
              242,
              32,
              48,
              .18
            );

          border-radius: 50%;

          transform-origin:
            center;

          transform-style:
            preserve-3d;
        }

        .cc-bf-ring-one {
          width: 287px;
          height: 126px;

          margin:
            -63px
            0
            0
            -143.5px;

          transform:
            rotateX(67deg)
            rotateZ(-10deg);

          animation:
            ccBfRingOne
            7s
            linear
            infinite;
        }

        .cc-bf-ring-two {
          width: 225px;
          height: 170px;

          margin:
            -85px
            0
            0
            -112.5px;

          transform:
            rotateX(58deg)
            rotateZ(23deg);

          animation:
            ccBfRingTwo
            6s
            linear
            infinite
            reverse;
        }

        .cc-bf-ring-three {
          width: 175px;
          height: 175px;

          margin:
            -87.5px
            0
            0
            -87.5px;

          border-color:
            rgba(
              242,
              32,
              48,
              .10
            );

          animation:
            ccBfRingThree
            9s
            linear
            infinite;
        }

        .cc-bf-ring i {
          position: absolute;

          top: -5px;
          left:
            calc(
              50% -
              5px
            );

          width: 10px;
          height: 10px;

          border-radius: 50%;

          background:
            radial-gradient(
              circle,
              white,
              #ff8ca0 50%,
              var(--red)
            );

          box-shadow:
            0 0 9px white,
            0 0 18px
            rgba(
              242,
              32,
              48,
              .55
            );
        }

        .cc-bf-sweep {
          position: absolute;

          top: 50%;
          left: 50%;

          width: 220px;
          height: 220px;

          border-radius: 50%;

          opacity: .38;

          background:
            conic-gradient(
              from 0deg,
              transparent 0deg,
              transparent 305deg,
              rgba(
                255,
                255,
                255,
                .9
              )
              330deg,
              rgba(
                242,
                32,
                48,
                .23
              )
              346deg,
              transparent
              360deg
            );

          mask:
            radial-gradient(
              circle,
              transparent
              0 52%,
              #000
              53%
            );

          transform:
            translate(
              -50%,
              -50%
            );

          animation:
            ccBfSweep
            5.5s
            linear
            infinite;
        }

        .cc-bf-core {
          position: absolute;

          top: 50%;
          left: 50%;

          z-index: 5;

          display: flex;
          flex-direction: column;

          align-items: center;
          justify-content: center;

          width: 112px;
          height: 112px;

          border:
            1px solid
            rgba(
              255,
              255,
              255,
              .95
            );

          border-radius:
            34px;

          background:
            linear-gradient(
              145deg,
              rgba(
                255,
                255,
                255,
                .96
              ),
              rgba(
                255,
                235,
                240,
                .88
              )
            );

          box-shadow:
            inset
            0 0 22px
            white,
            0 18px 35px
            rgba(
              197,
              6,
              27,
              .13
            );

          transform:
            translate(
              -50%,
              -50%
            )
            rotateX(7deg)
            rotateZ(-3deg);

          animation:
            ccBfCoreFloat
            3.6s
            ease-in-out
            infinite
            alternate;
        }

        .cc-bf-core::before {
          position: absolute;

          inset: 7px;

          content: "";

          border:
            1px solid
            rgba(
              242,
              32,
              48,
              .10
            );

          border-radius:
            28px;
        }

        .cc-bf-core-index {
          color:
            rgba(
              242,
              32,
              48,
              .39
            );

          font-size: 11px;
          font-weight: 900;

          letter-spacing:
            .10em;
        }

        .cc-bf-core strong {
          margin-top: 5px;

          color:
            var(--red);

          font-size: 18px;
          font-weight: 900;

          line-height: .94;

          letter-spacing:
            -.03em;

          text-align: center;
        }

        .cc-bf-core > i {
          width: 27px;
          height: 2px;

          margin-top: 9px;

          background:
            linear-gradient(
              90deg,
              var(--red),
              transparent
            );
        }

        /*
         * FLOATING DOM LABELS
         */

        .cc-bf-float {
          position: absolute;
          z-index: 8;

          display: flex;
          flex-direction: column;

          min-width: 98px;

          padding:
            9px 11px;

          border:
            1px solid
            rgba(
              242,
              32,
              48,
              .10
            );

          border-radius:
            14px;

          background:
            rgba(
              255,
              255,
              255,
              .73
            );

          backdrop-filter:
            blur(10px);

          box-shadow:
            0 9px 20px
            rgba(
              113,
              8,
              23,
              .05
            );
        }

        .cc-bf-float span {
          color:
            var(--red);

          font-size: 6.5px;
          font-weight: 900;

          letter-spacing:
            .12em;
        }

        .cc-bf-float b {
          margin-top: 3px;

          color:
            #555b66;

          font-size: 7.5px;
          font-weight: 700;

          white-space: nowrap;
        }

        .cc-bf-float-one {
          top: 15px;
          left: 5px;

          animation:
            ccBfFloatOne
            4.2s
            ease-in-out
            infinite
            alternate;
        }

        .cc-bf-float-two {
          top: 54px;
          right: -2px;

          animation:
            ccBfFloatTwo
            4.7s
            ease-in-out
            infinite
            alternate;
        }

        .cc-bf-float-three {
          right: 25px;
          bottom: 5px;

          animation:
            ccBfFloatThree
            4s
            ease-in-out
            infinite
            alternate;
        }

        .cc-bf-node {
          position: absolute;
          z-index: 9;

          width: 7px;
          height: 7px;

          border-radius: 50%;

          background:
            white;

          box-shadow:
            0 0 0 3px
            rgba(
              242,
              32,
              48,
              .10
            ),
            0 0 13px
            rgba(
              242,
              32,
              48,
              .45
            );
        }

        .cc-bf-node-one {
          top: 35px;
          right: 87px;

          animation:
            ccBfNodeOne
            3.7s
            ease-in-out
            infinite;
        }

        .cc-bf-node-two {
          left: 61px;
          bottom: 42px;

          animation:
            ccBfNodeTwo
            4.1s
            ease-in-out
            infinite;
        }

        .cc-bf-node-three {
          right: 65px;
          bottom: 80px;

          animation:
            ccBfNodeThree
            4.8s
            ease-in-out
            infinite;
        }

        /*
         * VIDEO TIMELINE
         */

        .cc-bf-timeline {
          position: absolute;

          left: 50%;
          bottom: 2px;

          display: flex;
          align-items: center;
          justify-content:
            space-between;

          width: 310px;
          height: 43px;

          padding:
            0 13px;

          overflow: hidden;

          border:
            1px solid
            rgba(
              242,
              32,
              48,
              .10
            );

          border-radius:
            999px;

          background:
            rgba(
              255,
              255,
              255,
              .68
            );

          transform:
            translateX(-50%);
        }

        .cc-bf-timeline-track {
          position: absolute;

          top: 50%;
          left: 14%;

          width: 72%;
          height: 1px;

          background:
            linear-gradient(
              90deg,
              rgba(
                242,
                32,
                48,
                .13
              ),
              rgba(
                242,
                32,
                48,
                .29
              ),
              rgba(
                242,
                32,
                48,
                .13
              )
            );
        }

        .cc-bf-timeline-step {
          position: relative;
          z-index: 3;

          display: flex;
          align-items: center;

          gap: 5px;

          color:
            #666c76;

          font-size: 6.5px;
          font-weight: 900;

          letter-spacing:
            .10em;
        }

        .cc-bf-timeline-step i {
          width: 6px;
          height: 6px;

          border:
            2px solid
            var(--red);

          border-radius: 50%;

          background:
            white;
        }

        .cc-bf-timeline > b {
          position: absolute;

          top: 50%;
          left: 14%;

          width: 10px;
          height: 10px;

          margin-top: -5px;

          border-radius: 50%;

          background:
            white;

          box-shadow:
            0 0 0 3px
            rgba(
              242,
              32,
              48,
              .12
            ),
            0 0 14px
            rgba(
              242,
              32,
              48,
              .45
            );

          animation:
            ccBfTimeline
            4.3s
            cubic-bezier(.45,0,.55,1)
            infinite
            alternate;
        }

        /*
         * BOTTOM STREAM
         */

        .cc-bf-footer {
          position: relative;
          z-index: 4;

          display: flex;
          align-items: center;
          justify-content: center;
          flex-wrap: wrap;

          gap: 9px;

          min-height: 39px;

          margin-top: 17px;

          padding:
            10px 15px
            0;

          overflow: hidden;

          border-top:
            1px solid
            rgba(
              242,
              32,
              48,
              .08
            );

          color:
            #737983;

          font-size: 7px;
          font-weight: 900;

          letter-spacing:
            .12em;
        }

        .cc-bf-footer i {
          width: 4px;
          height: 4px;

          border-radius: 50%;

          background:
            var(--red);

          box-shadow:
            0 0 7px
            rgba(
              242,
              32,
              48,
              .30
            );
        }

        .cc-bf-footer > b {
          position: absolute;

          top: -70%;
          left: -20%;

          width: 7%;
          height: 230%;

          opacity: 0;

          background:
            linear-gradient(
              90deg,
              transparent,
              white,
              rgba(
                255,
                153,
                171,
                .55
              ),
              transparent
            );

          filter: blur(5px);

          transform:
            rotate(18deg);

          animation:
            ccBfFooterLight
            5s
            ease
            infinite;
        }

        .cc-bf-motion
        .cc-bf-footer {
          opacity: 0;

          filter: blur(4px);

          transform:
            translateY(9px);
        }

        .cc-bf-active
        .cc-bf-footer {
          animation:
            ccBfFadeUp
            .55s
            ease
            1.55s
            forwards;
        }

        /*
         * ENTRY KEYFRAMES
         */

        @keyframes ccBfSectionOpen {
          0% {
            opacity: .14;

            clip-path:
              inset(
                47%
                0
                47%
                0
                round
                28px
              );

            filter:
              blur(9px)
              brightness(1.06);

            transform:
              translateY(18px)
              scale(.99);
          }

          100% {
            opacity: 1;

            clip-path:
              inset(
                0
                0
                0
                0
                round
                28px
              );

            filter: blur(0);

            transform:
              translateY(0)
              scale(1);
          }
        }

        @keyframes ccBfOpeningLight {
          0% {
            left: -24%;

            opacity: 0;
          }

          17% {
            opacity: .78;
          }

          100% {
            left: 118%;

            opacity: 0;
          }
        }

        @keyframes ccBfLeftReveal {
          to {
            opacity: 1;

            filter: blur(0);

            transform:
              translateX(0);
          }
        }

        @keyframes ccBfFade {
          to {
            opacity: 1;

            transform:
              translateY(0);
          }
        }

        @keyframes ccBfTitle {
          to {
            opacity: 1;

            filter: blur(0);

            transform:
              translateY(0);
          }
        }

        @keyframes ccBfWrite {
          0% {
            opacity: 0;

            clip-path:
              inset(
                0
                100%
                0
                0
              );

            filter: blur(4px);
          }

          10% {
            opacity: 1;
          }

          100% {
            opacity: 1;

            clip-path:
              inset(
                0
                0
                0
                0
              );

            filter: blur(0);
          }
        }

        @keyframes ccBfFadeUp {
          to {
            opacity: 1;

            filter: blur(0);

            transform:
              translateY(0);
          }
        }

        @keyframes ccBfVisualReveal {
          to {
            opacity: 1;

            filter: blur(0);

            transform:
              translateX(0)
              scale(1);
          }
        }

        /*
         * CONTINUOUS MOTION
         */

        @keyframes ccBfAura {
          to {
            opacity: .65;

            scale: 1.07;
          }
        }

        @keyframes ccBfFlowOne {
          to {
            transform:
              rotate(-4deg)
              translateY(-17px);

            opacity: .27;
          }
        }

        @keyframes ccBfFlowTwo {
          to {
            transform:
              rotate(-6deg)
              translateY(14px);

            opacity: .25;
          }
        }

        @keyframes ccBfParticleOne {
          50% {
            transform:
              translate(
                21px,
                -16px
              );

            opacity: .55;
          }
        }

        @keyframes ccBfParticleTwo {
          50% {
            transform:
              translate(
                -20px,
                22px
              );

            opacity: .62;
          }
        }

        @keyframes ccBfParticleThree {
          50% {
            transform:
              translate(
                18px,
                -13px
              );

            opacity: .42;
          }
        }

        @keyframes ccBfRadarAura {
          to {
            opacity: .62;

            transform:
              translate(
                -50%,
                -50%
              )
              scale(1.08);
          }
        }

        @keyframes ccBfRingOne {
          to {
            transform:
              rotateX(67deg)
              rotateZ(350deg);
          }
        }

        @keyframes ccBfRingTwo {
          to {
            transform:
              rotateX(58deg)
              rotateZ(-337deg);
          }
        }

        @keyframes ccBfRingThree {
          to {
            transform:
              rotate(360deg);
          }
        }

        @keyframes ccBfSweep {
          to {
            transform:
              translate(
                -50%,
                -50%
              )
              rotate(360deg);
          }
        }

        @keyframes ccBfCoreFloat {
          from {
            transform:
              translate(
                -50%,
                -50%
              )
              rotateX(7deg)
              rotateZ(-3deg)
              translateY(-4px);
          }

          to {
            transform:
              translate(
                -50%,
                -50%
              )
              rotateX(2deg)
              rotateZ(3deg)
              translate3d(
                0,
                8px,
                18px
              );
          }
        }

        @keyframes ccBfFloatOne {
          to {
            transform:
              translate(
                7px,
                -6px
              )
              rotate(-1deg);
          }
        }

        @keyframes ccBfFloatTwo {
          to {
            transform:
              translate(
                -8px,
                7px
              )
              rotate(1deg);
          }
        }

        @keyframes ccBfFloatThree {
          to {
            transform:
              translate(
                -4px,
                -7px
              );
          }
        }

        @keyframes ccBfNodeOne {
          50% {
            transform:
              translate(
                -10px,
                8px
              );
          }
        }

        @keyframes ccBfNodeTwo {
          50% {
            transform:
              translate(
                9px,
                -7px
              );
          }
        }

        @keyframes ccBfNodeThree {
          50% {
            transform:
              translate(
                -8px,
                -8px
              );
          }
        }

        @keyframes ccBfTimeline {
          from {
            left: 14%;
          }

          to {
            left: 82%;
          }
        }

        @keyframes ccBfFooterLight {
          0% {
            left: -20%;

            opacity: 0;
          }

          15% {
            opacity: .85;
          }

          58%,
          100% {
            left: 117%;

            opacity: 0;
          }
        }

        /*
         * TABLET
         */

        @media (
          max-width: 960px
        ) {
          .cc-bf-layout {
            grid-template-columns:
              minmax(
                0,
                1fr
              )
              320px;

            gap: 30px;
          }

          .cc-bf-radar {
            transform:
              translateX(-50%)
              scale(.90);
          }

          .cc-bf-timeline {
            width: 280px;
          }
        }

        /*
         * PHONE
         */

        @media (
          max-width: 700px
        ) {
          .cc-bf {
            padding: 10px;
          }

          .cc-bf-shell {
            padding:
              30px 14px
              19px;

            border-radius: 22px;
          }

          .cc-bf-shell::before {
            inset: 6px;

            border-radius: 16px;
          }

          .cc-bf-layout {
            grid-template-columns:
              1fr;

            gap: 12px;
          }

          .cc-bf-kicker strong {
            font-size: 7.2px;

            letter-spacing:
              .16em;
          }

          .cc-bf-kicker > span {
            width: 28px;
          }

          .cc-bf-edition {
            margin-top: 11px;

            font-size: 6.7px;
          }

          .cc-bf-copy h2 {
            margin-top: 12px;

            font-size:
              clamp(
                34px,
                10vw,
                47px
              );
          }

          .cc-bf-intro {
            margin-top: 12px;

            font-size: 11.5px;

            line-height: 1.58;
          }

          .cc-bf-guide-line {
            gap: 6px;

            margin-top: 10px;

            font-size: 6.5px;
          }

          .cc-bf-guide-line i {
            width: 11px;
          }

          .cc-bf-actions {
            align-items:
              flex-start;

            flex-direction:
              column;

            gap: 8px;

            margin-top: 16px;
          }

          .cc-bf-primary {
            width: 100%;

            justify-content:
              space-between;

            min-height: 46px;
          }

          .cc-bf-read-meta {
            padding-left: 3px;
          }

          /*
           * Compact mobile video visual.
           */

          .cc-bf-visual {
            height: 165px;

            margin-top: 2px;
          }

          .cc-bf-radar {
            top: -31px;

            width: 260px;
            height: 190px;

            transform:
              translateX(-50%)
              scale(.65);
          }

          .cc-bf-timeline {
            bottom: 1px;

            width: 100%;
            height: 38px;
          }

          .cc-bf-float {
            display: none;
          }

          .cc-bf-footer {
            gap:
              6px 8px;

            margin-top: 9px;

            padding:
              9px 5px
              0;

            font-size: 6.2px;

            line-height: 1.45;
          }
        }

        @media (
          max-width: 390px
        ) {
          .cc-bf-copy h2 {
            font-size:
              clamp(
                32px,
                10.2vw,
                42px
              );
          }

          .cc-bf-visual {
            height: 150px;
          }

          .cc-bf-radar {
            top: -38px;

            transform:
              translateX(-50%)
              scale(.58);
          }

          .cc-bf-timeline-step {
            font-size: 5.8px;
          }
        }

        /*
         * ACCESSIBILITY
         */

        @media (
          prefers-reduced-motion:
          reduce
        ) {
          .cc-bf-shell,
          .cc-bf-kicker,
          .cc-bf-edition,
          .cc-bf-copy h2 > span,
          .cc-bf-intro,
          .cc-bf-guide-line,
          .cc-bf-actions,
          .cc-bf-visual,
          .cc-bf-footer {
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

          .cc-bf-opening-light,
          .cc-bf-aura,
          .cc-bf-flow,
          .cc-bf-particle,
          .cc-bf-radar-aura,
          .cc-bf-ring,
          .cc-bf-sweep,
          .cc-bf-core,
          .cc-bf-float,
          .cc-bf-node,
          .cc-bf-timeline > b,
          .cc-bf-footer > b {
            animation:
              none !important;
          }
        }
      

/* === CC FEATURED VIDEO REPLAY V2 START === */

/*
 * Each time cc-bf-active is added again,
 * the complete cinematic sequence starts from zero.
 */

.cc-bf-motion.cc-bf-active
.cc-bf-shell {
  animation:
    ccBfSectionOpen
    .90s
    cubic-bezier(.16,1,.3,1)
    forwards !important;
}

.cc-bf-active
.cc-bf-opening-light {
  animation:
    ccBfOpeningLight
    2.2s
    ease
    .20s
    forwards !important;
}

.cc-bf-active
.cc-bf-kicker {
  animation:
    ccBfLeftReveal
    .56s
    cubic-bezier(.16,1,.3,1)
    .39s
    forwards !important;
}

.cc-bf-active
.cc-bf-edition {
  animation:
    ccBfFade
    .50s
    ease
    .52s
    forwards !important;
}

.cc-bf-active
.cc-bf-copy h2
> span:first-child {
  animation:
    ccBfTitle
    .72s
    cubic-bezier(.16,1,.3,1)
    .60s
    forwards !important;
}

.cc-bf-active
.cc-bf-copy h2
> span:last-child {
  animation:
    ccBfTitle
    .76s
    cubic-bezier(.16,1,.3,1)
    .79s
    forwards !important;
}

.cc-bf-active
.cc-bf-intro {
  animation:
    ccBfWrite
    .78s
    steps(32,end)
    1s
    forwards !important;
}

.cc-bf-active
.cc-bf-guide-line {
  animation:
    ccBfFadeUp
    .55s
    ease
    1.16s
    forwards !important;
}

.cc-bf-active
.cc-bf-actions {
  animation:
    ccBfFadeUp
    .60s
    cubic-bezier(.16,1,.3,1)
    1.30s
    forwards !important;
}

.cc-bf-active
.cc-bf-visual {
  animation:
    ccBfVisualReveal
    .88s
    cubic-bezier(.16,1,.3,1)
    .76s
    forwards !important;
}

.cc-bf-active
.cc-bf-footer {
  animation:
    ccBfFadeUp
    .55s
    ease
    1.55s
    forwards !important;
}


/*
 * PHONE
 *
 * Same video sequence, slightly quicker so the
 * user does not wait while scrolling a smaller screen.
 */

@media (max-width: 700px) {
  .cc-bf-motion.cc-bf-active
  .cc-bf-shell {
    animation-duration:
      .76s !important;
  }

  .cc-bf-active
  .cc-bf-kicker {
    animation-delay:
      .30s !important;
  }

  .cc-bf-active
  .cc-bf-edition {
    animation-delay:
      .40s !important;
  }

  .cc-bf-active
  .cc-bf-copy h2
  > span:first-child {
    animation-delay:
      .48s !important;
  }

  .cc-bf-active
  .cc-bf-copy h2
  > span:last-child {
    animation-delay:
      .63s !important;
  }

  .cc-bf-active
  .cc-bf-intro {
    animation-delay:
      .79s !important;
  }

  .cc-bf-active
  .cc-bf-guide-line {
    animation-delay:
      .93s !important;
  }

  .cc-bf-active
  .cc-bf-visual {
    animation-delay:
      .70s !important;
  }

  .cc-bf-active
  .cc-bf-actions {
    animation-delay:
      1.04s !important;
  }

  .cc-bf-active
  .cc-bf-footer {
    animation-delay:
      1.25s !important;
  }
}


/*
 * Make scrolling feel fluid without changing layout.
 */

.cc-bf-background,
.cc-bf-visual {
  will-change:
    transform,
    opacity;
}

.cc-bf {
  -webkit-overflow-scrolling:
    touch;
}


/*
 * Accessibility fallback.
 */

@media (
  prefers-reduced-motion:
  reduce
) {
  .cc-bf-shell,
  .cc-bf-kicker,
  .cc-bf-edition,
  .cc-bf-copy h2 > span,
  .cc-bf-intro,
  .cc-bf-guide-line,
  .cc-bf-actions,
  .cc-bf-visual,
  .cc-bf-footer {
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
}

/* === CC FEATURED VIDEO REPLAY V2 END === */
`}</style>
    </section>
  );
}