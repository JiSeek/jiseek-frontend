import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import jiseekApi from '../../api';

const FoodRecipes = ({ food }) => {
  const [recipes, setRecipes] = useState([]);
  useEffect(() => {
    const searchRecipes = async () => {
      try {
        const resultIds = await jiseekApi.getRecipeList({
          q: `${food} 방법`,
          videoEmbeddable: true,
          type: 'video',
          regionCode: 'KR',
          part: 'snippet',
          fields: 'items(id(videoId))',
          maxResults: 10,
        });
        const idList = resultIds.map(({ id }) => id.videoId);
        const searchDetails = async () => {
          try {
            const resultDetails = await Promise.all(
              idList.map((eachId) =>
                jiseekApi.getVideoRating({
                  id: eachId,
                  part: 'snippet, statistics, contentDetails, status',
                  fields:
                    'items(id, snippet(title, description, publishedAt), statistics(viewCount), contentDetails(duration))',
                }),
              ),
            );
            const detailList = resultDetails.map((detail) => detail[0]);
            detailList.map((a) => console.log(a.snippet.title));
            const detailListCleaned = [];
            detailList.map((data) => {
              const checkTitle = data.snippet.title.replace(/\s/g, '');
              if (checkTitle.includes(food)) {
                detailListCleaned.push(data);
              }
              return detailListCleaned;
            });
            detailListCleaned.sort(
              (a, b) =>
                parseInt(b.statistics.viewCount, 10) -
                parseInt(a.statistics.viewCount, 10),
            );
            console.log('cleaned');
            detailListCleaned.map((a) => console.log(a.snippet.title));
            setRecipes(detailListCleaned.slice(0, 4));
          } catch (e) {
            console.log(e);
          }
        };
        searchDetails();
      } catch (e) {
        console.log(e);
      }
    };
    searchRecipes();
  }, [food]);

  return (
    <div>
      {recipes === [] ? (
        <h1>Loading...</h1>
      ) : (
        recipes.map((recipe) => (
          <YoutubeContent key={recipe.id} youtube={recipe} />
        ))
      )}
    </div>
  );
};

export default FoodRecipes;

export const YoutubeContent = ({ youtube }) => {
  const descriptionReplaced = youtube.snippet.description.replace(
    /\n/g,
    '<br />',
  );
  return (
    <div>
      <p>제목 : {youtube.snippet.title}</p>
      <p dangerouslySetInnerHTML={{ __html: descriptionReplaced }} />
      <p>게시일 : {youtube.snippet.publishedAt.slice(0, 10)}</p>
      <p>조회수 : {youtube.statistics.viewCount}</p>
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
  food: PropTypes.node.isRequired,
};

YoutubeContent.propTypes = {
  youtube: PropTypes.node.isRequired,
};
