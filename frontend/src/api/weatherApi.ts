import axios from 'axios';
import type {
  CityResult,
  CurrentWeather,
  ForecastDay,
  HourlyPoint,
  HistoricalDay,
} from '../types/weather';

const api = axios.create({ baseURL: '/api' });

export const searchCities = async (query: string): Promise<CityResult[]> => {
  const { data } = await api.get<CityResult[]>('/cities/search', {
    params: { q: query },
  });
  return data;
};

export const getCurrentWeather = async (city: string): Promise<CurrentWeather> => {
  const { data } = await api.get<CurrentWeather>('/weather/current', {
    params: { city },
  });
  return data;
};

export const getForecast = async (city: string): Promise<ForecastDay[]> => {
  const { data } = await api.get<ForecastDay[]>('/weather/forecast', {
    params: { city },
  });
  return data;
};

export const getHourly = async (city: string): Promise<HourlyPoint[]> => {
  const { data } = await api.get<HourlyPoint[]>('/weather/hourly', {
    params: { city },
  });
  return data;
};

export const getHistorical = async (
  city: string,
  start: string,
  end: string
): Promise<HistoricalDay[]> => {
  const { data } = await api.get<HistoricalDay[]>('/weather/historical', {
    params: { city, start, end },
  });
  return data;
};
