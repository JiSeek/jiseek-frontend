import React from 'react';
import PropTypes from 'prop-types';
import CustomLink from './CustomLink';

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
  <nav>
    <ul>
      {menu(lang).map(([tab, url]) => (
        <li key={tab}>
          <CustomLink to={url}>{tab}</CustomLink>
        </li>
      ))}
    </ul>
  </nav>
);

NavigationBar.propTypes = {
  lang: PropTypes.string,
};

NavigationBar.defaultProps = {
  lang: '',
};

export default NavigationBar;
