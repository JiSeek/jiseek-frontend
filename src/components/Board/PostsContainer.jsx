import React, { useCallback, useEffect, useMemo } from 'react';
import { useInfiniteQuery, useQuery, useQueryClient } from 'react-query';
import jiseekApi from '../../api';
import { boardKeys } from '../../constants';
import Posts from './Posts';

// TODO: 커뮤니티 내에서는 로드 데이터 유지하고 페이지 이동 시 초기화
// + 상세보기 들어갔다가 나왔을 때 스크롤 위치 유지.(21.12.19)
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

  // TODO: 테스트 필요
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
