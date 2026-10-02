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
                      <Image loading="lazy"
                        unoptimized
                        src={serviceDisplaySource(categoryIcons[
                            category.id
                          ])}
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

const serviceDisplayImages: Record<string, string> = {
  "/deep-cleaning/carpet_cleaning_service_banner.png": "/deep-cleaning/carpet_cleaning_service_banner_selector.670b11e8a4d0.webp",
  "/deep-cleaning/carpet_cleaning_service_banner.cab129326ee8.webp": "/deep-cleaning/carpet_cleaning_service_banner_selector.670b11e8a4d0.webp",
  "/deep-cleaning/chimney_cleaning_service_banner.png": "/deep-cleaning/chimney_cleaning_service_banner_selector.9056add970c7.webp",
  "/deep-cleaning/chimney_cleaning_service_banner.b361de1ce3f3.webp": "/deep-cleaning/chimney_cleaning_service_banner_selector.9056add970c7.webp",
  "/deep-cleaning/commercial_kitchen_cleaning_service_banner.png": "/deep-cleaning/commercial_kitchen_cleaning_service_banner_selector.261d4e3c4308.webp",
  "/deep-cleaning/commercial_kitchen_cleaning_service_banner.07a5f4aec86e.webp": "/deep-cleaning/commercial_kitchen_cleaning_service_banner_selector.261d4e3c4308.webp",
  "/deep-cleaning/complete_kitchen_cleaning_service_banner.png": "/deep-cleaning/complete_kitchen_cleaning_service_banner_selector.2b11c7ff6a1f.webp",
  "/deep-cleaning/complete_kitchen_cleaning_service_banner.3451d72ce82a.webp": "/deep-cleaning/complete_kitchen_cleaning_service_banner_selector.2b11c7ff6a1f.webp",
  "/deep-cleaning/curtain_cleaning_service_banner.png": "/deep-cleaning/curtain_cleaning_service_banner_selector.fffb98e1293a.webp",
  "/deep-cleaning/curtain_cleaning_service_banner.3172feba647e.webp": "/deep-cleaning/curtain_cleaning_service_banner_selector.fffb98e1293a.webp",
  "/deep-cleaning/dining_table_cleaning_service_banner.png": "/deep-cleaning/dining_table_cleaning_service_banner_selector.2541b42bee88.webp",
  "/deep-cleaning/dining_table_cleaning_service_banner.6d661cf70089.webp": "/deep-cleaning/dining_table_cleaning_service_banner_selector.2541b42bee88.webp",
  "/deep-cleaning/gas_stove_cleaning_service_banner.png": "/deep-cleaning/gas_stove_cleaning_service_banner_selector.9d380f819828.webp",
  "/deep-cleaning/gas_stove_cleaning_service_banner.53ef798b8ca1.webp": "/deep-cleaning/gas_stove_cleaning_service_banner_selector.9d380f819828.webp",
  "/deep-cleaning/leather_sofa_cleaning_service_banner.png": "/deep-cleaning/leather_sofa_cleaning_service_banner_selector.ce1a38fd6c80.webp",
  "/deep-cleaning/leather_sofa_cleaning_service_banner.87a6adbd7552.webp": "/deep-cleaning/leather_sofa_cleaning_service_banner_selector.ce1a38fd6c80.webp",
  "/deep-cleaning/mattress_cleaning_service_banner.png": "/deep-cleaning/mattress_cleaning_service_banner_selector.96fbbb7b9fd9.webp",
  "/deep-cleaning/mattress_cleaning_service_banner.bbdcd57187e2.webp": "/deep-cleaning/mattress_cleaning_service_banner_selector.96fbbb7b9fd9.webp",
  "/deep-cleaning/microwave_cleaning_service_banner.png": "/deep-cleaning/microwave_cleaning_service_banner_selector.14bf3148bffe.webp",
  "/deep-cleaning/microwave_cleaning_service_banner.62646c58f051.webp": "/deep-cleaning/microwave_cleaning_service_banner_selector.14bf3148bffe.webp",
  "/deep-cleaning/sofa_cleaning_service_banner.png": "/deep-cleaning/sofa_cleaning_service_banner_selector.047987886e8f.webp",
  "/deep-cleaning/sofa_cleaning_service_banner.dd84a4808fd7.webp": "/deep-cleaning/sofa_cleaning_service_banner_selector.047987886e8f.webp"
};
function serviceDisplaySource(src: string): string {
  const queryAt = src.indexOf("?");
  const base = queryAt < 0 ? src : src.slice(0, queryAt);
  return serviceDisplayImages[base] ?? src;
}
