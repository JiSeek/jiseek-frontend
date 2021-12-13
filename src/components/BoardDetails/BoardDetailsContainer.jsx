import React, { useCallback, useEffect, useState, useRef } from 'react';
import PropTypes, { string, number, object } from 'prop-types';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { toast } from 'react-toastify';
import { useModalContext } from '../../contexts';
import jiseekApi from '../../api';
import { boardKeys, mutationKeys } from '../../constants';
import { BoardLoadFailError, LoadingCircle } from '../../assets/images/images';
import BoardDetails from './BoardDetails';
import { useImageUploader } from '../../hooks/common';

const BoardDetailsContainer = ({ id, user, modifyMode }) => {
  const ref = useRef(null);
  const navigate = useNavigate();
  const { t } = useTranslation();
  const openModal = useModalContext();
  const [content, setContent] = useState('');
  const queryClient = useQueryClient();
  const { setImageUrl, imageFile, reset, renderImgUploader } =
    useImageUploader();

  // 게시글 조회 기능 (R)
  const { data: post, status } = useQuery(
    boardKeys.postById(id),
    jiseekApi.get({ token: user.token }),
    {
      refetchOnWindowFocus: true,
      staleTime: 5 * 60 * 1000,
    },
  );

  useEffect(() => {
    if (!modifyMode || !post?.user?.pk || user?.id === -1) {
      return;
    }
    if (post.user.pk !== user.id) {
      toast.error(t('boardAccessErr'), { toastId: 'boardAccessErr' });
      navigate('.', { replace: true });
    }
    setImageUrl(post.photo);
    setContent(post.content);
  }, [setImageUrl, modifyMode, post, user, navigate, t]);

  // 게시글 수정 기능(U)
  const { mutate: updatePost } = useMutation(
    (sendData) =>
      jiseekApi.patch(`/boards/${id}/`, {
        token: user.token,
        ...sendData,
        isForm: true,
      }),
    {
      mutationKey: mutationKeys.postUpdate,
      onMutate: async () => {
        await queryClient.cancelQueries(boardKeys.postById(id));
      },
      onSuccess: (data) => {
        queryClient.setQueryData(boardKeys.postById(id), data);
        toast.success(t('boardUpdateSuccess', { what: t('boardPost') }), {
          toastId: 'boardPostUpdateSuccess',
        });
        reset();
        navigate('.', { replace: true });
      },
      onError: () =>
        toast.error(t('boardUpdateErr', { what: t('boardPost') }), {
          toastId: 'boardPostUpdateErr',
        }),
      onSettled: () => queryClient.invalidateQueries(boardKeys.postById(id)),
    },
  );

  // 게시글 삭제 기능 (D)
  const { mutate: deletePost } = useMutation(
    () => jiseekApi.delete(`/boards/${id}/`, { token: user.token }),
    {
      mutationKey: mutationKeys.postDelete,
      onMutate: async () => {
        await queryClient.cancelQueries(boardKeys.postById(id));
      },
      onSuccess: () => {
        toast.success(t('boardDeleteSuccess', { what: t('boardPost') }), {
          toastId: 'boardPostDeleteSuccess',
        });
        navigate('..');
      },
      onError: () =>
        toast.error(t('boardDeleteErr', { what: t('boardPost') }), {
          toastId: 'boardPostDeleteErr',
        }),
      onSettled: () => queryClient.invalidateQueries(boardKeys.all),
    },
  );

  useEffect(() => {
    if (ref === null || ref.current === null) {
      return;
    }
    ref.current.style.height = '38px';
    ref.current.style.height = `${ref.current.scrollHeight}px`;
  }, []);

  const handleInput = useCallback(
    (e) => {
      if (ref && ref.current) {
        ref.current.style.height = '38px';
        ref.current.style.height = `${ref.current.scrollHeight}px`;
      }
      if (e.target.value.length > 255) {
        setContent(e.target.value.slice(0, 255));
        toast.error(t('boardContentMaxErr', { what: t('boardPost') }), {
          toastId: 'boardPostCreateMaxErr',
        });
        return;
      }
      setContent(e.target.value);
    },
    [t],
  );

  const handleUpdate = useCallback(
    (e) => {
      e.preventDefault();
      const sendData = {};
      if (content !== post.content) {
        sendData.content = content;
      }
      if (imageFile) {
        sendData.photo = imageFile;
      }
      updatePost(sendData);
    },
    [content, imageFile, post, updatePost],
  );

  const handleCancelDelete = useCallback(() => {
    if (modifyMode) {
      reset();
      setContent(post.content);
      navigate('.', { replace: true });
      return;
    }
    openModal(t('boardDeleteQuestion', { what: t('boardPost') }), 'select', {
      yes: () => deletePost(),
      no: () => {},
    });
  }, [modifyMode, openModal, deletePost, navigate, reset, post, t]);

  // TODO: 테스트 필요
  const cancel = useCallback(async () => {
    await queryClient.cancelMutations(mutationKeys.postAll);
    await queryClient.cancelQueries(boardKeys.postById(id));
  }, [queryClient, id]);

  useEffect(() => () => cancel(), [cancel]);

  return (
    <div>
      {/* 게시판 상세 정보 */}
      {status === 'loading' && (
        <img src={LoadingCircle} alt="Post details loading..." />
      )}
      {status === 'error' && (
        <img src={BoardLoadFailError} alt="Failed to load Post details" />
      )}
      {status === 'success' && (
        <BoardDetails
          user={user}
          post={post}
          modifyMode={modifyMode}
          imageFile={imageFile}
          content={content}
          onInput={handleInput}
          onSubmit={handleUpdate}
          onCancelDelete={handleCancelDelete}
          ref={ref}
        >
          {renderImgUploader()}
        </BoardDetails>
      )}
    </div>
  );
};

BoardDetailsContainer.propTypes = {
  id: PropTypes.oneOfType([number, object]),
  modifyMode: PropTypes.bool,
  user: PropTypes.objectOf(PropTypes.oneOfType([number, string])),
};

BoardDetailsContainer.defaultProps = {
  id: -1,
  modifyMode: false,
  user: { id: -1, token: null },
};

export default BoardDetailsContainer;
