import React from 'react';
import PropTypes, { any, string, number } from 'prop-types';
import { useQuery } from 'react-query';
import { foodKeys } from '../../constants';
import jiseekApi from '../../api';
import FoodDetails from './FoodDetails';

const getCacheTime = (min) => min * 60 * 1000;

const FoodDetailsContainer = ({ id, onModal, children }) => {
  const { data: foodInfo, status } = useQuery(
    foodKeys.detailById(id),
    jiseekApi.get(),
    {
      retry: typeof id === 'number' ? 3 : false,
      cacheTime: typeof id === 'number' ? getCacheTime(1) : 0,
      staleTime: Infinity,
    },
  );

  return (
    <FoodDetails foodInfo={foodInfo} status={status} onModal={onModal}>
      {children}
    </FoodDetails>
  );
};

FoodDetailsContainer.propTypes = {
  id: PropTypes.oneOfType([number, string]),
  onModal: PropTypes.bool,
  children: PropTypes.oneOfType([any]),
};

FoodDetailsContainer.defaultProps = {
  id: '',
  onModal: false,
  children: null,
};

export default FoodDetailsContainer;
