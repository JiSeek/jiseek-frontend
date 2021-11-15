import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import MainPage from './pages';
import Register from './pages/Register';
import Login from './pages/Login';
import FoodSearch from './pages/FoodSearch';
import Board from './pages/Board';
import BoardDetails from './pages/BoardDetails';
import MyPage from './pages/MyPage';
import MyInfo from './pages/MyInfo';

const App = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<MainPage />} />
      <Route path="register" element={<Register />} />
      <Route path="login" element={<Login />} />
      <Route path="food" element={<FoodSearch />} />
      <Route path="board" element={<Board />} />
      <Route path="board/*" element={<BoardDetails />} />
      <Route path="mypage" element={<MyPage />} />
      <Route path="mypage/info" element={<MyInfo />} />
    </Routes>
  </BrowserRouter>
);
export default App;
