import React, { useCallback, useState } from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import styled, { keyframes } from 'styled-components';
import { FileUpload } from '../../assets/images/images';

const useImageUploader = () => {
  const [imageUrl, setImageUrl] = useState('');
  const [imageFile, setImageFile] = useState(null);

  const preview = useCallback((e) => {
    const reader = new FileReader();
    const fileList = e.target.files || e.dataTransfer.files;
    if (fileList.length === 0) {
      return;
    }
    reader.readAsDataURL(fileList[0]);
    reader.onloadend = (event) => setImageUrl(event.target.result);
    setImageFile(fileList[0]);
  }, []);

  const handleFileInput = useCallback(
    (e) => {
      e.preventDefault();
      preview(e);
    },
    [preview],
  );

  const reset = useCallback(() => {
    setImageUrl('');
    setImageFile(null);
  }, []);

  const renderImgUploader = (type) => (
    <ImgUploader
      type={type}
      imageUrl={imageUrl}
      handleFileInput={handleFileInput}
    />
  );

  return { imageFile, setImageUrl, renderImgUploader, reset };
};

const ImgUploader = ({ type, imageUrl, handleFileInput }) => {
  const { t } = useTranslation();

  return (
    <>
      <DropContainer
        id="image-upload"
        onDragOver={(e) => e.preventDefault()}
        onDragEnter={(e) => e.preventDefault()}
        onDragLeave={(e) => e.preventDefault()}
        onDrop={handleFileInput}
      >
        <img src={imageUrl || FileUpload} alt={t('foodSearchImageAlt')} />
      </DropContainer>
      <Buttons>
        <label htmlFor="chooseFile">
          {t('foodSearchImageUpload')}
          <input
            id="chooseFile"
            type="file"
            accept="image/*"
            onChange={handleFileInput}
          />
        </label>
        {type === 'food' && (
          <button disabled={!imageUrl} type="submit">
            {t('foodSearchImageSubmit')}
          </button>
        )}
      </Buttons>
    </>
  );
};

ImgUploader.propTypes = {
  type: PropTypes.string,
  imageUrl: PropTypes.string,
  handleFileInput: PropTypes.func,
};

ImgUploader.defaultProps = {
  type: '',
  imageUrl: '',
  handleFileInput: null,
};

const DropContainer = styled.div`
  width: 100%;
  height: 100%;
  border: 2px solid #72af2c63;
  margin-bottom: 2rem;

  > img {
    pointer-events: none;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const long = keyframes`
  0% {
    width: 80px;
  background: #92ce4d;
  }
  100% {
  width: 100%;
  background: #407f00;
  }
`;

const Buttons = styled.div`
  display: flex;
  justify-content: center;

  > label {
    font-weight: 500;
    text-align: center;
    padding: 1rem 0;
    width: 100%;
    cursor: pointer;
    margin-right: 4px;
    background-color: #92ce4d;
    opacity: 0.6;
    transition: 0.3s;

    :hover {
      opacity: 1;
    }

    > input {
      display: none;
    }
  }

  > button {
    background: #407f00;
    color: #f6fff2;
    font-family: inherit;
    border: none;
    width: 100%;
    cursor: pointer;
    animation: ${long} 0.5s ease-out;
    opacity: 0.6;
    transition: 0.3s;

    :hover {
      opacity: 1;
    }

    :disabled {
      display: none;
    }

    :hover {
      background: #3f7f00c8;
      transition: 0.3s;
    }
  }
`;

export default useImageUploader;
