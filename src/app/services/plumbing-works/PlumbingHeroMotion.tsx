"use client";

import { useLayoutEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";

gsap.registerPlugin(ScrollTrigger);

export default function PlumbingHeroMotion() {
  useLayoutEffect(() => {
    const page =
      document.querySelector<HTMLElement>(
        "[data-plumbing-works-page]",
      );

    const hero =
      page?.querySelector<HTMLElement>(
        "[data-plumbing-hero]",
      );

    if (!page || !hero) {
      return;
    }

    const reducedMotion =
      window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;

    if (reducedMotion) {
      return;
    }

    const desktopFinePointer =
      window.matchMedia(
        "(min-width: 761px) and (pointer: fine)",
      ).matches;

    const visual =
      hero.querySelector<HTMLElement>(
        "[data-plumbing-visual]",
      );

    const breadcrumb =
      hero.querySelector<HTMLElement>(
        "[data-plumbing-breadcrumb]",
      );

    const eyebrow =
      hero.querySelector<HTMLElement>(
        "[data-plumbing-eyebrow]",
      );

    const titleFirst =
      hero.querySelector<HTMLElement>(
        "[data-plumbing-title-first]",
      );

    const titleSecond =
      hero.querySelector<HTMLElement>(
        "[data-plumbing-title-second]",
      );

    const description =
      hero.querySelector<HTMLElement>(
        "[data-plumbing-description]",
      );

    const badges =
      Array.from(
        hero.querySelectorAll<HTMLElement>(
          "[data-plumbing-badge]",
        ),
      );

    const search =
      hero.querySelector<HTMLElement>(
        "[data-plumbing-search]",
      );

    if (
      !visual ||
      !breadcrumb ||
      !eyebrow ||
      !titleFirst ||
      !titleSecond ||
      !description ||
      !search
    ) {
      return;
    }

    const animatedElements = [
      visual,
      breadcrumb,
      eyebrow,
      titleFirst,
      titleSecond,
      description,
      ...badges,
      search,
    ];

    let timeline:
      gsap.core.Timeline | null = null;

    let scrollTrigger:
      ReturnType<
        typeof ScrollTrigger.create
      > | null = null;

    let lenis: Lenis | null = null;
    let lenisFrame = 0;
    let initialFrame = 0;
    let refreshTimer = 0;
    let heroIsVisible = false;

    const playAnimation = (
      direction: 1 | -1,
    ) => {
      timeline?.kill();

      const offset =
        direction === 1 ? 24 : -24;

      gsap.set(visual, {
        autoAlpha: 0.55,
        filter: "blur(6px)",
      });

      gsap.set(breadcrumb, {
        autoAlpha: 0,
        y: offset * 0.45,
        filter: "blur(3px)",
      });

      gsap.set(eyebrow, {
        autoAlpha: 0,
        y: offset * 0.55,
        clipPath: "inset(0 100% 0 0)",
        filter: "blur(3px)",
      });

      gsap.set([titleFirst, titleSecond], {
        autoAlpha: 0,
        y: offset,
        clipPath: "inset(0 100% 0 0)",
        filter: "blur(5px)",
      });

      gsap.set(description, {
        autoAlpha: 0,
        y: offset * 0.65,
        clipPath: "inset(0 100% 0 0)",
        filter: "blur(3px)",
      });

      gsap.set(badges, {
        autoAlpha: 0,
        y: offset,
        scale: 0.94,
        filter: "blur(4px)",
      });

      gsap.set(search, {
        autoAlpha: 0,
        y: offset,
        filter: "blur(5px)",
      });

      timeline =
        gsap.timeline({
          defaults: {
            ease: "power3.out",
          },

          onComplete: () => {
            gsap.set(animatedElements, {
              clearProps:
                "opacity,visibility,transform,filter,clipPath",
            });
          },
        });

      timeline.to(
        visual,
        {
          autoAlpha: 1,
          filter: "blur(0px)",
          duration: 0.72,
          ease: "power2.out",
        },
        0,
      );

      timeline.to(
        breadcrumb,
        {
          autoAlpha: 1,
          y: 0,
          filter: "blur(0px)",
          duration: 0.38,
        },
        0.08,
      );

      timeline.to(
        eyebrow,
        {
          autoAlpha: 1,
          y: 0,
          clipPath: "inset(0 0% 0 0)",
          filter: "blur(0px)",
          duration: 0.48,
        },
        0.28,
      );

      timeline.to(
        titleFirst,
        {
          autoAlpha: 1,
          y: 0,
          clipPath: "inset(0 0% 0 0)",
          filter: "blur(0px)",
          duration: 0.58,
          ease: "power4.out",
        },
        0.54,
      );

      timeline.to(
        titleSecond,
        {
          autoAlpha: 1,
          y: 0,
          clipPath: "inset(0 0% 0 0)",
          filter: "blur(0px)",
          duration: 0.58,
          ease: "power4.out",
        },
        0.89,
      );

      timeline.to(
        description,
        {
          autoAlpha: 1,
          y: 0,
          clipPath: "inset(0 0% 0 0)",
          filter: "blur(0px)",
          duration: 0.48,
        },
        1.24,
      );

      timeline.to(
        badges,
        {
          autoAlpha: 1,
          y: 0,
          scale: 1,
          filter: "blur(0px)",
          duration: 0.48,
          stagger: 0.16,
          ease: "back.out(1.35)",
        },
        1.51,
      );

      timeline.to(
        search,
        {
          autoAlpha: 1,
          y: 0,
          filter: "blur(0px)",
          duration: 0.62,
          ease: "expo.out",
        },
        1.88,
      );
    };

    scrollTrigger =
      ScrollTrigger.create({
        trigger: hero,
        start: "top 92%",
        end: "bottom 8%",

        onEnter: () => {
          heroIsVisible = true;
          playAnimation(1);
        },

        onEnterBack: () => {
          heroIsVisible = true;
          playAnimation(-1);
        },

        onLeave: () => {
          heroIsVisible = false;
        },

        onLeaveBack: () => {
          heroIsVisible = false;
        },
      });

    initialFrame =
      window.requestAnimationFrame(() => {
        ScrollTrigger.refresh();

        const rectangle =
          hero.getBoundingClientRect();

        const isVisible =
          rectangle.top <
            window.innerHeight * 0.94 &&
          rectangle.bottom >
            window.innerHeight * 0.06;

        if (isVisible && !heroIsVisible) {
          heroIsVisible = true;
          playAnimation(1);
        }
      });

    if (desktopFinePointer) {
      lenis =
        new Lenis({
          lerp: 0.075,
          smoothWheel: true,
          wheelMultiplier: 0.9,
          touchMultiplier: 1,
          syncTouch: false,
        });

      lenis.on(
        "scroll",
        ScrollTrigger.update,
      );

      const smoothScrollFrame = (
        time: number,
      ) => {
        lenis?.raf(time);

        lenisFrame =
          window.requestAnimationFrame(
            smoothScrollFrame,
          );
      };

      lenisFrame =
        window.requestAnimationFrame(
          smoothScrollFrame,
        );
    }

    const refresh =
      () => ScrollTrigger.refresh();

    refreshTimer =
      window.setTimeout(
        refresh,
        400,
      );

    window.addEventListener(
      "load",
      refresh,
      {
        once: true,
      },
    );

    return () => {
      window.removeEventListener(
        "load",
        refresh,
      );

      if (initialFrame) {
        window.cancelAnimationFrame(
          initialFrame,
        );
      }

      if (lenisFrame) {
        window.cancelAnimationFrame(
          lenisFrame,
        );
      }

      if (refreshTimer) {
        window.clearTimeout(
          refreshTimer,
        );
      }

      scrollTrigger?.kill();
      timeline?.kill();
      lenis?.destroy();

      gsap.set(animatedElements, {
        clearProps:
          "opacity,visibility,transform,filter,clipPath",
      });
    };
  }, []);

  return (
    <style jsx global>{`
      html.lenis,
      html.lenis body {
        height: auto;
      }

      .lenis.lenis-smooth {
        scroll-behavior: auto !important;
      }

      .lenis.lenis-stopped {
        overflow: hidden;
      }

      @media (prefers-reduced-motion: reduce) {
        [data-plumbing-works-page] * {
          scroll-behavior: auto !important;
        }
      }
    `}</style>
  );
}
