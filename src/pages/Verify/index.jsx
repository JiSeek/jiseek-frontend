import React, { useEffect } from 'react';
import {
  Navigate,
  useParams,
  useSearchParams,
  useNavigate,
} from 'react-router-dom';
import { useMutation, useQueryClient } from 'react-query';
import { useAuthContext } from '../../contexts';
import jiseekApi from '../../api';
import { mutationKeys, userKeys } from '../../constants';
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

  const { mutate } = useMutation(
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
      onSettled: () => rmLocalStorage('jiseek_state'),
    },
  );

  useEffect(() => {
    if (type === 'email' || accessToken) {
      mutate();
    }
  }, [type, accessToken, mutate]);

  if (!state) {
    return <Navigate to="/login" replace />;
  }

  // TODO: 로딩 중 멀 넣을지 고민해봐야할듯...?
  return <>{!params.get('code') ? <Navigate to="/login" replace /> : <></>}</>;
};

export default VerifyPage;
