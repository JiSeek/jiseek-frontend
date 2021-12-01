import React, { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { useMutation, useQueryClient } from 'react-query';
import jiseekApi from '../../api';
import { loginValidation, mutationKey, userKeys } from '../../constants';
import JiseekLogin from './JiseekLogin';
import { useAuthContext } from '../../contexts';

const initialState = Object.freeze({
  email: '',
  password: '',
});

const JiseekLoginContainer = () => {
  const navigate = useNavigate();
  const { updateToken } = useAuthContext();
  const queryClient = useQueryClient();

  const {
    handleSubmit,
    formState: { errors },
    ...hookForm
  } = useForm({
    resolver: yupResolver(loginValidation),
    defaultValues: initialState,
  });

  const userLogin = useMutation(
    (loginInfo) => jiseekApi.post('/user/custom/login/', loginInfo),
    {
      mutationKey: mutationKey.login,
      onSuccess: (data) => {
        const { user, ...auth } = data;
        updateToken(auth);
        queryClient.setQueryData(userKeys.info, user);
        navigate('/', { replace: true });
      },
      onError: (err) => console.error('임시 에러처리', err),
    },
  );

  const onSubmit = useCallback(
    (loginInfo) => userLogin.mutate(loginInfo),
    [userLogin],
  );

  return (
    <JiseekLogin
      hookForm={{ ...hookForm, onSubmit: handleSubmit(onSubmit), errors }}
      isSubmitting={userLogin.status === 'loading'}
    />
  );
};

export default JiseekLoginContainer;
