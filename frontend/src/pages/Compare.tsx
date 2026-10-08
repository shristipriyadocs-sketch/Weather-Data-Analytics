import React, { useEffect, useState } from 'react';
import { getForecast } from '../api/weatherApi';
import { useWeatherStore } from '../store/weatherStore';
import type { ForecastDay } from '../types/weather';
import { CityChips } from '../components/CityChips';
import { ComparisonTempChart } from '../components/ComparisonTempChart';
import { ComparisonPrecipChart } from '../components/ComparisonPrecipChart';
import { ComparisonTable } from '../components/ComparisonTable';
import { SkeletonLoader } from '../components/SkeletonLoader';

export const Compare: React.FC = () => {
  const { selectedCities, unit } = useWeatherStore();
  const [forecastMap, setForecastMap] = useState<Record<string, ForecastDay[]>>({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!selectedCities.length) {
      setForecastMap({});
      return;
    }
    setLoading(true);
    setError(null);
    Promise.all(
      selectedCities.map((city) =>
        getForecast(city).then((data) => ({ city, data }))
      )
    )
      .then((results) => {
        const map: Record<string, ForecastDay[]> = {};
        results.forEach(({ city, data }) => {
          map[city] = data;
        });
        setForecastMap(map);
      })
      .catch((e) => setError(e?.response?.data?.detail ?? 'Failed to load comparison data'))
      .finally(() => setLoading(false));
  }, [selectedCities]);

  return (
    <div className="page">
      <div className="page-header">
        <h1 className="page-title">Multi-City Comparison</h1>
      </div>

      <CityChips maxCities={5} />

      {loading && <SkeletonLoader />}
      {error && <div className="error-banner">{error}</div>}

      {!loading && selectedCities.length === 0 && (
        <div className="empty-state">
          <p>Add up to 5 cities to compare their weather.</p>
        </div>
      )}

      {!loading && Object.keys(forecastMap).length > 0 && (
        <>
          <ComparisonTempChart forecastMap={forecastMap} unit={unit} />
          <ComparisonPrecipChart forecastMap={forecastMap} />
          <ComparisonTable forecastMap={forecastMap} unit={unit} />
        </>
      )}
    </div>
  );
};
