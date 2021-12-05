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
        id="user-password"
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
        id="user-password--confirm"
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
        <>
          <Nation>
            국가
            <StyledErrorMsg>
              {hookForm.errors.publicTypes?.nation &&
                hookForm.errors.publicTypes?.nation.message}
            </StyledErrorMsg>
          </Nation>

          <StyledNation>
            <legend>국가</legend>
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
          </StyledNation>
        </>
      )}
    />
    <StyledButton type="submit">회원가입</StyledButton>
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
