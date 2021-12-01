import React from 'react';
import { useQuery } from 'react-query';
import { useMatch, NavLink, Outlet } from 'react-router-dom';
import jiseekApi from '../../api';
import { FavoriteFood, FavoritePost } from '../../components/MyPage';
import { userKeys } from '../../constants';
import { useAuthContext } from '../../contexts';

const MyPage = () => {
  const match = useMatch({ path: '/mypage', end: true });
  const { token } = useAuthContext();

  const { data: user, status: userStatus } = useQuery(
    userKeys.info,
    jiseekApi.get({ token: token.access }),
    {
      cacheTime: Infinity, // TODO: 상태 확인하기!!
      staleTime: Infinity,
      enabled: !!token.access,
    },
  );

  return (
    <div>
      <NavLink to=".">마이 페이지</NavLink>
      <NavLink to="info">회원정보 수정</NavLink>
      <NavLink to="ch_pswrd">비밀번호 변경</NavLink>
      {match && (
        <div>
          <section>
            <h2>내 정보 수정</h2>
            {userStatus === 'loading' ? (
              <span>로딩 중...</span>
            ) : (
              <div>
                {userStatus === 'error' ? (
                  <span>서버 응답 에러</span>
                ) : (
                  <div>
                    <input type="image" src={user.image} alt="프로필 이미지" />
                    <ul>
                      <li>
                        <span>{user.name}</span>
                      </li>
                      <li>
                        <span>{user.email}</span>
                      </li>
                    </ul>
                  </div>
                )}
              </div>
            )}
          </section>
          <section>
            <h2>관심 게시글 목록</h2>
            <FavoritePost />
          </section>
          <section>
            <h2>관심 음식 목록</h2>
            <FavoriteFood />
          </section>
        </div>
      )}
      <Outlet />
    </div>
  );
};

export default MyPage;
