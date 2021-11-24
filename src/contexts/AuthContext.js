import {
  createContext,
  useCallback,
  useContext,
  useReducer,
  // useState,
} from 'react';
import { useMutation, useQueryClient } from 'react-query';
import jiseekApi from '../api';
import authReducer, { actions, initialState } from '../reducer/authReducer';
import { storeAuth } from '../utils';
// import PropTypes from 'prop-types';

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

  const queryClient = useQueryClient();
  const { mutate } = useMutation(
    (refresh) => jiseekApi.post('/refresh/', { refresh }),
    {
      mutationKey: 'tokenRefresh',
      retryDelay: (attempt) =>
        Math.min(attempt > 1 ? 2 ** attempt * 1000 : 1000, 60 * 1000),
      onMutate: () => {
        const current = new Date().getTime();
        const expired = current >= token.expTime;
        return expired;
      },
      onError: ({ err, context }) => {
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

  const refreshToken = useCallback(
    () => mutate(token.refresh),
    [token.refresh, mutate],
  );

  return { token, updateToken, refreshToken, clearToken };
};

export default AuthContext;
