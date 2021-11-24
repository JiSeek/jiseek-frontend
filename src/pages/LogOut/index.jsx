import React, { useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { useSessionContext } from '../../contexts/SessionContext';

const LogOutPage = () => {
  const { clearToken } = useSessionContext();

  useEffect(() => clearToken(), [clearToken]);

  return <Navigate to="/" replace />;
};

export default LogOutPage;
