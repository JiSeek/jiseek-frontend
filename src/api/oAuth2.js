import axios from 'axios';

const createOAuth2Api =
  (baseURL) =>
  async (url, params = {}) => {
    try {
      const response = await axios({
        baseURL,
        url,
        method: 'post',
        // headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        headers: { 'Content-Type': 'application/json;charset=utf-8' },
        timeout: 3000,
        params,
      });
      return response.data;
    } catch (err) {
      throw new Error(err);
    }
  };

export default createOAuth2Api;
