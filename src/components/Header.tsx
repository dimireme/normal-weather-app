import { useCallback } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { routes } from 'routes';
import styles from './Header.module.css';
import { AutocompleteInput } from './AutocompleteInput';

export const Header = () => {
  const location = useLocation();

  const activeClassName = useCallback(
    ({ isActive }: { isActive: boolean }) =>
      isActive ? styles.active : undefined,
    []
  );

  return (
    <header className={styles.header}>
      <nav className={styles.nav}>
        <NavLink to={routes.home} className={activeClassName}>
          Home
        </NavLink>
        <NavLink
          to={routes.today + location.search}
          className={activeClassName}
        >
          Today
        </NavLink>
        <NavLink
          to={routes.tomorrow + location.search}
          className={activeClassName}
        >
          Tomorrow
        </NavLink>
        <NavLink to={routes.week + location.search} className={activeClassName}>
          Week
        </NavLink>
      </nav>
      <AutocompleteInput />
    </header>
  );
};
