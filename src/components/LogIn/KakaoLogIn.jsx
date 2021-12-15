import React from 'react';
import { useTranslation } from 'react-i18next';
import { oAuth2 } from '../../api';
import LogInButton from './LogInButton';
import { KakaoLogo } from '../../assets/images/images';

const KakaoLogIn = () => {
  const { i18n } = useTranslation();
  return (
    <a
      href={`${oAuth2.kakao.baseUrl}/authorize?response_type=code&client_id=${oAuth2.kakao.apiKey}&redirect_uri=${oAuth2.kakao.redirectUrl}`}
    >
      <LogInButton
        logo={KakaoLogo}
        sns={i18n.language === 'ko' ? '카카오 로그인' : 'Login with Kakao'}
        background="#FFEB3B"
      />
    </a>
  );
};

export default KakaoLogIn;
