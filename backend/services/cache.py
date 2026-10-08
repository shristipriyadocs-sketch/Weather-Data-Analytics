import json
import time
import os
from typing import Any

from database import get_connection

CACHE_TTL = int(os.getenv("CACHE_TTL_SECONDS", "3600"))


def get(key: str) -> dict | None:
    """Return cached data if present and not expired, otherwise None."""
    with get_connection() as conn:
        row = conn.execute(
            "SELECT data_json, fetched_at FROM weather_cache WHERE cache_key = ?",
            (key,),
        ).fetchone()

    if row is None:
        return None

    age = int(time.time()) - row["fetched_at"]
    if age > CACHE_TTL:
        return None

    return json.loads(row["data_json"])


def set(key: str, data: Any) -> None:
    """Upsert data into the cache with the current timestamp."""
    with get_connection() as conn:
        conn.execute(
            """
            INSERT INTO weather_cache (cache_key, data_json, fetched_at)
            VALUES (?, ?, ?)
            ON CONFLICT(cache_key) DO UPDATE SET
                data_json  = excluded.data_json,
                fetched_at = excluded.fetched_at
            """,
            (key, json.dumps(data), int(time.time())),
        )
        conn.commit()
