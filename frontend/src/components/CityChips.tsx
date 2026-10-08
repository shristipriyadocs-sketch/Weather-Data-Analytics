import React from 'react';
import { CitySearch } from './CitySearch';
import { useWeatherStore } from '../store/weatherStore';

const CITY_COLORS = ['#3b82d4', '#ef4444', '#f59e0b', '#10b981', '#8b5cf6'];

interface Props {
  maxCities?: number;
}

export const CityChips: React.FC<Props> = ({ maxCities = 5 }) => {
  const { selectedCities, removeCity } = useWeatherStore();

  return (
    <div className="city-chips-wrapper">
      <div className="city-chips">
        {selectedCities.map((city, i) => (
          <span
            key={city}
            className="chip"
            style={{ borderColor: CITY_COLORS[i % CITY_COLORS.length] }}
          >
            {city}
            <button
              className="chip-remove"
              onClick={() => removeCity(city)}
              aria-label={`Remove ${city}`}
            >
              ×
            </button>
          </span>
        ))}
      </div>
      {selectedCities.length < maxCities && (
        <CitySearch placeholder={`Add city (${selectedCities.length}/${maxCities})…`} />
      )}
    </div>
  );
};

export { CITY_COLORS };
