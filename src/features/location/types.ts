export interface LocationPoint {
  latitude: number;
  longitude: number;
}

export interface City extends LocationPoint {
  name: string;
  description: string;
}

export interface SavedCity extends City {
  id: string;
}
