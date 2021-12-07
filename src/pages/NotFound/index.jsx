import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { NotFoundGif } from '../../assets/images/images';

const NotFound = () => (
  <NotFoundPage>
    <img src={NotFoundGif} alt="not found" />
    <GoBack>
      <Link to="/" replace>
        돌아가기
      </Link>
    </GoBack>
  </NotFoundPage>
);

const NotFoundPage = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  background: #fbfbfb;

  > img {
    height: 50vh;
    object-fit: contain;
    transform: translateY(-10%);
  }
`;

const GoBack = styled.div`
  transform: translateY(-100%);
  background-color: #407f00;
  color: #f6fff2;
  width: 180px;
  height: 40px;
  border-radius: 50px;
  cursor: pointer;
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export default NotFound;
