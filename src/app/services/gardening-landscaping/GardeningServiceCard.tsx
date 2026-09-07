"use client";

import Image from "next/image";

import type {
  GardenerBookingService,
} from "@/lib/services/gardeningCatalog";

import styles from "./GardeningMarketplace.module.css";

type Props = {
  service: GardenerBookingService;
  quantity: number;
  onAdd: (serviceId: string) => void;
};

function PlusIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M12 5v14M5 12h14" />
    </svg>
  );
}

export default function GardeningServiceCard({
  service,
  quantity,
  onAdd,
}: Props) {
  return (
    <article
      className={`${styles.card} ${
        quantity > 0 ? styles.cardSelected : ""
      }`}
    >
      <div className={styles.cardMedia}>
        <Image
          src={service.image}
          alt={`${service.name} ${service.option}`}
            width={640}
            height={280}
          sizes="(max-width: 580px) 50vw, (max-width: 1100px) 33vw, 300px"
          className={styles.cardImage}
        />

        <span
          className={
            service.option === "Tools Included"
              ? styles.toolsBadge
              : styles.labourBadge
          }
        >
          {service.option}
        </span>

        {quantity > 0 && (
          <span className={styles.addedBadge}>
            {quantity} Added
          </span>
        )}
      </div>

      <div className={styles.compactBody}>
        <div className={styles.compactHeading}>
          <div>
            <span className={styles.compactDuration}>
              {service.duration}
            </span>

            <h3>{service.name}</h3>
          </div>

          <strong className={styles.compactPrice}>
            {service.priceLabel}
          </strong>
        </div>

        <div className={styles.compactFooter}>
          <span>{service.option}</span>

          <button
            type="button"
            className={styles.addButton}
            onClick={() => onAdd(service.id)}
            aria-label={`Add ${service.name} ${service.option}`}
          >
            <PlusIcon />
            <span>Add</span>
          </button>
        </div>
      </div>
    </article>
  );
}