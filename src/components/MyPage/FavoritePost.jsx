import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { Link, useLocation } from 'react-router-dom';
import { getLocaleDate } from '../../utils';
import { LikeButton, StyledFavContainer } from '../common';
import { BoardLoadFailError, LoadingCircle } from '../../assets/images/images';

const FavoritePost = ({ favPosts, status }) => {
  const { t, i18n } = useTranslation();
  const location = useLocation();

  return (
    <StyledFavContainer>
      {status === 'loading' && (
        <img src={LoadingCircle} alt={t('myPageFavPostsLoading')} />
      )}
      {status === 'error' && (
        <img src={BoardLoadFailError} alt="관심 게시글 목록 로드 오류 이미지" />
      )}
      {status === 'success' && (
        <div>
          {favPosts.map(({ pk, photo, content, created }) => (
            <div key={`${created}-${pk}`}>
              <img src={photo} alt="관심 게시글 이미지" />
              <ul>
                <li>{pk}</li>
                <li>{getLocaleDate(created, i18n.language)}</li>
                <li>{content}</li>
                <Link to={`/board/post/${pk}`} state={{ from: location }}>
                  게시글 가기
                </Link>
              </ul>
              <LikeButton
                type="board"
                data={{ pk: Number(pk), photo, content, created }}
                like
              />
            </div>
          ))}
        </div>
      )}
    </StyledFavContainer>
  );
};

FavoritePost.propTypes = {
  favPosts: PropTypes.arrayOf(PropTypes.object),
  status: PropTypes.string,
};

FavoritePost.defaultProps = {
  favPosts: [],
  status: '',
};

export default FavoritePost;
