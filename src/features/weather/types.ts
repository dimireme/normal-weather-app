export interface Alert {
  sender_name: string;
  event: string;
  start: number;
  end: number;
  description: string;
  tags: string[];
}

export interface SunPoint {
  sunrise?: number;
  sunset?: number;
}

export interface WeatherPoint extends Fallouts {
  dt: number;
  temp: number; // deponds on units
  feels_like: number;
  pressure: number;
  humidity: number; // %
  dew_point: number;
  clouds: number; // %
  uvi: number;
  visibility: number; // metres, maximum 10km
  wind_speed: number; // deponds on units
  wind_gust?: number; // deponds on units
  wind_deg: number; // Wind direction, degrees (meteorological)
  weather: WeatherConditions[];
}

export interface WeatherConditions {
  id: number;
  main: string[]; //  Group of weather parameters (Rain, Snow, Extreme etc.)
  description: string;
  icon: string; // http://openweathermap.org/img/wn/10d@2x.png
}

interface Fallouts {
  rain?: {
    '1h': number; // Precipitation volume, mm
  };
  snow?: {
    '1h': number; // Snow volume, mm
  };
}

export interface IHumanizedWeather {
  time: string;
  temp: string;
  wind: string;
}
