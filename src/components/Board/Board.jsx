import React from 'react';
import styled from 'styled-components'; 
import { Link, useNavigate } from 'react-router-dom'; 
import { useQuery } from 'react-query';
import jiseekApi from '../../api';
import { boardKeys } from '../../constants';

function Board() {
    const navigate = useNavigate();
    const { isLoading, isError, error, data: boardList } = useQuery(boardKeys.superior, jiseekApi.get()); 
    
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
                    { boardList && Object.entries(boardList).map( (board) => (
                        // 객체에서 배열 바꿀 필요없이 바로 map하는 방법
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
    grid-template-columns: repeat(5, 1fr); // 1fr 1fr 1fr 반복
    gap: 2rem;
    place-items: stretch;
`
export default Board;