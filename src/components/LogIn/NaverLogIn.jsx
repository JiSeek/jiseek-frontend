import React from 'react';
import PropTypes from 'prop-types';
import { createRedirectUrl } from '../../api/common';
import { encSha256, setLocalStorage } from '../../utils';

const NAVER_API_CLIENT_ID = process.env.REACT_APP_NAVER_API_CLIENT_ID;
const JISEEK_API_URL = process.env.REACT_APP_JISEEK_API_BASE_URL;
const REDIRECT_URL = createRedirectUrl('naver');

const NaverLogIn = ({ lang }) => {
  const salt = [...Array(10).keys()]
    .map(() => Math.floor(Math.random() * 10))
    .join('');
  const state = encSha256(JISEEK_API_URL, salt).slice(0, 10);
  setLocalStorage('jiseek_state', state);

  return (
    <a
      href={`https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=${NAVER_API_CLIENT_ID}&state=${state}&redirect_uri=${REDIRECT_URL}`}
    >
      {lang === 'ko' ? <div>네이버 로그인</div> : <div>Login with Naver</div>}
    </a>
  );
};

NaverLogIn.propTypes = {
  lang: PropTypes.string,
};

NaverLogIn.defaultProps = {
  lang: 'ko',
};

export default NaverLogIn;
