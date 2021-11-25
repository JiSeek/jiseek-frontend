import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleLeft, faAngleRight } from '@fortawesome/free-solid-svg-icons';
import FormLessButton from './FormLessButton';

const ArrowTypeNavBar = ({
  lang,
  label,
  name,
  curIndex,
  min,
  max,
  onPrev,
  onNext,
}) => (
  <StyledNav aria-labelledby={lang === 'ko' ? label.ko : label.en}>
    <FormLessButton hidden={curIndex <= min} onClick={onPrev}>
      <FontAwesomeIcon icon={faAngleLeft} size="lg" />
    </FormLessButton>
    <span>{`${curIndex + 1}. ${name}`}</span>
    <FormLessButton hidden={curIndex >= max} onClick={onNext}>
      <FontAwesomeIcon icon={faAngleRight} size="lg" />
    </FormLessButton>
  </StyledNav>
);

ArrowTypeNavBar.propTypes = {
  lang: PropTypes.string,
  label: PropTypes.objectOf(PropTypes.string),
  name: PropTypes.string,
  curIndex: PropTypes.number,
  min: PropTypes.number,
  max: PropTypes.number,
  onPrev: PropTypes.func,
  onNext: PropTypes.func,
};

ArrowTypeNavBar.defaultProps = {
  lang: 'ko',
  label: { ko: '', en: '' },
  name: '',
  curIndex: 0,
  min: 0,
  max: 0,
  onPrev: null,
  onNext: null,
};

// 임시 껍데기
const StyledNav = styled.nav`
  display: grid;
  grid-template: 'left middle right' / 30px 150px 30px;
  text-align: center;
  justify-content: center;
  align-content: center;

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
