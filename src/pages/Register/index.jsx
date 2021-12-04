import React from 'react';
import styled from 'styled-components';
import { Navigate, useMatch, useLocation } from 'react-router-dom';
import { RegisterUser } from '../../components/Register';
import { useAuthContext } from '../../contexts';

const RegisterPage = () => {
  const { token } = useAuthContext();
  const match = useMatch({ path: '/register', end: true });
  const location = useLocation();
  console.log('로케', location);

  if (token.access) {
    return <Navigate to="/" replace />;
  }

  return (
    <StyledRegister>
      <Title>회원가입</Title>
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
