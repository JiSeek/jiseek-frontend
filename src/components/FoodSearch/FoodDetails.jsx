import React from 'react';
import PropTypes, { any } from 'prop-types';
import styled from 'styled-components';
import FoodRecipesContainer from './FoodRecipesContainer';
import Nutrition from './Nutrition';
import { LoadingDot } from '../../assets/images/images';

const FoodDetails = ({ foodInfo, status, onModal, children }) => (
  <Result>
    {status === 'loading' && (
      <Center>
        <img src={LoadingDot} alt="loading" />
      </Center>
    )}
    {status === 'error' && <>요기다 에러메시지 퐉</>}
    {status === 'success' && (
      <>
        <h2>{foodInfo?.name}</h2>
        <GridResult>
          {children}
          <section>
            <h3>영양 정보</h3>
            <Nutrition foodInfo={foodInfo} />
          </section>
          {!onModal && (
            <section>
              <h3>음식 레시피</h3>
              <FoodRecipesContainer food={foodInfo?.name || ''} />
            </section>
          )}
        </GridResult>
      </>
    )}
  </Result>
);

FoodDetails.propTypes = {
  foodInfo: PropTypes.oneOfType([any]),
  status: PropTypes.string,
  onModal: PropTypes.bool,
  children: PropTypes.oneOfType([any]),
};

FoodDetails.defaultProps = {
  foodInfo: {},
  status: '',
  onModal: false,
  children: null,
};

// 임시
const Center = styled.div`
  display: flex;
  justify-content: center;
`;

const Result = styled.article`
  padding: 2rem 0;
`;

// const FoodImage = styled.div`
//   /* padding-right: 1.5rem; */
// `;

const GridResult = styled.div`
  display: grid;
  grid-gap: 3rem;
  grid-template-columns: 1fr 1fr;
`;

export default FoodDetails;
