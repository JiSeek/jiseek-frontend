import React from 'react';
import styled from 'styled-components';
import PropTypes, { number, object } from 'prop-types';
import { useTranslation } from 'react-i18next';
import { IoIosSend } from 'react-icons/io';
import { BoardLoadFailError, LoadingCircle } from '../../assets/images/images';
import { getLocaleDate, parseParagraph } from '../../utils';

const Comments = ({
  userId,
  status,
  modifyMode,
  comments,
  onUpdateComment,
  text,
  modifiedText,
  onTextInput,
  onModifyInput,
  onCreate,
  onUpdate,
  onDeleteCancel,
}) => {
  const { t, i18n } = useTranslation();

  return (
    <CommentContainer>
      {status === 'loading' && (
        <img src={LoadingCircle} alt="Comments loading..." />
      )}
      {status === 'error' && (
        <img src={BoardLoadFailError} alt="Failed to load comments" />
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
                        onClick={() => onUpdate(id, content)}
                      >
                        {t('boardUpdateText')}
                      </button>
                      <button type="button" onClick={() => onDeleteCancel(id)}>
                        {onUpdateComment === id
                          ? t('boardCancelText')
                          : t('boardDeleteText')}
                      </button>
                    </span>
                  )}
                </div>
                {onUpdateComment !== id && <p>{parseParagraph(content)}</p>}
                {onUpdateComment === id && (
                  <>
                    <textarea
                      type="text"
                      value={modifiedText}
                      onInput={onModifyInput}
                    />
                    <span>{modifiedText.length}/255</span>
                  </>
                )}
                {/* ?????? ?????? ??????, ???????????? */}
                <div>
                  <span>{getLocaleDate(created, i18n.language)}</span>
                  {created.slice(0, 19) !== modified.slice(0, 19) && (
                    <span>{t('boardBeModified')}</span>
                  )}
                </div>
                {/* ???????????? ???????????? ????????? ???, ??????/?????? ?????? */}
              </li>
            ),
          )}
        </ul>
      )}

      {/* ?????? ????????? */}
      {!modifyMode && userId !== -1 && (
        <CommentInput onSubmit={onCreate}>
          <textarea
            type="text"
            placeholder={t('boardTextInput')}
            value={text}
            onInput={onTextInput}
          />
          <div>
            <span>{text.length}/255</span>
            <button disabled={text.length === 0} type="submit">
              <IoIosSend />
            </button>
          </div>
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
  onTextInput: PropTypes.func,
  onModifyInput: PropTypes.func,
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
  onTextInput: null,
  onModifyInput: null,
  onCreate: null,
  onUpdate: null,
  onDeleteCancel: null,
};

const CommentContainer = styled.div`
  display: grid;
  grid-template-rows: 1fr auto;
  height: 100%;
  grid-gap: 1.5rem;
  margin-right: 2rem;

  button {
    border: none;
    background: none;
  }

  > ul {
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
    > li {
      margin-right: 0.5rem;
      margin-bottom: 1rem;
      > div:first-child {
        display: flex;
        justify-content: space-between;
        > span {
          :last-child {
            font-size: 0.85rem;

            > button {
              /* ????????? ?????? ?????? */
              opacity: 0.6;
              transition: 0.3s;
              :hover {
                opacity: 1;
              }
            }
            > a {
              /* ????????? ?????? ?????? */
              opacity: 0.6;
              transition: 0.3s;
              :hover {
                opacity: 1;
              }
            }
          }

          :first-child {
            /* ?????? ??? ????????? ?????? */
            font-size: 1.1rem;
          }
        }
      }
      > p {
        font-weight: 300;
        line-height: 1.15rem;
        letter-spacing: 0.5px;
        margin: 0.15rem 0;
      }
      > div:last-child {
        font-weight: 300;
        font-size: 0.75rem;
      }
    }
  }
`;

const CommentInput = styled.form`
  display: flex;
  > textarea {
    resize: none;
    /* height: 3rem; */
    overflow-y: auto;
    font-family: inherit;
    border: none;
    outline: none;
    border-bottom: 2px solid #ceaa3484;
    padding: 0.7rem 0.5rem 0.5rem 0.5rem;
    width: 100%;
    background: #fbfbfb68;

    ::placeholder {
      transform: translateY(2rem);
      color: #789180;
    }

    ::-webkit-scrollbar {
      width: 0.5rem;
      background-color: rgba(0, 0, 0, 0.1);
      border-radius: 10px;
    }

    ::-webkit-scrollbar-thumb {
      background-color: #ceaa3484;
      border-radius: 30px;
    }

    :focus {
      transition: 0.3s;
      box-shadow: rgb(0 0 0 / 13%) 0px 1px 3px 0px,
        rgb(0 0 0 / 19%) 0px 1px 2px 0px;
      background: #fbfbfbb3;
    }
  }
  > div {
    > button {
      cursor: pointer;
      font-size: 1.5rem;
      margin-top: auto;
      color: #a7882086;
      transition: 0.3s;
      :hover {
        color: #92761bce;
      }
    }
  }
`;

export default Comments;
