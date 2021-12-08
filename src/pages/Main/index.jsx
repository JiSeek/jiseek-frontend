import React from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import { MainFirst, MainTitle } from '../../assets/images/images';

const MainPage = () => {
  const { t } = useTranslation();
  return (
    <div
      style={{
        height: 600,
        maxWidth: '1920px',
        margin: 'auto',
        position: 'relative',
      }}
    >
      {t('test')}
      <First />
      <Title src={MainTitle} />
    </div>
  );
};

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
