import React from 'react';
import PropTypes from 'prop-types';
import {getDurationFromSeconds} from '../helpers/duration';
import { AudioListItem } from './AudioListItem';

export function AudioList(props) {
    return (<div class="list-group">
        {props.children.map(item => <AudioListItem {...item} />)}
    </div>);
};

AudioList.propTypes = {
    children: PropTypes.array
};
