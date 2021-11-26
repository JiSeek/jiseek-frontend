import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import { Link, useResolvedPath, useMatch, Outlet } from 'react-router-dom';
import styled from 'styled-components';
import { useLangContext } from '../../contexts/LangContext';
import { useAuthContext } from '../../contexts/AuthContext';
import logo from '../../images/logo.png';

const login = (lang) => {
  if (lang === 'ko') {
    return [
      ['로그아웃', '/logout'],
      ['마이페이지', '/mypage'],
    ];
  }
  if (lang === 'en') {
    return [
      ['LOGOUT', '/logout'],
      ['My Page', '/mypage'],
    ];
  }
  return [];
};

const logout = (lang) => {
  if (lang === 'ko') {
    return [
      ['로그인', '/login'],
      ['회원가입', '/register'],
    ];
  }
  if (lang === 'en') {
    return [
      ['LOGIN', '/login'],
      ['JOIN', '/register'],
    ];
  }
  return [];
};

const UtilBar = () => {
  const [lang, setLang] = useLangContext();
  const { token } = useAuthContext();
  const onChange = useCallback((e) => setLang(e.target.value), [setLang]);

  return (
    <StyledUtilBar>
      {token.access
        ? login(lang).map(([name, url]) => (
            <StyledLink to={url}>{name}</StyledLink>
          ))
        : logout(lang).map(([name, url]) => (
            <StyledLink to={url}>{name}</StyledLink>
          ))}
      <select name="lang" onChange={onChange} value={lang}>
        {[
          ['ko', '한국어'],
          ['en', 'English'],
        ].map(([code, option]) => (
          <option key={option} value={code}>
            {option}
          </option>
        ))}
      </select>
    </StyledUtilBar>
  );
};

// TODO: 디자인시 match 값을 Styled Component props로 넘겨 active 상태에 활용 가능.
// 부가 설명.
// end 옵션: 해당 경로로 끝나는 경로와 일치하는지 확인
// Link props 전달 Eslint 에러 방지
/* eslint-disable react/jsx-props-no-spreading */
const CustomLink = ({ children, to, ...props }) => {
  const resolved = useResolvedPath(to);
  const match = useMatch({ path: resolved.pathname, end: true });

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
      ['영양 정보 확인', '/food'],
      ['커뮤니티', '/board'],
    ];
  }
  if (lang === 'en') {
    return [
      ['Main Page', '/'],
      ['Search Nutrients', '/food'],
      ['Community', '/board'],
    ];
  }
  return [];
};

export default () => {
  const [lang] = useLangContext();

  return (
    <>
      {/* TODO: sticky 속성 사용을 위해 부모 컴포넌트 높이 고정 필요 */}
      <header>
        <UtilBar />
        <Navbar>
          <Link to='/'>
            <img
              src={logo}
              alt="logo"
              style={{ height: '50px', verticalAlign: 'middle' }}
            />
          </Link>
          {menu(lang).map(([tab, url]) => (
            <StyledCustomLink to={url}>{tab}</StyledCustomLink>
          ))}
          <StyledHr />
        </Navbar>
      </header>
      <main>
        <Outlet />
      </main>
    </>
  );
};

const Navbar = styled.nav`
  text-align: center;
  height: 80px;
  position: sticky;
  top: 0;
`;

const StyledCustomLink = styled(CustomLink)`
  text-decoration: none;
  color: #231815;
  margin-left:75px;
  font-size: 18px;
  font-weight: bold;
  line-height: 80px;
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  color: #fffdfa;
  font-size: 14px;
  font-weight: bold;
  margin: 50px;
`;

const StyledUtilBar = styled.div`
  background-color: #998883;
  height: 48px;
  width: 100%;
  text-align: right;
  line-height: 48px;
`;

const StyledHr = styled.hr`
  size: 2px;
  color: #d7ccc0;
`;
