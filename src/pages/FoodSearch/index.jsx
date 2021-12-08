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
};

const FoodSearchPage = () => {
  const { t } = useTranslation();

  return (
    <StyledSearch>
      <Title>{t('foodSearchTitle')}</Title>
      <StyledNav>
        <div />
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
        <div />
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

export default FoodSearchPage;
