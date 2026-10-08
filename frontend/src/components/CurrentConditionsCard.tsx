import React from 'react';
import type { CurrentWeather } from '../types/weather';
import { formatTemp, convertWind } from '../utils/units';

interface Props {
  data: CurrentWeather;
  unit: 'C' | 'F';
}

export const CurrentConditionsCard: React.FC<Props> = ({ data, unit }) => {
  return (
    <div className="card conditions-card">
      <h2 className="card-city">{data.city}</h2>
      <p className="card-description">{data.description}</p>
      <div className="conditions-grid">
        <div className="condition-item">
          <span className="condition-label">Temperature</span>
          <span className="condition-value temp-value">
            {formatTemp(data.temperature, unit)}
          </span>
        </div>
        <div className="condition-item">
          <span className="condition-label">Humidity</span>
          <span className="condition-value">
            {data.humidity !== null ? `${data.humidity}%` : '—'}
          </span>
        </div>
        <div className="condition-item">
          <span className="condition-label">Wind Speed</span>
          <span className="condition-value">{convertWind(data.windspeed, unit)}</span>
        </div>
        <div className="condition-item">
          <span className="condition-label">Weather Code</span>
          <span className="condition-value">{data.weathercode}</span>
        </div>
      </div>
    </div>
  );
};
