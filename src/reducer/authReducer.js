export const initialState = Object.freeze({
  access: null,
  refresh: null,
  expTime: 0,
});

const types = Object.freeze({
  CLEAR_TOKEN: 'CLEAR_TOKEN',
  UPDATE_TOKEN: 'UPDATE_TOKEN',
});

export const actions = Object.freeze({
  clearToken: () => ({ type: types.CLEAR_TOKEN }),
  updateToken: (data) => ({ type: types.UPDATE_TOKEN, payload: data }),
});

const authReducer = (state, action) => {
  switch (action.type) {
    case types.CLEAR_TOKEN:
      return initialState;
    case types.UPDATE_TOKEN:
      const data = action.payload;
      return {
        access: data.access_token,
        refresh: data.refresh_token,
        expTime: data.expires_at,
      };
    default:
      return state;
  }
};

export default authReducer;
