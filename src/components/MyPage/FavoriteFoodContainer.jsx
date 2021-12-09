import React, { useCallback } from 'react';
import { useQuery } from 'react-query';
import jiseekApi from '../../api';
import { myPageKeys } from '../../constants';
import { useAuthContext, useModalContext } from '../../contexts';
import FoodDetailsContainer from '../FoodSearch/FoodDetailsContainer';
import FavoriteFood from './FavoriteFood';
// import { useLangContext } from '../../contexts';

const FavoriteFoodContainer = () => {
  // const [lang] = useLangContext();
  const openModal = useModalContext();
  const { token } = useAuthContext();
  const { data: favFoods, status } = useQuery(
    myPageKeys.favFoods,
    jiseekApi.get({ token: token.access }),
    { cacheTime: Infinity, staleTime: Infinity },
  );

  // TODO: 임시 상세 보기 모달
  const onClick = useCallback(
    (e) =>
      openModal(
        <FoodDetailsContainer id={e.target.value} onModal>
          TEST
        </FoodDetailsContainer>,
      ),
    [openModal],
  );

  // TODO: 프레젠테이셔널 분리해야댐
  return <FavoriteFood favFoods={favFoods} status={status} onClick={onClick} />;
};

export default FavoriteFoodContainer;
