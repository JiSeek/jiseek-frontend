import React, { useEffect, useCallback } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import { useNavigate } from 'react-router-dom';
import { useMutation } from 'react-query';
import { useForm } from 'react-hook-form';
import RegisterUser from './RegisterUser';
import jiseekApi from '../../api';
import { getLocalStorage, setLocalStorage } from '../../utils';
import { mutationKey, registerValidation } from '../../constants';

const initialState = Object.freeze({
  publicTypes: {
    email: '',
    name: '',
    isKorean: null,
  },
  privateTypes: {
    password1: '',
    password2: '',
  },
});

const RegisterUserContainer = () => {
  const navigate = useNavigate();
  const {
    watch,
    setValue,
    getValues,
    handleSubmit,
    formState: { errors },
    ...hookForm
  } = useForm({
    resolver: yupResolver(registerValidation),
    defaultValues: initialState,
  });

  // 새로고침 시 작성 내역 복구: 동작 X
  useEffect(() => {
    const record = getLocalStorage('jiseek_temporary', null);
    if (record) {
      console.log(record, 'sss');
      setValue('publicTypes', record);
    }
  }, [setValue]);

  const signUp = useMutation(
    ({ isKorean, ...userInfo }) =>
      jiseekApi.post('/user/register/', { userInfo, is_korean: isKorean }),
    {
      mutationKey: mutationKey.signUp,
      onSuccess: (
        data, // navigate('/', {replace: true});
      ) => navigate(data),
      onError: (err) => {
        // TODO: 에러 메시지 모달
        console.log('등록 임시 에러', err);
      },
    },
  );

  console.log('xxx', watch());
  const storeChanged = useCallback(
    () => setLocalStorage('jiseek_temporary', getValues('publicTypes')),
    [getValues],
  );

  const onSubmit = useCallback(
    (data) => {
      console.log('test', data);
      // signUp.mutate({ ...publicTypes, ...privateTypes });
      signUp.mutate(data);
      // rmLocalStorage()
    },
    [signUp],
  );

  return (
    <RegisterUser
      hookForm={{
        ...hookForm,
        onSubmit: handleSubmit(onSubmit),
        errors,
      }}
      storeChanged={storeChanged}
    />
  );
};

export default RegisterUserContainer;
