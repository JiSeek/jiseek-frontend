import React from 'react';
import PropTypes, { oneOfType, func, object } from 'prop-types';
import { Controller } from 'react-hook-form';
import styled from 'styled-components';
import { StyledErrorMsg } from '../common';

const RegisterUser = ({ hookForm, storeChanged }) => (
  /* eslint-disable react/jsx-props-no-spreading */
  <StyledRegisterForm onSubmit={hookForm.onSubmit}>
    <label htmlFor="user-email">
      <input
        type="email"
        id="user-email"
        placeholder="이메일"
        {...hookForm.register('publicTypes.email', {
          onBlur: () => storeChanged(),
        })}
      />
      <StyledErrorMsg>
        {hookForm.errors.publicTypes?.email &&
          hookForm.errors.publicTypes?.email.message}
      </StyledErrorMsg>
    </label>
    <label htmlFor="user-password">
      <input
        type="password"
        id="user-passward"
        placeholder="비밀번호"
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
        id="user-passward--confirm"
        placeholder="비밀번호 확인"
        {...hookForm.register('privateTypes.password2')}
      />
      <StyledErrorMsg>
        {hookForm.errors.privateTypes?.password2 &&
          hookForm.errors.privateTypes?.password2.message}
      </StyledErrorMsg>
    </label>
    <label htmlFor="user-name">
      <input
        id="user-name"
        placeholder="닉네임"
        {...hookForm.register('publicTypes.name', {
          onBlur: () => storeChanged(),
        })}
      />
    </label>
    <Controller
      control={hookForm.control}
      name="publicTypes.isKorean"
      render={({ field: { value, onChange } }) => (
        <StyledNation>
          <legend>국가</legend>
          <span>국가</span>
          <StyledCheckBox htmlFor="user-korean" checked={value}>
            대한민국
            <input
              type="radio"
              id="user-korean"
              name="user-nation"
              onChange={() => {
                storeChanged();
                onChange(true);
                console.log('ffff', value);
              }}
            />
          </StyledCheckBox>
          <StyledCheckBox htmlFor="user-foreigner" checked={!value}>
            그 외
            <input
              type="radio"
              id="user-foreigner"
              name="user-nation"
              onChange={() => {
                storeChanged();
                onChange(false);
                console.log('eee', value);
              }}
            />
          </StyledCheckBox>
        </StyledNation>
      )}
    />
    <button type="submit">회원가입</button>
  </StyledRegisterForm>
);

RegisterUser.propTypes = {
  hookForm: PropTypes.objectOf(oneOfType([func, object])).isRequired,
  storeChanged: PropTypes.func,
};

RegisterUser.defaultProps = {
  storeChanged: null,
};

// 임시 디자인 처리
const StyledRegisterForm = styled.form`
  display: flex;
  flex-direction: column;

  > label {
    display: flex;
    flex-direction: column;
  }
`;

const StyledNation = styled.fieldset`
  border: none;
  padding: 0.5rem 1rem;

  > legend {
    width: 0;
    height: 0;
    font-size: 0;
  }
`;

const StyledCheckBox = styled.label`
  position: relative;
  display: flex;
  padding: 0.5rem 1rem;
  border: solid 1px black;
  border-radius: 10px;
  cursor: pointer;
  font-size: 1rem;
  background-color: ${({ checked }) => (checked ? ' #d7ccc0' : 'transparent')};

  > input {
    display: none;
  }
`;

export default RegisterUser;
