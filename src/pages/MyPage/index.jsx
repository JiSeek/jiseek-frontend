import React from 'react';
import { useMatch, Outlet } from 'react-router-dom';
import { FavoritePost } from '../../components/MyPage';

const MyPage = () => {
  const match = useMatch({ path: '/mypage', end: true });

  return (
    <div>
      {match && (
        <div>
          <h2>좋아요 게시글 리스트</h2>
          <FavoritePost />
        </div>
      )}
      <Outlet />
    </div>
  );
};

export default MyPage;
