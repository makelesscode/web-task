import { combineReducers } from 'redux';
import { list } from './list';
import { editor } from './editor';
import { player } from './player';
import { tooltip } from './tooltip';
import { uploader } from './uploader';

const rootReducer = combineReducers({
    list,
    editor,
    player,
    tooltip,
    uploader
});

export default rootReducer;