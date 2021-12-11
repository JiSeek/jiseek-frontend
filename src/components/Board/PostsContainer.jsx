import React, { useCallback, useEffect, useMemo } from 'react';
// import { useTranslation } from 'react-i18next';
import { useQuery, useQueryClient } from 'react-query';
import jiseekApi from '../../api';
import { boardKeys } from '../../constants';
import Posts from './Posts';

const postsQueryOpt = {
  refetchOnWindowFocus: true,
  staleTime: 600000,
};

function PostsContainer() {
  // const { t } = useTranslation();

  // 게시판 목록 읽어오기 (R) : 좋아요순
  const { data: bestPosts, status: bestPostsStatus } = useQuery(
    boardKeys.best,
    jiseekApi.get(),
    {
      ...postsQueryOpt,
    },
  );

  // 게시판 목록 읽어오기 (R) : 최신순
  const { data: posts, status: postsStatus } = useQuery(
    boardKeys.all,
    jiseekApi.get(),
    {
      ...postsQueryOpt,
    },
  );

  const status = useMemo(() => {
    if (bestPostsStatus === 'loading' || postsStatus === 'loading') {
      return 'loading';
    }
    if (bestPostsStatus === 'error' || postsStatus === 'error') {
      return 'error';
    }
    if (bestPostsStatus === 'success' && postsStatus === 'success') {
      return 'success';
    }
    return 'idle';
  }, [bestPostsStatus, postsStatus]);

  // TODO: 테스트 필요
  const queryClient = useQueryClient();
  const cancel = useCallback(async () => {
    await queryClient.cancelQueries(boardKeys.all);
  }, [queryClient]);

  useEffect(() => () => cancel(), [cancel]);

  return <Posts status={status} bestPosts={bestPosts} posts={posts} />;
}

export default PostsContainer;
