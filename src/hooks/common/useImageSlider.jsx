import React, { useState, useEffect, useMemo, useCallback } from 'react';
// 임시 스타일드 요건 뺄거...
import styled, { css } from 'styled-components';
import { ArrowTypeNavBar, BubbleTypeNavBar } from '../../components/common';
import { Bulgogi, Meat, MeatGui } from '../../assets/images';

/*
  Arguments:
    - last: 마지막 슬라이드 인덱스
    - setSlideIdx: 현재 슬라이드 인덱스를 외부에 반영할 함수
  Return Values:
    - onDragDown: 마우스나 터치 시작 이벤트 처리 핸들러
    - onDragMove: 마우스나 터치 움직임 이벤트 처리 핸들러
    - onDragUp: 마우스나 터치 종료 이벤트 처리 핸들러
    - onAreaLeave: 마우스나 터치가 대상을 벗어났을 때 이벤트 처리 핸들러
        (대상을 벗어나고 종료 이벤트가 처리되지 않았을 때를 방지)
*/
const useDragMove = (last = 0, setSlideIdx = null) => {
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [currentX, setCurrentX] = useState(0);

  const moveLeft = useCallback(
    () => setSlideIdx((slide) => (slide === last ? slide : slide + 1)),
    [last, setSlideIdx],
  );
  const moveRight = useCallback(
    () => setSlideIdx((slide) => (slide === 0 ? slide : slide - 1)),
    [setSlideIdx],
  );

  const onDragDown = useCallback((e) => {
    const current = e.clientX || e.touches[0].clientX;
    setStartX(() => current);
    setCurrentX(() => current);
    setIsDragging(() => true);
  }, []);

  const onDragMove = useCallback(
    (e) => {
      if (!isDragging) {
        return;
      }
      setCurrentX(e.clientX || e.touches[0].clientX);
    },
    [isDragging],
  );

  const onDragUp = useCallback(
    (e) => {
      const diff = startX - currentX;
      const direction = diff > 0 ? 'left' : 'right';
      if (Math.abs(diff) > e.target.offsetWidth / 5) {
        if (direction === 'left') {
          moveLeft();
        } else {
          moveRight();
        }
      }
      setStartX(() => 0);
      setIsDragging(false);
    },
    [startX, currentX, setStartX, moveLeft, moveRight],
  );

  const onAreaLeave = useCallback(
    (e) => isDragging && onDragUp(e),
    [onDragUp, isDragging],
  );

  return { onDragDown, onDragMove, onDragUp, onAreaLeave };
};

/*
  Arguments:
    - imageList: 표시할 이미지 목록(현재 객체형태 생각 중, 아직 결정X)
    - option: 객체 형식
      - type: 네비게이션 형태(가능 옵션: 'arrow' | 'bubble')
      - label: 사용자 접근성을 위한 네비게이션 aria-label
          객체 형식 입력 {ko: 한국어 버전, en: 영어 버전}
  Return Values:
    - slideIdx: 현재 슬라이드 위치
    - RenderImageSlider: 이미지 슬라이더 컴포넌트 랜더링 함수
*/
const useImageSlider = (imageList = [], options = {}) => {
  const [slideIdx, setSlideIdx] = useState(0);
  const setOptions = useMemo(
    () => ({ type: 'arrow', label: { ko: '', en: '' }, ...options }),
    [options],
  );
  const { onDragDown, onDragMove, onDragUp, onAreaLeave } = useDragMove(
    imageList.length - 1,
    setSlideIdx,
  );

  useEffect(() => imageList.length === 0 && setSlideIdx(0), [imageList]);

  // 테스트용
  const images = useMemo(() => [Bulgogi, Meat, MeatGui], []);

  const RenderImageSlider = () => (
    <div>
      <StyledSliderContainer>
        <StyledSlider slideIdx={slideIdx}>
          {imageList.map((name, idx) => (
            <li key={`${name}`}>
              <StyledSlide
                active={slideIdx === idx}
                type="image"
                src={images[idx]}
                alt={`${name}`} // 여기서 분석 클래스명 쓰면 될듯 함.
                value={`${name}`}
                onClick={(e) =>
                  console.log('테스트, 누르면 확대하도록?!', e.target.value)
                }
                onMouseDown={onDragDown}
                onMouseMove={onDragMove}
                onMouseUp={onDragUp}
                onMouseLeave={onAreaLeave}
                onTouchStart={onDragDown}
                onTouchMove={onDragMove}
                onTouchEnd={onDragUp}
              />
            </li>
          ))}
        </StyledSlider>
      </StyledSliderContainer>
      {setOptions.type === 'arrow' ? (
        <ArrowTypeNavBar
          // lang={}
          label={setOptions.label}
          name={imageList[slideIdx]}
          curIndex={slideIdx}
          min={0}
          max={imageList.length - 1}
          onPrev={() => setSlideIdx((old) => old - 1)}
          onNext={() => setSlideIdx((old) => old + 1)}
        />
      ) : (
        <BubbleTypeNavBar /> // TODO: 아직 미구현
      )}
    </div>
  );

  return { slideIdx, RenderImageSlider };
};

// TODO: 임시 스타일링 프레젠테이션으로 만들 것!
const StyledSliderContainer = styled.div`
  width: 200px;
  height: 200px;
  margin: auto;
  overflow: hidden;
`;

const StyledSlider = styled.ul`
  display: flex;
  margin: 0;
  padding: 0;
  list-style: none;
  background-attachment: fixed;
  transition: ease-in-out 0.5s all;
  transform: ${(props) => `translateX(-${props.slideIdx}00%)`};
`;

const StyledSlide = styled.input`
  width: 200px;
  height: 200px;
  opacity: 0.3;
  pointer-events: none;
  transition: ease-in-out 0.5s all;
  user-select: none;
  -moz-user-select: none;
  -webkit-user-drag: none;
  -webkit-user-select: none;
  -ms-user-select: none;

  ${(props) =>
    props.active &&
    css`
      opacity: 1;
      pointer-events: auto;
    `}
`;

export default useImageSlider;
