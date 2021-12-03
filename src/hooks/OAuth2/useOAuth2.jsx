import { useEffect, useMemo, useState } from 'react';
import { useMutation } from 'react-query';
import { oAuth2 } from '../../api';

const useOAuth2 = (type, code, state) => {
  const [accessToken, setAccessToken] = useState(() =>
    type === 'email' ? code : '',
  );

  const additional = useMemo(() => {
    switch (type) {
      case 'kakao':
        return { redirect_uri: oAuth2[type].redirectUrl };
      case 'naver':
        return {
          client_secret: process.env.REACT_APP_NAVER_API_CLIENT_SECRET,
          state,
        };
      default:
        return {};
    }
  }, [type, state]);

  const { mutate } = useMutation(
    () =>
      oAuth2[type]?.getAccessToken('/token', {
        grant_type: 'authorization_code',
        client_id: oAuth2[type].apiKey,
        code,
        ...additional,
      }),
    {
      onSuccess: (data) => setAccessToken(data.access_token),
      onError: (err) => console.log('에러 테스트', err),
    },
  );

  useEffect(() => {
    if (type !== 'email') {
      mutate();
    }
  }, [type, mutate]);

  return accessToken;
};

export default useOAuth2;
