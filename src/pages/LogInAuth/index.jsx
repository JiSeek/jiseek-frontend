import React, { useEffect } from 'react';
import { useParams, useSearchParams, useNavigate } from 'react-router-dom';
import { useMutation, useQueryClient } from 'react-query';
import { useAuthContext } from '../../contexts/AuthContext';
import jiseekApi from '../../api';

const LogInAuthPage = () => {
  const navigate = useNavigate();
  const { type } = useParams();
  const [params] = useSearchParams();
  const { updateToken } = useAuthContext();
  const queryClient = useQueryClient();

  console.log(type);
  const { mutate } = useMutation(
    (token) => jiseekApi.post(`/user/login/${type}/`, { token }),
    {
      mutationKey: 'loginAuth',
      onSuccess: (data) => {
        const { user, ...auth } = data;
        updateToken(auth);
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
