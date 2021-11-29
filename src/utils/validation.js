import * as yup from 'yup';

export const registerValidation = yup.object({
  publicTypes: {
    email: yup
      .string()
      .required('이메일을 입력해주세요.')
      .email('유효하지 않은 이메일 형식입니다.'),
    // TODO: 좀 더 알아보고 에러 처리좀 추가하기...
    name: yup.string(),
    isKorean: yup.boolean(),
  },
  privateTypes: {
    password1: yup.string().required('비밀번호를 입력해주세요.'),
    password2: yup
      .string()
      .oneOf([yup.ref('password1'), null], '비밀번호가 일치하지 않습니다.'),
  },
});
