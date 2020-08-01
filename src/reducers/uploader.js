import { createReducer } from 'redux-toolkit';

export const uploaderState = {
  visible: false,
  items: [],
};

export const uploader = createReducer(uploaderState, {});
