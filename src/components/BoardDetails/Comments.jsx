import React from 'react';
import PropTypes, { number, object } from 'prop-types';
import { useTranslation } from 'react-i18next';
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
    <ul>
      {status === 'loading' && (
        <img src={LoadingCircle} alt="댓글 로딩 이미지" />
      )}
      {status === 'error' && (
        <img src={BoardLoadFailError} alt="댓글 로드 실패 이미지" />
      )}
      {status === 'success' && (
        <>
          {comments.map(
            ({ id, username, content, created, modified, user }) => (
              <li key={id}>
                <span>{username}</span>
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
              </li>
            ),
          )}
        </>
      )}

      {/* 댓글 입력창 */}
      {!modifyMode && userId !== -1 && (
        <form onSubmit={onCreate}>
          <button type="submit">댓글 작성</button>
          <textarea
            type="text"
            placeholder={t('boardPlaceHolder')}
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
        </form>
      )}
    </ul>
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

export default Comments;
