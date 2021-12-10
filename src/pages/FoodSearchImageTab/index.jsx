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
    <article>
      {analysis.length === 0 ? (
        <FoodUploadContainer
          style={{ display: 'flex', justifyContent: 'center' }}
        >
          {status === 'loading' && (
            <img
              src={AnalysisGif}
              alt={t('foodSearchAnalysisLoading')}
              style={{ objectFit: 'contain', background: '#fbfbfb' }}
            />
          )}
          {RenderFoodUpload()}
        </FoodUploadContainer>
      ) : (
        status === 'success' && (
          <>
            <ResultFoodNames>
              <span>결과 : </span>
              {analysis.map((eachList) => (
                <span>{eachList.name}</span>
              ))}
              <button type="button" onClick={() => reset()}>
                다시 검색하기
              </button>
            </ResultFoodNames>

            <FoodDetails type="image" id={analysis[slideIdx]?.id || -1}>
              <div
                style={{
                  textAlign: 'center',
                  marginBottom: '1rem',
                  fontSize: '1.15rem',
                }}
              >
                <span>
                  {/* 정확도 */}
                  {t('foodSearchSimilarity', {
                    what: analysis[slideIdx]?.similarity,
                  })}
                </span>
              </div>
              {RenderImageSlider()}
            </FoodDetails>
          </>
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

const ResultFoodNames = styled.div`
  display: flex;
  justify-content: center;
  font-size: 1.2rem;

  > span {
    padding: 0 0.5rem;

    :nth-child(2n) {
      border-right: 1px solid;
    }

    :first-child {
      border-left: none;
    }
    :last-child {
      border-right: none;
    }
  }
`;

export default FoodSearchImageTab;
