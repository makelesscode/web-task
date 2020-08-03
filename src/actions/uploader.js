import { createAction } from '@reduxjs/toolkit';

export const show = createAction('uploader/show');
export const hide = createAction('uploader/hide');
export const setStatus = createAction('uploader/setStatus');
export const updateProgress = createAction('uploader/updateProgress');
export const setDetails = createAction('uploader/setDetails');
