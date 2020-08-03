import { createReducer } from '@reduxjs/toolkit';
import {
  show,
  hide,
  setStatus,
  updateProgress,
  setDetails,
} from '../actions/uploader';
import UploadStatus from '../helpers/upload-status';

export const uploaderState = {
  visible: false,
  filename: '',
  size: 0,
  bytesUploaded: 0,
  status: UploadStatus.Ready,
};

export const uploader = createReducer(uploaderState, {
  [show]: (state) => {
    state.visible = true;
  },
  [hide]: (state) => {
    state.visible = false;
  },
  [setStatus]: (state, { payload }) => {
    state.status = payload;
  },
  [updateProgress]: (state, { payload }) => {
    state.bytesUploaded = payload;
  },
  [setDetails]: (state, { payload }) => {
    state.filename = payload.filename;
    state.size = payload.size;
  },
});
