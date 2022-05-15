import { createSlice } from '@reduxjs/toolkit';
import { GetForecastResponse } from 'api/types';
import { fetchTodayWeatherForecast } from './thunks';

interface Store {
  todayForecast?: GetForecastResponse;
  timezone?: string;
}

const initialState: Store = {};

const Slice = createSlice({
  name: 'weather-store',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchTodayWeatherForecast.fulfilled, (state, action) => {
      state.todayForecast = action.payload;
      state.timezone = action.payload.timezone;
    });
  },
});

export default Slice.reducer;
