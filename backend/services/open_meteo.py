"""
Open-Meteo API client — all network calls live here.
Uses httpx.AsyncClient for async I/O.
"""
from datetime import date, timedelta
from typing import Any

import httpx

GEOCODING_URL = "https://geocoding-api.open-meteo.com/v1/search"
FORECAST_URL = "https://api.open-meteo.com/v1/forecast"
ARCHIVE_URL = "https://archive-api.open-meteo.com/v1/archive"

WMO_DESCRIPTIONS: dict[int, str] = {
    0: "Clear sky",
    1: "Mainly clear", 2: "Partly cloudy", 3: "Overcast",
    45: "Foggy", 48: "Icy fog",
    51: "Light drizzle", 53: "Moderate drizzle", 55: "Dense drizzle",
    61: "Slight rain", 63: "Moderate rain", 65: "Heavy rain",
    71: "Slight snow", 73: "Moderate snow", 75: "Heavy snow",
    77: "Snow grains",
    80: "Slight showers", 81: "Moderate showers", 82: "Violent showers",
    85: "Slight snow showers", 86: "Heavy snow showers",
    95: "Thunderstorm", 96: "Thunderstorm with slight hail",
    99: "Thunderstorm with heavy hail",
}


def wmo_description(code: int) -> str:
    return WMO_DESCRIPTIONS.get(code, f"Code {code}")


async def geocode(city_name: str) -> list[dict]:
    async with httpx.AsyncClient(timeout=10) as client:
        resp = await client.get(
            GEOCODING_URL,
            params={"name": city_name, "count": 5, "language": "en", "format": "json"},
        )
        resp.raise_for_status()
        data = resp.json()
        return data.get("results", [])


async def fetch_current(lat: float, lon: float) -> dict[str, Any]:
    """Fetch current weather conditions + first hourly humidity."""
    async with httpx.AsyncClient(timeout=10) as client:
        resp = await client.get(
            FORECAST_URL,
            params={
                "latitude": lat,
                "longitude": lon,
                "current_weather": "true",
                "hourly": "relativehumidity_2m",
                "forecast_days": 1,
                "timezone": "auto",
            },
        )
        resp.raise_for_status()
        return resp.json()


async def fetch_forecast(lat: float, lon: float) -> dict[str, Any]:
    """Fetch 7-day daily forecast."""
    async with httpx.AsyncClient(timeout=10) as client:
        resp = await client.get(
            FORECAST_URL,
            params={
                "latitude": lat,
                "longitude": lon,
                "daily": ",".join([
                    "temperature_2m_max",
                    "temperature_2m_min",
                    "precipitation_sum",
                    "windspeed_10m_max",
                    "weathercode",
                ]),
                "forecast_days": 7,
                "timezone": "auto",
            },
        )
        resp.raise_for_status()
        return resp.json()


async def fetch_hourly(lat: float, lon: float) -> dict[str, Any]:
    """Fetch 24-hour hourly data for today."""
    async with httpx.AsyncClient(timeout=10) as client:
        resp = await client.get(
            FORECAST_URL,
            params={
                "latitude": lat,
                "longitude": lon,
                "hourly": ",".join([
                    "temperature_2m",
                    "relativehumidity_2m",
                    "windspeed_10m",
                ]),
                "forecast_days": 1,
                "timezone": "auto",
            },
        )
        resp.raise_for_status()
        return resp.json()


async def fetch_historical(
    lat: float, lon: float, start_date: str, end_date: str
) -> dict[str, Any]:
    """Fetch historical daily records from the archive endpoint."""
    async with httpx.AsyncClient(timeout=15) as client:
        resp = await client.get(
            ARCHIVE_URL,
            params={
                "latitude": lat,
                "longitude": lon,
                "start_date": start_date,
                "end_date": end_date,
                "daily": ",".join([
                    "temperature_2m_max",
                    "temperature_2m_min",
                    "precipitation_sum",
                    "windspeed_10m_max",
                    "weathercode",
                ]),
                "timezone": "auto",
            },
        )
        resp.raise_for_status()
        return resp.json()
