import { createReducer } from '@reduxjs/toolkit';
import { play, pause, setItem } from '../actions/player';

export const playerState = {
  artist: null,
  title: null,
  src: null,
  paused: true,
  hash: null,
  duration: null,
};

export const player = createReducer(playerState, {
  [play]: (state) => {
    state.paused = false;
  },
  [pause]: (state) => {
    state.paused = true;
  },
  [setItem]: (state, { payload }) => {
    state.hash = payload.hash;
    state.src = payload.src;
    state.artist = payload.artist;
    state.title = payload.title;
    state.duration = payload.duration;
    state.paused = false;
  },
});
