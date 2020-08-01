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
