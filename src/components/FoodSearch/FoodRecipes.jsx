import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import { VscEye } from 'react-icons/vsc';
import { BiTimeFive } from 'react-icons/bi';
import { MdOutlineArrowForwardIos } from 'react-icons/md';
import { useModalContext } from '../../contexts';
import { YoutubeServerError, LoadingDot } from '../../assets/images/images';

const FoodRecipes = ({ food, recipes, status }) => {
  const { t } = useTranslation();

  return (
    <div>
      {status === 'loading' && (
        <img src={LoadingDot} alt="youtube server loading" height={60} />
      )}
      {status === 'error' && (
        <>
          <img
            src={YoutubeServerError}
            alt="youtube server error"
            height={80}
          />
          <p>유튜브에서 레시피를 불러올 수 없습니다.</p>
        </>
      )}
      {status === 'success' && (
        <RecipesStructure>
          <a
            href={`https://www.youtube.com/results?search_query=${food} 레시피`}
            target="_blank"
            rel="noreferrer"
          >
            {t('foodSearchMoreRecipesLink')} <MdOutlineArrowForwardIos />
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
                      <VscEye />
                      <span>{recipe.statistics.viewCount}</span>
                    </li>
                    <li>
                      <BiTimeFive />
                      {/* TODO: 영상 길이 HH:MM:SS 단위로 변경하기 */}
                      <span>
                        {recipe.contentDetails.duration
                          .split(/[PTHMS]/)
                          .filter((ch) => !!ch)
                          .map((ch) => (ch.length === 1 ? `0${ch}` : ch))
                          .join(':')}
                      </span>
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
};

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
  const { t } = useTranslation();
  const openModal = useModalContext();
  const onClick = useCallback(
    () => openModal(<ModalContent youtube={recipe} />, 'message'),
    [openModal, recipe],
  );

  return (
    <ModalButton onClick={onClick} type="button">
      {t('foodSearchMoreInfo')} <MdOutlineArrowForwardIos />
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
    margin-bottom: 1rem;

    > svg {
      font-size: 0.75rem;
    }
  }

  > div {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    grid-gap: 1.5rem;
    width: 100%;

    @media only screen and (max-width: 800px) {
      display: grid;
      grid-template-columns: 1fr;
      grid-template-rows: repeat(4, 1fr);
      > ul > li > iframe {
        height: calc(100vw * 9 / 16);
      }
    }
  }
`;

const RecipesInfo = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 0.35rem;
  > span {
    display: flex;
    > li {
      display: flex;
      align-items: center;

      :first-child {
        margin-right: 0.5rem;
      }

      > svg {
        margin-right: 0.25rem;
      }
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

  > svg {
    font-size: 0.65rem;
  }
`;

export default FoodRecipes;
