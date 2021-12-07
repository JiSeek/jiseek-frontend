import React from 'react';
import styled from 'styled-components';
import { Routes, Route } from 'react-router-dom';
import {
  FavoriteFood,
  FavoritePost,
  MyInfo,
  MyInfoUpdate,
} from '../../components/MyPage';

const MyPage = () => (
  // {/* <NavLink to=".">마이 페이지</NavLink>
  //       <NavLink to="info">회원정보 수정</NavLink>
  //       <NavLink to="ch_pswrd">비밀번호 변경</NavLink> */}
  <StyledMyPage>
    <Title>마이페이지</Title>
    <MyPageStructure>
      <Profile>
        <Routes>
          <Route path="/" element={<MyInfo />} />
          <Route path="info" element={<MyInfoUpdate />} />
        </Routes>
      </Profile>
      <Favorite>
        <div>
          <Subtitle>관심 음식 목록</Subtitle>
          <FavoriteFood />
        </div>
        <div>
          <Subtitle>관심 게시글 목록</Subtitle>
          <FavoritePost />
        </div>
      </Favorite>
    </MyPageStructure>
  </StyledMyPage>
);

const StyledMyPage = styled.div`
  max-width: 1320px;
  padding: 4rem 0;
  margin: auto;
`;

const MyPageStructure = styled.div`
  display: flex;
`;

const Title = styled.div`
  font-size: 2.5rem;
  font-weight: 800;
  text-align: center;
  margin-bottom: 2.5rem;
`;

const Profile = styled.div`
  width: 280px;
  margin-right: 4.75rem;
`;

const Favorite = styled.div`
  width: 100%;
  > div {
    :first-child {
      margin-bottom: 3rem;
    }
  }
`;

const Subtitle = styled.h2`
  font-size: 1.5rem;
  font-weight: 500;
  display: flex;
  flex-basis: 100%;
  align-items: center;

  ::after {
    content: '';
    flex-grow: 1;
    background: #00110036;
    height: 1px;
    margin-left: 1rem;
  }
`;

export default MyPage;
