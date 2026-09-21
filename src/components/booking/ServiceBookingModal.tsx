"use client";

import { useEffect, useId, useMemo, useState } from "react";
import type { FormEvent } from "react";
import { createPortal } from "react-dom";
import Script from "next/script";

type PaymentMethod = "advance" | "online" | "cod";
type CustomBookingItem = {
  id: string;
  name: string;
  quantity: number;
  unitPrice: number;
  lineTotal: number;
};
type ServiceBookingModalProps = {
  packageId: string;
  serviceName: string;
  originalPrice: number;
  offerPrice: number;
  triggerLabel?: string;
  customServices?: readonly CustomBookingItem[];
  fullPayment?: boolean;
  quoteOnly?: boolean;
  productCheckout?: boolean;
};
/* CITY COOLIES PRODUCT CHECKOUT SUPPORT */
type BookingResponse = {
  success?: boolean;
  message?: string;
  bookingId?: string;
  paymentUrl?: string;
  whatsappUrl?: string;
  googleMapsUrl?: string;
};
type CreatePaymentOrderResponse = {
  success?: boolean;
  message?: string;
  keyId?: string;
  orderId?: string;
  amount?: number;
  currency?: string;
  serviceName?: string;
  originalPrice?: number;
  offerPrice?: number;
  advanceAmount?: number;
};
type CustomCleaningService = {
  id: string;
  name: string;
  price: number;
  unitLabel: string;
  selectionType: "quantity" | "toggle";
};

const CUSTOM_CLEANING_SERVICES: readonly CustomCleaningService[] = [
  {
    id: "bedroom-cleaning",
    name: "Bedroom Cleaning",
    price: 500,
    unitLabel: "per room",
    selectionType: "quantity",
  },
  {
    id: "living-room-cleaning",
    name: "Living Room Cleaning",
    price: 800,
    unitLabel: "per room",
    selectionType: "quantity",
  },
  {
    id: "restroom-cleaning",
    name: "Restroom Cleaning",
    price: 999,
    unitLabel: "per restroom",
    selectionType: "quantity",
  },
  {
    id: "window-grill-glass-cleaning",
    name: "Window, Grill & Glass Cleaning",
    price: 500,
    unitLabel: "per unit",
    selectionType: "quantity",
  },
  {
    id: "tv-cleaning",
    name: "TV Cleaning",
    price: 150,
    unitLabel: "per TV",
    selectionType: "quantity",
  },
  {
    id: "balcony-cleaning",
    name: "Balcony Cleaning",
    price: 350,
    unitLabel: "per balcony",
    selectionType: "quantity",
  },
  {
    id: "utility-area-cleaning",
    name: "Utility Area Cleaning",
    price: 1000,
    unitLabel: "fixed service",
    selectionType: "toggle",
  },
  {
    id: "cobweb-removal",
    name: "Cobweb Removal",
    price: 500,
    unitLabel: "fixed service",
    selectionType: "toggle",
  },
] as const;
const CUSTOM_KITCHEN_CLEANING_SERVICES: readonly CustomCleaningService[] = [
  {
    id: "kitchen-cabinets-cleaning",
    name: "Kitchen Cabinets Cleaning",
    price: 499,
    unitLabel: "fixed service",
    selectionType: "toggle",
  },
  {
    id: "chimney-exhaust-cleaning",
    name: "Chimney & Exhaust Cleaning",
    price: 599,
    unitLabel: "fixed service",
    selectionType: "toggle",
  },
  {
    id: "hob-stove-cleaning",
    name: "Hob & Stove Cleaning",
    price: 399,
    unitLabel: "fixed service",
    selectionType: "toggle",
  },
  {
    id: "microwave-cleaning",
    name: "Microwave Cleaning",
    price: 399,
    unitLabel: "fixed service",
    selectionType: "toggle",
  },
  {
    id: "refrigerator-cleaning",
    name: "Refrigerator Cleaning",
    price: 599,
    unitLabel: "fixed service",
    selectionType: "toggle",
  },
  {
    id: "oven-cleaning",
    name: "Oven Cleaning",
    price: 499,
    unitLabel: "fixed service",
    selectionType: "toggle",
  },
  {
    id: "sink-tiles-cleaning",
    name: "Sink & Tiles Cleaning",
    price: 499,
    unitLabel: "fixed service",
    selectionType: "toggle",
  },
  {
    id: "kitchen-floor-cleaning",
    name: "Kitchen Floor Cleaning",
    price: 399,
    unitLabel: "fixed service",
    selectionType: "toggle",
  },
] as const;
const CUSTOM_BATHROOM_CLEANING_SERVICES: readonly CustomCleaningService[] =
  [
    {
      id: "bathroom-toilet-basin-cleaning",
      name: "Toilet & Basin Cleaning",
      price: 299,
      unitLabel: "fixed service",
      selectionType: "toggle",
    },
    {
  id: "bathroom-urinal-cleaning",
  name: "Urinals Cleaning",
  price: 599,
  unitLabel: "fixed service",
  selectionType: "toggle",
},
    {
      id: "bathroom-floor-tile-cleaning",
      name: "Floor & Tile Cleaning",
      price: 399,
      unitLabel: "fixed service",
      selectionType: "toggle",
    },
    {
      id: "bathroom-wall-tile-cleaning",
      name: "Wall Tile Deep Cleaning",
      price: 399,
      unitLabel: "fixed service",
      selectionType: "toggle",
    },
    {
      id: "bathroom-shower-glass-cleaning",
      name: "Shower & Glass Cleaning",
      price: 349,
      unitLabel: "fixed service",
      selectionType: "toggle",
    },
    {
      id: "bathroom-hard-water-treatment",
      name: "Hard-Water Stain Treatment",
      price: 399,
      unitLabel: "fixed service",
      selectionType: "toggle",
    },
    {
      id: "bathroom-tap-fixture-cleaning",
      name: "Tap & Fixture Cleaning",
      price: 249,
      unitLabel: "fixed service",
      selectionType: "toggle",
    },
    {
      id: "bathroom-drain-sanitization",
      name: "Drain Cleaning & Sanitization",
      price: 199,
      unitLabel: "fixed service",
      selectionType: "toggle",
    },
    {
      id: "bathroom-bathtub-cleaning",
      name: "Bathtub Deep Cleaning",
      price: 399,
      unitLabel: "fixed service",
      selectionType: "toggle",
    },
  ] as const;
