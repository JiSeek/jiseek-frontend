import React, { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import { useFoodUpload } from '../../hooks/FoodSearch';
import { useAuthContext } from '../../contexts';
import jiseekApi from '../../api';
import { myPageKeys } from '../../constants';
import { useImageSlider } from '../../hooks/common';
import { LikeButton, StyledErrorMsg } from '../../components/common';
import { FoodDetails } from '../../components/FoodSearch';

const FoodSearchImageTab = () => {
  // const [lang] = useLangContext();
  const { token } = useAuthContext();
  const [favList, setFavList] = useState([]);
  const [listFind, setListFind] = useState([]); // 임시 포맷 정해지면 변경해야됨.
  const { analysis, reset, status, RenderFoodUpload } = useFoodUpload();

  // 좋아요한 음식 리스트 가져오기
  const { status: likeStatus } = useQuery(
    myPageKeys.favFoods,
    jiseekApi.get({ token: token.access }),
    {
      cacheTime: Infinity,
      staleTime: Infinity,
      enabled: analysis.length !== 0,
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
    <article style={{ display: 'flex', justifyContent: 'center' }}>
      {status === 'loading' && <div>로오딩 표오시</div>}
      {status !== 'success' ? (
        RenderFoodUpload()
      ) : (
        <FoodDetails id={analysis[slideIdx]?.id || -1}>
          {RenderImageSlider()}
          <div>
            <LikeButton
              type="food"
              id={analysis[slideIdx]?.id || -1}
              like={favList.indexOf(analysis[slideIdx]?.id) !== -1}
            />
            {likeStatus === 'error' && (
              <StyledErrorMsg>
                좋아요한 음식 정보를 얻을 수 없어 정상 반영이 불가능합니다.
              </StyledErrorMsg>
            )}
          </div>
          <button type="button" onClick={() => reset()}>
            다시 검사하기
          </button>
        </FoodDetails>
      )}
    </article>
  );
};

export default FoodSearchImageTab;
