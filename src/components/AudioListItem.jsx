/* eslint-disable */
import React from 'react';
import PropTypes from 'prop-types';
import { getDurationFromSeconds } from '../helpers/duration';
import Button from './Button';
import FAIcon from './FAIcon';

function AudioListItem(props) {
  const {
    artist, title, duration, style, isPlaying, onClick, hash, src,
  } = props;
  return (
    <div style={style}>
      <div className="container">
        <div
          role="listitem"
          className="audio-list__item"
          onClick={() => {
            onClick({
              artist,
              title,
              duration,
              hash,
              src,
            });
          }}
        >
          <Button type="primary" size="lg" className="float-left">
            <FAIcon icon={isPlaying ? 'pause' : 'play'} />
          </Button>
          <h6>
            {artist}
            {' '}
            &mdash;
            {' '}
            {title}
            <Button size="sm">See similar</Button>
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
  onClick: PropTypes.func.isRequired,
  hash: PropTypes.string.isRequired,
};

export default AudioListItem;
