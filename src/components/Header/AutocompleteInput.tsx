import { useEffect } from 'react';
import { withYMaps, WithYMapsProps } from 'react-yandex-maps';
import { geocodingService } from 'features/geocoderService';
import { useSearchParams } from 'react-router-dom';

const MyInputCore = withYMaps(
  ({ ymaps }: WithYMapsProps) => {
    let [searchParams, setSearchParams] = useSearchParams();

    useEffect(() => {
      const suggestView = new ymaps.SuggestView('suggest');
      suggestView.events.add('select', (e: any) => {
        const { value } = e.get('item');
        geocodingService.getCoordinatesByCity(value).then((city) => {
          if (!city) return;
          searchParams.set('lat', city.latitude.toString());
          searchParams.set('lon', city.longitude.toString());
          setSearchParams(searchParams);
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
  ['SuggestView']
);

// Костыль из-за кривой типизации хока withYMaps
// @ts-ignore
export const AutocompleteInput = () => <MyInputCore />;
