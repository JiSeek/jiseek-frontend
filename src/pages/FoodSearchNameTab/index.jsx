import React, { useState } from 'react';
import styled from 'styled-components';
import { useQuery } from 'react-query';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
// // 임시 떔빵
import jiseekApi from '../../api';
import { useFoodIdMap } from '../../hooks/FoodSearch';
import { foodKeys } from '../../constants';
import {
  FoodSearchBar,
  Nutrition,
  FoodRecipes,
} from '../../components/FoodSearch';
import { LoadingDot } from '../../assets/images/images';
import { Bulgogi } from '../../assets/images';

const FoodSearchPage = () => {
  // const [lang] = useLangContext();
  const [findTarget, setFindTarget] = useState('');
  // status: foodIdMapStatus
  const { foodIdMap } = useFoodIdMap();

  // 현재 음식 결과 조회 쿼리
  const { data: foodInfo, status: foodInfoStatus } = useQuery(
    foodKeys.detailById(foodIdMap[findTarget] || -1),
    jiseekApi.get(),
    {
      cacheTime: Infinity,
      staleTime: Infinity,
      enabled: !!findTarget, // TODO: 발생 의존성 처리 고민...
      onSuccess: (data) => {
        console.log('ㅇㄴㄹㄴㅇㄹ눙리ㅏ누리ㅏ', data);
      },
      onError: (err) => {
        // TODO: 에러 메시지 추가 + 아이콘이랑
        console.log('dfsdmlfs;mf', err);
        setFindTarget('');
      },
      onSettled: () => {
        console.log('3247498237498');
      },
    },
  );

  return (
    <article>
      <Center>
        <FoodSearchBar
          foodNames={Object.keys(foodIdMap)}
          setFindTarget={setFindTarget}
        />
      </Center>
      {findTarget && (
        <>
          <Result>
            {foodInfoStatus === 'loading' ? (
              <Center>
                <img src={LoadingDot} alt="loading" />
              </Center>
            ) : (
              <GridResult>
                <FoodImage>
                  <div style={{ textAlign: 'center' }}>{findTarget}</div>
                  <img src={Bulgogi} alt="test" style={{ width: '100%' }} />
                </FoodImage>
                <Nutrition foodInfo={foodInfo} /> | {foodInfo?.data}
              </GridResult>
            )}
          </Result>
          <section>
            <h2>음식 레시피</h2>
            {foodInfoStatus === 'loading' ? ( // 임시땜빵
              <FontAwesomeIcon icon={faSpinner} spin />
            ) : (
              <>
                {findTarget}
                <FoodRecipes food={findTarget || ''} />
              </>
            )}
          </section>
        </>
      )}
    </article>
  );
};

export default FoodSearchPage;

const Center = styled.div`
  display: flex;
  justify-content: center;
`;

const Result = styled.section`
  padding: 2rem 0;
`;

const FoodImage = styled.div`
  padding-right: 1.5rem;
`;

const GridResult = styled.span`
  display: grid;
  grid-template-columns: 1fr 1fr;
`;
