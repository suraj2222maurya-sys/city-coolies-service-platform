"use client";

import {
  useEffect,
  useRef,
} from "react";

import ServiceBookingModal from "@/components/booking/ServiceBookingModal";

import type {
  GardeningService,
} from "@/lib/services/gardeningCatalog";

type SelectedItem = {
  service: GardeningService;
  quantity: number;
};

type Props = {
  open: boolean;
  items: readonly SelectedItem[];
  onClose: () => void;
};

const PRODUCT_CATEGORIES = new Set([
  "Nursery",
  "Pots",
  "Compost",
  "Garden Decor",
]);

export default function GardeningBookingBridge({
  open,
  items,
  onClose,
}: Props) {
  const triggerContainerRef =
    useRef<HTMLDivElement>(null);

  const customServices = items.map(
    ({ service, quantity }) => ({
      id: service.id,
      name: service.name,
      quantity,
      unitPrice: service.price,
      lineTotal: service.price * quantity,
    }),
  );

  const total = customServices.reduce(
    (sum, item) => sum + item.lineTotal,
    0,
  );

  const totalQuantity = customServices.reduce(
    (sum, item) => sum + item.quantity,
    0,
  );

  const productOnly =
    items.length > 0 &&
    items.every(({ service }) =>
      PRODUCT_CATEGORIES.has(service.category),
    );

  const serviceName =
    totalQuantity === 1
      ? customServices[0]?.name ??
        "Gardening Booking"
      : `Gardening Booking - ${totalQuantity} Items`;

  useEffect(() => {
    if (!open || items.length === 0) {
      return;
    }

    const trigger =
      triggerContainerRef.current?.querySelector<HTMLButtonElement>(
        ".cc-booking-trigger",
      );

    if (!trigger) {
      return;
    }

    trigger.click();

    let modalWasOpened = false;

    const observer = new MutationObserver(() => {
      const modal = document.querySelector(
        ".cc-booking-overlay",
      );

      if (modal) {
        modalWasOpened = true;
        return;
      }

      if (modalWasOpened) {
        observer.disconnect();
        onClose();
      }
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true,
    });

    return () => {
      observer.disconnect();
    };
  }, [items.length, onClose, open]);

  if (items.length === 0) {
    return null;
  }

  return (
    <div
      ref={triggerContainerRef}
      aria-hidden="true"
      style={{
        position: "absolute",
        width: 0,
        height: 0,
        overflow: "hidden",
        opacity: 0,
        pointerEvents: "none",
      }}
    >
      <ServiceBookingModal
        packageId="gardening-custom-booking"
        serviceName={serviceName}
        originalPrice={total}
        offerPrice={total}
        triggerLabel="Open Gardening Booking"
        customServices={customServices}
        productCheckout={productOnly}
      />
    </div>
  );
}