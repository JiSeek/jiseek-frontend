import React from 'react';
import PropTypes, { oneOfType, number, string } from 'prop-types';
import { Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import CommentsContainer from './CommentsContainer';
import { getLocaleDate } from '../../utils';
import { LikeButton } from '../common';
import { boardKeys } from '../../constants';

const BoardDetails = ({
  user,
  post,
  modifyMode,
  imageFile,
  content,
  onInput,
  onSubmit,
  onCancelDelete,
  children,
}) => {
  const location = useLocation();
  const { t, i18n } = useTranslation();
  const from = location.state?.from?.pathname || '..';

  return (
    /* eslint-disable react/jsx-props-no-spreading */
    <div>
      <Link to={from}>이전</Link>
      <form onSubmit={onSubmit}>
        <div>
          {!modifyMode ? (
            <img src={post?.photo} alt="게시글 이미지" />
          ) : (
            children
          )}
        </div>
        {user?.id === post?.user?.pk && (
          <>
            <span>
              <button type="button" onClick={onCancelDelete}>
                {modifyMode ? '취소' : '삭제'}
              </button>
              {!modifyMode ? (
                <Link
                  to="./modify"
                  state={{ photo: post?.photo, content: post?.content }}
                >
                  수정
                </Link>
              ) : (
                <button
                  disabled={
                    content.length === 0 ||
                    (!imageFile && content === post.content)
                  }
                  type="submit"
                >
                  적용
                </button>
              )}
            </span>
          </>
        )}
        <span>{post?.user?.name}</span>
        {!modifyMode ? (
          <p>{post?.content}</p>
        ) : (
          <p>
            <textarea
              type="text"
              value={content}
              placeholder={t('boardPlaceHolder')}
              onInput={onInput}
            />
            <span>{content.length}/255</span>
          </p>
        )}
      </form>
      <span>{getLocaleDate(post?.created, i18n.language)}</span>
      <div>
        {!modifyMode && (
          <>
            <LikeButton
              type="board"
              data={{
                pk: post?.id,
                photo: post.photo,
                content: post?.content,
                created: post?.created,
              }}
              like={post?.is_fav}
              refreshKey={boardKeys.postById(post?.id)}
            />
            <span>{post?.count}</span>
          </>
        )}
      </div>
      <hr />
      <CommentsContainer
        postId={post?.id}
        modifyMode={modifyMode}
        user={user}
      />
    </div>
  );
};

BoardDetails.propTypes = {
  user: PropTypes.objectOf(oneOfType([number, string])),
  post: PropTypes.objectOf(PropTypes.any),
  modifyMode: PropTypes.bool,
  imageFile: PropTypes.objectOf(PropTypes.any),
  content: PropTypes.string,
  onInput: PropTypes.func,
  onSubmit: PropTypes.func,
  onCancelDelete: PropTypes.func,
  children: oneOfType([PropTypes.any]),
};

BoardDetails.defaultProps = {
  user: { id: -1, token: null },
  post: {},
  modifyMode: false,
  imageFile: null,
  content: '',
  onInput: null,
  onSubmit: null,
  onCancelDelete: null,
  children: null,
};

export default BoardDetails;
