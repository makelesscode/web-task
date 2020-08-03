import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { play, pause, setItem } from '../actions/player';
import Button from '../components/Button';
import { getDurationFromSeconds } from '../helpers/duration';
import FAIcon from '../components/FAIcon';

class Player extends React.Component {
  constructor(props) {
    super(props);

    this.onTimeUpdate = this.onTimeUpdate.bind(this);
    this.onPlayToggle = this.onPlayToggle.bind(this);

    this.audioElement = document.createElement('audio');
    this.audioElement.addEventListener('timeupdate', this.onTimeUpdate);

    this.state = {
      currentTime: 0,
    };
  }

  componentDidUpdate(prevProps) {
    const { src, paused } = this.props;
    if (prevProps.src !== src) {
      this.audioElement.src = src;
      if (!paused) { // If <audio> changes `src` it pause itself. We don't need it
        this.audioElement.play();
      }
    }
    if (prevProps.paused !== paused) {
      this.audioElement[paused ? 'pause' : 'play']();
    }
  }

  onTimeUpdate() {
    this.setState({
      currentTime: this.audioElement.currentTime,
    });
  }

  onPlayToggle() {
    const { play: setPlay, pause: setPause, paused } = this.props;
    if (paused) {
      setPlay();
    } else {
      setPause();
    }
  }

  render() {
    const {
      paused,
      artist,
      title,
      src,
      duration,
    } = this.props;
    const { currentTime } = this.state;
    if (!src) {
      return null;
    }
    return (
      <div className="player">
        <Button type="light" onClick={this.onPlayToggle}>
          <FAIcon icon={paused ? 'play' : 'pause'} />
        </Button>
        <span className="player__name">
          {artist}
          {' '}
          &mdash;
          {' '}
          {title}
        </span>
        <span className="player__duration">
          {getDurationFromSeconds(currentTime)}
          {' / '}
          {getDurationFromSeconds(duration)}
        </span>
      </div>
    );
  }
}

Player.getDerivedStateFromProps = (props) => ({
  duration: props.duration,
});

Player.propTypes = {
  src: PropTypes.string,
  artist: PropTypes.string,
  title: PropTypes.string,
  duration: PropTypes.number,
  paused: PropTypes.bool.isRequired,
  play: PropTypes.func.isRequired,
  pause: PropTypes.func.isRequired,
};

Player.defaultProps = {
  src: '',
  artist: '',
  title: '',
  duration: 0,
};

function mapStateToProps(state) {
  const playerState = state.player;
  return {
    src: playerState.src,
    artist: playerState.artist,
    title: playerState.title,
    duration: playerState.duration,
    paused: playerState.paused,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    setItem: (item) => dispatch(setItem(item)),
    pause: () => dispatch(pause()),
    play: () => dispatch(play()),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Player);
