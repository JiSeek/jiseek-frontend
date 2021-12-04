import React from 'react';
import styled from 'styled-components';

const LoginButton = ({ logo, sns }) => (
  <StyledButton>
    <Logo src={logo} alt={`${sns} logo`} />
  </StyledButton>
);

const StyledButton = styled.div`
  background: #f0f3ee;
  width: 100%;
`;
const Logo = styled.img``;

export default LoginButton;
