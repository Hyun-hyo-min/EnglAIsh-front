import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const AuthCallback = ({ onLoginSuccess }) => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const token = queryParams.get('token');
    
    if (token) {
      localStorage.setItem('token', token);
      onLoginSuccess(token);
      navigate('/');
    }
  }, [location, navigate, onLoginSuccess]);

  return <div>Authenticating...</div>;
};

export default AuthCallback;
