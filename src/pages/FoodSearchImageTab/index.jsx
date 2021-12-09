import React, { useEffect, useState, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useQueryClient } from 'react-query';
import styled from 'styled-components';
import { useFoodUpload } from '../../hooks/FoodSearch';
import { useImageSlider } from '../../hooks/common';
import { FoodDetails } from '../../components/FoodSearch';
import { AnalysisGif } from '../../assets/images/images';
import { mutationKeys } from '../../constants';

const FoodSearchImageTab = () => {
  const { t } = useTranslation();
  const [listFind, setListFind] = useState([]);
  const { analysis, reset, status, RenderFoodUpload } = useFoodUpload();
  const { slideIdx, RenderImageSlider } = useImageSlider(listFind, {
    label: t('foodSearchAriaLable'),
  });

  useEffect(
    () =>
      analysis &&
      setListFind(() => analysis.map(({ name, url }) => ({ name, url }))),
    [analysis],
  );

  const queryClient = useQueryClient();
  const cancel = useCallback(async () => {
    await queryClient.cancelMutations(mutationKeys.all);
  }, [queryClient]);

  useEffect(() => () => cancel(), [cancel]);

  return (
    <article style={{ display: 'flex', justifyContent: 'center' }}>
      {analysis.length === 0 ? (
        <FoodUploadContainer>
          {status === 'loading' && (
            <img src={AnalysisGif} alt={t('foodSearchAnalysisLoading')} />
          )}
          {RenderFoodUpload()}
        </FoodUploadContainer>
      ) : (
        status === 'success' && (
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
        )
      )}
    </article>
  );
};

const FoodUploadContainer = styled.div`
  position: relative;

  > img {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
`;

export default FoodSearchImageTab;
