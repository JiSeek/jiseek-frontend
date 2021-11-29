import React from 'react';
import { Link, useMatch, useResolvedPath } from 'react-router-dom';
import PropTypes from 'prop-types';

// Link props 전달 Eslint 에러 방지
/* eslint-disable react/jsx-props-no-spreading */
const CustomLink = ({ children, to, ...props }) => {
  const resolved = useResolvedPath(to);
  const match = useMatch({ path: `${resolved.pathname}/*`, end: true });
  // TODO: 디자인시 match 값을 Styled Component props로 넘겨 active 상태에 활용 가능. + 경로 처리 문제
  // 부가 설명.
  // end 옵션: 해당 경로로 끝나는 경로와 일치하는지 확인
  return (
    <Link to={match?.pathnameBase || to} {...props}>
      {children}
      {match && '(요거)'}
    </Link>
  );
};

CustomLink.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.element,
  ]),
  to: PropTypes.string,
  props: PropTypes.objectOf(
    PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.object]),
  ),
};

CustomLink.defaultProps = {
  children: null,
  to: '/',
  props: null,
};

export default CustomLink;
