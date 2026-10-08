import React from 'react';
import { useWeatherStore } from '../store/weatherStore';

export const UnitToggle: React.FC = () => {
  const unit = useWeatherStore((s) => s.unit);
  const setUnit = useWeatherStore((s) => s.setUnit);

  return (
    <div className="unit-toggle">
      <button
        className={`unit-btn ${unit === 'C' ? 'active' : ''}`}
        onClick={() => setUnit('C')}
      >
        °C
      </button>
      <button
        className={`unit-btn ${unit === 'F' ? 'active' : ''}`}
        onClick={() => setUnit('F')}
      >
        °F
      </button>
    </div>
  );
};
