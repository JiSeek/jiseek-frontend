import React from 'react';
import PropTypes from 'prop-types';
import { Link, useLocation } from 'react-router-dom';
import styled from 'styled-components';

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
  console.log('222333', location.pathname);
  return (
    <StyledUtilBar>
      {token
        ? login(lang).map(([name, url]) => (
            <StyledLink
              to={url}
              state={{ from: url === '/logout' ? location : null }}
            >
              {name}
            </StyledLink>
          ))
        : logout(lang).map(([name, url]) => (
            <StyledLink to={url}>{name}</StyledLink>
          ))}
      <select name="lang" onChange={onLangChange} value={lang}>
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

const StyledUtilBar = styled.ul`
  list-style: none;
  background-color: #998883;
  height: 48px;
  width: 100%;
  text-align: right;
  line-height: 48px;
  margin:0;
  padding:0;
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  color: #fffdfa;
  font-size: 14px;
  font-weight: bold;
  margin: 30px;
`;
