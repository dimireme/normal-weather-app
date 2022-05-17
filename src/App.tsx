import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Routes, Route } from 'react-router-dom';

import {
  useValidateSearchParams,
  useRequestLocationApi,
  useGetLocation,
  todayDate,
  tomorrowDate,
} from 'helpers';
import { WetherPreview } from 'components/WetherPreview';
import { Home } from 'components/Home';
import { Header } from 'components/Header';
import { OneDayForecast } from 'components/OneDayForecast';
import { OneWeekForecast } from 'components/OneWeekForecast';
import { NotFound } from 'components/NotFound';
import { routes } from 'routes';
import { useAppDispatch } from 'store';
import { fetchForecast } from 'features/weather/thunks';
import {
  getTodayForecast,
  getTomorrowForecast,
} from 'features/weather/selectors';

function App() {
  useValidateSearchParams();
  useRequestLocationApi();
  const location = useGetLocation();
  const dispatch = useAppDispatch();
  const todayForecast = useSelector(getTodayForecast);
  const tomorrowForecast = useSelector(getTomorrowForecast);

  useEffect(() => {
    if (!location) return;
    dispatch(fetchForecast({ location }));
  }, [location, dispatch]);

  return (
    <div>
      <Header />
      <WetherPreview />
      <Routes>
        <Route path="*" element={<NotFound />} />

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

        <Route path={routes.week} element={<OneWeekForecast />} />
      </Routes>
    </div>
  );
}

export default App;
