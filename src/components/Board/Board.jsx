import React from 'react';
import { useNavigate } from 'react-router-dom';
import LastestBoardContainer from "./LastestBoardContainer";
import BestBoardContainer from "./BestBoardContainer";

function Board(){
    const navigate = useNavigate();

    // 작성 페이지로 이동
    const handleClick = () => {
        // if logged in             // 모달
        navigate('/board/upload');
        // else '로그인이 필요한 서비스입니다'
    }

    return (
        <>
            <button type='button' onClick={ handleClick }>게시물 작성</button>
            <BestBoardContainer />
            <hr/>
            <LastestBoardContainer />
        </>
    );
}

export default Board;