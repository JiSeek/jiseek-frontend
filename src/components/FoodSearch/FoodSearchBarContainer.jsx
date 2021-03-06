import React from 'react';
import PropTypes from 'prop-types';
import FoodSearchBar from './FoodSearchBar';
import { useAutoComplete } from '../../hooks/FoodSearch';

const FoodSearchBarContainer = ({ foodNames, setFindTarget }) => {
  const {
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
  } = useAutoComplete(foodNames, setFindTarget);

  return (
    <div>
      <FoodSearchBar
        keyword={keyword}
        focusItem={focusItem}
        foundNames={foundNames}
        onInput={onInput}
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
  setFindTarget: PropTypes.func,
};

FoodSearchBarContainer.defaultProps = {
  foodNames: [],
  setFindTarget: null,
};

export default FoodSearchBarContainer;
