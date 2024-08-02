import React from 'react';
import styled from 'styled-components';

const Button = styled.button`
  background-color: #4285F4;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  font-size: 16px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background-color 0.3s;

  &:hover {
    background-color: #357AE8;
  }
`;

const GoogleAuth = () => {
    const handleGoogleLogin = async () => {
        try {
            window.location.href = `${process.env.REACT_APP_API_URL}/auth/to-google`;
        } catch (error) {
            console.error('Error during Google authentication:', error);
        }
    };

    return (
        <Button onClick={handleGoogleLogin}>
            Sign in with Google
        </Button>
    );
};

export default GoogleAuth;