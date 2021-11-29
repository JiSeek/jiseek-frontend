import React from 'react';
import { useLocation, useMatch, Navigate, Outlet } from 'react-router-dom';
import { useAuthContext } from '../../contexts/AuthContext';
import { KakaoLogIn } from '../../components/LogIn';
import { useLangContext } from '../../contexts/LangContext';

const LogInPage = () => {
  const location = useLocation();
  const match = useMatch({ path: '/login', end: true });
  const { token } = useAuthContext();
  const [lang] = useLangContext();
  const from = location.state?.from?.pathname || '/';

  console.log('sdfsdfsdfsdfsdfsdfsdfsdf');
  if (token.access) {
    return <Navigate to={from} replace />;
  }

  // TODO: 소셜 로그인들 통합 컴포넌트화
  return (
    <div>
      {match && (
        <ul>
          <li>
            <KakaoLogIn lang={lang} />
          </li>
          <li>GoogleLogin</li>
          <li>NaverLogin</li>
        </ul>
      )}
      <Outlet />
    </div>
  );
};

export default LogInPage;
