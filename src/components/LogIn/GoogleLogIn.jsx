import React from 'react';
import { useTranslation } from 'react-i18next';
import LogInButton from './LogInButton';
import { oAuth2 } from '../../api';
import { GoogleLogo } from '../../assets/images/images';

const GoogleLogIn = () => {
  const { i18n } = useTranslation();

  return (
    <a
      href={`${oAuth2.kakao.baseUrl}/authorize?response_type=code&client_id=${oAuth2.kakao.apiKey}&redirect_uri=${oAuth2.kakao.redirectUrl}`}
    >
      <LogInButton
        logo={GoogleLogo}
        sns={i18n.language === 'ko' ? '구글 로그인' : 'Login with Google'}
        background="#FBFBFB"
      />
    </a>
  );
};

export default GoogleLogIn;
