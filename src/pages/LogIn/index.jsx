import React from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import {
  useLocation,
  useMatch,
  Navigate,
  Outlet,
  Link,
} from 'react-router-dom';
import { MdOutlineArrowForwardIos } from 'react-icons/md';
import { useAuthContext } from '../../contexts/AuthContext';
import { JiseekLogIn, KakaoLogIn, NaverLogIn } from '../../components/LogIn';

const LogInPage = () => {
  const location = useLocation();
  const { t } = useTranslation();
  const match = useMatch({ path: '/login', end: true });
  const { token } = useAuthContext();
  const from = location.state?.from?.pathname || '/';

  if (token.access) {
    return <Navigate to={from} replace />;
  }

  return (
    <StyledLogin>
      {match && (
        <section>
          <Title>{t('signIn')}</Title>
          <JiseekLogIn />
          <ToRegister>
            <span>{t('signInSignUpText')}</span>
            <Link to="/register">
              {t('signInSignUpLink')}
              <MdOutlineArrowForwardIos />
            </Link>
          </ToRegister>
          <Or>{t('signInOption')}</Or>
          <ul>
            <li>
              <KakaoLogIn />
            </li>
            <li>
              <NaverLogIn />
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
  width: 75vw;
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

const ToRegister = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 1.5rem 0.5rem 0 0.5rem;
  font-size: 0.95rem;
  > span {
    display: flex;
    align-items: center;
  }
  > a {
    font-weight: 500;
    display: flex;
    align-items: center;
    > svg {
      margin-left: 3px;
    }
  }
`;

const Or = styled.div`
  text-align: center;
  margin-top: ${(props) => (props.register ? '3rem' : '2.2rem')};
  margin-bottom: 1.5rem;
  display: flex;
  flex-basis: 100%;
  align-items: center;
  font-size: 12px;

  ::before,
  ::after {
    content: '';
    flex-grow: 1;
    background: #00110036;
    height: 1px;
  }

  ::before {
    margin-right: 1rem;
  }
  ::after {
    margin-left: 1rem;
  }
`;

export default LogInPage;
