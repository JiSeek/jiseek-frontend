import React, { useCallback, useMemo, useState } from 'react';
import { useQuery } from 'react-query';
import jiseekApi from '../../api';
import Trie from '../../utils/Trie';
import FoodSearchBar from './FoodSearchBar';

const FoodSearchBarContainer = () => {
  const [keyword, setKeyword] = useState('');
  const [focusItem, setFocusItem] = useState(-1);
  const [foundList, setFoundList] = useState([]);
  // TODO: 예외처리 예정.
  // , error, status, isFetching
  const { data } = useQuery('foodlist', jiseekApi.getFoodLIst, {
    staleTime: Infinity,
  });

  const foodList = useMemo(() => {
    const foodNames = new Trie();
    if (data) {
      data.map(({ name }) => name).forEach((name) => foodNames.insert(name));
    }
    return foodNames;
  }, [data]);

  const handleInput = useCallback(
    (e) => {
      if (e.target.value !== keyword) {
        setFocusItem(() => -1);
      }
      const inputValue = e.target.value;
      setKeyword(() => inputValue);
    },
    [keyword],
  );

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
      setFoundList(() => foodList.find(e.target.value));
    },
    [foodList],
  );

  const navigateNext = useCallback(
    (code) => {
      if (code === 'ArrowUp') {
        return focusItem <= 0 ? foundList.length - 1 : focusItem - 1;
      }
      if (code === 'ArrowDown' || code === 'Tab') {
        return focusItem < foundList.length - 1 ? focusItem + 1 : 0;
      }
      return -1;
    },
    [focusItem, foundList],
  );

  const handleKeyDown = useCallback(
    (e) => {
      if (e.isComposing || e.keyCode === 229 || !e.target.value) {
        return;
      }
      if (foundList.length === 0) {
        return;
      }

      const focus = navigateNext(e.code);
      if (focus !== -1) {
        e.preventDefault();
        setKeyword(() => foundList[focus]);
        setFocusItem(() => focus);
      }

      if (e.code === 'Enter') {
        setKeyword(() => foundList[focusItem]);
        setFoundList(() => []);
        // TODO: Submit
      }
    },
    [foundList, focusItem, navigateNext],
  );

  const handleInputFocus = useCallback(
    (e) => setFoundList(() => foodList.find(e.target.value)),
    [foodList],
  );

  const handleListClick = useCallback((e) => {
    if (e.target.tagName === 'A') {
      e.preventDefault();
      setKeyword(() => e.target.textContent);
      setFoundList(() => []);
    }
  }, []);

  const handleMouseOver = useCallback(
    (e) =>
      e.target.tagName === 'A' &&
      setFocusItem(() => foundList.indexOf(e.target.textContent)),
    [foundList],
  );

  const handleBlur = useCallback((e) => {
    if (e.relatedTarget?.tagName !== 'A') {
      setFocusItem(() => -1);
      setFoundList(() => []);
    }
  }, []);

  return (
    <div>
      <FoodSearchBar
        keyword={keyword}
        focusItem={focusItem}
        foundList={foundList}
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

export default FoodSearchBarContainer;
