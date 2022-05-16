import { createAsyncThunk } from '@reduxjs/toolkit';
import { api } from 'api';
import { GetForecastRequest } from 'api/types';

export const fetchForecast = createAsyncThunk(
  'store/fetchForecast',
  (props: GetForecastRequest) => api.getForecast(props)
);
