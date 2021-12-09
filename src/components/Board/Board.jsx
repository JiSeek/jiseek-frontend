import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import { Link, useNavigate } from 'react-router-dom';
import { useQuery } from 'react-query';
import jiseekApi from '../../api';
import { boardKeys } from '../../constants';
// import BoardContainer from './BoardContainer';

const Board = () => {
  const navigate = useNavigate();
  const [imageWidth, setImageWidth] = useState(0);
  const imageRef = useRef(null);

  // 게시판 목록 읽어오기 (R) : 좋아요순
  const {
    data: bestBoards,
    isLoading: isLoadingBest,
    isError: isErrorBest,
    error: errorBest,
  } = useQuery(boardKeys.superior, jiseekApi.get());

  useEffect(() => {
    if (imageRef.current) {
      setImageWidth(imageRef.current.clientWidth);
    }
  }, []);

  if (isErrorBest) {
    alert('에러', errorBest); // 모달
    return (
      <>
        <Link to={navigate(-1)}>
          <button type="button">이전 페이지로 돌아가기</button>
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
  };

  return (
    <BoardContainer>
      <StyledButton type="button" onClick={handleClick}>
        게시물 작성
      </StyledButton>
      {isLoadingBest ? (
        <div>로딩 아이콘</div>
      ) : (
        <GridContainer imageWidth={imageWidth}>
          {bestBoards &&
            Object.values(bestBoards.results).map((board) => (
              <Link to={`/board/details/${board.id}`}>
                <div className="items" key={board.id} ref={imageRef}>
                  <img src={board.photo} alt="이미지" />
                </div>
              </Link>
            ))}
        </GridContainer>
      )}
    </BoardContainer>
  );
};

const BoardContainer = styled.div`
  padding: 0 2rem;
`;

const StyledButton = styled.button`
  font-size: 0.9rem;
  background-color: #407f00;
  color: #f6fff2;
  text-align: center;
  width: 180px;
  height: 40px;
  cursor: pointer;
  border: none;
  margin-bottom: 1.5rem;
  border-radius: 5px;
  margin-left: calc(100% - 200px);
`;

const GridContainer = styled.div`
  height: 72vh;
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 0.5rem;
  overflow-y: auto;

  > a {
    :first-child {
      grid-column: 1/3;
      grid-row: 1/3;
    }

    > div {
      position: relative;
      width: 100%;
      padding-bottom: 100%;
      overflow: hidden;

      > img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        border-radius: 20px;
        position: absolute;
      }
    }
  }
`;

export default Board;
