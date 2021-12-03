import React, { useEffect } from 'react';
import { useMutation, useQueryClient } from 'react-query';
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

  const { mutate } = useMutation(
    () =>
      jiseekApi.post('/user/logout-all/', {
        token: token.access,
        refresh_token: token.refresh,
      }),
    {
      onSuccess: (data) => {
        console.log('로그아웃 성공!', data);
        queryClient.removeQueries(userKeys.all);
        clearToken();
        // TODO: 실행 중인 뮤테이션 취소 해야됨.
      },
      onError: () => console.error('로그아웃 실패'), // 임시 에러처리
      onSettled: () => {
        const privateUrl = /^\/mypage(\/\w*)?$/.test(from) ? '/' : from;
        navigate(privateUrl, { replace: true });
      },
    },
  );

  useEffect(() => {
    if (!token.access) {
      return;
    }
    mutate();
  }, [mutate, token.access]);

  return <></>;
  // return <>{!token.access ? <Navigate to="/" replace /> : <></>}</>;
};

export default LogOutPage;
