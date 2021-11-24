import React from 'react';
import { useMatch, Outlet } from 'react-router-dom';

const MyPage = () => {
  const match = useMatch({ path: '/mypage', end: true });

  return (
    <div>
      {match && <div>MyPage</div>}
      <Outlet />
    </div>
  );
};

export default MyPage;
