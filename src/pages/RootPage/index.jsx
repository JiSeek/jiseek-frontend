import React from 'react';
import { Outlet } from 'react-router-dom';
import styled from 'styled-components';
import { UtilBar, NavigationBar } from '../../components/common';

const RootPage = () => (
  // 네비게이션바 Sticky 적용을 위해 컴포넌트를 하나의 부모 컴포넌트로 묶음
  <StickyOption>
    <UtilBar />
    <NavigationBar />
    <Outlet />
  </StickyOption>
);

// const RootPage = () => (
//   <div>
//     <header>
//       <nav>
//         <UtilBar />
//           <NavigationBar />
//       </nav>
//     </header>
//     <main>
//       <Outlet />
//     </main>
//   </div>
// );

export default RootPage;

const StickyOption = styled.nav`
  height: auto;
`;
