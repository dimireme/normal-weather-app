import { useCallback, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';

import {
  useValidateSearchParams,
  useGetCurrentLocation,
  useGetLocation,
  todayDate,
  tomorrowDate,
} from 'helpers';
import { WetherPreview } from 'components/WetherPreview';
import { Home } from 'components/Home';
import { Header } from 'components/Header';
import { OneDayForecast } from 'components/OneDayForecast';
import { Week } from 'components/Week';
import { routes } from 'routes';
import { useAppDispatch } from 'store';
import { fetchOneDayForecast } from 'features/weather/thunks';
import { fetchCityByLocation } from 'features/location/thunks';
import { saveCity } from 'features/location/slice';
import {
  getTodayForecast,
  getTomorrowForecast,
} from 'features/weather/selectors';
import { useSelector } from 'react-redux';

function App() {
  useValidateSearchParams();
  useGetCurrentLocation();
  const location = useGetLocation();
  const dispatch = useAppDispatch();
  const todayForecast = useSelector(getTodayForecast);
  const tomorrowForecast = useSelector(getTomorrowForecast);

  useEffect(() => {
    if (!location) return;
    dispatch(fetchOneDayForecast({ location }));
    dispatch(fetchCityByLocation({ location }));
  }, [location, dispatch]);

  // TODO: Move down
  const handleSaveCity = useCallback(
    (city: string, description: string) => {
      dispatch(saveCity({ city, description, ...location! }));
    },
    [location, dispatch]
  );

  return (
    <div>
      <Header />
      <WetherPreview onSave={handleSaveCity} />
      <Routes>
        <Route path={routes.home} element={<Home />} />

        <Route
          path={routes.today}
          element={
            <OneDayForecast
              title="Today"
              date={todayDate()}
              forecast={todayForecast}
            />
          }
        />

        <Route
          path={routes.tomorrow}
          element={
            <OneDayForecast
              title="Tomorrow"
              date={tomorrowDate()}
              forecast={tomorrowForecast}
            />
          }
        />

        <Route path={routes.week} element={<Week />} />
      </Routes>
    </div>
  );
}

export default App;
