import { JISEEK_BASE_URL, createQueryApi, createMutationApi } from './common';
import youTubeApi from './youTube';

const jiseekApi = {
  get: createQueryApi(JISEEK_BASE_URL),
  post: createMutationApi(JISEEK_BASE_URL)('post'),
  put: createMutationApi(JISEEK_BASE_URL)('put'),
  patch: createMutationApi(JISEEK_BASE_URL)('patch'),
  delete: createMutationApi(JISEEK_BASE_URL)('delete'),
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
