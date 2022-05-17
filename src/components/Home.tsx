import { MouseEvent } from 'react';
import { getSavedCities } from 'features/location/selectors';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { routes } from 'routes';
import { useAppDispatch } from 'store';
import { removeCity } from 'features/location/slice';
import { ReactComponent as RemoveIcon } from './icons/RemoveIcon.svg';
import styles from './Home.module.css';

export const Home = () => {
  const dispatch = useAppDispatch();
  const savedCities = useSelector(getSavedCities);
  let navigate = useNavigate();

  const handleDelete = (e: MouseEvent<HTMLButtonElement>, id: string) => {
    e.stopPropagation();
    dispatch(removeCity(id));
  };

  return (
    <div className={`page ${styles.container}`}>
      <h2 className={styles.header}>Saved cities</h2>
      {savedCities.length === 0 ? (
        <p>No saved cities.</p>
      ) : (
        <div className={styles.cityCards}>
          {savedCities.map(({ id, city, description, latitude, longitude }) => (
            <div
              className={styles.cityCard}
              key={id}
              onClick={() =>
                navigate(`${routes.today}?lat=${latitude}&lon=${longitude}`)
              }
            >
              <button
                className={styles.deleteButton}
                onClick={(e) => handleDelete(e, id)}
              >
                <RemoveIcon />
              </button>
              <span className={styles.cityTitle}>{city}</span>
              <span>{description}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
