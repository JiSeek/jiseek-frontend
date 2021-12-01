import React from 'react';
import { Outlet } from 'react-router-dom';
import styled from 'styled-components';
import { NavigationBar } from '../../components/common';
import '../../styles/FontStyle.css';
import Footer from '../../components/common/Footer';

const RootPage = () => (
  <TotalStyle>
    <header />
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
  color: #231815;
  max-width: 1320px;
`;

const StickyOption = styled.main`
  height: auto;
`;

const StickyHeader = styled.header`
  position: sticky;
  top: 0;
  z-index: 1;
`;
