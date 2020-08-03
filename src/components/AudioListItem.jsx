/* eslint-disable */
import React from 'react';
import PropTypes from 'prop-types';
import { getDurationFromSeconds } from '../helpers/duration';
import Button from './Button';
import FAIcon from './FAIcon';
import store from '../helpers/store';
import cx from 'classnames';

function AudioListItem(props) {
  const {
    artist,
    title,
    duration,
    style,
    isPlaying,
    hash,
    src,
    playerPaused,
    play,
    pause,
    setItem,
    setQuery: seeSimilar
  } = props;

  const onItemClick = () => {
    if (isPlaying) {
      if (playerPaused) {
        play();
      } else {
        pause();
      }
    } else {
      setItem({
        artist,
        title,
        duration,
        hash,
        src,
      });
    }
  }

  return (
    <div style={style}>
      <div className="container">
        <div
          role="listitem"
          className={cx('audio-list__item', { active: isPlaying })}
          onClick={onItemClick}
        >
          <Button type="primary" size="lg" className="float-left">
            <FAIcon icon={isPlaying && !playerPaused ? 'pause' : 'play'} />
          </Button>
          <h6>
            {artist}
            {' '}
            &mdash;
            {' '}
            {title}
            <Button size="sm" onClick={
              (evt) => {
                evt.stopPropagation();
                seeSimilar(artist);
              }
            }>See similar</Button>
            <span className="d-block float-right">
              <small>{getDurationFromSeconds(duration)}</small>
            </span>
          </h6>
        </div>
      </div>
    </div>
  );
}

AudioListItem.propTypes = {
  title: PropTypes.string.isRequired,
  artist: PropTypes.string.isRequired,
  duration: PropTypes.number.isRequired,
  style: PropTypes.shape().isRequired,
  isPlaying: PropTypes.bool.isRequired,
  playerPaused: PropTypes.bool.isRequired,
  setItem: PropTypes.func.isRequired,
  pause: PropTypes.func.isRequired,
  play: PropTypes.func.isRequired,
  setQuery: PropTypes.func.isRequired,
  hash: PropTypes.string.isRequired,
};

export default AudioListItem;
