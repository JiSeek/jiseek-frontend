import React from 'react';
import styled from 'styled-components';
import PropTypes, { oneOfType, func, object } from 'prop-types';
import { StyledErrorMsg } from '../common';

const PasswordChange = ({ hookForm, isSubmitting }) => (
  /* eslint-disable react/jsx-props-no-spreading */
  <StyledChangeForm onSubmit={hookForm.onSubmit}>
      <label htmlFor="cur-pswrd">
        <input
          type="password"
          id="cur-pswrd"
          placeholder="현재 비밀번호"
          {...hookForm.register('old password')}
        />
        <StyledErrorMsg>
          {hookForm.errors['old password'] &&
            hookForm.errors['old password'].message}
        </StyledErrorMsg>
      </label>
      <label htmlFor="new-pswrd">
        <input
          type="password"
          id="new-pswrd"
          placeholder="새 비밀번호"
          {...hookForm.register('new password1')}
        />
        <StyledErrorMsg>
          {hookForm.errors['new password1'] &&
            hookForm.errors['new password1'].message}
        </StyledErrorMsg>
      </label>
      <label htmlFor="pswrd-confirm">
        <input
          type="password"
          id="pswrd-confirm"
          placeholder="비밀번호 확인"
          {...hookForm.register('new password2')}
        />
        <StyledErrorMsg>
          {hookForm.errors['new password2'] &&
            hookForm.errors['new password2'].message}
        </StyledErrorMsg>
      </label>
    <StyledButton disabled={isSubmitting} type="submit">
      변경
    </StyledButton>
  </StyledChangeForm>
);

PasswordChange.propTypes = {
  hookForm: PropTypes.objectOf(oneOfType([func, object])).isRequired,
  isSubmitting: PropTypes.bool,
};

PasswordChange.defaultProps = {
  isSubmitting: false,
};

const StyledChangeForm = styled.form`
  display: flex;
  flex-direction: column;
  margin: auto;
  width: 400px;

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

export default PasswordChange;
