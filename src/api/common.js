import axios from 'axios';

const REDIRECT_BASE_URL = process.env.REACT_APP_LOGIN_REDIRECT_BASE_URL;

// Query를 위한 API(사용 가능한 메소드: GET)
export const createQueryApi =
  (baseURL) =>
  (sendData = {}) =>
  async ({ queryKey }) => {
    try {
      const url = `/${queryKey.join('/')}/`;
      const { token, ...params } = sendData;
      const response = await axios({
        baseURL,
        url,
        method: 'get',
        headers: {
          'Content-Type': 'application/json',
          Authorization: token ? `Bearer ${token}` : '',
        },
        timeout: 3000,
        params,
      });

      return response.data;
    } catch (err) {
      throw new Error(err);
    }
  };

// Mutation을 위한 API(사용 가능한 메소드: POST, PUT, PATCH, DELETE)
export const createMutationApi =
  (baseURL) =>
  (method) =>
  async (url, sendData = {}) => {
    try {
      const { token, ...data } = sendData;
      const response = await axios({
        baseURL,
        url,
        method,
        headers: {
          'Content-Type': 'application/json',
          Authorization: token ? `Bearer ${token}` : '',
        },
        timeout: 10000,
        data,
      });
      return response.data;
    } catch (err) {
      throw new Error(err);
    }
  };

export const createOAuth2BaseUrl = (type = '') => {
  switch (type) {
    case 'kakao':
      return 'https://kauth.kakao.com/oauth';
    case 'naver':
      return 'https://nid.naver.com/oauth2.0';
    default:
      return '';
  }
};

export const createRedirectUrl = (type = '') => `${REDIRECT_BASE_URL}/${type}`;
