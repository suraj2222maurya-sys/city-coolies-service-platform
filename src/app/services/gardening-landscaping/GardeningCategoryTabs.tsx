"use client";

import {
  GARDENING_CATEGORIES,
  type GardeningCategory,
} from "@/lib/services/gardeningCatalog";

import styles from "./GardeningCategoryTabs.module.css";

type Props = {
  value: GardeningCategory;
  onChange: (category: GardeningCategory) => void;
};

export default function GardeningCategoryTabs({
  value,
  onChange,
}: Props) {
  function selectCategory(
    category: GardeningCategory,
    button: HTMLButtonElement,
  ) {
    onChange(category);

    button.scrollIntoView({
      behavior: "smooth",
      block: "nearest",
      inline: "center",
    });
  }

  return (
    <section
      id="gardening-services"
      className={styles.section}
      aria-label="Gardening categories"
    >
      <div className={styles.scroller}>
        <div
          className={styles.tabs}
          role="group"
          aria-label="Filter gardening categories"
        >
          {GARDENING_CATEGORIES.map(
            (category, index) => {
              const active = value === category;

              return (
                <button
                  key={category}
                  type="button"
                  aria-pressed={active}
                  className={
                    active
                      ? styles.activeButton
                      : styles.button
                  }
                  style={{
                    animationDelay: `${index * 45}ms`,
                  }}
                  onClick={(event) =>
                    selectCategory(
                      category,
                      event.currentTarget,
                    )
                  }
                >
                  <span>{category}</span>
                </button>
              );
            },
          )}
        </div>
      </div>
    </section>
  );
}