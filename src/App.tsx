import { useCallback, useEffect } from 'react';
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
import { fetchCityByLocation } from 'features/location/thunks';
import { saveCity } from 'features/location/slice';

function App() {
  useValidateSearchParams();
  useGetCurrentLocation();
  const location = useGetLocation();
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!location) return;
    dispatch(fetchTodayWeatherForecast({ location }));
    dispatch(fetchCityByLocation({ location }));
  }, [location, dispatch]);

  const handleSaveCity = useCallback(
    (city?: string, description?: string) => {
      if (!location) return;
      dispatch(saveCity({ city, description, ...location }));
    },
    [location, dispatch]
  );

  return (
    <div>
      <Header />
      <WetherPreview onSave={handleSaveCity} />
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
