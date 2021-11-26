import React from 'react';
import { useQuery, useQueryClient } from 'react-query';
import { useNavigate, useLocation } from 'react-router-dom';
import jiseekApi from '../../api';
import { userKeys } from '../../constants';
import { useAuthContext } from '../../contexts';

const LogOutPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { token, clearToken } = useAuthContext();
  const from = location.state?.from?.pathname || '/';
  console.log('111', location, !!token.access && from === '/logout');
  // TODO: 초기 로그아웃으로 접근 개선

  useQuery(
    userKeys.logout,
    jiseekApi.get({ token: token.access, refresh_token: token.refresh }),
    {
      retry: false,
      staleTime: Infinity,
      enabled: !!token.access,
      onSuccess: (data) => {
        console.log('로그아웃 성공!', data);
        queryClient.removeQueries(userKeys.all);
        clearToken();
      },
      onError: () => {
        console.error('로그아웃 실패');
      },
      onSettled: () => {
        const privateUrl = /^\/mypage(\/\w*)?$/.test(from) ? '/' : from;
        navigate(privateUrl, { replace: true });
      },
    },
  );

  return <></>;
  // return <>{!token.access ? <Navigate to="/" replace /> : <></>}</>;
};

export default LogOutPage;
