import React from 'react';
import PropTypes from 'prop-types';
import { Link, useMatch, useResolvedPath } from 'react-router-dom';
import styled from 'styled-components';
import logo from '../../images/logo.png';

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
      {match && '(요거)'}
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
  <>
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
    </Navbar>
    <StyledHr />
  </>
);

NavigationBar.propTypes = {
  lang: PropTypes.string,
};

NavigationBar.defaultProps = {
  lang: '',
};

export default NavigationBar;

const Navbar = styled.nav`
  text-align: center;
  height: 80px;
  background-color: #fbfbfb;
  position: sticky;
  top: 0;
  z-index: 999;
  display: grid;
  grid-auto-flow: column;
  grid-template-columns: 1fr 1fr;
`;

const Logo = styled.img`
  height: 50px;
  /* vertical-align: middle; */
  margin-top: 15px;
  display: inline-block;
`;

const StyledUl = styled.ul`
  display: inline-block;
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
`;

const StyledCustomLink = styled(CustomLink)`
  text-decoration: none;
  color: #231815;
  margin-left: 75px;
  font-size: 18px;
  font-weight: bold;
  line-height: 80px;
`;

const StyledHr = styled.hr`
  size: 2px;
  color: #d7ccc0;
  margin: 0;
`;
