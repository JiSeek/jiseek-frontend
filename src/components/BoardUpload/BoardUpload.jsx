import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useMutation } from 'react-query';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify'
import jiseekApi from '../../api';
import { useAuthContext } from '../../contexts';


function BoardUpload() {
    const { token } = useAuthContext();
    const navigate = useNavigate();
    const [ selectedImg, setSelectedImg ] = useState({file: '', url: ''});
    const [ text, setText ] = useState('');
    const [ characters, setChracters ] = useState(0);
    const { t } = useTranslation();
    

    // 게시판 생성 기능 (C)
    const creation = useMutation( 
        ({ content, photo }) => (
            jiseekApi.post('/boards/', { 
                token: token.access, 
                isForm: true,
                content, 
                photo })  
        ),
        {
            onSuccess: (da) => {
                toast.success(t('boardCreateSucc'), da);
                // 서버에서 id받아서 상세 페이지로 이동
                navigate(`/board/details/${da.id}`);
            },
            onError: (e) => toast.error(t('boardCreateErr'), e),
        }
    );


    // 이미지 선택
    const handleSelectImg = (e) => {
        const reader = new FileReader();
        const files = Array.from(e.target.files);
        reader.onloadend = () => {
            setSelectedImg({file : files[0], url: reader.result})
        }
        reader.readAsDataURL(files[0]); // 바이너리 파일을 Base64 Encode 문자열로 반환
    };


    // 텍스트는 255자로 제한까지
    useEffect(() => {
        setChracters(text.length);
        if (text.length > 255) {
            toast(t('boardLimitedText'));
            setText(text.slice(0, 255));
        }
    }, [ text, t ]);
    

    return (
        <>
        {/* 작성 페이지 */}
            <form action='#' onSubmit={(e) => { e.preventDefault() }}>
                <input 
                    type='file' 
                    name='image'  
                    accept='image/*' 
                    onChange={ handleSelectImg } 
                />
                {selectedImg && 
                    <img src={ selectedImg.url } alt='이미지' />}
                <textarea 
                    type='text' 
                    placeholder={t('boardPlaceHolder')} 
                    value={ text } 
                    onChange={(e) => setText(e.target.value) }
                />
                <div>{ characters }/255</div>
                
                
                <button 
                    type='submit' 
                    onClick={() => creation.mutate({ content: text, photo: selectedImg.file }) }
                >
                    게시판 올리기
                </button>
            </form>


            <button 
                type='button' 
                onClick={() => navigate('/board') }
            >
                돌아가기
            </button>
        </>
    );
}

export default BoardUpload;