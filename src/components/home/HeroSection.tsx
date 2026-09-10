"use client";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";
export default function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
    const heroContentRef = useRef<HTMLDivElement>(null);


  useEffect(() => {
    const section = sectionRef.current;
    const heroContent = heroContentRef.current;

    if (!section || !heroContent) {
      return;
    }

    let runningAnimations: Animation[] = [];

    const mediaElements = Array.from(
      section.querySelectorAll<HTMLElement>("img"),
    );

    const revealElements = Array.from(
      section.querySelectorAll<HTMLElement>(
        [
          "[data-hero-reveal]",
          ".hero-reveal-item",
          ".hero-divider",
          "[data-hero-group='actions'] > *",
          "[data-hero-group='trust'] > *",
        ].join(","),
      ),
    );

    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    const cancelAnimations = () => {
      runningAnimations.forEach((animation) => animation.cancel());
      runningAnimations = [];
    };

    const hideSequence = () => {
      revealElements.forEach((element) => {
        element.style.opacity = "0";
        element.style.transform = "translate3d(0, 26px, 0) scale(0.985)";
        element.style.filter = "blur(7px)";
        element.style.willChange = "opacity, transform, filter";
      });

      mediaElements.forEach((element) => {
        element.style.opacity = "0";
        element.style.transform = "scale(1.025)";
        element.style.filter = "blur(5px)";
        element.style.willChange = "opacity, transform, filter";
      });
    };

    const showWithoutAnimation = () => {
      heroContent.classList.add("hero-content-visible");

      [...mediaElements, ...revealElements].forEach((element) => {
        element.style.opacity = "";
        element.style.transform = "";
        element.style.filter = "";
        element.style.willChange = "";
      });
    };

    const finishElement = (
      element: HTMLElement,
      animation: Animation,
    ) => {
      element.style.opacity = "";
      element.style.transform = "";
      element.style.filter = "";
      element.style.willChange = "";
      animation.cancel();
    };

    const playSequence = () => {
      cancelAnimations();

      if (reducedMotion) {
        showWithoutAnimation();
        return;
      }

      hideSequence();
      heroContent.classList.add("hero-content-visible");

      mediaElements.forEach((element) => {
        const animation = element.animate(
          [
            {
              opacity: 0,
              transform: "scale(1.025)",
              filter: "blur(5px)",
            },
            {
              opacity: 1,
              transform: "scale(1)",
              filter: "blur(0)",
            },
          ],
          {
            duration: 1050,
            delay: 0,
            easing: "cubic-bezier(.16, 1, .3, 1)",
            fill: "both",
          },
        );

        animation.onfinish = () => finishElement(element, animation);
        runningAnimations.push(animation);
      });

      revealElements.forEach((element, index) => {
        const isAction =
          element.parentElement?.dataset.heroGroup === "actions";

        const isTrustCard =
          element.parentElement?.dataset.heroGroup === "trust";

        const delay = 120 + index * 95;

        const startTransform = isAction
          ? "translate3d(0, 24px, 0) scale(0.96)"
          : isTrustCard
            ? "translate3d(20px, 18px, 0) scale(0.965)"
            : "translate3d(0, 26px, 0) scale(0.985)";

        const animation = element.animate(
          [
            {
              opacity: 0,
              transform: startTransform,
              filter: "blur(7px)",
            },
            {
              opacity: 1,
              transform: "translate3d(0, 0, 0) scale(1)",
              filter: "blur(0)",
            },
          ],
          {
            duration: isTrustCard ? 680 : 760,
            delay,
            easing: "cubic-bezier(.16, 1, .3, 1)",
            fill: "both",
          },
        );

        animation.onfinish = () => finishElement(element, animation);
        runningAnimations.push(animation);
      });
    };

    hideSequence();

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) {
          return;
        }

        playSequence();
        observer.disconnect();
      },
      {
        threshold: 0.14,
        rootMargin: "-3% 0px -3% 0px",
      },
    );

    observer.observe(section);

    return () => {
      observer.disconnect();
      cancelAnimations();

      [...mediaElements, ...revealElements].forEach((element) => {
        element.style.opacity = "";
        element.style.transform = "";
        element.style.filter = "";
        element.style.willChange = "";
      });
    };
  }, []);
  return (
    <section ref={sectionRef} className="relative w-full overflow-hidden bg-[#fff7f7] lg:min-h-[calc(100svh-128px)]">
      {/* Mobile banner — content ke upar */}
<div data-mobile-hero-art className="relative aspect-[2/1] w-full overflow-hidden bg-[#fff7f7] lg:hidden">
  <Image
    src="/city-coolies-hero-banner(2) .png"
    alt="City Coolies facility maintenance and civil services"
    fill
    priority
   sizes="(max-width: 1023px) 100vw, 1px"
    className="object-fill"
  />
</div>

{/* Desktop banner — background ke roop mein */}
<Image
  src="/city-coolies-hero-banner(2) .png"
  alt="City Coolies facility maintenance and civil services"
  fill
  priority
sizes="(min-width: 1024px) 100vw, 1px"
  className="hidden object-fill lg:block"
/>

     <div data-mobile-hero-panel className="relative z-10 mx-auto flex w-full max-w-[1540px] px-5 pb-10 pt-0 sm:px-10 sm:pb-12 sm:pt-0 lg:min-h-[calc(100svh-128px)] lg:items-center lg:px-14 lg:py-6 xl:px-16">
        <div data-mobile-hero-inner className="w-full max-w-[650px]">
          <div data-hero-reveal data-mobile-hero-eyebrow className="mb-5 inline-flex items-center gap-2 rounded-full border border-red-200 bg-white/70 px-4 py-2 shadow-sm backdrop-blur-sm">
            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-red-50 text-sm text-[#ed1c24]">
              ✦
            </span>

            <span className="text-sm font-semibold text-[#ed1c24]">
            Professional Property Care. Chennai to Pan India.
            </span>
          </div>

         <div className="city-hero-copy">
  <div ref={heroContentRef} className="hero-content-sequence">
  <h1
      className="max-w-[620px] text-[34px] font-bold leading-[1.12] tracking-[-0.03em] text-[#242b31] sm:text-[42px] lg:text-[50px]"
    aria-label="Complete Facility Maintenance and Civil Solutions"
  >
    <span className="hero-reveal-mask block">
      <span className="hero-reveal-item hero-reveal-1 block">
        Book Professional Services
      </span>
    </span>

    <span className="hero-reveal-mask block">
      <span className="hero-reveal-item hero-reveal-2 block">
           For Your Home, Business
      </span>
    </span>

    <span className="hero-reveal-mask block pb-2">
      <span className="hero-reveal-item hero-reveal-3 hero-title-accent block">
         or Property
      </span>
    </span>
  </h1>

  <div
    className="hero-divider hero-reveal-4 my-6 h-[4px] rounded-full bg-[#ed1c24]"
    aria-hidden="true"
  />

  <p
  className="max-w-[610px] text-base font-medium leading-7 text-[#626a73] sm:text-[17px]"
  aria-label="Choose the service you need and book it with City Coolies. From cleaning, renovation, painting, electrical and plumbing to carpentry, pest control, civil work, fabrication, landscaping and complete property maintenance, our team serves homes, businesses and properties across Chennai, Tamil Nadu and India."
>
  <span className="hero-reveal-mask block">
    <span className="hero-reveal-item hero-reveal-5 block">
      Choose the service you need and book it with City Coolies.
    </span>
  </span>

  <span className="hero-reveal-mask block">
    <span className="hero-reveal-item hero-reveal-6 block">
      From cleaning, renovation, painting, electrical and plumbing
    </span>
  </span>

  <span className="hero-reveal-mask block">
    <span className="hero-reveal-item hero-reveal-7 block">
      to carpentry, pest control, civil work, fabrication, landscaping
    </span>
  </span>

  <span className="hero-reveal-mask block">
    <span className="hero-reveal-item hero-reveal-8 block">
      and complete property maintenance for homes, businesses
    </span>
  </span>

  <span className="hero-reveal-mask block">
    <span className="hero-reveal-item hero-reveal-9 block">
      and properties across Chennai, Tamil Nadu and India.
    </span>
  </span>
</p>
</div>
</div>
          {/* Hero buttons */}
          <div data-hero-group="actions" className="mt-7 flex flex-wrap items-center gap-5">
            <Link
              href="/vendor-membership"
              className="group inline-flex h-[56px] items-center gap-5 rounded-[13px] bg-[#f41620] py-2 pl-6 pr-2 text-[16px] font-bold text-white shadow-[0_14px_30px_rgba(244,22,32,0.22)] transition-all duration-300 hover:-translate-y-1 hover:bg-[#dc1019]"
            >
              <span>Vendor Membership</span>

              <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-white text-[#f41620] transition-transform duration-300 group-hover:translate-x-1">
                <svg
                  width="19"
                  height="19"
                  viewBox="0 0 24 24"
                  fill="none"
                  aria-hidden="true"
                >
                  <path
                    d="M5 12H19M13 6L19 12L13 18"
                    stroke="currentColor"
                    strokeWidth="2.3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
            </Link>

            <button
  type="button"
  onClick={() => {
    const workProcessSection = document.getElementById("work-process");

    if (!workProcessSection) {
      return;
    }

    const headerHeight = 134;
    const sectionPosition =
      workProcessSection.getBoundingClientRect().top +
      window.scrollY -
      headerHeight;

    window.scrollTo({
      top: sectionPosition,
      behavior: "smooth",
    });
  }}
  className="group inline-flex h-[56px] items-center gap-3 rounded-[13px] border border-white/80 bg-white/80 px-5 text-[16px] font-bold text-[#3d4248] shadow-[0_10px_25px_rgba(31,41,55,0.06)] backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:bg-white hover:text-[#f41620]"
>
  <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-[#fff0f1] text-[#f41620]">
    <svg
      className="ml-0.5"
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M8 5.75C8 4.95 8.89 4.47 9.56 4.93L18.4 11.18C18.97 11.58 18.97 12.42 18.4 12.82L9.56 19.07C8.89 19.53 8 19.05 8 18.25V5.75Z" />
    </svg>
  </span>

  <span>How It Works</span>
</button>
          </div>

          {/* Hero trust statistics */}
          <div data-hero-group="trust" className="mt-8 grid w-full max-w-[620px] grid-cols-2 overflow-hidden rounded-[17px] border border-white/80 bg-white/75 shadow-[0_15px_40px_rgba(55,25,25,0.06)] backdrop-blur-xl sm:grid-cols-4">
            <div className="flex min-h-[76px] items-center gap-3 border-b border-r border-[#f1dfe1] px-4 py-3 sm:border-b-0">
              <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-[#ffd4d7] bg-[#fff6f6] text-[#f41620]">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  aria-hidden="true"
                >
                  <path
                    d="M12 3L20 7V12C20 17 16.7 20.7 12 22C7.3 20.7 4 17 4 12V7L12 3Z"
                    stroke="currentColor"
                    strokeWidth="1.7"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M9 12L11 14L15.5 9.5"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>

              <span>
                <strong className="block whitespace-nowrap text-[17px] font-extrabold leading-none text-[#32383e]">
                  100%
                </strong>
                <span className="mt-1 block whitespace-nowrap text-[10px] font-medium text-[#727980]">
                  Quality Assured
                </span>
              </span>
            </div>

            <div className="flex min-h-[76px] items-center gap-3 border-b border-[#f1dfe1] px-4 py-3 sm:border-b-0 sm:border-r">
              <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-[#ffd4d7] bg-[#fff6f6] text-[#f41620]">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  aria-hidden="true"
                >
                  <circle
                    cx="12"
                    cy="13"
                    r="7"
                    stroke="currentColor"
                    strokeWidth="1.7"
                  />
                  <path
                    d="M12 9V13L14.5 15"
                    stroke="currentColor"
                    strokeWidth="1.7"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M9 3H15M12 3V6M5.5 7.5L4 6M18.5 7.5L20 6"
                    stroke="currentColor"
                    strokeWidth="1.7"
                    strokeLinecap="round"
                  />
                </svg>
              </span>

              <span>
                <strong className="block whitespace-nowrap text-[17px] font-extrabold leading-none text-[#32383e]">
                  24/7
                </strong>
                <span className="mt-1 block whitespace-nowrap text-[10px] font-medium text-[#727980]">
                  Support
                </span>
              </span>
            </div>

            <div className="flex min-h-[76px] items-center gap-3 border-r border-[#f1dfe1] px-4 py-3">
              <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-[#ffd4d7] bg-[#fff6f6] text-[#f41620]">
                <svg
                  width="21"
                  height="21"
                  viewBox="0 0 24 24"
                  fill="none"
                  aria-hidden="true"
                >
                  <circle
                    cx="9"
                    cy="9"
                    r="3"
                    stroke="currentColor"
                    strokeWidth="1.7"
                  />
                  <circle
                    cx="16.5"
                    cy="10"
                    r="2.5"
                    stroke="currentColor"
                    strokeWidth="1.7"
                  />
                  <path
                    d="M3.5 19C3.8 15.8 5.8 14 9 14C12.2 14 14.2 15.8 14.5 19"
                    stroke="currentColor"
                    strokeWidth="1.7"
                    strokeLinecap="round"
                  />
                  <path
                    d="M14 15C17.4 14.4 20 16 20.5 19"
                    stroke="currentColor"
                    strokeWidth="1.7"
                    strokeLinecap="round"
                  />
                </svg>
              </span>

              <span>
                <strong className="block whitespace-nowrap text-[17px] font-extrabold leading-none text-[#32383e]">
                  10K+
                </strong>
                <span className="mt-1 block whitespace-nowrap text-[10px] font-medium text-[#727980]">
                  Happy Clients
                </span>
              </span>
            </div>

            <div className="flex min-h-[76px] items-center gap-3 px-4 py-3">
              <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-[#ffd4d7] bg-[#fff6f6] text-[#f41620]">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  aria-hidden="true"
                >
                  <path
                    d="M12 21C12 21 19 15.4 19 9.5C19 5.9 15.9 3 12 3C8.1 3 5 5.9 5 9.5C5 15.4 12 21 12 21Z"
                    stroke="currentColor"
                    strokeWidth="1.7"
                    strokeLinejoin="round"
                  />
                  <circle
                    cx="12"
                    cy="9.5"
                    r="2.4"
                    stroke="currentColor"
                    strokeWidth="1.7"
                  />
                </svg>
              </span>

              <span>
                <strong className="block whitespace-nowrap text-[15px] font-extrabold leading-none text-[#32383e]">
                  Pan India
                </strong>
                <span className="mt-1 block whitespace-nowrap text-[10px] font-medium text-[#727980]">
                  Service
                </span>
              </span>
            </div>
          </div>
        </div>
      </div>
    
      {/* CITY_COOLIES_MOBILE_HERO_V2 */}
      <style jsx>{`
        @media (max-width: 1023px) {
          section {
            background:
              radial-gradient(
                circle at 50% 10%,
                rgba(255, 255, 255, 0.96),
                transparent 38%
              ),
              linear-gradient(180deg, #ffecef 0%, #fff7f8 100%);
          }

          [data-mobile-hero-art] {
            aspect-ratio: 1.48 / 1 !important;
            background:
              radial-gradient(
                circle at 50% 42%,
                rgba(255, 255, 255, 0.98),
                transparent 48%
              ),
              linear-gradient(180deg, #ffdfe4 0%, #fff3f5 100%);
          }

          [data-mobile-hero-art] :global(img) {
            object-fit: cover !important;
            object-position: right center !important;
          }

          [data-mobile-hero-panel] {
            width: 100% !important;
            min-height: auto !important;
            margin-top: -30px !important;
            padding: 31px 18px 34px !important;
            align-items: flex-start !important;
            border-top: 1px solid rgba(255, 255, 255, 0.94);
            border-radius: 30px 30px 0 0;
            background:
              radial-gradient(
                circle at 88% 12%,
                rgba(255, 220, 225, 0.42),
                transparent 31%
              ),
              linear-gradient(
                180deg,
                rgba(255, 255, 255, 0.97) 0%,
                rgba(255, 247, 248, 0.97) 100%
              );
            box-shadow:
              0 -18px 48px rgba(111, 27, 38, 0.11),
              inset 0 1px 0 rgba(255, 255, 255, 0.96);
            backdrop-filter: blur(18px);
          }

          [data-mobile-hero-inner] {
            width: 100% !important;
            max-width: 620px !important;
            margin-inline: auto;
          }

          [data-mobile-hero-eyebrow] {
            display: flex !important;
            width: 100%;
            min-height: 24px;
            margin-bottom: 20px !important;
            padding: 0 !important;
            gap: 12px !important;
            align-items: center;
            border: 0 !important;
            border-radius: 0 !important;
            color: #ed1c24;
            background: transparent !important;
            box-shadow: none !important;
            backdrop-filter: none !important;
          }

          [data-mobile-hero-eyebrow] > :first-child {
            display: block !important;
            flex: 0 0 38px;
            width: 38px !important;
            height: 3px !important;
            min-width: 38px;
            overflow: hidden;
            border: 0 !important;
            border-radius: 999px !important;
            color: transparent !important;
            font-size: 0 !important;
            background: #ed1c24 !important;
          }

          [data-mobile-hero-eyebrow] > :last-child {
            font-size: 11px !important;
            font-weight: 850 !important;
            line-height: 1.25 !important;
            letter-spacing: 0.11em;
            text-transform: uppercase;
          }

          .city-hero-copy h1 {
            max-width: 100% !important;
            font-size: clamp(2rem, 9.4vw, 2.7rem) !important;
            font-weight: 850 !important;
            line-height: 1.06 !important;
            letter-spacing: -0.045em !important;
          }

          .city-hero-copy .hero-divider {
            width: 54px !important;
            height: 4px !important;
            margin-top: 18px !important;
            margin-bottom: 18px !important;
          }

          .city-hero-copy p {
            max-width: 100% !important;
            color: #5f6872 !important;
            font-size: 14px !important;
            font-weight: 500 !important;
            line-height: 1.62 !important;
          }

          [data-hero-group="actions"] {
            display: grid !important;
            grid-template-columns:
              minmax(0, 1.22fr)
              minmax(0, 0.92fr) !important;
            width: 100% !important;
            margin-top: 23px !important;
            gap: 10px !important;
            align-items: stretch !important;
          }

          [data-hero-group="actions"] > * {
            display: inline-flex !important;
            width: 100% !important;
            min-width: 0 !important;
            height: 52px !important;
            margin: 0 !important;
            padding: 6px 10px !important;
            gap: 8px !important;
            align-items: center !important;
            justify-content: center !important;
            border-radius: 999px !important;
            font-size: 12px !important;
            line-height: 1.1 !important;
            white-space: nowrap;
          }

          [data-hero-group="actions"] > :first-child {
            padding-left: 14px !important;
            background:
              linear-gradient(
                135deg,
                #ff2936 0%,
                #f41620 55%,
                #dc1019 100%
              ) !important;
            box-shadow: 0 13px 28px rgba(244, 22, 32, 0.24) !important;
          }

          [data-hero-group="actions"] > :first-child > :last-child {
            width: 34px !important;
            height: 34px !important;
            flex-basis: 34px !important;
          }

          [data-hero-group="actions"] > :last-child {
            border: 1px solid rgba(242, 31, 47, 0.1) !important;
            color: #282d34 !important;
            background: rgba(255, 255, 255, 0.92) !important;
            box-shadow: 0 10px 24px rgba(42, 23, 28, 0.07) !important;
          }

          [data-hero-group="actions"] > :last-child > :first-child {
            width: 32px !important;
            height: 32px !important;
            flex-basis: 32px !important;
          }

          [data-hero-group="trust"] {
            display: grid !important;
            grid-template-columns: repeat(4, minmax(0, 1fr)) !important;
            width: 100% !important;
            max-width: 100% !important;
            margin-top: 21px !important;
            overflow: hidden !important;
            border: 1px solid rgba(242, 31, 47, 0.16) !important;
            border-radius: 21px !important;
            background: rgba(255, 255, 255, 0.72) !important;
            box-shadow:
              0 14px 34px rgba(61, 25, 32, 0.07),
              inset 0 1px 0 rgba(255, 255, 255, 0.96) !important;
            backdrop-filter: blur(16px);
          }

          [data-hero-group="trust"] > * {
            display: flex !important;
            min-width: 0 !important;
            min-height: 105px !important;
            padding: 11px 3px 10px !important;
            gap: 7px !important;
            flex-direction: column !important;
            align-items: center !important;
            justify-content: center !important;
            border-top: 0 !important;
            border-bottom: 0 !important;
            border-left: 0 !important;
            border-right: 1px solid rgba(242, 31, 47, 0.12) !important;
            text-align: center;
          }

          [data-hero-group="trust"] > :last-child {
            border-right: 0 !important;
          }

          [data-hero-group="trust"] > * > :first-child {
            width: 34px !important;
            height: 34px !important;
            flex: 0 0 34px !important;
          }

          [data-hero-group="trust"] > * > :last-child {
            display: block;
            min-width: 0;
            width: 100%;
          }

          [data-hero-group="trust"] strong {
            font-size: 13px !important;
            line-height: 1.05 !important;
            white-space: normal !important;
          }

          [data-hero-group="trust"] strong + span {
            margin-top: 4px !important;
            font-size: 8px !important;
            line-height: 1.15 !important;
            white-space: normal !important;
          }
        }

        @media (max-width: 390px) {
          [data-mobile-hero-panel] {
            margin-top: -26px !important;
            padding-inline: 14px !important;
            border-radius: 27px 27px 0 0;
          }

          [data-mobile-hero-eyebrow] > :last-child {
            font-size: 9.5px !important;
            letter-spacing: 0.08em;
          }

          .city-hero-copy h1 {
            font-size: clamp(1.85rem, 9vw, 2.2rem) !important;
          }

          [data-hero-group="actions"] {
            grid-template-columns:
              minmax(0, 1.2fr)
              minmax(0, 0.9fr) !important;
            gap: 7px !important;
          }

          [data-hero-group="actions"] > * {
            height: 49px !important;
            padding-inline: 7px !important;
            gap: 5px !important;
            font-size: 10.5px !important;
          }

          [data-hero-group="actions"] > :first-child {
            padding-left: 10px !important;
          }

          [data-hero-group="actions"] > :first-child > :last-child {
            width: 30px !important;
            height: 30px !important;
            flex-basis: 30px !important;
          }

          [data-hero-group="actions"] > :last-child > :first-child {
            width: 29px !important;
            height: 29px !important;
            flex-basis: 29px !important;
          }

          [data-hero-group="trust"] > * {
            min-height: 98px !important;
          }

          [data-hero-group="trust"] strong {
            font-size: 11px !important;
          }

          [data-hero-group="trust"] strong + span {
            font-size: 7.5px !important;
          }
        }
      `}</style>
    </section>
  );
}