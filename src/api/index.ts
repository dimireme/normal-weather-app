import axios from 'axios';
import {
  ExcludeFields,
  GetForecastRequest,
  GetForecastResponse,
  GetGeocodingResponse,
  Units,
} from './types';

const WEATHER_API_URL = 'https://api.openweathermap.org/data/2.5';
const WEATHER_API_KEY = '6acd11387ff28a4188f6dd544127f787';
const YANDEX_API_URL = 'https://geocode-maps.yandex.ru/1.x';
const YANDEX_API_KEY = '2bd13122-dad8-405b-bcd7-4fae8ce6a0ea';

export const api = {
  getForecast({ location }: GetForecastRequest) {
    const { latitude, longitude } = location;
    const units = Units.Metric;
    const exclude = [ExcludeFields.Minutely, ExcludeFields.Alerts].join(',');
    return axios
      .get<GetForecastResponse>(
        `${WEATHER_API_URL}/onecall?lat=${latitude}&lon=${longitude}&exclude=${exclude}&units=${units}&appid=${WEATHER_API_KEY}`
      )
      .then((response) => response.data);
  },

  getGeocode: (query: string) =>
    axios
      .get<GetGeocodingResponse>(
        `${YANDEX_API_URL}?geocode=${query}&apikey=${YANDEX_API_KEY}&format=json&results=1&kind=locality&lang=en_US`
      )
      .then((response) => response.data),
};
