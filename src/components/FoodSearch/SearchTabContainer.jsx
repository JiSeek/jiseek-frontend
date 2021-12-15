import React, { useCallback, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import SearchTab from './SearchTabSlider';

const SearchTabContainer = ({ disabled, imageTab, setImageTab }) => {
  const [value, setValue] = useState(0);

  const onChange = useCallback(
    (e) => setValue(() => Number(e.target.value)),
    [setValue],
  );

  const onMoveEnd = useCallback(
    () =>
      setValue((val) => {
        if (imageTab) {
          return val > 60 ? 100 : 0;
        }
        return val < 40 ? 0 : 100;
      }),
    [setValue, imageTab],
  );

  useEffect(() => {
    if (value === 0 || value === 100) {
      setImageTab(() => !value);
    }
  }, [value, setImageTab]);

  return (
    <SearchTab
      value={value}
      disabled={disabled}
      onChange={onChange}
      onMoveEnd={onMoveEnd}
    />
  );
};

SearchTabContainer.propTypes = {
  disabled: PropTypes.bool,
  imageTab: PropTypes.bool,
  setImageTab: PropTypes.func,
};

SearchTabContainer.defaultProps = {
  disabled: false,
  imageTab: true,
  setImageTab: null,
};

export default SearchTabContainer;
