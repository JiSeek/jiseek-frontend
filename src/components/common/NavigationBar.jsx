import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import CustomLink from './CustomLink';
import logo from '../../assets/images/logo/logo_ver2.png';
import UtilBar from './UtilBarContainer';

const menu = (lang) => {
  if (lang === 'ko') {
    return [
      ['메인 페이지', '/'],
      ['영양 정보 확인', '/food'],
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
    ['영양 정보 확인', '/food'],
    ['커뮤니티', '/board'],
  ];
};

const NavigationBar = ({ lang }) => (
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

// const NavbarTop = styled.div`
//   background: #998883;
//   width: 100vw;
//   height: 8px;
// `;

const NavbarBackground = styled.div`
  width: 100vw;
  /* background: #faf6f2; */
  background: #fbfbfbe4;
  box-shadow: 0px 2px 8px #c7b3ad;
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
  height: 6vh;
  margin-top: 0.5vh;
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
  color: #231815;
  font-size: 1.12rem;
  font-weight: 800;
  display: flex;
  justify-content: center;
  transition: 0.2s ease-in-out;

  :hover {
    color: #6B5B56;
  }
`;
