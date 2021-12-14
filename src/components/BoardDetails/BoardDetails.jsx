import React from 'react';
import styled from 'styled-components';
import PropTypes, { oneOfType, number, string } from 'prop-types';
import { Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { MdOutlineNavigateBefore } from 'react-icons/md';
import CommentsContainer from './CommentsContainer';
import { getLocaleDate, parseParagraph } from '../../utils';
import { LikeButton } from '../common';
import { boardKeys } from '../../constants';

// const BoardDetails = (
const BoardDetails = React.forwardRef(
  (
    {
      user,
      post,
      modifyMode,
      imageFile,
      content,
      onInput,
      onSubmit,
      onCancelDelete,
      isLoading,
      children,
    },
    ref,
  ) => {
    const location = useLocation();
    const { t, i18n } = useTranslation();
    const from = location.state?.from?.pathname || '..';

    return (
      /* eslint-disable react/jsx-props-no-spreading */
      <>
        <GoBack>
          <Link to={from}>
            <MdOutlineNavigateBefore />
            {t('boardBackText')}
          </Link>
        </GoBack>
        <DetailContents role={modifyMode ? 'form' : 'article'}>
          <PostImage>
            {/* 게시글 이미지 */}
            {!modifyMode ? (
              <img src={post?.photo} alt="Posted Img" />
            ) : (
              children
            )}
          </PostImage>
          <User>
            {/* 유저 이름 */}
            <span>{post?.user?.name}</span>
            {/* 수정, 삭제 버튼 */}
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
                      (!imageFile && content === post.content) ||
                      isLoading
                    }
                    type="submit"
                    onClick={onSubmit}
                  >
                    {t('boardApplyText')}
                  </button>
                )}
              </span>
            )}
          </User>
          <Content>
            {/* 게시글 내용 */}
            {!modifyMode ? (
              <p>{parseParagraph(post?.content)}</p>
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
          </Content>
          <About>
            {/* 게시글 생성 일자 */}
            <div>
              <span>
                {getLocaleDate(post?.created, i18n.language).slice(0, 14)}
              </span>
              <span>
                {getLocaleDate(post?.created, i18n.language).slice(14)}
              </span>
            </div>
            {/* 좋아요 버튼 및 좋아요 수 */}
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
          </About>
          <Comment>
            {/* 댓글 */}
            <h2>{t('boardComment')}</h2>
            <CommentsContainer
              postId={post?.id}
              modifyMode={modifyMode}
              user={user}
            />
          </Comment>
        </DetailContents>
      </>
    );
  },
);

BoardDetails.propTypes = {
  user: PropTypes.objectOf(oneOfType([number, string])),
  post: PropTypes.objectOf(PropTypes.any),
  modifyMode: PropTypes.bool,
  imageFile: PropTypes.objectOf(PropTypes.any),
  content: PropTypes.string,
  onInput: PropTypes.func,
  onSubmit: PropTypes.func,
  onCancelDelete: PropTypes.func,
  isLoading: PropTypes.bool,
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
  isLoading: false,
  children: null,
};

const GoBack = styled.p`
  /* 이전 버튼 */
  font-size: 1.25rem;
  font-weight: 700;
  opacity: 0.6;
  transition: 0.3s;
  :hover {
    opacity: 1;
  }
  > a > svg {
    vertical-align: bottom;
  }
`;

const DetailContents = styled.div`
  display: grid;
  grid-template:
    'image image user' 16vh
    'image image content' auto
    'like comment comment' auto
    / 1fr 2fr 4fr;
  /* grid-gap: 2rem 2.5rem; */
  margin-top: 3rem;
  word-break: break-all;
`;

const PostImage = styled.section`
  grid-area: image;
  z-index: 1;
  background: url('http://www.bibigo.com/img/kr/bg_sub3.gif') repeat 0 0;

  > img {
    /* 게시글 이미지 */
    width: 100%;
    height: 100%;
    max-height: 60vh;
    object-fit: cover;
    box-shadow: 0px 0 26px 5px rgb(0 0 0 / 25%);
    z-index: 1;
  }
`;

const User = styled.section`
  grid-area: user;
  margin-top: auto;
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  padding: 1rem 1rem 1rem 3rem;

  > span {
    :first-child {
      /* 유저 이름 */
      font-size: 1.25rem;
      font-weight: 500;
    }

    button {
      border: none;
      background: none;
      cursor: pointer;
      border-right: 1px solid;
    }

    button,
    a {
      font-size: 0.85rem;
      padding: 0 0.5rem;
      opacity: 0.6;
      transition: 0.3s;

      :hover {
        opacity: 1;
      }
    }
  }
`;

const Content = styled.section`
  /* 게시글 내용 */
  grid-area: content;
  font-size: 1.15rem;
  letter-spacing: 1px;
  line-height: 1.75rem;
  padding: 2rem 1rem 2rem 3rem;
  background: url('http://www.bibigo.com/img/kr/bg_sub3.gif') repeat 0 0;

  > p {
    margin-right: 1rem;
    max-height: 34vh;
    overflow-y: auto;

    ::-webkit-scrollbar {
      width: 0.5rem;
      background-color: rgba(0, 0, 0, 0.1);
      border-radius: 10px;
    }

    ::-webkit-scrollbar-thumb {
      background-color: #ceaa3484;
      border-radius: 30px;
    }
  }
`;

const About = styled.section`
  grid-area: like;
  padding: 1rem 1.5rem 0 0.25rem;

  display: flex;
  justify-content: space-between;

  > div {
    /* 게시글 생성 일자 */
    font-size: 0.85rem;
    display: flex;
    flex-direction: column;
    line-height: 1rem;
    margin-bottom: 0.5rem;
  }

  > span {
    > button > img {
      /* 좋아요 버튼 */
      vertical-align: middle;
      width: 1.15rem;
    }
    > span {
      /* 좋아요 수 */
      font-weight: 600;
      font-size: 0.85rem;
      vertical-align: middle;
      font-size: 1.15rem;
    }
  }
`;

const Comment = styled.section`
  /* 댓글 */
  grid-area: comment;
  padding: 1.5rem 0 4rem 3rem;
  background: url('http://www.bibigo.com/img/kr/bg_sub3.gif') repeat 0 0;

  > h2 {
    display: flex;
    flex-basis: 100%;
    align-items: center;
    margin: 0.25rem 0 1rem 0;

    font-size: 1.15rem;
    font-weight: 500;

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
      margin-right: 3rem;
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
