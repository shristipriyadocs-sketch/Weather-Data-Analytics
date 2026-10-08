import React from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  CartesianGrid,
  ResponsiveContainer,
} from 'recharts';
import type { ForecastDay } from '../types/weather';
import { convertTemp } from '../utils/units';
import { CITY_COLORS } from './CityChips';

interface Props {
  forecastMap: Record<string, ForecastDay[]>;
  unit: 'C' | 'F';
}

export const ComparisonTempChart: React.FC<Props> = ({ forecastMap, unit }) => {
  const cities = Object.keys(forecastMap);
  if (!cities.length) return null;

  // Merge all city forecasts by date index
  const baseDays = forecastMap[cities[0]];
  const chartData = baseDays.map((day, i) => {
    const row: Record<string, string | number> = { date: day.date.slice(5) };
    cities.forEach((city) => {
      const d = forecastMap[city]?.[i];
      if (d) row[city] = convertTemp(d.temp_max, unit);
    });
    return row;
  });

  return (
    <div className="card chart-card">
      <h3 className="chart-title">7-Day Max Temperature Comparison</h3>
      <ResponsiveContainer width="100%" height={280}>
        <LineChart data={chartData} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
          <XAxis dataKey="date" tick={{ fontSize: 11 }} />
          <YAxis tick={{ fontSize: 11 }} unit={`°${unit}`} />
          <Tooltip />
          <Legend />
          {cities.map((city, i) => (
            <Line
              key={city}
              type="monotone"
              dataKey={city}
              stroke={CITY_COLORS[i % CITY_COLORS.length]}
              dot={false}
            />
          ))}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};
