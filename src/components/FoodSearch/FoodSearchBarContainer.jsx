import React, { useCallback, useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import Trie from '../../utils/Trie';
import FoodSearchBar from './FoodSearchBar';

const FoodSearchBarContainer = ({ foodTable, setListFind }) => {
  const [keyword, setKeyword] = useState('');
  const [focusItem, setFocusItem] = useState(-1);
  const [foundNames, setFoundNames] = useState([]);

  const foodList = useMemo(() => {
    const items = new Trie();
    const itemList = Object.keys(foodTable);
    if (itemList.length) {
      itemList.map((name) => name).forEach((name) => items.insert(name));
    }
    return items;
  }, [foodTable]);

  // 현재 입력창 입력값 변경 처리 핸들러
  const handleInput = useCallback(
    (e) => {
      if (e.target.value !== keyword) {
        setFocusItem(-1);
      }
      setKeyword(e.target.value);
    },
    [keyword],
  );

  // 입력한 검색어에 대한 가능한 목록 표시 처리 핸들러
  const handleKeyUp = useCallback(
    (e) => {
      if (
        /^Arrow(Up|Down|Left|Right)$/.test(e.code) ||
        e.code === 'Tab' ||
        e.code === 'Enter' ||
        /^F[1-9]{1,2}$/.test(e.code)
      ) {
        return;
      }
      setFoundNames(foodList.find(e.target.value));
    },
    [foodList],
  );

  // 표시된 음식 목록 탐색을 위한 키보드 네비게이션 함수
  const navigateNext = useCallback(
    (code) => {
      if (code === 'ArrowUp') {
        return focusItem <= 0 ? foundNames.length - 1 : focusItem - 1;
      }
      if (code === 'ArrowDown' || code === 'Tab') {
        return focusItem < foundNames.length - 1 ? focusItem + 1 : 0;
      }
      return -1;
    },
    [focusItem, foundNames],
  );

  // 음식 목록 탐색 및 현재 위치 음식 이름 선택 처리 핸들러
  const handleKeyDown = useCallback(
    (e) => {
      if (e.isComposing || e.keyCode === 229 || !e.target.value) {
        return;
      }

      if (foundNames.length !== 0) {
        const focus = navigateNext(e.code);
        if (focus !== -1) {
          e.preventDefault();
          setKeyword(foundNames[focus]);
          setFocusItem(focus);
        }
      }

      if (e.code === 'Enter') {
        const foodId = foodTable[foundNames[focusItem]];
        setListFind(foodId ? [foodId] : [-1]);
        setKeyword('');
        setFoundNames([]);
      }
    },
    [foodTable, foundNames, focusItem, navigateNext, setListFind],
  );

  const handleInputFocus = useCallback(
    (e) => setFoundNames(foodList.find(e.target.value)),
    [foodList],
  );

  // 음식 목록 중 마우스로 선택한 값 적용 처리 핸들러
  const handleListClick = useCallback(
    (e) => {
      if (e.target.tagName === 'A') {
        e.preventDefault();
        setListFind([foodTable[e.target.textContent]]);
        setKeyword('');
        setFoundNames([]);
      }
    },
    [setListFind, foodTable],
  );

  const handleMouseOver = useCallback(
    (e) =>
      e.target.tagName === 'A' &&
      setFocusItem(foundNames.indexOf(e.target.textContent)),
    [foundNames],
  );

  const handleBlur = useCallback((e) => {
    if (e.relatedTarget?.tagName !== 'A') {
      setFocusItem(-1);
      setFoundNames([]);
    }
  }, []);

  return (
    <div>
      <FoodSearchBar
        keyword={keyword}
        focusItem={focusItem}
        foundNames={foundNames}
        onInput={handleInput}
        onKeyUp={handleKeyUp}
        onKeyDown={handleKeyDown}
        onInputFocus={handleInputFocus}
        onListClick={handleListClick}
        onMouseOver={handleMouseOver}
        onBlur={handleBlur}
      />
    </div>
  );
};

FoodSearchBarContainer.propTypes = {
  foodTable: PropTypes.objectOf(PropTypes.number),
  setListFind: PropTypes.func,
};

FoodSearchBarContainer.defaultProps = {
  foodTable: {},
  setListFind: null,
};

export default FoodSearchBarContainer;
