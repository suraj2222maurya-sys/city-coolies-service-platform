"use client";

import {
  useEffect,
  useRef,
} from "react";

import type {
  CSSProperties,
} from "react";

const articles = [
  {
    category: "Property Care",
    title:
      "Smarter Property Maintenance Starts With the Right Routine",
    description:
      "Practical guidance for spotting common property issues early and planning maintenance with more confidence.",
    readTime: "5 min read",
    icon: "property",
  },
  {
    category: "Cleaning & Maintenance",
    title:
      "A Better Way to Think About Regular Property Cleaning",
    description:
      "Understand how planned cleaning supports presentation, upkeep and better long-term property care.",
    readTime: "4 min read",
    icon: "cleaning",
  },
  {
    category: "Renovation Planning",
    title:
      "Plan Property Improvements Before the Work Begins",
    description:
      "Useful considerations for renovation scope, priorities and smarter decisions before site execution starts.",
    readTime: "6 min read",
    icon: "renovation",
  },
] as const;

type ArticleIcon =
  (typeof articles)[number]["icon"];

function OriginalArticleIcon({
  type,
}: {
  type: ArticleIcon;
}) {
  if (type === "property") {
    return (
      <svg
        viewBox="0 0 64 64"
        aria-hidden="true"
      >
        <path
          d="M12 31 32 14l20 17"
          fill="none"
          stroke="currentColor"
          strokeWidth="3.4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        <path
          d="M17 28v24h30V28"
          fill="none"
          stroke="currentColor"
          strokeWidth="3.4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        <path
          d="M27 52V38h10v14"
          fill="none"
          stroke="currentColor"
          strokeWidth="3.4"
          strokeLinecap="round"
        />

        <circle
          cx="45"
          cy="18"
          r="5"
          fill="currentColor"
          opacity=".14"
        />

        <path
          d="M42.5 18h5M45 15.5v5"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        />
      </svg>
    );
  }

  if (type === "cleaning") {
    return (
      <svg
        viewBox="0 0 64 64"
        aria-hidden="true"
      >
        <path
          d="M28 12h9l2 8H26l2-8Z"
          fill="none"
          stroke="currentColor"
          strokeWidth="3.3"
          strokeLinejoin="round"
        />

        <path
          d="M25 20h15l6 31H19l6-31Z"
          fill="none"
          stroke="currentColor"
          strokeWidth="3.3"
          strokeLinejoin="round"
        />

        <path
          d="M15 15v9M10.5 19.5h9"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.7"
          strokeLinecap="round"
        />

        <path
          d="M48 10v7M44.5 13.5h7"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.7"
          strokeLinecap="round"
        />

        <circle
          cx="51"
          cy="28"
          r="3"
          fill="currentColor"
          opacity=".17"
        />
      </svg>
    );
  }

  return (
    <svg
      viewBox="0 0 64 64"
      aria-hidden="true"
    >
      <path
        d="m18 47 29-29"
        fill="none"
        stroke="currentColor"
        strokeWidth="4"
        strokeLinecap="round"
      />

      <path
        d="m42 14 8 8"
        fill="none"
        stroke="currentColor"
        strokeWidth="4"
        strokeLinecap="round"
      />

      <path
        d="m19 34-7 7 11 11 7-7"
        fill="none"
        stroke="currentColor"
        strokeWidth="3.4"
        strokeLinejoin="round"
      />

      <path
        d="m27 24 13 13"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.7"
        strokeLinecap="round"
      />

      <circle
        cx="49"
        cy="43"
        r="6"
        fill="currentColor"
        opacity=".13"
      />

      <path
        d="M46 43h6M49 40v6"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

function BlogKnowledgeIcon() {
  return (
    <div
      className="cc-ba-knowledge-icon"
      aria-hidden="true"
    >
      <div className="cc-ba-knowledge-circle">
        <svg
          viewBox="0 0 120 120"
        >
          <path
            d="M27 35c12-5 23-3 33 5v52c-10-8-21-10-33-5V35Z"
            fill="none"
            stroke="currentColor"
            strokeWidth="4"
            strokeLinejoin="round"
          />

          <path
            d="M93 35c-12-5-23-3-33 5v52c10-8 21-10 33-5V35Z"
            fill="none"
            stroke="currentColor"
            strokeWidth="4"
            strokeLinejoin="round"
          />

          <path
            d="M38 51h12M38 61h12M70 51h12M70 61h12"
            fill="none"
            stroke="currentColor"
            strokeWidth="3"
            strokeLinecap="round"
          />

          <circle
            cx="88"
            cy="27"
            r="11"
            fill="white"
            stroke="currentColor"
            strokeWidth="4"
          />

          <path
            d="m96 35 10 10"
            fill="none"
            stroke="currentColor"
            strokeWidth="4"
            strokeLinecap="round"
          />

          <path
            d="M21 23v10M16 28h10"
            fill="none"
            stroke="currentColor"
            strokeWidth="3"
            strokeLinecap="round"
          />
        </svg>
      </div>

      <span className="cc-ba-knowledge-label">
        PROPERTY
        <b>INSIGHTS</b>
      </span>
    </div>
  );
}

export default function BlogArticlesSection() {
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
        "cc-ba-active",
      );

      return;
    }

    section.classList.add(
      "cc-ba-motion",
    );

    const activate = () => {
      section.classList.add(
        "cc-ba-active",
      );
    };

    const observer =
      new IntersectionObserver(
        ([entry]) => {
          if (
            entry?.isIntersecting
          ) {
            activate();
            observer.disconnect();
          }
        },
        {
          threshold: 0,
          rootMargin:
            "280px 0px 180px 0px",
        },
      );

    observer.observe(section);

    const rect =
      section.getBoundingClientRect();

    if (
      rect.top <
        window.innerHeight + 300 &&
      rect.bottom > -200
    ) {
      requestAnimationFrame(
        activate,
      );
    }

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="blog-articles"
      className="cc-ba"
      aria-labelledby="blog-articles-heading"
    >
      <div
        className="cc-ba-bg"
        aria-hidden="true"
      >
        <span className="cc-ba-bg-glow cc-ba-bg-glow-one" />
        <span className="cc-ba-bg-glow cc-ba-bg-glow-two" />

        <span className="cc-ba-bg-line cc-ba-bg-line-one" />
        <span className="cc-ba-bg-line cc-ba-bg-line-two" />
      </div>

      <div className="cc-ba-shell">
        <span
          className="cc-ba-opening-scan"
          aria-hidden="true"
        />

        <div className="cc-ba-top">
          <div className="cc-ba-copy">
            <div className="cc-ba-kicker">
              <i />
              <span />

              <strong>
                City Coolies Insights
              </strong>
            </div>

            <h2 id="blog-articles-heading">
              <span>
                Knowledge for better
              </span>

              <span>
                property{" "}
                <em>
                  decisions.
                </em>
              </span>
            </h2>

            <p>
              Practical guidance on property care,
              maintenance, cleaning and renovation to
              help owners make clearer and more
              informed service decisions.
            </p>

            <div className="cc-ba-topics">
              <span>
                Property Care
              </span>

              <i />

              <span>
                Maintenance
              </span>

              <i />

              <span>
                Cleaning
              </span>

              <i />

              <span>
                Renovation
              </span>
            </div>
          </div>

          <BlogKnowledgeIcon />
        </div>

        <div className="cc-ba-grid">
          {articles.map(
            (
              article,
              index,
            ) => (
              <article
                key={
                  article.title
                }
                className="cc-ba-card"
                style={
                  {
                    "--cc-delay":
                      `${
                        1.22 +
                        index * 0.17
                      }s`,
                  } as CSSProperties
                }
              >
                <div className="cc-ba-card-top">
                  <div className="cc-ba-original-icon">
                    <OriginalArticleIcon
                      type={
                        article.icon
                      }
                    />
                  </div>

                  <span className="cc-ba-number">
                    0{index + 1}
                  </span>
                </div>

                <div className="cc-ba-card-content">
                  <span className="cc-ba-category">
                    {article.category}
                  </span>

                  <h3>
                    {article.title}
                  </h3>

                  <p>
                    {article.description}
                  </p>
                </div>

                <div className="cc-ba-card-bottom">
                  <span>
                    {article.readTime}
                  </span>

                  <a
                    href={[
                      "/blog/smarter-property-maintenance-routine",
                      "/blog/regular-property-cleaning",
                      "/blog/renovation-planning-before-work",
                    ][index]}
                    aria-label={`Read ${article.title}`}
                  >
                    Read Article

                    <i>
                      →
                    </i>
                  </a>
                </div>
              </article>
            ),
          )}
        </div>

        <div className="cc-ba-bottom">
          <div className="cc-ba-bottom-copy">
            <span>
              City Coolies Knowledge Hub
            </span>

            <strong>
              Practical property knowledge for better decisions.
            </strong>
          </div>

          <div
            className="cc-ba-knowledge-stream"
            aria-label="City Coolies property knowledge topics"
          >
            <span>
              Property Care
            </span>

            <i />

            <span>
              Cleaning
            </span>

            <i />

            <span>
              Renovation
            </span>

            <i />

            <span>
              Maintenance
            </span>

            <b aria-hidden="true" />
          </div>
        </div>
      </div>

      <style>{`
        .cc-ba {
          --red: #f22030;
          --red-dark: #dc071b;
          --pink: #ff93a5;
          --pink-soft: #fff0f3;
          --ink: #20242b;
          --muted: #626976;

          position: relative;
          isolation: isolate;

          width: 100%;

          padding: 18px;

          overflow: hidden;

          color:
            var(--ink);

          background:
            linear-gradient(
              180deg,
              #fffafb,
              #fff0f3
            );

          scroll-margin-top:
            110px;
        }

        /*
         * LIGHT BACKGROUND ONLY
         */

        .cc-ba-bg {
          position: absolute;
          inset: 0;
          z-index: -3;

          overflow: hidden;

          pointer-events: none;
        }

        .cc-ba-bg-glow {
          position: absolute;

          border-radius: 50%;

          filter: blur(10px);
        }

        .cc-ba-bg-glow-one {
          top: -170px;
          right: -80px;

          width: 450px;
          height: 450px;

          background:
            radial-gradient(
              circle,
              rgba(
                255,
                144,
                165,
                .23
              ),
              transparent 70%
            );
        }

        .cc-ba-bg-glow-two {
          bottom: -230px;
          left: -130px;

          width: 420px;
          height: 420px;

          background:
            radial-gradient(
              circle,
              rgba(
                242,
                32,
                48,
                .08
              ),
              transparent 70%
            );
        }

        .cc-ba-bg-line {
          position: absolute;

          height: 1px;

          background:
            linear-gradient(
              90deg,
              transparent,
              white,
              rgba(
                242,
                32,
                48,
                .20
              ),
              transparent
            );
        }

        .cc-ba-bg-line-one {
          top: 31%;
          right: -5%;

          width: 46%;

          transform:
            rotate(-6deg);
        }

        .cc-ba-bg-line-two {
          right: 2%;
          bottom: 13%;

          width: 43%;

          opacity: .55;

          transform:
            rotate(-3deg);
        }

        /*
         * SECTION
         */

        .cc-ba-shell {
          position: relative;

          width:
            min(
              100%,
              1540px
            );

          margin: auto;

          padding:
            39px
            clamp(
              28px,
              3.6vw,
              52px
            )
            27px;

          overflow: hidden;

          border:
            1px solid
            rgba(
              242,
              32,
              48,
              .10
            );

          border-radius: 27px;

          background:
            radial-gradient(
              circle at 85% 15%,
              rgba(
                255,
                154,
                173,
                .14
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
                .95
              ),
              rgba(
                255,
                249,
                250,
                .91
              )
              51%,
              rgba(
                255,
                237,
                242,
                .86
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
              .98
            ),
            0
            18px
            55px
            rgba(
              112,
              7,
              21,
              .055
            );
        }

        .cc-ba-shell::before {
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
              .84
            );

          border-radius: 20px;
        }

        /*
         * SECTION VIDEO OPEN
         */

        .cc-ba-motion
        .cc-ba-shell {
          opacity: .12;

          clip-path:
            inset(
              45%
              0
              45%
              0
              round
              27px
            );

          filter:
            blur(9px);

          transform:
            translateY(18px)
            scale(.99);
        }

        .cc-ba-motion.cc-ba-active
        .cc-ba-shell {
          animation:
            ccBaOpen
            .85s
            cubic-bezier(.16,1,.3,1)
            forwards;
        }

        .cc-ba-opening-scan {
          position: absolute;

          top: -65%;
          left: -24%;

          z-index: 20;

          width: 8%;
          height: 230%;

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
                .98
              ),
              transparent
            );

          filter: blur(8px);

          transform:
            rotate(20deg);
        }

        .cc-ba-active
        .cc-ba-opening-scan {
          animation:
            ccBaScan
            2.1s
            ease
            .20s
            forwards;
        }

        /*
         * TOP
         */

        .cc-ba-top {
          position: relative;
          z-index: 2;

          display: grid;

          grid-template-columns:
            minmax(
              0,
              1fr
            )
            235px;

          align-items: center;

          gap: 35px;
        }

        .cc-ba-kicker {
          display: flex;
          align-items: center;

          gap: 8px;

          color:
            var(--red);
        }

        .cc-ba-kicker i {
          width: 7px;
          height: 7px;

          border-radius: 50%;

          background:
            var(--red);

          box-shadow:
            0
            0
            12px
            rgba(
              242,
              32,
              48,
              .6
            );
        }

        .cc-ba-kicker > span {
          width: 39px;
          height: 2px;

          background:
            linear-gradient(
              90deg,
              var(--red),
              rgba(
                242,
                32,
                48,
                .12
              )
            );
        }

        .cc-ba-kicker strong {
          margin-left: 4px;

          font-size: 9px;
          font-weight: 900;

          letter-spacing:
            .20em;

          text-transform:
            uppercase;
        }

        .cc-ba-motion
        .cc-ba-kicker {
          opacity: 0;

          filter: blur(6px);

          transform:
            translateX(-25px);
        }

        .cc-ba-active
        .cc-ba-kicker {
          animation:
            ccBaKicker
            .58s
            cubic-bezier(.16,1,.3,1)
            .42s
            forwards;
        }

        .cc-ba-copy h2 {
          margin:
            16px
            0
            0;

          max-width: 830px;

          font-size:
            clamp(
              41px,
              4.15vw,
              62px
            );

          font-weight: 760;

          line-height: .97;

          letter-spacing:
            -.052em;
        }

        .cc-ba-copy h2 > span {
          display: block;
        }

        .cc-ba-copy h2 em {
          color:
            var(--red);

          font-style: normal;
        }

        .cc-ba-motion
        .cc-ba-copy h2 > span {
          opacity: 0;

          filter: blur(8px);

          transform:
            translateY(36px);
        }

        .cc-ba-active
        .cc-ba-copy h2
        > span:first-child {
          animation:
            ccBaTitle
            .70s
            cubic-bezier(.16,1,.3,1)
            .61s
            forwards;
        }

        .cc-ba-active
        .cc-ba-copy h2
        > span:last-child {
          animation:
            ccBaTitle
            .72s
            cubic-bezier(.16,1,.3,1)
            .79s
            forwards;
        }

        .cc-ba-copy > p {
          max-width: 700px;

          margin:
            15px
            0
            0;

          color:
            var(--muted);

          font-size:
            clamp(
              12px,
              .96vw,
              14px
            );

          line-height: 1.60;
        }

        .cc-ba-motion
        .cc-ba-copy > p {
          opacity: 0;

          filter: blur(4px);

          transform:
            translateY(8px);
        }

        .cc-ba-active
        .cc-ba-copy > p {
          animation:
            ccBaText
            .65s
            ease
            .98s
            forwards;
        }

        .cc-ba-topics {
          display: flex;
          flex-wrap: wrap;
          align-items: center;

          gap: 8px;

          margin-top: 13px;

          color:
            var(--red);

          font-size: 7.5px;
          font-weight: 900;

          letter-spacing:
            .12em;

          text-transform:
            uppercase;
        }

        .cc-ba-topics i {
          width: 4px;
          height: 4px;

          border-radius: 50%;

          background:
            rgba(
              242,
              32,
              48,
              .42
            );
        }

        .cc-ba-motion
        .cc-ba-topics {
          opacity: 0;
        }

        .cc-ba-active
        .cc-ba-topics {
          animation:
            ccBaFade
            .5s
            ease
            1.12s
            forwards;
        }

        /*
         * NEW ORIGINAL STATIC KNOWLEDGE ICON
         */

        .cc-ba-knowledge-icon {
          display: grid;

          justify-items: center;

          gap: 8px;

          width: 220px;

          justify-self: end;
        }

        .cc-ba-motion
        .cc-ba-knowledge-icon {
          opacity: 0;

          filter: blur(8px);

          transform:
            translateX(20px)
            scale(.92);
        }

        .cc-ba-active
        .cc-ba-knowledge-icon {
          animation:
            ccBaKnowledgeReveal
            .70s
            cubic-bezier(.16,1,.3,1)
            .86s
            forwards;
        }

        .cc-ba-knowledge-circle {
          display: grid;

          width: 146px;
          height: 146px;

          place-items: center;

          border:
            1px solid
            rgba(
              242,
              32,
              48,
              .14
            );

          border-radius: 38px;

          color:
            var(--red);

          background:
            radial-gradient(
              circle at 35% 28%,
              #ffffff,
              #fff1f4
              64%,
              #ffe4e9
            );

          box-shadow:
            inset
            0
            0
            24px
            white,
            0
            16px
            35px
            rgba(
              186,
              7,
              27,
              .09
            );
        }

        .cc-ba-knowledge-circle svg {
          width: 91px;
          height: 91px;
        }

        .cc-ba-knowledge-label {
          color:
            #666b76;

          font-size: 8px;
          font-weight: 800;

          letter-spacing:
            .14em;

          text-align: center;

          text-transform:
            uppercase;
        }

        .cc-ba-knowledge-label b {
          margin-left: 5px;

          color:
            var(--red);
        }

        /*
         * CARDS
         */

        .cc-ba-grid {
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

          margin-top: 23px;
        }

        .cc-ba-card {
          display: flex;
          flex-direction: column;

          min-height: 225px;

          padding: 17px;

          border:
            1px solid
            rgba(
              242,
              32,
              48,
              .11
            );

          border-radius: 18px;

          background:
            linear-gradient(
              145deg,
              rgba(
                255,
                255,
                255,
                .94
              ),
              rgba(
                255,
                244,
                247,
                .74
              )
            );

          box-shadow:
            inset
            0
            1px
            0
            white,
            0
            12px
            28px
            rgba(
              111,
              7,
              21,
              .045
            );

          transition:
            transform .28s ease,
            box-shadow .28s ease,
            border-color .28s ease;
        }

        .cc-ba-motion
        .cc-ba-card {
          opacity: 0;

          filter: blur(8px);

          transform:
            translateY(24px)
            scale(.97);
        }

        .cc-ba-active
        .cc-ba-card {
          animation:
            ccBaCardReveal
            .66s
            cubic-bezier(.16,1,.3,1)
            var(--cc-delay)
            forwards;
        }

        .cc-ba-card:hover {
          border-color:
            rgba(
              242,
              32,
              48,
              .26
            );

          box-shadow:
            0
            18px
            36px
            rgba(
              203,
              7,
              28,
              .09
            );

          transform:
            translateY(-4px);
        }

        .cc-ba-card-top {
          display: flex;
          align-items: flex-start;

          justify-content:
            space-between;

          gap: 12px;
        }

        /*
         * ORIGINAL STATIC ICONS
         */

        .cc-ba-original-icon {
          display: grid;

          width: 55px;
          height: 55px;

          place-items: center;

          border:
            1px solid
            rgba(
              242,
              32,
              48,
              .14
            );

          border-radius: 17px;

          color:
            var(--red);

          background:
            radial-gradient(
              circle at 35% 25%,
              white,
              #fff0f3
            );

          box-shadow:
            inset
            0
            0
            15px
            white,
            0
            9px
            21px
            rgba(
              206,
              7,
              28,
              .07
            );
        }

        .cc-ba-original-icon svg {
          width: 34px;
          height: 34px;
        }

        .cc-ba-number {
          color:
            rgba(
              242,
              32,
              48,
              .22
            );

          font-size: 18px;
          font-weight: 900;
        }

        .cc-ba-card-content {
          margin-top: 15px;
        }

        .cc-ba-category {
          color:
            var(--red);

          font-size: 8px;
          font-weight: 900;

          letter-spacing:
            .13em;

          text-transform:
            uppercase;
        }

        .cc-ba-card-content h3 {
          margin:
            7px
            0
            0;

          font-size:
            clamp(
              18px,
              1.36vw,
              23px
            );

          font-weight: 810;

          line-height: 1.14;

          letter-spacing:
            -.024em;
        }

        .cc-ba-card-content p {
          margin:
            8px
            0
            0;

          color:
            var(--muted);

          font-size: 10.5px;

          line-height: 1.5;
        }

        /*
         * PROPER BOTTOM ARTICLE BUTTON
         */

        .cc-ba-card-bottom {
          display: flex;
          align-items: center;
          justify-content:
            space-between;

          gap: 12px;

          margin-top: auto;

          padding-top: 15px;
        }

        .cc-ba-card-bottom
        > span {
          color:
            #858a94;

          font-size: 8px;
          font-weight: 800;

          text-transform:
            uppercase;
        }

        .cc-ba-card-bottom a {
          display: inline-flex;
          align-items: center;
          justify-content: center;

          gap: 11px;

          min-width: 116px;
          height: 38px;

          padding:
            0
            13px;

          border-radius: 999px;

          color: white;

          font-size: 9px;
          font-weight: 850;

          text-decoration: none;

          background:
            linear-gradient(
              100deg,
              #ff2c40,
              #dc071b
            );

          box-shadow:
            0
            10px
            22px
            rgba(
              220,
              7,
              27,
              .18
            );

          transition:
            transform .25s ease,
            box-shadow .25s ease;
        }

        .cc-ba-card-bottom a:hover {
          transform:
            translateY(-2px);

          box-shadow:
            0
            15px
            28px
            rgba(
              220,
              7,
              27,
              .26
            );
        }

        .cc-ba-card-bottom a i {
          font-size: 13px;
          font-style: normal;
        }

        /*
         * BOTTOM BAR
         */

        .cc-ba-bottom {
          display: flex;
          align-items: center;
          justify-content:
            space-between;

          gap: 20px;

          margin-top: 12px;

          padding:
            12px
            4px
            0;

          border-top:
            1px solid
            rgba(
              242,
              32,
              48,
              .08
            );
        }

        .cc-ba-motion
        .cc-ba-bottom {
          opacity: 0;

          filter: blur(4px);

          transform:
            translateY(10px);
        }

        .cc-ba-active
        .cc-ba-bottom {
          animation:
            ccBaBottom
            .55s
            ease
            1.83s
            forwards;
        }

        .cc-ba-bottom
        > div span {
          display: block;

          color:
            var(--red);

          font-size: 7.5px;
          font-weight: 900;

          letter-spacing:
            .13em;

          text-transform:
            uppercase;
        }

        .cc-ba-bottom
        > div strong {
          display: block;

          margin-top: 3px;

          font-size: 10.5px;
        }

        .cc-ba-bottom > a {
          display: inline-flex;
          align-items: center;

          gap: 15px;

          min-height: 40px;

          padding:
            0
            17px;

          border:
            1px solid
            rgba(
              242,
              32,
              48,
              .13
            );

          border-radius: 999px;

          color:
            var(--red);

          font-size: 9px;
          font-weight: 850;

          text-decoration: none;

          background:
            rgba(
              255,
              255,
              255,
              .78
            );
        }

        .cc-ba-bottom > a i {
          font-size: 14px;
          font-style: normal;
        }

        /*
         * ENTRY KEYFRAMES ONLY
         */

        @keyframes ccBaOpen {
          to {
            opacity: 1;

            clip-path:
              inset(
                0
                0
                0
                0
                round
                27px
              );

            filter: blur(0);

            transform:
              translateY(0)
              scale(1);
          }
        }

        @keyframes ccBaScan {
          0% {
            left: -24%;

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

        @keyframes ccBaKicker {
          to {
            opacity: 1;

            filter: blur(0);

            transform:
              translateX(0);
          }
        }

        @keyframes ccBaTitle {
          to {
            opacity: 1;

            filter: blur(0);

            transform:
              translateY(0);
          }
        }

        @keyframes ccBaText {
          to {
            opacity: 1;

            filter: blur(0);

            transform:
              translateY(0);
          }
        }

        @keyframes ccBaFade {
          to {
            opacity: 1;
          }
        }

        @keyframes ccBaKnowledgeReveal {
          to {
            opacity: 1;

            filter: blur(0);

            transform:
              translateX(0)
              scale(1);
          }
        }

        @keyframes ccBaCardReveal {
          to {
            opacity: 1;

            filter: blur(0);

            transform:
              translateY(0)
              scale(1);
          }
        }

        @keyframes ccBaBottom {
          to {
            opacity: 1;

            filter: blur(0);

            transform:
              translateY(0);
          }
        }

        /*
         * TABLET
         */

        @media (
          max-width: 900px
        ) {
          .cc-ba-top {
            grid-template-columns:
              1fr
              190px;
          }

          .cc-ba-knowledge-icon {
            width: 185px;
          }

          .cc-ba-knowledge-circle {
            width: 125px;
            height: 125px;
          }

          .cc-ba-grid {
            grid-template-columns:
              repeat(
                2,
                minmax(
                  0,
                  1fr
                )
              );
          }

          .cc-ba-card:last-child {
            grid-column:
              1 / -1;

            min-height: 185px;
          }
        }

        /*
         * PHONE
         */

        @media (
          max-width: 650px
        ) {
          .cc-ba {
            padding: 10px;
          }

          .cc-ba-shell {
            padding:
              30px
              14px
              20px;

            border-radius: 22px;
          }

          .cc-ba-shell::before {
            inset: 6px;

            border-radius: 16px;
          }

          .cc-ba-top {
            grid-template-columns:
              1fr;

            gap: 12px;
          }

          .cc-ba-kicker strong {
            font-size: 7.5px;

            letter-spacing:
              .16em;
          }

          .cc-ba-kicker > span {
            width: 27px;
          }

          .cc-ba-copy h2 {
            margin-top: 14px;

            font-size:
              clamp(
                35px,
                10.3vw,
                48px
              );
          }

          .cc-ba-copy > p {
            margin-top: 12px;

            font-size: 11.5px;
          }

          .cc-ba-topics {
            font-size: 6.7px;
          }

          /*
           * Static phone icon.
           */

          .cc-ba-knowledge-icon {
            display: flex;

            align-items: center;

            gap: 12px;

            width: auto;

            justify-self: start;

            margin-top: 3px;
          }

          .cc-ba-knowledge-circle {
            width: 68px;
            height: 68px;

            border-radius: 18px;
          }

          .cc-ba-knowledge-circle svg {
            width: 44px;
            height: 44px;
          }

          .cc-ba-knowledge-label {
            text-align: left;
          }

          .cc-ba-grid {
            grid-template-columns:
              1fr;

            gap: 8px;

            margin-top: 17px;
          }

          .cc-ba-card {
            min-height: 181px;

            padding: 14px;

            border-radius: 15px;
          }

          .cc-ba-original-icon {
            width: 48px;
            height: 48px;

            border-radius: 14px;
          }

          .cc-ba-original-icon svg {
            width: 29px;
            height: 29px;
          }

          .cc-ba-card-content {
            margin-top: 11px;
          }

          .cc-ba-card-content h3 {
            font-size: 17px;
          }

          .cc-ba-card-content p {
            font-size: 9.8px;
          }

          .cc-ba-card-bottom {
            padding-top: 12px;
          }

          .cc-ba-card-bottom a {
            min-width: 109px;
            height: 36px;
          }

          .cc-ba-bottom {
            align-items:
              flex-start;

            flex-direction: column;

            gap: 10px;
          }

          .cc-ba-bottom > a {
            width: 100%;

            justify-content:
              space-between;
          }
        }

        @media (
          max-width: 390px
        ) {
          .cc-ba-card-content p {
            display: none;
          }

          .cc-ba-card {
            min-height: 157px;
          }
        }

        @media (
          prefers-reduced-motion:
          reduce
        ) {
          .cc-ba-shell,
          .cc-ba-kicker,
          .cc-ba-copy h2 > span,
          .cc-ba-copy > p,
          .cc-ba-topics,
          .cc-ba-knowledge-icon,
          .cc-ba-card,
          .cc-ba-bottom {
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

          .cc-ba-opening-scan {
            display: none;
          }
        }
      

/* === CC BLOG KNOWLEDGE STREAM START === */

.cc-ba-bottom {
  position: relative;

  overflow: hidden;

  min-height: 62px;

  padding:
    13px
    4px
    0;
}

.cc-ba-bottom-copy {
  position: relative;
  z-index: 2;
}

.cc-ba-knowledge-stream {
  position: relative;
  z-index: 2;

  display: flex;
  align-items: center;
  justify-content: flex-end;

  gap: 10px;

  min-height: 43px;

  padding:
    0
    18px;

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
    linear-gradient(
      100deg,
      rgba(
        255,
        255,
        255,
        .82
      ),
      rgba(
        255,
        239,
        243,
        .67
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
      .95
    ),
    0
    9px
    23px
    rgba(
      135,
      7,
      23,
      .045
    );
}

.cc-ba-knowledge-stream span {
  position: relative;
  z-index: 2;

  color:
    #5d626d;

  font-size: 8px;
  font-weight: 850;

  letter-spacing:
    .10em;

  white-space: nowrap;

  text-transform:
    uppercase;

  transition:
    color
    .25s ease;
}

.cc-ba-knowledge-stream i {
  position: relative;
  z-index: 2;

  width: 4px;
  height: 4px;

  flex:
    0
    0
    auto;

  border-radius: 50%;

  background:
    #f22030;

  box-shadow:
    0
    0
    8px
    rgba(
      242,
      32,
      48,
      .36
    );
}

.cc-ba-knowledge-stream b {
  position: absolute;

  top: -80%;
  left: -20%;

  z-index: 1;

  width: 8%;
  height: 260%;

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
        157,
        174,
        .46
      ),
      transparent
    );

  filter:
    blur(6px);

  transform:
    rotate(20deg);

  animation:
    ccBaKnowledgeStreamLight
    4.8s
    ease-in-out
    infinite;
}

.cc-ba-knowledge-stream::before {
  position: absolute;

  right: 10%;
  bottom: -24px;

  width: 120px;
  height: 38px;

  content: "";

  pointer-events: none;

  border-radius: 50%;

  background:
    radial-gradient(
      ellipse,
      rgba(
        242,
        32,
        48,
        .19
      ),
      transparent
      72%
    );

  filter:
    blur(8px);

  animation:
    ccBaKnowledgePulse
    2.5s
    ease-in-out
    infinite
    alternate;
}

.cc-ba-knowledge-stream:hover span {
  color:
    #f22030;
}

@keyframes ccBaKnowledgeStreamLight {
  0% {
    left: -20%;

    opacity: 0;
  }

  15% {
    opacity: .85;
  }

  55%,
  100% {
    left: 118%;

    opacity: 0;
  }
}

@keyframes ccBaKnowledgePulse {
  to {
    opacity: .45;

    transform:
      scaleX(1.25);
  }
}

@media (
  max-width: 760px
) {
  .cc-ba-bottom {
    align-items:
      flex-start;

    flex-direction:
      column;

    gap: 11px;
  }

  .cc-ba-knowledge-stream {
    width: 100%;

    justify-content:
      center;

    flex-wrap: wrap;

    gap:
      7px
      9px;

    min-height: 48px;

    padding:
      10px
      13px;

    border-radius:
      16px;
  }

  .cc-ba-knowledge-stream span {
    font-size: 7px;
  }
}

@media (
  prefers-reduced-motion:
  reduce
) {
  .cc-ba-knowledge-stream b,
  .cc-ba-knowledge-stream::before {
    animation:
      none !important;
  }
}

/* === CC BLOG KNOWLEDGE STREAM END === */
`}</style>
    </section>
  );
}