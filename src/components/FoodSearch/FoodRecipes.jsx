import React from 'react';
import PropTypes from 'prop-types';

const FoodRecipes = ({ food, recipes, status }) => (
  <div>
    {status === 'loading' && <h1>Loading...</h1>}
    {status === 'error' && <h1>error!!</h1>}
    {status === 'success' && (
      <>
        <ul>
          {recipes.map((recipe) => (
            <li key={recipe.id}>
              <YoutubeContent youtube={recipe} />
            </li>
          ))}
        </ul>
        <a
          href={`https://www.youtube.com/results?search_query=${food}레시피`}
          target="_blank"
          rel="noreferrer"
        >
          레시피 더보기
        </a>
      </>
    )}
  </div>
);

FoodRecipes.propTypes = {
  food: PropTypes.string,
  recipes: PropTypes.arrayOf(PropTypes.objectOf(PropTypes.any)),
  status: PropTypes.string,
};

FoodRecipes.defaultProps = {
  food: '',
  recipes: [],
  status: '',
};

// 음식 레시피 유튜브 영상을 페이지에 띄우는 부분
// 검색 결과 확인을 위해 임시로 사용
// TODO: 디자인 잡히면 지우고 FoodRecipes return문에서 정보만 내보낼 것
export const YoutubeContent = ({ youtube }) => (
  <div>
    <p>제목 : {youtube.snippet.title}</p>
    <p>
      {youtube.snippet.description.split('\n').map((text, idx) => (
        <React.Fragment key={`text${idx + 1}`}>
          {text}
          <br />
        </React.Fragment>
      ))}
    </p>
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

YoutubeContent.propTypes = {
  youtube: PropTypes.objectOf(
    PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  ).isRequired,
};

export default FoodRecipes;
