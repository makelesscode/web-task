import { createReducer } from 'redux-toolkit';

const initialState = {
  currentItem: null,
  visible: false,
};

export default createReducer(initialState, {});
