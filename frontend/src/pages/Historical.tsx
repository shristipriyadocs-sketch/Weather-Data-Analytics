import React, { useState } from 'react';
import { getHistorical } from '../api/weatherApi';
import { useWeatherStore } from '../store/weatherStore';
import type { HistoricalDay } from '../types/weather';
import { CitySearch } from '../components/CitySearch';
import { DateRangePicker } from '../components/DateRangePicker';
import { HistoricalTempChart } from '../components/HistoricalTempChart';
import { PrecipitationChart } from '../components/PrecipitationChart';
import { StatsPanel } from '../components/StatsPanel';
import { SkeletonLoader } from '../components/SkeletonLoader';

export const Historical: React.FC = () => {
  const { selectedCities, unit, dateRange } = useWeatherStore();
  const city = selectedCities[0] ?? null;

  const [data, setData] = useState<HistoricalDay[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = () => {
    if (!city) {
      setError('Please select a city first.');
      return;
    }
    setLoading(true);
    setError(null);
    getHistorical(city, dateRange.start, dateRange.end)
      .then(setData)
      .catch((e) => setError(e?.response?.data?.detail ?? 'Failed to load historical data'))
      .finally(() => setLoading(false));
  };

  return (
    <div className="page">
      <div className="page-header">
        <h1 className="page-title">Historical Explorer</h1>
        <CitySearch placeholder="Search city…" />
      </div>

      <DateRangePicker onSubmit={handleSubmit} />

      {loading && <SkeletonLoader />}
      {error && <div className="error-banner">{error}</div>}

      {!loading && data.length > 0 && (
        <>
          <HistoricalTempChart data={data} unit={unit} />
          <PrecipitationChart data={data} />
          <StatsPanel data={data} unit={unit} title={`Statistics — ${city}`} />
        </>
      )}

      {!loading && !error && data.length === 0 && city && (
        <div className="empty-state">
          <p>Select a date range and click "Load Historical Data".</p>
        </div>
      )}
    </div>
  );
};
