"use client";


import { useMemo, useState } from "react";
import ServiceBookingModal from "@/components/booking/ServiceBookingModal";
import styles from "./CivilServicesMarketplace.module.css";

type CivilService = {
  id: string;
  category: string;
  name: string;
  rate: number;
  unit: string;
  image: string;
};

const SERVICES = [
  {
    "category": "Complete Construction",
    "name": "New Home Complete Construction – Basic",
    "rate": 1999,
    "unit": "Sq.ft",
    "id": "civil-001",
    "image": "/civil-new-home-complete-construction-basic.webp"
  },
  {
    "category": "Complete Construction",
    "name": "New Home Complete Construction – Standard",
    "rate": 2299,
    "unit": "Sq.ft",
    "id": "civil-002",
    "image": "/civil-new-home-complete-construction-standard.webp"
  },
  {
    "category": "Complete Construction",
    "name": "New Home Complete Construction – Premium",
    "rate": 2799,
    "unit": "Sq.ft",
    "id": "civil-003",
    "image": "/civil-new-home-complete-construction-premium.webp"
  },
  {
    "category": "Complete Construction",
    "name": "Luxury Home / Luxury Villa Construction",
    "rate": 3499,
    "unit": "Sq.ft",
    "id": "civil-004",
    "image": "/civil-luxury-home-luxury-villa-construction.webp"
  },
  {
    "category": "Complete Construction",
    "name": "Villa & Duplex Construction",
    "rate": 2499,
    "unit": "Sq.ft",
    "id": "civil-005",
    "image": "/civil-villa-and-duplex-construction.webp"
  },
  {
    "category": "Complete Construction",
    "name": "G+1 / G+2 Residential Construction",
    "rate": 2399,
    "unit": "Sq.ft",
    "id": "civil-006",
    "image": "/civil-g-plus-1-g-plus-2-residential-construction.webp"
  },
  {
    "category": "Complete Construction",
    "name": "Additional Floor Construction",
    "rate": 2199,
    "unit": "Sq.ft",
    "id": "civil-007",
    "image": "/civil-additional-floor-construction.webp"
  },
  {
    "category": "Complete Construction",
    "name": "House Extension Construction",
    "rate": 1999,
    "unit": "Sq.ft",
    "id": "civil-008",
    "image": "/civil-house-extension-construction.webp"
  },
  {
    "category": "Complete Construction",
    "name": "Full House Civil Renovation / Remodeling",
    "rate": 899,
    "unit": "Sq.ft",
    "id": "civil-009",
    "image": "/civil-full-house-civil-renovation-remodeling.webp"
  },
  {
    "category": "Complete Construction",
    "name": "Commercial Building Construction",
    "rate": 2199,
    "unit": "Sq.ft",
    "id": "civil-010",
    "image": "/civil-commercial-building-construction.webp"
  },
  {
    "category": "RCC & Structural",
    "name": "Site Clearing & Foundation Excavation",
    "rate": 80,
    "unit": "Sq.ft",
    "id": "civil-011",
    "image": "/civil-site-clearing-and-foundation-excavation.webp"
  },
  {
    "category": "RCC & Structural",
    "name": "Earth Filling & Compaction",
    "rate": 65,
    "unit": "Sq.ft",
    "id": "civil-012",
    "image": "/civil-earth-filling-and-compaction.webp"
  },
  {
    "category": "RCC & Structural",
    "name": "PCC Foundation / Base Concrete",
    "rate": 120,
    "unit": "Sq.ft",
    "id": "civil-013",
    "image": "/civil-pcc-foundation-base-concrete.webp"
  },
  {
    "category": "RCC & Structural",
    "name": "RCC Footing Construction",
    "rate": 280,
    "unit": "Sq.ft",
    "id": "civil-014",
    "image": "/civil-rcc-footing-construction.webp"
  },
  {
    "category": "RCC & Structural",
    "name": "RCC Plinth Beam Construction",
    "rate": 320,
    "unit": "Sq.ft",
    "id": "civil-015",
    "image": "/civil-rcc-plinth-beam-construction.webp"
  },
  {
    "category": "RCC & Structural",
    "name": "RCC Column Construction",
    "rate": 380,
    "unit": "Sq.ft",
    "id": "civil-016",
    "image": "/civil-rcc-column-construction.webp"
  },
  {
    "category": "RCC & Structural",
    "name": "RCC Beam Construction",
    "rate": 360,
    "unit": "Sq.ft",
    "id": "civil-017",
    "image": "/civil-rcc-beam-construction.webp"
  },
  {
    "category": "RCC & Structural",
    "name": "RCC Roof Slab Construction",
    "rate": 340,
    "unit": "Sq.ft",
    "id": "civil-018",
    "image": "/civil-rcc-roof-slab-construction.webp"
  },
  {
    "category": "RCC & Structural",
    "name": "RCC Staircase Construction",
    "rate": 450,
    "unit": "Sq.ft",
    "id": "civil-019",
    "image": "/civil-rcc-staircase-construction.webp"
  },
  {
    "category": "RCC & Structural",
    "name": "RCC Lintel Construction",
    "rate": 280,
    "unit": "Sq.ft",
    "id": "civil-020",
    "image": "/civil-rcc-lintel-construction.webp"
  },
  {
    "category": "RCC & Structural",
    "name": "RCC Chajja / Sunshade Construction",
    "rate": 320,
    "unit": "Sq.ft",
    "id": "civil-021",
    "image": "/civil-rcc-chajja-sunshade-construction.webp"
  },
  {
    "category": "RCC & Structural",
    "name": "RCC Parapet / Edge Beam Work",
    "rate": 300,
    "unit": "Sq.ft",
    "id": "civil-022",
    "image": "/civil-rcc-parapet-edge-beam-work.webp"
  },
  {
    "category": "RCC & Structural",
    "name": "RCC Retaining Wall Construction",
    "rate": 500,
    "unit": "Sq.ft",
    "id": "civil-023",
    "image": "/civil-rcc-retaining-wall-construction.webp"
  },
  {
    "category": "RCC & Structural",
    "name": "Structural Strengthening Work",
    "rate": 650,
    "unit": "Sq.ft",
    "id": "civil-024",
    "image": "/civil-structural-strengthening-work.webp"
  },
  {
    "category": "RCC & Structural",
    "name": "RCC Column / Beam Jacketing",
    "rate": 850,
    "unit": "Sq.ft",
    "id": "civil-025",
    "image": "/civil-rcc-column-beam-jacketing.webp"
  },
  {
    "category": "Masonry & Plastering",
    "name": "Red Brick Wall Construction",
    "rate": 95,
    "unit": "Sq.ft",
    "id": "civil-026",
    "image": "/civil-red-brick-wall-construction.webp"
  },
  {
    "category": "Masonry & Plastering",
    "name": "AAC Block Wall Construction",
    "rate": 115,
    "unit": "Sq.ft",
    "id": "civil-027",
    "image": "/civil-aac-block-wall-construction.webp"
  },
  {
    "category": "Masonry & Plastering",
    "name": "Solid Concrete Block Wall Construction",
    "rate": 105,
    "unit": "Sq.ft",
    "id": "civil-028",
    "image": "/civil-solid-concrete-block-wall-construction.webp"
  },
  {
    "category": "Masonry & Plastering",
    "name": "Fly-Ash Brick Wall Construction",
    "rate": 100,
    "unit": "Sq.ft",
    "id": "civil-029",
    "image": "/civil-fly-ash-brick-wall-construction.webp"
  },
  {
    "category": "Masonry & Plastering",
    "name": "4.5-inch Partition Wall Construction",
    "rate": 80,
    "unit": "Sq.ft",
    "id": "civil-030",
    "image": "/civil-4-5-inch-partition-wall-construction.webp"
  },
  {
    "category": "Masonry & Plastering",
    "name": "9-inch Masonry Wall Construction",
    "rate": 120,
    "unit": "Sq.ft",
    "id": "civil-031",
    "image": "/civil-9-inch-masonry-wall-construction.webp"
  },
  {
    "category": "Masonry & Plastering",
    "name": "Internal Wall Plastering",
    "rate": 35,
    "unit": "Sq.ft",
    "id": "civil-032",
    "image": "/civil-internal-wall-plastering.webp"
  },
  {
    "category": "Masonry & Plastering",
    "name": "External Wall Plastering",
    "rate": 45,
    "unit": "Sq.ft",
    "id": "civil-033",
    "image": "/civil-external-wall-plastering.webp"
  },
  {
    "category": "Masonry & Plastering",
    "name": "Ceiling Plastering",
    "rate": 40,
    "unit": "Sq.ft",
    "id": "civil-034",
    "image": "/civil-ceiling-plastering.webp"
  },
  {
    "category": "Masonry & Plastering",
    "name": "Waterproof Cement Plastering",
    "rate": 55,
    "unit": "Sq.ft",
    "id": "civil-035",
    "image": "/civil-waterproof-cement-plastering.webp"
  },
  {
    "category": "Masonry & Plastering",
    "name": "Patch Plaster / Damaged Plaster Repair",
    "rate": 65,
    "unit": "Sq.ft",
    "id": "civil-036",
    "image": "/civil-patch-plaster-damaged-plaster-repair.webp"
  },
  {
    "category": "Masonry & Plastering",
    "name": "Wall Chasing & Civil Closing Work",
    "rate": 70,
    "unit": "Sq.ft",
    "id": "civil-037",
    "image": "/civil-wall-chasing-and-civil-closing-work.webp"
  },
  {
    "category": "Flooring & Surface",
    "name": "PCC Flooring Base",
    "rate": 75,
    "unit": "Sq.ft",
    "id": "civil-038",
    "image": "/civil-pcc-flooring-base.webp"
  },
  {
    "category": "Flooring & Surface",
    "name": "Floor Screed / Level Correction",
    "rate": 55,
    "unit": "Sq.ft",
    "id": "civil-039",
    "image": "/civil-floor-screed-level-correction.webp"
  },
  {
    "category": "Flooring & Surface",
    "name": "Vitrified Tile Flooring",
    "rate": 110,
    "unit": "Sq.ft",
    "id": "civil-040",
    "image": "/civil-vitrified-tile-flooring.webp"
  },
  {
    "category": "Flooring & Surface",
    "name": "Ceramic Floor / Wall Tile Work",
    "rate": 90,
    "unit": "Sq.ft",
    "id": "civil-041",
    "image": "/civil-ceramic-floor-wall-tile-work.webp"
  },
  {
    "category": "Flooring & Surface",
    "name": "Granite Flooring",
    "rate": 150,
    "unit": "Sq.ft",
    "id": "civil-042",
    "image": "/civil-granite-flooring.webp"
  },
  {
    "category": "Flooring & Surface",
    "name": "Marble Flooring",
    "rate": 180,
    "unit": "Sq.ft",
    "id": "civil-043",
    "image": "/civil-marble-flooring.webp"
  },
  {
    "category": "Flooring & Surface",
    "name": "Kota / Natural Stone Flooring",
    "rate": 130,
    "unit": "Sq.ft",
    "id": "civil-044",
    "image": "/civil-kota-natural-stone-flooring.webp"
  },
  {
    "category": "Flooring & Surface",
    "name": "Anti-Skid Flooring",
    "rate": 115,
    "unit": "Sq.ft",
    "id": "civil-045",
    "image": "/civil-anti-skid-flooring.webp"
  },
  {
    "category": "Flooring & Surface",
    "name": "Outdoor / Parking Tile Flooring",
    "rate": 120,
    "unit": "Sq.ft",
    "id": "civil-046",
    "image": "/civil-outdoor-parking-tile-flooring.webp"
  },
  {
    "category": "Flooring & Surface",
    "name": "Tile / Granite / Marble Skirting",
    "rate": 90,
    "unit": "Sq.ft",
    "id": "civil-047",
    "image": "/civil-tile-granite-marble-skirting.webp"
  },
  {
    "category": "Flooring & Surface",
    "name": "Old Tile Removal & Surface Preparation",
    "rate": 60,
    "unit": "Sq.ft",
    "id": "civil-048",
    "image": "/civil-old-tile-removal-and-surface-preparation.webp"
  },
  {
    "category": "Repair & Maintenance",
    "name": "Structural Crack Repair",
    "rate": 120,
    "unit": "Sq.ft",
    "id": "civil-049",
    "image": "/civil-structural-crack-repair.webp"
  },
  {
    "category": "Repair & Maintenance",
    "name": "Wall Crack Repair",
    "rate": 80,
    "unit": "Sq.ft",
    "id": "civil-050",
    "image": "/civil-wall-crack-repair.webp"
  },
  {
    "category": "Repair & Maintenance",
    "name": "Damaged Plaster Repair",
    "rate": 90,
    "unit": "Sq.ft",
    "id": "civil-051",
    "image": "/civil-damaged-plaster-repair.webp"
  },
  {
    "category": "Repair & Maintenance",
    "name": "Concrete Spalling Repair",
    "rate": 250,
    "unit": "Sq.ft",
    "id": "civil-052",
    "image": "/civil-concrete-spalling-repair.webp"
  },
  {
    "category": "Repair & Maintenance",
    "name": "RCC Column Repair",
    "rate": 650,
    "unit": "Sq.ft",
    "id": "civil-053",
    "image": "/civil-rcc-column-repair.webp"
  },
  {
    "category": "Repair & Maintenance",
    "name": "RCC Beam Repair",
    "rate": 600,
    "unit": "Sq.ft",
    "id": "civil-054",
    "image": "/civil-rcc-beam-repair.webp"
  },
  {
    "category": "Repair & Maintenance",
    "name": "RCC Slab Repair",
    "rate": 500,
    "unit": "Sq.ft",
    "id": "civil-055",
    "image": "/civil-rcc-slab-repair.webp"
  },
  {
    "category": "Repair & Maintenance",
    "name": "Staircase Civil Repair",
    "rate": 350,
    "unit": "Sq.ft",
    "id": "civil-056",
    "image": "/civil-staircase-civil-repair.webp"
  },
  {
    "category": "Repair & Maintenance",
    "name": "Balcony / Chajja Repair",
    "rate": 400,
    "unit": "Sq.ft",
    "id": "civil-057",
    "image": "/civil-balcony-chajja-repair.webp"
  },
  {
    "category": "Repair & Maintenance",
    "name": "Settlement Crack Repair",
    "rate": 450,
    "unit": "Sq.ft",
    "id": "civil-058",
    "image": "/civil-settlement-crack-repair.webp"
  },
  {
    "category": "Repair & Maintenance",
    "name": "Damaged Brick / Block Wall Rebuilding",
    "rate": 180,
    "unit": "Sq.ft",
    "id": "civil-059",
    "image": "/civil-damaged-brick-block-wall-rebuilding.webp"
  },
  {
    "category": "Repair & Maintenance",
    "name": "Door / Window Opening Civil Alteration",
    "rate": 250,
    "unit": "Sq.ft",
    "id": "civil-060",
    "image": "/civil-door-window-opening-civil-alteration.webp"
  },
  {
    "category": "Repair & Maintenance",
    "name": "Damp Wall Civil Repair",
    "rate": 180,
    "unit": "Sq.ft",
    "id": "civil-061",
    "image": "/civil-damp-wall-civil-repair.webp"
  },
  {
    "category": "Waterproofing",
    "name": "Terrace Cementitious Waterproofing",
    "rate": 60,
    "unit": "Sq.ft",
    "id": "civil-062",
    "image": "/civil-terrace-cementitious-waterproofing.webp"
  },
  {
    "category": "Waterproofing",
    "name": "Terrace PU Waterproofing",
    "rate": 120,
    "unit": "Sq.ft",
    "id": "civil-063",
    "image": "/civil-terrace-pu-waterproofing.webp"
  },
  {
    "category": "Waterproofing",
    "name": "APP Membrane Waterproofing",
    "rate": 150,
    "unit": "Sq.ft",
    "id": "civil-064",
    "image": "/civil-app-membrane-waterproofing.webp"
  },
  {
    "category": "Waterproofing",
    "name": "Bathroom Waterproofing",
    "rate": 80,
    "unit": "Sq.ft",
    "id": "civil-065",
    "image": "/civil-bathroom-waterproofing.webp"
  },
  {
    "category": "Waterproofing",
    "name": "Balcony Waterproofing",
    "rate": 75,
    "unit": "Sq.ft",
    "id": "civil-066",
    "image": "/civil-balcony-waterproofing.webp"
  },
  {
    "category": "Waterproofing",
    "name": "Exterior Wall Waterproofing",
    "rate": 55,
    "unit": "Sq.ft",
    "id": "civil-067",
    "image": "/civil-exterior-wall-waterproofing.webp"
  },
  {
    "category": "Waterproofing",
    "name": "Basement Waterproofing",
    "rate": 125,
    "unit": "Sq.ft",
    "id": "civil-068",
    "image": "/civil-basement-waterproofing.webp"
  },
  {
    "category": "Waterproofing",
    "name": "Water Tank / Sump Waterproofing",
    "rate": 80,
    "unit": "Sq.ft",
    "id": "civil-069",
    "image": "/civil-water-tank-sump-waterproofing.webp"
  },
  {
    "category": "Waterproofing",
    "name": "Sunken Slab Waterproofing",
    "rate": 90,
    "unit": "Sq.ft",
    "id": "civil-070",
    "image": "/civil-sunken-slab-waterproofing.webp"
  },
  {
    "category": "Waterproofing",
    "name": "Expansion Joint / Leakage Treatment",
    "rate": 180,
    "unit": "Sq.ft",
    "id": "civil-071",
    "image": "/civil-expansion-joint-leakage-treatment.webp"
  },
  {
    "category": "Demolition & Core Cutting",
    "name": "Complete Building Demolition",
    "rate": 120,
    "unit": "Sq.ft",
    "id": "civil-072",
    "image": "/civil-complete-building-demolition.webp"
  },
  {
    "category": "Demolition & Core Cutting",
    "name": "Brick / Block Wall Demolition",
    "rate": 150,
    "unit": "Sq.ft",
    "id": "civil-073",
    "image": "/civil-brick-block-wall-demolition.webp"
  },
  {
    "category": "Demolition & Core Cutting",
    "name": "RCC Wall Demolition",
    "rate": 280,
    "unit": "Sq.ft",
    "id": "civil-074",
    "image": "/civil-rcc-wall-demolition.webp"
  },
  {
    "category": "Demolition & Core Cutting",
    "name": "RCC Slab Demolition",
    "rate": 320,
    "unit": "Sq.ft",
    "id": "civil-075",
    "image": "/civil-rcc-slab-demolition.webp"
  },
  {
    "category": "Demolition & Core Cutting",
    "name": "Tile / Flooring Dismantling",
    "rate": 80,
    "unit": "Sq.ft",
    "id": "civil-076",
    "image": "/civil-tile-flooring-dismantling.webp"
  },
  {
    "category": "Demolition & Core Cutting",
    "name": "Old Plaster Hacking / Removal",
    "rate": 50,
    "unit": "Sq.ft",
    "id": "civil-077",
    "image": "/civil-old-plaster-hacking-removal.webp"
  },
  {
    "category": "Demolition & Core Cutting",
    "name": "RCC Core Cutting",
    "rate": 300,
    "unit": "Measured work",
    "id": "civil-078",
    "image": "/civil-rcc-core-cutting.webp"
  },
  {
    "category": "Demolition & Core Cutting",
    "name": "Door / Window Opening Cutting",
    "rate": 220,
    "unit": "Measured work",
    "id": "civil-079",
    "image": "/civil-door-window-opening-cutting.webp"
  },
  {
    "category": "Demolition & Core Cutting",
    "name": "Demolition Debris Removal & Site Clearance",
    "rate": 35,
    "unit": "Sq.ft",
    "id": "civil-080",
    "image": "/civil-demolition-debris-removal-and-site-clearance.webp"
  },
  {
    "category": "External Civil Works",
    "name": "Compound / Boundary Wall Construction",
    "rate": 300,
    "unit": "Sq.ft",
    "id": "civil-081",
    "image": "/civil-compound-boundary-wall-construction.webp"
  },
  {
    "category": "External Civil Works",
    "name": "RCC Gate Pillar Construction",
    "rate": 350,
    "unit": "Sq.ft",
    "id": "civil-082",
    "image": "/civil-rcc-gate-pillar-construction.webp"
  },
  {
    "category": "External Civil Works",
    "name": "Driveway Construction",
    "rate": 180,
    "unit": "Sq.ft",
    "id": "civil-083",
    "image": "/civil-driveway-construction.webp"
  },
  {
    "category": "External Civil Works",
    "name": "Interlocking Paver Block Work",
    "rate": 130,
    "unit": "Sq.ft",
    "id": "civil-084",
    "image": "/civil-interlocking-paver-block-work.webp"
  },
  {
    "category": "External Civil Works",
    "name": "Parking Area Civil Flooring",
    "rate": 150,
    "unit": "Sq.ft",
    "id": "civil-085",
    "image": "/civil-parking-area-civil-flooring.webp"
  },
  {
    "category": "External Civil Works",
    "name": "Stormwater / Open Drain Construction",
    "rate": 250,
    "unit": "Sq.ft",
    "id": "civil-086",
    "image": "/civil-stormwater-open-drain-construction.webp"
  },
  {
    "category": "External Civil Works",
    "name": "Vehicle / Accessibility Ramp Construction",
    "rate": 280,
    "unit": "Sq.ft",
    "id": "civil-087",
    "image": "/civil-vehicle-accessibility-ramp-construction.webp"
  },
  {
    "category": "External Civil Works",
    "name": "Road / Kerb Civil Work",
    "rate": 180,
    "unit": "Sq.ft",
    "id": "civil-088",
    "image": "/civil-road-kerb-civil-work.webp"
  },
  {
    "category": "External Civil Works",
    "name": "Underground Water Sump Civil Construction",
    "rate": 450,
    "unit": "Sq.ft",
    "id": "civil-089",
    "image": "/civil-underground-water-sump-civil-construction.webp"
  },
  {
    "category": "External Civil Works",
    "name": "Septic Tank Civil Construction",
    "rate": 420,
    "unit": "Sq.ft",
    "id": "civil-090",
    "image": "/civil-septic-tank-civil-construction.webp"
  },
  {
    "category": "External Civil Works",
    "name": "Manhole / Inspection Chamber Construction",
    "rate": 350,
    "unit": "Sq.ft",
    "id": "civil-091",
    "image": "/civil-manhole-inspection-chamber-construction.webp"
  },
  {
    "category": "External Civil Works",
    "name": "Rainwater Harvesting / Soak Pit Civil Work",
    "rate": 300,
    "unit": "Sq.ft",
    "id": "civil-092",
    "image": "/civil-rainwater-harvesting-soak-pit-civil-work.webp"
  },
  {
    "category": "Commercial & Industrial",
    "name": "Warehouse Civil Construction",
    "rate": 1800,
    "unit": "Sq.ft",
    "id": "civil-093",
    "image": "/civil-warehouse-civil-construction.webp"
  },
  {
    "category": "Commercial & Industrial",
    "name": "Industrial RCC Flooring",
    "rate": 280,
    "unit": "Sq.ft",
    "id": "civil-094",
    "image": "/civil-industrial-rcc-flooring.webp"
  },
  {
    "category": "Commercial & Industrial",
    "name": "Machine Foundation Construction",
    "rate": 650,
    "unit": "Sq.ft",
    "id": "civil-095",
    "image": "/civil-machine-foundation-construction.webp"
  },
  {
    "category": "Commercial & Industrial",
    "name": "Loading / Unloading Platform Construction",
    "rate": 500,
    "unit": "Sq.ft",
    "id": "civil-096",
    "image": "/civil-loading-unloading-platform-construction.webp"
  },
  {
    "category": "Commercial & Industrial",
    "name": "Factory Masonry Partition Work",
    "rate": 130,
    "unit": "Sq.ft",
    "id": "civil-097",
    "image": "/civil-factory-masonry-partition-work.webp"
  },
  {
    "category": "Commercial & Industrial",
    "name": "Office / Shop / Showroom Civil Renovation",
    "rate": 850,
    "unit": "Sq.ft",
    "id": "civil-098",
    "image": "/civil-office-shop-showroom-civil-renovation.webp"
  },
  {
    "category": "Commercial & Industrial",
    "name": "Commercial Toilet / Utility Block Civil Construction",
    "rate": 1200,
    "unit": "Sq.ft",
    "id": "civil-099",
    "image": "/civil-commercial-toilet-utility-block-civil-construction.webp"
  },
  {
    "category": "Civil Manpower",
    "name": "All-Rounder Civil Manpower",
    "rate": 1500,
    "unit": "Person / Day",
    "id": "civil-100",
    "image": "/civil-all-rounder-civil-manpower.webp"
  }
] as readonly CivilService[];

