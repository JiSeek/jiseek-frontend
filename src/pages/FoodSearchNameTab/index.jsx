import React, { useState, useEffect, useRef } from 'react';
import { useQueryClient } from 'react-query';
import styled from 'styled-components';
import { useFoodIdMap } from '../../hooks/FoodSearch';
import { FoodSearchBar, FoodDetails } from '../../components/FoodSearch';
import { foodKeys } from '../../constants';

const FoodSearchPage = () => {
  const [findTarget, setFindTarget] = useState('');
  const { foodIdMap } = useFoodIdMap();
  const queryClient = useQueryClient();
  const ref = useRef(null);

  useEffect(
    () => async () => {
      await queryClient.cancelQueries(foodKeys.all);
    },
    [queryClient],
  );

  return (
    <article ref={ref}>
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
