import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  hide,
  updateProgress,
  setStatus,
  setDetails,
} from '../actions/uploader';
import { prepend } from '../actions/list';
import { updateAudioData } from '../helpers/network';
import Modal from '../components/Modal';
import Button from '../components/Button';
import FileUploadContainer from './FileUploadContainer';
import UploadStatus from '../helpers/upload-status';
import DataEditForm from './DataEditForm';

class UploaderModal extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      formWaiting: false,
      formSending: false,
      formError: false,
    };

    this.formValues = {};

    this.onFormSubmit = this.onFormSubmit.bind(this);
    this.onRequestClose = this.onRequestClose.bind(this);
    this.onUploadStart = this.onUploadStart.bind(this);
    this.onUploadProgress = this.onUploadProgress.bind(this);
    this.onUploadSuccess = this.onUploadSuccess.bind(this);
    this.onUploadFail = this.onUploadFail.bind(this);
  }

  onRequestClose() {
    const { hide: hideModal } = this.props;
    hideModal();
  }

  onUploadStart(file) {
    const { setStatus: setUploadStatus, setDetails: setUploadDetails } = this.props;
    setUploadStatus(UploadStatus.Uploading);
    setUploadDetails({
      filename: file.name,
      size: file.size,
    });
  }

  onUploadProgress(evt) {
    const { updateProgress: updateUploadProgress } = this.props;
    updateUploadProgress(evt.loaded);
  }

  onUploadSuccess(response) {
    const { setStatus: setUploadStatus } = this.props;
    const { formWaiting } = this.state;
    if (response.hash) {
      setUploadStatus(UploadStatus.Completed);
      this.fileHash = response.hash;
      if (formWaiting) {
        this.setState({
          formSending: true,
        });
        this.sendForm();
      }
    }
  }

  onUploadFail() {
    const { setStatus: setUploadStatus } = this.props;
    setUploadStatus(UploadStatus.Error);
  }

  onFormValid(values) {
    this.formValid = true;
    this.formValues = values;
  }

  onFormInvalid() {
    this.formValid = false;
  }

  onFormSubmit() {
    const { formSaving, formWaiting } = this.state;
    if (formSaving || formWaiting) {
      return;
    }

    this.setState({
      formSending: !!this.fileHash,
      formWaiting: this.fileHash === null,
      formError: false,
    });

    this.sendForm();
  }

  getSaveCaption() {
    const { formWaiting, formSaving } = this.state;
    if (formSaving) {
      return 'Saving...';
    }
    if (formWaiting) {
      return 'Uploading file...';
    }
    return 'Submit';
  }

  sendForm() {
    const { prependList } = this.props;
    updateAudioData(this.fileHash, this.formValues).then((response) => {
      prependList(response);
      this.onRequestClose();
    }).catch(() => {
      this.setState({
        formWaiting: false,
        formSending: false,
        formError: true,
      });
    });
  }

  render() {
    const {
      visible,
      filename,
      size,
      bytesUploaded,
      status,
    } = this.props;
    const { formWaiting, formSending, formError } = this.state;
    if (!visible) {
      return null;
    }
    return (
      <Modal title="Upload a file" onRequestClose={this.onRequestClose}>
        <div className="modal-body">
          <FileUploadContainer
            filename={filename}
            size={size}
            bytesUploaded={bytesUploaded}
            status={status}
            onStart={this.onUploadStart}
            onProgress={this.onUploadProgress}
            onSuccess={this.onUploadSuccess}
            onFail={this.onUploadFail}
          />
          <DataEditForm
            onValidationSuccess={this.onFormValid}
            onValidationFail={this.onFormInvalid}
            disabled={formWaiting || formSending}
          />
        </div>
        <div className="modal-footer">
          {formError && (<span className="text-danger">An error occurred. Please try again.</span>)}
          <Button
            type="primary"
            onClick={this.onFormSubmit}
            className={formWaiting && formSending ? 'disabled' : ''}
          >
            {this.getSaveCaption()}
          </Button>
        </div>
      </Modal>
    );
  }
}

UploaderModal.propTypes = {
  visible: PropTypes.bool.isRequired,
  status: PropTypes.number.isRequired,
  filename: PropTypes.string.isRequired,
  size: PropTypes.number.isRequired,
  bytesUploaded: PropTypes.number.isRequired,
  hide: PropTypes.func.isRequired,
  updateProgress: PropTypes.func.isRequired,
  setStatus: PropTypes.func.isRequired,
  setDetails: PropTypes.func.isRequired,
  prependList: PropTypes.func.isRequired,
};

function mapStateToProps(state) {
  return {
    visible: state.uploader.visible,
    status: state.uploader.status,
    filename: state.uploader.filename,
    size: state.uploader.size,
    bytesUploaded: state.uploader.bytesUploaded,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    hide: () => dispatch(hide()),
    updateProgress: (bytesUploaded) => dispatch(updateProgress(bytesUploaded)),
    setStatus: (status) => dispatch(setStatus(status)),
    setDetails: (details) => dispatch(setDetails(details)),
    prependList: (details) => dispatch(prepend(details)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(UploaderModal);
