"use client";

import { useMemo, useState } from "react";

import ServiceBookingModal from "@/components/booking/ServiceBookingModal";
import {
  FABRICATION_CATEGORIES,
  FABRICATION_SERVICES,
  FABRICATION_SURVEY_FEE,
  type FabricationCategory,
} from "@/lib/services/fabricationCatalog";

import FabricationServiceCard from "./FabricationServiceCard";
import styles from "./FabricationWorks.module.css";

export default function FabricationMarketplace() {
  const [activeCategory, setActiveCategory] =
    useState<FabricationCategory>("All");

  const [selectedIds, setSelectedIds] =
    useState<string[]>([]);

  const visibleServices = useMemo(() => {
    if (activeCategory === "All") {
      return FABRICATION_SERVICES;
    }

    return FABRICATION_SERVICES.filter(
      (service) => service.category === activeCategory,
    );
  }, [activeCategory]);

  const selectedServices = useMemo(
    () =>
      FABRICATION_SERVICES.filter((service) =>
        selectedIds.includes(service.id),
      ),
    [selectedIds],
  );

  const customServices = useMemo(
    () =>
      selectedServices.map((service) => ({
        id: service.id,
        name: service.name,
        quantity: 1,
        unitPrice: 0,
        lineTotal: 0,
      })),
    [selectedServices],
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
      className={styles.marketplace}
      id="fabrication-catalog"
      aria-label="Fabrication works"
    >
      <div
        className={styles.categoryRail}
        role="tablist"
        aria-label="Fabrication categories"
        data-fab-reveal
      >
        {FABRICATION_CATEGORIES.map((category) => (
          <button
            key={category}
            type="button"
            role="tab"
            aria-selected={activeCategory === category}
            className={
              activeCategory === category
                ? styles.activeCategory
                : ""
            }
            onClick={() => setActiveCategory(category)}
          >
            {category}
          </button>
        ))}
      </div>

      <div className={styles.marketGrid}>
        <div className={styles.serviceGrid}>
          {visibleServices.map((service) => (
            <FabricationServiceCard
              key={service.id}
              service={service}
              selected={selectedIds.includes(service.id)}
              onToggle={toggleService}
            />
          ))}
        </div>

        <aside
          className={styles.bookingPanel}
          aria-label="Fabrication booking"
          data-fab-reveal
        >
          <header className={styles.bookingHeader}>
            <div>
              <span>YOUR BOOKING</span>

              <strong>
                {selectedServices.length === 0
                  ? "Choose work"
                  : `${selectedServices.length} selected`}
              </strong>
            </div>

            {selectedServices.length > 0 && (
              <button
                type="button"
                onClick={() => setSelectedIds([])}
              >
                Clear
              </button>
            )}
          </header>

          {selectedServices.length === 0 ? (
            <div className={styles.emptyBooking}>
              <span>+</span>
              <strong>No work selected</strong>
              <p>Add the fabrication work you need.</p>
            </div>
          ) : (
            <div className={styles.selectedItems}>
              {selectedServices.map((service) => (
                <article key={service.id}>
                  <div>
                    <strong>{service.name}</strong>
                    <small>
                      {service.price} • {service.unit}
                    </small>
                  </div>

                  <button
                    type="button"
                    onClick={() => toggleService(service.id)}
                    aria-label={`Remove ${service.name}`}
                  >
                    −
                  </button>
                </article>
              ))}
            </div>
          )}

          <div className={styles.surveyBox}>
            <span>₹</span>

            <div>
              <strong>₹500 Site Survey</strong>
              <p>
                Final fabrication price is confirmed after
                measurement.
              </p>
            </div>
          </div>

          <div className={styles.bookingSummary}>
            <div>
              <span>Work Price</span>
              <strong>After Survey</strong>
            </div>

            <div className={styles.payNow}>
              <span>Pay Now</span>
              <strong>₹500</strong>
            </div>
          </div>

          {selectedServices.length > 0 ? (
            <div className={styles.bookingModal}>
              <ServiceBookingModal
                packageId="fabrication-site-survey"
                serviceName="Fabrication Works - Site Survey"
                originalPrice={FABRICATION_SURVEY_FEE}
                offerPrice={FABRICATION_SURVEY_FEE}
                fullPayment
                triggerLabel="Book Service"
                customServices={customServices}
              />
            </div>
          ) : (
            <button
              type="button"
              className={styles.disabledBooking}
              disabled
            >
              Book Service
            </button>
          )}

          <small className={styles.bookingFootnote}>
            Fixed ₹500 payment confirms the site-survey booking.
          </small>
        </aside>
      </div>
    </section>
  );
}
