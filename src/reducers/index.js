import { combineReducers } from 'redux';
import { list, listState } from './list';
import { editor, editorState } from './editor';
import { player, playerState } from './player';
import { tooltip, tooltipState } from './tooltip';
import { uploader, uploaderState } from './uploader';

export const rootReducer = combineReducers({
  list,
  editor,
  player,
  tooltip,
  uploader,
});

export const rootInitialState = {
  list: listState,
  editor: editorState,
  player: playerState,
  tooltip: tooltipState,
  uploader: uploaderState,
};
