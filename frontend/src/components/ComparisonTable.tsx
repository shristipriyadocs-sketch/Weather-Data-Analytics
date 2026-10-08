import React from 'react';
import type { ForecastDay } from '../types/weather';
import { convertTemp } from '../utils/units';
import { CITY_COLORS } from './CityChips';

interface Props {
  forecastMap: Record<string, ForecastDay[]>;
  unit: 'C' | 'F';
}

export const ComparisonTable: React.FC<Props> = ({ forecastMap, unit }) => {
  const cities = Object.keys(forecastMap);
  if (!cities.length) return null;

  const stats = cities.map((city, i) => {
    const days = forecastMap[city] ?? [];
    const maxTemps = days.map((d) => d.temp_max);
    const minTemps = days.map((d) => d.temp_min);
    const allTemps = [...maxTemps, ...minTemps];
    const mean = allTemps.length
      ? allTemps.reduce((a, b) => a + b, 0) / allTemps.length
      : 0;
    const totalPrecip = days.reduce((a, d) => a + d.precipitation, 0);
    const maxWind = Math.max(...days.map((d) => d.windspeed_max));
    return { city, color: CITY_COLORS[i % CITY_COLORS.length], mean, totalPrecip, maxWind };
  });

  return (
    <div className="card">
      <h3 className="chart-title">Summary Comparison</h3>
      <table className="comparison-table">
        <thead>
          <tr>
            <th>City</th>
            <th>Mean Temp</th>
            <th>Total Precip</th>
            <th>Max Wind</th>
          </tr>
        </thead>
        <tbody>
          {stats.map((s) => (
            <tr key={s.city}>
              <td>
                <span className="table-city-dot" style={{ background: s.color }} />
                {s.city}
              </td>
              <td>{convertTemp(parseFloat(s.mean.toFixed(1)), unit)}°{unit}</td>
              <td>{s.totalPrecip.toFixed(1)} mm</td>
              <td>{s.maxWind} km/h</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
