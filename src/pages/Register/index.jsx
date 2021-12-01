import React from 'react';
import { Navigate, useMatch } from 'react-router-dom';
import { RegisterUser } from '../../components/Register';
import { useAuthContext } from '../../contexts';

const RegisterPage = () => {
  const { token } = useAuthContext();
  const match = useMatch({ path: '/register', end: true });

  if (token.access) {
    return <Navigate to="/" replace />;
  }

  return <div>{match && <RegisterUser />}</div>;
};

export default RegisterPage;