function CustomCleaningIcon({
  serviceId,
}: {
  serviceId: string;
}) {
  let icon: React.ReactNode;

  switch (serviceId) {
    case "bedroom-cleaning":
      icon = (
        <>
          <path d="M4 36V20M29 36V23M4 31h25M4 36h25M7 36v5M26 36v5" />
          <path d="M7 23h19a3 3 0 0 1 3 3v5H4v-5a3 3 0 0 1 3-3Z" />
          <path d="M8 23v-7h8a4 4 0 0 1 4 4v3M9 20h8" />
          <path d="M37 15v26M34 41h6" />
          <path d="M33 15h8l-2-9h-4z" />
        </>
      );
      break;

    case "living-room-cleaning":
      icon = (
        <>
          <path d="M6 35v-6a4 4 0 0 1 4-4h18a4 4 0 0 1 4 4v6" />
          <path d="M9 25v-5a5 5 0 0 1 5-5h10a5 5 0 0 1 5 5v5" />
          <path d="M6 32h26M6 35h26M9 35v5M29 35v5" />
          <path d="M40 15v26M37 41h6" />
          <path d="M36 15h8l-2-9h-4z" />
        </>
      );
      break;

    case "restroom-cleaning":
      icon = (
        <>
          <rect x="8" y="6" width="17" height="12" rx="1.5" />
          <path d="M11 10h5M7 18h21v5c0 7.2-5.8 13-13 13h-1a7 7 0 0 1-7-7z" />
          <path d="M16 36v6M11 42h11" />
          <path d="m36 7 1.2 3.3 3.3 1.2-3.3 1.2L36 16l-1.2-3.3-3.3-1.2 3.3-1.2z" />
        </>
      );
      break;

    case "window-grill-glass-cleaning":
      icon = (
        <>
          <rect x="5" y="5" width="28" height="36" rx="1" />
          <path d="M19 5v36M5 23h28M3 42h32" />
          <path d="m40 25 1.1 3 3 1.1-3 1.1-1.1 3-1.1-3-3-1.1 3-1.1z" />
        </>
      );
      break;

    case "tv-cleaning":
      icon = (
        <>
          <rect x="5" y="5" width="36" height="25" rx="2" />
          <path d="M23 30v6M17 36h12" />
          <path d="M3 37h40v6H3zM8 40h4M35 40h3" />
        </>
      );
      break;

    case "balcony-cleaning":
      icon = (
        <>
          <path d="M7 14h34M9 14v28M39 14v28M6 42h36" />
          <path d="M13 19v23M21 19v23M29 19v23M37 19v23" />
          <path d="M6 19h36M6 37h36" />
        </>
      );
      break;

    case "utility-area-cleaning":
      icon = (
        <>
          <rect x="6" y="4" width="30" height="40" rx="2" />
          <path d="M6 13h30M11 9h4M29 9h2" />
          <circle cx="21" cy="29" r="10" />
          <circle cx="21" cy="29" r="7" />
          <path d="M15 29c2.5 3 8.5 4 12 0" />
        </>
      );
      break;

    default:
      icon = (
        <>
          <path d="M24 4v40M4 24h40M9.8 9.8l28.4 28.4M38.2 9.8 9.8 38.2" />
          <path d="M24 10c7.7 0 14 6.3 14 14M24 38c-7.7 0-14-6.3-14-14" />
          <path d="M24 16a8 8 0 0 1 8 8M24 32a8 8 0 0 1-8-8" />
          <circle cx="24" cy="24" r="2.5" />
        </>
      );
  }

  return (
    <span
      className="cc-custom-builder__icon"
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 48 48"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.55"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        {icon}
      </svg>
    </span>
  );
}
function CustomKitchenCleaningIcon({
  serviceId,
}: {
  serviceId: string;
}) {
  let icon: React.ReactNode;

  switch (serviceId) {
    case "kitchen-cabinets-cleaning":
      icon = (
        <>
          <rect x="6" y="7" width="36" height="34" rx="2" />
          <path d="M24 7v34" />
          <path d="M18 23h2" />
          <path d="M28 23h2" />
          <path d="M10 12h10" />
          <path d="M28 12h10" />
        </>
      );
      break;

    case "chimney-exhaust-cleaning":
      icon = (
        <>
          <path d="M14 5h20l3 15H11l3-15Z" />
          <path d="M9 20h30v7H9Z" />
          <path d="M14 27v14" />
          <path d="M24 27v14" />
          <path d="M34 27v14" />
          <path d="M12 41h24" />
        </>
      );
      break;

    case "hob-stove-cleaning":
      icon = (
        <>
          <rect x="5" y="14" width="38" height="25" rx="3" />
          <circle cx="16" cy="25" r="6" />
          <circle cx="33" cy="25" r="6" />
          <path d="M11 39v4" />
          <path d="M37 39v4" />
          <path d="M16 22v6" />
          <path d="M13 25h6" />
          <path d="M33 22v6" />
          <path d="M30 25h6" />
        </>
      );
      break;

    case "microwave-cleaning":
      icon = (
        <>
          <rect x="5" y="9" width="38" height="30" rx="3" />
          <rect x="9" y="13" width="24" height="22" rx="2" />
          <circle cx="38" cy="18" r="2" />
          <circle cx="38" cy="26" r="2" />
          <path d="M11 39v4" />
          <path d="M37 39v4" />
          <path d="M14 24h14" />
        </>
      );
      break;

    case "refrigerator-cleaning":
      icon = (
        <>
          <rect x="11" y="4" width="26" height="40" rx="3" />
          <path d="M11 21h26" />
          <path d="M17 11v5" />
          <path d="M17 27v6" />
          <path d="M16 44v2" />
          <path d="M32 44v2" />
        </>
      );
      break;

    case "oven-cleaning":
      icon = (
        <>
          <rect x="7" y="5" width="34" height="38" rx="3" />
          <path d="M7 15h34" />
          <circle cx="14" cy="10" r="1.5" />
          <circle cx="21" cy="10" r="1.5" />
          <circle cx="28" cy="10" r="1.5" />
          <circle cx="35" cy="10" r="1.5" />
          <rect x="12" y="20" width="24" height="17" rx="2" />
          <path d="M16 25h16" />
        </>
      );
      break;

    case "sink-tiles-cleaning":
      icon = (
        <>
          <path d="M8 25h32v4a12 12 0 0 1-12 12h-8A12 12 0 0 1 8 29v-4Z" />
          <path d="M13 25v-7a7 7 0 0 1 14 0v2" />
          <path d="M27 20h7" />
          <path d="M34 20v5" />
          <path d="M24 41v4" />
          <path d="M17 45h14" />
          <path d="m39 7 1.3 3.4 3.4 1.3-3.4 1.3-1.3 3.4-1.3-3.4-3.4-1.3 3.4-1.3Z" />
        </>
      );
      break;

    case "kitchen-floor-cleaning":
      icon = (
        <>
          <path d="M9 40h30" />
          <path d="M13 40 24 9l11 31" />
          <path d="M17 29h14" />
          <path d="M15 35h18" />
          <path d="m8 9 1.3 3.4 3.4 1.3-3.4 1.3L8 18.4 6.7 15l-3.4-1.3 3.4-1.3Z" />
        </>
      );
      break;

    default:
      icon = (
        <>
          <path d="M24 5v38" />
          <path d="M5 24h38" />
          <circle cx="24" cy="24" r="13" />
          <path d="m17 24 5 5 9-10" />
        </>
      );
  }

  return (
    <span
      className="cc-custom-builder__icon"
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 48 48"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.55"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        {icon}
      </svg>
    </span>
  );
}
function CustomBathroomCleaningIcon({
  serviceId,
}: {
  serviceId: string;
}) {
  let icon: React.ReactNode;

  switch (serviceId) {
    case "bathroom-toilet-basin-cleaning":
      icon = (
        <>
          <path d="M8 8h15v11H8Z" />
          <path d="M11 12h5" />
          <path d="M6 19h20v5c0 7-5 13-12 13h-1a7 7 0 0 1-7-7Z" />
          <path d="M15 37v6" />
          <path d="M10 43h11" />
          <path d="m37 9 1.3 3.3 3.3 1.3-3.3 1.3-1.3 3.3-1.3-3.3-3.3-1.3 3.3-1.3Z" />
        </>
      );
      break;

    case "bathroom-floor-tile-cleaning":
      icon = (
        <>
          <path d="M5 8h38v35H5Z" />
          <path d="M5 20h38" />
          <path d="M5 32h38" />
          <path d="M18 8v35" />
          <path d="M31 8v35" />
          <path d="m38 3 1 2.7 2.7 1-2.7 1-1 2.7-1-2.7-2.7-1 2.7-1Z" />
        </>
      );
      break;

    case "bathroom-wall-tile-cleaning":
      icon = (
        <>
          <rect x="6" y="5" width="36" height="38" rx="2" />
          <path d="M6 18h36" />
          <path d="M6 31h36" />
          <path d="M18 5v38" />
          <path d="M30 5v38" />
          <path d="m37 9 1 2.8 2.8 1-2.8 1-1 2.8-1-2.8-2.8-1 2.8-1Z" />
        </>
      );
      break;

    case "bathroom-shower-glass-cleaning":
      icon = (
        <>
          <path d="M8 43V8h27v35" />
          <path d="M21.5 8v35" />
          <path d="M26 25h3" />
          <path d="M35 12h5v31" />
          <path d="m10 4 1 2.7 2.7 1-2.7 1-1 2.7-1-2.7-2.7-1 2.7-1Z" />
        </>
      );
      break;

    case "bathroom-hard-water-treatment":
      icon = (
        <>
          <path d="M9 20h22" />
          <path d="M15 20v-5a7 7 0 0 1 14 0v2" />
          <path d="M29 17h8" />
          <path d="M37 17v7" />
          <path d="M13 25c0 7 5 13 11 13s11-6 11-13" />
          <path d="M17 42h14" />
          <path d="m9 7 1.2 3.2L13.5 11l-3.3 1.2L9 15.5l-1.2-3.3L4.5 11l3.3-1.2Z" />
        </>
      );
      break;

    case "bathroom-tap-fixture-cleaning":
      icon = (
        <>
          <path d="M8 25h31" />
          <path d="M14 25v-8a8 8 0 0 1 16 0v3" />
          <path d="M30 20h8" />
          <path d="M38 20v8" />
          <path d="M34 32c0 3 2 5 4 5s4-2 4-5c0-2-4-7-4-7s-4 5-4 7Z" />
          <path d="m11 7 1.2 3.2 3.3 1.2-3.3 1.2-1.2 3.3-1.2-3.3-3.3-1.2 3.3-1.2Z" />
        </>
      );
      break;

    case "bathroom-drain-sanitization":
      icon = (
        <>
          <circle cx="24" cy="25" r="16" />
          <circle cx="24" cy="25" r="10" />
          <path d="M18 19h12" />
          <path d="M18 25h12" />
          <path d="M18 31h12" />
          <path d="M24 9V4" />
          <path d="m36 8 1 2.7 2.7 1-2.7 1-1 2.7-1-2.7-2.7-1 2.7-1Z" />
        </>
      );
      break;

    default:
      icon = (
        <>
          <path d="M7 18h34v8a14 14 0 0 1-14 14h-6A14 14 0 0 1 7 26Z" />
          <path d="M10 18V9a4 4 0 0 1 8 0" />
          <path d="M6 40h36" />
          <path d="M12 40v4" />
          <path d="M36 40v4" />
          <path d="m37 7 1.2 3.2 3.3 1.2-3.3 1.2-1.2 3.3-1.2-3.3-3.3-1.2 3.3-1.2Z" />
        </>
      );
  }

  return (
    <span
      className="cc-custom-builder__icon"
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 48 48"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.55"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        {icon}
      </svg>
    </span>
  );
}
const BOOKING_MODAL_STYLES = `
  .cc-booking-trigger {
    display: inline-flex;
    width: 100%;
    min-height: 44px;
    align-items: center;
    justify-content: center;
    gap: 10px;
    border: 1px solid #f21f2f;
    border-radius: 9px;
    color: #e81929;
    background: #ffffff;
    font: inherit;
    font-size: 0.8rem;
    font-weight: 800;
    cursor: pointer;
    transition:
      color 200ms ease,
      background-color 200ms ease,
      box-shadow 200ms ease;
  }

  .cc-booking-trigger:hover {
    color: #ffffff;
    background: #f21f2f;
    box-shadow: 0 10px 25px rgba(242, 31, 47, 0.2);
  }

  .cc-booking-overlay {
    position: fixed;
    z-index: 9999;
    inset: 0;
    display: grid;
    padding: 20px;
    place-items: center;
    overflow-y: auto;
    background: rgba(18, 20, 27, 0.58);
    backdrop-filter: blur(8px);
    animation: ccBookingOverlayIn 220ms ease both;
  }

  .cc-booking-modal {
    position: relative;
    width: min(100%, 820px);
    max-height: calc(100vh - 40px);
    overflow-y: auto;
    border: 1px solid rgba(242, 31, 47, 0.18);
    border-radius: 22px;
    background:
      radial-gradient(
        circle at 100% 0%,
        rgba(242, 31, 47, 0.08),
        transparent 34%
      ),
      #ffffff;
    box-shadow: 0 30px 90px rgba(20, 18, 20, 0.28);
    animation: ccBookingModalIn 260ms ease both;
  }

  @keyframes ccBookingOverlayIn {
    from {
      opacity: 0;
    }

    to {
      opacity: 1;
    }
  }

  @keyframes ccBookingModalIn {
    from {
      opacity: 0;
      transform: translateY(18px) scale(0.98);
    }

    to {
      opacity: 1;
      transform: translateY(0) scale(1);
    }
  }

  .cc-booking-modal__header {
    padding: 25px 28px 20px;
    border-bottom: 1px solid rgba(36, 40, 49, 0.09);
  }

  .cc-booking-modal__eyebrow {
    margin: 0 0 7px;
    color: #ed1b2b;
    font-size: 0.72rem;
    font-weight: 850;
    letter-spacing: 0.1em;
    text-transform: uppercase;
  }

  .cc-booking-modal__header h2 {
    margin: 0;
    padding-right: 45px;
    color: #171922;
    font-size: clamp(1.45rem, 3vw, 2rem);
    line-height: 1.2;
    letter-spacing: -0.035em;
  }

  .cc-booking-modal__header p {
    margin: 8px 0 0;
    color: #6d7480;
    font-size: 0.84rem;
    line-height: 1.5;
  }

  .cc-booking-modal__close {
    position: absolute;
    top: 18px;
    right: 18px;
    display: grid;
    width: 38px;
    height: 38px;
    padding: 0;
    place-items: center;
    border: 1px solid rgba(35, 40, 50, 0.11);
    border-radius: 50%;
    color: #3d424d;
    background: #ffffff;
    font-size: 1.25rem;
    cursor: pointer;
  }

  .cc-booking-modal__form {
    padding: 24px 28px 28px;
  }

  .cc-booking-modal__grid {
    display: grid;
    grid-template-columns: 1fr;
    gap: 17px;
  }

  .cc-booking-modal__field {
    display: grid;
    gap: 7px;
  }

  .cc-booking-modal__field--full {
    grid-column: 1 / -1;
  }

  .cc-booking-modal__field span,
  .cc-booking-modal__payment-title {
    color: #353a45;
    font-size: 0.77rem;
    font-weight: 750;
  }

  .cc-booking-modal__field input,
  .cc-booking-modal__field textarea {
    width: 100%;
    box-sizing: border-box;
    border: 1px solid rgba(35, 40, 50, 0.13);
    border-radius: 10px;
    color: #252933;
    background: #ffffff;
    font: inherit;
    font-size: 0.84rem;
    outline: none;
    transition:
      border-color 180ms ease,
      box-shadow 180ms ease;
  }

  .cc-booking-modal__field input {
    min-height: 47px;
    padding: 0 13px;
  }

  .cc-booking-modal__field textarea {
    min-height: 88px;
    padding: 12px 13px;
    line-height: 1.5;
    resize: vertical;
  }

  .cc-booking-modal__field input:focus,
  .cc-booking-modal__field textarea:focus {
    border-color: #f21f2f;
    box-shadow: 0 0 0 3px rgba(242, 31, 47, 0.1);
  }
.cc-booking-modal__location {
  display: grid;
  gap: 8px;
}

.cc-booking-modal__location-button {
  min-height: 48px;
  padding: 0 18px;
  border: 1px solid #f21f2f;
  border-radius: 10px;
  color: #e81929;
  background: #fff5f6;
  font: inherit;
  font-size: 0.82rem;
  font-weight: 800;
  cursor: pointer;
  transition:
    color 180ms ease,
    background-color 180ms ease,
    box-shadow 180ms ease;
}

.cc-booking-modal__location-button:hover {
  color: #ffffff;
  background: #f21f2f;
  box-shadow: 0 10px 24px rgba(242, 31, 47, 0.18);
}

.cc-booking-modal__location-message {
  margin: 0;
  color: #626a77;
  font-size: 0.74rem;
  line-height: 1.45;
}

.cc-booking-modal__location a {
  width: fit-content;
  color: #e81929;
  font-size: 0.74rem;
  font-weight: 750;
  text-decoration: none;
}
  .cc-booking-modal__payment {
    margin-top: 22px;
    padding-top: 20px;
    border-top: 1px solid rgba(35, 40, 50, 0.09);
  }

  .cc-booking-modal__payment-title {
    display: block;
    margin-bottom: 11px;
  }

  .cc-booking-modal__payment-options {
    display: grid;
    grid-template-columns: 1fr;
    gap: 12px;
  }

  .cc-booking-modal__payment-option input {
    position: absolute;
    opacity: 0;
    pointer-events: none;
  }

  .cc-booking-modal__payment-option span {
    display: grid;
    min-height: 72px;
    align-content: center;
    gap: 5px;
    padding: 13px 15px;
    border: 1px solid rgba(35, 40, 50, 0.12);
    border-radius: 12px;
    color: #313641;
    background: #ffffff;
    cursor: pointer;
    transition:
      border-color 180ms ease,
      background-color 180ms ease,
      box-shadow 180ms ease;
  }

  .cc-booking-modal__payment-option strong {
    font-size: 0.86rem;
  }

  .cc-booking-modal__payment-option small {
    color: #727986;
    font-size: 0.72rem;
    line-height: 1.4;
  }

  .cc-booking-modal__payment-option input:checked + span {
    border-color: #f21f2f;
    background: #fff5f6;
    box-shadow: 0 8px 22px rgba(242, 31, 47, 0.09);
  }

  .cc-booking-modal__summary {
    display: grid;
    gap: 9px;
    margin-top: 19px;
    padding: 16px;
    border: 1px solid rgba(242, 31, 47, 0.13);
    border-radius: 12px;
    background: #fff8f9;
  }

  .cc-booking-modal__summary-row {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 20px;
    color: #5f6673;
    font-size: 0.8rem;
  }

  .cc-booking-modal__summary-row strong {
    color: #20232c;
  }

  .cc-booking-modal__summary-row--payable {
    padding-top: 9px;
    border-top: 1px dashed rgba(242, 31, 47, 0.22);
  }

  .cc-booking-modal__summary-row--payable strong {
    color: #ed1b2b;
    font-size: 1.05rem;
  }

  .cc-booking-modal__consent {
    display: flex;
    align-items: flex-start;
    gap: 9px;
    margin-top: 16px;
    color: #646b77;
    font-size: 0.72rem;
    line-height: 1.5;
  }

  .cc-booking-modal__consent input {
    margin-top: 3px;
    accent-color: #f21f2f;
  }

  .cc-booking-modal__error,
  .cc-booking-modal__success {
    margin: 15px 0 0;
    padding: 11px 13px;
    border-radius: 9px;
    font-size: 0.78rem;
    line-height: 1.45;
  }

  .cc-booking-modal__error {
    color: #b01825;
    background: #fff0f2;
  }

  .cc-booking-modal__success {
    color: #166534;
    background: #ecfdf3;
  }

  .cc-booking-modal__submit {
    display: flex;
    width: 100%;
    min-height: 50px;
    margin-top: 17px;
    align-items: center;
    justify-content: center;
    gap: 14px;
    border: 0;
    border-radius: 10px;
    color: #ffffff;
    background: #f21f2f;
    font: inherit;
    font-size: 0.84rem;
    font-weight: 850;
    cursor: pointer;
    box-shadow: 0 12px 28px rgba(242, 31, 47, 0.22);
  }

  .cc-booking-modal__submit:disabled {
    cursor: not-allowed;
    opacity: 0.65;
  }


  /* CITY_COOLIES_BOOKING_MODAL_COMPACT_FINAL */

  .cc-booking-overlay {
    padding: 18px;
    align-items: center;
    justify-content: center;
  }

  .cc-booking-modal {
    width: min(calc(100vw - 36px), 920px);
    max-height: calc(100dvh - 36px);
    border-radius: 20px;
    overscroll-behavior: contain;
    scrollbar-gutter: stable;
  }

  .cc-booking-modal__header {
    padding: 20px 24px 16px;
    padding-right: 70px;
  }

  .cc-booking-modal__eyebrow {
    margin-bottom: 5px;
    font-size: 0.68rem;
    letter-spacing: 0.12em;
  }

  .cc-booking-modal__header h2 {
    font-size: clamp(1.5rem, 2.6vw, 2rem);
    line-height: 1.1;
  }

  .cc-booking-modal__header p {
    margin-top: 6px;
    font-size: 0.78rem;
  }

  .cc-booking-modal__close {
    top: 16px;
    right: 18px;
    width: 34px;
    height: 34px;
    transition:
      color 180ms ease,
      border-color 180ms ease,
      background-color 180ms ease,
      transform 180ms ease;
  }

  .cc-booking-modal__close svg {
    width: 17px;
    height: 17px;
    fill: none;
    stroke: currentColor;
    stroke-width: 1.8;
    stroke-linecap: round;
  }

  .cc-booking-modal__close:hover {
    color: #ffffff;
    border-color: #f21f2f;
    background: #f21f2f;
    transform: rotate(4deg);
  }

  .cc-booking-modal__form {
    padding: 18px 24px 22px;
  }

  .cc-booking-modal__grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
    column-gap: 14px;
    row-gap: 11px;
  }

  .cc-booking-modal__field {
    gap: 5px;
  }

  .cc-booking-modal__field span,
  .cc-booking-modal__payment-title {
    font-size: 0.72rem;
  }

  .cc-booking-modal__field input {
    min-height: 42px;
    padding: 0 12px;
    border-radius: 9px;
    font-size: 0.8rem;
  }

  .cc-booking-modal__field textarea {
    min-height: 76px;
    padding: 10px 12px;
  }

  .cc-booking-modal__location {
    gap: 6px;
  }

  .cc-booking-modal__location-button {
    min-height: 43px;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    padding: 0 15px;
    border-radius: 9px;
    font-size: 0.76rem;
  }

  .cc-booking-modal__location-icon {
    display: inline-grid;
    width: 18px;
    height: 18px;
    flex: 0 0 18px;
    place-items: center;
  }

  .cc-booking-modal__location-icon svg {
    width: 17px;
    height: 17px;
    fill: none;
    stroke: currentColor;
    stroke-width: 1.65;
    stroke-linecap: round;
    stroke-linejoin: round;
  }

  .cc-booking-modal__payment {
    margin-top: 14px;
    padding-top: 14px;
  }

  .cc-booking-modal__payment-title {
    margin-bottom: 8px;
  }

  .cc-booking-modal__payment-options {
    grid-template-columns: 1fr;
    gap: 8px;
  }

  .cc-booking-modal__payment-option span {
    min-height: 58px;
    gap: 3px;
    padding: 10px 13px;
    border-radius: 10px;
  }

  .cc-booking-modal__payment-option strong {
    font-size: 0.8rem;
  }

  .cc-booking-modal__payment-option small {
    font-size: 0.68rem;
  }

  .cc-booking-modal__summary {
    gap: 6px;
    margin-top: 12px;
    padding: 12px 13px;
    border-radius: 10px;
  }

  .cc-booking-modal__summary-row {
    gap: 16px;
    font-size: 0.74rem;
  }

  .cc-booking-modal__summary-row--payable {
    padding-top: 7px;
  }

  .cc-booking-modal__summary-row--payable strong {
    font-size: 0.98rem;
  }

  .cc-booking-modal__consent {
    gap: 8px;
    margin-top: 11px;
    font-size: 0.68rem;
  }

  .cc-booking-modal__submit {
    min-height: 46px;
    margin-top: 12px;
    border-radius: 9px;
    font-size: 0.8rem;
  }
  @media (max-width: 520px) {
    .cc-booking-overlay {
      padding: 10px;
      align-items: end;
    }

    .cc-booking-modal {
      width: 100%;
      max-height: calc(100vh - 20px);
      border-radius: 20px 20px 12px 12px;
    }

    .cc-booking-modal__header {
      padding: 22px 19px 17px;
    }

    .cc-booking-modal__form {
      padding: 20px 19px 23px;
    }

    .cc-booking-modal__grid,
    .cc-booking-modal__payment-options {
      grid-template-columns: 1fr;
    }
  }
  /* CITY COOLIES PRODUCT PAYMENT ROW */
  .cc-booking-modal__payment-options:has(
    input[value="online"]
  ) {
    grid-template-columns:
      repeat(2, minmax(0, 1fr));
    gap: 10px;
  }

  .cc-booking-modal__payment-options:has(
    input[value="online"]
  ) .cc-booking-modal__payment-option span {
    min-height: 62px;
    padding: 11px 13px;
  }

  .cc-booking-modal__payment-options:has(
    input[value="online"]
  ) .cc-booking-modal__payment-option strong {
    font-size: 0.88rem;
  }

  .cc-booking-modal__payment-options:has(
    input[value="online"]
  ) .cc-booking-modal__payment-option small {
    font-size: 0.72rem;
    line-height: 1.35;
  }

  @media (max-width: 620px) {
    .cc-booking-modal__payment-options:has(
      input[value="online"]
    ) {
      grid-template-columns: 1fr;
    }
  }
`;
const CUSTOM_CLEANING_STYLES = `
  .cc-custom-builder {
    display: grid;
    grid-template-columns: minmax(0, 1fr) 390px;
    gap: 24px;
    align-items: start;
  }

  .cc-custom-builder__services {
    display: grid;
    grid-template-columns: 1fr;
    gap: 14px;
  }

  .cc-custom-builder__service {
    display: grid;
    grid-template-columns: minmax(0, 1fr) auto;
    gap: 18px;
    min-height: 118px;
    padding: 22px;
    align-items: center;
    border: 1px solid rgba(35, 40, 50, 0.1);
    border-radius: 15px;
    background: #ffffff;
    box-shadow: 0 9px 28px rgba(55, 28, 34, 0.045);
    box-sizing: border-box;
  }
  .cc-custom-builder__service-info {
  display: flex;
  min-width: 0;
  align-items: center;
  gap: 16px;
}

.cc-custom-builder__service-copy {
  min-width: 0;
}

.cc-custom-builder__icon {
  display: inline-grid;
  width: 64px;
  height: 64px;
  flex: 0 0 64px;
  place-items: center;
  border: 0;
  border-radius: 0;
  color: #f21f2f;
  background: transparent;
  box-shadow: none;
}

.cc-custom-builder__icon svg {
  width: 54px;
  height: 54px;
}
  .cc-custom-builder__service h3 {
    margin: 0;
    color: #191b24;
    font-size: 1rem;
    line-height: 1.35;
  }

  .cc-custom-builder__service p {
    margin: 8px 0 0;
    color: #69717f;
    font-size: 0.78rem;
  }

  .cc-custom-builder__service p strong {
    color: #ed1b2b;
    font-size: 0.95rem;
  }

  .cc-custom-builder__quantity {
    display: inline-flex;
    align-items: center;
    gap: 12px;
  }

  .cc-custom-builder__quantity button {
    display: inline-grid;
    width: 38px;
    height: 38px;
    padding: 0;
    place-items: center;
    border: 1px solid #f21f2f;
    border-radius: 50%;
    color: #f21f2f;
    background: #ffffff;
    font: inherit;
    font-size: 1.15rem;
    font-weight: 800;
    cursor: pointer;
  }

  .cc-custom-builder__quantity button:disabled {
    cursor: not-allowed;
    opacity: 0.38;
  }

  .cc-custom-builder__quantity strong {
    min-width: 22px;
    color: #191b24;
    text-align: center;
    font-size: 1rem;
  }

  .cc-custom-builder__toggle {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    min-width: 108px;
    min-height: 38px;
    padding: 0 14px;
    gap: 7px;
    border: 1px solid #f21f2f;
    border-radius: 9px;
    color: #f21f2f;
    background: #ffffff;
    font: inherit;
    font-size: 0.78rem;
    font-weight: 800;
    cursor: pointer;
  }

  .cc-custom-builder__toggle--selected {
    color: #ffffff;
    background: #f21f2f;
  }

  .cc-custom-builder__summary {
    position: sticky;
    top: 24px;
    padding: 24px;
    border: 1px solid rgba(242, 31, 47, 0.15);
    border-radius: 18px;
    background: #ffffff;
    box-shadow: 0 18px 48px rgba(55, 28, 34, 0.08);
  }

  .cc-custom-builder__summary h3 {
    margin: 0;
    color: #191b24;
    font-size: 1.35rem;
  }

  .cc-custom-builder__count {
    margin: 8px 0 18px;
    color: #ed1b2b;
    font-size: 0.82rem;
    font-weight: 800;
  }

  .cc-custom-builder__empty {
    margin: 0;
    padding: 18px 0;
    color: #737a86;
    font-size: 0.82rem;
    line-height: 1.55;
  }

  .cc-custom-builder__selected {
    display: grid;
    margin: 0;
    padding: 0;
    list-style: none;
  }

  .cc-custom-builder__selected li {
    display: grid;
    grid-template-columns: minmax(0, 1fr) auto;
    gap: 12px;
    padding: 11px 0;
    border-bottom: 1px solid rgba(35, 40, 50, 0.08);
    color: #444b57;
    font-size: 0.78rem;
  }
.cc-custom-builder__selected-service {
  display: flex;
  min-width: 0;
  align-items: center;
  gap: 10px;
}

.cc-custom-builder__selected-service
  .cc-custom-builder__icon {
  width: 34px;
  height: 34px;
  flex-basis: 34px;
  border-radius: 9px;
  box-shadow: none;
}

.cc-custom-builder__selected-service
  .cc-custom-builder__icon svg {
  width: 23px;
  height: 23px;
}
  .cc-custom-builder__selected strong {
    color: #191b24;
  }

  .cc-custom-builder__calculate {
    width: 100%;
    min-height: 46px;
    margin-top: 20px;
    border: 1px solid #f21f2f;
    border-radius: 9px;
    color: #ed1b2b;
    background: #ffffff;
    font: inherit;
    font-size: 0.8rem;
    font-weight: 800;
    cursor: pointer;
  }

  .cc-custom-builder__calculate:disabled {
    cursor: not-allowed;
    opacity: 0.45;
  }

  .cc-custom-builder__total {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin: 18px 0 14px;
    padding-top: 16px;
    border-top: 1px dashed rgba(35, 40, 50, 0.18);
    color: #191b24;
    font-weight: 800;
  }

  .cc-custom-builder__total strong {
    color: #ed1b2b;
    font-size: 1.45rem;
  }

  .cc-custom-builder__booking .cc-booking-trigger {
    min-height: 48px;
    color: #ffffff;
    background: #f21f2f;
  }

  @media (max-width: 1180px) {
  .cc-custom-builder {
    grid-template-columns: minmax(0, 1fr);
  }

  .cc-custom-builder__summary {
    position: static;
    width: 100%;
  }
}

  @media (max-width: 680px) {
    .cc-custom-builder__services {
      grid-template-columns: 1fr;
    }

    .cc-custom-builder__service {
      padding: 18px;
    }
  }
`;
function formatCurrency(amount: number) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(amount);
}
async function readJsonResponse<T>(response: Response): Promise<T> {
  const responseText = await response.text();

  if (!responseText) {
    throw new Error("Server returned an empty response. Please try again.");
  }

  try {
    return JSON.parse(responseText) as T;
  } catch {
    throw new Error("Server returned an invalid response. Please try again.");
  }
}
export default function ServiceBookingModal({
  packageId,
  serviceName,
  originalPrice,
  offerPrice,
  triggerLabel = "Add",
  customServices = [],
  fullPayment = false,
  quoteOnly = false,
  productCheckout = false,
}: ServiceBookingModalProps) {
  const titleId = useId();
  const [isOpen, setIsOpen] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("advance");
  const [status, setStatus] = useState<
    "idle" | "submitting" | "success" | "error"
  >("idle");
  const [message, setMessage] = useState("");
  const [locationData, setLocationData] = useState<{
    latitude: number;
    longitude: number;
    googleMapsUrl: string;
  } | null>(null);

  const [locationMessage, setLocationMessage] = useState("");
  const advanceAmount = useMemo(
    () =>
      productCheckout || fullPayment
        ? offerPrice
        : Math.round(offerPrice * 0.5),
    [fullPayment, offerPrice, productCheckout],
  );

  const payableNow =
    quoteOnly
      ? 0
      : productCheckout
        ? paymentMethod === "online"
          ? offerPrice
          : 0
        : fullPayment
          ? offerPrice
          : paymentMethod === "advance"
            ? advanceAmount
            : 0;

  const remainingAmount =
    quoteOnly
      ? 0
      : productCheckout
        ? paymentMethod === "cod"
          ? offerPrice
          : 0
        : fullPayment
          ? 0
          : paymentMethod === "advance"
            ? offerPrice - advanceAmount
            : offerPrice;
useEffect(() => {
    if (!isOpen) {
      return;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    function closeWithEscape(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    }

    window.addEventListener("keydown", closeWithEscape);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", closeWithEscape);
    };
  }, [isOpen]);
  function captureCurrentLocation() {
    if (!navigator.geolocation) {
      setLocationMessage("Your browser does not support location access.");
      return;
    }

    setLocationMessage("Getting your current location...");

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;

        setLocationData({
          latitude,
          longitude,
          googleMapsUrl: `https://www.google.com/maps?q=${latitude},${longitude}`,
        });

        setLocationMessage("Exact Google Maps location added.");
      },
      () => {
        setLocationData(null);
        setLocationMessage(
          "Location could not be captured. Please allow location permission and try again.",
        );
      },
      {
        enableHighAccuracy: true,
        timeout: 15000,
        maximumAge: 0,
      },
    );
  }
  function openModal() {
    setStatus("idle");
    setMessage("");
    setLocationData(null);
    setLocationMessage("");
    setPaymentMethod(productCheckout ? "online" : "advance");
    setIsOpen(true);
  }

  function closeModal() {
    if (status !== "submitting") {
      setIsOpen(false);
    }
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const form = event.currentTarget;
    const formData = new FormData(form);

    if (!locationData) {
      setStatus("error");
      setMessage(
        "Please click Ã¢â‚¬Å“Use My Current LocationÃ¢â‚¬Â before confirming your booking.",
      );
      return;
    }

    const customer = {
      name: formData.get("name"),
      phone: formData.get("phone"),
      email: formData.get("email"),
      preferredDate: formData.get("preferredDate"),
      address: {
        houseNumber: formData.get("houseNumber"),
        buildingName: formData.get("buildingName"),
        street: formData.get("street"),
        area: formData.get("area"),
        landmark: formData.get("landmark"),
        city: formData.get("city"),
        state: formData.get("state"),
        pinCode: formData.get("pinCode"),
        googleMapsUrl: locationData.googleMapsUrl,
      },
    };

    setStatus("submitting");
    setMessage("");

    try {
      if (quoteOnly || (productCheckout && paymentMethod === "cod")) {
        const response = await fetch("/api/bookings", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
         body: JSON.stringify({
  packageId,
  paymentMethod: "cash",
  customer,
  customServices,
}),
        });

        const result = await readJsonResponse<BookingResponse>(response);

        if (!response.ok || !result.success) {
          throw new Error(result.message || "Booking could not be submitted.");
        }

        if (result.whatsappUrl) {
          window.open(result.whatsappUrl, "_blank", "noopener,noreferrer");
        }

        setStatus("success");
        setMessage(
          result.bookingId
            ? `Booking confirmed. Booking ID: ${result.bookingId}`
            : "Your booking request has been received.",
        );

        form.reset();
        setLocationData(null);
        setLocationMessage("");
        return;
      }

      if (!window.Razorpay) {
        throw new Error(
          "Payment window is still loading. Please wait and try again.",
        );
      }

      const orderResponse = await fetch("/api/payments/create-order", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          packageId,
          customServices,
          fullPayment: productCheckout || fullPayment,
          paymentType: productCheckout
            ? "full"
            : fullPayment
              ? "full"
              : "advance",
          requestedAmount: productCheckout
            ? offerPrice
            : undefined,
        }),
      });

      const orderResult =
        await readJsonResponse<CreatePaymentOrderResponse>(orderResponse);

      if (
        !orderResponse.ok ||
        !orderResult.success ||
        !orderResult.keyId ||
        !orderResult.orderId ||
        !orderResult.amount ||
        !orderResult.currency
      ) {
        throw new Error(
          orderResult.message || "Payment order could not be created.",
        );
      }

      const checkout = new window.Razorpay({
        key: orderResult.keyId,
        amount: orderResult.amount,
        currency: orderResult.currency,
        name: "City Coolies Pvt. Ltd.",
        description: `${serviceName} - ${productCheckout ? "Online Product Payment" : fullPayment ? "Site Visit / Survey Payment" : "50% Advance"}`,
        order_id: orderResult.orderId,

        prefill: {
          name: String(formData.get("name") ?? ""),
          email: String(formData.get("email") ?? ""),
          contact: String(formData.get("phone") ?? ""),
        },

        notes: {
          packageId,
          serviceName,
        },

        theme: {
          color: "#f21f2f",
          backdrop_color: "#fff5f6",
        },

        retry: {
          enabled: true,
          max_count: 3,
        },

        modal: {
          confirm_close: true,
          escape: true,
          animation: true,
          ondismiss: () => {
            setStatus("error");
            setMessage("Payment was not completed. You can try again.");
          },
        },

        handler: async (paymentResponse: RazorpaySuccessResponse) => {
          try {
            setStatus("submitting");
            setMessage("Verifying your payment...");

            const bookingResponse = await fetch("/api/bookings", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                packageId,
                paymentMethod: productCheckout ? "full" : "advance",
                customer,
                customServices,
                payment: {
                  razorpayOrderId: paymentResponse.razorpay_order_id,
                  razorpayPaymentId: paymentResponse.razorpay_payment_id,
                  razorpaySignature: paymentResponse.razorpay_signature,
                },
              }),
            });

            const bookingResult =
              await readJsonResponse<BookingResponse>(bookingResponse);

            if (!bookingResponse.ok || !bookingResult.success) {
              throw new Error(
                bookingResult.message || "Payment verification failed.",
              );
            }

            if (bookingResult.whatsappUrl) {
              window.open(
                bookingResult.whatsappUrl,
                "_blank",
                "noopener,noreferrer",
              );
            }

            setStatus("success");
            setMessage(
              bookingResult.bookingId
                ? `Payment successful. Booking ID: ${bookingResult.bookingId}`
                : "Payment successful and booking confirmed.",
            );

            form.reset();
            setLocationData(null);
            setLocationMessage("");
          } catch (error) {
            setStatus("error");
            setMessage(
              error instanceof Error
                ? error.message
                : "Payment verification failed.",
            );
          }
        },
      });

      checkout.on("payment.failed", (failure: RazorpayFailureResponse) => {
        setStatus("error");
        setMessage(
          failure.error.description ||
            "Payment failed. Please try another payment method.",
        );
      });

      checkout.open();
    } catch (error) {
      setStatus("error");
      setMessage(
        error instanceof Error
          ? error.message
          : "Something went wrong. Please try again.",
      );
    }
  }

  return (
    <>
      <Script
        id="razorpay-checkout"
        src="https://checkout.razorpay.com/v1/checkout.js"
        strategy="afterInteractive"
      />
     <button className="cc-booking-trigger" type="button" onClick={openModal}>
  {triggerLabel}
  
</button>

      {isOpen &&
        createPortal(
          <div
            className="cc-booking-overlay"
            role="presentation"
            onMouseDown={(event) => {
              if (event.target === event.currentTarget) {
                closeModal();
              }
            }}
          >
            <div
              className="cc-booking-modal"
              role="dialog"
              aria-modal="true"
              aria-labelledby={titleId}
            >
              <button
                className="cc-booking-modal__close"
                type="button"
                aria-label="Close booking form"
                onClick={closeModal}
              >
  <svg
    viewBox="0 0 24 24"
    aria-hidden="true"
    focusable="false"
  >
    <path d="M6 6 18 18M18 6 6 18" />
  </svg>
</button>

              <header className="cc-booking-modal__header">
                <p className="cc-booking-modal__eyebrow">Book Your Service</p>

                <h2 id={titleId}>{serviceName}</h2>

                <p>
                  Enter your details and continue with secure online payment.
                </p>
              </header>

              <form className="cc-booking-modal__form" onSubmit={handleSubmit}>
                <div className="cc-booking-modal__grid">
                  <label className="cc-booking-modal__field">
                    <span>Full Name</span>
                    <input
                      type="text"
                      name="name"
                      autoComplete="name"
                      placeholder="Enter your full name"
                      required
                    />
                  </label>

                  <label className="cc-booking-modal__field">
                    <span>Phone Number</span>
                    <input
                      type="tel"
                      name="phone"
                      inputMode="tel"
                      autoComplete="tel"
                      placeholder="Enter your WhatsApp number"
                      required
                    />
                  </label>

                  <label className="cc-booking-modal__field">
                    <span>Email Address</span>
                    <input
                      type="email"
                      name="email"
                      autoComplete="email"
                      placeholder="Enter your email address"
                      required
                    />
                  </label>

                  <label className="cc-booking-modal__field">
                    <span>Preferred Date</span>
                    <input type="date" name="preferredDate" required />
                  </label>

                  <label className="cc-booking-modal__field">
                    <span>House / Flat Number</span>
                    <input
                      type="text"
                      name="houseNumber"
                      placeholder="House or flat number"
                      required
                    />
                  </label>

                  <label className="cc-booking-modal__field">
                    <span>Building / Apartment Name</span>
                    <input
                      type="text"
                      name="buildingName"
                      placeholder="Building or apartment name"
                      required
                    />
                  </label>

                  <label className="cc-booking-modal__field cc-booking-modal__field--full">
                    <span>Street / Road Name</span>
                    <input
                      type="text"
                      name="street"
                      autoComplete="address-line1"
                      placeholder="Street, road or colony name"
                      required
                    />
                  </label>

                  <label className="cc-booking-modal__field">
                    <span>Area / Locality</span>
                    <input
                      type="text"
                      name="area"
                      autoComplete="address-line2"
                      placeholder="Area or locality"
                      required
                    />
                  </label>

                  <label className="cc-booking-modal__field">
                    <span>Landmark</span>
                    <input
                      type="text"
                      name="landmark"
                      placeholder="Nearby landmark"
                    />
                  </label>

                  <label className="cc-booking-modal__field">
                    <span>City</span>
                    <input
                      type="text"
                      name="city"
                      autoComplete="address-level2"
                      placeholder="Enter city"
                      required
                    />
                  </label>

                  <label className="cc-booking-modal__field">
                    <span>State</span>
                    <input
                      type="text"
                      name="state"
                      autoComplete="address-level1"
                      placeholder="Enter state"
                      required
                    />
                  </label>

                  <label className="cc-booking-modal__field cc-booking-modal__field--full">
                    <span>PIN Code</span>
                    <input
                      type="text"
                      name="pinCode"
                      inputMode="numeric"
                      autoComplete="postal-code"
                      pattern="[0-9]{6}"
                      maxLength={6}
                      placeholder="Enter 6-digit PIN code"
                      required
                    />
                  </label>
                  <div className="cc-booking-modal__location cc-booking-modal__field--full">
                    <button
                      type="button"
                      className="cc-booking-modal__location-button"
                      onClick={captureCurrentLocation}
                    >
                      <>
  <span
    className="cc-booking-modal__location-icon"
    aria-hidden="true"
  >
    <svg viewBox="0 0 24 24">
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v3M12 19v3M2 12h3M19 12h3" />
      <path d="M5.6 5.6 7.7 7.7M16.3 16.3l2.1 2.1M18.4 5.6l-2.1 2.1M7.7 16.3l-2.1 2.1" />
    </svg>
  </span>
  {locationData
    ? "Exact Location Added"
    : "Use My Current Location"}
</>
                    </button>

                    {locationMessage && (
                      <p className="cc-booking-modal__location-message">
                        {locationMessage}
                      </p>
                    )}

                    {locationData && (
                      <a
                        href={locationData.googleMapsUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        View location on Google Maps
                      </a>
                    )}
                  </div>
                </div>

                {productCheckout ? (
                  <div className="cc-booking-modal__payment">
                    <span className="cc-booking-modal__payment-title">
                      Choose Payment Method
                    </span>

                    <div className="cc-booking-modal__payment-options">
                      <label className="cc-booking-modal__payment-option">
                        <input
                          type="radio"
                          name="paymentMethod"
                          value="online"
                          checked={paymentMethod === "online"}
                          onChange={() => setPaymentMethod("online")}
                        />

                        <span>
                          <strong>Online Payment</strong>
                          <small>
                            Pay the complete product amount securely online.
                          </small>
                        </span>
                      </label>

                      <label className="cc-booking-modal__payment-option">
                        <input
                          type="radio"
                          name="paymentMethod"
                          value="cod"
                          checked={paymentMethod === "cod"}
                          onChange={() => setPaymentMethod("cod")}
                        />

                        <span>
                          <strong>Cash on Delivery</strong>
                          <small>
                            Pay when your products are delivered.
                          </small>
                        </span>
                      </label>
                    </div>
                  </div>
                ) : quoteOnly ? (
                <div className="cc-booking-modal__payment">
                  <span className="cc-booking-modal__payment-title">
                    Quotation Request
                  </span>

                  <div className="cc-booking-modal__payment-options">
                    <div className="cc-booking-modal__payment-option">
                      <span>
                        <strong>No Payment Required Now</strong>
                        <small>
                          Submit your details. The final quotation will be shared after work assessment or site inspection.
                        </small>
                      </span>
                    </div>
                  </div>
                </div>
              ) : fullPayment ? (
                <div className="cc-booking-modal__payment">
                  <span className="cc-booking-modal__payment-title">
                    Site Visit / Survey Payment
                  </span>

                  <div className="cc-booking-modal__payment-options">
                    <div className="cc-booking-modal__payment-option">
                      <span>
                        <strong>Site Visit / Survey Charge</strong>
                        <small>
                          Pay {formatCurrency(offerPrice)} now to confirm
                          the site visit / survey.
                        </small>
                      </span>
                    </div>
                  </div>
                </div>
              ) : (
<div className="cc-booking-modal__payment">
                  <span className="cc-booking-modal__payment-title">
                    Online Payment
                  </span>

                  <div className="cc-booking-modal__payment-options">
                    <label className="cc-booking-modal__payment-option">
                      <input
                        type="radio"
                        name="paymentMethod"
                        value="advance"
                        checked={paymentMethod === "advance"}
                        onChange={() => setPaymentMethod("advance")}
                      />

                      <span>
                        <strong>Pay 50% Advance</strong>
                        <small>
                          Pay {formatCurrency(advanceAmount)} now and confirm
                          your booking.
                        </small>
                      </span>
                    </label>
                  </div>
                </div>

                
              )}

              <div className="cc-booking-modal__summary">
                  <div className="cc-booking-modal__summary-row">
                    <span>Original price</span>
                    <del>{formatCurrency(originalPrice)}</del>
                  </div>

                  <div className="cc-booking-modal__summary-row">
                    <span>Service price</span>
                    <strong>{formatCurrency(offerPrice)}</strong>
                  </div>

                  <div className="cc-booking-modal__summary-row cc-booking-modal__summary-row--payable">
                    <span>Pay now</span>
                    <strong>{formatCurrency(payableNow)}</strong>
                  </div>

                  <div className="cc-booking-modal__summary-row">
                    <span>Remaining amount</span>
                    <strong>{formatCurrency(remainingAmount)}</strong>
                  </div>
                </div>

                <label className="cc-booking-modal__consent">
                  <input type="checkbox" required />
                  <span>
                    I confirm that the booking details are correct and agree to
                    receive booking updates on WhatsApp.
                  </span>
                </label>

                {message && (
                  <p
                    className={
                      status === "success"
                        ? "cc-booking-modal__success"
                        : "cc-booking-modal__error"
                    }
                    role="status"
                  >
                    {message}
                  </p>
                )}

                <button
                  className="cc-booking-modal__submit"
                  type="submit"
                  disabled={status === "submitting"}
                >
                  {status === "submitting"
                    ? "Please wait..."
                    : productCheckout
                      ? paymentMethod === "cod"
                        ? "Confirm Cash on Delivery"
                        : `Pay ${formatCurrency(offerPrice)} Online`
                      : quoteOnly
                        ? "Submit Quote Request"
                        : fullPayment
                        ? `Pay ${formatCurrency(offerPrice)} & Confirm Site Visit`
                      : `Pay ${formatCurrency(advanceAmount)} & Confirm`}
                </button>
              </form>
            </div>
          </div>,
          document.body,
        )}

      <style>{BOOKING_MODAL_STYLES}</style>
    </>
  );
}

