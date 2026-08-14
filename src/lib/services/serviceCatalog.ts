export type ServicePackage = {
  id: string;
  name: string;
  originalPrice: number;
  offerPrice: number;
  advancePercentage: number;
};
export type CustomCleaningService = {
  id: string;
  name: string;
  unitPrice: number;
  allowsQuantity: boolean;
};

export const CUSTOM_CLEANING_SERVICES: Record<
  string,
  CustomCleaningService
> = {
  "bedroom-cleaning": {
    id: "bedroom-cleaning",
    name: "Bedroom Cleaning",
    unitPrice: 500,
    allowsQuantity: true,
  },
  "living-room-cleaning": {
    id: "living-room-cleaning",
    name: "Living Room Cleaning",
    unitPrice: 800,
    allowsQuantity: true,
  },
  "restroom-cleaning": {
    id: "restroom-cleaning",
    name: "Restroom Cleaning",
    unitPrice: 1000,
    allowsQuantity: true,
  },
  "window-grill-glass-cleaning": {
    id: "window-grill-glass-cleaning",
    name: "Window, Grill & Glass Cleaning",
    unitPrice: 500,
    allowsQuantity: true,
  },
  "tv-cleaning": {
    id: "tv-cleaning",
    name: "TV Cleaning",
    unitPrice: 150,
    allowsQuantity: true,
  },
  "balcony-cleaning": {
    id: "balcony-cleaning",
    name: "Balcony Cleaning",
    unitPrice: 350,
    allowsQuantity: true,
  },
  "utility-area-cleaning": {
    id: "utility-area-cleaning",
    name: "Utility Area Cleaning",
    unitPrice: 1000,
    allowsQuantity: false,
  },
  "cobweb-removal": {
    id: "cobweb-removal",
    name: "Cobweb Removal",
    unitPrice: 500,
    allowsQuantity: false,
  },
};
export const CUSTOM_KITCHEN_CLEANING_SERVICES: Record<
  string,
  CustomCleaningService
> = {
  "kitchen-cabinets-cleaning": {
    id: "kitchen-cabinets-cleaning",
    name: "Kitchen Cabinets Cleaning",
    unitPrice: 499,
    allowsQuantity: false,
  },

  "chimney-exhaust-cleaning": {
    id: "chimney-exhaust-cleaning",
    name: "Chimney & Exhaust Cleaning",
    unitPrice: 599,
    allowsQuantity: false,
  },

  "hob-stove-cleaning": {
    id: "hob-stove-cleaning",
    name: "Hob & Stove Cleaning",
    unitPrice: 399,
    allowsQuantity: false,
  },

  "microwave-cleaning": {
    id: "microwave-cleaning",
    name: "Microwave Cleaning",
    unitPrice: 399,
    allowsQuantity: false,
  },

  "refrigerator-cleaning": {
    id: "refrigerator-cleaning",
    name: "Refrigerator Cleaning",
    unitPrice: 599,
    allowsQuantity: false,
  },

  "oven-cleaning": {
    id: "oven-cleaning",
    name: "Oven Cleaning",
    unitPrice: 499,
    allowsQuantity: false,
  },

  "sink-tiles-cleaning": {
    id: "sink-tiles-cleaning",
    name: "Sink & Tiles Cleaning",
    unitPrice: 499,
    allowsQuantity: false,
  },

  "kitchen-floor-cleaning": {
    id: "kitchen-floor-cleaning",
    name: "Kitchen Floor Cleaning",
    unitPrice: 399,
    allowsQuantity: false,
  },
};
export const CUSTOM_BATHROOM_CLEANING_SERVICES: Record<
  string,
  CustomCleaningService
