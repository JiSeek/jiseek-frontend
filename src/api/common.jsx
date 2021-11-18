import axios from 'axios';

const JISEEK_BASE_URL = process.env.REACT_APP_JISEEK_API_BASE_URL;

const createApi =
  (method) =>
  (url) =>
  async ({ queryKey, data = {} }) => {
    try {
      const id = queryKey[1]?.id || '';
      const token = queryKey[1]?.token;
      const response = await axios({
        baseURL: JISEEK_BASE_URL,
        url: url.concat(id),
        method,
        headers: {
          'content-Type': 'application/json',
          Authorization: token ? `Bearer ${token}` : '',
        },
        params: method === 'get' ? data : {},
        data: method !== 'get' ? data : {},
        timeout: 3000,
      });

      // TODO: api 요청 실패시 어떻게 오는지에 따라 필요할 수도?(확인 필요)
      // const valid = /^2[0-9]{2}$/;
      // if (!valid.test(response.status)) {
      //   console.log('sdfsdfsdf');
      //   throw new Error(response.status);
      // }
      return response.data;
    } catch (err) {
      throw new Error(err);
    }
  };

const commonApi = {
  get: createApi('get'),
  post: createApi('post'),
  put: createApi('put'),
  patch: createApi('patch'),
  delete: createApi('delete'),
};

export default commonApi;
