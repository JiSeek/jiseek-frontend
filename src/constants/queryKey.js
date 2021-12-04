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
});

// 마이 페이지 고유키 정의
export const myPagekeys = Object.freeze({
  favPost: ['mypage', 'board-favs'],
  favFood: ['mypage', 'food-favs'],
});

// Mutation 키 정의
export const mutationKey = Object.freeze({
  logIn: 'userLogIn',
  logOut: 'userLogOut',
  like: 'likeTarget',
  userInfo: 'userInfoUpdate',
  password: 'userPassword',
  signUp: 'signUp',
  token: 'tokenRefresh',
  foodUpload: 'foodUpload',
});

// 게시판 페이지 고유키 정의
export const boardKeys = Object.freeze({ // Object.freeze 속성의 불변성
  superior: 'boards',
  detailsById: id => ['boards', id],
});

