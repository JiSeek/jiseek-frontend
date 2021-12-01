import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import CustomLink from './CustomLink';
import logo from '../../images/logo.png';
import UtilBar from './UtilBar';

const menu = (lang) => {
  if (lang === 'ko') {
    return [
      ['메인 페이지', '/'],
      ['영양정보 확인', '/food'],
      ['커뮤니티', '/board'],
    ];
  }
  if (lang === 'en') {
    return [
      ['Home', '/'],
      ['Search Nutrients', '/food'],
      ['Community', '/board'],
    ];
  }
  return [
    ['메인 페이지', '/'],
    ['영양정보 확인', '/food'],
    ['커뮤니티', '/board'],
  ];
};

const NavigationBar = ({ lang }) => (
  <NavbarBackground>
    <Navbar>
      <Link to="/">
        <Logo src={logo} alt="logo" />
      </Link>
      <StyledUl>
        {menu(lang).map(([tab, url]) => (
          <li key={tab}>
            <StyledCustomLink to={url}>{tab}</StyledCustomLink>
          </li>
        ))}
      </StyledUl>
      <UtilBar />
    </Navbar>
  </NavbarBackground>
);

NavigationBar.propTypes = {
  lang: PropTypes.string,
};

NavigationBar.defaultProps = {
  lang: '',
};

export default NavigationBar;

const NavbarBackground = styled.div`
  width: 100vw;
  background: #d7ccc0;
  box-shadow: 0px 2px 6px #af9c96;
  position: relative;
  z-index: 3;
  margin-bottom: 10px;
`;

const Navbar = styled.nav`
  height: 70px;
  max-width: 1320px;
  margin: auto;
  padding: 0 3%;
  display: flex;
  justify-content: space-between;
  position: relative;
`;

const Logo = styled.img`
  height: 80%;
  padding: 8% 0;
  width: 100px;
`;

const StyledUl = styled.ul`
  list-style: none;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  letter-spacing: 0.05rem;
`;

const StyledCustomLink = styled(CustomLink)`
  text-decoration: none;
  display: block;
  padding: 50px;
  color: #231815;
  font-size: 18px;
  font-weight: 800;
  line-height: 70px;
`;
