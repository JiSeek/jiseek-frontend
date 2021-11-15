import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import MainPage from './pages';
import Board from './pages/Board';
import BoardDetail from './pages/BoardDetail';
import FoodSearch from './pages/FoodSearch';
import Login from './pages/Login';
import MyInfo from './pages/MyInfo';
import MyPage from './pages/MyPage';
import Register from './pages/Register';

const App = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<MainPage />} />
      <Route path="register" element={<Register />} />
      <Route path="login" element={<Login />} />
      <Route path="food" element={<FoodSearch />} />
      <Route path="board" element={<Board />} />
      <Route path="board/*" element={<BoardDetail />} />
      <Route path="mypage" element={<MyPage />} />
      <Route path="mypage/info" element={<MyInfo />} />
    </Routes>
  </BrowserRouter>
);
export default App;
