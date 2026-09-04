from __future__ import annotations

import json
from pathlib import Path

SERVICES = [
    {
        "name": "Deep Cleaning",
        "href": "/services/deep-cleaning",
        "keywords": ["cleaning", "deep cleaning", "home cleaning", "office cleaning"],
    },
    {
        "name": "Renovation",
        "href": "/services/renovation",
        "keywords": ["renovation", "property renovation", "home renovation"],
    },
    {
        "name": "Electrical Works",
        "href": "/services/electrical-works",
        "keywords": ["electrical", "electrician", "ac service", "wiring"],
    },
    {
        "name": "Plumbing Works",
        "href": "/services/plumbing-works",
        "keywords": ["plumbing", "plumber", "pipe repair", "water"],
    },
    {
        "name": "Painting Services",
        "href": "/services/painting-services",
        "keywords": ["painting", "painter", "wall painting", "interior painting"],
    },
    {
        "name": "Civil Construction & Maintenance",
        "href": "/services/civil-construction-maintenance",
        "keywords": ["civil", "construction", "maintenance", "building work"],
    },
    {
        "name": "Appliance Repair",
        "href": "/services/appliance-repair",
        "keywords": ["appliance", "repair", "washing machine", "fridge", "ac"],
    },
    {
        "name": "Carpentry & Interior Works",
        "href": "/services/carpentry-interior-works",
        "keywords": ["carpentry", "carpenter", "interior", "woodwork"],
    },
    {
        "name": "Packers & Movers",
        "href": "/services/packers-movers",
        "keywords": ["packers", "movers", "moving", "shifting", "relocation"],
    },
    {
        "name": "Pest Control",
        "href": "/services/pest-control",
        "keywords": ["pest", "pest control", "cockroach", "termite"],
    },
    {
        "name": "Spa & Salon Services",
        "href": "/services/spa-salon-services",
        "keywords": ["spa", "salon", "beauty", "wellness"],
    },
    {
        "name": "Fabrication Works",
        "href": "/services/fabrication-works",
        "keywords": ["fabrication", "metal", "welding", "steel"],
    },
    {
        "name": "Gardening & Landscaping",
        "href": "/services/gardening-landscaping",
        "keywords": ["gardening", "garden", "landscaping", "outdoor"],
    },
]

ROOT = Path(__file__).resolve().parents[1]
OUTPUT = ROOT / "public" / "services-catalog.json"

OUTPUT.parent.mkdir(parents=True, exist_ok=True)

payload = {
    "version": 1,
    "serviceCount": len(SERVICES),
    "services": SERVICES,
}

OUTPUT.write_text(
    json.dumps(payload, ensure_ascii=False, indent=2),
    encoding="utf-8",
)

print(f"Generated {len(SERVICES)} services -> {OUTPUT}")