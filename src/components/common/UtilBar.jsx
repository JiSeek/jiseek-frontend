import React from 'react';
import PropTypes from 'prop-types';
import { Link, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';

const UtilBar = ({ token, onLangChange }) => {
  const location = useLocation();
  const { t, i18n } = useTranslation();

  return (
    <StyledUtilBar>
      {token
        ? [
            [t('navSignOut'), '/logout'],
            [t('navMyPage'), '/mypage'],
          ].map(([name, url]) => (
            <StyledLink
              key={name}
              to={url}
              state={{ from: url === '/logout' ? location : null }}
            >
              {name}
            </StyledLink>
          ))
        : [
            [t('navSignIn'), '/login'],
            [t('navSignUp'), '/register'],
          ].map(([name, url]) => (
            <StyledLink key={name} to={url}>
              {name}
            </StyledLink>
          ))}
      <StyledSelect name="lang" onChange={onLangChange} value={i18n.language}>
        {[
          ['ko', '한국어'],
          ['en', 'English'],
        ].map(([code, option]) => (
          <option key={option} value={code}>
            {option}
          </option>
        ))}
      </StyledSelect>
    </StyledUtilBar>
  );
};

UtilBar.propTypes = {
  token: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  onLangChange: PropTypes.func,
};

UtilBar.defaultProps = {
  token: '',
  onLangChange: null,
};

export default UtilBar;

const StyledUtilBar = styled.ul`
  list-style: none;
  text-align: center;
  padding-left: 0;
  display: grid;
  grid-template-columns: 1fr 1.5fr 1.5fr;
  align-items: center;
  padding-top: 0.65rem;
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  font-size: 1rem;
  font-weight: 700;
`;

const StyledSelect = styled.select`
  width: 85px;
  height: 22px;
  /* margin: 2px 0px; */
  padding: 2px 1px;
  font-family: inherit;
  font-size: 0.8rem;
  text-align: center;
  background: none;
  border-radius: 5px;
  border: 1px solid #231815;
`;
