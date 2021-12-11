import React, { useCallback } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import { Trans, useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { useMutation } from 'react-query';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import RegisterUser from './RegisterUser';
import jiseekApi from '../../api';
import { useModalContext } from '../../contexts';
import { mutationKeys, getRegisterValidation } from '../../constants';

const initialState = Object.freeze({
  publicTypes: {
    email: '',
    name: '',
    nation: '',
  },
  privateTypes: {
    password1: '',
    password2: '',
  },
});

const RegisterUserContainer = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const openModal = useModalContext();
  const {
    setValue,
    getValues,
    handleSubmit,
    formState: { errors },
    ...hookForm
  } = useForm({
    resolver: yupResolver(getRegisterValidation(t)),
    defaultValues: initialState,
  });

  const signUp = useMutation(
    ({ nation, ...userInfo }) =>
      jiseekApi.post('/user/register/', {
        ...userInfo,
        is_korean: nation === 'korea',
      }),
    {
      mutationKey: mutationKeys.signUp,
      onSuccess: (_1, { email }) => {
        openModal(
          <article>
            <h2>{t('signUpEmailConfirmTitle')}</h2>
            <p>
              <Trans i18nKey="signUpEmailConfirmMsg">
                {t('signUpEmailConfirmContent', {
                  what: `<a href=${email} alt="확인 이메일">
                      ${email}
                    </a>`,
                })}
              </Trans>

              {/* {t('signUpEmailConfirmContent', {
                what: (
                  <a href={email} alt="이메일">
                    {email}
                  </a>
                ),
              })} */}
            </p>
          </article>,
        );
        navigate('/', { replace: true });
      },
      onError: (err) => {
        const { response } = err;
        const message = Object.values(response?.data)[0][0];
        let errMsg;
        if (message.includes('e-mail')) {
          errMsg = t('signUpSameEmailErr');
          toast.error(errMsg, { toastId: 'signUpSameEmailErr' });
        } else {
          errMsg = t('signUpServerErr');
          toast.error(errMsg, { toastId: 'signUpServerErr' });
        }
        // TODO: 동작X, 네트워크 연결 실패시 무한 로딩 문제
        // signUp.reset();
      },
    },
  );

  const onSubmit = useCallback(
    ({ publicTypes, privateTypes }) =>
      signUp.mutate({ ...publicTypes, ...privateTypes }),
    [signUp],
  );

  return (
    <RegisterUser
      hookForm={{
        ...hookForm,
        getValues,
        onSubmit: handleSubmit(onSubmit),
        errors,
      }}
      isSubmitting={signUp.status === 'loading'}
    />
  );
};

export default RegisterUserContainer;
