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
  <>
    <NavbarTop />
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
  </>
);

NavigationBar.propTypes = {
  lang: PropTypes.string,
};

NavigationBar.defaultProps = {
  lang: '',
};

export default NavigationBar;

const NavbarTop = styled.div`
  background: #998883;
  width: 100vw;
  height: 8px;
`;

const NavbarBackground = styled.div`
  width: 100vw;
  background: #d7ccc0;
  box-shadow: 0px 2px 6px #af9c96;
  position: relative;
  z-index: 3;
  /* margin-bottom: 10px; */
`;

const Navbar = styled.nav`
  height: 80px;
  max-width: 1320px;
  margin: auto;
  padding: 0 3%;
  display: grid;
  grid-template-columns: 150px 1fr 6fr 0.5fr 230px;
`;

const Logo = styled.img`
  height: 60px;
  padding: 8% 0;
`;

const StyledUl = styled.ul`
  list-style: none;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  width: 100%;
  letter-spacing: 0.05rem;
  position: relative;
`;

const StyledLi = styled.li`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const StyledCustomLink = styled(CustomLink)`
  text-decoration: none;
  display: block;
  width: 100%;
  text-align: center;
  color: #231815;
  font-size: 1.4rem;
  font-weight: 800;
  /* 적용하는 방법 찾아보기 */
  overflow: hidden;
  text-overflow: ellipsis;
`;
