import React from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import PropTypes, { oneOfType, func, object } from 'prop-types';
import { StyledErrorMsg } from '../common';

const PasswordChange = ({ hookForm, isSubmitting }) => {
  const { t } = useTranslation();

  return (
    /* eslint-disable react/jsx-props-no-spreading */
    <StyledChangeForm onSubmit={hookForm.onSubmit}>
      <label htmlFor="cur-pswrd">
        <input
          type="password"
          id="cur-pswrd"
          placeholder={t('myPageCurrentPassword')}
          {...hookForm.register('old_password')}
        />
        <StyledErrorMsg>
          {hookForm.errors.old_password && hookForm.errors.old_password.message}
        </StyledErrorMsg>
      </label>
      <label htmlFor="new-pswrd">
        <input
          type="password"
          id="new-pswrd"
          placeholder={t('myPageNewPassword')}
          {...hookForm.register('new_password1')}
        />
        <StyledErrorMsg>
          {hookForm.errors.new_password1 &&
            hookForm.errors.new_password1.message}
        </StyledErrorMsg>
      </label>
      <label htmlFor="pswrd-confirm">
        <input
          type="password"
          id="pswrd-confirm"
          placeholder={t('myPagePasswordConfirm')}
          {...hookForm.register('new_password2')}
        />
        <StyledErrorMsg>
          {hookForm.errors.new_password2 &&
            hookForm.errors.new_password2.message}
        </StyledErrorMsg>
      </label>
      <StyledButton disabled={isSubmitting} type="submit">
        {t('myPagePasswordChange')}
      </StyledButton>
    </StyledChangeForm>
  );
};

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
    width: 400px;
    height: 70px;

    > input {
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
        box-shadow: rgb(0 0 0 / 13%) 0px 1px 3px 0px,
          rgb(0 0 0 / 19%) 0px 1px 2px 0px;
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
