import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const LogInButton = ({ logo, sns, background }) => (
  <StyledButton background={background} border={background}>
    <Logo src={logo} alt={`${sns}`} />
    <LogInMessage>{sns}</LogInMessage>
  </StyledButton>
);

LogInButton.propTypes = {
  logo: PropTypes.string,
  sns: PropTypes.string,
  background: PropTypes.string,
};

LogInButton.defaultProps = {
  logo: '',
  sns: '',
  background: '#e8ece6',
};

const StyledButton = styled.div`
  background: ${(props) => props.background};
  box-shadow: ${(props) =>
    props.background === '#FBFBFB' ? '0 0 0 3px #49494961 inset' : 'none'};
  border-radius: 50px;
  margin: 1rem 0;
  display: flex;
  justify-content: center;
  height: 50px;
  padding: 0 1.5rem;
`;

const Logo = styled.img`
  width: 2rem;
  margin: auto 0;
  /* margin-left: 1.5rem; */
`;

const LogInMessage = styled.div`
  /* text-align: center; */
  font-size: 0.9rem;
  font-weight: 500;
  margin: auto 0 auto 0.5rem;
`;

export default LogInButton;
