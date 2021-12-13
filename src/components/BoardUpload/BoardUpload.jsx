import React from 'react';
import styled from 'styled-components';
import PropTypes, { oneOfType } from 'prop-types';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { MdOutlineNavigateBefore } from 'react-icons/md';

const BoardUpload = ({ imageFile, content, onInput, onSubmit, children }) => {
  const { t } = useTranslation();

  return (
    /* eslint-disable react/jsx-props-no-spreading */
    <StyledBoardUpload>
      <Link to="..">
        <MdOutlineNavigateBefore />
        {t('boardBackText')}
      </Link>
      <UploadContents onSubmit={onSubmit}>
        <div>{children}</div>
        <div>
          <TextareaContainer currentLen={content.length}>
            <textarea
              type="text"
              value={content}
              placeholder={t('boardTextInput')}
              onInput={onInput}
            />
            <span>{content.length}/255</span>
          </TextareaContainer>
          <WriteButton
            disabled={!imageFile || content.length === 0}
            type="submit"
          >
            {t('boardWriteText')}
          </WriteButton>
        </div>
      </UploadContents>
    </StyledBoardUpload>
  );
};

BoardUpload.propTypes = {
  imageFile: PropTypes.objectOf(PropTypes.any),
  content: PropTypes.string,
  onInput: PropTypes.func,
  onSubmit: PropTypes.func,
  children: oneOfType([PropTypes.any]),
};

BoardUpload.defaultProps = {
  imageFile: null,
  content: '',
  onInput: null,
  onSubmit: null,
  children: null,
};

const StyledBoardUpload = styled.div`
  width: 60vw;
  max-width: 1100px;
  max-height: 60vh;
  margin: auto;
  box-shadow: 0px 0 26px 5px rgb(0 0 0 / 20%);
  padding: 3rem 3rem 8.25rem 3rem;
  word-break: break-word;

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
`;

const UploadContents = styled.form`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-gap: 2.5rem;
  margin-top: 1.5rem;

  > div:first-child {
    width: 100%;
    max-height: 40vh;
  }
`;

const TextareaContainer = styled.div`
  position: relative;
  height: 100%;
  margin-bottom: 2rem;

  > textarea {
    /* 게시글 내용 입력창 */
    resize: none;
    width: calc(100% - 1.5rem);
    height: calc(100% - 1.5rem);
    max-height: 40vh;
    border: none;
    outline: none;
    padding: 0.75rem;
    border: 2px solid #c1dda092;
    overflow-y: auto;

    ::placeholder {
      color: #789180;
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

    :focus {
      transition: 0.3s;
      box-shadow: rgb(0 0 0 / 13%) 0px 1px 3px 0px,
        rgb(0 0 0 / 19%) 0px 1px 2px 0px;
    }
  }

  > span {
    position: absolute;
    bottom: 1%;
    right: 1%;
    opacity: 0.6;
    font-size: 0.85rem;
  }
`;

const WriteButton = styled.button`
  float: right;
  background: #407f00;
  color: #f6fff2;
  border: none;
  padding: 0.85rem 1.5rem;
  transition: 0.3s;
  cursor: pointer;

  :disabled {
    opacity: 0.6;
    cursor: unset;
  }
`;

export default BoardUpload;
