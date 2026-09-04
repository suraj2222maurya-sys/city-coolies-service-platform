"use client";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";
export default function HeroSection() {
    const heroContentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const heroContent = heroContentRef.current;

    if (!heroContent) {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          heroContent.classList.remove("hero-content-visible");

          window.requestAnimationFrame(() => {
            window.requestAnimationFrame(() => {
              heroContent.classList.add("hero-content-visible");
            });
          });
        } else {
          heroContent.classList.remove("hero-content-visible");
        }
      },
      {
        threshold: 0.3,
      },
    );

    observer.observe(heroContent);

    return () => {
      observer.disconnect();
    };
  }, []);
  return (
    <section className="relative w-full overflow-hidden bg-[#fff7f7] lg:min-h-[calc(100svh-134px)]">
      {/* Mobile banner — content ke upar */}
<div className="relative aspect-[2/1] w-full overflow-hidden bg-[#fff7f7] lg:hidden">
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
  className="hidden object-fill -translate-y-[3%] scale-[1.02] lg:block"
/>

     <div className="relative z-10 mx-auto flex w-full max-w-[1540px] px-5 pb-10 pt-0 sm:px-10 sm:pb-12 sm:pt-0 lg:min-h-[calc(100svh-134px)] lg:items-center lg:px-14 lg:py-6 xl:px-16">
        <div className="w-full max-w-[650px]">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-red-200 bg-white/70 px-4 py-2 shadow-sm backdrop-blur-sm">
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
          <div className="mt-7 flex flex-wrap items-center gap-5">
            <Link
              href="/contact"
              className="group inline-flex h-[56px] items-center gap-5 rounded-[13px] bg-[#f41620] py-2 pl-6 pr-2 text-[16px] font-bold text-white shadow-[0_14px_30px_rgba(244,22,32,0.22)] transition-all duration-300 hover:-translate-y-1 hover:bg-[#dc1019]"
            >
              <span>Get a Free Quote</span>

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
          <div className="mt-8 grid w-full max-w-[620px] grid-cols-2 overflow-hidden rounded-[17px] border border-white/80 bg-white/75 shadow-[0_15px_40px_rgba(55,25,25,0.06)] backdrop-blur-xl sm:grid-cols-4">
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
    </section>
  );
}