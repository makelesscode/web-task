import React from 'react';
import PropTypes from 'prop-types';
import { FixedSizeList as List } from 'react-window';
import AudioListItem from './AudioListItem';

class AudioList extends React.Component {
  constructor(props) {
    super(props);
    // With function binding we can always get access to the component
    this.getRow = this.getRow.bind(this);
    this.onWindowResize = this.onWindowResize.bind(this);

    // By stretching width and height of the FixedSizeList,
    // we imitate the behavior as if the user scrolled through the actual window,
    // but in fact it's just the inner <div> of the FixedSizeList
    this.state = {
      height: window.innerHeight,
    };
  }

  componentDidMount() {
    window.addEventListener('resize', this.onWindowResize);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.onWindowResize);
  }

  onWindowResize() {
    this.setState({
      height: window.innerHeight,
    });
  }

  getRow({ index, style }) {
    const { children } = this.props;
    const item = children[index];

    return (
      <AudioListItem
        title={item.title}
        duration={item.duration}
        artist={item.artist}
        style={style}
      />
    );
  }

  render() {
    // FixedSizeList from `react-window` is used to handle huge amount of data,
    // in case if the user stores a lot of audio content
    const { children } = this.props;
    const { height } = this.state;
    return (
      <List
        className="audio-list"
        height={height}
        itemCount={children.length}
        itemSize={60}
      >
        {this.getRow}
      </List>
    );
  }
}

AudioList.propTypes = {
  children: PropTypes.arrayOf(PropTypes.shape({
    title: PropTypes.string.isRequired,
    artist: PropTypes.string.isRequired,
    duration: PropTypes.number.isRequired,
    style: PropTypes.string,
  })).isRequired,
};

export default AudioList;
