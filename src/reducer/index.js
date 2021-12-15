import * as auth from './authReducer';

export const initialState = Object.freeze({
  auth: auth.initialState,
});

export const actions = Object.freeze({
  ...auth.actions,
});

export { default as authReducer } from './authReducer';
