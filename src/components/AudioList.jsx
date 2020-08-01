import React from 'react';
import PropTypes from 'prop-types';
import { FixedSizeList as List } from 'react-window';
import { AudioListItem } from './AudioListItem';

class AudioList extends React.Component {

    constructor(props) {
        super(props);
        // With function binding we can always get access to `this` object,
        // and therefore its `children` prop.
        this.getRow = this.getRow.bind(this);
    }

    getRow({ index, style }) {
        const item = this.props.children[index];

        return (<AudioListItem
            title={item.title}
            duration={item.duration}
            artist={item.artist}
            style={style}
        />);
    }

    render() {
        return (<List 
            height={500}
            width={300}
            itemCount={this.props.children.length}
            itemSize={60}>
                {this.getRow}
            </List>
        );
    }
}

AudioList.propTypes = {
    children: PropTypes.array.isRequired
};

export default AudioList;
