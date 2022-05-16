import { createAsyncThunk } from '@reduxjs/toolkit';
import { api } from 'api';
import { GetForecastRequest } from 'api/types';

export const fetchOneDayForecast = createAsyncThunk(
  'store/fetchOneDayForecast',
  (props: GetForecastRequest) => api.getOneDayForecast(props)
);
