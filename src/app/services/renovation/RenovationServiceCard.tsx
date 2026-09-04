"use client";

import Image from "next/image";

import type {
  RenovationService,
} from "@/lib/services/renovationCatalog";

import styles from "./RenovationMarketplace.module.css";

type Props = {
  service: RenovationService;
  selected: boolean;
  priority?: boolean;
  onToggle: (serviceId: string) => void;
};

function RenovationPlaceholderIcon() {
  return (
    <svg viewBox="0 0 40 40" aria-hidden="true">
      <path d="M6 20 20 8l14 12" />
      <path d="M10 18v15h20V18" />
      <path d="M16 33V23h8v10" />
    </svg>
  );
}

export default function RenovationServiceCard({
  service,
  selected,
  priority = false,
  onToggle,
}: Props) {
  return (
    <article
      className={`${styles.card} ${
        selected ? styles.cardSelected : ""
      }`}
    >
      <div className={styles.cardMedia}>
        {service.image ? (
          <Image
            src={service.image}
            alt={service.name}
            fill
            sizes="(max-width: 620px) 50vw, (max-width: 1200px) 33vw, 220px"
            loading={priority ? "eager" : "lazy"}
            fetchPriority={priority ? "high" : "auto"}
            className={styles.cardImage}
          />
        ) : (
          <span className={styles.placeholderIcon}>
            <RenovationPlaceholderIcon />
          </span>
        )}
      </div>

      <div className={styles.cardBody}>
        <h3>{service.name}</h3>

        <p className={styles.cardSurveyNote}>
          {service.finalNote ?? "Final rate after site survey."}
        </p>

        <div className={styles.cardBottom}>
          <div className={styles.visibleRate}>
            <strong>{service.priceLabel}</strong>
          </div>

          <button
            type="button"
            className={
              selected
                ? styles.removeButton
                : styles.addButton
            }
            onClick={() => onToggle(service.id)}
            aria-pressed={selected}
          >
            {selected ? "−" : "+ Add"}
          </button>
        </div>
      </div>
    </article>
  );
}