import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { RiYoutubeLine } from 'react-icons/ri';
import { VscEye } from 'react-icons/vsc';
import { BiTimeFive } from 'react-icons/bi';
import { useModalContext } from '../../contexts';

const FoodRecipes = ({ food, recipes, status }) => (
  <div>
    {status === 'loading' && <h1>Loading...</h1>}
    {status === 'error' && <h1>error!!</h1>}
    {status === 'success' && (
      <RecipesStructure>
        <a
          href={`https://www.youtube.com/results?search_query=${food} 레시피`}
          target="_blank"
          rel="noreferrer"
        >
          레시피 더보기
        </a>
        <div>
          {recipes.map((recipe) => (
            <ul key={recipe.id}>
              <li>
                <iframe
                  width="100%"
                  height="100%"
                  src={`https://www.youtube.com/embed/${recipe.id}`}
                  title="YouTube video player"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </li>
              <RecipesInfo>
                <span>
                  <li>
                    <RiYoutubeLine />
                    <span>{recipe.snippet.publishedAt.slice(0, 10)}</span>
                  </li>
                  <li>
                    <VscEye />
                    <span>{recipe.statistics.viewCount}</span>
                  </li>
                  <li>
                    <BiTimeFive />
                    {/* TODO: 영상 길이 HH:MM:SS 단위로 변경하기 */}
                    <span>{recipe.contentDetails.duration}</span>
                  </li>
                </span>
                <li>
                  <YoutubeContent recipe={recipe} />
                </li>
              </RecipesInfo>
            </ul>
          ))}
        </div>
      </RecipesStructure>
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

export const ModalContent = ({ youtube }) => (
  <div>
    <ul>
      <li>
        <span>{youtube.snippet.title}</span>
      </li>
    </ul>
    <div>
      <p>
        {youtube.snippet.description.split('\n').map((text, idx) => (
          <React.Fragment key={`text${idx + 1}`}>
            {text}
            <br />
          </React.Fragment>
        ))}
      </p>
    </div>
  </div>
);

ModalContent.propTypes = {
  youtube: PropTypes.objectOf(
    PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  ).isRequired,
};

export const YoutubeContent = ({ recipe }) => {
  const openModal = useModalContext();
  const onClick = useCallback(
    () => openModal(<ModalContent youtube={recipe} />, 'message'),
    [openModal, recipe],
  );

  return (
    <ModalButton onClick={onClick} type="button">
      설명 더보기
    </ModalButton>
  );
};

YoutubeContent.propTypes = {
  recipe: PropTypes.objectOf(
    PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  ).isRequired,
};

const RecipesStructure = styled.div`
  > a {
    float: right;
    margin-bottom: 0.5rem;
  }

  > div {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-template-rows: repeat(2, 1fr);
    grid-gap: 1.5rem;
    width: 100%;

    @media only screen and (max-width: 800px) {
      display: grid;
      grid-template-columns: 1fr;
      grid-template-rows: repeat(4, 1fr);
      >ul >li >iframe {
        height: calc(100vw * 9 / 16);
      }
    }
  }
`;

const RecipesInfo = styled.span`
  > span {
    display: flex;
    justify-content: space-between;
    > li {
      display: flex;
      align-items: center;
    }
  }

  > li {
    float: right;
  }
`;

const ModalButton = styled.button`
  border: none;
  background: none;
  padding: 0;
  cursor: pointer;
`;

export default FoodRecipes;
