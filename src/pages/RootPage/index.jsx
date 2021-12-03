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
      <Outlet />
    </StickyOption>
    <Footer />
  </TotalStyle>
);

export default RootPage;

const TotalStyle = styled.div`
  font-family: 'Pretendard';
  font-weight: 400;
  color: #6B5B56;
  background: #FBFBFB;
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
  z-index: 1;
`;
