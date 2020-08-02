import { createReducer } from '@reduxjs/toolkit';
import { show, hide } from '../actions/uploader';

export const uploaderState = {
  visible: false,
  items: [],
};

export const uploader = createReducer(uploaderState, {
  [show]: (state) => {
    state.visible = true;
  },
  [hide]: (state) => {
    state.visible = false;
  },
});
