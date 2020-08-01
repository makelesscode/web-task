import { createReducer } from 'redux-toolkit';
import PlayerRepeatMode from '../helpers/repeat';

export const playerState = {
  currentItem: null,
  similarArtists: [],
  repeatMode: PlayerRepeatMode.None,
};

export const player = createReducer(playerState, {});
