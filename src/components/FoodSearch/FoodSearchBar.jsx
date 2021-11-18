import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const FoodSearchBar = ({
  keyword,
  focusItem,
  foundList,
  onInput,
  onKeyUp,
  onKeyDown,
  onInputFocus,
  onListClick,
  onMouseOver,
  onBlur,
}) => (
  <StyledSearchBar>
    <input
      value={keyword}
      onInput={onInput}
      onKeyUp={onKeyUp}
      onKeyDown={onKeyDown}
      onClick={onInputFocus}
      onFocus={onInputFocus}
      onBlur={onBlur}
      placeholder="음식명을 입력해주세요."
    />
    <StyledList
      empty={foundList.length === 0}
      onClick={onListClick}
      onMouseOver={onMouseOver}
    >
      {foundList.map((name, idx) => (
        <StyledItem focus={idx === focusItem} key={name}>
          <a href="/#">{name}</a>
        </StyledItem>
      ))}
    </StyledList>
  </StyledSearchBar>
);

FoodSearchBar.propTypes = {
  keyword: PropTypes.string,
  focusItem: PropTypes.number,
  foundList: PropTypes.arrayOf(PropTypes.string),
  onInput: PropTypes.func,
  onKeyUp: PropTypes.func,
  onKeyDown: PropTypes.func,
  onInputFocus: PropTypes.func,
  onListClick: PropTypes.func,
  onMouseOver: PropTypes.func,
  onBlur: PropTypes.func,
};

FoodSearchBar.defaultProps = {
  keyword: '',
  focusItem: -1,
  foundList: [],
  onInput: null,
  onKeyUp: null,
  onKeyDown: null,
  onInputFocus: null,
  onListClick: null,
  onMouseOver: null,
  onBlur: null,
};

const StyledSearchBar = styled.div`
  width: fit-content;
`;

const StyledList = styled.ul`
  padding: 0;
  margin: 0;
  list-style: none;
  text-align: center;
  border: ${(props) => (props.empty ? 'none' : 'solid 1px black')};
`;

const StyledItem = styled.li`
  background: ${(props) => (props.focus ? 'gray' : 'transparent')};

  > a {
    display: block;
    text-decoration: none;
    color: black;
  }

  > span {
    pointer-events: none;
  }
`;

export default FoodSearchBar;
