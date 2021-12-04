import React from 'react';
import styled from 'styled-components';
import { useLocation, useMatch, Navigate, Outlet } from 'react-router-dom';
import { useAuthContext } from '../../contexts/AuthContext';
import {
  GoogleLogIn,
  JiseekLogIn,
  KakaoLogIn,
  NaverLogIn,
} from '../../components/LogIn';
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
          <Or>또는</Or>
          <ul>
            <li>
              <KakaoLogIn lang={lang} />
              <NaverLogIn lang={lang} />
              <GoogleLogIn lang={lang} />
            </li>
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
  text-align: center;
  margin-bottom: 2.5rem;
`;

const Or = styled.div`
  text-align: center;
  margin-top: 2.5rem;
  margin-bottom: 1.5rem;
  display: flex;
  flex-basis: 100%;
  align-items: center;
  /* color: rgba(0, 0, 0, 0.35); */
  font-size: 12px;
  /* margin: 8px 0px; */

  ::before,
  ::after {
    content: '';
    flex-grow: 1;
    background: #00110036;
    height: 1px;
    /* font-size: 0px; */
    /* line-height: 0px; */
    /* margin: 0px 16px; */
  }

  ::before {
    margin-right: 1.5rem;
  }
  ::after {
    margin-left: 1.5rem;
  }
`;

export default LogInPage;
