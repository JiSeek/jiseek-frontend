import React from 'react';
import PropTypes from 'prop-types';
import { Controller } from 'react-hook-form';
import styled from 'styled-components';

const RegisterUser = ({
  watch,
  storeChanged,
  onSubmit,
  register,
  control,
  errors,
}) => (
  // const [readOnly] = useState(true);

  /* eslint-disable react/jsx-props-no-spreading */
  <StyledRegisterForm
    onSubmit={onSubmit}
    autoComplete="off"
    role="presentation"
  >
    <label htmlFor="user-email">
      <input
        defaultValue={watch('publicTypes.email')}
        type="email"
        id="user-email"
        placeholder="이메일"
        {...register('publicTypes.email', { onChange: () => storeChanged() })}
      />
      <StyledErrorMsg>
        {errors.publicTypes?.email && errors.publicTypes?.email.message}
      </StyledErrorMsg>
    </label>

    <label htmlFor="user-password">
      <input
        type="password"
        id="user-passward"
        placeholder="비밀번호"
        autoComplete="new-password"
        readOnly
        onFocus={(e) => e.target.removeAttribute('readonly')}
        {...register('privateTypes.password1')}
      />
      <StyledErrorMsg>
        {errors.privateTypes?.password1 &&
          errors.privateTypes?.password1.message}
      </StyledErrorMsg>
    </label>
    <label htmlFor="user-password--verify">
      <input
        type="password"
        id="user-passward--verify"
        placeholder="비밀번호 확인"
        autoComplete="false"
        {...register('privateTypes.password2')}
      />
      <StyledErrorMsg>
        {errors.privateTypes?.password2 &&
          errors.privateTypes?.password2.message}
      </StyledErrorMsg>
    </label>
    <label htmlFor="user-name">
      <input
        id="user-name"
        placeholder="닉네임"
        {...register('publicTypes.name', { onChange: () => storeChanged() })}
      />
    </label>
    <Controller
      control={control}
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
  watch: PropTypes.func.isRequired,
  storeChanged: PropTypes.func,
  onSubmit: PropTypes.func,
  register: PropTypes.func.isRequired,
  control: PropTypes.objectOf(PropTypes.any).isRequired,
  errors: PropTypes.objectOf(PropTypes.any),
};

RegisterUser.defaultProps = {
  storeChanged: null,
  onSubmit: null,
  errors: {},
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

const StyledErrorMsg = styled.span`
  color: red;
  font-size: 0.8rem;
`;

export default RegisterUser;
