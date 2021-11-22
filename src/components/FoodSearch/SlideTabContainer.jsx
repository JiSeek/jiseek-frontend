import React, { useCallback, useEffect, useState } from 'react';
import PropTypes from 'prop-types';

const SlideTabContainer = ({ disabled, imageTab, setImageTab }) => {
  const [value, setValue] = useState(0);

  const handleMoveEnd = useCallback(
    () =>
      setValue((val) => {
        if (imageTab) {
          return val > 60 ? 100 : 0;
        }
        return val < 40 ? 0 : 100;
      }),
    [setValue, imageTab],
  );

  const handleInput = useCallback(
    (e) => setValue(() => e.target.value),
    [setValue],
  );

  useEffect(() => {
    if (value === 0 || value === 100) {
      setImageTab(() => !value);
    }
  }, [value, setImageTab]);

  // TODO: 슬라이드 탭바 프레젠테이셔널 만들기!
  return (
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
};

SlideTabContainer.propTypes = {
  disabled: PropTypes.bool,
  imageTab: PropTypes.bool,
  setImageTab: PropTypes.func,
};

SlideTabContainer.defaultProps = {
  disabled: false,
  imageTab: true,
  setImageTab: null,
};

export default SlideTabContainer;
