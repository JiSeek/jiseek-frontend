import commonApi from './common';

const boardApi = {
  getBoardList: commonApi.get('/board')()(),
  addPost: commonApi.post('/board')(),
  updatePost: (method) =>
    method === 'put' ? commonApi.put('/board') : commonApi.patch('/board'),
  deletePost: commonApi.delete('/board'),
};

export default boardApi;
