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
      toast.error('접근할 수 없는 페이지입니다.', { toastId: '' });
      navigate('.', { replace: true });
    }
    setImageUrl(post.photo);
    setContent(post.content);
  }, [setImageUrl, modifyMode, post, user, navigate]);

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
        // TODO setContent?
        reset();
        navigate('.', { replace: true });
      },
      onError: () => toast.error('TODO: 글 수정 실패', { toastId: '' }),
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
        toast.success(t('boardDeleteSucc'));
        navigate('..');
      },
      onError: () => toast.error(t('boardDeleteErr')),
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
        toast.error(t('boardContentMaxErr'), { toastId: 'TODO:' });
        return;
      }
      setContent(e.target.value.slice(0, 255));
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
    openModal('게시물을 삭제하시겠습니까?', 'select', {
      yes: () => deletePost(),
      no: () => {},
    });
  }, [modifyMode, openModal, deletePost, navigate, reset, post]);

  // TODO: 테스트 필요
  const cancel = useCallback(async () => {
    await queryClient.cancelMutations(mutationKeys.postAll);
    await queryClient.cancelQueries(boardKeys.postById(id));
  }, [queryClient, id]);

  useEffect(() => () => cancel(), [cancel]);

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
