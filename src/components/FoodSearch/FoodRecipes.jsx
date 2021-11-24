import React, { useState, useEffect } from 'react';
// import { useQuery } from 'react-query';
import PropTypes from 'prop-types';
import jiseekApi from '../../api';

// TODO: 임시 에러만 처리 21.11.24 JS

// 음식 레시피 검색
// TODO: 레시피가 아닌 영상 제거하는 과정 필요
const FoodRecipes = ({ food }) => {
  const [recipes, setRecipes] = useState([]);
  // TODO: 임시 처리

  useEffect(() => {
    if (!food) {
      return;
    }
    const searchRecipes = async () => {
      try {
        const resultIds = await jiseekApi.getRecipeList({
          q: `${food} 방법`, // 검색어, 레시피/방법/만들기 중 방법이 가장 결과가 좋음
          videoEmbeddable: true, // 다른 페이지 게시 가능 여부
          type: 'video', // 영상에서 검색
          regionCode: 'KR',
          part: 'snippet',
          fields: 'items(id(videoId))', // 영상 id를 결과값으로 도출
          maxResults: 10,
        })();
        // console.log(resultIds);
        const idList = resultIds.map(({ id }) => id.videoId);

        const resultDetails = await Promise.all(
          idList.map((eachId) =>
            jiseekApi.getVideoRating({
              id: eachId,
              part: 'snippet, statistics, contentDetails, status',
              fields:
                'items(id, snippet(title, description, publishedAt), statistics(viewCount), contentDetails(duration))',
            })(),
          ),
        );
        const detailList = resultDetails.map((detail) => detail[0]);
        // TODO: 코드 완료되면 테스트용 console.log 지우기
        console.log(resultDetails);

        const detailListCleaned = [];
        detailList.map((data) => {
          // 띄어쓰기를 제거한 영상 제목에 찾고자 하는 음식 명이 정확히 들어있는지 확인
          const checkTitle = data.snippet.title.replace(/\s/g, '');
          if (checkTitle.includes(food)) {
            detailListCleaned.push(data);
          }
          return detailListCleaned;
        });
        // 조회수 높은 순으로 정렬
        detailListCleaned.sort(
          (a, b) =>
            parseInt(b.statistics.viewCount, 10) -
            parseInt(a.statistics.viewCount, 10),
        );
        // TODO: 코드 완료되면 테스트용 console.log 지우기
        console.log('cleaned');
        setRecipes(detailListCleaned.slice(0, 4));
      } catch (e) {
        console.error(e);
      }
    };
    searchRecipes();
  }, [food]);

  if (!food) {
    return <span>결과 없음!!</span>;
  }

  console.log(recipes);

  return (
    <div>
      {recipes.length === 0 ? (
        <h1>Loading...</h1>
      ) : (
        <ul>
          {recipes.map((recipe) => (
            <li key={recipe.id}>
              <YoutubeContent youtube={recipe} />
            </li>
          ))}
        </ul>
      )}
      {/* 더 많은 레시피를 확인할 수 있게 유튜브로 이동 */}
      <a
        href={`https://www.youtube.com/results?search_query=${food}레시피`}
        target="_blank"
        rel="noreferrer"
      >
        레시피 더보기
      </a>
    </div>
  );
};

export default FoodRecipes;

// 음식 레시피 유튜브 영상을 페이지에 띄우는 부분
// 검색 결과 확인을 위해 임시로 사용
// TODO: 디자인 잡히면 지우고 FoodRecipes return문에서 정보만 내보낼 것
export const YoutubeContent = ({ youtube }) => {
  // 개행처리 된 부분을 <br /> 태그로 변경
  const descriptionReplaced = youtube.snippet.description.replace(
    /\n/g,
    '<br />',
  );
  return (
    <div>
      <p>제목 : {youtube.snippet.title}</p>
      {/* html을 직접 건들기 위해서 dangerouslySetInnerHTML 사용 */}
      <p dangerouslySetInnerHTML={{ __html: descriptionReplaced }} />
      <p>게시일 : {youtube.snippet.publishedAt.slice(0, 10)}</p>
      <p>조회수 : {youtube.statistics.viewCount}</p>
      {/* TODO: 영상 길이 HH:MM:SS 단위로 변경하기 */}
      <p>영상 길이 : {youtube.contentDetails.duration}</p>
      <iframe
        width="360px"
        height="210px"
        src={`https://www.youtube.com/embed/${youtube.id}`}
        title="YouTube video player"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
    </div>
  );
};

FoodRecipes.propTypes = {
  food: PropTypes.string.isRequired,
};

YoutubeContent.propTypes = {
  youtube: PropTypes.objectOf(
    PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  ).isRequired,
};
