import boardApi from './board';
import foodApi from './food';
import userApi from './user';

const jiseekApi = {
  ...foodApi,
  ...userApi,
  ...boardApi,
};

export default jiseekApi;
