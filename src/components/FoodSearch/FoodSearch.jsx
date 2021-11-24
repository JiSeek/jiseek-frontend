import React, { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
// 임시 떔빵
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
//
import jiseekApi from '../../api';
import { useFoodIdMap, useFoodUpload } from '../../hooks/FoodSearch';
import SlideTabContainer from './SlideTabContainer';
import FoodSearchBarContainer from './FoodSearchBarContainer';
import useImageSlider from '../../hooks/common/useImageSlider';
import FoodRecipes from './FoodRecipes';

const foodKeys = {
  allList: 'food',
  detailById: (id) => ['food', id],
  // detailByName: (name) => ['food', name],
};

// TODO: 전반적인 예외 처리 + 게시판 연동 & sns링크 공유 기능 구현.
const FoodSearch = () => {
  const [imageTab, setImageTab] = useState(true);
  const [listFind, setListFind] = useState([]);
  const {
    foodIdMap,
    // isLoading: isMapLoading,
    // isError: isMapError,
  } = useFoodIdMap(foodKeys.allList);

  // Tab 변경 시 초기화 루틴(임시 처리일지도...?)
  // reset(); // TODO:추후 에러 처리 하기 위해 필요할 수도.
  useEffect(() => setListFind(() => []), [imageTab]);

  const {
    analysis,
    // isLoading: isUploadLoading,
    // isError: isUploadError,
    // reset,
    RenderFoodUpload,
  } = useFoodUpload();

  // 사진 분석 결과 찾은 음식들 저장
  useEffect(() => setListFind(() => Object.keys(analysis)), [analysis]);

  const { slideIdx, RenderImageSlider } = useImageSlider(listFind, {
    label: { ko: '찾은 음식들', en: 'found foods' },
  });

  // 현재 음식 결과 조회 쿼리
  const {
    data: foodInfo,
    // error: foodInfoError,
    status: foodInfoStatus,
  } = useQuery(
    foodKeys.detailById(foodIdMap[listFind[slideIdx]]),
    jiseekApi.get(),
    {
      staleTime: Infinity,
      enabled: !!listFind.length, // TODO: 발생 의존성 처리 고민...
    },
  );

  return (
    <div>
      <SlideTabContainer
        disabled={foodInfoStatus === 'loading'}
        imageTab={imageTab}
        setImageTab={setImageTab}
      />
      {imageTab ? (
        <section>
          {listFind.length === 0 ? (
            <>
              <h2>사진 업로드</h2>
              {RenderFoodUpload()}
            </>
          ) : (
            <>
              <h2>사진 분석 결과</h2>
              {RenderImageSlider()}
            </>
          )}
        </section>
      ) : (
        <FoodSearchBarContainer
          foodNames={Object.keys(foodIdMap)}
          setListFind={setListFind}
        />
      )}
      <div>
        {foodInfoStatus === 'loading' ? (
          <FontAwesomeIcon icon={faSpinner} spin />
        ) : (
          <span>영양정보 결과 컴포넌트(프레젠테이셔널) | {foodInfo?.data}</span>
        )}
      </div>
      <div>
        {foodInfoStatus === 'loading' ? ( // 임시땜빵
          <FontAwesomeIcon icon={faSpinner} spin />
        ) : (
          <>
            {listFind[slideIdx]}
            <FoodRecipes food={listFind[slideIdx] ? listFind[slideIdx] : ''} />
          </>
        )}
      </div>
    </div>
  );
};

export default FoodSearch;
