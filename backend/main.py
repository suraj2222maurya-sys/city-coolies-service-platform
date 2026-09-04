from __future__ import annotations

from fastapi import FastAPI

app = FastAPI(
    title="City Coolies API",
    version="0.1.0",
)


@app.get("/health")
def health() -> dict[str, str]:
    return {
        "status": "ok",
        "platform": "City Coolies",
        "runtime": "Python FastAPI",
    }


@app.get("/api/v1/services/popular")
def popular_services() -> list[dict[str, object]]:
    return [
        {
            "id": "deep-cleaning",
            "title": "Deep Cleaning",
            "route": "/services/deep-cleaning",
            "starting_price": 1499,
        },
        {
            "id": "renovation",
            "title": "Renovation",
            "route": "/services/renovation",
            "starting_price": 4999,
        },
        {
            "id": "electrical-works",
            "title": "Electrical Works",
            "route": "/services/electrical-works",
            "starting_price": 499,
        },
        {
            "id": "plumbing-works",
            "title": "Plumbing Works",
            "route": "/services/plumbing-works",
            "starting_price": 499,
        },
        {
            "id": "painting-services",
            "title": "Painting Services",
            "route": "/services/painting-services",
            "starting_price": 1999,
        },
    ]