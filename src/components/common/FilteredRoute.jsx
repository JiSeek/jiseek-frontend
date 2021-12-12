import React, { useMemo } from 'react';
import PropTypes, { element, func, number, string } from 'prop-types';
import { Navigate, useLocation, useParams } from 'react-router-dom';
import { useAuthContext } from '../../contexts';

const FilteredRoute = ({ validSubUrls, authSubUrls, children }) => {
  const { token } = useAuthContext();
  const location = useLocation();
  const params = useParams();
  const subUrl = Object.values(params)[0];
  const validList = useMemo(
    () => [undefined, '', ...validSubUrls],
    [validSubUrls],
  );

  const authList = useMemo(
    () =>
      authSubUrls.indexOf('.') !== -1
        ? [undefined, '', ...authSubUrls]
        : authSubUrls,
    [authSubUrls],
  );

  if (validList.indexOf(subUrl) === -1) {
    return <Navigate to="/not_found" replace />;
  }

  if (authList.indexOf(subUrl) !== -1 && !token.access) {
    return <Navigate to="/login" state={{ from: location }} />;
  }

  return children;
};

FilteredRoute.propTypes = {
  validSubUrls: PropTypes.arrayOf(string),
  authSubUrls: PropTypes.arrayOf(string),
  children: PropTypes.oneOfType([string, number, func, element]),
};

FilteredRoute.defaultProps = {
  validSubUrls: [],
  authSubUrls: [],
  children: null,
};

export default FilteredRoute;
