import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { Link, useMatch, useResolvedPath } from 'react-router-dom';

// Link props 전달 Eslint 에러 방지
/* eslint-disable react/jsx-props-no-spreading */
const CustomLink = ({ children, to, ...props }) => {
  const resolved = useResolvedPath(to);
  const match = useMatch({ path: `${resolved.pathname}/*`, end: true });
  // end 옵션: 해당 경로로 끝나는 경로와 일치하는지 확인
  return (
    <Link to={match?.pathnameBase || to} {...props}>
      {children}
      {match && <SelectBar />}
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

const SelectBar = styled.div`
  width: 70%;
  min-width: 120px;
  height: 0.5rem;
  background: #72af2c;
  position: absolute;
  bottom: 0.3rem;
`;
