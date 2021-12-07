import React, { useCallback, useEffect } from 'react';
// import PropTypes from 'prop-types';
import { oAuth2 } from '../../api';

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

  return <div id="naverIdLogin" />;
};

// NaverLogIn.propTypes = {
//   lang: PropTypes.string,
// };

// NaverLogIn.defaultProps = {
//   lang: 'ko',
// };

export default NaverLogIn;
