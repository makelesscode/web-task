import { createReducer } from 'redux-toolkit';
import { update, prepend } from '../actions/list';

export const listState = [];

export const list = createReducer(listState, {
  [update]: (state, { payload }) => payload,
  [prepend]: (state, { payload }) => [payload, ...state],
});
