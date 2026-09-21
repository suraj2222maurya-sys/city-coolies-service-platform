import IndustrialCleaningSection from "./IndustrialCleaningSection";
import CommercialCleaningSection from "./CommercialCleaningSection";
import CobwebCleaningSection from "./CobwebCleaningSection";
import OfficeCleaningSection from "./OfficeCleaningSection";
import VillaCleaningSection from "./VillaCleaningSection";
import UpholsteryCleaningSection from "./UpholsteryCleaningSection";
import WaterTankCleaningSection from "./WaterTankCleaningSection";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import ServiceBookingModal, {
  CustomCleaningBuilder,
  CustomKitchenCleaningBuilder,
  CustomBathroomCleaningBuilder,
} from "@/components/booking/ServiceBookingModal";
export const metadata: Metadata = {
  title: "Professional Deep Cleaning Services in Chennai | City Coolies",
  description:
    "Book professional deep cleaning services for homes, apartments, offices and commercial properties in Chennai with City Coolies.",
};

type CategoryName =
  | "Full Home"
  | "Kitchen"
  | "Bathroom"
  | "Industrial Cleaning"
  | "Commercial Cleaning"
  | "Cobweb Cleaning"
  | "Office"
  | "Villa Cleaning"
  | "Mattress & Sofa Cleaning"
  | "Water Tank Cleaning";

const categories: Array<{
  name: CategoryName;
  paths: string[];
}> = [
  {
    name: "Full Home",
    paths: ["M3 10.5 12 3l9 7.5", "M5 9.5V21h14V9.5", "M9 21v-7h6v7"],
  },
  {
    name: "Kitchen",
    paths: [
      "M5 3v18",
      "M9 3v5a4 4 0 0 1-4 4",
      "M15 3v18",
      "M15 11h5V3",
      "M20 3v18",
    ],
  },
  {
    name: "Bathroom",
    paths: [
      "M4 13h16v3a4 4 0 0 1-4 4H8a4 4 0 0 1-4-4v-3Z",
      "M6 13V7a3 3 0 0 1 6 0",
      "M3 13h18",
      "M7 20v1",
      "M17 20v1",
    ],
  },
  {
    name: "Industrial Cleaning",
    paths: ["M3 21V9l6 3V9l6 3V5h6v16H3Z", "M7 16h2", "M12 16h2", "M17 16h2"],
  },
  {
    name: "Commercial Cleaning",
    paths: ["M4 21V4h12v17", "M16 9h4v12", "M8 8h4", "M8 12h4", "M8 16h4"],
  },
  {
    name: "Cobweb Cleaning",
    paths: [
      "M12 3v18",
      "M3 12h18",
      "m5.6 5.6 12.8 12.8",
      "m18.4 0-12.8 12.8",
      "M7 7c3 3 7 3 10 0",
      "M7 17c3-3 7-3 10 0",
    ],
  },
  {
    name: "Office",
    paths: [
      "M4 21V5l10-2v18",
      "M14 9h6v12",
      "M8 8h2",
      "M8 12h2",
      "M8 16h2",
      "M17 13h1",
      "M17 17h1",
    ],
  },
  {
    name: "Villa Cleaning",
    paths: ["M3 21V10l9-7 9 7v11", "M7 21v-8h10v8", "M9 13h6", "M12 13v8"],
  },
  {
    name: "Mattress & Sofa Cleaning",
    paths: ["M4 8c0-2 1.5-4 4-4h8c2.5 0 4 2 4 4v8", "M4 13h16v6H4z", "M7 19v2", "M17 19v2"],
  },
  {
    name: "Water Tank Cleaning",
    paths: ["M12 3c3.8 4.2 6 7.2 6 10a6 6 0 0 1-12 0c0-2.8 2.2-5.8 6-10Z", "M9 14a3 3 0 0 0 3 3"],
  },
];
const fullHomePackages = [
  {
  id: "1-bhk-home-cleaning",
  name: "1 BHK Home Cleaning",
  image: "/home-cleaning.webp",
  description:
    "Professional deep cleaning for every room, surface and essential area of a 1 BHK home.",
    rating: 4.4,
originalPrice: 6000,
offerPrice: 3999,
  includes: [
    "Bedroom Cleaning",
    "Hall Cleaning",
    "Kitchen Cleaning",
    "Restroom Cleaning",
    "Grill Cleaning",
    "Glass Cleaning",
    "Dusting & Vacuuming",
    "Fan Cleaning",
    "Light Cleaning",
  ],
},
  {
  id: "2-bhk-home-cleaning",
  name: "2 BHK Home Cleaning",
  image: "/home-cleaning.webp",
  description:
    "Complete deep cleaning for every essential area of a comfortable and hygienic 2 BHK home.",
    rating: 4.3,
originalPrice: 6500,
offerPrice: 4999,
  includes: [
    "2 Bedroom Cleaning",
    "Living Room & Hall Cleaning",
    "Floor Cleaning",
    "Balcony Cleaning",
    "Utility Area Cleaning",
    "Window Glass & Grill Cleaning",
    "2 Restroom Cleaning",
    "Kitchen Cleaning",
    "Fan & Light Cleaning",
    "TV Exterior Cleaning",
  ],
},
  {
  id: "3-bhk-home-cleaning",
  name: "3 BHK Home Cleaning",
  image: "/home-cleaning.webp",
  description:
    "Detailed professional cleaning for every essential living area of a spacious 3 BHK home.",
  rating: 4.2,
  originalPrice: 7000,
  offerPrice: 5999,
  includes: [
    "3 Bedroom Cleaning",
    "Living Room & Hall Cleaning",
    "3 Bathroom Cleaning",
    "Floor Cleaning",
    "Balcony Cleaning",
    "Window Glass & Grill Cleaning",
    "Fan & Light Cleaning",
    "TV Exterior Cleaning",
    "Utility Area Cleaning",
  ],
},
  {
  id: "4-bhk-home-cleaning",
  name: "4 BHK Home Cleaning",
  image: "/home-cleaning.webp",
  description:
    "Comprehensive professional cleaning for every essential area of a spacious 4 BHK home.",
  rating: 4.4,
  originalPrice: 9000,
  offerPrice: 6999,
  includes: [
    "4 Bedroom Cleaning",
    "Living Room & Hall Cleaning",
    "Balcony Cleaning",
    "Kitchen Cleaning",
    "4 Bathroom Cleaning",
    "Fan & Light Cleaning",
    "TV Exterior Cleaning",
    "Floor Cleaning",
    "Utility Area Cleaning",
    "Cobweb Removal",
  ],
},
] as const;
const furnishedHomePackages = fullHomePackages.map(
  (servicePackage) => ({
    ...servicePackage,
    id: servicePackage.id.replace(
      "-home-cleaning",
      "-furnished-home-cleaning",
    ),
    name: servicePackage.name.replace(
      "Home Cleaning",
      "Furnished Home Cleaning",
    ),
    image: "/furnished-home-cleaning.webp",
    rating: 4.2,
    offerPrice: servicePackage.offerPrice + 300,
  }),
);
type KitchenPackage = {
  id: string;
  name: string;
  image: string;
  description: string;
  rating: number;
  reviewCount: number;
  duration: string;
  originalPrice: number;
  offerPrice: number;
  includes: readonly string[];
};

const occupiedKitchenPackage: KitchenPackage = {
  id: "occupied-kitchen-deep-cleaning",
  name: "Occupied Kitchen Deep Cleaning",
  image: "/kitchen-cleaning.webp",
  description:
    "Complete deep cleaning for regularly used kitchens without moving household items.",
  rating: 4.8,
  reviewCount: 892,
  duration: "3–4 hrs",
  originalPrice: 3000,
  offerPrice: 3000,
  includes: [
    "Cabinets & Counters Cleaning",
    "Sink & Tiles Deep Cleaning",
    "Appliance Exterior Cleaning",
  ],
};

const kitchenNeedPackages: readonly KitchenPackage[] = [
  {
    id: "empty-kitchen-cleaning",
    name: "Empty Kitchen Cleaning",
    image: "/empty-kitchen-cleaning.webp",
    description:
      "Complete deep cleaning for empty kitchens before moving in or after moving out.",
    rating: 4.8,
    reviewCount: 742,
    duration: "4–5 hrs",
    originalPrice: 2500,
    offerPrice: 2500,
    includes: [
      "Inside Cabinets & Drawers",
      "Wall, Tile & Floor Cleaning",
      "Sink & Counter Cleaning",
    ],
  },
  {
    id: "kitchen-appliances-cleaning",
    name: "Kitchen + Appliances",
    image: "/kitchen-appliances-cleaning.webp",
    description:
      "Detailed cleaning of the kitchen and its major appliances.",
    rating: 4.9,
    reviewCount: 615,
    duration: "4–6 hrs",
    originalPrice: 2499,
    offerPrice: 1799,
    includes: [
      "Chimney & Hob Cleaning",
      "Oven & Microwave Cleaning",
      "Refrigerator Cleaning",
    ],
  },
  {
    id: "commercial-kitchen-cleaning",
    name: "Commercial Kitchen Cleaning",
    image: "/commercial-kitchen-cleaning.webp",
   description:
      "Rs. 500 site survey charge. Final cleaning price will be confirmed after site inspection.",
    rating: 4.9,
    reviewCount: 328,
    duration: "Site Survey",
    originalPrice: 500,
    offerPrice: 500,
    includes: [
      "Grease & Oil Removal",
      "Exhaust & Duct Cleaning",
      "Food-Safe Sanitization",
    ],
  },
];
type BathroomPackage = {
  id: string;
  name: string;
  image: string;
  description: string;
  rating: number;
  reviewCount: number;
  duration: string;
  originalPrice: number;
  offerPrice: number;
  includes: readonly string[];
};

const intenseBathroomPackage: BathroomPackage = {
  id: "intense-bathroom-deep-cleaning",
  name: "Intense Bathroom Deep Cleaning",
  image: "/intense-bathroom-deep-cleaning.webp",
  description:
    "Complete machine-assisted deep cleaning for tiles, fixtures, toilet and hard-water stains.",
  rating: 4.8,
  reviewCount: 6240,
  duration: "60–90 mins",
  originalPrice: 899,
  offerPrice: 649,
  includes: [
    "Floor & Tile Scrubbing",
    "Toilet & Basin Cleaning",
    "Hard-Water Treatment",
  ],
};

