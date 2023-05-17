import React from 'react';

const PrivateRoute = ({ component: Component, isAuthenticated, message, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) =>
        isAuthenticated ? (
          <Component {...props} />
        ) : (
          <div>{message}</div>
        )
      }
    />
  );
};

export default PrivateRoute;


