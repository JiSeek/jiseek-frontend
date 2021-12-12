import React from 'react';
import PropTypes from 'prop-types';
import { BoardUpload } from '../../components/BoardUpload';
import { useAuthContext } from '../../contexts';

const BoardUploadPage = ({ user }) => {
  const { token } = useAuthContext();
  return (
    <div>
      <BoardUpload
        user={{ id: user?.pk || -1, token: token?.access || null }}
      />
    </div>
  );
};

BoardUploadPage.propTypes = {
  user: PropTypes.objectOf(PropTypes.any),
};

BoardUploadPage.defaultProps = {
  user: {},
};

export default BoardUploadPage;
