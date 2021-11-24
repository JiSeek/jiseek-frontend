import React from 'react';
import PropTypes from 'prop-types';
import {
  KoKakaoLoginImage,
  EnKakaoLoginImage,
} from '../../assets/images/images';
import { createRedirectUrl } from '../../api/common';

const KAKAO_API_KEY = process.env.REACT_APP_KAKAO_API_KEY;
const REDIRECT_URL = createRedirectUrl('kakao');

const KakaoLogIn = ({ lang }) => (
  <a
    href={`https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${KAKAO_API_KEY}&redirect_uri=${REDIRECT_URL}`}
  >
    {lang === 'ko' ? (
      <img src={KoKakaoLoginImage} alt="카카오 로그인" />
    ) : (
      <img src={EnKakaoLoginImage} alt="Login with kakao" />
    )}
  </a>
);

KakaoLogIn.propTypes = {
  lang: PropTypes.string,
};

KakaoLogIn.defaultProps = {
  lang: 'ko',
};

export default KakaoLogIn;
