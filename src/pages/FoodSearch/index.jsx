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
// import { CustomLink } from '../../components/common';
import { useLangContext } from '../../contexts';

const FoodSearchPage = () => {
  const location = useLocation();
  const [lang] = useLangContext();
  console.log('테스트', lang, location);
  const activeState = {
    textDecoration: 'underline',
    // color: 'red',
  };

  return (
    <div>
      <nav>
        <StyledNavLink
          to="."
          style={({ isActive }) => (isActive ? activeState : undefined)}
        >
          음식명 검색
        </StyledNavLink>
        <StyledNavLink
          to="image"
          style={({ isActive }) => (isActive ? activeState : undefined)}
        >
          음식사진 검색
        </StyledNavLink>
      </nav>
      <Routes>
        <Route path="/" element={<FoodSearchNameTab />} />
        <Route path="image" element={<FoodSearchImageTab />} />
        <Route path="*" element={<Navigate to="/not_found" />} />
      </Routes>
    </div>
  );
};

const StyledNavLink = styled(NavLink)`
  /* text-decoration: none; */
  color: black;
  font-size: 1rem;
`;

export default FoodSearchPage;
