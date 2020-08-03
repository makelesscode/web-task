import { combineReducers } from 'redux';
import { list, listState } from './list';
import { player, playerState } from './player';
import { tooltip, tooltipState } from './tooltip';
import { uploader, uploaderState } from './uploader';

export const rootReducer = combineReducers({
  list,
  player,
  tooltip,
  uploader,
});

export const rootInitialState = {
  list: listState,
  player: playerState,
  tooltip: tooltipState,
  uploader: uploaderState,
};
