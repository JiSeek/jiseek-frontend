import React, { useState, useCallback } from 'react';
import { useMutation, useQueryClient } from 'react-query';
import jiseekApi from '../../api';
import { foodKeys, mutationKeys } from '../../constants';
import { useAuthContext } from '../../contexts';
import { useImageUploader } from '../common';

/*
  Return Values:
    - analysis: 음식 사진 분석 결과, 객체 형식
        예) {'음식 이름': 좌표({up: 상, down: 하, left: 좌, right: 우 }), ...} (현재 생각 중인 형태로 결과에 따라 변경. 아직 구현X)
    - reset: 분석 결과 초기화
    - isLoading: 현재 음식 사진 전송 중 상태 플래그
    - isError: 음식 사진 전송 에러 여부 상태 플래그
    - RenderFoodUpload: 음식 업로드 컴포넌트 랜더링 함수
*/
const useFoodUpload = () => {
  const { token } = useAuthContext();
  const [analysis, setAnalysis] = useState([]);
  const queryClient = useQueryClient();
  const {
    imageFile,
    reset: uploadReset,
    renderImgUploader,
  } = useImageUploader();

  // TODO: S3 이미지 처리 비동기 함수
  const {
    mutateAsync: imgResult,
    status,
    reset: imgResultReset,
  } = useMutation(
    ({ result }) => jiseekApi.getImageResult('/jiseek', { result }),
    {
      mutationKey: mutationKeys.foodResult,
      onSuccess: (data, { foods }) => {
        console.log('success!', data, foods);
        setAnalysis(() => data.map((url, idx) => ({ ...foods[idx], url })));
      },
      onError: () => {
        // TODO: 모달 닫기 누르면 상태 클리어 or 냅둬?
        console.log('임시 에러처리');
      },
    },
  );

  // 알아볼 음식 이미지 전송을 위한 mutation
  const { mutate: foodUpload, reset: foodUploadReset } = useMutation(
    (photo) =>
      jiseekApi.post('/search/', { token: token.access, photo, isForm: true }),
    {
      mutationKey: mutationKeys.foodUpload,
      onMutate: async () => {
        await queryClient.cancelQueries(foodKeys.all);
      },
      onError: (err) => {
        // TODO: 모달 닫기 누르면 상태 클리어 or 냅둬?
        console.error('임시 에러처리', err);
      },
      onSuccess: (data) => {
        const result = [];
        const foods = [];
        data.result.forEach(
          ({
            food_id: id,
            class_name: className,
            similarity,
            x_cord: x,
            y_cord: y,
            width,
            height,
          }) => {
            foods.push({ id, name: className, similarity });
            result.push({
              className,
              url: data.photo,
              coordinates: `${x},${y},${width},${height}`,
            });
          },
        );
        return imgResult({ foods, result });
      },
    },
  );

  // 초기화 함수
  const reset = useCallback(() => {
    foodUploadReset();
    imgResultReset();
    uploadReset();
    setAnalysis([]);
  }, [foodUploadReset, imgResultReset, uploadReset]);

  // 분석을 원하는 사진 서버로 전송 함수
  const onSubmit = useCallback(
    (e) => {
      e.preventDefault();
      foodUpload(imageFile);
    },
    [imageFile, foodUpload],
  );

  const RenderFoodUpload = () => (
    <form onSubmit={onSubmit}>{renderImgUploader()}</form>
  );

  return { analysis, status, reset, RenderFoodUpload };
};

export default useFoodUpload;
