import React, { useCallback } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { useMutation } from 'react-query';
import { useForm } from 'react-hook-form';
import RegisterUser from './RegisterUser';
import jiseekApi from '../../api';
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
      onSuccess: (data) => {
        // TODO: 모달 띄우고 확인 누르면 메인으로 가도록
        console.log(data, 'register');
        navigate('/', { replace: true });
      },
      onError: (err) => {
        // TODO: 에러 메시지 모달
        console.error('등록 임시 에러', err);
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
    />
  );
};

export default RegisterUserContainer;
