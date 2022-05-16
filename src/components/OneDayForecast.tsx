import { useSelector } from 'react-redux';
import { Map, Placemark } from 'react-yandex-maps';
import { getCurrentWeather } from 'features/weather/selectors';
import { IHumanizedWeather } from 'features/weather/types';
import { useGetLocation } from 'helpers';
import styles from './OneDayForecast.module.css';
interface Props {
  title: string;
  forecast: IHumanizedWeather[];
  date: string;
}

export const OneDayForecast = ({ title, forecast, date }: Props) => {
  const location = useGetLocation();
  const weather = useSelector(getCurrentWeather);

  return (
    <div className={styles.container}>
      <div>
        <h2>{title}</h2>
        <h3 className={styles.date}>{date}</h3>

        <div className={styles.headers}>
          <span className={styles.timeColumn}>Time</span>
          <span>Weather</span>
        </div>
        {forecast.map(({ time, temp, wind }) => (
          <div key={time} className={styles.row}>
            <span className={styles.timeColumn}>{time}</span>
            <span>
              {temp}, {wind}
            </span>
          </div>
        ))}
      </div>
      <div>
        {location && weather && (
          <Map
            width={600}
            height={400}
            defaultState={{
              center: [location.latitude, location.longitude],
              zoom: 9,
            }}
          >
            <Placemark
              geometry={[location.latitude, location.longitude]}
              defaultProperties={{
                balloonContentHeader: weather?.temp,
                balloonContentBody: weather?.wind,
                // balloonContent: 'Это балун',
              }}
              modules={['geoObject.addon.balloon']}
            />
          </Map>
        )}
      </div>
    </div>
  );
};
