import React, { useEffect } from 'react';
import { useParams, useSearchParams, useNavigate } from 'react-router-dom';
import { useMutation, useQueryClient } from 'react-query';
import { useSessionContext } from '../../contexts/SessionContext';
import jiseekApi from '../../api';

const LogInAuthPage = () => {
  const navigate = useNavigate();
  const { type } = useParams();
  const [params] = useSearchParams();
  const { setToken } = useSessionContext();
  const queryClient = useQueryClient();

  const { mutate } = useMutation(
    (token) => jiseekApi.post(`/user/login/${type}`, { token }),
    {
      onSuccess: (data) => {
        const { access_token: token, ...user } = data;
        setToken(token);
        Object.keys(user).forEach((info) =>
          queryClient.setQueryData(info, user[info]),
        );
        navigate('/', { replace: true });
      },
      onError: () => {
        // 임시 땜빵 처리
        alert('로그인 인증 실패!');
        navigate('/login', { replace: true });
      },
    },
  );

  useEffect(() => mutate(params.get('code')), [params, mutate]);

  return <></>;
};

export default LogInAuthPage;