const CATEGORIES = [
  "All Civil Services",
  "Complete Construction",
  "RCC & Structural",
  "Masonry & Plastering",
  "Flooring & Surface",
  "Repair & Maintenance",
  "Waterproofing",
  "Demolition & Core Cutting",
  "External Civil Works",
  "Commercial & Industrial",
  "Civil Manpower",
] as const;

const QUICK_FILTERS = [
  { category: "All Civil Services", label: "All" },
  { category: "Complete Construction", label: "Construction" },
  { category: "RCC & Structural", label: "RCC & Structural" },
  { category: "Masonry & Plastering", label: "Masonry" },
  { category: "Flooring & Surface", label: "Finishing" },
  { category: "Repair & Maintenance", label: "Repairs" },
  { category: "External Civil Works", label: "External Works" },
] as const;

function SearchIcon() {
  return <svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="11" cy="11" r="6.5"/><path d="m16 16 4 4"/></svg>;
}

function CategoryIcon({ name }: { name: string }) {
  const common = { fill: "none", stroke: "currentColor", strokeWidth: 1.8, strokeLinecap: "round" as const, strokeLinejoin: "round" as const };
  let art;
  if (name === "Complete Construction") art = <><path d="m3 11 9-8 9 8"/><path d="M5 10v11h14V10M9 21v-7h6v7"/></>;
  else if (name === "RCC & Structural") art = <><path d="M5 21V7h4v14M15 21V3h4v18M3 21h18"/><path d="M9 9h6M9 15h6"/></>;
  else if (name === "Masonry & Plastering") art = <><path d="M3 6h8v5H3zM13 6h8v5h-8zM7 13h8v5H7zM3 20h8M13 20h8"/></>;
  else if (name === "Flooring & Surface") art = <><path d="M3 4h18v16H3zM3 12h18M9 4v16M15 4v16"/></>;
  else if (name === "Repair & Maintenance") art = <><path d="m14 6 4-4 4 4-4 4zM13 7 4 16l4 4 9-9"/><path d="m3 21 4-1-3-3z"/></>;
  else if (name === "Waterproofing") art = <><path d="M12 2s6 7 6 12a6 6 0 1 1-12 0c0-5 6-12 6-12Z"/><path d="M9 15c.7 1.5 2 2.2 3.5 2.2"/></>;
  else if (name === "Demolition & Core Cutting") art = <><path d="m4 20 7-7M9 6l9 9M12 3l9 9-3 3-9-9z"/><path d="M3 21h8"/></>;
  else if (name === "External Civil Works") art = <><path d="M3 21h18M5 21V9h6v12M13 21V4h6v17"/><path d="M7 12h2M7 16h2M15 8h2M15 12h2M15 16h2"/></>;
  else if (name === "Commercial & Industrial") art = <><path d="M3 21V9l6 3V8l6 4V4h6v17z"/><path d="M7 16h2M13 16h2M18 9h1"/></>;
  else if (name === "Civil Manpower") art = <><circle cx="12" cy="7" r="3"/><path d="M5 21v-3a7 7 0 0 1 14 0v3M8 4h8M9 2h6"/></>;
  else art = <><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/></>;
  return <span className={styles.categoryIcon}><svg viewBox="0 0 24 24" aria-hidden="true" {...common}>{art}</svg></span>;
}

