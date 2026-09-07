"use client";

import Image from "next/image";
import { useMemo, useState } from "react";

import {
  GARDENER_BOOKING_SERVICES,
  type GardeningCategory,
} from "@/lib/services/gardeningCatalog";

import GardeningCategoryTabs from "./GardeningCategoryTabs";
import GardeningServiceCard from "./GardeningServiceCard";
import GardeningBookingBridge from "./GardeningBookingBridge";

import styles from "./GardeningMarketplace.module.css";

function formatCurrency(value: number) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(value);
}

function ServiceIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M12 21c0-7 2.8-12.2 8-16-7.2.8-11.5 4.7-12 10.5C7.8 18.7 9.3 20.5 12 21Z" />
      <path d="M12 21c-.2-5.2-2.8-8.7-8-10.5" />
    </svg>
  );
}

function ShieldIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M12 3 20 6v6c0 5-3.2 8-8 10-4.8-2-8-5-8-10V6l8-3Z" />
      <path d="m8.5 12 2.2 2.2 4.8-5" />
    </svg>
  );
}

export default function GardeningMarketplace() {
  const [activeCategory, setActiveCategory] =
    useState<GardeningCategory>("All");

  const [quantities, setQuantities] =
    useState<Record<string, number>>({});

  const [isBookingOpen, setIsBookingOpen] =
    useState(false);

  const visibleServices = useMemo(() => {
    if (activeCategory === "All") {
      return GARDENER_BOOKING_SERVICES;
    }

    return GARDENER_BOOKING_SERVICES.filter(
      (service) =>
        service.category === activeCategory,
    );
  }, [activeCategory]);

  const selectedServices = useMemo(
    () =>
      GARDENER_BOOKING_SERVICES.flatMap(
        (service) => {
          const quantity =
            quantities[service.id] ?? 0;

          return quantity > 0
            ? [{ service, quantity }]
            : [];
        },
      ),
    [quantities],
  );

  const totalSelected = selectedServices.reduce(
    (total, item) => total + item.quantity,
    0,
  );

  const subtotal = selectedServices.reduce(
    (total, item) =>
      total +
      item.service.price * item.quantity,
    0,
  );

  function addService(serviceId: string) {
    setQuantities((current) => ({
      ...current,
      [serviceId]:
        (current[serviceId] ?? 0) + 1,
    }));
  }

  function decreaseService(serviceId: string) {
    setQuantities((current) => {
      const currentQuantity =
        current[serviceId] ?? 0;

      if (currentQuantity <= 1) {
        const next = { ...current };
        delete next[serviceId];
        return next;
      }

      return {
        ...current,
        [serviceId]: currentQuantity - 1,
      };
    });
  }

  return (
    <section
      className={styles.marketplace}
      aria-label="Gardening service booking"
    >
      <GardeningCategoryTabs
        value={activeCategory}
        onChange={setActiveCategory}
      />

      <div className={styles.layout}>
        <div className={styles.grid}>
          {visibleServices.map((service) => (
            <GardeningServiceCard
              key={service.id}
              service={service}
              quantity={
                quantities[service.id] ?? 0
              }
              onAdd={addService}
            />
          ))}
        </div>

        <aside
          className={styles.booking}
          aria-label="Your gardening booking"
          aria-live="polite"
        >
          <div className={styles.bookingHeader}>
            <div>
              <span>YOUR BOOKING</span>
              <h2>Selected Services</h2>
            </div>

            {totalSelected > 0 && (
              <strong className={styles.personCount}>
                {totalSelected}{" "}
                {totalSelected === 1
                  ? "Item"
                  : "Items"}
              </strong>
            )}
          </div>

          {selectedServices.length === 0 ? (
            <div className={styles.emptyBooking}>
              <span className={styles.emptyIcon}>
                <ServiceIcon />
              </span>

              <div>
                <strong>Select a service</strong>
                <p>
                  Added services will appear here.
                </p>
              </div>
            </div>
          ) : (
            <div className={styles.selectedList}>
              {selectedServices.map(
                ({ service, quantity }) => (
                  <article
                    key={service.id}
                    className={styles.selectedItem}
                  >
                    <div className={styles.selectedImage}>
                      <Image
                        src={service.image}
                        alt=""
                        fill
                        sizes="58px"
                      />
                    </div>

                    <div className={styles.selectedDetails}>
                      <strong>{service.name}</strong>
                      <span>{service.option}</span>
                      <small>
                        {service.priceLabel} per booking
                      </small>
                    </div>

                    <div
                      className={styles.quantityControl}
                      aria-label={`${service.name} quantity`}
                    >
                      <button
                        type="button"
                        aria-label={`Decrease ${service.name}`}
                        onClick={() =>
                          decreaseService(service.id)
                        }
                      >
                        −
                      </button>

                      <strong>{quantity}</strong>

                      <button
                        type="button"
                        aria-label={`Increase ${service.name}`}
                        onClick={() =>
                          addService(service.id)
                        }
                      >
                        +
                      </button>
                    </div>
                  </article>
                ),
              )}
            </div>
          )}

          <div className={styles.summary}>
            <div>
              <span>Selected Services</span>
              <strong>{totalSelected}</strong>
            </div>

            <div>
              <span>Booking Subtotal</span>
              <strong>
                {formatCurrency(subtotal)}
              </strong>
            </div>

            <div className={styles.totalRow}>
              <span>Payable Amount</span>
              <strong>
                {formatCurrency(subtotal)}
              </strong>
            </div>
          </div>

          <div className={styles.materialNote}>
            <span>i</span>
            <p>
              Plants, soil, compost, chemicals and
              replacement materials are charged separately.
            </p>
          </div>

          <button
            type="button"
            className={styles.bookButton}
            disabled={totalSelected === 0}
            onClick={() => setIsBookingOpen(true)}
          >
            <span>
              {totalSelected === 0
                ? "Select a Service"
                : selectedServices.every(({ service }) =>
                    [
                      "Nursery",
                      "Pots",
                      "Compost",
                      "Garden Decor",
                    ].includes(service.category),
                  )
                  ? "Buy Now"
                  : "Book Service"}
            </span>

            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M5 12h14" />
              <path d="m14 7 5 5-5 5" />
            </svg>
          </button>

          <div className={styles.secureNote}>
            <ShieldIcon />
            <span>Secure online booking</span>
          </div>
        </aside>
      </div>

      <GardeningBookingBridge
        open={isBookingOpen}
        items={selectedServices}
        onClose={() => setIsBookingOpen(false)}
      />
    </section>
  );
}