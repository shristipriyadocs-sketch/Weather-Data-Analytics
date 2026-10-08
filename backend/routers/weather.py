from fastapi import APIRouter, HTTPException, Query

import services.cache as cache
import services.open_meteo as om
from models.schemas import CurrentWeather, ForecastDay, HourlyPoint, HistoricalDay

router = APIRouter(prefix="/api/weather", tags=["weather"])


async def _resolve_city(city: str) -> tuple[float, float, str]:
    """Geocode a city name; returns (lat, lon, canonical_name)."""
    results = await om.geocode(city)
    if not results:
        raise HTTPException(status_code=404, detail=f"City '{city}' not found")
    r = results[0]
    return r["latitude"], r["longitude"], r["name"]


@router.get("/current", response_model=CurrentWeather)
async def get_current(city: str = Query(...)):
    cache_key = f"{city.lower()}:current"
    cached = cache.get(cache_key)
    if cached:
        return cached

    lat, lon, name = await _resolve_city(city)
    raw = await om.fetch_current(lat, lon)

    cw = raw.get("current_weather", {})
    hourly = raw.get("hourly", {})
    humidity_list = hourly.get("relativehumidity_2m", [None])
    humidity = humidity_list[0] if humidity_list else None

    data = {
        "city": name,
        "temperature": cw.get("temperature", 0.0),
        "windspeed": cw.get("windspeed", 0.0),
        "weathercode": cw.get("weathercode", 0),
        "humidity": humidity,
        "description": om.wmo_description(cw.get("weathercode", 0)),
    }
    cache.set(cache_key, data)
    return data


@router.get("/forecast", response_model=list[ForecastDay])
async def get_forecast(city: str = Query(...)):
    cache_key = f"{city.lower()}:forecast:7d"
    cached = cache.get(cache_key)
    if cached:
        return cached

    lat, lon, _ = await _resolve_city(city)
    raw = await om.fetch_forecast(lat, lon)

    daily = raw.get("daily", {})
    dates = daily.get("time", [])
    data = [
        {
            "date": dates[i],
            "temp_max": daily["temperature_2m_max"][i],
            "temp_min": daily["temperature_2m_min"][i],
            "precipitation": daily["precipitation_sum"][i] or 0.0,
            "windspeed_max": daily["windspeed_10m_max"][i],
            "weathercode": daily["weathercode"][i],
        }
        for i in range(len(dates))
    ]
    cache.set(cache_key, data)
    return data


@router.get("/hourly", response_model=list[HourlyPoint])
async def get_hourly(city: str = Query(...)):
    cache_key = f"{city.lower()}:hourly"
    cached = cache.get(cache_key)
    if cached:
        return cached

    lat, lon, _ = await _resolve_city(city)
    raw = await om.fetch_hourly(lat, lon)

    hourly = raw.get("hourly", {})
    times = hourly.get("time", [])
    data = [
        {
            "time": times[i].split("T")[1],  # "HH:MM"
            "temperature": hourly["temperature_2m"][i],
            "humidity": hourly["relativehumidity_2m"][i],
            "windspeed": hourly["windspeed_10m"][i],
        }
        for i in range(len(times))
    ]
    cache.set(cache_key, data)
    return data


@router.get("/historical", response_model=list[HistoricalDay])
async def get_historical(
    city: str = Query(...),
    start: str = Query(..., description="YYYY-MM-DD"),
    end: str = Query(..., description="YYYY-MM-DD"),
):
    cache_key = f"{city.lower()}:historical:{start}:{end}"
    cached = cache.get(cache_key)
    if cached:
        return cached

    lat, lon, _ = await _resolve_city(city)
    raw = await om.fetch_historical(lat, lon, start, end)

    daily = raw.get("daily", {})
    dates = daily.get("time", [])
    data = [
        {
            "date": dates[i],
            "temp_max": daily["temperature_2m_max"][i],
            "temp_min": daily["temperature_2m_min"][i],
            "precipitation": (daily.get("precipitation_sum") or [0.0])[i] or 0.0,
            "windspeed_max": daily["windspeed_10m_max"][i],
            "weathercode": daily["weathercode"][i],
        }
        for i in range(len(dates))
    ]
    cache.set(cache_key, data)
    return data
