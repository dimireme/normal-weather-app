import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useAppDispatch } from 'store';
import { getCurrentWeather } from 'features/weather/selectors';
import { saveCity } from 'features/location/slice';
import { City } from 'features/location/types';
import { useGetLocation } from 'helpers';
import { ReactComponent as AddIcon } from './icons/AddIcon.svg';
import styles from './WetherPreview.module.css';
import { geocodingService } from 'features/geocoderService';

export const WetherPreview = () => {
  const dispatch = useAppDispatch();
  const location = useGetLocation();
  const weather = useSelector(getCurrentWeather);
  const [city, setCity] = useState<City | null>(null);

  useEffect(() => {
    if (!location) return;
    geocodingService
      .getCityByCoorinates(location)
      .then((city) => setCity(city));
  }, [location]);

  return (
    <div className={styles.container}>
      {location && city && (
        <button
          className={styles.addButton}
          onClick={() => dispatch(saveCity(city))}
        >
          <AddIcon />
        </button>
      )}
      <span className={styles.temperature}>{weather?.temp}</span>
      <span className={styles.city}>
        {city?.name}, {city?.description}
      </span>
      <span className={styles.conditions}>{weather?.wind}</span>
    </div>
  );
};
