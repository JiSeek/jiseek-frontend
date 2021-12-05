import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { RiYoutubeLine } from 'react-icons/ri';
import { VscEye } from 'react-icons/vsc';
import { BiTimeFive } from 'react-icons/bi';
import { useModalContext } from '../../contexts';

const FoodRecipes = ({ food, recipes }) => (
  <div>
    <StyledUl>
      {recipes.map((recipe) => (
        <li key={recipe.id}>
          <YoutubeContent youtube={recipe} />
        </li>
      ))}
    </StyledUl>
    {/* 더 많은 레시피를 확인할 수 있게 유튜브로 이동 */}
    <a
      href={`https://www.youtube.com/results?search_query=${food} 레시피`}
      target="_blank"
      rel="noreferrer"
    >
      레시피 더보기
    </a>
  </div>
);

FoodRecipes.propTypes = {
  food: PropTypes.string,
  recipes: PropTypes.arrayOf(PropTypes.objectOf(PropTypes.any)),
};

FoodRecipes.defaultProps = {
  food: '',
  recipes: [],
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
    <div>{youtube.snippet.title}</div>
    <div>
      <div>
        <RiYoutubeLine />
        {youtube.snippet.publishedAt.slice(0, 10)}
      </div>
      <div>
        <VscEye />
        {youtube.statistics.viewCount}
      </div>
      <div>
        <BiTimeFive />
        {/* TODO: 영상 길이 HH:MM:SS 단위로 변경하기 */}
        {youtube.contentDetails.duration}
      </div>
    </div>
    <div>
      <p>
        {youtube.snippet.description.split('\n').map((text) => (
          <>
            {text}
            <br />
          </>
        ))}
      </p>
    </div>
  </div>
);

export const YoutubeContent = ({ youtube }) => {
  const openModal = useModalContext();
  const onClick = useCallback(
    () => openModal(<ModalContent youtube={youtube} />),
    [openModal, youtube],
  );
  // TODO: <ModalContent youtube={youtube} /> 하면 에러 발생, key 사용 초기화 되고 확인 필

  console.log(youtube);
  return (
    <ModalButton onClick={onClick} type="button">
      <img
        src={youtube.snippet.thumbnails.high.url}
        alt={youtube.snippet.title}
        style={{ width: '100%' }}
      />
    </ModalButton>
  );
};

YoutubeContent.propTypes = {
  youtube: PropTypes.objectOf(
    PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  ).isRequired,
};

ModalContent.propTypes = {
  youtube: PropTypes.objectOf(
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

// TODO: 지우기
// export const YoutubeContent = ({ youtube }) => (
//   <div>
//     <img src={youtube.snippet.thumbnails.high.url} alt="thumbnails" />
//     <p>제목 : {youtube.snippet.title}</p>
//     <p>
//       {youtube.snippet.description.split('\n').map((text) => (
//         <>
//           {text}
//           <br />
//         </>
//       ))}
//     </p>
//     <p>게시일 : {youtube.snippet.publishedAt.slice(0, 10)}</p>
//     <p>조회수 : {youtube.statistics.viewCount}</p>
//     {/* TODO: 영상 길이 HH:MM:SS 단위로 변경하기 */}
//     <p>영상 길이 : {youtube.contentDetails.duration}</p>
//     <img src={youtube.snippet.thumbnails.high.url} alt="thumbnails" />
//     <iframe
//       width="360px"
//       height="210px"
//       src={`https://www.youtube.com/embed/${youtube.id}`}
//       title="YouTube video player"
//       frameBorder="0"
//       allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
//       allowFullScreen
//     />
//   </div>
// );
