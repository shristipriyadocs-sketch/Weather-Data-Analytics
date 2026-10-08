import { create } from 'zustand';

interface DateRange {
  start: string;
  end: string;
}

interface WeatherState {
  selectedCities: string[];
  unit: 'C' | 'F';
  dateRange: DateRange;
  addCity: (city: string) => void;
  removeCity: (city: string) => void;
  setUnit: (unit: 'C' | 'F') => void;
  setDateRange: (range: DateRange) => void;
}

const today = new Date();
const thirtyDaysAgo = new Date(today);
thirtyDaysAgo.setDate(today.getDate() - 30);

const fmt = (d: Date) => d.toISOString().split('T')[0];

export const useWeatherStore = create<WeatherState>((set) => ({
  selectedCities: [],
  unit: 'C',
  dateRange: {
    start: fmt(thirtyDaysAgo),
    end: fmt(today),
  },
  addCity: (city) =>
    set((state) => ({
      selectedCities: state.selectedCities.includes(city)
        ? state.selectedCities
        : [...state.selectedCities, city],
    })),
  removeCity: (city) =>
    set((state) => ({
      selectedCities: state.selectedCities.filter((c) => c !== city),
    })),
  setUnit: (unit) => set({ unit }),
  setDateRange: (dateRange) => set({ dateRange }),
}));
