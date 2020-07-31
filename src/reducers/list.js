import { update, prepend } from "../actions/list";

export const initialState = [];

export const list = createReducer(initialState, {
    [update]: (state, { payload }) => {
        return payload;
    },
    [prepend]: (state, { payload }) => {
        return [payload, ...state];
    }
});