import React, { useState, useEffect } from 'react';
import { useMutation } from 'react-query';
import { useNavigate, useLocation, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import jiseekApi from '../../api';
import { useAuthContext } from '../../contexts';


function BoardModify() {
    const { token } = useAuthContext();
    const navigate = useNavigate();
    const location = useLocation();
    const params = useParams();
    const [ selectedImg, setSelectedImg ] = useState({file: '', url: location.state.photo});
    const [ modifiedText, setModifiedText ] = useState('');
    const [ modifiedCharacters, setModifiedChracters ] = useState (0);
    

    // 게시판 수정 기능 (U)
    const update = useMutation( 
        ({ photo, content }) => {
            const accessTkn = { token: token.access };
            if (photo && content) {
                return ( 
                    jiseekApi.put(`/boards/${params.id}/`, { 
                    ...accessTkn, 
                    isForm: true,
                    photo,
                    content })  
                );
            } 
            if (!photo && content) {
                return (
                    jiseekApi.patch(`/boards/${params.id}/`, {
                        ...accessTkn,
                        isForm: true,
                        content
                    })
                );
            } 
            return (
                jiseekApi.patch(`/boards/${params.id}/`, {
                    ...accessTkn,
                    isForm: true,
                    photo
                })
            );
        },
        {
            onSuccess: (da) => {
                console.log('게시판 수정 성공', da)
                // 서버에서 id받아서 상세 페이지로 이동
                navigate(`/board/details/${da.id}`);
            },
            onError: (e) => toast.error('게시판 수정 에러', e),
        }
    );

    const handleUpdate = () => {
        if (!selectedImg.file && !modifiedText) {
            toast.warn('수정된 내용이 없습니다!');
        } else {
           update.mutate({ content: modifiedText, photo: selectedImg.file });
        }
    }


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
        setModifiedChracters(modifiedText.length);
        if (modifiedText.length > 255) {
            setModifiedText(modifiedText.slice(0, 255));
        }
    }, [ modifiedText ]);

    
    return (
        <>               
        {/* 수정 페이지 */}
            <form action='#' onSubmit={(e) => {e.preventDefault()}}>
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
                    defaultValue={ location.state.content } 
                    onChange={(e) => setModifiedText(e.target.value)}
                />
                <div>{modifiedCharacters}/255</div>
                
                
                <button 
                    type='submit' 
                    onClick={ handleUpdate }
                >
                    게시판 올리기
                </button>
            </form>


            <button 
                type='button' 
                onClick={() => navigate(`/board/details/${params.id}`) }
            >
                돌아가기
            </button>
        </>
    );
}


export default BoardModify;