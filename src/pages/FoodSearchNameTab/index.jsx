import React, { useState, useEffect } from 'react';
import { useQueryClient } from 'react-query';
import styled from 'styled-components';
import { useFoodIdMap } from '../../hooks/FoodSearch';
import { FoodSearchBar, FoodDetails } from '../../components/FoodSearch';
import { foodKeys } from '../../constants';

const FoodSearchPage = () => {
  // const [lang] = useLangContext();
  const [findTarget, setFindTarget] = useState('');
  // status: foodIdMapStatus
  const { foodIdMap } = useFoodIdMap();
  const queryClient = useQueryClient();

  useEffect(
    () => async () => {
      await queryClient.cancelQueries(foodKeys.all);
    },
    [queryClient],
  );

  return (
    <article>
      <Center>
        <FoodSearchBar
          foodNames={Object.keys(foodIdMap)}
          setFindTarget={setFindTarget}
        />
      </Center>
      {findTarget && <FoodDetails id={foodIdMap[findTarget] || findTarget} />}
    </article>
  );
};

const Center = styled.div`
  display: flex;
  justify-content: center;
`;

export default FoodSearchPage;
