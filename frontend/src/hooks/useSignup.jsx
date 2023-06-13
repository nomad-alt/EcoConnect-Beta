import { useState } from 'react';
import { useAuthContext } from './useAuthContext';
import { useNavigate } from 'react-router-dom';

const useSignup = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);
  const { dispatch } = useAuthContext();
  const navigate = useNavigate();

  const signup = async (email, password) => {
  setIsLoading(true);
  setError(null);

  const response = await fetch('/api/users/signup', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });

  if (!response.ok) {
    const json = await response.text();
    setIsLoading(false);
    setError(json && json.error ? json.error : 'Something went wrong');
    return;
  }

  const json = await response.json();
  
  // save the user to local storage
  localStorage.setItem('user', JSON.stringify(json))

  // update the auth context
  dispatch({ type: 'LOGIN', payload: { ...json, _id: json._id } })

   // navigate to the dashboard page
  navigate('/dashboard');

  // update loading state
  setIsLoading(false);
};

  return { signup, isLoading, error };
};

export default useSignup;
