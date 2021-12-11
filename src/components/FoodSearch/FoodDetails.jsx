import React from 'react';
import PropTypes, { any, number } from 'prop-types';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import FoodRecipesContainer from './FoodRecipesContainer';
// import Nutrition from './Nutrition';
import { LoadingCircle, NoResultGif } from '../../assets/images/images';
import { LikeButton, StyledErrorMsg } from '../common';
import FoodNutritionTable from './FoodNutritionTable';
import FoodNutritionChart from './FoodNutritionChart';

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
          <img src={LoadingCircle} alt="loading" />
        </Center>
      )}
      {/* TODO: 수정 필요, 임시 처리 */}
      {status === 'error' && <img src={NoResultGif} alt="결과 없음 이미지" />}
      {status === 'success' && (
        <>
          <TitleWithButton>
            <Title>{foodInfo?.name}</Title>
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
              <Subtitle>영양 정보</Subtitle>
              {/* <Nutrition foodInfo={foodInfo} /> */}
              <div>
                <FoodNutritionChart foodInfo={foodInfo} />
                <FoodNutritionTable foodInfo={foodInfo} />
              </div>
            </section>
          </GridResult>
          {!onModal && (
            <section>
              <Subtitle>음식 레시피</Subtitle>
              <FoodRecipesContainer food={foodInfo?.name || ''} />
            </section>
          )}
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
  margin-top: 1rem;
`;

const Result = styled.article`
  padding: 2rem 0;
  text-align: center; // TODO: 임시 처리
`;

const GridResult = styled.div`
  display: grid;
  grid-gap: 4rem;
  grid-template-columns: 1fr 2fr;
  text-align: initial; // TODO: 임시 처리
  margin-bottom: 4rem;

  section {
    &:last-child {
      > div {
        display: grid;
        grid-template-columns: 1.5fr 1fr;
        grid-gap: 1.5rem;
      }
    }
  }

  @media only screen and (max-width: 800px) {
    /* grid-template-columns: repeat(1, 1fr);
    grid-gap: 3rem;
    margin: 0; */
  }
`;

const Title = styled.h2`
  text-align: center;
  font-size: 3.5rem;
  font-weight: 500;
`;

const Subtitle = styled.h3`
  text-align: center;
  font-size: 1.5rem;
  font-weight: 500;
  margin: 1.25rem;

  display: flex;
  flex-basis: 100%;
  align-items: center;

  ::before,
  ::after {
    content: '';
    flex-grow: 1;
    background: #00110036;
    height: 1px;
  }

  ::before {
    margin-right: 1rem;
  }
  ::after {
    margin-left: 1rem;
  }
`;

const ImageSquare = styled.div`
  position: relative;
  width: 100%;
  padding-bottom: 100%;
  overflow: hidden;
  margin-top: 2rem;
  box-shadow: 0px 0 26px 5px rgb(0 0 0 / 20%);

  > img {
    position: absolute;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

export default FoodDetails;
