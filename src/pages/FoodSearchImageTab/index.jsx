import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useFoodUpload } from '../../hooks/FoodSearch';
import { useImageSlider } from '../../hooks/common';
import { FoodDetails } from '../../components/FoodSearch';

const FoodSearchImageTab = () => {
  const { t } = useTranslation();
  const [listFind, setListFind] = useState([]);
  const { analysis, reset, status, RenderFoodUpload } = useFoodUpload();

  useEffect(
    () =>
      analysis &&
      setListFind(() => analysis.map(({ name, url }) => ({ name, url }))),
    [analysis],
  );

  const { slideIdx, RenderImageSlider } = useImageSlider(listFind, {
    label: t('foodSearchAriaLable'),
  });

  return (
    <article style={{ display: 'flex', justifyContent: 'center' }}>
      {status === 'loading' && <div>로오딩 표오시</div>}
      {status !== 'success' ? (
        RenderFoodUpload()
      ) : (
        <FoodDetails type="image" id={analysis[slideIdx]?.id || -1}>
          {RenderImageSlider()}
          <div>
            <span>
              {t('foodSearchSimilarity', {
                what: analysis[slideIdx]?.similarity,
              })}
            </span>
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
