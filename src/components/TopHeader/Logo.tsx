/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-empty-pattern */
import * as React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import AppLogo from '../../assets/pizza-app-logo.svg';

const LogoLink = styled(Link)`
  text-decoration: none;
`;

const LogoImage = styled.img`
  height: 60px;
  width: 60px;

  @media (min-width: 1024px) {
    padding: 10px;
    height: 70px;
    width: 70px;
  }
`;

const Logo: React.FC = () => {
  return (
    <LogoLink to="/">
      <LogoImage src={AppLogo} alt="" />
    </LogoLink>
  );
};

export { Logo };
