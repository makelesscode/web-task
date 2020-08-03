import React from 'react';
import PropTypes from 'prop-types';
import { getSize } from '../helpers/size';
import ProgressBar from './ProgressBar';

function FileUploadProgress(props) {
  const { bytesTotal, bytesUploaded, name } = props;
  return (
    <div className="alert alert-info" role="alert">
      <p>
        <strong>{name}</strong>
        {' '}
        is now being uploaded (
        {getSize(bytesUploaded)}
        /
        {getSize(bytesTotal)}
        )
      </p>
      <ProgressBar total={bytesTotal} now={bytesUploaded} />
    </div>
  );
}

FileUploadProgress.propTypes = {
  name: PropTypes.string.isRequired,
  bytesTotal: PropTypes.number.isRequired,
  bytesUploaded: PropTypes.number.isRequired,
};

export default FileUploadProgress;
