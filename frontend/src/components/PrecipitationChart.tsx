import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from 'recharts';
import type { HistoricalDay } from '../types/weather';

interface Props {
  data: HistoricalDay[];
}

export const PrecipitationChart: React.FC<Props> = ({ data }) => {
  const chartData = data.map((d) => ({
    date: d.date.slice(5),
    Rain: d.precipitation,
  }));

  return (
    <div className="card chart-card">
      <h3 className="chart-title">Daily Precipitation (mm)</h3>
      <ResponsiveContainer width="100%" height={220}>
        <BarChart data={chartData} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
          <XAxis
            dataKey="date"
            tick={{ fontSize: 10 }}
            interval={Math.floor(data.length / 8)}
          />
          <YAxis tick={{ fontSize: 11 }} unit="mm" />
          <Tooltip />
          <Bar dataKey="Rain" fill="#6ee7b7" name="Precipitation (mm)" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};
