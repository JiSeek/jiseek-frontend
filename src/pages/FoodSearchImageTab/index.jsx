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
      setListFind(() =>
        analysis.map(({ id, name, url }) => ({ id, name, url })),
      ),
    [analysis],
  );

  const queryClient = useQueryClient();
  const cancel = useCallback(async () => {
    await queryClient.cancelMutations(mutationKeys.foodAll);
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
              <span>
                <span>{t('foodSearchImgResultTitle')}</span>
                <span>
                  {analysis
                    .map((eachList) => t(`foodSearchFoodName.${eachList.name}`))
                    .join(', ')}
                </span>
              </span>
              <button type="button" onClick={() => reset()}>
                {t('foodSearchImgRetry')}
              </button>
            </ResultFoodNames>
            <FoodDetails
              type="image"
              id={analysis[slideIdx]?.id || -1}
              imgUrl={analysis[slideIdx]?.url}
            >
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
  font-size: 1.5rem;
  font-weight: 500;

  > span {
    border-bottom: 2px solid #c1dda0;
    padding: 0.7rem 0 0.5rem 0;

    > span {
      padding: 0 0.5rem;

      :nth-child(2n) {
        /* border-right: 1px solid; */
      }

      :first-child {
        border-left: none;
      }
      :last-child {
        border-right: none;
      }
    }
  }

  > button {
    font-size: 0.9rem;
    background-color: #407f00;
    color: #f6fff2;
    cursor: pointer;
    border: none;
    border-radius: 5px;
    padding: 0.75rem 1.25rem;
    letter-spacing: 1px;

    margin-left: 2rem;
  }
`;

export default FoodSearchImageTab;
