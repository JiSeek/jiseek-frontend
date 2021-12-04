import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { GrDocumentUpload } from 'react-icons/gr';
// PropTypes는 부모로부터 전달받은 데이터의 type을 검사한다.

function FoodUpload({ setFoodImg }) {
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewImgUrl, setPreviewImgUrl] = useState('');

  const dragOver = (e) => {
    e.preventDefault();
  };

  const dragEnter = (e) => {
    e.preventDefault();
  };

  const dragLeave = (e) => {
    e.preventDefault();
  };

  const fileDropPreview = (e) => {
    e.preventDefault();
    const reader = new FileReader();
    const { files } = e.dataTransfer;
    reader.readAsDataURL(files[0]);
    reader.onload = (event) => {
      console.log(event.target)
      setPreviewImgUrl(event.target.result);
    };
  };
  const fileDrop = (e) => {
    setSelectedFile(e.dataTransfer[0]);
    // TODO: set encoded food image
    setFoodImg('test~');
    fileDropPreview(e);
  };

  const preview = (e) => {
    const reader = new FileReader();
    const fileList = e.target.files;
    reader.readAsDataURL(fileList[0]);
    reader.onload = (event) => {
      console.log(event.target)
      setPreviewImgUrl(event.target.result);
    };
  };

  const handleFileInput = (e) => {
    setSelectedFile(e.target.files[0]);
    // TODO: set encoded food image
    setFoodImg('test~');
    preview(e);
  };

  // console.log('사진으로 검색', previewImgUrl);
  return (
    <>
      {previewImgUrl === '' ? (
        <div>
          <DropContainer
            onDragOver={dragOver}
            onDragEnter={dragEnter}
            onDragLeave={dragLeave}
            onDrop={fileDrop}
          >
            <DropMessage>
              <UploadIcon>
                <GrDocumentUpload />
              </UploadIcon>
              <Message>드래그해서 음식 사진 올리기</Message>
            </DropMessage>
          </DropContainer>
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <div>
              <FileLabel for="chooseFile">사진 선택하기</FileLabel>
              <ChooseFile
                type="file"
                onChange={handleFileInput}
                id="chooseFile"
              />
            </div>
          </div>
        </div>
      ) : (
        <>
          {selectedFile && (
            <div>
              <img src={previewImgUrl} alt="업로드한 사진" width="400" />
            </div>
          )}
          <div>
            <button disabled={!selectedFile} type="submit">
              Upload to Server
            </button>
          </div>
        </>
      )}
    </>
  );
}

// export const DropZone = ({ setFoodImg }) => {
//   const [selectedFile, setSelectedFile] = useState(null);
//   const [previewImgUrl, setPreviewImgUrl] = useState('');

//   const dragOver = (e) => {
//     e.preventDefault();
//   };

//   const dragEnter = (e) => {
//     e.preventDefault();
//   };

//   const dragLeave = (e) => {
//     e.preventDefault();
//   };

//   const fileDrop = (e) => {
//     e.preventDefault();
//     const reader = new FileReader();
//     const { files } = e.dataTransfer;
//     console.log('file', files);
//     reader.readAsDataURL(files[0]);
//     reader.onload = (event) => {
//       setPreviewImgUrl(event.target.result);
//     };
//     console.log('previewImgUrl1111', previewImgUrl);
//   };

//   const handleFileInput = (e) => {
//     setSelectedFile(e.target.files[0]);
//     console.log('selectedFile', selectedFile);
//     // TODO: set encoded food image
//     setFoodImg('test~');
//     fileDrop(e);
//   };

//   return (
//     <DropContainer
//       onDragOver={dragOver}
//       onDragEnter={dragEnter}
//       onDragLeave={dragLeave}
//       onDrop={fileDrop}
//       onInput={handleFileInput}
//     >
//       <DropMessage>
//         <UploadIcon>
//           <GrDocumentUpload />
//         </UploadIcon>
//         <Message>드래그해서 음식 사진 올리기</Message>
//       </DropMessage>
//     </DropContainer>
//   );
// };

FoodUpload.propTypes = {
  setFoodImg: PropTypes.func.isRequired,
};

// DropZone.propTypes = {
//   setFoodImg: PropTypes.func.isRequired,
// };

const DropContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 460px;
  height: 200px;
  border: 2px solid #72af2c;
  margin-bottom: 2rem;
`;

const DropMessage = styled.div`
  text-align: center;
  font-family: Arial;
  font-size: 1.2rem;
`;

const UploadIcon = styled.div`
  text-align: center;
  margin: 0 auto;
  padding-bottom: 2rem;
  font-size: 2rem;
`;

const Message = styled.p`
  font-size: 1.1rem;
  font-weight: 600;
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

export default FoodUpload;
