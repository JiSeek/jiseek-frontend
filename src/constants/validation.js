import * as yup from 'yup';

// TODO: i18n 적용 후 문구로 변환
export const registerValidation = yup.object({
  publicTypes: yup.object({
    email: yup
      .string()
      .required('필수 입력입니다.')
      .max(255, '최대 255자 이내로 입력해주세요.') // TODO: 테스트 필요
      .email('유효하지 않은 이메일 형식입니다.'),
    name: yup.string().max(20, '20자 이내로 입력해주세요.'),
    nation: yup
      .string()
      .oneOf(['korea', 'others'])
      .required('필수 입력입니다.'),
  }),
  privateTypes: yup.object({
    password1: yup
      .string()
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[~!@#$%*])[a-zA-Z\d~!@#$%*]{8,16}$/,
        '비밀번호는 최소 8자 이상 최대 16자 이하이며, 대소문자, 특수문자(~!@#$%*), 숫자를 1개 이상 포함해야 합니다.',
      )
      .required('필수 입력입니다.'),
    password2: yup
      .string()
      .oneOf([yup.ref('password1')], '입력한 비밀번호가 일치하지 않습니다.')
      .required('필수 입력입니다.'),
  }),
});

export const myInfoFormValidation = yup.object({
  name: yup.string().max(20, '20자 이내로 입력해주세요.'),
}); // TODO: 테스트 필요

export const passwordValidation = yup.object({
  'old password': yup.string().required('현재 비밀번호를 입력해주세요.'),
  'new password1': yup
    .string()
    .notOneOf(
      [yup.ref('old password')],
      '현재 비밀번호와 동일한 비밀번호를 사용할 수 없습니다.',
    )
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[~!@#$%*])[a-zA-Z\d~!@#$%*]{8,16}$/,
      '비밀번호는 최소 8자 이상 최대 16자 이하이며, 대소문자, 특수문자(~!@#$%*), 숫자를 1개 이상 포함해야 합니다.',
    )
    .required('변경할 비밀번호를 입력해주세요.'),
  'new password2': yup
    .string()
    .oneOf([yup.ref('new password1'), null], '비밀번호가 일치하지 않습니다.'),
});

export const loginValidation = yup.object({
  email: yup
    .string()
    .required('사용자 이메일을 입력해주세요.')
    .email('유효하지 않은 이메일 형식입니다.'),
  password: yup.string().required('사용자 비밀번호를 입력해주세요.'),
});

// 영문 버전 예약
// "The password must be between 8 and 16 characters long. also, contain at least 1 uppercase letter, 1 lowercase letter, 1 number and 1 special character"

// "Invalid email format."

// "Required"

// "The password you entered does not match."

// "Please enter your current password"

// "Please enter the password to change"

// "Please enter your user email."

// "Please enter your user password."
