import React from 'react';
import styled from 'styled-components';
import PropTypes, { number, object } from 'prop-types';
import { useTranslation } from 'react-i18next';
import { IoIosSend } from 'react-icons/io';
import { BoardLoadFailError, LoadingCircle } from '../../assets/images/images';
import { getLocaleDate } from '../../utils';

const Comments = ({
  userId,
  status,
  modifyMode,
  comments,
  onUpdateComment,
  text,
  modifiedText,
  setText,
  setModifiedText,
  onCreate,
  onUpdate,
  onDeleteCancel,
}) => {
  const { t, i18n } = useTranslation();

  return (
    <CommentContainer>
      {status === 'loading' && (
        <img src={LoadingCircle} alt="댓글 로딩 이미지" />
      )}
      {status === 'error' && (
        <img src={BoardLoadFailError} alt="댓글 로드 실패 이미지" />
      )}
      {status === 'success' && (
        <ul>
          {comments.map(
            ({ id, username, content, created, modified, user }) => (
              <li key={id}>
                <div>
                  <span>{username}</span>
                  {!modifyMode && userId === user && (
                    <span>
                      <button
                        disabled={
                          onUpdateComment === id &&
                          (!modifiedText || modifiedText === content)
                        }
                        type="button"
                        onClick={() => onUpdate(id)}
                      >
                        수정
                      </button>
                      <button type="button" onClick={() => onDeleteCancel(id)}>
                        {onUpdateComment === id ? '취소' : '삭제'}
                      </button>
                    </span>
                  )}
                </div>
                {onUpdateComment !== id && <p>{content}</p>}
                {onUpdateComment === id && (
                  <textarea
                    type="text"
                    defaultValue={content}
                    onChange={(e) => setModifiedText(e.target.value)}
                  />
                )}
                {/* 댓글 날짜 표시, 수정여부 */}
                <div>
                  <span>{getLocaleDate(created, i18n.language)}</span>
                  {created.slice(0, 19) !== modified.slice(0, 19) && (
                    <span>{t('boardBeModified')}</span>
                  )}
                </div>
                {/* 사용자와 작성자가 일치할 시, 수정/삭제 버튼 */}
              </li>
            ),
          )}
        </ul>
      )}

      {/* 댓글 입력창 */}
      {!modifyMode && userId !== -1 && (
        <CommentInput onSubmit={onCreate}>
          <textarea
            type="text"
            placeholder={t('boardPlaceHolder')}
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
          <button type="submit">
            <IoIosSend />
          </button>
        </CommentInput>
      )}
    </CommentContainer>
  );
};

Comments.propTypes = {
  userId: PropTypes.oneOfType([number, object]),
  status: PropTypes.string,
  modifyMode: PropTypes.bool,
  comments: PropTypes.arrayOf(PropTypes.any),
  onUpdateComment: PropTypes.number,
  text: PropTypes.string,
  modifiedText: PropTypes.string,
  setText: PropTypes.func,
  setModifiedText: PropTypes.func,
  onCreate: PropTypes.func,
  onUpdate: PropTypes.func,
  onDeleteCancel: PropTypes.func,
};

Comments.defaultProps = {
  userId: -1,
  status: 'idle',
  modifyMode: false,
  comments: [],
  onUpdateComment: -1,
  text: '',
  modifiedText: '',
  setText: null,
  setModifiedText: null,
  onCreate: null,
  onUpdate: null,
  onDeleteCancel: null,
};

const CommentContainer = styled.div`
  display: grid;
  grid-template-rows: 1fr auto;
  height: 50vh;
  grid-gap: 1.5rem;

  > ul {
    overflow-y: auto;
    ::-webkit-scrollbar {
      width: 0.5rem;
      background-color: rgba(0, 0, 0, 0.1);
      border-radius: 10px;
    }

    ::-webkit-scrollbar-thumb {
      background-color: #72af2c95;
      border-radius: 30px;
    }
    > li {
      margin-right: 0.5rem;
      margin-bottom: 1rem;
      > div:first-child {
        display: flex;
        justify-content: space-between;
        margin-bottom: 0.25rem;
        > span {
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

          :first-child {
            /* 댓글 단 사용자 이름 */
            font-size: 1.05rem;
            font-weight: 500;
          }
        }
      }
      > p {
        line-height: 1.1rem;
      }
      > div:last-child {
        font-size: 0.75rem;
      }
    }
  }
`;

const CommentInput = styled.form`
  display: flex;
  > textarea {
    resize: none;
    height: 3rem;
    overflow-y: auto;
    font-family: inherit;
    border: none;
    outline: none;
    border-bottom: 2px solid #c1dda0;
    padding: 0.7rem 0.5rem 0.5rem 0.5rem;
    width: 100%;
    background: #fbfbfb;

    ::placeholder {
      transform: translateY(2rem);
    }

    ::-webkit-scrollbar {
      width: 0.5rem;
      background-color: rgba(0, 0, 0, 0.1);
      border-radius: 10px;
    }

    ::-webkit-scrollbar-thumb {
      background-color: #72af2c95;
      border-radius: 30px;
    }

    ::placeholder {
      color: #789180;
    }

    :focus {
      transition: 0.3s;
      box-shadow: rgb(0 0 0 / 13%) 0px 1px 3px 0px,
        rgb(0 0 0 / 19%) 0px 1px 2px 0px;
    }
  }
  > button {
    font-size: 1.5rem;
    margin-top: auto;
    color: #72af2c95;
    transition: 0.3s;
    :hover {
      color: #09351b;
    }
  }
`;

export default Comments;
