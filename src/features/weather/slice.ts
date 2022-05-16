import { createSlice } from '@reduxjs/toolkit';
import { GetForecastResponse } from 'api/types';
import { fetchForecast } from './thunks';

interface Store {
  forecast?: GetForecastResponse;
  timezone?: string;
}

const initialState: Store = {};

const Slice = createSlice({
  name: 'weather-store',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchForecast.fulfilled, (state, action) => {
      state.forecast = action.payload;
      state.timezone = action.payload.timezone;
    });
  },
});

export default Slice.reducer;
