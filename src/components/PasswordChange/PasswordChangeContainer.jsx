import React, { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { useMutation } from 'react-query';
import jiseekApi from '../../api';
import { mutationKeys, getPasswordValidation } from '../../constants';
import { useAuthContext } from '../../contexts';
import PasswordChange from './PasswordChange';

const initialState = Object.freeze({
  old_password: '',
  new_password1: '',
  new_password2: '',
});

const PasswordChangeContainer = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { token } = useAuthContext();
  const {
    handleSubmit,
    formState: { errors },
    ...hookForm
  } = useForm({
    resolver: yupResolver(getPasswordValidation(t)),
    defaultValues: initialState,
  });

  const userPassword = useMutation(
    (newPassword) =>
      jiseekApi.post('/user/password/change/', {
        token: token.access,
        ...newPassword,
      }),
    {
      mutationKey: mutationKeys.password,
      onSuccess: () => {
        toast.success(
          t('myPageChgSuccess', { what: t('myPageChgPassword').toLowerCase() }),
          {
            toastId: 'myPagePasswordChgSuccess',
          },
        );
        navigate('/mypage');
      },
      // TODO: 비밀 번호 변경 오류 구별해서 띄우기.
      onError: () =>
        toast.error(t('myPageChgPasswordErr'), {
          toastId: 'myPageChgPasswordErr',
        }),
    },
  );

  const onSubmit = useCallback(
    (newPassword) => userPassword.mutate(newPassword),
    [userPassword],
  );

  return (
    <PasswordChange
      hookForm={{ ...hookForm, onSubmit: handleSubmit(onSubmit), errors }}
      isSubmitting={userPassword.status === 'loading'}
    />
  );
};

export default PasswordChangeContainer;
