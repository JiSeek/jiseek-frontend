import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const FoodSearchBar = ({
  keyword,
  focusItem,
  foundNames,
  onInput,
  // onDebounceInput,
  onKeyUp,
  onKeyDown,
  onFocusInput,
  onClickList,
  onMouseOver,
  onBlur,
}) => (
  <StyledSearchBar>
    <StyledInput
      value={keyword}
      onInput={onInput}
      // onInput={onDebounceInput}
      onKeyUp={onKeyUp}
      onKeyDown={onKeyDown}
      onClick={onFocusInput}
      onFocus={onFocusInput}
      onBlur={onBlur}
      placeholder="음식명을 입력해주세요."
      // disabled
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

FoodSearchBar.propTypes = {
  keyword: PropTypes.string,
  focusItem: PropTypes.number,
  foundNames: PropTypes.arrayOf(PropTypes.string),
  onInput: PropTypes.func,
  // onDebounceInput: PropTypes.func,
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
  // onDebounceInput: null,
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
  border: none;
  border-bottom: 2px solid #c1dda0;
  padding: 0.7rem 0 0.5rem 0;
  width: 17rem;
  background: #fbfbfb;

  ::placeholder {
    color: #789180;
  }

  :focus {
    transition: 0.3s;
    box-shadow: rgba(0, 0, 0, 0.1) 0px 1px 3px 0px,
      rgba(0, 0, 0, 0.06) 0px 1px 2px 0px;
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
  width: 17rem;
  background: #fbfbfb;
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
