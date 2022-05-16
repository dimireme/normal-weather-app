import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { withYMaps, WithYMapsProps } from 'react-yandex-maps';

const MyInputCore = withYMaps(
  ({ ymaps }: WithYMapsProps) => {
    let [searchParams, setSearchParams] = useSearchParams();

    useEffect(() => {
      const suggestView = new ymaps.SuggestView('suggest');
      suggestView.events.add('select', (e: any) => {
        const { value } = e.get('item');
        ymaps
          .geocode(value)
          .then(({ geoObjects }: any) => {
            const location = geoObjects.get(0).geometry.getCoordinates();
            if (location?.length !== 2) throw new Error();
            searchParams.set('lat', location[0]);
            searchParams.set('lon', location[1]);
            setSearchParams(searchParams);
          })
          .catch(() => {
            toast.error("Can't get location of selected city.");
          });
      });

      return () => {
        suggestView.events.remove('select');
        suggestView.destroy();
      };
    }, [ymaps, searchParams, setSearchParams]);

    return (
      <input
        style={{ width: '300px' }}
        id="suggest"
        placeholder="Find city..."
        type="text"
      />
    );
  },
  true,
  ['SuggestView', 'geocode']
);

// Костыль из-за кривой типизации хока withYMaps
// @ts-ignore
export const AutocompleteInput = () => <MyInputCore />;
