import React from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import { Navigate, useMatch } from 'react-router-dom';
import { RegisterUser } from '../../components/Register';
import { useAuthContext } from '../../contexts';

const RegisterPage = () => {
  const { token } = useAuthContext();
  const { t } = useTranslation();
  const match = useMatch({ path: '/register', end: true });

  if (token.access) {
    return <Navigate to="/" replace />;
  }

  return (
    <StyledRegister>
      <Title>{t('signUpTitle')}</Title>
      <div>{match && <RegisterUser />}</div>
    </StyledRegister>
  );
};

const StyledRegister = styled.div`
  padding: 4rem 0;
  max-width: 1320px;
  margin: auto;
`;

const Title = styled.div`
  font-size: 2.5rem;
  font-weight: 800;
  text-align: center;
  margin-bottom: 2.5rem;
`;

export default RegisterPage;
