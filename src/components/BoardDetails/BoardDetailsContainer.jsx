import React, { useCallback, useEffect } from 'react';
import PropTypes, { string, number, object } from 'prop-types';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';
import { useModalContext } from '../../contexts';
import jiseekApi from '../../api';
import { boardKeys, mutationKeys } from '../../constants';
import { BoardLoadFailError, LoadingCircle } from '../../assets/images/images';
import BoardDetails from './BoardDetails';

const BoardDetailsContainer = ({ id, user }) => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const openModal = useModalContext();
  const queryClient = useQueryClient();

  // 게시판 조회 기능 (R)
  const { data: post, status } = useQuery(
    boardKeys.postById(id),
    jiseekApi.get({ token: user.token }),
    {
      refetchOnWindowFocus: true,
      staleTime: 600000,
      // cacheTime: 0,
    },
  );

  // TODO: 좋아요 개선 중....
  useEffect(() => {
    if (!user.token) {
      return;
    }
    queryClient.refetchQueries(boardKeys.postById(id), { exact: true });
    // user
  }, [id, user?.token, queryClient]);

  // 게시판 삭제 기능 (D)
  const { mutate: deletePost } = useMutation(
    () => jiseekApi.delete(`/boards/${id}/`, { token: user.token }),
    {
      mutationKey: mutationKeys.postDelete,
      onMutate: async () => {
        await queryClient.cancelQueries(boardKeys.postById(id));
      },
      onSuccess: () => {
        toast.success(t('boardDeleteSucc'));
        navigate('..');
      },
      onError: () => toast.error(t('boardDeleteErr')),
      onSettled: () => queryClient.invalidateQueries(boardKeys.all),
    },
  );

  const handleDelete = useCallback(() => {
    openModal('게시물을 삭제하시겠습니까?', 'select', {
      yes: () => deletePost(),
      no: () => {},
    });
  }, [openModal, deletePost]);

  return (
    <div>
      {/* 게시판 상세 정보 */}
      {status === 'error' && (
        <img src={BoardLoadFailError} alt="TODO: 에러 문구 넣기" />
      )}
      {status === 'loading' && (
        <img src={LoadingCircle} alt="TODO: 로딩 문구 넣기" />
      )}
      {status === 'success' && (
        <BoardDetails user={user} post={post} onDelete={handleDelete} />
      )}
    </div>
  );
};

BoardDetailsContainer.propTypes = {
  id: PropTypes.oneOfType([number, object]),
  user: PropTypes.objectOf(PropTypes.oneOfType([number, string])),
};

BoardDetailsContainer.defaultProps = {
  id: -1,
  user: { id: -1, token: null },
};

export default BoardDetailsContainer;
