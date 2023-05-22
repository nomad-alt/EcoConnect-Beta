import React from 'react';
import { Navigate } from 'react-router-dom';

const AuthRoutes = ({ isAuthenticated, element: Element, ...props }) => {
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return <Element {...props} />;
};

export default AuthRoutes;
