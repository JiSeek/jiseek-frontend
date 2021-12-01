import React from 'react';
import PropTypes, { oneOfType, func, object } from 'prop-types';
import { StyledErrorMsg } from '../common';

const PasswordChange = ({ hookForm, isSubmitting }) => (
  /* eslint-disable react/jsx-props-no-spreading */
  <form onSubmit={hookForm.onSubmit}>
    <label htmlFor="cur-pswrd">
      현재 비밀번호:
      <input
        type="password"
        id="cur-pswrd"
        {...hookForm.register('old password')}
      />
      <StyledErrorMsg>
        {hookForm.errors['old password'] &&
          hookForm.errors['old password'].message}
      </StyledErrorMsg>
    </label>
    <label htmlFor="new-pswrd">
      새 비밀번호:
      <input
        type="password"
        id="new-pswrd"
        {...hookForm.register('new password1')}
      />
      <StyledErrorMsg>
        {hookForm.errors['new password1'] &&
          hookForm.errors['new password1'].message}
      </StyledErrorMsg>
    </label>
    <label htmlFor="pswrd-confirm">
      비밀번호 확인:
      <input
        type="password"
        id="pswrd-confirm"
        {...hookForm.register('new password2')}
      />
      <StyledErrorMsg>
        {hookForm.errors['new password2'] &&
          hookForm.errors['new password2'].message}
      </StyledErrorMsg>
    </label>
    <button disabled={isSubmitting} type="submit">
      변경
    </button>
  </form>
);

PasswordChange.propTypes = {
  hookForm: PropTypes.objectOf(oneOfType([func, object])).isRequired,
  isSubmitting: PropTypes.bool,
};

PasswordChange.defaultProps = {
  isSubmitting: false,
};

export default PasswordChange;
