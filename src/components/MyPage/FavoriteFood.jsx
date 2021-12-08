import React from 'react';
import PropTypes from 'prop-types';
import { LikeButton, StyledFavContainer } from '../common';

const FavoriteFood = ({ favFoods, status, onClick }) => (
  <div>
    {status === 'loading' && <>로딩은 요기</>}
    {status === 'error' && <>에러는 요기</>}
    {status === 'success' && (
      <StyledFavContainer>
        {favFoods.map(({ pk, name, image }) => (
          <div key={`${name}-${pk}`}>
            <ul>
              <li>
                <img src={image} alt={`${name} 이미지`} />
              </li>
              <li>{name}</li>
              <button value={pk} onClick={onClick} type="button">
                상세보기
              </button>
            </ul>
            <LikeButton
              type="food"
              data={{ pk: Number(pk), name, image }}
              like
            />
          </div>
        ))}
      </StyledFavContainer>
    )}
  </div>
);

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
