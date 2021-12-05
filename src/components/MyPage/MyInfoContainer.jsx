import React from 'react';
import { useQuery } from 'react-query';
import jiseekApi from '../../api';
import { userKeys } from '../../constants';
import { useAuthContext } from '../../contexts';
import MyInfo from './MyInfo';

const MyInfoContainer = () => {
  const { token } = useAuthContext();
  const { data: user, status } = useQuery(
    userKeys.info,
    jiseekApi.get({ token: token.access }),
    {
      cacheTime: Infinity, // TODO: 상태 확인하기!!
      staleTime: Infinity,
      enabled: !!token.access,
    },
  );

  return <MyInfo user={user} status={status} />;
};

export default MyInfoContainer;
