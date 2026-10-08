from pydantic import BaseModel
from typing import Optional


class CityResult(BaseModel):
    name: str
    country: str
    latitude: float
    longitude: float


class CurrentWeather(BaseModel):
    city: str
    temperature: float
    windspeed: float
    weathercode: int
    humidity: Optional[float] = None
    description: str


class ForecastDay(BaseModel):
    date: str
    temp_max: float
    temp_min: float
    precipitation: float
    windspeed_max: float
    weathercode: int


class HourlyPoint(BaseModel):
    time: str
    temperature: float
    humidity: float
    windspeed: float


class HistoricalDay(BaseModel):
    date: str
    temp_max: float
    temp_min: float
    precipitation: float
    windspeed_max: float
    weathercode: int
