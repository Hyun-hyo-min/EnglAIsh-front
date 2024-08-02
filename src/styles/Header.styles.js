import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from'react-router-dom';

export const HeaderContainer = styled.header`
 background-color: #ffffff;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  padding: 1rem 0;
`;

export const HeaderContent = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
`;

export const Logo = styled(Link)`
  display: flex;
  align-items: center;
  text-decoration: none;
  color: #333;
  font-size: 1.5rem;
  font-weight: bold;
`;

export const LogoIcon = styled(FontAwesomeIcon)`
  margin-right: 0.5rem;
  color: #3498db;
`;

export const NavButtons = styled.div`
  display: flex;
  gap: 1rem;
`;

export const Button = styled.button`
  background-color: ${props => props.primary ? '#3498db' : 'transparent'};
  color: ${props => props.primary ? '#ffffff' : '#333'};
  border: ${props => props.primary ? 'none' : '1px solid #3498db'};
  padding: 0.5rem 1rem;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background-color: ${props => props.primary ? '#2980b9' : '#e8f4fd'};
  }
`;