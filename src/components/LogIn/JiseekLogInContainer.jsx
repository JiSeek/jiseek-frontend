import React, { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { useMutation, useQueryClient } from 'react-query';
import jiseekApi from '../../api';
import { loginValidation, mutationKey, userKeys } from '../../constants';
import JiseekLogIn from './JiseekLogIn';
import { useAuthContext } from '../../contexts';

const initialState = Object.freeze({
  email: '',
  password: '',
});

const JiseekLogInContainer = () => {
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
      mutationKey: mutationKey.logIn,
      onSuccess: (data) => {
        console.log(data, '에러 메시지 확인용'); // TODO
        const { user, ...auth } = data;
        queryClient.setQueryData(userKeys.info, user);
        updateToken(auth);
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
    <JiseekLogIn
      hookForm={{ ...hookForm, onSubmit: handleSubmit(onSubmit), errors }}
      isSubmitting={userLogin.status === 'loading'}
    />
  );
};

export default JiseekLogInContainer;
