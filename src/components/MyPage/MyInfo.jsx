import React from 'react';
import PropTypes, { string, number } from 'prop-types';
import { NavLink } from 'react-router-dom';

// TODO: 임시 텍스트, 로그인 플랫폼 로고로 바꾸주세요~
const getLogo = (type) => {
  switch (type) {
    case 'kakao':
      return 'kakao';
    case 'naver':
      return 'naver';
    default:
      return 'jiseek';
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

const MyInfo = ({ user, status }) => (
  <section>
    <h2>나의 정보</h2>
    <div>
      {status === 'loading' && 'Loading Logo'}
      {status === 'error' && 'Error Logo'}
      {status === 'success' && (
        <ul>
          <li>
            <img src={user?.image} alt="프로필 사진" />
          </li>
          <li>
            <img src={getLogo(user?.social_platform)} alt="로그인 플랫폼" />
          </li>
          <li>{user?.name}</li>
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
  </section>
);

MyInfo.propTypes = {
  user: PropTypes.objectOf(PropTypes.oneOfType([string, number])),
  status: string,
};

MyInfo.defaultProps = {
  user: {},
  status: '',
};

export default MyInfo;
