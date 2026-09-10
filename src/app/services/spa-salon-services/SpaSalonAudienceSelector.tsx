"use client";

import Image from "next/image";
import { useState } from "react";
import WomenSalonServices from "./WomenSalonServices";
import styles from "./SpaSalonAudienceSelector.module.css";

type Audience = "woman" | "man";
type WomenCategory = "all" | "salon" | "spa" | "hair-studio";

const womenCategories: ReadonlyArray<{
  id: WomenCategory;
  label: string;
}> = [
  { id: "all", label: "All" },
  { id: "salon", label: "Salon for Women" },
  { id: "spa", label: "Spa for Women" },
  { id: "hair-studio", label: "Hair Studio for Women" },
];

export default function SpaSalonAudienceSelector() {
  const [selected, setSelected] = useState<Audience>("woman");
  const [showWomenCategories, setShowWomenCategories] = useState(true);
  const [womenCategory, setWomenCategory] =
    useState<WomenCategory>("all");

  const selectAudience = (audience: Audience) => {
    setSelected(audience);
    setShowWomenCategories(audience === "woman");

    if (audience === "woman") {
      setWomenCategory("all");
    }

    window.dispatchEvent(
      new CustomEvent("spa-audience-change", { detail: { audience } }),
    );
  };

  const selectWomenCategory = (category: WomenCategory) => {
    setWomenCategory(category);
    window.dispatchEvent(
      new CustomEvent("spa-women-category-change", {
        detail: { category },
      }),
    );
  };

  const showSalonServices =
    showWomenCategories &&
    selected === "woman" &&
    (womenCategory === "all" || womenCategory === "salon");

  return (
    <section className={styles.section} aria-label="Choose spa and salon services">
      <div className={styles.buttons}>
        <button
          type="button"
          className={`${styles.button} ${selected === "woman" ? styles.active : ""}`}
          aria-pressed={selected === "woman"}
          onClick={() => selectAudience("woman")}
        >
          <Image
            src="/city-coolies-spa-women-icon-transparent.png"
            alt="Spa and salon services for women"
            width={512}
            height={512}
            className={styles.icon}
          />
          <span>Spa &amp; Salon for Women</span>
        </button>

        <button
          type="button"
          className={`${styles.button} ${selected === "man" ? styles.active : ""}`}
          aria-pressed={selected === "man"}
          onClick={() => selectAudience("man")}
        >
          <Image
            src="/city-coolies-spa-men-icon-transparent.png"
            alt="Spa and salon services for men"
            width={512}
            height={512}
            className={styles.icon}
          />
          <span>Spa &amp; Salon for Men</span>
        </button>
      </div>

      {showWomenCategories && selected === "woman" ? (
        <div className={styles.womenCategories} aria-label="Women service categories">
          {womenCategories.map((category) => (
            <button
              key={category.id}
              type="button"
              className={`${styles.categoryButton} ${
                womenCategory === category.id ? styles.categoryActive : ""
              }`}
              aria-pressed={womenCategory === category.id}
              onClick={() => selectWomenCategory(category.id)}
            >
              {category.label}
            </button>
          ))}
        </div>
      ) : null}

      {showSalonServices ? <WomenSalonServices /> : null}
    </section>
  );
}