import * as yup from 'yup';

export const registerValidation = yup.object({
  publicTypes: {
    email: yup
      .string()
      .required('필수 입력 정보입니다.')
      .email('유효하지 않은 이메일 형식입니다.'),
    // TODO: 좀 더 알아보고 에러 처리좀 추가하기...
    name: yup.string(),
    isKorean: yup.boolean(),
  },
  privateTypes: {
    password1: yup.string().min().max().required('필수 입력 정보입니다.'),
    password2: yup
      .string()
      .oneOf(
        [yup.ref('privateTypes.password1')],
        '비밀번호가 일치하지 않습니다.',
      ) // /
      .required('필수 입력 정보입니다.'),
  },
});

export const myInfoFormValidation = yup.object({
  name: yup.string(),
});

// TODO: 현재 비밀번호랑 같지 않아야 함.
export const passwordValidation = yup.object({
  'old password': yup.string().required('현재 비밀번호를 입력해주세요.'),
  'new password1': yup.string().required('변경할 비밀번호를 입력해주세요.'),
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
