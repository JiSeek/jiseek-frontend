import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { getLocaleDate } from '../../utils';
import { LikeButton, StyledFavContainer } from '../common';

// TODO: i18n 적용 후 lang 제거
const FavoritePost = ({ favPosts, status, lang }) => (
  <div>
    {status === 'loading' && <>로딩은 요기</>}
    {status === 'error' && <>에러는 요기</>}
    {status === 'success' && (
      <StyledFavContainer>
        {favPosts.map(({ pk, content, created }) => (
          <div key={pk}>
            <ul>
              <li>{pk}</li>
              <li>{getLocaleDate(created, lang)}</li>
              <li>{content}</li>
              <Link to={`/board/${pk}`}>게시글 가기</Link>
            </ul>
            <LikeButton
              type="board"
              id={Number(pk)}
              data={{ id: pk, content, created_at: created }}
              like
            />
          </div>
        ))}
      </StyledFavContainer>
    )}
  </div>
);

FavoritePost.propTypes = {
  favPosts: PropTypes.arrayOf(PropTypes.object),
  status: PropTypes.string,
  lang: PropTypes.string,
};

FavoritePost.defaultProps = {
  favPosts: [],
  status: '',
  lang: 'ko',
};

export default FavoritePost;
