import React from 'react';
import { GoogleOAuthProvider } from '@react-oauth/google';
import GoogleAuth from './GoogleAuth';
import { Container, Title } from '../styles/Login.styles';

const Login = ({ onLoginSuccess }) => {
  return (
    <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}>
      <Container>
        <Title>Login to EnglAIsh</Title>
        <GoogleAuth onLoginSuccess={onLoginSuccess} />
      </Container>
    </GoogleOAuthProvider>
  );
};

export default Login;