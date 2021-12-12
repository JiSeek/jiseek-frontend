import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Navigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { BoardDetails } from '../../components/BoardDetails';
import { useAuthContext } from '../../contexts';

const BoardDetailsPage = ({ user }) => {
  const params = useParams();
  const { token } = useAuthContext();
  const id = Number(params.id);

  if (!/^\d+$/.test(id)) {
    // TODO: 한/영 변환필요
    toast.error('유효하지 않은 게시물입니다.', { toastId: '' });
    return <Navigate to=".." />;
  }
  // TODO: 라우팅 구조 잡는 중...
  // console.log('xxxx', params);

  return (
    <StyledBoardDetail>
      {/* TODO: 임시 헤더 */}
      <h2>상세 페이지</h2>
      <BoardDetails
        id={id}
        user={{ id: user?.pk || -1, token: token?.access || null }}
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
