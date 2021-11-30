import React, { useState } from 'react';
import { useQuery } from 'react-query';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
// // 임시 떔빵
import jiseekApi from '../../api';
import { useFoodIdMap } from '../../hooks/FoodSearch';
import { foodKeys } from '../../constants';
import { FoodSearchBar, Nutrition } from '../../components/FoodSearch';
// FoodRecipes

const FoodSearchPage = () => {
  // const [lang] = useLangContext();

  // ------
  const [findTarget, setFindTarget] = useState('');
  // status: foodIdMapStatus
  const { foodIdMap } = useFoodIdMap();

  // 현재 음식 결과 조회 쿼리
  const { data: foodInfo, status: foodInfoStatus } = useQuery(
    foodKeys.detailById(foodIdMap[findTarget]),
    jiseekApi.get(),
    {
      cacheTime: Infinity,
      staleTime: Infinity,
      enabled: !!findTarget, // TODO: 발생 의존성 처리 고민...
    },
  );

  return (
    <article>
      <h2>음식명 검색</h2>
      <FoodSearchBar
        foodNames={Object.keys(foodIdMap)}
        setFindTarget={setFindTarget}
      />
      {findTarget && (
        <>
          <section>
            <h2>영양정보 분석 결과</h2>
            {foodInfoStatus === 'loading' ? (
              <FontAwesomeIcon icon={faSpinner} spin />
            ) : (
              <span>
                영양정보 결과 컴포넌트(프레젠테이셔널)<Nutrition foodInfo={foodInfo}/> | {foodInfo?.data}
              </span>
            )}
          </section>
          {/* <section>
            <h2>음식 레시피</h2>
            {foodInfoStatus === 'loading' ? ( // 임시땜빵
              <FontAwesomeIcon icon={faSpinner} spin />
            ) : (
              <>
                {findTarget}
                <FoodRecipes food={findTarget || ''} />
              </>
            )}
          </section> */}
        </>
      )}
    </article>
  );
};

export default FoodSearchPage;
