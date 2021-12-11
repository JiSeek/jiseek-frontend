import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import { LikeButton, StyledFavContainer } from '../common';
import { LoadingCircle } from '../../assets/images/images';

const FavoriteFood = ({ favFoods, status, onClick }) => {
  const { t } = useTranslation();

  return (
    <StyledFavContainer>
      {status === 'loading' && (
        <img src={LoadingCircle} alt={t('myPageFavFoodsLoading')} />
      )}
      {status === 'error' && <>에러는 요기</>}
      {status === 'success' && (
        <div>
          {favFoods.map(({ pk, name, image }) => (
            <div key={`${name}-${pk}`}>
              <img src={image} alt={`${name} 이미지`} />
              <Overlay />
              <HoverContents>
                <span>
                  <LikeButton
                    type="food"
                    data={{ pk: Number(pk), name, image }}
                    like
                  />
                </span>
                <span>{t(`foodSearchFoodName.${name}`)}</span>
                <span>
                  <button value={pk} onClick={onClick} type="button">
                    {t('myPageFavFoodDetailsBtn')}
                  </button>
                </span>
              </HoverContents>
            </div>
          ))}
        </div>
      )}
    </StyledFavContainer>
  );
};

FavoriteFood.propTypes = {
  favFoods: PropTypes.arrayOf(PropTypes.object),
  status: PropTypes.string,
  onClick: PropTypes.func,
};

FavoriteFood.defaultProps = {
  favFoods: [],
  status: '',
  onClick: null,
};

const Overlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.65);
  opacity: 0;
  transition: background 0.5s ease;
  border-radius: 15px;
`;

const HoverContents = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 100%;
  height: 80%;
  padding-top: 1rem;
  text-align: center;
  > span {
    z-index: 1;
    opacity: 0;
    transition: opacity 0.5s ease;

    :first-child {
      /* 좋아요 버튼 */
      text-align: right;
      padding-right: 1rem;
    }

    :nth-child(2) {
      /* 음식 명 */
      color: #fbfbfb;
      font-size: 1.5rem;
      font-weight: 500;
      letter-spacing: 1px;
      text-align: center;
    }

    :last-child {
      /* 상세보기 버튼 */
      text-align: center;
      > button {
        padding: 0.35rem 1rem;
        border: 3px solid #fbfbfbc5;
        background: none;
        font-family: inherit;
        font-size: 1rem;
        color: #fbfbfb;
        cursor: pointer;
      }
    }
  }
`;

export default FavoriteFood;
