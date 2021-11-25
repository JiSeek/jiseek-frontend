import React, { useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuthContext } from '../../contexts';

const LogOutPage = () => {
  const { clearToken } = useAuthContext();

  useEffect(() => clearToken(), [clearToken]);

  return <Navigate to="/" replace />;
};

export default LogOutPage;
