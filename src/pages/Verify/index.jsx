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

const VerifyPage = () => {
  const navigate = useNavigate();
  const { type } = useParams();
  const [params] = useSearchParams();
  const { updateToken } = useAuthContext();
  const queryClient = useQueryClient();

  useQuery(
    type === 'email' ? userKeys.emailAuth : userKeys.socialAuth(type),
    jiseekApi.get({ key: params.get('code') }),
    {
      enabled: !!params.get('code'),
      retry: false,
      onSuccess: (data) => {
        const { user, ...auth } = data;
        updateToken(auth);
        queryClient.setQueryData(userKeys.info, user);
        // navigate('/', { replace: true });
      },
      onError: () => {
        //       // 임시 땜빵 처리
        alert('로그인 인증 실패!');
        navigate('/login', { replace: true });
      },
    },
  );

  // TODO: 로딩 중 멀 넣을지 고민해봐야할듯...?
  return <>{!params.get('code') ? <Navigate to="/login" replace /> : <></>}</>;
};

export default VerifyPage;
