import React , {useState} from 'react';
import PropTypes from 'prop-types';
// PropTypes는 부모로부터 전달받은 데이터의 type을 검사한다.

// import { uploadFile } from 'react-s3';

// const S3_BUCKET = process.env.REACT_APP_S3_BUCKET;
// const REGION = process.env.REACT_APP_REGION;
// const ACCESS_KEY = process.env.ACCESS_KEY;
// const SECRET_ACCESS_KEY = process.env.SECRET_ACCESS_KEY;

// const config = {
//     bucketName: S3_BUCKET,
//     region: REGION,
//     accessKeyId: ACCESS_KEY,
//     secretAccessKey: SECRET_ACCESS_KEY,
// }


    
function FoodUpload({getImgUrl}: Props){

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

    // const handleUpload = async (file) => {
    //     uploadFile(file, config)
    //         .then(data => console.log(data))
    //         .catch(err => console.error(err))
    // };

    const postImgUrl = () => {
        const UID = 100;
        // const joinImgurl = UID + selectedFile;
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

FoodUpload.defaultProps = {
    getImgUrl: null
}

FoodUpload.propsTypes = {
    getImgUrl: PropTypes.func.isRequired,
};


export default FoodUpload;
