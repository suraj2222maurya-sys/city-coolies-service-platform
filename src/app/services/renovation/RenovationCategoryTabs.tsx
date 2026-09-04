"use client";

import {
  RENOVATION_CATEGORIES,
  type RenovationFilter,
} from "@/lib/services/renovationCatalog";

import styles from "./RenovationCategoryTabs.module.css";

type Props = {
  value: RenovationFilter;
  onChange: (value: RenovationFilter) => void;
};

export default function RenovationCategoryTabs({
  value,
  onChange,
}: Props) {
  return (
    <div
      className={styles.scroller}
      aria-label="Renovation categories"
    >
      <div
        className={styles.tabs}
        role="tablist"
        aria-label="Renovation service categories"
      >
        {RENOVATION_CATEGORIES.map((category) => {
          const active = value === category;

          return (
            <button
              key={category}
              type="button"
              role="tab"
              aria-selected={active}
              className={
                active
                  ? styles.tabActive
                  : styles.tab
              }
              onClick={() => onChange(category)}
            >
              {category}
            </button>
          );
        })}
      </div>
    </div>
  );
}