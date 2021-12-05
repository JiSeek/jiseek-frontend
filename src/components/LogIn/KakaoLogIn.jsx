import React from 'react';
import PropTypes from 'prop-types';
import { oAuth2 } from '../../api';
import LogInButton from './LogInButton';
import { KakaoLogo } from '../../assets/images/images';

const KakaoLogIn = ({ lang }) => (
  <a
    href={`${oAuth2.kakao.baseUrl}/authorize?response_type=code&client_id=${oAuth2.kakao.apiKey}&redirect_uri=${oAuth2.kakao.redirectUrl}`}
  >
    <LogInButton
      logo={KakaoLogo}
      sns={
        lang === 'ko' ? "카카오 로그인" : "Login with Kakao"
      }
      background="#FFEB3B"
    />
  </a>
);

KakaoLogIn.propTypes = {
  lang: PropTypes.string,
};

KakaoLogIn.defaultProps = {
  lang: 'ko',
};

export default KakaoLogIn;
