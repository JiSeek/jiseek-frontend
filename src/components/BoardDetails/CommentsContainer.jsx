import React, { useState, useCallback } from 'react';
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
        toast.success(t('boardCreateSuccess', { what: t('boardComment') }), {
          toastId: 'boardCommentCreateSuccess',
        });
      },
      onError: () =>
        toast.error(
          t(
            'boardCreateErr',
            { what: t('boardComment') },
            {
              toastId: 'boardCommentCreateErr',
            },
          ),
        ),
      onSettled: () =>
        queryClient.invalidateQueries(boardKeys.commentsByPostId(postId)),
    },
  );

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
      onSuccess: () =>
        toast.success(t('boardDeleteSuccess', { what: t('boardComment') }), {
          toastId: 'boardCommentDeleteSuccess',
        }),
      onError: () =>
        toast.error(
          t(
            'boardDeleteErr',
            { what: t('boardComment') },
            { toastId: 'boardCommentDeleteErr' },
          ),
        ),
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
        toast.success(t('boardUpdateSuccess', { what: t('boardComment') }), {
          toastId: 'boardCommentUpdateSuccess',
        });
      },
      onError: () =>
        toast.error(t('boardUpdateErr', { what: t('boardComment') }), {
          toastId: 'boardCommentUpdateErr',
        }),
      onSettled: () =>
        queryClient.invalidateQueries(boardKeys.commentsByPostId(postId)),
    },
  );

  const handleTextInput = useCallback(
    (e) => {
      if (e.target.value.length > 255) {
        setText(e.target.value.slice(0, 255));
        toast.error(t('boardContentMaxErr', { what: t('boardComment') }), {
          toastId: 'boardCommentCreateMaxErr',
        });
        return;
      }
      setText(e.target.value);
    },
    [t],
  );

  const handleModifyInput = useCallback(
    (e) => {
      if (e.target.value.length > 255) {
        setModifiedText(e.target.value.slice(0, 255));
        toast.error(t('boardContentMaxErr', { what: t('boardComment') }), {
          toastId: 'boardCommentModifyMaxErr',
        });
        return;
      }
      setModifiedText(e.target.value);
    },
    [t],
  );

  const handleCreate = useCallback(
    (e) => {
      e.preventDefault();
      createComment(text);
    },
    [createComment, text],
  );

  const handleUpdate = useCallback(
    (id, content) => {
      if (onUpdateComment !== id) {
        setModifiedText(content);
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

      openModal(
        t('boardDeleteQuestion', { what: t('boardComment') }),
        'select',
        {
          yes: () => deleteComment(id),
          no: () => {},
        },
      );
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
      onTextInput={handleTextInput}
      onModifyInput={handleModifyInput}
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
