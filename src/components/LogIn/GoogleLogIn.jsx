import React from 'react';
import PropTypes from 'prop-types';
import LogInButton from './LogInButton';
import { oAuth2 } from '../../api';
import { GoogleLogo } from '../../assets/images/images';

const GoogleLogIn = ({ lang }) => {
  console.log('google 임시');

  return (
    <a
      href={`${oAuth2.kakao.baseUrl}/authorize?response_type=code&client_id=${oAuth2.kakao.apiKey}&redirect_uri=${oAuth2.kakao.redirectUrl}`}
    >
      <LogInButton
        logo={GoogleLogo}
        sns={
          lang === 'ko' ? <div>구글 로그인</div> : <div>Login with Google</div>
        }
      />
    </a>
  );
};

GoogleLogIn.propTypes = {
  lang: PropTypes.string,
};

GoogleLogIn.defaultProps = {
  lang: 'ko',
};

export default GoogleLogIn;
