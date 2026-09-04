"use client";

import Image from "next/image";
import { useMemo, useState } from "react";

import ServiceBookingModal from "@/components/booking/ServiceBookingModal";
import {
  RENOVATION_SERVICES,
  RENOVATION_SURVEY_FEE,
  type RenovationFilter,
} from "@/lib/services/renovationCatalog";

import RenovationCategoryTabs from "./RenovationCategoryTabs";
import RenovationServiceCard from "./RenovationServiceCard";

import styles from "./RenovationMarketplace.module.css";

function ThumbnailPlaceholder() {
  return (
    <svg viewBox="0 0 36 36" aria-hidden="true">
      <path d="m5 18 13-11 13 11" />
      <path d="M9 16v14h18V16" />
      <path d="M14 30v-8h8v8" />
    </svg>
  );
}

export default function RenovationMarketplace() {
  const [activeCategory, setActiveCategory] =
    useState<RenovationFilter>("All");

  const [selectedIds, setSelectedIds] =
    useState<string[]>([]);

  const visibleServices = useMemo(() => {
    if (activeCategory === "All") {
      return RENOVATION_SERVICES;
    }

    return RENOVATION_SERVICES.filter(
      (service) => service.category === activeCategory,
    );
  }, [activeCategory]);

  const selectedServices = useMemo(
    () =>
      RENOVATION_SERVICES.filter((service) =>
        selectedIds.includes(service.id),
      ),
    [selectedIds],
  );

  function toggleService(serviceId: string) {
    setSelectedIds((current) =>
      current.includes(serviceId)
        ? current.filter((id) => id !== serviceId)
        : [...current, serviceId],
    );
  }

  return (
    <section
      id="renovation-services"
      className={styles.marketplace}
      aria-label="Renovation services"
    >
      <RenovationCategoryTabs
        value={activeCategory}
        onChange={setActiveCategory}
      />

      <div className={styles.layout}>
        <div className={styles.grid}>
          {visibleServices.map((service, index) => (
            <RenovationServiceCard
              key={service.id}
              service={service}
              selected={selectedIds.includes(service.id)}
                            priority={index < 4}
onToggle={toggleService}
            />
          ))}
        </div>

        <aside
          className={styles.booking}
          aria-label="Your renovation booking"
        >
          <div className={styles.bookingTop}>
            <div>
              <span>YOUR BOOKING</span>
              <strong>Selected Renovation Works</strong>
            </div>

            {selectedServices.length > 0 && (
              <span className={styles.itemCount}>
                {selectedServices.length}{" "}
                {selectedServices.length === 1 ? "Item" : "Items"}
              </span>
            )}
          </div>

          {selectedServices.length > 0 ? (
            <div className={styles.selectedCard}>
              {selectedServices.map((service) => (
                <article
                  key={service.id}
                  className={styles.selectedItem}
                >
                  <div className={styles.selectedThumb}>
                    {service.image ? (
                      <Image
                        src={service.image}
                        alt={service.name}
                        fill
                        sizes="54px"
                        className={styles.selectedImage}
                      />
                    ) : (
                      <ThumbnailPlaceholder />
                    )}
                  </div>

                  <div className={styles.selectedCopy}>
                    <strong>{service.name}</strong>
                    <small>{service.priceLabel}</small>
                  </div>

                  <button
                    type="button"
                    className={styles.selectedRemove}
                    aria-label={`Remove ${service.name}`}
                    onClick={() => toggleService(service.id)}
                  >
                    ×
                  </button>
                </article>
              ))}
            </div>
          ) : (
            <div className={styles.emptySelection}>
              <span>+</span>

              <div>
                <strong>Select renovation work</strong>
                <p>Added services will appear here.</p>
              </div>
            </div>
          )}

          <div className={styles.bookingAction}>
            {selectedServices.length > 0 ? (
              <ServiceBookingModal
                packageId="renovation-site-survey"
                serviceName="Renovation Service Booking"
                originalPrice={RENOVATION_SURVEY_FEE}
                offerPrice={RENOVATION_SURVEY_FEE}
                fullPayment
                triggerLabel="Book Service"
                customServices={selectedServices.map((service) => ({
                  id: service.id,
                  name: service.name,
                  quantity: 1,
                  unitPrice: 0,
                  lineTotal: 0,
                }))}
              />
            ) : (
              <button
                type="button"
                className={styles.bookButton}
                disabled
              >
                Book Service
              </button>
            )}
          </div>
        </aside>
      </div>
    </section>
  );
}
