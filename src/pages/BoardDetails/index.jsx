import React from 'react';
import { useLocation } from 'react-router-dom';

const BoardDetailPage = () => {
  const navigate = useLocation();
  console.log('디테일', navigate);

  return <div>BoardDetails</div>;
};

export default BoardDetailPage;
