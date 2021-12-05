import React from 'react';
import { useQuery } from 'react-query';
import jiseekApi from '../../api';
import { myPageKeys } from '../../constants';
import { useLangContext, useAuthContext } from '../../contexts';
import FavoritePost from './FavoritePost';

const FavoritePostContainer = () => {
  const [lang] = useLangContext();
  const { token } = useAuthContext();
  const { data: favPosts, status } = useQuery(
    myPageKeys.favPosts,
    jiseekApi.get({ token: token.access }),
    { staleTime: Infinity, refetchOnWindowFocus: true },
  );

  return <FavoritePost favPosts={favPosts} status={status} lang={lang} />;
};

export default FavoritePostContainer;
