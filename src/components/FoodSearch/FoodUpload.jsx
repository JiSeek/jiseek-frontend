import React , {useState} from 'react';
import { uploadFile } from 'react-s3';

const S3_BUCKET = process.env.REACT_APP_S3_BUCKET;
const REGION = process.env.REACT_APP_REGION;
const ACCESS_KEY = process.env.REACT_APP_ACCESS_KEY;
const SECRET_ACCESS_KEY = process.env.REACT_APP_SECRET_ACCESS_KEY;
const DIRNAME = process.env.REACT_APP_DIR_NAME;

const config = {
    bucketName: S3_BUCKET,
    region: REGION,
    accessKeyId: ACCESS_KEY,
    secretAccessKey: SECRET_ACCESS_KEY,
    dirName: DIRNAME,
}

    
function FoodUpload(){
   
    const [selectedFile, setSelectedFile] = useState(null);
    const [imgURL, setImgURL] = useState("");

    const preview = (e) => {
        const reader = new FileReader;
        const fileList = e.target.files;
        // selectedFile
        reader.readAsDataURL(fileList[0]);
        reader.onload = (event) => (
            setImgURL(event.target.result)
        )
    }

    const handleFileInput = (e) => {
        setSelectedFile(e.target.files[0]);
        preview(e);
    };

    const handleUpload = async (file) => {
        uploadFile(file, config)
            .then(
                data => console.log(data))
            .catch(err => console.error(err))
    };


    return <div>
        <div>React S3 File Upload</div>
        <input type="file" accept="image/*" capture="camera" onChange={handleFileInput}/>
        <button type="submit" onClick={() => handleUpload(selectedFile)}> Upload to S3</button>
        
        {selectedFile && (<div className = "image_area">
            <img src={imgURL} alt = "업로드한 사진입니다." width = "400" height="600" />
        </div>
        )}
        
    </div>
}


export default FoodUpload;
