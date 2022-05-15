export interface LocationPoint {
  latitude: number;
  longitude: number;
}

export interface SavedCity extends LocationPoint {
  id: string;
  city?: string;
  description?: string;
}
