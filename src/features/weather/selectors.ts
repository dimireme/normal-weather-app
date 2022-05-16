import { createSelector } from 'reselect';
import { isToday, isTomorrow } from 'date-fns';
import { AppState } from 'store';
import { humanizeWeather } from 'helpers';

const getStore = (store: AppState) => store.weather;

const getTimezone = createSelector(getStore, ({ timezone }) => timezone);
const getOneDayForecast = createSelector(
  getStore,
  ({ oneDayForecast }) => oneDayForecast
);

export const getCurrentWeather = createSelector(
  getTimezone,
  getOneDayForecast,
  (timezone, forecast) => {
    if (!timezone || !forecast) return null;
    return humanizeWeather(forecast.current, timezone);
  }
);

export const getTodayForecast = createSelector(
  getTimezone,
  getOneDayForecast,
  (timezone, forecast) => {
    if (!timezone || !forecast) return [];
    const candidates = forecast.hourly
      .filter(({ dt }) => isToday(dt * 1000))
      .map((weather) => humanizeWeather(weather, timezone));

    return candidates.length >= 8
      ? candidates.filter((_, i) => i % 3 === 0)
      : candidates;
  }
);

export const getTomorrowForecast = createSelector(
  getTimezone,
  getOneDayForecast,
  (timezone, forecast) => {
    if (!timezone || !forecast) return [];
    const candidates = forecast.hourly
      .filter(({ dt }) => isTomorrow(dt * 1000))
      .map((weather) => humanizeWeather(weather, timezone));

    return candidates.length >= 8
      ? candidates.filter((_, i) => i % 3 === 0)
      : candidates;
  }
);
