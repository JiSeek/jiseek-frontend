import {
  useRef,
  createContext,
  useCallback,
  useContext,
  useReducer,
  useEffect,
  useState,
} from 'react';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import jiseekApi from '../api';
import { mutationKeys, userKeys } from '../constants';
import { authReducer, initialState, actions } from '../reducer';
import { getCurrentTime, setLocalStorage } from '../utils';

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

const getRefreshTime = (min) => min * 60;

export const useAuth = () => {
  const queryClient = useQueryClient();
  const timerId = useRef(null);
  const [token, dispatch] = useReducer(authReducer, initialState.auth);
  const [validUser, setValidUser] = useState(false);

  const updateToken = useCallback((data) => {
    setLocalStorage('jiseek_auth', data);
    dispatch(actions.updateToken(data));
  }, []);

  const clearToken = useCallback(() => {
    clearTimeout(timerId.current);
    timerId.current = null;
    setLocalStorage('jiseek_auth', initialTkn);
    dispatch(actions.clearToken());
    queryClient.clear();
  }, [queryClient]);

  // 토큰 Refresh
  const { mutate: refreshToken } = useMutation(
    () =>
      jiseekApi.post('/user/access-token/refresh/', {
        token: token.access,
        refresh: token.refresh,
      }),
    {
      mutationKey: mutationKeys.token,
      retry: 3,
      retryDelay: 10 * 60 * 1000, // 10분마다 재시도
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

  // 수정 중.....
  console.log(token.expTime, getCurrentTime(), token.access, '토오큰');
  // 토큰으로 사용자 정보 불러오기
  useQuery(userKeys.info, jiseekApi.get({ token: token.access }), {
    cacheTime: Infinity, // TODO: 상태 확인하기!!
    staleTime: Infinity,
    enabled: !!token.access,
    // 테스트 용 코드
    onSuccess: () => setValidUser(true),
    onError: (err) => {
      // TODO: 모달로 세션 만료 띄우기
      console.error('사용자 정보 GET FAIL!!', err);
      clearToken();
    },
  });

  // 토큰 리프레쉬 설정
  useEffect(() => {
    console.log(token.access, validUser, 'test1');
    if (!token.access || !validUser) {
      return;
    }
    clearTimeout(timerId.current);
    const remainTime = token.expTime - getCurrentTime();
    const refreshTime = getRefreshTime(30); // 30분.
    const delay = remainTime >= refreshTime ? remainTime - refreshTime : 0;
    console.log(
      delay,
      'test',
      token.expTime,
      remainTime,
      refreshTime,
      getCurrentTime(),
    );
    timerId.current = setTimeout(() => refreshToken(), delay * 1000);
  }, [token, validUser, refreshToken]);

  return { token, updateToken, clearToken };
};

export default AuthContext;
