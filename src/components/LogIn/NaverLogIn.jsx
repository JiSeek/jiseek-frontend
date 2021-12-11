import React, { useCallback, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import LogInButton from './LogInButton';
import { NaverLogo } from '../../assets/images/images';
import { oAuth2 } from '../../api';

const Naver = () => {
  const { i18n } = useTranslation();
  const naverRef = useRef();
  useEffect(() => {
    const naverScript = document.createElement('script');
    naverScript.src =
      'https://static.nid.naver.com/js/naveridlogin_js_sdk_2.0.2.js';
    naverScript.type = 'text/javascript';
    document.head.appendChild(naverScript);

    naverScript.onload = () => {
      const naverLogin = new window.naver.LoginWithNaverId({
        clientId: oAuth2.naver.apiKey,
        callbackUrl: oAuth2.naver.redirectUrl,
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
      <NaverButton onClick={handleClick} className="naver" type="button">
        <LogInButton
          logo={NaverLogo}
          sns={i18n.language === 'ko' ? '네이버 로그인' : 'Login with Naver'}
          background="#00BF18"
        />
      </NaverButton>
    </>
  );
};

const NaverButton = styled.button`
  border: none;
  background: none;
  width: 100%;
  cursor: pointer;
  color: #fbfbfb;
  margin: -0.5rem 0;
`;

const NaverLogIn = () => {
  const initializeNaverLogin = useCallback(() => {
    const { naver } = window;
    const naverLogin = new naver.LoginWithNaverId({
      clientId: oAuth2.naver.apiKey,
      callbackUrl: oAuth2.naver.redirectUrl,
      loginButton: {
        color: '#00BF18',
        type: 3,
        height: '50',
      },
    });
    naverLogin.init();
  }, []);

  useEffect(() => {
    initializeNaverLogin();
  });

  return <Naver />;
};

export default NaverLogIn;
