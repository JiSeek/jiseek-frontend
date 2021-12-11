import React from 'react';
import { useTranslation } from 'react-i18next';
import { Routes, Route, NavLink } from 'react-router-dom';
import styled from 'styled-components';
import FoodSearchImageTab from '../FoodSearchImageTab';
import FoodSearchNameTab from '../FoodSearchNameTab';

const activeState = {
  textDecoration: 'none',
  fontWeight: '700',
  borderBottom: '2px solid',
  borderRadius: '1px',
  paddingBottom: '0.3rem',
  color: '#001100',
};

const FoodSearchPage = () => {
  const { t } = useTranslation();

  return (
    <StyledSearch>
      <StyledNav>
        <NavLink
          to="."
          end
          style={({ isActive }) => (isActive ? activeState : undefined)}
        >
          {t('foodSearchNameTab')}
        </NavLink>
        |
        <NavLink
          to="image"
          style={({ isActive }) => (isActive ? activeState : undefined)}
        >
          {t('foodSearchImageTab')}
        </NavLink>
      </StyledNav>
      <Routes>
        <Route path="/" element={<FoodSearchNameTab />} />
        <Route path="image" element={<FoodSearchImageTab />} />
      </Routes>
    </StyledSearch>
  );
};

const StyledSearch = styled.div`
  padding: 4rem 0;
  max-width: 1320px;
  margin: auto;
`;

const StyledNav = styled.nav`
  font-size: 4.5rem;
  font-weight: 500;
  text-align: center;
  margin-top: 1rem;
  margin-bottom: 5rem;
  letter-spacing: 2px;
  word-spacing: -3px;
  color: #0011009e;

  > a {
    margin: auto 1rem;
  }
`;

export default FoodSearchPage;
