// Pure unit conversion utilities — no side effects

export const celsiusToFahrenheit = (c: number): number =>
  Math.round((c * 9) / 5 + 32 * 10) / 10;

export const fahrenheitToCelsius = (f: number): number =>
  Math.round(((f - 32) * 5) / 9 * 10) / 10;

export const kmhToMph = (v: number): number => Math.round(v * 0.621371 * 10) / 10;

export const mphToKmh = (v: number): number => Math.round(v / 0.621371 * 10) / 10;

export const convertTemp = (value: number, unit: 'C' | 'F'): number =>
  unit === 'F' ? celsiusToFahrenheit(value) : value;

export const formatTemp = (value: number, unit: 'C' | 'F'): string =>
  `${convertTemp(value, unit)}°${unit}`;

export const convertWind = (kmh: number, unit: 'C' | 'F'): string =>
  unit === 'F' ? `${kmhToMph(kmh)} mph` : `${kmh} km/h`;
