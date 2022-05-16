import { createSlice } from '@reduxjs/toolkit';
import { GetForecastResponse } from 'api/types';
import { fetchOneDayForecast } from './thunks';

interface Store {
  oneDayForecast?: GetForecastResponse;
  timezone?: string;
}

const initialState: Store = {};

const Slice = createSlice({
  name: 'weather-store',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchOneDayForecast.fulfilled, (state, action) => {
      state.oneDayForecast = action.payload;
      state.timezone = action.payload.timezone;
    });
  },
});

export default Slice.reducer;
