import React from 'react';
import { Routes, Route } from 'react-router-dom';
import {
  FavoriteFood,
  FavoritePost,
  MyInfo,
  MyInfoUpdate,
} from '../../components/MyPage';

const MyPage = () => (
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
