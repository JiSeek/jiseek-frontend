import axios from 'axios';

const JISEEK_BASE_URL = process.env.REACT_APP_JISEEK_API_BASE_URL;

const createApi =
  (baseURL) =>
  (method) =>
  (url) =>
  (resourceId = '') =>
  (token = null) =>
  async (data) => {
    try {
      const response = await axios({
        baseURL,
        url: url.concat(resourceId),
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

const basicApi = createApi(JISEEK_BASE_URL);
const commonApi = {
  get: basicApi('get'),
  post: basicApi('post'),
  put: basicApi('put'),
  patch: basicApi('patch'),
  delete: basicApi('delete'),
};

export default commonApi;
