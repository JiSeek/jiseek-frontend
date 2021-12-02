import React from 'react';
import styled from 'styled-components'; 
import { NavLink, useNavigate } from 'react-router-dom';
import { useQuery } from 'react-query';
import jiseekApi from '../../api';
import { boardKeys } from '../../constants';

function Board() {
    const navigate = useNavigate();
    const { isLoading, isError, error, data: boardList } = useQuery(boardKeys.superior, jiseekApi.get()); 
    if (isError) {
        console.log(error);
        navigate('/board/');
    }
    return (
        <>
            { isLoading ? 
                <div>로딩 아이콘</div>
                :
                <GridContainer>
                    { boardList && boardList.map( (board) => (
                        <li className='items' key={board.id}>
                            <NavLink to={`/board/${board.id}`}>
                                <img src={board.src} alt='이미지' />
                            </NavLink>
                        </li>
                    ))
                    }
                </GridContainer>
            }
        </>
    );
}

const GridContainer = styled.div`
    display: grid;
    grid-template-columns: repeat(3, 1fr); // 1fr 1fr 1fr 반복
    gap: 2rem;
    place-items: stretch;
`
export default Board;