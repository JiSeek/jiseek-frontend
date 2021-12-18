import React from 'react';
import PropTypes, { oneOfType, func, object } from 'prop-types';
import { useTranslation } from 'react-i18next';
import { Controller } from 'react-hook-form';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { StyledErrorMsg } from '../common';

const RegisterUser = ({ hookForm, isSubmitting }) => {
  const { t } = useTranslation();

  return (
    /* eslint-disable react/jsx-props-no-spreading */
    <StyledRegisterForm onSubmit={hookForm.onSubmit}>
      <label htmlFor="user-email">
        <input
          type="email"
          id="user-email"
          placeholder={t('signUpEmail')}
          onInvalid={(e) => {
            e.preventDefault();
            e.target.focus();
          }}
          {...hookForm.register('publicTypes.email')}
        />
        <StyledErrorMsg>
          {hookForm.errors.publicTypes?.email &&
            hookForm.errors.publicTypes?.email.message}
        </StyledErrorMsg>
      </label>
      <label htmlFor="user-password">
        <input
          type="password"
          id="user-password"
          placeholder={t('signUpPassword')}
          {...hookForm.register('privateTypes.password1')}
        />
        <StyledErrorMsg>
          {hookForm.errors.privateTypes?.password1 &&
            hookForm.errors.privateTypes?.password1.message}
        </StyledErrorMsg>
      </label>
      <label htmlFor="user-password--confirm">
        <input
          type="password"
          id="user-password--confirm"
          placeholder={t('signUpVerifyPassword')}
          {...hookForm.register('privateTypes.password2')}
        />
        <StyledErrorMsg>
          {hookForm.errors.privateTypes?.password2 &&
            hookForm.errors.privateTypes?.password2.message}
        </StyledErrorMsg>
      </label>
      <label htmlFor="user-name">
        <input
          type="text"
          id="user-name"
          placeholder={t('signUpNickname')}
          {...hookForm.register('publicTypes.name')}
        />
        <StyledErrorMsg>
          {hookForm.errors.publicTypes?.name &&
            hookForm.errors.publicTypes?.name.message}
        </StyledErrorMsg>
      </label>
      <Controller
        control={hookForm.control}
        name="publicTypes.nation"
        render={({ field: { onChange } }) => (
          <>
            <Nation>
              {t('signUpCountry')}
              <StyledErrorMsg>
                {hookForm.errors.publicTypes?.nation &&
                  hookForm.errors.publicTypes?.nation.message}
              </StyledErrorMsg>
            </Nation>
            <StyledNation>
              <legend>{t('signUpCountry')}</legend>
              <StyledCheckBox
                htmlFor="user-korean"
                checked={hookForm.getValues('publicTypes.nation') === 'korea'}
              >
                {t('signUpCountryKorea')}
                <input
                  type="radio"
                  id="user-korean"
                  name="user-nation"
                  value="korea"
                  onChange={(e) => onChange(e.target.value)}
                />
              </StyledCheckBox>
              <StyledCheckBox
                htmlFor="user-foreigner"
                checked={hookForm.getValues('publicTypes.nation') === 'others'}
              >
                {t('signUpCountryOthers')}
                <input
                  type="radio"
                  id="user-foreigner"
                  name="user-nation"
                  value="others"
                  onChange={(e) => onChange(e.target.value)}
                />
              </StyledCheckBox>
            </StyledNation>
          </>
        )}
      />
      <StyledButton disabled={isSubmitting} type="submit">
        {isSubmitting ? (
          <FontAwesomeIcon icon={faSpinner} size="lg" pulse />
        ) : (
          t('signUpSubmit')
        )}
      </StyledButton>
    </StyledRegisterForm>
  );
};

RegisterUser.propTypes = {
  hookForm: PropTypes.objectOf(oneOfType([func, object])).isRequired,
  isSubmitting: PropTypes.bool,
};

RegisterUser.defaultProps = {
  isSubmitting: false,
};

// 임시 디자인 처리
const StyledRegisterForm = styled.form`
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
      /* margin: 1rem 0 1rem 0; */
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

const Nation = styled.span`
  margin: 0.5rem;
  margin-top: 0;

  > span {
    margin-left: 0.5rem;
  }
`;

const StyledNation = styled.fieldset`
  border: none;
  display: flex;
  box-shadow: 0 0 0 3px #c1dda0 inset;
  border-radius: 50px;
  padding: 0 3px;
  height: 50px;
  > legend {
    width: 0;
    height: 0;
    font-size: 0;
  }
`;

const StyledCheckBox = styled.label`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 50%;
  height: 50px;
  border-radius: 50px;
  cursor: pointer;
  background-color: ${({ checked }) => (checked ? ' #c1dda0' : 'transparent')};

  > input {
    display: none;
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
  margin-top: 3rem;
`;

export default RegisterUser;
