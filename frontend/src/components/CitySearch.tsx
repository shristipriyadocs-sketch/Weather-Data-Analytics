import React, { useState, useEffect, useRef } from 'react';
import { searchCities } from '../api/weatherApi';
import { useWeatherStore } from '../store/weatherStore';
import type { CityResult } from '../types/weather';

interface Props {
  onSelect?: (city: string) => void;
  placeholder?: string;
}

export const CitySearch: React.FC<Props> = ({
  onSelect,
  placeholder = 'Search city…',
}) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<CityResult[]>([]);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const addCity = useWeatherStore((s) => s.addCity);

  useEffect(() => {
    if (query.length < 2) {
      setResults([]);
      setOpen(false);
      return;
    }
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(async () => {
      setLoading(true);
      try {
        const data = await searchCities(query);
        setResults(data);
        setOpen(true);
      } catch {
        setResults([]);
      } finally {
        setLoading(false);
      }
    }, 300);
  }, [query]);

  const handleSelect = (city: CityResult) => {
    const name = city.name;
    addCity(name);
    if (onSelect) onSelect(name);
    setQuery('');
    setOpen(false);
  };

  return (
    <div className="city-search">
      <input
        type="text"
        className="search-input"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder={placeholder}
        onBlur={() => setTimeout(() => setOpen(false), 150)}
      />
      {loading && <span className="search-loading">…</span>}
      {open && results.length > 0 && (
        <ul className="search-dropdown">
          {results.map((r) => (
            <li
              key={`${r.name}-${r.latitude}`}
              onMouseDown={() => handleSelect(r)}
              className="search-item"
            >
              {r.name}
              {r.country ? `, ${r.country}` : ''}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
