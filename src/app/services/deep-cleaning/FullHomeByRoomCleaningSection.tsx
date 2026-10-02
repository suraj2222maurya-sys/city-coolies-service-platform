"use client";

import Image from "next/image";
import { useState } from "react";
import FullApartmentSection from "./FullApartmentSection";
import FullHomeRightSidebar from "./FullHomeRightSidebar";
import CustomizeCleaningSection from "./CustomizeCleaningSection";
import styles from "./FullHomeByRoomCleaningSection.module.css";

const serviceTypes = [
  {
    id: "full-apartment",
    name: "Full apartment",
    image: "/deep-cleaning/full_apartment_cleaning_small.3b5b8e2f29be.webp",
    alt: "Full apartment cleaning",
    targetId: "full-apartment-section",
    targetLabel: "Full apartment",
  },
  {
    id: "full-bungalow-duplex",
    name: "Full bungalow/duplex",
    image: "/deep-cleaning/full_bungalow_duplex_cleaning_small.345d6559ace2.webp",
    alt: "Full bungalow and duplex cleaning",
    targetId: "full-bungalow-duplex-section",
    targetLabel: "Full bungalow/duplex",
  },
  {
    id: "villa-cleaning",
    name: "Villa Cleaning",
    image: "/deep-cleaning/villa-cleaning.3cd1de793682.webp",
    alt: "Villa cleaning",
    targetId: "villa-cleaning-section",
    targetLabel: "Villa cleaning",
  },
  {
    id: "customize-cleaning",
    name: "Customize Cleaning",
    image: "/deep-cleaning/customize-cleaning.1245db2b4c44.webp",
    alt: "Customize home cleaning",
    targetId: "customize-cleaning-section",
    targetLabel: "Customize Cleaning",
  },
] as const;

type FullHomeByRoomCleaningSectionProps = {
  rating?: number | null;
  bookingsLabel?: string | null;
};

function scrollToServiceTarget(
  targetId: string,
  targetLabel: string,
) {
  const directTarget = document.getElementById(targetId);

  const headingTarget =
    directTarget ??
    Array.from(
      document.querySelectorAll<HTMLElement>(
        "h1, h2, h3, [data-service-scroll-target]",
      ),
    ).find((element) => {
      const text =
        element.textContent
          ?.replace(/\s+/g, " ")
          .trim()
          .toLowerCase() ?? "";

      return text === targetLabel.toLowerCase();
    });

  if (!headingTarget) {
    return;
  }

  const top =
    headingTarget.getBoundingClientRect().top +
    window.scrollY -
    150;

  window.scrollTo({
    top: Math.max(0, top),
    behavior: "smooth",
  });
}
export default function FullHomeByRoomCleaningSection({
  rating = 4.4,
  bookingsLabel = "9 M bookings",
}: FullHomeByRoomCleaningSectionProps) {
  const [furnishingType, setFurnishingType] =
    useState<"furnished" | "unfurnished">("unfurnished");
return (
    <section
      className={styles.pageSection}
      data-rating={rating ?? undefined}
      data-bookings-label={bookingsLabel ?? undefined}
    >
      <aside className={styles.leftColumn}>
        <div className={styles.selectorBox}>
                    <div className={styles.selectorInlineRow}>
<div
            className={styles.homeTypeButtons}
            aria-label="Home furnishing type"
          >
            <button
              type="button"
              aria-pressed={furnishingType === "furnished"}
              className={`${styles.homeTypeButton} ${
                furnishingType === "furnished"
                  ? styles.homeTypeButtonActive
                  : ""
              }`}
              onClick={() => setFurnishingType("furnished")}
            >
              Furnished
            </button>

            <button
              type="button"
              aria-pressed={furnishingType === "unfurnished"}
              className={`${styles.homeTypeButton} ${
                furnishingType === "unfurnished"
                  ? styles.homeTypeButtonActive
                  : ""
              }`}
              onClick={() => setFurnishingType("unfurnished")}
            >
              Unfurnished
            </button>
          </div>
<div className={styles.serviceGrid}>
            {serviceTypes.map((service, index) => (
              <button
                key={service.id}
                type="button"
                onClick={() =>
                  scrollToServiceTarget(
                    service.targetId,
                    service.targetLabel,
                  )
                }
                className={`${styles.serviceItem} ${
                  index === 0 ? styles.serviceItemActive : ""
                }`}
              >
                {service.image ? (
                  <Image loading="eager"
                    src={serviceDisplaySource(service.image)}
                    alt={service.alt}
                    width={192}
                    height={192}
                    unoptimized
                    className={styles.serviceImage}
                  />
                ) : (
                  <span
                    className={`${styles.serviceImage} ${styles.serviceImagePlaceholder}`}
                    aria-hidden="true"
                  />
                )}

                <span className={styles.serviceName}>
                  {service.name}
                </span>
              </button>
            ))}
          </div>
          </div>
        </div>
      </aside>

      <main className={styles.middleColumn}>
        <FullApartmentSection furnishingType={furnishingType} />
              <CustomizeCleaningSection />
      </main>

      <aside className={styles.rightColumn}>
        <FullHomeRightSidebar cartCount={0} />
      </aside>
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
