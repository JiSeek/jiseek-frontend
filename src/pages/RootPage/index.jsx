import React from 'react';
import styled from 'styled-components';
import { Outlet } from 'react-router-dom';
import { UtilBar, NavigationBar } from '../../components/common';

const RootPage = () => (
  <StyledRootPage>
    <header>
      <nav>
        <NavigationBar />
        <UtilBar />
      </nav>
    </header>
    <main>
      <Outlet />
    </main>
  </StyledRootPage>
);

const StyledRootPage = styled.div`
  width: 100vw;
  height: 100vh;
`;

export default RootPage;