const bathroomNeedPackages: readonly BathroomPackage[] = [
  {
    id: "classic-bathroom-cleaning",
    name: "Classic Bathroom Cleaning",
    image: "/bathroom-toilet-cleaning.webp",
    description:
      "Routine monthly care for a clean, fresh and hygienic bathroom.",
    rating: 4.8,
    reviewCount: 1840,
    duration: "45–60 mins",
    originalPrice: 699,
    offerPrice: 449,
    includes: [
      "Floor & Tile Cleaning",
      "Toilet & Basin Cleaning",
      "Fixture Wiping",
    ],
  },
  {
    id: "hard-water-stain-descaling",
    name: "Hard-Water Stain & Descaling",
    image: "/hard-water-descaling.webp",
    description:
      "Professional stain removal from taps, tiles and glass surfaces.",
    rating: 4.7,
    reviewCount: 968,
    duration: "60–90 mins",
    originalPrice: 999,
    offerPrice: 749,
    includes: [
      "Tap Descaling",
      "Glass Stain Removal",
      "Tile Stain Treatment",
    ],
  },
  {
    id: "empty-bathroom-cleaning",
    name: "Empty / Move-in Bathroom Cleaning",
    image: "/empty-bathroom-cleaning.webp",
    description:
      "Thorough bathroom cleaning for empty homes before moving in or out.",
    rating: 4.8,
    reviewCount: 736,
    duration: "60–90 mins",
    originalPrice: 1099,
    offerPrice: 799,
    includes: [
      "Complete Surface Cleaning",
      "Floor & Wall Scrubbing",
      "Fixture Sanitization",
    ],
  },
  {
    id: "commercial-washroom-cleaning",
    name: "Commercial Washroom Cleaning",
    image: "/commercial-washroom-cleaning.webp",
    description:
      "Professional hygiene cleaning for offices and public washrooms.",
    rating: 4.8,
    reviewCount: 428,
    duration: "Free inspection",
    originalPrice: 3499,
    offerPrice: 2499,
    includes: [
      "Multiple Washroom Cleaning",
      "Machine Scrubbing",
      "Professional Sanitization",
    ],
  },
];
const DEEP_CLEANING_HERO_STYLES = `
  .cc-deep-hero {
    position: relative;
    isolation: isolate;
    overflow: hidden;
    padding: 20px 0 18px;
    background:
      radial-gradient(
        circle at 12% 0%,
        rgba(247, 31, 49, 0.075),
        transparent 34%
      ),
      linear-gradient(180deg, #fff9fa 0%, #ffffff 100%);
  }

  .cc-deep-hero__container {
    width: min(100% - 40px, 1680px);
    margin-inline: auto;
  }

  .cc-deep-hero__panel {
    display: grid;
    grid-template-columns: minmax(360px, 35%) minmax(0, 65%);
    min-height: 322px;
    overflow: hidden;
    border: 1px solid rgba(239, 31, 48, 0.22);
    border-radius: 22px;
    background:
      radial-gradient(
        circle at 0% 0%,
        rgba(246, 31, 48, 0.06),
        transparent 42%
      ),
      rgba(255, 251, 252, 0.96);
    box-shadow: 0 18px 55px rgba(56, 25, 31, 0.055);
  }

  .cc-deep-hero__content {
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 22px 32px 26px;
  }

  .cc-deep-hero__breadcrumb {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 9px;
    margin: 0 0 18px;
    color: #6c7280;
    font-size: 0.76rem;
    line-height: 1.4;
  }

  .cc-deep-hero__breadcrumb a {
    color: inherit;
    text-decoration: none;
    transition: color 180ms ease;
  }

  .cc-deep-hero__breadcrumb a:hover {
    color: #ed1b2b;
  }

  .cc-deep-hero__breadcrumb-current {
    color: #e81929;
    font-weight: 700;
  }

  .cc-deep-hero__chevron {
    width: 5px;
    height: 5px;
    border-top: 1.5px solid currentColor;
    border-right: 1.5px solid currentColor;
    transform: rotate(45deg);
  }

  .cc-deep-hero__badge {
    display: inline-flex;
    align-self: flex-start;
    align-items: center;
    gap: 8px;
    margin: 0 0 15px;
    padding: 8px 13px;
    border: 1px solid rgba(239, 31, 48, 0.14);
    border-radius: 9px;
    color: #e81929;
    background: rgba(255, 235, 238, 0.72);
    font-size: 0.78rem;
    font-weight: 750;
    line-height: 1;
  }

  .cc-deep-hero__badge-icon {
    width: 15px;
    height: 15px;
  }

  .cc-deep-hero__title {
    max-width: 550px;
    margin: 0;
    color: #171922;
    font-size: clamp(2.4rem, 3.5vw, 4.65rem);
    font-weight: 780;
    line-height: 1.01;
    letter-spacing: -0.058em;
    text-wrap: balance;
  }

  .cc-deep-hero__description {
    max-width: 520px;
    margin: 18px 0 0;
    color: #5f6675;
    font-size: clamp(0.94rem, 1vw, 1.08rem);
    line-height: 1.62;
  }

  .cc-deep-hero__rating {
    display: flex;
    align-items: center;
    gap: 8px;
    margin-top: 17px;
    color: #181b24;
  }

  .cc-deep-hero__star {
    width: 19px;
    height: 19px;
    color: #ffb400;
  }

  .cc-deep-hero__rating-value {
    font-size: 1rem;
    font-weight: 800;
  }

  .cc-deep-hero__reviews {
    color: #757c89;
    font-size: 0.79rem;
  }

  .cc-deep-hero__visual {
    position: relative;
    min-width: 0;
    min-height: 322px;
    overflow: hidden;
  }

  .cc-deep-hero__image {
    object-fit: cover;
    object-position: center;
  }

  .cc-deep-hero__trust-card {
    position: absolute;
    right: 18px;
    bottom: 18px;
    display: flex;
    align-items: center;
    gap: 13px;
    min-width: 230px;
    padding: 15px 18px;
    border: 1px solid rgba(24, 27, 36, 0.08);
    border-radius: 14px;
    background: rgba(255, 255, 255, 0.94);
    box-shadow: 0 15px 38px rgba(21, 21, 25, 0.14);
    backdrop-filter: blur(14px);
  }

  .cc-deep-hero__shield {
    display: grid;
    flex: 0 0 auto;
    width: 44px;
    height: 44px;
    place-items: center;
    color: #f21f2f;
  }

  .cc-deep-hero__shield svg {
    width: 43px;
    height: 43px;
  }

  .cc-deep-hero__trust-title {
    display: block;
    margin: 0;
    color: #191b24;
    font-size: 0.92rem;
    font-weight: 800;
    line-height: 1.2;
  }

  .cc-deep-hero__trust-text {
    display: block;
    margin-top: 4px;
    color: #727885;
    font-size: 0.72rem;
    line-height: 1.35;
  }

  .cc-deep-hero__categories-shell {
    margin-top: 17px;
    overflow-x: auto;
    scrollbar-width: none;
  }

  .cc-deep-hero__categories-shell::-webkit-scrollbar {
    display: none;
  }

  .cc-deep-hero__categories {
    display: grid;
    grid-template-columns: repeat(6, minmax(145px, 1fr));
    gap: 15px;
    min-width: 900px;
  }

  .cc-deep-hero__category {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 12px;
    min-height: 55px;
    padding: 0 18px;
    border: 1px solid rgba(44, 49, 58, 0.11);
    border-radius: 13px;
    color: #282c35;
    background: rgba(255, 255, 255, 0.92);
    box-shadow: 0 8px 22px rgba(44, 30, 33, 0.045);
    font: inherit;
    font-size: 0.82rem;
    font-weight: 700;
    white-space: nowrap;
    text-decoration: none;
    cursor: pointer;
    transition:
      color 220ms ease,
      border-color 220ms ease,
      background-color 220ms ease,
      box-shadow 220ms ease,
      transform 220ms ease;
  }

  .cc-deep-hero__category:hover {
    border-color: rgba(239, 31, 48, 0.28);
    transform: translateY(-2px);
  }

  .cc-deep-hero__category--active {
    border-color: #f21f2f;
    color: #e81929;
    background: #fff9fa;
    box-shadow: 0 10px 27px rgba(239, 31, 48, 0.09);
  }
  .cc-category-state {
    position: fixed;
    width: 1px;
    height: 1px;
    overflow: hidden;
    opacity: 0;
    pointer-events: none;
  }

  .cc-deep-hero__category[role="tab"] {
    cursor: pointer;
    user-select: none;
  }

  #cc-category-full-home:checked
    ~ .cc-deep-hero
    label[for="cc-category-full-home"],
  #cc-category-kitchen:checked
    ~ .cc-deep-hero
    label[for="cc-category-kitchen"] {
    border-color: #f21f2f;
    color: #e81929;
    background: #fff9fa;
    box-shadow: 0 10px 27px rgba(239, 31, 48, 0.09);
  }
    #cc-category-bathroom:checked
  ~ .cc-deep-hero
  label[for="cc-category-bathroom"] {
  border-color: #f21f2f;
  color: #e81929;
  background: #fff9fa;
  box-shadow: 0 10px 27px rgba(239, 31, 48, 0.09);
}
  #cc-category-industrial:checked
  ~ .cc-deep-hero
  label[for="cc-category-industrial"] {
  border-color: #f21f2f;
  color: #e81929;
  background: #fff9fa;
  box-shadow: 0 10px 27px rgba(239, 31, 48, 0.09);
}
       .cc-kitchen {
    display: none;
    padding: 20px 0 54px;
    background: #ffffff;
  }

  #cc-category-kitchen:checked ~ .cc-full-home {
    display: none;
  }

  #cc-category-kitchen:checked ~ .cc-kitchen {
    display: block;
  }

  #cc-category-full-home:checked ~ .cc-full-home {
    display: block;
  }

  #cc-category-full-home:checked ~ .cc-kitchen {
    display: none;
  }
.cc-bathroom {
  display: none;
}

#cc-category-bathroom:checked ~ .cc-full-home,
#cc-category-bathroom:checked ~ .cc-kitchen {
  display: none;
}

#cc-category-bathroom:checked ~ .cc-bathroom {
  display: block;
}
  .cc-bathroom {
  padding: 20px 0 54px;
  background: #ffffff;
}

.cc-bathroom__container {
  width: min(100% - 40px, 1680px);
  margin-inline: auto;
  padding: 18px;
  overflow: hidden;
  border: 1px solid rgba(239, 31, 48, 0.14);
  border-radius: 20px;
  background:
    radial-gradient(
      circle at 100% 0%,
      rgba(247, 31, 49, 0.055),
      transparent 35%
    ),
    linear-gradient(135deg, #fffdfd 0%, #fff8fa 100%);
  box-shadow: 0 14px 42px rgba(57, 24, 31, 0.045);
}

.cc-bathroom__top {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 11px;
  width: calc(50% - 12px);
  margin-bottom: 14px;
}

.cc-bathroom__header p {
  margin: 0 0 5px;
  color: #ed1b2b;
  font-size: 0.72rem;
  font-weight: 850;
  text-transform: uppercase;
}

.cc-bathroom__header h2 {
  margin: 0;
  color: #171820;
  font-size: clamp(1.65rem, 2.25vw, 2.25rem);
  line-height: 1.08;
  letter-spacing: -0.035em;
}

.cc-bathroom__header > span {
  display: block;
  margin-top: 7px;
  color: #68707f;
  font-size: 0.78rem;
  line-height: 1.5;
}

.cc-bathroom__trust {
  display: flex;
  flex-wrap: wrap;
  gap: 9px;
}

.cc-bathroom__trust > span {
  display: inline-flex;
  min-height: 32px;
  align-items: center;
  gap: 8px;
  padding: 6px 11px;
  border: 1px solid rgba(32, 37, 45, 0.08);
  border-radius: 8px;
  color: #303640;
  background: rgba(255, 255, 255, 0.9);
  box-shadow: 0 5px 14px rgba(38, 31, 33, 0.035);
  font-size: 0.68rem;
  font-weight: 700;
}

.cc-bathroom__trust svg {
  width: 17px;
  height: 17px;
  flex: 0 0 auto;
  color: #f21f2f;
  stroke-width: 1.8;
  stroke-linecap: round;
  stroke-linejoin: round;
}

.cc-bathroom__trust > span:nth-child(2) svg {
  color: #16a765;
}
.cc-bathroom__layout {
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
  gap: 16px;
  align-items: stretch;
}

.cc-bathroom__featured {
  min-width: 0;
  overflow: hidden;
  border: 1px solid rgba(242, 31, 47, 0.18);
  border-radius: 16px;
  background: #ffffff;
  box-shadow: 0 12px 30px rgba(47, 28, 32, 0.055);
}

.cc-bathroom__featured-image {
  position: relative;
  min-height: 0;
  aspect-ratio: 4 / 3;
  overflow: hidden;
  background: transparent;
}

.cc-bathroom__featured-image > img {
  object-fit: cover;
  object-position: center;
}

.cc-bathroom__featured-image::after {
  display: none;
}
.cc-bathroom__featured-card {
  position: relative;
  z-index: 2;
  display: flex;
  width: 54%;
height: 100%;
min-height: 0;
  flex-direction: column;
  align-items: flex-start;
  padding: 16px;
}

.cc-bathroom__popular {
  display: inline-flex;
  min-height: 24px;
  align-items: center;
  margin-bottom: 8px;
  padding: 4px 10px;
  border-radius: 6px;
  color: #ffffff;
  background: #f21f2f;
  font-size: 0.64rem;
  font-weight: 850;
  text-transform: uppercase;
}

.cc-bathroom__featured-card h3 {
  max-width: 310px;
  margin: 0;
  color: #171820;
  font-size: clamp(1.35rem, 1.75vw, 1.75rem);
  line-height: 1.05;
  letter-spacing: -0.025em;
}

.cc-bathroom__meta {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 7px;
  margin-top: 10px;
  color: #566070;
  font-size: 0.67rem;
  line-height: 1.4;
}

.cc-bathroom__meta > span:first-child {
  color: #f2a900;
  font-weight: 850;
}

.cc-bathroom__meta > span:not(:last-child)::after {
  margin-left: 7px;
  color: #c5c8ce;
  content: "•";
}

.cc-bathroom__scope {
  display: flex;
  flex-wrap: wrap;
  gap: 7px;
  margin: 11px 0 0;
  padding: 0;
  list-style: none;
}

.cc-bathroom__scope li {
  padding: 6px 9px;
  border: 1px solid rgba(242, 31, 47, 0.1);
  border-radius: 6px;
  color: #4f5662;
  background: #fff3f5;
  font-size: 0.62rem;
  font-weight: 700;
}

.cc-bathroom__quantity {
  width: 100%;
  margin: auto 0 0;
  padding: 0;
  border: 0;
}

.cc-bathroom__quantity legend {
  margin-bottom: 9px;
  color: #172033;
  font-size: 0.82rem;
  font-weight: 900;
  line-height: 1.2;
  text-shadow:
    0 1px 0 rgba(255, 255, 255, 0.95),
    0 0 8px rgba(255, 255, 255, 0.8);
}

.cc-bathroom__quantity-input {
  position: fixed;
  width: 1px;
  height: 1px;
  overflow: hidden;
  opacity: 0;
  pointer-events: none;
}

.cc-bathroom__quantity > label {
  display: inline-flex;
  min-height: 30px;
  align-items: center;
  justify-content: center;
  margin: 0 5px 7px 0;
  padding: 6px 10px;
  border: 1px solid rgba(40, 44, 52, 0.12);
  border-radius: 6px;
  color: #353b45;
  background: #ffffff;
  font-size: 0.61rem;
  font-weight: 750;
  cursor: pointer;
  transition:
    color 180ms ease,
    border-color 180ms ease,
    background-color 180ms ease;
}

.cc-bathroom__quantity-input:checked + label {
  border-color: #f21f2f;
  color: #ed1b2b;
  background: #fff8f9;
  box-shadow: 0 4px 12px rgba(242, 31, 47, 0.08);
}

.cc-bathroom__quantity-input:focus-visible + label {
  outline: 3px solid rgba(242, 31, 47, 0.18);
  outline-offset: 2px;
}

.cc-bathroom__booking-options {
  width: 100%;
  padding-top: 5px;
  border-top: 1px solid rgba(41, 46, 54, 0.08);
}

.cc-bathroom__booking-option {
  display: none;
  grid-template-columns: auto minmax(150px, 1fr);
  align-items: center;
  gap: 14px;
}

#cc-bathroom-quantity-1:checked
  ~ .cc-bathroom__booking-options
  .cc-bathroom__booking-option--1,
#cc-bathroom-quantity-2:checked
  ~ .cc-bathroom__booking-options
  .cc-bathroom__booking-option--2,
#cc-bathroom-quantity-3:checked
  ~ .cc-bathroom__booking-options
  .cc-bathroom__booking-option--3,
#cc-bathroom-quantity-4:checked
  ~ .cc-bathroom__booking-options
  .cc-bathroom__booking-option--4 {
  display: grid;
}

.cc-bathroom__featured-price {
  display: flex;
  align-items: center;
  gap: 9px;
  white-space: nowrap;
}

.cc-bathroom__featured-price del {
  color: #8b929e;
  font-size: 0.78rem;
}

.cc-bathroom__featured-price strong {
  color: #171820;
  font-size: 1.55rem;
  line-height: 1;
}

.cc-bathroom__featured-price span {
  padding: 5px 8px;
  border-radius: 6px;
  color: #168b49;
  background: #e8f8ed;
  font-size: 0.61rem;
  font-weight: 800;
}

.cc-bathroom .cc-booking-trigger {
  width: 100%;
  min-height: 38px;
  border: 1px solid #f21f2f;
  border-radius: 7px;
  color: #ffffff;
  background: #f21f2f;
  font: inherit;
  font-size: 0.74rem;
  font-weight: 850;
  cursor: pointer;
}

.cc-bathroom .cc-booking-trigger:hover {
  background: #db1726;
}
.cc-bathroom__needs {
  display: flex;
  min-width: 0;
  flex-direction: column;
  margin-top: -100px;
}

.cc-bathroom__needs > h3 {
  margin: 0 0 12px;
  color: #171820;
  font-size: 1rem;
  line-height: 1.2;
}

.cc-bathroom__need-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 12px;
}

.cc-bathroom__need-card {
  display: grid;
  min-width: 0;
  min-height: 145px;
  grid-template-columns: minmax(115px, 42%) minmax(0, 1fr);
  overflow: hidden;
  border: 1px solid rgba(34, 39, 47, 0.1);
  border-radius: 13px;
  background: rgba(255, 255, 255, 0.96);
  box-shadow: 0 9px 24px rgba(42, 28, 31, 0.04);
}

.cc-bathroom__need-image {
  position: relative;
  min-width: 0;
  min-height: 145px;
  overflow: hidden;
  background: #fff7f8;
}

.cc-bathroom__need-image img {
  object-fit: contain;
  object-position: center;
}

.cc-bathroom__need-content {
  display: flex;
  min-width: 0;
  flex-direction: column;
  padding: 11px;
}

.cc-bathroom__need-content h4 {
  margin: 0;
  color: #171820;
  font-size: 0.78rem;
  line-height: 1.15;
  letter-spacing: -0.01em;
}

.cc-bathroom__need-content > p {
  display: -webkit-box;
  margin: 7px 0 0;
  overflow: hidden;
  color: #657080;
  font-size: 0.64rem;
  line-height: 1.4;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
}

.cc-bathroom__need-content .cc-bathroom__meta {
  gap: 5px;
  margin-top: 7px;
  font-size: 0.59rem;
}

.cc-bathroom__need-content
  .cc-bathroom__meta
  > span:not(:last-child)::after {
  margin-left: 5px;
}

.cc-bathroom__need-action {
  display: grid;
  grid-template-columns: minmax(70px, auto) minmax(90px, 1fr);
  align-items: end;
  gap: 9px;
  margin-top: auto;
  padding-top: 8px;
  border-top: 1px solid rgba(39, 44, 52, 0.07);
}

.cc-bathroom__need-action > div {
  display: flex;
  min-width: 0;
  flex-direction: column;
  align-items: flex-start;
}

.cc-bathroom__need-action del {
  color: #8b929d;
  font-size: 0.62rem;
}

.cc-bathroom__need-action small {
  color: #737c89;
  font-size: 0.58rem;
}

.cc-bathroom__need-action strong {
  color: #171820;
  font-size: 1rem;
  line-height: 1.1;
}

.cc-bathroom__need-action .cc-booking-trigger {
  min-height: 31px;
  color: #ed1b2b;
  background: #ffffff;
  font-size: 0.67rem;
}

.cc-bathroom__need-action .cc-booking-trigger:hover {
  color: #ffffff;
  background: #f21f2f;
}
 .cc-bathroom__custom-card {
  position: relative;
  display: block;
  min-height: 300px;
  flex: 1;
  margin-top: 12px;
  overflow: hidden;
  border: 1px solid rgba(242, 31, 47, 0.14);
  border-radius: 13px;
  background:
    url("/custom-bathroom-cleaning.webp")
    center / cover no-repeat;
  box-shadow: 0 9px 24px rgba(42, 28, 31, 0.05);
}

.cc-bathroom__custom-card::before {
  position: absolute;
  inset: 0;
  z-index: 0;
  background: rgba(255, 236, 240, 0.2);
  content: "";
  pointer-events: none;
}

.cc-bathroom__custom-card::after {
  position: absolute;
  inset: 0;
  z-index: 1;
  background: linear-gradient(
    90deg,
    rgba(255, 235, 239, 0.76) 0%,
    rgba(255, 240, 243, 0.52) 34%,
    rgba(255, 245, 247, 0.14) 55%,
    transparent 72%
  );
  content: "";
  pointer-events: none;
}

.cc-bathroom__custom-image {
  position: absolute;
  inset: 0;
  z-index: 2;
  min-width: 0;
  min-height: 0;
  overflow: hidden;
  background: transparent;
  pointer-events: none;
}

.cc-bathroom__custom-image::after {
  display: none;
}

.cc-bathroom__custom-image img {
  object-fit: contain;
  object-position: right center;
}

.cc-bathroom__custom-content {
  position: relative;
  z-index: 3;
  display: flex;
  width: 48%;
  min-height: 300px;
  flex-direction: column;
  padding: 18px;
  background: transparent;
}

.cc-bathroom__custom-content h4 {
  margin: 0;
  color: #172033;
  font-size: 1rem;
  font-weight: 850;
  line-height: 1.2;
}

.cc-bathroom__custom-content > p {
  margin: 7px 0 0;
  color: #354052;
  font-size: 0.7rem;
  line-height: 1.5;
}

.cc-bathroom__custom-features {
  display: grid;
  gap: 7px;
  margin: 14px 0 0;
  padding: 0;
  list-style: none;
}

.cc-bathroom__custom-features li {
  position: relative;
  padding-left: 17px;
  color: #303a49;
  font-size: 0.66rem;
  font-weight: 700;
  line-height: 1.4;
}

.cc-bathroom__custom-features li::before {
  position: absolute;
  top: 0;
  left: 0;
  color: #e81929;
  font-weight: 900;
  content: "✓";
}

.cc-bathroom__custom-action {
  display: grid;
  grid-template-columns: auto minmax(130px, 1fr);
  align-items: end;
  gap: 14px;
  margin-top: auto;
  padding-top: 14px;
}

.cc-bathroom__custom-action > span {
  display: flex;
  flex-direction: column;
}

.cc-bathroom__custom-action small {
  color: #596474;
  font-size: 0.61rem;
}

.cc-bathroom__custom-action strong {
  color: #171820;
  font-size: 1.18rem;
  line-height: 1.1;
}

.cc-bathroom__custom-button {
  width: 100%;
  min-height: 36px;
  border: 1px solid #f21f2f;
  border-radius: 7px;
  color: #ed1b2b;
  background: rgba(255, 255, 255, 0.78);
  font: inherit;
  font-size: 0.7rem;
  font-weight: 850;
  cursor: pointer;
  transition:
    color 180ms ease,
    background-color 180ms ease;
}

.cc-bathroom__custom-button:hover {
  color: #ffffff;
  background: #f21f2f;
}

@media (max-width: 480px) {
  .cc-bathroom__custom-card {
    grid-template-columns: 1fr;
  }

  .cc-bathroom__custom-image {
    order: 0;
    min-height: 170px;
  }

  .cc-bathroom__custom-image::after {
    display: none;
  }
}
.cc-bathroom__assurance {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  margin-top: 14px;
  padding: 10px 16px;
  border-radius: 13px;
  background:
    linear-gradient(
      90deg,
      rgba(255, 239, 242, 0.92),
      rgba(255, 248, 249, 0.96)
    );
}

.cc-bathroom__assurance-item {
  position: relative;
  display: flex;
  min-width: 0;
  align-items: center;
  justify-content: center;
  gap: 11px;
  padding: 4px 18px;
  cursor: default;
  user-select: none;
}

.cc-bathroom__assurance-item:not(:last-child)::after {
  position: absolute;
  top: 4px;
  right: 0;
  bottom: 4px;
  width: 1px;
  background: rgba(50, 54, 62, 0.12);
  content: "";
}

.cc-bathroom__assurance-icon {
  display: inline-flex;
  width: 38px;
  height: 38px;
  flex: 0 0 auto;
  align-items: center;
  justify-content: center;
  border: 1px solid rgba(242, 31, 47, 0.12);
  border-radius: 50%;
  color: #f21f2f;
  background: #ffecef;
}

.cc-bathroom__assurance-icon svg {
  width: 20px;
  height: 20px;
  stroke-width: 1.8;
  stroke-linecap: round;
  stroke-linejoin: round;
}

.cc-bathroom__assurance-copy {
  display: flex;
  min-width: 0;
  flex-direction: column;
  gap: 2px;
}

.cc-bathroom__assurance strong {
  color: #262b34;
  font-size: 0.69rem;
  line-height: 1.3;
}

.cc-bathroom__assurance small {
  color: #667080;
  font-size: 0.61rem;
  line-height: 1.35;
}

@media (max-width: 760px) {
  .cc-bathroom__assurance {
    grid-template-columns: 1fr;
    gap: 8px;
    padding: 10px;
  }

  .cc-bathroom__assurance-item {
    justify-content: flex-start;
    padding: 7px;
  }

  .cc-bathroom__assurance-item:not(:last-child)::after {
    top: auto;
    right: 7px;
    bottom: 0;
    left: 7px;
    width: auto;
    height: 1px;
  }
}
@media (max-width: 1100px) {
  .cc-bathroom__needs {
    margin-top: 0;
  }
}

@media (max-width: 760px) {
  .cc-bathroom__need-grid {
    grid-template-columns: 1fr;
  }

  .cc-bathroom__need-card {
    grid-template-columns: 38% minmax(0, 1fr);
  }
}

@media (max-width: 480px) {
  .cc-bathroom__need-card {
    grid-template-columns: 1fr;
  }

  .cc-bathroom__need-image {
    min-height: 180px;
  }
}
@media (max-width: 1100px) {
  .cc-bathroom__layout {
    grid-template-columns: 1fr;
  }

  .cc-bathroom__featured-card {
    width: 56%;
  }
}

@media (max-width: 760px) {
  .cc-bathroom__featured-image {
    min-height: 540px;
  }

  .cc-bathroom__featured-image::after {
    background: linear-gradient(
      180deg,
      rgba(255, 255, 255, 0.98) 0%,
      rgba(255, 255, 255, 0.94) 58%,
      rgba(255, 255, 255, 0.12) 82%,
      transparent 100%
    );
  }

  .cc-bathroom__featured-card {
    width: 100%;
    min-height: 380px;
    padding: 14px;
  }

  .cc-bathroom__booking-option {
    grid-template-columns: 1fr;
  }

  .cc-bathroom__featured-price {
    flex-wrap: wrap;
  }
}
@media (max-width: 900px) {
  .cc-bathroom__top {
    width: 100%;
  }
}

@media (max-width: 760px) {
  .cc-bathroom {
    padding: 14px 0 38px;
  }

  .cc-bathroom__container {
    width: min(100% - 24px, 680px);
    padding: 13px;
    border-radius: 16px;
  }

  .cc-bathroom__trust {
    gap: 7px;
  }

  .cc-bathroom__trust > span {
    font-size: 0.62rem;
  }
}
  .cc-kitchen__container {
    width: min(100% - 40px, 1680px);
    margin-inline: auto;
    padding: 18px;
    overflow: hidden;
    border: 1px solid rgba(239, 31, 48, 0.14);
    border-radius: 20px;
    background:
      radial-gradient(
        circle at 100% 0%,
        rgba(247, 31, 49, 0.055),
        transparent 35%
      ),
      linear-gradient(135deg, #fffdfd 0%, #fffafb 100%);
    box-shadow: 0 14px 42px rgba(57, 24, 31, 0.045);
  }

  .cc-kitchen__top {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 11px;
    width: calc(50% - 12px);
    margin-bottom: 13px;
  }

  .cc-kitchen__header p {
    margin: 0 0 5px;
    color: #ed1b2b;
    font-size: 0.72rem;
    font-weight: 850;
  }

  .cc-kitchen__header h2 {
    margin: 0;
    color: #171820;
    font-size: clamp(1.65rem, 2.25vw, 2.25rem);
    line-height: 1.08;
    letter-spacing: -0.035em;
  }

  .cc-kitchen__header > span {
    display: block;
    margin-top: 7px;
    color: #68707f;
    font-size: 0.78rem;
    line-height: 1.5;
  }

  .cc-kitchen__trust {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
  }

  .cc-kitchen__trust > span {
    display: inline-flex;
    align-items: center;
    gap: 7px;
    min-height: 30px;
    padding: 6px 10px;
    border: 1px solid rgba(30, 34, 44, 0.07);
    border-radius: 7px;
    color: #343946;
    background: #ffffff;
    box-shadow: 0 4px 12px rgba(35, 25, 28, 0.035);
    font-size: 0.65rem;
    font-weight: 700;
    white-space: nowrap;
  }

  .cc-kitchen__trust svg {
    width: 14px;
    height: 14px;
    flex: 0 0 auto;
    color: #ed1b2b;
    stroke-width: 1.8;
    stroke-linecap: round;
    stroke-linejoin: round;
  }

  .cc-kitchen__trust > span:nth-child(2) svg {
    color: #35a75a;
  }

    .cc-kitchen__layout {
    display: grid;
    grid-template-columns:
      minmax(0, 0.82fr)
      minmax(0, 1.18fr);
    gap: 22px;
    align-items: start;
  }
  .cc-kitchen__featured {
    display: flex;
    flex-direction: column;
    min-width: 0;
    overflow: hidden;
    border: 1px solid rgba(239, 31, 48, 0.22);
    border-radius: 16px;
    background: #ffffff;
    box-shadow: 0 10px 28px rgba(50, 22, 27, 0.055);
  }

  .cc-kitchen__featured-image {
    position: relative;
    min-height: 238px;
    overflow: hidden;
    background: #ffffff;
  }

     .cc-kitchen__featured-image::after {
    position: absolute;
    inset: 0;
    z-index: 1;
    content: "";
    background:
      linear-gradient(
        90deg,
        #ffffff 0%,
        #ffffff 41%,
        rgba(255, 255, 255, 0.96) 45%,
        rgba(255, 255, 255, 0.62) 50%,
        rgba(255, 255, 255, 0.16) 57%,
        transparent 66%
      );
    pointer-events: none;
  }

   .cc-kitchen__featured-image img {
    right: 0 !important;
    left: auto !important;
    width: 58% !important;
    height: 100% !important;
    object-fit: cover;
    object-position: center;
  }

   .cc-kitchen__popular {
    position: absolute;
    top: 10px;
    left: 11px;
    z-index: 3;
    padding: 4px 8px;
    border-radius: 5px;
    color: #ffffff;
    background: #ed1b2b;
    font-size: 0.55rem;
    font-weight: 850;
    letter-spacing: 0;
    text-transform: none;
  }

   .cc-kitchen__featured-overlay {
    position: absolute;
    top: 41px;
    bottom: auto;
    left: 0;
    z-index: 2;
    width: 48%;
    padding: 0 14px;
    color: #181820;
  }

  .cc-kitchen__featured-overlay h3 {
    max-width: 220px;
    margin: 0;
    color: #181820;
    font-size: clamp(1.05rem, 1.3vw, 1.35rem);
    font-weight: 800;
    line-height: 1.08;
    letter-spacing: -0.025em;
  }
  .cc-kitchen__featured-overlay > p {
    display: none;
  }

  .cc-kitchen__meta {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 6px 9px;
    color: #68707e;
    font-size: 0.62rem;
    line-height: 1.3;
  }

  .cc-kitchen__meta > span:first-child {
    color: #f3a000;
    font-weight: 900;
  }

  .cc-kitchen__meta--light {
    margin-top: 10px;
    color: #68707e;
  }

  .cc-kitchen__scope {
    display: flex;
    flex-wrap: wrap;
    gap: 6px;
    margin: 11px 0 0;
    padding: 0;
    list-style: none;
  }

   .cc-kitchen__scope li {
    padding: 5px 7px;
    border: 1px solid rgba(237, 27, 43, 0.08);
    border-radius: 6px;
    color: #4a505d;
    background: rgba(255, 242, 244, 0.94);
    font-size: 0.52rem;
    font-weight: 700;
  }

   .cc-kitchen__featured-booking {
    display: grid;
    grid-template-columns: 1fr;
    align-items: stretch;
    gap: 9px;
    padding: 10px 12px 11px;
  }

  .cc-kitchen__featured-price {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    gap: 6px 10px;
  }

  .cc-kitchen__featured-price del {
    color: #858b96;
    font-size: 0.68rem;
  }

  .cc-kitchen__featured-price strong {
    color: #181820;
    font-size: 1.55rem;
    line-height: 1;
  }

  .cc-kitchen__featured-price > span {
    padding: 5px 7px;
    border-radius: 6px;
    color: #258a45;
    background: #e9f8ed;
    font-size: 0.58rem;
    font-weight: 800;
  }

  .cc-kitchen .cc-booking-trigger,
  .cc-kitchen__custom-button {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    min-width: 88px;
    min-height: 34px;
    margin: 0;
    padding: 8px 15px;
    border: 1px solid #ed1b2b;
    border-radius: 8px;
    color: #ed1b2b;
    background: #ffffff;
    box-shadow: none;
    font: inherit;
    font-size: 0.68rem;
    font-weight: 850;
    line-height: 1;
    cursor: pointer;
    transition:
      color 180ms ease,
      background-color 180ms ease,
      transform 180ms ease;
  }

  .cc-kitchen .cc-booking-trigger:hover,
  .cc-kitchen__custom-button:hover {
    color: #ffffff;
    background: #ed1b2b;
    transform: translateY(-1px);
  }

     .cc-kitchen__featured-booking .cc-booking-trigger {
    width: 100%;
    min-height: 36px;
    color: #ffffff;
    background: #ed1b2b;
  }

  .cc-kitchen__needs {
    min-width: 0;
    margin-top: -106px;
  }

  .cc-kitchen__needs > h3 {
    margin: 0 0 12px;
    color: #20232b;
    font-size: 1rem;
    line-height: 1.2;
  }

  .cc-kitchen__need-grid {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 11px;
  }

    .cc-kitchen__need-card {
    display: grid;
    grid-template-columns: 144px minmax(0, 1fr);
    min-width: 0;
    min-height: 174px;
    overflow: hidden;
    border: 1px solid rgba(31, 35, 45, 0.09);
    border-radius: 16px;
    background: #ffffff;
    box-shadow: 0 9px 24px rgba(43, 26, 30, 0.055);
  }

    .cc-kitchen__need-image {
    position: relative;
    align-self: start;
    width: 130px;
    height: 112px;
    margin: 12px 0 0 12px;
    overflow: hidden;
    border-radius: 11px;
    background: #f5f3f3;
  }
  .cc-kitchen__need-image img {
    object-fit: contain;
    object-position: center;
  }

  .cc-kitchen__need-content {
    display: flex;
    flex-direction: column;
    min-width: 0;
    padding: 12px 11px 10px;
  }

  .cc-kitchen__need-content h4 {
    margin: 0;
    color: #20232b;
    font-size: 0.78rem;
    line-height: 1.2;
    letter-spacing: -0.01em;
  }

  .cc-kitchen__need-content > p {
    display: -webkit-box;
    overflow: hidden;
    margin: 6px 0 8px;
    color: #68707e;
    font-size: 0.6rem;
    line-height: 1.4;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
  }

  .cc-kitchen__need-content .cc-kitchen__meta {
    margin-top: auto;
  }

  .cc-kitchen__need-action {
    grid-column: 1 / -1;
    display: flex;
    align-items: flex-end;
    justify-content: space-between;
    gap: 10px;
    margin-top: 8px;
    padding-top: 8px;
    border-top: 1px solid rgba(33, 37, 46, 0.07);
  }

  .cc-kitchen__need-action > div {
    display: flex;
    align-items: baseline;
    flex-wrap: wrap;
    gap: 3px 7px;
  }

  .cc-kitchen__need-action del {
    color: #8b909b;
    font-size: 0.58rem;
  }

  .cc-kitchen__need-action small {
    color: #777e8b;
    font-size: 0.58rem;
  }

  .cc-kitchen__need-action strong {
    color: #181820;
    font-size: 1.05rem;
    line-height: 1;
  }

   .cc-kitchen__custom-card {
    grid-template-columns: 144px minmax(0, 1fr);
  }

  .cc-kitchen__custom-icon {
    display: grid;
    place-items: center;
    width: 96px;
    height: 88px;
    margin: 11px 0 0 11px;
    color: #ed1b2b;
    border-radius: 9px;
    background: #fff0f2;
  }

  .cc-kitchen__custom-icon svg {
    width: 43px;
    height: 43px;
    stroke-width: 2.2;
    stroke-linecap: round;
    stroke-linejoin: round;
  }

  .cc-kitchen__assurance {
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    margin-top: 14px;
    padding: 13px 8px;
    border-radius: 14px;
    background: rgba(255, 241, 243, 0.9);
  }

   .cc-kitchen__assurance-item {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 11px;
    padding: 2px 20px;
  }

  .cc-kitchen__assurance-item:not(:last-child)::after {
    position: absolute;
    top: 8%;
    right: 0;
    width: 1px;
    height: 84%;
    content: "";
    background: rgba(80, 51, 57, 0.14);
  }

  .cc-kitchen__assurance-icon {
    display: grid;
    width: 36px;
    height: 36px;
    flex: 0 0 auto;
    place-items: center;
    border: 1px solid rgba(237, 27, 43, 0.12);
    border-radius: 50%;
    color: #ed1b2b;
    background: #ffecef;
  }

  .cc-kitchen__assurance-icon svg {
    width: 18px;
    height: 18px;
    stroke-width: 1.8;
    stroke-linecap: round;
    stroke-linejoin: round;
  }

  .cc-kitchen__assurance-copy {
    display: flex;
    flex-direction: column;
    text-align: left;
  }

  .cc-kitchen__assurance strong {
    color: #282c35;
    font-size: 0.7rem;
  }

  .cc-kitchen__assurance small {
    margin-top: 3px;
    color: #69717f;
    font-size: 0.61rem;
  }

  @media (max-width: 1180px) {
    .cc-kitchen__top {
      width: 100%;
    }

    .cc-kitchen__needs {
      margin-top: 0;
    }

    .cc-kitchen__layout {
      grid-template-columns: 1fr;
    }

    .cc-kitchen__featured-image {
      min-height: 300px;
    }
  }

  @media (max-width: 760px) {
    .cc-kitchen {
      padding: 18px 0 44px;
    }

    .cc-kitchen__container {
      width: min(100% - 24px, 1680px);
      padding: 14px;
      border-radius: 17px;
    }

    .cc-kitchen__top {
      width: 100%;
    }

    .cc-kitchen__trust {
      display: grid;
      width: 100%;
      grid-template-columns: 1fr;
    }

    .cc-kitchen__trust > span {
      width: 100%;
    }

    .cc-kitchen__layout {
      grid-template-columns: 1fr;
    }

    .cc-kitchen__featured-image {
      min-height: 390px;
    }

    .cc-kitchen__featured-image::after {
      background:
        linear-gradient(
          0deg,
          rgba(255, 255, 255, 0.98) 0%,
          rgba(255, 255, 255, 0.92) 42%,
          rgba(255, 255, 255, 0.04) 78%
        );
    }

    .cc-kitchen__featured-overlay {
      top: auto;
      bottom: 0;
      width: 100%;
      padding: 18px;
    }

    .cc-kitchen__featured-booking {
      grid-template-columns: 1fr;
      gap: 12px;
    }

    .cc-kitchen__need-grid {
      grid-template-columns: 1fr;
    }

    .cc-kitchen__need-card,
    .cc-kitchen__custom-card {
      grid-template-columns: 112px minmax(0, 1fr);
    }

    .cc-kitchen__need-image,
    .cc-kitchen__custom-icon {
      width: 100px;
    }

    .cc-kitchen__assurance {
      grid-template-columns: 1fr;
      gap: 12px;
    }

    .cc-kitchen__assurance > span {
      padding: 7px 12px;
    }

    .cc-kitchen__assurance
      > span:not(:last-child)::after {
      top: auto;
      right: 12%;
      bottom: -6px;
      width: 76%;
      height: 1px;
    }
  }

  @media (max-width: 460px) {
    .cc-kitchen__featured-image {
      min-height: 430px;
    }

    .cc-kitchen__need-card,
    .cc-kitchen__custom-card {
      grid-template-columns: 1fr;
    }

    .cc-kitchen__need-image,
    .cc-kitchen__custom-icon {
      width: calc(100% - 22px);
      height: 165px;
      margin: 11px;
    }

    .cc-kitchen__need-image img {
      object-fit: contain;
    }
  }
  }
  .cc-deep-hero__category:focus-visible {
    outline: 3px solid rgba(242, 31, 47, 0.2);
    outline-offset: 3px;
  }

  .cc-deep-hero__category-icon {
    width: 21px;
    height: 21px;
    flex: 0 0 auto;
  }

  @media (max-width: 1100px) {
    .cc-deep-hero__panel {
      grid-template-columns: minmax(320px, 42%) minmax(0, 58%);
    }

    .cc-deep-hero__content {
      padding-inline: 25px;
    }

    .cc-deep-hero__title {
      font-size: clamp(2.3rem, 4vw, 3.6rem);
    }
  }

  @media (max-width: 760px) {
    .cc-deep-hero {
      padding-top: 12px;
    }

    .cc-deep-hero__container {
      width: min(100% - 24px, 680px);
    }

    .cc-deep-hero__panel {
      grid-template-columns: 1fr;
      min-height: 0;
      border-radius: 18px;
    }

    .cc-deep-hero__visual {
      order: -1;
      min-height: 0;
      aspect-ratio: 1600 / 480;
    }

    .cc-deep-hero__content {
      padding: 24px 20px 28px;
    }

    .cc-deep-hero__breadcrumb {
      margin-bottom: 15px;
    }

    .cc-deep-hero__title {
      max-width: 100%;
      font-size: clamp(2.25rem, 10vw, 3.3rem);
    }

    .cc-deep-hero__description {
      max-width: 100%;
    }

    .cc-deep-hero__trust-card {
      right: 10px;
      bottom: 10px;
      min-width: 0;
      padding: 9px 11px;
      border-radius: 11px;
    }

    .cc-deep-hero__shield {
      width: 32px;
      height: 32px;
    }

    .cc-deep-hero__shield svg {
      width: 31px;
      height: 31px;
    }

    .cc-deep-hero__trust-title {
      font-size: 0.76rem;
    }

    .cc-deep-hero__trust-text {
      display: none;
    }

    .cc-deep-hero__categories {
      grid-auto-flow: column;
      grid-template-columns: none;
      grid-auto-columns: minmax(145px, 1fr);
      min-width: max-content;
      gap: 10px;
      padding: 2px;
    }

    .cc-deep-hero__category {
      min-height: 51px;
      padding-inline: 16px;
    }
  }

  @media (max-width: 420px) {
    .cc-deep-hero__container {
      width: min(100% - 20px, 390px);
    }

    .cc-deep-hero__content {
      padding-inline: 17px;
    }

    .cc-deep-hero__title {
      font-size: clamp(2.1rem, 10.5vw, 2.75rem);
    }

    .cc-deep-hero__description {
      font-size: 0.91rem;
    }
  }
`;
const FULL_HOME_PACKAGES_STYLES = `
  .cc-full-home {
    position: relative;
    padding: 38px 0 58px;
    background:
      radial-gradient(
        circle at 100% 0%,
        rgba(242, 31, 47, 0.07),
        transparent 30%
      ),
      linear-gradient(180deg, #ffffff 0%, #fff8f9 100%);
  }

  .cc-full-home__container {
    width: min(100% - 40px, 1500px);
    margin-inline: auto;
  }

  .cc-full-home__header {
    margin-bottom: 20px;
  }

  .cc-full-home__header p {
    margin: 0 0 7px;
    color: #ed1b2b;
    font-size: 0.76rem;
    font-weight: 800;
    letter-spacing: 0.1em;
    text-transform: uppercase;
  }

  .cc-full-home__type-tabs {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  margin: 18px 0;
  padding: 5px;
  border: 1px solid rgba(242, 31, 47, 0.16);
  border-radius: 12px;
  background: #fff5f6;
}

.cc-full-home__type-input {
  position: absolute;
  width: 1px;
  height: 1px;
  opacity: 0;
  pointer-events: none;
}

.cc-full-home__type-tabs {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  margin: 18px 0;
  padding: 5px;
  border: 1px solid rgba(242, 31, 47, 0.16);
  border-radius: 12px;
  background: #fff5f6;
}

.cc-full-home__type-tab {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 140px;
  min-height: 42px;
  padding: 0 18px;
  border-radius: 8px;
  color: #5e6470;
  background: transparent;
  font-size: 0.82rem;
  font-weight: 800;
  cursor: pointer;
  transition:
    color 200ms ease,
    background 200ms ease,
    box-shadow 200ms ease;
}
.cc-full-home__customize-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-height: 52px;
  margin-left: 10px;
  padding: 0 22px;
  border: 1px solid #f21f2f;
  border-radius: 12px;
  color: #f21f2f;
  background: #ffffff;
  font: inherit;
  font-size: 0.82rem;
  font-weight: 800;
  vertical-align: middle;
  cursor: pointer;
  transition:
    color 200ms ease,
    background 200ms ease,
    box-shadow 200ms ease;
}

.cc-full-home__customize-button:hover {
  color: #ffffff;
  background: #f21f2f;
  box-shadow: 0 8px 20px rgba(242, 31, 47, 0.2);
}
.cc-full-home__panel {
  display: none;
}

#cc-furnished-home:checked
  ~ .cc-full-home__type-tabs
  label[for="cc-furnished-home"],
#cc-unfurnished-home:checked
  ~ .cc-full-home__type-tabs
  label[for="cc-unfurnished-home"] {
  color: #ffffff;
  background: #f21f2f;
  box-shadow: 0 8px 20px rgba(242, 31, 47, 0.2);
}

#cc-furnished-home:checked
  ~ .cc-full-home__panel--furnished {
  display: block;
}

#cc-unfurnished-home:checked
  ~ .cc-full-home__panel--unfurnished {
  display: block;
}
  #cc-customize-cleaning:checked
  ~ .cc-full-home__customize-button {
  color: #ffffff;
  background: #f21f2f;
  box-shadow: 0 8px 20px rgba(242, 31, 47, 0.2);
}

#cc-customize-cleaning:checked
  ~ .cc-full-home__panel--customize {
  display: block;
}

.cc-custom-cleaning {
  padding-top: 12px;
}

.cc-custom-cleaning__header {
  margin-bottom: 24px;
}

.cc-custom-cleaning__header p {
  margin: 0 0 7px;
  color: #ed1b2b;
  font-size: 0.76rem;
  font-weight: 800;
  letter-spacing: 0.1em;
  text-transform: uppercase;
}

.cc-custom-cleaning__header h2 {
  margin: 0;
  color: #191b24;
  font-size: clamp(1.8rem, 3vw, 2.6rem);
  line-height: 1.15;
}

.cc-custom-cleaning__header span {
  display: block;
  margin-top: 9px;
  color: #6f7684;
  font-size: 0.92rem;
}
@media (max-width: 480px) {
  .cc-full-home__type-tabs {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    width: 100%;
    box-sizing: border-box;
  }

  .cc-full-home__type-tab {
    min-width: 0;
  }
}
  .cc-full-home__cards {
    display: grid;
    gap: 12px;
  }

  .cc-full-home__card {
    display: grid;
    grid-template-columns: 230px minmax(0, 1fr) 280px;
    align-items: center;
    min-height: 130px;
    overflow: hidden;
    border: 1px solid rgba(35, 40, 50, 0.1);
    border-radius: 15px;
    background: rgba(255, 255, 255, 0.97);
    box-shadow: 0 9px 28px rgba(55, 28, 34, 0.045);
    transition:
      border-color 220ms ease,
      box-shadow 220ms ease,
      transform 220ms ease;
  }

  .cc-full-home__card:hover {
    border-color: rgba(242, 31, 47, 0.28);
    box-shadow: 0 14px 38px rgba(93, 28, 38, 0.09);
    transform: translateY(-2px);
  }

  .cc-full-home__image {
    position: relative;
    width: 100%;
    aspect-ratio: 16 / 9;
    overflow: hidden;
  }

  .cc-full-home__image img {
    object-fit: cover;
  }

  .cc-full-home__content {
    padding: 18px 24px;
  }

  .cc-full-home__content h3 {
    margin: 0;
    color: #191b24;
    font-size: 1.1rem;
    font-weight: 750;
    line-height: 1.3;
  }
.cc-full-home__price-row {
  display: flex;
  align-items: center;
  gap: 16px;
  margin-top: 9px;
}

.cc-full-home__rating {
  display: inline-flex;
  align-items: center;
  gap: 5px;
  color: #242832;
  font-size: 0.78rem;
}

.cc-full-home__rating span {
  color: #ffb400;
  font-size: 0.95rem;
}

.cc-full-home__rating strong {
  font-weight: 800;
}

.cc-full-home__pricing {
  display: inline-flex;
  align-items: center;
  gap: 8px;
}

.cc-full-home__pricing del {
  color: #8a909b;
  font-size: 0.76rem;
}

.cc-full-home__pricing strong {
  color: #ed1b2b;
  font-size: 1.05rem;
  font-weight: 850;
}

.cc-full-home__included {
  display: grid;
  grid-template-columns: repeat(3, max-content);
  justify-content: start;
  column-gap: 28px;
  row-gap: 7px;
  margin: 12px 0 0;
  padding: 0;
  list-style: none;
}

.cc-full-home__included li {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  color: #555c68;
  font-size: 0.72rem;
  font-weight: 650;
  line-height: 1.3;
}

.cc-full-home__included li::before {
  display: grid;
  width: 15px;
  height: 15px;
  flex: 0 0 auto;
  place-items: center;
  border: 1px solid rgba(242, 31, 47, 0.32);
  border-radius: 50%;
  color: #ed1b2b;
  content: "✓";
  font-size: 0.58rem;
  font-weight: 900;
}

  .cc-full-home__action {
  display: grid;
  grid-template-columns: minmax(0, 1fr) 110px;
  align-items: center;
  gap: 14px;
  padding: 18px;
  border-left: 1px solid rgba(35, 40, 50, 0.09);
}

.cc-full-home__price-row {
  display: grid;
  gap: 5px;
  margin: 0;
}

.cc-full-home__select {
  padding: 0;
  border-left: 0;
}

  .cc-full-home__select input {
    position: absolute;
    opacity: 0;
    pointer-events: none;
  }

  .cc-full-home__select span {
    display: flex;
    min-height: 44px;
    align-items: center;
    justify-content: center;
    gap: 12px;
    border: 1px solid #f21f2f;
    border-radius: 9px;
    color: #e81929;
    background: #ffffff;
    font-size: 0.8rem;
    font-weight: 800;
    cursor: pointer;
    transition:
      color 200ms ease,
      background-color 200ms ease,
      box-shadow 200ms ease;
  }

  .cc-full-home__select span:hover {
    background: #fff5f6;
  }

  .cc-full-home__select input:focus-visible + span {
    outline: 3px solid rgba(242, 31, 47, 0.18);
    outline-offset: 3px;
  }

  .cc-full-home__select input:checked + span {
    color: #ffffff;
    background: #f21f2f;
    box-shadow: 0 10px 24px rgba(242, 31, 47, 0.2);
  }

  .cc-full-home__select input:checked + span strong {
    font-size: 0;
  }

  .cc-full-home__select input:checked + span strong::after {
    content: "✓";
    font-size: 1rem;
  }

  @media (max-width: 760px) {
    .cc-full-home {
      padding: 28px 0 45px;
    }

    .cc-full-home__container {
      width: min(100% - 24px, 680px);
    }

    .cc-full-home__card {
      grid-template-columns: 1fr;
    }

    .cc-full-home__image {
      aspect-ratio: 16 / 9;
    }

    .cc-full-home__content {
      padding: 17px 18px;
    }

    .cc-full-home__select {
      padding: 0 18px 18px;
      border-left: 0;
      .cc-full-home__included {
  grid-template-columns: repeat(2, minmax(0, 1fr));
}
    }
  }
`;
function CategoryIcon({ paths }: { paths: string[] }) {
  return (
    <svg
      className="cc-deep-hero__category-icon"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {paths.map((path) => (
        <path key={path} d={path} />
      ))}
    </svg>
  );
}

