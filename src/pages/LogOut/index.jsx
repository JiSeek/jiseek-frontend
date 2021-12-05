import React, { useEffect } from 'react';
import { useMutation } from 'react-query';
import { useNavigate, useLocation } from 'react-router-dom';
import jiseekApi from '../../api';
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
  const { token, clearToken } = useAuthContext();
  const from = location.state?.from?.pathname || '/';
  // TODO: 초기 로그아웃으로 접근 개선
  // console.log('111', location, !!token.access && from === '/logout');

  const { mutate } = useMutation(
    () =>
      jiseekApi.post('/user/logout-all/', {
        token: token.access,
        refresh_token: token.refresh,
      }),
    {
      onSuccess: (data) => {
        console.log('로그아웃 성공!', data);
        clearToken();
        // TODO: 실행 중인 뮤테이션 취소 해야됨.
      },
      onError: () => console.error('로그아웃 실패'), // 임시 에러처리
      onSettled: () => {
        const redirectUrl = authUrls.indexOf(from) !== -1 ? '/' : from;
        navigate(redirectUrl, { replace: true });
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
