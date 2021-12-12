import React, { useMemo, useCallback, useEffect } from 'react';
import PropTypes, { any, string, number } from 'prop-types';
import { useQuery, useQueryClient } from 'react-query';
import { foodKeys, myPageKeys } from '../../constants';
import jiseekApi from '../../api';
import FoodDetails from './FoodDetails';
import { useAuthContext } from '../../contexts';

const getCacheTime = (min) => min * 60 * 1000;

const FoodDetailsContainer = ({ type, id, imgUrl, isModal, children }) => {
  const { token } = useAuthContext();
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
  const { data: favList, status: likeStatus } = useQuery(
    myPageKeys.favFoods,
    jiseekApi.get({ token: token.access }),
    {
      cacheTime: Infinity,
      staleTime: Infinity,
      enabled: type === 'image',
    },
  );

  const favFoods = useMemo(
    () => (favList ? favList.map(({ pk }) => Number(pk)) : []),
    [favList],
  );

  // TODO: 테스트 필요
  const queryClient = useQueryClient();
  const cancel = useCallback(async () => {
    await queryClient.cancelQueries(foodKeys.detailById(id));
    await queryClient.cancelQueries(myPageKeys.favFoods);
  }, [id, queryClient]);

  useEffect(() => () => cancel(), [cancel]);

  return (
    <FoodDetails
      type={type}
      foodInfo={foodInfo}
      status={status}
      imgUrl={imgUrl}
      favFoods={favFoods}
      likeStatus={likeStatus}
      isModal={isModal}
    >
      {children}
    </FoodDetails>
  );
};

FoodDetailsContainer.propTypes = {
  type: PropTypes.string,
  id: PropTypes.oneOfType([number, string]),
  imgUrl: PropTypes.string,
  isModal: PropTypes.bool,
  children: PropTypes.oneOfType([any]),
};

FoodDetailsContainer.defaultProps = {
  type: 'name',
  id: '',
  imgUrl: '',
  isModal: false,
  children: null,
};

export default FoodDetailsContainer;
