import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid';
import { toast } from 'react-toastify';
import { localStorageService } from 'features/localStorageService';
import { LocationPoint, SavedCity } from './types';

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
    saveCity: (state, action: PayloadAction<Omit<SavedCity, 'id'>>) => {
      const { city } = action.payload;
      if (state.savedCities.find((c) => c.city === city)) {
        toast.error('City already in favorites');
      } else {
        const newItem = { id: uuidv4(), ...action.payload };
        state.savedCities.push(newItem);
        localStorageService.addCity(newItem);
        toast.success('City added to favorites');
      }
    },
    removeCity: (state, action: PayloadAction<string>) => {
      const id = action.payload;
      state.savedCities = state.savedCities.filter((c) => c.id !== id);
      localStorageService.removeCity(id);
      toast.success('City removed from favorites');
    },
  },
});

export const { setLocation, saveCity, removeCity } = Slice.actions;
export default Slice.reducer;
