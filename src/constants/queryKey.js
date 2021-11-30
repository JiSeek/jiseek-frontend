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

// 게시판 페이지 고유키 정의
export const boardKeys = Object.freeze({ // Object.freeze 속성의 불변성
  superior: 'boards',
  // upload: ['boards', 'upload'],  //***쿼리키 부분은 backend api와 소통하기 위한 수단인건가? 리액트 라우팅과 별개로?***
  detailsById: id => ['boards', id],
});