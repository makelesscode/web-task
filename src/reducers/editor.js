import { createReducer } from 'redux-toolkit';

export const editorState = {
  currentItem: null,
  visible: false,
};

export const editor = createReducer(editorState, {});
