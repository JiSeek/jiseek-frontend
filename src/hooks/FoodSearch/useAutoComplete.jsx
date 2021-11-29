import { useState, useMemo, useCallback } from 'react';
import Trie from '../../utils/Trie';

/*
  Arguments:
    - dataList: 검색 가능한 데이터 목록
    - setTarget: 찾은 결과를 적용할 Hook, 리스트 형태로 저장.
        예) ['불고기'] / 없는 경우 ['']
  Return Values:
    - keyword: 현재 입력창에 입력한 문자열
    - focusItem: 가능한 목록 중 현재 포커싱된 항목
    - foundNames: 현재 입력한 키워드로 찾은 가능한 목록
    - on*: 자동 완성 기능을 위한 이벤트 핸들러
      (onInput | onKeyUp | onKeyDown | onFocusInput | onClickList | onMouseOver | onBlur)
*/
const useAutoComplete = (dataList = [], setTarget = null) => {
  const [keyword, setKeyword] = useState('');
  const [focusItem, setFocusItem] = useState(-1);
  const [foundNames, setFoundNames] = useState([]);

  const dataPool = useMemo(() => {
    const pool = new Trie();
    if (dataList.length) {
      dataList.map((name) => name).forEach((name) => pool.insert(name));
    }
    return pool;
  }, [dataList]);

  // 현재 입력창 입력값 변경 처리 핸들러
  const onInput = useCallback(
    (e) => {
      if (e.target.value !== keyword) {
        setFocusItem(-1);
      }
      setKeyword(e.target.value);
    },
    [keyword],
  );

  // TODO: 동작 안함 보류...
  // const onDebounceInput = useCallback(
  //   (e) => {
  //   },
  //   [],
  // );

  // 입력한 검색어에 대한 가능한 목록 표시 처리 핸들러
  const onKeyUp = useCallback(
    (e) => {
      if (
        /^Arrow(Up|Down|Left|Right)$/.test(e.code) ||
        e.code === 'Tab' ||
        e.code === 'Enter' ||
        /^F[1-9]{1,2}$/.test(e.code)
      ) {
        return;
      }
      setFoundNames(dataPool.find(e.target.value));
    },
    [dataPool],
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
  const onKeyDown = useCallback(
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
        if (typeof setTarget === 'function') {
          const target = foundNames[focusItem];
          setTarget(target || '');
        }
        setKeyword('');
        setFoundNames([]);
      }
    },
    [foundNames, focusItem, navigateNext, setTarget],
  );

  const onFocusInput = useCallback(
    (e) => setFoundNames(dataPool.find(e.target.value)),
    [dataPool],
  );

  // 음식 목록 중 마우스로 선택한 값 적용 처리 핸들러
  const onClickList = useCallback(
    (e) => {
      if (e.target.tagName === 'A') {
        e.preventDefault();
        if (typeof setTarget === 'function') {
          setTarget(e.target.textContent);
        }
        setKeyword('');
        setFoundNames([]);
      }
    },
    [setTarget],
  );

  const onMouseOver = useCallback(
    (e) =>
      e.target.tagName === 'A' &&
      setFocusItem(foundNames.indexOf(e.target.textContent)),
    [foundNames],
  );

  const onBlur = useCallback((e) => {
    if (e.relatedTarget?.tagName !== 'A') {
      setFocusItem(-1);
      setFoundNames([]);
    }
  }, []);

  return {
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
  };
};

export default useAutoComplete;
