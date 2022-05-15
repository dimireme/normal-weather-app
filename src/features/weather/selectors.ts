import { createSelector } from 'reselect';
import { AppState } from 'store';
import { humanizeWeather } from 'helpers';

const getStore = (store: AppState) => store.weather;

export const getCurrentWeather = createSelector(getStore, (store) =>
  store.todayForecast ? humanizeWeather(store.todayForecast.current) : null
);
