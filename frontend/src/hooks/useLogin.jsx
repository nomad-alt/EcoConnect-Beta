import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthContext } from './useAuthContext';

export const useLogin = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);
  const { dispatch } = useAuthContext();
  const navigate = useNavigate();

  const login = async (email, password) => {
    console.log("Attempting to log in with email: ", email);

    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/users/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });

      const json = await response.json();

      console.log("Received response from API: ", json);

      if (!response.ok) {
        setIsLoading(false);
        setError(json.error);
        console.error("API responded with an error: ", json.error);
      } else {
        // save the user to local storage
        localStorage.setItem('user', JSON.stringify(json));

        console.log("Successfully saved user to localStorage: ", json);

        // update the auth context
        dispatch({ type: 'LOGIN', payload: json });

        console.log("Dispatched LOGIN action with payload: ", json);

        // navigate to the dashboard page
        navigate('/dashboard');

        // update loading state
        setIsLoading(false);
      }
    } catch (error) {
      setIsLoading(false);
      setError('An error occurred during login.');
      console.error('An error occurred during login:', error);
    }
  };

  return { login, isLoading, error };
};
