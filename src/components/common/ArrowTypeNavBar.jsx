import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { GiChopsticks } from 'react-icons/gi';
import FormLessButton from './FormLessButton';

const ArrowTypeNavBar = ({
  label,
  // name,
  curIndex,
  min,
  max,
  onPrev,
  onNext,
}) => (
  <StyledNav aria-labelledby={label}>
    <FormLessButton hidden={curIndex <= min} onClick={onPrev}>
      <GiChopsticks style={{ transform: 'rotate(60deg)', fontSize: '2rem' }} />
    </FormLessButton>
    <span style={{ fontSize: '1.15rem' }}>
      {curIndex + 1}/{max + 1}
    </span>
    <FormLessButton hidden={curIndex >= max} onClick={onNext}>
      <GiChopsticks style={{ transform: 'rotate(240deg)', fontSize: '2rem' }} />
    </FormLessButton>
  </StyledNav>
);

ArrowTypeNavBar.propTypes = {
  label: PropTypes.string,
  // name: PropTypes.string,
  curIndex: PropTypes.number,
  min: PropTypes.number,
  max: PropTypes.number,
  onPrev: PropTypes.func,
  onNext: PropTypes.func,
};

ArrowTypeNavBar.defaultProps = {
  label: '',
  // name: '',
  curIndex: 0,
  min: 0,
  max: 0,
  onPrev: null,
  onNext: null,
};

// 임시 껍데기
const StyledNav = styled.nav`
  display: grid;
  grid-template: 'left middle right' / 50px 1fr 50px;
  text-align: center;
  justify-content: center;
  align-content: center;
  align-items: center;

  > button:first-child {
    grid-area: left;
  }

  > span {
    grid-area: middle;
  }

  > button:last-child {
    grid-area: right;
  }
`;

export default ArrowTypeNavBar;
