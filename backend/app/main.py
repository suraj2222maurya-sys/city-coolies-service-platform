from __future__ import annotations

from datetime import datetime, timezone
from pathlib import Path
import sqlite3
from typing import Optional

from fastapi import FastAPI
from pydantic import BaseModel, Field


APP_DIR = Path(__file__).resolve().parent
BACKEND_DIR = APP_DIR.parent
DATA_DIR = BACKEND_DIR / "data"
DATABASE_PATH = DATA_DIR / "city_coolies.sqlite3"

DATA_DIR.mkdir(
    parents=True,
    exist_ok=True,
)


def get_connection() -> sqlite3.Connection:
    connection = sqlite3.connect(
        DATABASE_PATH,
        timeout=10,
    )

    connection.row_factory = (
        sqlite3.Row
    )

    return connection


def initialize_database() -> None:
    with get_connection() as connection:
        connection.execute(
            """
            CREATE TABLE IF NOT EXISTS offer_clicks (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                offer_code TEXT NOT NULL,
                source TEXT NOT NULL,
                destination TEXT NOT NULL,
                user_agent TEXT,
                referer TEXT,
                created_at TEXT NOT NULL
            )
            """
        )

        connection.execute(
            """
            CREATE INDEX IF NOT EXISTS
            idx_offer_clicks_offer_code_created_at
            ON offer_clicks (
                offer_code,
                created_at
            )
            """
        )

        connection.commit()


initialize_database()


class OfferClickPayload(BaseModel):
    source: str = Field(
        default="services-trust-offer",
        min_length=1,
        max_length=100,
    )

    offer_code: str = Field(
        default="HOME20",
        min_length=1,
        max_length=32,
    )

    destination: str = Field(
        default="/services#all-services-catalog",
        min_length=1,
        max_length=250,
    )

    user_agent: Optional[str] = Field(
        default=None,
        max_length=1000,
    )

    referer: Optional[str] = Field(
        default=None,
        max_length=1000,
    )


app = FastAPI(
    title="City Coolies Python Services API",
    version="1.0.0",
)


@app.get("/health")
def health() -> dict[str, object]:
    return {
        "ok": True,
        "service": "city-coolies-python-api",
        "database": "sqlite",
    }


@app.post(
    "/api/v1/offers/home-services/click"
)
def record_home_services_offer_click(
    payload: OfferClickPayload,
) -> dict[str, object]:
    created_at = (
        datetime.now(timezone.utc)
        .isoformat()
    )

    with get_connection() as connection:
        cursor = connection.execute(
            """
            INSERT INTO offer_clicks (
                offer_code,
                source,
                destination,
                user_agent,
                referer,
                created_at
            )
            VALUES (?, ?, ?, ?, ?, ?)
            """,
            (
                payload.offer_code,
                payload.source,
                payload.destination,
                payload.user_agent,
                payload.referer,
                created_at,
            ),
        )

        connection.commit()

        click_id = cursor.lastrowid

    return {
        "ok": True,
        "click_id": click_id,
        "offer_code":
            payload.offer_code,
        "destination":
            payload.destination,
        "created_at":
            created_at,
    }