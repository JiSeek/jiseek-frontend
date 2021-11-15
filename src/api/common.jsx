import axios from 'axios';

const JISEEK_BASE_URL = process.env.REACT_APP_JISEEK_API_BASE_URL;

const createApi =
  (method) =>
  (url) =>
  async ({ resourceId = '', token = null, data }) => {
    try {
      const response = await axios({
        baseURL: JISEEK_BASE_URL,
        url: url.concat(`/${resourceId}`),
        method,
        headers: {
          'content-Type': 'application/json',
          Authorization: token ? `Bearer ${token}` : '',
        },
        params: method === 'get' ? data : {},
        data: method !== 'get' ? data : {},
        timeout: 3000,
      });

      const valid = /^2[0-9]{2}$/;
      if (!valid.test(response.status)) {
        throw new Error(response.status);
      }

      return response.data;
    } catch (err) {
      // TODO: 비동기 처리 로직에 따라 변경 필요.
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
