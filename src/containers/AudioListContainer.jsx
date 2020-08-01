import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import AudioList from '../components/AudioList';
import { update } from '../actions/list';

function mapStateToProps(state) {
  return {
    list: state.list,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    updateList: (list) => dispatch(update(list)),
  };
}

class AudioListContainer extends React.Component {
  componentDidMount() {
    const { updateList } = this.props;
    const TEST_ITEMS = [];

    for (let i = 0; i < 1000; i += 1) {
      TEST_ITEMS.push({
        title: 'Test',
        artist: 'Test 2',
        duration: 100,
      });
    }

    updateList(TEST_ITEMS);
  }

  render() {
    const { list } = this.props;
    return (<AudioList>{list}</AudioList>);
  }
}

AudioListContainer.propTypes = {
  updateList: PropTypes.func.isRequired,
  list: PropTypes.arrayOf(PropTypes.shape({
    title: PropTypes.string.isRequired,
    artist: PropTypes.string.isRequired,
    duration: PropTypes.number.isRequired,
    style: PropTypes.string,
  })).isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(AudioListContainer);
