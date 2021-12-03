import React from 'react';
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

  return <div>{match && <RegisterUser />}</div>;
};

export default RegisterPage;
