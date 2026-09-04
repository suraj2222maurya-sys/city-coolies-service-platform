"use client";

import Image from "next/image";

import type { FabricationService } from "@/lib/services/fabricationCatalog";
import styles from "./FabricationWorks.module.css";

type Props = {
  service: FabricationService;
  selected: boolean;
  onToggle: (serviceId: string) => void;
};

function PlaceholderIcon() {
  return (
    <svg viewBox="0 0 32 32" aria-hidden="true">
      <path d="M7 24 22 9" />
      <path d="m19 6 7 7" />
      <path d="M5 27h9" />
      <path d="m10 19 4 4" />
    </svg>
  );
}

export default function FabricationServiceCard({
  service,
  selected,
  onToggle,
}: Props) {
  return (
    <article
      className={`${styles.serviceCard} ${
        selected ? styles.serviceCardSelected : ""
      }`}
      data-fab-card
    >
      <div className={styles.cardMedia}>
        {service.image ? (
          <Image
            src={service.image}
            alt={service.name}
            fill
            sizes="(max-width: 520px) 50vw, (max-width: 1100px) 33vw, 230px"
            className={styles.cardImage}
          />
        ) : (
          <span className={styles.imagePlaceholder}>
            <PlaceholderIcon />
          </span>
        )}
      </div>

      <div className={styles.cardContent}>
        <div className={styles.cardMeta}>
          <span>{service.category}</span>
          <small>{service.unit}</small>
        </div>

        <h3>{service.name}</h3>

        <p>{service.description}</p>

        <div className={styles.cardBottom}>
          <div className={styles.cardPrice}>
            <small>
              {service.price === "Final Quote"
                ? "Quotation"
                : "Indicative Rate"}
            </small>

            <strong>{service.price}</strong>
          </div>

          <button
            type="button"
            className={selected ? styles.minusButton : styles.addButton}
            onClick={() => onToggle(service.id)}
            aria-pressed={selected}
            aria-label={
              selected
                ? `Remove ${service.name}`
                : `Add ${service.name}`
            }
          >
            {selected ? "−" : "Add"}
          </button>
        </div>
      </div>
    </article>
  );
}
