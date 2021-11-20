import React , {useState} from 'react';
import PropTypes from 'prop-types';
// PropTypes는 부모로부터 전달받은 데이터의 type을 검사한다.

function FoodUpload({getImgUrl}){

    const [selectedFile, setSelectedFile] = useState(null);
    const [previewImgUrl, setPreviewImgUrl] = useState("");

    const preview = (e) => {
        const reader = new FileReader;
        const fileList = e.target.files;
        reader.readAsDataURL(fileList[0]);
        reader.onload = (event) => {
            setPreviewImgUrl(event.target.result);
        }
    }

    const handleFileInput = (e) => {
        setSelectedFile(e.target.files[0]);
        preview(e);
    };

    const postImgUrl = () => {
        const UID = 100;
        const joinImgURL = UID + previewImgUrl;
        getImgUrl(joinImgURL);
    }

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
