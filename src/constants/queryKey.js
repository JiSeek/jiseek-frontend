// 음식 찾기 고유키 정의
export const foodKeys = Object.freeze({
  all: 'foods',
  detailById: (id) => ['foods', id],
  recipes: (name) => ['foods', 'recipes', name],
});

// 게시판 페이지 고유키 정의
export const boardKeys = Object.freeze({
  all: 'boards',
  best: ['boards', 'rank'],
  postById: (id) => ['boards', id],
  commentsByPostId: (boardId) => ['boards', boardId, 'comments'],
});

// 사용자 정보 고유키 정의
export const userKeys = Object.freeze({
  all: 'user',
  info: ['user', 'info'],
});

// 마이 페이지 고유키 정의
export const myPageKeys = Object.freeze({
  all: 'mypage',
  favPosts: ['mypage', 'board-favs'],
  favFoods: ['mypage', 'food-favs'],
});

// Mutation 키 정의
export const mutationKeys = Object.freeze({
  logIn: 'userLogIn',
  logOut: 'userLogOut',
  oAuth2: 'oAuth2',
  verify: 'verify',
  like: 'likeTarget',
  userInfo: 'userInfoUpdate',
  password: 'userPassword',
  signUp: 'signUp',
  token: 'tokenRefresh',
  foodAll: 'foods',
  foodUpload: ['foods', 'upload'],
  foodResult: ['foods', 'result'],
  postAll: 'post',
  postCreate: ['post', 'create'],
  postDelete: ['post', 'delete'],
  commentCreate: ['post', 'comment', 'create'],
  commentDelete: ['post', 'comment', 'delete'],
  commentUpdate: ['post', 'comment', 'update'],
});
