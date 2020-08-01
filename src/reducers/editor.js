import { createReducer } from '@reduxjs/toolkit';

export const editorState = {
  currentItem: null,
  visible: false,
};

export const editor = createReducer(editorState, {});
