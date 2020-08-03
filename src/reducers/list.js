import { createReducer } from '@reduxjs/toolkit';
import { prepend, update } from '../actions/list';

export const listState = [];

export const list = createReducer(listState, {
  [update]: (state, { payload }) => {
    state.splice(0, state.length);
    payload.forEach((item) => { state.push(item); });
  },
  [prepend]: (state, { payload }) => {
    state.unshift(payload);
  },
});
