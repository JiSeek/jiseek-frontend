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

const BoardDetails = (
  {
    user,
    post,
    modifyMode,
    imageFile,
    content,
    onInput,
    onSubmit,
    onCancelDelete,
    children,
  },
  ref,
) => {
  const location = useLocation();
  const { t, i18n } = useTranslation();
  const from = location.state?.from?.pathname || '..';

  return (
    /* eslint-disable react/jsx-props-no-spreading */
    <DetailContents role={modifyMode ? 'form' : 'article'}>
      <div>
        <Link to={from}>
          <MdOutlineNavigateBefore />
          {t('boardBackText')}
        </Link>
        <span>
          <span>{post?.user?.name}</span>
          {user?.id === post?.user?.pk && (
            <span>
              <button type="button" onClick={onCancelDelete}>
                {modifyMode ? t('boardCancelText') : t('boardDeleteText')}
              </button>
              {!modifyMode ? (
                <Link
                  to="./modify"
                  state={{ photo: post?.photo, content: post?.content }}
                >
                  {t('boardUpdateText')}
                </Link>
              ) : (
                <button
                  disabled={
                    content.length === 0 ||
                    (!imageFile && content === post.content)
                  }
                  type="submit"
                  onClick={onSubmit}
                >
                  {t('boardApplyText')}
                </button>
              )}
            </span>
          )}
        </span>
      </div>
      <div>
        <section>
          {!modifyMode ? <img src={post?.photo} alt="Posted Img" /> : children}
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
        </section>
        <section>
          {!modifyMode ? (
            <p>{post?.content}</p>
          ) : (
            <p>
              <AutoResizeTextArea
                type="text"
                value={content}
                placeholder={t('boardTextInput')}
                onInput={onInput}
                ref={ref}
                rows="1"
              />
              <span>{content.length}/255</span>
            </p>
          )}
        </section>
        <section>
          <h2>{t('boardComment')}</h2>
          <CommentsContainer
            postId={post?.id}
            modifyMode={modifyMode}
            user={user}
          />
        </section>
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

const DetailContents = styled.div`
  width: 60vw;
  max-width: 1100px;
  height: 60vh;
  margin: auto;
  box-shadow: 0px 0 26px 5px rgb(0 0 0 / 20%);
  padding: 3rem 3rem;
  word-break: break-word;

  button {
    border: none;
    background: none;
    cursor: pointer;
  }

  > div {
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
      display: flex;
      justify-content: space-between;
      margin: 1.5rem 0 0.25rem 0;
      width: 48%;
      > span {
        :first-child {
          margin-right: 1rem;
        }
        :last-child {
          font-size: 0.85rem;
          /* width: 70px; */

          > button {
            /* 게시글 삭제 버튼 */
            opacity: 0.6;
            transition: 0.3s;
            text-align: right;
            :hover {
              opacity: 1;
            }
          }
          > a {
            /* 게시글 수정 버튼 */
            opacity: 0.6;
            transition: 0.3s;
            text-align: right;
            :hover {
              opacity: 1;
            }
          }
        }
        :first-child {
          /* 유저 이름 */
          font-size: 1.25rem;
          font-weight: 500;
        }
      }
    }
  }

  > div {
    /* 내용 */
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-template-rows: auto 1fr;
    grid-template-areas: 'img comment' 'content comment';
    grid-gap: 1.5rem 2.5rem;
    > section {
      :first-child {
        > img {
          /* 게시글 사진 */
          object-fit: cover;
          width: 100%;
          /* TODO: min, max height 설정하기 */
          max-height: 40vh;
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
                vertical-align: middle;
                width: 1rem;
              }
              > span {
                /* 좋아요 수 */
                font-weight: 600;
                font-size: 0.85rem;
                vertical-align: middle;
              }
            }
          }
        }
      }
      :nth-child(2) {
        grid-area: content;
        overflow-y: auto;

        > p {
          /* 게시글 내용 */
          height: 150px;
          line-height: 1.3rem;
        }
      }
    }

    :last-child {
      grid-area: comment;
      > h2 {
        margin-bottom: 1rem;
        display: flex;
        flex-basis: 100%;
        align-items: center;

        ::before,
        ::after {
          content: '';
          flex-grow: 1;
          background: #00110036;
          height: 1px;
        }

        ::before {
          margin-right: 1rem;
        }
        ::after {
          margin-left: 1rem;
        }
      }
      > ul {
        /* 댓글 */
        overflow-y: auto;
      }
    }
  }

  @media only screen and (max-height: 1000px) {
    > form > p {
      width: 30%;
    }

    > div {
      grid-template-areas: 'img content' 'img comment';
      grid-template-rows: repeat(2, 1fr);
      grid-template-columns: 1fr 2fr;
      grid-gap: 3rem;

      > form {
        :first-child {
          > img {
            /* 게시글 사진 */
            max-height: 50vh;
          }

          > div {
            /* 작성 시간, 좋아요 버튼 */
          }
        }
      }
    }
  }
`;

const AutoResizeTextArea = styled.textarea`
  resize: none;
  overflow: hidden;
  padding: 12px;
  display: block;
  outline: none;
  min-height: 38px;
  border-radius: 4px;
  caret-color: lightskyblue;
  box-sizing: border-box;
  line-height: 20px;
  &:focus {
    background: azure;
  }
`;

export default BoardDetails;
