import React, { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { useMutation } from 'react-query';
import jiseekApi from '../../api';
import { mutationKeys, passwordValidation } from '../../constants';
import { useAuthContext } from '../../contexts';
import PasswordChange from './PasswordChange';

const initialState = Object.freeze({
  'old password': '',
  'new password1': '',
  'new password2': '',
});

const PasswordChangeContainer = () => {
  const navigate = useNavigate();
  const { token } = useAuthContext();
  const {
    handleSubmit,
    formState: { errors },
    ...hookForm
  } = useForm({
    resolver: yupResolver(passwordValidation),
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
      onSuccess: (data) => {
        console.log('changed new password', data);
        navigate('/mypage');
      },
      onError: (err) => console.error('임시 에러처리', err),
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
