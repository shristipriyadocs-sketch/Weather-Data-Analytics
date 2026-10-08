import sqlite3
import os

DB_PATH = os.path.join(os.path.dirname(__file__), "weather_cache.db")


def get_connection() -> sqlite3.Connection:
    conn = sqlite3.connect(DB_PATH)
    conn.row_factory = sqlite3.Row
    return conn


def init_db() -> None:
    with get_connection() as conn:
        conn.execute(
            """
            CREATE TABLE IF NOT EXISTS weather_cache (
                cache_key   TEXT PRIMARY KEY,
                data_json   TEXT NOT NULL,
                fetched_at  INTEGER NOT NULL
            )
            """
        )
        conn.commit()
