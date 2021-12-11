import React from 'react';
import PropTypes, { any } from 'prop-types';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import { NavLink } from 'react-router-dom';
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
  const { t } = useTranslation();

  return (
    <MyInfoContainer>
      <MyInfoTitle>{t('myPageMyInfo')}</MyInfoTitle>
      <div>
        {/* TODO: 에러 처리 */}
        {status === 'loading' && 'Loading Logo'}
        {status === 'error' && 'Error Logo'}
        {status === 'success' && (
          <ul>
            <li>
              <ProfileImage src={user?.image} alt={t('myPageProfile')} />
            </li>
            <PlatformAndName>
              <PlatformLogo
                src={getLogo(user?.social_platform)}
                alt={t('myPageLoginPlatform')}
              />
              <span>{user?.name}</span>
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
            {t('myPageInfoEdit')}
          </NavLink>
          {!user?.social_platform && (
            <>
              {` | `}
              <NavLink
                to="/ch_pswrd"
                style={({ isActive }) => (isActive ? activeState : undefined)}
                state={{ isSocial: !!user?.social_platform }}
              >
                {t('myPageChgPassword')}
              </NavLink>
            </>
          )}
        </nav>
      </footer>
    </MyInfoContainer>
  );
};

MyInfo.propTypes = {
  user: PropTypes.objectOf(PropTypes.oneOfType([any])),
  status: PropTypes.string,
};

MyInfo.defaultProps = {
  user: {},
  status: '',
};

const MyInfoContainer = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  text-align: center;
  box-shadow: 0px 0 26px 5px rgb(0 0 0 / 20%);
  padding: 40px;
  /* height: 580px; */
`;

const MyInfoTitle = styled.h2`
  width: 0;
  height: 0;
  font-size: 0;
`;

const ProfileImage = styled.img`
  height: 200px;
  width: 200px;
  object-fit: cover;
`;

const PlatformAndName = styled.li`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 0.75rem;
  margin-bottom: 0.5rem;

  > img {
    margin-right: 1rem;
  }
`;

const PlatformLogo = styled.img`
  height: 25px;
  width: 25px;
`;

export default MyInfo;
