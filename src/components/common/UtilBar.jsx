import React from 'react';
import PropTypes from 'prop-types';
import { Link, useLocation } from 'react-router-dom';

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
  return [
    ['로그아웃', '/logout'],
    ['마이페이지', '/mypage'],
  ];
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
  return [
    ['로그인', '/login'],
    ['회원가입', '/register'],
  ];
};

const UtilBar = ({ token, lang, onLangChange }) => {
  const location = useLocation();
  return (
    <ul>
      {token
        ? login(lang).map(([name, url]) => (
            <li key={name}>
              <Link
                to={url}
                state={{ from: url === '/logout' ? location : null }}
              >
                {name}
              </Link>
            </li>
          ))
        : logout(lang).map(([name, url]) => (
            <li key={name}>
              <Link to={url}>{name}</Link>
            </li>
          ))}
      <select name="lang" onChange={onLangChange} value={lang}>
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

UtilBar.propTypes = {
  token: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  lang: PropTypes.string,
  onLangChange: PropTypes.func,
};

UtilBar.defaultProps = {
  token: '',
  lang: '',
  onLangChange: null,
};

export default UtilBar;
