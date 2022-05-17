import { SavedCity } from './location/types';

const SAVED_CITIES_KEY = 'citiesV2';

export const localStorageService = {
  getSavedCities: function (): SavedCity[] {
    return JSON.parse(localStorage.getItem(SAVED_CITIES_KEY) ?? '[]');
  },

  saveCities: function (cities: SavedCity[]) {
    localStorage.setItem(SAVED_CITIES_KEY, JSON.stringify(cities));
  },

  addCity: function (city: SavedCity) {
    const saved = this.getSavedCities();
    this.saveCities(saved.concat(city));
  },

  removeCity: function (id: string) {
    const saved = this.getSavedCities();
    this.saveCities(saved.filter((city) => city.id !== id));
  },
};
