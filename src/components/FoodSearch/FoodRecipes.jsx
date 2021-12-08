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
      <>
        <StyledUl>
          {recipes.map((recipe) => (
            <li key={recipe.id}>
              <YoutubeContent recipe={recipe} />
            </li>
          ))}
        </StyledUl>
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

export const ModalContent = ({ youtube }) => (
  <div>
    <iframe
      width="360px"
      height="210px"
      src={`https://www.youtube.com/embed/${youtube.id}`}
      title="YouTube video player"
      frameBorder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowFullScreen
    />
    <ul>
      <li>
        <span>{youtube.snippet.title}</span>
      </li>
      <li>
        <RiYoutubeLine />
        <span>{youtube.snippet.publishedAt.slice(0, 10)}</span>
      </li>
      <li>
        <VscEye />
        <span>{youtube.statistics.viewCount}</span>
      </li>
      <li>
        <BiTimeFive />
        {/* TODO: 영상 길이 HH:MM:SS 단위로 변경하기 */}
        <span>{youtube.contentDetails.duration}</span>
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
      <img
        src={recipe.snippet.thumbnails?.high.url}
        alt={recipe.snippet.title}
        style={{ width: '100%' }}
      />
    </ModalButton>
  );
};

YoutubeContent.propTypes = {
  recipe: PropTypes.objectOf(
    PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  ).isRequired,
};

const StyledUl = styled.ul`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: repeat(2, 1fr);
  grid-gap: 1rem;
  width: 100%;
`;

const ModalButton = styled.button`
  border: none;
  background: none;
  padding: 0;
`;

export default FoodRecipes;
