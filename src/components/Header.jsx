import React from 'react';
import { Link } from 'react-router-dom';
import { faGraduationCap } from '@fortawesome/free-solid-svg-icons';
import {
  HeaderContainer,
  HeaderContent,
  Logo,
  LogoIcon,
  NavButtons,
  Button,
} from '../styles/Header.styles';


function Header({ isLoggedIn, onLogout }) {
  return (
    <HeaderContainer>
      <HeaderContent>
        <Logo to="/">
          <LogoIcon icon={faGraduationCap} />
          EnglAIsh
        </Logo>
        <NavButtons>
          {isLoggedIn ? (
            <Button onClick={onLogout}>로그아웃</Button>
          ) : (
            <>
              <Button as={Link} to="/login" primary>로그인</Button>
            </>
          )}
        </NavButtons>
      </HeaderContent>
    </HeaderContainer>
  );
}

export default Header;