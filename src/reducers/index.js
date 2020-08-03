import { combineReducers } from 'redux';
import { list, listState } from './list';
import { player, playerState } from './player';
import { tooltip, tooltipState } from './tooltip';
import { uploader, uploaderState } from './uploader';
import { similar, similarState } from './similar';

export const rootReducer = combineReducers({
  list,
  player,
  tooltip,
  uploader,
  similar,
});

export const rootInitialState = {
  list: listState,
  player: playerState,
  tooltip: tooltipState,
  uploader: uploaderState,
  similar: similarState,
};
