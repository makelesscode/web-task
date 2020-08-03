import { createReducer } from '@reduxjs/toolkit';
import { setQuery, clear } from '../actions/similar';

export const similarState = null;

export const similar = createReducer(similarState, {
  [setQuery]: (state, { payload }) => payload,
  [clear]: () => null,
});
