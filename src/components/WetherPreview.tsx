import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { api } from 'api';
import { useAppDispatch } from 'store';
import { getCurrentWeather } from 'features/weather/selectors';
import { saveCity } from 'features/location/slice';
import { useGetLocation } from 'helpers';
import { ReactComponent as AddIcon } from './icons/AddIcon.svg';
import styles from './WetherPreview.module.css';

export const WetherPreview = () => {
  const dispatch = useAppDispatch();
  const location = useGetLocation();
  const weather = useSelector(getCurrentWeather);
  const [city, setCity] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    if (!location) return;
    api
      .getCityByLocation(location)
      .then(({ response }) => {
        const city = response.GeoObjectCollection.featureMember[0].GeoObject;
        setCity(city.name);
        setDescription(city.description);
      })
      .catch(() => {
        setCity('');
        setDescription('');
      });
  }, [location]);

  return (
    <div className={styles.container}>
      {location && city && description && (
        <button
          className={styles.addButton}
          onClick={() => dispatch(saveCity({ city, description, ...location }))}
        >
          <AddIcon />
        </button>
      )}
      <span className={styles.temperature}>{weather?.temp}</span>
      <span className={styles.city}>
        {city}, {description}
      </span>
      <span className={styles.conditions}>{weather?.wind}</span>
    </div>
  );
};
