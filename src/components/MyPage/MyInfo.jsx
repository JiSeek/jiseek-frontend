import React from 'react';
import PropTypes, { string, number } from 'prop-types';
import styled from 'styled-components';
import { NavLink } from 'react-router-dom';
import testImage from '../../assets/images/meat_gui.jpg';
import {
  KakaoLogo,
  NaverLogo,
  GoogleLogo,
  JiseekFavicon,
} from '../../assets/images/images';

const getLogo = (type) => {
  switch (type) {
    case 'kakao':
      return KakaoLogo;
    case 'naver':
      return NaverLogo;
    case 'google':
      return GoogleLogo;
    default:
      return JiseekFavicon;
  }
};

// TODO: 국적 표기?

const activeState = {
  textDecoration: 'none',
  fontWeight: '700',
  borderBottom: '2px solid',
  borderRadius: '1px',
  paddingBottom: '0.3rem',
};

const MyInfo = ({ user, status }) => {
  console.log(user);
  return (
    <>
      <HiddenH2>나의 정보</HiddenH2>
      <Info>
        <div>
          {status === 'loading' && 'Loading Logo'}
          {status === 'error' && 'Error Logo'}
          {status === 'success' && (
            <ul>
              <li>
                <ProfileImage
                  src={user?.image || testImage}
                  alt="프로필 사진"
                />
              </li>
              <PlatformAndName>
                <li>
                  <PlatformLogo
                    src={getLogo(user?.social_platform)}
                    alt="로그인 플랫폼"
                  />
                </li>
                <li>{user?.name}</li>
              </PlatformAndName>
              <li>{user?.email}</li>
            </ul>
          )}
        </div>
        <footer>
          <nav>
            <NavLink
              to="info"
              style={({ isActive }) => (isActive ? activeState : undefined)}
            >
              정보 수정
            </NavLink>

            {!user?.social_platform && (
              <>
                |
                <NavLink
                  to="/ch_pswrd"
                  style={({ isActive }) => (isActive ? activeState : undefined)}
                >
                  비밀번호 변경
                </NavLink>
              </>
            )}
          </nav>
        </footer>
      </Info>
    </>
  );
};

MyInfo.propTypes = {
  user: PropTypes.objectOf(PropTypes.oneOfType([string, number])),
  status: string,
};

MyInfo.defaultProps = {
  user: {},
  status: '',
};

const Info = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  text-align: center;
  box-shadow: 0px 0 26px 5px rgb(0 0 0 / 20%);
  padding: 40px;
  /* height: 580px; */
`;

const HiddenH2 = styled.h2`
  width: 0;
  height: 0;
  font-size: 0;
`;

const ProfileImage = styled.img`
  height: 200px;
  width: 200px;
  object-fit: cover;
`;

const PlatformAndName = styled.span`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 0.75rem;
  margin-bottom: 0.5rem;

  > li {
    > img {
      margin-right: 1rem;
    }
  }
`;

const PlatformLogo = styled.img`
  height: 25px;
  width: 25px;
`;

export default MyInfo;
