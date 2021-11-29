import React from 'react';
import { useMatch, Outlet } from 'react-router-dom';
import { FavoriteFood, FavoritePost } from '../../components/MyPage';

const MyPage = () => {
  // const location = useLocation();
  const match = useMatch({ path: '/mypage', end: true });

  return (
    <div>
      {match && (
        <div>
          <strong>내 정보 수정</strong>
          <></>
          <strong>관심 게시글 목록</strong>
          <FavoritePost />
          <strong>관심 음식 목록</strong>
          <FavoriteFood />
        </div>
      )}
      <Outlet />
    </div>
  );
};

export default MyPage;
