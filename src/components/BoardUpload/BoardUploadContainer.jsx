import React, { useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useMutation, useQueryClient } from 'react-query';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { toast } from 'react-toastify';
import jiseekApi from '../../api';
import { useImageUploader } from '../../hooks/common';
import {
  boardKeys,
  getPostUploadValidation,
  mutationKeys,
} from '../../constants';
import BoardUpload from './BoardUpload';

const BoardUploadContainer = ({ user }) => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const queryClient = useQueryClient();

  // hook form
  const {
    handleSubmit,
    formState: { errors },
    ...hookForm
  } = useForm({
    resolver: yupResolver(getPostUploadValidation(t)),
    defaultValues: { photo: null, content: '' },
  });
  const { imageFile, renderImgUploader } = useImageUploader();

  // 게시판 생성 기능 (C)
  const { mutate: createPost } = useMutation(
    ({ content, photo }) =>
      jiseekApi.post('/boards/', {
        token: user.token,
        isForm: true,
        content,
        photo,
      }),
    {
      mutationKey: mutationKeys.postCreate,
      onSuccess: ({ id }) => {
        // TODO: 토스트
        toast.success(t('boardCreateSucc'), { toastId: 'TODO' });
        navigate(`/board/post/${id}`, { replace: true });
      },
      onError: () => toast.error(t('boardCreateErr'), { toastId: 'TODO' }),
      onSettled: () => queryClient.invalidateQueries(boardKeys.all),
    },
  );

  const onSubmit = useCallback(
    ({ content }) => createPost({ photo: imageFile, content }),
    [imageFile, createPost],
  );

  const cancel = useCallback(async () => {
    await queryClient.cancelMutations(mutationKeys.postCreate);
  }, [queryClient]);

  useEffect(() => () => cancel(), [cancel]);

  return (
    <BoardUpload
      hookForm={{
        ...hookForm,
        onSubmit: handleSubmit(onSubmit),
        errors,
      }}
      imageFile={imageFile}
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
