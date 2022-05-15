import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { LocationPoint } from './types';

interface Store {
  currentLocation: LocationPoint | null;
}

const initialState: Store = {
  currentLocation: null,
};

const Slice = createSlice({
  name: 'location-store',
  initialState,
  reducers: {
    setLocation: (state, action: PayloadAction<LocationPoint>) => {
      state.currentLocation = action.payload;
    },
  },
});

export const { setLocation } = Slice.actions;
export default Slice.reducer;
