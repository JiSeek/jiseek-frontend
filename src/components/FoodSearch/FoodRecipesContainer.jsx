import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useQuery } from 'react-query';
import jiseekApi from '../../api';
import { recipeKeys } from '../../constants';
import FoodRecipes from './FoodRecipes';

const updateTime = (min) => min * 60 * 1000;

// 음식 레시피 검색
// TODO: 레시피가 아닌 영상 제거하는 과정 필요
const FoodRecipesContainer = ({ food }) => {
  const [recipes, setRecipes] = useState([]);
  // const queryClient = useQueryClient();
  const [findList, setFindList] = useState([]);

  // Get YouTube Recipe List
  const { status: listStatus } = useQuery(
    recipeKeys.recipeList(food),
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
      staleTime: updateTime(10),
      retryDelay: (attempt) => attempt * 1000,
      enabled: !!food,
      onSuccess: (data) => {
        setFindList(() => data.map(({ id }) => id.videoId));
      },
      // onError: () => queryClient.resetQueries('recipes', { exact: true }),
    },
  );

  console.log(listStatus, recipes);
  useEffect(() => {
    if (findList.length === 0) {
      return;
    }

    (async function () {
      try {
        const response = await Promise.all(
          findList.map((id) =>
            jiseekApi.getVideoRating({
              id,
              part: 'snippet, statistics, contentDetails, status',
              fields:
                'items(id, snippet(title, description, publishedAt), statistics(viewCount), contentDetails(duration))',
            })(),
          ),
        );
        const detailList = response.map((data) => data[0]);
        // TODO: 보류 필터링하면 검색 결과가 안뜨는 문제.
        // const cleanedList = detailList.filter(({ snippet }) => {
        //   // 띄어쓰기를 제거한 영상 제목에 찾고자 하는 음식 명이 정확히 들어있는지 확인
        //   const title = snippet.title.replace(/\s/g, '');
        //   return title.includes(food);
        // });
        // console.log(cleanedList);
        // cleanedList.sort(
        //   (a, b) =>
        //     parseInt(b.statistics.viewCount, 10) -
        //     parseInt(a.statistics.viewCount, 10),
        // );
        // setRecipes(() => cleanedList);
        detailList.sort(
          (a, b) =>
            parseInt(b.statistics.viewCount, 10) -
            parseInt(a.statistics.viewCount, 10),
        );
        setRecipes(() => detailList);
      } catch (err) {
        // TODO: 에러 처리 필요.
        console.error('에러러러', err);
      }
    })();
  }, [food, findList]);

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

// TODO useQueries 보류...
// const results = useQueries(
//   findList.map((id) => ({
//     queryKey: recipeKeys.detailById(id),
//     queryFn: jiseekApi.getVideoRating({
//       id,
//       part: 'snippet, statistics, contentDetails, status',
//       fields:
//         'items(id, snippet(title, description, publishedAt), statistics(viewCount), contentDetails(duration))',
//     }),
//     staleTime: Infinity,
//     enabled: listStatus === 'success' && findList.length !== 0,
//   })),
// );

// console.log(results);

// // useEffect(() => console.log('fsdnmflsd', recipes), [recipes]);

// useEffect(() => {
//   const validList = results.filter(
//     ({ status }) => status !== 'loading' && status !== 'error',
//   );
//   // .map(({ data }) => data[0]);
//   if (validList.length < 10) {
//     return;
//   }
//   const detailList = validList.map(({ data }) => data[0]);
//   const cleanedList = detailList.filter(({ snippet }) => {
//     //   // 띄어쓰기를 제거한 영상 제목에 찾고자 하는 음식 명이 정확히 들어있는지 확인
//     const title = snippet.title.replace(/\s/g, '');
//     console.log(title);
//     return title.includes(food);
//   });
//   console.log(cleanedList);
//   cleanedList.sort(
//     (a, b) =>
//       parseInt(b.statistics.viewCount, 10) -
//       parseInt(a.statistics.viewCount, 10),
//   );
//   // console.log(cleanedList);
//   // setRecipes(() => cleanedList);
// }, [food, results]);

// console.log(recipes);
