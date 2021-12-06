import React from 'react';
import PropTypes from 'prop-types';
import { useMutation, useQueryClient } from 'react-query';
import { useAuthContext } from '../../contexts';
import jiseekApi from '../../api';
import FormLessButton from './FormLessButton';
import LikeButton from './LikeButton';
import { mutationKeys, myPageKeys } from '../../constants';

/*
  Props:
    - type: 좋아요 대상 (food or board)
    - id: 좋아요 대상 id
      *주의: 게시판의 경우 상세 보기의 url에 해당 값이 포함되어 있음. 
    - data:
      *주의: 게시판의 경우 상세 보기의 url에 있는 id(pk)값을 data에 포함시켜줘야 함. => data = {id(url의 id값), ...}
    - initState: boolean 타입, 좋아요 초기 상태값
*/
const LikeButtonContainer = ({ type, id, like }) => {
  const { token } = useAuthContext();
  const key = type === 'board' ? myPageKeys.favPosts : myPageKeys.favFoods;

  const queryClinet = useQueryClient();
  const likeTarget = useMutation(
    () => jiseekApi.put(`/mypage/${type}/like/${id}/`, { token: token.access }),
    {
      mutationKey: mutationKeys.like,
      onSuccess: () => queryClinet.invalidateQueries(key),
      onError: () => {},
    },
  );

  return (
    <FormLessButton
      disable={likeTarget.isLoading}
      onClick={() => likeTarget.mutate()}
    >
      <LikeButton like={like} />
    </FormLessButton>
  );
};

LikeButtonContainer.propTypes = {
  type: PropTypes.oneOf(['board', 'food']).isRequired,
  id: PropTypes.number.isRequired,
  like: PropTypes.bool,
};

LikeButtonContainer.defaultProps = {
  like: false,
};

export default LikeButtonContainer;
