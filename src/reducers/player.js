import { PlayerRepeatMode } from '../helpers/repeat';

const initialState = {
    currentItem: null,
    similarArtists: [],
    repeatMode: PlayerRepeatMode.None,
}

export const player = createReducer(initialState, {});