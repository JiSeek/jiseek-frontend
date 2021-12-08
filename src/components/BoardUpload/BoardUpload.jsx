import React, { useState, useEffect } from 'react';
import { useMutation } from 'react-query';
// import { useMutation, useQuery } from 'react-query';
import { useNavigate } from 'react-router-dom';
// import { useNavigate, useParams } from 'react-router-dom';
import jiseekApi from '../../api';
// import { boardKeys } from '../../constants';
import { useAuthContext } from '../../contexts';

// 1. match로 구분 upload, modify
// 2. 수정삭제 버튼 보이게
// 3. 경고문
function BoardUpload() {
    const { token } = useAuthContext();
    const navigate = useNavigate();
    // const params = useParams();
    const [ selectedImg, setSelectedImg ] = useState({file: '', url: ''});
    const [ text, setText ] = useState('');
    const [ characters, setChracters ] = useState(0);
    const [ modifiedText, setModifiedText ] = useState('');
    const [ modifiedCharacters, setModifiedChracters ] = useState (0);
    // const [ warning, setWarning ] = useState(false);
    

    // 게시판 생성 기능 (C)
    const creation = useMutation( 
        (content, photo) => { 
            jiseekApi.post('/boards/', { 
                token: token.access, 
                content, 
                photo, 
               })
        },
        {
            // 서버에서 id받아서 상세 페이지로 이동
            onSuccess: (da) => {
                console.log('게시판 생성 성공', typeof(da))
                // navigate(`/board/details/${da.id}`);
            }
        }
    );


    // 이미지 선택
    const handleSelectImg = (e) => {
        const reader = new FileReader();
        const files = Array.from(e.target.files);
        reader.onloadend = () => {
            setSelectedImg({file : files, url: reader.result})
        }
        reader.readAsDataURL(files[0]); // 바이너리 파일을 Base64 Encode 문자열로 반환
    };


    // 텍스트는 255字까지
    useEffect(() => {
        setChracters(text.length);
        setModifiedChracters(modifiedText.length);
        if (text.length > 255) {
            setText(text.slice(0, 255));
        }
        if (modifiedText.length > 255) {
            setText(modifiedText.slice(0, 255));
        }
    }, [text, modifiedText]);


    // 게시판 수정 기능 (U)
    // const { 
    //     data: boardDetails,
    //     isSuccess,
    //     isError, 
    //     error } = useQuery(boardKeys.detailsById(params.id),
    //         jiseekApi.get
    //     )

    // if (isSuccess) {
    //     console.log('게시판 수정을 위한 조회기능 데이터', boardDetails);
    // }
    // if (isError) {
    //     console.log('게시판 수정을 위한 조회기능 오류', error);
    // }
    

    return (
        <>
        {/* 작성 페이지 */}
            <form action='#' onSubmit={(e) => {e.preventDefault()}}>
                <input 
                    type='file' 
                    name='image'  
                    accept='image/*' 
                    onChange={handleSelectImg} 
                />
                {selectedImg && 
                    <img src={selectedImg.url} alt='이미지' />}
                <textarea 
                    type='text' 
                    placeholder='텍스트 입력...' 
                    value={text} 
                    onChange={(e) => setText(e.target.value)}
                />
                {/* { warning && <div>255자까지 작성하실 수 있습니다!</div>} */}
                <div>{characters}/255</div>
                

            {/* 수정 페이지 */}
                <textarea 
                    type='text' 
                    // defaultValue={ content } 
                    onChange={(e) => setModifiedText(e.target.value)}
                />
                <div>{modifiedCharacters}/255</div>
                
                
                <button type='submit' onClick={() => creation.mutate(text, selectedImg) } >게시판 올리기</button>
            </form>
            <button type='button' onClick={() => navigate(-1) }>돌아가기</button>
        </>
    );
}

export default BoardUpload;