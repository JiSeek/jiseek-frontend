import React from 'react';
import BoardDetailsContainer from './BoardDetailsContainer';
import Comment from './Comment';

function BoardDetails() {
  return (
    <div>
      {/* 게시판 디테일 컨테이너 */}
      <BoardDetailsContainer />

      <hr />
      {/* 댓글 목록 */}
      <Comment />
    </div>
  );
}
export default BoardDetails;
