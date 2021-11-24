import React from 'react';
import { useMatch, Outlet } from 'react-router-dom';

const BoardPage = () => {
  const match = useMatch({ path: '/board', end: true });

  return (
    <div>
      {match && 'Board'}
      <Outlet />
    </div>
  );
};
export default BoardPage;
