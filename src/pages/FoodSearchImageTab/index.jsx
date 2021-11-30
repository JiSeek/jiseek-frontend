import React, { useEffect, useState } from 'react';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import { useQuery } from 'react-query';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { useFoodUpload } from '../../hooks/FoodSearch';
import { useAuthContext } from '../../contexts';
import jiseekApi from '../../api';
import { foodKeys, myPagekeys } from '../../constants';
import { useImageSlider } from '../../hooks/common';
import { LikeButton } from '../../components/common';
// import { FoodRecipes } from '../../components/FoodSearch';

const FoodSearchImageTab = () => {
  const location = useLocation();
  const navigate = useNavigate();
  // const [lang] = useLangContext();
  const { token } = useAuthContext();
  const [favList, setFavList] = useState([]);
  const [listFind, setListFind] = useState(); // 임시 포맷 정해지면 변경해야됨.
  const {
    analysis,
    // status: analysisStatus,
    RenderFoodUpload,
  } = useFoodUpload();

  // 좋아요한 음식 리스트 가져오기
  const { status: likeStatus } = useQuery(
    myPagekeys.favFood,
    jiseekApi.get({ token: token.access }),
    {
      staleTime: Infinity,
      onSuccess: (data) => setFavList(() => data.map(({ pk }) => pk)),
    },
  );

  const { slideIdx, RenderImageSlider } = useImageSlider(listFind, {
    label: { ko: '찾은 음식들', en: 'found foods' },
  });

  // 현재 음식 결과 조회 쿼리
  const { data: foodInfo, status: foodInfoStatus } = useQuery(
    foodKeys.detailById(analysis[slideIdx]?.id || -1),
    jiseekApi.get(),
    {
      cacheTime: Infinity,
      staleTime: Infinity,
      enabled: !!analysis.length, // TODO: 발생 의존성 처리 고민...
    },
  );

  useEffect(() => {
    console.log(
      favList,
      analysis[slideIdx],
      favList.indexOf(analysis[slideIdx]?.id),
    );
  }, [favList, analysis, slideIdx]);

  useEffect(
    () => analysis && setListFind(() => analysis.map(({ name }) => name)),
    [analysis],
  );

  // 이미지 탭일 경우 로그인 인증되어야 함.
  if (!token.access) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return (
    <article>
      <h2>음식사진 검색</h2>
      {analysis.length === 0 ? (
        RenderFoodUpload()
      ) : (
        <>
          <section>
            <h2>음식 분석 사진</h2>
            {RenderImageSlider()}
            <div>
              <LikeButton
                type="food"
                id={analysis ? analysis[slideIdx].id : -1}
                data={{
                  id: analysis[slideIdx]?.id,
                  name: analysis[slideIdx]?.name,
                  image: 'TODO: Add image URL',
                }}
                like={favList.indexOf(analysis[slideIdx]?.id) !== -1}
              />
              {(likeStatus === 'loading' || likeStatus === 'error') && (
                <span>
                  좋아요한 음식 정보를 얻을 수 없어 정상 반영이 불가능합니다.
                </span>
              )}
            </div>
            <button
              type="button"
              onClick={() =>
                navigate('/board/upload', {
                  state: {
                    image: 'TODO: Add image url',
                    position: analysis[slideIdx].position,
                  },
                })
              }
            >
              게시하기
            </button>
          </section>
          <section>
            <h2>영양정보 분석 결과</h2>
            {foodInfoStatus === 'loading' ? (
              <FontAwesomeIcon icon={faSpinner} spin />
            ) : (
              <span>
                영양정보 결과 컴포넌트(프레젠테이셔널) | {foodInfo?.data}
              </span>
            )}
          </section>
          <section>
            <h2>음식 레시피</h2>
            {foodInfoStatus === 'loading' ? ( // 임시땜빵
              <FontAwesomeIcon icon={faSpinner} spin />
            ) : (
              <></>
              // <FoodRecipes food={analysis[slideIdx].name} />
            )}
          </section>
        </>
      )}
    </article>
  );
};

export default FoodSearchImageTab;
