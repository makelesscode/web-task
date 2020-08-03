import { createAction } from '@reduxjs/toolkit';

export const update = createAction('list/update');
export const prepend = createAction('list/prepend');
export const setActive = createAction('list/setActive');
