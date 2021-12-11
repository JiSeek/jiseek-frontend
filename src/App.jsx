import React, { useMemo } from 'react';
import PropTypes, { string, number, func, element } from 'prop-types';
import './App.css';
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  useParams,
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
  BoardDetailsPage,
  BoardUploadPage,
  BoardModifyPage,
  MyPage,
  VerifyPage,
  LogOutPage,
  NotFound,
  FoodSearchPage,
  PasswordChangePage,
  Member,
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
            <Route
              path="food/*"
              element={
                <FilteredRoute validSubUrls={['image']} authSubUrls={['image']}>
                  <FoodSearchPage />
                </FilteredRoute>
              }
            />
            <Route path="board" element={<BoardPage />}>
              <Route path="upload" element={<BoardUploadPage />} />
              <Route path="modify/:id" element={<BoardModifyPage />} />
              <Route path="details/:id" element={<BoardDetailsPage />} />
            </Route>
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
            <Route path="member" element={<Member />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Initialize>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  </BrowserRouter>
);

const FilteredRoute = ({ validSubUrls, authSubUrls, children }) => {
  const { token } = useAuthContext();
  const location = useLocation();
  const params = useParams();
  const subUrl = Object.values(params)[0];
  const validList = useMemo(
    () => [undefined, '', ...validSubUrls],
    [validSubUrls],
  );
  const authList = useMemo(
    () =>
      authSubUrls.indexOf('.') !== -1
        ? [undefined, '', ...authSubUrls]
        : authSubUrls,
    [authSubUrls],
  );

  if (validList.indexOf(subUrl) === -1) {
    return <Navigate to="/not_found" replace />;
  }

  if (authList.indexOf(subUrl) !== -1 && !token.access) {
    return <Navigate to="/login" state={{ from: location }} />;
  }

  return children;
};

FilteredRoute.propTypes = {
  validSubUrls: PropTypes.arrayOf(string),
  authSubUrls: PropTypes.arrayOf(string),
  children: PropTypes.oneOfType([string, number, func, element]),
};

FilteredRoute.defaultProps = {
  validSubUrls: [],
  authSubUrls: [],
  children: null,
};

export default App;
