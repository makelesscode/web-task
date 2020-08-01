import { createReducer } from 'redux-toolkit';

export const initialState = {
  visible: false,
  items: [],
};

export default createReducer(initialState, {});
