import React from 'react';
import PropTypes from 'prop-types';
import {getDurationFromSeconds} from '../helpers/duration';

export function AudioListItem(props) {
    const { artist, title, duration, style } = props;
    return (<div class="list-group-item list-group-item-action" style={style}>
        <div class="d-flex w-100 justify-content-between">
            <h5 class="mb-1">{artist} &mdash; {title}</h5>
            <small>{getDurationFromSeconds(duration)}</small>
        </div>
    </div>);
};

AudioListItem.propTypes = {
    title: PropTypes.string.isRequired,
    artist: PropTypes.string.isRequired,
    duration: PropTypes.number.isRequired,
    src: PropTypes.string.isRquired,
};
