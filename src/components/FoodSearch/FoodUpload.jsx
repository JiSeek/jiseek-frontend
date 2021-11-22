import React , {useState} from 'react';
import PropTypes from 'prop-types';
// PropTypes는 부모로부터 전달받은 데이터의 type을 검사한다.

function FoodUpload({getImgUrl}){

    // selectedFile : 사용자가 선택한 파일의 정보
    // previewImgUrl : 사용자 로컬의 이미지를 프리뷰로 띄우기 위해 필요한 로컬 이미지 주소 값
    const [selectedFile, setSelectedFile] = useState(null);
    const [previewImgUrl, setPreviewImgUrl] = useState("");

    // 프리뷰
    const preview = (e) => {
        const reader = new FileReader;
        const fileList = e.target.files;
        reader.readAsDataURL(fileList[0]);
        reader.onload = (event) => {
            setPreviewImgUrl(event.target.result);
        }
    }

    // 파일이 인풋되면 프리뷰로 보여주기
    const handleFileInput = (e) => {
        setSelectedFile(e.target.files[0]);
        preview(e);
    };

    // 최종 제출할 이미지의 파일명은 사용자의 ID를 입력하여 고유한 이름으로 변경하기
    // UID + previewImgUrl(사용자의 로컬 파일명)
    const postImgUrl = () => {
        const UID = 100;
        const joinImgURL = UID + previewImgUrl;
        getImgUrl(joinImgURL);
    }

    // 부모 컴포넌트로 이미지를 전달하기
    const handleUpload = () => {
        postImgUrl();
    }


    return (
    <>
        <div>File Upload</div>
        <input type="file" onChange={handleFileInput}/>
        <button type="submit" onClick={() => handleUpload(selectedFile)}> Upload to Server</button>
        {selectedFile && 
            (<div className = "image_area">
                <img src={previewImgUrl} alt = "업로드한 사진입니다." width = "400" height="600" />
            </div>)}
    </>
    
)}

FoodUpload.propTypes = {
    getImgUrl: PropTypes.func.isRequired,
};

export default FoodUpload;
