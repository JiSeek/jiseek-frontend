import React, {useState, useEffect} from 'react';
import FoodUpload from './FoodUpload';

const FoodSearch = () => {
    const [imgUrl, setImgUrl] = useState("");

    const getImgUrl = (userImgUrl) => {
        setImgUrl(userImgUrl);
    }

    useEffect( () => {
        console.log(imgUrl);
    });

    return (
        <>
        <FoodUpload 
            imgUrl = {imgUrl} // 지금 필요한 건 아닌데 없으면 자꾸 ESLint 에러가 나서 삽입함;
            getImgUrl={getImgUrl}/>
        </>
    )
}

export default FoodSearch;