import React from 'react';
import PropTypes from 'prop-types';
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
              <ul>
                <li>
                  <img src={image} alt={`${name} 이미지`} />
                </li>
                <li>{t(`foodSearchFoodName.${name}`)}</li>
                <button value={pk} onClick={onClick} type="button">
                  {t('myPageFavFoodDetailsBtn')}
                </button>
              </ul>
              <LikeButton
                type="food"
                data={{ pk: Number(pk), name, image }}
                like
              />
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

export default FavoriteFood;
