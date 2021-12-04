import React from 'react';
import styled from 'styled-components';
import PropTypes, { oneOfType, func, object } from 'prop-types';
import { StyledErrorMsg } from '../common';

const JiseekLogIn = ({ hookForm, isSubmitting }) => (
  /* eslint-disable react/jsx-props-no-spreading */
  <form onSubmit={hookForm.onSubmit}>
    <label htmlFor="login-email">
      <div>
        <StyledInput
          type="email"
          id="login-email"
          placeholder="이메일"
          {...hookForm.register('email')}
        />
      </div>
      <ErrorMessageArea>
        <StyledErrorMsg>
          {hookForm.errors.email && hookForm.errors.email.message}
        </StyledErrorMsg>
      </ErrorMessageArea>
    </label>
    <label htmlFor="login-pswrd">
      <div>
        <StyledInput
          type="password"
          id="login-pswrd"
          placeholder="비밀번호"
          {...hookForm.register('password')}
        />
      </div>
      <ErrorMessageArea>
        <StyledErrorMsg>
          {hookForm.errors.password && hookForm.errors.password.message}
        </StyledErrorMsg>
      </ErrorMessageArea>
    </label>
    <StyledButton disabled={isSubmitting} type="submit">
      로그인
    </StyledButton>
  </form>
);

JiseekLogIn.propTypes = {
  hookForm: PropTypes.objectOf(oneOfType([func, object])).isRequired,
  isSubmitting: PropTypes.bool,
};

JiseekLogIn.defaultProps = {
  isSubmitting: false,
};

const StyledInput = styled.input`
  font-family: inherit;
  border: none;
  border-bottom: 2px solid #c1dda0;
  padding: 0.7rem 0.2rem 0.5rem 1rem;
  width: 23.5rem;
  background: #fbfbfb;

  ::placeholder {
    color: #789180;
  }

  :focus {
    transition: 0.3s;
    box-shadow: rgba(0, 0, 0, 0.1) 0px 1px 3px 0px,
      rgba(0, 0, 0, 0.06) 0px 1px 2px 0px;
  }
`;

const ErrorMessageArea = styled.div`
  height: 1.2rem;
  padding-bottom: 0.5rem;
  padding-left: 0.3rem;
`;

const StyledButton = styled.button`
  font-size: 0.8rem;
  margin-top: 1rem;
  background-color: #407f00;
  color: #f6fff2;
  text-align: center;
  padding: 1rem 1.5rem;
  width: 100%;
  cursor: pointer;
  border: none;
`;

export default JiseekLogIn;
