import React from 'react';
import PropTypes from 'prop-types';
import { FixedSizeList as List } from 'react-window';
import AudioListItem from './AudioListItem';

class AudioList extends React.Component {
  constructor(props) {
    super(props);
    // With function binding we can always get access to `this` object,
    // and therefore its `children` prop.
    this.getRow = this.getRow.bind(this);
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
    return (
      <List
        height={500}
        width={300}
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
    style: PropTypes.string.isRequired,
  })).isRequired,
};

export default AudioList;
