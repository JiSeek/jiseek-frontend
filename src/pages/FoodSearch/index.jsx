import React from 'react';
import { Routes, Route, useLocation, NavLink } from 'react-router-dom';
import styled from 'styled-components';
import { FoodSearchImageTab, FoodSearchNameTab } from '..';
// import { CustomLink } from '../../components/common';
import { useLangContext } from '../../contexts';

const FoodSearchPage = () => {
  const location = useLocation();
  const [lang] = useLangContext();
  console.log('테스트', lang, location);
  const activeState = {
    textDecoration: 'none',
    // color: 'red',
  };

  return (
    <div>
      <nav>
        <StyledNavLink
          to="name"
          style={({ isActive }) => (isActive ? activeState : undefined)}
        >
          음식명 검색
        </StyledNavLink>
        <NavLink
          to="image"
          style={({ isActive }) => (isActive ? activeState : undefined)}
        >
          음식사진 검색
        </NavLink>

        {/* <CustomLink to="name">음식명 검색</CustomLink>
        <CustomLink to="image">음식사진 검색</CustomLink> */}
      </nav>
      <Routes>
        <Route path="name" element={<FoodSearchNameTab />} />
        <Route path="image" element={<FoodSearchImageTab />} />
      </Routes>
    </div>
  );
};

const StyledNavLink = styled(NavLink)`
  /* text-decoration: none; */
  color: black;
`;

export default FoodSearchPage;
