import React from 'react';
import PropTypes, { string, number, element, func } from 'prop-types';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import CustomLink from './CustomLink';
import logo from '../../assets/images/logo/logo_ver3_2.png';

const menu = (lang) => {
  if (lang === 'ko') {
    return [
      ['메인 페이지', '/'],
      ['음식 알아보기', '/food'],
      ['커뮤니티', '/board'],
    ];
  }
  if (lang === 'en') {
    return [
      ['Home', '/'],
      ['Find Food', '/food'],
      ['Community', '/board'],
    ];
  }
  return [
    ['메인 페이지', '/'],
    ['음식 알아보기', '/food'],
    ['커뮤니티', '/board'],
  ];
};

const NavigationBar = ({ lang, children }) => (
    <NavbarBackground>
      <Navbar>
        <Link to="/">
          <Logo src={logo} alt="logo" />
        </Link>
        <div />
        <StyledUl>
          {menu(lang).map(([tab, url]) => (
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

NavigationBar.propTypes = {
  lang: PropTypes.string,
  children: PropTypes.oneOfType([string, number, element, func]),
};

NavigationBar.defaultProps = {
  lang: '',
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
  max-width: 1320px;
  margin: auto;
  padding: 0 3%;
  display: grid;
  grid-template-columns: 150px 1fr 6fr 0.5fr 230px;
  align-items: center;
`;

const Logo = styled.img`
  height: 4.5vh;
`;

const StyledUl = styled.ul`
  list-style: none;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  width: 100%;
  height: 100%;
  letter-spacing: 0.05rem;
  position: relative;
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