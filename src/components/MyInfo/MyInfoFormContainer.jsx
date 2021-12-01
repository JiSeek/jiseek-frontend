import React, { useCallback, useEffect } from 'react';
import { useMutation, useQueryClient } from 'react-query';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import MyInfoForm from './MyInfoForm';
import jiseekApi from '../../api';
import { mutationKey, myInfoFormValidation, userKeys } from '../../constants';
import { useAuthContext } from '../../contexts';

// TODO: 파일 업로드 처리
const MyInfoFormContainer = () => {
  const queryClient = useQueryClient();
  const user = queryClient.getQueryData(userKeys.info);
  const { token } = useAuthContext();
  const {
    setValue,
    handleSubmit,
    formState: { errors },
    ...hookForm
  } = useForm({
    resolver: yupResolver(myInfoFormValidation),
    defaultValues: {
      image: user?.image,
      name: user?.name,
    },
  });

  // 새로고침 시 갱신 처리.
  useEffect(() => {
    if (!user || !Object.values(user).some((value) => !!value)) {
      return;
    }
    setValue('image', user.image);
    setValue('name', user.name);
  }, [user, setValue]);

  // TODO: 단일 변경 시 검사 후 Patch로 보낼지 검토...
  // TODO: queryClient로 할지 선반영할지
  const userInfoUpdate = useMutation(
    (userInfo) =>
      jiseekApi.put('/user/info/', { token: token.access, ...userInfo }),
    {
      mutationKey: mutationKey.userInfo,
      onSuccess: (data) => {
        setValue('image', data.image);
        setValue('name', data.name);
        queryClient.setQueryData(userKeys.info, data);
      },
      onError: (err) => console.error('임시 에러처리', err),
    },
  );

  const onSubmit = useCallback(
    (updateData) => userInfoUpdate.mutate(updateData),
    [userInfoUpdate],
  );

  return (
    <MyInfoForm
      hookForm={{
        ...hookForm,
        onSubmit: handleSubmit(onSubmit),
        errors,
      }}
      isSubmitting={userInfoUpdate.status === 'loading'}
    />
  );
};

export default MyInfoFormContainer;
