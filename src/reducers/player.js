import { createReducer } from 'redux-toolkit';
import PlayerRepeatMode from '../helpers/repeat';

const initialState = {
  currentItem: null,
  similarArtists: [],
  repeatMode: PlayerRepeatMode.None,
};

export default createReducer(initialState, {});
