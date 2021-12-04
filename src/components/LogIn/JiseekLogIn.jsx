import React from 'react';
import PropTypes, { oneOfType, func, object } from 'prop-types';
import { StyledErrorMsg } from '../common';

const JiseekLogIn = ({ hookForm, isSubmitting }) => (
  /* eslint-disable react/jsx-props-no-spreading */
  <form onSubmit={hookForm.onSubmit}>
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
    <button disabled={isSubmitting} type="submit">
      로그인
    </button>
  </form>
);

JiseekLogIn.propTypes = {
  hookForm: PropTypes.objectOf(oneOfType([func, object])).isRequired,
  isSubmitting: PropTypes.bool,
};

JiseekLogIn.defaultProps = {
  isSubmitting: false,
};

export default JiseekLogIn;
