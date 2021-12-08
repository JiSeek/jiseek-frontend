import React, { useCallback, useState } from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import styled, { keyframes } from 'styled-components';
import { FileUpload } from '../../assets/images/images';

// TODO: 초기값 설정해서 내정보 수정에서 쓰기
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

  const renderImgUploader = () => (
    <ImgUploader imageUrl={imageUrl} handleFileInput={handleFileInput} />
  );

  return { imageFile, renderImgUploader, reset };
};

const ImgUploader = ({ imageUrl, handleFileInput }) => {
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
      <div style={{ display: 'flex', justifyContent: 'center', width: 354 }}>
        <FileLabel htmlFor="chooseFile">
          {t('foodSearchImageUpload')}
          <input
            id="chooseFile"
            type="file"
            accept="image/*"
            onChange={handleFileInput}
          />
        </FileLabel>
        <ResultButton disabled={!imageUrl} type="submit">
          {t('foodSearchImageSubmit')}
        </ResultButton>
      </div>
    </>
  );
};

ImgUploader.propTypes = {
  imageUrl: PropTypes.string,
  handleFileInput: PropTypes.func,
};

ImgUploader.defaultProps = {
  imageUrl: '',
  handleFileInput: null,
};

const DropContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 350px;
  max-height: 350px;
  border: 2px solid #72af2c;
  margin-bottom: 2rem;

  > img {
    pointer-events: none;
    width: 350px;
    height: 350px;
    object-fit: cover;
  }
`;

const FileLabel = styled.label`
  font-size: 0.8rem;
  background-color: #92ce4d;
  text-align: center;
  padding: 1rem 0;
  width: 100%;
  cursor: pointer;
  margin-right: 4px;

  > input {
    display: none;
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

const ResultButton = styled.button`
  background: #407f00;
  color: #f6fff2;
  font-family: inherit;
  font-size: 0.8rem;
  border: none;
  width: 100%;
  cursor: pointer;
  animation: ${long} 0.5s ease-out;

  :disabled {
    display: none;
  }
`;

export default useImageUploader;
