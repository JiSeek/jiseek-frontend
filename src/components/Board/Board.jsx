import React from 'react';
import styled from 'styled-components'; 
import { Link, useNavigate } from 'react-router-dom'; 
import { useQuery } from 'react-query';
import jiseekApi from '../../api';
import { boardKeys } from '../../constants';

function Board() {
    const navigate = useNavigate();
    const { data: boardList, isLoading, isError, error } = useQuery(boardKeys.superior, jiseekApi.get()); 
    
    if (isError) {
        return (
            <>
                <div>{error}</div>
                <Link to={navigate(-1)}>
                    <button type='button'>
                        이전 페이지로 돌아가기
                    </button>
                </Link>
            </>
        );
    }

    const handleClick = () => {
        // if logged in
        navigate('/board/upload');
        // else 모달창 '로그인이 필요한 서비스입니다'
    }

    return (
        <>
            { isLoading ? 
                <div>로딩 아이콘</div>
                :
                <GridContainer>
                    { boardList && Object.values(boardList.results).map( (board) => (
                        <Link to={`/board/${board.id}`}>
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