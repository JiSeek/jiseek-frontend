import React from 'react';
import propTypes from 'prop-types';
import './App.css';
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  useLocation,
} from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import { LangProvider } from './contexts/LangContext';
import { SessionProvider, useSessionContext } from './contexts/SessionContext';
import { NavigationBar } from './components/common';
import MainPage from './pages';
import RegisterPage from './pages/Register';
import LogInPage from './pages/LogIn';
import FoodSearchPage from './pages/FoodSearch';
import BoardPage from './pages/Board';
import BoardDetailPage from './pages/BoardDetails';
import MyPage from './pages/MyPage';
import MyInfoPage from './pages/MyInfo';
import LogInAuthPage from './pages/LogInAuth';
import LogOutPage from './pages/LogOut';
import NotFound from './pages/NotFound';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

const App = () => (
  <BrowserRouter>
    <LangProvider>
      <SessionProvider>
        <QueryClientProvider client={queryClient}>
          <Routes>
            <Route path="/" element={<NavigationBar />}>
              <Route index element={<MainPage />} />
              <Route path="food" element={<FoodSearchPage />} />
              <Route path="board" element={<BoardPage />}>
                <Route path=":id" element={<BoardDetailPage />} />
              </Route>
              <Route path="register" element={<RegisterPage />} />
              <Route path="login" element={<LogInPage />}>
                <Route path="auth/:type/callback" element={<LogInAuthPage />} />
              </Route>
              <Route path="logout" element={<LogOutPage />} />
              <Route
                path="mypage"
                element={
                  <RequireAuth>
                    <MyPage />
                  </RequireAuth>
                }
              >
                <Route path=":info" element={<MyInfoPage />} />
              </Route>
            </Route>
            <Route path="*" element={<NotFound />} />
          </Routes>
          <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
      </SessionProvider>
    </LangProvider>
  </BrowserRouter>
);

const RequireAuth = ({ children }) => {
  const location = useLocation();
  const { token } = useSessionContext();

  if (!token) {
    return <Navigate to="/login" state={{ from: location }} />;
  }

  return children;
};

RequireAuth.propTypes = {
  children: propTypes.oneOfType([propTypes.string, propTypes.element]),
};

RequireAuth.defaultProps = {
  children: null,
};

export default App;
