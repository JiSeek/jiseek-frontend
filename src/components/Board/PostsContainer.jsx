import React, { useCallback, useEffect, useMemo } from 'react';
import { useInfiniteQuery, useQuery, useQueryClient } from 'react-query';
import jiseekApi from '../../api';
import { boardKeys } from '../../constants';
import Posts from './Posts';

const postsQueryOpt = {
  refetchOnWindowFocus: true,
  staleTime: 5 * 60 * 1000,
};

const PostsContainer = () => {
  // 게시판 목록 읽어오기 (R) : 좋아요순
  const { data: bestPosts, status: bestPostsStatus } = useQuery(
    boardKeys.best,
    jiseekApi.get(),
    {
      ...postsQueryOpt,
    },
  );

  // 게시판 목록 읽어오기 (R) : 최신순 (무한 스크롤)
  const {
    data: posts,
    status: postsStatus,
    ...boards
  } = useInfiniteQuery(
    boardKeys.all,
    ({ queryKey, pageParam = 1 }) =>
      jiseekApi.get({ page: pageParam })({ queryKey }),
    {
      getNextPageParam: (lastPage) => {
        if (!lastPage.next) {
          return undefined;
        }
        const param = new URLSearchParams(
          lastPage.next.slice(lastPage.next.indexOf('?')),
        );
        return param.get('page');
      },
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

  const queryClient = useQueryClient();
  const cancel = useCallback(async () => {
    await queryClient.cancelQueries(boardKeys.all);
  }, [queryClient]);

  useEffect(() => () => cancel(), [cancel]);

  return (
    <Posts
      status={status}
      bestPosts={bestPosts}
      posts={posts}
      boards={boards}
    />
  );
};

export default PostsContainer;