type PackersMoversBookingModalProps = {
  serviceId: string;
  serviceName: string;
  estimatedTotal: number;
  distanceKm: number;
  inventoryTier: string;
  packingTier: string;
  accessType: string;
  triggerLabel?: string;
  triggerClassName?: string;
};

type PackersMoversOrderResponse = {
  success?: boolean;
  message?: string;
  keyId?: string;
  orderId?: string;
  amount?: number;
  currency?: string;
  advanceAmount?: number;
};

type PackersMoversBookingResponse = {
  success?: boolean;
  message?: string;
  bookingId?: string;
  whatsappUrl?: string;
};

type MoveLocationData = {
  latitude: number;
  longitude: number;
  googleMapsUrl: string;
};

export function PackersMoversBookingModal({
  serviceId,
  serviceName,
  estimatedTotal,
  distanceKm,
  inventoryTier,
  packingTier,
  accessType,
  triggerLabel = "Book Now",
  triggerClassName,
}: PackersMoversBookingModalProps) {
  const titleId = useId();

  const [isOpen, setIsOpen] = useState(false);

  const [status, setStatus] = useState<
    "idle" | "submitting" | "success" | "error"
  >("idle");

  const [message, setMessage] = useState("");

  const [pickupLocation, setPickupLocation] =
    useState<MoveLocationData | null>(null);

  const [dropLocation, setDropLocation] =
    useState<MoveLocationData | null>(null);

  const [pickupLocationMessage, setPickupLocationMessage] =
    useState("");

  const [dropLocationMessage, setDropLocationMessage] =
    useState("");

  const advanceAmount = useMemo(
    () => Math.round(estimatedTotal * 0.5),
    [estimatedTotal],
  );

  const remainingAmount = estimatedTotal - advanceAmount;

  const today = new Date().toISOString().slice(0, 10);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    function closeWithEscape(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    }

    window.addEventListener("keydown", closeWithEscape);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", closeWithEscape);
    };
  }, [isOpen]);

  function openModal() {
    setStatus("idle");
    setMessage("");
    setPickupLocation(null);
    setDropLocation(null);
    setPickupLocationMessage("");
    setDropLocationMessage("");
    setIsOpen(true);
  }

  function closeModal() {
    if (status !== "submitting") {
      setIsOpen(false);
    }
  }

  function captureLocation(target: "pickup" | "drop") {
    const setLocation =
      target === "pickup"
        ? setPickupLocation
        : setDropLocation;

    const setLocationMessage =
      target === "pickup"
        ? setPickupLocationMessage
        : setDropLocationMessage;

    if (!navigator.geolocation) {
      setLocationMessage(
        "Your browser does not support location access.",
      );
      return;
    }

    setLocationMessage("Getting exact location...");

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;

        setLocation({
          latitude,
          longitude,
          googleMapsUrl:
            `https://www.google.com/maps?q=${latitude},${longitude}`,
        });

        setLocationMessage("Exact Google Maps location added.");
      },
      () => {
        setLocation(null);

        setLocationMessage(
          "Location could not be captured. Please allow location permission and try again.",
        );
      },
      {
        enableHighAccuracy: true,
        timeout: 15000,
        maximumAge: 0,
      },
    );
  }

  function getAddress(
    formData: FormData,
    prefix: "pickup" | "drop",
    googleMapsUrl: string,
  ) {
    return {
      houseNumber: formData.get(`${prefix}HouseNumber`),
      buildingName: formData.get(`${prefix}BuildingName`),
      street: formData.get(`${prefix}Street`),
      area: formData.get(`${prefix}Area`),
      landmark: formData.get(`${prefix}Landmark`),
      city: formData.get(`${prefix}City`),
      state: formData.get(`${prefix}State`),
      pinCode: formData.get(`${prefix}PinCode`),
      googleMapsUrl,
    };
  }

  async function handleSubmit(
    event: FormEvent<HTMLFormElement>,
  ) {
    event.preventDefault();

    const form = event.currentTarget;
    const formData = new FormData(form);

    if (!pickupLocation) {
      setStatus("error");
      setMessage(
        "Please add the exact Pickup Google Maps location.",
      );
      return;
    }

    if (!dropLocation) {
      setStatus("error");
      setMessage(
        "Please add the exact Drop Google Maps location.",
      );
      return;
    }

    const pickup = getAddress(
      formData,
      "pickup",
      pickupLocation.googleMapsUrl,
    );

    const drop = getAddress(
      formData,
      "drop",
      dropLocation.googleMapsUrl,
    );

    const customer = {
      name: formData.get("name"),
      phone: formData.get("phone"),
      email: formData.get("email"),
      movingDate: formData.get("movingDate"),
    };

    const move = {
      serviceId,
      distanceKm,
      inventoryTier,
      packingTier,
      accessType,
    };

    setStatus("submitting");
    setMessage("");

    try {
      if (!window.Razorpay) {
        throw new Error(
          "Payment window is still loading. Please wait and try again.",
        );
      }

      const orderResponse = await fetch(
        "/api/packers-movers/payments/create-order",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            move,
          }),
        },
      );

      const orderResult =
        await readJsonResponse<PackersMoversOrderResponse>(
          orderResponse,
        );

      if (
        !orderResponse.ok ||
        !orderResult.success ||
        !orderResult.keyId ||
        !orderResult.orderId ||
        !orderResult.amount ||
        !orderResult.currency
      ) {
        throw new Error(
          orderResult.message ||
            "Payment order could not be created.",
        );
      }

      const checkout = new window.Razorpay({
        key: orderResult.keyId,
        amount: orderResult.amount,
        currency: orderResult.currency,
        name: "City Coolies Pvt. Ltd.",
        description:
          `${serviceName} - 50% Advance`,
        order_id: orderResult.orderId,

        prefill: {
          name: String(formData.get("name") ?? ""),
          email: String(formData.get("email") ?? ""),
          contact: String(formData.get("phone") ?? ""),
        },

        notes: {
          serviceId,
          serviceName,
        },

        theme: {
          color: "#f21f2f",
          backdrop_color: "#fff5f6",
        },

        retry: {
          enabled: true,
          max_count: 3,
        },

        modal: {
          confirm_close: true,
          escape: true,
          animation: true,
          ondismiss: () => {
            setStatus("error");
            setMessage(
              "Payment was not completed. You can try again.",
            );
          },
        },

        handler: async (
          paymentResponse: RazorpaySuccessResponse,
        ) => {
          try {
            setStatus("submitting");
            setMessage("Verifying your payment...");

            const bookingResponse = await fetch(
              "/api/packers-movers/bookings",
              {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({
                  customer,
                  pickup,
                  drop,
                  move,
                  payment: {
                    razorpayOrderId:
                      paymentResponse.razorpay_order_id,
                    razorpayPaymentId:
                      paymentResponse.razorpay_payment_id,
                    razorpaySignature:
                      paymentResponse.razorpay_signature,
                  },
                }),
              },
            );

            const bookingResult =
              await readJsonResponse<PackersMoversBookingResponse>(
                bookingResponse,
              );

            if (
              !bookingResponse.ok ||
              !bookingResult.success
            ) {
              throw new Error(
                bookingResult.message ||
                  "Payment verification failed.",
              );
            }

            if (bookingResult.whatsappUrl) {
              window.open(
                bookingResult.whatsappUrl,
                "_blank",
                "noopener,noreferrer",
              );
            }

            setStatus("success");

            setMessage(
              bookingResult.bookingId
                ? `Payment successful. Booking ID: ${bookingResult.bookingId}`
                : "Payment successful and move booking confirmed.",
            );

            form.reset();
            setPickupLocation(null);
            setDropLocation(null);
            setPickupLocationMessage("");
            setDropLocationMessage("");
          } catch (error) {
            setStatus("error");

            setMessage(
              error instanceof Error
                ? error.message
                : "Payment verification failed.",
            );
          }
        },
      });

      checkout.on(
        "payment.failed",
        (failure: RazorpayFailureResponse) => {
          setStatus("error");

          setMessage(
            failure.error.description ||
              "Payment failed. Please try another payment method.",
          );
        },
      );

      checkout.open();
    } catch (error) {
      setStatus("error");

      setMessage(
        error instanceof Error
          ? error.message
          : "Something went wrong. Please try again.",
      );
    }
  }

  function renderAddressFields(
    prefix: "pickup" | "drop",
    title: string,
    location: MoveLocationData | null,
    locationMessage: string,
  ) {
    const locationLabel =
      prefix === "pickup"
        ? "Pickup Google Maps Location"
        : "Drop Google Maps Location";

    return (
      <>
        <div
          className="cc-booking-modal__field cc-booking-modal__field--full"
          style={{
            marginTop: "8px",
            paddingTop: "15px",
            borderTop: "1px solid rgba(35,40,50,.1)",
          }}
        >
          <strong
            style={{
              color: "#ed1b2b",
              fontSize: "0.9rem",
            }}
          >
            {title}
          </strong>
        </div>

        <label className="cc-booking-modal__field">
          <span>House / Flat Number</span>
          <input
            type="text"
            name={`${prefix}HouseNumber`}
            placeholder="House or flat number"
            required
          />
        </label>

        <label className="cc-booking-modal__field">
          <span>Building / Apartment Name</span>
          <input
            type="text"
            name={`${prefix}BuildingName`}
            placeholder="Building or apartment name"
          />
        </label>

        <label className="cc-booking-modal__field cc-booking-modal__field--full">
          <span>Street / Road Name</span>
          <input
            type="text"
            name={`${prefix}Street`}
            placeholder="Street, road or colony name"
            required
          />
        </label>

        <label className="cc-booking-modal__field">
          <span>Area / Locality</span>
          <input
            type="text"
            name={`${prefix}Area`}
            placeholder="Area or locality"
            required
          />
        </label>

        <label className="cc-booking-modal__field">
          <span>Landmark</span>
          <input
            type="text"
            name={`${prefix}Landmark`}
            placeholder="Nearby landmark"
          />
        </label>

        <label className="cc-booking-modal__field">
          <span>City</span>
          <input
            type="text"
            name={`${prefix}City`}
            placeholder="Enter city"
            required
          />
        </label>

        <label className="cc-booking-modal__field">
          <span>State</span>
          <input
            type="text"
            name={`${prefix}State`}
            placeholder="Enter state"
            required
          />
        </label>

        <label className="cc-booking-modal__field cc-booking-modal__field--full">
          <span>PIN Code</span>
          <input
            type="text"
            name={`${prefix}PinCode`}
            inputMode="numeric"
            pattern="[0-9]{6}"
            maxLength={6}
            placeholder="Enter 6-digit PIN code"
            required
          />
        </label>

        <div className="cc-booking-modal__location cc-booking-modal__field--full">
          <strong
            style={{
              display: "block",
              marginBottom: "8px",
              color: "#333945",
              fontSize: "0.78rem",
            }}
          >
            {locationLabel}
          </strong>

          <button
            type="button"
            className="cc-booking-modal__location-button"
            onClick={() => captureLocation(prefix)}
          >
            {location
              ? "Exact Location Added"
              : `Use Current ${prefix === "pickup" ? "Pickup" : "Drop"} Location`}
          </button>

          {locationMessage && (
            <p className="cc-booking-modal__location-message">
              {locationMessage}
            </p>
          )}

          {location && (
            <a
              href={location.googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              View {prefix} location on Google Maps
            </a>
          )}
        </div>
      </>
    );
  }

  return (
    <>
      <Script
        id="razorpay-checkout"
        src="https://checkout.razorpay.com/v1/checkout.js"
        strategy="afterInteractive"
      />

      <button
        className={
          triggerClassName || "cc-booking-trigger"
        }
        type="button"
        onClick={openModal}
      >
        {triggerLabel}
        <span aria-hidden="true">&rarr;</span>
      </button>

      {isOpen &&
        createPortal(
          <div
            className="cc-booking-overlay"
            role="presentation"
            onMouseDown={(event) => {
              if (event.target === event.currentTarget) {
                closeModal();
              }
            }}
          >
            <div
              className="cc-booking-modal"
              role="dialog"
              aria-modal="true"
              aria-labelledby={titleId}
            >
              <button
                className="cc-booking-modal__close"
                type="button"
                aria-label="Close booking form"
                onClick={closeModal}
              >
                x
              </button>

              <header className="cc-booking-modal__header">
                <p className="cc-booking-modal__eyebrow">
                  Book Packers & Movers
                </p>

                <h2 id={titleId}>{serviceName}</h2>

                <p>
                  Enter your moving details. A 50% advance
                  online payment is required to confirm this
                  booking.
                </p>
              </header>

              <form
                className="cc-booking-modal__form"
                onSubmit={handleSubmit}
              >
                <div className="cc-booking-modal__grid">
                  <label className="cc-booking-modal__field">
                    <span>Full Name</span>
                    <input
                      type="text"
                      name="name"
                      autoComplete="name"
                      placeholder="Enter your full name"
                      required
                    />
                  </label>

                  <label className="cc-booking-modal__field">
                    <span>Phone Number</span>
                    <input
                      type="tel"
                      name="phone"
                      inputMode="numeric"
                      pattern="[0-9]{10}"
                      maxLength={10}
                      autoComplete="tel"
                      placeholder="10-digit mobile number"
                      required
                    />
                  </label>

                  <label className="cc-booking-modal__field">
                    <span>Email Address</span>
                    <input
                      type="email"
                      name="email"
                      autoComplete="email"
                      placeholder="Enter your email address"
                      required
                    />
                  </label>

                  <label className="cc-booking-modal__field">
                    <span>Moving Date</span>
                    <input
                      type="date"
                      name="movingDate"
                      min={today}
                      required
                    />
                  </label>

                  {renderAddressFields(
                    "pickup",
                    "Pickup Address",
                    pickupLocation,
                    pickupLocationMessage,
                  )}

                  {renderAddressFields(
                    "drop",
                    "Drop Address",
                    dropLocation,
                    dropLocationMessage,
                  )}
                </div>

                <div className="cc-booking-modal__payment">
                  <span className="cc-booking-modal__payment-title">
                    Payment Method
                  </span>

                  <div className="cc-booking-modal__payment-options">
                    <label className="cc-booking-modal__payment-option">
                      <input
                        type="radio"
                        checked
                        readOnly
                      />

                      <span>
                        <strong>
                          Pay 50% Advance Online
                        </strong>

                        <small>
                          Pay {formatCurrency(advanceAmount)}
                          {" "}now through secure Razorpay
                          checkout to confirm your move.
                        </small>
                      </span>
                    </label>
                  </div>
                </div>

                <div className="cc-booking-modal__summary">
                  <div className="cc-booking-modal__summary-row">
                    <span>Estimated move price</span>
                    <strong>
                      {formatCurrency(estimatedTotal)}
                    </strong>
                  </div>

                  <div className="cc-booking-modal__summary-row cc-booking-modal__summary-row--payable">
                    <span>Pay now - 50% advance</span>
                    <strong>
                      {formatCurrency(advanceAmount)}
                    </strong>
                  </div>

                  <div className="cc-booking-modal__summary-row">
                    <span>Remaining amount</span>
                    <strong>
                      {formatCurrency(remainingAmount)}
                    </strong>
                  </div>
                </div>

                <label className="cc-booking-modal__consent">
                  <input type="checkbox" required />

                  <span>
                    I confirm that the pickup, drop and moving
                    details are correct and agree to receive
                    booking updates on WhatsApp.
                  </span>
                </label>

                {message && (
                  <p
                    className={
                      status === "success"
                        ? "cc-booking-modal__success"
                        : "cc-booking-modal__error"
                    }
                    role="status"
                  >
                    {message}
                  </p>
                )}

                <button
                  className="cc-booking-modal__submit"
                  type="submit"
                  disabled={status === "submitting"}
                >
                  {status === "submitting"
                    ? "Please wait..."
                    : `Pay ${formatCurrency(advanceAmount)} & Confirm Move`}
                </button>
              </form>
            </div>
          </div>,
          document.body,
        )}

      <style>{BOOKING_MODAL_STYLES}</style>
    </>
  );
}

