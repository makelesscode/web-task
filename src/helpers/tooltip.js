import store from './store';
import { show, hide } from '../actions/tooltip';

/**
 * Shows tooltip in a given position
 * @param {MouseEvent} evt Event object which triggered the appearing of tooltip
 * @param {string} content Tooltip content
 */
export function showTooltip(evt, content) {
  store.dispatch(show({
    coordX: evt.pageX,
    coordY: evt.pageY,
    content,
  }));
}

export function hideTooltip() {
  store.dispatch(hide());
}
