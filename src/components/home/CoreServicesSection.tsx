"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

type Service = {
  title: string;
  href: string;
  image: string;
};

const services: Service[] = [
  {
    title: "Deep Cleaning",
    href: "/services/deep-cleaning",
    image: "/service-images/deep-cleaning.png",
  },
  {
    title: "Renovation",
    href: "/services/renovation",
    image: "/service-images/renovation.png",
  },
  {
    title: "Electrical Works",
    href: "/services/electrical-works",
    image: "/service-images/electrical-works.png",
  },
  {
    title: "Plumbing Works",
    href: "/services/plumbing-works",
    image: "/service-images/plumbing-works.png",
  },
  {
    title: "Painting Services",
    href: "/services/painting-services",
    image: "/service-images/painting-services.png",
  },
  {
    title: "Civil Construction & Maintenance",
    href: "/services/civil-construction-maintenance",
    image: "/service-images/civil-construction-maintenance.png",
  },
  {
    title: "Appliance Repair",
    href: "/services/appliance-repair",
    image: "/service-images/appliance-repair.png",
  },
  {
    title: "Carpentry & Interior Works",
    href: "/services/carpentry-interior-works",
    image: "/service-images/carpentry-interior-works.png",
  },
  {
    title: "Packers & Movers",
    href: "/services/packers-movers",
    image: "/service-images/packers-movers.png",
  },
  {
    title: "Pest Control",
    href: "/services/pest-control",
    image: "/service-images/pest-control.png",
  },
  {
    title: "Spa & Salon Services",
    href: "/services/spa-salon-services",
    image: "/service-images/spa-salon-services.png",
  },
  {
    title: "Fabrication Works",
    href: "/services/fabrication-works",
    image: "/service-images/fabrication-works.png",
  },
  {
    title: "Gardening & Landscaping",
    href: "/services/gardening-landscaping",
    image: "/service-images/gardening-landscaping.png",
  },
];

