import React, { useEffect, useState } from 'react';
import { useQueryClient } from 'react-query';
import styled from 'styled-components';
import { useFoodIdMap } from '../../hooks/FoodSearch';
import { FoodSearchBar, FoodDetails } from '../../components/FoodSearch';
import { Bulgogi } from '../../assets/images';
import { foodKeys } from '../../constants';

const FoodSearchPage = () => {
  // const [lang] = useLangContext();
  const [findTarget, setFindTarget] = useState('');
  // status: foodIdMapStatus
  const { foodIdMap } = useFoodIdMap();
  const queryClient = useQueryClient();

  useEffect(() => () => queryClient.cancelQueries(foodKeys.all), [queryClient]);

  return (
    <article>
      <Center>
        <FoodSearchBar
          foodNames={Object.keys(foodIdMap)}
          setFindTarget={setFindTarget}
        />
      </Center>
      {findTarget && (
        <FoodDetails id={foodIdMap[findTarget] || findTarget}>
          <FoodImage>
            <img src={Bulgogi} alt="test" style={{ width: '100%' }} />
          </FoodImage>
        </FoodDetails>
      )}
    </article>
  );
};

export default FoodSearchPage;

const Center = styled.div`
  display: flex;
  justify-content: center;
`;

const FoodImage = styled.div`
  /* padding-right: 1.5rem; */
`;
