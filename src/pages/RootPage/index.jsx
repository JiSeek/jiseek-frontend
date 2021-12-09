import React, { useEffect } from 'react';
import styled from 'styled-components';
import { Outlet } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { injectStyle } from 'react-toastify/dist/inject-style';
import { NavigationBar } from '../../components/common';
import '../../styles/FontStyle.css';
import Footer from '../../components/common/Footer';

const RootPage = () => {
  useEffect(() => injectStyle(), []);

  return (
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
      <StyledToastContainer
        position="top-center"
        autoClose={2000}
        hideProgressBar={false}
        pauseOnHover={false}
        draggable={false}
        theme="colored"
      />
    </TotalStyle>
  );
};

const StyledToastContainer = styled(ToastContainer).attrs()`
  .Toastify__toast {
    top: 6.5vh;
  }
`;

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

export default RootPage;
