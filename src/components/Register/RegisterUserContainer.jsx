import React, { useEffect, useCallback } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import { useNavigate } from 'react-router-dom';
import { useMutation } from 'react-query';
import { useForm } from 'react-hook-form';
import RegisterUser from './RegisterUser';
import jiseekApi from '../../api';
import { registerValidation, setLocalStorage } from '../../utils';

const initialValues = {
  publicTypes: {
    email: '',
    name: '',
    isKorean: true,
  },
  privateTypes: {
    password1: '',
    password2: '',
  },
};

const RegisterUserContainer = () => {
  const navigate = useNavigate();
  const {
    watch,
    reset,
    control,
    getValues,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(registerValidation),
    defaultValues: initialValues,
  });

  // 새로고침 시 작성 내역 복구: 동작 X
  useEffect(() => {
    const record = window.localStorage.getItem('jiseek_temporary');
    if (record) {
      reset({ initialValues, publicTypes: JSON.parse(record) });
    }
  }, [reset]);

  const { mutate } = useMutation(
    ({ isKorean, ...userInfo }) =>
      jiseekApi.post('/user/register/', { userInfo, is_korean: isKorean }),
    {
      mutationKey: 'register', // retry: 3,
      onSuccess: (
        data, // navigate('/', {replace: true});
      ) => navigate(data),
      onError: (err) => {
        // TODO: 에러 메시지 모달
        console.log('등록 임시 에러', err);
      },
    },
  );

  const storeChanged = useCallback(
    () =>
      setLocalStorage('jiseek_temporary', {
        publicTypes: getValues('publicTypes'),
      }),
    [getValues],
  );

  const onSubmit = useCallback(
    ({ publicTypes, privateTypes }) =>
      mutate({ ...publicTypes, ...privateTypes }),
    [mutate],
  );

  return (
    <RegisterUser
      watch={watch}
      storeChanged={storeChanged}
      onSubmit={handleSubmit(onSubmit)}
      register={register}
      control={control}
      errors={errors}
    />
  );
};

export default RegisterUserContainer;
