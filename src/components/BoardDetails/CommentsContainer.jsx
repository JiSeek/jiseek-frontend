import React, { useState, useEffect, useCallback } from 'react';
import PropTypes, { string, number } from 'prop-types';
import { useQuery, useMutation, useQueryClient } from 'react-query';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';
import { useModalContext } from '../../contexts';
import jiseekApi from '../../api';
import { boardKeys, mutationKeys } from '../../constants';
import Comments from './Comments';

const CommentsContainer = ({ postId, user, modifyMode }) => {
  const { t } = useTranslation();
  const openModal = useModalContext();
  const queryClient = useQueryClient();
  const [text, setText] = useState('');
  const [modifiedText, setModifiedText] = useState('');
  const [onUpdateComment, setOnUpdateComment] = useState(-1);

  // 댓글 조회 기능 (R)
  const { data: comments, status } = useQuery(
    boardKeys.commentsByPostId(postId),
    jiseekApi.get(),
    {
      refetchOnWindowFocus: true,
      staleTime: 5 * 60 * 1000,
    },
  );

  // 댓글 생성 기능 (C)
  const { mutate: createComment } = useMutation(
    (content) =>
      jiseekApi.post(`/boards/${postId}/comments/`, {
        token: user.token,
        content,
      }),
    {
      mutationKey: mutationKeys.commentCreate,
      onMutate: async () => {
        await queryClient.cancelQueries(boardKeys.commentsByPostId(postId));
      },
      onSuccess: () => {
        setText('');
        toast.success(t('boardCreateSucc'));
      },
      onError: () => toast.error(t('boardCreateErr')),
      onSettled: () =>
        queryClient.invalidateQueries(boardKeys.commentsByPostId(postId)),
    },
  );

  // 댓글 255자로 제한
  useEffect(() => {
    if (text.length > 255) {
      toast.warn(t('boardLimitedText'));
      setText(text.slice(0, 255));
    }
    if (modifiedText.length > 255) {
      toast.warn(t('boardLimitedText'));
      setText(modifiedText.slice(0, 255));
    }
  }, [text, modifiedText, t]);

  // 댓글 삭제 기능 (D)
  const { mutate: deleteComment } = useMutation(
    (id) =>
      jiseekApi.delete(`/boards/${postId}/comments/${id}/`, {
        token: user.token,
      }),
    {
      mutationKey: mutationKeys.commentDelete,
      onMutate: async () => {
        await queryClient.cancelQueries(boardKeys.commentsByPostId(postId));
      },
      onSuccess: () => toast.success(t('boardDeleteSucc')),
      onError: () => toast.error(t('boardDeleteErr')),
      onSettled: () => {
        queryClient.invalidateQueries(boardKeys.commentsByPostId(postId));
      },
    },
  );

  // 댓글 수정 기능 (U)
  const { mutate: updateComment } = useMutation(
    ({ id, content }) =>
      jiseekApi.put(`/boards/${postId}/comments/${id}/`, {
        token: user.token,
        content,
      }),
    {
      mutationKey: mutationKeys.commentUpdate,
      onMutate: async () => {
        await queryClient.cancelQueries(boardKeys.commentsByPostId(postId));
      },
      onSuccess: () => {
        setOnUpdateComment(-1);
        setModifiedText('');
        toast.success(t('boardUpdateSucc'), { toastId: 'TODO' });
      },
      onError: () => toast.error(t('boardUpdateErr'), { toastId: 'TODO' }),
      onSettled: () =>
        queryClient.invalidateQueries(boardKeys.commentsByPostId(postId)),
    },
  );

  const handleCreate = useCallback(
    (e) => {
      e.preventDefault();
      createComment(text);
    },
    [createComment, text],
  );

  const handleUpdate = useCallback(
    (id) => {
      if (onUpdateComment !== id) {
        setModifiedText('');
        setOnUpdateComment(id);
        return;
      }

      updateComment({ id, content: modifiedText });
    },
    [updateComment, modifiedText, onUpdateComment],
  );

  const handleDeleteCancel = useCallback(
    (id) => {
      if (onUpdateComment === id) {
        setModifiedText('');
        setOnUpdateComment(-1);
        return;
      }

      openModal(t('boardDeleteNor'), 'select', {
        yes: () => deleteComment(id),
        no: () => {},
      });
    },
    [openModal, deleteComment, t, onUpdateComment],
  );

  return (
    <Comments
      userId={user?.id}
      status={status}
      modifyMode={modifyMode}
      comments={comments}
      onUpdateComment={onUpdateComment}
      text={text}
      modifiedText={modifiedText}
      setText={setText}
      setModifiedText={setModifiedText}
      onCreate={handleCreate}
      onUpdate={handleUpdate}
      onDeleteCancel={handleDeleteCancel}
    />
  );
};

CommentsContainer.propTypes = {
  postId: PropTypes.number,
  user: PropTypes.objectOf(PropTypes.oneOfType([number, string])),
  modifyMode: PropTypes.bool,
};

CommentsContainer.defaultProps = {
  postId: -1,
  user: { id: -1, token: null },
  modifyMode: false,
};

export default CommentsContainer;
