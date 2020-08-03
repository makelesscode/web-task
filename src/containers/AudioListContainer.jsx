import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import AudioList from '../components/AudioList';
import { update } from '../actions/list';
import { setItem as setPlayerItem } from '../actions/player';
import { getAudioListData } from '../helpers/network';
import AudioListLoadingScreen from '../components/AudioListLoadingScreen';
import AudioListEmptyScreen from '../components/AudioListEmptyScreen';
import AudioListErrorScreen from '../components/AudioListErrorScreen';

function mapStateToProps(state) {
  return {
    list: state.list,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    updateList: (list) => dispatch(update(list)),
    onItemClick: (item) => dispatch(setPlayerItem(item)),
  };
}

class AudioListContainer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      error: false,
      loading: false,
    };
  }

  componentDidMount() {
    const { updateList } = this.props;
    this.setState({
      loading: true,
    });
    getAudioListData().then((list) => {
      this.setState({
        loading: false,
      });
      updateList(list);
    }).catch(() => {
      this.setState({
        error: true,
      });
    });
  }

  render() {
    const { list, onItemClick } = this.props;
    const { error, loading } = this.state;
    if (loading) {
      return <AudioListLoadingScreen />;
    }
    if (error) {
      return <AudioListErrorScreen />;
    }
    if (list.length === 0) {
      return <AudioListEmptyScreen />;
    }

    return (<AudioList onItemClick={onItemClick}>{list}</AudioList>);
  }
}

AudioListContainer.propTypes = {
  updateList: PropTypes.func.isRequired,
  onItemClick: PropTypes.func.isRequired,
  list: PropTypes.arrayOf(PropTypes.shape({
    title: PropTypes.string.isRequired,
    artist: PropTypes.string.isRequired,
    duration: PropTypes.number.isRequired,
  })).isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(AudioListContainer);
