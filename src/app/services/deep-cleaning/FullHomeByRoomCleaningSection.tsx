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
    image: "/deep-cleaning/full_apartment_cleaning_small.png",
    alt: "Full apartment cleaning",
    targetId: "full-apartment-section",
    targetLabel: "Full apartment",
  },
  {
    id: "full-bungalow-duplex",
    name: "Full bungalow/duplex",
    image: "/deep-cleaning/full_bungalow_duplex_cleaning_small.png",
    alt: "Full bungalow and duplex cleaning",
    targetId: "full-bungalow-duplex-section",
    targetLabel: "Full bungalow/duplex",
  },
  {
    id: "villa-cleaning",
    name: "Villa Cleaning",
    image: "/deep-cleaning/villa-cleaning.png",
    alt: "Villa cleaning",
    targetId: "villa-cleaning-section",
    targetLabel: "Villa cleaning",
  },
  {
    id: "customize-cleaning",
    name: "Customize Cleaning",
    image: "/deep-cleaning/customize-cleaning.png",
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
                  <Image
                    src={service.image}
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







