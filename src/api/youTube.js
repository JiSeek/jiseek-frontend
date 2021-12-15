import axios from 'axios';

const YOUTUBE_BASE_URL = 'https://www.googleapis.com/youtube/v3';
const YOUTUBE_API_KEY = process.env.REACT_APP_YOUTUBE_API_KEY;

// YouTube Data API로부터 음식 레시피 정보를 얻어오는 API
const youTubeApi = (url) => (data) => async () => {
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

export default youTubeApi;
