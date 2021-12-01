import React from 'react';
import PropTypes from 'prop-types';
import { Link, useMatch, useResolvedPath } from 'react-router-dom';
import styled from 'styled-components';
import logo from '../../images/logo.png';
import UtilBar from './UtilBar';

// Link props 전달 Eslint 에러 방지
/* eslint-disable react/jsx-props-no-spreading */
const CustomLink = ({ children, to, ...props }) => {
  const resolved = useResolvedPath(to);
  const match = useMatch({ path: resolved.pathname, end: true });

  // TODO: 디자인시 match 값을 Styled Component props로 넘겨 active 상태에 활용 가능.
  // 부가 설명.
  // end 옵션: 해당 경로로 끝나는 경로와 일치하는지 확인
  return (
    <Link to={to} {...props}>
      {children}
      {match && <SelectBar />}
    </Link>
  );
};

CustomLink.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.element,
  ]),
  to: PropTypes.string,
  props: PropTypes.objectOf(
    PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.object]),
  ),
};

CustomLink.defaultProps = {
  children: null,
  to: '/',
  props: null,
};

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

const SelectBar = styled.div`
  width: 160px;
  height: 16px;
  background: #af9c96;
  border-radius: 30px 30px 0 0;
  position: absolute;
  top: 54px;
  /* TODO: 메뉴 위치와 정확하게 맞게끔 수정 필요 */
  transform: translateX(-18%);
`;
