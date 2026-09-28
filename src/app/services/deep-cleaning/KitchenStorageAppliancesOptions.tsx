"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";

import styles from "./KitchenStorageAppliancesOptions.module.css";

type KitchenOptionId =
  | "cabinet-interior"
  | "chimney"
  | "refrigerator"
  | "microwave"
  | "gas-stove"
  | "air-fryer"
  | "otg"
  | "sandwich-griller";

type KitchenOption = {
  id: KitchenOptionId;
  label: string;
  price: number;
};

const kitchenOptions: ReadonlyArray<KitchenOption> = [
  {
    id: "cabinet-interior",
    label: "Kitchen cabinet interior",
    price: 349,
  },
  {
    id: "chimney",
    label: "Chimney cleaning",
    price: 399,
  },
  {
    id: "refrigerator",
    label: "Refrigerator cleaning",
    price: 399,
  },
  {
    id: "microwave",
    label: "Microwave cleaning",
    price: 199,
  },
  {
    id: "gas-stove",
    label: "Gas stove / hob cleaning",
    price: 99,
  },
  {
    id: "air-fryer",
    label: "Air fryer cleaning",
    price: 199,
  },
  {
    id: "otg",
    label: "OTG cleaning",
    price: 399,
  },
  {
    id: "sandwich-griller",
    label: "Sandwich maker / griller",
    price: 99,
  },
];

// CITY_COOLIES_KITCHEN_SELECTION_V2
type KitchenSelection = {
  id: string;
  label: string;
  price: number;
};

type KitchenStorageAppliancesOptionsProps = {
  selectedOptions: KitchenSelection[];
  onChange: (options: KitchenSelection[]) => void;
};

export default function KitchenStorageAppliancesOptions({
  selectedOptions,
  onChange,
}: KitchenStorageAppliancesOptionsProps) {
  const scrollerRef =
    useRef<HTMLDivElement>(null);



  const [canScrollLeft, setCanScrollLeft] =
    useState(false);

  const [canScrollRight, setCanScrollRight] =
    useState(true);

  const updateScrollState = useCallback(() => {
    const element = scrollerRef.current;

    if (!element) {
      return;
    }

    const maxScroll =
      element.scrollWidth - element.clientWidth;

    setCanScrollLeft(element.scrollLeft > 2);

    setCanScrollRight(
      element.scrollLeft < maxScroll - 2,
    );
  }, []);

  useEffect(() => {
    const element = scrollerRef.current;

    if (!element) {
      return;
    }

    const frame = window.requestAnimationFrame(
      updateScrollState,
    );

    element.addEventListener(
      "scroll",
      updateScrollState,
      {
        passive: true,
      },
    );

    window.addEventListener(
      "resize",
      updateScrollState,
    );

    return () => {
      window.cancelAnimationFrame(frame);

      element.removeEventListener(
        "scroll",
        updateScrollState,
      );

      window.removeEventListener(
        "resize",
        updateScrollState,
      );
    };
  }, [updateScrollState]);

  const toggleOption = (id: KitchenOptionId) => {
    const option = kitchenOptions.find(item => item.id === id);
    if (!option) return;

    onChange(
      selectedOptions.some(item => item.id === id)
        ? selectedOptions.filter(item => item.id !== id)
        : [...selectedOptions, option]
    );
  };

  const scrollOptions = (
    direction: "left" | "right",
  ) => {
    const element = scrollerRef.current;

    if (!element) {
      return;
    }

    const amount =
      Math.max(element.clientWidth * 0.72, 250);

    element.scrollBy({
      left:
        direction === "right"
          ? amount
          : -amount,
      behavior: "smooth",
    });
  };

  return (
    <div className={styles.root}>

      <div className={styles.slider}>
        {canScrollLeft && (
          <button
            type="button"
            className={`${styles.arrow} ${styles.arrowLeft}`}
            aria-label="Show previous kitchen options"
            onClick={() =>
              scrollOptions("left")
            }
          >
            ←
          </button>
        )}

        <div
          ref={scrollerRef}
          className={styles.options}
        >
          {kitchenOptions.map((option) => {
            const selected =
              selectedOptions.some(item => item.id === option.id);

            return (
              <button
                key={option.id}
                type="button"
                className={`${styles.optionCard} ${
                  selected
                    ? styles.selected
                    : ""
                }`}
                aria-pressed={selected}
                onClick={() =>
                  toggleOption(option.id)
                }
              >
                <span className={styles.optionName}>
                  {option.label}
                </span>

                <strong className={styles.price}>
                  ₹
                  {option.price.toLocaleString(
                    "en-IN",
                  )}
                </strong>
              </button>
            );
          })}
        </div>

        {canScrollRight && (
          <button
            type="button"
            className={`${styles.arrow} ${styles.arrowRight}`}
            aria-label="Show more kitchen options"
            onClick={() =>
              scrollOptions("right")
            }
          >
            →
          </button>
        )}
      </div>

    </div>
  );
}


