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
  <Navbar>
    <Link to="/">
      <Logo src={logo} alt="logo" />
    </Link>
    {menu(lang).map(([tab, url]) => (
      <StyledCustomLink to={url}>{tab}</StyledCustomLink>
    ))}
    <StyledHr />
  </Navbar>
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
  /* TODO: 네비게이션 바와 메인 컨텐츠의 영역이 분리되어있어서 sticky 속성이 제대로 적용되지 않음 */
  position: sticky;
  top: 0;
  z-index: 999;
`;

const Logo = styled.img`
  height: 50px;
  vertical-align: middle;
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
