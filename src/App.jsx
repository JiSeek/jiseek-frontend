import React from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import {
  Initialize,
  MainPage,
  RegisterPage,
  LogInPage,
  BoardPage,
  MyPage,
  VerifyPage,
  LogOutPage,
  NotFound,
  FoodSearchPage,
  PasswordChangePage,
  Members,
} from './pages';
import RootPage from './pages/RootPage';
import { FilteredRoute } from './components/common';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

const App = () => (
  <BrowserRouter>
    <QueryClientProvider client={queryClient}>
      <Initialize>
        <Routes>
          <Route path="/" element={<RootPage />}>
            <Route index element={<MainPage />} />
            <Route path="register" element={<RegisterPage />} />
            <Route path="login" element={<LogInPage />} />
            <Route path="verify/:type" element={<VerifyPage />} />
            <Route path="logout" element={<LogOutPage />} />
            <Route
              path="food/*"
              element={
                <FilteredRoute validSubUrls={['image']} authSubUrls={['image']}>
                  <FoodSearchPage />
                </FilteredRoute>
              }
            />
            <Route path="board/*" element={<BoardPage />} />
            <Route
              path="mypage/*"
              element={
                <FilteredRoute
                  validSubUrls={['info']}
                  authSubUrls={['.', 'info']}
                >
                  <MyPage />
                </FilteredRoute>
              }
            />
            <Route
              path="ch_pswrd"
              element={
                <FilteredRoute authSubUrls={['.']}>
                  <PasswordChangePage />
                </FilteredRoute>
              }
            />
            <Route path="member" element={<Members />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Initialize>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  </BrowserRouter>
);

export default App;
