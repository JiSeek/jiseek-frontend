import React from 'react';
import { useTranslation } from 'react-i18next';
import { useLocation, Navigate } from 'react-router-dom';
import styled from 'styled-components';
import { PasswordChange } from '../../components/PasswordChange';

const PasswordChangePage = () => {
  const location = useLocation();
  const { t } = useTranslation();

  if (!location.state) {
    return <Navigate to="/mypage" replace />;
  }

  return (
    <PasswordChangeStructure>
      <div>
        <Title>{t('myPageChgPasswordTitle')}</Title>
        <PasswordChange />
      </div>
    </PasswordChangeStructure>
  );
};

const PasswordChangeStructure = styled.div`
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

export default PasswordChangePage;
