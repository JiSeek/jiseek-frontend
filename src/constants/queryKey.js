// 음식 찾기 고유키 정의
export const foodKeys = Object.freeze({
  all: 'foods',
  detailById: (id) => ['foods', id],
});

export const recipeKeys = Object.freeze({
  recipeList: (name) => ['recipes', name],
  detailById: (id) => ['recipes', id],
});

// 사용자 정보 고유키 정의
export const userKeys = Object.freeze({
  all: 'user',
  info: ['user', 'info'],
  socialAuth: (type) => ['user', 'login', type],
  emailAuth: ['user', 'account-confirm-email'],
  logout: ['user', 'logout-all'],
});

// 마이 페이지 고유키 정의
export const myPagekeys = Object.freeze({
  favPost: ['mypage', 'board-favs'],
  favFood: ['mypage', 'food-favs'],
});

// Mutation 키 정의
export const mutationKey = Object.freeze({
  login: 'userLogin',
  like: 'likeTarget',
  userInfo: 'userInfoUpdate',
  password: 'userPassword',
  signUp: 'signUp',
  token: 'tokenRefresh',
  foodUpload: 'foodUpload',
});
