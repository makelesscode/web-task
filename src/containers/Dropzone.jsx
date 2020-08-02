/* eslint-disable class-methods-use-this */
import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

class Dropzone extends React.Component {
  constructor(props) {
    super(props);
    const { onFileListUpdated, multiple, accept } = this.props;

    this.onDragEnter = this.onDragEnter.bind(this);
    this.onDragLeave = this.onDragLeave.bind(this);
    this.onDrop = this.onDrop.bind(this);
    this.openDialog = this.openDialog.bind(this);
    this.input = document.createElement('input');
    this.input.type = 'file';
    this.input.multiple = multiple;
    this.input.accept = accept;
    this.input.addEventListener('change', (evt) => {
      onFileListUpdated(evt.target.files);
    });
    this.state = {
      isOver: false,
    };
  }

  onDragStart(event) {
    event.dataTransfer.effectAllowed = 'move';
  }

  onDragOver(event) {
    event.stopPropagation();
    event.preventDefault();
  }

  onDragEnter(event) {
    event.dataTransfer.dropEffect = 'copy';
    this.setState({
      isOver: true,
    });
  }

  onDragLeave(event) {
    event.stopPropagation();
    this.setState({
      isOver: false,
    });
  }

  onDrop(event) {
    event.preventDefault();
    const { onFileListUpdated } = this.props;
    this.setState({
      isOver: false,
    });
    onFileListUpdated(event.dataTransfer.files);
  }

  getInitialContent() {
    return (
      <div className="initial">
        <span>
          Drag files here or
          <button type="button" onClick={this.openDialog}>
            Browse files
          </button>
        </span>
      </div>
    );
  }

  getDropoverContent() {
    return (
      <div className="dropover">
        <span>Drop files here</span>
      </div>
    );
  }

  openDialog(event) {
    event.preventDefault();
    this.input.click();
  }

  render() {
    const { isOver } = this.state;
    return (
      <div
        className={cx('dropzone', isOver && 'dropzone--over')}
        onDragStart={this.onDragStart}
        onDragOver={this.onDragOver}
        onDragEnter={this.onDragEnter}
        onDragLeave={this.onDragLeave}
        onDrop={this.onDrop}
      >
        {isOver ? this.getDropoverContent() : this.getInitialContent()}
      </div>
    );
  }
}

Dropzone.propTypes = {
  onFileListUpdated: PropTypes.func.isRequired,
  multiple: PropTypes.bool,
  accept: PropTypes.string,
};
Dropzone.defaultProps = {
  multiple: false,
  accept: '',
};

export default Dropzone;
