"use client";

import {
  useEffect,
  useRef,
  useState,
} from "react";

const cultureStories = [
  {
    number: "01",
    eyebrow: "OWN THE OUTCOME",
    title: "Think beyond the task.",
    accent: "Own the result.",
    text:
      "We want people to understand why the work matters, make thoughtful decisions and follow through with professional care. Ownership creates stronger work and better customer experiences.",
  },
  {
    number: "02",
    eyebrow: "KEEP GROWING",
    title: "Skills should never",
    accent: "stand still.",
    text:
      "Careers grow through meaningful work, practical learning, useful feedback and increasing responsibility. Progress should become visible in the quality of the work.",
  },
  {
    number: "03",
    eyebrow: "MOVE AS ONE TEAM",
    title: "Different roles.",
    accent: "One professional standard.",
    text:
      "Strong service experiences depend on people sharing context, communicating clearly and helping each other solve the real customer problem.",
  },
  {
    number: "04",
    eyebrow: "EARN CUSTOMER TRUST",
    title: "Create work people",
    accent: "can rely on.",
    text:
      "Customer trust is earned through clarity, reliability, quality and follow-through. Every role contributes to a professional City Coolies experience.",
  },
] as const;

export default function CareersCultureSection() {
  const sectionRef =
    useRef<HTMLElement | null>(null);

  const [activeStory, setActiveStory] =
    useState(0);

  useEffect(() => {
    const section =
      sectionRef.current;

    if (!section) {
      return;
    }

    const reduceMotion =
      window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;

    if (reduceMotion) {
      section.classList.add(
        "cc-culture-active",
      );

      return;
    }

    let targetX = 0;
    let targetY = 0;

    let currentX = 0;
    let currentY = 0;

    let targetScroll = 0;
    let currentScroll = 0;

    let animationFrame = 0;

    const updateScroll = () => {
      const rect =
        section.getBoundingClientRect();

      const viewport =
        Math.max(
          window.innerHeight,
          1,
        );

      const sectionCenter =
        rect.top +
        rect.height / 2;

      targetScroll =
        Math.max(
          -1,
          Math.min(
            1,
            (
              viewport / 2 -
              sectionCenter
            ) /
              Math.max(
                rect.height,
                viewport,
              ),
          ),
        );
    };

    const handlePointerMove = (
      event: PointerEvent,
    ) => {
      const rect =
        section.getBoundingClientRect();

      targetX =
        (
          (
            event.clientX -
            rect.left
          ) /
          Math.max(
            rect.width,
            1,
          ) -
          0.5
        ) *
        2;

      targetY =
        (
          (
            event.clientY -
            rect.top
          ) /
          Math.max(
            rect.height,
            1,
          ) -
          0.5
        ) *
        2;
    };

    const handlePointerLeave = () => {
      targetX = 0;
      targetY = 0;
    };

    const animate = () => {
      currentX +=
        (
          targetX -
          currentX
        ) *
        0.045;

      currentY +=
        (
          targetY -
          currentY
        ) *
        0.045;

      currentScroll +=
        (
          targetScroll -
          currentScroll
        ) *
        0.045;

      section.style.setProperty(
        "--cc-x",
        currentX.toFixed(4),
      );

      section.style.setProperty(
        "--cc-y",
        currentY.toFixed(4),
      );

      section.style.setProperty(
        "--cc-scroll",
        currentScroll.toFixed(4),
      );

      animationFrame =
        window.requestAnimationFrame(
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

          section.classList.add(
            "cc-culture-active",
          );

          observer.disconnect();
        },
        {
          threshold: 0.14,
          rootMargin:
            "4% 0px -7% 0px",
        },
      );

    observer.observe(section);

    section.addEventListener(
      "pointermove",
      handlePointerMove,
      {
        passive: true,
      },
    );

    section.addEventListener(
      "pointerleave",
      handlePointerLeave,
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

      window.cancelAnimationFrame(
        animationFrame,
      );

      section.removeEventListener(
        "pointermove",
        handlePointerMove,
      );

      section.removeEventListener(
        "pointerleave",
        handlePointerLeave,
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

  useEffect(() => {
    const timer =
      window.setInterval(
        () => {
          setActiveStory(
            (current) =>
              (
                current + 1
              ) %
              cultureStories.length,
          );
        },
        4300,
      );

    return () => {
      window.clearInterval(
        timer,
      );
    };
  }, []);

  const story =
    cultureStories[
      activeStory
    ];

  return (
    <section
      ref={sectionRef}
      id="careers-culture"
      className="cc-culture"
      aria-labelledby="careers-culture-title"
    >
      <div
        className="cc-culture-grid"
        aria-hidden="true"
      />

      <div
        className="cc-culture-glow"
        aria-hidden="true"
      />

      <span className="cc-bg-dot cc-bg-dot-one" />
      <span className="cc-bg-dot cc-bg-dot-two" />
      <span className="cc-bg-dot cc-bg-dot-three" />

      <div className="cc-culture-container">
        <div className="cc-culture-copy">
          <div className="cc-culture-eyebrow-wrap">
            <div className="cc-culture-eyebrow">
              <span />

              <strong>
                Inside City Coolies
                <i>•</i>
                Career Culture
              </strong>
            </div>
          </div>

          <h2 id="careers-culture-title">
            <span className="cc-title-row">
              <span>
                <b>Build</b>
              </span>

              <span>
                <b>skills.</b>
              </span>

              <span>
                <b>Create</b>
              </span>

              <span>
                <b>impact.</b>
              </span>
            </span>

            <span className="cc-title-row cc-title-row-red">
              <span>
                <b>Grow</b>
              </span>

              <span>
                <b>with</b>
              </span>

              <span>
                <b>the</b>
              </span>

              <span>
                <b>work.</b>
              </span>
            </span>
          </h2>

          <p className="cc-culture-intro">
            <span className="cc-intro-line cc-intro-line-one">
              <strong>
                Careers at City Coolies are built around meaningful work and real progress.
              </strong>
            </span>

            <span className="cc-intro-line cc-intro-line-two">
              Our professional service culture connects ownership,
            </span>

            <span className="cc-intro-line cc-intro-line-three">
              continuous learning, teamwork and customer trust
            </span>

            <span className="cc-intro-line cc-intro-line-four">
              so people can grow while creating better experiences.
            </span>
          </p>

          <div className="cc-culture-story-stage">
          <div className="cc-story-shell">
            <span
              className="cc-story-beam"
              aria-hidden="true"
            />

            <div
              key={story.number}
              className="cc-story"
            >
              <span className="cc-story-number">
                {story.number}
              </span>

              <small>
                {story.eyebrow}
              </small>

              <h3>
                {story.title}
                <br />

                <em>
                  {story.accent}
                </em>
              </h3>

              <p>
                {story.text}
              </p>
            </div>

            <div
              className="cc-story-progress"
              aria-label="Career culture principles"
            >
              {cultureStories.map(
                (
                  item,
                  index,
                ) => (
                  <button
                    key={
                      item.number
                    }
                    type="button"
                    aria-label={
                      item.eyebrow
                    }
                    aria-pressed={
                      index ===
                      activeStory
                    }
                    className={
                      index ===
                      activeStory
                        ? "is-active"
                        : ""
                    }
                    onClick={() =>
                      setActiveStory(
                        index,
                      )
                    }
                  />
                ),
              )}
            </div>
          </div>
          </div>
        </div>

        <div
          className="cc-culture-ticker"
          aria-hidden="true"
        >
          <div>
            <b>Meaningful Work</b>
            <i>✦</i>

            <b>Career Growth</b>
            <i>✦</i>

            <b>Continuous Learning</b>
            <i>✦</i>

            <b>Professional Culture</b>
            <i>✦</i>

            <b>Customer Trust</b>
            <i>✦</i>

            <b>Meaningful Work</b>
            <i>✦</i>

            <b>Career Growth</b>
            <i>✦</i>

            <b>Continuous Learning</b>
            <i>✦</i>

            <b>Professional Culture</b>
            <i>✦</i>

            <b>Customer Trust</b>
          </div>
        </div>
      </div>

      <style>{`
        .cc-culture {
          --cc-red: #f02030;
          --cc-red-dark: #d9081c;
          --cc-ink: #17191f;
          --cc-muted: #686b75;

          --cc-x: 0;
          --cc-y: 0;
          --cc-scroll: 0;

          position: relative;
          isolation: isolate;

          width: 100%;
          min-height: 760px;

          overflow: hidden;

          color:
            var(--cc-ink);

          background:
            radial-gradient(
              circle at 84% 25%,
              rgba(
                255,
                190,
                202,
                .21
              ),
              rgba(
                255,
                229,
                234,
                .08
              )
              27%,
              transparent 51%
            ),
            linear-gradient(
              116deg,
              #ffffff 0%,
              #fffafa 36%,
              #fff1f4 72%,
              #ffffff 100%
            );

          border-top:
            1px solid
            rgba(
              240,
              32,
              48,
              .08
            );

          border-bottom:
            1px solid
            rgba(
              240,
              32,
              48,
              .08
            );

          perspective: 1500px;
        }

        .cc-culture-grid {
          position: absolute;
          inset: 0;
          z-index: -8;

          opacity: .21;

          background-image:
            linear-gradient(
              to right,
              rgba(
                240,
                32,
                48,
                .05
              )
              1px,
              transparent 1px
            ),
            linear-gradient(
              to bottom,
              rgba(
                240,
                32,
                48,
                .04
              )
              1px,
              transparent 1px
            );

          background-size:
            44px 44px;

          mask-image:
            linear-gradient(
              90deg,
              black,
              transparent 92%
            );

          transform:
            translate3d(
              calc(
                var(--cc-x) *
                -8px
              ),
              calc(
                var(--cc-scroll) *
                20px
              ),
              0
            );
        }

        .cc-culture-glow {
          position: absolute;

          top: -110px;
          right: -55px;

          z-index: -7;

          width: 340px;
          height: 340px;

          border-radius: 50%;

          background:
            radial-gradient(
              circle,
              rgba(
                240,
                32,
                48,
                .11
              ),
              rgba(
                255,
                210,
                219,
                .05
              )
              48%,
              transparent 70%
            );

          filter: blur(4px);

          animation:
            ccBackgroundGlow
            8s
            ease-in-out
            infinite
            alternate;
        }

        .cc-bg-dot {
          position: absolute;
          z-index: -5;

          border-radius: 50%;

          background:
            var(--cc-red);

          opacity: .23;

          box-shadow:
            0 0 16px
            rgba(
              240,
              32,
              48,
              .30
            );
        }

        .cc-bg-dot-one {
          top: 17%;
          left: 42%;

          width: 6px;
          height: 6px;

          animation:
            ccBackgroundDotOne
            5.3s
            ease-in-out
            infinite;
        }

        .cc-bg-dot-two {
          right: 8%;
          top: 32%;

          width: 5px;
          height: 5px;

          animation:
            ccBackgroundDotTwo
            6s
            ease-in-out
            infinite;
        }

        .cc-bg-dot-three {
          right: 27%;
          bottom: 18%;

          width: 8px;
          height: 8px;

          animation:
            ccBackgroundDotThree
            6.8s
            ease-in-out
            infinite;
        }

        .cc-culture-container {
          position: relative;

          width:
            min(
              calc(
                100% - 72px
              ),
              1480px
            );

          min-height: 760px;

          margin: 0 auto;

          padding:
            clamp(
              62px,
              6vw,
              84px
            )
            0
            58px;
        }

        /*
         * LEFT SIDE - RESTORED PREMIUM DESIGN
         */

        .cc-culture-copy {
          position: relative;
          z-index: 10;

          width:
            min(
              57%,
              760px
            );

          transform:
            translate3d(
              calc(
                var(--cc-x) *
                -7px
              ),
              calc(
                var(--cc-scroll) *
                -18px
              ),
              0
            );
        }

        .cc-culture-eyebrow-wrap {
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

        .cc-culture-active
        .cc-culture-eyebrow-wrap {
          animation:
            ccEyebrowReveal
            .72s
            cubic-bezier(.16,1,.3,1)
            .1s
            forwards;
        }

        .cc-culture-eyebrow {
          display: inline-flex;
          align-items: center;

          gap: 10px;

          min-height: 37px;

          padding:
            7px
            15px;

          border:
            1px solid
            rgba(
              240,
              32,
              48,
              .15
            );

          border-radius:
            999px;

          color:
            #d81325;

          background:
            rgba(
              255,
              248,
              250,
              .72
            );

          box-shadow:
            0
            12px
            32px
            rgba(
              94,
              15,
              26,
              .05
            );

          backdrop-filter:
            blur(12px);
        }

        .cc-culture-eyebrow > span {
          display: block;

          width: 24px;
          height: 2px;

          background:
            var(--cc-red);
        }

        .cc-culture-eyebrow strong {
          display: inline-flex;
          align-items: center;

          gap: 8px;

          font-size: 9.5px;
          font-weight: 900;

          letter-spacing:
            .14em;

          text-transform:
            uppercase;
        }

        .cc-culture-eyebrow i {
          opacity: .42;

          font-style: normal;
        }

        .cc-culture h2 {
          max-width: 750px;

          margin:
            24px
            0
            0;

          font-size:
            clamp(
              42px,
              5.15vw,
              72px
            );

          font-weight: 760;

          line-height: .96;

          letter-spacing:
            -.045em;
        }

        .cc-title-row {
          display: flex;
          flex-wrap: wrap;

          gap:
            .02em
            .17em;

          overflow: hidden;
        }

        .cc-title-row-red {
          margin-top: 6px;

          color:
            var(--cc-red);
        }

        .cc-title-row > span {
          display: inline-block;

          overflow: hidden;
        }

        .cc-title-row b {
          display: inline-block;

          opacity: 0;

          font-weight: 760;

          filter: blur(8px);

          transform:
            translate3d(
              0,
              112%,
              0
            )
            rotateX(14deg);
        }

        .cc-culture-active
        .cc-title-row:first-child
        > span:nth-child(1) b {
          animation:
            ccTitleWord
            .78s
            cubic-bezier(.16,1,.3,1)
            .34s
            forwards;
        }

        .cc-culture-active
        .cc-title-row:first-child
        > span:nth-child(2) b {
          animation:
            ccTitleWord
            .78s
            cubic-bezier(.16,1,.3,1)
            .47s
            forwards;
        }

        .cc-culture-active
        .cc-title-row:first-child
        > span:nth-child(3) b {
          animation:
            ccTitleWord
            .78s
            cubic-bezier(.16,1,.3,1)
            .60s
            forwards;
        }

        .cc-culture-active
        .cc-title-row:first-child
        > span:nth-child(4) b {
          animation:
            ccTitleWord
            .78s
            cubic-bezier(.16,1,.3,1)
            .73s
            forwards;
        }

        .cc-culture-active
        .cc-title-row-red
        > span:nth-child(1) b {
          animation:
            ccTitleWord
            .8s
            cubic-bezier(.16,1,.3,1)
            .90s
            forwards;
        }

        .cc-culture-active
        .cc-title-row-red
        > span:nth-child(2) b {
          animation:
            ccTitleWord
            .8s
            cubic-bezier(.16,1,.3,1)
            1.03s
            forwards;
        }

        .cc-culture-active
        .cc-title-row-red
        > span:nth-child(3) b {
          animation:
            ccTitleWord
            .8s
            cubic-bezier(.16,1,.3,1)
            1.16s
            forwards;
        }

        .cc-culture-active
        .cc-title-row-red
        > span:nth-child(4) b {
          animation:
            ccTitleWord
            .8s
            cubic-bezier(.16,1,.3,1)
            1.29s
            forwards;
        }

        .cc-culture-intro {
          max-width: 625px;

          margin:
            27px
            0
            0;

          opacity: 0;

          color:
            var(--cc-muted);

          font-size:
            clamp(
              14px,
              1.12vw,
              18px
            );

          line-height: 1.72;

          filter: blur(7px);

          transform:
            translateY(24px);
        }

        .cc-culture-intro strong {
          color:
            #34363d;

          font-weight: 760;
        }

        .cc-culture-active
        .cc-culture-intro {
          animation:
            ccContentReveal
            .8s
            cubic-bezier(.16,1,.3,1)
            1.55s
            forwards;
        }

        .cc-story-shell {
          position: relative;

          max-width: 650px;
          min-height: 238px;

          margin-top: 38px;

          padding:
            23px
            0
            14px
            33px;

          overflow: hidden;

          opacity: 0;

          border-left:
            2px solid
            rgba(
              240,
              32,
              48,
              .13
            );

          filter: blur(7px);

          transform:
            translateY(26px);
        }

        .cc-culture-active
        .cc-story-shell {
          animation:
            ccContentReveal
            .82s
            cubic-bezier(.16,1,.3,1)
            1.82s
            forwards;
        }

        .cc-story-beam {
          position: absolute;

          top: -30%;
          left: -2px;

          width: 2px;
          height: 32%;

          background:
            linear-gradient(
              180deg,
              transparent,
              var(--cc-red),
              transparent
            );

          animation:
            ccStoryBeam
            3.2s
            ease-in-out
            infinite;
        }

        .cc-story {
          position: relative;

          max-width: 610px;

          animation:
            ccStoryEnter
            .62s
            cubic-bezier(.16,1,.3,1)
            both;
        }

        .cc-story-number {
          position: absolute;

          top: -8px;
          right: 3%;

          color:
            rgba(
              240,
              32,
              48,
              .055
            );

          font-size:
            clamp(
              76px,
              9vw,
              128px
            );

          font-weight: 950;

          line-height: .8;

          letter-spacing:
            -.09em;

          user-select: none;
        }

        .cc-story small {
          position: relative;
          z-index: 2;

          display: block;

          margin-bottom: 10px;

          color:
            var(--cc-red);

          font-size: 9px;
          font-weight: 900;

          letter-spacing:
            .17em;

          text-transform:
            uppercase;
        }

        .cc-story h3 {
          position: relative;
          z-index: 2;

          max-width: 560px;

          margin: 0;

          color:
            #202127;

          font-size:
            clamp(
              28px,
              3.05vw,
              44px
            );

          font-weight: 780;

          line-height: 1;

          letter-spacing:
            -.045em;
        }

        .cc-story h3 em {
          color:
            var(--cc-red);

          font-style: normal;
        }

        .cc-story p {
          position: relative;
          z-index: 2;

          max-width: 560px;

          margin:
            15px
            0
            0;

          color:
            var(--cc-muted);

          font-size: 12.5px;

          line-height: 1.65;
        }

        .cc-story-progress {
          position: relative;
          z-index: 3;

          display: flex;

          gap: 8px;

          margin-top: 21px;
        }

        .cc-story-progress button {
          width: 33px;
          height: 5px;

          padding: 0;

          border: 0;

          border-radius:
            999px;

          background:
            rgba(
              240,
              32,
              48,
              .14
            );

          cursor: pointer;

          transition:
            width .26s ease,
            background .26s ease,
            transform .26s ease;
        }

        .cc-story-progress button.is-active {
          width: 64px;

          background:
            var(--cc-red);

          transform:
            translateY(-1px);
        }
        /*
         * RIGHT SIDE - ULTRA PREMIUM 3D KINETIC REACTOR
         */

        .cc-motion-stage {
          position: absolute;

          top: 50%;
          right: -1%;

          z-index: 7;

          width:
            min(
              43vw,
              620px
            );

          height: 610px;

          opacity: 0;

          pointer-events: none;

          perspective: 1400px;

          transform:
            translate3d(
              calc(
                var(--cc-x) *
                30px
              ),
              calc(
                -50% +
                (
                  var(--cc-y) *
                  20px
                ) +
                (
                  var(--cc-scroll) *
                  -38px
                )
              ),
              0
            );

          transform-style:
            preserve-3d;

          will-change:
            transform;
        }

        .cc-culture-active
        .cc-motion-stage {
          animation:
            ccReactorStageReveal
            1.2s
            cubic-bezier(.16,1,.3,1)
            1s
            forwards;
        }

        /*
         * BACKGROUND ENERGY AURA
         */

        .cc-reactor-backglow {
          position: absolute;

          top: 45%;
          left: 50%;

          width: 480px;
          height: 480px;

          border-radius: 50%;

          background:
            radial-gradient(
              circle,
              rgba(255,255,255,.72) 0%,
              rgba(255,194,205,.26) 24%,
              rgba(240,32,48,.10) 47%,
              transparent 70%
            );

          filter: blur(13px);

          transform:
            translate(-50%,-50%);

          animation:
            ccReactorAura
            4.2s
            ease-in-out
            infinite
            alternate;
        }

        /*
         * LARGE PINK LIGHT FLOOR
         */

        .cc-reactor-floor {
          position: absolute;

          left: 50%;
          bottom: 28px;

          width: 440px;
          height: 145px;

          transform:
            translateX(-50%)
            rotateX(69deg);

          transform-style:
            preserve-3d;
        }

        .cc-reactor-floor-light {
          position: absolute;

          inset:
            18px
            42px;

          border-radius: 50%;

          background:
            radial-gradient(
              ellipse,
              #ffffff 0%,
              rgba(255,220,226,.98) 14%,
              rgba(255,98,119,.82) 31%,
              rgba(240,32,48,.44) 48%,
              rgba(240,32,48,.12) 64%,
              transparent 76%
            );

          filter: blur(8px);

          box-shadow:
            0 0 32px rgba(255,255,255,.84),
            0 0 62px rgba(240,32,48,.34);

          animation:
            ccReactorFloorLight
            2s
            ease-in-out
            infinite
            alternate;
        }

        .cc-reactor-floor-light::after {
          position: absolute;

          inset: 26px 65px;

          content: "";

          border-radius: 50%;

          background:
            radial-gradient(
              ellipse,
              white,
              rgba(255,86,106,.70) 48%,
              transparent 72%
            );

          filter: blur(7px);

          animation:
            ccReactorFloorInner
            1.45s
            ease-in-out
            infinite
            alternate;
        }

        .cc-reactor-floor-ring {
          position: absolute;

          top: 50%;
          left: 50%;

          border:
            1px solid
            rgba(240,32,48,.24);

          border-radius: 50%;

          transform:
            translate(-50%,-50%);
        }

        .cc-reactor-floor-ring-one {
          width: 430px;
          height: 130px;

          animation:
            ccReactorFloorRingOne
            5.5s
            ease-in-out
            infinite;
        }

        .cc-reactor-floor-ring-two {
          width: 330px;
          height: 98px;

          border-color:
            rgba(255,255,255,.66);

          animation:
            ccReactorFloorRingTwo
            4.2s
            ease-in-out
            infinite
            reverse;
        }

        .cc-reactor-floor-ring-three {
          width: 235px;
          height: 66px;

          border-color:
            rgba(240,32,48,.38);

          animation:
            ccReactorFloorRingThree
            3.2s
            ease-in-out
            infinite;
        }

        /*
         * VERTICAL ENERGY BEAM
         */

        .cc-reactor-beam {
          position: absolute;

          left: 50%;
          bottom: 104px;

          width: 28px;
          height: 375px;

          overflow: hidden;

          border-radius: 999px;

          opacity: .82;

          background:
            linear-gradient(
              180deg,
              transparent,
              rgba(255,255,255,.95) 22%,
              rgba(255,167,180,.72) 41%,
              rgba(255,65,86,.70) 63%,
              rgba(240,32,48,.20) 82%,
              transparent
            );

          filter: blur(7px);

          transform:
            translateX(-50%);

          animation:
            ccReactorBeamPulse
            2.4s
            ease-in-out
            infinite
            alternate;
        }

        .cc-reactor-beam i {
          position: absolute;

          top: -38%;
          left: 50%;

          width: 6px;
          height: 38%;

          border-radius: 999px;

          background:
            linear-gradient(
              180deg,
              transparent,
              white 38%,
              #ff4558 70%,
              transparent
            );

          filter:
            drop-shadow(
              0 0 9px
              white
            )
            drop-shadow(
              0 0 18px
              #f02030
            );

          transform:
            translateX(-50%);

          animation:
            ccReactorBeamTravel
            2.05s
            ease-in-out
            infinite;
        }

        /*
         * MAIN 3D WORLD
         */

        .cc-reactor-world {
          position: absolute;

          top: 42%;
          left: 50%;

          width: 440px;
          height: 440px;

          transform:
            translate(-50%,-50%)
            rotateX(3deg);

          transform-style:
            preserve-3d;

          animation:
            ccReactorWorldFloat
            6s
            ease-in-out
            infinite
            alternate;
        }

        /*
         * THREE LARGE 3D HALOS
         */

        .cc-reactor-halo {
          position: absolute;

          top: 50%;
          left: 50%;

          border:
            1px solid
            rgba(240,32,48,.27);

          border-radius: 50%;

          transform-style:
            preserve-3d;

          box-shadow:
            0 0 9px rgba(240,32,48,.06),
            inset 0 0 12px rgba(255,255,255,.38);
        }

        .cc-reactor-halo::before {
          position: absolute;

          inset: -3px;

          content: "";

          border-radius: inherit;

          background:
            conic-gradient(
              from 0deg,
              transparent 0deg,
              transparent 230deg,
              rgba(255,255,255,.08) 248deg,
              rgba(255,255,255,.98) 267deg,
              #ffc1c8 277deg,
              #ff5264 288deg,
              #ed081e 301deg,
              rgba(240,32,48,.38) 318deg,
              transparent 338deg,
              transparent 360deg
            );

          -webkit-mask:
            radial-gradient(
              farthest-side,
              transparent
              calc(100% - 5px),
              #000
              calc(100% - 4px)
            );

          mask:
            radial-gradient(
              farthest-side,
              transparent
              calc(100% - 5px),
              #000
              calc(100% - 4px)
            );

          filter:
            drop-shadow(
              0 0 7px
              white
            )
            drop-shadow(
              0 0 16px
              rgba(240,32,48,.76)
            );

          animation:
            ccReactorTravelLight
            3.8s
            linear
            infinite;
        }

        .cc-reactor-halo i {
          position: absolute;

          top: -9px;
          left:
            calc(
              50% -
              9px
            );

          width: 18px;
          height: 18px;

          border:
            1px solid
            rgba(255,255,255,.94);

          border-radius: 50%;

          background:
            radial-gradient(
              circle at 28% 24%,
              white 0%,
              white 17%,
              #ffc3c9 31%,
              #ff4557 58%,
              #df071b 100%
            );

          box-shadow:
            0 0 16px white,
            0 0 34px rgba(240,32,48,.94);

          animation:
            ccReactorEnergyNode
            1.35s
            ease-in-out
            infinite
            alternate;
        }

        .cc-reactor-halo-one {
          width: 410px;
          height: 410px;

          margin:
            -205px
            0
            0
            -205px;

          transform:
            rotateX(67deg)
            rotateZ(0deg);

          animation:
            ccReactorHaloOne
            13s
            linear
            infinite;
        }

        .cc-reactor-halo-one::before {
          animation-duration:
            4.8s;
        }

        .cc-reactor-halo-two {
          width: 315px;
          height: 315px;

          margin:
            -157.5px
            0
            0
            -157.5px;

          border-style: dashed;

          transform:
            rotateX(52deg)
            rotateY(30deg)
            rotateZ(0deg);

          animation:
            ccReactorHaloTwo
            9s
            linear
            infinite
            reverse;
        }

        .cc-reactor-halo-two::before {
          animation-duration:
            3.6s;

          animation-direction:
            reverse;
        }

        .cc-reactor-halo-three {
          width: 225px;
          height: 225px;

          margin:
            -112.5px
            0
            0
            -112.5px;

          transform:
            rotateX(73deg)
            rotateY(-22deg)
            rotateZ(0deg);

          animation:
            ccReactorHaloThree
            6.4s
            linear
            infinite;
        }

        .cc-reactor-halo-three::before {
          animation-duration:
            2.65s;
        }

        /*
         * FOUR LARGE FLOATING 3D GLASS BLADES
         */

        .cc-reactor-blades {
          position: absolute;

          top: 50%;
          left: 50%;

          width: 215px;
          height: 215px;

          transform:
            translate(-50%,-50%)
            rotateX(58deg)
            rotateZ(0deg);

          transform-style:
            preserve-3d;

          animation:
            ccReactorBladeWorld
            7.5s
            linear
            infinite;
        }

        .cc-reactor-blade {
          position: absolute;

          top: 50%;
          left: 50%;

          width: 104px;
          height: 48px;

          margin:
            -24px
            0
            0
            0;

          border:
            1px solid
            rgba(255,255,255,.72);

          border-radius:
            30px
            10px
            30px
            10px;

          background:
            linear-gradient(
              135deg,
              rgba(255,255,255,.92),
              rgba(255,205,214,.63) 38%,
              rgba(255,67,87,.66) 100%
            );

          box-shadow:
            inset 0 0 18px rgba(255,255,255,.86),
            0 15px 35px rgba(196,7,26,.14);

          backdrop-filter:
            blur(9px);

          transform-origin:
            left center;

          transform-style:
            preserve-3d;
        }

        .cc-reactor-blade::before {
          position: absolute;

          inset: 5px;

          content: "";

          border-radius: inherit;

          background:
            linear-gradient(
              120deg,
              rgba(255,255,255,.55),
              transparent 45%,
              rgba(240,32,48,.13)
            );

          animation:
            ccReactorBladeShimmer
            2.7s
            ease-in-out
            infinite
            alternate;
        }

        .cc-reactor-blade-one {
          transform:
            rotateZ(0deg)
            translateZ(28px);
        }

        .cc-reactor-blade-two {
          transform:
            rotateZ(90deg)
            translateZ(28px);
        }

        .cc-reactor-blade-three {
          transform:
            rotateZ(180deg)
            translateZ(28px);
        }

        .cc-reactor-blade-four {
          transform:
            rotateZ(270deg)
            translateZ(28px);
        }

        /*
         * PREMIUM CENTRAL ENERGY CORE
         */

        .cc-reactor-core-shell {
          position: absolute;

          top: 50%;
          left: 50%;

          width: 132px;
          height: 132px;

          border:
            1px solid
            rgba(255,255,255,.86);

          border-radius: 35%;

          background:
            linear-gradient(
              145deg,
              rgba(255,255,255,.92),
              rgba(255,210,218,.72) 38%,
              rgba(244,47,66,.82) 100%
            );

          box-shadow:
            inset 0 0 32px rgba(255,255,255,.94),
            0 25px 60px rgba(198,7,26,.20);

          transform:
            translate(-50%,-50%)
            rotateX(58deg)
            rotateZ(45deg);

          transform-style:
            preserve-3d;

          animation:
            ccReactorCoreShell
            4.8s
            ease-in-out
            infinite
            alternate;
        }

        .cc-reactor-core-shell::before,
        .cc-reactor-core-shell::after {
          position: absolute;

          inset: 8px;

          content: "";

          border:
            1px solid
            rgba(255,255,255,.44);

          border-radius: 31%;

          background:
            rgba(240,32,48,.16);

          transform:
            translateZ(-22px);
        }

        .cc-reactor-core-shell::after {
          opacity: .50;

          transform:
            translateZ(-43px);
        }

        .cc-reactor-core {
          position: absolute;

          top: 50%;
          left: 50%;

          width: 54px;
          height: 54px;

          border:
            1px solid
            rgba(255,255,255,.96);

          border-radius: 50%;

          background:
            radial-gradient(
              circle at 34% 28%,
              #ffffff 0%,
              #ffffff 12%,
              #ffb7bf 28%,
              #ff5365 54%,
              #e3091e 82%
            );

          box-shadow:
            0 0 18px white,
            0 0 38px rgba(255,83,101,.84),
            0 0 68px rgba(240,32,48,.52);

          transform:
            translate(-50%,-50%)
            translateZ(42px);

          animation:
            ccReactorCorePulse
            1.45s
            ease-in-out
            infinite
            alternate;
        }

        /*
         * ENERGY SPARKS
         */

        .cc-reactor-spark {
          position: absolute;

          border-radius: 50%;

          background: white;

          box-shadow:
            0 0 9px white,
            0 0 20px rgba(240,32,48,.88);
        }

        .cc-reactor-spark-one {
          top: 11%;
          left: 42%;

          width: 8px;
          height: 8px;

          animation:
            ccReactorSparkOne
            4.5s
            ease-in-out
            infinite;
        }

        .cc-reactor-spark-two {
          top: 33%;
          right: 2%;

          width: 6px;
          height: 6px;

          animation:
            ccReactorSparkTwo
            5.4s
            ease-in-out
            infinite;
        }

        .cc-reactor-spark-three {
          bottom: 17%;
          right: 20%;

          width: 9px;
          height: 9px;

          animation:
            ccReactorSparkThree
            5s
            ease-in-out
            infinite;
        }

        .cc-reactor-spark-four {
          bottom: 25%;
          left: 4%;

          width: 6px;
          height: 6px;

          animation:
            ccReactorSparkFour
            5.8s
            ease-in-out
            infinite;
        }

        .cc-reactor-spark-five {
          top: 25%;
          left: 9%;

          width: 5px;
          height: 5px;

          animation:
            ccReactorSparkFive
            4.8s
            ease-in-out
            infinite;
        }

        /*
         * FLOATING GLASS ELEMENTS
         */

        .cc-reactor-glass {
          position: absolute;

          border:
            1px solid
            rgba(240,32,48,.17);

          border-radius: 13px;

          background:
            linear-gradient(
              145deg,
              rgba(255,255,255,.80),
              rgba(255,213,220,.27)
            );

          box-shadow:
            inset 0 0 14px rgba(255,255,255,.75),
            0 15px 35px rgba(125,8,21,.06);

          backdrop-filter:
            blur(9px);
        }

        .cc-reactor-glass-one {
          top: 10%;
          left: 10%;

          width: 42px;
          height: 76px;

          transform:
            rotate(27deg)
            rotateY(35deg);

          animation:
            ccReactorGlassOne
            5.6s
            ease-in-out
            infinite;
        }

        .cc-reactor-glass-two {
          top: 18%;
          right: 7%;

          width: 38px;
          height: 68px;

          transform:
            rotate(-24deg)
            rotateY(-39deg);

          animation:
            ccReactorGlassTwo
            6.4s
            ease-in-out
            infinite;
        }

        .cc-reactor-glass-three {
          right: 2%;
          bottom: 16%;

          width: 59px;
          height: 34px;

          transform:
            rotate(21deg)
            rotateX(43deg);

          animation:
            ccReactorGlassThree
            5.9s
            ease-in-out
            infinite;
        }

        /*
         * NEW REACTOR ANIMATIONS
         */

        @keyframes ccReactorStageReveal {
          from {
            opacity: 0;

            filter: blur(14px);

            transform:
              translate3d(
                75px,
                -46%,
                0
              )
              scale(.88);
          }

          to {
            opacity: 1;

            filter: blur(0);

            transform:
              translate3d(
                calc(
                  var(--cc-x) *
                  30px
                ),
                calc(
                  -50% +
                  (
                    var(--cc-y) *
                    20px
                  ) +
                  (
                    var(--cc-scroll) *
                    -38px
                  )
                ),
                0
              )
              scale(1);
          }
        }

        @keyframes ccReactorAura {
          from {
            opacity: .42;

            transform:
              translate(-50%,-50%)
              scale(.88);
          }

          to {
            opacity: .92;

            transform:
              translate(-50%,-50%)
              scale(1.09);
          }
        }

        @keyframes ccReactorFloorLight {
          from {
            opacity: .63;

            transform:
              scale(.86);
          }

          to {
            opacity: 1;

            transform:
              scale(1.09);
          }
        }

        @keyframes ccReactorFloorInner {
          from {
            opacity: .48;
          }

          to {
            opacity: 1;
          }
        }

        @keyframes ccReactorFloorRingOne {
          50% {
            width: 470px;

            opacity: .42;
          }
        }

        @keyframes ccReactorFloorRingTwo {
          50% {
            width: 365px;

            opacity: .76;
          }
        }

        @keyframes ccReactorFloorRingThree {
          50% {
            width: 265px;

            opacity: .82;
          }
        }

        @keyframes ccReactorBeamPulse {
          from {
            height: 320px;

            opacity: .43;
          }

          to {
            height: 400px;

            opacity: .92;
          }
        }

        @keyframes ccReactorBeamTravel {
          from {
            top: -38%;

            opacity: 0;
          }

          22% {
            opacity: 1;
          }

          to {
            top: 116%;

            opacity: 0;
          }
        }

        @keyframes ccReactorWorldFloat {
          from {
            transform:
              translate(-50%,-50%)
              rotateX(3deg)
              translate3d(
                0,
                -4px,
                0
              );
          }

          to {
            transform:
              translate(-50%,-50%)
              rotateX(-3deg)
              translate3d(
                0,
                11px,
                35px
              );
          }
        }

        @keyframes ccReactorHaloOne {
          to {
            transform:
              rotateX(67deg)
              rotateZ(360deg);
          }
        }

        @keyframes ccReactorHaloTwo {
          to {
            transform:
              rotateX(52deg)
              rotateY(30deg)
              rotateZ(-360deg);
          }
        }

        @keyframes ccReactorHaloThree {
          to {
            transform:
              rotateX(73deg)
              rotateY(-22deg)
              rotateZ(360deg);
          }
        }

        @keyframes ccReactorTravelLight {
          to {
            transform:
              rotate(360deg);
          }
        }

        @keyframes ccReactorEnergyNode {
          from {
            transform:
              scale(.78);

            filter:
              brightness(1);
          }

          to {
            transform:
              scale(1.28);

            filter:
              brightness(1.52);
          }
        }

        @keyframes ccReactorBladeWorld {
          to {
            transform:
              translate(-50%,-50%)
              rotateX(58deg)
              rotateZ(360deg);
          }
        }

        @keyframes ccReactorBladeShimmer {
          from {
            opacity: .38;
          }

          to {
            opacity: 1;

            filter:
              brightness(1.18);
          }
        }

        @keyframes ccReactorCoreShell {
          from {
            transform:
              translate(-50%,-50%)
              rotateX(58deg)
              rotateZ(45deg)
              translateZ(0)
              scale(.96);
          }

          to {
            transform:
              translate(-50%,-50%)
              rotateX(53deg)
              rotateZ(72deg)
              translateZ(38px)
              translateY(-7px)
              scale(1.05);
          }
        }

        @keyframes ccReactorCorePulse {
          from {
            transform:
              translate(-50%,-50%)
              translateZ(42px)
              scale(.90);

            filter:
              brightness(1);
          }

          to {
            transform:
              translate(-50%,-50%)
              translateZ(57px)
              scale(1.17);

            filter:
              brightness(1.20);
          }
        }

        @keyframes ccReactorSparkOne {
          50% {
            transform:
              translate3d(
                32px,
                -38px,
                40px
              );
          }
        }

        @keyframes ccReactorSparkTwo {
          50% {
            transform:
              translate3d(
                -34px,
                27px,
                48px
              );
          }
        }

        @keyframes ccReactorSparkThree {
          50% {
            transform:
              translate3d(
                -25px,
                -29px,
                36px
              );
          }
        }

        @keyframes ccReactorSparkFour {
          50% {
            transform:
              translate3d(
                34px,
                25px,
                45px
              );
          }
        }

        @keyframes ccReactorSparkFive {
          50% {
            transform:
              translate3d(
                28px,
                36px,
                31px
              );
          }
        }

        @keyframes ccReactorGlassOne {
          50% {
            transform:
              translate3d(
                29px,
                -38px,
                55px
              )
              rotate(43deg)
              rotateY(50deg);
          }
        }

        @keyframes ccReactorGlassTwo {
          50% {
            transform:
              translate3d(
                -32px,
                31px,
                63px
              )
              rotate(-40deg)
              rotateY(-53deg);
          }
        }

        @keyframes ccReactorGlassThree {
          50% {
            transform:
              translate3d(
                -31px,
                -25px,
                49px
              )
              rotate(36deg)
              rotateX(58deg);
          }
        }

        /*
         * RESPONSIVE REACTOR
         */

        @media (max-width: 1030px) {
          .cc-motion-stage {
            right: -8%;

            width: 46vw;

            transform:
              translate3d(
                calc(
                  var(--cc-x) *
                  23px
                ),
                calc(
                  -50% +
                  (
                    var(--cc-y) *
                    15px
                  )
                ),
                0
              );
          }

          .cc-reactor-world {
            transform:
              translate(-50%,-50%)
              scale(.90);
          }
        }

        @media (max-width: 760px) {
          .cc-motion-stage {
            position: relative;

            top: auto;
            right: auto;

            width: 100%;
            height: 500px;

            margin-top: 28px;

            transform: none;
          }

          .cc-culture-active
          .cc-motion-stage {
            animation:
              ccReactorMobileReveal
              1s
              cubic-bezier(.16,1,.3,1)
              1s
              forwards;
          }

          .cc-reactor-world {
            top: 43%;

            width: 360px;
            height: 360px;

            transform:
              translate(-50%,-50%)
              scale(.83);
          }

          .cc-reactor-floor {
            bottom: 21px;

            width: 340px;
          }

          .cc-reactor-floor-light {
            inset:
              25px
              55px;
          }

          .cc-reactor-beam {
            bottom: 91px;

            height: 280px;
          }

          .cc-reactor-backglow {
            width: 360px;
            height: 360px;
          }
        }

        @keyframes ccReactorMobileReveal {
          from {
            opacity: 0;

            filter: blur(13px);

            transform:
              translateY(45px)
              scale(.88);
          }

          to {
            opacity: 1;

            filter: blur(0);

            transform:
              translateY(0)
              scale(1);
          }
        }



        /*
         * Moving keywords
         */

        .cc-culture-ticker {
          position: absolute;

          right: 0;
          bottom: 18px;
          left: 0;

          z-index: 12;

          overflow: hidden;

          opacity: 0;

          border-top:
            1px solid
            rgba(
              240,
              32,
              48,
              .11
            );

          border-bottom:
            1px solid
            rgba(
              240,
              32,
              48,
              .11
            );

          padding:
            12px
            0;
        }

        .cc-culture-active
        .cc-culture-ticker {
          animation:
            ccTickerReveal
            .7s
            ease
            2.25s
            forwards;
        }

        .cc-culture-ticker > div {
          display: flex;
          align-items: center;

          gap: 30px;

          width: max-content;

          animation:
            ccTickerMove
            20s
            linear
            infinite;
        }

        .cc-culture-ticker b {
          color:
            #60636c;

          font-size: 9.5px;
          font-weight: 900;

          letter-spacing:
            .15em;

          text-transform:
            uppercase;

          white-space: nowrap;
        }

        .cc-culture-ticker i {
          color:
            var(--cc-red);

          font-style: normal;
        }

        @keyframes ccEyebrowReveal {
          from {
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

          to {
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

        @keyframes ccTitleWord {
          from {
            opacity: 0;

            filter: blur(8px);

            transform:
              translate3d(
                0,
                112%,
                0
              )
              rotateX(14deg);
          }

          to {
            opacity: 1;

            filter: blur(0);

            transform:
              translate3d(
                0,
                0,
                0
              )
              rotateX(0deg);
          }
        }

        @keyframes ccContentReveal {
          to {
            opacity: 1;

            filter: blur(0);

            transform:
              translateY(0);
          }
        }

        @keyframes ccStoryEnter {
          from {
            opacity: 0;

            filter: blur(8px);

            transform:
              translate3d(
                32px,
                9px,
                0
              );
          }

          to {
            opacity: 1;

            filter: blur(0);

            transform:
              translate3d(
                0,
                0,
                0
              );
          }
        }

        @keyframes ccStoryBeam {
          0% {
            top: -30%;
            opacity: 0;
          }

          20% {
            opacity: 1;
          }

          100% {
            top: 108%;
            opacity: 0;
          }
        }

        @keyframes ccStageReveal {
          from {
            opacity: 0;

            filter: blur(14px);

            transform:
              translate3d(
                75px,
                -46%,
                0
              )
              scale(.89);
          }

          to {
            opacity: 1;

            filter: blur(0);

            transform:
              translate3d(
                calc(
                  var(--cc-x) *
                  25px
                ),
                calc(
                  -50% +
                  (
                    var(--cc-y) *
                    16px
                  ) +
                  (
                    var(--cc-scroll) *
                    -34px
                  )
                ),
                0
              )
              scale(1);
          }
        }

        @keyframes ccBackgroundGlow {
          to {
            transform:
              translate(
                -32px,
                29px
              )
              scale(1.07);
          }
        }

        @keyframes ccBackgroundDotOne {
          50% {
            transform:
              translate(
                23px,
                -27px
              );
          }
        }

        @keyframes ccBackgroundDotTwo {
          50% {
            transform:
              translate(
                -21px,
                25px
              );
          }
        }

        @keyframes ccBackgroundDotThree {
          50% {
            transform:
              translate(
                27px,
                17px
              );
          }
        }

        @keyframes ccFloorAura {
          from {
            opacity: .60;

            transform:
              translateX(-50%)
              rotateX(72deg)
              scale(.87);
          }

          to {
            opacity: 1;

            transform:
              translateX(-50%)
              rotateX(72deg)
              scale(1.08);
          }
        }

        @keyframes ccFloorLight {
          to {
            opacity: .68;

            transform:
              translateX(-50%)
              rotateX(72deg)
              scale(1.12);
          }
        }

        @keyframes ccFloorOrbitOne {
          50% {
            width: 382px;

            opacity: .43;
          }
        }

        @keyframes ccFloorOrbitTwo {
          50% {
            width: 278px;

            opacity: .76;
          }
        }

        @keyframes ccColumnPulse {
          from {
            height: 272px;

            opacity: .42;
          }

          to {
            height: 325px;

            opacity: .92;
          }
        }

        @keyframes ccBeamTravel {
          from {
            top: -36%;

            opacity: 0;
          }

          24% {
            opacity: 1;
          }

          to {
            top: 114%;

            opacity: 0;
          }
        }

        @keyframes ccCoreMotion {
          from {
            transform:
              translate(
                -50%,
                -50%
              )
              rotateX(60deg)
              rotateZ(45deg)
              translateZ(0)
              scale(.96);
          }

          to {
            transform:
              translate(
                -50%,
                -50%
              )
              rotateX(54deg)
              rotateZ(74deg)
              translateZ(40px)
              translateY(-9px)
              scale(1.05);
          }
        }

        @keyframes ccCoreLight {
          to {
            transform:
              translate(
                -50%,
                -50%
              )
              translateZ(47px)
              scale(1.18);

            filter:
              brightness(1.20);
          }
        }

        @keyframes ccOrbitOne {
          to {
            transform:
              rotateX(69deg)
              rotateZ(360deg);
          }
        }

        @keyframes ccOrbitTwo {
          to {
            transform:
              rotateX(58deg)
              rotateY(22deg)
              rotateZ(-360deg);
          }
        }

        @keyframes ccOrbitThree {
          to {
            transform:
              rotateX(72deg)
              rotateY(-18deg)
              rotateZ(360deg);
          }
        }

        @keyframes ccTravellingLight {
          to {
            transform:
              rotate(360deg);
          }
        }

        @keyframes ccOrbitNode {
          to {
            transform:
              scale(1.22);

            filter:
              brightness(1.45);
          }
        }

        @keyframes ccGlassOne {
          50% {
            transform:
              translate3d(
                24px,
                -29px,
                43px
              )
              rotate(34deg)
              rotateY(45deg);
          }
        }

        @keyframes ccGlassTwo {
          50% {
            transform:
              translate3d(
                -24px,
                25px,
                50px
              )
              rotate(-34deg)
              rotateY(-49deg);
          }
        }

        @keyframes ccGlassThree {
          50% {
            transform:
              translate3d(
                -22px,
                -19px,
                36px
              )
              rotate(35deg)
              rotateX(50deg);
          }
        }

        @keyframes ccMotionDotOne {
          50% {
            transform:
              translate(
                25px,
                -29px
              );
          }
        }

        @keyframes ccMotionDotTwo {
          50% {
            transform:
              translate(
                -26px,
                24px
              );
          }
        }

        @keyframes ccMotionDotThree {
          50% {
            transform:
              translate(
                30px,
                21px
              );
          }
        }

        @keyframes ccTickerReveal {
          to {
            opacity: 1;
          }
        }

        @keyframes ccTickerMove {
          to {
            transform:
              translateX(-50%);
          }
        }

        @media (
          max-width: 1030px
        ) {
          .cc-culture-copy {
            width: 62%;
          }

          .cc-motion-stage {
            right: -7%;

            width: 43vw;
          }
        }

        @media (
          max-width: 760px
        ) {
          .cc-culture {
            min-height: auto;
          }

          .cc-culture-container {
            width:
              calc(
                100% -
                32px
              );

            min-height: auto;

            padding:
              48px
              0
              72px;
          }

          .cc-culture-copy {
            width: 100%;

            transform: none;
          }

          .cc-culture h2 {
            font-size:
              clamp(
                36px,
                10.5vw,
                50px
              );

            line-height: .98;
          }

          .cc-culture-intro {
            font-size: 14px;
          }

          .cc-story-shell {
            min-height: 285px;

            margin-top: 31px;

            padding-left: 23px;
          }

          .cc-story h3 {
            max-width: 350px;

            font-size:
              clamp(
                28px,
                8vw,
                38px
              );
          }

          .cc-story p {
            max-width: 355px;

            font-size: 12px;
          }

          .cc-story-number {
            right: 0;

            font-size: 82px;
          }

          .cc-motion-stage {
            position: relative;

            top: auto;
            right: auto;

            width: 100%;
            height: 425px;

            margin-top: 22px;

            transform: none;
          }

          .cc-culture-active
          .cc-motion-stage {
            animation:
              ccMobileStage
              1s
              cubic-bezier(.16,1,.3,1)
              1s
              forwards;
          }

          .cc-orbit-one {
            width: 305px;
            height: 305px;

            margin:
              -152.5px
              0
              0
              -152.5px;
          }

          .cc-orbit-two {
            width: 235px;
            height: 235px;

            margin:
              -117.5px
              0
              0
              -117.5px;
          }

          .cc-orbit-three {
            width: 170px;
            height: 170px;

            margin:
              -85px
              0
              0
              -85px;
          }

          .cc-floor-aura {
            width: 275px;

            bottom: 42px;
          }

          .cc-floor-light {
            bottom: 65px;
          }

          .cc-floor-orbit {
            bottom: 58px;
          }

          .cc-light-column {
            bottom: 86px;

            height: 235px;
          }

          .cc-energy-core {
            width: 94px;
            height: 94px;
          }
        }

        @keyframes ccMobileStage {
          from {
            opacity: 0;

            filter: blur(13px);

            transform:
              translateY(42px)
              scale(.9);
          }

          to {
            opacity: 1;

            filter: blur(0);

            transform:
              translateY(0)
              scale(1);
          }
        }

        @media (
          prefers-reduced-motion:
          reduce
        ) {
          .cc-culture-eyebrow-wrap,
          .cc-title-row b,
          .cc-culture-intro,
          .cc-story-shell,
          .cc-motion-stage,
          .cc-culture-ticker {
            opacity: 1 !important;

            filter: none !important;

            transform: none !important;

            animation: none !important;
          }

          .cc-culture-glow,
          .cc-bg-dot,
          .cc-floor-aura,
          .cc-floor-light,
          .cc-floor-orbit,
          .cc-light-column,
          .cc-light-column i,
          .cc-energy-core,
          .cc-core-light,
          .cc-orbit,
          .cc-orbit::before,
          .cc-orbit i,
          .cc-floating-glass,
          .cc-motion-dot,
          .cc-culture-ticker > div,
          .cc-story-beam {
            animation:
              none !important;
          }
        }
      

/* === CC CULTURE CINEMATIC TEXT V1 START === */

/*
 * CINEMATIC VIDEO-STYLE CONTENT REVEAL
 * Right-side 3D animation is intentionally untouched.
 */

.cc-culture {
  scroll-margin-top: 120px;

  --cc-reveal-ease:
    cubic-bezier(
      .16,
      1,
      .3,
      1
    );
}

/*
 * Eyebrow first
 */

.cc-culture-eyebrow-wrap {
  opacity: 0;

  filter:
    blur(8px);

  clip-path:
    inset(
      0
      100%
      0
      0
    );

  transform:
    translate3d(
      -26px,
      0,
      0
    );

  will-change:
    transform,
    opacity,
    filter,
    clip-path;
}

.cc-culture-active
.cc-culture-eyebrow-wrap {
  animation:
    ccCinemaEyebrow
    .72s
    var(--cc-reveal-ease)
    .08s
    forwards;
}

/*
 * Heading words appear one by one,
 * like a cinematic title sequence.
 */

.cc-title-row {
  overflow: visible;
}

.cc-title-row > span {
  position: relative;

  display: inline-block;

  overflow: hidden;

  padding:
    .03em
    .015em
    .08em;

  margin:
    -.03em
    -.015em
    -.08em;
}

.cc-title-row b {
  position: relative;

  display: inline-block;

  opacity: 0;

  clip-path:
    inset(
      0
      100%
      0
      0
    );

  filter:
    blur(8px);

  transform:
    translate3d(
      0,
      .72em,
      0
    )
    rotateX(12deg);

  transform-origin:
    0
    100%;

  will-change:
    transform,
    opacity,
    filter,
    clip-path;
}

/* Black row */

.cc-culture-active
.cc-title-row:first-child
> span:nth-child(1) b {
  animation:
    ccCinemaWord
    .65s
    var(--cc-reveal-ease)
    .32s
    forwards;
}

.cc-culture-active
.cc-title-row:first-child
> span:nth-child(2) b {
  animation:
    ccCinemaWord
    .65s
    var(--cc-reveal-ease)
    .48s
    forwards;
}

.cc-culture-active
.cc-title-row:first-child
> span:nth-child(3) b {
  animation:
    ccCinemaWord
    .65s
    var(--cc-reveal-ease)
    .64s
    forwards;
}

.cc-culture-active
.cc-title-row:first-child
> span:nth-child(4) b {
  animation:
    ccCinemaWord
    .65s
    var(--cc-reveal-ease)
    .80s
    forwards;
}

/* Red row */

.cc-culture-active
.cc-title-row-red
> span:nth-child(1) b {
  animation:
    ccCinemaRedWord
    .68s
    var(--cc-reveal-ease)
    1.02s
    forwards;
}

.cc-culture-active
.cc-title-row-red
> span:nth-child(2) b {
  animation:
    ccCinemaRedWord
    .68s
    var(--cc-reveal-ease)
    1.17s
    forwards;
}

.cc-culture-active
.cc-title-row-red
> span:nth-child(3) b {
  animation:
    ccCinemaRedWord
    .68s
    var(--cc-reveal-ease)
    1.32s
    forwards;
}

.cc-culture-active
.cc-title-row-red
> span:nth-child(4) b {
  animation:
    ccCinemaRedWord
    .68s
    var(--cc-reveal-ease)
    1.47s
    forwards;
}

/*
 * Premium light sweep only on red heading.
 */

.cc-title-row-red {
  position: relative;
}

.cc-title-row-red::after {
  position: absolute;

  top: 5%;
  bottom: 2%;
  left: -14%;

  width: 7%;

  content: "";

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
        .78
      ),
      transparent
    );

  filter:
    blur(5px);

  transform:
    skewX(-17deg);

  mix-blend-mode:
    screen;
}

.cc-culture-active
.cc-title-row-red::after {
  animation:
    ccCinemaTitleLight
    2.6s
    ease
    1.75s
    forwards;
}

/*
 * Paragraph is written line-by-line.
 */

.cc-culture-intro {
  display: block;

  max-width: 670px;

  opacity: 1 !important;

  filter: none !important;

  transform: none !important;

  overflow: visible;
}

.cc-intro-line {
  position: relative;

  display: block;

  width: fit-content;
  max-width: 100%;

  margin-top: 3px;

  opacity: 0;

  clip-path:
    inset(
      0
      100%
      0
      0
    );

  filter:
    blur(3px);

  transform:
    translate3d(
      0,
      8px,
      0
    );

  will-change:
    opacity,
    clip-path,
    filter,
    transform;
}

.cc-intro-line-one {
  margin-top: 0;
}

.cc-culture-active
.cc-intro-line-one {
  animation:
    ccCinemaWriteLine
    .85s
    steps(
      28,
      end
    )
    1.82s
    forwards;
}

.cc-culture-active
.cc-intro-line-two {
  animation:
    ccCinemaWriteLine
    .78s
    steps(
      26,
      end
    )
    2.18s
    forwards;
}

.cc-culture-active
.cc-intro-line-three {
  animation:
    ccCinemaWriteLine
    .78s
    steps(
      25,
      end
    )
    2.48s
    forwards;
}

.cc-culture-active
.cc-intro-line-four {
  animation:
    ccCinemaWriteLine
    .78s
    steps(
      26,
      end
    )
    2.78s
    forwards;
}

/*
 * Tiny writing light that travels
 * with each text line.
 */

.cc-intro-line::after {
  position: absolute;

  top: 7%;
  right: -8px;

  width: 2px;
  height: 86%;

  content: "";

  opacity: 0;

  border-radius:
    999px;

  background:
    linear-gradient(
      180deg,
      transparent,
      #f02030,
      transparent
    );

  box-shadow:
    0
    0
    8px
    rgba(
      240,
      32,
      48,
      .62
    );
}

.cc-culture-active
.cc-intro-line::after {
  animation:
    ccCinemaCursor
    .72s
    ease-in-out
    3;
}

/*
 * Story/design comes AFTER written content.
 */

.cc-story-shell {
  opacity: 0;

  filter:
    blur(12px);

  clip-path:
    inset(
      0
      0
      100%
      0
    );

  transform:
    translate3d(
      0,
      34px,
      0
    );

  will-change:
    opacity,
    filter,
    clip-path,
    transform;
}

.cc-culture-active
.cc-story-shell {
  animation:
    ccCinemaStoryReveal
    .92s
    var(--cc-reveal-ease)
    3.18s
    forwards;
}

/*
 * Story contents have their own movement.
 */

.cc-story small {
  animation:
    ccCinemaStoryLabel
    .55s
    var(--cc-reveal-ease)
    .12s
    both;
}

.cc-story h3 {
  animation:
    ccCinemaStoryHeading
    .68s
    var(--cc-reveal-ease)
    .20s
    both;
}

.cc-story p {
  animation:
    ccCinemaStoryParagraph
    .66s
    var(--cc-reveal-ease)
    .32s
    both;
}

.cc-story-progress {
  animation:
    ccCinemaStoryProgress
    .65s
    var(--cc-reveal-ease)
    .43s
    both;
}

/*
 * Soft motion as section moves through viewport.
 * This creates the water-like floating feeling
 * without hijacking normal browser scrolling.
 */

.cc-culture-copy {
  will-change:
    transform;

  transition:
    transform
    .08s
    linear;
}

.cc-culture-grid {
  will-change:
    transform;

  transition:
    transform
    .09s
    linear;
}

.cc-culture-glow {
  will-change:
    transform,
    opacity;
}

/*
 * Light atmosphere behind the content.
 */

.cc-culture-copy::before {
  position: absolute;

  top: -75px;
  left: -95px;

  z-index: -2;

  width: 430px;
  height: 430px;

  content: "";

  pointer-events: none;

  opacity: .38;

  border-radius: 50%;

  background:
    radial-gradient(
      circle,
      rgba(
        255,
        255,
        255,
        .92
      ),
      rgba(
        255,
        219,
        226,
        .21
      )
      38%,
      transparent
      69%
    );

  filter:
    blur(7px);

  transform:
    translate3d(
      calc(
        var(--cc-x) *
        -12px
      ),
      calc(
        var(--cc-scroll) *
        24px
      ),
      0
    );

  animation:
    ccCinemaAmbientBreath
    5.5s
    ease-in-out
    infinite
    alternate;
}

/*
 * Existing right-side animation remains.
 * Only reveal timing is refined.
 */

.cc-culture-active
.cc-motion-stage {
  animation-delay:
    1.10s !important;
}

/*
 * KEYFRAMES
 */

@keyframes ccCinemaEyebrow {
  from {
    opacity: 0;

    filter:
      blur(8px);

    clip-path:
      inset(
        0
        100%
        0
        0
      );

    transform:
      translate3d(
        -26px,
        0,
        0
      );
  }

  to {
    opacity: 1;

    filter:
      blur(0);

    clip-path:
      inset(
        0
        0
        0
        0
      );

    transform:
      translate3d(
        0,
        0,
        0
      );
  }
}

@keyframes ccCinemaWord {
  0% {
    opacity: 0;

    clip-path:
      inset(
        0
        100%
        0
        0
      );

    filter:
      blur(8px);

    transform:
      translate3d(
        0,
        .72em,
        0
      )
      rotateX(12deg);
  }

  58% {
    opacity: 1;

    filter:
      blur(1px);
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

@keyframes ccCinemaRedWord {
  0% {
    opacity: 0;

    clip-path:
      inset(
        0
        100%
        0
        0
      );

    filter:
      blur(9px)
      brightness(1.3);

    transform:
      translate3d(
        0,
        .78em,
        0
      )
      scale(.96);
  }

  65% {
    opacity: 1;

    filter:
      blur(1px)
      brightness(1.12);
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

    filter:
      blur(0)
      brightness(1);

    transform:
      translate3d(
        0,
        0,
        0
      )
      scale(1);
  }
}

@keyframes ccCinemaWriteLine {
  0% {
    opacity: 0;

    clip-path:
      inset(
        0
        100%
        0
        0
      );

    filter:
      blur(3px);

    transform:
      translate3d(
        0,
        8px,
        0
      );
  }

  8% {
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

@keyframes ccCinemaCursor {
  0%,
  100% {
    opacity: 0;
  }

  50% {
    opacity: 1;
  }
}

@keyframes ccCinemaStoryReveal {
  from {
    opacity: 0;

    filter:
      blur(12px);

    clip-path:
      inset(
        0
        0
        100%
        0
      );

    transform:
      translate3d(
        0,
        34px,
        0
      );
  }

  to {
    opacity: 1;

    filter:
      blur(0);

    clip-path:
      inset(
        0
        0
        0
        0
      );

    transform:
      translate3d(
        0,
        0,
        0
      );
  }
}

@keyframes ccCinemaStoryLabel {
  from {
    opacity: 0;

    letter-spacing:
      .35em;

    transform:
      translateX(
        -15px
      );
  }

  to {
    opacity: 1;

    transform:
      translateX(
        0
      );
  }
}

@keyframes ccCinemaStoryHeading {
  from {
    opacity: 0;

    filter:
      blur(8px);

    transform:
      translate3d(
        0,
        20px,
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

@keyframes ccCinemaStoryParagraph {
  from {
    opacity: 0;

    filter:
      blur(5px);

    transform:
      translate3d(
        0,
        15px,
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

@keyframes ccCinemaStoryProgress {
  from {
    opacity: 0;

    transform:
      translateX(
        -18px
      );
  }

  to {
    opacity: 1;

    transform:
      translateX(
        0
      );
  }
}

@keyframes ccCinemaTitleLight {
  0% {
    left: -14%;

    opacity: 0;
  }

  18% {
    opacity: .85;
  }

  55% {
    opacity: .42;
  }

  100% {
    left: 106%;

    opacity: 0;
  }
}

@keyframes ccCinemaAmbientBreath {
  from {
    opacity: .24;

    transform:
      translate3d(
        calc(
          var(--cc-x) *
          -12px
        ),
        calc(
          var(--cc-scroll) *
          24px
        ),
        0
      )
      scale(.90);
  }

  to {
    opacity: .48;

    transform:
      translate3d(
        calc(
          var(--cc-x) *
          -12px
        ),
        calc(
          var(--cc-scroll) *
          24px
        ),
        0
      )
      scale(1.07);
  }
}

/*
 * Mobile cinematic timing
 */

@media (max-width: 760px) {
  .cc-intro-line {
    width: 100%;
  }

  .cc-title-row {
    gap:
      .01em
      .13em;
  }

  .cc-culture-copy::before {
    width: 310px;
    height: 310px;

    top: -40px;
    left: -95px;
  }
}

/*
 * Accessibility
 */

@media (
  prefers-reduced-motion:
  reduce
) {
  .cc-culture-eyebrow-wrap,
  .cc-title-row b,
  .cc-intro-line,
  .cc-story-shell,
  .cc-story small,
  .cc-story h3,
  .cc-story p,
  .cc-story-progress {
    opacity: 1 !important;

    clip-path:
      inset(
        0
        0
        0
        0
      ) !important;

    filter:
      none !important;

    transform:
      none !important;

    animation:
      none !important;
  }

  .cc-title-row-red::after,
  .cc-intro-line::after,
  .cc-culture-copy::before {
    display:
      none !important;
  }
}

/* === CC CULTURE CINEMATIC TEXT V1 END === */

        /*
         * CC_CULTURE_STORY_STAGE_START
         * Position the existing culture story where the reactor was removed.
         */
        @media (min-width: 761px) {
          .cc-culture-story-stage {
            position: absolute;
            top: 50%;
            left: calc(100% + clamp(24px, 3.5vw, 68px));
            z-index: 7;

            width: min(40vw, 650px);

            transform: translateY(-50%);
          }

          .cc-culture-story-stage .cc-story-shell {
            width: 100%;
            max-width: none;
            margin-top: 0;
          }
        }

        @media (min-width: 761px) and (max-width: 1030px) {
          .cc-culture-story-stage {
            left: calc(100% + 18px);
            width: 36vw;
          }

          .cc-culture-story-stage .cc-story h3 {
            font-size: clamp(25px, 3.2vw, 36px);
          }
        }

        @media (max-width: 760px) {
          .cc-culture-story-stage {
            position: relative;
            width: 100%;
          }
        }
        /* CC_CULTURE_STORY_STAGE_END */

        /*
         * CC_CULTURE_STORY_STAGE_START
         * Desktop story position and synchronized first reveal.
         */
        @media (min-width: 761px) {
          .cc-culture-story-stage {
            position: absolute;
            top: 50%;
            left: calc(100% - clamp(18px, 2vw, 34px));
            z-index: 7;

            width: min(41vw, 650px);

            transform: translateY(-50%);
          }

          .cc-culture-story-stage .cc-story-shell {
            width: 100%;
            max-width: none;
            margin-top: 0;
          }

          .cc-culture-active
          .cc-culture-story-stage
          .cc-story-shell {
            animation-delay: 0.72s !important;
          }
        }

        @media (min-width: 761px) and (max-width: 1030px) {
          .cc-culture-story-stage {
            left: calc(100% - 12px);
            width: 38vw;
          }

          .cc-culture-story-stage .cc-story h3 {
            font-size: clamp(25px, 3.2vw, 36px);
          }
        }

        @media (max-width: 760px) {
          .cc-culture-story-stage {
            position: relative;
            width: 100%;
          }
        }
        /* CC_CULTURE_STORY_STAGE_END */

        /*
         * CC_CULTURE_DESKTOP_GAP_FIX_START
         * Remove the empty desktop space without changing mobile layout.
         */
        @media (min-width: 761px) {
          .cc-culture {
            min-height: auto;
          }

          .cc-culture-container {
            min-height: auto;

            padding-bottom:
              clamp(
                32px,
                3vw,
                46px
              );
          }

          .cc-culture-ticker {
            position: relative;

            right: auto;
            bottom: auto;
            left: auto;

            width: 100%;

            margin-top:
              clamp(
                24px,
                2.5vw,
                38px
              );
          }
        }
        /* CC_CULTURE_DESKTOP_GAP_FIX_END */

        /*
         * CC_CULTURE_BACKGROUND_COLOR_START
         * Reduce excessive white and keep a premium light-pink background.
         */
        .cc-culture {
          background:
            radial-gradient(
              circle at 84% 25%,
              rgba(240, 32, 48, 0.20) 0%,
              rgba(255, 183, 196, 0.15) 27%,
              transparent 54%
            ),
            radial-gradient(
              circle at 18% 78%,
              rgba(240, 32, 48, 0.08) 0%,
              transparent 42%
            ),
            linear-gradient(
              116deg,
              #fff4f6 0%,
              #ffeaee 38%,
              #ffdee5 72%,
              #ffedf1 100%
            ) !important;
        }
        /* CC_CULTURE_BACKGROUND_COLOR_END */
`}</style>
    </section>
  );
}