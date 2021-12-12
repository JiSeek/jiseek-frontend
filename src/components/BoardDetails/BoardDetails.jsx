import React from 'react';
import styled from 'styled-components';
import PropTypes, { number, string } from 'prop-types';
import { Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { MdOutlineNavigateBefore } from 'react-icons/md';
import CommentsContainer from './CommentsContainer';
import { getLocaleDate } from '../../utils';
import { LikeButton } from '../common';
import { boardKeys } from '../../constants';

const BoardDetails = ({ user, post, onDelete }) => {
  const location = useLocation();
  const { i18n } = useTranslation();
  const from = location.state?.from?.pathname || '..';

  return (
    <DetailContents>
      <li>
        <Link to={from}>
          <MdOutlineNavigateBefore />
          이전
        </Link>
        <span>
          <p>{post?.user?.name}</p>
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
        </span>
        <img src={post?.photo} alt="게시글 이미지" />
        <div>
          <span>{getLocaleDate(post?.created, i18n.language)}</span>
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
            {post?.count}
          </span>
        </div>
      </li>
      <li>{post?.content}</li>
      <li>
        <CommentsContainer postId={post?.id} user={user} />
      </li>
    </DetailContents>
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

const DetailContents = styled.ul`
  width: 60vw;
  max-width: 1100px;
  height: 60vh;
  margin: auto;
  box-shadow: 0px 0 26px 5px rgb(0 0 0 / 20%);
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: auto auto;
  grid-template-areas: 'img comment' 'content comment';
  grid-gap: 1.5rem;
  padding: 3rem 3rem;

  button {
    border: none;
    background: none;
    cursor: pointer;
  }

  > li {
    :first-child {
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

      > span {
        > p {
          /* 유저 이름 */
          font-size: 1.25rem;
          font-weight: 500;
        }
        > button {
          /* 게시글 삭제 버튼 */
        }
        > a {
          /* 게시글 수정 버튼 */
        }
      }

      > img {
        /* 게시글 사진 */
        object-fit: cover;
        width: 100%;
        /* TODO: min, max height 설정하기 */
      }

      > div {
        /* 작성 시간, 좋아요 버튼 */
        display: flex;
        justify-content: space-between;
      }
    }

    :nth-child(2) {
      /* 게시글 내용 */
      grid-area: content;

      overflow-y: auto;
      word-break: keep-all;

      height: 150px;
      line-height: 1.15rem;
    }

    :last-child {
      /* 댓글 */
      grid-area: comment;
    }
  }

  @media only screen and (max-height: 1000px) {
    grid-template-areas: 'img content' 'img comment';
    grid-template-rows: 1fr 1.3fr;
  }
`;

export default BoardDetails;
