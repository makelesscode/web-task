import { createAction } from '@reduxjs/toolkit';

export const LIST_UPDATE = 'list/update';
export const LIST_PREPEND = 'list/prepend';

export const update = createAction(LIST_UPDATE);
export const prepend = createAction(LIST_PREPEND);

console.log(update(['f']), update.toString());
