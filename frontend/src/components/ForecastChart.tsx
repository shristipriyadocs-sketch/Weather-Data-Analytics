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
import { convertTemp } from '../utils/units';

interface Props {
  data: ForecastDay[];
  unit: 'C' | 'F';
}

export const ForecastChart: React.FC<Props> = ({ data, unit }) => {
  const converted = data.map((d) => ({
    date: d.date.slice(5), // MM-DD
    High: convertTemp(d.temp_max, unit),
    Low: convertTemp(d.temp_min, unit),
    Rain: d.precipitation,
  }));

  return (
    <div className="card chart-card">
      <h3 className="chart-title">7-Day Forecast</h3>
      <ResponsiveContainer width="100%" height={260}>
        <BarChart data={converted} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
          <XAxis dataKey="date" tick={{ fontSize: 11 }} />
          <YAxis yAxisId="temp" tick={{ fontSize: 11 }} unit={`°${unit}`} />
          <YAxis yAxisId="rain" orientation="right" tick={{ fontSize: 11 }} unit="mm" />
          <Tooltip />
          <Legend />
          <Bar yAxisId="temp" dataKey="High" fill="var(--accent)" name={`High (°${unit})`} />
          <Bar yAxisId="temp" dataKey="Low" fill="#93c5fd" name={`Low (°${unit})`} />
          <Bar yAxisId="rain" dataKey="Rain" fill="#6ee7b7" name="Precip (mm)" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};
