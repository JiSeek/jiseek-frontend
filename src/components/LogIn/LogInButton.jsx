import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const LogInButton = ({ logo, sns }) => (
  <StyledButton>
    <Logo src={logo} alt={`${sns}`} />
    <LogInMessage>{sns}</LogInMessage>
  </StyledButton>
);

LogInButton.propTypes = {
  logo: PropTypes.string,
  sns: PropTypes.string,
};

LogInButton.defaultProps = {
  logo: '',
  sns: '',
};

const StyledButton = styled.div`
  background: #e8ece6;
  margin: 1rem 0;
  display: grid;
  height: 50px;
  grid-template-columns: 2rem 1fr;
  padding: 0 1.5rem;
`;

const Logo = styled.img`
  width: 2rem;
  margin: auto 0;
  /* margin-left: 1.5rem; */
`;

const LogInMessage = styled.div`
  text-align: center;
  font-size: 0.9rem;
  font-weight: 500;
  margin: auto;
`;

export default LogInButton;
