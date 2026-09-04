"use client";

import {
  useEffect,
  useRef,
} from "react";

import Link from "next/link";

export type ArticleSection = {
  eyebrow: string;
  heading: string;
  paragraphs: string[];
  bullets?: string[];
  highlight?: string;
};

export type ArticleData = {
  slug: string;
  category: string;
  title: string;
  description: string;
  intro: string;
  readTime: string;
  serviceHref: string;
  serviceLabel: string;
  keywords: string[];
  sections: ArticleSection[];
};

const titleAccents: Record<
  string,
  string
> = {
  "smarter-property-maintenance-routine":
    "the Right Routine",

  "regular-property-cleaning":
    "Regular Property Cleaning",

  "renovation-planning-before-work":
    "the Work Begins",
};

function EditorialTitle({
  article,
}: {
  article: ArticleData;
}) {
  const accent =
    titleAccents[
      article.slug
    ];

  if (
    !accent ||
    !article.title.includes(
      accent,
    )
  ) {
    return (
      <h1>
        <span>
          {article.title}
        </span>
      </h1>
    );
  }

  const base =
    article.title
      .replace(
        accent,
        "",
      )
      .trim();

  return (
    <h1>
      <span>
        {base}
      </span>

      <em>
        {accent}
      </em>
    </h1>
  );
}

