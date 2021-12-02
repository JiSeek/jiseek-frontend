import React from 'react';
import { useMatch, Outlet } from 'react-router-dom';
import { Board } from '../../components/Board';

const BoardPage = () => {
  const match = useMatch({ path: '/board', end: true });

  return (
    <div>
      {match && <Board/>}
      <Outlet />
    </div>
  );
};
export default BoardPage;