type HomePackage = {
  id: string;
  name: string;
  image: string;
  description: string;
  rating: number;
  originalPrice: number;
  offerPrice: number;
  includes: readonly string[];
};

function HomePackageCards({
  packages,
}: {
  packages: readonly HomePackage[];
}) {
  return (
    <div className="cc-full-home__cards">
      {packages.map((servicePackage) => (
        <article
          className="cc-full-home__card"
          key={servicePackage.id}
        >
          <div className="cc-full-home__image">
            <Image
              src={servicePackage.image}
              alt={`City Coolies ${servicePackage.name} service`}
              fill
              sizes="(max-width: 760px) 100vw, 320px"
            />
          </div>

          <div className="cc-full-home__content">
            <h3>{servicePackage.name}</h3>
            <p>{servicePackage.description}</p>

            <ul className="cc-full-home__included">
              {servicePackage.includes.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>

          <div className="cc-full-home__action">
            <div className="cc-full-home__price-row">
              <div
                className="cc-full-home__rating"
                aria-label={`Rated ${servicePackage.rating} out of 5`}
              >
                <span aria-hidden="true">★</span>
                <strong>{servicePackage.rating}</strong>
              </div>

              <div className="cc-full-home__pricing">
                <del>
                  ₹
                  {servicePackage.originalPrice.toLocaleString(
                    "en-IN",
                  )}
                </del>

                <strong>
                  ₹
                  {servicePackage.offerPrice.toLocaleString(
                    "en-IN",
                  )}
                </strong>
              </div>
            </div>

            <ServiceBookingModal
              packageId={servicePackage.id}
              serviceName={servicePackage.name}
              originalPrice={servicePackage.originalPrice}
              offerPrice={servicePackage.offerPrice}
            />
          </div>
        </article>
      ))}
    </div>
  );
}

function FullHomePackagesSection() {
  return (
    <section
      id="full-home-packages"
      className="cc-full-home"
      aria-labelledby="full-home-packages-title"
    >
      <div className="cc-full-home__container">
        <header className="cc-full-home__header">
          <p>Full Home Deep Cleaning</p>

          <h2 id="full-home-packages-title">
            Choose your home cleaning package
          </h2>
        </header>

        <input
          className="cc-full-home__type-input"
          type="radio"
          name="home-furnishing-type"
          id="cc-furnished-home"
        />

        <input
          className="cc-full-home__type-input"
          type="radio"
          name="home-furnishing-type"
          id="cc-unfurnished-home"
          defaultChecked
        />
        <input
  className="cc-full-home__type-input"
  type="radio"
  name="home-furnishing-type"
  id="cc-customize-cleaning"
/>
        <div
          className="cc-full-home__type-tabs"
          role="tablist"
          aria-label="Choose furnished or unfurnished home"
        >
          <label
            className="cc-full-home__type-tab"
            htmlFor="cc-furnished-home"
          >
            Furnished
          </label>

          <label
            className="cc-full-home__type-tab"
            htmlFor="cc-unfurnished-home"
          >
            Unfurnished
          </label>
        </div>
        <label
  className="cc-full-home__customize-button"
  htmlFor="cc-customize-cleaning"
>
  Customize Cleaning
</label>
        <div className="cc-full-home__panel cc-full-home__panel--furnished">
          <HomePackageCards packages={furnishedHomePackages} />
        </div>

        <div className="cc-full-home__panel cc-full-home__panel--unfurnished">
          <HomePackageCards packages={fullHomePackages} />
        </div>
        <div className="cc-full-home__panel cc-full-home__panel--customize">
  <div className="cc-custom-cleaning">
    <header className="cc-custom-cleaning__header">
      <p>Customized Deep Cleaning</p>

      <h2>Customize Your Cleaning</h2>

      <span>
        Choose only what you need. Quantity and total update
        automatically.
      </span>
    </header>

    <CustomCleaningBuilder />
  </div>
</div>
      </div>
    </section>
  );
}
function KitchenCleaningSection() {
  

  return (
    <section
      id="kitchen-cleaning-packages"
      className="cc-kitchen"
      aria-labelledby="kitchen-cleaning-title"
    >
      <div className="cc-kitchen__container">
        <div className="cc-kitchen__top">
          <header className="cc-kitchen__header">
            <p>Kitchen Cleaning</p>

            <h2 id="kitchen-cleaning-title">
              A spotless kitchen, your way.
            </h2>

            <span>
              Deep cleaning options for every kind of kitchen and every
              kind of need.
            </span>
          </header>

          <div
            className="cc-kitchen__trust"
            aria-label="Kitchen cleaning service benefits"
          >
            <span>
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                aria-hidden="true"
              >
                <circle cx="12" cy="8" r="3" />
                <path d="M6 20v-2a6 6 0 0 1 12 0v2" />
                <path d="m18 5 1.5 1.5L22 4" />
              </svg>
              Verified experts
            </span>

            <span>
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path d="M20 4C12 4 6 8 6 15c0 3 2 5 5 5 7 0 9-8 9-16Z" />
                <path d="M4 21c3-6 7-9 12-11" />
              </svg>
              Safe products
            </span>

            <span>
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path d="M12 3 20 7v5c0 5-3.2 8.2-8 10-4.8-1.8-8-5-8-10V7l8-4Z" />
                <path d="m9 12 2 2 4-4" />
              </svg>
              No hidden charges
            </span>
          </div>
        </div>

        <div className="cc-kitchen__layout">
          <article className="cc-kitchen__featured">
            <div className="cc-kitchen__featured-image">
              <Image
                src={occupiedKitchenPackage.image}
                alt="City Coolies occupied kitchen deep cleaning service"
                fill
                sizes="(max-width: 900px) 100vw, 50vw"
              />

              <span className="cc-kitchen__popular">
                Most booked
              </span>

              <div className="cc-kitchen__featured-overlay">
                <h3>{occupiedKitchenPackage.name}</h3>

                <p>{occupiedKitchenPackage.description}</p>

                <div className="cc-kitchen__meta cc-kitchen__meta--light">
                  <span>
                    ★ {occupiedKitchenPackage.rating}
                  </span>

                  <span>
                    (
                    {occupiedKitchenPackage.reviewCount.toLocaleString(
                      "en-IN",
                    )}
                    )
                  </span>

                  <span>{occupiedKitchenPackage.duration}</span>

                  <span>4 experts</span>
                </div>

                <ul className="cc-kitchen__scope">
                  {occupiedKitchenPackage.includes.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="cc-kitchen__featured-booking">
              <div className="cc-kitchen__featured-price">
                

                <strong>
                  ₹
                  {occupiedKitchenPackage.offerPrice.toLocaleString(
                    "en-IN",
                  )}
                </strong>

      
              </div>

              <ServiceBookingModal
                packageId={occupiedKitchenPackage.id}
                serviceName={occupiedKitchenPackage.name}
                originalPrice={occupiedKitchenPackage.originalPrice}
                offerPrice={occupiedKitchenPackage.offerPrice}
                triggerLabel="Book now"
              />
            </div>
          </article>

          <div className="cc-kitchen__needs">
            <h3>Choose by need</h3>

            <div className="cc-kitchen__need-grid">
              {kitchenNeedPackages.map((servicePackage) => (
                <article
                  className="cc-kitchen__need-card"
                  key={servicePackage.id}
                >
                  <div className="cc-kitchen__need-image">
                    <Image
                      src={servicePackage.image}
                      alt={`City Coolies ${servicePackage.name} service`}
                      fill
                      sizes="(max-width: 760px) 38vw, 190px"
                    />
                  </div>

                  <div className="cc-kitchen__need-content">
                    <h4>{servicePackage.name}</h4>

                    <p>{servicePackage.description}</p>

                    <div className="cc-kitchen__meta">
                      <span>★ {servicePackage.rating}</span>

                      <span>
                        (
                        {servicePackage.reviewCount.toLocaleString(
                          "en-IN",
                        )}
                        )
                      </span>

                      <span>{servicePackage.duration}</span>
                    </div>

                    <div className="cc-kitchen__need-action">
                      <div>
                       {servicePackage.originalPrice !== servicePackage.offerPrice && (
  <del>
    ₹
    {servicePackage.originalPrice.toLocaleString(
      "en-IN",
    )}
  </del>
)}

                        <strong>
                          ₹
                          {servicePackage.offerPrice.toLocaleString(
                            "en-IN",
                          )}
                        </strong>
                      </div>

                      <ServiceBookingModal
                        packageId={servicePackage.id}
                        serviceName={servicePackage.name}
                        originalPrice={servicePackage.originalPrice}
                        offerPrice={servicePackage.offerPrice}
                        triggerLabel="Add"
                      />
                    </div>
 
                  </div>
                </article>
              ))}
                              <article className="cc-kitchen__need-card cc-kitchen__custom-card">
                <div className="cc-kitchen__need-image">
                  <Image
                    src="/custom-kitchen-cleaning.webp"
                    alt="City Coolies professional customizing a kitchen-cleaning plan"
                    fill
                    sizes="(max-width: 760px) 38vw, 190px"
                  />
                </div>

                <div className="cc-kitchen__need-content">
                  <h4>Build your own plan</h4>

                  <p>
                    Customize your kitchen-cleaning checklist and get
                    expert consultation.
                  </p>

                  <div className="cc-kitchen__need-action">
                    <div>
                      <small>From</small>
                      <strong>₹399</strong>
                    </div>

                  <CustomKitchenCleaningBuilder />
                  </div>
                </div>
              </article>
            </div>
          </div>
        </div>

               <div
          className="cc-kitchen__assurance"
          aria-label="Kitchen booking benefits"
        >
          <div className="cc-kitchen__assurance-item">
            <span
              className="cc-kitchen__assurance-icon"
              aria-hidden="true"
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
              >
                <path d="M4 21V7h10v14" />
                <path d="M14 11h6v10" />
                <path d="M7 10h1" />
                <path d="M11 10h1" />
                <path d="M7 14h1" />
                <path d="M11 14h1" />
                <path d="M7 18h1" />
                <path d="M11 18h1" />
                <path d="M17 14h1" />
                <path d="M17 18h1" />
              </svg>
            </span>

            <span className="cc-kitchen__assurance-copy">
             <strong>Rs. 500 Site Survey</strong>
             <small>Final quote after inspection</small>
            </span>
          </div>

          <div className="cc-kitchen__assurance-item">
            <span
              className="cc-kitchen__assurance-icon"
              aria-hidden="true"
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
              >
                <path d="M4 7h16v12H4Z" />
                <path d="M7 7V5h10v2" />
                <path d="M4 11h16" />
                <path d="M16 15h1" />
              </svg>
            </span>

            <span className="cc-kitchen__assurance-copy">
             <strong>Flexible Payment Options</strong>
<small>50% Online Advance and Secure Online Payment</small>
            </span>
          </div>

          <div className="cc-kitchen__assurance-item">
            <span
              className="cc-kitchen__assurance-icon"
              aria-hidden="true"
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
              >
                <path d="M20 11.5a8 8 0 0 1-11.8 7L4 20l1.5-4.1A8 8 0 1 1 20 11.5Z" />
                <path d="M9 8.5c.5 3 2 4.5 5 5" />
                <path d="m9 8.5 1.2-.5" />
                <path d="m14 13.5.7-1" />
              </svg>
            </span>

            <span className="cc-kitchen__assurance-copy">
              <strong>Easy WhatsApp</strong>
              <small>booking confirmation</small>
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
function BathroomCleaningSection() {
  return (
    <section
      id="bathroom-cleaning-packages"
      className="cc-bathroom"
      aria-labelledby="bathroom-cleaning-title"
    >
      <div className="cc-bathroom__container">
        <div className="cc-bathroom__top">
          <header className="cc-bathroom__header">
            <p>Bathroom Cleaning</p>

            <h2 id="bathroom-cleaning-title">
              A fresher bathroom, elevated.
            </h2>

            <span>
              Professional care for everyday upkeep, tough stains and
              complete hygiene.
            </span>
          </header>

          <div
            className="cc-bathroom__trust"
            aria-label="Bathroom cleaning service benefits"
          >
            <span>
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                aria-hidden="true"
              >
                <circle cx="12" cy="8" r="3" />
                <path d="M6 20v-2a6 6 0 0 1 12 0v2" />
                <path d="m18 5 1.5 1.5L22 4" />
              </svg>

              Background-verified experts
            </span>

            <span>
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path d="M20 4C12 4 6 8 6 15c0 3 2 5 5 5 7 0 9-8 9-16Z" />
                <path d="M4 21c3-6 7-9 12-11" />
              </svg>

              Bathroom-safe products
            </span>

            <span>
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path d="M12 3 20 7v5c0 5-3.2 8.2-8 10-4.8-1.8-8-5-8-10V7l8-4Z" />
                <path d="m9 12 2 2 4-4" />
              </svg>

              Upfront pricing
            </span>
          </div>
        </div>
        <div className="cc-bathroom__layout">
  <article className="cc-bathroom__featured">
    <div className="cc-bathroom__featured-image">
      <Image
        src={intenseBathroomPackage.image}
        alt="City Coolies intense bathroom deep cleaning service"
        fill
        sizes="(max-width: 900px) 100vw, 50vw"
      />

      <div className="cc-bathroom__featured-card">
        <span className="cc-bathroom__popular">
          Most booked
        </span>

        <h3>{intenseBathroomPackage.name}</h3>

        <div className="cc-bathroom__meta">
          <span>★ {intenseBathroomPackage.rating}</span>

          <span>
            (
            {intenseBathroomPackage.reviewCount.toLocaleString(
              "en-IN",
            )}
            )
          </span>

          <span>{intenseBathroomPackage.duration}</span>

          <span>Machine scrubbing</span>
        </div>

        <ul className="cc-bathroom__scope">
          {intenseBathroomPackage.includes.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>

        <fieldset className="cc-bathroom__quantity">
          <legend>How many bathrooms?</legend>

          <input
            className="cc-bathroom__quantity-input"
            type="radio"
            name="bathroom-quantity"
            id="cc-bathroom-quantity-1"
            defaultChecked
          />

          <label htmlFor="cc-bathroom-quantity-1">
            1 Bathroom
          </label>

          <input
            className="cc-bathroom__quantity-input"
            type="radio"
            name="bathroom-quantity"
            id="cc-bathroom-quantity-2"
          />

          <label htmlFor="cc-bathroom-quantity-2">
            2 Bathrooms
          </label>

          <input
            className="cc-bathroom__quantity-input"
            type="radio"
            name="bathroom-quantity"
            id="cc-bathroom-quantity-3"
          />

          <label htmlFor="cc-bathroom-quantity-3">
            3 Bathrooms
          </label>

          <input
            className="cc-bathroom__quantity-input"
            type="radio"
            name="bathroom-quantity"
            id="cc-bathroom-quantity-4"
          />

          <label htmlFor="cc-bathroom-quantity-4">
            4 Bathrooms
          </label>

          <div className="cc-bathroom__booking-options">
            <div className="cc-bathroom__booking-option cc-bathroom__booking-option--1">
              <div className="cc-bathroom__featured-price">
                <del>₹899</del>
                <strong>₹649</strong>
                <span>Save ₹250</span>
              </div>

              <ServiceBookingModal
                packageId="intense-bathroom-cleaning-1"
                serviceName="Intense Bathroom Deep Cleaning - 1 Bathroom"
                originalPrice={899}
                offerPrice={649}
                triggerLabel="Book now"
              />
            </div>

            <div className="cc-bathroom__booking-option cc-bathroom__booking-option--2">
              <div className="cc-bathroom__featured-price">
                <del>₹1,798</del>
                <strong>₹1,199</strong>
                <span>Save ₹599</span>
              </div>

              <ServiceBookingModal
                packageId="intense-bathroom-cleaning-2"
                serviceName="Intense Bathroom Deep Cleaning - 2 Bathrooms"
                originalPrice={1798}
                offerPrice={1199}
                triggerLabel="Book now"
              />
            </div>

            <div className="cc-bathroom__booking-option cc-bathroom__booking-option--3">
              <div className="cc-bathroom__featured-price">
                <del>₹2,697</del>
                <strong>₹1,699</strong>
                <span>Save ₹998</span>
              </div>

              <ServiceBookingModal
                packageId="intense-bathroom-cleaning-3"
                serviceName="Intense Bathroom Deep Cleaning - 3 Bathrooms"
                originalPrice={2697}
                offerPrice={1699}
                triggerLabel="Book now"
              />
            </div>

            <div className="cc-bathroom__booking-option cc-bathroom__booking-option--4">
              <div className="cc-bathroom__featured-price">
                <del>₹3,596</del>
                <strong>₹2,199</strong>
                <span>Save ₹1,397</span>
              </div>

              <ServiceBookingModal
                packageId="intense-bathroom-cleaning-4"
                serviceName="Intense Bathroom Deep Cleaning - 4 Bathrooms"
                originalPrice={3596}
                offerPrice={2199}
                triggerLabel="Book now"
              />
            </div>
          </div>
        </fieldset>
      </div>
    </div>
  </article>
  <div className="cc-bathroom__needs">
  <h3>Choose by need</h3>

  <div className="cc-bathroom__need-grid">
    {bathroomNeedPackages.map((servicePackage) => (
      <article
        className="cc-bathroom__need-card"
        key={servicePackage.id}
      >
        <div className="cc-bathroom__need-image">
          <Image
            src={servicePackage.image}
            alt={`City Coolies ${servicePackage.name} service`}
            fill
            sizes="(max-width: 760px) 38vw, 190px"
          />
        </div>

        <div className="cc-bathroom__need-content">
          <h4>{servicePackage.name}</h4>

          <p>{servicePackage.description}</p>

          <div className="cc-bathroom__meta">
            <span>★ {servicePackage.rating}</span>

            <span>
              (
              {servicePackage.reviewCount.toLocaleString(
                "en-IN",
              )}
              )
            </span>

            <span>{servicePackage.duration}</span>
          </div>

          <div className="cc-bathroom__need-action">
            <div>
              {servicePackage.id ===
              "commercial-washroom-cleaning" ? (
                <small>From</small>
              ) : (
                <del>
                  ₹
                  {servicePackage.originalPrice.toLocaleString(
                    "en-IN",
                  )}
                </del>
              )}

              <strong>
                ₹
                {servicePackage.offerPrice.toLocaleString(
                  "en-IN",
                )}
              </strong>
            </div>

            <ServiceBookingModal
              packageId={servicePackage.id}
              serviceName={servicePackage.name}
              originalPrice={servicePackage.originalPrice}
              offerPrice={servicePackage.offerPrice}
              triggerLabel="Add"
            />
          </div>
        </div>
      </article>
    ))}
  </div>
  <article className="cc-bathroom__custom-card">
  <div className="cc-bathroom__custom-image">
    <Image
      src="/custom-bathroom-cleaning.webp"
      alt="City Coolies professional creating a customized bathroom-cleaning plan"
      fill
      sizes="(max-width: 1100px) 100vw, 50vw"
    />
  </div>

  <div className="cc-bathroom__custom-content">
    <h4>Customize Bathroom Cleaning</h4>

    <p>
      Select areas, add extras and build a bathroom-cleaning plan
      that fits your needs.
    </p>
    <ul className="cc-bathroom__custom-features">
  <li>Choose only the services you need</li>
  <li>Trusted itemized prices with no hidden charges</li>
  <li>50% online advance & Secure Online Payment</li>
</ul>
    <div className="cc-bathroom__custom-action">
      <span>
        <small>From</small>
        <strong>₹299</strong>
      </span>

      <CustomBathroomCleaningBuilder />
    </div>
  </div>
</article>
</div>
</div>
<div
  className="cc-bathroom__assurance"
  aria-label="Bathroom booking benefits"
>
  <div className="cc-bathroom__assurance-item">
    <span
      className="cc-bathroom__assurance-icon"
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
      >
        <path d="M4 21V7h10v14" />
        <path d="M14 11h6v10" />
        <path d="M7 10h1" />
        <path d="M11 10h1" />
        <path d="M7 14h1" />
        <path d="M11 14h1" />
      </svg>
    </span>

    <span className="cc-bathroom__assurance-copy">
      <strong>Free commercial inspection</strong>
      <small>Detailed assessment &amp; expert advice</small>
    </span>
  </div>

  <div className="cc-bathroom__assurance-item">
    <span
      className="cc-bathroom__assurance-icon"
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
      >
        <path d="M3 7h18v12H3Z" />
        <path d="M3 10h18" />
        <path d="M16 15h2" />
        <path d="M7 5h10" />
      </svg>
    </span>

    <span className="cc-bathroom__assurance-copy">
      <strong>Flexible Payment Options</strong>
      <small>50% Online Advance & Secure Online Payment</small>
    </span>
  </div>

  <div className="cc-bathroom__assurance-item">
    <span
      className="cc-bathroom__assurance-icon"
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
      >
        <path d="M20 11.5a8 8 0 0 1-11.8 7L4 20l1.5-4A8 8 0 1 1 20 11.5Z" />
        <path d="M9 8.5c.5 2.5 2 4 4.5 5" />
      </svg>
    </span>

    <span className="cc-bathroom__assurance-copy">
      <strong>Easy WhatsApp booking confirmation</strong>
      <small>Instant updates &amp; support</small>
    </span>
  </div>
</div>
      </div>
    </section>
  );
}
export default function DeepCleaningPage() {
  return (
    <>
      <input
        className="cc-category-state"
        type="radio"
        name="deep-cleaning-category"
        id="cc-category-full-home"
        defaultChecked
      />

      <input
        className="cc-category-state"
        type="radio"
        name="deep-cleaning-category"
        id="cc-category-kitchen"
      />
       <input
  className="cc-category-state"
  type="radio"
  name="deep-cleaning-category"
  id="cc-category-bathroom"
/>
<input
  className="cc-category-state"
  type="radio"
  name="deep-cleaning-category"
  id="cc-category-industrial"
/>
<input
  className="cc-category-state"
  type="radio"
  name="deep-cleaning-category"
  id="cc-category-commercial"
/>
<input
  className="cc-category-state"
  type="radio"
  name="deep-cleaning-category"
  id="cc-category-cobweb"
/>
<input
  className="cc-category-state"
  type="radio"
  name="deep-cleaning-category"
  id="cc-category-office"
/>
<input
  className="cc-category-state"
  type="radio"
  name="deep-cleaning-category"
  id="cc-category-villa"
/>
<input
  className="cc-category-state"
  type="radio"
  name="deep-cleaning-category"
  id="cc-category-upholstery"
/>
<input
  className="cc-category-state"
  type="radio"
  name="deep-cleaning-category"
  id="cc-category-water-tank"
/>
      <section
        className="cc-deep-hero"
        aria-labelledby="deep-cleaning-hero-title"
      >
        <div className="cc-deep-hero__container">
          <div className="cc-deep-hero__panel">
            <div className="cc-deep-hero__content">
              <nav className="cc-deep-hero__breadcrumb" aria-label="Breadcrumb">
                <Link href="/">Home</Link>
                <span className="cc-deep-hero__chevron" aria-hidden="true" />
                <Link href="/services">Services</Link>
                <span className="cc-deep-hero__chevron" aria-hidden="true" />
                <span
                  className="cc-deep-hero__breadcrumb-current"
                  aria-current="page"
                >
                  Deep Cleaning
                </span>
              </nav>

              <p className="cc-deep-hero__badge">
                <svg
                  className="cc-deep-hero__badge-icon"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <circle cx="12" cy="8" r="5" />
                  <path d="m8.5 12-1 9 4.5-2.5L16.5 21l-1-9" />
                  <path d="m10.2 8 1.2 1.2L14 6.8" />
                </svg>
                Premium Deep Cleaning
              </p>

              <h1 id="deep-cleaning-hero-title" className="cc-deep-hero__title">
                A cleaner space, tailored to you.
              </h1>

              <p className="cc-deep-hero__description">
                Professional deep cleaning for every corner of your home or
                workspace. Advanced equipment. Trained experts. Spotless
                results.
              </p>
                 
              <div
                className="cc-deep-hero__rating"
                aria-label="Rated 4.9 out of 5"
              >
                <svg
                  className="cc-deep-hero__star"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path d="m12 2.8 2.85 5.78 6.38.93-4.62 4.5 1.09 6.35L12 17.37l-5.7 2.99 1.09-6.35-4.62-4.5 6.38-.93L12 2.8Z" />
                </svg>
                <span className="cc-deep-hero__rating-value">4.9</span>
                <span className="cc-deep-hero__reviews">(1,248 reviews)</span>
              </div>
            </div>

            <div className="cc-deep-hero__visual">
              <Image
                className="cc-deep-hero__image"
                src="/deep-cleaning-hero.webp"
                alt="City Coolies team providing professional deep cleaning services"
                fill
                priority
                sizes="(max-width: 760px) calc(100vw - 24px), 65vw"
              />

              <div className="cc-deep-hero__trust-card">
                <span className="cc-deep-hero__shield" aria-hidden="true">
                  <svg
                    viewBox="0 0 48 48"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M24 4 39 10v11c0 10-6.2 18.2-15 23-8.8-4.8-15-13-15-23V10L24 4Z" />
                    <path d="m17.5 23.5 4.2 4.2 9-9" />
                  </svg>
                </span>

                <span>
                  <strong className="cc-deep-hero__trust-title">
                    4.9 Rated Service
                  </strong>
                  <small className="cc-deep-hero__trust-text">
                    Trusted by 1,000+ homes
                  </small>
                </span>
              </div>
            </div>
          </div>

          <div className="cc-deep-hero__categories-shell">
            <div
              className="cc-deep-hero__categories"
              role="tablist"
              aria-label="Deep cleaning categories"
            >
                           {categories.map((category) => {
                if (category.name === "Full Home") {
                  return (
                    <label
                      key={category.name}
                      className="cc-deep-hero__category"
                      htmlFor="cc-category-full-home"
                      role="tab"
                    >
                      <CategoryIcon paths={category.paths} />
                      {category.name}
                    </label>
                  );
                }

                if (category.name === "Kitchen") {
                  return (
                    <label
                      key={category.name}
                      className="cc-deep-hero__category"
                      htmlFor="cc-category-kitchen"
                      role="tab"
                    >
                      <CategoryIcon paths={category.paths} />
                      {category.name}
                    </label>
                  );
                }
   if (category.name === "Bathroom") {
  return (
    <label
      key={category.name}
      className="cc-deep-hero__category"
      htmlFor="cc-category-bathroom"
      role="tab"
    >
      <CategoryIcon paths={category.paths} />
      {category.name}
    </label>
  );
}
if (category.name === "Industrial Cleaning") {
  return (
    <label
      key={category.name}
      className="cc-deep-hero__category"
      htmlFor="cc-category-industrial"
      role="tab"
    >
      <CategoryIcon paths={category.paths} />
      {category.name}
    </label>
  );
}

if (category.name === "Commercial Cleaning") {
  return (
    <label
      key={category.name}
      className="cc-deep-hero__category"
      htmlFor="cc-category-commercial"
      role="tab"
    >
      <CategoryIcon paths={category.paths} />
      {category.name}
    </label>
  );
}

if (category.name === "Cobweb Cleaning") {
  return (
    <label
      key={category.name}
      className="cc-deep-hero__category"
      htmlFor="cc-category-cobweb"
      role="tab"
    >
      <CategoryIcon paths={category.paths} />
      {category.name}
    </label>
  );
}

if (category.name === "Office") {
  return (
    <label
      key={category.name}
      className="cc-deep-hero__category"
      htmlFor="cc-category-office"
      role="tab"
    >
      <CategoryIcon paths={category.paths} />
      {category.name}
    </label>
  );
}

if (category.name === "Villa Cleaning") {
  return (
    <label key={category.name} className="cc-deep-hero__category" htmlFor="cc-category-villa" role="tab">
      <CategoryIcon paths={category.paths} />
      {category.name}
    </label>
  );
}

if (category.name === "Mattress & Sofa Cleaning") {
  return (
    <label key={category.name} className="cc-deep-hero__category" htmlFor="cc-category-upholstery" role="tab">
      <CategoryIcon paths={category.paths} />
      {category.name}
    </label>
  );
}

if (category.name === "Water Tank Cleaning") {
  return (
    <label key={category.name} className="cc-deep-hero__category" htmlFor="cc-category-water-tank" role="tab">
      <CategoryIcon paths={category.paths} />
      {category.name}
    </label>
  );
}

return (
                  <button
                    key={category.name}
                    className="cc-deep-hero__category"
                    type="button"
                    role="tab"
                    aria-selected="false"
                  >
                    <CategoryIcon paths={category.paths} />
                    {category.name}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </section>
      <FullHomePackagesSection />
      <KitchenCleaningSection />
      <BathroomCleaningSection />
      <IndustrialCleaningSection />
      <CommercialCleaningSection />
      <CobwebCleaningSection />
      <OfficeCleaningSection />
      <VillaCleaningSection />
      <UpholsteryCleaningSection />
      <WaterTankCleaningSection />
     <style>
  {`${DEEP_CLEANING_HERO_STYLES}
  ${FULL_HOME_PACKAGES_STYLES}`}
</style>
    </>
  );
}


