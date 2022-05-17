import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { routes } from 'routes';

export const NotFound = () => {
  const navigate = useNavigate();

  useEffect(() => {
    navigate(routes.home, { replace: true });
  }, [navigate]);

  return null;
};
