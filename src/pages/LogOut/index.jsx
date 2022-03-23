import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useMutation, useQueryClient } from 'react-query';
import { useNavigate, useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';
import jiseekApi from '../../api';
import { mutationKeys } from '../../constants';
import { useAuthContext } from '../../contexts';

const authUrls = [
  '/food/image',
  '/board/upload',
  '/mypage',
  '/mypage/info',
  '/ch_pswrd',
];

const LogOutPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { token, clearToken } = useAuthContext();
  const from = location.state?.from?.pathname || '/';

  const queryClient = useQueryClient();
  const { mutate } = useMutation(
    () =>
      jiseekApi.post('/user/logout-all/', {
        token: token.access,
        refresh_token: token.refresh,
        timeout: 3000,
      }),
    {
      onSuccess: async () => {
        await queryClient.cancelMutations(mutationKeys.token);
        clearToken();
        toast.success(t('signOutSuccess'), { toastId: 'signOutSuccess' });
      },
      onError: () =>
        toast.error(t('signOutFailErr'), { toastId: 'signOutFailErr' }),
      onSettled: () => {
        const redirectUrl = authUrls.indexOf(from) !== -1 ? '/' : from;
        navigate(redirectUrl, { replace: true });
      },
    },
  );

  useEffect(() => {
    if (!token.access) {
      navigate('/login', { replace: true, state: { from: '/logout' } });
      return;
    }
    mutate();
  }, [mutate, token.access, navigate]);

  return <></>;
};

export default LogOutPage;
