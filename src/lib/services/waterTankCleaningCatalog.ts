export type WaterTankCapacityOption = {
  id: string;
  label: string;
  litres: number;
  rate: number;
};

export type WaterTankCleaningService = {
  id: string;
  name: string;
  image: string;
  description: string;
  rating: number;
  reviewCount: number;
  duration: string;
  featured?: boolean;
  includes: readonly string[];
  capacities: readonly WaterTankCapacityOption[];
};

export const WATER_TANK_RATE_PER_LITRE = 0.15;

function calculateCapacityRate(litres: number): number {
  return Math.round(litres * WATER_TANK_RATE_PER_LITRE);
}

const standardCapacities = (
  prefix: string,
): readonly WaterTankCapacityOption[] => [
  {
    id: `${prefix}-500l`,
    label: "500 litres",
    litres: 500,
    rate: calculateCapacityRate(500),
  },
  {
    id: `${prefix}-1000l`,
    label: "1,000 litres",
    litres: 1000,
    rate: calculateCapacityRate(1000),
  },
  {
    id: `${prefix}-2000l`,
    label: "2,000 litres",
    litres: 2000,
    rate: calculateCapacityRate(2000),
  },
  {
    id: `${prefix}-3000l`,
    label: "3,000 litres",
    litres: 3000,
    rate: calculateCapacityRate(3000),
  },
  {
    id: `${prefix}-5000l`,
    label: "5,000 litres",
    litres: 5000,
    rate: calculateCapacityRate(5000),
  },
  {
    id: `${prefix}-10000l`,
    label: "10,000 litres",
    litres: 10000,
    rate: calculateCapacityRate(10000),
  },
];

export const WATER_TANK_CLEANING_SERVICES: readonly WaterTankCleaningService[] = [
  {
    id: "complete-water-tank-cleaning",
    name: "Complete Water Tank Cleaning",
    image: "/water-tank-cleaning-service.png",
    description:
      "Complete dewatering, sludge removal, internal scrubbing, sanitization and final rinse.",
    rating: 4.9,
    reviewCount: 1386,
    duration: "1–3 hrs",
    featured: true,
    includes: [
      "Dewatering",
      "Sludge Removal",
      "Deep Scrubbing",
      "Sanitization",
    ],
    capacities: standardCapacities(
      "complete-water-tank-cleaning",
    ),
  },
  {
    id: "overhead-water-tank-cleaning",
    name: "Overhead Water Tank Cleaning",
    image: "/overhead-water-tank-cleaning.webp",
    description:
      "Safe rooftop tank cleaning with professional equipment and hygienic sanitization.",
    rating: 4.8,
    reviewCount: 946,
    duration: "1–2 hrs",
    includes: [
      "Dewatering",
      "Wall Scrubbing",
      "Vacuum Cleaning",
    ],
    capacities: standardCapacities(
      "overhead-water-tank-cleaning",
    ),
  },
  {
    id: "underground-sump-cleaning",
    name: "Underground Sump Cleaning",
    image: "/underground-sump-cleaning.webp",
    description:
      "Professional sump dewatering, sediment removal and deep sanitization.",
    rating: 4.8,
    reviewCount: 768,
    duration: "2–4 hrs",
    includes: [
      "Sediment Removal",
      "Pressure Washing",
      "Disinfection",
    ],
    capacities: standardCapacities(
      "underground-sump-cleaning",
    ),
  },
  {
    id: "concrete-water-tank-cleaning",
    name: "Concrete Water Tank Cleaning",
    image: "/concrete-water-tank-cleaning.webp",
    description:
      "Heavy-duty cleaning for concrete tanks, stubborn deposits and accumulated sludge.",
    rating: 4.7,
    reviewCount: 528,
    duration: "2–5 hrs",
    includes: [
      "Heavy Sludge Removal",
      "Machine Scrubbing",
      "Sanitization",
    ],
    capacities: standardCapacities(
      "concrete-water-tank-cleaning",
    ),
  },
  {
    id: "commercial-multi-tank-cleaning",
    name: "Commercial & Multi-Tank Cleaning",
    image: "/commercial-multi-tank-cleaning.webp",
    description:
      "Planned tank-cleaning service for apartments, offices, hotels and commercial properties.",
    rating: 4.9,
    reviewCount: 412,
    duration: "Site based",
    includes: [
      "Multi-Tank Team",
      "Commercial Equipment",
      "Service Report",
    ],
    capacities: standardCapacities(
      "commercial-multi-tank-cleaning",
    ),
  },
] as const;

export type WaterTankCleaningPlanService = {
  id: string;
  name: string;
  quantity: number;
  unitPrice: number;
  lineTotal: number;
};

export type WaterTankCleaningPlan = {
  services: readonly WaterTankCleaningPlanService[];
  total: number;
  advanceAmount: number;
};

export function calculateWaterTankCleaningPlan(
  input: unknown,
): WaterTankCleaningPlan | null {
  if (!Array.isArray(input) || input.length !== 1) {
    return null;
  }

  const raw = input[0] as
    | {
        id?: unknown;
        quantity?: unknown;
      }
    | undefined;

  if (
    !raw ||
    typeof raw.id !== "string" ||
    typeof raw.quantity !== "number" ||
    !Number.isSafeInteger(raw.quantity) ||
    raw.quantity < 1 ||
    raw.quantity > 50
  ) {
    return null;
  }

  const service = WATER_TANK_CLEANING_SERVICES.find(
    (item) =>
      item.capacities.some(
        (capacity) => capacity.id === raw.id,
      ),
  );

  const capacity = service?.capacities.find(
    (item) => item.id === raw.id,
  );

  if (!service || !capacity) {
    return null;
  }

  const lineTotal = capacity.rate * raw.quantity;

  if (
    !Number.isSafeInteger(lineTotal) ||
    lineTotal <= 0
  ) {
    return null;
  }

  return {
    services: [
      {
        id: capacity.id,
        name: `${service.name} — ${capacity.label}`,
        quantity: raw.quantity,
        unitPrice: capacity.rate,
        lineTotal,
      },
    ],
    total: lineTotal,
    advanceAmount: Math.round(lineTotal * 0.5),
  };
}
