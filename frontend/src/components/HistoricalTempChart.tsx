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
import type { HistoricalDay } from '../types/weather';
import { convertTemp } from '../utils/units';

interface Props {
  data: HistoricalDay[];
  unit: 'C' | 'F';
}

export const HistoricalTempChart: React.FC<Props> = ({ data, unit }) => {
  const converted = data.map((d) => ({
    date: d.date.slice(5),
    Max: convertTemp(d.temp_max, unit),
    Min: convertTemp(d.temp_min, unit),
  }));

  return (
    <div className="card chart-card">
      <h3 className="chart-title">Daily Temperature Range</h3>
      <ResponsiveContainer width="100%" height={260}>
        <LineChart data={converted} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
          <XAxis
            dataKey="date"
            tick={{ fontSize: 10 }}
            interval={Math.floor(data.length / 8)}
          />
          <YAxis tick={{ fontSize: 11 }} unit={`°${unit}`} />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="Max" stroke="var(--accent)" dot={false} name={`Max (°${unit})`} />
          <Line type="monotone" dataKey="Min" stroke="#93c5fd" dot={false} name={`Min (°${unit})`} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};
