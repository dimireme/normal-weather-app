import { api } from 'api';
import { GeoObject } from 'api/types';
import { toast } from 'react-toastify';
import { City, LocationPoint } from 'features/location/types';

const geoObjectToCity = (geoObject: GeoObject): City => {
  const [longitude, latitude] = geoObject.Point.pos.split(' ').map(parseFloat);
  return {
    latitude,
    longitude,
    name: geoObject.name,
    description: geoObject.description,
  };
};

export const geocodingService = {
  getCityByCoorinates: (location: LocationPoint): Promise<City | null> =>
    api
      .getGeocode(`${location.longitude},${location.latitude}`)
      .then(({ response }) => {
        const geoObject =
          response.GeoObjectCollection.featureMember[0]?.GeoObject;

        if (!geoObject) throw new Error();
        return geoObjectToCity(geoObject);
      })
      .catch(() => {
        toast.error("Can't receive coordinates by city name.");
        return null;
      }),

  getCoordinatesByCity: (city: string): Promise<City | null> =>
    api
      .getGeocode(city)
      .then(({ response }) => {
        const geoObject =
          response.GeoObjectCollection.featureMember[0]?.GeoObject;

        if (!geoObject) throw new Error();
        return geoObjectToCity(geoObject);
      })
      .catch(() => {
        toast.error("Can't receive city name by coordinates.");
        return null;
      }),
};