function WorkflowIcon({ type }: { type: "select" | "schedule" | "inspect" | "quote" | "work" }) {
  const paths = {
    select: <><path d="M6 3h12v18H6zM9 7h6M9 11h6M9 15h3"/><path d="m14 16 2 2 4-5"/></>,
    schedule: <><rect x="3" y="5" width="18" height="16" rx="2"/><path d="M7 3v4M17 3v4M3 10h18M7 14h3M14 14h3M7 18h3"/></>,
    inspect: <><circle cx="12" cy="7" r="3"/><path d="M5 21v-3a7 7 0 0 1 14 0v3M8 4h8M9 2h6"/><path d="m15 15 2 2 4-5"/></>,
    quote: <><path d="M5 3h14v18H5zM8 7h8M8 11h8M8 15h4"/><circle cx="16" cy="16" r="2"/></>,
    work: <><path d="M3 21h18M5 21v-8h14v8M8 13V9h8v4M7 9h10M9 5h6v4"/><path d="M9 17h6"/></>,
  };
  return <span className={styles.workflowIcon}><svg viewBox="0 0 24 24" aria-hidden="true">{paths[type]}</svg></span>;
}

function money(value: number) {
  return new Intl.NumberFormat("en-IN", { maximumFractionDigits: 0 }).format(value);
}

