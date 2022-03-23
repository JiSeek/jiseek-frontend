import React from 'react';
import PropTypes, { any, number } from 'prop-types';
import { useTranslation } from 'react-i18next';
import styled, { css } from 'styled-components';
import FoodRecipesContainer from './FoodRecipesContainer';
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
  isModal,
  children,
}) => {
  const { t } = useTranslation();

  return (
    <Result isModal={isModal}>
      {status === 'loading' && (
        <Center>
          <img src={LoadingCircle} alt="loading" />
        </Center>
      )}
      {status === 'error' && <img src={NoResultGif} alt="결과 없음 이미지" />}
      {status === 'success' && (
        <>
          <TitleWithButton>
            <h2>{t(`foodSearchFoodName.${foodInfo?.name}`)}</h2>
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
              <div>
                <FoodNutritionChart foodInfo={foodInfo} />
                <FoodNutritionTable foodInfo={foodInfo} />
              </div>
            </section>
          </GridResult>
          {!isModal && (
            <section>
              <Subtitle>{t('foodSearchTitleRecipes')}</Subtitle>
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
  isModal: PropTypes.bool,
  children: PropTypes.oneOfType([any]),
};

FoodDetails.defaultProps = {
  type: 'name',
  foodInfo: {},
  imgUrl: '',
  status: '',
  favFoods: [],
  likeStatus: '',
  isModal: false,
  children: null,
};

const Center = styled.div`
  display: flex;
  justify-content: center;
`;

const TitleWithButton = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-end;
  margin-bottom: 2.2rem;
  margin-top: 1rem;

  > h2 {
    text-align: center;
    font-size: 3.5rem;
    font-weight: 500;
  }

  > button {
    height: 3.25rem;
    > img {
      height: 100%;
    }
  }
`;

const Result = styled.article`
  padding: 5rem 0;
  text-align: center;

  ${(props) =>
    props.isModal &&
    css`
      padding: 0;
      width: 100%;

      h2 {
        font-size: 2.5rem;
        font-weight: 500;
      }

      img {
        border-radius: 15px;
      }

      > div {
        :last-child {
          display: flex;
          flex-direction: column;

          > section {
            > h3 {
              font-size: 1.75rem;
            }
            > div {
              box-shadow: none;
            }
            :last-child > div {
              display: flex;
              flex-direction: column;
              h2 {
                font-size: 1.15rem;
                margin-top: 0.75rem;
              }
              > section > div {
                max-width: 500px;
              }
              > div {
                width: 30vw;
                max-width: 500px;
                max-height: 400px;
                > table {
                  margin: 1.5rem auto 0 auto;
                  width: 80%;
                }
              }
            }
          }
        }
      }
    `}
`;

const GridResult = styled.div`
  display: grid;
  grid-gap: 4rem;
  grid-template-columns: 1fr 2fr;
  text-align: initial;
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
