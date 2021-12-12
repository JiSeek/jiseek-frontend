import React from 'react';
import PropTypes, { number, string } from 'prop-types';
import { Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import CommentsContainer from './CommentsContainer';
import { getLocaleDate } from '../../utils';
import { LikeButton } from '../common';
import { boardKeys } from '../../constants';

const BoardDetails = ({ user, post, onDelete }) => {
  const location = useLocation();
  const { t, i18n } = useTranslation();
  const from = location.state?.from?.pathname || '..';

  return (
    <div>
      <Link to={from}>이전</Link>
      <img src={post?.photo} alt="게시글 이미지" />
      <div>
        <span>{post?.user?.name}</span>
        {user?.id === post?.user?.pk && (
          <span>
            <button type="button" onClick={onDelete}>
              게시글 삭제
            </button>
            <Link
              to="./modify"
              state={{ photo: post?.photo, content: post?.content }}
            >
              게시글 수정
            </Link>
          </span>
        )}
      </div>
      <p>{post?.content}</p>
      <div>
        <span>{getLocaleDate(post?.created, i18n.language)}</span>
        {post?.created.slice(0, 19) !== post?.modified.slice(0, 19) && (
          <span>{t('boardBeModified')}</span>
        )}
      </div>
      <div>
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
      </div>
      <hr />
      <CommentsContainer postId={post?.id} user={user} />
    </div>
  );
};

BoardDetails.propTypes = {
  user: PropTypes.objectOf(PropTypes.oneOfType([number, string])),
  post: PropTypes.objectOf(PropTypes.any),
  onDelete: PropTypes.func,
};

BoardDetails.defaultProps = {
  user: { id: -1, token: null },
  post: {},
  onDelete: null,
};

export default BoardDetails;
