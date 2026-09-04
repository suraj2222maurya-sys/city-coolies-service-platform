"use client";

import {
  useEffect,
  useRef,
} from "react";

export function useContactReveal<
  T extends HTMLElement
>() {
  const ref = useRef<T | null>(null);

  useEffect(() => {
    const section = ref.current;

    if (!section) {
      return;
    }

    const reducedMotion =
      window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;

    if (reducedMotion) {
      section.classList.remove("cc-motion");
      section.classList.add("cc-ready");
      return;
    }

    section.classList.add("cc-motion");

    let replayTimer:
      ReturnType<typeof setTimeout> | null =
      null;

    let fallbackTimer:
      ReturnType<typeof setTimeout> | null =
      null;

    const play = () => {
      if (replayTimer) {
        clearTimeout(replayTimer);
      }

      section.classList.remove("cc-ready");

      replayTimer = setTimeout(() => {
        window.requestAnimationFrame(() => {
          section.classList.add("cc-ready");
        });
      }, 35);
    };

    const observer =
      new IntersectionObserver(
        ([entry]) => {
          if (!entry) {
            return;
          }

          if (entry.isIntersecting) {
            play();
          } else {
            section.classList.remove("cc-ready");
          }
        },
        {
          threshold: 0.06,
          rootMargin:
            "70px 0px 70px 0px",
        },
      );

    observer.observe(section);

    /*
     * Initial page-load fallback.
     * Even if IntersectionObserver is delayed,
     * the section can never remain hidden.
     */
    fallbackTimer = setTimeout(() => {
      const rect =
        section.getBoundingClientRect();

      if (
        rect.bottom > 0 &&
        rect.top < window.innerHeight
      ) {
        section.classList.add("cc-ready");
      }
    }, 180);

    return () => {
      observer.disconnect();

      if (replayTimer) {
        clearTimeout(replayTimer);
      }

      if (fallbackTimer) {
        clearTimeout(fallbackTimer);
      }
    };
  }, []);

  return ref;
}