> = {
  "bathroom-toilet-basin-cleaning": {
    id: "bathroom-toilet-basin-cleaning",
    name: "Toilet & Basin Cleaning",
    unitPrice: 299,
    allowsQuantity: false,
  },

  "bathroom-floor-tile-cleaning": {
    id: "bathroom-floor-tile-cleaning",
    name: "Floor & Tile Cleaning",
    unitPrice: 399,
    allowsQuantity: false,
  },

  "bathroom-wall-tile-cleaning": {
    id: "bathroom-wall-tile-cleaning",
    name: "Wall Tile Deep Cleaning",
    unitPrice: 399,
    allowsQuantity: false,
  },

  "bathroom-shower-glass-cleaning": {
    id: "bathroom-shower-glass-cleaning",
    name: "Shower & Glass Cleaning",
    unitPrice: 349,
    allowsQuantity: false,
  },

  "bathroom-hard-water-treatment": {
    id: "bathroom-hard-water-treatment",
    name: "Hard-Water Stain Treatment",
    unitPrice: 399,
    allowsQuantity: false,
  },

  "bathroom-tap-fixture-cleaning": {
    id: "bathroom-tap-fixture-cleaning",
    name: "Tap & Fixture Cleaning",
    unitPrice: 249,
    allowsQuantity: false,
  },

  "bathroom-drain-sanitization": {
    id: "bathroom-drain-sanitization",
    name: "Drain Cleaning & Sanitization",
    unitPrice: 199,
    allowsQuantity: false,
  },

  "bathroom-bathtub-cleaning": {
    id: "bathroom-bathtub-cleaning",
    name: "Bathtub Deep Cleaning",
    unitPrice: 399,
    allowsQuantity: false,
  },
};
const SERVICE_PACKAGES: Record<string, ServicePackage> = {
  "1-bhk-home-cleaning": {
    id: "1-bhk-home-cleaning",
    name: "1 BHK Home Cleaning",
    originalPrice: 6000,
    offerPrice: 3999,
    advancePercentage: 50,
  },
  "2-bhk-home-cleaning": {
  id: "2-bhk-home-cleaning",
  name: "2 BHK Home Cleaning",
  originalPrice: 6500,
  offerPrice: 4999,
  advancePercentage: 50,
},
"3-bhk-home-cleaning": {
  id: "3-bhk-home-cleaning",
  name: "3 BHK Home Cleaning",
  originalPrice: 7000,
  offerPrice: 5999,
  advancePercentage: 50,
},
"4-bhk-home-cleaning": {
  id: "4-bhk-home-cleaning",
  name: "4 BHK Home Cleaning",
  originalPrice: 9000,
  offerPrice: 6999,
  advancePercentage: 50,
},
  "1-bhk-furnished-home-cleaning": {
    id: "1-bhk-furnished-home-cleaning",
    name: "1 BHK Furnished Home Cleaning",
    originalPrice: 6000,
    offerPrice: 4299,
    advancePercentage: 50,
  },

  "2-bhk-furnished-home-cleaning": {
    id: "2-bhk-furnished-home-cleaning",
    name: "2 BHK Furnished Home Cleaning",
    originalPrice: 6500,
    offerPrice: 5299,
    advancePercentage: 50,
  },

  "3-bhk-furnished-home-cleaning": {
    id: "3-bhk-furnished-home-cleaning",
    name: "3 BHK Furnished Home Cleaning",
    originalPrice: 7000,
    offerPrice: 6299,
    advancePercentage: 50,
  },

  "4-bhk-furnished-home-cleaning": {
    id: "4-bhk-furnished-home-cleaning",
    name: "4 BHK Furnished Home Cleaning",
    originalPrice: 9000,
    offerPrice: 7299,
    advancePercentage: 50,
  },
    "occupied-kitchen-deep-cleaning": {
    id: "occupied-kitchen-deep-cleaning",
    name: "Occupied Kitchen Deep Cleaning",
    originalPrice: 1599,
    offerPrice: 1099,
    advancePercentage: 50,
  },

  "empty-kitchen-cleaning": {
    id: "empty-kitchen-cleaning",
    name: "Empty Kitchen Cleaning",
    originalPrice: 1299,
    offerPrice: 899,
    advancePercentage: 50,
  },

  "kitchen-appliances-cleaning": {
    id: "kitchen-appliances-cleaning",
    name: "Kitchen + Appliances",
    originalPrice: 2499,
    offerPrice: 1799,
    advancePercentage: 50,
  },

  "commercial-kitchen-cleaning": {
    id: "commercial-kitchen-cleaning",
    name: "Commercial Kitchen Cleaning",
    originalPrice: 6499,
    offerPrice: 4999,
    advancePercentage: 50,
  },
    "intense-bathroom-cleaning-1": {
    id: "intense-bathroom-cleaning-1",
    name: "Intense Bathroom Deep Cleaning - 1 Bathroom",
    originalPrice: 899,
    offerPrice: 649,
    advancePercentage: 50,
  },

  "intense-bathroom-cleaning-2": {
    id: "intense-bathroom-cleaning-2",
    name: "Intense Bathroom Deep Cleaning - 2 Bathrooms",
    originalPrice: 1798,
    offerPrice: 1199,
    advancePercentage: 50,
  },

  "intense-bathroom-cleaning-3": {
    id: "intense-bathroom-cleaning-3",
    name: "Intense Bathroom Deep Cleaning - 3 Bathrooms",
    originalPrice: 2697,
    offerPrice: 1699,
    advancePercentage: 50,
  },

  "intense-bathroom-cleaning-4": {
    id: "intense-bathroom-cleaning-4",
    name: "Intense Bathroom Deep Cleaning - 4 Bathrooms",
    originalPrice: 3596,
    offerPrice: 2199,
    advancePercentage: 50,
  },

  "classic-bathroom-cleaning": {
    id: "classic-bathroom-cleaning",
    name: "Classic Bathroom Cleaning",
    originalPrice: 699,
    offerPrice: 449,
    advancePercentage: 50,
  },

  "hard-water-stain-descaling": {
    id: "hard-water-stain-descaling",
    name: "Hard-Water Stain & Descaling",
    originalPrice: 999,
    offerPrice: 749,
    advancePercentage: 50,
  },

  "empty-bathroom-cleaning": {
    id: "empty-bathroom-cleaning",
    name: "Empty / Move-in Bathroom Cleaning",
    originalPrice: 1099,
    offerPrice: 799,
    advancePercentage: 50,
  },

  "commercial-washroom-cleaning": {
    id: "commercial-washroom-cleaning",
    name: "Commercial Washroom Cleaning",
    originalPrice: 3499,
    offerPrice: 2499,
    advancePercentage: 50,
  },
};

