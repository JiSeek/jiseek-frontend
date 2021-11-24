import React from 'react';
import PropTypes from 'prop-types';

const SearchTab = ({ value, disabled, handleInput, handleMoveEnd }) => (
  <label htmlFor="input-type-tab">
    <input
      type="range"
      id="input-type-tab"
      value={value}
      disabled={disabled}
      onInput={handleInput}
      onMouseUp={handleMoveEnd}
      onMouseLeave={handleMoveEnd}
      onTouchEnd={handleMoveEnd}
      min="0"
      max="100"
    />
  </label>
);

SearchTab.propTypes = {
  value: PropTypes.number,
  disabled: PropTypes.bool,
  handleInput: PropTypes.func,
  handleMoveEnd: PropTypes.func,
};

SearchTab.defaultProps = {
  value: 0,
  disabled: false,
  handleInput: null,
  handleMoveEnd: null,
};

export default SearchTab;