export default function ArticleReader({
  article,
}: {
  article: ArticleData;
}) {
  const rootRef =
    useRef<HTMLElement | null>(
      null,
    );

  useEffect(() => {
    const root =
      rootRef.current;

    if (!root) {
      return;
    }

    const reducedMotion =
      window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;

    if (reducedMotion) {
      root.classList.add(
        "cc-ar-ready",
      );

      root
        .querySelectorAll<HTMLElement>(
          "[data-reveal]",
        )
        .forEach(
          (
            element,
          ) => {
            element.classList.add(
              "cc-ar-visible",
            );
          },
        );

      return;
    }

    root.classList.add(
      "cc-ar-motion",
    );

    requestAnimationFrame(
      () => {
        requestAnimationFrame(
          () => {
            root.classList.add(
              "cc-ar-ready",
            );
          },
        );
      },
    );

    const elements =
      Array.from(
        root.querySelectorAll<HTMLElement>(
          "[data-reveal]",
        ),
      );

    elements.forEach(
      (
        element,
        index,
      ) => {
        element.style.setProperty(
          "--cc-delay",
          `${Math.min(
            index % 5,
            4,
          ) * 0.055}s`,
        );
      },
    );

    const observer =
      new IntersectionObserver(
        (
          entries,
        ) => {
          entries.forEach(
            (
              entry,
            ) => {
              if (
                entry.isIntersecting
              ) {
                (
                  entry.target as
                    HTMLElement
                ).classList.add(
                  "cc-ar-visible",
                );

                observer.unobserve(
                  entry.target,
                );
              }
            },
          );
        },
        {
          threshold: 0.08,
          rootMargin:
            "0px 0px -5% 0px",
        },
      );

    elements.forEach(
      (
        element,
      ) => {
        observer.observe(
          element,
        );
      },
    );

    let frame = 0;

    const updateProgress =
      () => {
        frame = 0;

        const rect =
          root.getBoundingClientRect();

        const start =
          window.scrollY +
          rect.top;

        const total =
          Math.max(
            root.offsetHeight -
            window.innerHeight,
            1,
          );

        const progress =
          Math.max(
            0,
            Math.min(
              1,
              (
                window.scrollY -
                start
              ) /
                total,
            ),
          );

        root.style.setProperty(
          "--reading-progress",
          progress.toFixed(
            4,
          ),
        );
      };

    const handleScroll =
      () => {
        if (!frame) {
          frame =
            requestAnimationFrame(
              updateProgress,
            );
        }
      };

    updateProgress();

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

    return () => {
      observer.disconnect();

      if (frame) {
        cancelAnimationFrame(
          frame,
        );
      }

      window.removeEventListener(
        "scroll",
        handleScroll,
      );

      window.removeEventListener(
        "resize",
        handleScroll,
      );
    };
  }, []);

  return (
    <article
      ref={rootRef}
      className="cc-ar"
    >
      <div
        className="cc-ar-progress"
        aria-hidden="true"
      >
        <span />
      </div>

      <div
        className="cc-ar-background"
        aria-hidden="true"
      >
        <span className="cc-ar-glow cc-ar-glow-one" />
        <span className="cc-ar-glow cc-ar-glow-two" />

        <span className="cc-ar-flow cc-ar-flow-one" />
        <span className="cc-ar-flow cc-ar-flow-two" />

        <i className="cc-ar-dot cc-ar-dot-one" />
        <i className="cc-ar-dot cc-ar-dot-two" />
        <i className="cc-ar-dot cc-ar-dot-three" />
      </div>

      <header className="cc-ar-opening">
        <div className="cc-ar-opening-grid">
          <div className="cc-ar-opening-main">
            <div className="cc-ar-label">
              <i />

              <span />

              <strong>
                City Coolies Editorial
              </strong>
            </div>

            <div className="cc-ar-category">
              {article.category}
            </div>

            <EditorialTitle
              article={
                article
              }
            />

            <div className="cc-ar-intro">
              <span className="cc-ar-intro-line" />

              <p>
                {article.intro}
              </p>
            </div>

            <div className="cc-ar-meta">
              <span>
                Expert Guide
              </span>

              <i />

              <span>
                {article.readTime}
              </span>

              <i />

              <span>
                City Coolies Editorial Team
              </span>
            </div>
          </div>

          <aside
            className="cc-ar-brief"
            aria-label="Article overview"
          >
            <span className="cc-ar-brief-label">
              Inside this guide
            </span>

            <strong>
              Practical insight.
              <br />
              Clear decisions.
            </strong>

            <p>
              A focused City Coolies guide
              designed to turn everyday
              property questions into
              confident next steps.
            </p>

            <div className="cc-ar-brief-points">
              <span>
                <i />
                Understand
              </span>

              <span>
                <i />
                Prioritise
              </span>

              <span>
                <i />
                Act smarter
              </span>
            </div>

            <div
              className="cc-ar-signal"
              aria-hidden="true"
            >
              <span />
              <span />
              <span />
              <i />
            </div>
          </aside>
        </div>

        <div
          className="cc-ar-opening-rule"
          aria-hidden="true"
        >
          <span />
        </div>
      </header>

      <div className="cc-ar-body">
        {article.sections.map(
          (
            section,
            sectionIndex,
          ) => (
            <section
              key={
                section.heading
              }
              className="cc-ar-section"
            >
              <div
                className="cc-ar-index"
                data-reveal
              >
                <span>
                  0{sectionIndex + 1}
                </span>

                <i />
              </div>

              <div className="cc-ar-content">
                <span
                  className="cc-ar-eyebrow"
                  data-reveal
                >
                  {section.eyebrow}
                </span>

                <h2 data-reveal>
                  {section.heading}
                </h2>

                {section.paragraphs.map(
                  (
                    paragraph,
                  ) => (
                    <p
                      key={
                        paragraph
                      }
                      data-reveal
                    >
                      {paragraph}
                    </p>
                  ),
                )}

                {section.bullets && (
                  <ul>
                    {section.bullets.map(
                      (
                        bullet,
                      ) => (
                        <li
                          key={
                            bullet
                          }
                          data-reveal
                        >
                          <i />

                          <span>
                            {bullet}
                          </span>
                        </li>
                      ),
                    )}
                  </ul>
                )}

                {section.highlight && (
                  <aside
                    className="cc-ar-highlight"
                    data-reveal
                  >
                    <span>
                      City Coolies Insight
                    </span>

                    <strong>
                      {section.highlight}
                    </strong>
                  </aside>
                )}
              </div>
            </section>
          ),
        )}
      </div>

      <footer className="cc-ar-footer">
        <div
          className="cc-ar-final-copy"
          data-reveal
        >
          <span>
            Take the next step
          </span>

          <h2>
            Better information should
            lead to better property care.
          </h2>

          <p>
            When you are ready to move
            from planning to action,
            City Coolies can help with
            the relevant professional
            service.
          </p>
        </div>

        <div
          className="cc-ar-actions"
          data-reveal
        >
          <Link
            href={
              article.serviceHref
            }
            className="cc-ar-book"
          >
            <span>
              {article.serviceLabel}
            </span>

            <i>
              →
            </i>
          </Link>

          <a
            href="tel:+918693986939"
            className="cc-ar-call"
          >
            <span className="cc-ar-phone">
              ☎
            </span>

            <span>
              Call City Coolies

              <small>
                +91 86939 86939
              </small>
            </span>
          </a>
        </div>

        <Link
          href="/blog"
          className="cc-ar-back"
          data-reveal
        >
          ← Back to Blog
        </Link>
      </footer>

      <style>{`
        :global(html) {
          scroll-behavior:
            smooth;
        }

        .cc-ar {
          --red: #f31f31;
          --red-deep: #d8071c;
          --pink: #ff879b;
          --pink-soft: #fff0f3;
          --ink: #1f2229;
          --body: #4f5662;
          --muted: #757b86;
          --reading-progress: 0;

          position: relative;
          isolation: isolate;

          width: 100%;

          overflow: hidden;

          color:
            var(--ink);

          background:
            linear-gradient(
              180deg,
              #fff8fa 0%,
              #ffffff 31%,
              #fffafb 65%,
              #fff1f4 100%
            );
        }

        /*
         * READ PROGRESS
         */

        .cc-ar-progress {
          position: fixed;

          top: 0;
          left: 0;

          z-index: 999;

          width: 100%;
          height: 3px;

          pointer-events: none;
        }

        .cc-ar-progress span {
          display: block;

          width:
            calc(
              var(--reading-progress) *
              100%
            );

          height: 100%;

          background:
            linear-gradient(
              90deg,
              #ff9bad,
              var(--red),
              #ff5269
            );

          box-shadow:
            0
            0
            12px
            rgba(
              243,
              31,
              49,
              .65
            );
        }

        /*
         * BACKGROUND
         */

        .cc-ar-background {
          position: absolute;
          inset: 0;
          z-index: -3;

          overflow: hidden;

          pointer-events: none;
        }

        .cc-ar-glow {
          position: absolute;

          border-radius: 50%;

          filter: blur(10px);
        }

        .cc-ar-glow-one {
          top: -230px;
          right: -120px;

          width: 610px;
          height: 610px;

          background:
            radial-gradient(
              circle,
              rgba(
                255,
                137,
                158,
                .27
              ),
              rgba(
                255,
                221,
                228,
                .06
              )
              46%,
              transparent
              72%
            );

          animation:
            ccArGlowMove
            7s
            ease-in-out
            infinite
            alternate;
        }

        .cc-ar-glow-two {
          top: 48%;
          left: -260px;

          width: 570px;
          height: 570px;

          background:
            radial-gradient(
              circle,
              rgba(
                243,
                31,
                49,
                .07
              ),
              transparent
              70%
            );
        }

        .cc-ar-flow {
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
                .95
              ),
              rgba(
                243,
                31,
                49,
                .22
              ),
              transparent
            );
        }

        .cc-ar-flow-one {
          top: 13%;
          right: -8%;

          width: 54%;

          transform:
            rotate(-6deg);

          animation:
            ccArFlowOne
            7s
            ease-in-out
            infinite
            alternate;
        }

        .cc-ar-flow-two {
          top: 57%;
          left: -8%;

          width: 47%;

          opacity: .55;

          transform:
            rotate(5deg);

          animation:
            ccArFlowTwo
            8s
            ease-in-out
            infinite
            alternate;
        }

        .cc-ar-dot {
          position: absolute;

          width: 6px;
          height: 6px;

          border-radius: 50%;

          background: white;

          box-shadow:
            0
            0
            8px
            white,
            0
            0
            18px
            rgba(
              243,
              31,
              49,
              .55
            );
        }

        .cc-ar-dot-one {
          top: 15%;
          right: 18%;
        }

        .cc-ar-dot-two {
          top: 41%;
          right: 7%;
        }

        .cc-ar-dot-three {
          top: 70%;
          left: 10%;

          width: 4px;
          height: 4px;
        }

        /*
         * MODERN ARTICLE OPENING
         */

        .cc-ar-opening {
          width:
            min(
              calc(
                100% -
                48px
              ),
              1180px
            );

          margin: 0 auto;

          padding:
            clamp(
              58px,
              6vw,
              88px
            )
            0
            38px;
        }

        .cc-ar-opening-grid {
          display: grid;

          grid-template-columns:
            minmax(
              0,
              1.25fr
            )
            minmax(
              260px,
              .52fr
            );

          align-items: center;

          gap:
            50px
            72px;
        }

        .cc-ar-label {
          display: flex;
          align-items: center;

          gap: 8px;

          color:
            var(--red);
        }

        .cc-ar-label > i {
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
              243,
              31,
              49,
              .65
            );
        }

        .cc-ar-label > span {
          width: 42px;
          height: 2px;

          background:
            linear-gradient(
              90deg,
              var(--red),
              transparent
            );
        }

        .cc-ar-label strong {
          margin-left: 4px;

          font-size: 8.5px;
          font-weight: 900;

          letter-spacing:
            .20em;

          text-transform:
            uppercase;
        }

        .cc-ar-category {
          width: fit-content;

          margin-top: 23px;

          padding:
            8px
            13px;

          border:
            1px solid
            rgba(
              243,
              31,
              49,
              .13
            );

          border-radius: 999px;

          color:
            var(--red);

          font-size: 8px;
          font-weight: 900;

          letter-spacing:
            .15em;

          text-transform:
            uppercase;

          background:
            rgba(
              255,
              255,
              255,
              .60
            );
        }

        .cc-ar-opening h1 {
          max-width: 850px;

          margin:
            19px
            0
            0;

          font-size:
            clamp(
              48px,
              5vw,
              74px
            );

          font-weight: 760;

          line-height: .98;

          letter-spacing:
            -.054em;
        }

        .cc-ar-opening h1 > span,
        .cc-ar-opening h1 > em {
          display: block;
        }

        .cc-ar-opening h1 > em {
          margin-top: 2px;

          color:
            var(--red);

          font-style: normal;
        }

        /*
         * PREMIUM OPENING COPY
         */

        .cc-ar-intro {
          position: relative;

          display: grid;

          grid-template-columns:
            3px
            1fr;

          gap: 17px;

          max-width: 790px;

          margin-top: 27px;
        }

        .cc-ar-intro-line {
          display: block;

          width: 3px;

          border-radius: 999px;

          background:
            linear-gradient(
              180deg,
              var(--red),
              #ff9aac,
              rgba(
                255,
                154,
                172,
                .08
              )
            );

          box-shadow:
            0
            0
            13px
            rgba(
              243,
              31,
              49,
              .20
            );
        }

        .cc-ar-intro p {
          margin: 0;

          color:
            #505762;

          font-size:
            clamp(
              16px,
              1.35vw,
              19px
            );

          font-weight: 440;

          line-height: 1.72;

          letter-spacing:
            -.005em;
        }

        .cc-ar-meta {
          display: flex;
          flex-wrap: wrap;
          align-items: center;

          gap: 10px;

          margin-top: 23px;

          color:
            #7a808b;

          font-size: 9px;
          font-weight: 760;

          letter-spacing:
            .07em;

          text-transform:
            uppercase;
        }

        .cc-ar-meta i {
          width: 4px;
          height: 4px;

          border-radius: 50%;

          background:
            rgba(
              243,
              31,
              49,
              .45
            );
        }

        /*
         * RIGHT SIDE — NO IMAGE, NO BANNER
         */

        .cc-ar-brief {
          position: relative;

          padding:
            4px
            0
            4px
            27px;

          border-left:
            1px solid
            rgba(
              243,
              31,
              49,
              .16
            );
        }

        .cc-ar-brief-label {
          color:
            var(--red);

          font-size: 8px;
          font-weight: 900;

          letter-spacing:
            .17em;

          text-transform:
            uppercase;
        }

        .cc-ar-brief > strong {
          display: block;

          margin-top: 9px;

          font-size:
            clamp(
              23px,
              2vw,
              30px
            );

          font-weight: 760;

          line-height: 1.08;

          letter-spacing:
            -.035em;
        }

        .cc-ar-brief > p {
          margin:
            13px
            0
            0;

          color:
            var(--muted);

          font-size: 11.5px;

          line-height: 1.65;
        }

        .cc-ar-brief-points {
          display: grid;

          gap: 8px;

          margin-top: 17px;
        }

        .cc-ar-brief-points span {
          display: flex;
          align-items: center;

          gap: 9px;

          color:
            #464c56;

          font-size: 10px;
          font-weight: 740;
        }

        .cc-ar-brief-points i {
          width: 6px;
          height: 6px;

          border-radius: 50%;

          background:
            var(--red);

          box-shadow:
            0
            0
            8px
            rgba(
              243,
              31,
              49,
              .28
            );
        }

        .cc-ar-signal {
          position: relative;

          width: 125px;
          height: 48px;

          margin-top: 24px;
        }

        .cc-ar-signal > span {
          position: absolute;

          left: 0;

          height: 1px;

          border-radius: 999px;

          background:
            linear-gradient(
              90deg,
              var(--red),
              rgba(
                243,
                31,
                49,
                .05
              )
            );
        }

        .cc-ar-signal
        > span:nth-child(1) {
          top: 8px;

          width: 100%;
        }

        .cc-ar-signal
        > span:nth-child(2) {
          top: 23px;

          width: 72%;
        }

        .cc-ar-signal
        > span:nth-child(3) {
          top: 38px;

          width: 46%;
        }

        .cc-ar-signal > i {
          position: absolute;

          top: 4px;
          left: 0;

          width: 9px;
          height: 9px;

          border-radius: 50%;

          background: white;

          box-shadow:
            0
            0
            0
            3px
            rgba(
              243,
              31,
              49,
              .12
            ),
            0
            0
            14px
            rgba(
              243,
              31,
              49,
              .38
            );

          animation:
            ccArSignal
            4s
            ease-in-out
            infinite
            alternate;
        }

        .cc-ar-opening-rule {
          position: relative;

          height: 1px;

          margin-top: 43px;

          background:
            linear-gradient(
              90deg,
              rgba(
                243,
                31,
                49,
                .22
              ),
              rgba(
                243,
                31,
                49,
                .04
              )
              55%,
              transparent
            );
        }

        .cc-ar-opening-rule span {
          position: absolute;

          top: -1px;
          left: 0;

          width: 115px;
          height: 3px;

          border-radius: 999px;

          background:
            linear-gradient(
              90deg,
              var(--red),
              #ff9aad,
              transparent
            );

          box-shadow:
            0
            0
            12px
            rgba(
              243,
              31,
              49,
              .28
            );
        }

        /*
         * OPENING VIDEO SEQUENCE
         */

        .cc-ar-motion
        .cc-ar-label,
        .cc-ar-motion
        .cc-ar-category,
        .cc-ar-motion
        .cc-ar-opening h1 > span,
        .cc-ar-motion
        .cc-ar-opening h1 > em,
        .cc-ar-motion
        .cc-ar-intro,
        .cc-ar-motion
        .cc-ar-meta,
        .cc-ar-motion
        .cc-ar-brief,
        .cc-ar-motion
        .cc-ar-opening-rule {
          opacity: 0;

          filter: blur(8px);

          transform:
            translateY(26px);
        }

        .cc-ar-ready
        .cc-ar-label {
          animation:
            ccArOpeningReveal
            .55s
            cubic-bezier(.16,1,.3,1)
            .04s
            forwards;
        }

        .cc-ar-ready
        .cc-ar-category {
          animation:
            ccArOpeningReveal
            .55s
            cubic-bezier(.16,1,.3,1)
            .15s
            forwards;
        }

        .cc-ar-ready
        .cc-ar-opening h1 > span {
          animation:
            ccArHeadingReveal
            .78s
            cubic-bezier(.16,1,.3,1)
            .27s
            forwards;
        }

        .cc-ar-ready
        .cc-ar-opening h1 > em {
          animation:
            ccArHeadingReveal
            .80s
            cubic-bezier(.16,1,.3,1)
            .43s
            forwards;
        }

        .cc-ar-ready
        .cc-ar-intro {
          animation:
            ccArOpeningReveal
            .68s
            cubic-bezier(.16,1,.3,1)
            .63s
            forwards;
        }

        .cc-ar-ready
        .cc-ar-meta {
          animation:
            ccArOpeningReveal
            .58s
            cubic-bezier(.16,1,.3,1)
            .78s
            forwards;
        }

        .cc-ar-ready
        .cc-ar-brief {
          animation:
            ccArBriefReveal
            .75s
            cubic-bezier(.16,1,.3,1)
            .50s
            forwards;
        }

        .cc-ar-ready
        .cc-ar-opening-rule {
          animation:
            ccArRule
            .72s
            ease
            .87s
            forwards;
        }

        /*
         * ARTICLE CONTENT
         */

        .cc-ar-body {
          width:
            min(
              calc(
                100% -
                48px
              ),
              1060px
            );

          margin: 0 auto;
        }

        .cc-ar-section {
          display: grid;

          grid-template-columns:
            92px
            minmax(
              0,
              1fr
            );

          gap: 30px;

          padding:
            55px
            0;

          border-bottom:
            1px solid
            rgba(
              243,
              31,
              49,
              .09
            );
        }

        .cc-ar-index {
          padding-top: 4px;
        }

        .cc-ar-index span {
          display: block;

          color:
            rgba(
              243,
              31,
              49,
              .34
            );

          font-size: 15px;
          font-weight: 900;
        }

        .cc-ar-index i {
          display: block;

          width: 41px;
          height: 2px;

          margin-top: 8px;

          background:
            linear-gradient(
              90deg,
              var(--red),
              transparent
            );
        }

        .cc-ar-eyebrow {
          display: block;

          color:
            var(--red);

          font-size: 8.5px;
          font-weight: 900;

          letter-spacing:
            .18em;

          text-transform:
            uppercase;
        }

        .cc-ar-content h2 {
          max-width: 790px;

          margin:
            10px
            0
            0;

          color:
            #242830;

          font-size:
            clamp(
              30px,
              2.8vw,
              42px
            );

          font-weight: 750;

          line-height: 1.05;

          letter-spacing:
            -.038em;
        }

        .cc-ar-content > p {
          max-width: 790px;

          margin:
            20px
            0
            0;

          color:
            var(--body);

          font-size:
            clamp(
              15px,
              1.15vw,
              17px
            );

          font-weight: 420;

          line-height: 1.84;

          letter-spacing:
            .002em;
        }

        .cc-ar-content ul {
          max-width: 780px;

          margin:
            23px
            0
            0;

          padding: 0;

          list-style: none;
        }

        .cc-ar-content li {
          display: grid;

          grid-template-columns:
            17px
            1fr;

          gap: 11px;

          margin-top: 11px;

          color:
            #505660;

          font-size: 14px;

          line-height: 1.65;
        }

        .cc-ar-content li i {
          width: 7px;
          height: 7px;

          margin-top: 8px;

          border-radius: 50%;

          background:
            var(--red);

          box-shadow:
            0
            0
            9px
            rgba(
              243,
              31,
              49,
              .25
            );
        }

        .cc-ar-highlight {
          max-width: 790px;

          margin-top: 29px;

          padding:
            4px
            0
            4px
            20px;

          border-left:
            3px solid
            var(--red);

          background:
            linear-gradient(
              90deg,
              rgba(
                255,
                238,
                242,
                .62
              ),
              transparent
              65%
            );
        }

        .cc-ar-highlight span {
          display: block;

          color:
            var(--red);

          font-size: 8px;
          font-weight: 900;

          letter-spacing:
            .17em;

          text-transform:
            uppercase;
        }

        .cc-ar-highlight strong {
          display: block;

          max-width: 730px;

          margin-top: 7px;

          color:
            #343941;

          font-size:
            clamp(
              17px,
              1.4vw,
              21px
            );

          font-weight: 650;

          line-height: 1.55;
        }

        /*
         * SCROLL REVEAL
         */

        .cc-ar-motion
        [data-reveal] {
          opacity: 0;

          filter: blur(7px);

          transform:
            translateY(28px);

          transition:
            opacity
            .72s
            cubic-bezier(.16,1,.3,1)
            var(--cc-delay,0s),
            transform
            .72s
            cubic-bezier(.16,1,.3,1)
            var(--cc-delay,0s),
            filter
            .72s
            ease
            var(--cc-delay,0s);
        }

        .cc-ar-motion
        [data-reveal].cc-ar-visible {
          opacity: 1;

          filter: blur(0);

          transform:
            translateY(0);
        }

        /*
         * FOOTER
         */

        .cc-ar-footer {
          width:
            min(
              calc(
                100% -
                48px
              ),
              1060px
            );

          margin: 0 auto;

          padding:
            64px
            0
            74px;
        }

        .cc-ar-final-copy {
          max-width: 820px;
        }

        .cc-ar-final-copy > span {
          color:
            var(--red);

          font-size: 8.5px;
          font-weight: 900;

          letter-spacing:
            .18em;

          text-transform:
            uppercase;
        }

        .cc-ar-final-copy h2 {
          margin:
            9px
            0
            0;

          font-size:
            clamp(
              35px,
              3.8vw,
              55px
            );

          font-weight: 750;

          line-height: 1;

          letter-spacing:
            -.044em;
        }

        .cc-ar-final-copy p {
          max-width: 680px;

          margin:
            17px
            0
            0;

          color:
            var(--body);

          font-size: 15px;

          line-height: 1.7;
        }

        .cc-ar-actions {
          display: flex;
          flex-wrap: wrap;

          gap: 11px;

          margin-top: 28px;

          padding:
            23px
            0;

          border-top:
            1px solid
            rgba(
              243,
              31,
              49,
              .11
            );

          border-bottom:
            1px solid
            rgba(
              243,
              31,
              49,
              .11
            );
        }

        .cc-ar-book,
        .cc-ar-call {
          display: inline-flex;
          align-items: center;
          justify-content: center;

          min-height: 55px;

          border-radius:
            999px;

          text-decoration: none;

          transition:
            transform .25s ease,
            box-shadow .25s ease;
        }

        .cc-ar-book {
          gap: 22px;

          min-width: 225px;

          padding:
            0 24px;

          color: white;

          font-size: 11px;
          font-weight: 850;

          background:
            linear-gradient(
              100deg,
              #ff2d42,
              var(--red-deep)
            );

          box-shadow:
            0
            14px
            29px
            rgba(
              216,
              7,
              28,
              .20
            );
        }

        .cc-ar-book i {
          font-size: 16px;
          font-style: normal;
        }

        .cc-ar-call {
          gap: 12px;

          min-width: 225px;

          padding:
            0 21px;

          border:
            1px solid
            rgba(
              243,
              31,
              49,
              .16
            );

          color:
            var(--ink);

          background:
            rgba(
              255,
              255,
              255,
              .72
            );
        }

        .cc-ar-phone {
          display: grid;

          width: 31px;
          height: 31px;

          place-items: center;

          border-radius: 50%;

          color: white;

          background:
            var(--red);
        }

        .cc-ar-call
        > span:last-child {
          display: flex;
          flex-direction: column;

          font-size: 10.5px;
          font-weight: 820;
        }

        .cc-ar-call small {
          margin-top: 2px;

          color:
            #777d87;

          font-size: 8.5px;
        }

        .cc-ar-book:hover,
        .cc-ar-call:hover {
          transform:
            translateY(-3px);
        }

        .cc-ar-back {
          display: inline-block;

          margin-top: 25px;

          color:
            var(--red);

          font-size: 10px;
          font-weight: 800;

          text-decoration: none;
        }

        /*
         * KEYFRAMES
         */

        @keyframes ccArOpeningReveal {
          to {
            opacity: 1;

            filter: blur(0);

            transform:
              translateY(0);
          }
        }

        @keyframes ccArHeadingReveal {
          0% {
            opacity: 0;

            filter: blur(11px);

            transform:
              translateY(39px);
          }

          100% {
            opacity: 1;

            filter: blur(0);

            transform:
              translateY(0);
          }
        }

        @keyframes ccArBriefReveal {
          0% {
            opacity: 0;

            filter: blur(8px);

            transform:
              translateX(27px);
          }

          100% {
            opacity: 1;

            filter: blur(0);

            transform:
              translateX(0);
          }
        }

        @keyframes ccArRule {
          from {
            opacity: 0;

            filter: blur(4px);

            transform:
              scaleX(.2);

            transform-origin:
              left;
          }

          to {
            opacity: 1;

            filter: blur(0);

            transform:
              scaleX(1);

            transform-origin:
              left;
          }
        }

        @keyframes ccArGlowMove {
          to {
            opacity: .65;

            transform:
              scale(1.08)
              translate(
                -20px,
                16px
              );
          }
        }

        @keyframes ccArFlowOne {
          to {
            transform:
              rotate(-3deg)
              translateY(-23px);

            opacity: .28;
          }
        }

        @keyframes ccArFlowTwo {
          to {
            transform:
              rotate(2deg)
              translateY(21px);

            opacity: .22;
          }
        }

        @keyframes ccArSignal {
          from {
            left: 0;
          }

          to {
            left: 112px;
          }
        }

        /*
         * TABLET
         */

        @media (
          max-width: 900px
        ) {
          .cc-ar-opening-grid {
            grid-template-columns:
              1fr
              230px;

            gap: 35px;
          }

          .cc-ar-opening h1 {
            font-size:
              clamp(
                45px,
                6vw,
                66px
              );
          }
        }

        /*
         * PHONE
         */

        @media (
          max-width: 700px
        ) {
          .cc-ar-opening,
          .cc-ar-body,
          .cc-ar-footer {
            width:
              calc(
                100% -
                30px
              );
          }

          .cc-ar-opening {
            padding:
              39px
              0
              29px;
          }

          .cc-ar-opening-grid {
            grid-template-columns:
              1fr;

            gap: 29px;
          }

          .cc-ar-label strong {
            font-size: 7px;

            letter-spacing:
              .16em;
          }

          .cc-ar-label > span {
            width: 28px;
          }

          .cc-ar-category {
            margin-top: 19px;
          }

          .cc-ar-opening h1 {
            margin-top: 15px;

            font-size:
              clamp(
                38px,
                10.8vw,
                53px
              );

            line-height: .98;
          }

          .cc-ar-intro {
            gap: 13px;

            margin-top: 21px;
          }

          .cc-ar-intro p {
            font-size: 14px;

            line-height: 1.68;
          }

          .cc-ar-meta {
            gap: 7px;

            margin-top: 19px;

            font-size: 7.5px;
          }

          .cc-ar-brief {
            padding-left: 18px;
          }

          .cc-ar-brief > strong {
            font-size: 23px;
          }

          .cc-ar-signal {
            margin-top: 17px;
          }

          .cc-ar-opening-rule {
            margin-top: 30px;
          }

          .cc-ar-section {
            grid-template-columns:
              1fr;

            gap: 14px;

            padding:
              38px
              0;
          }

          .cc-ar-index {
            display: flex;
            align-items: center;

            gap: 8px;

            padding: 0;
          }

          .cc-ar-index i {
            width: 34px;

            margin: 0;
          }

          .cc-ar-content h2 {
            font-size:
              clamp(
                27px,
                7.8vw,
                37px
              );
          }

          .cc-ar-content > p {
            margin-top: 17px;

            font-size: 14px;

            line-height: 1.78;
          }

          .cc-ar-content li {
            font-size: 13px;
          }

          .cc-ar-footer {
            padding:
              47px
              0
              54px;
          }

          .cc-ar-final-copy h2 {
            font-size:
              clamp(
                31px,
                8.7vw,
                43px
              );
          }

          .cc-ar-actions {
            display: grid;

            grid-template-columns:
              1fr;

            gap: 9px;
          }

          .cc-ar-book,
          .cc-ar-call {
            width: 100%;
          }
        }

        @media (
          prefers-reduced-motion:
          reduce
        ) {
          .cc-ar-label,
          .cc-ar-category,
          .cc-ar-opening h1 > span,
          .cc-ar-opening h1 > em,
          .cc-ar-intro,
          .cc-ar-meta,
          .cc-ar-brief,
          .cc-ar-opening-rule,
          [data-reveal] {
            opacity: 1 !important;

            filter: none !important;

            transform: none !important;

            transition: none !important;

            animation: none !important;
          }

          .cc-ar-glow,
          .cc-ar-flow,
          .cc-ar-signal i {
            animation: none !important;
          }
        }
      `}</style>
    </article>
  );
}