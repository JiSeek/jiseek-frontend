import React from 'react';
import PropTypes, { any, number } from 'prop-types';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import FoodRecipesContainer from './FoodRecipesContainer';
import Nutrition from './Nutrition';
import { LoadingCircle } from '../../assets/images/images';
import { LikeButton, StyledErrorMsg } from '../common';

const FoodDetails = ({
  type,
  foodInfo,
  status,
  favFoods,
  likeStatus,
  onModal,
  children,
}) => {
  const { t } = useTranslation();

  return (
    <Result>
      {status === 'loading' && (
        <Center>
          <img src={LoadingCircle} alt="loading" />
        </Center>
      )}
      {status === 'error' && <>요기다 에러메시지 퐉</>}
      {status === 'success' && (
        <>
          <Title>{foodInfo?.name}</Title>
          <GridResult>
            <section>
              <Subtitle> 음식 사진 </Subtitle>
              {!children && (
                <img
                  src={foodInfo?.image1}
                  alt="test"
                  style={{ width: '100%' }}
                />
              )}
              {children}
              {type === 'image' && (
                <>
                  <LikeButton
                    type="food"
                    data={{
                      pk: foodInfo?.id,
                      name: foodInfo?.name,
                      image: foodInfo?.image1,
                    }}
                    like={favFoods.indexOf(foodInfo?.id) !== -1}
                  />
                  {likeStatus === 'error' && (
                    <StyledErrorMsg>{t('foodSearchFavListErr')}</StyledErrorMsg>
                  )}
                </>
              )}
            </section>
            <section>
              <Subtitle>영양 정보</Subtitle>
              <Nutrition foodInfo={foodInfo} />
            </section>
            {!onModal && (
              <section>
                <Subtitle>음식 레시피</Subtitle>
                <FoodRecipesContainer food={foodInfo?.name || ''} />
              </section>
            )}
          </GridResult>
        </>
      )}
    </Result>
  );
};

FoodDetails.propTypes = {
  type: PropTypes.string,
  foodInfo: PropTypes.oneOfType([any]),
  status: PropTypes.string,
  favFoods: PropTypes.arrayOf(number),
  likeStatus: PropTypes.string,
  onModal: PropTypes.bool,
  children: PropTypes.oneOfType([any]),
};

FoodDetails.defaultProps = {
  type: 'name',
  foodInfo: {},
  status: '',
  favFoods: [],
  likeStatus: '',
  onModal: false,
  children: null,
};

// 임시
const Center = styled.div`
  display: flex;
  justify-content: center;
`;

const Result = styled.article`
  padding: 2rem 0;
`;

const GridResult = styled.div`
  display: grid;
  margin: 0 2rem;
  grid-gap: 2rem 4rem;
  grid-template-columns: repeat(2, 1fr);
  grid-template-areas:
    'photo chart'
    'recipes chart';

  section {
    &:first-child {
      grid-area: photo;
    }
    &:nth-child(2) {
      grid-area: chart;
    }
    &:last-child {
      grid-area: recipes;
      width: 100%;
    }
  }

  @media only screen and (max-width: 800px) {
    grid-template-columns: repeat(1, 1fr);
    grid-template-areas: 'photo' 'chart' 'recipes';
    grid-gap: 3rem;
    margin: 0;

    section {
      &:nth-child(2) {
        margin: 0 2rem;
      }
    }
  }
`;

const Title = styled.h2`
  text-align: center;
  font-size: 2rem;
  font-weight: 600;
  margin-bottom: 2.2rem;
`;

const Subtitle = styled.h3`
  text-align: center;
  font-size: 1.5rem;
  font-weight: 500;
  margin-bottom: 1rem;
`;

export default FoodDetails;
