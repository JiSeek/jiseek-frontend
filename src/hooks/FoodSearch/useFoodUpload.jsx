import React, { useState, useCallback } from 'react';
import { useMutation, useQueryClient } from 'react-query';
import FoodUpload from '../../components/FoodSearch/FoodUpload';
import jiseekApi from '../../api';

/*
  Return Values:
    - analysis: 음식 사진 분석 결과, 객체 형식
        예) {'음식 이름': 좌표({up: 상, down: 하, left: 좌, right: 우 }), ...} (현재 생각 중인 형태로 결과에 따라 변경. 아직 구현X)
    - isLoading: 현재 음식 사진 전송 중 상태 플래그
    - isError: 음식 사진 전송 에러 여부 상태 플래그
    - reset: 현재 mutation 상태 초기화(data, error 등)
    - RenderFoodUpload: 음식 업로드 컴포넌트 랜더링 함수
*/
const useFoodUpload = () => {
  // TODO: 업로드한 이미지 URL 정보도 필요할 듯, FoodUpload 컴포넌트 프리뷰와 분리가 필요할 수도...
  // const [imageUrl setImageUrl] = useState('');
  const [foodImg, setFoodImg] = useState('');
  const [analysis, setAnalysis] = useState([]);
  const queryClient = useQueryClient();

  // 알아볼 음식 이미지 전송을 위한 mutation
  const { mutate, reset, isLoading, isError } = useMutation(
    (image) => jiseekApi.post('/foods/', { image }),
    {
      mutationKey: 'foodUpload',
      onMutate: () => queryClient.cancelQueries('food'),
      onError: (err) => console.error('임시 에러처리', err),
      onSuccess: () => {
        // TODO: 결과 데이터 형식에 따라 수정 필요
        // 테스트 데이터
        setAnalysis(
          () =>
            [
              [1, '불고기', 99, 1, 2, 3, 4],
              [10, '쇠고기', 80, 1, 2, 3, 4],
              [15, '쇠고기 구이', 77, 1, 2, 3, 4],
            ].map(([id, name, accuracy, ...position]) => ({
              id,
              name,
              accuracy,
              position,
            })),

          // [
          //   [1, '불고기', 99, 1, 2, 3, 4],
          //   [10, '쇠고기', 80, 1, 2, 3, 4],
          //   [15, '쇠고기 구이', 77, 1, 2, 3, 4],
          // ].reduce(
          //   (prev, [, name, accuracy, ...coordinate]) => ({
          //     ...prev,
          //     [name]: { accuracy, coordinate },
          //   }),
          //   {},
          // ),
        );
      },
    },
  );

  // 분석을 원하는 사진 서버로 전송 함수
  const onSubmit = useCallback(
    (e) => {
      e.preventDefault();
      mutate(foodImg);
    },
    [foodImg, mutate],
  );

  const RenderFoodUpload = () => (
    <form onSubmit={onSubmit}>
      <FoodUpload setFoodImg={setFoodImg} />
    </form>
  );

  return { analysis, isLoading, isError, reset, RenderFoodUpload };
};

export default useFoodUpload;
