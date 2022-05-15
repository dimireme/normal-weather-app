import { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';

import {
  useValidateSearchParams,
  useGetCurrentLocation,
  useGetLocation,
} from 'helpers';
import { WetherPreview } from 'components/WetherPreview';
import { Home } from 'components/Home';
import { Header } from 'components/Header';
import { Today } from 'components/Today';
import { Tomorrow } from 'components/Tomorrow';
import { Week } from 'components/Week';
import { routes } from 'routes';
import { useAppDispatch } from 'store';
import { fetchTodayWeatherForecast } from 'features/weather/thunks';

function App() {
  useValidateSearchParams();
  useGetCurrentLocation();
  const location = useGetLocation();
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!location) return;
    dispatch(fetchTodayWeatherForecast({ location }));
  }, [location]);

  return (
    <div>
      <Header />
      <WetherPreview />
      <Routes>
        <Route path={routes.home} element={<Home />} />

        <Route path={routes.today} element={<Today />} />

        <Route path={routes.tomorrow} element={<Tomorrow />} />

        <Route path={routes.week} element={<Week />} />
      </Routes>
    </div>
  );
}

export default App;
