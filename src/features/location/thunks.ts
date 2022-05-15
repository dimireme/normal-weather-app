import { createAsyncThunk } from '@reduxjs/toolkit';
import { api } from 'api';
import { GetCityByLocationRequest } from 'api/types';

export const fetchCityByLocation = createAsyncThunk(
  'store/fetchCityByLocation',
  (props: GetCityByLocationRequest) => api.getCityByLocation(props)
);
