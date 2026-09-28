"use client";

import { useState } from "react";
import styles from "./SpaSalonMarketplace.module.css";

type Category = "women" | "men";

const categories: { id: Category; label: string; image: string }[] = [
  { id: "women", label: "Women", image: "/spa-salon/spa-women-icon.png" },
  { id: "men", label: "Men", image: "/spa-salon/spa-men-icon.png" },
];

export default function SpaSalonMarketplace() {
  const [selected, setSelected] = useState<Category>("women");

  return (
    <main className={styles.section}>
      <div className={styles.container}>
        <h1 className={styles.heading}>Spa &amp; Salon</h1>
        <h2 className={styles.selectorTitle}>Select a spa &amp; salon service</h2>
        <div className={styles.selector} role="group" aria-label="Choose spa and salon category">
          {categories.map((category) => (
            <button
              key={category.id}
              type="button"
              className={`${styles.category} ${selected === category.id ? styles.active : ""}`}
              aria-pressed={selected === category.id}
              onClick={() => setSelected(category.id)}
            >
              <img src={category.image} alt="" width={100} height={100} />
              <span>{category.label}</span>
            </button>
          ))}
        </div>
        <section className={styles.content} aria-live="polite">
          <h2>{selected === "women" ? "Women" : "Men"}</h2>
          <div id={selected === "women" ? "women-services" : "men-services"} />
        </section>
      </div>
    </main>
  );
}
