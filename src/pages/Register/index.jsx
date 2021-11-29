import React from 'react';
import { Navigate } from 'react-router-dom';
import { RegisterUser } from '../../components/Register';
import { useAuthContext } from '../../contexts';

const RegisterPage = () => {
  const { token } = useAuthContext();

  if (token.access) {
    return <Navigate to="/" replace />;
  }

  return (
    <div>
      Register
      <RegisterUser />
    </div>
  );
};

export default RegisterPage;
