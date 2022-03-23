import youTubeApi from './youTube';
import * as jiseek from './common';
import createOAuth2Api from './oAuth2';

const JISEEK_BASE_URL = process.env.REACT_APP_JISEEK_API_BASE_URL;
const IMAGE_RESULT_LAMBDA_URL = process.env.REACT_APP_IMAGE_RESULT_LAMBDA_URL;
/*
GET Api의 url은 react-query로 전달하는 고유키 값을 합친 것입니다.
별도의 Arguments가 필요한 경우 객체 형태로 전달하면 됩니다.
예) jiseekAPi.get({food: '불고기', token: 'sdf324sdf'})

  GET 이외의 Api는 Arguments로 url과 전송할 데이터(객체 형태)를 전달합니다.
  예) jiseekApi.post('/food/', {token: 'sdfs234sdf', 'taste': '매운맛'})
  */
const jiseekApi = {
  get: jiseek.createQueryApi(JISEEK_BASE_URL),
  post: jiseek.createMutationApi(JISEEK_BASE_URL)('post'),
  put: jiseek.createMutationApi(JISEEK_BASE_URL)('put'),
  patch: jiseek.createMutationApi(JISEEK_BASE_URL)('patch'),
  delete: jiseek.createMutationApi(JISEEK_BASE_URL)('delete'),
  getImageResult: jiseek.createMutationApi(IMAGE_RESULT_LAMBDA_URL)('post'),
  getRecipeList: youTubeApi('/search'),
  getVideoRating: youTubeApi('/videos'),
};

const createOAuth2Info = (type) => ({
  apiKey: ((tp) => {
    switch (tp) {
      case 'kakao':
        return process.env.REACT_APP_KAKAO_API_KEY;
      case 'naver':
        return process.env.REACT_APP_NAVER_API_CLIENT_ID;
      default:
        return '';
    }
  })(type),
  baseUrl: jiseek.createOAuth2BaseUrl(type),
  redirectUrl: jiseek.createRedirectUrl(type),
  getAccessToken(url, sendData) {
    return createOAuth2Api(this.baseUrl)(url, sendData);
  },
});

export const oAuth2 = {
  kakao: createOAuth2Info('kakao'),
  naver: createOAuth2Info('naver'),
};

export * from './common';
export default jiseekApi;
