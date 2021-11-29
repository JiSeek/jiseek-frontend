import React from 'react';
import PropTypes from 'prop-types';

const SearchTab = ({ value, disabled, onChange, onMoveEnd }) => (
  <label htmlFor="input-type-tab">
    <input
      type="range"
      id="input-type-tab"
      value={value}
      disabled={disabled}
      onChange={onChange}
      onMouseUp={onMoveEnd}
      onMouseLeave={onMoveEnd}
      onTouchEnd={onMoveEnd}
      min="0"
      max="100"
    />
  </label>
);

SearchTab.propTypes = {
  value: PropTypes.number,
  disabled: PropTypes.bool,
  onChange: PropTypes.func,
  onMoveEnd: PropTypes.func,
};

SearchTab.defaultProps = {
  value: 0,
  disabled: false,
  onChange: null,
  onMoveEnd: null,
};

export default SearchTab;
