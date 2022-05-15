import { createAsyncThunk } from '@reduxjs/toolkit';
import { api } from 'api';
import { GetForecastRequest } from 'api/types';

export const fetchTodayWeatherForecast = createAsyncThunk(
  'store/fetchTodayForecastData',
  (props: GetForecastRequest) => api.getWeatherForecast(props)
);
