export interface CityResult {
  name: string;
  country: string;
  latitude: number;
  longitude: number;
}

export interface CurrentWeather {
  city: string;
  temperature: number;
  windspeed: number;
  weathercode: number;
  humidity: number | null;
  description: string;
}

export interface ForecastDay {
  date: string;
  temp_max: number;
  temp_min: number;
  precipitation: number;
  windspeed_max: number;
  weathercode: number;
}

export interface HourlyPoint {
  time: string;
  temperature: number;
  humidity: number;
  windspeed: number;
}

export interface HistoricalDay {
  date: string;
  temp_max: number;
  temp_min: number;
  precipitation: number;
  windspeed_max: number;
  weathercode: number;
}
