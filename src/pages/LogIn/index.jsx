import React from 'react';
import { useLocation, useMatch, Navigate, Outlet } from 'react-router-dom';
import { useAuthContext } from '../../contexts/AuthContext';
import { JiseekLogIn, KakaoLogIn, NaverLogIn } from '../../components/LogIn';
import { useLangContext } from '../../contexts/LangContext';

const LogInPage = () => {
  const location = useLocation();
  const match = useMatch({ path: '/login', end: true });
  const { token } = useAuthContext();
  const [lang] = useLangContext();
  const from = location.state?.from?.pathname || '/';

  if (token.access) {
    return <Navigate to={from} replace />;
  }

  // TODO: 소셜 로그인들 통합 컴포넌트화
  return (
    <div>
      {match && (
        <section>
          <h2>로그인</h2>
          <JiseekLogIn />
          <ul>
            <li>
              <KakaoLogIn lang={lang} />
              <NaverLogIn lang={lang} />
            </li>
            <li>GoogleLogin</li>
          </ul>
        </section>
      )}
      <Outlet />
    </div>
  );
};

export default LogInPage;
