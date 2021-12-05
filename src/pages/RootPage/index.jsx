import React from 'react';
import styled from 'styled-components';
import { Outlet } from 'react-router-dom';
import { NavigationBar } from '../../components/common';
import '../../styles/FontStyle.css';
import Footer from '../../components/common/Footer';

const RootPage = () => (
  <TotalStyle>
    <StickyOption>
      <StickyHeader>
        <nav>
          <NavigationBar />
        </nav>
      </StickyHeader>
      <OutletHeight>
        <Outlet />
      </OutletHeight>
    </StickyOption>
    <Footer />
  </TotalStyle>
);

export default RootPage;

const TotalStyle = styled.div`
  font-family: 'Pretendard';
  font-weight: 400;
  color: #001100;
  background: #fbfbfb;
  height: 100vh;
  width: 100vw;
  overflow-x: hidden;
`;

const StickyOption = styled.main`
  height: auto;
`;

const StickyHeader = styled.header`
  position: sticky;
  top: 0;
  z-index: 2;
`;

const OutletHeight = styled.div`
  min-height: calc(100vh - 8vh - 200px);
`;
