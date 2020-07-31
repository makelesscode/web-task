import { PlayerRepeatMode } from 'repeat';

const initialState = {
    currentItem: null,
    similarArtists: [],
    repeatMode: PlayerRepeatMode.None,
}

export const playerReducer = createReducer(initialState, {});