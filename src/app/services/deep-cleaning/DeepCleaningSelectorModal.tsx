"use client";

import Image from "next/image";
import Link from "next/link";
import {
  useEffect,
  useRef,
} from "react";
import { createPortal } from "react-dom";
import styles from "./DeepCleaningSelectorModal.module.css";

type DeepCleaningSelectorModalProps = {
  open: boolean;
  onClose: () => void;
};

const deepCleaningServices = [
  {
    id: "full-home-by-room",
    name: "Full Home / By Room Cleaning",
    icon: "/deep-cleaning/glossy_house_cleaning_icon.png",
  },
  {
    id: "living-bedroom",
    name: "Living & Bedroom Cleaning",
    icon: "/deep-cleaning/glossy_red_home_cleaning_icon.png",
  },
  {
    id: "kitchen-cleaning",
    name: "Kitchen Cleaning",
    icon: "/deep-cleaning/kitchen_cleaning_icon.png",
  },
  {
    id: "bathroom-cleaning",
    name: "Bathroom Cleaning",
    icon: "/deep-cleaning/_bathroom_cleaning_icon.png",
  },
  {
    id: "tank-cleaning",
    name: "Tank Cleaning",
    icon: "/deep-cleaning/tank_cleaning_icon.png",
  },
  {
    id: "industrial-cleaning",
    name: "Industrial Cleaning",
    icon: "/deep-cleaning/factory_cleaning_icon.png",
  },
] as const;

export default function DeepCleaningSelectorModal({
  open,
  onClose,
}: DeepCleaningSelectorModalProps) {
const dialogRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
useEffect(() => {
    if (!open) {
      return;
    }

    const previousOverflow = document.body.style.overflow;
    const previousPaddingRight = document.body.style.paddingRight;

    const scrollbarWidth =
      window.innerWidth - document.documentElement.clientWidth;

    const previousActiveElement =
      document.activeElement instanceof HTMLElement
        ? document.activeElement
        : null;

    document.body.style.overflow = "hidden";

    if (scrollbarWidth > 0) {
      document.body.style.paddingRight = `${scrollbarWidth}px`;
    }

    const focusTimer = window.setTimeout(() => {
      closeButtonRef.current?.focus();
    }, 0);

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        onClose();
        return;
      }

      if (event.key !== "Tab") {
        return;
      }

      const dialog = dialogRef.current;

      if (!dialog) {
        return;
      }

      const focusableElements = Array.from(
        dialog.querySelectorAll<HTMLElement>(
          'button:not([disabled]), a[href], [tabindex]:not([tabindex="-1"])',
        ),
      );

      if (focusableElements.length === 0) {
        return;
      }

      const firstElement = focusableElements[0];
      const lastElement =
        focusableElements[focusableElements.length - 1];

      if (
        event.shiftKey &&
        document.activeElement === firstElement
      ) {
        event.preventDefault();
        lastElement.focus();
      } else if (
        !event.shiftKey &&
        document.activeElement === lastElement
      ) {
        event.preventDefault();
        firstElement.focus();
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      window.clearTimeout(focusTimer);

      document.body.style.overflow = previousOverflow;
      document.body.style.paddingRight =
        previousPaddingRight;

      document.removeEventListener(
        "keydown",
        handleKeyDown,
      );

      previousActiveElement?.focus();
    };
  }, [open, onClose]);

  if (!open || typeof document === "undefined") {
    return null;
  }

  return createPortal(
    <div
      className={styles.overlay}
      role="presentation"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) {
          onClose();
        }
      }}
    >
      <div
        ref={dialogRef}
        className={styles.dialogPositioner}
      >
        <button
          ref={closeButtonRef}
          type="button"
          className={styles.closeButton}
          aria-label="Close Deep Cleaning services"
          onClick={onClose}
        >
          <svg
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path d="M6 6L18 18M18 6L6 18" />
          </svg>
        </button>

        <section
          className={styles.modal}
          role="dialog"
          aria-modal="true"
          aria-labelledby="deep-cleaning-selector-title"
        >
          <h2
            id="deep-cleaning-selector-title"
            className={styles.title}
          >
            Deep Cleaning
          </h2>

          <h3 className={styles.groupTitle}>
            Cleaning
          </h3>

          <div
            className={styles.grid}
            aria-label="Deep Cleaning categories"
          >
            {deepCleaningServices.map((service) => (
              <Link
                key={service.id}
                href={`/services/deep-cleaning?category=${service.id}`}
                className={styles.serviceCard}
                onClick={onClose}
              >
                <span
                  className={styles.imageArea}
                  aria-hidden="true"
                >
                  {service.icon ? (
                    <Image loading="lazy"
                      src={serviceDisplaySource(service.icon)}
                      alt=""
                      width={80}
                      height={80}
                      unoptimized
                      className={styles.serviceIcon}
                    />
                  ) : null}
                </span>

                <span className={styles.serviceName}>
                  {service.name}
                </span>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </div>,
    document.body,
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
