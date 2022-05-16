import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useAppDispatch } from 'store';
import { setLocation } from 'features/location/slice';
import { WeatherPoint } from 'features/weather/types';
import { getCurrentLocation } from 'features/location/selectors';

const isValidFloat = (n: string) => /^[+-]?[0-9]+[.][0-9]+/.test(n);

// Валидация локации из query паарметров.
// lat и lon - дробное число со знаком или без.
export const useValidateSearchParams = () => {
  let [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    const lat = searchParams.get('lat');
    const lon = searchParams.get('lon');

    if ((lat && !isValidFloat(lat)) || (lon && !isValidFloat(lon))) {
      searchParams.delete('lat');
      searchParams.delete('lon');
      setSearchParams(searchParams);
    }
  }, [searchParams, setSearchParams]);
};

// Запрос текущей геолокации через браузерное апи.
export const useGetCurrentLocation = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(({ coords }) => {
        dispatch(
          setLocation({
            latitude: coords.latitude,
            longitude: coords.longitude,
          })
        );
      });
    }
  }, [dispatch]);
};

// Источник правды для location.
// Сперва координаты берутся из query параметров.
// Если их нет, то текущая локация пользователя.
export const useGetLocation = () => {
  const currentLocation = useSelector(getCurrentLocation);
  let [searchParams] = useSearchParams();

  const lat = searchParams.get('lat');
  const lon = searchParams.get('lon');

  return lat && lon
    ? {
        latitude: parseFloat(lat),
        longitude: parseFloat(lon),
      }
    : currentLocation;
};

// Строковое представление температуры и ветра.
export const humanizeWeather = (weather: WeatherPoint) => ({
  time: weather.dt,
  temperature: `${((weather.temp * 10) ^ 0) / 10} \u2103`,
  conditions: `${weather.weather[0].description}, ${weather.wind_speed} meter per second`,
});
