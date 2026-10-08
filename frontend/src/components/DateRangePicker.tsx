import React from 'react';
import { useWeatherStore } from '../store/weatherStore';

interface Props {
  onSubmit: () => void;
}

export const DateRangePicker: React.FC<Props> = ({ onSubmit }) => {
  const { dateRange, setDateRange } = useWeatherStore();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit();
  };

  return (
    <form className="date-range-form" onSubmit={handleSubmit}>
      <div className="date-fields">
        <label className="date-label">
          Start Date
          <input
            type="date"
            className="date-input"
            value={dateRange.start}
            min="1940-01-01"
            max={dateRange.end}
            onChange={(e) => setDateRange({ ...dateRange, start: e.target.value })}
          />
        </label>
        <label className="date-label">
          End Date
          <input
            type="date"
            className="date-input"
            value={dateRange.end}
            min={dateRange.start}
            max={new Date().toISOString().split('T')[0]}
            onChange={(e) => setDateRange({ ...dateRange, end: e.target.value })}
          />
        </label>
      </div>
      <button type="submit" className="btn-primary">
        Load Historical Data
      </button>
    </form>
  );
};
