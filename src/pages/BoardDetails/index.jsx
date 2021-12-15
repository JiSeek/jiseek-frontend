import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import { Navigate, useLocation, useParams } from 'react-router-dom';
import { BoardDetails } from '../../components/BoardDetails';
import { useAuthContext } from '../../contexts';

const BoardDetailsPage = ({ user }) => {
  const location = useLocation();
  const params = useParams();
  const { t } = useTranslation();
  const { token } = useAuthContext();
  const id = Number(params.id);
  const { action } = params;

  if (!/^\d+$/.test(id) || [undefined, 'modify'].indexOf(action) === -1) {
    return <Navigate to=".." state={{ error: true }} />;
  }

  if (action === 'modify' && !token.access) {
    return <Navigate to="/login" state={{ from: location }} />;
  }

  return (
    <StyledBoardDetail>
      <h2>{t('boardDetailsTitle')}</h2>
      <BoardDetails
        id={id}
        user={{ id: user?.pk || -1, token: token?.access || null }}
        modifyMode={action === 'modify'}
      />
    </StyledBoardDetail>
  );
};

BoardDetailsPage.propTypes = {
  user: PropTypes.objectOf(PropTypes.any),
};

BoardDetailsPage.defaultProps = {
  user: {},
};

const StyledBoardDetail = styled.article`
  > h2 {
    display: none;
  }
`;

export default BoardDetailsPage;
