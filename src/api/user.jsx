import commonApi from './common';

const userApi = {
  registerUser: commonApi.post('/register'),
  loginUser: commonApi.post('/login'),
  updateMyInfo: commonApi.put('/myinfo'),
  checkMyInfo: commonApi.post('/myinfo'),
  getMyPage: commonApi.get('/mypage'),
  addFavorites: commonApi.put('/mypage/favs'),
};

export default userApi;
