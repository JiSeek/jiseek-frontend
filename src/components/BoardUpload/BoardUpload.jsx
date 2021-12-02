import React, { useState } from 'react';
import { useMutation } from 'react-query';
import { useNavigate } from 'react-router-dom'
import jiseekApi from '../../api';
import { useAuthContext } from '../../contexts';

function BoardUpload() {
    const { token } = useAuthContext;
    const navigate = useNavigate();
    const [ todayNow, setTodayNow ] = useState();
    const [ selectedImg, setSelectedImg ] = useState({file: '', url: ''});
    const [ text, setText ] = useState('');
    
    const mutation = useMutation( 
        (content, photo, created_at) => { 
            jiseekApi.post({ 
                token: token.access, 
                content, 
                photo, 
                created_at, 
                modified_at:created_at })
        },
        {
            // 서버에서 id받아서 상세 페이지로 이동
            onSuccess: (board_id) => navigate(`/board/${board_id}`),
        }
    );
    // onSuccess or MutateAsync 중 뭐가 맞을까나
    mutation.mutateAsync(content, photo, created_at).then(data => navigate(`/board/${data}`));

    const handleBack = () => {
        navigate(-1);
    };

    const getTodayNow = () => {
        const date = new Date();
        const year = date.getFullYear();
        const month = date.getMonth() + 1;
        const day = date.getDate();
        const hour = date.getHours();
        const miniutes = date.getMinutes(); 
        setTodayNow(year + month + day + hour + miniutes);
    };

    const handleSelectImg = (e) => {
        const reader = new FileReader();
        const files = Array.from(e.target.files);
        reader.onloadend = () => {
            setSelectedImg({file : files, url: reader.result})
        }
        reader.readAsDataURL(files[0]); // 바이너리 파일을 Base64 Encode 문자열로 반환
    };

    const handleInputText = (e) => {
        setText(e.target.value);
    };

    const handleSubmit = () => {
            getTodayNow();
            mutation.mutate(text, selectedImg, todayNow);
    };

    return (
        <>  
            <button type='button' onClick={handleBack}>X</button>
            <form action='#'>
                <input 
                    type='file' 
                    name='image' 
                    multiple 
                    accept='image/*' 
                    onChange={handleSelectImg} 
                />
                {selectedImg && 
                    <img src={selectedImg.url} alt='이미지' />}
                <input 
                    type='text' 
                    placeholder='텍스트 입력...' 
                    value={text} 
                    onChange={handleInputText}
                />
                <button type='submit' onClick={handleSubmit} >게시</button>
            </form>
        </>
    );
}

export default BoardUpload;