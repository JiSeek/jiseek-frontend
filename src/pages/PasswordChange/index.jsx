import React from 'react';
import styled from 'styled-components';
// import { Navigate } from 'react-router-dom';
import { PasswordChange } from '../../components/PasswordChange';

const PasswordChangePage = () => (
  <PasswordChangeStructure>
    <div>
      <Title>비밀번호 변경</Title>
      <PasswordChange />
    </div>
  </PasswordChangeStructure>
);

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
