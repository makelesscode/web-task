import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import FAIcon from './FAIcon';

class Modal extends React.Component {
  constructor(props) {
    super(props);
    this.onRequestClose = this.onRequestClose.bind(this);
  }

  onRequestClose(forceClose = false) {
    const { onRequestClose, closable } = this.props;
    if (forceClose || closable) {
      onRequestClose();
    }
  }

  render() {
    const { title, children, closable } = this.props;
    return ReactDOM.createPortal((
      <div
        className="modal show"
        tabIndex="-1"
        role="dialog"
        style={{
          display: 'block',
        }}
      >
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">{title}</h5>
              {closable && (
              <button type="button" className="close" onClick={this.onRequestClose} aria-label="Close">
                <FAIcon icon="times" />
              </button>
              )}
            </div>
            {children}
          </div>
        </div>
      </div>
    ), document.body);
  }
}

Modal.propTypes = {
  onRequestClose: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  closable: PropTypes.bool,
};

Modal.defaultProps = {
  closable: true,
};

export default Modal;
