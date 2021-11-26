import React from 'react';
import { useLocation } from 'react-router-dom';
import { BoardUpload } from '../../components/BoardDetails';

const BoardDetailPage = () => {
  const location = useLocation();
  console.log('디테일', location);

  return 
    <div>
      BoardDetails
      <BoardUpload />
    </div>;
};

export default BoardDetailPage;
