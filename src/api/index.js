import { JISEEK_BASE_URL, createQueryApi, createMutationApi } from './common';
import youTubeApi from './youTube';

/*
  GET Api의 url은 react-query로 전달하는 고유키 값을 합친 것입니다.
  별도의 Arguments가 필요한 경우 객체 형태로 전달하면 됩니다.
    예) jiseekAPi.get({food: '불고기', token: 'sdf324sdf'})

  GET 이외의 Api는 Arguments로 url과 전송할 데이터(객체 형태)를 전달합니다.
    예) jiseekApi.post('/food/', {token: 'sdfs234sdf', 'taste': '매운맛'})
 */
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
