import React, { useCallback } from 'react';
import { useQuery } from 'react-query';
import jiseekApi from '../../api';
import { myPageKeys } from '../../constants';
import { useAuthContext, useModalContext } from '../../contexts';
import FavoriteFood from './FavoriteFood';
// import { useLangContext } from '../../contexts';

const FavoriteFoodContainer = () => {
  // const [lang] = useLangContext();
  const openModal = useModalContext();
  const { token } = useAuthContext();
  const { data: favFoods, status } = useQuery(
    myPageKeys.favFoods,
    jiseekApi.get({ token: token.access }),
    { staleTime: Infinity },
  );

  // TODO: 임시 무지성 코딩
  const onClick = useCallback(() => openModal('test'), [openModal]);

  // TODO: 프레젠테이셔널 분리해야댐
  return <FavoriteFood favFoods={favFoods} status={status} onClick={onClick} />;
};

export default FavoriteFoodContainer;
