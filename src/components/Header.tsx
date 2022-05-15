import { useCallback, KeyboardEvent, useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';

import { routes } from 'routes';
import styles from './Header.module.css';

export const Header = () => {
  const [search, setSearch] = useState('');
  const location = useLocation();

  const activeClassName = useCallback(
    ({ isActive }: { isActive: boolean }) =>
      isActive ? styles.active : undefined,
    []
  );

  const handleSearch = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key !== 'Enter') return;
    console.log('SEARCH!!!');
  };

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
      <input
        className={styles.search}
        placeholder="Find city..."
        type="text"
        list="cities"
        onKeyDown={handleSearch}
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <datalist id="cities">
        <option value="JavaScript"></option>
        <option value="Python"></option>
        <option value="Java"></option>
        <option value="HTML"></option>
      </datalist>
    </header>
  );
};
