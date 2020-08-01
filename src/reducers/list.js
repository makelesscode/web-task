import { createReducer } from '@reduxjs/toolkit';
import { LIST_PREPEND, LIST_UPDATE } from '../actions/list';

export const listState = [];

export const list = createReducer(listState, {
  [LIST_UPDATE]: (state, { payload }) => {
    state.splice(0, state.length);
    payload.forEach((item) => { state.push(item); });
  },
  [LIST_PREPEND]: (state, { payload }) => {
    state.unshift(payload);
  },
});
