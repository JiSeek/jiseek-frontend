import React, { useEffect, useCallback, useState } from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useMutation, useQueryClient } from 'react-query';
import { toast } from 'react-toastify';
import jiseekApi from '../../api';
import { useImageUploader } from '../../hooks/common';
import { boardKeys, mutationKeys } from '../../constants';
import BoardUpload from './BoardUpload';

const BoardUploadContainer = ({ user }) => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const queryClient = useQueryClient();
  const [content, setContent] = useState('');
  const { imageFile, renderImgUploader } = useImageUploader();

  // 게시판 생성 기능 (C)
  const { mutate: createPost } = useMutation(
    (sendData) =>
      jiseekApi.post('/boards/', {
        token: user.token,
        ...sendData,
        isForm: true,
      }),
    {
      mutationKey: mutationKeys.postCreate,
      onSuccess: ({ id }) => {
        toast.success(t('boardCreateSuccess', { what: t('boardPost') }), {
          toastId: 'boardPostCreateSuccess',
        });
        navigate(`/board/post/${id}`, { replace: true });
      },
      onError: () =>
        toast.error(t('boardCreateErr', { what: t('boardPost') }), {
          toastId: 'boardPostCreateErr',
        }),
      onSettled: () => queryClient.invalidateQueries(boardKeys.all),
    },
  );

  const onInput = useCallback(
    (e) => {
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

  const onSubmit = useCallback(
    (e) => {
      e.preventDefault();
      createPost({ photo: imageFile, content });
    },
    [imageFile, content, createPost],
  );

  const cancel = useCallback(async () => {
    await queryClient.cancelMutations(mutationKeys.postCreate);
  }, [queryClient]);

  useEffect(() => () => cancel(), [cancel]);

  return (
    <BoardUpload
      imageFile={imageFile}
      content={content}
      onInput={onInput}
      onSubmit={onSubmit}
    >
      {renderImgUploader()}
    </BoardUpload>
  );
};

BoardUploadContainer.propTypes = {
  user: PropTypes.objectOf(PropTypes.any),
};

BoardUploadContainer.defaultProps = {
  user: { id: -1, token: null },
};

export default BoardUploadContainer;
