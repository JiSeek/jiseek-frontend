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
import {
  Initialize,
  MainPage,
  RegisterPage,
  LogInPage,
  BoardPage,
  BoardDetailPage,
  MyPage,
  MyInfoPage,
  VerifyPage,
  LogOutPage,
  NotFound,
  FoodSearchPage,
} from './pages';
import { useAuthContext } from './contexts';
import RootPage from './pages/RootPage';

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
            <Route path="food/*" element={<FoodSearchPage />} />
            <Route path="board" element={<BoardPage />}>
              <Route path=":id" element={<BoardDetailPage />} />
            </Route>
            <Route
              path="mypage"
              element={
                <RequireAuth>
                  <MyPage />
                </RequireAuth>
              }
            >
              <Route path="info" element={<MyInfoPage />} />
              <Route path="ch_pswrd" element={<MyInfoPage />} />
            </Route>
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Initialize>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  </BrowserRouter>
);

const RequireAuth = ({ children }) => {
  const { token } = useAuthContext();
  const location = useLocation();

  if (!token.access) {
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
