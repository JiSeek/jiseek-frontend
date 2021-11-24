import axios from 'axios';

const JISEEK_BASE_URL = process.env.REACT_APP_JISEEK_API_BASE_URL;
const YOUTUBE_BASE_URL = 'https://www.googleapis.com/youtube/v3';
const YOUTUBE_API_KEY = process.env.REACT_APP_YOUTUBE_API_KEY;

const basicIns = axios.create({
  baseURL: JISEEK_BASE_URL,
  headers: { 'content-Type': 'application/json' },
  timeout: 3000,
});

// Query를 위한 API(사용 가능한 메소드: GET)
export const createQueryApi =
  (sendData = {}) =>
  async ({ queryKey }) => {
    try {
      const url = `/${queryKey.join('/')}/`;
      const { token, ...params } = sendData;
      const response = await basicIns.request({
        url,
        method: 'get',
        headers: { Authorization: token ? `Bearer ${token}` : '' },
        params,
      });
      return response.data;
    } catch (err) {
      throw new Error(err);
    }
  };

// Mutation을 위한 API(사용 가능한 메소드: POST, PUT, PATCH, DELETE)
export const createMutationApi =
  (method) =>
  async (url, sendData = {}) => {
    try {
      const { token, ...data } = sendData;
      const response = await basicIns.request({
        url,
        method,
        headers: { Authorization: token ? `Bearer ${token}` : '' },
        data,
      });
      return response.data;
    } catch (err) {
      throw new Error(err);
    }
  };

// YouTube Data API로부터 음식 레시피 정보를 얻어오는 API
export const youTubeApi = (url) => async (data) => {
  try {
    const response = await axios({
      baseURL: YOUTUBE_BASE_URL,
      url,
      method: 'get',
      headers: { 'content-Type': 'application/json' },
      params: { key: YOUTUBE_API_KEY, ...data },
      timeout: 3000,
    });
    return response.data.items;
  } catch (err) {
    throw new Error(err.message);
  }
};
