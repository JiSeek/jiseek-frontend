import React, { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import { useFoodUpload } from '../../hooks/FoodSearch';
import { useAuthContext } from '../../contexts';
import jiseekApi from '../../api';
import { myPageKeys } from '../../constants';
import { useImageSlider } from '../../hooks/common';
import { LikeButton } from '../../components/common';
import { FoodDetails } from '../../components/FoodSearch';

const FoodSearchImageTab = () => {
  // const [lang] = useLangContext();
  const { token } = useAuthContext();
  const [favList, setFavList] = useState([]);
  const [listFind, setListFind] = useState([]); // 임시 포맷 정해지면 변경해야됨.
  const {
    analysis,
    setAnalysis,
    // foodUpload,
    RenderFoodUpload,
  } = useFoodUpload();

  // TODO: 이미지 전송했을 때 시도하도록 개선하기.
  // 좋아요한 음식 리스트 가져오기
  const { status: likeStatus } = useQuery(
    myPageKeys.favFoods,
    jiseekApi.get({ token: token.access }),
    {
      staleTime: Infinity,
      onSuccess: (data) => setFavList(() => data.map(({ pk }) => pk)),
    },
  );

  const { slideIdx, RenderImageSlider } = useImageSlider(listFind, {
    label: { ko: '찾은 음식들', en: 'found foods' },
  });

  useEffect(
    () => analysis && setListFind(() => analysis.map(({ name }) => name)),
    [analysis],
  );

  return (
    <article>
      <h2>음식사진 검색</h2>
      {analysis.length === 0 ? (
        RenderFoodUpload()
      ) : (
        <FoodDetails id={analysis[slideIdx]?.id || -1}>
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
            <button type="button" onClick={() => setAnalysis([])}>
              다시 검사하기
            </button>
          </section>
        </FoodDetails>
      )}
    </article>
  );
};

export default FoodSearchImageTab;
