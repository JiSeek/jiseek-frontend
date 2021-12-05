import React from 'react';
import PropTypes, { oneOfType, func, object } from 'prop-types';
import { Controller } from 'react-hook-form';
import styled from 'styled-components';
import { StyledErrorMsg } from '../common';

const RegisterUser = ({ hookForm }) => (
  /* eslint-disable react/jsx-props-no-spreading */
  <StyledRegisterForm onSubmit={hookForm.onSubmit}>
    <label htmlFor="user-email">
      <input
        type="email"
        id="user-email"
        placeholder="이메일"
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
        type="text"
        id="user-name"
        placeholder="닉네임"
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
        <StyledNation>
          <legend>국가</legend>
          <span>국가</span>
          <StyledCheckBox
            htmlFor="user-korean"
            checked={hookForm.getValues('publicTypes.nation') === 'korea'}
          >
            대한민국
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
            그 외
            <input
              type="radio"
              id="user-foreigner"
              name="user-nation"
              value="others"
              onChange={(e) => onChange(e.target.value)}
            />
          </StyledCheckBox>
          <StyledErrorMsg>
            {hookForm.errors.publicTypes?.nation &&
              hookForm.errors.publicTypes?.nation.message}
          </StyledErrorMsg>
        </StyledNation>
      )}
    />
    <button type="submit">회원가입</button>
  </StyledRegisterForm>
);

RegisterUser.propTypes = {
  hookForm: PropTypes.objectOf(oneOfType([func, object])).isRequired,
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

    > input {
      font-family: inherit;
      border: none;
      border-bottom: 2px solid #c1dda0;
      padding: 0.7rem 0.2rem 0.5rem 1rem;
      margin-top: 1.2rem;
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
