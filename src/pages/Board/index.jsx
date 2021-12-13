import React from 'react';
import { useTranslation } from 'react-i18next';
import { useQuery } from 'react-query';
import styled from 'styled-components';
import { Routes, Route, Navigate, Link, useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useAuthContext } from '../../contexts';
import { userKeys } from '../../constants';
import jiseekApi from '../../api';
import BoardUploadPage from '../BoardUpload';
import BoardDetailsPage from '../BoardDetails';
import { Posts } from '../../components/Board';
import { FilteredRoute } from '../../components/common';

const BoardPage = () => {
  const { t } = useTranslation();
  const location = useLocation();
  const { token } = useAuthContext();
  const { data: user } = useQuery(
    userKeys.info,
    jiseekApi.get({ token: token.access }),
    {
      staleTime: Infinity,
      cacheTime: Infinity,
      enabled: !!token.access,
    },
  );

  if (location?.state?.error) {
    toast.error(t('boardInvalidPost'), { toastId: 'boardInvalidPost' });
  }

  return (
    <StyledBoard>
      <Routes>
        <Route
          path="/"
          element={
            <BoardContainer>
              <div>
                <h2>{t('boardCommunityTitle')}</h2>
                {user?.pk && <Link to="./upload">{t('boardWriteText')}</Link>}
              </div>
              <Posts />
            </BoardContainer>
          }
        />
        <Route
          path="upload/*"
          element={
            <FilteredRoute authSubUrls={['.']}>
              <BoardUploadPage user={user} />
            </FilteredRoute>
          }
        />
        <Route path="post/:id" element={<BoardDetailsPage user={user} />}>
          <Route path=":action" element={<></>} />
        </Route>
        <Route path="*" element={<Navigate to="/not_found" replace />} />
      </Routes>
    </StyledBoard>
  );
};

const StyledBoard = styled.div`
  width: 75vw;
  max-width: 1320px;
  padding: 4rem 0;
  margin: auto;
`;

const BoardContainer = styled.section`
  > div {
    :first-child {
      display: flex;
      justify-content: space-between;
      padding-right: 1.5rem;
      align-items: flex-end;
    }

    margin: auto;
    > h2 {
      font-size: 2.65rem;
      font-weight: 600;
      display: flex;
      flex-basis: 100%;
      align-items: center;

      ::after {
        content: '';
        flex-grow: 1;
        background: #00110036;
        height: 1px;
        margin-right: 1rem;
      }

      ::after {
        margin-left: 1rem;
      }
    }

    > a {
      text-align: center;
      height: 35px;
      width: 130px;
      border-radius: 5px;
      background: #407f00;
      color: #fbfbfb;
      cursor: pointer;
      line-height: 35px;
      opacity: 0.6;
      transition: 0.3s;

      :hover {
        opacity: 1;
      }
    }
  }
`;

export default BoardPage;
