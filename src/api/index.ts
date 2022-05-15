import axios from 'axios';
import {
  ExcludeFields,
  GetForecastRequest,
  GetForecastResponse,
  Units,
} from './types';

axios.defaults.baseURL = 'https://api.openweathermap.org/data/2.5';

const APP_ID = '6acd11387ff28a4188f6dd544127f787';

export const api = {
  getWeatherForecast({ location }: GetForecastRequest) {
    const { latitude, longitude } = location;
    const units = Units.Metric;
    const exclude = [ExcludeFields.Minutely, ExcludeFields.Daily].join(',');
    return axios
      .get<GetForecastResponse>(
        `/onecall?lat=${latitude}&lon=${longitude}&exclude=${exclude}&units=${units}&appid=${APP_ID}`
      )
      .then((response) => response.data);
  },
};
