import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import LastestBoardContainer from "./LastestBoardContainer";
import BestBoardContainer from "./BestBoardContainer";
import { useAuthContext, useModalContext } from '../../contexts';

function Board(){
    const navigate = useNavigate();
    const { token } = useAuthContext();
    const { t } = useTranslation();
    const modal = useModalContext();

    // 작성 페이지로 이동
    const handleClick = () => {
        if (token.access) {   
          navigate('/board/upload');
        } else {
          modal(t('boardRequiredLogin'), 'select', {
            yes: () => navigate('/login'),
            no: () => {},
          })
        }
    }

    return (
        <BoardContainer>
            <StyledButton type='button' onClick={ handleClick }>{ t('boardUploadButton') }</StyledButton>
            <BestBoardContainer />
            {/* <hr/> */}
            <LastestBoardContainer />
        </BoardContainer>
    );


    // return (
      //   <BoardContainer>
      //     <StyledButton type="button" onClick={handleClick}>
      //       게시물 작성
      //     </StyledButton>
      //     {isLoadingBest ? (
      //       <div>로딩 아이콘</div>
      //     ) : (
      //       <GridContainer imageWidth={imageWidth}>
      //         {bestBoards &&
      //           Object.values(bestBoards.results).map((board) => (
      //             <Link to={`/board/details/${board.id}`}>
      //               <div className="items" key={board.id} ref={imageRef}>
      //                 <img src={board.photo} alt="이미지" />
      //               </div>
      //             </Link>
      //           ))}
      //       </GridContainer>
      //     )}
      //   </BoardContainer>
      // );
}

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

// const GridContainer = styled.div`
//   height: 72vh;
//   display: grid;
//   grid-template-columns: repeat(5, 1fr);
//   gap: 0.5rem;
//   overflow-y: auto;

//   > a {
//     :first-child {
//       grid-column: 1/3;
//       grid-row: 1/3;
//     }

//     > div {
//       position: relative;
//       width: 100%;
//       padding-bottom: 100%;
//       overflow: hidden;

//       > img {
//         width: 100%;
//         height: 100%;
//         object-fit: cover;
//         border-radius: 20px;
//         position: absolute;
//       }
//     }
//   }
// `;

export default Board;
