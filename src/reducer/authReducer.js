export const initialState = {
  access: null,
  refresh: null,
  expTime: 0,
};

const type = {
  CLEAR_TOKEN: 'CLEAR_TOKEN',
  UPDATE_TOKEN: 'UPDATE_TOKEN',
};

export const actions = Object.freeze({
  clearToken: () => ({ type: type.CLEAR_TOKEN }),
  updateToken: (data) => ({ type: type.UPDATE_TOKEN, payload: data }),
});

const authReducer = (state, action) => {
  switch (action.type) {
    case type.CLEAR_TOKEN:
      return initialState;
    case type.UPDATE_TOKEN:
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
