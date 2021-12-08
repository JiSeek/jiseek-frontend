// 음식 찾기 고유키 정의
export const foodKeys = Object.freeze({
  all: 'foods',
  detailById: (id) => ['foods', id],
  recipes: (name) => ['foods', 'recipes', name],
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
  foodUpload: 'foodUpload',
  foodResult: 'foodResult',
});

// 게시판 페이지 고유키 정의
export const boardKeys = Object.freeze({ // Object.freeze 속성의 불변성
  superior: 'boards',
  bestBoards: ['boards', 'rank'],
  detailsById: id => ['boards', id],
  commentsById: boardId => ['boards', boardId, 'comments'],
});