import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { getLocaleDate } from '../../utils';
import { LikeButton, StyledFavContainer } from '../common';
import { LoadingCircle } from '../../assets/images/images';

const FavoritePost = ({ favPosts, status }) => {
  const { t, i18n } = useTranslation();

  return (
    <StyledFavContainer>
      {status === 'loading' && (
        <img src={LoadingCircle} alt={t('myPageFavPostsLoading')} />
      )}
      {status === 'error' && <>에러는 요기</>}
      {status === 'success' && (
        <div>
          {favPosts.map(({ pk, content, created }) => (
            <div key={`${created}-${pk}`}>
              <ul>
                <li>{pk}</li>
                <li>{getLocaleDate(created, i18n.language)}</li>
                <li>{content}</li>
                <Link to={`/board/details/${pk}`}>게시글 가기</Link>
              </ul>
              <LikeButton
                type="board"
                data={{ pk: Number(pk), content, created }}
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
