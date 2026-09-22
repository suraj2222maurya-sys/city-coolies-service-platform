export type CobwebPricingUnit =
  | "room"
  | "living-room"
  | "balcony"
  | "kitchen"
  | "square-foot";

export type CobwebCleaningService = {
  id: string;
  name: string;
  image: string;
  description: string;
  rating: number;
  reviewCount: number;
  duration: string;
  rate: number;
  pricingUnit: CobwebPricingUnit;
  includes: readonly string[];
  pricingNote: string;
};

export const COBWEB_SITE_SURVEY_FEE = 500;

export const COBWEB_CLEANING_SERVICES: readonly CobwebCleaningService[] = [
  {
    id: "full-room-cobweb-cleaning",
    name: "Full-Room Ceiling & Cobweb Cleaning",
    image: "/full-room-cobweb-cleaning.webp",
    description:
      "Professional dry dusting and cobweb removal from ceiling edges, corners and accessible high surfaces.",
    rating: 4.9,
    reviewCount: 4826,
    duration: "Site Survey",
    rate: COBWEB_SITE_SURVEY_FEE,
    pricingUnit: "room",
    includes: [
      "Ceiling Corner Cleaning",
      "Cobweb Removal",
      "Dry Dusting",
    ],
    pricingNote:
      "₹500 site survey charge. Final cleaning price will be confirmed after site inspection.",
  },
  {
    id: "ceiling-corner-cobweb-removal",
    name: "Ceiling Corner Cobweb Removal",
    image: "/ceiling-corner-cobweb-removal.webp",
    description:
      "Focused cobweb removal and dry dusting for bedroom and room ceiling corners.",
    rating: 4.8,
    reviewCount: 2168,
    duration: "Site Survey",
    rate: COBWEB_SITE_SURVEY_FEE,
    pricingUnit: "room",
    includes: [
      "Corner Cobweb Removal",
      "Ceiling-Edge Dusting",
      "Vacuum Dust Collection",
    ],
    pricingNote:
      "₹500 site survey charge. Final cleaning price will be confirmed after site inspection.",
  },
  {
    id: "living-room-cobweb-care",
    name: "Living Room Cobweb Care",
    image: "/living-room-cobweb-care.webp",
    description:
      "Complete living-room care covering cobwebs, ceiling fan, windows and sofa vacuuming.",
    rating: 4.9,
    reviewCount: 3542,
    duration: "Site Survey",
    rate: COBWEB_SITE_SURVEY_FEE,
    pricingUnit: "living-room",
    includes: [
      "Cobweb & Fan Cleaning",
      "Window Wiping",
      "Sofa Vacuuming",
    ],
    pricingNote:
      "₹500 site survey charge. Final cleaning price will be confirmed after site inspection.",
  },
  {
    id: "balcony-grill-cobweb-cleaning",
    name: "Balcony & Grill Cobweb Cleaning",
    image: "/balcony-grill-cobweb-cleaning.webp",
    description:
      "Cobweb removal and surface cleaning for accessible balcony corners, grills and railings.",
    rating: 4.8,
    reviewCount: 1876,
    duration: "Site Survey",
    rate: COBWEB_SITE_SURVEY_FEE,
    pricingUnit: "balcony",
    includes: [
      "Balcony Corner Cleaning",
      "Grill Cobweb Removal",
      "Railing Wiping",
    ],
    pricingNote:
      "₹500 site survey charge. Final cleaning price will be confirmed after site inspection.",
  },
  {
    id: "kitchen-ceiling-cobweb-cleaning",
    name: "Kitchen Ceiling & Vent Cobweb Cleaning",
    image: "/kitchen-ceiling-cobweb-cleaning.webp",
    description:
      "Safe dry cleaning for kitchen ceiling corners and accessible exterior vent areas.",
    rating: 4.8,
    reviewCount: 1624,
    duration: "Site Survey",
    rate: COBWEB_SITE_SURVEY_FEE,
    pricingUnit: "kitchen",
    includes: [
      "Ceiling Cobweb Removal",
      "Corner Dry Dusting",
      "Vent Exterior Dusting",
    ],
    pricingNote:
      "₹500 site survey charge. Final cleaning price will be confirmed after site inspection.",
  },
  {
    id: "office-shop-cobweb-cleaning",
    name: "Office & Shop Cobweb Cleaning",
    image: "/office-shop-cobweb-cleaning.webp",
    description:
      "Professional cobweb and high-surface dry dusting for offices, shops and showrooms.",
    rating: 4.8,
    reviewCount: 1138,
    duration: "Site Survey",
    rate: COBWEB_SITE_SURVEY_FEE,
    pricingUnit: "square-foot",
    includes: [
      "Ceiling-Edge Cleaning",
      "High-Shelf Dusting",
      "Vent Exterior Cleaning",
    ],
    pricingNote:
      "₹500 site survey charge. Final cleaning price will be confirmed after site inspection.",
  },
  {
    id: "duplex-high-ceiling-cobweb-cleaning",
    name: "Duplex & High-Ceiling Cobweb Cleaning",
    image: "/duplex-high-ceiling-cobweb-cleaning.webp",
    description:
      "Specialized telescopic cleaning for duplex homes, staircases and accessible high ceilings.",
    rating: 4.9,
    reviewCount: 846,
    duration: "Site Survey",
    rate: COBWEB_SITE_SURVEY_FEE,
    pricingUnit: "square-foot",
    includes: [
      "Double-Height Corner Cleaning",
      "Staircase Cobweb Removal",
      "Telescopic Dry Dusting",
    ],
    pricingNote:
      "₹500 site survey charge. Final cleaning price will be confirmed after site inspection.",
  },
] as const;

export function getCobwebPricingUnitLabel(
  pricingUnit: CobwebPricingUnit,
): string {
  if (pricingUnit === "room") {
    return "room";
  }

  if (pricingUnit === "living-room") {
    return "living room";
  }

  if (pricingUnit === "balcony") {
    return "balcony";
  }

  if (pricingUnit === "kitchen") {
    return "kitchen";
  }

  return "sq. ft.";
}

export type CobwebCleaningPlanService = {
  id: string;
  name: string;
  quantity: number;
  unitPrice: number;
  lineTotal: number;
};

export type CobwebCleaningPlan = {
  services: readonly CobwebCleaningPlanService[];
  total: number;
  advanceAmount: number;
};

export function calculateCobwebCleaningEstimate(
  service: CobwebCleaningService,
  quantity: number,
): number | null {
  if (
    !service.id ||
    !Number.isSafeInteger(quantity) ||
    quantity <= 0
  ) {
    return null;
  }

  return COBWEB_SITE_SURVEY_FEE;
}

export function calculateCobwebCleaningPlan(
  input: unknown,
): CobwebCleaningPlan | null {
  if (!Array.isArray(input) || input.length !== 1) {
    return null;
  }

  const rawItem = input[0] as
    | {
        id?: unknown;
      }
    | undefined;

  if (!rawItem || typeof rawItem.id !== "string") {
    return null;
  }

  const service = COBWEB_CLEANING_SERVICES.find(
    (availableService) =>
      availableService.id === rawItem.id,
  );

  if (!service) {
    return null;
  }

  return {
    services: [
      {
        id: service.id,
        name: `${service.name} - Site Survey`,
        quantity: 1,
        unitPrice: COBWEB_SITE_SURVEY_FEE,
        lineTotal: COBWEB_SITE_SURVEY_FEE,
      },
    ],
    total: COBWEB_SITE_SURVEY_FEE,
    advanceAmount: COBWEB_SITE_SURVEY_FEE,
  };
}
