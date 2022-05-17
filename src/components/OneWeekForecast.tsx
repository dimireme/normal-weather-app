import { useSelector } from 'react-redux';
import { getWeekForecast } from 'features/weather/selectors';
import styles from './OneWeekForecast.module.css';

export const OneWeekForecast = () => {
  const forecast = useSelector(getWeekForecast);
  return forecast ? (
    <div className="page">
      <h2>Week</h2>
      <h3 className={styles.date}>
        {forecast[0].time} - {forecast[forecast.length - 1].time}
      </h3>

      <div className={styles.dateCards}>
        {forecast.map(({ time, temp, wind }) => (
          <div key={time} className={styles.dateCard}>
            <div className={styles.timeRow}>
              <span>{time}</span>
              <span>{temp}</span>
            </div>
            <span className={styles.windRow}>{wind}</span>
          </div>
        ))}
      </div>
    </div>
  ) : null;
};
