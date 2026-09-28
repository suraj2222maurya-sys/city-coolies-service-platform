"use client";

import Image from "next/image";
import {
  useEffect,
  useState,
} from "react";
import {
  usePathname,
  useRouter,
} from "next/navigation";

import BathroomCleaningSection from "./BathroomCleaningSection";
import CobwebCleaningSection from "./CobwebCleaningSection";
import FullHomeByRoomCleaningSection from "./FullHomeByRoomCleaningSection";
import IndustrialCleaningSection from "./IndustrialCleaningSection";
import KitchenCleaningSection from "./KitchenCleaningSection";
import LivingBedroomCleaningSection from "./LivingBedroomCleaningSection";
import TankCleaningSection from "./TankCleaningSection";

import {
  deepCleaningCategories,
  type DeepCleaningCategoryId,
} from "./deepCleaningCategories";

import styles from "./DeepCleaningMarketplace.module.css";

type DeepCleaningMarketplaceProps = {
  initialCategory?: string;
};

const categoryIcons: Record<
  DeepCleaningCategoryId,
  string
> = {
  "full-home-by-room":
    "/deep-cleaning/glossy_house_cleaning_icon.png",

  "living-bedroom":
    "/deep-cleaning/glossy_red_home_cleaning_icon.png",

  "kitchen-cleaning":
    "/deep-cleaning/kitchen_cleaning_icon.png",

  "bathroom-cleaning":
    "/deep-cleaning/_bathroom_cleaning_icon.png",

  "tank-cleaning":
    "/deep-cleaning/tank_cleaning_icon.png",

  "industrial-cleaning":
    "/deep-cleaning/factory_cleaning_icon.png",
  "cobweb-cleaning": "/deep-cleaning/cobweb_cleaning_icon1.png",
};

function isDeepCleaningCategoryId(
  value: string | undefined,
): value is DeepCleaningCategoryId {
  return deepCleaningCategories.some(
    (category) => category.id === value,
  );
}

function resolveCategory(
  value: string | undefined,
): DeepCleaningCategoryId {
  if (isDeepCleaningCategoryId(value)) {
    return value;
  }

  return "full-home-by-room";
}

export default function DeepCleaningMarketplace({
  initialCategory,
}: DeepCleaningMarketplaceProps) {
  const router = useRouter();
  const pathname = usePathname();

  const resolvedInitialCategory =
    resolveCategory(initialCategory);

  const [activeCategory, setActiveCategory] =
    useState<DeepCleaningCategoryId>(
      resolvedInitialCategory,
    );

  useEffect(() => {
    setActiveCategory(resolvedInitialCategory);
  }, [resolvedInitialCategory]);

  const selectCategory = (
    category: DeepCleaningCategoryId,
  ) => {
    if (category === activeCategory) {
      return;
    }

    setActiveCategory(category);

    const params = new URLSearchParams(
      window.location.search,
    );

    params.set("category", category);

    const query = params.toString();

    router.replace(
      query
        ? `${pathname}?${query}`
        : pathname,
      {
        scroll: false,
      },
    );
  };

  return (
    <section
      className={styles.section}
      aria-labelledby="deep-cleaning-title"
    >
      <div className={styles.container}>


        <nav
          className={styles.selectorPanel}
          aria-label="Deep cleaning services"
        >
          <div className={styles.selectorHeading}>
            Select a cleaning service
          </div>

          <div className={styles.categoryGrid}>
            {deepCleaningCategories.map(
              (category) => {
                const isActive =
                  activeCategory === category.id;

                return (
                  <button
                    key={category.id}
                    type="button"
                    className={`${styles.categoryButton} ${
                      isActive
                        ? styles.categoryButtonActive
                        : ""
                    }`}
                    aria-pressed={isActive}
                    onClick={() =>
                      selectCategory(category.id)
                    }
                  >
                    <span
                      className={styles.iconArea}
                      aria-hidden="true"
                    >
                      <Image
                        unoptimized
                        src={
                          categoryIcons[
                            category.id
                          ]
                        }
                        alt=""
                        width={88}
                        height={88}
                        sizes="(max-width: 539px) 58px, (max-width: 899px) 68px, 76px"
                        className={
                          styles.categoryIcon
                        }
                      />
                    </span>

                    <span
                      className={
                        styles.categoryName
                      }
                    >
                      {category.name}
                    </span>
                  </button>
                );
              },
            )}
          </div>
        </nav>

        <div className={styles.contentDivider} />

        <div className={styles.contentArea}>
          {activeCategory ===
            "full-home-by-room" && (
            <FullHomeByRoomCleaningSection />
          )}

          {activeCategory ===
            "living-bedroom" && (
            <LivingBedroomCleaningSection />
          )}

          {activeCategory ===
            "kitchen-cleaning" && (
            <KitchenCleaningSection />
          )}

          {activeCategory ===
            "bathroom-cleaning" && (
            <BathroomCleaningSection />
          )}

          {activeCategory ===
            "tank-cleaning" && (
            <TankCleaningSection />
          )}

          {activeCategory ===
            "industrial-cleaning" && (
            <IndustrialCleaningSection />
          )}

          {activeCategory === "cobweb-cleaning" && (
            <CobwebCleaningSection />
          )}
        </div>
      </div>
    </section>
  );
}