import React from 'react';
import styled from 'styled-components';
import PropTypes, { oneOfType, number, string } from 'prop-types';
import { Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { MdOutlineNavigateBefore } from 'react-icons/md';
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
    <DetailContents>
      <form onSubmit={onSubmit}>
        <Link to={from}>
          <MdOutlineNavigateBefore />
          이전
        </Link>
        <p>
          <span>{post?.user?.name}</span>
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
        </p>
      </form>
      <div>
        <form onSubmit={onSubmit}>
          {!modifyMode ? (
            <img src={post?.photo} alt="게시글 이미지" />
          ) : (
            children
          )}
          <div>
            <span>{getLocaleDate(post?.created, i18n.language)}</span>
            {!modifyMode && (
              <span>
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
              </span>
            )}
          </div>
        </form>
        <form onSubmit={onSubmit}>
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
        <CommentsContainer
          postId={post?.id}
          modifyMode={modifyMode}
          user={user}
        />
      </div>
    </DetailContents>
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

const DetailContents = styled.ul`
  width: 60vw;
  max-width: 1100px;
  height: 60vh;
  margin: auto;
  box-shadow: 0px 0 26px 5px rgb(0 0 0 / 20%);

  padding: 3rem 3rem;

  button {
    border: none;
    background: none;
    cursor: pointer;
  }

  > form {
    grid-area: img;
    > a {
      /* 이전 버튼 */
      font-size: 1.45rem;
      font-weight: 600;
      opacity: 0.6;
      transition: 0.3s;
      :hover {
        opacity: 1;
      }

      > svg {
        vertical-align: bottom;
      }
    }

    > p {
      display: flex;
      justify-content: space-between;
      margin: 0.75rem 0 0.25rem 0;
      > span {
        :first-child {
          /* 유저 이름 */
          font-size: 1.25rem;
          font-weight: 500;
        }
        :last-child {
          font-size: 0.85rem;

          > button {
            /* 게시글 삭제 버튼 */
            opacity: 0.6;
            transition: 0.3s;
            :hover {
              opacity: 1;
            }
          }
          > a {
            /* 게시글 수정 버튼 */
            opacity: 0.6;
            transition: 0.3s;
            :hover {
              opacity: 1;
            }
          }
        }
      }
    }
  }
  > div {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-template-rows: auto 1fr;
    grid-template-areas: 'img comment' 'content comment';
    grid-gap: 1.5rem 2.5rem;
    > form:first-child {
      > img {
        /* 게시글 사진 */
        object-fit: cover;
        width: 100%;
        /* TODO: min, max height 설정하기 */
        max-height: 48vh;
      }

      > div {
        /* 작성 시간, 좋아요 버튼 */
        display: flex;
        justify-content: space-between;
        > span {
          :first-child {
            /* 작성 시간 */
            font-size: 0.85rem;
          }
          :last-child {
            > button > img {
              /* 좋아요 버튼 */
              width: 1rem;
            }
            > span {
              /* 좋아요 수 */
            }
          }
        }
      }
    }

    > form:last-child > p {
      /* 게시글 내용 */
      grid-area: content;

      overflow-y: auto;

      height: 150px;
      line-height: 1.15rem;
      font-size: 1.15rem;
    }

    > ul {
      /* 댓글 */
      grid-area: comment;
      overflow-y: auto;
    }
  }

  @media only screen and (max-height: 1000px) {
    grid-template-areas: 'img content' 'img comment';
    grid-template-rows: 1fr 1.3fr;
  }
`;

export default BoardDetails;
