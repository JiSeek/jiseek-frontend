import React from 'react';
import PropTypes from 'prop-types';
import FoodSearchBar from './FoodSearchBar';
import { useAutoComplete } from '../../hooks/FoodSearch';

const FoodSearchBarContainer = ({ foodNames, setListFind }) => {
  const {
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
  } = useAutoComplete(foodNames, setListFind);

  return (
    <div>
      <FoodSearchBar
        keyword={keyword}
        focusItem={focusItem}
        foundNames={foundNames}
        onInput={onInput}
        // onDebounceInput={onDebounceInput}
        onKeyUp={onKeyUp}
        onKeyDown={onKeyDown}
        onFocusInput={onFocusInput}
        onClickList={onClickList}
        onMouseOver={onMouseOver}
        onBlur={onBlur}
      />
    </div>
  );
};

FoodSearchBarContainer.propTypes = {
  foodNames: PropTypes.arrayOf(PropTypes.string),
  setListFind: PropTypes.func,
};

FoodSearchBarContainer.defaultProps = {
  foodNames: [],
  setListFind: null,
};

export default FoodSearchBarContainer;
