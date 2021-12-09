import React, { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';
import { toast } from 'react-toastify';
import { useForm } from 'react-hook-form';
import { useMutation, useQueryClient } from 'react-query';
import jiseekApi from '../../api';
import { getLoginValidation, mutationKeys, userKeys } from '../../constants';
import JiseekLogIn from './JiseekLogIn';
import { useAuthContext } from '../../contexts';

const initialState = Object.freeze({
  email: '',
  password: '',
});

const JiseekLogInContainer = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { updateToken } = useAuthContext();
  const {
    handleSubmit,
    formState: { errors },
    ...hookForm
  } = useForm({
    resolver: yupResolver(getLoginValidation(t)),
    defaultValues: initialState,
  });

  const queryClient = useQueryClient();
  const userLogin = useMutation(
    (loginInfo) =>
      toast.promise(jiseekApi.post('/user/custom/login/', loginInfo), {
        toastId: 'loginToast',
        success: t('signInSuccess'),
        error: t('signInInfoErr'),
      }),
    {
      mutationKey: mutationKeys.logIn,
      onSuccess: (data) => {
        const { user, ...auth } = data;
        queryClient.setQueryData(userKeys.info, user);
        updateToken(auth);
        navigate('/', { replace: true });
      },
    },
  );

  const onSubmit = useCallback(
    (loginInfo) => userLogin.mutate(loginInfo),
    [userLogin],
  );

  return (
    <>
      <JiseekLogIn
        hookForm={{ ...hookForm, onSubmit: handleSubmit(onSubmit), errors }}
        isSubmitting={userLogin.status === 'loading'}
      />
    </>
  );
};

export default JiseekLogInContainer;
