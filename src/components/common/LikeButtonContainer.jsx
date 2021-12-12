import React, { useMemo } from 'react';
import PropTypes, { bool, any } from 'prop-types';
import { useTranslation } from 'react-i18next';
import { useMutation, useQueryClient } from 'react-query';
import { toast } from 'react-toastify';
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
    - like: boolean 타입, 좋아요 현재 상태값
    - refreshKey: 좋아요 반영 후 리프레쉬를 적용시킬 대상 key값.
*/
const LikeButtonContainer = ({ type, data, like, refreshKey }) => {
  const { t } = useTranslation();
  const { token } = useAuthContext();
  const queryClient = useQueryClient();
  const key = useMemo(
    () => (type === 'board' ? myPageKeys.favPosts : myPageKeys.favFoods),
    [type],
  );

  const queryClinet = useQueryClient();
  const likeTarget = useMutation(
    ({ data: { pk } }) =>
      jiseekApi.put(`/mypage/${type}/like/${pk}/`, {
        token: token.access,
      }),
    {
      mutationKey: mutationKeys.like,
      onMutate: async (request) => {
        await queryClient.cancelQueries(refreshKey || key);
        const previousFavs = queryClient.getQueryData(key);
        queryClinet.setQueryData(
          key,
          updateFavs(request.like, previousFavs || [], request.data),
        );
        return { previousFavs };
      },
      onSuccess: (res) => console.log('좋아요 상태: ', res),
      onError: (_1, _2, context) => {
        toast.error(t('myPageLikeApplyErr'), { toastId: 'likeApplyErr' });
        queryClinet.setQueryData(key, context.previousFavs);
      },
      onSettled: () => {
        if (refreshKey) {
          queryClinet.invalidateQueries(refreshKey);
        }
        queryClinet.invalidateQueries(key);
      },
    },
  );

  return (
    <FormLessButton
      disabled={!token.access}
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
  like: bool,
  refreshKey: PropTypes.oneOfType([any]),
};

LikeButtonContainer.defaultProps = {
  data: {},
  like: false,
  refreshKey: '',
};

export default LikeButtonContainer;
