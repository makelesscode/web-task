import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { hide } from '../actions/uploader';
import Dropzone from './Dropzone';
import Modal from '../components/Modal';
import Button from '../components/Button';

class UploaderModal extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      saving: false,
    };

    this.onRequestClose = this.onRequestClose.bind(this);
    this.onFileListUpdated = this.onFileListUpdated.bind(this);
  }

  onFileListUpdated(files) {
    const { saving } = this;
    console.log(saving, files);
  }

  onRequestClose() {
    const { hide: hideModal } = this.props;
    hideModal();
  }

  render() {
    const { visible } = this.props;
    const { saving } = this.state;
    if (!visible) {
      return null;
    }
    return (
      <Modal title="Upload a file" onRequestClose={this.onRequestClose}>
        <div className="modal-body">
          <Dropzone accept=".mp3,.wav" onFileListUpdated={this.onFileListUpdated} />
        </div>
        <div className="modal-footer">
          <Button type="primary">{saving ? 'Saving...' : 'Save'}</Button>
          <button type="button" className="btn btn-secondary">Close</button>
        </div>
      </Modal>
    );
  }
}

UploaderModal.propTypes = {
  visible: PropTypes.bool.isRequired,
  hide: PropTypes.func.isRequired,
};

function mapStateToProps(state) {
  return {
    visible: state.uploader.visible,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    hide: () => dispatch(hide()),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(UploaderModal);
