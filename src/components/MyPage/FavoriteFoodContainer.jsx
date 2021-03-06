import React, { useCallback } from 'react';
import { useQuery } from 'react-query';
import jiseekApi from '../../api';
import { myPageKeys } from '../../constants';
import { useAuthContext, useModalContext } from '../../contexts';
import FoodDetailsContainer from '../FoodSearch/FoodDetailsContainer';
import FavoriteFood from './FavoriteFood';

const FavoriteFoodContainer = () => {
  const openModal = useModalContext();
  const { token } = useAuthContext();
  const { data: favFoods, status } = useQuery(
    myPageKeys.favFoods,
    jiseekApi.get({ token: token.access }),
    { cacheTime: Infinity, staleTime: Infinity },
  );

  const onClick = useCallback(
    (e) =>
      openModal(
        <FoodDetailsContainer id={e.target.value} isModal />,
        'message',
      ),
    [openModal],
  );

  return <FavoriteFood favFoods={favFoods} status={status} onClick={onClick} />;
};

export default FavoriteFoodContainer;
