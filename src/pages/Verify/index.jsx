import React, { useEffect, useState } from 'react';
import {
  // Navigate,
  useParams,
  useSearchParams,
  useNavigate,
  useLocation,
} from 'react-router-dom';
import { useMutation, useQueryClient } from 'react-query';
import { useAuthContext } from '../../contexts';
import jiseekApi, { oAuth2 } from '../../api';
import { mutationKeys, userKeys } from '../../constants';

// TODO: 리다이렉트 문제...
const VerifyPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { type } = useParams();
  const [params] = useSearchParams();
  const { updateToken } = useAuthContext();
  const [accessToken, setAccessToken] = useState('');
  const queryClient = useQueryClient();
  const code = params.get('code');

  // Jiseek 서버로 Access Token 전송
  const { mutate: loginVerify } = useMutation(
    () =>
      jiseekApi.post(
        type === 'email'
          ? '/user/account-confirm-email/'
          : `/user/login/${type}/`,
        { key: accessToken },
      ),
    {
      mutationKey: mutationKeys.verify,
      onSuccess: (data) => {
        const { user, ...auth } = data;
        queryClient.setQueryData(userKeys.info, user);
        updateToken(auth);
        // TODO: 이메일 전송했다는 모달 창 띄우고 확인 누르면 이동하기.
        navigate('/', { replace: true });
      },
      onError: (err) => {
        // TODO: 에러 메시지 띄우고 머물러있기.
        alert('로그인 인증 실패!', err);
        navigate('/login', { replace: true });
      },
    },
  );

  // 카카오 로그인 인증
  const { mutate: kakaoAccessTkn } = useMutation(
    () =>
      oAuth2.kakao.getAccessToken('/token', {
        grant_type: 'authorization_code',
        client_id: oAuth2.kakao.apiKey,
        redirect_uri: oAuth2.kakao.redirectUrl,
        code,
      }),
    {
      mutationKey: mutationKeys.oAuth2,
      onSuccess: (data) => setAccessToken(data.access_token),
      onError: (err) => {
        // TODO: 에러 모달
        console.log('에러 테스트', err);
        navigate('/login', { replace: true });
      },
    },
  );

  // Access Token 획득
  useEffect(() => {
    switch (type) {
      case 'email':
        setAccessToken(code);
        break;
      case 'naver':
        const naver = new URLSearchParams(location.hash.replace('#', '?'));
        setAccessToken(naver.get('access_token'));
        break;
      case 'kakao':
        kakaoAccessTkn();
        break;
      default:
        navigate('/not_found', { replace: true });
        break;
    }
  }, [type, code, kakaoAccessTkn, location, navigate]);

  // Jiseek 서버로 Access Token 전송
  useEffect(() => {
    if (!accessToken) {
      return;
    }
    loginVerify();
  }, [accessToken, loginVerify]);

  // TODO: 로딩 중 멀 넣을지 고민해봐야할듯...?
  return <></>;
  // return <>{!params.get('code') ? <Navigate to="/login" replace /> : <></>}</>;
};

export default VerifyPage;
