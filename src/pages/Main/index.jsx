import React from 'react';
import styled from 'styled-components';
import { MainFirst, MainTitle } from '../../assets/images/images';

const MainPage = () => (
  <div
    style={{
      height: 600,
      maxWidth: '1920px',
      margin: 'auto',
      position: 'relative',
    }}
  >
    <First />
    <Title src={MainTitle} />
  </div>
);

const First = styled.div`
  background: url(${MainFirst}) no-repeat;
  background-size: cover;
  background-position: center;
  height: 100%;
  width: 100%;
`;

const Title = styled.img`
  height: 290px;
  position: absolute;
  top: 143px;
  left: 185px;
`;

export default MainPage;
