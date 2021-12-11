import React, { useCallback, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import LogInButton from './LogInButton';
import { NaverLogo } from '../../assets/images/images';
import { oAuth2 } from '../../api';

// const Naver = () => {
//   const naverRef = useRef();
//   useEffect(() => {
//     const naverScript = document.createElement('script');
//     naverScript.src =
//       'https://static.nid.naver.com/js/naveridlogin_js_sdk_2.0.2.js';
//     naverScript.type = 'text/javascript';
//     document.head.appendChild(naverScript);

//     naverScript.onload = () => {
//       const naverLogin = new window.naver.LoginWithNaverId({
//         clientId: oAuth2.naver.apiKey,
//         callbackUrl: oAuth2.naver.redirectUrl,
//         callbackHandle: true,
//         isPopup: false,
//         loginButton: {
//           color: 'green',
//           type: 3,
//           height: 55,
//         },
//       });
//       naverLogin.init();
//       naverLogin.logout();
//       // 네이버 로그인이 계속 유지되는 경우가 있음, 초기화시 로그아웃
//     };
//   }, []);
//   const handleClick = () => {
//     naverRef.current.children[0].click();
//   };
//   return (
//     <>
//       <div ref={naverRef} id="naverIdLogin" style={{ display: 'none' }} />
//       <button
//         onClick={handleClick}
//         className="naver"
//         type="button"
//         style={{
//           padding: '0.6em 1em',
//           borderRadius: '0.25em',
//           fontSize: '0.8rem',
//           marginTop: '0.7em',
//           display: 'flex',
//           alignItems: 'center',
//           fontWeight: '400',
//           boxShadow: 'var(--shadow-1)',
//           backgroundColor: '#03C75A',
//           color: 'white',
//         }}
//       >
//         <img src="/images/naver.jpg" alt="naver" />
//         Login with Naver
//       </button>
//     </>
//   );
// };

const NaverLogIn = () => {
  const { i18n } = useTranslation();
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

  return (
    <NaverLoginContainer>
      {/* <a
        href={`https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=${oAuth2.naver.apiKey}&state=123&redirect_uri=${oAuth2.naver.redirectUrl}`}
      > */}
      <LogInButton
        logo={NaverLogo}
        sns={i18n.language === 'ko' ? '네이버 로그인' : 'Login with Naver'}
        background="#00BF18"
      />
      {/* </a> */}
      {/* <Naver /> */}
      <div id="naverIdLogin" />
    </NaverLoginContainer>
  );
};

const NaverLoginContainer = styled.div`
  position: relative;
  > div:last-child {
    position: absolute;
    top: 0;
    left: 20%;
    opacity: 0.1;
  }
`;

export default NaverLogIn;
