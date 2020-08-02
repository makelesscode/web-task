import React from 'react';
import PropTypes from 'prop-types';
import FAIcon from './FAIcon';

class Modal extends React.Component {
  onRequestClose = (forceClose = false) => {
    const { onRequestClose, closable } = this.props;
    if (forceClose || closable) {
      onRequestClose();
    }
  };

  render() {
    const { title, children, closable } = this.props;
    return (
      <div className="modal" tabIndex="-1" role="dialog">
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
    );
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
