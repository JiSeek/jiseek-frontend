import React from 'react';
import styled from 'styled-components';
import { Routes, Route } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import {
  FavoriteFood,
  FavoritePost,
  MyInfo,
  MyInfoUpdate,
} from '../../components/MyPage';

const MyPage = () => {
  const { t } = useTranslation();

  return (
    <StyledMyPage>
      <MyPageStructure>
        <Profile>
          <Title>{t('myPageTitle')}</Title>
          <Routes>
            <Route path="/" element={<MyInfo />} />
            <Route path="info" element={<MyInfoUpdate />} />
          </Routes>
        </Profile>
        <Favorite>
          <section>
            <Subtitle>{t('myPageFavFoodsTitle')}</Subtitle>
            <FavoriteFood />
          </section>
          <section>
            <Subtitle>{t('myPageFavPostsTitle')}</Subtitle>
            <FavoritePost />
          </section>
        </Favorite>
      </MyPageStructure>
    </StyledMyPage>
  );
};

const StyledMyPage = styled.div`
  width: 80vw;
  max-width: 1320px;
  padding: 4rem 0;
  margin: auto;
`;

const MyPageStructure = styled.div`
  display: flex;
`;

const Title = styled.div`
  font-size: 2rem;
  font-weight: 600;
  text-align: center;
  margin-bottom: 2.5rem;
  letter-spacing: 2px;
`;

const Profile = styled.div`
  width: 280px;
  margin-right: 4.75rem;
`;

const Favorite = styled.div`
  width: 100%;
  max-width: calc(1320px - 280px - 4.75rem);
  > section {
    :first-child {
      margin-top: 2rem;
      margin-bottom: 3rem;
    }
  }
`;

const Subtitle = styled.h2`
  font-size: 1.5rem;
  font-weight: 500;
  display: flex;
  flex-basis: 100%;
  align-items: center;
  margin-bottom: 1rem;

  ::after {
    content: '';
    flex-grow: 1;
    background: #00110036;
    height: 1px;
    margin-left: 1rem;
  }
`;

export default MyPage;
