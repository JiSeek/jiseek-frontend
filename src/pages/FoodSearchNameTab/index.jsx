import React, { useState } from 'react';
import styled from 'styled-components';
import { useQuery } from 'react-query';
// // 임시 떔빵
import jiseekApi from '../../api';
import { useFoodIdMap } from '../../hooks/FoodSearch';
import { foodKeys } from '../../constants';
import { FoodSearchBar, Nutrition } from '../../components/FoodSearch';
import { LoadingDot, NotFound } from '../../assets/images/images';

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
              <>
                {foodInfoStatus === 'error' ? (
                  <Center>
                    asdklfjalskdjf
                    <img src={NotFound} alt="not found" />
                  </Center>
                ) : (
                  <>
                    <Title>{findTarget}</Title>
                    <GridResult>
                      <FoodImage>
                        <img
                          src={foodInfo.image1}
                          alt="test"
                          style={{
                            width: '100%',
                            height: '480px',
                            objectFit: 'cover',
                          }}
                        />
                      </FoodImage>
                      <div>
                        <Subtitle>영양 정보</Subtitle>
                        <Nutrition foodInfo={foodInfo} />
                      </div>
                      {foodInfo?.data}
                      <div>
                        <Subtitle>레시피</Subtitle>
                      </div>
                    </GridResult>
                  </>
                )}
              </>
            )}
          </Result>
        </>
      )}
    </article>
  );
};

const Center = styled.div`
  display: flex;
  justify-content: center;
`;

const Result = styled.section`
  padding: 2rem 0;
`;

const GridResult = styled.span`
  display: grid;
  margin: 0 2rem;
  grid-gap: 3rem;
  grid-template-columns: repeat(2, 1fr);
  grid-template-areas:
    'photo chart'
    'recipes chart';

  div {
    &:first-child {
      grid-area: photo;
    }
    &:nth-child(2) {
      grid-area: chart;
    }
    &:last-child {
      grid-area: recipes;
      width: 100%;
    }
  }

  @media only screen and (max-width: 1000px) {
    grid-template-columns: repeat(1, 1fr);
    grid-template-areas: 'photo' 'chart' 'recipes';
    margin: 0;
    div {
      &:nth-child(2) {
        margin: 0 1.5rem;
      }
    }
  }
`;

const FoodImage = styled.div`
  /* padding-right: 1.5rem; */
`;

const Title = styled.div`
  text-align: center;
  font-size: 2rem;
  font-weight: 600;
  margin-bottom: 2.2rem;
`;

const Subtitle = styled.div`
  text-align: center;
  font-size: 1.5rem;
  font-weight: 500;
  margin-bottom: 1rem;
`;

export default FoodSearchPage;
