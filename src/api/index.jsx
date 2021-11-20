import { createQueryApi, createMutationApi, youTubeApi } from './common';

const jiseekApi = {
  get: createQueryApi,
  post: createMutationApi('post'),
  put: createMutationApi('put'),
  patch: createMutationApi('patch'),
  delete: createMutationApi('delete'),
  getRecipeList: youTubeApi('/search'),
  getVideoRating: youTubeApi('/videos'),
};

export default jiseekApi;

// 수정 후 지울 것...
// 기존 게시판
// const boardApi = {
//   getBoardList: commonApi.get('/board/'),
//   addPost: commonApi.post('/board/'),
//   updatePost: commonApi.patch('/board/'),
//   deletePost: commonApi.delete('/board/'),
// };

// 기존 음식
// const foodApi = {
//   getFoodLIst: commonAPI.get('/food/'),
//   getFoodInfoByImage: commonAPI.post('/food/'),
//   getFoodInfoBySearch: commonAPI.get('/food/search/'),
//   getRecipeList: youTubeApi('/search'),
//   getVideoRating: youTubeApi('/videos'),
// };

// 기존 사용자
// const userApi = {
//   registerUser: commonApi.post('/register/'),
//   loginUser: commonApi.post('/login/'),
//   updateMyInfo: commonApi.put('/myinfo/'),
//   checkMyInfo: commonApi.post('/myinfo/'),
//   getMyPage: commonApi.get('/mypage/'),
//   addFavorites: commonApi.put('/mypage/favs/'),
// };
