import { IHumanizedWeather } from 'features/weather/types';

interface Props {
  title: string;
  forecast: IHumanizedWeather[];
  date: string;
}

export const OneDayForecast = ({ title, forecast, date }: Props) => {
  return (
    <div>
      <h2>{title}</h2>
      <h3>{date}</h3>
      {forecast.map(({ time, temp, wind }) => (
        <div key={time}>
          {time} : {temp} : {wind}
        </div>
      ))}
    </div>
  );
};
