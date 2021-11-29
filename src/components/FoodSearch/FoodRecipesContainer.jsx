import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useQueries, useQuery } from 'react-query';
import jiseekApi from '../../api';
import { recipeKeys } from '../../constants';
import FoodRecipes from './FoodRecipes';

// const updateTime = (min) => min * 60 * 1000;

// 음식 레시피 검색
// TODO: 레시피가 아닌 영상 제거하는 과정 필요
const FoodRecipesContainer = ({ food }) => {
  const [recipes, setRecipes] = useState([]);
  const [findList, setFindList] = useState([]);
  // const queryClient = useQueryClient();

  // Get YouTube Recipe List
  const { status: listStatus } = useQuery(
    recipeKeys.all,
    jiseekApi.getRecipeList({
      q: `${food} 방법`, // 검색어, 레시피/방법/만들기 중 방법이 가장 결과가 좋음
      videoEmbeddable: true, // 다른 페이지 게시 가능 여부
      type: 'video', // 영상에서 검색
      regionCode: 'KR',
      part: 'snippet',
      fields: 'items(id(videoId))', // 영상 id를 결과값으로 도출
      maxResults: 10,
    }),
    {
      cacheTime: 1000,
      staleTime: 100, // updateTime(10),
      retryDelay: (attempt) => attempt * 1000,
      enabled: !!food,
      onSuccess: (data) => setFindList(() => data.map(({ id }) => id.videoId)),
      // onError: () => queryClient.resetQueries('recipes', { exact: true }),
    },
  );

  const results = useQueries(
    findList.map((id) => ({
      queryKey: recipeKeys.detailById(id),
      queryFn: jiseekApi.getVideoRating({
        id,
        part: 'snippet, statistics, contentDetails, status',
        fields:
          'items(id, snippet(title, description, publishedAt), statistics(viewCount), contentDetails(duration))',
      }),
      staleTime: Infinity,
      enabled: !!findList.length,
    })),
  );

  useEffect(
    () => console.log(listStatus, results, 'che'),
    [listStatus, results],
  );

  useEffect(() => {
    if (results.length === 0) {
      return;
    }
    const detailList = results.map((detail) => detail[0]);

    const cleanedList = detailList.filter((data) => {
      // 띄어쓰기를 제거한 영상 제목에 찾고자 하는 음식 명이 정확히 들어있는지 확인
      const title = data.snippet.title.replace(/\s/g, '');
      return title.inclues(food);
    });
    cleanedList.sort(
      (a, b) =>
        parseInt(b.statistics.viewCount, 10) -
        parseInt(a.statistics.viewCount, 10),
    );

    setRecipes(() => cleanedList.slice(0, 4));
  }, [food, results]);

  return (
    <>
      {recipes.length === 0 ? (
        <h1>Loading...</h1>
      ) : (
        <FoodRecipes food={food} recipes={recipes} />
      )}
    </>
  );
};

FoodRecipesContainer.propTypes = {
  food: PropTypes.string,
};

FoodRecipesContainer.defaultProps = {
  food: '',
};

export default FoodRecipesContainer;
