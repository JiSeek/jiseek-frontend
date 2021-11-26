import { createContext, useCallback, useContext, useReducer } from 'react';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import jiseekApi from '../api';
import { userKeys } from '../constants';
import { authReducer, initialState, actions } from '../reducer';
import { storeAuth } from '../utils';

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

export const useAuth = () => {
  const [token, dispatch] = useReducer(authReducer, initialState);

  const updateToken = useCallback((data) => {
    storeAuth(data);
    dispatch(actions.updateToken(data));
  }, []);

  const clearToken = useCallback(() => {
    storeAuth(initialTkn);
    dispatch(actions.clearToken());
  }, []);

  // TODO: 새로고침이 다시 불러오기 개선
  // 토큰으로 사용자 정보 불러오기
  useQuery(userKeys.info, jiseekApi.get({ token: token.access_token }), {
    staleTime: Infinity,
    enabled: !!token.access_token,
    // 테스트 용 코드
    onSuccess: (data) => console.log('사용자 정보 GET!!', data),
    onError: (err) => console.error('사용자 정보 GET FAIL!!', err),
  });

  // 토큰 Refresh
  const queryClient = useQueryClient();
  const { mutate } = useMutation(
    () =>
      jiseekApi.post('/user/access-token/refresh/', {
        token: token.access,
        refresh: token.refresh,
      }),
    {
      mutationKey: 'tokenRefresh',
      retryDelay: (attempt) =>
        Math.min(attempt > 1 ? 2 ** attempt * 1000 : 1000, 60 * 1000),
      onMutate: () => {
        const current = new Date().getTime();
        const expired = current >= token.expTime;
        return expired;
      },
      onError: (err, _, context) => {
        console.error('토큰 갱신 실패!(임시 에러처리)', err);
        if (context.expired) {
          clearToken();
          queryClient.setMutationDefaults('tokenRefresh', { retry: false });
        }
      },
      onSuccess: (data) => {
        console.log('토큰 갱신 성공!(임시 성공처리)', data);
        updateToken(data);
      },
    },
  );

  const refreshToken = useCallback(() => mutate(), [mutate]);

  return { token, updateToken, refreshToken, clearToken };
};

export default AuthContext;
