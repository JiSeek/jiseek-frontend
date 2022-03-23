import React, { useEffect, useState } from 'react';
import {
  useParams,
  useSearchParams,
  useNavigate,
  useLocation,
} from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import styled from 'styled-components';
import { useMutation, useQueryClient } from 'react-query';
import { useAuthContext } from '../../contexts';
import jiseekApi, { oAuth2 } from '../../api';
import { mutationKeys, userKeys } from '../../constants';
import { Authentication } from '../../assets/images/images';

const VerifyPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { t } = useTranslation();
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
        toast.success(t('signInSuccess'), { toastId: 'signInAuthSuccess' });
        navigate('/', { replace: true });
      },
      onError: () => {
        toast.error(t('signInAuthFail'), { toastId: 'signInAuthFail' });
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
      onError: () => {
        toast.error(t('signInAuthFail'), { toastId: 'signInAuthFail' });
        navigate('/login', { replace: true });
      },
    },
  );

  // Access Token 획득
  useEffect(() => {
    switch (type) {
      case 'email':
        if (code) {
          setAccessToken(code);
          return;
        }
        break;
      case 'naver':
        const naver = new URLSearchParams(location.hash.replace('#', '?'));
        const accessTkn = naver.get('access_token');
        if (accessTkn) {
          setAccessToken(accessTkn);
          return;
        }
        break;
      case 'kakao':
        kakaoAccessTkn();
        return;
      default:
    }
    navigate('/login', { replace: true });
  }, [type, code, kakaoAccessTkn, location, navigate]);

  // Jiseek 서버로 Access Token 전송
  useEffect(() => {
    if (!accessToken) {
      return;
    }
    loginVerify();
  }, [accessToken, loginVerify]);

  return (
    <VerifyContainer>
      <img src={Authentication} alt="인증 이미지" />
    </VerifyContainer>
  );
};

const VerifyContainer = styled.div`
  height: 80vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export default VerifyPage;
