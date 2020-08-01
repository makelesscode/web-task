import React from 'react';
import PropTypes from 'prop-types';
import {getDurationFromSeconds} from '../helpers/duration';

export function AudioListItem(props) {
    return (<div class="list-group-item list-group-item-action active">
        <div class="d-flex w-100 justify-content-between">
            <h5 class="mb-1">{props.artist} &mdash; {props.title}</h5>
            <small>{getDurationFromSeconds(props.duration)}</small>
        </div>
    </div>);
};

AudioListItem.propTypes = {
    title: PropTypes.string.isRequired,
    artist: PropTypes.string.isRequired,
    duration: PropTypes.number.isRequired,
    src: PropTypes.string.isRquired,
};
