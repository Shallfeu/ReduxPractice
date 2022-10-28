import { createSlice } from '@reduxjs/toolkit';

const initialState = { errors: [] };

const errorSlice = createSlice({
  name: 'error',

  initialState,

  reducers: {
    set(state, action) {
      state.errors.push(action.payload);
    },
  },
});

const { actions, reducer: errorReducer } = errorSlice;
const { set } = actions;

export const setError = (message) => (dispatch) => {
  dispatch(set(message));
};

export const getErrors = () => (state) => state.error.errors[0];

export default errorReducer;
