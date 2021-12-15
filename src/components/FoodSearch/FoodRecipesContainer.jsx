import React from 'react';
import PropTypes from 'prop-types';
import { useQuery } from 'react-query';
import jiseekApi from '../../api';
import { foodKeys } from '../../constants';
import FoodRecipes from './FoodRecipes';

const updateTime = (min) => min * 60 * 1000;

const recipelistOpt = {
  videoEmbeddable: true, // 다른 페이지 게시 가능 여부
  type: 'video', // 영상에서 검색
  regionCode: 'KR',
  part: 'snippet',
  fields: 'items(id(videoId))', // 영상 id를 결과값으로 도출
  maxResults: 10,
};

const recipeDetailOpt = {
  part: 'snippet, statistics, contentDetails, status',
  fields:
    'items(id, snippet(title, description, publishedAt, thumbnails), statistics(viewCount), contentDetails(duration))',
};

// 10개의 영상 중 연관성 및 조회수 순으로 정렬 후 상위 4개 선택.
const selectRecipes = (recipeList, food) => {
  if (!recipeList || recipeList.length === 0) {
    return [];
  }
  const detailList = recipeList.map((data) => data[0]);
  // 좋아요순으로 내림차 정렬
  detailList.sort(
    (a, b) =>
      parseInt(b.statistics.viewCount, 10) -
      parseInt(a.statistics.viewCount, 10),
  );

  // 해당 검색어를 정확히 포함하는 레시피 영상이 있는지 검사
  const includeList = [];
  const excludeList = detailList.filter((video) => {
    const title = video.snippet.title.replace(/\s/g, '');
    if (title.includes(food)) {
      includeList.push(video);
      return false;
    }
    return true;
  });

  // 정확한 단어를 포함하는 영상이 부족할 시 추가 보충 작업
  if (includeList.length < 4) {
    includeList.push(...excludeList.slice(0, 4 - includeList.length));
  }

  return includeList.slice(0, 4);
};

// 음식 레시피 컴포넌트
const FoodRecipesContainer = ({ food }) => {
  const { data: recipes, status } = useQuery(
    foodKeys.recipes(food),
    async () => {
      try {
        const findList = await jiseekApi.getRecipeList({
          q: `${food} 방법`,
          ...recipelistOpt,
        })();

        const recipeList = await Promise.all(
          findList.map(({ id }) =>
            jiseekApi.getVideoRating({ id: id.videoId, ...recipeDetailOpt })(),
          ),
        );

        return selectRecipes(recipeList, food);
      } catch (err) {
        throw new Error(err);
      }
    },
    {
      cacheTime: updateTime(10),
      staleTime: Infinity,
      enabled: !!food,
    },
  );

  return <FoodRecipes food={food} recipes={recipes} status={status} />;
};

FoodRecipesContainer.propTypes = {
  food: PropTypes.string,
};

FoodRecipesContainer.defaultProps = {
  food: '',
};

export default FoodRecipesContainer;
