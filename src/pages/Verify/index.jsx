import React from 'react';
import {
  Navigate,
  useParams,
  useSearchParams,
  useNavigate,
} from 'react-router-dom';
import { useQuery, useQueryClient } from 'react-query';
import { useAuthContext } from '../../contexts';
import jiseekApi from '../../api';
import { userKeys } from '../../constants';
import { getLocalStorage, rmLocalStorage } from '../../utils';
import useOAuth2 from '../../hooks/OAuth2/useOAuth2';

const verifyState = (type, state) => {
  if (type === 'naver') {
    return getLocalStorage('jiseek_state', null) === state;
  }
  return true;
};

// TODO: 리다이렉트 문제...
const VerifyPage = () => {
  const navigate = useNavigate();
  const { type } = useParams();
  const [params] = useSearchParams();
  const { updateToken } = useAuthContext();
  const queryClient = useQueryClient();
  const accessToken = useOAuth2(type, params.get('code'), params.get('state'));
  const state = verifyState(type, params.get('state'));

  // TODO: 이메일이랑 아닌 것 데이터 통일 좀 해야될 것 같음 key일지 token일지
  useQuery(
    type === 'email' ? userKeys.emailAuth : userKeys.socialAuth(type),
    jiseekApi.get({ token: accessToken }),
    {
      enabled: !!accessToken,
      retry: false,
      onSuccess: (data) => {
        const { user, ...auth } = data;
        queryClient.setQueryData(userKeys.info, user);
        updateToken(auth);
        navigate('/', { replace: true });
      },
      onError: () => {
        //       // 임시 땜빵 처리
        alert('로그인 인증 실패!');
        navigate('/login', { replace: true });
      },
      onSettled: () => rmLocalStorage('jiseek_state'),
    },
  );

  if (!state) {
    return <Navigate to="/login" replace />;
  }

  // TODO: 로딩 중 멀 넣을지 고민해봐야할듯...?
  return <>{!params.get('code') ? <Navigate to="/login" replace /> : <></>}</>;
};

export default VerifyPage;
