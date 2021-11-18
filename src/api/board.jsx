import commonApi from './common';

const boardApi = {
  getBoardList: commonApi.get('/board/'),
  addPost: commonApi.post('/board/'),
  updatePost: commonApi.patch('/board/'),
  deletePost: commonApi.delete('/board/'),
};

export default boardApi;
