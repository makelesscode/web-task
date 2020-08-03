import React from 'react';
import PropTypes from 'prop-types';
import Button from './Button';
import store from '../helpers/store';
import UploadStatus from '../helpers/upload-status';
import { setStatus } from '../actions/uploader';

function cancelUpload() {
  store.dispatch(setStatus(UploadStatus.Ready));
}

function FileUploadError(props) {
  const { retry } = props;
  return (
    <div className="alert alert-danger" role="alert">
      An error occured while uploading.
      <Button onClick={retry} type="primary">Try again</Button>
      <Button onClick={cancelUpload} type="secondary">Cancel</Button>
    </div>
  );
}

FileUploadError.propTypes = {
  retry: PropTypes.func.isRequired,
};

export default FileUploadError;
