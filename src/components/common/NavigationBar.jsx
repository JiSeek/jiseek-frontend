import React from 'react';
import PropTypes, { string, number, element, func } from 'prop-types';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import CustomLink from './CustomLink';
import logo from '../../assets/images/logo/logo_ver3_2.png';

const NavigationBar = ({ children }) => {
  const { t } = useTranslation();

  return (
    <NavbarBackground>
      <Navbar>
        <Link to="/">
          <Logo src={logo} alt="logo" />
        </Link>
        <div />
        <StyledUl>
          {[
            [t('navMain'), '/'],
            [t('navFood'), '/food'],
            [t('navBoard'), '/board'],
          ].map(([tab, url]) => (
            <StyledLi key={tab}>
              <StyledCustomLink to={url}>{tab}</StyledCustomLink>
            </StyledLi>
          ))}
        </StyledUl>
        <div />
        {children}
      </Navbar>
    </NavbarBackground>
  );
};

NavigationBar.propTypes = {
  children: PropTypes.oneOfType([string, number, element, func]),
};

NavigationBar.defaultProps = {
  children: null,
};

const NavbarBackground = styled.div`
  width: 100vw;
  background: #fbfbfbe4;
  box-shadow: 0px -8px 26px 5px rgb(0 0 0 / 20%);
  position: relative;
  z-index: 3;
`;

const Navbar = styled.nav`
  height: 8vh;
  min-height: 70px;
  max-height: 100px;
  max-width: 1320px;
  margin: auto;
  padding: 0 3vw;
  display: grid;
  grid-template-columns: 280px 1fr 6fr 1fr 300px;
  align-items: center;
`;

const Logo = styled.img`
  height: 4.5vh;
  min-height: 40px;
`;

const StyledUl = styled.ul`
  list-style: none;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  width: 100%;
  height: 100%;
  letter-spacing: 0.05rem;
  position: relative;
  padding-top:0.65rem;
`;

const StyledLi = styled.li`
  position: relative;
  display: flex;
  align-items: center;
  height: 100%;
`;

const StyledCustomLink = styled(CustomLink)`
  text-decoration: none;
  width: 100%;
  font-size: 1.12rem;
  font-weight: 800;
  display: flex;
  justify-content: center;
  transition: 0.2s ease-in-out;

  :hover {
    color: #355f42;
  }
`;

export default NavigationBar;