export default function CoreServicesSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const animationPlayedRef = useRef(false);
  const previousScrollYRef = useRef(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const section = sectionRef.current;

    if (!section) {
      return;
    }

    previousScrollYRef.current = window.scrollY;

    if (!("IntersectionObserver" in window)) {
      const timer = globalThis.setTimeout(() => {
        animationPlayedRef.current = true;
        setIsVisible(true);
      }, 0);

      return () => {
        globalThis.clearTimeout(timer);
      };
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        const currentScrollY = window.scrollY;
        const scrollingDown =
          currentScrollY >= previousScrollYRef.current;
        const enteringFromTop =
          entry.boundingClientRect.top >= 0;

        previousScrollYRef.current = currentScrollY;

        if (
          entry.isIntersecting &&
          scrollingDown &&
          enteringFromTop &&
          !animationPlayedRef.current
        ) {
          animationPlayedRef.current = true;
          setIsVisible(true);
          observer.disconnect();
        }
      },
      {
        threshold: 0.08,
        rootMargin: "40px 0px -6% 0px",
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
      className="relative scroll-mt-24 overflow-hidden bg-[#fffafa] px-5 pb-12 pt-8 sm:px-8 sm:pb-14 sm:pt-10 lg:px-12 lg:pb-16 lg:pt-12"
    >
      <div
        className="pointer-events-none absolute inset-0"
        aria-hidden="true"
      >
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#ef1b23]/30 to-transparent" />
        <div className="absolute -left-24 top-16 h-52 w-52 rounded-full bg-[#ef1b23]/[0.06] blur-3xl" />
        <div className="absolute -right-24 bottom-0 h-56 w-56 rounded-full bg-red-100/60 blur-3xl" />
        <div className="absolute inset-0 opacity-30 [background-image:radial-gradient(rgba(239,27,35,0.12)_0.7px,transparent_0.7px)] [background-size:22px_22px]" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl">
        <div className="mx-auto flex max-w-4xl flex-col items-center text-center">
          <div
            className={`inline-flex items-center gap-2 rounded-full border border-red-100 bg-white px-5 py-2.5 shadow-[0_8px_24px_rgba(239,27,35,0.08)] transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none ${
              isVisible
                ? "translate-y-0 scale-100 opacity-100 blur-0"
                : "translate-y-5 scale-[0.96] opacity-0 blur-[5px]"
            }`}
          >
            <span className="relative flex h-2.5 w-2.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#ef1b23] opacity-30 motion-reduce:animate-none" />
              <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-[#ef1b23]" />
            </span>

            <span className="text-[11px] font-extrabold uppercase tracking-[0.24em] text-[#ef1b23] sm:text-xs">
              Explore Our Services
            </span>
          </div>

          <h2
            className={`mt-7 max-w-[950px] text-balance text-3xl font-black leading-[1.06] tracking-[-0.045em] text-zinc-950 transition-all delay-[70ms] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none sm:text-4xl lg:text-[48px] ${
              isVisible
                ? "translate-y-0 scale-100 opacity-100 blur-0"
                : "translate-y-8 scale-[0.97] opacity-0 blur-[7px]"
            }`}
          >
            Everything Your Property
            <span className="text-[#ef1b23]"> Needs.</span>
          </h2>

          <div
            aria-hidden="true"
            className={`mt-5 h-[3px] origin-center rounded-full bg-gradient-to-r from-transparent via-[#ef1b23] to-transparent transition-all delay-[130ms] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none ${
              isVisible
                ? "w-24 scale-x-100 opacity-100"
                : "w-0 scale-x-0 opacity-0"
            }`}
          />

          <p
            className={`mt-5 max-w-2xl text-balance text-sm font-medium leading-6 text-zinc-600 transition-all delay-[190ms] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none sm:text-base sm:leading-7 ${
              isVisible
                ? "translate-y-0 opacity-100 blur-0"
                : "translate-y-7 opacity-0 blur-[6px]"
            }`}
          >
            Complete property care solutions for homes, offices,
            commercial spaces, and industrial properties, all managed by
            experienced professionals.
          </p>
        </div>

        <div className="mt-9 grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 sm:gap-x-5 lg:mt-10 lg:grid-cols-4 lg:gap-x-6 xl:grid-cols-5">
          {services.map((service, index) => (
            <div
              key={service.href}
              style={{
                transitionDelay: isVisible
                  ? `${270 + index * 55}ms`
                  : "0ms",
              }}
              className={`min-w-0 transform-gpu transition-all duration-[520ms] ease-[cubic-bezier(0.22,1,0.36,1)] will-change-transform motion-reduce:transition-none ${
                isVisible
                  ? "translate-y-0 scale-100 opacity-100 blur-0"
                  : "translate-y-10 scale-[0.96] opacity-0 blur-[7px]"
              }`}
            >
              <Link
                href={service.href}
                aria-label={`Open ${service.title} service`}
                className="group/image block focus:outline-none focus-visible:ring-2 focus-visible:ring-[#ef1b23] focus-visible:ring-offset-4"
              >
                <div className="relative aspect-square w-full overflow-hidden rounded-[20px] bg-[#fff4f5] shadow-[0_8px_24px_rgba(40,20,22,0.08)]">
                  <Image
                    src={service.image}
                    alt={`${service.title} service by City Coolies`}
                    fill
                    sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, (max-width: 1280px) 25vw, 20vw"
                    className="object-cover transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover/image:scale-[1.025]"
                  />
                </div>
              </Link>

              <Link
                href={service.href}
                className="mt-3 inline-block text-[15px] font-bold leading-5 tracking-[-0.015em] text-zinc-950 transition-colors duration-200 hover:text-[#ef1b23] focus:outline-none focus-visible:text-[#ef1b23] sm:text-base"
              >
                {service.title}
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}