import React from 'react';
import { useQuery } from 'react-query';
import jiseekApi from '../../api';
import { myPageKeys } from '../../constants';
import { useAuthContext } from '../../contexts';
import FavoritePost from './FavoritePost';

const FavoritePostContainer = () => {
  const { token } = useAuthContext();
  const { data: favPosts, status } = useQuery(
    myPageKeys.favPosts,
    jiseekApi.get({ token: token.access }),
    { staleTime: 5 * 60 * 1000, refetchOnWindowFocus: true },
  );

  return <FavoritePost favPosts={favPosts} status={status} />;
};

export default FavoritePostContainer;
