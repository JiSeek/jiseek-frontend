// 음식 찾기 고유키 정의
export const foodKeys = Object.freeze({
  allList: 'food',
  detailById: (id) => ['food', id],
  // detailByName: (name) => ['food', name],
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
