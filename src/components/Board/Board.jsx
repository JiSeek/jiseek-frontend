import React from 'react';
import styled from 'styled-components'; 
import { Link, useNavigate } from 'react-router-dom'; 
import { useQuery } from 'react-query';
import jiseekApi from '../../api';
import { boardKeys } from '../../constants';
// import BoardContainer from './BoardContainer';

function Board() {
    const navigate = useNavigate();


    // 게시판 목록 읽어오기 (R) : 좋아요순
    const { 
        data: bestBoards, 
        isLoading: isLoadingBest, 
        isError: isErrorBest, 
        error: errorBest } = useQuery(boardKeys.superior, jiseekApi.get()); 
    
    if (isErrorBest) {
        alert('에러', errorBest); // 모달
        return (
            <>
                <Link to={navigate(-1)}>
                    <button type='button'>
                        이전 페이지로 돌아가기
                    </button>
                </Link>
            </>
        );
    }


    // // 게시판 목록 읽어오기 (R) : 최신순
    // const { 
    //     data: lastestBoards, 
    //     isLoading, 
    //     isErrorr, 
    //     error } = useQuery(boardKeys.superior, jiseekApi.get()); 
    
    // if (isError) {
    //     alert('에러', error); // 모달
    //     return (
    //         <>
    //             <Link to={navigate(-1)}>
    //                 <button type='button'>
    //                     이전 페이지로 돌아가기
    //                 </button>
    //             </Link>
    //         </>
    //     );
    // }


    // 작성 페이지로 이동
    const handleClick = () => {
        // if logged in             // 모달
        navigate('/board/upload');
        // else '로그인이 필요한 서비스입니다'
    }

    return (
        <>
            { isLoadingBest ? 
                <div>로딩 아이콘</div>
                :
                <GridContainer>
                    { bestBoards && Object.values(bestBoards.results).map( (board) => (
                        <Link to={`/board/details/${board.id}`}>
                            <div className='items' key={board.id}>
                                <img src={board.photo} alt='이미지' />
                            </div>
                        </Link>
                    ))
                    }
                </GridContainer>
            }
            <button type='button' onClick={handleClick}>게시물 작성</button>
        </>
    );
}


const GridContainer = styled.div`
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    gap: 2rem;
    place-items: stretch;
`


export default Board;