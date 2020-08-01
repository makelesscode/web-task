import { createReducer } from 'redux-toolkit';
import { show, hide } from '../actions/tooltip';

export const tooltipState = {
  content: null,
  coordX: 0,
  coordY: 0,
};

export const tooltip = createReducer(tooltipState, {
  [show]: (state, { payload }) => {
    state.coordX = payload.coordX;
    state.coordY = payload.coordY;
    state.content = payload.content;
  },
  [hide]: (state) => {
    state.coordX = tooltipState.coordX;
    state.coordY = tooltipState.coordY;
    state.content = tooltipState.content;
  },
});
