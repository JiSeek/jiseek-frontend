import React, { useState } from 'react';
import PropTypes from 'prop-types';
// PropTypes는 부모로부터 전달받은 데이터의 type을 검사한다.

function FoodUpload({ setFoodImg }) {
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewImgUrl, setPreviewImgUrl] = useState('');

  const preview = (e) => {
    const reader = new FileReader();
    const fileList = e.target.files;
    reader.readAsDataURL(fileList[0]);
    reader.onload = (event) => {
      setPreviewImgUrl(event.target.result);
    };
  };

  const handleFileInput = (e) => {
    setSelectedFile(e.target.files[0]);
    // TODO: set encoded food image
    setFoodImg('test~');
    preview(e);
  };

  return (
    <>
      <div>File Upload</div>
      <input type="file" onChange={handleFileInput} />
      <button disabled={!selectedFile} type="submit">
        Upload to Server
      </button>
      {selectedFile && (
        <div className="image_area">
          <img
            src={previewImgUrl}
            alt="업로드한 사진입니다."
            width="400"
            height="600"
          />
        </div>
      )}
    </>
  );
}

FoodUpload.propTypes = {
  setFoodImg: PropTypes.func.isRequired,
};

export default FoodUpload;
