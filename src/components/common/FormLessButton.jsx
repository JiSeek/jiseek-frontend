import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const FormLessButton = ({ hidden, disabled, onClick, children }) => (
  <StyledButton
    disabled={disabled}
    type="button"
    hidden={hidden}
    onClick={onClick}
  >
    {children}
  </StyledButton>
);

FormLessButton.propTypes = {
  hidden: PropTypes.bool,
  disabled: PropTypes.bool,
  onClick: PropTypes.func,
  children: PropTypes.element,
};

FormLessButton.defaultProps = {
  hidden: false,
  disabled: false,
  onClick: null,
  children: null,
};

const StyledButton = styled.button`
  display: ${(props) => (props.hidden ? 'hidden' : 'inline')};
  background-color: transparent;
  border: none;
  outline: none;
  cursor: pointer;
  :disabled {
    cursor: not-allowed;
  }
`;

export default FormLessButton;
