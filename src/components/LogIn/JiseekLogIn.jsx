import React from 'react';
import styled from 'styled-components';
import PropTypes, { oneOfType, func, object } from 'prop-types';
import { StyledErrorMsg } from '../common';

const JiseekLogIn = ({ hookForm, isSubmitting }) => (
  /* eslint-disable react/jsx-props-no-spreading */
  <form onSubmit={hookForm.onSubmit}>
    <StyledLogin>
      <label htmlFor="login-email">
        <input
          type="email"
          id="login-email"
          placeholder="이메일"
          {...hookForm.register('email')}
        />
        <StyledErrorMsg>
          {hookForm.errors.email && hookForm.errors.email.message}
        </StyledErrorMsg>
      </label>
      <label htmlFor="login-pswrd">
        <input
          type="password"
          id="login-pswrd"
          placeholder="비밀번호"
          {...hookForm.register('password')}
        />
        <StyledErrorMsg>
          {hookForm.errors.password && hookForm.errors.password.message}
        </StyledErrorMsg>
      </label>
    </StyledLogin>
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

const StyledLogin = styled.div`
  > label {
    display: flex;
    flex-direction: column;
    height: 60px;

    > input {
      font-family: inherit;
      border: none;
      border-bottom: 2px solid #c1dda0;
      padding: 0.7rem 0.2rem 0.5rem 1rem;
      /* margin: 1rem 0 1rem 0; */
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

      :first-child {
        margin-top: 0;
      }
    }
  }
`;

const StyledButton = styled.button`
  font-size: 0.9rem;
  background-color: #407f00;
  color: #f6fff2;
  text-align: center;
  width: 100%;
  height: 50px;
  border-radius: 50px;
  cursor: pointer;
  border: none;
  margin-top: 0.5rem;
`;

export default JiseekLogIn;
