// В апи не описано, но для полярных координат может не быть захода или заката, поэтому optional
export interface SunPoint {
  sunrise?: number;
  sunset?: number;
}

export interface MoonPoint {
  moonrise: number;
  moonset: number;
  moon_phase: number;
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

export interface DailyWeatherPoint
  extends Omit<WeatherPoint, 'temp' | 'feels_like'> {
  temp: {
    day: number;
    min: number;
    max: number;
    night: number;
    eve: number;
    morn: number;
  };
  feels_like: {
    day: number;
    night: number;
    eve: number;
    morn: number;
  };
  pop: number;
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
