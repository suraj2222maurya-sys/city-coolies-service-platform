"use client";

import Image from "next/image";

import { useEffect, useRef, useState } from "react";

const trustItems = [
  {
    title: "Professional Team",
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
  },
  {
    title: "Trusted Services",
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z" />
        <path d="m9 12 2 2 4-4" />
      </svg>
    ),
  },
  {
    title: "Premium Quality",
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <circle cx="12" cy="8" r="5" />
        <path d="M8.5 12.5 7 22l5-3 5 3-1.5-9.5" />
        <path d="m9.7 8 1.5 1.5L14.5 6" />
      </svg>
    ),
  },
  {
    title: "Customer First",
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M4 13a8 8 0 0 1 16 0" />
        <path d="M4 13v5a2 2 0 0 0 2 2h2v-7H4Z" />
        <path d="M20 13v5a2 2 0 0 1-2 2h-2v-7h4Z" />
        <path d="M16 20c0 1.1-.9 2-2 2h-2" />
      </svg>
    ),
  },
];

export default function AboutHeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const section = sectionRef.current;

    if (!section) {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) {
        return;
      }

      setIsVisible(true);
      observer.disconnect();
      },
      {
        threshold: 0.15,
        rootMargin: "0px 0px -6% 0px",
      },
    );

    observer.observe(section);

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="about-hero"
      aria-labelledby="about-hero-title"
      className={`aboutHero ${
        isVisible ? "aboutHeroVisible" : ""
      }`}
    >
      <Image
        src="/about-hero-bg.png"
        alt=""
        fill
        priority
        sizes="100vw"
        className="aboutHeroBackground"
        aria-hidden="true"
      />
      <div
        className="aboutMobileBanner"
        aria-hidden="true"
        style={{
          width: "100%",
          height: "auto",
          aspectRatio: "auto",
          margin: 0,
          padding: 0,
          overflow: "visible",
          background: "#ffffff",
          lineHeight: 0,
          opacity: 1,
          filter: "none",
          transform: "none",
        }}
      >
        <Image
          src="/about-hero-bg.png"
          alt=""
          width={1672}
          height={941}
          priority
          unoptimized
          sizes="(max-width: 767px) 100vw, 1px"
          style={{
            position: "static",
            display: "block",
            width: "100%",
            maxWidth: "100%",
            height: "auto",
            minHeight: 0,
            maxHeight: "none",
            margin: 0,
            padding: 0,
            objectFit: "contain",
            objectPosition: "center",
            transform: "none",
          }}
        />
      </div>
      <div className="aboutHeroOverlay" aria-hidden="true" />

      <div className="aboutHeroInner">
        <div className="aboutHeroContent">
         <h1 id="about-hero-title" className="aboutHeroTitle">
  <span className="aboutTitleLine aboutVideoLine">
    We Care for Your
  </span>

  <span className="aboutTitleLine aboutVideoLine">
    <span className="aboutTitleRed">Property</span> Like
  </span>

  <span className="aboutTitleScript aboutVideoLine">
    It&apos;s Our Own.
  </span>
</h1>

<p className="aboutHeroDescription">
  <span className="aboutDescriptionLine aboutVideoLine">
    City Coolies delivers reliable, professional and premium property
  </span>

  <span className="aboutDescriptionLine aboutVideoLine">
    care services for homes, apartments, hotels, schools, companies and
  </span>

  <span className="aboutDescriptionLine aboutVideoLine">
    industries across India, with our strongest service network in
  </span>

  <span className="aboutDescriptionLine aboutVideoLine">
    Chennai and Tamil Nadu.
  </span>
