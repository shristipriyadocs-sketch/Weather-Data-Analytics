import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  CartesianGrid,
  ResponsiveContainer,
} from 'recharts';
import type { ForecastDay } from '../types/weather';
import { CITY_COLORS } from './CityChips';

interface Props {
  forecastMap: Record<string, ForecastDay[]>;
}

export const ComparisonPrecipChart: React.FC<Props> = ({ forecastMap }) => {
  const cities = Object.keys(forecastMap);
  if (!cities.length) return null;

  const baseDays = forecastMap[cities[0]];
  const chartData = baseDays.map((day, i) => {
    const row: Record<string, string | number> = { date: day.date.slice(5) };
    cities.forEach((city) => {
      const d = forecastMap[city]?.[i];
      if (d) row[city] = d.precipitation;
    });
    return row;
  });

  return (
    <div className="card chart-card">
      <h3 className="chart-title">7-Day Precipitation Comparison (mm)</h3>
      <ResponsiveContainer width="100%" height={260}>
        <BarChart data={chartData} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
          <XAxis dataKey="date" tick={{ fontSize: 11 }} />
          <YAxis tick={{ fontSize: 11 }} unit="mm" />
          <Tooltip />
          <Legend />
          {cities.map((city, i) => (
            <Bar
              key={city}
              dataKey={city}
              fill={CITY_COLORS[i % CITY_COLORS.length]}
            />
          ))}
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};
