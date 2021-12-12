import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import { Link, useLocation } from 'react-router-dom';
import { LikeButton, StyledFavContainer } from '../common';
import { BoardLoadFailError, LoadingCircle } from '../../assets/images/images';

const FavoritePost = ({ favPosts, status }) => {
  const { t } = useTranslation();
  const location = useLocation();

  return (
    <StyledFavContainer>
      {status === 'loading' && (
        <img src={LoadingCircle} alt={t('myPageFavPostsLoading')} />
      )}
      {status === 'error' && (
        <img src={BoardLoadFailError} alt={t('myPageLikeApplyErr')} />
      )}
      {status === 'success' && (
        <div>
          {favPosts.map(({ pk, photo, content, created }) => (
            <div key={`${created}-${pk}`}>
              <img src={photo} alt="관심 게시글 이미지" />
              <Overlay />
              <HoverContents>
                <span>
                  <LikeButton
                    type="board"
                    data={{ pk: Number(pk), photo, content, created }}
                    like
                  />
                </span>
                <span>{content}</span>
                <span>
                  <Link to={`/board/post/${pk}`} state={{ from: location }}>
                    게시글 가기
                  </Link>
                </span>
              </HoverContents>
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

const Overlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.65);
  opacity: 0;
  transition: background 0.5s ease;
  border-radius: 15px;
`;

const HoverContents = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: 80%;
  padding-top: 1rem;
  text-align: center;
  > span {
    z-index: 1;
    opacity: 0;
    transition: opacity 0.5s ease;

    :first-child {
      /* 좋아요 버튼 */
      /* text-align: right; */
      padding-right: 1rem;
      margin-left: auto;
    }

    :nth-child(2) {
      /* 음식 명 */
      color: #fbfbfb;
      font-size: 1.5rem;
      font-weight: 500;
      letter-spacing: 1px;
      width: 80%;
      text-align: center;
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 3;
      -webkit-box-orient: vertical;
      margin-bottom:1rem;
    }

    :last-child {
      /* 상세보기 버튼 */
      text-align: center;
      > a {
        padding: 0.35rem 1rem;
        border: 3px solid #fbfbfbc5;
        background: none;
        font-family: inherit;
        font-size: 1rem;
        color: #fbfbfb;
        cursor: pointer;
      }
    }
  }
`;

export default FavoritePost;