export function CustomCleaningBuilder() {
  const [quantities, setQuantities] = useState<Record<string, number>>({});
  const [isCalculated, setIsCalculated] = useState(false);

  const selectedServices = useMemo(
    () =>
      CUSTOM_CLEANING_SERVICES.flatMap((service) => {
        const quantity = quantities[service.id] ?? 0;

        if (quantity === 0) {
          return [];
        }

        return [
          {
            ...service,
            quantity,
            lineTotal: quantity * service.price,
          },
        ];
      }),
    [quantities],
  );

  const total = useMemo(
    () =>
      selectedServices.reduce(
        (currentTotal, service) =>
          currentTotal + service.lineTotal,
        0,
      ),
    [selectedServices],
  );

  function changeQuantity(
    serviceId: string,
    change: number,
  ) {
    setQuantities((currentQuantities) => ({
      ...currentQuantities,
      [serviceId]: Math.max(
        0,
        (currentQuantities[serviceId] ?? 0) + change,
      ),
    }));

    setIsCalculated(false);
  }

  function toggleService(serviceId: string) {
    setQuantities((currentQuantities) => ({
      ...currentQuantities,
      [serviceId]:
        (currentQuantities[serviceId] ?? 0) > 0 ? 0 : 1,
    }));

    setIsCalculated(false);
  }

  return (
    <div className="cc-custom-builder">
      <div className="cc-custom-builder__services">
        {CUSTOM_CLEANING_SERVICES.map((service) => {
          const quantity = quantities[service.id] ?? 0;

          return (
            <article
              className="cc-custom-builder__service"
              key={service.id}
            >
              <div className="cc-custom-builder__service-info">
  <CustomCleaningIcon serviceId={service.id} />

  <div className="cc-custom-builder__service-copy">
    <h3>{service.name}</h3>

    <p>
      <strong>
        â‚¹{service.price.toLocaleString("en-IN")}
      </strong>{" "}
      {service.unitLabel}
    </p>
  </div>
</div>
              {service.selectionType === "quantity" ? (
                <div
                  className="cc-custom-builder__quantity"
                  aria-label={`${service.name} quantity`}
                >
                  <button
                    type="button"
                    aria-label={`Remove one ${service.name}`}
                    disabled={quantity === 0}
                    onClick={() =>
                      changeQuantity(service.id, -1)
                    }
                  >
                    âˆ’
                  </button>

                  <strong aria-live="polite">
                    {quantity}
                  </strong>

                  <button
                    type="button"
                    aria-label={`Add one ${service.name}`}
                    onClick={() =>
                      changeQuantity(service.id, 1)
                    }
                  >
                    +
                  </button>
                </div>
              ) : (
                <button
                  className={`cc-custom-builder__toggle${
                    quantity > 0
                      ? " cc-custom-builder__toggle--selected"
                      : ""
                  }`}
                  type="button"
                  aria-pressed={quantity > 0}
                  onClick={() => toggleService(service.id)}
                >
                  {quantity > 0 ? "Ã¢Å“â€œ Selected" : "Select"}
                </button>
              )}
            </article>
          );
        })}
      </div>

      <aside className="cc-custom-builder__summary">
        <h3>Your Custom Plan</h3>

        <p className="cc-custom-builder__count">
          {selectedServices.length} services selected
        </p>

        {selectedServices.length === 0 ? (
          <p className="cc-custom-builder__empty">
            Select at least one cleaning service to continue.
          </p>
        ) : (
          <ul className="cc-custom-builder__selected">
            {selectedServices.map((service) => (
              <li key={service.id}>
                <div className="cc-custom-builder__selected-service">
  <CustomCleaningIcon serviceId={service.id} />

  <span>
    {service.name} Ã— {service.quantity}
  </span>
</div>

                <strong>
                  â‚¹
                  {service.lineTotal.toLocaleString(
                    "en-IN",
                  )}
                </strong>
              </li>
            ))}
          </ul>
        )}

        <button
          className="cc-custom-builder__calculate"
          type="button"
          disabled={total === 0}
          onClick={() => setIsCalculated(true)}
        >
          Continue & Calculate Total
        </button>

        {isCalculated && total > 0 && (
          <>
            <div className="cc-custom-builder__total">
              <span>Total</span>

              <strong>
                â‚¹{total.toLocaleString("en-IN")}
              </strong>
            </div>

            <div className="cc-custom-builder__booking">
              <ServiceBookingModal
  packageId="custom-cleaning-plan"
  serviceName="Customized Cleaning Plan"
  originalPrice={total}
  offerPrice={total}
  triggerLabel="Add & Continue to Payment"
  customServices={selectedServices.map((service) => ({
    id: service.id,
    name: service.name,
    quantity: service.quantity,
    unitPrice: service.price,
    lineTotal: service.lineTotal,
  }))}
/>
            </div>
          </>
        )}
      </aside>

      <style>{CUSTOM_CLEANING_STYLES}</style>
    </div>
  );
}
const CUSTOM_KITCHEN_BUILDER_STYLES = `
.cc-booking-modal.cc-kitchen-builder-modal {
  width: min(100%, 1180px);
}

  .cc-kitchen-builder-modal__content {
    padding: 24px;
  }

  @media (max-width: 760px) {
    .cc-kitchen-builder-modal__content {
      padding: 16px;
    }
  }
`;

