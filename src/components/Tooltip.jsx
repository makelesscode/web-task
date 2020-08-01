import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

function Tooltip(props) {
  const {
    content, coordX, coordY,
  } = props;
  if (content === null) {
    return null;
  }
  return ReactDOM.createPortal((
    <div
      className="tooltip bs-tooltip-top"
      role="tooltip"
      style={{ top: `${coordY + 5}px`, left: `${coordX + 5}px` }}
    >
      <div className="arrow" />
      <div className="tooltip-inner">
        {content}
      </div>
    </div>),
  document.body);
}

Tooltip.propTypes = {
  content: PropTypes.string.isRequired,
  coordX: PropTypes.number.isRequired,
  coordY: PropTypes.number.isRequired,
};

export default Tooltip;
