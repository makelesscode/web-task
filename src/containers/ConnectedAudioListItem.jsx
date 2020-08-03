import { connect } from 'react-redux';
import AudioListItem from '../components/AudioListItem';
import { pause, setItem, play } from '../actions/player';
import { setQuery } from '../actions/similar';

function mapStateToProps(state, ownProps) {
  return {
    isPlaying: state.player.hash === ownProps.hash,
    playerPaused: state.player.paused,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    pause: () => dispatch(pause()),
    play: () => dispatch(play()),
    setItem: (item) => dispatch(setItem(item)),
    setQuery: (query) => dispatch(setQuery(query)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(AudioListItem);
