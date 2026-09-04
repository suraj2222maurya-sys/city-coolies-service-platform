"use client";

import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";

gsap.registerPlugin(ScrollTrigger);

export default function ElectricalPageMotion() {
  useEffect(() => {
    const root =
      document.querySelector<HTMLElement>(
        "[data-electrical-page]",
      );

    if (!root) {
      return;
    }

    const reducedMotion =
      window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;

    if (reducedMotion) {
      return;
    }

    const compact =
      window.matchMedia(
        "(max-width: 768px)",
      ).matches;

    const desktopFinePointer =
      window.matchMedia(
        "(min-width: 769px) and (pointer: fine)",
      ).matches;

    let lenis: Lenis | null = null;
    let rafId = 0;
    let refreshTimer = 0;

    const batchTriggers: ScrollTrigger[] = [];

    // ==========================================================
    // LIQUID / WATER-LIKE PAGE SCROLL
    // Desktop wheel only.
    // Mobile keeps native touch scrolling.
    // ==========================================================

    if (desktopFinePointer) {
      lenis = new Lenis({
        lerp: 0.075,
        smoothWheel: true,
        wheelMultiplier: 0.88,
        touchMultiplier: 1,
        syncTouch: false,
      });

      lenis.on(
        "scroll",
        ScrollTrigger.update,
      );

      const raf = (time: number) => {
        lenis?.raf(time);

        rafId =
          window.requestAnimationFrame(raf);
      };

      rafId =
        window.requestAnimationFrame(raf);
    }

    // ==========================================================
    // COMMON CINEMATIC REVEAL
    // Scroll DOWN = comes from below.
    // Scroll UP   = comes back from above.
    // ==========================================================

    const revealBatch = (
      elements: HTMLElement[],
      distance = compact ? 20 : 38,
      batchMax = compact ? 2 : 5,
    ) => {
      if (elements.length === 0) {
        return;
      }

      gsap.set(elements, {
        autoAlpha: 0,
        y: distance,
        scale: compact ? 0.99 : 0.975,
        filter: compact
          ? "blur(3px)"
          : "blur(7px)",
        transformOrigin: "50% 60%",
        force3D: true,
        willChange:
          "transform, opacity, filter",
      });

      const triggers =
        ScrollTrigger.batch(
          elements,
          {
            start: "top 92%",
            end: "bottom 8%",

            interval: 0.08,
            batchMax,

            onEnter: (batch) => {
              gsap.to(batch, {
                autoAlpha: 1,
                y: 0,
                scale: 1,
                filter: "blur(0px)",

                duration: compact
                  ? 0.56
                  : 0.76,

                stagger: compact
                  ? 0.055
                  : 0.08,

                ease: "power3.out",
                overwrite: "auto",
                force3D: true,
              });
            },

            onLeave: (batch) => {
              gsap.set(batch, {
                autoAlpha: 0,
                y: compact ? -12 : -20,
                scale: 0.99,
                filter: compact
                  ? "blur(2px)"
                  : "blur(3px)",
              });
            },

            onEnterBack: (batch) => {
              gsap.fromTo(
                batch,
                {
                  autoAlpha: 0,
                  y: compact ? -16 : -28,
                  scale: 0.985,
                  filter: compact
                    ? "blur(3px)"
                    : "blur(6px)",
                },
                {
                  autoAlpha: 1,
                  y: 0,
                  scale: 1,
                  filter: "blur(0px)",

                  duration: compact
                    ? 0.52
                    : 0.7,

                  stagger: compact
                    ? 0.045
                    : 0.07,

                  ease: "power3.out",
                  overwrite: "auto",
                  force3D: true,
                },
              );
            },

            onLeaveBack: (batch) => {
              gsap.set(batch, {
                autoAlpha: 0,
                y: compact ? 16 : 28,
                scale: 0.985,
                filter: compact
                  ? "blur(3px)"
                  : "blur(6px)",
              });
            },
          },
        );

      batchTriggers.push(...triggers);
    };

    const context =
      gsap.context(() => {
        // ======================================================
        // CATEGORY FILTER BUTTONS
        // ======================================================

        const categoryButtons =
          Array.from(
            root.querySelectorAll<HTMLElement>(
              'nav[aria-label="Electrical service categories"] button',
            ),
          );

        revealBatch(
          categoryButtons,
          compact ? 14 : 20,
          compact ? 2 : 6,
        );

        // ======================================================
        // ALL CARDS
        //
        // Electrical service cards
        // Full House Wiring
        // How Booking Works cards
        // Trust strip cards
        // ======================================================

        const allCards =
          Array.from(
            root.querySelectorAll<HTMLElement>(
              "article",
            ),
          );

        revealBatch(
          allCards,
          compact ? 22 : 42,
          compact ? 2 : 5,
        );

        // ======================================================
        // SECTION HEADINGS
        // How Booking Works etc.
        // ======================================================

        const sectionHeadings =
          Array.from(
            root.querySelectorAll<HTMLElement>(
              "h2",
            ),
          );

        sectionHeadings.forEach(
          (heading) => {
            gsap.fromTo(
              heading,
              {
                autoAlpha: 0,
                y: compact ? 16 : 26,
                filter: compact
                  ? "blur(2px)"
                  : "blur(5px)",
                scale: 0.985,
              },
              {
                autoAlpha: 1,
                y: 0,
                filter: "blur(0px)",
                scale: 1,

                duration: compact
                  ? 0.58
                  : 0.78,

                ease: "power3.out",

                scrollTrigger: {
                  trigger: heading,
                  start: "top 90%",
                  end: "bottom 10%",

                  toggleActions:
                    "play reverse play reverse",
                },
              },
            );
          },
        );

        // ======================================================
        // YOUR BOOKING SIDEBAR
        // ======================================================

        const booking =
          root.querySelector<HTMLElement>(
            "aside",
          );

        if (booking) {
          const bookingControls =
            Array.from(
              booking.querySelectorAll<HTMLElement>(
                [
                  "input",
                  "textarea",
                  "select",
                  "button",
                ].join(","),
              ),
            );

          const bookingTimeline =
            gsap.timeline({
              scrollTrigger: {
                trigger: booking,
                start: "top 90%",

                toggleActions:
                  "play none none reverse",
              },
            });

          bookingTimeline.fromTo(
            booking,
            {
              autoAlpha: 0,
              x: compact ? 18 : 44,
              scale: 0.985,
              filter: compact
                ? "blur(3px)"
                : "blur(7px)",
            },
            {
              autoAlpha: 1,
              x: 0,
              scale: 1,
              filter: "blur(0px)",

              duration: compact
                ? 0.58
                : 0.82,

              ease: "power3.out",
              force3D: true,
            },
          );

          if (
            bookingControls.length > 0
          ) {
            bookingTimeline.fromTo(
              bookingControls,
              {
                autoAlpha: 0,
                y: compact ? 8 : 14,
              },
              {
                autoAlpha: 1,
                y: 0,

                duration: 0.4,

                stagger: compact
                  ? 0.025
                  : 0.045,

                ease: "power2.out",
              },
              "-=0.42",
            );
          }
        }

        // ======================================================
        // MOBILE BOTTOM BOOKING BAR
        // ======================================================

        const mobileBookingButton =
          root.querySelector<HTMLElement>(
            '[class*="mobileCartBar"]',
          );

        if (mobileBookingButton) {
          gsap.fromTo(
            mobileBookingButton,
            {
              autoAlpha: 0,
              y: 25,
            },
            {
              autoAlpha: 1,
              y: 0,

              duration: 0.58,
              ease: "power3.out",

              scrollTrigger: {
                trigger:
                  mobileBookingButton,

                start: "top 96%",

                toggleActions:
                  "play none none reverse",
              },
            },
          );
        }
      }, root);

    // ==========================================================
    // DYNAMIC CONTENT
    //
    // Category change
    // Cart changes
    // Mobile booking dialog
    // newly-mounted cards
    // ==========================================================

    const mutationObserver =
      new MutationObserver(
        (records) => {
          const freshElements:
            HTMLElement[] = [];

          records.forEach(
            (record) => {
              record.addedNodes.forEach(
                (node) => {
                  if (
                    !(
                      node instanceof
                      HTMLElement
                    )
                  ) {
                    return;
                  }

                  if (
                    node.matches(
                      'article, [role="dialog"]',
                    )
                  ) {
                    freshElements.push(node);
                  }

                  freshElements.push(
                    ...Array.from(
                      node.querySelectorAll<HTMLElement>(
                        'article, [role="dialog"]',
                      ),
                    ),
                  );
                },
              );
            },
          );

          if (
            freshElements.length === 0
          ) {
            return;
          }

          gsap.fromTo(
            freshElements,
            {
              autoAlpha: 0,
              y: compact ? 14 : 22,
              scale: 0.985,
              filter: compact
                ? "blur(2px)"
                : "blur(5px)",
            },
            {
              autoAlpha: 1,
              y: 0,
              scale: 1,
              filter: "blur(0px)",

              duration: compact
                ? 0.45
                : 0.58,

              stagger: 0.045,
              ease: "power3.out",
              overwrite: "auto",
            },
          );

          window.requestAnimationFrame(
            () => {
              ScrollTrigger.refresh();
            },
          );
        },
      );

    mutationObserver.observe(
      root,
      {
        childList: true,
        subtree: true,
      },
    );

    // ==========================================================
    // REFRESH AFTER IMAGES / LAYOUT SETTLE
    // ==========================================================

    const refresh =
      () => {
        ScrollTrigger.refresh();
      };

    refreshTimer =
      window.setTimeout(
        refresh,
        500,
      );

    window.addEventListener(
      "load",
      refresh,
      {
        once: true,
      },
    );

    // ==========================================================
    // CLEANUP
    // ==========================================================

    return () => {
      mutationObserver.disconnect();

      window.removeEventListener(
        "load",
        refresh,
      );

      if (refreshTimer) {
        window.clearTimeout(
          refreshTimer,
        );
      }

      if (rafId) {
        window.cancelAnimationFrame(
          rafId,
        );
      }

      lenis?.destroy();

      batchTriggers.forEach(
        (trigger) => {
          trigger.kill();
        },
      );

      context.revert();
    };
  }, []);

  return (
    <style jsx global>{`
      /*
       * Lenis smooth-scroll integration.
       * Does not change page design/layout.
       */

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

      /*
       * GPU-friendly rendering only.
       */

      [data-electrical-page] article,
      [data-electrical-page] aside,
      [data-electrical-page] nav button {
        backface-visibility: hidden;
        transform-style: preserve-3d;
      }

      @media (
        prefers-reduced-motion:
        reduce
      ) {
        [data-electrical-page] * {
          scroll-behavior: auto !important;
        }
      }
    `}</style>
  );
}