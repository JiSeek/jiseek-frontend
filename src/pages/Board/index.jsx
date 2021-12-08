import React from 'react';
import styled from 'styled-components';
import { useMatch, Outlet } from 'react-router-dom';
import { Board } from '../../components/Board';

const BoardPage = () => {
  const match = useMatch({ path: '/board', end: true });

  return (
    <StyledMyPage>
      <Title>커뮤니티</Title>
      {match && <Board />}
      <Outlet />
    </StyledMyPage>
  );
};

const StyledMyPage = styled.div`
  max-width: 1320px;
  padding: 4rem 0;
  margin: auto;
`;

const Title = styled.div`
  font-size: 2.5rem;
  font-weight: 800;
  text-align: center;
  margin-bottom: 2.5rem;
`;

export default BoardPage;
