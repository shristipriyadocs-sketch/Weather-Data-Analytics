from fastapi import APIRouter, HTTPException, Query

import services.cache as cache
import services.open_meteo as om
from models.schemas import CityResult

router = APIRouter(prefix="/api/cities", tags=["cities"])


@router.get("/search", response_model=list[CityResult])
async def search_cities(q: str = Query(..., min_length=1)):
    cache_key = f"cities:search:{q.lower()}"
    cached = cache.get(cache_key)
    if cached:
        return cached

    results = await om.geocode(q)
    if not results:
        return []

    data = [
        {
            "name": r.get("name", ""),
            "country": r.get("country", ""),
            "latitude": r.get("latitude", 0.0),
            "longitude": r.get("longitude", 0.0),
        }
        for r in results
    ]
    cache.set(cache_key, data)
    return data
