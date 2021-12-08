import React from 'react';
import PropTypes from 'prop-types';
import { useMutation, useQueryClient } from 'react-query';
import { useAuthContext } from '../../contexts';
import jiseekApi from '../../api';
import FormLessButton from './FormLessButton';
import LikeButton from './LikeButton';
import { mutationKeys, myPageKeys } from '../../constants';

const updateFavs = (like, preFavs, data) => {
  if (like) {
    return [...preFavs, data];
  }
  return preFavs.filter(({ pk }) => pk !== data.pk);
};

/*
  Props:
    - type: 좋아요 대상 (food or board)
    - id: 좋아요 대상 id
      *주의: 게시판의 경우 상세 보기의 url에 해당 값이 포함되어 있음. 
    - data:
      *주의: 게시판의 경우 상세 보기의 url에 있는 id(pk)값을 data에 포함시켜줘야 함. => data = {id(url의 id값), ...}
    - initState: boolean 타입, 좋아요 초기 상태값
*/
const LikeButtonContainer = ({ type, data, like }) => {
  const { token } = useAuthContext();
  const queryClient = useQueryClient();
  const key = type === 'board' ? myPageKeys.favPosts : myPageKeys.favFoods;

  const queryClinet = useQueryClient();
  const likeTarget = useMutation(
    ({ data: { pk } }) =>
      jiseekApi.put(`/mypage/${type}/like/${pk}/`, {
        token: token.access,
      }),
    {
      mutationKey: mutationKeys.like,
      onMutate: async (requset) => {
        await queryClient.cancelQueries(key);
        const previousFavs = queryClient.getQueryData(key);
        queryClinet.setQueryData(
          key,
          updateFavs(requset.like, previousFavs, requset.data),
        );
        return { previousFavs };
      },
      onSuccess: (res) => console.log('처리 상태: ', res),
      onError: (err, _, context) => {
        console.error('임시 에러', err);
        queryClinet.setQueryData(key, context.previousFavs);
      },
      onSettled: () => queryClinet.invalidateQueries(key),
    },
  );

  return (
    <FormLessButton
      onClick={() => {
        if (!data?.pk || data.pk === -1) {
          return;
        }
        likeTarget.mutate({ data, like: !like });
      }}
    >
      <LikeButton like={like} />
    </FormLessButton>
  );
};

LikeButtonContainer.propTypes = {
  type: PropTypes.oneOf(['board', 'food']).isRequired,
  data: PropTypes.objectOf(PropTypes.any),
  like: PropTypes.bool,
};

LikeButtonContainer.defaultProps = {
  data: {},
  like: false,
};

export default LikeButtonContainer;
