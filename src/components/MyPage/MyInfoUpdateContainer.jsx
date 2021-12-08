import React, { useCallback, useEffect, useState } from 'react';
import { useMutation, useQueryClient } from 'react-query';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import MyInfoUpdate from './MyInfoUpdate';
import jiseekApi from '../../api';
import {
  mutationKeys,
  getMyInfoFormValidation,
  userKeys,
} from '../../constants';
import { useAuthContext } from '../../contexts';
// import LOGO from '../../assets/images/logo/logo_ver3_2.png';

// TODO: 파일 업로드 처리
const MyInfoUpdateContainer = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const queryClient = useQueryClient();
  const user = queryClient.getQueryData(userKeys.info);
  const [imgUrl, setImgUrl] = useState(user?.image);
  const { token } = useAuthContext();
  const {
    watch,
    setValue,
    handleSubmit,
    formState: { errors },
    ...hookForm
  } = useForm({
    resolver: yupResolver(getMyInfoFormValidation(t)),
    defaultValues: { name: user?.name },
  });

  // 새로고침 시 갱신 처리.
  useEffect(() => {
    if (!user || !Object.values(user).some((value) => !!value)) {
      return;
    }
    setImgUrl(user.image);
    setValue('name', user.name);
  }, [user, setValue]);

  const userInfoUpdate = useMutation(
    ({ name, image }) => {
      const sendData = { token: token.access };
      if (name !== user.name && image !== user.image) {
        return jiseekApi.put('/user/info/', { ...sendData, name, image });
      }
      if (name !== user.name) {
        return jiseekApi.patch('/user/info/', { ...sendData, name });
      }
      return jiseekApi.patch('/user/info/', { ...sendData, image });
    },
    {
      mutationKey: mutationKeys.userInfo,
      onSuccess: (data) => {
        // TODO: 에러 메시지가 일루 올지 확인 필요
        setValue('image', data.image);
        setValue('name', data.name);
        queryClient.setQueryData(userKeys.info, data);
        navigate('/mypage');
      },
      onError: (err) => console.error('임시 에러처리', err),
    },
  );

  const onImgUpload = useCallback((e) => {
    const reader = new FileReader();
    reader.readAsDataURL(e.target.files[0]);
    reader.onload = (evt) => setImgUrl(evt.target.result);
  }, []);

  const onSubmit = useCallback(
    ({ name }) => userInfoUpdate.mutate({ name, image: imgUrl }),
    [userInfoUpdate, imgUrl],
  );

  return (
    <MyInfoUpdate
      hookForm={{
        ...hookForm,
        onSubmit: handleSubmit(onSubmit),
        errors,
      }}
      imgUrl={imgUrl}
      onImgUpload={onImgUpload}
      lockSubmit={
        userInfoUpdate.status === 'loading' ||
        !watch('name') ||
        (user?.name === watch('name') && user?.image === imgUrl)
      }
    />
  );
};

export default MyInfoUpdateContainer;
