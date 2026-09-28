export type DeepCleaningCartItem = {
  id: string;
  serviceTitle: string;
  optionLabel: string;
  price: number;
  priceLabel: string;
  duration: string;
};

const CART_KEY = "city-coolies:deep-cleaning-cart:v1";
const CART_EVENT = "citycoolies:deep-cleaning-cart-change";

function isBrowser(): boolean {
  return typeof window !== "undefined";
}

export function readDeepCleaningCart(): DeepCleaningCartItem[] {
  if (!isBrowser()) {
    return [];
  }

  try {
    const raw = window.localStorage.getItem(CART_KEY);

    if (!raw) {
      return [];
    }

    const parsed: unknown = JSON.parse(raw);

    if (!Array.isArray(parsed)) {
      return [];
    }

    return parsed.filter(
      (item): item is DeepCleaningCartItem =>
        typeof item === "object" &&
        item !== null &&
        "id" in item &&
        typeof item.id === "string" &&
        "serviceTitle" in item &&
        typeof item.serviceTitle === "string" &&
        "optionLabel" in item &&
        typeof item.optionLabel === "string" &&
        "price" in item &&
        typeof item.price === "number" &&
        "priceLabel" in item &&
        typeof item.priceLabel === "string" &&
        "duration" in item &&
        typeof item.duration === "string",
    );
  } catch {
    return [];
  }
}

function writeDeepCleaningCart(
  items: DeepCleaningCartItem[],
): void {
  if (!isBrowser()) {
    return;
  }

  window.localStorage.setItem(
    CART_KEY,
    JSON.stringify(items),
  );

  window.dispatchEvent(
    new Event(CART_EVENT),
  );
}

export function upsertDeepCleaningCartItem(
  item: DeepCleaningCartItem,
): void {
  const current = readDeepCleaningCart();

  const next = current.filter(
    (existingItem) => existingItem.id !== item.id,
  );

  next.push(item);

  writeDeepCleaningCart(next);

  window.dispatchEvent(
    new Event("citycoolies:deep-cleaning-cart-added"),
  );
}

export function removeDeepCleaningCartItem(
  id: string,
): void {
  const next = readDeepCleaningCart().filter(
    (item) => item.id !== id,
  );

  writeDeepCleaningCart(next);
  removeCommittedService(id);
}

export function getDeepCleaningCartSnapshot(): string {
  if (!isBrowser()) {
    return "[]";
  }

  return window.localStorage.getItem(CART_KEY) ?? "[]";
}

export function getDeepCleaningCartServerSnapshot(): string {
  return "[]";
}

export function parseDeepCleaningCartSnapshot(
  snapshot: string,
): DeepCleaningCartItem[] {
  try {
    const parsed: unknown = JSON.parse(snapshot);

    if (!Array.isArray(parsed)) {
      return [];
    }

    return parsed as DeepCleaningCartItem[];
  } catch {
    return [];
  }
}

export function subscribeDeepCleaningCart(
  listener: () => void,
): () => void {
  if (!isBrowser()) {
    return () => undefined;
  }

  const handleCustomEvent = () => {
    listener();
  };

  const handleStorage = (
    event: StorageEvent,
  ) => {
    if (event.key === CART_KEY) {
      listener();
    }
  };

  window.addEventListener(
    CART_EVENT,
    handleCustomEvent,
  );

  window.addEventListener(
    "storage",
    handleStorage,
  );

  return () => {
    window.removeEventListener(
      CART_EVENT,
      handleCustomEvent,
    );

    window.removeEventListener(
      "storage",
      handleStorage,
    );
  };
}

// CITY_COOLIES_COMMITTED_SERVICES_START
const COMMITTED_SERVICES_KEY = "city-coolies:committed-services:v1";

export function getCommittedServicesSnapshot(): string {
  if (typeof window === "undefined") return "[]";
  return window.localStorage.getItem(COMMITTED_SERVICES_KEY) ?? "[]";
}

export function getCommittedServicesServerSnapshot(): string {
  return "[]";
}

function writeCommittedServices(items: DeepCleaningCartItem[]): void {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(COMMITTED_SERVICES_KEY, JSON.stringify(items));
  window.dispatchEvent(new Event(CART_EVENT));
}

export function commitDeepCleaningCart(): void {
  writeCommittedServices(readDeepCleaningCart());
}

export function appendCommittedService(item: DeepCleaningCartItem): void {
  const items = parseDeepCleaningCartSnapshot(getCommittedServicesSnapshot());
  writeCommittedServices([...items.filter((entry) => entry.id !== item.id), item]);
}

function removeCommittedService(id: string): void {
  const items = parseDeepCleaningCartSnapshot(getCommittedServicesSnapshot());
  writeCommittedServices(items.filter((item) => item.id !== id));
}
// CITY_COOLIES_COMMITTED_SERVICES_END