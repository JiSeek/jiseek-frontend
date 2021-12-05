import React from 'react';
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
  <div>
    <div>
      <Routes>
        <Route path="/" element={<MyInfo />} />
        <Route path="info" element={<MyInfoUpdate />} />
      </Routes>
    </div>
    <div>
      <h2>관심 게시글 목록</h2>
      <FavoritePost />
    </div>
    <div>
      <h2>관심 음식 목록</h2>
      <FavoriteFood />
    </div>
  </div>
);

export default MyPage;
