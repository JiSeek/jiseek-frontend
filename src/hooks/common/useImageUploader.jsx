import React, { useCallback, useState } from 'react';
import PropTypes from 'prop-types';
import styled, { keyframes } from 'styled-components';
import { FileUpload } from '../../assets/images/images';

const useImageUploader = () => {
  const [imageUrl, setImageUrl] = useState(null);

  const preview = useCallback((e) => {
    const reader = new FileReader();
    const fileList = e.target.files || e.dataTransfer.files;
    reader.readAsDataURL(fileList[0]);
    reader.onload = (event) => setImageUrl(event.target.result);
  }, []);

  const handleFileInput = useCallback(
    (e) => {
      e.preventDefault();
      preview(e);
    },
    [preview],
  );

  const renderImgUploader = () => (
    <ImgUploader imageUrl={imageUrl} handleFileInput={handleFileInput} />
  );

  return { imageUrl, renderImgUploader };
};

const ImgUploader = ({ imageUrl, handleFileInput }) => (
  <>
    <DropContainer
      type="image"
      src={imageUrl || FileUpload}
      alt="업로드 이미지"
      onDragOver={(e) => e.preventDefault()}
      onDragEnter={(e) => e.preventDefault()}
      onDragLeave={(e) => e.preventDefault()}
      onDrop={handleFileInput}
    />
    <div style={{ display: 'flex', justifyContent: 'center', width: 354 }}>
      <FileLabel htmlFor="chooseFile">
        사진 선택
        <ChooseFile
          id="chooseFile"
          type="file"
          accept="image/*"
          onChange={handleFileInput}
        />
      </FileLabel>
      <ResultButton disabled={!imageUrl} type="submit">
        결과 보기
      </ResultButton>
    </div>
  </>
);

ImgUploader.propTypes = {
  imageUrl: PropTypes.string,
  handleFileInput: PropTypes.func,
};

ImgUploader.defaultProps = {
  imageUrl: '',
  handleFileInput: null,
};

const DropContainer = styled.input`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 350px;
  height: 350px;
  object-fit: cover;
  border: 2px solid #92ce4d;
  margin-bottom: 2rem;
`;

const FileLabel = styled.label`
  font-size: 0.8rem;
  /* margin-top: 30px; */
  background-color: #92ce4d;
  /* color: #f6fff2; */
  text-align: center;
  padding: 1rem 0;
  /* width: 175px; */
  width: 100%;
  cursor: pointer;
  margin-right: 4px;
`;

const ChooseFile = styled.input`
  display: none;
`;

const long = keyframes`
  0% {
    width: 80px;
    /* opacity: 0; */
  background: #92ce4d;
  }
  100% {
  width: 100%;
  /* opacity: 1; */
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
  :disabled {
    display: none;
  }
  animation: ${long} 0.5s ease-out;
`;

export default useImageUploader;