</p>
          <div
            className="aboutTrustRow aboutReveal"
            aria-label="City Coolies service commitments"
          >
            {trustItems.map((item, index) => (
              <div className="aboutTrustItem" key={item.title}>
                <span className="aboutTrustIcon">{item.icon}</span>

                <span className="aboutTrustTitle">{item.title}</span>

                {index < trustItems.length - 1 ? (
                  <span className="aboutTrustDivider" aria-hidden="true" />
                ) : null}
              </div>
            ))}
          </div>

          <div className="aboutHeroActions aboutReveal">
            <a
              href="tel:+918693986939"
              className="aboutHeroCta aboutCallCta"
              aria-label="Call City Coolies at +91 86939 86939"
            >
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.79 19.79 0 0 1 2.12 4.18 2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.12.9.33 1.78.62 2.63a2 2 0 0 1-.45 2.11L8 9.73a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.85.29 1.73.5 2.63.62A2 2 0 0 1 22 16.92Z" />
              </svg>

              <span>Call Now</span>
            </a>

               <a
  href="/services"
  className="aboutHeroCta aboutServicesCta"
>
  <span>View Services</span>

  <span className="aboutCtaArrow" aria-hidden="true">
    →
  </span>
</a>
          </div>
        </div>
      </div>

      <style jsx>{`
        .aboutHero {
          position: relative;
          isolation: isolate;
          width: 100%;
          min-height: clamp(590px, 46vw, 760px);
          overflow: hidden;
          background: #ffffff;
        }
          .aboutMobileBanner {
  display: none;
}
        .aboutHeroBackground {
          z-index: -3;
          object-fit: cover;
          object-position: center center;
          transform: scale(1.018);
          transition: transform 1.4s cubic-bezier(0.22, 1, 0.36, 1);
        }

        .aboutHeroVisible .aboutHeroBackground {
          transform: scale(1);
        }

        .aboutHeroOverlay {
          position: absolute;
          inset: 0;
          z-index: -2;
          pointer-events: none;
          background: linear-gradient(
            90deg,
            rgba(255, 255, 255, 0.76) 0%,
            rgba(255, 255, 255, 0.58) 30%,
            rgba(255, 255, 255, 0.23) 48%,
            rgba(255, 255, 255, 0) 66%
          );
        }

        .aboutHeroInner {
          display: flex;
          width: min(100% - 40px, 1500px);
          min-height: clamp(590px, 46vw, 760px);
          align-items: center;
          margin-inline: auto;
          padding-top: clamp(30px, 3vw, 48px);
          padding-bottom: clamp(36px, 4vw, 58px);
        }

        .aboutHeroContent {
          width: min(100%, 540px);
          margin-left: clamp(72px, 7.2vw, 126px);
          transform: translateY(-18px);
        }

        .aboutReveal {
          opacity: 0;
          filter: blur(5px);
          transform: translate3d(0, 24px, 0);
          transition:
            opacity 0.82s cubic-bezier(0.22, 1, 0.36, 1),
            transform 0.82s cubic-bezier(0.22, 1, 0.36, 1),
            filter 0.82s ease;
          will-change: opacity, transform;
        }

        .aboutHeroVisible .aboutReveal {
          opacity: 1;
          filter: blur(0);
          transform: translate3d(0, 0, 0);
        }

        .aboutHeroVisible .aboutReveal:nth-child(1) {
          transition-delay: 0.05s;
        }

        .aboutHeroVisible .aboutReveal:nth-child(2) {
          transition-delay: 0.17s;
        }

        .aboutHeroVisible .aboutReveal:nth-child(3) {
          transition-delay: 0.29s;
        }

        .aboutHeroVisible .aboutReveal:nth-child(4) {
          transition-delay: 0.41s;
        }

           .aboutHeroTitle {
  position: relative;
  top: -18px;
  left: 135px;
  width: 540px;
  max-width: none;
  margin: 0;
  color: #111824;
  font-size: clamp(2.35rem, 3vw, 3.25rem);
  font-weight: 800;
  line-height: 1;
  letter-spacing: -0.04em;
}
        .aboutTitleLine {
          display: block;
          white-space: nowrap;
        }

        .aboutTitleRed {
          color: #f51b28;
        }

        .aboutTitleScript {
          position: relative;
          display: block;
          width: fit-content;
          margin-top: 9px;
          color: #111824;
          font-family: Georgia, "Times New Roman", serif;
          font-size: 0.7em;
          font-style: italic;
          font-weight: 500;
          line-height: 1.05;
          letter-spacing: -0.035em;
        }

        .aboutTitleScript::after {
          position: absolute;
          right: 0;
          bottom: -9px;
          width: 47%;
          height: 3px;
          border-radius: 999px;
          background: #f51b28;
          content: "";
          transform: rotate(-2deg);
        }

       .aboutHeroDescription {
  width: 500px;
  margin: 29px 0 0 135px;
  color: #4d5764;
  font-size: clamp(0.9rem, 0.92vw, 1rem);
  font-weight: 500;
  line-height: 1.62;
}
  .aboutDescriptionLine {
  display: block;
}

.aboutVideoLine {
  opacity: 0;
  filter: blur(7px);
  transform: translate3d(0, 26px, 0);
  clip-path: inset(0 0 100% 0);
  will-change: opacity, filter, transform, clip-path;
}

.aboutHeroVisible .aboutVideoLine {
  animation: aboutVideoReveal 0.85s
    cubic-bezier(0.22, 1, 0.36, 1) both;
}

.aboutHeroVisible .aboutHeroTitle .aboutVideoLine:nth-child(1) {
  animation-delay: 0.08s;
}

.aboutHeroVisible .aboutHeroTitle .aboutVideoLine:nth-child(2) {
  animation-delay: 0.26s;
}

.aboutHeroVisible .aboutHeroTitle .aboutVideoLine:nth-child(3) {
  animation-delay: 0.44s;
}

.aboutHeroVisible .aboutHeroDescription .aboutVideoLine:nth-child(1) {
  animation-delay: 0.68s;
}

.aboutHeroVisible .aboutHeroDescription .aboutVideoLine:nth-child(2) {
  animation-delay: 0.84s;
}

.aboutHeroVisible .aboutHeroDescription .aboutVideoLine:nth-child(3) {
  animation-delay: 1s;
}

.aboutHeroVisible .aboutHeroDescription .aboutVideoLine:nth-child(4) {
  animation-delay: 1.16s;
}

@keyframes aboutVideoReveal {
  0% {
    opacity: 0;
    filter: blur(7px);
    transform: translate3d(0, 26px, 0);
    clip-path: inset(0 0 100% 0);
  }

  55% {
    opacity: 0.75;
    filter: blur(2px);
  }

  100% {
    opacity: 1;
    filter: blur(0);
    transform: translate3d(0, 0, 0);
    clip-path: inset(0 0 0 0);
  }
}
.aboutTrustRow {
  position: relative;
  left: 110px;
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  width: min(100%, 500px);
  margin-top: 23px;
}
        .aboutTrustItem {
          position: relative;
          display: flex;
          min-width: 0;
          align-items: center;
          justify-content: flex-start;
          flex-direction: column;
          gap: 8px;
          padding: 0 8px;
        }

        .aboutTrustIcon {
          display: grid;
          width: 45px;
          height: 45px;
          place-items: center;
          border: 1px solid rgba(245, 27, 40, 0.16);
          border-radius: 15px;
          background: rgba(255, 255, 255, 0.9);
          box-shadow:
            0 10px 22px rgba(245, 27, 40, 0.09),
            inset 0 1px 0 rgba(255, 255, 255, 0.98);
          color: #f51b28;
          backdrop-filter: blur(12px);
          transition:
            transform 0.3s ease,
            border-color 0.3s ease,
            box-shadow 0.3s ease;
        }

        .aboutTrustItem:hover .aboutTrustIcon {
          border-color: rgba(245, 27, 40, 0.32);
          box-shadow: 0 14px 28px rgba(245, 27, 40, 0.15);
          transform: translateY(-4px);
        }

        .aboutTrustIcon :global(svg) {
          width: 23px;
          height: 23px;
          fill: none;
          stroke: currentColor;
          stroke-width: 1.9;
          stroke-linecap: round;
          stroke-linejoin: round;
        }

        .aboutTrustTitle {
          max-width: 92px;
          color: #171f2a;
          font-size: 0.69rem;
          font-weight: 800;
          line-height: 1.2;
          text-align: center;
        }

        .aboutTrustDivider {
          position: absolute;
          top: 7px;
          right: 0;
          width: 1px;
          height: 54px;
          background: linear-gradient(
            180deg,
            transparent,
            rgba(245, 27, 40, 0.18),
            transparent
          );
        }

       .aboutHeroActions {
  position: relative;
  left: 110px;
  display: flex;
  width: min(100%, 500px);
  align-items: center;
  gap: 14px;
  margin-top: 27px;
}

        .aboutHeroCta {
          all: unset;
          box-sizing: border-box;
          display: inline-flex;
          min-width: 170px;
          height: 52px;
          flex: none;
          align-items: center;
          justify-content: center;
          gap: 10px;
          padding: 0 23px;
          border-radius: 999px;
          font-family: inherit;
          font-size: 0.91rem;
          font-weight: 800;
          line-height: 1;
          text-decoration: none;
          white-space: nowrap;
          cursor: pointer;
          transition:
            transform 0.3s ease,
            box-shadow 0.3s ease,
            background-color 0.3s ease,
            border-color 0.3s ease;
        }

        .aboutHeroCta:hover {
          transform: translateY(-3px);
        }

        .aboutHeroCta :global(svg) {
          width: 21px;
          height: 21px;
          flex: none;
          fill: none;
          stroke: currentColor;
          stroke-width: 2;
          stroke-linecap: round;
          stroke-linejoin: round;
        }

        .aboutCallCta {
          border: 1px solid #f51b28;
          background: linear-gradient(135deg, #ff2634, #ec0011);
          box-shadow: 0 14px 30px rgba(245, 27, 40, 0.29);
          color: #ffffff;
        }

        .aboutCallCta:hover {
          box-shadow: 0 19px 38px rgba(245, 27, 40, 0.37);
        }

        .aboutServicesCta {
  border: 1px solid #f51b28;
  background: rgba(255, 255, 255, 0.94);
  box-shadow: 0 12px 28px rgba(245, 27, 40, 0.1);
  color: #171f2a;
  backdrop-filter: blur(12px);
}

        .aboutServicesCta:hover {
          border-color: #f51b28;
          background: #ffffff;
          box-shadow: 0 17px 34px rgba(245, 27, 40, 0.13);
        }

        .aboutCtaArrow {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          color: #f51b28;
          font-size: 1.2rem;
          line-height: 1;
          transition: transform 0.3s ease;
        }

        .aboutServicesCta:hover .aboutCtaArrow {
          transform: translateX(4px);
        }

        @media (max-width: 1200px) {
          .aboutHeroContent {
            margin-left: clamp(42px, 4vw, 72px);
          }

          .aboutHeroOverlay {
            background: linear-gradient(
              90deg,
              rgba(255, 255, 255, 0.86) 0%,
              rgba(255, 255, 255, 0.67) 43%,
              rgba(255, 255, 255, 0.14) 72%
            );
          }
        }

        @media (max-width: 900px) {
          .aboutHeroContent {
            width: min(100%, 510px);
            margin-left: 22px;
            transform: translateY(-10px);
          }

          .aboutHeroTitle {
            font-size: clamp(2.4rem, 6vw, 3.45rem);
          }

          .aboutHeroOverlay {
            background: linear-gradient(
              90deg,
              rgba(255, 255, 255, 0.93) 0%,
              rgba(255, 255, 255, 0.8) 57%,
              rgba(255, 255, 255, 0.25) 100%
            );
          }
        }

        @media (max-width: 767px) {
          .aboutHero {
            display: block;
            width: 100%;
            min-height: auto;
            overflow: hidden;
            background:
              radial-gradient(
                circle at 108% 62%,
                rgba(245, 27, 40, 0.055),
                transparent 32%
              ),
              linear-gradient(
                180deg,
                #ffffff 0%,
                #fffdfd 54%,
                #fff7f8 100%
              );
          }

          .aboutHeroBackground,
          .aboutHeroOverlay {
            display: none;
          }

          .aboutMobileBanner {
            display: block;
            width: 100%;
            height: auto;
            margin: 0;
            padding: 0;
            overflow: hidden;
            background: #ffffff;
            line-height: 0;
          }

          .aboutMobileBannerImage {
            display: block;
            width: 100%;
            height: auto;
            margin: 0;
            padding: 0;
            object-fit: contain;
            object-position: center;
          }

          .aboutHeroInner {
            display: block;
            width: 100%;
            min-height: auto;
            margin: 0;
            padding: 0;
          }

          .aboutHeroContent {
            position: relative;
            width: 100%;
            margin: 0;
            padding: 29px 22px 40px;
            background:
              radial-gradient(
                circle at 108% 35%,
                rgba(245, 27, 40, 0.055),
                transparent 31%
              ),
              linear-gradient(
                180deg,
                rgba(255, 255, 255, 0.99),
                rgba(255, 248, 249, 0.99)
              );
            transform: none;
          }

          .aboutHeroContent::before {
            display: block;
            margin: 0 0 17px;
            color: #ef1725;
            content: "ABOUT CITY COOLIES";
            font-size: 0.68rem;
            font-weight: 900;
            line-height: 1;
            letter-spacing: 0.22em;
          }

          .aboutHeroTitle {
            position: static;
            top: auto;
            left: auto;
            width: 100%;
            max-width: none;
            margin: 0;
            padding: 0;
            overflow: visible;
            color: #111824;
            font-size: clamp(2rem, 8.5vw, 2.4rem);
            font-weight: 900;
            line-height: 1;
            letter-spacing: -0.055em;
          }

          .aboutTitleLine {
            display: block;
            width: 100%;
            overflow: visible;
            white-space: nowrap;
          }

          .aboutTitleRed {
            color: #f51b28;
          }

          .aboutTitleScript {
            position: relative;
            display: block;
            width: fit-content;
            margin-top: 10px;
            color: #111824;
            font-family: Georgia, "Times New Roman", serif;
            font-size: 0.87em;
            font-style: italic;
            font-weight: 500;
            line-height: 1;
            letter-spacing: -0.055em;
          }

          .aboutTitleScript::after {
            display: none;
          }

          .aboutHeroDescription {
            display: block;
            width: 100%;
            margin: 25px 0 0;
            color: #536071;
            font-size: 0.92rem;
            font-weight: 500;
            line-height: 1.63;
            text-align: left;
          }

          .aboutDescriptionLine {
            display: inline;
          }

          .aboutDescriptionLine::after {
            content: " ";
          }

          .aboutVideoLine,
          .aboutReveal {
            opacity: 1;
            filter: none;
            transform: none;
            clip-path: none;
            animation: none;
            transition: none;
          }

          .aboutHeroVisible .aboutVideoLine,
          .aboutHeroVisible .aboutReveal {
            opacity: 1;
            filter: none;
            transform: none;
            clip-path: none;
            animation: none;
          }

          .aboutTrustRow {
            position: static;
            left: auto;
            display: grid;
            grid-template-columns: repeat(2, minmax(0, 1fr));
            width: 100%;
            margin: 25px 0 0;
            column-gap: 18px;
            row-gap: 0;
            transform: none;
          }

          .aboutTrustItem {
            position: relative;
            display: grid;
            min-width: 0;
            min-height: 88px;
            grid-template-columns: 50px minmax(0, 1fr);
            align-items: center;
            justify-content: initial;
            gap: 10px;
            padding: 12px 1px;
            border-bottom: 1px solid rgba(245, 27, 40, 0.16);
          }

          .aboutTrustItem:nth-child(3),
          .aboutTrustItem:nth-child(4) {
            border-bottom: 0;
          }

          .aboutTrustItem:nth-child(odd)::after {
            position: absolute;
            top: 16px;
            right: -10px;
            width: 1px;
            height: calc(100% - 32px);
            background: rgba(245, 27, 40, 0.17);
            content: "";
          }

          .aboutTrustIcon {
            display: grid;
            width: 50px;
            height: 50px;
            place-items: center;
            border: 0;
            border-radius: 50%;
            background: #fff0f2;
            box-shadow: none;
            color: #f51b28;
            backdrop-filter: none;
          }

          .aboutTrustItem:hover .aboutTrustIcon {
            border-color: transparent;
            box-shadow: none;
            transform: none;
          }

          .aboutTrustIcon :global(svg) {
            width: 26px;
            height: 26px;
            fill: none;
            stroke: currentColor;
            stroke-width: 1.9;
            stroke-linecap: round;
            stroke-linejoin: round;
          }

          .aboutTrustTitle {
            max-width: 92px;
            color: #121a28;
            font-size: 0.77rem;
            font-weight: 800;
            line-height: 1.22;
            text-align: left;
          }

          .aboutTrustDivider {
            display: none;
          }

          .aboutHeroActions {
            position: static;
            left: auto;
            display: flex;
            width: 100%;
            align-items: stretch;
            flex-direction: row;
            gap: 11px;
            margin: 25px 0 0;
            transform: none;
          }

          .aboutHeroCta {
            box-sizing: border-box;
            display: inline-flex;
            width: auto;
            min-width: 0;
            height: 54px;
            flex: 1 1 0;
            align-items: center;
            justify-content: center;
            gap: 8px;
            padding: 0 9px;
            border-radius: 15px;
            font-size: 0.79rem;
            font-weight: 800;
            line-height: 1;
            text-decoration: none;
            white-space: nowrap;
          }

          .aboutHeroCta :global(svg) {
            width: 20px;
            height: 20px;
            flex: none;
          }

          .aboutCallCta {
            border: 1px solid #f51b28;
            background: linear-gradient(135deg, #ff2634, #eb0011);
            box-shadow: 0 13px 27px rgba(245, 27, 40, 0.24);
            color: #ffffff;
          }

          .aboutServicesCta {
            border: 1.5px solid #f51b28;
            background: #ffffff;
            box-shadow: none;
            color: #171f2a;
            backdrop-filter: none;
          }

          .aboutCtaArrow {
            display: inline-flex;
            color: #f51b28;
            font-size: 1.1rem;
          }
        }

        @media (max-width: 390px) {
          .aboutHeroContent {
            padding: 26px 17px 36px;
          }

          .aboutHeroContent::before {
            margin-bottom: 15px;
            font-size: 0.61rem;
          }

          .aboutHeroTitle {
            font-size: clamp(1.78rem, 8.2vw, 2rem);
          }

          .aboutHeroDescription {
            margin-top: 23px;
            font-size: 0.86rem;
          }

          .aboutTrustRow {
            column-gap: 14px;
          }

          .aboutTrustItem {
            grid-template-columns: 45px minmax(0, 1fr);
            gap: 8px;
          }

          .aboutTrustIcon {
            width: 45px;
            height: 45px;
          }

          .aboutTrustIcon :global(svg) {
            width: 23px;
            height: 23px;
          }

          .aboutTrustTitle {
            font-size: 0.68rem;
          }

          .aboutHeroCta {
            height: 51px;
            padding-inline: 7px;
            font-size: 0.72rem;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .aboutHeroBackground,
          .aboutReveal,
          .aboutVideoLine,
          .aboutTrustIcon,
          .aboutHeroCta,
          .aboutCtaArrow {
            opacity: 1;
            filter: none;
            transform: none;
            clip-path: none;
            animation: none;
            transition: none;
          }
        }

        

        

        

        

        /* FINAL MOBILE BUTTONS AND REVEAL START */
        @media (max-width: 767px) {
          :global(html) {
            scroll-behavior: smooth;
          }

          .aboutHero {
            scroll-behavior: smooth;
          }

          .aboutHeroActions {
            position: static;
            left: auto;
            display: grid;
            width: 100%;
            grid-template-columns: repeat(2, minmax(0, 1fr));
            align-items: stretch;
            gap: 11px;
            margin: 26px 0 0;
            transform: none;
          }

          .aboutHeroCta {
            box-sizing: border-box;
            display: inline-flex;
            width: 100%;
            min-width: 0;
            height: 54px;
            flex: none;
            align-items: center;
            justify-content: center;
            gap: 8px;
            margin: 0;
            padding: 0 10px;
            border-radius: 16px;
            font-family: inherit;
            font-size: 0.78rem;
            font-weight: 800;
            line-height: 1;
            text-align: center;
            text-decoration: none;
            white-space: nowrap;
            cursor: pointer;
          }

          .aboutHeroCta:hover {
            transform: none;
          }

          .aboutHeroCta :global(svg) {
            display: block;
            width: 20px;
            height: 20px;
            flex: none;
            fill: none;
            stroke: currentColor;
            stroke-width: 2;
            stroke-linecap: round;
            stroke-linejoin: round;
          }

          .aboutCallCta {
            border: 1.5px solid #f51b28;
            background: linear-gradient(135deg, #ff2634, #eb0011);
            box-shadow: 0 13px 28px rgba(245, 27, 40, 0.24);
            color: #ffffff;
          }

          .aboutServicesCta {
            border: 1.5px solid #f51b28;
            background: #ffffff;
            box-shadow: 0 10px 24px rgba(245, 27, 40, 0.1);
            color: #171f2a;
          }

          .aboutCtaArrow {
            display: inline-flex;
            align-items: center;
            justify-content: center;
            color: #f51b28;
            font-size: 1.1rem;
            line-height: 1;
          }

          .aboutMobileBanner,
          .aboutHeroContent::before,
          .aboutHeroTitle .aboutVideoLine,
          .aboutHeroDescription .aboutVideoLine,
          .aboutTrustItem,
          .aboutHeroActions {
            opacity: 0;
            filter: blur(7px);
            transform: translate3d(0, 26px,0) scale(0.975);
            will-change: opacity, filter, transform;
          }

          .aboutTrustRow {
            opacity: 1;
            filter: none;
            transform: none;
            animation: none;
          }

          .aboutHeroVisible .aboutMobileBanner {
            animation: aboutMobileCinematicReveal 0.72s
              cubic-bezier(0.22, 1, 36, 1) 0.04s both;
          }

          .aboutHeroVisible .aboutHeroContent::before {
            animation: aboutMobileCinematicReveal 0.68s
              cubic-bezier(0.22, 1, 0.36, 1) 0.18s both;
          }

          .aboutHeroVisible
            .aboutHeroTitle
            .aboutVideoLine:nth-child(1) {
            animation: aboutMobileCinematicReveal 0.72s
              cubic-bezier(0.22, 1, 0.36, 1) 0.29s both;
          }

          .aboutHeroVisible
            .aboutHeroTitle
            .aboutVideoLine:nth-child(2) {
            animation: aboutMobileCinematicReveal 0.72s
              cubic-bezier(0.22, 1, 0.36, 1) 0.4s both;
          }

          .aboutHeroVisible
            .aboutHeroTitle
            .aboutVideoLine:nth-child(3) {
            animation: aboutMobileCinematicReveal 0.72s
              cubic-bezier(0.22, 1, 0.36, 1) 0.51s both;
          }

          .aboutHeroVisible
            .aboutHeroDescription
            .aboutVideoLine:nth-child(1) {
            animation: aboutMobileCinematicReveal 0.68s
              cubic-bezier(0.22, 1, 0.36, 1) 0.62s both;
          }

          .aboutHeroVisible
            .aboutHeroDescription
            .aboutVideoLine:nth-child(2) {
            animation: aboutMobileCinematicReveal 0.68s
              cubic-bezier(0.22, 1, 0.36, 1) 0.7s both;
          }

          .aboutHeroVisible
            .aboutHeroDescription
            .aboutVideoLine:nth-child(3) {
            animation: aboutMobileCinematicReveal 0.68s
              cubic-bezier(0.22, 1, 0.36, 1) 0.78s both;
          }

          .aboutHeroVisible
            .aboutHeroDescription
            .aboutVideoLine:nth-child(4) {
            animation: aboutMobileCinematicReveal 0.68s
              cubic-bezier(0.22, 1, 0.36, 1) 0.86s both;
          }

          .aboutHeroVisible .aboutTrustItem:nth-child(1) {
            animation: aboutMobileCinematicReveal 0.68s
              cubic-bezier(0.22, 1, 0.36, 1) 0.96s both;
          }

          .aboutHeroVisible .aboutTrustItem:nth-child(2) {
            animation: aboutMobileCinematicReveal 0.68s
              cubic-bezier(0.22, 1, 0.36, 1) 1.04s both;
          }

          .aboutHeroVisible .aboutTrustItem:nth-child(3) {
            animation: aboutMobileCinematicReveal 0.68s
              cubic-bezier(0.22, 1, 0.36, 1) 1.12s both;
          }

          .aboutHeroVisible .aboutTrustItem:nth-child(4) {
            animation: aboutMobileCinematicReveal 0.68s
              cubic-bezier(0.22, 1, 0.36, 1) 1.2s both;
          }

          .aboutHeroVisible .aboutHeroActions {
            animation: aboutMobileCinematicReveal 0.72s
              cubic-bezier(0.22, 1, 0.36, 1) 1.3s both;
          }
        }

        @media (max-width: 390px) {
          .aboutHeroActions {
            gap: 9px;
          }

          .aboutHeroCta {
            height: 51px;
            gap: 6px;
            padding-inline: 7px;
            border-radius: 14px;
            font-size: 0.7rem;
          }

          .aboutHeroCta :global(svg) {
            width: 18px;
            height: 18px;
          }

          .aboutCtaArrow {
            font-size: 1rem;
          }
        }

        @keyframes aboutMobileCinematicReveal {
          0% {
            opacity: 0;
            filter: blur(7px);
            transform: translate3d(0, 26px, 0) scale(0.975);
          }

          55% {
            opacity: 0.78;
            filter: blur(2px);
          }

          100% {
            opacity: 1;
            filter: blur(0);
            transform: translate3d(0, 0, 0) scale(1);
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .aboutMobileBanner,
          .aboutHeroContent::before,
          .aboutHeroTitle .aboutVideoLine,
                   .aboutHeroDescription .aboutVideoLine,
          .aboutTrustItem,
          .aboutHeroActions {
            opacity: 1;
            filter: none;
            transform: none;
            animation: none;
            transition: none;
          }
        }
        /* FINAL MOBILE BUTTONS AND REVEAL END */

        /* BANNER RESPONSIVE LOCK START */
        @media (max-width: 767px) {
          .aboutHeroBackground,
          .aboutHeroOverlay {
            display: none !important;
          }

          .aboutMobileBanner {
            position: static !important;
            display: block !important;
            width: 100% !important;
            max-width: 100% !important;
            height: auto !important;
            min-height: 0 !important;
            max-height: none !important;
            aspect-ratio: auto !important;
            margin: 0 !important;
            padding: 0 !important;
            overflow: visible !important;
            background: #ffffff !important;
            background-image: none !important;
            opacity: 1 !important;
            filter: none !important;
            transform: none !important;
            animation: none !important;
            transition: none !important;
          }

          .aboutHeroVisible .aboutMobileBanner {
            opacity: 1 !important;
            filter: none !important;
            transform: none !important;
            animation: none !important;
            transition: none !important;
          }
        }
        /* BANNER RESPONSIVE LOCK END */
      `}</style>
    </section>
  );
}