import React, { createContext, useReducer, useEffect } from 'react';

export const AuthContext = createContext();

const initialState = {
  user: null,
  isAuthenticated: false,
};

const authReducer = (state, action) => {
  console.log("Reducer called with state: ", state, "and action: ", action);
  switch (action.type) {
    case 'LOGIN':
      return {
        ...state,
        isAuthenticated: true,
        user: {
          id: action.payload._id,
          email: action.payload.email,
          token: action.payload.token,
        },
      };
    case 'LOGOUT':
      return {
        ...state,
        user: null,
        isAuthenticated: false,
      };
    default:
      return state;
  }
};

export const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  useEffect(() => {
    const rawUser = localStorage.getItem('user');

    try {
      const user = JSON.parse(rawUser);

      if (user) {
        console.log("Parsed user from localStorage: ", user);
        dispatch({ type: 'LOGIN', payload: user });
      }
    } catch (error) {
      console.error("Error parsing user from localStorage: ", error);
    }
  }, []);

  const login = (user) => {
    console.log("Login function called with user: ", user);
    localStorage.setItem('user', JSON.stringify(user));
    dispatch({ type: 'LOGIN', payload: user });
  };

  const logout = () => {
    localStorage.removeItem('user');
    dispatch({ type: 'LOGOUT' });
  };

  console.log("AuthContext state: ", state);

  return (
    <AuthContext.Provider value={{ ...state, dispatch, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

