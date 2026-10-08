import React, { useEffect, useState } from 'react';
import { getCurrentWeather, getForecast, getHourly } from '../api/weatherApi';
import { useWeatherStore } from '../store/weatherStore';
import type { CurrentWeather, ForecastDay, HourlyPoint } from '../types/weather';
import { CitySearch } from '../components/CitySearch';
import { CurrentConditionsCard } from '../components/CurrentConditionsCard';
import { HourlyChart } from '../components/HourlyChart';
import { ForecastChart } from '../components/ForecastChart';
import { StatsPanel } from '../components/StatsPanel';
import { SkeletonLoader } from '../components/SkeletonLoader';

export const Dashboard: React.FC = () => {
  const { selectedCities, unit } = useWeatherStore();
  const city = selectedCities[0] ?? null;

  const [current, setCurrent] = useState<CurrentWeather | null>(null);
  const [forecast, setForecast] = useState<ForecastDay[]>([]);
  const [hourly, setHourly] = useState<HourlyPoint[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!city) return;
    setLoading(true);
    setError(null);
    Promise.all([getCurrentWeather(city), getForecast(city), getHourly(city)])
      .then(([cur, fore, hour]) => {
        setCurrent(cur);
        setForecast(fore);
        setHourly(hour);
      })
      .catch((e) => setError(e?.response?.data?.detail ?? 'Failed to load weather data'))
      .finally(() => setLoading(false));
  }, [city]);

  return (
    <div className="page">
      <div className="page-header">
        <h1 className="page-title">Dashboard</h1>
        <CitySearch placeholder="Search and add a city…" />
      </div>

      {!city && (
        <div className="empty-state">
          <p>Search for a city above to see weather data.</p>
        </div>
      )}

      {city && loading && <SkeletonLoader />}

      {error && <div className="error-banner">{error}</div>}

      {city && !loading && current && (
        <>
          <CurrentConditionsCard data={current} unit={unit} />
          <div className="charts-row">
            <HourlyChart data={hourly} unit={unit} />
            <ForecastChart data={forecast} unit={unit} />
          </div>
          <StatsPanel data={forecast} unit={unit} title="7-Day Statistics" />
        </>
      )}
    </div>
  );
};
