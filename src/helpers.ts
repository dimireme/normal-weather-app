import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useAppDispatch } from 'store';
import { setLocation } from 'features/location/slice';
import { getCurrentLocation } from 'features/location/selectors';

const isValidFloat = (n: string) => /^[+-]?[0-9]+[.][0-9]+/.test(n);

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
  }, [searchParams]);
};

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
  }, []);
};

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
