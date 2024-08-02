import React from 'react';
import { GoogleOAuthProvider } from '@react-oauth/google';
import GoogleAuth from './GoogleAuth';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: #f0f2f5;
`;

const Title = styled.h1`
  font-size: 24px;
  color: #1a1a1a;
  margin-bottom: 20px;
`;

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