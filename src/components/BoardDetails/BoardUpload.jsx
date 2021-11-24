import React, { useCallback, useState } from 'react';
import { useMutation } from 'react-query';
import { useNavigate } from 'react-router-dom'
import jiseekApi from '../../api';

function BoardUpload() {
    const [ todayNow, setTodayNow ] = useState();
    const navigate = useNavigate();
    const [ selectedImg, setSelectedImg ] = useState({file: '', url: ''});
    const [ text, setText ] = useState('');

    const { mutate } = useMutation( 
        (content, image, time) => { 
            jiseekApi.post('/board/', { content, image, created_at:time, modified_at:'' })
        },
        {
            onSuccess: () => navigate('/board/'),
        }
    )
    
    const handleBack = () => {
        navigate('/board/')
    }

    const getTodayNow = () => {
        const date = new Date();
        const month = date.getMonth() + 1;
        const day = date.getDate();
        const hour = date.getHours();
        const miniutes = date.getMinutes(); 
        setTodayNow(month + day + hour + miniutes);
    }

    const handleSelectImg = (e) => {
        const reader = new FileReader();
        const files = Array.from(e.target.files);
        reader.onloadend = () => {
            setSelectedImg({file : files, url: reader.result})
        }
        reader.readAsDataURL(files[0]); // 바이너리 파일을 Base64 Encode 문자열로 반환
    }

    const handleInputText = (e) => {
        setText(e.target.value);
    }

    const handleSubmit = useCallback(
        () => {
            getTodayNow();
            mutate(text, selectedImg, todayNow);
        },
        [text, selectedImg, todayNow, mutate]
    );

    return (
        <>  
            <button type='button' onClick={handleBack}>X</button>
            <form action='#'>
                <input type='file' name='image' multiple accept='image/*' onChange={handleSelectImg} />
                {selectedImg && <img src={selectedImg.url} alt='이미지' />}
                <input type='text' placeholder='텍스트 입력...' value={text} onChange={handleInputText}/>
                <button type='submit' onClick={handleSubmit} >게시</button>
            </form>
        </>
    );
}

export default BoardUpload;