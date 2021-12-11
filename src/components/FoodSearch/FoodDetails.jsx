import React from 'react';
import PropTypes, { any, number } from 'prop-types';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import FoodRecipesContainer from './FoodRecipesContainer';
import Nutrition from './Nutrition';
import { LoadingCircle, NoResultGif } from '../../assets/images/images';
import { LikeButton, StyledErrorMsg } from '../common';
// import FoodNutritionTable from './FoodNutritionTable';
// import FoodNutritionChart from './FoodNutritionChart';

const FoodDetails = ({
  type,
  foodInfo,
  status,
  imgUrl,
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
          <img src={LoadingCircle} alt={t('foodSearchAnalysisLoading')} />
        </Center>
      )}
      {status === 'error' && (
        <img src={NoResultGif} alt={t('foodSearchNoResult')} />
      )}
      {status === 'success' && (
        <>
          <TitleWithButton>
            <Title>{t(`foodSearchFoodName.${foodInfo?.name}`)}</Title>
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
          </TitleWithButton>
          <GridResult>
            <section>
              {(!children || !imgUrl) && (
                <ImageSquare>
                  <img src={foodInfo?.image1} alt="test" />
                </ImageSquare>
              )}
              {imgUrl && children}
            </section>
            <section>
              <Subtitle>{t('foodSearchTitleNutrition')}</Subtitle>
              <Nutrition foodInfo={foodInfo} />
              {/* <div style={{ height: 330 }}>
                <FoodNutritionChart foodInfo={foodInfo} />
              </div> */}
              {/*  <FoodNutritionTable foodInfo={foodInfo} /> */}
            </section>
            {!onModal && (
              <section>
                <Subtitle>{t('foodSearchTitleRecipes')}</Subtitle>
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
  imgUrl: PropTypes.string,
  status: PropTypes.string,
  favFoods: PropTypes.arrayOf(number),
  likeStatus: PropTypes.string,
  onModal: PropTypes.bool,
  children: PropTypes.oneOfType([any]),
};

FoodDetails.defaultProps = {
  type: 'name',
  foodInfo: {},
  imgUrl: '',
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

const TitleWithButton = styled.div`
  display: flex;
  justify-content: center;
  align-items: baseline;
  margin-bottom: 2.2rem;
`;

const Result = styled.article`
  padding: 2rem 0;
  text-align: center; // TODO: 임시 처리
`;

const GridResult = styled.div`
  display: grid;
  margin: 0 2rem;
  grid-gap: 2rem 4rem;
  grid-template-columns: repeat(2, 1fr);
  grid-template-areas:
    'photo chart'
    'recipes chart';
  text-align: initial; // TODO: 임시 처리

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
`;

const Subtitle = styled.h3`
  text-align: center;
  font-size: 1.5rem;
  font-weight: 500;
  margin: 1.25rem;
`;

const ImageSquare = styled.div`
  position: relative;
  width: 100%;
  padding-bottom: 100%;
  overflow: hidden;

  > img {
    position: absolute;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

export default FoodDetails;
