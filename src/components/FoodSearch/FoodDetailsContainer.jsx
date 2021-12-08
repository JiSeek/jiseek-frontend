import React, { useState } from 'react';
import PropTypes, { any, string, number } from 'prop-types';
import { useTranslation } from 'react-i18next';
import { useQuery } from 'react-query';
import { foodKeys, myPageKeys } from '../../constants';
import jiseekApi from '../../api';
import FoodDetails from './FoodDetails';
import { LikeButton, StyledErrorMsg } from '../common';
import { useAuthContext } from '../../contexts';

const getCacheTime = (min) => min * 60 * 1000;

const FoodDetailsContainer = ({ type, id, onModal, children }) => {
  const { t } = useTranslation();
  const { token } = useAuthContext();
  const [favFoods, setFavFoods] = useState([]);
  const { data: foodInfo, status } = useQuery(
    foodKeys.detailById(id),
    jiseekApi.get(),
    {
      retry: typeof id === 'number' ? 3 : false,
      cacheTime: typeof id === 'number' ? getCacheTime(1) : 0,
      staleTime: Infinity,
    },
  );

  // 좋아요한 음식 리스트 가져오기
  const { status: likeStatus } = useQuery(
    myPageKeys.favFoods,
    jiseekApi.get({ token: token.access }),
    {
      cacheTime: Infinity,
      staleTime: Infinity,
      enabled: type === 'image',
      onSuccess: (data) => setFavFoods(() => data.map(({ pk }) => pk)),
    },
  );

  return (
    <FoodDetails
      type={type}
      foodInfo={foodInfo}
      status={status}
      onModal={onModal}
    >
      {children}
      {type === 'image' && (
        <div>
          <LikeButton
            type="food"
            data={{
              pk: foodInfo?.id || -1,
              name: foodInfo?.name,
              image: foodInfo?.image1,
            }}
            like={favFoods.indexOf(foodInfo?.id) !== -1}
          />
          {likeStatus === 'error' && (
            <StyledErrorMsg>{t('foodSearchFavListErr')}</StyledErrorMsg>
          )}
        </div>
      )}
    </FoodDetails>
  );
};

FoodDetailsContainer.propTypes = {
  type: PropTypes.string,
  id: PropTypes.oneOfType([number, string]),
  onModal: PropTypes.bool,
  children: PropTypes.oneOfType([any]),
};

FoodDetailsContainer.defaultProps = {
  type: 'name',
  id: '',
  onModal: false,
  children: null,
};

export default FoodDetailsContainer;
