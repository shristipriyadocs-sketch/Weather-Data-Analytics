import React from 'react';
import type { ForecastDay, HistoricalDay } from '../types/weather';
import { convertTemp } from '../utils/units';

type Day = Pick<ForecastDay | HistoricalDay, 'temp_max' | 'temp_min' | 'precipitation'>;

interface Props {
  data: Day[];
  unit: 'C' | 'F';
  title?: string;
}

export const StatsPanel: React.FC<Props> = ({ data, unit, title = 'Statistics' }) => {
  if (!data.length) return null;

  const maxTemps = data.map((d) => d.temp_max);
  const minTemps = data.map((d) => d.temp_min);
  const allTemps = [...maxTemps, ...minTemps];
  const mean = allTemps.reduce((a, b) => a + b, 0) / allTemps.length;
  const totalPrecip = data.reduce((a, d) => a + d.precipitation, 0);

  const stat = (label: string, value: string) => (
    <div className="stat-item" key={label}>
      <span className="stat-label">{label}</span>
      <span className="stat-value">{value}</span>
    </div>
  );

  return (
    <div className="card stats-panel">
      <h3 className="chart-title">{title}</h3>
      <div className="stats-grid">
        {stat('Max Temp', `${convertTemp(Math.max(...maxTemps), unit)}°${unit}`)}
        {stat('Min Temp', `${convertTemp(Math.min(...minTemps), unit)}°${unit}`)}
        {stat('Mean Temp', `${convertTemp(parseFloat(mean.toFixed(1)), unit)}°${unit}`)}
        {stat('Total Precip', `${totalPrecip.toFixed(1)} mm`)}
      </div>
    </div>
  );
};
