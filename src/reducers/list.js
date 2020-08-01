import { createReducer } from 'redux-toolkit';
import { update, prepend } from '../actions/list';

// const initialState = [];

export default createReducer({ test: true }, {
  [update]: (state, { payload }) => payload,
  [prepend]: (state, { payload }) => [payload, ...state],
});
