"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";

type Service = {
  number: string;
  title: string;
  href: string;
};

const services: Service[] = [
  {
    number: "01",
    title: "Deep Cleaning",
    href: "/services/deep-cleaning",
  },
  {
    number: "02",
    title: "Renovation",
    href: "/services/renovation",
  },
  {
    number: "03",
    title: "Electrical Works",
    href: "/services/electrical-works",
  },
  {
    number: "04",
    title: "Plumbing Works",
    href: "/services/plumbing-works",
  },
  {
    number: "05",
    title: "Painting Services",
    href: "/services/painting-services",
  },
  {
    number: "06",
    title: "Civil Construction & Maintenance",
    href: "/services/civil-construction-maintenance",
  },
  {
    number: "07",
    title: "Appliance Repair",
    href: "/services/appliance-repair",
  },
  {
    number: "08",
    title: "Carpentry & Interior Works",
    href: "/services/carpentry-interior-works",
  },
  {
    number: "09",
    title: "Packers & Movers",
    href: "/services/packers-movers",
  },
  {
    number: "10",
    title: "Pest Control",
    href: "/services/pest-control",
  },   
  {
    number: "11",
    title: "Spa & Salon Services",
    href: "/services/spa-salon-services",
  },
 
  {
    number: "13",
    title: "Fabrication Works",
    href: "/services/fabrication-works",
  },
  {
    number: "14",
    title: "Gardening & Landscaping",
    href: "/services/gardening-landscaping",
  },
  {
    number: "15",
    title: "Property Maintenance",
    href: "/services/property-maintenance",
  },
];

