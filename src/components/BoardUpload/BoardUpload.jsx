import React from 'react';
import PropTypes, { oneOfType } from 'prop-types';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const BoardUpload = ({ imageFile, content, onInput, onSubmit, children }) => {
  const { t } = useTranslation();

  return (
    /* eslint-disable react/jsx-props-no-spreading */
    <div>
      <Link to="..">{t('boardBackText')}</Link>
      <form onSubmit={onSubmit}>
        {children}
        <textarea
          type="text"
          value={content}
          placeholder={t('boardTextInput')}
          onInput={onInput}
        />
        <span>{content.length}/255</span>
        <button disabled={!imageFile || content.length === 0} type="submit">
          {t('boardWriteText', { what: t('boardPost') })}
        </button>
      </form>
    </div>
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

export default BoardUpload;
