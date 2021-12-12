import React from 'react';
import { useTranslation } from 'react-i18next';
import { useQuery } from 'react-query';
import styled from 'styled-components';
import { Routes, Route, Navigate, Link } from 'react-router-dom';
import { useAuthContext } from '../../contexts';
import { userKeys } from '../../constants';
import jiseekApi from '../../api';
import BoardUploadPage from '../BoardUpload';
import BoardDetailsPage from '../BoardDetails';
import BoardModifyPage from '../BoardModify';
import { Posts } from '../../components/Board';
import { FilteredRoute } from '../../components/common';

const BoardPage = () => {
  const { t } = useTranslation();
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

  return (
    <StyledMyPage>
      <Routes>
        <Route
          path="/"
          element={
            <BoardContainer>
              <Title>{t('boardCommunityTitle')}</Title>
              {user?.pk && <Link to="./upload">{t('boardUploadButton')}</Link>}
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
        <Route path="post/*" element={<BoardDetailsPage user={user} />}>
          <Route path=":id" element={<BoardDetailsPage user={user} />}>
            <Route path="modify" element={<BoardModifyPage user={user} />} />
          </Route>
          <Route path="*" element={<Navigate to="/not_found" replace />} />
        </Route>
        <Route path="*" element={<Navigate to="/not_found" replace />} />
      </Routes>
    </StyledMyPage>
  );
};

const StyledMyPage = styled.div`
  max-width: 1320px;
  padding: 4rem 0;
  margin: auto;
`;

const Title = styled.h2`
  font-size: 2.5rem;
  font-weight: 800;
  text-align: center;
  margin-bottom: 2.5rem;
`;

const BoardContainer = styled.section`
  padding: 0 2rem;
`;

// const StyledButton = styled.button`
//   font-size: 0.9rem;
//   background-color: #407f00;
//   color: #f6fff2;
//   text-align: center;
//   width: 180px;
//   height: 40px;
//   cursor: pointer;
//   border: none;
//   margin-bottom: 1.5rem;
//   border-radius: 5px;
//   margin-left: calc(100% - 200px);
// `;

// const GridContainer = styled.div`
//   height: 72vh;
//   display: grid;
//   grid-template-columns: repeat(5, 1fr);
//   gap: 0.5rem;
//   overflow-y: auto;

//   > a {
//     :first-child {
//       grid-column: 1/3;
//       grid-row: 1/3;
//     }

//     > div {
//       position: relative;
//       width: 100%;
//       padding-bottom: 100%;
//       overflow: hidden;

//       > img {
//         width: 100%;
//         height: 100%;
//         object-fit: cover;
//         border-radius: 20px;
//         position: absolute;
//       }
//     }
//   }
// `;

export default BoardPage;