export default function CoreServicesSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
  const section = sectionRef.current;

  if (!section) {
    return;
  }

  const observer = new IntersectionObserver(
    ([entry]) => {
      setIsVisible(entry.isIntersecting);
    },
    {
      threshold: 0.05,
      rootMargin: "40px 0px -40px 0px",
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
      id="core-services"
      className="relative overflow-hidden bg-white px-5 pt-0 pb-12 sm:px-8 sm:pt-0 sm:pb-14 lg:px-12 lg:pt-0 lg:pb-16"
    >
      {/* Background design */}
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#ef1b23]/30 to-transparent" />

        <div className="absolute -left-24 top-10 h-52 w-52 rounded-full bg-[#ef1b23]/8 blur-3xl" />

        <div className="absolute -right-24 bottom-0 h-56 w-56 rounded-full bg-red-100/70 blur-3xl" />

        <div className="absolute inset-0 opacity-40 [background-image:radial-gradient(rgba(239,27,35,0.13)_0.7px,transparent_0.7px)] [background-size:22px_22px]" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl">
       {/* Section heading */}
<div className="mx-auto flex max-w-4xl flex-col items-center text-center">
  <div
    className={`inline-flex items-center gap-2 rounded-full border border-red-100 bg-[#fff7f7] px-4 py-2 shadow-[0_8px_24px_rgba(239,27,35,0.08)] transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] motion-reduce:transition-none ${
      isVisible
        ? "translate-y-0 scale-100 blur-0 opacity-100"
        : "translate-y-3 scale-[0.96] blur-[2px] opacity-0"
    }`}
  >
    <span className="relative flex h-2 w-2">
      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#ef1b23] opacity-40 motion-reduce:animate-none" />
      <span className="relative inline-flex h-2 w-2 rounded-full bg-[#ef1b23]" />
    </span>

    <span className="text-[11px] font-extrabold uppercase tracking-[0.2em] text-[#ef1b23]">
      Explore Our Services
    </span>
  </div>

 {/* Automatic cinematic heading */}
<div className="relative mt-5 w-full overflow-hidden px-2 py-3">
  <div
    className={`pointer-events-none absolute inset-y-0 left-[-15%] z-20 w-24 -skew-x-12 bg-gradient-to-r from-transparent via-[#ef1b23]/30 to-transparent blur-md transition-all delay-100 duration-[900ms] ease-[cubic-bezier(0.16,1,0.3,1)] motion-reduce:hidden ${
      isVisible
        ? "translate-x-[1400%] opacity-100"
        : "-translate-x-[200%] opacity-0"
    }`}
    aria-hidden="true"
  />

  <h2
    className={`mx-auto max-w-[900px] text-balance text-3xl font-black leading-[1.05] tracking-[-0.045em] text-zinc-950 transition-all duration-[700ms] ease-[cubic-bezier(0.16,1,0.3,1)] motion-reduce:transition-none sm:text-4xl lg:text-[48px] ${
      isVisible
        ? "translate-y-0 scale-100 blur-0 opacity-100 [clip-path:inset(0_0_0_0)]"
        : "translate-y-10 scale-[0.94] blur-[8px] opacity-0 [clip-path:inset(100%_0_0_0)]"
    }`}
  >
    Everything Your Property
    <span className="text-[#ef1b23]"> Needs.</span>
  </h2>
</div>

{/* Automatic expanding red line */}
<div
  className={`h-[3px] origin-center rounded-full bg-gradient-to-r from-transparent via-[#ef1b23] to-transparent transition-all delay-100 duration-[750ms] ease-[cubic-bezier(0.16,1,0.3,1)] motion-reduce:transition-none ${
    isVisible
      ? "w-24 scale-x-100 opacity-100"
      : "w-0 scale-x-0 opacity-0"
  }`}
  aria-hidden="true"
/>

{/* Automatic cinematic description */}
<div className="relative mt-4 w-full overflow-hidden px-3 py-3">
  <div
    className={`pointer-events-none absolute inset-y-0 left-[-15%] z-20 w-20 -skew-x-12 bg-gradient-to-r from-transparent via-[#ef1b23]/20 to-transparent blur-md transition-all delay-300 duration-[850ms] ease-[cubic-bezier(0.16,1,0.3,1)] motion-reduce:hidden ${
      isVisible
        ? "translate-x-[1700%] opacity-100"
        : "-translate-x-[200%] opacity-0"
    }`}
    aria-hidden="true"
  />

  <p
    className={`mx-auto max-w-2xl text-balance text-sm font-medium leading-6 text-zinc-600 transition-all delay-150 duration-[700ms] ease-[cubic-bezier(0.16,1,0.3,1)] motion-reduce:transition-none sm:text-[16px] sm:leading-7 ${
      isVisible
        ? "translate-y-0 scale-100 blur-0 opacity-100 [clip-path:inset(0_0_0_0)]"
        : "translate-y-8 scale-[0.97] blur-[6px] opacity-0 [clip-path:inset(100%_0_0_0)]"
    }`}
  >
    Complete property care solutions for homes, offices, commercial spaces,
    and industrial properties—all managed by experienced professionals.
  </p>
</div>
</div>
        {/* Compact service grid */}
         <div className="mt-8 grid auto-rows-fr grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-3 lg:mt-9 lg:grid-cols-4 xl:grid-cols-5">
          {services.map((service, index) => (
            <Link
              key={service.href}
              href={service.href}
              aria-label={`View ${service.title} details`}
              style={{
                transitionDelay: isVisible
  ? `${100 + index * 25}ms`
  : "0ms",
              }}
              className={`group relative h-full min-h-[104px] overflow-hidden rounded-[16px] border border-red-100 bg-white/90 px-4 py-4 shadow-[0_8px_28px_rgba(50,20,22,0.045)] backdrop-blur-xl transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] sm:min-h-[100px] lg:min-h-[96px] hover:-translate-y-1 hover:border-[#ef1b23]/50 hover:shadow-[0_16px_36px_rgba(239,27,35,0.12)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#ef1b23] focus-visible:ring-offset-2 ${
                isVisible
                  ? "translate-y-0 scale-100 opacity-100"
                  : "translate-y-6 scale-[0.97] opacity-0"
              }`}
            >
              <div
  className="core-service-card-shine"
  style={{
    animationDelay: `${index * 140}ms`,
  }}
  aria-hidden="true"
/>
              <div
                className="absolute inset-0 translate-y-full bg-gradient-to-br from-[#ef1b23] to-[#c80e16] transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-y-0"
                aria-hidden="true"
              />

              <div
                className="absolute -right-6 -top-6 h-16 w-16 rounded-full border border-red-100 bg-red-50 transition-all duration-500 group-hover:scale-[1.8] group-hover:border-white/10 group-hover:bg-white/10"
                aria-hidden="true"
              />

              <div className="relative z-10 flex h-full flex-col justify-between">
                <div className="flex items-center justify-between">
                  

                  <span className="grid h-6 w-6 place-items-center rounded-full border border-red-100 bg-red-50 text-[#ef1b23] transition-all duration-500 group-hover:translate-x-0.5 group-hover:border-white group-hover:bg-white">
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      className="h-3 w-3"
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
                </div>

                <h3 className="mt-3 break-words text-[14px] font-extrabold leading-[19px] tracking-[-0.01em] text-zinc-950 transition-colors duration-500 group-hover:text-white sm:text-[15px] sm:leading-5">
                  {service.title}
                </h3>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}