export function getServicePackage(
  packageId: string,
): ServicePackage | null {
  return SERVICE_PACKAGES[packageId] ?? null;
}

export function calculateAdvanceAmount(
  servicePackage: ServicePackage,
): number {
  return Math.round(
    (servicePackage.offerPrice *
      servicePackage.advancePercentage) /
      100,
  );
}
export type CalculatedCustomService = {
  id: string;
  name: string;
  quantity: number;
  unitPrice: number;
  lineTotal: number;
};

export type CalculatedCustomCleaningPlan = {
  services: CalculatedCustomService[];
  total: number;
  advanceAmount: number;
  remainingAmount: number;
};

export function calculateCustomCleaningPlan(
  selectedServices: unknown,
): CalculatedCustomCleaningPlan | null {
  if (
    !Array.isArray(selectedServices) ||
    selectedServices.length === 0
  ) {
    return null;
  }

  const usedServiceIds = new Set<string>();
  const services: CalculatedCustomService[] = [];

  for (const selectedService of selectedServices) {
    if (
      !selectedService ||
      typeof selectedService !== "object"
    ) {
      return null;
    }

    const item = selectedService as {
      id?: unknown;
      quantity?: unknown;
    };

    if (
      typeof item.id !== "string" ||
      usedServiceIds.has(item.id)
    ) {
      return null;
    }

    const trustedService =
      CUSTOM_CLEANING_SERVICES[item.id];

    if (!trustedService) {
      return null;
    }

    const quantity = Number(item.quantity);

    if (
      !Number.isInteger(quantity) ||
      quantity < 1 ||
      quantity > 20
    ) {
      return null;
    }

    if (!trustedService.allowsQuantity && quantity !== 1) {
      return null;
    }

    usedServiceIds.add(item.id);

    services.push({
      id: trustedService.id,
      name: trustedService.name,
      quantity,
      unitPrice: trustedService.unitPrice,
      lineTotal: trustedService.unitPrice * quantity,
    });
  }

  const total = services.reduce(
    (sum, service) => sum + service.lineTotal,
    0,
  );

  const advanceAmount = Math.round(total * 0.5);

  return {
    services,
    total,
    advanceAmount,
    remainingAmount: total - advanceAmount,
  };
}
export function calculateCustomKitchenCleaningPlan(
  selectedServices: unknown,
): CalculatedCustomCleaningPlan | null {
  if (
    !Array.isArray(selectedServices) ||
    selectedServices.length === 0
  ) {
    return null;
  }

  const usedServiceIds = new Set<string>();
  const services: CalculatedCustomService[] = [];

  for (const selectedService of selectedServices) {
    if (
      !selectedService ||
      typeof selectedService !== "object"
    ) {
      return null;
    }

    const item = selectedService as {
      id?: unknown;
      quantity?: unknown;
    };

    if (
      typeof item.id !== "string" ||
      usedServiceIds.has(item.id)
    ) {
      return null;
    }

    const trustedService =
      CUSTOM_KITCHEN_CLEANING_SERVICES[item.id];

    if (!trustedService) {
      return null;
    }

    const quantity = Number(item.quantity);

    if (
      !Number.isInteger(quantity) ||
      quantity < 1 ||
      quantity > 20
    ) {
      return null;
    }

    if (!trustedService.allowsQuantity && quantity !== 1) {
      return null;
    }

    usedServiceIds.add(item.id);

    services.push({
      id: trustedService.id,
      name: trustedService.name,
      quantity,
      unitPrice: trustedService.unitPrice,
      lineTotal: trustedService.unitPrice * quantity,
    });
  }

  const total = services.reduce(
    (sum, service) => sum + service.lineTotal,
    0,
  );

  const advanceAmount = Math.round(total * 0.5);

  return {
    services,
    total,
    advanceAmount,
    remainingAmount: total - advanceAmount,
  };
}
export function calculateCustomBathroomCleaningPlan(
  selectedServices: unknown,
): CalculatedCustomCleaningPlan | null {
  if (
    !Array.isArray(selectedServices) ||
    selectedServices.length === 0
  ) {
    return null;
  }

  const usedServiceIds = new Set<string>();
  const services: CalculatedCustomService[] = [];

  for (const selectedService of selectedServices) {
    if (
      !selectedService ||
      typeof selectedService !== "object"
    ) {
      return null;
    }

    const item = selectedService as {
      id?: unknown;
      quantity?: unknown;
    };

    if (
      typeof item.id !== "string" ||
      usedServiceIds.has(item.id)
    ) {
      return null;
    }

    const trustedService =
      CUSTOM_BATHROOM_CLEANING_SERVICES[item.id];

    if (!trustedService) {
      return null;
    }

    const quantity = Number(item.quantity);

    if (
      !Number.isInteger(quantity) ||
      quantity < 1 ||
      quantity > 20
    ) {
      return null;
    }

    if (!trustedService.allowsQuantity && quantity !== 1) {
      return null;
    }

    usedServiceIds.add(item.id);

    services.push({
      id: trustedService.id,
      name: trustedService.name,
      quantity,
      unitPrice: trustedService.unitPrice,
      lineTotal: trustedService.unitPrice * quantity,
    });
  }

  const total = services.reduce(
    (sum, service) => sum + service.lineTotal,
    0,
  );

  const advanceAmount = Math.round(total * 0.5);

  return {
    services,
    total,
    advanceAmount,
    remainingAmount: total - advanceAmount,
  };
}