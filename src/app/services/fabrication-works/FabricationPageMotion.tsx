"use client";

import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function FabricationPageMotion() {
  useEffect(() => {
    const root = document.querySelector<HTMLElement>("[data-fabrication-page]");
    if (!root || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    gsap.registerPlugin(ScrollTrigger);

    const context = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>("[data-fab-reveal]").forEach((element) => {
        gsap.fromTo(
          element,
          { autoAlpha: 0, y: 22 },
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.62,
            ease: "power2.out",
            scrollTrigger: {
              trigger: element,
              start: "top 92%",
              once: true,
            },
          },
        );
      });

      ScrollTrigger.batch("[data-fab-card]", {
        start: "top 94%",
        once: true,
        onEnter: (cards) =>
          gsap.fromTo(
            cards,
            { autoAlpha: 0, y: 18 },
            {
              autoAlpha: 1,
              y: 0,
              duration: 0.42,
              stagger: 0.035,
              ease: "power2.out",
            },
          ),
      });
    }, root);

    return () => context.revert();
  }, []);

  return null;
}
