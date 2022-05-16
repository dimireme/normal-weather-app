import { createSelector } from 'reselect';
import { AppState } from 'store';

const getStore = (store: AppState) => store.location;

export const getCurrentLocation = createSelector(
  getStore,
  (store) => store.currentLocation
);

export const getSavedCities = createSelector(
  getStore,
  (store) => store.savedCities
);
