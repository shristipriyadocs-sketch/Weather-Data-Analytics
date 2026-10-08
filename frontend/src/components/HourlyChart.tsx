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
import type { HourlyPoint } from '../types/weather';
import { convertTemp } from '../utils/units';

interface Props {
  data: HourlyPoint[];
  unit: 'C' | 'F';
}

export const HourlyChart: React.FC<Props> = ({ data, unit }) => {
  const converted = data.map((d) => ({
    ...d,
    temperature: convertTemp(d.temperature, unit),
  }));

  return (
    <div className="card chart-card">
      <h3 className="chart-title">24-Hour Trend</h3>
      <ResponsiveContainer width="100%" height={260}>
        <LineChart data={converted} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
          <XAxis dataKey="time" tick={{ fontSize: 11 }} interval={3} />
          <YAxis yAxisId="temp" tick={{ fontSize: 11 }} unit={`°${unit}`} />
          <YAxis yAxisId="hum" orientation="right" tick={{ fontSize: 11 }} unit="%" />
          <Tooltip />
          <Legend />
          <Line
            yAxisId="temp"
            type="monotone"
            dataKey="temperature"
            stroke="var(--accent)"
            dot={false}
            name={`Temp (°${unit})`}
          />
          <Line
            yAxisId="hum"
            type="monotone"
            dataKey="humidity"
            stroke="#10b981"
            dot={false}
            name="Humidity (%)"
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};
