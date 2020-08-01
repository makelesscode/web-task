import { createReducer } from '@reduxjs/toolkit';

export const uploaderState = {
  visible: false,
  items: [],
};

export const uploader = createReducer(uploaderState, {});
