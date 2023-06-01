import React from 'react';
import { Navigate } from 'react-router-dom';
import useAuthContext from '../hooks/useAuthContext'; 

const AuthRoutes = ({ element: Element, ...props }) => {
  const { user } = useAuthContext();

  console.log('AuthRoutes: user =', user);

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  console.log('AuthRoutes: userId =', user.id);

  return <Element userId={user.id} {...props} />;
};

export default AuthRoutes;
