import React, { useCallback, useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
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
    <div style={{ display: 'flex', justifyContent: 'center' }}>
      <FileLabel htmlFor="chooseFile">
        사진 선택
        <ChooseFile
          id="chooseFile"
          type="file"
          accept="image/*"
          onChange={handleFileInput}
        />
      </FileLabel>
      <button disabled={!imageUrl} type="submit">
        결과 보기
      </button>
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
  max-height: 350px;
  border: 2px solid #72af2c;
  margin-bottom: 2rem;
`;

const FileLabel = styled.label`
  font-size: 0.8rem;
  margin-top: 30px;
  background-color: #407f00;
  color: #f6fff2;
  text-align: center;
  padding: 1rem 1.5rem;
  width: 100%;
  cursor: pointer;
`;

const ChooseFile = styled.input`
  display: none;
`;

export default useImageUploader;
