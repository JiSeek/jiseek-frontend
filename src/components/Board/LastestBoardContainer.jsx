import React from 'react';
import styled from 'styled-components'; 
import { Link, useNavigate } from 'react-router-dom'; 
import { useQuery } from 'react-query';
import { useTranslation } from 'react-i18next';
import jiseekApi from '../../api';
import { boardKeys } from '../../constants';


function LastestBoardContainer() {
    const navigate = useNavigate();
    const { t } = useTranslation();

    // 게시판 목록 읽어오기 (R) : 최신순
    const { 
        data: boards, 
        isSuccess,
        isLoading, 
        isError, 
        error 
    } = useQuery(
        boardKeys.superior,
        jiseekApi.get(), {
            refetchOnWindowFocus: true,
            staleTime: 600000,
        }); 
    
    if (isSuccess) {
        console.log('최신순 조회 성공');
    }
    if (isError) {
        console.log(t('boardReadErr'), error);
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


    return (
        <>
            { isLoading ? 
                <div>로딩 아이콘</div>
                :
                <GridContainer>
                    { boards && Object.values(boards.results).map( (board) => (
                        <Link to={`/board/details/${board.id}`}>
                            <div className='items' key={board.id}>
                                <img src={board.photo} alt='이미지' />
                            </div>
                        </Link>
                    ))
                    }
                </GridContainer>
            }
        </>
    );
}


const GridContainer = styled.div`
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    gap: 2rem;
    place-items: stretch;
`


export default LastestBoardContainer;