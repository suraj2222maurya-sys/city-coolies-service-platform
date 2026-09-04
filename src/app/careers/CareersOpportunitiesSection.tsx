"use client";

import {
  useEffect,
  useRef,
} from "react";

import type {
  CSSProperties,
  MouseEvent,
} from "react";

const opportunities = [
  {
    title: "Operations & Service Delivery",
    text: "Coordinate professional service delivery, quality and execution.",
    icon: "team",
  },
  {
    title: "Customer Experience",
    text: "Create clear, dependable and helpful customer experiences.",
    icon: "person",
  },
  {
    title: "Sales & Partnerships",
    text: "Build strong relationships and meaningful business growth.",
    icon: "sales",
  },
  {
    title: "Technology & Product",
    text: "Build digital systems that improve modern service experiences.",
    icon: "code",
  },
  {
    title: "Marketing & Growth",
    text: "Strengthen the brand through useful content and smart growth.",
    icon: "growth",
  },
  {
    title: "Finance & Administration",
    text: "Support organised, responsible and efficient business operations.",
    icon: "finance",
  },
] as const;

type IconName =
  (typeof opportunities)[number]["icon"];

const iconProps = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.8,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

function OpportunityIcon({
  name,
}: {
  name: IconName;
}) {
  if (name === "team") {
    return (
      <svg viewBox="0 0 32 32" aria-hidden="true">
        <circle cx="16" cy="9" r="4" {...iconProps} />
        <circle cx="7" cy="13" r="3" {...iconProps} />
        <circle cx="25" cy="13" r="3" {...iconProps} />

        <path
          d="M9 25v-2.8c0-4 2.9-6.7 7-6.7s7 2.7 7 6.7V25"
          {...iconProps}
        />

        <path
          d="M2.7 24v-2.3c0-3 1.9-5 4.5-5 1.5 0 2.7.5 3.7 1.6M29.3 24v-2.3c0-3-1.9-5-4.5-5-1.5 0-2.7.5-3.7 1.6"
          {...iconProps}
        />
      </svg>
    );
  }

  if (name === "person") {
    return (
      <svg viewBox="0 0 32 32" aria-hidden="true">
        <circle cx="16" cy="10" r="4.7" {...iconProps} />

        <path
          d="M8.5 26v-3.3c0-4.5 3.2-7.2 7.5-7.2s7.5 2.7 7.5 7.2V26"
          {...iconProps}
        />
      </svg>
    );
  }

  if (name === "sales") {
    return (
      <svg viewBox="0 0 32 32" aria-hidden="true">
        <path
          d="m3.5 12 6-3.2 5 4.1-4.6 5.2-6.4-3.4V12ZM28.5 12l-6-3.2-5 4.1 4.6 5.2 6.4-3.4V12Z"
          {...iconProps}
        />

        <path
          d="m10 18 6 5.2c1 .9 2.5.8 3.4-.2l3-3.4M12.8 15.4l4.3 3.8"
          {...iconProps}
        />
      </svg>
    );
  }

  if (name === "code") {
    return (
      <svg viewBox="0 0 32 32" aria-hidden="true">
        <rect
          x="4"
          y="6"
          width="24"
          height="17"
          rx="2.2"
          {...iconProps}
        />

        <path
          d="m12 12-3 3 3 3M20 12l3 3-3 3M17.8 10.5l-3.6 9"
          {...iconProps}
        />

        <path
          d="M11 27h10M16 23v4"
          {...iconProps}
        />
      </svg>
    );
  }

  if (name === "growth") {
    return (
      <svg viewBox="0 0 32 32" aria-hidden="true">
        <path
          d="M5 25v-7M11 25V14M17 25v-9M23 25V9"
          {...iconProps}
        />

        <path
          d="m6 12 7-5 5 3 8-7"
          {...iconProps}
        />

        <path
          d="M21 3h5v5"
          {...iconProps}
        />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 32 32" aria-hidden="true">
      <rect
        x="5"
        y="9"
        width="22"
        height="17"
        rx="3"
        {...iconProps}
      />

      <path
        d="M5 14h22M21 18h6"
        {...iconProps}
      />

      <path
        d="M9 9V6h13l3 3"
        {...iconProps}
      />
    </svg>
  );
}

function TalentIcon() {
  return (
    <svg
      viewBox="0 0 40 40"
      aria-hidden="true"
    >
      <circle
        cx="20"
        cy="12"
        r="5"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      />

      <path
        d="M10 32v-4c0-6 4-10 10-10s10 4 10 10v4"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

export default function CareersOpportunitiesSection() {
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
        "cc-op-active",
      );

      return;
    }

    let targetScroll = 0;
    let currentScroll = 0;
    let frame = 0;

    const updateScroll = () => {
      const rect =
        section.getBoundingClientRect();

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
            (
              viewport / 2 -
              (
                rect.top +
                rect.height / 2
              )
            ) /
              Math.max(
                rect.height,
                viewport,
              ),
          ),
        );
    };

    const animate = () => {
      currentScroll +=
        (
          targetScroll -
          currentScroll
        ) *
        0.045;

      section.style.setProperty(
        "--cc-scroll",
        currentScroll.toFixed(4),
      );

      frame =
        window.requestAnimationFrame(
          animate,
        );
    };

    const observer =
      new IntersectionObserver(
        ([entry]) => {
          if (!entry) {
            return;
          }

          if (
            entry.isIntersecting
          ) {
            section.classList.remove(
              "cc-op-active",
            );

            window.requestAnimationFrame(
              () => {
                window.requestAnimationFrame(
                  () => {
                    section.classList.add(
                      "cc-op-active",
                    );
                  },
                );
              },
            );
          } else {
            section.classList.remove(
              "cc-op-active",
            );
          }
        },
        {
          threshold: 0,
          rootMargin: "240px 0px 240px 0px",
        },
      );

    observer.observe(section);

    /* cc-op-initial-reveal */
    const initialRect =
      section.getBoundingClientRect();

    if (
      initialRect.top <
        window.innerHeight + 260 &&
      initialRect.bottom > -260
    ) {
      window.requestAnimationFrame(
        () => {
          section.classList.add(
            "cc-op-active",
          );
        },
      );
    }

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
        frame,
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

  const scrollToJoin =
    (
      event:
        MouseEvent<HTMLAnchorElement>,
    ) => {
      event.preventDefault();

      document
        .getElementById(
          "join-city-coolies",
        )
        ?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
    };

  return (
    <section
      ref={sectionRef}
      id="career-opportunities"
      className="cc-op"
      aria-labelledby="career-opportunities-title"
    >
      <div
        className="cc-op-bg"
        aria-hidden="true"
      >
        <span className="cc-op-bg-glow cc-op-bg-glow-one" />
        <span className="cc-op-bg-glow cc-op-bg-glow-two" />

        <span className="cc-op-light-line cc-op-light-line-one" />
        <span className="cc-op-light-line cc-op-light-line-two" />
        <span className="cc-op-light-line cc-op-light-line-three" />

        <span className="cc-op-spark cc-op-spark-one" />
        <span className="cc-op-spark cc-op-spark-two" />
        <span className="cc-op-spark cc-op-spark-three" />
      </div>

      <div className="cc-op-shell">
        <span
          className="cc-op-shell-light"
          aria-hidden="true"
        />

        <header className="cc-op-head">
          <div className="cc-op-kicker">
            <i />
            <b />

            <span>
              Career Opportunities
            </span>
          </div>

          <div className="cc-op-title-layout">
            <h2 id="career-opportunities-title">
              <span>
                Find your place.
              </span>

              <span>
                Grow with{" "}
                <em>
                  City Coolies.
                </em>
              </span>
            </h2>

            <div className="cc-op-description">
              <p>
                Explore meaningful roles across operations,
                customer experience,
              </p>

              <p>
                sales, technology, marketing and business support.
                Build practical
              </p>

              <p>
                skills, contribute with ownership and grow with a
                team that values{" "}
                <strong>
                  quality and trust.
                </strong>
              </p>
            </div>
          </div>
        </header>

        <div className="cc-op-content">
          <div className="cc-op-cards">
            {opportunities.map(
              (
                opportunity,
                index,
              ) => (
                <a
                  key={
                    opportunity.title
                  }
                  href="#join-city-coolies"
                  onClick={
                    scrollToJoin
                  }
                  className="cc-op-card"
                  style={
                    {
                      "--cc-delay":
                        `${1.55 + index * 0.11}s`,
                    } as CSSProperties
                  }
                >
                  <span className="cc-op-card-index">
                    0{index + 1}
                  </span>

                  <div className="cc-op-card-icon">
                    <OpportunityIcon
                      name={
                        opportunity.icon
                      }
                    />
                  </div>

                  <div className="cc-op-card-copy">
                    <h3>
                      {opportunity.title}
                    </h3>

                    <p>
                      {opportunity.text}
                    </p>
                  </div>

                  <span className="cc-op-card-arrow">
                    ↗
                  </span>

                  <i className="cc-op-card-light" />
                </a>
              ),
            )}
          </div>

          <div className="cc-op-talent">
            <div className="cc-op-talent-icon">
              <TalentIcon />
            </div>

            <div className="cc-op-talent-copy">
              <span>
                Open Talent Network
              </span>

              <strong>
                Don&apos;t see the right role yet?
              </strong>

              <p>
                Share your profile and let us understand where
                your skills could create the strongest impact.
              </p>
            </div>

            <a
              href="#join-city-coolies"
              onClick={
                scrollToJoin
              }
            >
              <span>
                Join Now
              </span>

              <i>
                ↗
              </i>
            </a>
          </div>
        </div>
      </div>

      <style>{`
        .cc-op {
          --cc-red: #ef1d2e;
          --cc-dark-red: #da071b;
          --cc-pink: #ff92a4;
          --cc-soft-pink: #fff0f3;
          --cc-ink: #17191f;
          --cc-muted: #656a75;
          --cc-scroll: 0;

          position: relative;
          isolation: isolate;

          width: 100%;

          padding:
            20px
            18px;

          overflow: hidden;

          background:
            linear-gradient(
              180deg,
              #fffafb,
              #fff1f4
            );

          scroll-margin-top:
            100px;
        }

        /*
         * BACKGROUND
         * No separate 3D object.
         */

        .cc-op-bg {
          position: absolute;
          inset: 0;
          z-index: -3;

          overflow: hidden;

          pointer-events: none;
        }

        .cc-op-bg-glow {
          position: absolute;

          border-radius: 50%;

          filter: blur(8px);

          will-change:
            transform;
        }

        .cc-op-bg-glow-one {
          top: -190px;
          right: -80px;

          width: 520px;
          height: 520px;

          background:
            radial-gradient(
              circle,
              rgba(
                255,
                151,
                170,
                .28
              ),
              rgba(
                255,
                211,
                220,
                .08
              )
              42%,
              transparent
              70%
            );

          transform:
            translateY(
              calc(
                var(--cc-scroll) *
                32px
              )
            );

          animation:
            ccOpBackgroundBreath
            6s
            ease-in-out
            infinite
            alternate;
        }

        .cc-op-bg-glow-two {
          bottom: -230px;
          left: -150px;

          width: 470px;
          height: 470px;

          background:
            radial-gradient(
              circle,
              rgba(
                239,
                29,
                46,
                .10
              ),
              transparent
              70%
            );

          transform:
            translateY(
              calc(
                var(--cc-scroll) *
                -24px
              )
            );
        }

        .cc-op-light-line {
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
                .96
              ),
              rgba(
                239,
                29,
                46,
                .26
              ),
              transparent
            );

          filter:
            drop-shadow(
              0
              0
              5px
              rgba(
                239,
                29,
                46,
                .25
              )
            );
        }

        .cc-op-light-line-one {
          top: 25%;
          right: -8%;

          width: 52%;

          transform:
            rotate(-8deg);

          animation:
            ccOpLineOne
            5.5s
            ease-in-out
            infinite
            alternate;
        }

        .cc-op-light-line-two {
          right: -5%;
          bottom: 20%;

          width: 46%;

          transform:
            rotate(-4deg);

          animation:
            ccOpLineTwo
            6.2s
            ease-in-out
            infinite
            alternate;
        }

        .cc-op-light-line-three {
          bottom: 8%;
          left: -7%;

          width: 39%;

          transform:
            rotate(5deg);

          opacity: .55;

          animation:
            ccOpLineThree
            6.5s
            ease-in-out
            infinite
            alternate;
        }

        .cc-op-spark {
          position: absolute;

          border-radius: 50%;

          background: white;

          box-shadow:
            0
            0
            9px
            white,
            0
            0
            19px
            rgba(
              239,
              29,
              46,
              .62
            );
        }

        .cc-op-spark-one {
          top: 18%;
          right: 18%;

          width: 6px;
          height: 6px;

          animation:
            ccOpSparkOne
            4.8s
            ease-in-out
            infinite;
        }

        .cc-op-spark-two {
          right: 7%;
          bottom: 24%;

          width: 8px;
          height: 8px;

          animation:
            ccOpSparkTwo
            5.7s
            ease-in-out
            infinite;
        }

        .cc-op-spark-three {
          left: 43%;
          bottom: 10%;

          width: 5px;
          height: 5px;

          animation:
            ccOpSparkThree
            5.1s
            ease-in-out
            infinite;
        }

        /*
         * COMPACT SECTION FRAME
         */

        .cc-op-shell {
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
              46px,
              4vw,
              64px
            )
            clamp(
              30px,
              4vw,
              58px
            )
            clamp(
              37px,
              3vw,
              48px
            );

          overflow: hidden;

          border:
            1px solid
            rgba(
              239,
              29,
              46,
              .09
            );

          border-radius:
            28px;

          background:
            linear-gradient(
              118deg,
              rgba(
                255,
                255,
                255,
                .91
              ),
              rgba(
                255,
                249,
                250,
                .84
              )
              52%,
              rgba(
                255,
                236,
                241,
                .82
              )
            );

          box-shadow:
            inset
            0
            1px
            0
            rgba(
              255,
              255,
              255,
              .96
            ),
            0
            20px
            60px
            rgba(
              116,
              8,
              22,
              .06
            );

          clip-path:
            inset(
              48%
              0
              48%
              0
              round
              28px
            );

          opacity: 0;

          transform:
            translateY(25px)
            scale(.985);

          will-change:
            clip-path,
            opacity,
            transform;
        }

        .cc-op-active
        .cc-op-shell {
          animation:
            ccOpSectionOpen
            .95s
            cubic-bezier(.16,1,.3,1)
            forwards;
        }

        .cc-op-shell::before {
          position: absolute;

          inset: 9px;

          content: "";

          pointer-events: none;

          border:
            1px solid
            rgba(
              255,
              255,
              255,
              .80
            );

          border-radius:
            21px;

          opacity: 0;
        }

        .cc-op-active
        .cc-op-shell::before {
          animation:
            ccOpInnerBorder
            .8s
            ease
            .40s
            forwards;
        }

        .cc-op-shell-light {
          position: absolute;

          top: -60%;
          left: -22%;

          z-index: 20;

          width: 8%;
          height: 220%;

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
                .93
              ),
              transparent
            );

          filter: blur(8px);

          transform:
            rotate(20deg);
        }

        .cc-op-active
        .cc-op-shell-light {
          animation:
            ccOpSectionSweep
            2.6s
            ease
            .25s
            forwards;
        }

        /*
         * TOP CONTENT
         */

        .cc-op-kicker {
          display: flex;
          align-items: center;

          gap: 8px;

          width: fit-content;

          opacity: 0;

          color:
            var(--cc-red);

          transform:
            translateX(-25px);
        }

        .cc-op-active
        .cc-op-kicker {
          animation:
            ccOpLeftReveal
            .65s
            cubic-bezier(.16,1,.3,1)
            .35s
            forwards;
        }

        .cc-op-kicker i {
          width: 7px;
          height: 7px;

          border-radius: 50%;

          background:
            var(--cc-red);

          box-shadow:
            0
            0
            12px
            rgba(
              239,
              29,
              46,
              .65
            );
        }

        .cc-op-kicker b {
          width: 39px;
          height: 2px;

          background:
            linear-gradient(
              90deg,
              var(--cc-red),
              rgba(
                239,
                29,
                46,
                .12
              )
            );
        }

        .cc-op-kicker span {
          margin-left: 5px;

          font-size: 9px;
          font-weight: 900;

          letter-spacing:
            .21em;

          text-transform:
            uppercase;
        }

        .cc-op-title-layout {
          display: grid;

          grid-template-columns:
            minmax(
              0,
              .98fr
            )
            minmax(
              330px,
              .72fr
            );

          align-items: end;

          gap:
            35px
            65px;

          margin-top: 19px;
        }

        .cc-op-title-layout h2 {
          margin: 0;

          color:
            var(--cc-ink);

          font-size:
            clamp(
              43px,
              4.4vw,
              64px
            );

          font-weight: 760;

          line-height: .97;

          letter-spacing:
            -.052em;
        }

        .cc-op-title-layout h2 > span {
          display: block;

          opacity: 0;

          overflow: hidden;

          filter:
            blur(8px);

          transform:
            translateY(45px);
        }

        .cc-op-active
        .cc-op-title-layout
        h2 > span:first-child {
          animation:
            ccOpTitleReveal
            .77s
            cubic-bezier(.16,1,.3,1)
            .58s
            forwards;
        }

        .cc-op-active
        .cc-op-title-layout
        h2 > span:last-child {
          animation:
            ccOpTitleReveal
            .77s
            cubic-bezier(.16,1,.3,1)
            .76s
            forwards;
        }

        .cc-op-title-layout h2 em {
          color:
            var(--cc-red);

          font-style: normal;
        }

        .cc-op-description {
          padding-bottom: 3px;

          color:
            var(--cc-muted);

          font-size:
            clamp(
              12.5px,
              .96vw,
              15px
            );

          line-height: 1.62;
        }

        .cc-op-description p {
          width: fit-content;

          margin:
            0
            0
            2px;

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
            translateY(6px);
        }

        .cc-op-active
        .cc-op-description
        p:nth-child(1) {
          animation:
            ccOpWriting
            .70s
            steps(
              25,
              end
            )
            .94s
            forwards;
        }

        .cc-op-active
        .cc-op-description
        p:nth-child(2) {
          animation:
            ccOpWriting
            .70s
            steps(
              27,
              end
            )
            1.10s
            forwards;
        }

        .cc-op-active
        .cc-op-description
        p:nth-child(3) {
          animation:
            ccOpWriting
            .75s
            steps(
              29,
              end
            )
            1.26s
            forwards;
        }

        .cc-op-description strong {
          color:
            var(--cc-red);

          font-weight: 800;
        }

        /*
         * CARDS
         */

        .cc-op-content {
          margin-top:
            clamp(
              31px,
              3vw,
              42px
            );
        }

        .cc-op-cards {
          display: grid;

          grid-template-columns:
            repeat(
              3,
              minmax(
                0,
                1fr
              )
            );

          gap: 12px;
        }

        .cc-op-card {
          position: relative;

          display: grid;

          grid-template-columns:
            auto
            50px
            minmax(
              0,
              1fr
            )
            30px;

          align-items: center;

          gap: 12px;

          min-height: 103px;

          padding:
            16px
            17px;

          overflow: hidden;

          opacity: 0;

          border:
            1px solid
            rgba(
              239,
              29,
              46,
              .11
            );

          border-radius:
            18px;

          color:
            #24262c;

          text-decoration: none;

          background:
            linear-gradient(
              145deg,
              rgba(
                255,
                255,
                255,
                .91
              ),
              rgba(
                255,
                245,
                247,
                .71
              )
            );

          box-shadow:
            inset
            0
            1px
            0
            rgba(
              255,
              255,
              255,
              .96
            ),
            0
            10px
            26px
            rgba(
              111,
              8,
              21,
              .045
            );

          filter:
            blur(8px);

          transform:
            translateY(25px)
            scale(.96);

          transition:
            transform .30s ease,
            border-color .30s ease,
            box-shadow .30s ease;
        }

        .cc-op-active
        .cc-op-card {
          animation:
            ccOpCardReveal
            .68s
            cubic-bezier(.16,1,.3,1)
            var(--cc-delay)
            forwards;
        }

        .cc-op-card:hover {
          border-color:
            rgba(
              239,
              29,
              46,
              .28
            );

          transform:
            translateY(-4px);

          box-shadow:
            0
            18px
            37px
            rgba(
              205,
              7,
              28,
              .10
            );
        }

        .cc-op-card-index {
          align-self:
            start;

          margin-top: 4px;

          color:
            rgba(
              239,
              29,
              46,
              .27
            );

          font-size: 10px;
          font-weight: 900;

          letter-spacing:
            .08em;
        }

        .cc-op-card-icon {
          display: grid;

          width: 48px;
          height: 48px;

          place-items: center;

          border:
            1px solid
            rgba(
              239,
              29,
              46,
              .13
            );

          border-radius: 50%;

          color:
            var(--cc-red);

          background:
            radial-gradient(
              circle,
              #ffffff,
              #fff1f4
            );

          box-shadow:
            0
            0
            22px
            rgba(
              239,
              29,
              46,
              .07
            );
        }

        .cc-op-card-icon svg {
          width: 25px;
          height: 25px;
        }

        .cc-op-card-copy h3 {
          margin: 0;

          font-size:
            clamp(
              12px,
              .9vw,
              14px
            );

          font-weight: 820;

          line-height: 1.22;
        }

        .cc-op-card-copy p {
          margin:
            6px
            0
            0;

          color:
            var(--cc-muted);

          font-size: 10.5px;

          line-height: 1.45;
        }

        .cc-op-card-arrow {
          display: grid;

          width: 29px;
          height: 29px;

          place-items: center;

          border-radius: 50%;

          color:
            var(--cc-red);

          font-size: 15px;

          background:
            rgba(
              239,
              29,
              46,
              .05
            );

          transition:
            color .28s ease,
            background .28s ease,
            transform .28s ease;
        }

        .cc-op-card:hover
        .cc-op-card-arrow {
          color: white;

          background:
            var(--cc-red);

          transform:
            rotate(45deg);
        }

        .cc-op-card-light {
          position: absolute;

          top: -70%;
          left: -25%;

          width: 12%;
          height: 240%;

          opacity: 0;

          background:
            linear-gradient(
              90deg,
              transparent,
              rgba(
                255,
                255,
                255,
                .95
              ),
              transparent
            );

          filter: blur(5px);

          transform:
            rotate(20deg);
        }

        .cc-op-card:hover
        .cc-op-card-light {
          animation:
            ccOpCardSweep
            .75s
            ease
            forwards;
        }

        /*
         * BOTTOM TALENT CTA
         */

        .cc-op-talent {
          display: grid;

          grid-template-columns:
            58px
            1fr
            auto;

          align-items: center;

          gap: 18px;

          min-height: 89px;

          margin-top: 13px;

          padding:
            13px
            17px;

          opacity: 0;

          border:
            1px solid
            rgba(
              239,
              29,
              46,
              .12
            );

          border-radius:
            18px;

          background:
            linear-gradient(
              100deg,
              rgba(
                255,
                255,
                255,
                .88
              ),
              rgba(
                255,
                237,
                242,
                .75
              )
            );

          box-shadow:
            0
            11px
            29px
            rgba(
              112,
              8,
              21,
              .045
            );

          filter:
            blur(7px);

          transform:
            translateY(20px);
        }

        .cc-op-active
        .cc-op-talent {
          animation:
            ccOpTalentReveal
            .72s
            cubic-bezier(.16,1,.3,1)
            1.98s
            forwards;
        }

        .cc-op-talent-icon {
          display: grid;

          width: 55px;
          height: 55px;

          place-items: center;

          border:
            1px solid
            rgba(
              239,
              29,
              46,
              .14
            );

          border-radius: 50%;

          color:
            var(--cc-red);

          background:
            rgba(
              255,
              255,
              255,
              .76
            );

          box-shadow:
            0
            0
            0
            5px
            rgba(
              255,
              255,
              255,
              .33
            ),
            0
            0
            23px
            rgba(
              239,
              29,
              46,
              .09
            );
        }

        .cc-op-talent-icon svg {
          width: 27px;
          height: 27px;
        }

        .cc-op-talent-copy {
          min-width: 0;
        }

        .cc-op-talent-copy > span {
          display: block;

          margin-bottom: 3px;

          color:
            var(--cc-red);

          font-size: 8px;
          font-weight: 900;

          letter-spacing:
            .15em;

          text-transform:
            uppercase;
        }

        .cc-op-talent-copy strong {
          display: block;

          font-size:
            clamp(
              13px,
              1.05vw,
              16px
            );

          font-weight: 820;
        }

        .cc-op-talent-copy p {
          margin:
            4px
            0
            0;

          color:
            var(--cc-muted);

          font-size: 10.5px;

          line-height: 1.45;
        }

        .cc-op-talent > a {
          display: inline-flex;
          align-items: center;
          justify-content: center;

          gap: 18px;

          min-width: 147px;
          height: 48px;

          padding:
            0
            18px;

          border-radius:
            999px;

          color: white;

          font-size: 11px;
          font-weight: 850;

          text-decoration: none;

          background:
            linear-gradient(
              100deg,
              #ff2d41,
              #dc071b
            );

          box-shadow:
            0
            13px
            27px
            rgba(
              219,
              7,
              27,
              .21
            );

          transition:
            transform .28s ease,
            box-shadow .28s ease;
        }

        .cc-op-talent > a:hover {
          transform:
            translateY(-3px);

          box-shadow:
            0
            18px
            34px
            rgba(
              219,
              7,
              27,
              .28
            );
        }

        .cc-op-talent > a i {
          font-size: 16px;
          font-style: normal;
        }

        /*
         * ENTRY ANIMATIONS
         */

        @keyframes ccOpSectionOpen {
          0% {
            opacity: 0;

            clip-path:
              inset(
                48%
                0
                48%
                0
                round
                28px
              );

            transform:
              translateY(25px)
              scale(.985);

            filter: blur(9px);
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

            transform:
              translateY(0)
              scale(1);

            filter: blur(0);
          }
        }

        @keyframes ccOpInnerBorder {
          to {
            opacity: 1;
          }
        }

        @keyframes ccOpSectionSweep {
          0% {
            left: -22%;

            opacity: 0;
          }

          18% {
            opacity: .72;
          }

          100% {
            left: 118%;

            opacity: 0;
          }
        }

        @keyframes ccOpLeftReveal {
          to {
            opacity: 1;

            transform:
              translateX(0);
          }
        }

        @keyframes ccOpTitleReveal {
          to {
            opacity: 1;

            filter: blur(0);

            transform:
              translateY(0);
          }
        }

        @keyframes ccOpWriting {
          0% {
            opacity: 0;

            clip-path:
              inset(
                0
                100%
                0
                0
              );

            filter: blur(3px);

            transform:
              translateY(6px);
          }

          9% {
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

            transform:
              translateY(0);
          }
        }

        @keyframes ccOpCardReveal {
          to {
            opacity: 1;

            filter: blur(0);

            transform:
              translateY(0)
              scale(1);
          }
        }

        @keyframes ccOpTalentReveal {
          to {
            opacity: 1;

            filter: blur(0);

            transform:
              translateY(0);
          }
        }

        @keyframes ccOpCardSweep {
          0% {
            left: -25%;

            opacity: 0;
          }

          20% {
            opacity: .8;
          }

          100% {
            left: 120%;

            opacity: 0;
          }
        }

        /*
         * CONTINUOUS SECTION MOTION
         */

        @keyframes ccOpBackgroundBreath {
          from {
            opacity: .55;

            scale: .92;
          }

          to {
            opacity: 1;

            scale: 1.07;
          }
        }

        @keyframes ccOpLineOne {
          to {
            transform:
              rotate(-5deg)
              translateY(-18px);

            opacity: .22;
          }
        }

        @keyframes ccOpLineTwo {
          to {
            transform:
              rotate(-7deg)
              translateY(17px);

            opacity: .68;
          }
        }

        @keyframes ccOpLineThree {
          to {
            transform:
              rotate(2deg)
              translateY(-13px);

            opacity: .20;
          }
        }

        @keyframes ccOpSparkOne {
          50% {
            transform:
              translate(
                23px,
                -22px
              );

            opacity: .55;
          }
        }

        @keyframes ccOpSparkTwo {
          50% {
            transform:
              translate(
                -24px,
                27px
              );

            opacity: .62;
          }
        }

        @keyframes ccOpSparkThree {
          50% {
            transform:
              translate(
                25px,
                -17px
              );

            opacity: .45;
          }
        }

        /*
         * TABLET
         */

        @media (
          max-width: 980px
        ) {
          .cc-op-title-layout {
            grid-template-columns:
              1fr;

            gap: 20px;
          }

          .cc-op-description {
            max-width: 650px;
          }

          .cc-op-cards {
            grid-template-columns:
              repeat(
                2,
                minmax(
                  0,
                  1fr
                )
              );
          }
        }

        /*
         * PHONE
         */

        @media (
          max-width: 650px
        ) {
          .cc-op {
            padding: 10px;
          }

          .cc-op-shell {
            padding:
              34px
              15px
              25px;

            border-radius:
              22px;
          }

          .cc-op-shell::before {
            inset: 7px;

            border-radius:
              16px;
          }

          .cc-op-kicker span {
            font-size: 7.5px;

            letter-spacing:
              .16em;
          }

          .cc-op-kicker b {
            width: 28px;
          }

          .cc-op-title-layout {
            margin-top: 16px;
          }

          .cc-op-title-layout h2 {
            font-size:
              clamp(
                37px,
                10.9vw,
                50px
              );
          }

          .cc-op-description {
            font-size: 12px;
          }

          .cc-op-description p {
            width: auto;
          }

          .cc-op-content {
            margin-top: 25px;
          }

          .cc-op-cards {
            grid-template-columns:
              1fr;

            gap: 8px;
          }

          .cc-op-card {
            grid-template-columns:
              28px
              44px
              1fr
              28px;

            min-height: 82px;

            padding:
              11px
              12px;

            border-radius: 14px;
          }

          .cc-op-card-icon {
            width: 42px;
            height: 42px;
          }

          .cc-op-card-icon svg {
            width: 22px;
            height: 22px;
          }

          .cc-op-card-copy h3 {
            font-size: 11.5px;
          }

          .cc-op-card-copy p {
            margin-top: 4px;

            font-size: 9.5px;
          }

          .cc-op-talent {
            grid-template-columns:
              50px
              1fr;

            gap: 11px;

            min-height: 0;

            padding: 13px;

            margin-top: 9px;
          }

          .cc-op-talent-icon {
            width: 47px;
            height: 47px;
          }

          .cc-op-talent > a {
            grid-column:
              1 / -1;

            width: 100%;
            height: 45px;
          }

          .cc-op-light-line {
            width: 85%;
          }
        }

        @media (
          max-width: 390px
        ) {
          .cc-op-card {
            grid-template-columns:
              40px
              1fr
              25px;
          }

          .cc-op-card-index {
            display: none;
          }

          .cc-op-card-copy p {
            display: none;
          }

          .cc-op-card {
            min-height: 68px;
          }
        }

        @media (
          prefers-reduced-motion:
          reduce
        ) {
          .cc-op-shell,
          .cc-op-kicker,
          .cc-op-title-layout h2 > span,
          .cc-op-description p,
          .cc-op-card,
          .cc-op-talent {
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

          .cc-op-shell::before {
            opacity: 1;
          }

          .cc-op-shell-light,
          .cc-op-bg-glow,
          .cc-op-light-line,
          .cc-op-spark {
            animation:
              none !important;
          }
        }
      




/* === CC OPPORTUNITIES CINEMATIC V3 START === */

/*
 * SAFE CINEMATIC REVEAL
 * The approved layout and content remain unchanged.
 */

/*
 * Section opens like a video frame.
 */

@keyframes ccOpSectionOpen {
  0% {
    opacity: .18;

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
      blur(10px)
      brightness(1.08);

    transform:
      translate3d(
        0,
        20px,
        0
      )
      scale(.988);
  }

  45% {
    opacity: 1;

    filter:
      blur(3px)
      brightness(1.04);
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

.cc-op-active
.cc-op-shell {
  animation:
    ccOpSectionOpen
    .90s
    cubic-bezier(.16,1,.3,1)
    forwards !important;
}

/*
 * Bright opening light.
 */

.cc-op-active
.cc-op-shell-light {
  animation:
    ccOpV3SectionLight
    2.1s
    ease
    .28s
    forwards !important;
}

@keyframes ccOpV3SectionLight {
  0% {
    left: -22%;

    opacity: 0;
  }

  16% {
    opacity: .78;
  }

  100% {
    left: 118%;

    opacity: 0;
  }
}

/*
 * Kicker after the section opens.
 */

.cc-op-active
.cc-op-kicker {
  animation:
    ccOpV3Kicker
    .62s
    cubic-bezier(.16,1,.3,1)
    .46s
    forwards !important;
}

@keyframes ccOpV3Kicker {
  from {
    opacity: 0;

    filter: blur(7px);

    transform:
      translate3d(
        -28px,
        0,
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

/*
 * Heading appears line by line.
 */

.cc-op-active
.cc-op-title-layout
h2 > span:first-child {
  animation:
    ccOpV3Title
    .76s
    cubic-bezier(.16,1,.3,1)
    .68s
    forwards !important;
}

.cc-op-active
.cc-op-title-layout
h2 > span:last-child {
  animation:
    ccOpV3Title
    .80s
    cubic-bezier(.16,1,.3,1)
    .88s
    forwards !important;
}

@keyframes ccOpV3Title {
  0% {
    opacity: 0;

    filter:
      blur(9px);

    transform:
      translate3d(
        0,
        40px,
        0
      );
  }

  55% {
    opacity: 1;

    filter:
      blur(2px);
  }

  100% {
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

/*
 * Red heading gets a quick premium shine.
 */

.cc-op-title-layout
h2 em {
  position: relative;

  display: inline-block;

  overflow: hidden;
}

.cc-op-title-layout
h2 em::after {
  position: absolute;

  top: -15%;
  bottom: -15%;
  left: -30%;

  width: 13%;

  content: "";

  opacity: 0;

  pointer-events: none;

  background:
    linear-gradient(
      90deg,
      transparent,
      rgba(
        255,
        255,
        255,
        .9
      ),
      transparent
    );

  filter:
    blur(3px);

  transform:
    skewX(-18deg);
}

.cc-op-active
.cc-op-title-layout
h2 em::after {
  animation:
    ccOpV3TitleShine
    1.35s
    ease
    1.30s
    forwards;
}

@keyframes ccOpV3TitleShine {
  0% {
    left: -30%;

    opacity: 0;
  }

  20% {
    opacity: .75;
  }

  100% {
    left: 120%;

    opacity: 0;
  }
}

/*
 * Description writes line by line.
 */

.cc-op-active
.cc-op-description
p:nth-child(1) {
  animation:
    ccOpV3Write
    .66s
    steps(25,end)
    1.12s
    forwards !important;
}

.cc-op-active
.cc-op-description
p:nth-child(2) {
  animation:
    ccOpV3Write
    .68s
    steps(27,end)
    1.28s
    forwards !important;
}

.cc-op-active
.cc-op-description
p:nth-child(3) {
  animation:
    ccOpV3Write
    .72s
    steps(30,end)
    1.44s
    forwards !important;
}

@keyframes ccOpV3Write {
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
        6px,
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

/*
 * Cards arrive one by one.
 */

.cc-op-active
.cc-op-card {
  animation:
    ccOpV3Card
    .68s
    cubic-bezier(.16,1,.3,1)
    var(--cc-delay)
    forwards !important;
}

@keyframes ccOpV3Card {
  0% {
    opacity: 0;

    filter:
      blur(9px);

    transform:
      perspective(900px)
      translate3d(
        0,
        25px,
        0
      )
      rotateX(6deg)
      scale(.96);
  }

  100% {
    opacity: 1;

    filter:
      blur(0);

    transform:
      perspective(900px)
      translate3d(
        0,
        0,
        0
      )
      rotateX(0)
      scale(1);
  }
}

/*
 * Icon appears after its card.
 */

.cc-op-card-icon {
  transform-origin:
    center;
}

.cc-op-active
.cc-op-card-icon {
  animation:
    ccOpV3Icon
    .50s
    cubic-bezier(.16,1,.3,1)
    calc(
      var(--cc-delay) +
      .10s
    )
    both;
}

@keyframes ccOpV3Icon {
  from {
    opacity: 0;

    filter:
      blur(6px);

    transform:
      scale(.55)
      rotate(-15deg);
  }

  to {
    opacity: 1;

    filter:
      blur(0);

    transform:
      scale(1)
      rotate(0);
  }
}

/*
 * Card number.
 */

.cc-op-active
.cc-op-card-index {
  animation:
    ccOpV3Mini
    .42s
    ease
    calc(
      var(--cc-delay) +
      .08s
    )
    both;
}

@keyframes ccOpV3Mini {
  from {
    opacity: 0;

    transform:
      translateY(-7px);
  }

  to {
    opacity: 1;

    transform:
      translateY(0);
  }
}

/*
 * Card text comes after icon.
 */

.cc-op-active
.cc-op-card-copy {
  animation:
    ccOpV3CardCopy
    .52s
    cubic-bezier(.16,1,.3,1)
    calc(
      var(--cc-delay) +
      .17s
    )
    both;
}

@keyframes ccOpV3CardCopy {
  from {
    opacity: 0;

    filter:
      blur(5px);

    transform:
      translateX(13px);
  }

  to {
    opacity: 1;

    filter:
      blur(0);

    transform:
      translateX(0);
  }
}

/*
 * Arrow appears last inside each card.
 */

.cc-op-active
.cc-op-card-arrow {
  animation:
    ccOpV3Arrow
    .46s
    cubic-bezier(.16,1,.3,1)
    calc(
      var(--cc-delay) +
      .25s
    )
    both;
}

@keyframes ccOpV3Arrow {
  from {
    opacity: 0;

    transform:
      scale(.55)
      rotate(-45deg);
  }

  to {
    opacity: 1;

    transform:
      scale(1)
      rotate(0);
  }
}

/*
 * Small video-like light passes through each card.
 */

.cc-op-active
.cc-op-card-light {
  animation:
    ccOpV3CardLight
    1.0s
    ease
    calc(
      var(--cc-delay) +
      .20s
    )
    forwards;
}

@keyframes ccOpV3CardLight {
  0% {
    left: -25%;

    opacity: 0;
  }

  20% {
    opacity: .75;
  }

  100% {
    left: 120%;

    opacity: 0;
  }
}

/*
 * Talent Network is last.
 */

.cc-op-active
.cc-op-talent {
  animation:
    ccOpV3Talent
    .76s
    cubic-bezier(.16,1,.3,1)
    2.48s
    forwards !important;
}

@keyframes ccOpV3Talent {
  from {
    opacity: 0;

    filter:
      blur(8px);

    transform:
      translate3d(
        0,
        20px,
        0
      )
      scale(.98);
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
      scale(1);
  }
}

.cc-op-active
.cc-op-talent-icon {
  animation:
    ccOpV3TalentIcon
    .50s
    cubic-bezier(.16,1,.3,1)
    2.67s
    both;
}

@keyframes ccOpV3TalentIcon {
  from {
    opacity: 0;

    transform:
      scale(.55);
  }

  to {
    opacity: 1;

    transform:
      scale(1);
  }
}

.cc-op-active
.cc-op-talent-copy {
  animation:
    ccOpV3TalentCopy
    .54s
    cubic-bezier(.16,1,.3,1)
    2.75s
    both;
}

@keyframes ccOpV3TalentCopy {
  from {
    opacity: 0;

    filter:
      blur(5px);

    transform:
      translateX(14px);
  }

  to {
    opacity: 1;

    filter:
      blur(0);

    transform:
      translateX(0);
  }
}

.cc-op-active
.cc-op-talent > a {
  animation:
    ccOpV3Join
    .54s
    cubic-bezier(.16,1,.3,1)
    2.88s
    both;
}

@keyframes ccOpV3Join {
  from {
    opacity: 0;

    transform:
      translateX(17px)
      scale(.92);
  }

  to {
    opacity: 1;

    transform:
      translateX(0)
      scale(1);
  }
}

/*
 * Smooth moving background remains subtle.
 */

.cc-op-bg-glow,
.cc-op-light-line,
.cc-op-spark {
  will-change:
    transform,
    opacity;
}

/*
 * Phone animation is lighter and faster.
 */

@media (max-width: 650px) {
  .cc-op-active
  .cc-op-shell {
    animation-duration:
      .76s !important;
  }

  .cc-op-active
  .cc-op-card {
    animation-duration:
      .56s !important;
  }

  .cc-op-active
  .cc-op-talent {
    animation-duration:
      .62s !important;
  }
}

/*
 * Accessibility fallback.
 */

@media (
  prefers-reduced-motion:
  reduce
) {
  .cc-op-shell,
  .cc-op-kicker,
  .cc-op-title-layout h2 > span,
  .cc-op-description p,
  .cc-op-card,
  .cc-op-card-index,
  .cc-op-card-icon,
  .cc-op-card-copy,
  .cc-op-card-arrow,
  .cc-op-talent,
  .cc-op-talent-icon,
  .cc-op-talent-copy,
  .cc-op-talent > a {
    opacity: 1 !important;

    filter: none !important;

    clip-path:
      none !important;

    transform:
      none !important;

    animation:
      none !important;
  }
}

/* === CC OPPORTUNITIES CINEMATIC V3 END === */
`}</style>
    </section>
  );
}