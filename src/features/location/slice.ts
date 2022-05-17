import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid';
import { toast } from 'react-toastify';
import { localStorageService } from 'features/localStorageService';
import { City, LocationPoint, SavedCity } from './types';

interface Store {
  currentLocation?: LocationPoint;
  savedCities: SavedCity[];
}

const initialState: Store = {
  savedCities: localStorageService.getSavedCities(),
};

const Slice = createSlice({
  name: 'location-store',
  initialState,
  reducers: {
    setLocation: (state, action: PayloadAction<LocationPoint>) => {
      state.currentLocation = action.payload;
    },
    saveCity: (state, action: PayloadAction<City>) => {
      if (state.savedCities.find(({ name }) => name === action.payload.name)) {
        toast.error(`City ${action.payload.name} already in favorites`);
      } else {
        const newItem = { id: uuidv4(), ...action.payload };
        state.savedCities.push(newItem);
        localStorageService.addCity(newItem);
        toast.success(`City ${action.payload.name} added to favorites`);
      }
    },
    removeCity: (state, action: PayloadAction<string>) => {
      state.savedCities = state.savedCities.filter(
        (city) => city.id !== action.payload
      );
      localStorageService.removeCity(action.payload);
      toast.success('City removed from favorites');
    },
  },
});

export const { setLocation, saveCity, removeCity } = Slice.actions;
export default Slice.reducer;
