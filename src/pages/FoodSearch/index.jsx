import React from 'react';
import {
  Routes,
  Route,
  useLocation,
  NavLink,
  Navigate,
} from 'react-router-dom';
import styled from 'styled-components';
import FoodSearchImageTab from '../FoodSearchImageTab';
import FoodSearchNameTab from '../FoodSearchNameTab';
import { useLangContext } from '../../contexts';

const FoodSearchPage = () => {
  const location = useLocation();
  const [lang] = useLangContext();
  console.log('테스트', lang, location);
  const activeState = {
    textDecoration: 'none',
    fontWeight: '700',
    borderBottom: '2px solid',
    borderRadius: '1px',
    paddingBottom: '0.3rem',
  };

  return (
    <StyledSearch>
      <Title>음식 알아보기</Title>
      <StyledNav>
        <div />
        <NavLink
          to="."
          end
          style={({ isActive }) => (isActive ? activeState : undefined)}
        >
          이름으로 검색하기
        </NavLink>
        <>|</>
        <NavLink
          to="image"
          style={({ isActive }) => (isActive ? activeState : undefined)}
        >
          사진으로 검색하기
        </NavLink>
        <div />
      </StyledNav>
      <Routes>
        <Route path="/" element={<FoodSearchNameTab />} />
        <Route path="image" element={<FoodSearchImageTab />} />
        <Route path="*" element={<Navigate to="/not_found" />} />
      </Routes>
    </StyledSearch>
  );
};

export default FoodSearchPage;

const StyledSearch = styled.div`
  padding: 4rem 0;
  max-width: 1320px;
  margin: auto;
`;

const Title = styled.div`
  font-size: 2.5rem;
  font-weight: 800;
  display: flex;
  justify-content: center;
`;

const StyledNav = styled.nav`
  display: grid;
  grid-template-columns: 4fr 150px 1rem 150px 4fr;
  font-size: 1.2rem;
  text-align: center;
  margin: 2.5rem 0;
`;
