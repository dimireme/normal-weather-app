import { useDispatch } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import weatherReducer from 'features/weather/slice';
import locationReducer from 'features/location/slice';

export const store = configureStore({
  reducer: {
    weather: weatherReducer,
    location: locationReducer,
  },
});

export type AppState = ReturnType<typeof store.getState>;
type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => {
  const dispatch = useDispatch<AppDispatch>();
  return dispatch;
};
