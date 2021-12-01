import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import { useMutation, useQueryClient } from 'react-query';
import { useAuthContext } from '../../contexts';
import jiseekApi from '../../api';
import FormLessButton from './FormLessButton';
import LikeButton from './LikeButton';
import { mutationKey, myPagekeys } from '../../constants';

// TODO: 성능 개선 로직... 보류
// const addNewData = (list, type, data) => {
//   if (type === 'food') {
//     return list.unshift({
//       pk: data.id,
//       name: data.name,
//       image: data.image,
//     });
//   }
//   if (type === 'board') {
//     return list.unshift({
//       pk: data.id,
//       content: data.content,
//       created: data.created_at,
//     });
//   }
//   return list;
// };

// const removeData = (list, id) => list.filter((data) => data.pk !== id);

/*
  Props:
    - type: 좋아요 대상 (food or board)
    - id: 좋아요 대상 id
      *주의: 게시판의 경우 상세 보기의 url에 해당 값이 포함되어 있음. 
    - data:
      *주의: 게시판의 경우 상세 보기의 url에 있는 id(pk)값을 data에 포함시켜줘야 함. => data = {id(url의 id값), ...}
    - initState: boolean 타입, 좋아요 초기 상태값
*/
// const LikeButtonContainer = ({ type, id, data, initState }) => {
//
const LikeButtonContainer = ({ type, id, like }) => {
  const { token } = useAuthContext();
  const key = useRef(
    type === 'board' ? myPagekeys.favPost : myPagekeys.favFood,
  );

  const queryClinet = useQueryClient();
  const likeTarget = useMutation(
    () => jiseekApi.put(`/mypage/${type}/like/${id}/`, { token: token.access }),
    {
      mutationKey: mutationKey.like,
      onMutate: async () => {
        // 성능 개선을 위한 선반영 후복구 로직... 보류
        // await queryClinet.cancelQueries(key.current);
        // const previousList = queryClinet.getQueryData(key.current);
        // queryClinet.setQueryData(
        //   key.current,
        //   likeState
        //     ? addNewData(previousList, type, data)
        //     : removeData(previousList, id),
        // );
        // return { previousList };
      },
      onSuccess: () => {
        // Added or Removed 로직 필요할지??
        queryClinet.invalidateQueries(key.current);
      },
      onError: () => {},
      // onError: (_1, _2, context) =>
      // queryClinet.setQueryData(key.current, context.previousList),
    },
  );

  console.log(likeTarget.isLoading);
  return (
    <FormLessButton onClick={() => likeTarget.mutate()}>
      <LikeButton like={like} />
    </FormLessButton>
  );
};

LikeButtonContainer.propTypes = {
  type: PropTypes.oneOf(['board', 'food']).isRequired,
  id: PropTypes.number.isRequired,
  // data: PropTypes.objectOf(
  // PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  // ).isRequired,
  like: PropTypes.bool,
};

LikeButtonContainer.defaultProps = {
  like: false,
};

export default LikeButtonContainer;
