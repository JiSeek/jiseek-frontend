import React from 'react';
import PropTypes from 'prop-types';
import { oAuth2 } from '../../api';

const KakaoLogIn = ({ lang }) => (
  <a
    href={`${oAuth2.kakao.baseUrl}/authorize?response_type=code&client_id=${oAuth2.kakao.apiKey}&redirect_uri=${oAuth2.kakao.redirectUrl}`}
  >
    {lang === 'ko' ? <div>카카오 로그인</div> : <div>Login with Kakao</div>}
  </a>
);

KakaoLogIn.propTypes = {
  lang: PropTypes.string,
};

KakaoLogIn.defaultProps = {
  lang: 'ko',
};

export default KakaoLogIn;
