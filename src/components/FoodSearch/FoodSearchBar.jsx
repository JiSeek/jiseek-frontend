import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';

const FoodSearchBar = ({
  keyword,
  focusItem,
  foundNames,
  onInput,
  onKeyUp,
  onKeyDown,
  onFocusInput,
  onClickList,
  onMouseOver,
  onBlur,
}) => {
  const { t } = useTranslation();

  return (
    <StyledSearchBar>
      <StyledInput
        value={keyword}
        onInput={onInput}
        onKeyUp={onKeyUp}
        onKeyDown={onKeyDown}
        onClick={onFocusInput}
        onFocus={onFocusInput}
        onBlur={onBlur}
        placeholder={t('foodSearchSearchBar')}
      />
      <StyledList
        empty={foundNames.length === 0}
        onClick={onClickList}
        onMouseOver={onMouseOver}
      >
        {foundNames.map((name, idx) => (
          <StyledItem focus={idx === focusItem} key={name}>
            <a href="/#" rel="search">
              {name}
            </a>
          </StyledItem>
        ))}
      </StyledList>
    </StyledSearchBar>
  );
};

FoodSearchBar.propTypes = {
  keyword: PropTypes.string,
  focusItem: PropTypes.number,
  foundNames: PropTypes.arrayOf(PropTypes.string),
  onInput: PropTypes.func,
  onKeyUp: PropTypes.func,
  onKeyDown: PropTypes.func,
  onFocusInput: PropTypes.func,
  onClickList: PropTypes.func,
  onMouseOver: PropTypes.func,
  onBlur: PropTypes.func,
};

FoodSearchBar.defaultProps = {
  keyword: '',
  focusItem: -1,
  foundNames: [],
  onInput: null,
  onKeyUp: null,
  onKeyDown: null,
  onFocusInput: null,
  onClickList: null,
  onMouseOver: null,
  onBlur: null,
};

export default FoodSearchBar;

const StyledSearchBar = styled.div`
  width: fit-content;
  position: relative;
`;

const StyledInput = styled.input`
  font-family: inherit;
  text-align: center;
  font-size: 1.25rem;
  border: none;
  border-bottom: 2px solid #c1dda0;
  padding: 0.7rem 0 0.5rem 0;
  width: 30rem;
  background: #fbfbfb;

  ::placeholder {
    color: #789180;
  }

  :focus {
    transition: 0.3s;
    box-shadow: rgb(0 0 0 / 13%) 0px 1px 3px 0px,
      rgb(0 0 0 / 19%) 0px 1px 2px 0px;
  }
`;

const StyledList = styled.ul`
  display: ${(props) => (props.empty ? 'none' : 'block')};
  padding: 0;
  margin: 0;
  list-style: none;
  text-align: center;
  border: solid 1px #c1dda0;
  position: absolute;
  width: 30rem;
  background: #fbfbfb;
  z-index: 2;
`;

const StyledItem = styled.li`
  padding: 0.6rem 0;
  background: ${(props) => (props.focus ? '#d0e2bc' : 'transparent')};
  font: inherit;

  > a {
    display: block;
    text-decoration: none;
  }

  > span {
    pointer-events: none;
  }
`;
