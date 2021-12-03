import React, { useEffect, useCallback } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import { useNavigate } from 'react-router-dom';
import { useMutation } from 'react-query';
import { useForm } from 'react-hook-form';
import RegisterUser from './RegisterUser';
import jiseekApi from '../../api';
import { getLocalStorage, rmLocalStorage, setLocalStorage } from '../../utils';
import { mutationKey, registerValidation } from '../../constants';

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
  const {
    setValue,
    getValues,
    handleSubmit,
    formState: { errors },
    ...hookForm
  } = useForm({
    resolver: yupResolver(registerValidation),
    defaultValues: initialState,
  });

  // TODO: 페이지 이동 시 작성 내역 삭제
  // 새로고침 시 작성 내역 복구
  useEffect(() => {
    const record = getLocalStorage('jiseek_temporary', null);
    if (record) {
      setValue('publicTypes', record);
    }
  }, [setValue]);

  const signUp = useMutation(
    ({ nation, ...userInfo }) =>
      jiseekApi.post('/user/register/', {
        ...userInfo,
        is_korean: nation === 'korea',
      }),
    {
      mutationKey: mutationKey.signUp,
      onSuccess: (data) => {
        // TODO: 모달 띄우고 확인 누르면 메인으로 가도록
        console.log(data, 'register');
        rmLocalStorage('jiseek_temporary');
        navigate('/', { replace: true });
      },
      onError: (err) => {
        // TODO: 에러 메시지 모달
        console.error('등록 임시 에러', err);
      },
    },
  );

  const storeChanged = useCallback(
    () => setLocalStorage('jiseek_temporary', getValues('publicTypes')),
    [getValues],
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
      storeChanged={storeChanged}
    />
  );
};

export default RegisterUserContainer;
