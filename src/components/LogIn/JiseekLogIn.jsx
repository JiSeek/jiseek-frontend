import React from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import PropTypes, { oneOfType, func, object } from 'prop-types';
import { StyledErrorMsg } from '../common';

const JiseekLogIn = ({ hookForm, isSubmitting }) => {
  const { t } = useTranslation();

  return (
    /* eslint-disable react/jsx-props-no-spreading */
    <form onSubmit={hookForm.onSubmit}>
      <StyledLogin>
        <label htmlFor="login-email">
          <input
            type="email"
            id="login-email"
            placeholder={t('signInEmail')}
            onInvalid={(e) => {
              e.preventDefault();
              e.target.focus();
            }}
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
            placeholder={t('signInPassword')}
            {...hookForm.register('password')}
          />
          <StyledErrorMsg>
            {hookForm.errors.password && hookForm.errors.password.message}
          </StyledErrorMsg>
        </label>
      </StyledLogin>
      <StyledButton disabled={isSubmitting} type="submit">
        {isSubmitting ? (
          <FontAwesomeIcon icon={faSpinner} size="lg" pulse />
        ) : (
          t('signIn')
        )}
      </StyledButton>
    </form>
  );
};

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
  position: relative;
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
