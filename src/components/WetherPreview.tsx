import { useSelector } from 'react-redux';
import { getCurrentWeather } from 'features/weather/selectors';
import { getCity } from 'features/location/selectors';
import styles from './WetherPreview.module.css';

interface Props {
  onSave: (city?: string, description?: string) => void;
}

export const WetherPreview = ({ onSave }: Props) => {
  const { temperature, conditions } = useSelector(getCurrentWeather) ?? {};
  const { city, description } = useSelector(getCity);

  return (
    <div className={styles.container}>
      <button
        className={styles.addButton}
        onClick={() => onSave(city, description)}
      >
        +
      </button>
      <span className={styles.temperature}>{temperature}</span>
      <span className={styles.city}>
        {city}, {description}
      </span>
      <span className={styles.conditions}>{conditions}</span>
    </div>
  );
};
