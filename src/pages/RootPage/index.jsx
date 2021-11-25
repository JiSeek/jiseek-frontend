import React from 'react';
import { Outlet } from 'react-router-dom';
import { UtilBar, NavigationBar } from '../../components/common';

const RootPage = () => (
  <div>
    <header>
      <nav>
        <NavigationBar />
        <UtilBar />
      </nav>
    </header>
    <main>
      <Outlet />
    </main>
  </div>
);

export default RootPage;
