import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

export const useAuthContext = () => {
  const { user, dispatch } = useContext(AuthContext);
  return { user, dispatch };
};

export default useAuthContext;

