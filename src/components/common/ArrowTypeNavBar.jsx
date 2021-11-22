import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleLeft, faAngleRight } from '@fortawesome/free-solid-svg-icons';
import FormLessButton from './FormLessButton';

const ArrowTypeNavBar = ({
  lang,
  label,
  min,
  max,
  current,
  onPrev,
  onNext,
  element,
}) => (
  <StyledNav aria-labelledby={lang === 'ko' ? label.ko : label.en}>
    <FormLessButton hidden={current <= min} onClick={onPrev}>
      <FontAwesomeIcon icon={faAngleLeft} size="lg" />
    </FormLessButton>
    {element}
    <FormLessButton hidden={current >= max} onClick={onNext}>
      <FontAwesomeIcon icon={faAngleRight} size="lg" />
    </FormLessButton>
  </StyledNav>
);

ArrowTypeNavBar.propTypes = {
  lang: PropTypes.string,
  label: PropTypes.objectOf(PropTypes.string),
  min: PropTypes.number,
  max: PropTypes.number,
  current: PropTypes.number,
  onPrev: PropTypes.func,
  onNext: PropTypes.func,
  element: PropTypes.element,
};

ArrowTypeNavBar.defaultProps = {
  lang: 'ko',
  label: { ko: '', en: '' },
  min: 0,
  max: 0,
  current: 0,
  onPrev: null,
  onNext: null,
  element: null,
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
