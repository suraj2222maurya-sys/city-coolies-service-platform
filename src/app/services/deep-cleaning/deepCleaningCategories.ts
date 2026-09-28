export const deepCleaningCategories = [
  {
    id: "full-home-by-room",
    name: "Full Home / By Room Cleaning",
  },
  {
    id: "living-bedroom",
    name: "Sofa, Carpet & Mattress Cleaning",
  },
  {
    id: "kitchen-cleaning",
    name: "Kitchen Cleaning",
  },
  {
    id: "bathroom-cleaning",
    name: "Bathroom Cleaning",
  },
  {
    id: "tank-cleaning",
    name: "Tank Cleaning",
  },
  {
    id: "industrial-cleaning",
    name: "Industrial & Commercial Cleaning",
  },
  {
    id: "cobweb-cleaning",
    name: "Cobweb Cleaning",
  },
] as const;

export type DeepCleaningCategoryId =
  (typeof deepCleaningCategories)[number]["id"];