export function CustomKitchenCleaningBuilder() {
  const titleId = useId();
  const [isOpen, setIsOpen] = useState(false);
  const [selectedServiceIds, setSelectedServiceIds] =
    useState<Set<string>>(new Set());
  const [isCalculated, setIsCalculated] = useState(false);
  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    }

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  const selectedServices = useMemo(
    () =>
      CUSTOM_KITCHEN_CLEANING_SERVICES.filter((service) =>
        selectedServiceIds.has(service.id),
      ).map((service) => ({
        ...service,
        quantity: 1,
        lineTotal: service.price,
      })),
    [selectedServiceIds],
  );

  const total = useMemo(
    () =>
      selectedServices.reduce(
        (currentTotal, service) =>
          currentTotal + service.lineTotal,
        0,
      ),
    [selectedServices],
  );

  function toggleService(serviceId: string) {
    setSelectedServiceIds((currentServiceIds) => {
      const nextServiceIds = new Set(currentServiceIds);

      if (nextServiceIds.has(serviceId)) {
        nextServiceIds.delete(serviceId);
      } else {
        nextServiceIds.add(serviceId);
      }

      return nextServiceIds;
    });

    setIsCalculated(false);
  }

  function openBuilder() {
    setIsCalculated(false);
    setIsOpen(true);
  }

  function closeBuilder() {
    setIsOpen(false);
  }

  return (
    <>
      <button
        className="cc-kitchen__custom-button"
        type="button"
        onClick={openBuilder}
      >
        Add
      </button>

      {isOpen &&
        createPortal(
          <div
            className="cc-booking-overlay"
            role="presentation"
            onMouseDown={(event) => {
              if (event.target === event.currentTarget) {
                closeBuilder();
              }
            }}
          >
            <div
              className="cc-booking-modal cc-kitchen-builder-modal"
              role="dialog"
              aria-modal="true"
              aria-labelledby={titleId}
            >
              <button
                className="cc-booking-modal__close"
                type="button"
                aria-label="Close custom kitchen plan"
                onClick={closeBuilder}
              >
                Ã—
              </button>

              <header className="cc-booking-modal__header">
                <p className="cc-booking-modal__eyebrow">
                  Customize Kitchen Cleaning
                </p>

                <h2 id={titleId}>Build your own kitchen plan</h2>

                <p>
                  Select only the kitchen-cleaning services you need.
                  Your total updates securely from trusted prices.
                </p>
              </header>

              <div className="cc-kitchen-builder-modal__content">
                <div className="cc-custom-builder">
                  <div className="cc-custom-builder__services">
                    {CUSTOM_KITCHEN_CLEANING_SERVICES.map(
                      (service) => {
                        const isSelected =
                          selectedServiceIds.has(service.id);

                        return (
                          <article
                            className="cc-custom-builder__service"
                            key={service.id}
                          >
                            <div className="cc-custom-builder__service-info">
                              <CustomKitchenCleaningIcon
                                serviceId={service.id}
                              />

                              <div className="cc-custom-builder__service-copy">
                                <h3>{service.name}</h3>

                                <p>
                                  <strong>
                                    â‚¹
                                    {service.price.toLocaleString(
                                      "en-IN",
                                    )}
                                  </strong>{" "}
                                  {service.unitLabel}
                                </p>
                              </div>
                            </div>

                            <button
                              className={`cc-custom-builder__toggle${
                                isSelected
                                  ? " cc-custom-builder__toggle--selected"
                                  : ""
                              }`}
                              type="button"
                              aria-pressed={isSelected}
                              onClick={() =>
                                toggleService(service.id)
                              }
                            >
                              {isSelected ? "Ã¢Å“â€œ Selected" : "Select"}
                            </button>
                          </article>
                        );
                      },
                    )}
                  </div>

                  <aside className="cc-custom-builder__summary">
                    <h3>Your Kitchen Plan</h3>

                    <p className="cc-custom-builder__count">
                      {selectedServices.length} services selected
                    </p>

                    {selectedServices.length === 0 ? (
                      <p className="cc-custom-builder__empty">
                        Select at least one kitchen-cleaning service
                        to continue.
                      </p>
                    ) : (
                      <ul className="cc-custom-builder__selected">
                        {selectedServices.map((service) => (
                          <li key={service.id}>
                            <div className="cc-custom-builder__selected-service">
                              <CustomKitchenCleaningIcon
                                serviceId={service.id}
                              />

                              <span>{service.name}</span>
                            </div>

                            <strong>
                              â‚¹
                              {service.lineTotal.toLocaleString(
                                "en-IN",
                              )}
                            </strong>
                          </li>
                        ))}
                      </ul>
                    )}

                    <button
                      className="cc-custom-builder__calculate"
                      type="button"
                      disabled={total === 0}
                      onClick={() => setIsCalculated(true)}
                    >
                      Continue & Calculate Total
                    </button>

                    {isCalculated && total > 0 && (
                      <>
                        <div className="cc-custom-builder__total">
                          <span>Total</span>

                          <strong>
                            â‚¹{total.toLocaleString("en-IN")}
                          </strong>
                        </div>

                        <div className="cc-custom-builder__booking">
                          <ServiceBookingModal
                            packageId="custom-kitchen-cleaning-plan"
                            serviceName="Custom Kitchen Cleaning Plan"
                            originalPrice={total}
                            offerPrice={total}
                            triggerLabel="Add & Continue to Payment"
                            customServices={selectedServices.map(
                              (service) => ({
                                id: service.id,
                                name: service.name,
                                quantity: service.quantity,
                                unitPrice: service.price,
                                lineTotal: service.lineTotal,
                              }),
                            )}
                          />
                        </div>
                      </>
                    )}
                  </aside>

                  <style>{CUSTOM_CLEANING_STYLES}</style>
                </div>
              </div>
            </div>
          </div>,
          document.body,
        )}

      <style>
        {`${BOOKING_MODAL_STYLES}
        ${CUSTOM_KITCHEN_BUILDER_STYLES}`}
      </style>
    </>
  );
}
export function CustomBathroomCleaningBuilder() {
  const titleId = useId();
  const [isOpen, setIsOpen] = useState(false);
  const [selectedServiceIds, setSelectedServiceIds] =
    useState<Set<string>>(new Set());
  const [isCalculated, setIsCalculated] = useState(false);
  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    }

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  const selectedServices = useMemo(
    () =>
      CUSTOM_BATHROOM_CLEANING_SERVICES.filter((service) =>
        selectedServiceIds.has(service.id),
      ).map((service) => ({
        ...service,
        quantity: 1,
        lineTotal: service.price,
      })),
    [selectedServiceIds],
  );

  const total = useMemo(
    () =>
      selectedServices.reduce(
        (currentTotal, service) =>
          currentTotal + service.lineTotal,
        0,
      ),
    [selectedServices],
  );

  function toggleService(serviceId: string) {
    setSelectedServiceIds((currentServiceIds) => {
      const nextServiceIds = new Set(currentServiceIds);

      if (nextServiceIds.has(serviceId)) {
        nextServiceIds.delete(serviceId);
      } else {
        nextServiceIds.add(serviceId);
      }

      return nextServiceIds;
    });

    setIsCalculated(false);
  }

  function openBuilder() {
    setIsCalculated(false);
    setIsOpen(true);
  }

  function closeBuilder() {
    setIsOpen(false);
  }

  return (
    <>
      <button
        className="cc-bathroom__custom-button"
        type="button"
        onClick={openBuilder}
      >
        Customize
      </button>

      {isOpen &&
        createPortal(
          <div
            className="cc-booking-overlay"
            role="presentation"
            onMouseDown={(event) => {
              if (event.target === event.currentTarget) {
                closeBuilder();
              }
            }}
          >
            <div
              className="cc-booking-modal cc-kitchen-builder-modal"
              role="dialog"
              aria-modal="true"
              aria-labelledby={titleId}
            >
              <button
                className="cc-booking-modal__close"
                type="button"
                aria-label="Close custom bathroom plan"
                onClick={closeBuilder}
              >
                Ã—
              </button>

              <header className="cc-booking-modal__header">
                <p className="cc-booking-modal__eyebrow">
                  Customize Bathroom Cleaning
                </p>

                <h2 id={titleId}>
                  Build your own bathroom plan
                </h2>

                <p>
                  Select only the bathroom-cleaning services you
                  need. Your total updates securely from trusted
                  prices.
                </p>
              </header>

              <div className="cc-kitchen-builder-modal__content">
                <div className="cc-custom-builder">
                  <div className="cc-custom-builder__services">
                    {CUSTOM_BATHROOM_CLEANING_SERVICES.map(
                      (service) => {
                        const isSelected =
                          selectedServiceIds.has(service.id);

                        return (
                          <article
                            className="cc-custom-builder__service"
                            key={service.id}
                          >
                            <div className="cc-custom-builder__service-info">
                              <CustomBathroomCleaningIcon
                                serviceId={service.id}
                              />

                              <div className="cc-custom-builder__service-copy">
                                <h3>{service.name}</h3>

                                <p>
                                  <strong>
                                    â‚¹
                                    {service.price.toLocaleString(
                                      "en-IN",
                                    )}
                                  </strong>{" "}
                                  {service.unitLabel}
                                </p>
                              </div>
                            </div>

                            <button
                              className={`cc-custom-builder__toggle${
                                isSelected
                                  ? " cc-custom-builder__toggle--selected"
                                  : ""
                              }`}
                              type="button"
                              aria-pressed={isSelected}
                              onClick={() =>
                                toggleService(service.id)
                              }
                            >
                              {isSelected
                                ? "Ã¢Å“â€œ Selected"
                                : "Select"}
                            </button>
                          </article>
                        );
                      },
                    )}
                  </div>

                  <aside className="cc-custom-builder__summary">
                    <h3>Your Bathroom Plan</h3>

                    <p className="cc-custom-builder__count">
                      {selectedServices.length} services selected
                    </p>

                    {selectedServices.length === 0 ? (
                      <p className="cc-custom-builder__empty">
                        Select at least one bathroom-cleaning service
                        to continue.
                      </p>
                    ) : (
                      <ul className="cc-custom-builder__selected">
                        {selectedServices.map((service) => (
                          <li key={service.id}>
                            <div className="cc-custom-builder__selected-service">
                              <CustomBathroomCleaningIcon
                                serviceId={service.id}
                              />

                              <span>{service.name}</span>
                            </div>

                            <strong>
                              â‚¹
                              {service.lineTotal.toLocaleString(
                                "en-IN",
                              )}
                            </strong>
                          </li>
                        ))}
                      </ul>
                    )}

                    <button
                      className="cc-custom-builder__calculate"
                      type="button"
                      disabled={total === 0}
                      onClick={() => setIsCalculated(true)}
                    >
                      Continue &amp; Calculate Total
                    </button>

                    {isCalculated && total > 0 && (
                      <>
                        <div className="cc-custom-builder__total">
                          <span>Total</span>

                          <strong>
                            â‚¹{total.toLocaleString("en-IN")}
                          </strong>
                        </div>

                        <div className="cc-custom-builder__booking">
                          <ServiceBookingModal
                            packageId="custom-bathroom-cleaning-plan"
                            serviceName="Custom Bathroom Cleaning Plan"
                            originalPrice={total}
                            offerPrice={total}
                            triggerLabel="Add & Continue to Payment"
                            customServices={selectedServices.map(
                              (service) => ({
                                id: service.id,
                                name: service.name,
                                quantity: service.quantity,
                                unitPrice: service.price,
                                lineTotal: service.lineTotal,
                              }),
                            )}
                          />
                        </div>
                      </>
                    )}
                  </aside>

                  <style>{CUSTOM_CLEANING_STYLES}</style>
                </div>
              </div>
            </div>
          </div>,
          document.body,
        )}

      <style>
        {`${BOOKING_MODAL_STYLES}
        ${CUSTOM_KITCHEN_BUILDER_STYLES}`}
      </style>
    </>
  );
}


