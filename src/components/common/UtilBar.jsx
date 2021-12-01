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
  return (
    <StyledUtilBar>
      {token
        ? login(lang).map(([name, url]) => (
            <StyledLink
              key={name}
              to={url}
              state={{ from: url === '/logout' ? location : null }}
            >
              {name}
            </StyledLink>
          ))
        : logout(lang).map(([name, url]) => (
            <StyledLink key={name} to={url}>
              {name}
            </StyledLink>
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
  text-align: center;
  padding-left: 0;
  display: grid;
  grid-template-columns: 0.8fr 1.3fr 1.5fr;
  align-items: center;
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  color: #6b5b56;
  font-size: 1rem;
  font-weight: 700;
`;

// language option 적용 되지 않음
// styled component 문제로 의심되어 주석처리

// const StyledSelect = styled.select`
//   width: 85px;
//   height: 22px;
//   /* margin: 2px 0px; */
//   padding: 2px 1px;
//   font-family: inherit;
//   font-size: 12px;
//   text-align: center;
//   background: #fffdfa;
//   border-radius: 5px;
//   border: 1px solid #231815;
// `;

// const StyledOption = styled.option`
//   text-align: center;
//   margin-right: 50px;
//   /* TODO: option도 커스텀하기 */
// `;
