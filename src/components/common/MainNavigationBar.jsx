import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import { Link, useResolvedPath, useMatch, Outlet } from 'react-router-dom';
import { useLangContext } from '../../contexts/LangContext';
import { useAuthContext } from '../../contexts/AuthContext';

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
    <ul>
      {token.access
        ? login(lang).map(([name, url]) => (
            <li key={name}>
              <Link to={url}>{name}</Link>
            </li>
          ))
        : logout(lang).map(([name, url]) => (
            <li key={name}>
              <Link to={url}>{name}</Link>
            </li>
          ))}
      <select name="lang" onChange={onChange} value={lang}>
        {[
          ['ko', 'KOR'],
          ['en', 'ENG'],
        ].map(([code, option]) => (
          <option key={option} value={code}>
            {option}
          </option>
        ))}
      </select>
    </ul>
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
      ['영양정보 확인', '/food'],
      ['커뮤니티', '/board'],
    ];
  }
  if (lang === 'en') {
    return [
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
      <header>
        <nav>
          <ul>
            {menu(lang).map(([tab, url]) => (
              <li key={tab}>
                <CustomLink to={url}>{tab}</CustomLink>
              </li>
            ))}
          </ul>
          <UtilBar />
        </nav>
      </header>
      <main>
        <Outlet />
      </main>
    </>
  );
};
