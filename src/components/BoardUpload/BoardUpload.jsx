import React from 'react';
import PropTypes, { oneOfType, func, object } from 'prop-types';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { StyledErrorMsg } from '../common';

const BoardUpload = ({ imageFile, hookForm, children }) => {
  const { t } = useTranslation();
  return (
    /* eslint-disable react/jsx-props-no-spreading */
    <div>
      <Link to="..">이전</Link>
      <form onSubmit={hookForm.onSubmit}>
        {children}
        <textarea
          type="text"
          placeholder={t('boardPlaceHolder')}
          {...hookForm.register('content')}
        />
        <span>{hookForm.watch('content').length}/255</span>
        <StyledErrorMsg>
          {hookForm.errors.content && hookForm.errors.content.message}
        </StyledErrorMsg>
        <button
          disabled={!imageFile || hookForm.watch('content').length === 0}
          type="submit"
        >
          글 작성
        </button>
      </form>
    </div>
  );
};

BoardUpload.propTypes = {
  hookForm: PropTypes.objectOf(oneOfType([func, object])).isRequired,
  imageFile: PropTypes.objectOf(PropTypes.any),
  children: oneOfType([PropTypes.any]),
};

BoardUpload.defaultProps = {
  imageFile: null,
  children: null,
};

export default BoardUpload;
