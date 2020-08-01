import { createReducer } from 'redux-toolkit';
import { show, hide } from '../actions/tooltip';

const initialState = {
  content: null,
  coordX: 0,
  coordY: 0,
};

export default createReducer(initialState, {
  [show]: (state, { payload }) => {
    state.coordX = payload.coordX;
    state.coordY = payload.coordY;
    state.content = payload.content;
  },
  [hide]: (state) => {
    state.coordX = initialState.coordX;
    state.coordY = initialState.coordY;
    state.content = initialState.content;
  },
});
