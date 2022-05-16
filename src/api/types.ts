import {
  MoonPoint,
  SunPoint,
  WeatherPoint,
  DailyWeatherPoint,
} from 'features/weather/types';
import { LocationPoint } from 'features/location/types';

export enum Units {
  Standard = 'standard',
  Metric = 'metric',
  Imperial = 'imperial',
}

export enum ExcludeFields {
  Current = 'current',
  Minutely = 'minutely',
  Hourly = 'hourly',
  Daily = 'daily',
  Alerts = 'alerts',
}

export interface GetForecastRequest {
  location: LocationPoint;
}

export interface GetForecastResponse {
  lat: number;
  lon: number;
  timezone: string;
  timezone_offset: number;
  current: WeatherPoint & SunPoint;
  hourly: WeatherPoint[];
  daily: (DailyWeatherPoint & SunPoint & MoonPoint)[];
}

export interface GetCityByLocationRequest {
  location: LocationPoint;
}

export interface GetGeocodingResponse {
  response: {
    GeoObjectCollection: {
      featureMember: { GeoObject: IGeoObject }[];
    };
  };
}

interface IGeoObject {
  name: string;
  description: string;
}
