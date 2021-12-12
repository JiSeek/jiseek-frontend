import * as yup from 'yup';

export const getRegisterValidation = (t) =>
  yup.object({
    publicTypes: yup.object({
      email: yup
        .string()
        .required(
          t('signUpRequiredErr', { what: t('signUpEmail').toLowerCase() }),
        )
        .max(255, t('signUpEmailMaxErr'))
        .email(t('signUpEmailFormErr')),
      name: yup
        .string()
        .max(20, t('signUpNicknameMaxErr'))
        .required(
          t('signUpRequiredErr', { what: t('signUpNickname').toLowerCase() }),
        ),
      nation: yup
        .string()
        .oneOf(['korea', 'others'])
        .required(t('signUpCountryRequiredErr')),
    }),
    privateTypes: yup.object({
      password1: yup
        .string()
        .matches(
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[~!@#$%*])[a-zA-Z\d~!@#$%*]{8,16}$/,
          t('signUpPasswordFormErr'),
        )
        .required(
          t('signUpRequiredErr', { what: t('signUpPassword').toLowerCase() }),
        ),
      password2: yup
        .string()
        .oneOf([yup.ref('password1')], t('signUpPasswordVerifyErr'))
        .required(
          t('signUpRequiredErr', {
            what: t('signUpVerifyPassword').toLowerCase(),
          }),
        ),
    }),
  });

// TODO: 내정보 수정 문구 추가
export const getMyInfoFormValidation = (t) =>
  yup.object({ name: yup.string().max(20, t('')) });

export const getPasswordValidation = (t) =>
  yup.object({
    old_password: yup.string().required(t('passwordChangeCurrentErr')),
    new_password1: yup
      .string()
      .notOneOf([yup.ref('old_password')], t('passwordChangeOldSameErr'))
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[~!@#$%*])[a-zA-Z\d~!@#$%*]{8,16}$/,
        t('passwordChangeNewFormErr'),
      )
      .required(t('passwordChangeNewRequiredErr')),
    new_password2: yup
      .string()
      .oneOf([yup.ref('new_password1'), null], t('passwordChangeVerifyErr')),
  });

export const getLoginValidation = (t) =>
  yup.object({
    email: yup
      .string()
      .required(
        t('signInRequiredErr', { what: t('signInEmail').toLowerCase() }),
      )
      .email(t('signInEmailFormErr')),
    password: yup
      .string()
      .required(
        t('signInRequiredErr', { what: t('signInPassword').toLowerCase() }),
      ),
  });

export const getPostUploadValidation = (t) =>
  yup.object({
    content: yup
      .string()
      .max(255, t('boardContentMaxErr'))
      .required(t('boardContentRequiredErr')),
  });
