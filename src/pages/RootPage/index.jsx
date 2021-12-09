import React, { useRef, useEffect, useCallback } from 'react';
import styled from 'styled-components';
import { Outlet, useLocation } from 'react-router-dom';
import { NavigationBar } from '../../components/common';
import '../../styles/FontStyle.css';
import Footer from '../../components/common/Footer';

const RootPage = () => {
  const topRef = useRef(null);
  const location = useLocation();
  const moveTop = useCallback(
    () => topRef.current.scrollTo({ top: 0, behavior: 'smooth' }),
    [],
  );

  useEffect(() => moveTop(), [moveTop, location]);

  return (
    <TotalStyle ref={topRef}>
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
      <Footer moveTop={moveTop} />
    </TotalStyle>
  );
};

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
  min-height: 95vh;
`;