export default function CivilServicesMarketplace() {
  const [query, setQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState<string>("All Civil Services");
  const [selected, setSelected] = useState<Record<string, number>>({});

  const visible = useMemo(() => {
    const term = query.trim().toLowerCase();
    return SERVICES.filter((service) => {
      const categoryMatch = activeCategory === "All Civil Services" || service.category === activeCategory;
      const searchMatch = !term || service.name.toLowerCase().includes(term) || service.category.toLowerCase().includes(term);
      return categoryMatch && searchMatch;
    });
  }, [activeCategory, query]);

  const selectedServices = useMemo(
    () => SERVICES.filter((service) => selected[service.id]).map((service) => ({ ...service, quantity: selected[service.id] })),
    [selected],
  );

  const manpowerSelection = selectedServices.find((service) => service.category === "Civil Manpower");
  const manpowerOnly = selectedServices.length === 1 && Boolean(manpowerSelection);
  const manpowerTotal = (manpowerSelection?.quantity || 0) * 1500;

  function add(service: CivilService) {
    setSelected((current) => current[service.id] ? current : { ...current, [service.id]: 1 });
  }

  function changeQuantity(id: string, amount: number) {
    setSelected((current) => {
      const next = Math.max(0, Math.min(50, (current[id] || 0) + amount));
      const copy = { ...current };
      if (next === 0) {
        delete copy[id];
      } else {
        copy[id] = next;
      }
      return copy;
    });
  }

  function remove(id: string) {
    setSelected((current) => {
      const copy = { ...current };
      delete copy[id];
      return copy;
    });
  }

  return (
    <section className={styles.marketplace} aria-label="Civil construction service booking">
      <div className={styles.shell}>
        <aside className={styles.sidebar} aria-label="Civil service filters">
          <nav className={styles.categoryNav}>
            {CATEGORIES.map((category) => (
              <button
                key={category}
                type="button"
                className={`${styles.categoryButton} ${activeCategory === category ? styles.categoryActive : ""}`}
                onClick={() => setActiveCategory(category)}
              >
                <CategoryIcon name={category} />
                <span>{category}</span>
              </button>
            ))}
          </nav>
          <div className={styles.trustNote}>
            <span className={styles.trustShield}><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2 20 5v6c0 5-3.4 9-8 11-4.6-2-8-6-8-11V5z"/><path d="m8.5 12 2.2 2.2 4.8-5"/></svg></span>
            <div><strong>Verified Civil Professionals</strong><small>Skilled, dependable and quality assured</small></div>
          </div>
        </aside>

        <div className={styles.catalog}>
          <label className={styles.searchBox}>
            <SearchIcon />
            <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search civil services..." />
          </label>

          <div className={styles.filterRail} role="group" aria-label="Quick civil service filters">
            {QUICK_FILTERS.map(({ category, label }) => (
              <button key={category} type="button" className={activeCategory === category ? styles.filterActive : ""} onClick={() => setActiveCategory(category)}>
                {label}
              </button>
            ))}
          </div>

          {visible.length ? (
            <div className={styles.grid}>
              {visible.map((service) => {
                const quantity = selected[service.id];
                const manpower = service.category === "Civil Manpower";
                return (
                  <article className={styles.card} key={service.id}>
                    <div className={styles.imageWrap}>
                      <img src={service.image} alt={service.name} loading="lazy" decoding="async" />
                    </div>
                    <div className={styles.cardBody}>
                      <h3>{service.name}</h3>
                      <p>
                        <span>{manpower ? "Fixed Rate" : "Starting"}</span> ₹{money(service.rate)} <small>/ {service.unit}</small>
                      </p>
                      {manpower ? (
                        <div className={styles.stepper} aria-label="Manpower quantity">
                          <button type="button" onClick={() => changeQuantity(service.id, -1)} aria-label="Decrease manpower">−</button>
                          <strong>{quantity || 0}</strong><span>Person</span>
                          <button type="button" onClick={() => changeQuantity(service.id, 1)} aria-label="Increase manpower">+</button>
                        </div>
                      ) : !quantity ? (
                        <button type="button" className={styles.addButton} onClick={() => add(service)}>Add Service</button>
                      ) : (
                        <button type="button" className={styles.addedButton} onClick={() => remove(service.id)}>✓ Added</button>
                      )}
                    </div>
                  </article>
                );
              })}
            </div>
          ) : <div className={styles.emptySearch}>No matching civil service found.</div>}
        </div>

        <aside className={styles.booking} aria-label="Your booking">
          <div className={styles.bookingTitle}><strong>YOUR BOOKING</strong>{selectedServices.length > 0 && <button type="button" onClick={() => setSelected({})}>Clear All</button>}</div>
          <div className={styles.bookingItems}>
            {selectedServices.length === 0 ? (
              <div className={styles.emptyBooking}><span>+</span><strong>Choose a civil service</strong><p>Your selected work will appear here.</p></div>
            ) : selectedServices.map((service) => (
              <div className={styles.bookingItem} key={service.id}>
                <img src={service.image} alt="" width="480" height="320" loading="lazy" decoding="async" />
                <div><strong>{service.name}</strong><small>{service.category === "Civil Manpower" ? "Fixed" : "Starting"} ₹{money(service.rate)} / {service.unit}</small>{service.category === "Civil Manpower" && <span>Qty: {service.quantity} person</span>}</div>
                <button type="button" onClick={() => remove(service.id)} aria-label={`Remove ${service.name}`}>×</button>
              </div>
            ))}
          </div>
          <div className={styles.bookingSummary}>
            {manpowerOnly && manpowerSelection ? (
              <>
                <div><span>Manpower Quantity</span><strong>{manpowerSelection.quantity} person</strong></div>
                <div className={styles.feeRow}><span>Manpower Booking Total</span><strong>₹{money(manpowerTotal)}</strong></div>
                <p>Fixed rate: ₹1,500 per person for one working day. Site survey is not required.</p>
                <div className={styles.modalTrigger}>
                  <ServiceBookingModal
                    packageId={`civil-manpower-${manpowerSelection.quantity}`}
                    serviceName="All-Rounder Civil Manpower"
                    originalPrice={manpowerTotal}
                    offerPrice={manpowerTotal}
                    triggerLabel="Continue to Book Manpower"
                    customServices={[{ id: manpowerSelection.id, name: manpowerSelection.name, quantity: manpowerSelection.quantity, unitPrice: 1500, lineTotal: manpowerTotal }]}
                  />
                </div>
              </>
            ) : (
              <>
                <div><span>Final work quotation</span><strong>After inspection</strong></div>
                <div className={styles.feeRow}><span>Site Survey & Booking Fee</span><strong>₹500</strong></div>
                <p>₹500 will be adjusted in the final bill after work confirmation.</p>
                {selectedServices.length ? (
                  <div className={styles.modalTrigger}>
                    <ServiceBookingModal
                      packageId="civil-site-survey"
                      serviceName="Civil Construction Site Survey"
                      originalPrice={500}
                      offerPrice={500}
                      fullPayment
                      triggerLabel="Pay ₹500 & Book Site Survey"
                      customServices={selectedServices.map((service) => ({ id: service.id, name: service.name, quantity: service.quantity, unitPrice: 0, lineTotal: 0 }))}
                    />
                  </div>
                ) : <button className={styles.disabledCta} type="button" disabled>Select a Service to Continue</button>}
              </>
            )}
            <ul><li>Verified Civil Professionals</li><li>Transparent & Fair Quotation</li><li>On-time & Quality Assured</li><li>Secure Online Payment</li></ul>
          </div>
        </aside>
      </div>

      <div className={styles.workflow}>
        <div><WorkflowIcon type="select"/><span><strong>Select Services</strong><small>Choose the civil work you need</small></span></div>
        <i>→</i>
        <div><WorkflowIcon type="schedule"/><span><strong>Book Site Survey</strong><small>Pay ₹500 and choose your visit</small></span></div>
        <i>→</i>
        <div><WorkflowIcon type="inspect"/><span><strong>Property Inspection</strong><small>Our expert visits and inspects</small></span></div>
        <i>→</i>
        <div><WorkflowIcon type="quote"/><span><strong>Final Quotation</strong><small>Get an accurate work quotation</small></span></div>
        <i>→</i>
        <div><WorkflowIcon type="work"/><span><strong>Work Starts</strong><small>Work begins after confirmation</small></span></div>
      </div>
    </section>
  );
}
