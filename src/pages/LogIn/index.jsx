import React from 'react';
import styled from 'styled-components';
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
    <StyledLogin>
      {match && (
        <section>
          <Title>로그인</Title>
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
    </StyledLogin>
  );
};

const StyledLogin = styled.div`
  padding: 4rem 0;
  max-width: 1320px;
  margin: auto;
  display: flex;
  justify-content: center;
`;

const Title = styled.div`
  font-size: 2.5rem;
  font-weight: 800;
`;

export default LogInPage;
