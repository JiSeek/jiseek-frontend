import axios from 'axios';
import commonAPI from './common';

const YOUTUBE_BASE_URL = 'https://www.googleapis.com/youtube/v3';
const YOUTUBE_API_KEY = process.env.REACT_APP_YOUTUBE_API_KEY;

const youTubeApi = (url) => async (data) => {
  try {
    const response = await axios({
      baseURL: YOUTUBE_BASE_URL,
      url,
      method: 'get',
      headers: { 'content-Type': 'application/json' },
      params: { key: YOUTUBE_API_KEY, ...data },
      timeout: 3000,
    });

    // 혹시 모르니 임시 보류
    // const valid = /^2[0-9]{2}$/;
    // if (!valid.test(response.status)) {
    //   // throw new Error(response);
    // }
    return response.data.items;
  } catch (err) {
    // TODO: 비동기 처리 로직에 따라 변경 필요.
    throw new Error(err.message);
  }
};

const foodApi = {
  getFoodInfo: commonAPI.get('/food/search')()(),
  getRecipeList: youTubeApi('/search'),
  getVideoRating: youTubeApi('/videos'),
};

export default foodApi;

// TODO: 유튜브 api 에러 형식 참고 예정(음... 에러를 그냥 던져서 쓸일이 없을듯?)
// error": {
//   "code": 400,
//   "message": "'statistic'",
//   "errors": [
//       {
//           "message": "'statistic'",
//           "domain": "youtube.part",
//           "reason": "unknownPart",
//           "location": "part",
//           "locationType": "parameter"
//       }
//   ]
