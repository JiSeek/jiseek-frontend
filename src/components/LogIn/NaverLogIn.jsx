import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import LogInButton from './LogInButton';
import { createRedirectUrl } from '../../api/common';
import { encSha256, setLocalStorage } from '../../utils';
import { NaverLogo } from '../../assets/images/images';

const NAVER_API_CLIENT_ID = process.env.REACT_APP_NAVER_API_CLIENT_ID;
const JISEEK_API_URL = process.env.REACT_APP_JISEEK_API_BASE_URL;
const REDIRECT_URL = createRedirectUrl('naver');

const Naver = () => {
  const naverRef = useRef();
  useEffect(() => {
    const naverScript = document.createElement('script');
    naverScript.src =
      'https://static.nid.naver.com/js/naveridlogin_js_sdk_2.0.2.js';
    naverScript.type = 'text/javascript';
    document.head.appendChild(naverScript);

    naverScript.onload = () => {
      const naverLogin = new window.naver.LoginWithNaverId({
        clientId: NAVER_API_CLIENT_ID,
        callbackUrl: REDIRECT_URL,
        callbackHandle: true,
        isPopup: false,
        loginButton: {
          color: 'green',
          type: 3,
          height: 55,
        },
      });
      naverLogin.init();
      naverLogin.logout();
      // 네이버 로그인이 계속 유지되는 경우가 있음, 초기화시 로그아웃
    };
  }, []);
  const handleClick = () => {
    naverRef.current.children[0].click();
  };
  return (
    <>
      <div ref={naverRef} id="naverIdLogin" style={{ display: 'none' }} />
      <button
        onClick={handleClick}
        className="naver"
        type="button"
        style={{
          padding: '0.6em 1em',
          borderRadius: '0.25em',
          fontSize: '0.8rem',
          marginTop: '0.7em',
          display: 'flex',
          alignItems: 'center',
          fontWeight: '400',
          boxShadow: 'var(--shadow-1)',
          backgroundColor: '#03C75A',
          color: 'white',
        }}
      >
        <img src="/images/naver.jpg" alt="naver" />
        Login with Naver
      </button>
    </>
  );
};

const NaverLogIn = ({ lang }) => {
  const salt = [...Array(10).keys()]
    .map(() => Math.floor(Math.random() * 10))
    .join('');
  const state = encSha256(JISEEK_API_URL, salt).slice(0, 10);
  setLocalStorage('jiseek_state', state);

  const initializeNaverLogin = () => {
    const { naver } = window;
    const naverLogin = new naver.LoginWithNaverId({
      clientId: NAVER_API_CLIENT_ID,
      callbackUrl: REDIRECT_URL,
      loginButton: {
        color: '#00BF18',
        type: 2,
        width: '400',
        height: '200',
      },
      state,
    });
    naverLogin.init();
  };
  useEffect(() => {
    initializeNaverLogin();
  });

  return (
    <>
      <a
        href={`https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=${NAVER_API_CLIENT_ID}&state=${state}&redirect_uri=${REDIRECT_URL}`}
      >
        <LogInButton
          logo={NaverLogo}
          sns={lang === 'ko' ? '네이버 로그인' : 'Login with Naver'}
          background="#00BF18"
        />
      </a>
      <Naver />
    </>
  );
};

NaverLogIn.propTypes = {
  lang: PropTypes.string,
};

NaverLogIn.defaultProps = {
  lang: 'ko',
};

export default NaverLogIn;
