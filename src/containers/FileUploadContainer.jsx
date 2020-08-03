import React from 'react';
import PropTypes from 'prop-types';
import { uploadAudio } from '../helpers/network';
import Dropzone from './Dropzone';
import UploadStatus from '../helpers/upload-status';
import { allowedExtensions } from '../helpers/validation';
import FileUploadProgress from '../components/FileUploadProgress';
import FileUploadError from '../components/FileUploadError';
import FileUploadSuccess from '../components/FileUploadSuccess';

class FileUploadContainer extends React.Component {
  constructor(props) {
    super(props);
    this.currentFile = null;
    this.onFileListUpdated = this.onFileListUpdated.bind(this);
    this.retryUpload = this.retryUpload.bind(this);
  }

  onFileListUpdated(files) {
    if (files.length !== 0) {
      this.upload(files[0]);
    }
  }

  upload(file) {
    const {
      onStart,
      onProgress,
      onSuccess,
      onFail,
    } = this.props;

    uploadAudio(file, onProgress).then((response) => {
      this.currentFile = null;
      onSuccess(response);
    }).catch(onFail);
    onStart(file);
    this.currentFile = file;
  }

  retryUpload() {
    this.upload(this.currentFile);
  }

  render() {
    const { status } = this.props;

    switch (status) {
      case UploadStatus.Ready: {
        const exts = allowedExtensions.map((ext) => `.${ext}`).join(',');
        return (
          <Dropzone
            accept={exts}
            onFileListUpdated={this.onFileListUpdated}
          />
        );
      }
      case UploadStatus.Uploading: {
        const { filename, size, bytesUploaded } = this.props;
        return (
          <FileUploadProgress
            name={filename}
            bytesUploaded={bytesUploaded}
            bytesTotal={size}
          />
        );
      }
      case UploadStatus.Error:
        return (<FileUploadError retry={this.retryUpload} />);
      case UploadStatus.Completed:
        return (<FileUploadSuccess />);
      default:
        return null;
    }
  }
}

FileUploadContainer.propTypes = {
  status: PropTypes.number.isRequired,
  filename: PropTypes.string,
  size: PropTypes.number,
  bytesUploaded: PropTypes.number,
  onStart: PropTypes.func.isRequired,
  onProgress: PropTypes.func.isRequired,
  onSuccess: PropTypes.func.isRequired,
  onFail: PropTypes.func.isRequired,
};

FileUploadContainer.defaultProps = {
  filename: null,
  size: null,
  bytesUploaded: null,
};

export default FileUploadContainer;
