import {
  useRef,
  createContext,
  useCallback,
  useContext,
  useReducer,
} from 'react';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import jiseekApi from '../api';
import { mutationKey, userKeys } from '../constants';
import { authReducer, initialState, actions } from '../reducer';
import { setLocalStorage } from '../utils';

const AuthContext = createContext();

export const useAuthContext = () => {
  const authContext = useContext(AuthContext);
  if (!authContext) {
    throw new Error('Use SessionContext inside Provider.');
  }
  return authContext;
};

export const initialTkn = {
  access_token: null,
  refresh_token: null,
  expires_at: 0,
};

const getRefreshTime = (hour) => hour * 60 * 60;

export const useAuth = () => {
  const queryClient = useQueryClient();
  const timerId = useRef(null);
  const [token, dispatch] = useReducer(authReducer, initialState.auth);

  const updateToken = useCallback((data) => {
    setLocalStorage('jiseek_auth', data);
    dispatch(actions.updateToken(data));
  }, []);

  const clearToken = useCallback(() => {
    clearTimeout(timerId.current);
    timerId.current = null;
    setLocalStorage('jiseek_auth', initialTkn);
    dispatch(actions.clearToken());
    queryClient.removeQueries(userKeys.all);
  }, [queryClient]);

  // 토큰 Refresh
  const { mutate: refreshToken } = useMutation(
    () =>
      jiseekApi.post('/user/access-token/refresh/', {
        token: token.access,
        refresh: token.refresh,
      }),
    {
      mutationKey: mutationKey.token,
      retry: 5,
      retryDelay: (attempt) =>
        Math.min(attempt > 1 ? 2 ** attempt * 1000 : 1000, 60 * 1000),
      onError: (err) => {
        console.error('토큰 갱신 실패!(임시 에러처리)', err);
        clearToken();
      },
      onSuccess: (data) => {
        if (token.access) {
          console.log('토큰 갱신 성공!(임시 성공처리)', data);
          updateToken(data);
        }
      },
    },
  );

  // 토큰으로 사용자 정보 불러오기
  useQuery(userKeys.info, jiseekApi.get({ token: token.access }), {
    cacheTime: Infinity, // TODO: 상태 확인하기!!
    staleTime: Infinity,
    enabled: !!token.access,
    // 테스트 용 코드
    onSuccess: () => {
      console.log('test');
      clearTimeout(timerId.current);
      const remainTime =
        token.expTime - parseInt(new Date().getTime() / 1000, 10);
      const refreshTime = getRefreshTime(1); // 1시간.
      const delay = remainTime >= refreshTime ? remainTime - refreshTime : 0;
      timerId.current = setTimeout(() => refreshToken(), delay * 1000);
    },
    onError: (err) => {
      // TODO: 모달로 세션 만료 띄우기
      console.error('사용자 정보 GET FAIL!!', err);
      clearToken();
    },
  });

  return { token, updateToken, clearToken };
};

export default AuthContext;
